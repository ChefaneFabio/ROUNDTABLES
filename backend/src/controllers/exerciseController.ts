import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireTeacher, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { exerciseService } from '../services/ExerciseService'
import { PAGINATION } from '../utils/constants'

const router = Router()

// Validation schemas
const createExerciseSchema = Joi.object({
  title: Joi.string().required().max(200),
  description: Joi.string().max(2000).optional(),
  type: Joi.string().valid('DRAG_DROP', 'MATCHING', 'FILL_BLANKS', 'LISTENING', 'REORDER', 'MULTIPLE_CHOICE', 'TRUE_FALSE').required(),
  language: Joi.string().required(),
  cefrLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
  instructions: Joi.string().max(1000).optional(),
  timeLimit: Joi.number().integer().min(0).optional(),
  passingScore: Joi.number().integer().min(0).max(100).optional(),
  config: Joi.object().optional(),
  isPublished: Joi.boolean().optional(),
  lessonId: Joi.string().optional()
})

const updateExerciseSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  description: Joi.string().max(2000).optional().allow(''),
  type: Joi.string().valid('DRAG_DROP', 'MATCHING', 'FILL_BLANKS', 'LISTENING', 'REORDER', 'MULTIPLE_CHOICE', 'TRUE_FALSE').optional(),
  language: Joi.string().optional(),
  cefrLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional().allow(null),
  instructions: Joi.string().max(1000).optional().allow(''),
  timeLimit: Joi.number().integer().min(0).optional().allow(null),
  passingScore: Joi.number().integer().min(0).max(100).optional(),
  config: Joi.object().optional(),
  isPublished: Joi.boolean().optional(),
  lessonId: Joi.string().optional().allow(null)
})

const createItemSchema = Joi.object({
  orderIndex: Joi.number().integer().min(0).optional(),
  questionText: Joi.string().max(1000).optional(),
  content: Joi.object().required(),
  correctAnswer: Joi.object().required(),
  points: Joi.number().integer().min(1).optional(),
  hint: Joi.string().max(500).optional(),
  explanation: Joi.string().max(1000).optional(),
  audioUrl: Joi.string().uri().optional(),
  imageUrl: Joi.string().uri().optional()
})

const updateItemSchema = Joi.object({
  orderIndex: Joi.number().integer().min(0).optional(),
  questionText: Joi.string().max(1000).optional().allow(''),
  content: Joi.object().optional(),
  correctAnswer: Joi.object().optional(),
  points: Joi.number().integer().min(1).optional(),
  hint: Joi.string().max(500).optional().allow(''),
  explanation: Joi.string().max(1000).optional().allow(''),
  audioUrl: Joi.string().uri().optional().allow(''),
  imageUrl: Joi.string().uri().optional().allow('')
})

const submitAnswerSchema = Joi.object({
  itemId: Joi.string().required(),
  answer: Joi.any().required()
})

// ==================== Admin/Teacher Routes ====================

// Create exercise
router.post('/', authenticate, requireTeacher, validateRequest(createExerciseSchema), async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    if (!schoolId) {
      return res.status(403).json(apiResponse.error('School access required', 'NO_SCHOOL'))
    }

    const exercise = await exerciseService.createExercise({
      ...req.body,
      createdById: req.user!.id,
      schoolId
    })

    return res.status(201).json(apiResponse.success(exercise, 'Exercise created'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get all exercises (admin/teacher view)
router.get('/', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    if (!schoolId) {
      return res.status(403).json(apiResponse.error('School access required', 'NO_SCHOOL'))
    }

    const { type, language, cefrLevel, lessonId, page, limit } = req.query

    const result = await exerciseService.getExercises(schoolId, {
      type: type as any,
      language: language as string,
      cefrLevel: cefrLevel as string,
      lessonId: lessonId as string,
      includeUnpublished: true,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? Math.min(parseInt(limit as string), PAGINATION.MAX_LIMIT) : PAGINATION.DEFAULT_LIMIT
    })

    return res.json(apiResponse.paginated(result.exercises, result.pagination))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get single exercise
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseService.getExercise(req.params.id)

    // Check access for students
    if (req.user?.role === 'STUDENT' && !exercise.isPublished) {
      return res.status(404).json(apiResponse.error('Exercise not found', 'NOT_FOUND'))
    }

    return res.json(apiResponse.success(exercise))
  } catch (error) {
    return handleError(res, error)
  }
})

// Update exercise
router.put('/:id', authenticate, requireTeacher, validateRequest(updateExerciseSchema), async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseService.updateExercise(req.params.id, req.body)
    return res.json(apiResponse.success(exercise, 'Exercise updated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Delete exercise
router.delete('/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    await exerciseService.deleteExercise(req.params.id)
    return res.json(apiResponse.success(null, 'Exercise deleted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get exercise stats
router.get('/:id/stats', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const stats = await exerciseService.getExerciseStats(req.params.id)
    return res.json(apiResponse.success(stats))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Exercise Items ====================

// Add item to exercise
router.post('/:id/items', authenticate, requireTeacher, validateRequest(createItemSchema), async (req: Request, res: Response) => {
  try {
    const item = await exerciseService.addItem({
      exerciseId: req.params.id,
      ...req.body
    })
    return res.status(201).json(apiResponse.success(item, 'Item added'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Update item
router.put('/:id/items/:itemId', authenticate, requireTeacher, validateRequest(updateItemSchema), async (req: Request, res: Response) => {
  try {
    const item = await exerciseService.updateItem(req.params.itemId, req.body)
    return res.json(apiResponse.success(item, 'Item updated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Delete item
router.delete('/:id/items/:itemId', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    await exerciseService.deleteItem(req.params.itemId)
    return res.json(apiResponse.success(null, 'Item deleted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Reorder items
router.post('/:id/items/reorder', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { itemIds } = req.body
    if (!Array.isArray(itemIds)) {
      return res.status(400).json(apiResponse.error('itemIds array required', 'VALIDATION_ERROR'))
    }
    await exerciseService.reorderItems(req.params.id, itemIds)
    return res.json(apiResponse.success(null, 'Items reordered'))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Student Routes ====================

// Get available exercises
router.get('/available', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId
    const schoolId = req.user?.schoolId

    if (!studentId || !schoolId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const { type, language, cefrLevel, page, limit } = req.query

    const result = await exerciseService.getAvailableExercises(schoolId, studentId, {
      type: type as any,
      language: language as string,
      cefrLevel: cefrLevel as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? Math.min(parseInt(limit as string), PAGINATION.MAX_LIMIT) : PAGINATION.DEFAULT_LIMIT
    })

    return res.json(apiResponse.paginated(result.exercises, result.pagination))
  } catch (error) {
    return handleError(res, error)
  }
})

// Start exercise attempt
router.post('/:id/start', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const result = await exerciseService.startAttempt(req.params.id, studentId)
    return res.status(201).json(apiResponse.success(result, 'Attempt started'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Submit answer
router.post('/attempts/:attemptId/answer', authenticate, validateRequest(submitAnswerSchema), async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    // Verify ownership
    const attempt = await exerciseService.getAttempt(req.params.attemptId)
    if (attempt.studentId !== studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const result = await exerciseService.submitAnswer({
      attemptId: req.params.attemptId,
      itemId: req.body.itemId,
      answer: req.body.answer
    })

    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// Complete attempt
router.post('/attempts/:attemptId/complete', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    // Verify ownership
    const attempt = await exerciseService.getAttempt(req.params.attemptId)
    if (attempt.studentId !== studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const result = await exerciseService.completeAttempt(req.params.attemptId)
    return res.json(apiResponse.success(result, 'Exercise completed'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Abandon attempt
router.post('/attempts/:attemptId/abandon', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    // Verify ownership
    const attempt = await exerciseService.getAttempt(req.params.attemptId)
    if (attempt.studentId !== studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const result = await exerciseService.abandonAttempt(req.params.attemptId)
    return res.json(apiResponse.success(result, 'Attempt abandoned'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get attempt details
router.get('/attempts/:attemptId', authenticate, async (req: Request, res: Response) => {
  try {
    const attempt = await exerciseService.getAttempt(req.params.attemptId)

    // Verify access
    if (req.user?.role === 'STUDENT' && attempt.studentId !== req.user.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    return res.json(apiResponse.success(attempt))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student's attempts
router.get('/my/attempts', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const { exerciseId } = req.query
    const attempts = await exerciseService.getStudentAttempts(studentId, exerciseId as string)
    return res.json(apiResponse.success(attempts))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student's exercise stats
router.get('/my/stats', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const stats = await exerciseService.getStudentExerciseStats(studentId)
    return res.json(apiResponse.success(stats))
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
