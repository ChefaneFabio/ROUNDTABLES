import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { optionalAuth } from '../middleware/auth'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'

const router = Router()

// Validation schemas
const listCoursesSchema = Joi.object({
  language: Joi.string().optional(),
  courseType: Joi.string().valid('LIVE', 'SELF_PACED').optional(),
  cefrLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
  search: Joi.string().max(200).optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(PAGINATION.MAX_LIMIT).optional()
})

// List public courses
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { error } = listCoursesSchema.validate(req.query)
    if (error) {
      return res.status(400).json(apiResponse.error(error.details[0].message, 'VALIDATION_ERROR'))
    }

    const {
      language,
      courseType,
      cefrLevel,
      search,
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {
      isPublic: true,
      deletedAt: null
    }

    if (language) {
      where.language = String(language)
    }

    if (courseType) {
      where.courseType = String(courseType)
    }

    if (cefrLevel) {
      where.modules = { some: {} } // placeholder — filter by course-level if available
    }

    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } }
      ]
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limitNum,
        select: {
          id: true,
          name: true,
          description: true,
          courseType: true,
          language: true,
          price: true,
          currency: true,
          thumbnailUrl: true,
          startDate: true,
          endDate: true,
          status: true,
          createdAt: true,
          school: { select: { id: true, name: true } },
          courseTeachers: {
            where: { isPrimary: true },
            include: {
              teacher: {
                include: { user: { select: { name: true } } }
              }
            }
          },
          _count: {
            select: { enrollments: true, lessons: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.course.count({ where })
    ])

    res.json(apiResponse.paginated(courses, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get public course detail
router.get('/:id', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const course = await prisma.course.findFirst({
      where: { id, isPublic: true, deletedAt: null },
      include: {
        school: { select: { id: true, name: true } },
        courseTeachers: {
          include: {
            teacher: {
              include: { user: { select: { name: true } } }
            }
          }
        },
        modules: { orderBy: { orderIndex: 'asc' } },
        _count: {
          select: { enrollments: true, lessons: true, modules: true }
        }
      }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(course))
  } catch (error) {
    handleError(res, error)
  }
})

// Get self-paced course content outline
// Preview items include full URLs; non-preview items include metadata only
router.get('/:id/contents', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const course = await prisma.course.findFirst({
      where: { id, isPublic: true, deletedAt: null, courseType: 'SELF_PACED' },
      include: {
        courseContents: {
          orderBy: { orderIndex: 'asc' },
          include: {
            video: {
              select: {
                id: true,
                title: true,
                description: true,
                url: true,
                thumbnailUrl: true,
                duration: true,
                cefrLevel: true
              }
            },
            exercise: {
              select: {
                id: true,
                title: true,
                description: true,
                type: true,
                cefrLevel: true,
                instructions: true,
                items: true
              }
            }
          }
        }
      }
    })

    if (!course) {
      return res.status(404).json(
        apiResponse.error('Course not found or not self-paced', 'NOT_FOUND')
      )
    }

    // For non-preview items, strip full content URLs
    const contents = course.courseContents.map((content) => {
      if (content.isPreview) {
        return content // Full data for preview items
      }
      // Metadata only for non-preview items
      return {
        ...content,
        video: content.video
          ? { id: content.video.id, title: content.video.title, description: content.video.description, duration: content.video.duration, cefrLevel: content.video.cefrLevel }
          : null,
        exercise: content.exercise
          ? { id: content.exercise.id, title: content.exercise.title, description: content.exercise.description, type: content.exercise.type, cefrLevel: content.exercise.cefrLevel }
          : null,
      }
    })

    res.json(apiResponse.success(contents))
  } catch (error) {
    handleError(res, error)
  }
})

// Get a specific preview content item (full data, no auth required)
router.get('/:id/preview/:contentId', async (req: Request, res: Response) => {
  try {
    const { id, contentId } = req.params

    const content = await prisma.courseContent.findFirst({
      where: {
        id: contentId,
        courseId: id,
        isPreview: true,
        course: { isPublic: true, deletedAt: null },
      },
      include: {
        video: true,
        exercise: {
          include: { items: { orderBy: { orderIndex: 'asc' } } }
        },
      },
    })

    if (!content) {
      return res.status(403).json(
        apiResponse.error('Content not found or not available for preview', 'FORBIDDEN')
      )
    }

    res.json(apiResponse.success(content))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
