import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireAdmin, requireOrgAdmin, requireOrgAccess } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'

const router = Router()

// Validation schemas
const createSeatLicenseSchema = Joi.object({
  organizationId: Joi.string().required(),
  courseId: Joi.string().required(),
  totalSeats: Joi.number().integer().min(1).required(),
  pricePerSeat: Joi.number().min(0).required(),
  startsAt: Joi.date().iso().required(),
  expiresAt: Joi.date().iso().optional(),
  autoRenew: Joi.boolean().optional(),
  notes: Joi.string().optional()
})

const updateSeatLicenseSchema = Joi.object({
  totalSeats: Joi.number().integer().min(1).optional(),
  pricePerSeat: Joi.number().min(0).optional(),
  expiresAt: Joi.date().iso().optional(),
  autoRenew: Joi.boolean().optional(),
  notes: Joi.string().optional(),
  status: Joi.string().valid('ACTIVE', 'EXPIRED', 'CANCELLED', 'SUSPENDED').optional()
})

const allocateSeatSchema = Joi.object({
  studentId: Joi.string().required()
})

// Create seat license (ADMIN only)
router.post('/', authenticate, requireAdmin, validateRequest(createSeatLicenseSchema), async (req: Request, res: Response) => {
  try {
    const { organizationId, courseId, totalSeats, pricePerSeat, startsAt, expiresAt, autoRenew, notes } = req.body

    // Verify org exists
    const organization = await prisma.organization.findUnique({ where: { id: organizationId } })
    if (!organization) {
      return res.status(404).json(apiResponse.error('Organization not found', 'ORG_NOT_FOUND'))
    }

    // Verify course exists
    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'COURSE_NOT_FOUND'))
    }

    const license = await prisma.seatLicense.create({
      data: {
        organizationId,
        courseId,
        totalSeats,
        usedSeats: 0,
        pricePerSeat,
        currency: 'EUR',
        status: 'ACTIVE',
        startsAt: new Date(startsAt),
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        autoRenew: autoRenew ?? false,
        notes: notes ?? null
      },
      include: {
        organization: { select: { id: true, name: true } },
        course: { select: { id: true, name: true } }
      }
    })

    res.status(201).json(apiResponse.success(license, 'Seat license created'))
  } catch (error) {
    handleError(res, error)
  }
})

// List seat licenses
router.get('/', authenticate, requireOrgAdmin, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      organizationId
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {}

    if (req.user?.role === 'ADMIN') {
      if (organizationId) where.organizationId = String(organizationId)
    } else if (req.user?.role === 'ORG_ADMIN') {
      where.organizationId = req.user.organizationId
    }

    const [licenses, total] = await Promise.all([
      prisma.seatLicense.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          organization: { select: { id: true, name: true } },
          course: { select: { id: true, name: true } },
          _count: { select: { seatAllocations: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.seatLicense.count({ where })
    ])

    res.json(apiResponse.paginated(licenses, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get seat license detail
router.get('/:id', authenticate, requireOrgAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const license = await prisma.seatLicense.findUnique({
      where: { id },
      include: {
        organization: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, name: true } },
        seatAllocations: {
          include: {
            student: {
              include: { user: { select: { name: true, email: true } } }
            },
            enrollment: { select: { id: true, status: true } }
          }
        }
      }
    })

    if (!license) {
      return res.status(404).json(apiResponse.error('Seat license not found', 'NOT_FOUND'))
    }

    // ORG_ADMIN access check
    if (req.user?.role === 'ORG_ADMIN' && license.organizationId !== req.user.organizationId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(license))
  } catch (error) {
    handleError(res, error)
  }
})

// Update seat license (ADMIN only)
router.put('/:id', authenticate, requireAdmin, validateRequest(updateSeatLicenseSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { totalSeats, pricePerSeat, expiresAt, autoRenew, notes, status } = req.body

    const license = await prisma.seatLicense.findUnique({ where: { id } })

    if (!license) {
      return res.status(404).json(apiResponse.error('Seat license not found', 'NOT_FOUND'))
    }

    // Validate totalSeats >= current usedSeats
    if (totalSeats !== undefined && totalSeats < license.usedSeats) {
      return res.status(400).json(
        apiResponse.error(
          `Cannot set totalSeats to ${totalSeats}. Currently ${license.usedSeats} seats are in use.`,
          'SEATS_IN_USE'
        )
      )
    }

    const updateData: any = {}
    if (totalSeats !== undefined) updateData.totalSeats = totalSeats
    if (pricePerSeat !== undefined) updateData.pricePerSeat = pricePerSeat
    if (expiresAt !== undefined) updateData.expiresAt = new Date(expiresAt)
    if (autoRenew !== undefined) updateData.autoRenew = autoRenew
    if (notes !== undefined) updateData.notes = notes
    if (status !== undefined) updateData.status = status

    const updated = await prisma.seatLicense.update({
      where: { id },
      data: updateData,
      include: {
        organization: { select: { id: true, name: true } },
        course: { select: { id: true, name: true } }
      }
    })

    res.json(apiResponse.success(updated, 'Seat license updated'))
  } catch (error) {
    handleError(res, error)
  }
})

// Cancel license (ADMIN only)
router.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const license = await prisma.seatLicense.findUnique({ where: { id } })

    if (!license) {
      return res.status(404).json(apiResponse.error('Seat license not found', 'NOT_FOUND'))
    }

    const updated = await prisma.seatLicense.update({
      where: { id },
      data: { status: 'CANCELLED' }
    })

    res.json(apiResponse.success(updated, 'Seat license cancelled'))
  } catch (error) {
    handleError(res, error)
  }
})

// Allocate employee to seat
router.post('/:id/allocate', authenticate, requireOrgAdmin, validateRequest(allocateSeatSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { studentId } = req.body

    const license = await prisma.seatLicense.findUnique({
      where: { id },
      include: { course: true }
    })

    if (!license) {
      return res.status(404).json(apiResponse.error('Seat license not found', 'NOT_FOUND'))
    }

    // ORG_ADMIN access check
    if (req.user?.role === 'ORG_ADMIN' && license.organizationId !== req.user.organizationId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Check license is active
    if (license.status !== 'ACTIVE') {
      return res.status(400).json(apiResponse.error('License is not active', 'LICENSE_NOT_ACTIVE'))
    }

    // Check seats available
    if (license.usedSeats >= license.totalSeats) {
      return res.status(400).json(apiResponse.error('No seats available', 'NO_SEATS_AVAILABLE'))
    }

    // Check student belongs to the same organization
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'STUDENT_NOT_FOUND'))
    }

    if (student.organizationId !== license.organizationId) {
      return res.status(400).json(apiResponse.error('Student does not belong to this organization', 'ORG_MISMATCH'))
    }

    // Check student not already allocated to this license
    const existingAllocation = await prisma.seatAllocation.findFirst({
      where: { seatLicenseId: id, studentId, revokedAt: null }
    })

    if (existingAllocation) {
      return res.status(400).json(apiResponse.error('Student is already allocated to this license', 'ALREADY_ALLOCATED'))
    }

    // Transaction: create allocation, enrollment, progress, increment usedSeats
    const allocation = await prisma.$transaction(async (tx) => {
      // Create SeatAllocation
      const seatAllocation = await tx.seatAllocation.create({
        data: {
          seatLicenseId: id,
          studentId
        }
      })

      // Create Enrollment
      const enrollment = await tx.enrollment.create({
        data: {
          studentId,
          courseId: license.courseId,
          status: 'ACTIVE',
          paymentStatus: 'PAID'
        }
      })

      // Create Progress record
      await tx.progress.create({
        data: {
          studentId,
          courseId: license.courseId,
          completedLessons: 0,
          totalLessons: 0,
          percentage: 0
        }
      })

      // Increment usedSeats
      await tx.seatLicense.update({
        where: { id },
        data: { usedSeats: { increment: 1 } }
      })

      // Update the SeatAllocation with enrollmentId
      const updatedAllocation = await tx.seatAllocation.update({
        where: { id: seatAllocation.id },
        data: { enrollmentId: enrollment.id },
        include: {
          student: {
            include: { user: { select: { name: true, email: true } } }
          },
          enrollment: { select: { id: true, status: true } }
        }
      })

      return updatedAllocation
    })

    res.status(201).json(apiResponse.success(allocation, 'Seat allocated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Revoke seat
router.delete('/:id/allocate/:studentId', authenticate, requireOrgAdmin, async (req: Request, res: Response) => {
  try {
    const { id, studentId } = req.params

    const license = await prisma.seatLicense.findUnique({ where: { id } })

    if (!license) {
      return res.status(404).json(apiResponse.error('Seat license not found', 'NOT_FOUND'))
    }

    // ORG_ADMIN access check
    if (req.user?.role === 'ORG_ADMIN' && license.organizationId !== req.user.organizationId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Find the allocation
    const allocation = await prisma.seatAllocation.findFirst({
      where: { seatLicenseId: id, studentId, revokedAt: null }
    })

    if (!allocation) {
      return res.status(404).json(apiResponse.error('Seat allocation not found', 'ALLOCATION_NOT_FOUND'))
    }

    // Transaction: revoke allocation, update enrollment, decrement usedSeats
    await prisma.$transaction(async (tx) => {
      // Set revokedAt on allocation
      await tx.seatAllocation.update({
        where: { id: allocation.id },
        data: { revokedAt: new Date() }
      })

      // Update enrollment status to DROPPED if exists
      if (allocation.enrollmentId) {
        await tx.enrollment.update({
          where: { id: allocation.enrollmentId },
          data: { status: 'DROPPED' }
        })
      }

      // Decrement usedSeats
      await tx.seatLicense.update({
        where: { id },
        data: { usedSeats: { decrement: 1 } }
      })
    })

    res.json(apiResponse.success(null, 'Seat revoked successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
