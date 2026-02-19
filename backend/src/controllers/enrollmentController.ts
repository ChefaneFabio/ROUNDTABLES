import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION, VALID_STATUS_TRANSITIONS } from '../utils/constants'
import { EnrollmentStatus, PaymentStatus } from '@prisma/client'

const router = Router()

// Validation schemas
const createEnrollmentSchema = Joi.object({
  studentId: Joi.string().required(),
  courseId: Joi.string().required(),
  amountDue: Joi.number().precision(2).min(0).optional(),
  notes: Joi.string().max(1000).optional()
})

const updateEnrollmentSchema = Joi.object({
  status: Joi.string().valid(...Object.keys(VALID_STATUS_TRANSITIONS.enrollment)).optional(),
  paymentStatus: Joi.string().valid(...Object.keys(VALID_STATUS_TRANSITIONS.payment)).optional(),
  amountPaid: Joi.number().precision(2).min(0).optional(),
  notes: Joi.string().max(1000).optional().allow(null)
})

const bulkEnrollSchema = Joi.object({
  courseId: Joi.string().required(),
  studentIds: Joi.array().items(Joi.string()).min(1).required(),
  amountDue: Joi.number().precision(2).min(0).optional()
})

// Get all enrollments
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      courseId,
      studentId,
      status,
      paymentStatus
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {}

    // Apply access control
    if (req.user?.role === 'ADMIN') {
      where.course = { schoolId: req.user.schoolId }
    } else if (req.user?.role === 'TEACHER') {
      where.course = { courseTeachers: { some: { teacherId: req.user.teacherId } } }
    } else if (req.user?.role === 'STUDENT') {
      where.studentId = req.user.studentId
    }

    if (courseId) where.courseId = String(courseId)
    if (studentId) where.studentId = String(studentId)
    if (status) where.status = String(status)
    if (paymentStatus) where.paymentStatus = String(paymentStatus)

    const [enrollments, total] = await Promise.all([
      prisma.enrollment.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          student: {
            include: { user: { select: { name: true, email: true } } }
          },
          course: { select: { id: true, name: true, status: true, price: true, currency: true } }
        },
        orderBy: { enrolledAt: 'desc' }
      }),
      prisma.enrollment.count({ where })
    ])

    res.json(apiResponse.paginated(enrollments, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get enrollment by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: { select: { id: true, name: true, email: true } }
          }
        },
        course: {
          select: {
            id: true,
            name: true,
            status: true,
            price: true,
            currency: true,
            schoolId: true,
            _count: { select: { lessons: true } }
          }
        },
        payments: { orderBy: { createdAt: 'desc' } }
      }
    })

    if (!enrollment) {
      return res.status(404).json(apiResponse.error('Enrollment not found', 'NOT_FOUND'))
    }

    // Check access
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === enrollment.course.schoolId ||
      req.user?.studentId === enrollment.studentId

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(enrollment))
  } catch (error) {
    handleError(res, error)
  }
})

// Create enrollment
router.post('/', authenticate, requireSchoolAdmin, validateRequest(createEnrollmentSchema), async (req: Request, res: Response) => {
  try {
    const { studentId, courseId, amountDue, notes } = req.body

    // Verify student and course exist and belong to same school
    const [student, course] = await Promise.all([
      prisma.student.findFirst({ where: { id: studentId, deletedAt: null } }),
      prisma.course.findFirst({ where: { id: courseId, deletedAt: null } })
    ])

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'STUDENT_NOT_FOUND'))
    }

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'COURSE_NOT_FOUND'))
    }

    if (student.schoolId !== course.schoolId) {
      return res.status(400).json(apiResponse.error('Student and course must belong to the same school', 'SCHOOL_MISMATCH'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: { studentId_courseId: { studentId, courseId } }
    })

    if (existing) {
      return res.status(400).json(apiResponse.error('Student is already enrolled in this course', 'ALREADY_ENROLLED'))
    }

    // Check course capacity
    const currentEnrollments = await prisma.enrollment.count({
      where: { courseId, status: { in: ['PENDING', 'ACTIVE'] } }
    })

    if (currentEnrollments >= course.maxStudents) {
      return res.status(400).json(apiResponse.error('Course is at maximum capacity', 'COURSE_FULL'))
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
        amountDue: amountDue ?? course.price,
        notes,
        status: 'ACTIVE',
        paymentStatus: amountDue === 0 || !course.price ? 'PAID' : 'PENDING'
      },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        course: { select: { name: true } }
      }
    })

    // Create progress record
    const lessonCount = await prisma.lesson.count({ where: { courseId } })
    await prisma.progress.create({
      data: {
        studentId,
        courseId,
        totalLessons: lessonCount
      }
    })

    res.status(201).json(apiResponse.success(enrollment, 'Student enrolled successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Bulk enroll students
router.post('/bulk', authenticate, requireSchoolAdmin, validateRequest(bulkEnrollSchema), async (req: Request, res: Response) => {
  try {
    const { courseId, studentIds, amountDue } = req.body

    const course = await prisma.course.findFirst({
      where: { id: courseId, deletedAt: null }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'COURSE_NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Verify all students exist and belong to the school
    const students = await prisma.student.findMany({
      where: { id: { in: studentIds }, schoolId: course.schoolId, deletedAt: null }
    })

    if (students.length !== studentIds.length) {
      return res.status(400).json(apiResponse.error('Some students not found or not in this school', 'INVALID_STUDENTS'))
    }

    // Check capacity
    const currentCount = await prisma.enrollment.count({
      where: { courseId, status: { in: ['PENDING', 'ACTIVE'] } }
    })

    if (currentCount + studentIds.length > course.maxStudents) {
      return res.status(400).json(
        apiResponse.error(
          `Cannot enroll ${studentIds.length} students. Only ${course.maxStudents - currentCount} spots available.`,
          'INSUFFICIENT_CAPACITY'
        )
      )
    }

    // Get already enrolled students
    const existingEnrollments = await prisma.enrollment.findMany({
      where: { courseId, studentId: { in: studentIds } },
      select: { studentId: true }
    })

    const alreadyEnrolled = existingEnrollments.map(e => e.studentId)
    const newStudentIds = studentIds.filter((id: string) => !alreadyEnrolled.includes(id))

    if (newStudentIds.length === 0) {
      return res.status(400).json(apiResponse.error('All students are already enrolled', 'ALL_ALREADY_ENROLLED'))
    }

    const lessonCount = await prisma.lesson.count({ where: { courseId } })

    // Create enrollments and progress records
    await prisma.$transaction(async (tx) => {
      await tx.enrollment.createMany({
        data: newStudentIds.map((studentId: string) => ({
          studentId,
          courseId,
          amountDue: amountDue ?? course.price,
          status: 'ACTIVE' as EnrollmentStatus,
          paymentStatus: (amountDue === 0 || !course.price ? 'PAID' : 'PENDING') as PaymentStatus
        }))
      })

      await tx.progress.createMany({
        data: newStudentIds.map((studentId: string) => ({
          studentId,
          courseId,
          totalLessons: lessonCount
        })),
        skipDuplicates: true
      })
    })

    res.status(201).json(apiResponse.success({
      enrolled: newStudentIds.length,
      skipped: alreadyEnrolled.length
    }, `${newStudentIds.length} students enrolled successfully`))
  } catch (error) {
    handleError(res, error)
  }
})

// Update enrollment
router.put('/:id', authenticate, requireSchoolAdmin, validateRequest(updateEnrollmentSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status, paymentStatus, amountPaid, notes } = req.body

    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: { course: true }
    })

    if (!enrollment) {
      return res.status(404).json(apiResponse.error('Enrollment not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== enrollment.course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Validate status transition
    if (status) {
      const validTransitions = VALID_STATUS_TRANSITIONS.enrollment[enrollment.status as keyof typeof VALID_STATUS_TRANSITIONS.enrollment]
      if (!(validTransitions as readonly string[])?.includes(status)) {
        return res.status(400).json(
          apiResponse.error(
            `Cannot transition from ${enrollment.status} to ${status}`,
            'INVALID_STATUS_TRANSITION'
          )
        )
      }
    }

    // Validate payment status transition
    if (paymentStatus) {
      const validPaymentTransitions = VALID_STATUS_TRANSITIONS.payment[enrollment.paymentStatus as keyof typeof VALID_STATUS_TRANSITIONS.payment]
      if (!(validPaymentTransitions as readonly string[])?.includes(paymentStatus)) {
        return res.status(400).json(
          apiResponse.error(
            `Cannot transition payment from ${enrollment.paymentStatus} to ${paymentStatus}`,
            'INVALID_PAYMENT_TRANSITION'
          )
        )
      }
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (paymentStatus) updateData.paymentStatus = paymentStatus
    if (amountPaid !== undefined) updateData.amountPaid = amountPaid
    if (notes !== undefined) updateData.notes = notes
    if (status === 'COMPLETED') updateData.completedAt = new Date()

    const updated = await prisma.enrollment.update({
      where: { id },
      data: updateData,
      include: {
        student: { include: { user: { select: { name: true } } } },
        course: { select: { name: true } }
      }
    })

    res.json(apiResponse.success(updated, 'Enrollment updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Withdraw from course
router.post('/:id/withdraw', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { reason } = req.body

    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: { course: true }
    })

    if (!enrollment) {
      return res.status(404).json(apiResponse.error('Enrollment not found', 'NOT_FOUND'))
    }

    // Check access - student can withdraw themselves, school admin can withdraw anyone
    const canWithdraw = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'STUDENT' && req.user.studentId === enrollment.studentId)

    if (!canWithdraw) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (enrollment.status === 'DROPPED' || enrollment.status === 'COMPLETED') {
      return res.status(400).json(apiResponse.error('Cannot withdraw from this enrollment', 'INVALID_STATUS'))
    }

    const updated = await prisma.enrollment.update({
      where: { id },
      data: {
        status: 'DROPPED',
        notes: reason ? `${enrollment.notes || ''}\nWithdrawal reason: ${reason}`.trim() : enrollment.notes
      }
    })

    res.json(apiResponse.success(updated, 'Withdrawn from course successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete enrollment (hard delete - admin only)
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: { course: true, payments: true }
    })

    if (!enrollment) {
      return res.status(404).json(apiResponse.error('Enrollment not found', 'NOT_FOUND'))
    }

    // Only admin can hard delete
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('Only admins can delete enrollments', 'FORBIDDEN'))
    }

    if (enrollment.payments.length > 0) {
      return res.status(400).json(
        apiResponse.error('Cannot delete enrollment with payment records', 'HAS_PAYMENTS')
      )
    }

    await prisma.$transaction(async (tx) => {
      // Delete related records
      await tx.progress.deleteMany({ where: { studentId: enrollment.studentId, courseId: enrollment.courseId } })
      await tx.attendance.deleteMany({ where: { studentId: enrollment.studentId, lesson: { courseId: enrollment.courseId } } })
      await tx.topicVote.deleteMany({ where: { studentId: enrollment.studentId, courseId: enrollment.courseId } })
      await tx.enrollment.delete({ where: { id } })
    })

    res.json(apiResponse.success(null, 'Enrollment deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
