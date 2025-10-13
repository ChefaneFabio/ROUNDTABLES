import { Router, Request, Response } from 'express'
import { authenticate, authorize } from '../middleware/auth'
import { AuditLogService } from '../services/AuditLogService'

const router = Router()
const auditLogService = new AuditLogService()

// All audit log routes require authentication and admin role
router.use(authenticate)
router.use(authorize('ADMIN'))

/**
 * GET /api/audit-logs - Get audit logs with filtering
 * Admin only
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      action,
      resource,
      result: resultParam,
      startDate,
      endDate,
      page,
      limit
    } = req.query

    const filters: any = {
      userId: userId as string,
      action: action as any,
      resource: resource as any,
      result: resultParam as 'success' | 'failure',
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined
    }

    if (startDate) {
      filters.startDate = new Date(startDate as string)
    }

    if (endDate) {
      filters.endDate = new Date(endDate as string)
    }

    const result = await auditLogService.getAuditLogs(filters)

    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch audit logs'
    })
  }
})

/**
 * GET /api/audit-logs/statistics - Get audit statistics
 * Admin only
 */
router.get('/statistics', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query

    const filters: any = {}

    if (startDate) {
      filters.startDate = new Date(startDate as string)
    }

    if (endDate) {
      filters.endDate = new Date(endDate as string)
    }

    const statistics = await auditLogService.getAuditStatistics(
      filters.startDate,
      filters.endDate
    )

    res.json({
      success: true,
      data: statistics
    })
  } catch (error) {
    console.error('Error fetching audit statistics:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch audit statistics'
    })
  }
})

/**
 * GET /api/audit-logs/suspicious - Get suspicious activity
 * Admin only
 */
router.get('/suspicious', async (req: Request, res: Response) => {
  try {
    const { hours } = req.query
    const hoursNum = hours ? parseInt(hours as string) : 24

    const suspiciousActivity = await auditLogService.getSuspiciousActivity(hoursNum)

    res.json({
      success: true,
      data: suspiciousActivity
    })
  } catch (error) {
    console.error('Error fetching suspicious activity:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suspicious activity'
    })
  }
})

/**
 * POST /api/audit-logs/cleanup - Clean up old audit logs
 * Admin only
 */
router.post('/cleanup', async (req: Request, res: Response) => {
  try {
    const { retentionDays } = req.body
    const days = retentionDays || 365

    if (days < 90) {
      return res.status(400).json({
        success: false,
        error: 'Minimum retention period is 90 days'
      })
    }

    const deletedCount = await auditLogService.cleanupOldLogs(days)

    // Log this action
    await auditLogService.logFromRequest(
      req,
      'delete',
      'audit_log' as any,
      'success',
      {
        metadata: { deletedCount, retentionDays: days }
      }
    )

    res.json({
      success: true,
      data: {
        deletedCount,
        message: `Cleaned up ${deletedCount} audit logs older than ${days} days`
      }
    })
  } catch (error) {
    console.error('Error cleaning up audit logs:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to clean up audit logs'
    })
  }
})

export default router
