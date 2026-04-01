import cron from 'node-cron'
import { emailService } from '../services/EmailService'
import { lessonReminderService } from '../services/LessonReminderService'
import { prisma } from '../config/database'
import { addDays, startOfWeek, endOfWeek, format } from 'date-fns'

if (!emailService.isConfigured()) {
  console.log('[Scheduler] SMTP not configured — lesson reminder scheduler skipped')
} else {
  // Run every 15 minutes — lesson reminders (1h before)
  cron.schedule('*/15 * * * *', async () => {
    try {
      const result = await lessonReminderService.sendUpcomingLessonReminders()
      if (result.sent > 0 || result.failed > 0) {
        console.log(`[Scheduler] Lesson reminders: ${result.sent} sent, ${result.failed} failed`)
      }
    } catch (error) {
      console.error('[Scheduler] Lesson reminder job failed:', error)
    }
  })

  console.log('[Scheduler] Lesson reminder scheduler started (every 15 minutes)')
}

// ============================================
// AUTO QUESTIONS REQUEST — Daily at 9 AM
// Set questionsStatus to QUESTIONS_REQUESTED for lessons 7 days out
// ============================================
cron.schedule('0 9 * * *', async () => {
  try {
    const sevenDaysOut = addDays(new Date(), 7)
    const startOfDay = new Date(sevenDaysOut.getFullYear(), sevenDaysOut.getMonth(), sevenDaysOut.getDate())
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)

    const result = await prisma.lesson.updateMany({
      where: {
        scheduledAt: { gte: startOfDay, lt: endOfDay },
        deletedAt: null,
        status: { in: ['SCHEDULED', 'REMINDER_SENT'] },
        questionsStatus: 'NOT_REQUESTED',
        teacherId: { not: null }
      },
      data: { questionsStatus: 'QUESTIONS_REQUESTED' }
    })

    if (result.count > 0) {
      console.log(`[Scheduler] Auto-requested questions for ${result.count} lessons (7 days out)`)
    }
  } catch (error) {
    console.error('[Scheduler] Auto questions request failed:', error)
  }
})

console.log('[Scheduler] Auto questions request started (daily at 9 AM, 7 days before lesson)')

// ============================================
// MONDAY TRAINER ALERT — Every Monday at 8 AM
// Notify trainers about next week's sessions where questions are NOT yet saved
// Keeps sending every Monday until questionsStatus becomes QUESTIONS_PENDING or QUESTIONS_SENT
// ============================================
cron.schedule('0 8 * * 1', async () => {
  if (!emailService.isConfigured()) return

  try {
    // Next week: Monday to Sunday
    const today = new Date()
    const nextMonday = addDays(startOfWeek(today, { weekStartsOn: 1 }), 7)
    const nextSunday = endOfWeek(nextMonday, { weekStartsOn: 1 })

    // Find lessons next week where questions are NOT saved yet
    const lessons = await prisma.lesson.findMany({
      where: {
        scheduledAt: { gte: nextMonday, lte: nextSunday },
        deletedAt: null,
        status: { in: ['SCHEDULED', 'REMINDER_SENT'] },
        questionsStatus: { in: ['NOT_REQUESTED', 'QUESTIONS_REQUESTED'] },
        teacherId: { not: null }
      },
      include: {
        teacher: { include: { user: { select: { name: true, email: true } } } },
        course: { select: { name: true } }
      }
    })

    if (lessons.length === 0) return

    // Group by teacher
    const byTeacher = new Map<string, typeof lessons>()
    for (const lesson of lessons) {
      if (!lesson.teacher?.user?.email) continue
      const key = lesson.teacher.user.email
      if (!byTeacher.has(key)) byTeacher.set(key, [])
      byTeacher.get(key)!.push(lesson)
    }

    let sent = 0
    for (const [email, teacherLessons] of byTeacher) {
      const teacherName = teacherLessons[0].teacher?.user?.name || 'Teacher'

      const lessonRows = teacherLessons.map(l =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${l.course.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${format(l.scheduledAt, 'EEEE MMM d')}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${format(l.scheduledAt, 'HH:mm')}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">
            <span style="color: #dc2626; font-weight: bold;">Questions not saved</span>
          </td>
        </tr>`
      ).join('')

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">📋 Weekly Questions Reminder</h2>
          <p>Hi ${teacherName},</p>
          <p>You have <strong>${teacherLessons.length} session(s)</strong> next week that still need questions saved.
             Please prepare and save the topic questions so the coordinator can review and send them to learners.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 8px; text-align: left;">Course</th>
                <th style="padding: 8px; text-align: left;">Date</th>
                <th style="padding: 8px; text-align: left;">Time</th>
                <th style="padding: 8px; text-align: left;">Status</th>
              </tr>
            </thead>
            <tbody>${lessonRows}</tbody>
          </table>
          <p style="color: #6b7280; font-size: 13px;">
            This reminder will stop once you save the questions for each session.
          </p>
        </div>
      `

      try {
        await emailService.sendEmail({
          to: email,
          subject: `[Action Required] ${teacherLessons.length} session(s) next week need questions`,
          html
        })
        sent++
      } catch (e) {
        console.error(`[Scheduler] Monday alert failed for ${email}:`, e)
      }
    }

    console.log(`[Scheduler] Monday trainer alerts: ${sent} teachers notified about ${lessons.length} lessons`)
  } catch (error) {
    console.error('[Scheduler] Monday trainer alert failed:', error)
  }
})

console.log('[Scheduler] Monday trainer alert started (Mondays at 8 AM)')
