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
    if (req.user?.role === 'ADMIN') {
      where.schoolId = req.user.schoolId
    } else if (req.user?.role === 'TEACHER') {
      where.schoolId = req.user.schoolId
    } else if (req.user?.role === 'STUDENT') {
      // Students can see teachers from their school
      where.schoolId = req.user.schoolId
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

// ============================================
// TEACHER HOURS TRACKING
// ============================================

// Get per-course hours summary (remaining + completed) for a teacher
router.get('/me/course-hours', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.teacherId

    // Get all courses assigned to this teacher (including completed ones for history)
    const courseTeachers = await prisma.courseTeacher.findMany({
      where: { teacherId },
      include: {
        course: {
          select: {
            id: true, name: true, status: true, startDate: true, endDate: true,
            courseCategory: true
          }
        }
      }
    })

    const courseHours = await Promise.all(
      courseTeachers.map(async (ct) => {
        const courseId = ct.courseId

        // All lessons for this teacher in this course
        const lessons = await prisma.lesson.findMany({
          where: { courseId, teacherId, deletedAt: null },
          select: { id: true, duration: true, status: true, scheduledAt: true }
        })

        const totalScheduledMinutes = lessons.reduce((sum, l) => sum + l.duration, 0)
        const completedMinutes = lessons
          .filter(l => ['COMPLETED'].includes(l.status))
          .reduce((sum, l) => sum + l.duration, 0)
        const remainingMinutes = totalScheduledMinutes - completedMinutes
        const cancelledMinutes = lessons
          .filter(l => l.status === 'CANCELLED')
          .reduce((sum, l) => sum + l.duration, 0)

        const totalLessons = lessons.filter(l => l.status !== 'CANCELLED').length
        const completedLessons = lessons.filter(l => ['COMPLETED'].includes(l.status)).length
        const upcomingLessons = lessons.filter(l => ['SCHEDULED', 'REMINDER_SENT'].includes(l.status)).length

        // Find next and last lesson dates
        const upcoming = lessons
          .filter(l => ['SCHEDULED', 'REMINDER_SENT'].includes(l.status))
          .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())

        const nextLesson = upcoming[0]?.scheduledAt || null
        const lastLesson = upcoming[upcoming.length - 1]?.scheduledAt || null

        return {
          courseId,
          courseName: ct.course.name,
          courseStatus: ct.course.status,
          courseCategory: ct.course.courseCategory,
          startDate: ct.course.startDate,
          endDate: ct.course.endDate,
          isPrimary: ct.isPrimary,
          totalScheduledHours: +(totalScheduledMinutes / 60).toFixed(1),
          completedHours: +(completedMinutes / 60).toFixed(1),
          remainingHours: +(remainingMinutes / 60).toFixed(1),
          cancelledHours: +(cancelledMinutes / 60).toFixed(1),
          totalLessons,
          completedLessons,
          upcomingLessons,
          nextLessonDate: nextLesson,
          lastScheduledDate: lastLesson,
          progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
        }
      })
    )

    // Sort: active courses first, then by next lesson date
    courseHours.sort((a, b) => {
      const aActive = ['SCHEDULED', 'IN_PROGRESS'].includes(a.courseStatus)
      const bActive = ['SCHEDULED', 'IN_PROGRESS'].includes(b.courseStatus)
      if (aActive && !bActive) return -1
      if (!aActive && bActive) return 1
      return (a.nextLessonDate?.getTime() || Infinity) - (b.nextLessonDate?.getTime() || Infinity)
    })

    res.json(apiResponse.success(courseHours))
  } catch (error) {
    handleError(res, error)
  }
})

// Get monthly hours summary for a teacher
router.get('/me/monthly-hours', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.teacherId
    const year = parseInt(req.query.year as string) || new Date().getFullYear()

    const months: Array<{ month: number; monthName: string; year: number; totalHours: number; totalLessons: number; coursesCount: number }> = []
    for (let month = 0; month < 12; month++) {
      const start = new Date(year, month, 1)
      const end = new Date(year, month + 1, 0, 23, 59, 59)

      const lessons = await prisma.lesson.findMany({
        where: {
          teacherId,
          deletedAt: null,
          scheduledAt: { gte: start, lte: end },
          status: { in: ['COMPLETED'] }
        },
        select: { duration: true, courseId: true },
        orderBy: { scheduledAt: 'asc' }
      })

      const totalMinutes = lessons.reduce((sum, l) => sum + l.duration, 0)
      const uniqueCourses = new Set(lessons.map(l => l.courseId)).size

      months.push({
        month: month + 1,
        monthName: start.toLocaleString('en', { month: 'long' }),
        year,
        totalHours: +(totalMinutes / 60).toFixed(1),
        totalLessons: lessons.length,
        coursesCount: uniqueCourses
      })
    }

    const yearTotal = months.reduce((sum, m) => sum + m.totalHours, 0)

    res.json(apiResponse.success({
      year,
      months,
      yearTotalHours: +yearTotal.toFixed(1),
      yearTotalLessons: months.reduce((sum, m) => sum + m.totalLessons, 0)
    }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get lesson history archive with filters (daily/weekly/monthly grouping)
router.get('/me/hours-history', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.teacherId
    const {
      courseId,
      fromDate,
      toDate,
      page: pageStr = '1',
      limit: limitStr = '50'
    } = req.query

    const page = Math.max(1, parseInt(pageStr as string))
    const limit = Math.min(100, Math.max(1, parseInt(limitStr as string)))

    const where: any = {
      teacherId,
      deletedAt: null,
      status: { in: ['COMPLETED'] }
    }

    if (courseId) where.courseId = courseId as string
    if (fromDate || toDate) {
      where.scheduledAt = {}
      if (fromDate) where.scheduledAt.gte = new Date(fromDate as string)
      if (toDate) where.scheduledAt.lte = new Date(toDate as string + 'T23:59:59Z')
    }

    const [lessons, total] = await Promise.all([
      prisma.lesson.findMany({
        where,
        select: {
          id: true, lessonNumber: true, title: true, scheduledAt: true,
          duration: true, status: true,
          course: { select: { id: true, name: true, courseCategory: true } }
        },
        orderBy: { scheduledAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.lesson.count({ where })
    ])

    const totalMinutes = await prisma.lesson.aggregate({
      where,
      _sum: { duration: true },
      _count: true
    })

    res.json(apiResponse.success({
      lessons: lessons.map(l => ({
        ...l,
        hours: +(l.duration / 60).toFixed(1)
      })),
      summary: {
        totalHours: +((totalMinutes._sum.duration || 0) / 60).toFixed(1),
        totalLessons: totalMinutes._count
      },
      meta: {
        page, limit, total,
        totalPages: Math.ceil(total / limit)
      }
    }))
  } catch (error) {
    handleError(res, error)
  }
})

// Admin: Get hours summary for any teacher (Maka admin view)
router.get('/:id/hours-summary', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const teacherId = req.params.id
    const year = parseInt(req.query.year as string) || new Date().getFullYear()
    const month = req.query.month ? parseInt(req.query.month as string) : undefined

    let start: Date, end: Date
    if (month) {
      start = new Date(year, month - 1, 1)
      end = new Date(year, month, 0, 23, 59, 59)
    } else {
      start = new Date(year, 0, 1)
      end = new Date(year, 11, 31, 23, 59, 59)
    }

    const lessons = await prisma.lesson.findMany({
      where: {
        teacherId,
        deletedAt: null,
        scheduledAt: { gte: start, lte: end },
        status: { in: ['COMPLETED'] }
      },
      select: {
        id: true, duration: true, scheduledAt: true, status: true,
        course: { select: { id: true, name: true } }
      },
      orderBy: { scheduledAt: 'desc' }
    })

    const totalMinutes = lessons.reduce((sum, l) => sum + l.duration, 0)

    // Group by course
    const byCourse: Record<string, { courseName: string; hours: number; lessons: number }> = {}
    for (const l of lessons) {
      const key = l.course.id
      if (!byCourse[key]) byCourse[key] = { courseName: l.course.name, hours: 0, lessons: 0 }
      byCourse[key].hours += l.duration / 60
      byCourse[key].lessons++
    }

    res.json(apiResponse.success({
      teacherId, year, month,
      totalHours: +(totalMinutes / 60).toFixed(1),
      totalLessons: lessons.length,
      byCourse: Object.entries(byCourse).map(([courseId, data]) => ({
        courseId,
        courseName: data.courseName,
        hours: +data.hours.toFixed(1),
        lessons: data.lessons
      }))
    }))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
