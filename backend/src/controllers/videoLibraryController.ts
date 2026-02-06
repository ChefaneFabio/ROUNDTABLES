import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin, requireTeacher } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { videoLibraryService } from '../services/VideoLibraryService'
import { PAGINATION } from '../utils/constants'

const router = Router()

// Validation schemas
const createLibrarySchema = Joi.object({
  title: Joi.string().required().max(200),
  description: Joi.string().max(2000).optional(),
  coverImage: Joi.string().uri().optional(),
  isPublished: Joi.boolean().optional()
})

const updateLibrarySchema = Joi.object({
  title: Joi.string().max(200).optional(),
  description: Joi.string().max(2000).optional().allow(''),
  coverImage: Joi.string().uri().optional().allow(''),
  isPublished: Joi.boolean().optional()
})

const createCategorySchema = Joi.object({
  name: Joi.string().required().max(100),
  description: Joi.string().max(500).optional(),
  orderIndex: Joi.number().integer().min(0).optional()
})

const createVideoSchema = Joi.object({
  title: Joi.string().required().max(200),
  description: Joi.string().max(2000).optional(),
  url: Joi.string().uri().required(),
  thumbnailUrl: Joi.string().uri().optional(),
  duration: Joi.number().integer().min(0).optional(),
  language: Joi.string().required(),
  cefrLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  transcript: Joi.string().optional(),
  subtitlesUrl: Joi.string().uri().optional(),
  isPublished: Joi.boolean().optional(),
  categoryId: Joi.string().optional(),
  lessonId: Joi.string().optional(),
  orderIndex: Joi.number().integer().min(0).optional()
})

const updateVideoSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  description: Joi.string().max(2000).optional().allow(''),
  url: Joi.string().uri().optional(),
  thumbnailUrl: Joi.string().uri().optional().allow(''),
  duration: Joi.number().integer().min(0).optional(),
  language: Joi.string().optional(),
  cefrLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional().allow(null),
  tags: Joi.array().items(Joi.string()).optional(),
  transcript: Joi.string().optional().allow(''),
  subtitlesUrl: Joi.string().uri().optional().allow(''),
  isPublished: Joi.boolean().optional(),
  categoryId: Joi.string().optional().allow(null),
  lessonId: Joi.string().optional().allow(null),
  orderIndex: Joi.number().integer().min(0).optional()
})

const updateProgressSchema = Joi.object({
  watchedSeconds: Joi.number().integer().min(0).required(),
  totalSeconds: Joi.number().integer().min(0).required()
})

// ==================== Admin Routes (Libraries) ====================

// Create library
router.post('/libraries', authenticate, requireSchoolAdmin, validateRequest(createLibrarySchema), async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    if (!schoolId) {
      return res.status(403).json(apiResponse.error('School access required', 'NO_SCHOOL'))
    }

    const library = await videoLibraryService.createLibrary({
      schoolId,
      ...req.body
    })

    return res.status(201).json(apiResponse.success(library, 'Video library created'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get all libraries (admin view)
router.get('/libraries', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    if (!schoolId) {
      return res.status(403).json(apiResponse.error('School access required', 'NO_SCHOOL'))
    }

    const libraries = await videoLibraryService.getLibraries(schoolId, true)
    return res.json(apiResponse.success(libraries))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get single library
router.get('/libraries/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const library = await videoLibraryService.getLibrary(req.params.id)

    // Check access
    if (req.user?.role === 'STUDENT' && !library.isPublished) {
      return res.status(404).json(apiResponse.error('Library not found', 'NOT_FOUND'))
    }

    return res.json(apiResponse.success(library))
  } catch (error) {
    return handleError(res, error)
  }
})

// Update library
router.put('/libraries/:id', authenticate, requireSchoolAdmin, validateRequest(updateLibrarySchema), async (req: Request, res: Response) => {
  try {
    const library = await videoLibraryService.updateLibrary(req.params.id, req.body)
    return res.json(apiResponse.success(library, 'Library updated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Delete library
router.delete('/libraries/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    await videoLibraryService.deleteLibrary(req.params.id)
    return res.json(apiResponse.success(null, 'Library deleted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Category Routes ====================

// Create category
router.post('/libraries/:libraryId/categories', authenticate, requireSchoolAdmin, validateRequest(createCategorySchema), async (req: Request, res: Response) => {
  try {
    const category = await videoLibraryService.createCategory({
      libraryId: req.params.libraryId,
      ...req.body
    })
    return res.status(201).json(apiResponse.success(category, 'Category created'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Update category
router.put('/categories/:id', authenticate, requireSchoolAdmin, validateRequest(createCategorySchema), async (req: Request, res: Response) => {
  try {
    const category = await videoLibraryService.updateCategory(req.params.id, req.body)
    return res.json(apiResponse.success(category, 'Category updated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Delete category
router.delete('/categories/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    await videoLibraryService.deleteCategory(req.params.id)
    return res.json(apiResponse.success(null, 'Category deleted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Reorder categories
router.post('/libraries/:libraryId/categories/reorder', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { categoryIds } = req.body
    if (!Array.isArray(categoryIds)) {
      return res.status(400).json(apiResponse.error('categoryIds array required', 'VALIDATION_ERROR'))
    }
    await videoLibraryService.reorderCategories(req.params.libraryId, categoryIds)
    return res.json(apiResponse.success(null, 'Categories reordered'))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Video Admin Routes ====================

// Add video to library
router.post('/libraries/:libraryId/videos', authenticate, requireTeacher, validateRequest(createVideoSchema), async (req: Request, res: Response) => {
  try {
    const video = await videoLibraryService.createVideo({
      libraryId: req.params.libraryId,
      ...req.body
    })
    return res.status(201).json(apiResponse.success(video, 'Video added'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get library videos (admin view)
router.get('/libraries/:libraryId/videos', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { categoryId, cefrLevel, search, page, limit } = req.query

    const result = await videoLibraryService.getLibraryVideos(req.params.libraryId, {
      categoryId: categoryId as string,
      cefrLevel: cefrLevel as string,
      search: search as string,
      includeUnpublished: true,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? Math.min(parseInt(limit as string), PAGINATION.MAX_LIMIT) : PAGINATION.DEFAULT_LIMIT
    })

    return res.json(apiResponse.paginated(result.videos, result.pagination))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get single video
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const video = await videoLibraryService.getVideo(req.params.id)

    // Check access
    if (req.user?.role === 'STUDENT' && !video.isPublished) {
      return res.status(404).json(apiResponse.error('Video not found', 'NOT_FOUND'))
    }

    return res.json(apiResponse.success(video))
  } catch (error) {
    return handleError(res, error)
  }
})

// Update video
router.put('/:id', authenticate, requireTeacher, validateRequest(updateVideoSchema), async (req: Request, res: Response) => {
  try {
    const video = await videoLibraryService.updateVideo(req.params.id, req.body)
    return res.json(apiResponse.success(video, 'Video updated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Delete video
router.delete('/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    await videoLibraryService.deleteVideo(req.params.id)
    return res.json(apiResponse.success(null, 'Video deleted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get library stats
router.get('/libraries/:libraryId/stats', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const stats = await videoLibraryService.getLibraryStats(req.params.libraryId)
    return res.json(apiResponse.success(stats))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Student Browsing Routes ====================

// Browse videos
router.get('/browse', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId
    const schoolId = req.user?.schoolId

    if (!studentId || !schoolId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const { language, cefrLevel, search, categoryId, page, limit } = req.query

    const result = await videoLibraryService.browseVideos(schoolId, studentId, {
      language: language as string,
      cefrLevel: cefrLevel as string,
      search: search as string,
      categoryId: categoryId as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? Math.min(parseInt(limit as string), PAGINATION.MAX_LIMIT) : PAGINATION.DEFAULT_LIMIT
    })

    return res.json(apiResponse.paginated(result.videos, result.pagination))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get videos by CEFR level
router.get('/browse/by-level/:level', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId
    const schoolId = req.user?.schoolId

    if (!studentId || !schoolId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const videos = await videoLibraryService.getVideosByLevel(schoolId, studentId, req.params.level)
    return res.json(apiResponse.success(videos))
  } catch (error) {
    return handleError(res, error)
  }
})

// Search videos
router.get('/search', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId
    const schoolId = req.user?.schoolId

    if (!studentId || !schoolId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const { q, page, limit } = req.query

    if (!q) {
      return res.status(400).json(apiResponse.error('Search query required', 'VALIDATION_ERROR'))
    }

    const result = await videoLibraryService.browseVideos(schoolId, studentId, {
      search: q as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? Math.min(parseInt(limit as string), PAGINATION.MAX_LIMIT) : PAGINATION.DEFAULT_LIMIT
    })

    return res.json(apiResponse.paginated(result.videos, result.pagination))
  } catch (error) {
    return handleError(res, error)
  }
})

// Continue watching
router.get('/continue-watching', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const videos = await videoLibraryService.getContinueWatching(studentId)
    return res.json(apiResponse.success(videos))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Progress Routes ====================

// Update watch progress
router.post('/:id/progress', authenticate, validateRequest(updateProgressSchema), async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const progress = await videoLibraryService.updateProgress({
      videoId: req.params.id,
      studentId,
      watchedSeconds: req.body.watchedSeconds,
      totalSeconds: req.body.totalSeconds
    })

    return res.json(apiResponse.success(progress))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student progress summary
router.get('/my/progress', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId

    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const progress = await videoLibraryService.getStudentProgress(studentId)
    return res.json(apiResponse.success(progress))
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
