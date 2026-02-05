import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireAdmin, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { assessmentService } from '../services/AssessmentService'
import { PAGINATION } from '../utils/constants'

const router = Router()

// Validation schemas
const createAssessmentSchema = Joi.object({
  language: Joi.string().required(),
  type: Joi.string().valid('PLACEMENT', 'PROGRESS', 'FINAL').optional()
})

const submitAnswerSchema = Joi.object({
  questionId: Joi.string().required(),
  answer: Joi.string().required()
})

const createQuestionSchema = Joi.object({
  language: Joi.string().required(),
  cefrLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').required(),
  questionType: Joi.string().valid('MULTIPLE_CHOICE', 'FILL_BLANK', 'LISTENING', 'READING', 'WRITING').required(),
  questionText: Joi.string().required(),
  options: Joi.array().items(Joi.object({
    label: Joi.string().required(),
    value: Joi.string().required()
  })).optional(),
  correctAnswer: Joi.string().required(),
  audioUrl: Joi.string().uri().optional(),
  imageUrl: Joi.string().uri().optional(),
  points: Joi.number().integer().min(1).optional(),
  orderIndex: Joi.number().integer().min(0).optional()
})

// Start a new assessment (students)
router.post('/', authenticate, validateRequest(createAssessmentSchema), async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can take assessments', 'NOT_STUDENT'))
    }

    const assessment = await assessmentService.createAssessment({
      studentId: req.user.studentId,
      language: req.body.language,
      type: req.body.type
    })

    return res.status(201).json(apiResponse.success(assessment, 'Assessment started'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student's assessments
router.get('/my', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can view their assessments', 'NOT_STUDENT'))
    }

    const assessments = await assessmentService.getStudentAssessments(req.user.studentId)
    return res.json(apiResponse.success(assessments))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get assessment by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const assessment = await assessmentService.getAssessment(req.params.id)

    // Verify access
    if (req.user?.role === 'STUDENT' && assessment.studentId !== req.user.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    return res.json(apiResponse.success(assessment))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get next question for assessment
router.get('/:id/next-question', authenticate, async (req: Request, res: Response) => {
  try {
    const assessment = await assessmentService.getAssessment(req.params.id)

    // Verify this is the student's assessment
    if (assessment.studentId !== req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const result = await assessmentService.getNextQuestion(req.params.id)
    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// Submit an answer
router.post('/:id/answer', authenticate, validateRequest(submitAnswerSchema), async (req: Request, res: Response) => {
  try {
    const assessment = await assessmentService.getAssessment(req.params.id)

    // Verify this is the student's assessment
    if (assessment.studentId !== req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const result = await assessmentService.submitAnswer({
      assessmentId: req.params.id,
      questionId: req.body.questionId,
      answer: req.body.answer
    })

    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// Complete assessment and get results
router.post('/:id/complete', authenticate, async (req: Request, res: Response) => {
  try {
    const assessment = await assessmentService.getAssessment(req.params.id)

    // Verify this is the student's assessment
    if (assessment.studentId !== req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const result = await assessmentService.completeAssessment(req.params.id)
    return res.json(apiResponse.success(result, 'Assessment completed'))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Admin Routes ====================

// Get all questions (admin)
router.get('/admin/questions', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { language, cefrLevel } = req.query
    const questions = await assessmentService.getAllQuestions(
      language as string,
      cefrLevel as string
    )
    return res.json(apiResponse.success(questions))
  } catch (error) {
    return handleError(res, error)
  }
})

// Create a question (admin)
router.post('/admin/questions', authenticate, requireAdmin, validateRequest(createQuestionSchema), async (req: Request, res: Response) => {
  try {
    const question = await assessmentService.createQuestion(req.body)
    return res.status(201).json(apiResponse.success(question, 'Question created'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Seed English questions (admin)
router.post('/admin/seed-questions', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const result = await assessmentService.seedEnglishQuestions()
    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
