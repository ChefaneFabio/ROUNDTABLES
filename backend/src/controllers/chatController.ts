import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { apiResponse, handleError } from '../utils/apiResponse'
import { aiChatService } from '../services/AiChatService'

const router = Router()

// Validation schemas
const createSessionSchema = Joi.object({
  language: Joi.string().required(),
  topic: Joi.string().optional()
})

const sendMessageSchema = Joi.object({
  message: Joi.string().min(1).max(2000).required()
})

// Create new chat session
router.post('/session', authenticate, validateRequest(createSessionSchema), async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can use chat', 'NOT_STUDENT'))
    }

    const { language, topic } = req.body
    const result = await aiChatService.createSession(req.user.studentId, language, topic)

    return res.status(201).json(apiResponse.success(result, 'Chat session started'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student's chat sessions
router.get('/sessions', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can view chat sessions', 'NOT_STUDENT'))
    }

    const { limit = 10 } = req.query
    const sessions = await aiChatService.getStudentSessions(req.user.studentId, Number(limit))

    return res.json(apiResponse.success(sessions))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get chat session by ID
router.get('/session/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const session = await aiChatService.getSession(req.params.id)

    // Verify this is the student's session
    if (session.studentId !== req.user?.studentId && req.user?.role === 'STUDENT') {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    return res.json(apiResponse.success(session))
  } catch (error) {
    return handleError(res, error)
  }
})

// Send message in chat session
router.post('/session/:id/message', authenticate, validateRequest(sendMessageSchema), async (req: Request, res: Response) => {
  try {
    // Get session to verify ownership
    const session = await aiChatService.getSession(req.params.id)

    if (session.studentId !== req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const { message } = req.body
    const result = await aiChatService.sendMessage(req.params.id, message)

    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// End chat session
router.post('/session/:id/end', authenticate, async (req: Request, res: Response) => {
  try {
    const session = await aiChatService.getSession(req.params.id)

    if (session.studentId !== req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const result = await aiChatService.endSession(req.params.id)
    return res.json(apiResponse.success(result, 'Chat session ended'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get available topics
router.get('/topics', authenticate, async (req: Request, res: Response) => {
  const topics = [
    { id: 'daily-life', name: 'Daily Life', description: 'Talk about routines, hobbies, and everyday activities' },
    { id: 'travel', name: 'Travel', description: 'Discuss travel experiences and explore new places' },
    { id: 'business', name: 'Business', description: 'Practice professional and workplace conversations' },
    { id: 'culture', name: 'Culture', description: 'Explore cultural topics and traditions' },
    { id: 'news', name: 'Current Events', description: 'Discuss news and current affairs' },
    { id: 'free', name: 'Free Conversation', description: 'Talk about anything you like' }
  ]

  return res.json(apiResponse.success(topics))
})

// Get available languages
router.get('/languages', authenticate, async (req: Request, res: Response) => {
  const languages = [
    { code: 'English', name: 'English' },
    { code: 'Spanish', name: 'Spanish' },
    { code: 'French', name: 'French' },
    { code: 'German', name: 'German' },
    { code: 'Italian', name: 'Italian' },
    { code: 'Portuguese', name: 'Portuguese' },
    { code: 'Chinese', name: 'Chinese (Mandarin)' },
    { code: 'Japanese', name: 'Japanese' }
  ]

  return res.json(apiResponse.success(languages))
})

export default router
