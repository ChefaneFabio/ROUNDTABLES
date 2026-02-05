import { Router, Request, Response } from 'express'
import { authenticate } from '../middleware/auth'
import { apiResponse, handleError } from '../utils/apiResponse'
import { recommendationService } from '../services/RecommendationService'

const router = Router()

// Get personalized recommendations for current student
router.get('/my', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can get recommendations', 'NOT_STUDENT'))
    }

    const { limit = 5 } = req.query
    const recommendations = await recommendationService.getRecommendations(
      req.user.studentId,
      Number(limit)
    )

    return res.json(apiResponse.success(recommendations))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get recommendations for a specific student (school admin)
router.get('/student/:studentId', authenticate, async (req: Request, res: Response) => {
  try {
    // Only allow school admins and admins to view other students' recommendations
    if (req.user?.role === 'STUDENT' && req.user.studentId !== req.params.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const { limit = 5 } = req.query
    const recommendations = await recommendationService.getRecommendations(
      req.params.studentId,
      Number(limit)
    )

    return res.json(apiResponse.success(recommendations))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get similar courses
router.get('/similar/:courseId', authenticate, async (req: Request, res: Response) => {
  try {
    const { limit = 3 } = req.query
    const similarCourses = await recommendationService.getSimilarCourses(
      req.params.courseId,
      Number(limit)
    )

    return res.json(apiResponse.success(similarCourses))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get trending courses
router.get('/trending', authenticate, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId || (req.query.schoolId as string)

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID required', 'VALIDATION_ERROR'))
    }

    const { limit = 5 } = req.query
    const trendingCourses = await recommendationService.getTrendingCourses(
      schoolId,
      Number(limit)
    )

    return res.json(apiResponse.success(trendingCourses))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get study schedule
router.get('/schedule', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can get study schedule', 'NOT_STUDENT'))
    }

    const schedule = await recommendationService.getStudySchedule(req.user.studentId)
    return res.json(apiResponse.success(schedule))
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
