import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { gamificationService } from '../services/GamificationService'
import { PAGINATION } from '../utils/constants'

const router = Router()

// ─── STUDENT ENDPOINTS ─────────────────────────────

// GET /api/gamification/profile — Get my gamification profile
router.get('/profile', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user
    if (!user.studentId) {
      return res.status(403).json(apiResponse.error('Only students have gamification profiles'))
    }
    const profile = await gamificationService.getProfile(user.studentId)
    res.json(apiResponse.success(profile))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /api/gamification/badges — Get my badges
router.get('/badges', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user
    if (!user.studentId) {
      return res.status(403).json(apiResponse.error('Only students have badges'))
    }
    const badges = await gamificationService.getStudentBadges(user.studentId)
    res.json(apiResponse.success(badges))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /api/gamification/streak — Get my streak info
router.get('/streak', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user
    if (!user.studentId) {
      return res.status(403).json(apiResponse.error('Only students have streaks'))
    }
    const streak = await gamificationService.getStreak(user.studentId)
    res.json(apiResponse.success(streak))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /api/gamification/xp/history — Get my XP history
const xpHistorySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(PAGINATION.MAX_LIMIT).default(PAGINATION.DEFAULT_LIMIT),
})

router.get('/xp/history', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user
    if (!user.studentId) {
      return res.status(403).json(apiResponse.error('Only students have XP'))
    }
    const { error, value } = xpHistorySchema.validate(req.query)
    if (error) {
      return res.status(400).json(apiResponse.error(error.details[0].message))
    }
    const { page, limit } = value
    const result = await gamificationService.getXpHistory(user.studentId, page, limit)
    res.json(apiResponse.paginated(result.transactions, { page, limit, total: result.total }))
  } catch (error) {
    handleError(res, error)
  }
})

// ─── LEADERBOARD (any authenticated user) ──────────

const leaderboardSchema = Joi.object({
  period: Joi.string().valid('WEEKLY', 'MONTHLY', 'ALL_TIME').default('WEEKLY'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(PAGINATION.MAX_LIMIT).default(PAGINATION.DEFAULT_LIMIT),
})

router.get('/leaderboard', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user
    const { error, value } = leaderboardSchema.validate(req.query)
    if (error) {
      return res.status(400).json(apiResponse.error(error.details[0].message))
    }
    const { period, page, limit } = value
    const result = await gamificationService.getLeaderboard(user.schoolId, period, page, limit)
    res.json(apiResponse.paginated(result.entries, { page, limit, total: result.total }))
  } catch (error) {
    handleError(res, error)
  }
})

// ─── ADMIN ENDPOINTS ───────────────────────────────

// POST /api/gamification/seed-badges — Seed/update badge definitions
router.post('/seed-badges', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    await gamificationService.seedBadges()
    res.json(apiResponse.success(null, 'Badges seeded successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /api/gamification/student/:studentId — Admin view of student gamification
router.get('/student/:studentId', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const profile = await gamificationService.getProfile(req.params.studentId)
    res.json(apiResponse.success(profile))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
