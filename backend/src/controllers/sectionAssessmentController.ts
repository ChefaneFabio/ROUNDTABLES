import { Router, Request, Response } from 'express'
import Joi from 'joi'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireTeacher, requireAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { sectionAssessmentService } from '../services/SectionAssessmentService'
import { ttsService } from '../services/TtsService'
import { aiScoringService } from '../services/AiScoringService'
import { certificateService } from '../services/CertificateService'
import { prisma } from '../config/database'

const router = Router()

// Configure multer for audio uploads
const uploadsDir = path.join(__dirname, '../../uploads/speaking')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const audioStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, `speaking-${uniqueSuffix}${path.extname(file.originalname) || '.webm'}`)
  }
})

const audioUpload = multer({
  storage: audioStorage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ['audio/webm', 'audio/ogg', 'audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/mp4']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid audio format'))
    }
  }
})

// Validation schemas
const createMultiSkillSchema = Joi.object({
  language: Joi.string().required()
})

const submitAnswerSchema = Joi.object({
  questionId: Joi.string().required(),
  answer: Joi.string().required()
})

const submitWritingSchema = Joi.object({
  questionId: Joi.string().required(),
  responseText: Joi.string().min(1).required()
})

const submitSpeakingSchema = Joi.object({
  questionId: Joi.string().required(),
  audioUrl: Joi.string().required(),
  duration: Joi.number().integer().optional()
})

const teacherScoreSchema = Joi.object({
  grammar: Joi.number().min(0).max(100).optional(),
  coherence: Joi.number().min(0).max(100).optional(),
  vocabulary: Joi.number().min(0).max(100).optional(),
  spelling: Joi.number().min(0).max(100).optional(),
  taskAchievement: Joi.number().min(0).max(100).optional(),
  pronunciation: Joi.number().min(0).max(100).optional(),
  fluency: Joi.number().min(0).max(100).optional(),
  overall: Joi.number().min(0).max(100).required(),
  cefrLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').required(),
  feedback: Joi.string().optional().allow('')
})

// ==================== Student Routes ====================

// Create a multi-skill assessment
router.post('/', authenticate, validateRequest(createMultiSkillSchema), async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can take assessments', 'NOT_STUDENT'))
    }

    const assessment = await sectionAssessmentService.createMultiSkillAssessment({
      studentId: req.user.studentId,
      language: req.body.language
    })

    return res.status(201).json(apiResponse.success(assessment, 'Multi-skill assessment created'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get all sections for an assessment
router.get('/:id/sections', authenticate, async (req: Request, res: Response) => {
  try {
    const sections = await sectionAssessmentService.getSections(req.params.id)
    return res.json(apiResponse.success(sections))
  } catch (error) {
    return handleError(res, error)
  }
})

// Start a section
router.post('/:id/sections/:sectionId/start', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can start sections', 'NOT_STUDENT'))
    }

    const section = await sectionAssessmentService.startSection(
      req.params.id,
      req.params.sectionId,
      req.user.studentId
    )
    return res.json(apiResponse.success(section, 'Section started'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get next question for a section
router.get('/:id/sections/:sectionId/next-question', authenticate, async (req: Request, res: Response) => {
  try {
    const result = await sectionAssessmentService.getNextSectionQuestion(
      req.params.id,
      req.params.sectionId
    )
    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// Submit answer for a section question
router.post('/:id/sections/:sectionId/answer', authenticate, validateRequest(submitAnswerSchema), async (req: Request, res: Response) => {
  try {
    const result = await sectionAssessmentService.submitSectionAnswer({
      assessmentId: req.params.id,
      sectionId: req.params.sectionId,
      questionId: req.body.questionId,
      answer: req.body.answer
    })
    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// Complete a section
router.post('/:id/sections/:sectionId/complete', authenticate, async (req: Request, res: Response) => {
  try {
    const result = await sectionAssessmentService.completeSection(
      req.params.id,
      req.params.sectionId
    )
    return res.json(apiResponse.success(result, 'Section completed'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Submit writing response
router.post('/:id/sections/:sectionId/writing', authenticate, validateRequest(submitWritingSchema), async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can submit writing', 'NOT_STUDENT'))
    }

    const result = await sectionAssessmentService.submitWritingResponse({
      assessmentId: req.params.id,
      sectionId: req.params.sectionId,
      questionId: req.body.questionId,
      studentId: req.user.studentId,
      responseText: req.body.responseText
    })
    return res.json(apiResponse.success(result, 'Writing response submitted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Submit speaking response
router.post('/:id/sections/:sectionId/speaking', authenticate, validateRequest(submitSpeakingSchema), async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can submit speaking', 'NOT_STUDENT'))
    }

    const result = await sectionAssessmentService.submitSpeakingResponse({
      assessmentId: req.params.id,
      sectionId: req.params.sectionId,
      questionId: req.body.questionId,
      studentId: req.user.studentId,
      audioUrl: req.body.audioUrl,
      duration: req.body.duration
    })
    return res.json(apiResponse.success(result, 'Speaking response submitted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get multi-skill results
router.get('/:id/results', authenticate, async (req: Request, res: Response) => {
  try {
    const results = await sectionAssessmentService.getMultiSkillResults(req.params.id)
    return res.json(apiResponse.success(results))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Teacher/Admin Routes ====================

// Get sections pending teacher review
router.get('/admin/pending-review', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const sections = await sectionAssessmentService.getSectionsForReview()
    return res.json(apiResponse.success(sections))
  } catch (error) {
    return handleError(res, error)
  }
})

// Submit teacher score for a section
router.post('/:id/sections/:sectionId/teacher-score', authenticate, requireTeacher, validateRequest(teacherScoreSchema), async (req: Request, res: Response) => {
  try {
    const result = await sectionAssessmentService.submitTeacherScore({
      sectionId: req.params.sectionId,
      teacherUserId: req.user!.id,
      score: req.body
    })
    return res.json(apiResponse.success(result, 'Teacher score saved'))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Question Bank Admin Routes ====================

// Get question bank summary (aggregated counts)
router.get('/admin/question-bank/summary', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const summary = await sectionAssessmentService.getQuestionBankSummary()
    return res.json(apiResponse.success(summary))
  } catch (error) {
    return handleError(res, error)
  }
})

// List questions with filters + pagination
router.get('/admin/question-bank', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { language, skill, cefrLevel, search, page, limit } = req.query
    const result = await sectionAssessmentService.getQuestionBank({
      language: language as string,
      skill: skill as string,
      cefrLevel: cefrLevel as string,
      search: search as string,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined
    })
    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get single question detail
router.get('/admin/question-bank/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const question = await sectionAssessmentService.getQuestionById(req.params.id)
    return res.json(apiResponse.success(question))
  } catch (error) {
    return handleError(res, error)
  }
})

// Create question
router.post('/admin/question-bank', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const question = await sectionAssessmentService.createMultiSkillQuestion(req.body)
    return res.status(201).json(apiResponse.success(question, 'Question created'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Update question
router.put('/admin/question-bank/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const question = await sectionAssessmentService.updateQuestion(req.params.id, req.body)
    return res.json(apiResponse.success(question, 'Question updated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Delete question (soft-delete)
router.delete('/admin/question-bank/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    await sectionAssessmentService.deleteQuestion(req.params.id)
    return res.json(apiResponse.success(null, 'Question deleted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== TTS & Audio Routes ====================

// Get TTS audio for a question (generates on demand)
router.get('/tts/:questionId', authenticate, async (req: Request, res: Response) => {
  try {
    const question = await prisma.assessmentQuestion.findUnique({
      where: { id: req.params.questionId }
    })

    if (!question) {
      return res.status(404).json(apiResponse.error('Question not found', 'NOT_FOUND'))
    }

    if (!question.ttsScript) {
      return res.status(400).json(apiResponse.error('No TTS script for this question', 'NO_TTS'))
    }

    if (!ttsService.isConfigured()) {
      // Return the script text for client-side TTS fallback
      return res.json(apiResponse.success({
        audioUrl: null,
        ttsScript: question.ttsScript,
        fallback: true
      }))
    }

    const audioUrl = await ttsService.getAudioUrl(
      question.id,
      question.ttsScript,
      question.language,
      question.cefrLevel
    )

    return res.json(apiResponse.success({ audioUrl, ttsScript: question.ttsScript, fallback: !audioUrl }))
  } catch (error) {
    return handleError(res, error)
  }
})

// Upload audio for speaking response
router.post('/upload-audio', authenticate, audioUpload.single('audio'), async (req: Request, res: Response) => {
  try {
    const file = (req as any).file as Express.Multer.File | undefined
    if (!file) {
      return res.status(400).json(apiResponse.error('No audio file uploaded', 'NO_FILE'))
    }

    const audioUrl = `/uploads/speaking/${file.filename}`
    return res.json(apiResponse.success({ audioUrl, filename: file.filename }))
  } catch (error) {
    return handleError(res, error)
  }
})

// Trigger AI scoring for a completed section
router.post('/:id/sections/:sectionId/ai-score', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    if (!aiScoringService.isConfigured()) {
      return res.status(503).json(apiResponse.error('AI scoring service not configured', 'AI_NOT_CONFIGURED'))
    }

    const results = await aiScoringService.scoreSectionResponses(req.params.sectionId)
    return res.json(apiResponse.success(results, 'AI scoring completed'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Admin: Seed multi-skill questions for a language
router.post('/admin/seed-multi-skill', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { language } = req.body
    if (!language) {
      return res.status(400).json(apiResponse.error('Language is required', 'VALIDATION_ERROR'))
    }

    // Import question banks dynamically
    let readingQs: any[] = []
    let listeningQs: any[] = []
    let writingQs: any[] = []
    let speakingQs: any[] = []

    const langMap: Record<string, { dir: string; prefix: string }> = {
      English: { dir: 'english', prefix: 'english' },
      Spanish: { dir: 'spanish', prefix: 'spanish' },
      French: { dir: 'french', prefix: 'french' },
      German: { dir: 'german', prefix: 'german' },
      Italian: { dir: 'italian', prefix: 'italian' },
    }

    const langConfig = langMap[language]
    if (!langConfig) {
      return res.status(400).json(apiResponse.error(`Multi-skill questions not yet available for ${language}`, 'NOT_AVAILABLE'))
    }

    const reading = await import(`../services/questionBanks/${langConfig.dir}/reading`)
    const listening = await import(`../services/questionBanks/${langConfig.dir}/listening`)
    const writing = await import(`../services/questionBanks/${langConfig.dir}/writing`)
    const speaking = await import(`../services/questionBanks/${langConfig.dir}/speaking`)

    readingQs = reading[`${langConfig.prefix}ReadingQuestions`]
    listeningQs = listening[`${langConfig.prefix}ListeningQuestions`]
    writingQs = writing[`${langConfig.prefix}WritingQuestions`]
    speakingQs = speaking[`${langConfig.prefix}SpeakingQuestions`]

    const allQuestions = [...readingQs, ...listeningQs, ...writingQs, ...speakingQs]

    // Check if already seeded
    const existingCount = await prisma.assessmentQuestion.count({
      where: { language, skill: { not: null } }
    })

    if (existingCount > 0) {
      return res.json(apiResponse.success({ message: `Multi-skill ${language} questions already exist`, count: existingCount }))
    }

    await prisma.assessmentQuestion.createMany({
      data: allQuestions.map(q => ({
        language: q.language,
        cefrLevel: q.cefrLevel,
        questionType: q.questionType as any,
        questionText: q.questionText,
        options: q.options || undefined,
        correctAnswer: q.correctAnswer || '',
        passage: q.passage,
        passageTitle: q.passageTitle,
        points: q.points,
        orderIndex: q.orderIndex,
        skill: q.skill as any,
        ttsScript: q.ttsScript,
        ttsLanguageCode: q.ttsLanguageCode,
        speakingPrompt: q.speakingPrompt,
        rubric: q.rubric || undefined,
        tags: q.tags || [],
        timeSuggested: q.timeSuggested
      }))
    })

    return res.json(apiResponse.success({
      message: `Multi-skill ${language} questions seeded successfully`,
      count: allQuestions.length,
      breakdown: {
        reading: readingQs.length,
        listening: listeningQs.length,
        writing: writingQs.length,
        speaking: speakingQs.length
      }
    }))
  } catch (error) {
    return handleError(res, error)
  }
})

// Download multi-skill results as PDF
router.get('/:id/results/pdf', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const assessment = await prisma.assessment.findUnique({
      where: { id },
      select: { studentId: true, language: true, status: true }
    })

    if (!assessment) return res.status(404).json(apiResponse.error('Assessment not found', 'NOT_FOUND'))
    if (assessment.status !== 'COMPLETED') return res.status(400).json(apiResponse.error('Assessment not yet completed', 'NOT_COMPLETED'))

    // Allow student who owns it or admin
    const studentId = (req as any).user?.studentId
    const role = (req as any).user?.role
    if (role !== 'ADMIN' && assessment.studentId !== studentId) {
      return res.status(403).json(apiResponse.error('Not authorized', 'FORBIDDEN'))
    }

    const pdfBuffer = await certificateService.generateMultiSkillResultPdf(id)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${assessment.language}-4skills-results.pdf"`)
    res.send(pdfBuffer)
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
