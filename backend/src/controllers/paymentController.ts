import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION, VALID_STATUS_TRANSITIONS } from '../utils/constants'
import { PaymentStatus } from '@prisma/client'

const router = Router()

// Validation schemas
const createPaymentSchema = Joi.object({
  enrollmentId: Joi.string().optional(),
  schoolId: Joi.string().optional(),
  amount: Joi.number().precision(2).positive().required(),
  currency: Joi.string().length(3).default('EUR'),
  paymentMethod: Joi.string().max(50).optional(),
  notes: Joi.string().max(1000).optional(),
  dueDate: Joi.date().iso().optional()
}).or('enrollmentId', 'schoolId')

const updatePaymentSchema = Joi.object({
  status: Joi.string().valid('PENDING', 'PARTIAL', 'PAID', 'OVERDUE', 'REFUNDED').optional(),
  paymentMethod: Joi.string().max(50).optional().allow(null),
  transactionId: Joi.string().max(100).optional().allow(null),
  notes: Joi.string().max(1000).optional().allow(null),
  paidAt: Joi.date().iso().optional().allow(null)
})

const recordPaymentSchema = Joi.object({
  amount: Joi.number().precision(2).positive().required(),
  paymentMethod: Joi.string().max(50).required(),
  transactionId: Joi.string().max(100).optional(),
  notes: Joi.string().max(1000).optional()
})

// Generate invoice number
const generateInvoiceNumber = async (): Promise<string> => {
  const year = new Date().getFullYear()
  const count = await prisma.payment.count()
  return `INV-${year}-${String(count + 1).padStart(5, '0')}`
}

// Get all payments
router.get('/', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      status,
      enrollmentId,
      schoolId,
      fromDate,
      toDate
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {}

    // Filter by school for non-admin users
    if (req.user?.role !== 'ADMIN') {
      where.OR = [
        { schoolId: req.user!.schoolId },
        { enrollment: { course: { schoolId: req.user!.schoolId } } }
      ]
    }

    if (status) where.status = String(status)
    if (enrollmentId) where.enrollmentId = String(enrollmentId)
    if (schoolId && req.user?.role === 'ADMIN') where.schoolId = String(schoolId)

    if (fromDate) {
      where.createdAt = { ...where.createdAt, gte: new Date(String(fromDate)) }
    }
    if (toDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(String(toDate)) }
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          enrollment: {
            include: {
              student: { include: { user: { select: { name: true, email: true } } } },
              course: { select: { name: true } }
            }
          },
          school: { select: { name: true, email: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.payment.count({ where })
    ])

    res.json(apiResponse.paginated(payments, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get payment summary/statistics
router.get('/summary', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { fromDate, toDate } = req.query

    const where: any = {}

    if (req.user?.role !== 'ADMIN') {
      where.OR = [
        { schoolId: req.user!.schoolId },
        { enrollment: { course: { schoolId: req.user!.schoolId } } }
      ]
    }

    if (fromDate) {
      where.createdAt = { ...where.createdAt, gte: new Date(String(fromDate)) }
    }
    if (toDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(String(toDate)) }
    }

    const [
      totalPayments,
      pendingPayments,
      paidPayments,
      overduePayments,
      totalAmount,
      paidAmount,
      pendingAmount
    ] = await Promise.all([
      prisma.payment.count({ where }),
      prisma.payment.count({ where: { ...where, status: 'PENDING' } }),
      prisma.payment.count({ where: { ...where, status: 'PAID' } }),
      prisma.payment.count({ where: { ...where, status: 'OVERDUE' } }),
      prisma.payment.aggregate({ where, _sum: { amount: true } }),
      prisma.payment.aggregate({ where: { ...where, status: 'PAID' }, _sum: { amount: true } }),
      prisma.payment.aggregate({ where: { ...where, status: { in: ['PENDING', 'PARTIAL', 'OVERDUE'] } }, _sum: { amount: true } })
    ])

    res.json(apiResponse.success({
      totalPayments,
      pendingPayments,
      paidPayments,
      overduePayments,
      totalAmount: totalAmount._sum.amount || 0,
      paidAmount: paidAmount._sum.amount || 0,
      pendingAmount: pendingAmount._sum.amount || 0,
      collectionRate: totalPayments > 0
        ? Math.round((paidPayments / totalPayments) * 100)
        : 0
    }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get overdue payments
router.get('/overdue', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const where: any = {
      status: { in: ['PENDING', 'PARTIAL'] },
      dueDate: { lt: new Date() }
    }

    if (req.user?.role !== 'ADMIN') {
      where.OR = [
        { schoolId: req.user!.schoolId },
        { enrollment: { course: { schoolId: req.user!.schoolId } } }
      ]
    }

    const payments = await prisma.payment.findMany({
      where,
      include: {
        enrollment: {
          include: {
            student: { include: { user: { select: { name: true, email: true } } } },
            course: { select: { name: true } }
          }
        },
        school: { select: { name: true } }
      },
      orderBy: { dueDate: 'asc' }
    })

    // Update status to OVERDUE for those that aren't already
    const toUpdate = payments.filter(p => p.status !== 'OVERDUE').map(p => p.id)
    if (toUpdate.length > 0) {
      await prisma.payment.updateMany({
        where: { id: { in: toUpdate } },
        data: { status: 'OVERDUE' }
      })
    }

    res.json(apiResponse.success(payments))
  } catch (error) {
    handleError(res, error)
  }
})

// Get payment by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        enrollment: {
          include: {
            student: { include: { user: { select: { id: true, name: true, email: true } } } },
            course: { select: { id: true, name: true, schoolId: true } }
          }
        },
        school: { select: { id: true, name: true, email: true } }
      }
    })

    if (!payment) {
      return res.status(404).json(apiResponse.error('Payment not found', 'NOT_FOUND'))
    }

    // Check access
    const schoolId = payment.schoolId || payment.enrollment?.course?.schoolId
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === schoolId ||
      (req.user?.studentId && payment.enrollment?.studentId === req.user.studentId)

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(payment))
  } catch (error) {
    handleError(res, error)
  }
})

// Create payment/invoice
router.post('/', authenticate, requireSchoolAdmin, validateRequest(createPaymentSchema), async (req: Request, res: Response) => {
  try {
    const data = req.body

    // Verify enrollment or school exists
    if (data.enrollmentId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: { id: data.enrollmentId },
        include: { course: true }
      })
      if (!enrollment) {
        return res.status(404).json(apiResponse.error('Enrollment not found', 'ENROLLMENT_NOT_FOUND'))
      }
      // Check access
      if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== enrollment.course.schoolId) {
        return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
      }
    }

    if (data.schoolId) {
      const school = await prisma.school.findUnique({ where: { id: data.schoolId } })
      if (!school) {
        return res.status(404).json(apiResponse.error('School not found', 'SCHOOL_NOT_FOUND'))
      }
      // Check access
      if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== data.schoolId) {
        return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
      }
    }

    const invoiceNumber = await generateInvoiceNumber()

    const payment = await prisma.payment.create({
      data: {
        ...data,
        invoiceNumber,
        status: 'PENDING'
      },
      include: {
        enrollment: {
          include: {
            student: { include: { user: { select: { name: true } } } },
            course: { select: { name: true } }
          }
        }
      }
    })

    res.status(201).json(apiResponse.success(payment, 'Payment/invoice created successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Record payment (mark as paid)
router.post('/:id/record', authenticate, requireSchoolAdmin, validateRequest(recordPaymentSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { amount, paymentMethod, transactionId, notes } = req.body

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { enrollment: { include: { course: true } } }
    })

    if (!payment) {
      return res.status(404).json(apiResponse.error('Payment not found', 'NOT_FOUND'))
    }

    // Check access
    const schoolId = payment.schoolId || payment.enrollment?.course?.schoolId
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (payment.status === 'PAID') {
      return res.status(400).json(apiResponse.error('Payment already marked as paid', 'ALREADY_PAID'))
    }

    const paymentAmount = Number(payment.amount)
    const paidAmount = Number(amount)

    let newStatus: PaymentStatus = 'PAID'
    if (paidAmount < paymentAmount) {
      newStatus = 'PARTIAL'
    }

    const updated = await prisma.payment.update({
      where: { id },
      data: {
        status: newStatus,
        paymentMethod,
        transactionId,
        notes: notes ? `${payment.notes || ''}\n${notes}`.trim() : payment.notes,
        paidAt: new Date()
      }
    })

    // Update enrollment payment status if linked
    if (payment.enrollmentId) {
      await prisma.enrollment.update({
        where: { id: payment.enrollmentId },
        data: {
          paymentStatus: newStatus,
          amountPaid: paidAmount
        }
      })
    }

    res.json(apiResponse.success(updated, `Payment recorded - ${newStatus}`))
  } catch (error) {
    handleError(res, error)
  }
})

// Update payment
router.put('/:id', authenticate, requireSchoolAdmin, validateRequest(updatePaymentSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { enrollment: { include: { course: true } } }
    })

    if (!payment) {
      return res.status(404).json(apiResponse.error('Payment not found', 'NOT_FOUND'))
    }

    // Check access
    const schoolId = payment.schoolId || payment.enrollment?.course?.schoolId
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Validate status transition if status is being updated
    if (req.body.status) {
      const validTransitions = VALID_STATUS_TRANSITIONS.payment[payment.status as keyof typeof VALID_STATUS_TRANSITIONS.payment]
      if (!validTransitions?.includes(req.body.status)) {
        return res.status(400).json(
          apiResponse.error(
            `Cannot transition from ${payment.status} to ${req.body.status}`,
            'INVALID_STATUS_TRANSITION'
          )
        )
      }
    }

    const updated = await prisma.payment.update({
      where: { id },
      data: req.body
    })

    res.json(apiResponse.success(updated, 'Payment updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Process refund
router.post('/:id/refund', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { reason } = req.body

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { enrollment: { include: { course: true } } }
    })

    if (!payment) {
      return res.status(404).json(apiResponse.error('Payment not found', 'NOT_FOUND'))
    }

    if (payment.status !== 'PAID') {
      return res.status(400).json(apiResponse.error('Can only refund paid payments', 'NOT_PAID'))
    }

    // Check access
    const schoolId = payment.schoolId || payment.enrollment?.course?.schoolId
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const updated = await prisma.payment.update({
      where: { id },
      data: {
        status: 'REFUNDED',
        notes: reason ? `${payment.notes || ''}\nRefund reason: ${reason}`.trim() : payment.notes
      }
    })

    // Update enrollment if linked
    if (payment.enrollmentId) {
      await prisma.enrollment.update({
        where: { id: payment.enrollmentId },
        data: { paymentStatus: 'REFUNDED', amountPaid: 0 }
      })
    }

    res.json(apiResponse.success(updated, 'Payment refunded'))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete payment (only pending, admin only)
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const payment = await prisma.payment.findUnique({ where: { id } })

    if (!payment) {
      return res.status(404).json(apiResponse.error('Payment not found', 'NOT_FOUND'))
    }

    if (payment.status !== 'PENDING') {
      return res.status(400).json(apiResponse.error('Can only delete pending payments', 'INVALID_STATUS'))
    }

    await prisma.payment.delete({ where: { id } })

    res.json(apiResponse.success(null, 'Payment deleted'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get payments for a student (their enrollments)
router.get('/student/:studentId', authenticate, async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params

    // Students can only see their own payments
    if (req.user?.role === 'STUDENT' && req.user.studentId !== studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'NOT_FOUND'))
    }

    // Check school access for non-admin
    if (req.user?.role !== 'ADMIN' && req.user?.role !== 'STUDENT' && req.user?.schoolId !== student.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const payments = await prisma.payment.findMany({
      where: {
        enrollment: { studentId }
      },
      include: {
        enrollment: {
          include: { course: { select: { name: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(apiResponse.success(payments))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
