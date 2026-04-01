import { Router, Request, Response } from 'express'
import Joi from 'joi'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { prisma } from '../config/database'
import { authenticate } from '../middleware/auth'
import { requireAdmin, requireOrgAdmin, requireOrgAccess } from '../middleware/rbac'
import { validateRequest } from '../middleware/validateRequest'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'

const router = Router()

// Validation schemas
const updateOrgSchema = Joi.object({
  name: Joi.string().min(2).max(200).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().max(50).optional().allow(null),
  website: Joi.string().uri().optional().allow(null),
  description: Joi.string().max(1000).optional().allow(null),
  industry: Joi.string().max(100).optional().allow(null),
  size: Joi.string().max(50).optional().allow(null),
  vatNumber: Joi.string().max(50).optional().allow(null),
  fiscalCode: Joi.string().max(50).optional().allow(null),
  sdiCode: Joi.string().max(10).optional().allow(null),
  pecEmail: Joi.string().email().optional().allow(null),
  billingEmail: Joi.string().email().optional().allow(null),
  billingAddress: Joi.object().optional().allow(null),
  legalAddress: Joi.object().optional().allow(null)
})

const inviteEmployeeSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(200).required(),
  languageLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional()
})

// GET / - List organizations
router.get('/', authenticate, requireOrgAdmin, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      search
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    // ORG_ADMIN can only see their own organization
    if (req.user?.role === 'ORG_ADMIN') {
      const org = await prisma.organization.findFirst({
        where: { id: req.user.organizationId!, deletedAt: null },
        include: {
          _count: {
            select: {
              employees: true,
              seatLicenses: true
            }
          }
        }
      })

      if (!org) {
        return res.status(404).json(apiResponse.error('Organization not found', 'NOT_FOUND'))
      }

      return res.json(apiResponse.paginated([org], { page: 1, limit: 1, total: 1 }))
    }

    // ADMIN: list all organizations
    const where: any = { deletedAt: null }

    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } }
      ]
    }

    const [organizations, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          _count: {
            select: {
              employees: true,
              seatLicenses: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.organization.count({ where })
    ])

    res.json(apiResponse.paginated(organizations, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /:id - Organization detail
router.get('/:id', authenticate, requireOrgAdmin, requireOrgAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const organization = await prisma.organization.findFirst({
      where: { id, deletedAt: null },
      include: {
        orgAdmins: {
          include: {
            user: { select: { name: true, email: true } }
          }
        },
        _count: {
          select: {
            employees: true,
            seatLicenses: true
          }
        }
      }
    })

    if (!organization) {
      return res.status(404).json(apiResponse.error('Organization not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(organization))
  } catch (error) {
    handleError(res, error)
  }
})

// PUT /:id - Update organization profile/billing
router.put('/:id', authenticate, requireOrgAdmin, requireOrgAccess, validateRequest(updateOrgSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const organization = await prisma.organization.findFirst({
      where: { id, deletedAt: null }
    })

    if (!organization) {
      return res.status(404).json(apiResponse.error('Organization not found', 'NOT_FOUND'))
    }

    const updated = await prisma.organization.update({
      where: { id },
      data: req.body,
      include: {
        _count: {
          select: {
            employees: true,
            seatLicenses: true
          }
        }
      }
    })

    res.json(apiResponse.success(updated, 'Organization updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// DELETE /:id - Soft delete (ADMIN only)
router.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const organization = await prisma.organization.findFirst({
      where: { id, deletedAt: null }
    })

    if (!organization) {
      return res.status(404).json(apiResponse.error('Organization not found', 'NOT_FOUND'))
    }

    await prisma.organization.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }
    })

    res.json(apiResponse.success(null, 'Organization deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /:id/employees - List employees with progress
router.get('/:id/employees', authenticate, requireOrgAdmin, requireOrgAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where = { organizationId: id, deletedAt: null as any }

    const [employees, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: { select: { name: true, email: true } },
          enrollments: {
            include: {
              course: { select: { name: true } }
            }
          },
          progress: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.student.count({ where })
    ])

    res.json(apiResponse.paginated(employees, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// POST /:id/employees/invite - Invite employee by email
router.post('/:id/employees/invite', authenticate, requireOrgAdmin, requireOrgAccess, validateRequest(inviteEmployeeSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { email, name, languageLevel } = req.body

    // Look up org to get schoolId
    const organization = await prisma.organization.findFirst({
      where: { id, deletedAt: null }
    })

    if (!organization) {
      return res.status(404).json(apiResponse.error('Organization not found', 'NOT_FOUND'))
    }

    // Check if user already exists with that email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json(apiResponse.error('User with this email already exists', 'EMAIL_EXISTS'))
    }

    // Generate random password and hash it
    const randomPassword = crypto.randomBytes(16).toString('hex')
    const hashedPassword = await bcrypt.hash(randomPassword, 12)

    // Create User + Student in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'STUDENT'
        }
      })

      const student = await tx.student.create({
        data: {
          userId: user.id,
          schoolId: organization.schoolId,
          organizationId: id,
          ...(languageLevel && { languageLevel })
        },
        include: {
          user: { select: { name: true, email: true } }
        }
      })

      return student
    })

    // In production would send invite email
    res.status(201).json(apiResponse.success(result, 'Employee invited successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// DELETE /:id/employees/:studentId - Remove employee from org
router.delete('/:id/employees/:studentId', authenticate, requireOrgAdmin, requireOrgAccess, async (req: Request, res: Response) => {
  try {
    const { id, studentId } = req.params

    const student = await prisma.student.findFirst({
      where: { id: studentId, organizationId: id }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Employee not found in this organization', 'NOT_FOUND'))
    }

    await prisma.student.update({
      where: { id: studentId },
      data: { organizationId: null }
    })

    res.json(apiResponse.success(null, 'Employee removed from organization'))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /:id/dashboard - Org stats
router.get('/:id/dashboard', authenticate, requireOrgAdmin, requireOrgAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const [
      totalEmployees,
      seatLicenses,
      activeEnrollments,
      enrollmentsWithProgress
    ] = await Promise.all([
      prisma.student.count({ where: { organizationId: id, deletedAt: null } }),
      prisma.seatLicense.findMany({
        where: { organizationId: id },
        select: { totalSeats: true, usedSeats: true }
      }),
      prisma.enrollment.count({
        where: {
          student: { organizationId: id },
          status: 'ACTIVE'
        }
      }),
      prisma.progress.findMany({
        where: {
          student: { organizationId: id }
        },
        select: { percentage: true }
      })
    ])

    const totalSeatLicenses = seatLicenses.length
    const totalSeats = seatLicenses.reduce((sum, sl) => sum + sl.totalSeats, 0)
    const usedSeats = seatLicenses.reduce((sum, sl) => sum + sl.usedSeats, 0)

    const averageProgress = enrollmentsWithProgress.length > 0
      ? enrollmentsWithProgress.reduce((sum, p) => sum + Number(p.percentage), 0) / enrollmentsWithProgress.length
      : 0

    const stats = {
      totalEmployees,
      totalSeatLicenses,
      totalSeats,
      usedSeats,
      activeEnrollments,
      averageProgress: Math.round(averageProgress * 100) / 100
    }

    res.json(apiResponse.success(stats))
  } catch (error) {
    handleError(res, error)
  }
})

// Get invoices for organization (client view)
router.get('/:id/invoices', authenticate, requireOrgAdmin, requireOrgAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const invoices = await prisma.invoice.findMany({
      where: { organizationId: id },
      orderBy: { invoiceDate: 'desc' },
      select: {
        id: true, invoiceNumber: true, invoiceDate: true, dueDate: true,
        subtotal: true, vatRate: true, vatAmount: true, totalAmount: true,
        currency: true, status: true, paidAt: true, sdiStatus: true
      }
    })
    res.json(apiResponse.success(invoices))
  } catch (error) {
    handleError(res, error)
  }
})

// Get payments for organization (client view)
router.get('/:id/payments', authenticate, requireOrgAdmin, requireOrgAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const payments = await prisma.payment.findMany({
      where: { organizationId: id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, amount: true, currency: true, status: true,
        paymentMethod: true, transactionId: true, paidAt: true, createdAt: true,
        enrollment: {
          select: { course: { select: { name: true } }, student: { select: { user: { select: { name: true } } } } }
        }
      }
    })
    res.json(apiResponse.success(payments))
  } catch (error) {
    handleError(res, error)
  }
})

// Get employee progress report for organization
router.get('/:id/reports', authenticate, requireOrgAdmin, requireOrgAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const employees = await prisma.student.findMany({
      where: { organizationId: id, deletedAt: null },
      include: {
        user: { select: { name: true, email: true } },
        enrollments: {
          include: {
            course: { select: { name: true, status: true } }
          }
        },
        progress: true
      }
    })

    const report = employees.map(emp => {
      const progressMap = new Map(emp.progress.map(p => [p.courseId, p]))

      return {
        studentId: emp.id,
        name: emp.user.name,
        email: emp.user.email,
        languageLevel: emp.languageLevel,
        courses: emp.enrollments.map(e => {
          const prog = progressMap.get(e.courseId)
          return {
            courseName: e.course.name,
            courseStatus: e.course.status,
            enrollmentStatus: e.status,
            progress: prog ? Number(prog.percentage) : 0,
            completedLessons: prog?.completedLessons || 0,
            totalLessons: prog?.totalLessons || 0
          }
        }),
        totalEnrollments: emp.enrollments.length,
        activeEnrollments: emp.enrollments.filter(e => e.status === 'ACTIVE').length,
        avgProgress: emp.progress.length > 0
          ? Math.round(emp.progress.reduce((sum, p) => sum + Number(p.percentage), 0) / emp.progress.length)
          : 0
      }
    })

    res.json(apiResponse.success(report))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
