import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireLessonAccess, requireTeacher, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION, VALID_STATUS_TRANSITIONS } from '../utils/constants'
import { LessonStatus } from '@prisma/client'
import { addDays, startOfMonth, endOfMonth, format } from 'date-fns'

const router = Router()

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
  meetingLink: Joi.string().uri().optional().allow(null)
})

const updateLessonSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  description: Joi.string().max(2000).optional().allow(null),
  scheduledAt: Joi.date().iso().optional(),
  duration: Joi.number().integer().min(15).max(180).optional(),
  moduleId: Joi.string().optional().allow(null),
  teacherId: Joi.string().optional().allow(null),
  meetingLink: Joi.string().uri().optional().allow(null),
  notes: Joi.string().max(5000).optional().allow(null)
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
    if (req.user?.role === 'LANGUAGE_SCHOOL') {
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
    if (req.user?.role === 'LANGUAGE_SCHOOL') {
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
    if (req.user?.role === 'LANGUAGE_SCHOOL') {
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

    const lesson = await prisma.lesson.create({
      data,
      include: {
        course: { select: { name: true } },
        teacher: { include: { user: { select: { name: true } } } },
        module: { select: { title: true } }
      }
    })

    res.status(201).json(apiResponse.success(lesson, 'Lesson created successfully'))
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
      include: { course: true }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Only school admin or assigned teacher can edit
    const canEdit = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === lesson.course.schoolId) ||
      (req.user?.role === 'TEACHER' && req.user.teacherId === lesson.teacherId)

    if (!canEdit) {
      return res.status(403).json(apiResponse.error('Not authorized to edit this lesson', 'FORBIDDEN'))
    }

    const updated = await prisma.lesson.update({
      where: { id },
      data: req.body,
      include: {
        course: { select: { name: true } },
        teacher: { include: { user: { select: { name: true } } } },
        module: { select: { title: true } }
      }
    })

    res.json(apiResponse.success(updated, 'Lesson updated successfully'))
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
    if (!validTransitions?.includes(status)) {
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

    await prisma.lesson.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'CANCELLED' }
    })

    res.json(apiResponse.success(null, 'Lesson deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
