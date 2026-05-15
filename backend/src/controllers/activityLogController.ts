import { Router, Request, Response } from 'express'
import { authenticate } from '../middleware/auth'
import { requireAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { activityLog } from '../services/ActivityLogService'

const router = Router()

// GET /api/activity-log — admin-only feed of who-did-what across the platform.
router.get('/', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { action, userId, dateFrom, dateTo, page, limit } = req.query
    const result = await activityLog.list({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      action: typeof action === 'string' ? action : undefined,
      userId: typeof userId === 'string' ? userId : undefined,
      dateFrom: typeof dateFrom === 'string' ? new Date(dateFrom) : undefined,
      dateTo: typeof dateTo === 'string' ? new Date(dateTo) : undefined,
    })
    res.json(apiResponse.success(result, 'Activity log retrieved'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
