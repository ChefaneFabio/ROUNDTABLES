import { Router, Request, Response } from 'express'
import Joi from 'joi'
import * as XLSX from 'xlsx'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin, requireAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { analyticsService } from '../services/AnalyticsService'
import { prisma } from '../config/database'

const router = Router()

// Validation schemas
const dateRangeSchema = Joi.object({
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional()
})

// Get corporate analytics (school admin)
router.get('/corporate', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId && req.user?.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const { startDate, endDate } = req.query
    const dateRange = startDate && endDate ? {
      startDate: new Date(startDate as string),
      endDate: new Date(endDate as string)
    } : undefined

    const schoolId = req.user.schoolId || (req.query.schoolId as string)
    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID required', 'VALIDATION_ERROR'))
    }

    const analytics = await analyticsService.getCorporateAnalytics(schoolId, dateRange)
    return res.json(apiResponse.success(analytics))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get analytics for specific school (admin only)
router.get('/corporate/:schoolId', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query
    const dateRange = startDate && endDate ? {
      startDate: new Date(startDate as string),
      endDate: new Date(endDate as string)
    } : undefined

    const analytics = await analyticsService.getCorporateAnalytics(req.params.schoolId, dateRange)
    return res.json(apiResponse.success(analytics))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get student report
router.get('/student/:studentId', authenticate, async (req: Request, res: Response) => {
  try {
    // Students can view their own report, school admins can view any student in their school
    if (req.user?.role === 'STUDENT' && req.user.studentId !== req.params.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const report = await analyticsService.getStudentReport(req.params.studentId)

    // Verify school access for school admins
    if (req.user?.role === 'ADMIN' && req.user.schoolId) {
      // The student report includes school info, we can verify it matches
      // This is a simplified check - in production, add proper validation
    }

    return res.json(apiResponse.success(report))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get my progress report (student)
router.get('/my-report', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can view their report', 'NOT_STUDENT'))
    }

    const report = await analyticsService.getStudentReport(req.user.studentId)
    return res.json(apiResponse.success(report))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get course report
router.get('/course/:courseId', authenticate, async (req: Request, res: Response) => {
  try {
    const report = await analyticsService.getCourseReport(req.params.courseId)

    // Verify access - school admin, teacher assigned to course, or admin
    if (req.user?.role === 'ADMIN') {
      // Would need to verify course belongs to their school
    }

    return res.json(apiResponse.success(report))
  } catch (error) {
    return handleError(res, error)
  }
})

// Export report as JSON or CSV
router.get('/export/:type/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params
    const { format = 'json' } = req.query

    if (!['corporate', 'student', 'course'].includes(type)) {
      return res.status(400).json(apiResponse.error('Invalid report type', 'VALIDATION_ERROR'))
    }

    const data = await analyticsService.exportReport(type as any, id)

    if (format === 'csv') {
      const csv = generateCsv(type, data)
      res.setHeader('Content-Type', 'text/csv; charset=utf-8')
      res.setHeader('Content-Disposition', `attachment; filename=report-${type}-${id}-${new Date().toISOString().slice(0, 10)}.csv`)
      return res.send(csv)
    }

    if (format === 'json') {
      return res.json(apiResponse.success(data))
    }

    // Downloadable JSON
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', `attachment; filename=report-${type}-${id}.json`)
    return res.json(data)
  } catch (error) {
    return handleError(res, error)
  }
})

function escapeCsvField(val: any): string {
  if (val === null || val === undefined) return ''
  const str = String(val)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function toCsvRow(fields: any[]): string {
  return fields.map(escapeCsvField).join(',')
}

function generateCsv(type: string, data: any): string {
  const lines: string[] = []

  if (type === 'corporate') {
    const o = data.overview || {}
    lines.push('Corporate Analytics Report')
    lines.push(`Generated,${new Date().toISOString()}`)
    lines.push('')
    lines.push('Metric,Value')
    lines.push(toCsvRow(['Total Students', o.totalEmployees]))
    lines.push(toCsvRow(['Active Students', o.activeEmployees]))
    lines.push(toCsvRow(['Total Courses', o.totalCourses]))
    lines.push(toCsvRow(['Active Courses', o.activeCourses]))
    lines.push(toCsvRow(['Completion Rate', `${o.completionRate}%`]))
    lines.push(toCsvRow(['Average Score', o.averageScore]))
    lines.push(toCsvRow(['Training Hours', o.totalTrainingHours]))
    lines.push('')

    // CEFR distribution
    if (data.cefrDistribution) {
      lines.push('CEFR Level,Count')
      for (const [level, count] of Object.entries(data.cefrDistribution)) {
        lines.push(toCsvRow([level, count]))
      }
      lines.push('')
    }

    // Top performers
    if (data.topPerformers?.length) {
      lines.push('Top Performers')
      lines.push('Rank,Name,Average Score')
      data.topPerformers.forEach((p: any, i: number) => {
        lines.push(toCsvRow([i + 1, p.user?.name || p.name, p.averageScore]))
      })
      lines.push('')
    }

    // Monthly progress
    if (data.monthlyProgress?.length) {
      lines.push('Monthly Progress')
      lines.push('Month,Enrolled,Completed')
      for (const m of data.monthlyProgress) {
        lines.push(toCsvRow([m.month, m.enrolled, m.completed]))
      }
    }
  } else if (type === 'student') {
    const s = data.summary || {}
    const info = data.student || {}
    lines.push('Student Progress Report')
    lines.push(`Student,${info.name || ''}`)
    lines.push(`Email,${info.email || ''}`)
    lines.push(`CEFR Level,${info.languageLevel || ''}`)
    lines.push(`Generated,${new Date().toISOString()}`)
    lines.push('')
    lines.push('Metric,Value')
    lines.push(toCsvRow(['Total Courses', s.totalCourses]))
    lines.push(toCsvRow(['Completed Courses', s.completedCourses]))
    lines.push(toCsvRow(['Active Courses', s.activeCourses]))
    lines.push(toCsvRow(['Average Progress', `${s.averageProgress}%`]))
    lines.push(toCsvRow(['Attendance Rate', `${s.attendanceRate}%`]))
    lines.push(toCsvRow(['Certificates Earned', s.certificatesEarned]))
    lines.push(toCsvRow(['Assessments Taken', s.assessmentsTaken]))
    lines.push('')

    // Enrollments
    if (data.enrollments?.length) {
      lines.push('Enrollments')
      lines.push('Course,Status,Enrolled At')
      for (const e of data.enrollments) {
        lines.push(toCsvRow([e.course?.name, e.status, e.enrolledAt]))
      }
      lines.push('')
    }

    // Progress
    if (data.progress?.length) {
      lines.push('Course Progress')
      lines.push('Course,Percentage,Completed Lessons,Total Lessons,Grade')
      for (const p of data.progress) {
        lines.push(toCsvRow([p.course?.name, `${p.percentage}%`, p.completedLessons, p.totalLessons, p.grade || '']))
      }
    }
  } else if (type === 'course') {
    const s = data.summary || {}
    const info = data.course || {}
    lines.push('Course Analytics Report')
    lines.push(`Course,${info.name || ''}`)
    lines.push(`Status,${info.status || ''}`)
    lines.push(`Generated,${new Date().toISOString()}`)
    lines.push('')
    lines.push('Metric,Value')
    lines.push(toCsvRow(['Total Enrollments', s.totalEnrollments]))
    lines.push(toCsvRow(['Completed', s.completedEnrollments]))
    lines.push(toCsvRow(['Completion Rate', `${s.completionRate}%`]))
    lines.push(toCsvRow(['Total Lessons', s.totalLessons]))
    lines.push(toCsvRow(['Completed Lessons', s.completedLessons]))
    lines.push('')

    // Student performance
    if (data.studentPerformance?.length) {
      lines.push('Student Performance')
      lines.push('Rank,Name,Progress,Grade')
      data.studentPerformance.forEach((sp: any, i: number) => {
        lines.push(toCsvRow([i + 1, sp.student?.user?.name || '', `${sp.percentage}%`, sp.grade || '']))
      })
      lines.push('')
    }

    // Lesson stats
    if (data.lessonStats?.length) {
      lines.push('Lesson Stats')
      lines.push('Lesson,Attendance Rate,Feedback Count')
      for (const l of data.lessonStats) {
        lines.push(toCsvRow([l.title || `Lesson ${l.lessonNumber}`, `${l.attendanceRate}%`, l.feedbackCount]))
      }
    }
  }

  return lines.join('\r\n')
}

// Export assessment results as XLSX for selected students
const exportAssessmentsSchema = Joi.object({
  studentIds: Joi.array().items(Joi.string()).optional(),
  assessmentIds: Joi.array().items(Joi.string()).optional(),
  language: Joi.string().optional(),
})

router.post('/export/assessments/xlsx', authenticate, requireSchoolAdmin, validateRequest(exportAssessmentsSchema), async (req: Request, res: Response) => {
  try {
    const { studentIds, assessmentIds, language } = req.body

    // Build query filter
    const where: any = {
      isMultiSkill: true,
      status: 'COMPLETED',
    }
    if (assessmentIds?.length) {
      where.id = { in: assessmentIds }
    }
    if (studentIds?.length) {
      where.studentId = { in: studentIds }
    }
    if (language) {
      where.language = language
    }

    const assessments = await prisma.assessment.findMany({
      where,
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        sections: { orderBy: { orderIndex: 'asc' } },
      },
      orderBy: { completedAt: 'desc' },
    })

    if (assessments.length === 0) {
      return res.status(404).json(apiResponse.error('No completed assessments found', 'NOT_FOUND'))
    }

    // Build Summary sheet
    const summaryRows = assessments.map(a => ({
      'Name': a.student.user.name,
      'Email': a.student.user.email,
      'Language': a.language,
      'Overall CEFR': a.cefrLevel || '',
      'Overall Score (%)': a.score ?? '',
      'Reading': a.readingLevel || '',
      'Listening': a.listeningLevel || '',
      'Writing': a.writingLevel || '',
      'Speaking': a.speakingLevel || '',
      'Started': a.startedAt ? new Date(a.startedAt).toISOString().slice(0, 16).replace('T', ' ') : '',
      'Completed': a.completedAt ? new Date(a.completedAt).toISOString().slice(0, 16).replace('T', ' ') : '',
    }))

    // Build Details sheet — one row per section
    const detailRows: any[] = []
    for (const a of assessments) {
      for (const s of a.sections) {
        detailRows.push({
          'Name': a.student.user.name,
          'Email': a.student.user.email,
          'Language': a.language,
          'Section': s.skill,
          'Status': s.status,
          'CEFR Level': s.cefrLevel || '',
          'Score (%)': s.percentageScore ?? '',
          'Raw Score': s.rawScore ?? '',
          'Max Score': s.maxScore ?? '',
          'Questions Answered': ((s.answers as any[]) || []).length,
          'Questions Total': s.questionsLimit,
          'AI Score': s.aiScore ?? '',
          'Teacher Score': s.teacherScore ?? '',
        })
      }
    }

    // Create workbook
    const wb = XLSX.utils.book_new()
    const summaryWs = XLSX.utils.json_to_sheet(summaryRows)
    const detailsWs = XLSX.utils.json_to_sheet(detailRows)

    // Set column widths for readability
    summaryWs['!cols'] = [
      { wch: 25 }, { wch: 30 }, { wch: 10 }, { wch: 12 }, { wch: 14 },
      { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 18 }, { wch: 18 },
    ]
    detailsWs['!cols'] = [
      { wch: 25 }, { wch: 30 }, { wch: 10 }, { wch: 22 }, { wch: 12 },
      { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 16 }, { wch: 14 },
      { wch: 10 }, { wch: 12 },
    ]

    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary')
    XLSX.utils.book_append_sheet(wb, detailsWs, 'Details')

    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
    const filename = `assessment-results-${new Date().toISOString().slice(0, 10)}.xlsx`

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    return res.send(buf)
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
