import { Router, Request, Response } from 'express'
import Joi from 'joi'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireTeacher, requireAdmin, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { sectionAssessmentService } from '../services/SectionAssessmentService'
import { prisma } from '../config/database'
import { ttsService } from '../services/TtsService'
import { aiScoringService } from '../services/AiScoringService'
import { certificateService } from '../services/CertificateService'

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
  duration: Joi.number().integer().optional(),
  transcript: Joi.string().optional().allow('')
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

// ─── Assessment Settings (MUST be before /:id routes) ───

const DEFAULT_ASSESSMENT_SETTINGS = {
  allowPause: true, allowRetry: false, maxRetries: 1, showTimer: true,
  autoSubmitOnExpiry: true, blockTabSwitch: true, blockCopyPaste: true,
  requireFullscreen: false, warnOnLeave: true,
}

router.get('/settings', authenticate, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    if (!schoolId) {
      return res.json(apiResponse.success(DEFAULT_ASSESSMENT_SETTINGS))
    }
    const school = await prisma.school.findFirst({
      where: { id: schoolId, deletedAt: null },
      select: { assessmentSettings: true }
    })
    const settings = { ...DEFAULT_ASSESSMENT_SETTINGS, ...(school?.assessmentSettings as Record<string, any> || {}) }
    res.json(apiResponse.success(settings))
  } catch (error) {
    return handleError(res, error)
  }
})

router.put('/settings', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    if (!schoolId) {
      return res.status(400).json(apiResponse.error('No school found', 'NO_SCHOOL'))
    }
    const updated = await prisma.school.update({
      where: { id: schoolId },
      data: { assessmentSettings: req.body },
      select: { assessmentSettings: true }
    })
    res.json(apiResponse.success(updated.assessmentSettings, 'Assessment settings updated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Save pre-test form data (student info, needs, availability)
router.put('/:id/pre-test-data', authenticate, async (req: Request, res: Response) => {
  try {
    const assessment = await prisma.assessment.findUnique({ where: { id: req.params.id } })
    if (!assessment) {
      return res.status(404).json(apiResponse.error('Assessment not found', 'NOT_FOUND'))
    }
    const existing = (assessment.metadata as Record<string, any>) || {}
    await prisma.assessment.update({
      where: { id: req.params.id },
      data: { metadata: { ...existing, preTestData: req.body } }
    })
    return res.json(apiResponse.success(null, 'Pre-test data saved'))
  } catch (error) {
    return handleError(res, error)
  }
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
    // Verify student owns this assessment
    if (req.user?.role === 'STUDENT') {
      const assessment = await prisma.assessment.findFirst({
        where: { id: req.params.id, studentId: req.user.studentId }
      })
      if (!assessment) {
        return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
      }
    }

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
    // Verify student owns this assessment
    if (req.user?.role === 'STUDENT') {
      const assessment = await prisma.assessment.findFirst({
        where: { id: req.params.id, studentId: req.user.studentId }
      })
      if (!assessment) {
        return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
      }
    }

    const result = await sectionAssessmentService.completeSection(
      req.params.id,
      req.params.sectionId,
      req.body?.reason
    )
    return res.json(apiResponse.success(result, 'Section completed'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Skip a section (unanswered questions treated as null)
router.post('/:id/sections/:sectionId/skip', authenticate, async (req: Request, res: Response) => {
  try {
    if (req.user?.role === 'STUDENT') {
      const assessment = await prisma.assessment.findFirst({
        where: { id: req.params.id, studentId: req.user.studentId }
      })
      if (!assessment) {
        return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
      }
    }

    const result = await sectionAssessmentService.skipSection(
      req.params.id,
      req.params.sectionId
    )
    return res.json(apiResponse.success(result, 'Section skipped'))
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
      duration: req.body.duration,
      transcript: req.body.transcript
    })
    return res.json(apiResponse.success(result, 'Speaking response submitted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get multi-skill results
router.get('/:id/results', authenticate, async (req: Request, res: Response) => {
  try {
    // Ownership check: student who owns it, teacher, admin, or org admin for their org's students
    const assessment = await prisma.assessment.findUnique({
      where: { id: req.params.id },
      select: { studentId: true }
    })
    if (!assessment) {
      return res.status(404).json(apiResponse.error('Assessment not found', 'NOT_FOUND'))
    }
    const role = req.user?.role
    if (role !== 'ADMIN' && role !== 'TEACHER' && role !== 'ORG_ADMIN' && assessment.studentId !== req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Not authorized to view these results', 'FORBIDDEN'))
    }
    // For ORG_ADMIN: verify student belongs to their org
    if (role === 'ORG_ADMIN') {
      const orgAdmin = await prisma.orgAdmin.findFirst({ where: { userId: req.user!.id } })
      if (orgAdmin) {
        const student = await prisma.student.findFirst({
          where: { id: assessment.studentId, organizationId: orgAdmin.organizationId }
        })
        if (!student) {
          return res.status(403).json(apiResponse.error('Student does not belong to your organization', 'FORBIDDEN'))
        }
      }
    }

    const results = await sectionAssessmentService.getMultiSkillResults(req.params.id)

    // Students see CEFR levels but no scores, answers, or detailed breakdown
    const isStudent = role === 'STUDENT' || (!role && assessment.studentId === req.user?.studentId)
    if (isStudent) {
      const studentView = {
        assessment: {
          id: results.assessment.id,
          language: results.assessment.language,
          cefrLevel: results.assessment.cefrLevel,
          cefrSublevel: results.assessment.cefrSublevel,
          cefrName: results.assessment.cefrName,
          cefrSublevelName: results.assessment.cefrSublevelName,
          completedAt: results.assessment.completedAt,
          readingLevel: results.assessment.readingLevel,
          listeningLevel: results.assessment.listeningLevel,
          writingLevel: results.assessment.writingLevel,
          speakingLevel: results.assessment.speakingLevel,
        },
        student: results.student,
        sections: results.sections.map((s: any) => ({
          id: s.id,
          skill: s.skill,
          status: s.status,
          cefrLevel: s.cefrLevel,
          cefrSublevel: s.cefrSublevel,
          cefrName: s.cefrName,
          cefrSublevelName: s.cefrSublevelName,
          questionsAnswered: s.questionsAnswered,
          questionsTotal: s.questionsTotal,
        })),
        writingResponses: [],
        speakingResponses: [],
      }
      return res.json(apiResponse.success(studentView))
    }

    return res.json(apiResponse.success(results))
  } catch (error) {
    return handleError(res, error)
  }
})

// Pause an in-progress assessment
router.post('/:id/pause', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can pause assessments', 'NOT_STUDENT'))
    }
    const result = await sectionAssessmentService.pauseAssessment(req.params.id, req.user.studentId)
    return res.json(apiResponse.success(result, 'Assessment paused'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Resume a paused assessment
router.post('/:id/resume', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can resume assessments', 'NOT_STUDENT'))
    }
    const result = await sectionAssessmentService.resumeAssessment(req.params.id, req.user.studentId)
    return res.json(apiResponse.success(result, 'Assessment resumed'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Restart an assessment (abandon current, create fresh)
router.post('/:id/restart', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can restart assessments', 'NOT_STUDENT'))
    }
    const result = await sectionAssessmentService.restartAssessment(req.params.id, req.user.studentId)
    return res.json(apiResponse.success(result, 'Assessment restarted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Reset an in-progress section (student can redo it)
router.post('/:id/sections/:sectionId/reset', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can reset sections', 'NOT_STUDENT'))
    }
    const result = await sectionAssessmentService.resetSection(req.params.id, req.params.sectionId, req.user.studentId)
    return res.json(apiResponse.success(result, 'Section reset'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Request retry on a completed section (sends notification to admin)
router.post('/:id/sections/:sectionId/request-retry', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can request retries', 'NOT_STUDENT'))
    }
    const result = await sectionAssessmentService.requestSectionRetry(req.params.id, req.params.sectionId, req.user.studentId)
    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// Admin approves a section retry
router.post('/:id/sections/:sectionId/approve-retry', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const result = await sectionAssessmentService.approveSectionRetry(req.params.id, req.params.sectionId)
    return res.json(apiResponse.success(result))
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
    // Verify the section belongs to the specified assessment
    const section = await prisma.assessmentSection.findUnique({
      where: { id: req.params.sectionId },
      select: { assessmentId: true }
    })
    if (!section) {
      return res.status(404).json(apiResponse.error('Section not found', 'NOT_FOUND'))
    }
    if (section.assessmentId !== req.params.id) {
      return res.status(400).json(apiResponse.error('Section does not belong to this assessment', 'INVALID_SECTION'))
    }

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

// ==================== Admin Assessment Assignment Routes ====================

// Assign multi-skill assessment to students
const assignMultiSkillSchema = Joi.object({
  studentIds: Joi.array().items(Joi.string()).min(1).required(),
  language: Joi.string().required(),
  timeLimitMin: Joi.number().integer().min(10).max(300).optional(),
  fixedLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
})

router.post('/admin/assign', authenticate, requireSchoolAdmin, validateRequest(assignMultiSkillSchema), async (req: Request, res: Response) => {
  try {
    const { studentIds, language, timeLimitMin, fixedLevel } = req.body
    const assignedById = req.user!.id

    const results: any[] = []
    for (const studentId of studentIds) {
      try {
        const assessment = await sectionAssessmentService.createMultiSkillAssessment({
          studentId,
          language,
          assignedById,
          timeLimitMin,
          fixedLevel,
        })
        results.push(assessment)
      } catch (err: any) {
        results.push({ studentId, error: err.message })
      }
    }

    return res.status(201).json(apiResponse.success(results, `Assigned ${results.filter(r => !('error' in r)).length} assessments`))
  } catch (error) {
    return handleError(res, error)
  }
})

// List all multi-skill assessments for admin dashboard
router.get('/admin/assessments', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { language, status, studentId } = req.query

    const where: any = { isMultiSkill: true }
    if (language) where.language = language as string
    if (status) where.status = status as string
    if (studentId) where.studentId = studentId as string

    // Privacy: filter by school — teachers/admins only see their own school's students
    if (req.user?.schoolId) {
      where.student = { schoolId: req.user.schoolId }
    }

    const assessments = await prisma.assessment.findMany({
      where,
      include: {
        student: {
          include: { user: { select: { name: true, email: true } } }
        },
        sections: {
          orderBy: { orderIndex: 'asc' },
          select: {
            id: true,
            skill: true,
            status: true,
            cefrLevel: true,
            percentageScore: true
          }
        }
      },
      orderBy: { assignedAt: 'desc' }
    })

    return res.json(apiResponse.success(assessments))
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
    const file = (req as any).file as { filename: string; path: string; size: number; mimetype: string } | undefined
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
    let grammarQs: any[] = []
    let vocabularyQs: any[] = []
    let errorCorrectionQs: any[] = []
    let sentenceTransformationQs: any[] = []

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

    // Import new 4-section question banks (wrapped in try/catch for languages that don't have them yet)
    try {
      const grammar = await import(`../services/questionBanks/${langConfig.dir}/grammar`)
      grammarQs = grammar[`${langConfig.prefix}GrammarQuestions`] || []
    } catch { /* not available for this language */ }

    try {
      const vocabulary = await import(`../services/questionBanks/${langConfig.dir}/vocabulary`)
      vocabularyQs = vocabulary[`${langConfig.prefix}VocabularyQuestions`] || []
    } catch { /* not available for this language */ }

    try {
      const errorCorrection = await import(`../services/questionBanks/${langConfig.dir}/errorCorrection`)
      errorCorrectionQs = errorCorrection[`${langConfig.prefix}ErrorCorrectionQuestions`] || []
    } catch { /* not available for this language */ }

    try {
      const sentenceTransformation = await import(`../services/questionBanks/${langConfig.dir}/sentenceTransformation`)
      sentenceTransformationQs = sentenceTransformation[`${langConfig.prefix}SentenceTransformationQuestions`] || []
    } catch { /* not available for this language */ }

    const allQuestions = [
      ...readingQs, ...listeningQs, ...writingQs, ...speakingQs,
      ...grammarQs, ...vocabularyQs, ...errorCorrectionQs, ...sentenceTransformationQs
    ]

    // Delete existing and reseed to ensure all skills are covered
    await prisma.assessmentQuestion.deleteMany({
      where: { language, skill: { not: null } }
    })

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
        speaking: speakingQs.length,
        grammar: grammarQs.length,
        vocabulary: vocabularyQs.length,
        errorCorrection: errorCorrectionQs.length,
        sentenceTransformation: sentenceTransformationQs.length
      }
    }))
  } catch (error) {
    return handleError(res, error)
  }
})

// Admin: Download test questions as PDF (full language or specific skill)
router.get('/admin/test-pdf', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { language, skill } = req.query
    if (!language) {
      return res.status(400).json(apiResponse.error('Language is required', 'VALIDATION_ERROR'))
    }

    const where: any = {
      language: language as string,
      isActive: true,
      skill: { not: null },
    }
    if (skill) {
      where.skill = skill as string
    }

    const questions = await prisma.assessmentQuestion.findMany({
      where,
      orderBy: [{ skill: 'asc' }, { cefrLevel: 'asc' }, { orderIndex: 'asc' }],
    })

    if (questions.length === 0) {
      return res.status(404).json(apiResponse.error('No questions found', 'NOT_FOUND'))
    }

    const PDFDocument = (await import('pdfkit')).default
    const doc = new PDFDocument({ size: 'A4', margin: 50 })

    const chunks: Buffer[] = []
    doc.on('data', (chunk: Buffer) => chunks.push(chunk))
    doc.on('end', () => {
      const buf = Buffer.concat(chunks)
      const skillLabel = skill ? ` - ${skill}` : ''
      const filename = `${language}-test-questions${skillLabel}.pdf`.replace(/\s+/g, '-')
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
      res.send(buf)
    })

    // Title page
    doc.fontSize(24).font('Helvetica-Bold').text(`${language} Placement Test`, { align: 'center' })
    doc.moveDown(0.5)
    if (skill) {
      doc.fontSize(16).font('Helvetica').text(`${skill} Section`, { align: 'center' })
    } else {
      doc.fontSize(14).font('Helvetica').text('All Sections', { align: 'center' })
    }
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor('#888888').text(`${questions.length} questions`, { align: 'center' })
    doc.moveDown(0.3)
    doc.fontSize(10).text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, { align: 'center' })
    doc.fillColor('#000000')
    doc.moveDown(2)

    // Group by skill
    const grouped: Record<string, typeof questions> = {}
    for (const q of questions) {
      const s = q.skill || 'OTHER'
      if (!grouped[s]) grouped[s] = []
      grouped[s].push(q)
    }

    const skillOrder = ['READING', 'GRAMMAR', 'VOCABULARY', 'ERROR_CORRECTION', 'SENTENCE_TRANSFORMATION', 'LISTENING', 'WRITING', 'SPEAKING']
    const orderedSkills = skillOrder.filter(s => grouped[s])

    for (const currentSkill of orderedSkills) {
      const skillQuestions = grouped[currentSkill]

      // Section header
      doc.addPage()
      doc.fontSize(18).font('Helvetica-Bold').text(currentSkill.replace(/_/g, ' '), { align: 'left' })
      doc.moveDown(0.3)
      doc.fontSize(10).font('Helvetica').fillColor('#666666').text(`${skillQuestions.length} questions`)
      doc.fillColor('#000000')
      doc.moveDown(0.5)
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke('#cccccc')
      doc.moveDown(0.5)

      // Group by CEFR level within skill
      const byLevel: Record<string, typeof questions> = {}
      for (const q of skillQuestions) {
        const lv = q.cefrLevel || 'Unknown'
        if (!byLevel[lv]) byLevel[lv] = []
        byLevel[lv].push(q)
      }

      const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
      for (const level of levelOrder) {
        if (!byLevel[level]) continue
        const levelQs = byLevel[level]

        doc.fontSize(12).font('Helvetica-Bold').fillColor('#333333').text(`Level ${level}`, { underline: true })
        doc.fillColor('#000000')
        doc.moveDown(0.3)

        for (let i = 0; i < levelQs.length; i++) {
          const q = levelQs[i]

          // Check if we need a new page
          if (doc.y > 700) doc.addPage()

          doc.fontSize(10).font('Helvetica-Bold').text(`Q${i + 1}. ${q.questionText}`)

          if (q.passage) {
            doc.moveDown(0.2)
            doc.fontSize(9).font('Helvetica-Oblique').fillColor('#444444')
            const passageText = q.passage.length > 300 ? q.passage.substring(0, 300) + '...' : q.passage
            doc.text(passageText, { indent: 10 })
            doc.fillColor('#000000')
          }

          if (q.options && Array.isArray(q.options)) {
            doc.moveDown(0.2)
            const opts = q.options as Array<{ label: string; value: string }>
            for (const opt of opts) {
              doc.fontSize(9).font('Helvetica').text(`   ${opt.label}`, { indent: 15 })
            }
          }

          if (q.speakingPrompt) {
            doc.moveDown(0.2)
            doc.fontSize(9).font('Helvetica-Oblique').text(`Prompt: ${q.speakingPrompt}`, { indent: 10 })
          }

          // Answer
          doc.moveDown(0.2)
          doc.fontSize(8).font('Helvetica').fillColor('#008800')
          doc.text(`Answer: ${q.correctAnswer || '(open response)'}`, { indent: 10 })
          doc.fillColor('#000000')
          doc.moveDown(0.5)
        }

        doc.moveDown(0.3)
      }
    }

    doc.end()
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

    // Allow student who owns it, admin, teacher, or org admin
    const studentId = (req as any).user?.studentId
    const role = (req as any).user?.role
    if (role !== 'ADMIN' && role !== 'TEACHER' && role !== 'ORG_ADMIN' && assessment.studentId !== studentId) {
      return res.status(403).json(apiResponse.error('Not authorized', 'FORBIDDEN'))
    }

    const detailed = req.query.detailed === 'true'
    const pdfBuffer = await certificateService.generateMultiSkillResultPdf(id, detailed)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${assessment.language}-placement-results${detailed ? '-detailed' : ''}.pdf"`)
    res.send(pdfBuffer)
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
