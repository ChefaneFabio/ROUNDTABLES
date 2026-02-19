import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireAdmin, requireSchoolAdmin, requireSchoolAccess } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'

const router = Router()

// Validation schemas
const updateSchoolSchema = Joi.object({
  name: Joi.string().min(2).max(200).optional(),
  company: Joi.string().max(200).optional().allow(null),
  description: Joi.string().max(1000).optional().allow(null),
  logo: Joi.string().uri().optional().allow(null),
  billingEmail: Joi.string().email().optional().allow(null),
  billingAddress: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zip: Joi.string().optional(),
    country: Joi.string().optional()
  }).optional().allow(null),
  subscriptionPlan: Joi.string().valid('BASIC', 'PROFESSIONAL', 'ENTERPRISE').optional()
})

// Get all schools (admin only)
router.get('/', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      search,
      plan,
      isActive
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } },
        { company: { contains: String(search), mode: 'insensitive' } }
      ]
    }

    if (plan) {
      where.subscriptionPlan = String(plan)
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    where.deletedAt = null

    const [schools, total] = await Promise.all([
      prisma.school.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: { select: { name: true, email: true, lastLoginAt: true } },
          _count: {
            select: {
              teachers: true,
              students: true,
              courses: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.school.count({ where })
    ])

    res.json(apiResponse.paginated(schools, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get school by ID
router.get('/:id', authenticate, requireSchoolAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // School users can only view their own school
    if (req.user?.role === 'ADMIN' && req.user.schoolId !== id) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const school = await prisma.school.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: { select: { name: true, email: true, lastLoginAt: true, createdAt: true } },
        teachers: {
          where: { deletedAt: null },
          include: { user: { select: { name: true, email: true } } }
        },
        courses: {
          where: { deletedAt: null },
          select: {
            id: true,
            name: true,
            status: true,
            startDate: true,
            endDate: true,
            _count: { select: { enrollments: true, lessons: true } }
          }
        },
        _count: {
          select: { teachers: true, students: true, courses: true }
        }
      }
    })

    if (!school) {
      return res.status(404).json(apiResponse.error('School not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(school))
  } catch (error) {
    handleError(res, error)
  }
})

// Get current school (for logged-in school admin)
router.get('/me/profile', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('Only school admins can access this endpoint', 'FORBIDDEN'))
    }

    const school = await prisma.school.findFirst({
      where: { userId: req.user.id, deletedAt: null },
      include: {
        user: { select: { name: true, email: true, lastLoginAt: true } },
        _count: {
          select: { teachers: true, students: true, courses: true }
        }
      }
    })

    if (!school) {
      return res.status(404).json(apiResponse.error('School profile not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(school))
  } catch (error) {
    handleError(res, error)
  }
})

// Update school
router.put('/:id', authenticate, requireSchoolAccess, validateRequest(updateSchoolSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // School users can only update their own school
    if (req.user?.role === 'ADMIN' && req.user.schoolId !== id) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Non-admins can't change subscription plan
    if (req.body.subscriptionPlan && req.user?.role !== 'ADMIN') {
      delete req.body.subscriptionPlan
    }

    const school = await prisma.school.findFirst({
      where: { id, deletedAt: null }
    })

    if (!school) {
      return res.status(404).json(apiResponse.error('School not found', 'NOT_FOUND'))
    }

    const updated = await prisma.school.update({
      where: { id },
      data: req.body,
      include: {
        user: { select: { name: true, email: true } },
        _count: { select: { teachers: true, students: true, courses: true } }
      }
    })

    res.json(apiResponse.success(updated, 'School updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Soft delete school (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const school = await prisma.school.findFirst({
      where: { id, deletedAt: null },
      include: {
        courses: { where: { status: { in: ['IN_PROGRESS', 'SCHEDULED'] } } }
      }
    })

    if (!school) {
      return res.status(404).json(apiResponse.error('School not found', 'NOT_FOUND'))
    }

    if (school.courses.length > 0) {
      return res.status(400).json(
        apiResponse.error('Cannot delete school with active courses', 'HAS_ACTIVE_COURSES')
      )
    }

    // Soft delete
    await prisma.school.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }
    })

    res.json(apiResponse.success(null, 'School deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get school statistics
router.get('/:id/stats', authenticate, requireSchoolAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (req.user?.role === 'ADMIN' && req.user.schoolId !== id) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const [
      teacherCount,
      studentCount,
      activeCourses,
      completedCourses,
      totalEnrollments,
      pendingPayments
    ] = await Promise.all([
      prisma.teacher.count({ where: { schoolId: id, deletedAt: null, isActive: true } }),
      prisma.student.count({ where: { schoolId: id, deletedAt: null, isActive: true } }),
      prisma.course.count({ where: { schoolId: id, status: 'IN_PROGRESS', deletedAt: null } }),
      prisma.course.count({ where: { schoolId: id, status: 'COMPLETED', deletedAt: null } }),
      prisma.enrollment.count({
        where: { course: { schoolId: id }, status: 'ACTIVE' }
      }),
      prisma.enrollment.count({
        where: { course: { schoolId: id }, paymentStatus: { in: ['PENDING', 'OVERDUE'] } }
      })
    ])

    const stats = {
      teachers: teacherCount,
      students: studentCount,
      activeCourses,
      completedCourses,
      totalEnrollments,
      pendingPayments
    }

    res.json(apiResponse.success(stats))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
