import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION, LANGUAGE_LEVELS } from '../utils/constants'

const router = Router()

// Validation schemas
const updateStudentSchema = Joi.object({
  languageLevel: Joi.string().valid(...LANGUAGE_LEVELS).optional(),
  bio: Joi.string().max(2000).optional().allow(null),
  isActive: Joi.boolean().optional()
})

// Get all students (filtered by school for non-admins)
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      search,
      schoolId,
      languageLevel,
      isActive,
      courseId
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = { deletedAt: null }

    // Apply access control
    if (req.user?.role === 'LANGUAGE_SCHOOL') {
      where.schoolId = req.user.schoolId
    } else if (req.user?.role === 'TEACHER') {
      // Teachers can see students in their courses
      where.enrollments = {
        some: {
          course: { courseTeachers: { some: { teacherId: req.user.teacherId } } }
        }
      }
    } else if (req.user?.role === 'STUDENT') {
      // Students can only see themselves
      where.id = req.user.studentId
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

    if (languageLevel) {
      where.languageLevel = String(languageLevel)
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    if (courseId) {
      where.enrollments = { some: { courseId: String(courseId) } }
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: { select: { id: true, name: true, email: true, lastLoginAt: true } },
          school: { select: { id: true, name: true } },
          _count: {
            select: { enrollments: true, attendance: true, feedback: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.student.count({ where })
    ])

    res.json(apiResponse.paginated(students, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get student by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const student = await prisma.student.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: { select: { id: true, name: true, email: true, lastLoginAt: true, createdAt: true } },
        school: { select: { id: true, name: true } },
        enrollments: {
          include: {
            course: {
              select: { id: true, name: true, status: true, startDate: true, endDate: true }
            }
          }
        },
        progress: {
          include: {
            course: { select: { id: true, name: true } }
          }
        },
        _count: {
          select: { attendance: true, feedback: true, topicVotes: true }
        }
      }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'NOT_FOUND'))
    }

    // Check access
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === student.schoolId ||
      req.user?.studentId === id

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(student))
  } catch (error) {
    handleError(res, error)
  }
})

// Get current student profile
router.get('/me/profile', authenticate, async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== 'STUDENT' || !req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can access this endpoint', 'FORBIDDEN'))
    }

    const student = await prisma.student.findFirst({
      where: { id: req.user.studentId, deletedAt: null },
      include: {
        user: { select: { id: true, name: true, email: true } },
        school: { select: { id: true, name: true } },
        enrollments: {
          where: { status: 'ACTIVE' },
          include: {
            course: {
              select: {
                id: true,
                name: true,
                status: true,
                lessons: {
                  where: {
                    scheduledAt: { gte: new Date() },
                    status: { notIn: ['COMPLETED', 'CANCELLED'] }
                  },
                  take: 5,
                  orderBy: { scheduledAt: 'asc' },
                  select: { id: true, title: true, scheduledAt: true }
                }
              }
            }
          }
        },
        progress: {
          include: { course: { select: { name: true } } }
        }
      }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student profile not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(student))
  } catch (error) {
    handleError(res, error)
  }
})

// Update student
router.put('/:id', authenticate, validateRequest(updateStudentSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const student = await prisma.student.findFirst({
      where: { id, deletedAt: null }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'NOT_FOUND'))
    }

    // Check access - student can update their own profile, school admin can update any student
    const canEdit = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === student.schoolId) ||
      (req.user?.role === 'STUDENT' && req.user.studentId === id)

    if (!canEdit) {
      return res.status(403).json(apiResponse.error('Not authorized to update this student', 'FORBIDDEN'))
    }

    // Students can't change their own isActive status
    if (req.body.isActive !== undefined && req.user?.role === 'STUDENT') {
      delete req.body.isActive
    }

    const updated = await prisma.student.update({
      where: { id },
      data: req.body,
      include: {
        user: { select: { name: true, email: true } },
        school: { select: { name: true } }
      }
    })

    res.json(apiResponse.success(updated, 'Student updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get student's courses
router.get('/:id/courses', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.query

    const student = await prisma.student.findFirst({
      where: { id, deletedAt: null }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'NOT_FOUND'))
    }

    // Check access
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === student.schoolId ||
      req.user?.studentId === id

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const where: any = { studentId: id }
    if (status) {
      where.status = String(status)
    }

    const enrollments = await prisma.enrollment.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            name: true,
            description: true,
            status: true,
            startDate: true,
            endDate: true,
            _count: { select: { lessons: true } }
          }
        }
      },
      orderBy: { enrolledAt: 'desc' }
    })

    res.json(apiResponse.success(enrollments))
  } catch (error) {
    handleError(res, error)
  }
})

// Get student's attendance history
router.get('/:id/attendance', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { courseId } = req.query

    const student = await prisma.student.findFirst({
      where: { id, deletedAt: null }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'NOT_FOUND'))
    }

    // Check access
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === student.schoolId ||
      req.user?.studentId === id

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const where: any = { studentId: id }
    if (courseId) {
      where.lesson = { courseId: String(courseId) }
    }

    const attendance = await prisma.attendance.findMany({
      where,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            scheduledAt: true,
            course: { select: { id: true, name: true } }
          }
        }
      },
      orderBy: { lesson: { scheduledAt: 'desc' } }
    })

    // Calculate statistics
    const total = attendance.length
    const attended = attendance.filter(a => a.attended).length
    const rate = total > 0 ? Math.round((attended / total) * 100) : 0

    res.json(apiResponse.success({
      attendance,
      stats: { total, attended, missed: total - attended, rate }
    }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get student's feedback
router.get('/:id/feedback', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { courseId } = req.query

    const student = await prisma.student.findFirst({
      where: { id, deletedAt: null }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'NOT_FOUND'))
    }

    // Check access
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === student.schoolId ||
      req.user?.studentId === id

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const where: any = { studentId: id, status: 'SENT' }
    if (courseId) {
      where.lesson = { courseId: String(courseId) }
    }

    const feedback = await prisma.feedback.findMany({
      where,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            scheduledAt: true,
            course: { select: { id: true, name: true } }
          }
        },
        teacher: {
          include: { user: { select: { name: true } } }
        }
      },
      orderBy: { sentAt: 'desc' }
    })

    res.json(apiResponse.success(feedback))
  } catch (error) {
    handleError(res, error)
  }
})

// Get student statistics
router.get('/:id/stats', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const student = await prisma.student.findFirst({
      where: { id, deletedAt: null }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'NOT_FOUND'))
    }

    // Check access
    const canAccess = req.user?.role === 'ADMIN' ||
      req.user?.schoolId === student.schoolId ||
      req.user?.studentId === id

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const [
      enrolledCourses,
      completedCourses,
      totalLessonsAttended,
      totalLessons,
      feedbackReceived,
      averageScore
    ] = await Promise.all([
      prisma.enrollment.count({ where: { studentId: id, status: 'ACTIVE' } }),
      prisma.enrollment.count({ where: { studentId: id, status: 'COMPLETED' } }),
      prisma.attendance.count({ where: { studentId: id, attended: true } }),
      prisma.attendance.count({ where: { studentId: id } }),
      prisma.feedback.count({ where: { studentId: id, status: 'SENT' } }),
      prisma.feedback.aggregate({
        where: { studentId: id, status: 'SENT', score: { not: null } },
        _avg: { score: true }
      })
    ])

    const stats = {
      enrolledCourses,
      completedCourses,
      totalLessonsAttended,
      totalLessons,
      attendanceRate: totalLessons > 0
        ? Math.round((totalLessonsAttended / totalLessons) * 100)
        : 0,
      feedbackReceived,
      averageScore: averageScore._avg.score
        ? Math.round(averageScore._avg.score * 10) / 10
        : null
    }

    res.json(apiResponse.success(stats))
  } catch (error) {
    handleError(res, error)
  }
})

// Deactivate student (soft delete)
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const student = await prisma.student.findFirst({
      where: { id, deletedAt: null },
      include: {
        enrollments: { where: { status: 'ACTIVE' } }
      }
    })

    if (!student) {
      return res.status(404).json(apiResponse.error('Student not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== student.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (student.enrollments.length > 0) {
      return res.status(400).json(
        apiResponse.error(
          `Student has ${student.enrollments.length} active enrollments. Withdraw them first.`,
          'HAS_ACTIVE_ENROLLMENTS'
        )
      )
    }

    await prisma.student.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false }
    })

    res.json(apiResponse.success(null, 'Student deactivated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
