import { Router, Request, Response } from 'express'
import { prisma } from '../config/database'
import { authenticate } from '../middleware/auth'
import { apiResponse, handleError } from '../utils/apiResponse'
import { addDays, subDays, startOfMonth, endOfMonth } from 'date-fns'

const router = Router()

// Get dashboard data based on user role
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(apiResponse.error('Authentication required', 'UNAUTHORIZED'))
    }

    switch (req.user.role) {
      case 'ADMIN':
        return res.json(apiResponse.success(await getAdminDashboard()))
      case 'LANGUAGE_SCHOOL':
        return res.json(apiResponse.success(await getSchoolDashboard(req.user.schoolId!)))
      case 'TEACHER':
        return res.json(apiResponse.success(await getTeacherDashboard(req.user.teacherId!)))
      case 'STUDENT':
        return res.json(apiResponse.success(await getStudentDashboard(req.user.studentId!)))
      default:
        return res.status(403).json(apiResponse.error('Invalid role', 'FORBIDDEN'))
    }
  } catch (error) {
    handleError(res, error)
  }
})

// Admin dashboard
async function getAdminDashboard() {
  const [
    totalSchools,
    totalTeachers,
    totalStudents,
    totalCourses,
    activeCourses,
    totalLessons,
    upcomingLessons,
    pendingPayments,
    recentSchools
  ] = await Promise.all([
    prisma.school.count({ where: { deletedAt: null, isActive: true } }),
    prisma.teacher.count({ where: { deletedAt: null, isActive: true } }),
    prisma.student.count({ where: { deletedAt: null, isActive: true } }),
    prisma.course.count({ where: { deletedAt: null } }),
    prisma.course.count({ where: { deletedAt: null, status: 'IN_PROGRESS' } }),
    prisma.lesson.count({ where: { deletedAt: null } }),
    prisma.lesson.count({
      where: {
        deletedAt: null,
        scheduledAt: { gte: new Date(), lte: addDays(new Date(), 7) },
        status: { notIn: ['COMPLETED', 'CANCELLED'] }
      }
    }),
    prisma.enrollment.count({ where: { paymentStatus: { in: ['PENDING', 'OVERDUE'] } } }),
    prisma.school.findMany({
      where: { deletedAt: null },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        _count: { select: { courses: true, teachers: true, students: true } }
      }
    })
  ])

  return {
    stats: {
      totalSchools,
      totalTeachers,
      totalStudents,
      totalCourses,
      activeCourses,
      totalLessons,
      upcomingLessons,
      pendingPayments
    },
    recentSchools
  }
}

// School admin dashboard
async function getSchoolDashboard(schoolId: string) {
  const [
    school,
    teacherCount,
    studentCount,
    courseStats,
    upcomingLessons,
    pendingQuestions,
    pendingFeedback,
    recentEnrollments,
    paymentSummary
  ] = await Promise.all([
    prisma.school.findUnique({
      where: { id: schoolId },
      select: { name: true, subscriptionPlan: true }
    }),
    prisma.teacher.count({ where: { schoolId, deletedAt: null, isActive: true } }),
    prisma.student.count({ where: { schoolId, deletedAt: null, isActive: true } }),
    getCourseStats(schoolId),
    prisma.lesson.findMany({
      where: {
        course: { schoolId },
        scheduledAt: { gte: new Date(), lte: addDays(new Date(), 7) },
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
        deletedAt: null
      },
      take: 10,
      orderBy: { scheduledAt: 'asc' },
      include: {
        course: { select: { name: true } },
        teacher: { include: { user: { select: { name: true } } } }
      }
    }),
    prisma.question.count({
      where: { lesson: { course: { schoolId } }, status: 'PENDING' }
    }),
    prisma.feedback.count({
      where: { lesson: { course: { schoolId } }, status: 'PENDING' }
    }),
    prisma.enrollment.findMany({
      where: { course: { schoolId } },
      take: 5,
      orderBy: { enrolledAt: 'desc' },
      include: {
        student: { include: { user: { select: { name: true } } } },
        course: { select: { name: true } }
      }
    }),
    getPaymentSummary(schoolId)
  ])

  return {
    school,
    stats: {
      teachers: teacherCount,
      students: studentCount,
      ...courseStats,
      upcomingLessonsCount: upcomingLessons.length,
      pendingQuestions,
      pendingFeedback
    },
    upcomingLessons,
    recentEnrollments,
    paymentSummary
  }
}

// Teacher dashboard
async function getTeacherDashboard(teacherId: string) {
  const [
    teacher,
    assignedCourses,
    upcomingLessons,
    pendingQuestions,
    pendingFeedback,
    lessonStats
  ] = await Promise.all([
    prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        user: { select: { name: true, email: true } },
        school: { select: { name: true } }
      }
    }),
    prisma.courseTeacher.findMany({
      where: { teacherId },
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
    }),
    prisma.lesson.findMany({
      where: {
        teacherId,
        scheduledAt: { gte: new Date(), lte: addDays(new Date(), 14) },
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
        deletedAt: null
      },
      take: 10,
      orderBy: { scheduledAt: 'asc' },
      include: {
        course: { select: { name: true } },
        module: { select: { title: true } },
        _count: { select: { questions: true, materials: true } }
      }
    }),
    prisma.question.count({ where: { teacherId, status: { in: ['PENDING', 'NEEDS_REVISION'] } } }),
    prisma.feedback.count({ where: { teacherId, status: { in: ['PENDING', 'NEEDS_REVISION'] } } }),
    getTeacherLessonStats(teacherId)
  ])

  return {
    teacher,
    stats: {
      assignedCourses: assignedCourses.length,
      upcomingLessonsCount: upcomingLessons.length,
      pendingQuestions,
      pendingFeedback,
      ...lessonStats
    },
    courses: assignedCourses.map(ct => ct.course),
    upcomingLessons
  }
}

// Student dashboard
async function getStudentDashboard(studentId: string) {
  const [
    student,
    enrollments,
    upcomingLessons,
    recentFeedback,
    progressSummary,
    attendanceStats
  ] = await Promise.all([
    prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: { select: { name: true, email: true } },
        school: { select: { name: true } }
      }
    }),
    prisma.enrollment.findMany({
      where: { studentId, status: { in: ['ACTIVE', 'COMPLETED'] } },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            status: true,
            startDate: true,
            endDate: true,
            _count: { select: { lessons: true } }
          }
        }
      }
    }),
    prisma.lesson.findMany({
      where: {
        course: { enrollments: { some: { studentId, status: 'ACTIVE' } } },
        scheduledAt: { gte: new Date(), lte: addDays(new Date(), 14) },
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
        deletedAt: null
      },
      take: 10,
      orderBy: { scheduledAt: 'asc' },
      include: {
        course: { select: { name: true } },
        teacher: { include: { user: { select: { name: true } } } },
        module: { select: { title: true } }
      }
    }),
    prisma.feedback.findMany({
      where: { studentId, status: 'SENT' },
      take: 5,
      orderBy: { sentAt: 'desc' },
      include: {
        lesson: {
          select: { title: true, course: { select: { name: true } } }
        },
        teacher: { include: { user: { select: { name: true } } } }
      }
    }),
    prisma.progress.findMany({
      where: { studentId },
      include: { course: { select: { name: true } } }
    }),
    getStudentAttendanceStats(studentId)
  ])

  // Calculate overall progress
  const totalProgress = progressSummary.length > 0
    ? progressSummary.reduce((sum, p) => sum + Number(p.percentage), 0) / progressSummary.length
    : 0

  return {
    student,
    stats: {
      enrolledCourses: enrollments.filter(e => e.status === 'ACTIVE').length,
      completedCourses: enrollments.filter(e => e.status === 'COMPLETED').length,
      upcomingLessonsCount: upcomingLessons.length,
      averageProgress: Math.round(totalProgress),
      ...attendanceStats
    },
    enrollments,
    upcomingLessons,
    recentFeedback,
    progress: progressSummary
  }
}

// Helper functions
async function getCourseStats(schoolId: string) {
  const [draft, voting, scheduled, inProgress, completed] = await Promise.all([
    prisma.course.count({ where: { schoolId, status: 'DRAFT', deletedAt: null } }),
    prisma.course.count({ where: { schoolId, status: 'TOPIC_VOTING', deletedAt: null } }),
    prisma.course.count({ where: { schoolId, status: 'SCHEDULED', deletedAt: null } }),
    prisma.course.count({ where: { schoolId, status: 'IN_PROGRESS', deletedAt: null } }),
    prisma.course.count({ where: { schoolId, status: 'COMPLETED', deletedAt: null } })
  ])

  return {
    courseDraft: draft,
    courseVoting: voting,
    courseScheduled: scheduled,
    courseInProgress: inProgress,
    courseCompleted: completed,
    totalCourses: draft + voting + scheduled + inProgress + completed
  }
}

async function getPaymentSummary(schoolId: string) {
  const [totalDue, totalPaid, pendingCount, overdueCount] = await Promise.all([
    prisma.payment.aggregate({
      where: { OR: [{ schoolId }, { enrollment: { course: { schoolId } } }] },
      _sum: { amount: true }
    }),
    prisma.payment.aggregate({
      where: {
        OR: [{ schoolId }, { enrollment: { course: { schoolId } } }],
        status: 'PAID'
      },
      _sum: { amount: true }
    }),
    prisma.payment.count({
      where: {
        OR: [{ schoolId }, { enrollment: { course: { schoolId } } }],
        status: 'PENDING'
      }
    }),
    prisma.payment.count({
      where: {
        OR: [{ schoolId }, { enrollment: { course: { schoolId } } }],
        status: 'OVERDUE'
      }
    })
  ])

  return {
    totalDue: totalDue._sum.amount || 0,
    totalPaid: totalPaid._sum.amount || 0,
    outstanding: (totalDue._sum.amount || 0) - (totalPaid._sum.amount || 0),
    pendingCount,
    overdueCount
  }
}

async function getTeacherLessonStats(teacherId: string) {
  const [total, completed, upcoming, cancelled] = await Promise.all([
    prisma.lesson.count({ where: { teacherId, deletedAt: null } }),
    prisma.lesson.count({ where: { teacherId, status: 'COMPLETED', deletedAt: null } }),
    prisma.lesson.count({
      where: {
        teacherId,
        scheduledAt: { gte: new Date() },
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
        deletedAt: null
      }
    }),
    prisma.lesson.count({ where: { teacherId, status: 'CANCELLED', deletedAt: null } })
  ])

  return {
    totalLessons: total,
    completedLessons: completed,
    upcomingLessons: upcoming,
    cancelledLessons: cancelled,
    completionRate: total > 0 ? Math.round((completed / (total - cancelled)) * 100) : 0
  }
}

async function getStudentAttendanceStats(studentId: string) {
  const [total, attended] = await Promise.all([
    prisma.attendance.count({ where: { studentId } }),
    prisma.attendance.count({ where: { studentId, attended: true } })
  ])

  return {
    totalLessonsScheduled: total,
    lessonsAttended: attended,
    lessonsMissed: total - attended,
    attendanceRate: total > 0 ? Math.round((attended / total) * 100) : 0
  }
}

// Get activity feed
router.get('/activity', authenticate, async (req: Request, res: Response) => {
  try {
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20))

    const where: any = {}

    if (req.user?.role === 'LANGUAGE_SCHOOL') {
      where.user = {
        OR: [
          { schoolProfile: { id: req.user.schoolId } },
          { teacherProfile: { schoolId: req.user.schoolId } },
          { studentProfile: { schoolId: req.user.schoolId } }
        ]
      }
    } else if (req.user?.role === 'TEACHER') {
      where.OR = [
        { userId: req.user.id },
        { lesson: { teacherId: req.user.teacherId } }
      ]
    } else if (req.user?.role === 'STUDENT') {
      where.userId = req.user.id
    }

    const notifications = await prisma.notification.findMany({
      where: { ...where, status: { in: ['SENT', 'READ'] } },
      take: limit,
      orderBy: { sentAt: 'desc' },
      select: {
        id: true,
        type: true,
        subject: true,
        sentAt: true,
        readAt: true
      }
    })

    res.json(apiResponse.success(notifications))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
