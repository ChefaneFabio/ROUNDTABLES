import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin, requireTeacher } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'

const router = Router()

// Validation schemas
const updateTeacherSchema = Joi.object({
  bio: Joi.string().max(2000).optional().allow(null),
  expertise: Joi.array().items(Joi.string()).optional(),
  hourlyRate: Joi.number().precision(2).min(0).optional().allow(null),
  isActive: Joi.boolean().optional()
})

// Get all teachers (filtered by school for non-admins)
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      search,
      schoolId,
      isActive,
      expertise
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = { deletedAt: null }

    // Apply access control
    if (req.user?.role === 'LANGUAGE_SCHOOL') {
      where.schoolId = req.user.schoolId
    } else if (req.user?.role === 'TEACHER') {
      where.schoolId = req.user.schoolId
    } else if (req.user?.role === 'STUDENT') {
      // Students can see teachers from their school
      where.schoolId = req.user.schoolId
    } else if (req.user?.role === 'ADMIN' && schoolId) {
      where.schoolId = String(schoolId)
    }

    if (search) {
      where.user = {
        OR: [
          { name: { contains: String(search), mode: 'insensitive' } },
          { email: { contains: String(search), mode: 'insensitive' } }
        ]
      }
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    if (expertise) {
      where.expertise = { has: String(expertise) }
    }

    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: { select: { id: true, name: true, email: true, lastLoginAt: true } },
          school: { select: { id: true, name: true } },
          _count: {
            select: {
              lessons: true,
              courseTeachers: true,
              feedback: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.teacher.count({ where })
    ])

    res.json(apiResponse.paginated(teachers, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get teacher by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const teacher = await prisma.teacher.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: { select: { id: true, name: true, email: true, lastLoginAt: true, createdAt: true } },
        school: { select: { id: true, name: true } },
        courseTeachers: {
          include: {
            course: {
              select: { id: true, name: true, status: true, startDate: true, endDate: true }
            }
          }
        },
        _count: {
          select: { lessons: true, feedback: true }
        }
      }
    })

    if (!teacher) {
      return res.status(404).json(apiResponse.error('Teacher not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== teacher.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(teacher))
  } catch (error) {
    handleError(res, error)
  }
})

// Get current teacher profile
router.get('/me/profile', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    if (!req.user?.teacherId) {
      return res.status(404).json(apiResponse.error('Teacher profile not found', 'NOT_FOUND'))
    }

    const teacher = await prisma.teacher.findFirst({
      where: { id: req.user.teacherId, deletedAt: null },
      include: {
        user: { select: { id: true, name: true, email: true } },
        school: { select: { id: true, name: true } },
        courseTeachers: {
          include: {
            course: {
              select: {
                id: true,
                name: true,
                status: true,
                _count: { select: { enrollments: true, lessons: true } }
              }
            }
          }
        },
        lessons: {
          where: {
            scheduledAt: { gte: new Date() },
            status: { notIn: ['COMPLETED', 'CANCELLED'] }
          },
          take: 10,
          orderBy: { scheduledAt: 'asc' },
          include: {
            course: { select: { name: true } }
          }
        }
      }
    })

    if (!teacher) {
      return res.status(404).json(apiResponse.error('Teacher profile not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(teacher))
  } catch (error) {
    handleError(res, error)
  }
})

// Update teacher
router.put('/:id', authenticate, validateRequest(updateTeacherSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const teacher = await prisma.teacher.findFirst({
      where: { id, deletedAt: null }
    })

    if (!teacher) {
      return res.status(404).json(apiResponse.error('Teacher not found', 'NOT_FOUND'))
    }

    // Check access - teacher can update their own profile, school admin can update any teacher in their school
    const canEdit = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === teacher.schoolId) ||
      (req.user?.role === 'TEACHER' && req.user.teacherId === id)

    if (!canEdit) {
      return res.status(403).json(apiResponse.error('Not authorized to update this teacher', 'FORBIDDEN'))
    }

    // Non-admins and non-school admins can't change isActive status
    if (req.body.isActive !== undefined && req.user?.role === 'TEACHER') {
      delete req.body.isActive
    }

    const updated = await prisma.teacher.update({
      where: { id },
      data: req.body,
      include: {
        user: { select: { name: true, email: true } },
        school: { select: { name: true } }
      }
    })

    res.json(apiResponse.success(updated, 'Teacher updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get teacher's schedule
router.get('/:id/schedule', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { fromDate, toDate } = req.query

    const teacher = await prisma.teacher.findFirst({
      where: { id, deletedAt: null }
    })

    if (!teacher) {
      return res.status(404).json(apiResponse.error('Teacher not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== teacher.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const where: any = {
      teacherId: id,
      deletedAt: null
    }

    if (fromDate) {
      where.scheduledAt = { ...where.scheduledAt, gte: new Date(String(fromDate)) }
    }
    if (toDate) {
      where.scheduledAt = { ...where.scheduledAt, lte: new Date(String(toDate)) }
    }

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        course: { select: { id: true, name: true } },
        module: { select: { title: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    })

    res.json(apiResponse.success(lessons))
  } catch (error) {
    handleError(res, error)
  }
})

// Get teacher statistics
router.get('/:id/stats', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const teacher = await prisma.teacher.findFirst({
      where: { id, deletedAt: null }
    })

    if (!teacher) {
      return res.status(404).json(apiResponse.error('Teacher not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== teacher.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const [
      totalLessons,
      completedLessons,
      upcomingLessons,
      totalCourses,
      totalFeedback,
      totalQuestions
    ] = await Promise.all([
      prisma.lesson.count({ where: { teacherId: id, deletedAt: null } }),
      prisma.lesson.count({ where: { teacherId: id, status: 'COMPLETED', deletedAt: null } }),
      prisma.lesson.count({
        where: {
          teacherId: id,
          scheduledAt: { gte: new Date() },
          status: { notIn: ['COMPLETED', 'CANCELLED'] },
          deletedAt: null
        }
      }),
      prisma.courseTeacher.count({ where: { teacherId: id } }),
      prisma.feedback.count({ where: { teacherId: id } }),
      prisma.question.count({ where: { teacherId: id } })
    ])

    const stats = {
      totalLessons,
      completedLessons,
      upcomingLessons,
      totalCourses,
      totalFeedback,
      totalQuestions,
      completionRate: totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0
    }

    res.json(apiResponse.success(stats))
  } catch (error) {
    handleError(res, error)
  }
})

// Deactivate teacher (soft delete)
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const teacher = await prisma.teacher.findFirst({
      where: { id, deletedAt: null },
      include: {
        lessons: {
          where: {
            scheduledAt: { gte: new Date() },
            status: { notIn: ['COMPLETED', 'CANCELLED'] }
          }
        }
      }
    })

    if (!teacher) {
      return res.status(404).json(apiResponse.error('Teacher not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== teacher.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (teacher.lessons.length > 0) {
      return res.status(400).json(
        apiResponse.error(
          `Teacher has ${teacher.lessons.length} upcoming lessons. Reassign them first.`,
          'HAS_UPCOMING_LESSONS'
        )
      )
    }

    await prisma.teacher.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }
    })

    res.json(apiResponse.success(null, 'Teacher deactivated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
