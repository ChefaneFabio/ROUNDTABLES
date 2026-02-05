import { prisma } from '../config/database'

interface Recommendation {
  type: 'course' | 'lesson' | 'assessment'
  id: string
  title: string
  description?: string
  reason: string
  priority: number
  metadata?: any
}

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export class RecommendationService {
  // Get personalized recommendations for a student
  async getRecommendations(studentId: string, limit: number = 5): Promise<Recommendation[]> {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        enrollments: {
          include: {
            course: true
          }
        },
        progress: true,
        assessments: {
          orderBy: { completedAt: 'desc' },
          take: 1
        },
        certificates: true,
        school: { select: { id: true } }
      }
    })

    if (!student) {
      throw new Error('Student not found')
    }

    const recommendations: Recommendation[] = []

    // 1. Recommend placement test if never taken
    if (student.assessments.length === 0) {
      recommendations.push({
        type: 'assessment',
        id: 'placement-test',
        title: 'Take Your Placement Test',
        description: 'Find out your current English level with our CEFR placement test',
        reason: 'We noticed you haven\'t taken a placement test yet. This will help us personalize your learning path.',
        priority: 100
      })
    }

    // 2. Recommend courses based on CEFR level
    const enrolledCourseIds = student.enrollments.map(e => e.courseId)

    const availableCourses = await prisma.course.findMany({
      where: {
        schoolId: student.schoolId,
        id: { notIn: enrolledCourseIds },
        status: { in: ['SCHEDULED', 'IN_PROGRESS'] },
        deletedAt: null
      },
      include: {
        _count: { select: { enrollments: true } }
      },
      orderBy: { startDate: 'asc' },
      take: 10
    })

    // Prioritize courses that match student's level
    for (const course of availableCourses) {
      recommendations.push({
        type: 'course',
        id: course.id,
        title: course.name,
        description: course.description || undefined,
        reason: `This course is available for enrollment and matches your learning goals.`,
        priority: 50,
        metadata: {
          startDate: course.startDate,
          enrolledCount: course._count.enrollments,
          maxStudents: course.maxStudents
        }
      })
    }

    // 3. Recommend next lessons for active courses
    for (const enrollment of student.enrollments.filter(e => e.status === 'ACTIVE')) {
      const nextLesson = await prisma.lesson.findFirst({
        where: {
          courseId: enrollment.courseId,
          status: 'SCHEDULED',
          scheduledAt: { gte: new Date() }
        },
        orderBy: { scheduledAt: 'asc' }
      })

      if (nextLesson) {
        recommendations.push({
          type: 'lesson',
          id: nextLesson.id,
          title: nextLesson.title || `Lesson ${nextLesson.lessonNumber}`,
          description: nextLesson.description || undefined,
          reason: `Your next scheduled lesson in "${enrollment.course.name}"`,
          priority: 80,
          metadata: {
            courseName: enrollment.course.name,
            scheduledAt: nextLesson.scheduledAt
          }
        })
      }
    }

    // 4. Recommend level-up assessment if student hasn't tested in 3 months
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

    const recentAssessment = student.assessments[0]
    if (recentAssessment && recentAssessment.completedAt && recentAssessment.completedAt < threeMonthsAgo) {
      recommendations.push({
        type: 'assessment',
        id: 'progress-test',
        title: 'Check Your Progress',
        description: 'Take a progress assessment to see how much you\'ve improved',
        reason: 'It\'s been a while since your last assessment. Let\'s see your progress!',
        priority: 70
      })
    }

    // 5. Recommend courses for next CEFR level if current level is completed well
    const currentLevelIndex = CEFR_LEVELS.indexOf(student.languageLevel)
    if (currentLevelIndex < CEFR_LEVELS.length - 1) {
      const completedCourses = student.progress.filter(p => p.completedAt && Number(p.percentage) >= 80).length

      if (completedCourses > 0) {
        const nextLevel = CEFR_LEVELS[currentLevelIndex + 1]
        recommendations.push({
          type: 'assessment',
          id: 'level-up-test',
          title: `Ready for ${nextLevel}?`,
          description: `You've completed courses successfully. Test if you're ready for the next level!`,
          reason: 'Your excellent progress suggests you might be ready to advance.',
          priority: 60
        })
      }
    }

    // 6. Recommend incomplete courses
    for (const enrollment of student.enrollments.filter(e => e.status === 'ACTIVE')) {
      const progress = student.progress.find(p => p.courseId === enrollment.courseId)
      if (progress && Number(progress.percentage) > 0 && Number(progress.percentage) < 100) {
        recommendations.push({
          type: 'course',
          id: enrollment.courseId,
          title: `Continue: ${enrollment.course.name}`,
          description: `You're ${progress.percentage}% through this course`,
          reason: 'Keep up the momentum! You\'re making great progress.',
          priority: 75,
          metadata: {
            progress: Number(progress.percentage)
          }
        })
      }
    }

    // Sort by priority and limit
    return recommendations
      .sort((a, b) => b.priority - a.priority)
      .slice(0, limit)
  }

  // Get similar courses based on a course
  async getSimilarCourses(courseId: string, limit: number = 3) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { school: true }
    })

    if (!course) {
      throw new Error('Course not found')
    }

    // Find courses from the same school (simplified similarity)
    const similarCourses = await prisma.course.findMany({
      where: {
        schoolId: course.schoolId,
        id: { not: courseId },
        status: { in: ['SCHEDULED', 'IN_PROGRESS'] },
        deletedAt: null
      },
      include: {
        _count: { select: { enrollments: true } }
      },
      take: limit
    })

    return similarCourses
  }

  // Get trending courses (most enrolled recently)
  async getTrendingCourses(schoolId: string, limit: number = 5) {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const courses = await prisma.course.findMany({
      where: {
        schoolId,
        status: { in: ['SCHEDULED', 'IN_PROGRESS'] },
        deletedAt: null
      },
      include: {
        _count: {
          select: {
            enrollments: {
              where: { enrolledAt: { gte: thirtyDaysAgo } }
            }
          }
        }
      },
      orderBy: {
        enrollments: { _count: 'desc' }
      },
      take: limit
    })

    return courses
  }

  // Recommend study schedule based on availability
  async getStudySchedule(studentId: string) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        enrollments: {
          where: { status: 'ACTIVE' },
          include: {
            course: {
              include: {
                lessons: {
                  where: {
                    status: { in: ['SCHEDULED', 'REMINDER_SENT'] },
                    scheduledAt: { gte: new Date() }
                  },
                  orderBy: { scheduledAt: 'asc' },
                  take: 10
                }
              }
            }
          }
        }
      }
    })

    if (!student) {
      throw new Error('Student not found')
    }

    const upcomingLessons = student.enrollments.flatMap(e =>
      e.course.lessons.map(l => ({
        lessonId: l.id,
        courseName: e.course.name,
        lessonTitle: l.title || `Lesson ${l.lessonNumber}`,
        scheduledAt: l.scheduledAt,
        duration: l.duration
      }))
    ).sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())

    return {
      studentId,
      upcomingLessons,
      totalHoursThisWeek: upcomingLessons
        .filter(l => {
          const oneWeekFromNow = new Date()
          oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7)
          return l.scheduledAt <= oneWeekFromNow
        })
        .reduce((total, l) => total + l.duration / 60, 0)
    }
  }
}

export const recommendationService = new RecommendationService()
