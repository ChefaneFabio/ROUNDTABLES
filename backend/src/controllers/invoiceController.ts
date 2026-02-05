import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'
import { InvoiceService } from '../services/InvoiceService'
import { InvoiceStatus, RecipientType, FatturaType, PaymentMethodCode, SdiStatus } from '@prisma/client'

const router = Router()

// Validation schemas
const lineItemSchema = Joi.object({
  description: Joi.string().required(),
  quantity: Joi.number().min(0).required(),
  unitPrice: Joi.number().min(0).required(),
  vatRate: Joi.number().min(0).max(100).required(),
  total: Joi.number().min(0).required()
})

const createInvoiceSchema = Joi.object({
  recipientType: Joi.string().valid(...Object.values(RecipientType)).required(),
  recipientName: Joi.string().required(),
  recipientAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().max(2).required(),
    cap: Joi.string().pattern(/^\d{5}$/).required(),
    country: Joi.string().default('IT')
  }).required(),
  recipientVatNumber: Joi.string().pattern(/^[A-Z]{2}\d{11}$|^\d{11}$/).optional(),
  recipientFiscalCode: Joi.string().pattern(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$|^\d{11}$/).optional(),
  recipientCodiceSDI: Joi.string().length(7).optional(),
  recipientPEC: Joi.string().email().optional(),
  lineItems: Joi.array().items(lineItemSchema).min(1).required(),
  documentType: Joi.string().valid(...Object.values(FatturaType)).optional(),
  paymentMethod: Joi.string().valid(...Object.values(PaymentMethodCode)).optional(),
  paymentTerms: Joi.string().max(200).optional(),
  dueDate: Joi.date().iso().optional(),
  notes: Joi.string().max(2000).optional(),
  isElectronic: Joi.boolean().optional()
})

const createFromEnrollmentSchema = Joi.object({
  enrollmentId: Joi.string().required(),
  isElectronic: Joi.boolean().optional(),
  recipientType: Joi.string().valid(...Object.values(RecipientType)).optional(),
  recipientCodiceSDI: Joi.string().length(7).optional(),
  recipientPEC: Joi.string().email().optional()
})

const installmentPlanSchema = Joi.object({
  enrollmentId: Joi.string().required(),
  totalAmount: Joi.number().min(0).required(),
  numberOfInstallments: Joi.number().integer().min(2).max(24).required(),
  startDate: Joi.date().iso().required(),
  frequency: Joi.string().valid('WEEKLY', 'BIWEEKLY', 'MONTHLY', 'QUARTERLY').required()
})

const payInstallmentSchema = Joi.object({
  amount: Joi.number().min(0).required(),
  paymentId: Joi.string().optional()
})

// ============================================
// INVOICE MANAGEMENT
// ============================================

// Get all invoices
router.get('/', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      status,
      year,
      month,
      isElectronic
    } = req.query

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = { schoolId }

    if (status) where.status = status as InvoiceStatus
    if (isElectronic !== undefined) where.isElectronic = isElectronic === 'true'

    if (year) {
      const yearNum = Number(year)
      const monthNum = month ? Number(month) : undefined

      if (monthNum) {
        where.invoiceDate = {
          gte: new Date(yearNum, monthNum - 1, 1),
          lt: new Date(yearNum, monthNum, 1)
        }
      } else {
        where.invoiceDate = {
          gte: new Date(yearNum, 0, 1),
          lt: new Date(yearNum + 1, 0, 1)
        }
      }
    }

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { invoiceDate: 'desc' },
        include: {
          payments: { select: { id: true, amount: true, status: true } }
        }
      }),
      prisma.invoice.count({ where })
    ])

    res.json(apiResponse.paginated(invoices, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get invoice by ID
router.get('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        school: true,
        payments: true,
        payrollRecords: {
          include: {
            teacher: { include: { user: { select: { name: true } } } }
          }
        }
      }
    })

    if (!invoice) {
      return res.status(404).json(apiResponse.error('Invoice not found', 'NOT_FOUND'))
    }

    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== invoice.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(invoice))
  } catch (error) {
    handleError(res, error)
  }
})

// Create invoice
router.post('/', authenticate, requireSchoolAdmin, validateRequest(createInvoiceSchema), async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    const invoice = await InvoiceService.createInvoice({
      schoolId,
      ...req.body
    })

    res.status(201).json(apiResponse.success(invoice, 'Invoice created'))
  } catch (error) {
    handleError(res, error)
  }
})

// Create invoice from enrollment
router.post('/from-enrollment', authenticate, requireSchoolAdmin, validateRequest(createFromEnrollmentSchema), async (req: Request, res: Response) => {
  try {
    const invoice = await InvoiceService.createInvoiceFromEnrollment(
      req.body.enrollmentId,
      {
        isElectronic: req.body.isElectronic,
        recipientType: req.body.recipientType,
        recipientCodiceSDI: req.body.recipientCodiceSDI,
        recipientPEC: req.body.recipientPEC
      }
    )

    res.status(201).json(apiResponse.success(invoice, 'Invoice created from enrollment'))
  } catch (error) {
    handleError(res, error)
  }
})

// Issue invoice
router.post('/:id/issue', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const invoice = await prisma.invoice.findUnique({ where: { id } })

    if (!invoice) {
      return res.status(404).json(apiResponse.error('Invoice not found', 'NOT_FOUND'))
    }

    if (invoice.status !== 'DRAFT') {
      return res.status(400).json(apiResponse.error('Only draft invoices can be issued', 'INVALID_STATUS'))
    }

    const updated = await InvoiceService.issueInvoice(id)

    res.json(apiResponse.success(updated, 'Invoice issued'))
  } catch (error) {
    handleError(res, error)
  }
})

// Mark invoice as paid
router.post('/:id/mark-paid', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const updated = await InvoiceService.markAsPaid(id)

    res.json(apiResponse.success(updated, 'Invoice marked as paid'))
  } catch (error) {
    handleError(res, error)
  }
})

// Cancel invoice
router.post('/:id/cancel', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const invoice = await prisma.invoice.findUnique({ where: { id } })

    if (!invoice) {
      return res.status(404).json(apiResponse.error('Invoice not found', 'NOT_FOUND'))
    }

    if (invoice.status === 'PAID') {
      return res.status(400).json(apiResponse.error('Cannot cancel a paid invoice. Create a credit note instead.', 'INVALID_STATUS'))
    }

    const updated = await InvoiceService.cancelInvoice(id)

    res.json(apiResponse.success(updated, 'Invoice cancelled'))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// ITALIAN ELECTRONIC INVOICING (SDI)
// ============================================

// Generate FatturaPA XML
router.post('/:id/generate-fattura', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const xml = await InvoiceService.generateFatturaPA(id)

    res.json(apiResponse.success({ xml }, 'FatturaPA XML generated'))
  } catch (error) {
    handleError(res, error)
  }
})

// Send to SDI
router.post('/:id/send-sdi', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const invoice = await InvoiceService.sendToSDI(id)

    res.json(apiResponse.success(invoice, 'Invoice sent to SDI'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get SDI status
router.get('/:id/sdi-status', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      select: {
        id: true,
        invoiceNumber: true,
        isElectronic: true,
        sdiStatus: true,
        sdiIdentifier: true,
        sdiTransmissionDate: true,
        sdiResponseDate: true,
        sdiErrorMessage: true
      }
    })

    if (!invoice) {
      return res.status(404).json(apiResponse.error('Invoice not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(invoice))
  } catch (error) {
    handleError(res, error)
  }
})

// Webhook for SDI notifications (to be called by SDI integration service)
router.post('/sdi-webhook', async (req: Request, res: Response) => {
  try {
    const { invoiceId, status, message, identifier } = req.body

    // In production, verify webhook signature/authentication

    await InvoiceService.handleSDINotification(
      invoiceId,
      status as SdiStatus,
      message
    )

    res.json({ success: true })
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// INSTALLMENT PLANS
// ============================================

// Create installment plan
router.post('/installment-plan', authenticate, requireSchoolAdmin, validateRequest(installmentPlanSchema), async (req: Request, res: Response) => {
  try {
    const plan = await InvoiceService.createInstallmentPlan(req.body)

    res.status(201).json(apiResponse.success(plan, 'Installment plan created'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get installment plans
router.get('/installment-plans', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    const { status } = req.query

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    const where: any = {
      enrollment: {
        course: { schoolId }
      }
    }

    if (status) where.status = status

    const plans = await prisma.installmentPlan.findMany({
      where,
      include: {
        enrollment: {
          include: {
            student: { include: { user: { select: { name: true, email: true } } } },
            course: { select: { name: true } }
          }
        },
        installments: {
          orderBy: { number: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(apiResponse.success(plans))
  } catch (error) {
    handleError(res, error)
  }
})

// Get installment plan by ID
router.get('/installment-plan/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const plan = await prisma.installmentPlan.findUnique({
      where: { id },
      include: {
        enrollment: {
          include: {
            student: { include: { user: true } },
            course: true
          }
        },
        installments: {
          orderBy: { number: 'asc' },
          include: { payment: true }
        }
      }
    })

    if (!plan) {
      return res.status(404).json(apiResponse.error('Installment plan not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(plan))
  } catch (error) {
    handleError(res, error)
  }
})

// Pay an installment
router.post('/installment/:id/pay', authenticate, requireSchoolAdmin, validateRequest(payInstallmentSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { amount, paymentId } = req.body

    const installment = await InvoiceService.payInstallment(id, amount, paymentId)

    res.json(apiResponse.success(installment, 'Installment payment recorded'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get overdue installments
router.get('/installments/overdue', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    const overdue = await InvoiceService.getOverdueInstallments(schoolId)

    res.json(apiResponse.success(overdue))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// REPORTING
// ============================================

// Get invoice summary
router.get('/summary/:year', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    const { year } = req.params
    const { month } = req.query

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    const summary = await InvoiceService.getInvoiceSummary(
      schoolId,
      Number(year),
      month ? Number(month) : undefined
    )

    res.json(apiResponse.success(summary))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
