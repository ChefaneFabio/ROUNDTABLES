import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireTeacher, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'
import { FeedbackStatus } from '@prisma/client'

const router = Router()

// Validation schemas
const createFeedbackSchema = Joi.object({
  lessonId: Joi.string().required(),
  studentId: Joi.string().required(),
  content: Joi.string().min(10).max(5000).required(),
  score: Joi.number().integer().min(1).max(100).optional()
})

const updateFeedbackSchema = Joi.object({
  content: Joi.string().min(10).max(5000).optional(),
  score: Joi.number().integer().min(1).max(100).optional().allow(null)
})

const reviewFeedbackSchema = Joi.object({
  status: Joi.string().valid('APPROVED', 'NEEDS_REVISION', 'REJECTED').required(),
  reviewNotes: Joi.string().max(1000).optional()
})

// Get all feedback (filtered by access)
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      lessonId,
      studentId,
      teacherId,
      courseId,
      status
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {}

    // Apply access control
    if (req.user?.role === 'LANGUAGE_SCHOOL') {
      where.lesson = { course: { schoolId: req.user.schoolId } }
    } else if (req.user?.role === 'TEACHER') {
      where.teacherId = req.user.teacherId
    } else if (req.user?.role === 'STUDENT') {
      where.studentId = req.user.studentId
      where.status = 'SENT' // Students only see sent feedback
    }

    if (lessonId) where.lessonId = String(lessonId)
    if (studentId) where.studentId = String(studentId)
    if (teacherId) where.teacherId = String(teacherId)
    if (courseId) where.lesson = { ...where.lesson, courseId: String(courseId) }
    if (status && req.user?.role !== 'STUDENT') where.status = String(status)

    const [feedback, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          lesson: {
            select: { id: true, title: true, lessonNumber: true, course: { select: { id: true, name: true } } }
          },
          student: { include: { user: { select: { name: true, email: true } } } },
          teacher: { include: { user: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.feedback.count({ where })
    ])

    res.json(apiResponse.paginated(feedback, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get pending feedback for review (school admin)
router.get('/pending', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const where: any = { status: 'PENDING' }

    if (req.user?.role !== 'ADMIN') {
      where.lesson = { course: { schoolId: req.user!.schoolId } }
    }

    const feedback = await prisma.feedback.findMany({
      where,
      include: {
        lesson: {
          select: { id: true, title: true, lessonNumber: true, course: { select: { id: true, name: true } } }
        },
        student: { include: { user: { select: { name: true, email: true } } } },
        teacher: { include: { user: { select: { name: true } } } }
      },
      orderBy: { createdAt: 'asc' }
    })

    res.json(apiResponse.success(feedback))
  } catch (error) {
    handleError(res, error)
  }
})

// Get feedback by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const feedback = await prisma.feedback.findUnique({
      where: { id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            lessonNumber: true,
            scheduledAt: true,
            course: { select: { id: true, name: true, schoolId: true } }
          }
        },
        student: { include: { user: { select: { id: true, name: true, email: true } } } },
        teacher: { include: { user: { select: { id: true, name: true } } } }
      }
    })

    if (!feedback) {
      return res.status(404).json(apiResponse.error('Feedback not found', 'NOT_FOUND'))
    }

    // Check access
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === feedback.lesson.course.schoolId ||
      req.user?.teacherId === feedback.teacherId ||
      (req.user?.studentId === feedback.studentId && feedback.status === 'SENT')

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(feedback))
  } catch (error) {
    handleError(res, error)
  }
})

// Create feedback (teacher)
router.post('/', authenticate, requireTeacher, validateRequest(createFeedbackSchema), async (req: Request, res: Response) => {
  try {
    const { lessonId, studentId, content, score } = req.body

    if (!req.user?.teacherId) {
      return res.status(403).json(apiResponse.error('Teacher profile required', 'FORBIDDEN'))
    }

    // Verify lesson exists and teacher is assigned
    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, deletedAt: null },
      include: { course: true }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    if (lesson.teacherId !== req.user.teacherId && req.user.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('Not assigned to this lesson', 'FORBIDDEN'))
    }

    // Verify student is enrolled
    const enrollment = await prisma.enrollment.findFirst({
      where: { studentId, courseId: lesson.courseId, status: { in: ['ACTIVE', 'COMPLETED'] } }
    })

    if (!enrollment) {
      return res.status(400).json(apiResponse.error('Student is not enrolled in this course', 'NOT_ENROLLED'))
    }

    // Check if feedback already exists
    const existing = await prisma.feedback.findUnique({
      where: { lessonId_studentId: { lessonId, studentId } }
    })

    if (existing) {
      return res.status(400).json(apiResponse.error('Feedback already exists for this student/lesson', 'FEEDBACK_EXISTS'))
    }

    const feedback = await prisma.feedback.create({
      data: {
        lessonId,
        studentId,
        teacherId: req.user.teacherId,
        content,
        score
      },
      include: {
        lesson: { select: { title: true } },
        student: { include: { user: { select: { name: true } } } }
      }
    })

    res.status(201).json(apiResponse.success(feedback, 'Feedback created successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Bulk create feedback for all students in a lesson
router.post('/lesson/:lessonId/bulk', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params
    const { feedbackItems } = req.body // Array of { studentId, content, score }

    if (!req.user?.teacherId) {
      return res.status(403).json(apiResponse.error('Teacher profile required', 'FORBIDDEN'))
    }

    if (!feedbackItems || !Array.isArray(feedbackItems) || feedbackItems.length === 0) {
      return res.status(400).json(apiResponse.error('Feedback items required', 'VALIDATION_ERROR'))
    }

    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, deletedAt: null }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    if (lesson.teacherId !== req.user.teacherId && req.user.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('Not assigned to this lesson', 'FORBIDDEN'))
    }

    // Validate each feedback item
    const schema = Joi.array().items(
      Joi.object({
        studentId: Joi.string().required(),
        content: Joi.string().min(10).max(5000).required(),
        score: Joi.number().integer().min(1).max(100).optional()
      })
    )

    const { error } = schema.validate(feedbackItems)
    if (error) {
      return res.status(400).json(apiResponse.error(error.message, 'VALIDATION_ERROR'))
    }

    // Get existing feedback to skip
    const existingFeedback = await prisma.feedback.findMany({
      where: { lessonId, studentId: { in: feedbackItems.map((f: any) => f.studentId) } },
      select: { studentId: true }
    })
    const existingStudentIds = existingFeedback.map(f => f.studentId)

    const newFeedback = feedbackItems.filter((f: any) => !existingStudentIds.includes(f.studentId))

    if (newFeedback.length === 0) {
      return res.status(400).json(apiResponse.error('Feedback already exists for all students', 'ALL_FEEDBACK_EXISTS'))
    }

    const created = await prisma.feedback.createMany({
      data: newFeedback.map((f: any) => ({
        lessonId,
        studentId: f.studentId,
        teacherId: req.user!.teacherId!,
        content: f.content,
        score: f.score
      }))
    })

    res.status(201).json(apiResponse.success({
      created: created.count,
      skipped: existingStudentIds.length
    }, `${created.count} feedback items created`))
  } catch (error) {
    handleError(res, error)
  }
})

// Update feedback (teacher)
router.put('/:id', authenticate, requireTeacher, validateRequest(updateFeedbackSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const feedback = await prisma.feedback.findUnique({
      where: { id }
    })

    if (!feedback) {
      return res.status(404).json(apiResponse.error('Feedback not found', 'NOT_FOUND'))
    }

    // Only the teacher who created it can update (or admin)
    if (feedback.teacherId !== req.user?.teacherId && req.user?.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('Not authorized to edit this feedback', 'FORBIDDEN'))
    }

    // Can't update if already sent
    if (feedback.status === 'SENT') {
      return res.status(400).json(apiResponse.error('Cannot edit feedback that has been sent', 'FEEDBACK_SENT'))
    }

    // Reset to pending if it was rejected
    const updateData: any = { ...req.body }
    if (feedback.status === 'NEEDS_REVISION' || feedback.status === 'REJECTED') {
      updateData.status = 'PENDING'
    }

    const updated = await prisma.feedback.update({
      where: { id },
      data: updateData,
      include: {
        student: { include: { user: { select: { name: true } } } }
      }
    })

    res.json(apiResponse.success(updated, 'Feedback updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Review feedback (school admin)
router.post('/:id/review', authenticate, requireSchoolAdmin, validateRequest(reviewFeedbackSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status, reviewNotes } = req.body

    const feedback = await prisma.feedback.findUnique({
      where: { id },
      include: { lesson: { include: { course: true } } }
    })

    if (!feedback) {
      return res.status(404).json(apiResponse.error('Feedback not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== feedback.lesson.course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (feedback.status === 'SENT') {
      return res.status(400).json(apiResponse.error('Cannot review feedback that has been sent', 'FEEDBACK_SENT'))
    }

    const updated = await prisma.feedback.update({
      where: { id },
      data: {
        status: status as FeedbackStatus,
        reviewNotes
      }
    })

    res.json(apiResponse.success(updated, `Feedback ${status.toLowerCase()}`))
  } catch (error) {
    handleError(res, error)
  }
})

// Send feedback to student
router.post('/:id/send', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const feedback = await prisma.feedback.findUnique({
      where: { id },
      include: {
        lesson: { include: { course: true } },
        student: { include: { user: true } }
      }
    })

    if (!feedback) {
      return res.status(404).json(apiResponse.error('Feedback not found', 'NOT_FOUND'))
    }

    if (feedback.status !== 'APPROVED') {
      return res.status(400).json(apiResponse.error('Only approved feedback can be sent', 'NOT_APPROVED'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== feedback.lesson.course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const updated = await prisma.feedback.update({
      where: { id },
      data: {
        status: 'SENT',
        sentAt: new Date()
      }
    })

    // TODO: Send notification to student

    res.json(apiResponse.success(updated, 'Feedback sent to student'))
  } catch (error) {
    handleError(res, error)
  }
})

// Bulk send approved feedback for a lesson
router.post('/lesson/:lessonId/send-all', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params

    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, deletedAt: null },
      include: { course: true }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== lesson.course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const result = await prisma.feedback.updateMany({
      where: { lessonId, status: 'APPROVED' },
      data: { status: 'SENT', sentAt: new Date() }
    })

    // Update lesson status
    if (result.count > 0) {
      await prisma.lesson.update({
        where: { id: lessonId },
        data: { status: 'FEEDBACK_SENT' }
      })
    }

    res.json(apiResponse.success({ sent: result.count }, `${result.count} feedback items sent`))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete feedback
router.delete('/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const feedback = await prisma.feedback.findUnique({
      where: { id }
    })

    if (!feedback) {
      return res.status(404).json(apiResponse.error('Feedback not found', 'NOT_FOUND'))
    }

    // Can't delete sent feedback
    if (feedback.status === 'SENT') {
      return res.status(400).json(apiResponse.error('Cannot delete feedback that has been sent', 'FEEDBACK_SENT'))
    }

    // Only the teacher who created it can delete (or admin)
    if (feedback.teacherId !== req.user?.teacherId && req.user?.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('Not authorized to delete this feedback', 'FORBIDDEN'))
    }

    await prisma.feedback.delete({ where: { id } })

    res.json(apiResponse.success(null, 'Feedback deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
