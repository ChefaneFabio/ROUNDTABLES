import { prisma } from '../config/database'
import { emailService } from './EmailService'
import { NotificationType, NotificationStatus } from '@prisma/client'

class LessonReminderService {
  /**
   * Find lessons starting in the next 60-75 minutes and send reminder
   * emails to enrolled students and the assigned teacher.
   * Uses a 75-minute window so that with a 15-minute cron interval
   * no lesson is ever missed.
   */
  async sendUpcomingLessonReminders(): Promise<{ sent: number; failed: number }> {
    const now = new Date()
    const sixtyMinutes = new Date(now.getTime() + 60 * 60 * 1000)
    const seventyFiveMinutes = new Date(now.getTime() + 75 * 60 * 1000)

    const lessons = await prisma.lesson.findMany({
      where: {
        deletedAt: null,
        status: { in: ['SCHEDULED', 'REMINDER_SENT'] },
        scheduledAt: { gte: sixtyMinutes, lte: seventyFiveMinutes }
      },
      include: {
        course: {
          include: {
            enrollments: {
              where: { status: 'ACTIVE' },
              include: { student: { include: { user: true } } }
            }
          }
        },
        teacher: { include: { user: true } }
      }
    })

    if (lessons.length === 0) {
      return { sent: 0, failed: 0 }
    }

    let sent = 0
    let failed = 0

    for (const lesson of lessons) {
      const courseName = lesson.course.name
      const teacherName = lesson.teacher?.user?.name || 'TBA'
      const lessonDate = lesson.scheduledAt
      const duration = lesson.duration

      // Send reminders to enrolled students
      for (const enrollment of lesson.course.enrollments) {
        const user = enrollment.student.user
        try {
          // Idempotency: skip if notification already exists
          const existing = await prisma.notification.findFirst({
            where: {
              userId: user.id,
              lessonId: lesson.id,
              type: 'LESSON_REMINDER' as NotificationType
            }
          })
          if (existing) continue

          const html = this.buildStudentEmailHtml({
            studentName: user.name,
            courseName,
            teacherName,
            lessonTitle: lesson.title || `Lesson ${lesson.lessonNumber}`,
            lessonDate,
            duration,
            meetingProvider: lesson.meetingProvider,
            meetingLink: lesson.meetingLink
          })

          const subject = `Lesson Reminder: ${courseName} starts in 1 hour`

          await emailService.sendEmail({ to: user.email, subject, html })

          await prisma.notification.create({
            data: {
              userId: user.id,
              lessonId: lesson.id,
              type: 'LESSON_REMINDER' as NotificationType,
              subject,
              content: `Your lesson for ${courseName} starts at ${lessonDate.toLocaleTimeString()}.`,
              status: 'SENT' as NotificationStatus,
              sentAt: new Date()
            }
          })
          sent++
        } catch (error) {
          console.error(`[LessonReminder] Failed to send reminder to ${user.email}:`, error)
          // Create a FAILED notification record so we don't retry endlessly
          try {
            await prisma.notification.create({
              data: {
                userId: user.id,
                lessonId: lesson.id,
                type: 'LESSON_REMINDER' as NotificationType,
                subject: `Lesson Reminder: ${courseName} starts in 1 hour`,
                content: `Your lesson for ${courseName} starts at ${lessonDate.toLocaleTimeString()}.`,
                status: 'FAILED' as NotificationStatus
              }
            })
          } catch (_) { /* best effort */ }
          failed++
        }
      }

      // Send reminder to teacher
      if (lesson.teacher?.user) {
        const teacherUser = lesson.teacher.user
        try {
          const existing = await prisma.notification.findFirst({
            where: {
              userId: teacherUser.id,
              lessonId: lesson.id,
              type: 'TEACHER_REMINDER' as NotificationType
            }
          })
          if (existing) continue

          const html = this.buildTeacherEmailHtml({
            teacherName: teacherUser.name,
            courseName,
            lessonTitle: lesson.title || `Lesson ${lesson.lessonNumber}`,
            lessonDate,
            duration,
            studentCount: lesson.course.enrollments.length,
            meetingProvider: lesson.meetingProvider,
            meetingHostUrl: lesson.meetingHostUrl,
            meetingLink: lesson.meetingLink
          })

          const subject = `Teaching Reminder: ${courseName} starts in 1 hour`

          await emailService.sendEmail({ to: teacherUser.email, subject, html })

          await prisma.notification.create({
            data: {
              userId: teacherUser.id,
              lessonId: lesson.id,
              type: 'TEACHER_REMINDER' as NotificationType,
              subject,
              content: `Your lesson for ${courseName} starts at ${lessonDate.toLocaleTimeString()}.`,
              status: 'SENT' as NotificationStatus,
              sentAt: new Date()
            }
          })
          sent++
        } catch (error) {
          console.error(`[LessonReminder] Failed to send teacher reminder to ${teacherUser.email}:`, error)
          try {
            await prisma.notification.create({
              data: {
                userId: teacherUser.id,
                lessonId: lesson.id,
                type: 'TEACHER_REMINDER' as NotificationType,
                subject: `Teaching Reminder: ${courseName} starts in 1 hour`,
                content: `Your lesson for ${courseName} starts at ${lessonDate.toLocaleTimeString()}.`,
                status: 'FAILED' as NotificationStatus
              }
            })
          } catch (_) { /* best effort */ }
          failed++
        }
      }

      // Transition lesson status to REMINDER_SENT if it was SCHEDULED
      if (lesson.status === 'SCHEDULED') {
        try {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: { status: 'REMINDER_SENT' }
          })
        } catch (error) {
          console.error(`[LessonReminder] Failed to update lesson status for ${lesson.id}:`, error)
        }
      }
    }

    return { sent, failed }
  }

  private formatMeetingProvider(provider: string | null): string {
    if (!provider) return ''
    const labels: Record<string, string> = {
      ZOOM: 'Zoom',
      GOOGLE_MEET: 'Google Meet',
      MICROSOFT_TEAMS: 'Microsoft Teams',
      CUSTOM: 'Video Call'
    }
    return labels[provider] || provider
  }

  private buildStudentEmailHtml(params: {
    studentName: string
    courseName: string
    teacherName: string
    lessonTitle: string
    lessonDate: Date
    duration: number
    meetingProvider: string | null
    meetingLink: string | null
  }): string {
    const { studentName, courseName, teacherName, lessonTitle, lessonDate, duration, meetingProvider, meetingLink } = params
    const dateStr = lessonDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const timeStr = lessonDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    const providerLabel = this.formatMeetingProvider(meetingProvider)

    const meetingSection = meetingLink
      ? `<div style="background:#ecfdf5;border-radius:8px;padding:16px;margin:24px 0;text-align:center">
          <p style="margin:0 0 8px;font-size:14px;color:#065f46;font-weight:600">${providerLabel || 'Meeting'} Link</p>
          <a href="${meetingLink}" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:16px">Join Lesson</a>
        </div>`
      : ''

    return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:#4f46e5;color:#fff;padding:32px;text-align:center;border-radius:8px 8px 0 0">
        <h1 style="margin:0;font-size:28px">Maka Learning Management Centre</h1>
        <p style="margin:8px 0 0;opacity:0.9">Lesson Reminder</p>
      </div>

      <div style="padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <p style="font-size:16px;color:#374151">Dear <strong>${studentName}</strong>,</p>
        <p style="font-size:16px;color:#374151">
          Your lesson is starting in <strong>1 hour</strong>. Here are the details:
        </p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:15px">
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;width:140px">Course</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${courseName}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Lesson</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${lessonTitle}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Teacher</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${teacherName}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Date</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${dateStr}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Time</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${timeStr}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Duration</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${duration} minutes</td>
          </tr>
        </table>

        ${meetingSection}

        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px">
          <p>This email was sent by Maka Learning Management Centre.</p>
        </div>
      </div>
    </div>`
  }

  private buildTeacherEmailHtml(params: {
    teacherName: string
    courseName: string
    lessonTitle: string
    lessonDate: Date
    duration: number
    studentCount: number
    meetingProvider: string | null
    meetingHostUrl: string | null
    meetingLink: string | null
  }): string {
    const { teacherName, courseName, lessonTitle, lessonDate, duration, studentCount, meetingProvider, meetingHostUrl, meetingLink } = params
    const dateStr = lessonDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const timeStr = lessonDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    const providerLabel = this.formatMeetingProvider(meetingProvider)

    const hostLink = meetingHostUrl || meetingLink
    const meetingSection = hostLink
      ? `<div style="background:#ecfdf5;border-radius:8px;padding:16px;margin:24px 0;text-align:center">
          <p style="margin:0 0 8px;font-size:14px;color:#065f46;font-weight:600">${providerLabel || 'Meeting'} — Host Link</p>
          <a href="${hostLink}" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:16px">Start Lesson</a>
        </div>`
      : ''

    return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:#4f46e5;color:#fff;padding:32px;text-align:center;border-radius:8px 8px 0 0">
        <h1 style="margin:0;font-size:28px">Maka Learning Management Centre</h1>
        <p style="margin:8px 0 0;opacity:0.9">Teaching Reminder</p>
      </div>

      <div style="padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <p style="font-size:16px;color:#374151">Dear <strong>${teacherName}</strong>,</p>
        <p style="font-size:16px;color:#374151">
          You have a lesson starting in <strong>1 hour</strong>. Here are the details:
        </p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:15px">
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;width:140px">Course</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${courseName}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Lesson</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${lessonTitle}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Students</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${studentCount} enrolled</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Date</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${dateStr}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Time</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${timeStr}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280">Duration</td>
            <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827">${duration} minutes</td>
          </tr>
        </table>

        ${meetingSection}

        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px">
          <p>This email was sent by Maka Learning Management Centre.</p>
        </div>
      </div>
    </div>`
  }
}

export const lessonReminderService = new LessonReminderService()
