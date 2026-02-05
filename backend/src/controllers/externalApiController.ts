import { Router, Request, Response } from 'express'
import Joi from 'joi'
import crypto from 'crypto'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin } from '../middleware/rbac'
import { authenticateApiKey, requirePermission, API_PERMISSIONS } from '../middleware/apiKeyAuth'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'

const router = Router()

// ==================== API Key Management (for school admins) ====================

const createApiKeySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  permissions: Joi.array().items(Joi.string()).min(1).required(),
  expiresAt: Joi.date().iso().optional()
})

// Generate a secure API key
function generateApiKey(): { key: string; prefix: string } {
  const prefix = 'maka'
  const random = crypto.randomBytes(32).toString('hex')
  const key = `${prefix}_${random}`
  return { key, prefix: `${prefix}_${random.substring(0, 8)}...` }
}

// List API keys for current school
router.get('/keys', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const keys = await prisma.apiKey.findMany({
      where: { schoolId: req.user.schoolId },
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        permissions: true,
        isActive: true,
        lastUsedAt: true,
        expiresAt: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return res.json(apiResponse.success(keys))
  } catch (error) {
    return handleError(res, error)
  }
})

// Create new API key
router.post('/keys', authenticate, requireSchoolAdmin, validateRequest(createApiKeySchema), async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const { name, permissions, expiresAt } = req.body
    const { key, prefix } = generateApiKey()

    const apiKey = await prisma.apiKey.create({
      data: {
        schoolId: req.user.schoolId,
        name,
        key,
        keyPrefix: prefix,
        permissions,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    })

    // Return the full key only once (on creation)
    return res.status(201).json(apiResponse.success({
      id: apiKey.id,
      name: apiKey.name,
      key: apiKey.key, // Full key - only returned on creation
      keyPrefix: apiKey.keyPrefix,
      permissions: apiKey.permissions,
      expiresAt: apiKey.expiresAt,
      createdAt: apiKey.createdAt
    }, 'API key created. Save this key - it will not be shown again.'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Update API key
router.put('/keys/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const { id } = req.params
    const { name, permissions, isActive, expiresAt } = req.body

    // Verify key belongs to school
    const existingKey = await prisma.apiKey.findFirst({
      where: { id, schoolId: req.user.schoolId }
    })

    if (!existingKey) {
      return res.status(404).json(apiResponse.error('API key not found', 'NOT_FOUND'))
    }

    const updated = await prisma.apiKey.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(permissions && { permissions }),
        ...(typeof isActive === 'boolean' && { isActive }),
        ...(expiresAt !== undefined && { expiresAt: expiresAt ? new Date(expiresAt) : null })
      },
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        permissions: true,
        isActive: true,
        expiresAt: true,
        lastUsedAt: true
      }
    })

    return res.json(apiResponse.success(updated, 'API key updated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Delete API key
router.delete('/keys/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const { id } = req.params

    // Verify key belongs to school
    const existingKey = await prisma.apiKey.findFirst({
      where: { id, schoolId: req.user.schoolId }
    })

    if (!existingKey) {
      return res.status(404).json(apiResponse.error('API key not found', 'NOT_FOUND'))
    }

    await prisma.apiKey.delete({ where: { id } })
    return res.json(apiResponse.success(null, 'API key deleted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get available permissions
router.get('/permissions', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  return res.json(apiResponse.success(API_PERMISSIONS))
})

// ==================== External API Endpoints (for third-party integrations) ====================

// Get courses
router.get('/v1/courses', authenticateApiKey, requirePermission(API_PERMISSIONS.READ_COURSES), async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {
      schoolId: req.apiKey!.schoolId,
      deletedAt: null
    }

    if (status) {
      where.status = status
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
          status: true,
          startDate: true,
          endDate: true,
          maxStudents: true,
          price: true,
          currency: true,
          _count: { select: { enrollments: true, lessons: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.course.count({ where })
    ])

    return res.json(apiResponse.paginated(courses, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get single course
router.get('/v1/courses/:id', authenticateApiKey, requirePermission(API_PERMISSIONS.READ_COURSES), async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        id: req.params.id,
        schoolId: req.apiKey!.schoolId,
        deletedAt: null
      },
      include: {
        lessons: {
          select: {
            id: true,
            lessonNumber: true,
            title: true,
            scheduledAt: true,
            duration: true,
            status: true
          },
          orderBy: { lessonNumber: 'asc' }
        },
        _count: { select: { enrollments: true } }
      }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    return res.json(apiResponse.success(course))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get enrollments
router.get('/v1/enrollments', authenticateApiKey, requirePermission(API_PERMISSIONS.READ_ENROLLMENTS), async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, courseId, status } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {
      course: { schoolId: req.apiKey!.schoolId }
    }

    if (courseId) where.courseId = courseId
    if (status) where.status = status

    const [enrollments, total] = await Promise.all([
      prisma.enrollment.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          student: {
            include: { user: { select: { name: true, email: true } } }
          },
          course: { select: { name: true } }
        },
        orderBy: { enrolledAt: 'desc' }
      }),
      prisma.enrollment.count({ where })
    ])

    return res.json(apiResponse.paginated(enrollments, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    return handleError(res, error)
  }
})

// Create enrollment
router.post('/v1/enrollments', authenticateApiKey, requirePermission(API_PERMISSIONS.WRITE_ENROLLMENTS), async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.body

    if (!studentId || !courseId) {
      return res.status(400).json(apiResponse.error('studentId and courseId required', 'VALIDATION_ERROR'))
    }

    // Verify course belongs to school
    const course = await prisma.course.findFirst({
      where: { id: courseId, schoolId: req.apiKey!.schoolId, deletedAt: null }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    // Verify student belongs to school
    const student = await prisma.student.findFirst({
      where: { id: studentId, schoolId: req.apiKey!.schoolId, deletedAt: null }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'NOT_FOUND'))
    }

    // Check existing enrollment
    const existing = await prisma.enrollment.findUnique({
      where: { studentId_courseId: { studentId, courseId } }
    })

    if (existing) {
      return res.status(409).json(apiResponse.error('Student already enrolled', 'ALREADY_ENROLLED'))
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
        amountDue: course.price
      },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        course: { select: { name: true } }
      }
    })

    return res.status(201).json(apiResponse.success(enrollment, 'Enrollment created'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student progress
router.get('/v1/progress', authenticateApiKey, requirePermission(API_PERMISSIONS.READ_PROGRESS), async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.query

    const where: any = {
      course: { schoolId: req.apiKey!.schoolId }
    }

    if (studentId) where.studentId = studentId
    if (courseId) where.courseId = courseId

    const progress = await prisma.progress.findMany({
      where,
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        course: { select: { name: true } }
      }
    })

    return res.json(apiResponse.success(progress))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get students
router.get('/v1/students', authenticateApiKey, requirePermission(API_PERMISSIONS.READ_STUDENTS), async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {
      schoolId: req.apiKey!.schoolId,
      deletedAt: null
    }

    if (search) {
      where.user = {
        OR: [
          { name: { contains: String(search), mode: 'insensitive' } },
          { email: { contains: String(search), mode: 'insensitive' } }
        ]
      }
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: { select: { name: true, email: true } },
          _count: { select: { enrollments: true, certificates: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.student.count({ where })
    ])

    return res.json(apiResponse.paginated(students, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
