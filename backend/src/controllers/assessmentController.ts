import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireAdmin, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { assessmentService } from '../services/AssessmentService'
import { certificateService } from '../services/CertificateService'
import { emailService } from '../services/EmailService'
import { PAGINATION } from '../utils/constants'

const router = Router()

// Validation schemas
const createAssessmentSchema = Joi.object({
  language: Joi.string().required(),
  type: Joi.string().valid('PLACEMENT', 'PROGRESS', 'FINAL').optional(),
  questionsLimit: Joi.number().integer().min(10).max(60).optional()
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
  passage: Joi.string().optional().allow(''),
  passageTitle: Joi.string().optional().allow(''),
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
      type: req.body.type,
      questionsLimit: req.body.questionsLimit
    })

    return res.status(201).json(apiResponse.success(assessment, 'Assessment started'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get assigned assessments for current student
router.get('/my/assigned', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can view assigned assessments', 'NOT_STUDENT'))
    }

    const assessments = await assessmentService.getAssignedAssessments(req.user.studentId)
    return res.json(apiResponse.success(assessments))
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

// Download assessment results as PDF
router.get('/:id/download-pdf', authenticate, async (req: Request, res: Response) => {
  try {
    const assessment = await assessmentService.getAssessment(req.params.id)

    // Verify access (student or school admin)
    if (req.user?.role === 'STUDENT' && assessment.studentId !== req.user.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (assessment.status !== 'COMPLETED') {
      return res.status(400).json(apiResponse.error('Assessment not yet completed', 'NOT_COMPLETED'))
    }

    const pdf = await certificateService.generateAssessmentResultPdf(req.params.id)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=${assessment.language}-placement-results.pdf`)
    return res.send(pdf)
  } catch (error) {
    return handleError(res, error)
  }
})

// Email assessment results
const emailResultsSchema = Joi.object({
  email: Joi.string().email().optional() // Optional: defaults to student's email
})

router.post('/:id/email-results', authenticate, validateRequest(emailResultsSchema), async (req: Request, res: Response) => {
  try {
    const assessment = await assessmentService.getAssessment(req.params.id)

    // Verify access
    if (req.user?.role === 'STUDENT' && assessment.studentId !== req.user.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (assessment.status !== 'COMPLETED') {
      return res.status(400).json(apiResponse.error('Assessment not yet completed', 'NOT_COMPLETED'))
    }

    if (!emailService.isConfigured()) {
      return res.status(503).json(apiResponse.error('Email service not configured. Set SMTP credentials in .env', 'EMAIL_NOT_CONFIGURED'))
    }

    const answers = (assessment.answers as any[]) || []
    const correctCount = answers.filter((a: any) => a.isCorrect).length

    const LEVEL_NAMES: Record<string, string> = {
      A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate',
      B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficiency'
    }
    const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

    // Build breakdown
    const levelBreakdown: Record<string, { correct: number; total: number; name: string }> = {}
    for (const answer of answers) {
      if (!levelBreakdown[answer.cefrLevel]) {
        levelBreakdown[answer.cefrLevel] = { correct: 0, total: 0, name: LEVEL_NAMES[answer.cefrLevel] || '' }
      }
      levelBreakdown[answer.cefrLevel].total++
      if (answer.isCorrect) levelBreakdown[answer.cefrLevel].correct++
    }

    // Generate PDF attachment
    const pdfBuffer = await certificateService.generateAssessmentResultPdf(req.params.id)

    const recipientEmail = req.body.email || (assessment as any).student?.user?.email
    if (!recipientEmail) {
      return res.status(400).json(apiResponse.error('No email address provided or found', 'NO_EMAIL'))
    }

    const cefrLevel = assessment.cefrLevel || 'A1'

    const result = await emailService.sendAssessmentResults({
      to: recipientEmail,
      studentName: (assessment as any).student?.user?.name || 'Student',
      language: assessment.language,
      cefrLevel,
      cefrName: LEVEL_NAMES[cefrLevel] || '',
      score: assessment.score || 0,
      totalQuestions: answers.length,
      correctAnswers: correctCount,
      levelBreakdown,
      pdfBuffer
    })

    return res.json(apiResponse.success({
      messageId: result.messageId,
      sentTo: recipientEmail
    }, 'Assessment results sent via email'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get detailed results (student views own, admin views any)
router.get('/:id/detailed-results', authenticate, async (req: Request, res: Response) => {
  try {
    const assessment = await assessmentService.getAssessment(req.params.id)

    // Students can only view their own
    if (req.user?.role === 'STUDENT' && assessment.studentId !== req.user.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const results = await assessmentService.getDetailedResults(req.params.id)

    // For students: hide correct answers for wrong questions (they see only their own answer + right/wrong)
    if (req.user?.role === 'STUDENT') {
      results.answers = results.answers.map(a => ({
        ...a,
        correctAnswer: a.isCorrect ? a.correctAnswer : a.correctAnswer // Students CAN see correct answers for learning
      }))
    }

    return res.json(apiResponse.success(results))
  } catch (error) {
    return handleError(res, error)
  }
})

// Start an assigned assessment
router.post('/:id/start', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can start assessments', 'NOT_STUDENT'))
    }

    const assessment = await assessmentService.startAssignedAssessment(req.params.id, req.user.studentId)
    return res.json(apiResponse.success(assessment, 'Assessment started'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Record a violation event
const violationSchema = Joi.object({
  type: Joi.string().required(),
  timestamp: Joi.string().required(),
  details: Joi.string().optional().allow('')
})

router.post('/:id/violation', authenticate, validateRequest(violationSchema), async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can report violations', 'NOT_STUDENT'))
    }

    await assessmentService.recordViolation(req.params.id, req.user.studentId, req.body)
    return res.json(apiResponse.success(null, 'Violation recorded'))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Admin Routes ====================

// Bulk assign assessments to students (admin/school)
const assignAssessmentSchema = Joi.object({
  studentIds: Joi.array().items(Joi.string()).min(1).required(),
  language: Joi.string().required(),
  type: Joi.string().valid('PLACEMENT', 'PROGRESS', 'FINAL').optional(),
  timeLimitMin: Joi.number().integer().min(10).max(180).optional(),
  questionsLimit: Joi.number().integer().min(10).max(60).optional()
})

router.post('/admin/assign', authenticate, requireSchoolAdmin, validateRequest(assignAssessmentSchema), async (req: Request, res: Response) => {
  try {
    const results = await assessmentService.assignAssessment({
      ...req.body,
      assignedById: req.user!.id
    })
    return res.json(apiResponse.success(results, 'Assessments assigned'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get a student's assessments (admin/school)
router.get('/admin/student/:studentId/assessments', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const assessments = await assessmentService.getStudentAssessmentsAdmin(req.params.studentId)
    return res.json(apiResponse.success(assessments))
  } catch (error) {
    return handleError(res, error)
  }
})

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

// Seed ALL question banks — English + Italian (admin)
router.post('/admin/seed-all-questions', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const result = await assessmentService.seedAllQuestions()
    return res.json(apiResponse.success(result, 'All question banks seeded'))
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
