import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireLessonAccess, requireTeacher, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION, VALID_STATUS_TRANSITIONS } from '../utils/constants'
import { LessonStatus, MeetingProvider } from '@prisma/client'
import { addDays, startOfMonth, endOfMonth, format } from 'date-fns'
import { VideoConferencingService } from '../services/VideoConferencingService'
import { emailService } from '../services/EmailService'

const router = Router()

// Helper: send meeting link emails to all enrolled students + course teachers
async function sendMeetingLinks(lesson: any) {
  if (!lesson.meetingLink || !emailService.isConfigured()) return

  const providerName = lesson.meetingProvider === 'ZOOM' ? 'Zoom' :
    lesson.meetingProvider === 'GOOGLE_MEET' ? 'Google Meet' :
    lesson.meetingProvider === 'MICROSOFT_TEAMS' ? 'Microsoft Teams' : 'Video'

  const courseName = lesson.course?.name || 'Course'
  const lessonTitle = lesson.title || `Lesson ${lesson.lessonNumber}`
  const scheduledAt = lesson.scheduledAt ? format(new Date(lesson.scheduledAt), 'EEEE, MMMM d yyyy · HH:mm') : ''
  const duration = lesson.duration || 60

  // Collect all recipients: enrolled students + course teachers
  const [enrollments, courseTeachers] = await Promise.all([
    prisma.enrollment.findMany({
      where: { courseId: lesson.course?.id || lesson.courseId, status: { in: ['ACTIVE', 'PENDING'] } },
      include: { student: { include: { user: { select: { email: true, name: true } } } } }
    }),
    prisma.courseTeacher.findMany({
      where: { courseId: lesson.course?.id || lesson.courseId },
      include: { teacher: { include: { user: { select: { email: true, name: true } } } } }
    })
  ])

  const studentEmails = enrollments.map(e => e.student.user.email).filter(Boolean)
  const teacherEmails = courseTeachers.map(ct => ct.teacher.user.email).filter(Boolean)

  // Also include the specific lesson teacher if not already in courseTeachers
  if (lesson.teacher?.user?.email && !teacherEmails.includes(lesson.teacher.user.email)) {
    teacherEmails.push(lesson.teacher.user.email)
  }

  const meetingLinkHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">📅 ${courseName} — ${lessonTitle}</h2>
      <p><strong>Date:</strong> ${scheduledAt}</p>
      <p><strong>Duration:</strong> ${duration} minutes</p>
      <p><strong>Platform:</strong> ${providerName}</p>
      ${lesson.meetingPassword ? `<p><strong>Password:</strong> ${lesson.meetingPassword}</p>` : ''}
      <div style="margin: 24px 0;">
        <a href="${lesson.meetingLink}"
           style="display: inline-block; background: #2563eb; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          Join ${providerName} Meeting
        </a>
      </div>
      <p style="color: #6b7280; font-size: 13px;">
        If the button doesn't work, copy this link: ${lesson.meetingLink}
      </p>
    </div>
  `

  // Send to students
  if (studentEmails.length > 0) {
    try {
      await emailService.sendEmail({
        to: studentEmails,
        subject: `${courseName} — ${lessonTitle} · ${providerName} link`,
        html: meetingLinkHtml
      })
    } catch (e) {
      console.error('Failed to send meeting link to students:', e)
    }
  }

  // Send to teachers (with host URL if available)
  if (teacherEmails.length > 0) {
    const teacherHtml = lesson.meetingHostUrl && lesson.meetingHostUrl !== lesson.meetingLink
      ? meetingLinkHtml.replace(
          `Join ${providerName} Meeting`,
          `Start ${providerName} Meeting (Host)`
        ).replace(lesson.meetingLink, lesson.meetingHostUrl) +
        `<p style="margin-top: 8px; font-size: 13px; color: #6b7280;">Student join link: ${lesson.meetingLink}</p>`
      : meetingLinkHtml

    try {
      await emailService.sendEmail({
        to: teacherEmails,
        subject: `[Teacher] ${courseName} — ${lessonTitle} · ${providerName} link`,
        html: teacherHtml
      })
    } catch (e) {
      console.error('Failed to send meeting link to teachers:', e)
    }
  }
}

// Validation schemas
const createLessonSchema = Joi.object({
  courseId: Joi.string().required(),
  lessonNumber: Joi.number().integer().min(1).required(),
  title: Joi.string().max(200).optional(),
  description: Joi.string().max(2000).optional(),
  scheduledAt: Joi.date().iso().required(),
  duration: Joi.number().integer().min(15).max(180).optional(),
  moduleId: Joi.string().optional().allow(null),
  teacherId: Joi.string().optional().allow(null),
  meetingProvider: Joi.string().valid('ZOOM', 'GOOGLE_MEET', 'MICROSOFT_TEAMS', 'CUSTOM').optional(),
  meetingLink: Joi.string().uri().optional().allow(null),
  createMeeting: Joi.boolean().optional() // Auto-create meeting on lesson creation
})

const updateLessonSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  description: Joi.string().max(2000).optional().allow(null),
  scheduledAt: Joi.date().iso().optional(),
  duration: Joi.number().integer().min(15).max(180).optional(),
  moduleId: Joi.string().optional().allow(null),
  teacherId: Joi.string().optional().allow(null),
  meetingProvider: Joi.string().valid('ZOOM', 'GOOGLE_MEET', 'MICROSOFT_TEAMS', 'CUSTOM').optional().allow(null),
  meetingLink: Joi.string().uri().optional().allow(null),
  meetingPassword: Joi.string().max(50).optional().allow(null),
  notes: Joi.string().max(5000).optional().allow(null)
})

const createMeetingSchema = Joi.object({
  provider: Joi.string().valid('ZOOM', 'GOOGLE_MEET', 'MICROSOFT_TEAMS').required(),
  teamsUserId: Joi.string().when('provider', {
    is: 'MICROSOFT_TEAMS',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
})

const updateStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.keys(VALID_STATUS_TRANSITIONS.lesson)).required()
})

// Get all lessons (with filtering)
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      courseId,
      status,
      teacherId,
      upcoming,
      fromDate,
      toDate
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = { deletedAt: null }

    // Apply access control
    if (req.user?.role === 'ADMIN') {
      where.course = { schoolId: req.user.schoolId }
    } else if (req.user?.role === 'TEACHER') {
      where.teacherId = req.user.teacherId
    } else if (req.user?.role === 'STUDENT') {
      where.course = { enrollments: { some: { studentId: req.user.studentId } } }
    }

    if (courseId) where.courseId = String(courseId)
    if (status) where.status = String(status)
    if (teacherId) where.teacherId = String(teacherId)

    if (upcoming === 'true') {
      where.scheduledAt = { gte: new Date() }
      where.status = { notIn: ['COMPLETED', 'CANCELLED'] }
    }

    if (fromDate) {
      where.scheduledAt = { ...where.scheduledAt, gte: new Date(String(fromDate)) }
    }
    if (toDate) {
      where.scheduledAt = { ...where.scheduledAt, lte: new Date(String(toDate)) }
    }

    const [lessons, total] = await Promise.all([
      prisma.lesson.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          course: { select: { id: true, name: true, schoolId: true } },
          teacher: { include: { user: { select: { name: true } } } },
          module: { select: { id: true, title: true } },
          _count: { select: { materials: true, attendance: true, questions: true } }
        },
        orderBy: { scheduledAt: 'asc' }
      }),
      prisma.lesson.count({ where })
    ])

    res.json(apiResponse.paginated(lessons, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get upcoming lessons (next N days)
router.get('/upcoming', authenticate, async (req: Request, res: Response) => {
  try {
    const days = Math.min(30, Math.max(1, Number(req.query.days) || 7))
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10))

    const where: any = {
      deletedAt: null,
      scheduledAt: {
        gte: new Date(),
        lte: addDays(new Date(), days)
      },
      status: { notIn: ['COMPLETED', 'CANCELLED'] }
    }

    // Apply access control
    if (req.user?.role === 'ADMIN') {
      where.course = { schoolId: req.user.schoolId }
    } else if (req.user?.role === 'TEACHER') {
      where.teacherId = req.user.teacherId
    } else if (req.user?.role === 'STUDENT') {
      where.course = { enrollments: { some: { studentId: req.user.studentId } } }
    }

    const lessons = await prisma.lesson.findMany({
      where,
      take: limit,
      include: {
        course: { select: { id: true, name: true } },
        teacher: { include: { user: { select: { name: true } } } },
        module: { select: { title: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    })

    res.json(apiResponse.success(lessons))
  } catch (error) {
    handleError(res, error)
  }
})

// Get calendar view
router.get('/calendar', authenticate, async (req: Request, res: Response) => {
  try {
    const { year, month } = req.query
    const yearNum = Number(year) || new Date().getFullYear()
    const monthNum = Number(month) || new Date().getMonth() + 1

    const startDate = startOfMonth(new Date(yearNum, monthNum - 1))
    const endDate = endOfMonth(new Date(yearNum, monthNum - 1))

    const where: any = {
      deletedAt: null,
      scheduledAt: { gte: startDate, lte: endDate }
    }

    // Apply access control
    if (req.user?.role === 'ADMIN') {
      where.course = { schoolId: req.user.schoolId }
    } else if (req.user?.role === 'TEACHER') {
      where.teacherId = req.user.teacherId
    } else if (req.user?.role === 'STUDENT') {
      where.course = { enrollments: { some: { studentId: req.user.studentId } } }
    }

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        course: { select: { id: true, name: true } },
        teacher: { include: { user: { select: { name: true } } } }
      },
      orderBy: { scheduledAt: 'asc' }
    })

    // Group by date
    const calendar: Record<string, typeof lessons> = {}
    lessons.forEach(lesson => {
      const dateKey = format(lesson.scheduledAt, 'yyyy-MM-dd')
      if (!calendar[dateKey]) calendar[dateKey] = []
      calendar[dateKey].push(lesson)
    })

    res.json(apiResponse.success({
      year: yearNum,
      month: monthNum,
      lessons: calendar
    }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get lesson by ID
router.get('/:id', authenticate, requireLessonAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const lesson = await prisma.lesson.findFirst({
      where: { id, deletedAt: null },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            schoolId: true,
            school: { select: { name: true } }
          }
        },
        teacher: { include: { user: { select: { name: true, email: true } } } },
        module: true,
        materials: { orderBy: { orderIndex: 'asc' } },
        questions: { orderBy: { createdAt: 'asc' } },
        attendance: {
          include: {
            student: { include: { user: { select: { name: true, email: true } } } }
          }
        },
        feedback: {
          include: {
            student: { include: { user: { select: { name: true } } } },
            teacher: { include: { user: { select: { name: true } } } }
          }
        }
      }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(lesson))
  } catch (error) {
    handleError(res, error)
  }
})

// Create lesson
router.post('/', authenticate, requireSchoolAdmin, validateRequest(createLessonSchema), async (req: Request, res: Response) => {
  try {
    const data = req.body

    // Verify course exists and belongs to school
    const course = await prisma.course.findFirst({
      where: { id: data.courseId, deletedAt: null }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Check lesson number uniqueness
    const existing = await prisma.lesson.findFirst({
      where: { courseId: data.courseId, lessonNumber: data.lessonNumber }
    })

    if (existing) {
      return res.status(400).json(
        apiResponse.error('Lesson number already exists for this course', 'DUPLICATE_LESSON_NUMBER')
      )
    }

    // Conflict detection: check teacher availability and existing lessons
    if (data.teacherId && data.scheduledAt) {
      const lessonDate = new Date(data.scheduledAt)
      const duration = data.duration || 60
      const lessonEnd = new Date(lessonDate.getTime() + duration * 60000)
      const dayOfWeek = lessonDate.getDay()
      const timeStr = `${String(lessonDate.getHours()).padStart(2, '0')}:${String(lessonDate.getMinutes()).padStart(2, '0')}`
      const endMinutes = lessonDate.getHours() * 60 + lessonDate.getMinutes() + duration
      const endTimeStr = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`

      // Check for conflicting lessons with same teacher
      const conflicting = await prisma.lesson.findMany({
        where: {
          teacherId: data.teacherId,
          deletedAt: null,
          status: { notIn: ['CANCELLED'] },
          scheduledAt: { lt: lessonEnd, gte: new Date(lessonDate.getTime() - 180 * 60000) },
        },
        select: { id: true, scheduledAt: true, duration: true, title: true, course: { select: { name: true } } },
      })

      const realConflicts = conflicting.filter(l => {
        const existEnd = new Date(l.scheduledAt.getTime() + l.duration * 60000)
        return l.scheduledAt < lessonEnd && existEnd > lessonDate
      })

      if (realConflicts.length > 0) {
        const c = realConflicts[0]
        return res.status(409).json(apiResponse.error(
          `Teacher has a conflicting lesson "${c.title || c.course?.name}" at ${format(c.scheduledAt, 'HH:mm')}`,
          'TEACHER_CONFLICT'
        ))
      }

      // Check teacher availability (warn only — still allow creation)
      const availSlots = await prisma.teacherAvailability.findMany({
        where: { teacherId: data.teacherId, dayOfWeek, status: 'AVAILABLE', isRecurring: true },
      })

      const isWithinAvailability = availSlots.some(s => s.startTime <= timeStr && s.endTime >= endTimeStr)
      if (availSlots.length > 0 && !isWithinAvailability) {
        // Include warning in response but still create
        data._availabilityWarning = 'Teacher is not marked as available at this time'
      }
    }

    const availWarning = data._availabilityWarning
    delete data._availabilityWarning

    // Extract meeting fields before creating lesson
    const wantsMeeting = data.meetingProvider && data.meetingProvider !== 'CUSTOM' && data.scheduledAt
    const customLink = data.meetingProvider === 'CUSTOM' ? data.meetingLink : null
    const chosenProvider = data.meetingProvider
    delete data.createMeeting // Not a DB field

    // For CUSTOM provider, store the manual link directly
    if (data.meetingProvider === 'CUSTOM' && data.meetingLink) {
      data.meetingProvider = 'CUSTOM'
      // meetingLink is already in data
    } else if (!wantsMeeting) {
      // No meeting requested — strip meeting fields so they don't get saved as empty
      delete data.meetingProvider
      delete data.meetingLink
    } else {
      // Will auto-create below — don't store provider yet (set after API call)
      delete data.meetingProvider
      delete data.meetingLink
    }

    const lesson = await prisma.lesson.create({
      data,
      include: {
        course: { select: { id: true, name: true, schoolId: true } },
        teacher: { include: { user: { select: { name: true, email: true } } } },
        module: { select: { title: true } }
      }
    })

    // Auto-create meeting via provider API
    let meetingWarning: string | undefined
    if (wantsMeeting && chosenProvider) {
      try {
        if (!VideoConferencingService.isProviderConfigured(chosenProvider)) {
          meetingWarning = `${chosenProvider} is not configured — lesson created without meeting`
        } else {
          const meetingDetails = await VideoConferencingService.createMeeting(
            {
              provider: chosenProvider,
              topic: lesson.title || `${lesson.course.name} - Lesson ${lesson.lessonNumber}`,
              startTime: lesson.scheduledAt,
              duration: lesson.duration,
              hostEmail: lesson.teacher?.user?.email,
              agenda: lesson.description || undefined
            }
          )

          await prisma.lesson.update({
            where: { id: lesson.id },
            data: {
              meetingProvider: meetingDetails.provider,
              meetingId: meetingDetails.meetingId,
              meetingLink: meetingDetails.joinUrl,
              meetingHostUrl: meetingDetails.hostUrl,
              meetingPassword: meetingDetails.password
            }
          })

          // Merge meeting info into response
          Object.assign(lesson, {
            meetingProvider: meetingDetails.provider,
            meetingId: meetingDetails.meetingId,
            meetingLink: meetingDetails.joinUrl,
            meetingHostUrl: meetingDetails.hostUrl,
            meetingPassword: meetingDetails.password
          })

          // Send meeting links to all enrolled students + all course teachers
          sendMeetingLinks(lesson).catch(e => console.error('Failed to send meeting links:', e))
        }
      } catch (e) {
        console.error('Meeting creation failed (non-blocking):', e)
        meetingWarning = 'Lesson created but meeting creation failed — you can create one manually'
      }
    }

    const warnings = [availWarning, meetingWarning].filter(Boolean).join('; ')
    const message = warnings
      ? `Lesson created (${warnings})`
      : 'Lesson created successfully'
    res.status(201).json(apiResponse.success(lesson, message))
  } catch (error) {
    handleError(res, error)
  }
})

// Update lesson
router.put('/:id', authenticate, requireLessonAccess, validateRequest(updateLessonSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const lesson = await prisma.lesson.findFirst({
      where: { id, deletedAt: null },
      include: {
        course: true,
        teacher: { include: { user: { select: { email: true, name: true } } } }
      }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Only school admin or assigned teacher can edit
    const canEdit = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'TEACHER' && req.user.teacherId === lesson.teacherId)

    if (!canEdit) {
      return res.status(403).json(apiResponse.error('Not authorized to edit this lesson', 'FORBIDDEN'))
    }

    const body = { ...req.body }
    const timeChanged = body.scheduledAt && new Date(body.scheduledAt).getTime() !== lesson.scheduledAt.getTime()
    const durationChanged = body.duration && body.duration !== lesson.duration
    const providerChanged = body.meetingProvider !== undefined && body.meetingProvider !== lesson.meetingProvider

    // Conflict detection on reschedule
    const checkTeacherId = body.teacherId || lesson.teacherId
    const checkScheduledAt = body.scheduledAt ? new Date(body.scheduledAt) : lesson.scheduledAt
    const checkDuration = body.duration || lesson.duration

    if (checkTeacherId && (timeChanged || durationChanged || body.teacherId)) {
      const lessonEnd = new Date(checkScheduledAt.getTime() + checkDuration * 60000)

      const conflicting = await prisma.lesson.findMany({
        where: {
          teacherId: checkTeacherId,
          deletedAt: null,
          id: { not: id },
          status: { notIn: ['CANCELLED'] },
          scheduledAt: { lt: lessonEnd, gte: new Date(checkScheduledAt.getTime() - 180 * 60000) },
        },
        select: { id: true, scheduledAt: true, duration: true, title: true, course: { select: { name: true } } },
      })

      const realConflicts = conflicting.filter(l => {
        const existEnd = new Date(l.scheduledAt.getTime() + l.duration * 60000)
        return l.scheduledAt < lessonEnd && existEnd > checkScheduledAt
      })

      if (realConflicts.length > 0) {
        const c = realConflicts[0]
        return res.status(409).json(apiResponse.error(
          `Teacher has a conflicting lesson "${c.title || c.course?.name}" at ${format(c.scheduledAt, 'HH:mm')}`,
          'TEACHER_CONFLICT'
        ))
      }
    }

    // Handle meeting provider changes
    let meetingWarning: string | undefined
    if (providerChanged && lesson.meetingId && lesson.meetingProvider && lesson.meetingProvider !== 'CUSTOM') {
      // Delete old meeting
      try {
        await VideoConferencingService.deleteMeeting(lesson.meetingProvider as MeetingProvider, lesson.meetingId)
      } catch (e) {
        console.error('Failed to delete old meeting:', e)
      }
      // Clear old meeting data
      body.meetingId = null
      body.meetingLink = null
      body.meetingHostUrl = null
      body.meetingPassword = null
    }

    // Auto-create/update meeting if needed
    const needsNewMeeting = providerChanged && body.meetingProvider && body.meetingProvider !== 'CUSTOM'
    const needsMeetingUpdate = !providerChanged && (timeChanged || durationChanged) && lesson.meetingId && lesson.meetingProvider && lesson.meetingProvider !== 'CUSTOM'

    if (needsNewMeeting || needsMeetingUpdate) {
      const provider = body.meetingProvider || lesson.meetingProvider
      try {
        if (!VideoConferencingService.isProviderConfigured(provider)) {
          meetingWarning = `${provider} is not configured`
        } else {
          // If updating existing, delete first
          if (needsMeetingUpdate && lesson.meetingId) {
            try { await VideoConferencingService.deleteMeeting(lesson.meetingProvider as MeetingProvider, lesson.meetingId) } catch {}
          }

          const teacherUser = lesson.teacher?.user || (await prisma.teacher.findUnique({
            where: { id: checkTeacherId },
            include: { user: { select: { email: true } } }
          }))?.user

          const meetingDetails = await VideoConferencingService.createMeeting({
            provider,
            topic: body.title || lesson.title || `Lesson ${lesson.lessonNumber}`,
            startTime: checkScheduledAt,
            duration: checkDuration,
            hostEmail: teacherUser?.email
          })

          body.meetingProvider = meetingDetails.provider
          body.meetingId = meetingDetails.meetingId
          body.meetingLink = meetingDetails.joinUrl
          body.meetingHostUrl = meetingDetails.hostUrl
          body.meetingPassword = meetingDetails.password
        }
      } catch (e) {
        console.error('Meeting update failed:', e)
        meetingWarning = 'Meeting update failed'
      }
    }

    // For CUSTOM provider with manual link
    if (body.meetingProvider === 'CUSTOM' && body.meetingLink) {
      body.meetingId = null
      body.meetingHostUrl = null
      body.meetingPassword = null
    }

    // Clear meeting if provider set to null
    if (body.meetingProvider === null) {
      body.meetingId = null
      body.meetingLink = null
      body.meetingHostUrl = null
      body.meetingPassword = null
    }

    const updated = await prisma.lesson.update({
      where: { id },
      data: body,
      include: {
        course: { select: { id: true, name: true, schoolId: true } },
        teacher: { include: { user: { select: { name: true, email: true } } } },
        module: { select: { title: true } }
      }
    })

    // Resend meeting links if meeting was created/changed
    if ((needsNewMeeting || needsMeetingUpdate) && updated.meetingLink) {
      sendMeetingLinks(updated).catch(e => console.error('Failed to send meeting links:', e))
    }

    const message = meetingWarning
      ? `Lesson updated (${meetingWarning})`
      : 'Lesson updated successfully'
    res.json(apiResponse.success(updated, message))
  } catch (error) {
    handleError(res, error)
  }
})

// Update lesson status
router.patch('/:id/status', authenticate, requireTeacher, validateRequest(updateStatusSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const lesson = await prisma.lesson.findFirst({
      where: { id, deletedAt: null }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Validate status transition
    const validTransitions = VALID_STATUS_TRANSITIONS.lesson[lesson.status as keyof typeof VALID_STATUS_TRANSITIONS.lesson]
    if (!(validTransitions as readonly string[])?.includes(status)) {
      return res.status(400).json(
        apiResponse.error(
          `Cannot transition from ${lesson.status} to ${status}`,
          'INVALID_STATUS_TRANSITION'
        )
      )
    }

    const updated = await prisma.lesson.update({
      where: { id },
      data: { status: status as LessonStatus }
    })

    res.json(apiResponse.success(updated, `Lesson status updated to ${status}`))
  } catch (error) {
    handleError(res, error)
  }
})

// Assign teacher to lesson
router.patch('/:id/assign-teacher', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { teacherId } = req.body

    const lesson = await prisma.lesson.findFirst({
      where: { id, deletedAt: null },
      include: { course: true }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Verify teacher belongs to the same school
    if (teacherId) {
      const teacher = await prisma.teacher.findFirst({
        where: { id: teacherId, schoolId: lesson.course.schoolId, deletedAt: null }
      })

      if (!teacher) {
        return res.status(400).json(apiResponse.error('Teacher not found or not in this school', 'INVALID_TEACHER'))
      }
    }

    const updated = await prisma.lesson.update({
      where: { id },
      data: { teacherId: teacherId || null },
      include: {
        teacher: { include: { user: { select: { name: true, email: true } } } }
      }
    })

    res.json(apiResponse.success(updated, teacherId ? 'Teacher assigned successfully' : 'Teacher unassigned'))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete lesson (soft delete)
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const lesson = await prisma.lesson.findFirst({
      where: { id, deletedAt: null }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    if (lesson.status === 'IN_PROGRESS') {
      return res.status(400).json(
        apiResponse.error('Cannot delete a lesson in progress', 'LESSON_IN_PROGRESS')
      )
    }

    // Delete associated meeting if exists
    if (lesson.meetingId && lesson.meetingProvider && lesson.meetingProvider !== 'CUSTOM') {
      try {
        await VideoConferencingService.deleteMeeting(
          lesson.meetingProvider as MeetingProvider,
          lesson.meetingId
        )
      } catch (error) {
        console.error('Failed to delete meeting:', error)
        // Continue with lesson deletion even if meeting deletion fails
      }
    }

    await prisma.lesson.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'CANCELLED' }
    })

    res.json(apiResponse.success(null, 'Lesson deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// VIDEO CONFERENCING ENDPOINTS
// ============================================

// Get available meeting providers
router.get('/meeting-providers', authenticate, async (req: Request, res: Response) => {
  try {
    const providers = VideoConferencingService.getConfiguredProviders()

    const providerInfo = providers.map(provider => ({
      provider,
      name: provider === 'ZOOM' ? 'Zoom' :
            provider === 'GOOGLE_MEET' ? 'Google Meet' :
            provider === 'MICROSOFT_TEAMS' ? 'Microsoft Teams' : 'Custom',
      configured: VideoConferencingService.isProviderConfigured(provider)
    }))

    res.json(apiResponse.success(providerInfo))
  } catch (error) {
    handleError(res, error)
  }
})

// Create meeting for a lesson
router.post('/:id/meeting', authenticate, requireSchoolAdmin, validateRequest(createMeetingSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { provider, teamsUserId } = req.body

    const lesson = await prisma.lesson.findFirst({
      where: { id, deletedAt: null },
      include: {
        course: { select: { name: true, schoolId: true } },
        teacher: { include: { user: true } }
      }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Check if meeting already exists
    if (lesson.meetingId) {
      return res.status(400).json(
        apiResponse.error('Meeting already exists for this lesson', 'MEETING_EXISTS')
      )
    }

    // Verify provider is configured
    if (!VideoConferencingService.isProviderConfigured(provider)) {
      return res.status(400).json(
        apiResponse.error(`${provider} is not configured`, 'PROVIDER_NOT_CONFIGURED')
      )
    }

    // Create the meeting
    const meetingDetails = await VideoConferencingService.createMeeting(
      {
        provider,
        topic: lesson.title || `${lesson.course.name} - Lesson ${lesson.lessonNumber}`,
        startTime: lesson.scheduledAt,
        duration: lesson.duration,
        hostEmail: lesson.teacher?.user?.email,
        agenda: lesson.description || undefined
      },
      { teamsUserId }
    )

    // Update lesson with meeting details
    const updated = await prisma.lesson.update({
      where: { id },
      data: {
        meetingProvider: meetingDetails.provider,
        meetingId: meetingDetails.meetingId,
        meetingLink: meetingDetails.joinUrl,
        meetingHostUrl: meetingDetails.hostUrl,
        meetingPassword: meetingDetails.password
      },
      include: {
        course: { select: { name: true } },
        teacher: { include: { user: { select: { name: true } } } }
      }
    })

    res.json(apiResponse.success(updated, 'Meeting created successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete meeting for a lesson
router.delete('/:id/meeting', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const lesson = await prisma.lesson.findFirst({
      where: { id, deletedAt: null }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    if (!lesson.meetingId) {
      return res.status(400).json(apiResponse.error('No meeting exists for this lesson', 'NO_MEETING'))
    }

    // Delete the meeting from the provider
    if (lesson.meetingProvider && lesson.meetingProvider !== 'CUSTOM') {
      await VideoConferencingService.deleteMeeting(
        lesson.meetingProvider as MeetingProvider,
        lesson.meetingId
      )
    }

    // Clear meeting details from lesson
    const updated = await prisma.lesson.update({
      where: { id },
      data: {
        meetingProvider: null,
        meetingId: null,
        meetingLink: null,
        meetingHostUrl: null,
        meetingPassword: null,
        meetingRecordingUrl: null
      }
    })

    res.json(apiResponse.success(updated, 'Meeting deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get meeting join link (different for host vs participant)
router.get('/:id/meeting/join', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const lesson = await prisma.lesson.findFirst({
      where: { id, deletedAt: null },
      include: {
        course: { select: { schoolId: true } }
      }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    if (!lesson.meetingLink) {
      return res.status(400).json(apiResponse.error('No meeting configured for this lesson', 'NO_MEETING'))
    }

    // Determine if user is host (teacher or school admin)
    const isHost = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'TEACHER' && req.user.teacherId === lesson.teacherId)

    const joinInfo = {
      meetingLink: isHost && lesson.meetingHostUrl ? lesson.meetingHostUrl : lesson.meetingLink,
      password: lesson.meetingPassword,
      provider: lesson.meetingProvider,
      isHost,
      scheduledAt: lesson.scheduledAt,
      duration: lesson.duration
    }

    res.json(apiResponse.success(joinInfo))
  } catch (error) {
    handleError(res, error)
  }
})

// Get meeting recording (after lesson completed)
router.get('/:id/meeting/recording', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const lesson = await prisma.lesson.findFirst({
      where: { id, deletedAt: null }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Return cached recording URL if available
    if (lesson.meetingRecordingUrl) {
      return res.json(apiResponse.success({ recordingUrl: lesson.meetingRecordingUrl }))
    }

    // Try to fetch recording from provider
    if (lesson.meetingId && lesson.meetingProvider) {
      const recordingUrl = await VideoConferencingService.getRecording(
        lesson.meetingProvider as MeetingProvider,
        lesson.meetingId
      )

      if (recordingUrl) {
        // Cache the recording URL
        await prisma.lesson.update({
          where: { id },
          data: { meetingRecordingUrl: recordingUrl }
        })

        return res.json(apiResponse.success({ recordingUrl }))
      }
    }

    res.json(apiResponse.success({ recordingUrl: null, message: 'No recording available' }))
  } catch (error) {
    handleError(res, error)
  }
})

// ─── iCal EXPORT ──────────────────────────────────

// GET /api/lessons/calendar/ical — Generate .ics calendar feed
// Supports ?token= query param for browser download (window.open can't set headers)
router.get('/calendar/ical', (req: Request, res: Response, next) => {
  if (req.query.token && !req.headers.authorization) {
    req.headers.authorization = `Bearer ${req.query.token}`
  }
  next()
}, authenticate, async (req: Request, res: Response) => {
  try {
    // Fetch upcoming lessons (next 90 days) based on user role
    const now = new Date()
    const futureLimit = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

    const where: any = {
      deletedAt: null,
      scheduledAt: { gte: now, lte: futureLimit },
      status: { notIn: ['CANCELLED'] },
    }

    if (req.user?.role === 'ADMIN') {
      where.course = { schoolId: req.user.schoolId }
    } else if (req.user?.role === 'TEACHER') {
      where.teacherId = req.user.teacherId
    } else if (req.user?.role === 'STUDENT') {
      where.course = { enrollments: { some: { studentId: req.user.studentId } } }
    }

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        course: { select: { name: true } },
        teacher: { include: { user: { select: { name: true, email: true } } } },
      },
      orderBy: { scheduledAt: 'asc' },
    })

    // Build iCal
    const lines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Maka Language Consulting//ROUNDTABLES//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:ROUNDTABLES - ${req.user?.role === 'TEACHER' ? 'Teaching' : 'Learning'} Schedule`,
    ]

    for (const lesson of lessons) {
      const dtStart = formatICalDate(lesson.scheduledAt)
      const dtEnd = formatICalDate(new Date(lesson.scheduledAt.getTime() + lesson.duration * 60000))
      const uid = `lesson-${lesson.id}@roundtables`
      const summary = lesson.title || `${lesson.course?.name} - Lesson ${lesson.lessonNumber}`
      const description = [
        lesson.description || '',
        lesson.meetingLink ? `Join: ${lesson.meetingLink}` : '',
      ].filter(Boolean).join('\\n')

      lines.push('BEGIN:VEVENT')
      lines.push(`UID:${uid}`)
      lines.push(`DTSTART:${dtStart}`)
      lines.push(`DTEND:${dtEnd}`)
      lines.push(`SUMMARY:${escapeIcal(summary)}`)
      if (description) lines.push(`DESCRIPTION:${escapeIcal(description)}`)
      if (lesson.meetingLink) lines.push(`URL:${lesson.meetingLink}`)
      if (lesson.teacher?.user) {
        lines.push(`ORGANIZER;CN=${escapeIcal(lesson.teacher.user.name)}:mailto:${lesson.teacher.user.email}`)
      }
      lines.push(`STATUS:${lesson.status === 'CANCELLED' ? 'CANCELLED' : 'CONFIRMED'}`)
      lines.push('END:VEVENT')
    }

    lines.push('END:VCALENDAR')

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="roundtables-schedule.ics"')
    res.send(lines.join('\r\n'))
  } catch (error) {
    handleError(res, error)
  }
})

function formatICalDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function escapeIcal(str: string): string {
  return str.replace(/[\\;,]/g, (m) => '\\' + m).replace(/\n/g, '\\n')
}

export default router
