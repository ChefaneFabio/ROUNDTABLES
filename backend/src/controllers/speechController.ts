import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { apiResponse, handleError } from '../utils/apiResponse'
import { speechService } from '../services/SpeechService'

const router = Router()

// Validation schemas
const analyzeSchema = Joi.object({
  targetText: Joi.string().required().max(1000),
  recognizedText: Joi.string().required().max(1000),
  language: Joi.string().required(),
  cefrLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
  chatSessionId: Joi.string().optional(),
  duration: Joi.number().integer().min(0).optional(),
  audioUrl: Joi.string().uri().optional()
})

const saveSessionSchema = Joi.object({
  language: Joi.string().required(),
  cefrLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
  targetText: Joi.string().max(1000).optional(),
  recognizedText: Joi.string().max(1000).optional(),
  accuracyScore: Joi.number().integer().min(0).max(100).optional(),
  fluencyScore: Joi.number().integer().min(0).max(100).optional(),
  feedback: Joi.object().optional(),
  audioUrl: Joi.string().uri().optional(),
  duration: Joi.number().integer().min(0).optional(),
  chatSessionId: Joi.string().optional()
})

// Analyze pronunciation
router.post('/analyze', authenticate, validateRequest(analyzeSchema), async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const result = await speechService.analyzePronunciation({
      studentId,
      targetText: req.body.targetText,
      recognizedText: req.body.recognizedText,
      language: req.body.language,
      cefrLevel: req.body.cefrLevel,
      chatSessionId: req.body.chatSessionId,
      duration: req.body.duration,
      audioUrl: req.body.audioUrl
    })

    return res.json(apiResponse.success(result, 'Pronunciation analyzed'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Save speaking session
router.post('/session', authenticate, validateRequest(saveSessionSchema), async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const session = await speechService.saveSession({
      studentId,
      ...req.body
    })

    return res.status(201).json(apiResponse.success(session, 'Session saved'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student's speaking sessions
router.get('/sessions', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const { limit } = req.query
    const sessions = await speechService.getStudentSessions(
      studentId,
      limit ? parseInt(limit as string) : 20
    )

    return res.json(apiResponse.success(sessions))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get session by ID
router.get('/sessions/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const session = await speechService.getSession(req.params.id)

    // Verify access
    if (req.user?.role === 'STUDENT' && session.studentId !== req.user.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    return res.json(apiResponse.success(session))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get speaking prompts by level
router.get('/prompts', authenticate, async (req: Request, res: Response) => {
  try {
    const { level, language } = req.query

    const prompts = speechService.getPrompts(
      level as string,
      (language as string) || 'English'
    )

    return res.json(apiResponse.success(prompts))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get random prompt for level
router.get('/prompts/random', authenticate, async (req: Request, res: Response) => {
  try {
    const { level, language } = req.query

    if (!level) {
      return res.status(400).json(apiResponse.error('Level parameter required', 'VALIDATION_ERROR'))
    }

    const prompt = speechService.getRandomPrompt(
      level as string,
      (language as string) || 'English'
    )

    if (!prompt) {
      return res.status(404).json(apiResponse.error('No prompts found for this level', 'NOT_FOUND'))
    }

    return res.json(apiResponse.success(prompt))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student speaking statistics
router.get('/stats', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const stats = await speechService.getStudentStats(studentId)
    return res.json(apiResponse.success(stats))
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
