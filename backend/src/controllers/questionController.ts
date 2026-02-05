import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireTeacher, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'
import { QuestionStatus } from '@prisma/client'

const router = Router()

// Validation schemas
const createQuestionSchema = Joi.object({
  lessonId: Joi.string().required(),
  question: Joi.string().min(10).max(1000).required()
})

const updateQuestionSchema = Joi.object({
  question: Joi.string().min(10).max(1000).optional()
})

const reviewQuestionSchema = Joi.object({
  status: Joi.string().valid('APPROVED', 'NEEDS_REVISION', 'REJECTED').required(),
  reviewNotes: Joi.string().max(500).optional()
})

const bulkSubmitSchema = Joi.object({
  lessonId: Joi.string().required(),
  questions: Joi.array().items(Joi.string().min(10).max(1000)).min(1).max(10).required()
})

// Get all questions (filtered by access)
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      lessonId,
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
      // Students can only see approved questions for their enrolled courses
      where.status = 'APPROVED'
      where.lesson = {
        course: { enrollments: { some: { studentId: req.user.studentId, status: 'ACTIVE' } } }
      }
    }

    if (lessonId) where.lessonId = String(lessonId)
    if (teacherId) where.teacherId = String(teacherId)
    if (courseId) where.lesson = { ...where.lesson, courseId: String(courseId) }
    if (status && req.user?.role !== 'STUDENT') where.status = String(status)

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          lesson: {
            select: { id: true, title: true, lessonNumber: true, course: { select: { id: true, name: true } } }
          },
          teacher: { include: { user: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.question.count({ where })
    ])

    res.json(apiResponse.paginated(questions, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get pending questions for review (school admin)
router.get('/pending', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const where: any = { status: 'PENDING' }

    if (req.user?.role !== 'ADMIN') {
      where.lesson = { course: { schoolId: req.user!.schoolId } }
    }

    const questions = await prisma.question.findMany({
      where,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            lessonNumber: true,
            scheduledAt: true,
            course: { select: { id: true, name: true } }
          }
        },
        teacher: { include: { user: { select: { name: true } } } }
      },
      orderBy: { createdAt: 'asc' }
    })

    res.json(apiResponse.success(questions))
  } catch (error) {
    handleError(res, error)
  }
})

// Get questions for a lesson
router.get('/lesson/:lessonId', authenticate, async (req: Request, res: Response) => {
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
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === lesson.course.schoolId ||
      req.user?.teacherId === lesson.teacherId

    // Students can only see approved questions for enrolled courses
    if (req.user?.role === 'STUDENT') {
      const enrollment = await prisma.enrollment.findFirst({
        where: { studentId: req.user.studentId!, courseId: lesson.courseId, status: 'ACTIVE' }
      })
      if (!enrollment) {
        return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
      }
    } else if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const where: any = { lessonId }
    if (req.user?.role === 'STUDENT') {
      where.status = 'APPROVED'
    }

    const questions = await prisma.question.findMany({
      where,
      include: {
        teacher: { include: { user: { select: { name: true } } } }
      },
      orderBy: { createdAt: 'asc' }
    })

    res.json(apiResponse.success(questions))
  } catch (error) {
    handleError(res, error)
  }
})

// Get question by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const question = await prisma.question.findUnique({
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
        teacher: { include: { user: { select: { name: true } } } }
      }
    })

    if (!question) {
      return res.status(404).json(apiResponse.error('Question not found', 'NOT_FOUND'))
    }

    // Check access
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === question.lesson.course.schoolId ||
      req.user?.teacherId === question.teacherId

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(question))
  } catch (error) {
    handleError(res, error)
  }
})

// Create question (teacher)
router.post('/', authenticate, requireTeacher, validateRequest(createQuestionSchema), async (req: Request, res: Response) => {
  try {
    const { lessonId, question } = req.body

    if (!req.user?.teacherId) {
      return res.status(403).json(apiResponse.error('Teacher profile required', 'FORBIDDEN'))
    }

    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, deletedAt: null }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Verify teacher is assigned or is school admin
    if (lesson.teacherId !== req.user.teacherId && req.user.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('Not assigned to this lesson', 'FORBIDDEN'))
    }

    const created = await prisma.question.create({
      data: {
        lessonId,
        question,
        teacherId: req.user.teacherId
      },
      include: {
        lesson: { select: { title: true } }
      }
    })

    res.status(201).json(apiResponse.success(created, 'Question created successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Bulk submit questions for a lesson
router.post('/bulk', authenticate, requireTeacher, validateRequest(bulkSubmitSchema), async (req: Request, res: Response) => {
  try {
    const { lessonId, questions } = req.body

    if (!req.user?.teacherId) {
      return res.status(403).json(apiResponse.error('Teacher profile required', 'FORBIDDEN'))
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

    const created = await prisma.question.createMany({
      data: questions.map((q: string) => ({
        lessonId,
        question: q,
        teacherId: req.user!.teacherId!
      }))
    })

    // Update lesson status
    await prisma.lesson.update({
      where: { id: lessonId },
      data: { status: 'QUESTIONS_REQUESTED' }
    })

    res.status(201).json(apiResponse.success({ count: created.count }, `${created.count} questions submitted`))
  } catch (error) {
    handleError(res, error)
  }
})

// Update question (teacher)
router.put('/:id', authenticate, requireTeacher, validateRequest(updateQuestionSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const question = await prisma.question.findUnique({ where: { id } })

    if (!question) {
      return res.status(404).json(apiResponse.error('Question not found', 'NOT_FOUND'))
    }

    if (question.teacherId !== req.user?.teacherId && req.user?.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('Not authorized to edit this question', 'FORBIDDEN'))
    }

    if (question.status === 'APPROVED') {
      return res.status(400).json(apiResponse.error('Cannot edit approved question', 'QUESTION_APPROVED'))
    }

    // Reset to pending if it was rejected/needs revision
    const updateData: any = { ...req.body }
    if (question.status === 'NEEDS_REVISION' || question.status === 'REJECTED') {
      updateData.status = 'PENDING'
    }

    const updated = await prisma.question.update({
      where: { id },
      data: updateData
    })

    res.json(apiResponse.success(updated, 'Question updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Review question (school admin)
router.post('/:id/review', authenticate, requireSchoolAdmin, validateRequest(reviewQuestionSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status, reviewNotes } = req.body

    const question = await prisma.question.findUnique({
      where: { id },
      include: { lesson: { include: { course: true } } }
    })

    if (!question) {
      return res.status(404).json(apiResponse.error('Question not found', 'NOT_FOUND'))
    }

    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== question.lesson.course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const updated = await prisma.question.update({
      where: { id },
      data: {
        status: status as QuestionStatus,
        reviewNotes
      }
    })

    // Check if all questions for the lesson are approved
    const lessonQuestions = await prisma.question.findMany({
      where: { lessonId: question.lessonId }
    })
    const allApproved = lessonQuestions.every(q => q.status === 'APPROVED')

    if (allApproved && lessonQuestions.length > 0) {
      await prisma.lesson.update({
        where: { id: question.lessonId },
        data: { status: 'QUESTIONS_READY' }
      })
    }

    res.json(apiResponse.success(updated, `Question ${status.toLowerCase()}`))
  } catch (error) {
    handleError(res, error)
  }
})

// Bulk approve questions for a lesson
router.post('/lesson/:lessonId/approve-all', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params

    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, deletedAt: null },
      include: { course: true }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== lesson.course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const result = await prisma.question.updateMany({
      where: { lessonId, status: 'PENDING' },
      data: { status: 'APPROVED' }
    })

    // Update lesson status
    if (result.count > 0) {
      await prisma.lesson.update({
        where: { id: lessonId },
        data: { status: 'QUESTIONS_READY' }
      })
    }

    res.json(apiResponse.success({ approved: result.count }, `${result.count} questions approved`))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete question
router.delete('/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const question = await prisma.question.findUnique({ where: { id } })

    if (!question) {
      return res.status(404).json(apiResponse.error('Question not found', 'NOT_FOUND'))
    }

    if (question.teacherId !== req.user?.teacherId && req.user?.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('Not authorized to delete this question', 'FORBIDDEN'))
    }

    if (question.status === 'APPROVED') {
      return res.status(400).json(apiResponse.error('Cannot delete approved question', 'QUESTION_APPROVED'))
    }

    await prisma.question.delete({ where: { id } })

    res.json(apiResponse.success(null, 'Question deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get question statistics for dashboard
router.get('/stats/dashboard', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const where: any = {}
    if (req.user?.role !== 'ADMIN') {
      where.lesson = { course: { schoolId: req.user!.schoolId } }
    }

    const [total, pending, approved, needsRevision, rejected] = await Promise.all([
      prisma.question.count({ where }),
      prisma.question.count({ where: { ...where, status: 'PENDING' } }),
      prisma.question.count({ where: { ...where, status: 'APPROVED' } }),
      prisma.question.count({ where: { ...where, status: 'NEEDS_REVISION' } }),
      prisma.question.count({ where: { ...where, status: 'REJECTED' } })
    ])

    res.json(apiResponse.success({
      total,
      pending,
      approved,
      needsRevision,
      rejected,
      approvalRate: total > 0 ? Math.round((approved / total) * 100) : 0
    }))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
