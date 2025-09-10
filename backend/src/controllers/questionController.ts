import { Router, Request, Response } from 'express'
import { PrismaClient, QuestionStatus } from '@prisma/client'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { QuestionService } from '../services/QuestionService'

const router = Router()
const prisma = new PrismaClient()
const questionService = new QuestionService()

// Validation schemas
const submitQuestionsSchema = Joi.object({
  questions: Joi.array().items(
    Joi.string().min(10).max(500).required()
  ).length(3).required(),
  trainerId: Joi.string().required(),
  sessionId: Joi.string().required()
})

const reviewQuestionsSchema = Joi.object({
  reviews: Joi.array().items(
    Joi.object({
      questionId: Joi.string().required(),
      status: Joi.string().valid('APPROVED', 'NEEDS_REVISION', 'REJECTED').required(),
      reviewNotes: Joi.string().optional().max(200)
    })
  ).min(1).required(),
  reviewerId: Joi.string().required()
})

// Get questions for a specific session
router.get('/session/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params

    const data = await questionService.getQuestionsForSession(sessionId)

    res.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching session questions:', error)
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
})

// Submit questions for a session (trainer endpoint)
router.post('/submit', validateRequest(submitQuestionsSchema), async (req: Request, res: Response) => {
  try {
    const { questions, trainerId, sessionId } = req.body

    const result = await questionService.submitQuestionsForSession({
      questions,
      trainerId,
      sessionId
    })

    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Error submitting questions:', error)
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
})

// Review questions (coordinator endpoint)
router.post('/review', validateRequest(reviewQuestionsSchema), async (req: Request, res: Response) => {
  try {
    const { reviews, reviewerId } = req.body

    const results = await questionService.reviewQuestions(reviews, reviewerId)

    res.json({ success: true, data: results })
  } catch (error) {
    console.error('Error reviewing questions:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get all pending questions for review
router.get('/pending', async (req: Request, res: Response) => {
  try {
    const pendingQuestions = await questionService.getPendingQuestions()

    res.json({ success: true, data: pendingQuestions })
  } catch (error) {
    console.error('Error fetching pending questions:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get questions dashboard statistics
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const dashboard = await questionService.getQuestionsDashboard()

    res.json({ success: true, data: dashboard })
  } catch (error) {
    console.error('Error fetching questions dashboard:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get questions by trainer
router.get('/trainer/:trainerId', async (req: Request, res: Response) => {
  try {
    const { trainerId } = req.params
    const { status } = req.query

    const where: any = {
      trainerId,
      scheduledAt: { gte: new Date() } // Only upcoming sessions
    }

    if (status) {
      where.status = status
    }

    const sessions = await prisma.session.findMany({
      where,
      include: {
        questions: {
          orderBy: { createdAt: 'asc' }
        },
        roundtable: {
          select: {
            name: true,
            client: { select: { name: true, company: true } }
          }
        },
        topic: { select: { title: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    })

    const sessionsWithQuestionStatus = sessions.map(session => ({
      id: session.id,
      sessionNumber: session.sessionNumber,
      scheduledAt: session.scheduledAt,
      status: session.status,
      roundtable: session.roundtable,
      topic: session.topic,
      questions: session.questions,
      questionsCount: session.questions.length,
      questionsStatus: {
        total: session.questions.length,
        approved: session.questions.filter(q => q.status === 'APPROVED').length,
        pending: session.questions.filter(q => q.status === 'PENDING').length,
        needsRevision: session.questions.filter(q => q.status === 'NEEDS_REVISION').length,
        rejected: session.questions.filter(q => q.status === 'REJECTED').length
      },
      canSubmit: session.questions.length === 0 || session.questions.some(q => q.status === 'NEEDS_REVISION'),
      needsAction: session.questions.some(q => q.status === 'NEEDS_REVISION') || session.questions.length === 0
    }))

    res.json({ success: true, data: sessionsWithQuestionStatus })
  } catch (error) {
    console.error('Error fetching trainer questions:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Update individual question
router.patch('/:questionId', async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params
    const { question, status, reviewNotes } = req.body

    const updates: any = {}
    if (question) updates.question = question
    if (status) updates.status = status
    if (reviewNotes !== undefined) updates.reviewNotes = reviewNotes

    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: {
        ...updates,
        updatedAt: new Date()
      },
      include: {
        session: {
          select: {
            id: true,
            sessionNumber: true,
            trainer: { select: { name: true } },
            roundtable: {
              select: { name: true, client: { select: { name: true } } }
            }
          }
        }
      }
    })

    res.json({ success: true, data: updatedQuestion })
  } catch (error) {
    console.error('Error updating question:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Delete question
router.delete('/:questionId', async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        session: { select: { trainerId: true, status: true } }
      }
    })

    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found' })
    }

    // Only allow deletion if questions are not yet approved
    if (question.status === 'APPROVED') {
      return res.status(400).json({ 
        success: false, 
        error: 'Cannot delete approved questions' 
      })
    }

    await prisma.question.delete({
      where: { id: questionId }
    })

    res.json({ success: true, message: 'Question deleted successfully' })
  } catch (error) {
    console.error('Error deleting question:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Bulk approve questions for a session
router.post('/session/:sessionId/approve-all', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const { reviewerId } = req.body

    const questions = await prisma.question.findMany({
      where: { sessionId, status: 'PENDING' }
    })

    if (questions.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No pending questions found for this session' 
      })
    }

    const reviews = questions.map(q => ({
      questionId: q.id,
      status: 'APPROVED' as QuestionStatus,
      reviewNotes: 'Bulk approved'
    }))

    const results = await questionService.reviewQuestions(reviews, reviewerId)

    res.json({ success: true, data: results })
  } catch (error) {
    console.error('Error bulk approving questions:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get questions by status
router.get('/status/:status', async (req: Request, res: Response) => {
  try {
    const { status } = req.params
    const { page = 1, limit = 10 } = req.query

    const skip = (Number(page) - 1) * Number(limit)

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where: { status: status as QuestionStatus },
        skip,
        take: Number(limit),
        include: {
          session: {
            include: {
              trainer: { select: { name: true, email: true } },
              roundtable: {
                select: {
                  name: true,
                  client: { select: { name: true, company: true } }
                }
              },
              topic: { select: { title: true } }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.question.count({ where: { status: status as QuestionStatus } })
    ])

    res.json({
      success: true,
      data: questions,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching questions by status:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router