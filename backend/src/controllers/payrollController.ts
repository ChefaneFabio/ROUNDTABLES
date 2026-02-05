import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireTeacher, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PayrollService } from '../services/PayrollService'
import { PayrollStatus } from '@prisma/client'

const router = Router()

// Validation schemas
const createPayrollSchema = Joi.object({
  teacherId: Joi.string().required(),
  periodStart: Joi.date().iso().required(),
  periodEnd: Joi.date().iso().required(),
  bonuses: Joi.number().min(0).optional(),
  bonusNotes: Joi.string().max(500).optional(),
  deductions: Joi.number().min(0).optional(),
  notes: Joi.string().max(1000).optional()
})

const generateMonthlySchema = Joi.object({
  year: Joi.number().integer().min(2020).max(2100).required(),
  month: Joi.number().integer().min(1).max(12).required()
})

const markAsPaidSchema = Joi.object({
  paymentMethod: Joi.string().required(),
  paymentReference: Joi.string().optional()
})

// ============================================
// PAYROLL CALCULATION & PREVIEW
// ============================================

// Calculate payroll preview (without creating)
router.get('/calculate/:teacherId', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params
    const { periodStart, periodEnd } = req.query

    if (!periodStart || !periodEnd) {
      return res.status(400).json(apiResponse.error('periodStart and periodEnd are required', 'MISSING_PARAMS'))
    }

    const calculation = await PayrollService.calculatePayroll(
      teacherId,
      new Date(String(periodStart)),
      new Date(String(periodEnd))
    )

    res.json(apiResponse.success(calculation))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// PAYROLL MANAGEMENT
// ============================================

// Create payroll record
router.post('/', authenticate, requireSchoolAdmin, validateRequest(createPayrollSchema), async (req: Request, res: Response) => {
  try {
    const payroll = await PayrollService.createPayroll({
      teacherId: req.body.teacherId,
      periodStart: new Date(req.body.periodStart),
      periodEnd: new Date(req.body.periodEnd),
      bonuses: req.body.bonuses,
      bonusNotes: req.body.bonusNotes,
      deductions: req.body.deductions,
      notes: req.body.notes
    })

    res.status(201).json(apiResponse.success(payroll, 'Payroll record created'))
  } catch (error) {
    handleError(res, error)
  }
})

// Generate monthly payrolls for all teachers
router.post('/generate-monthly', authenticate, requireSchoolAdmin, validateRequest(generateMonthlySchema), async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    const { year, month } = req.body

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    const payrolls = await PayrollService.generateMonthlyPayrolls(schoolId, year, month)

    res.status(201).json(apiResponse.success(payrolls, `Generated ${payrolls.length} payroll records`))
  } catch (error) {
    handleError(res, error)
  }
})

// Get all payrolls (school admin)
router.get('/', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    const { status, year, month } = req.query

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    const payrolls = await PayrollService.getPayrollsBySchool(
      schoolId,
      status ? (status as PayrollStatus) : undefined,
      year ? Number(year) : undefined,
      month ? Number(month) : undefined
    )

    res.json(apiResponse.success(payrolls))
  } catch (error) {
    handleError(res, error)
  }
})

// Get payroll by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const payroll = await prisma.teacherPayroll.findUnique({
      where: { id },
      include: {
        teacher: {
          include: {
            user: { select: { name: true, email: true } },
            school: { select: { id: true, name: true } }
          }
        },
        invoice: true
      }
    })

    if (!payroll) {
      return res.status(404).json(apiResponse.error('Payroll not found', 'NOT_FOUND'))
    }

    // Access control
    const canAccess = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === payroll.teacher.school.id) ||
      req.user?.teacherId === payroll.teacherId

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(payroll))
  } catch (error) {
    handleError(res, error)
  }
})

// Approve payroll
router.post('/:id/approve', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const payroll = await prisma.teacherPayroll.findUnique({
      where: { id },
      include: { teacher: { include: { school: true } } }
    })

    if (!payroll) {
      return res.status(404).json(apiResponse.error('Payroll not found', 'NOT_FOUND'))
    }

    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== payroll.teacher.school.id) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (payroll.status !== 'PENDING') {
      return res.status(400).json(apiResponse.error('Only pending payrolls can be approved', 'INVALID_STATUS'))
    }

    const updated = await PayrollService.approvePayroll(id)

    res.json(apiResponse.success(updated, 'Payroll approved'))
  } catch (error) {
    handleError(res, error)
  }
})

// Mark payroll as paid
router.post('/:id/pay', authenticate, requireSchoolAdmin, validateRequest(markAsPaidSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { paymentMethod, paymentReference } = req.body

    const payroll = await prisma.teacherPayroll.findUnique({
      where: { id },
      include: { teacher: { include: { school: true } } }
    })

    if (!payroll) {
      return res.status(404).json(apiResponse.error('Payroll not found', 'NOT_FOUND'))
    }

    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== payroll.teacher.school.id) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (payroll.status !== 'APPROVED') {
      return res.status(400).json(apiResponse.error('Only approved payrolls can be marked as paid', 'INVALID_STATUS'))
    }

    const updated = await PayrollService.markAsPaid(id, paymentMethod, paymentReference)

    res.json(apiResponse.success(updated, 'Payroll marked as paid'))
  } catch (error) {
    handleError(res, error)
  }
})

// Cancel payroll
router.post('/:id/cancel', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const payroll = await prisma.teacherPayroll.findUnique({
      where: { id },
      include: { teacher: { include: { school: true } } }
    })

    if (!payroll) {
      return res.status(404).json(apiResponse.error('Payroll not found', 'NOT_FOUND'))
    }

    if (payroll.status === 'PAID') {
      return res.status(400).json(apiResponse.error('Cannot cancel a paid payroll', 'INVALID_STATUS'))
    }

    const updated = await PayrollService.cancelPayroll(id)

    res.json(apiResponse.success(updated, 'Payroll cancelled'))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// TEACHER VIEW
// ============================================

// Get my payrolls (teacher)
router.get('/my/list', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.teacherId
    const { year } = req.query

    if (!teacherId) {
      return res.status(400).json(apiResponse.error('Teacher ID not found', 'INVALID_USER'))
    }

    const payrolls = await PayrollService.getPayrollsByTeacher(
      teacherId,
      year ? Number(year) : undefined
    )

    res.json(apiResponse.success(payrolls))
  } catch (error) {
    handleError(res, error)
  }
})

// Get my yearly earnings report (teacher)
router.get('/my/report/:year', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.teacherId
    const { year } = req.params

    if (!teacherId) {
      return res.status(400).json(apiResponse.error('Teacher ID not found', 'INVALID_USER'))
    }

    const report = await PayrollService.getTeacherEarningsReport(teacherId, Number(year))

    res.json(apiResponse.success(report))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// REPORTING
// ============================================

// Get payroll summary for school
router.get('/summary/:year', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId
    const { year } = req.params
    const { month } = req.query

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    const summary = await PayrollService.getPayrollSummary(
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
