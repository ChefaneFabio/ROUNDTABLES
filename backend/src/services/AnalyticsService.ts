import { prisma } from '../config/database'

interface DateRange {
  startDate?: Date
  endDate?: Date
}

interface CorporateAnalytics {
  overview: {
    totalEmployees: number
    activeEmployees: number
    totalCourses: number
    activeCourses: number
    completionRate: number
    averageScore: number
    totalTrainingHours: number
  }
  enrollmentsByStatus: Record<string, number>
  cefrDistribution: Record<string, number>
  progressByDepartment: any[]
  recentCompletions: any[]
  topPerformers: any[]
  monthlyProgress: any[]
}

export class AnalyticsService {
  // Get corporate analytics for a school
  async getCorporateAnalytics(schoolId: string, dateRange?: DateRange): Promise<CorporateAnalytics> {
    const { startDate, endDate } = dateRange || {}

    const dateFilter = startDate && endDate ? {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    } : {}

    // Get basic counts
    const [
      totalStudents,
      activeStudents,
      totalCourses,
      activeCourses,
      enrollments,
      progress,
      lessons
    ] = await Promise.all([
      prisma.student.count({ where: { schoolId, deletedAt: null } }),
      prisma.student.count({ where: { schoolId, isActive: true, deletedAt: null } }),
      prisma.course.count({ where: { schoolId, deletedAt: null } }),
      prisma.course.count({ where: { schoolId, status: 'IN_PROGRESS', deletedAt: null } }),
      prisma.enrollment.findMany({
        where: { course: { schoolId }, ...dateFilter },
        include: {
          student: { include: { user: { select: { name: true } } } },
          course: { select: { name: true } }
        }
      }),
      prisma.progress.findMany({
        where: { course: { schoolId } },
        include: {
          student: { include: { user: { select: { name: true } } } },
          course: { select: { name: true } }
        }
      }),
      prisma.lesson.findMany({
        where: { course: { schoolId }, status: 'COMPLETED' }
      })
    ])

    // Calculate completion rate
    const completedEnrollments = enrollments.filter(e => e.status === 'COMPLETED').length
    const completionRate = enrollments.length > 0
      ? Math.round((completedEnrollments / enrollments.length) * 100)
      : 0

    // Calculate average score
    const scoresArray = progress.filter(p => p.averageScore).map(p => Number(p.averageScore))
    const averageScore = scoresArray.length > 0
      ? Math.round(scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length)
      : 0

    // Calculate total training hours
    const totalTrainingHours = lessons.reduce((total, lesson) => total + (lesson.duration / 60), 0)

    // Enrollment status distribution
    const enrollmentsByStatus = enrollments.reduce((acc, e) => {
      acc[e.status] = (acc[e.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // CEFR level distribution
    const students = await prisma.student.findMany({
      where: { schoolId, deletedAt: null },
      select: { languageLevel: true }
    })

    const cefrDistribution = students.reduce((acc, s) => {
      acc[s.languageLevel] = (acc[s.languageLevel] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Recent completions (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentCompletions = progress
      .filter(p => p.completedAt && p.completedAt >= thirtyDaysAgo)
      .map(p => ({
        studentName: p.student.user.name,
        courseName: p.course.name,
        completedAt: p.completedAt,
        grade: p.grade
      }))
      .slice(0, 10)

    // Top performers (by average score)
    const topPerformers = progress
      .filter(p => p.averageScore)
      .sort((a, b) => Number(b.averageScore) - Number(a.averageScore))
      .slice(0, 10)
      .map(p => ({
        studentName: p.student.user.name,
        courseName: p.course.name,
        averageScore: Number(p.averageScore),
        grade: p.grade
      }))

    // Monthly progress (last 6 months)
    const monthlyProgress = await this.getMonthlyProgress(schoolId)

    return {
      overview: {
        totalEmployees: totalStudents,
        activeEmployees: activeStudents,
        totalCourses,
        activeCourses,
        completionRate,
        averageScore,
        totalTrainingHours: Math.round(totalTrainingHours)
      },
      enrollmentsByStatus,
      cefrDistribution,
      progressByDepartment: [], // Would need department field in student model
      recentCompletions,
      topPerformers,
      monthlyProgress
    }
  }

  // Get monthly progress data
  private async getMonthlyProgress(schoolId: string) {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const enrollments = await prisma.enrollment.findMany({
      where: {
        course: { schoolId },
        enrolledAt: { gte: sixMonthsAgo }
      },
      select: {
        enrolledAt: true,
        completedAt: true,
        status: true
      }
    })

    const monthlyData: Record<string, { enrolled: number; completed: number }> = {}

    for (let i = 0; i < 6; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      monthlyData[key] = { enrolled: 0, completed: 0 }
    }

    enrollments.forEach(e => {
      const enrolledKey = `${e.enrolledAt.getFullYear()}-${String(e.enrolledAt.getMonth() + 1).padStart(2, '0')}`
      if (monthlyData[enrolledKey]) {
        monthlyData[enrolledKey].enrolled++
      }

      if (e.completedAt) {
        const completedKey = `${e.completedAt.getFullYear()}-${String(e.completedAt.getMonth() + 1).padStart(2, '0')}`
        if (monthlyData[completedKey]) {
          monthlyData[completedKey].completed++
        }
      }
    })

    return Object.entries(monthlyData)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, data]) => ({
        month,
        ...data
      }))
  }

  // Get student progress report
  async getStudentReport(studentId: string) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: { select: { name: true, email: true } },
        school: { select: { name: true } },
        enrollments: {
          include: {
            course: { select: { name: true, startDate: true, endDate: true } }
          }
        },
        progress: {
          include: {
            course: { select: { name: true } }
          }
        },
        attendance: {
          include: {
            lesson: { select: { title: true, scheduledAt: true } }
          },
          orderBy: { lesson: { scheduledAt: 'desc' } },
          take: 20
        },
        feedback: {
          include: {
            lesson: { select: { title: true } },
            teacher: { include: { user: { select: { name: true } } } }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        assessments: {
          orderBy: { completedAt: 'desc' },
          take: 5
        },
        certificates: {
          orderBy: { issuedAt: 'desc' }
        }
      }
    })

    if (!student) {
      throw new Error('Student not found')
    }

    // Calculate attendance rate
    const totalAttendance = student.attendance.length
    const attendedCount = student.attendance.filter(a => a.attended).length
    const attendanceRate = totalAttendance > 0
      ? Math.round((attendedCount / totalAttendance) * 100)
      : 0

    // Calculate overall progress
    const totalProgress = student.progress.length
    const completedCourses = student.progress.filter(p => p.completedAt).length
    const averageProgress = totalProgress > 0
      ? student.progress.reduce((sum, p) => sum + Number(p.percentage), 0) / totalProgress
      : 0

    return {
      student: {
        id: student.id,
        name: student.user.name,
        email: student.user.email,
        school: student.school.name,
        languageLevel: student.languageLevel,
        createdAt: student.createdAt
      },
      summary: {
        totalCourses: student.enrollments.length,
        completedCourses,
        activeCourses: student.enrollments.filter(e => e.status === 'ACTIVE').length,
        averageProgress: Math.round(averageProgress),
        attendanceRate,
        certificatesEarned: student.certificates.length,
        assessmentsTaken: student.assessments.length
      },
      enrollments: student.enrollments,
      progress: student.progress,
      recentAttendance: student.attendance,
      recentFeedback: student.feedback,
      assessments: student.assessments,
      certificates: student.certificates
    }
  }

  // Get course analytics
  async getCourseReport(courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        school: { select: { name: true } },
        enrollments: {
          include: {
            student: { include: { user: { select: { name: true } } } }
          }
        },
        lessons: {
          include: {
            attendance: true,
            feedback: true
          },
          orderBy: { lessonNumber: 'asc' }
        },
        progress: {
          include: {
            student: { include: { user: { select: { name: true } } } }
          }
        },
        courseTeachers: {
          include: {
            teacher: { include: { user: { select: { name: true } } } }
          }
        }
      }
    })

    if (!course) {
      throw new Error('Course not found')
    }

    // Calculate completion rate
    const completedEnrollments = course.enrollments.filter(e => e.status === 'COMPLETED').length
    const completionRate = course.enrollments.length > 0
      ? Math.round((completedEnrollments / course.enrollments.length) * 100)
      : 0

    // Calculate average attendance per lesson
    const lessonStats = course.lessons.map(lesson => {
      const attendedCount = lesson.attendance.filter(a => a.attended).length
      const totalStudents = course.enrollments.length
      return {
        lessonNumber: lesson.lessonNumber,
        title: lesson.title,
        scheduledAt: lesson.scheduledAt,
        attendanceRate: totalStudents > 0 ? Math.round((attendedCount / totalStudents) * 100) : 0,
        feedbackCount: lesson.feedback.length
      }
    })

    // Student performance ranking
    const studentPerformance = course.progress
      .sort((a, b) => Number(b.percentage) - Number(a.percentage))
      .map(p => ({
        studentName: p.student.user.name,
        percentage: Number(p.percentage),
        grade: p.grade,
        completedAt: p.completedAt
      }))

    return {
      course: {
        id: course.id,
        name: course.name,
        description: course.description,
        status: course.status,
        startDate: course.startDate,
        endDate: course.endDate,
        school: course.school.name,
        teachers: course.courseTeachers.map(ct => ct.teacher.user.name)
      },
      summary: {
        totalEnrollments: course.enrollments.length,
        completedEnrollments,
        completionRate,
        totalLessons: course.lessons.length,
        completedLessons: course.lessons.filter(l => l.status === 'COMPLETED').length
      },
      lessonStats,
      studentPerformance,
      enrollmentsByStatus: course.enrollments.reduce((acc, e) => {
        acc[e.status] = (acc[e.status] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }
  }

  // Export report data (for PDF/Excel generation)
  async exportReport(type: 'corporate' | 'student' | 'course', id: string) {
    switch (type) {
      case 'corporate':
        return this.getCorporateAnalytics(id)
      case 'student':
        return this.getStudentReport(id)
      case 'course':
        return this.getCourseReport(id)
      default:
        throw new Error('Invalid report type')
    }
  }
}

export const analyticsService = new AnalyticsService()
