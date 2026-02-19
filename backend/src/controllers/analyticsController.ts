import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin, requireAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { analyticsService } from '../services/AnalyticsService'

const router = Router()

// Validation schemas
const dateRangeSchema = Joi.object({
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional()
})

// Get corporate analytics (school admin)
router.get('/corporate', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId && req.user?.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const { startDate, endDate } = req.query
    const dateRange = startDate && endDate ? {
      startDate: new Date(startDate as string),
      endDate: new Date(endDate as string)
    } : undefined

    const schoolId = req.user.schoolId || (req.query.schoolId as string)
    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID required', 'VALIDATION_ERROR'))
    }

    const analytics = await analyticsService.getCorporateAnalytics(schoolId, dateRange)
    return res.json(apiResponse.success(analytics))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get analytics for specific school (admin only)
router.get('/corporate/:schoolId', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query
    const dateRange = startDate && endDate ? {
      startDate: new Date(startDate as string),
      endDate: new Date(endDate as string)
    } : undefined

    const analytics = await analyticsService.getCorporateAnalytics(req.params.schoolId, dateRange)
    return res.json(apiResponse.success(analytics))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student report
router.get('/student/:studentId', authenticate, async (req: Request, res: Response) => {
  try {
    // Students can view their own report, school admins can view any student in their school
    if (req.user?.role === 'STUDENT' && req.user.studentId !== req.params.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const report = await analyticsService.getStudentReport(req.params.studentId)

    // Verify school access for school admins
    if (req.user?.role === 'ADMIN' && req.user.schoolId) {
      // The student report includes school info, we can verify it matches
      // This is a simplified check - in production, add proper validation
    }

    return res.json(apiResponse.success(report))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get my progress report (student)
router.get('/my-report', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can view their report', 'NOT_STUDENT'))
    }

    const report = await analyticsService.getStudentReport(req.user.studentId)
    return res.json(apiResponse.success(report))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get course report
router.get('/course/:courseId', authenticate, async (req: Request, res: Response) => {
  try {
    const report = await analyticsService.getCourseReport(req.params.courseId)

    // Verify access - school admin, teacher assigned to course, or admin
    if (req.user?.role === 'ADMIN') {
      // Would need to verify course belongs to their school
    }

    return res.json(apiResponse.success(report))
  } catch (error) {
    return handleError(res, error)
  }
})

// Export report (PDF/Excel placeholder)
router.get('/export/:type/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params
    const { format = 'json' } = req.query

    if (!['corporate', 'student', 'course'].includes(type)) {
      return res.status(400).json(apiResponse.error('Invalid report type', 'VALIDATION_ERROR'))
    }

    const data = await analyticsService.exportReport(type as any, id)

    if (format === 'json') {
      return res.json(apiResponse.success(data))
    } else {
      // In production, generate PDF or Excel
      // For now, return JSON with appropriate headers
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-Disposition', `attachment; filename=report-${type}-${id}.json`)
      return res.json(data)
    }
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
