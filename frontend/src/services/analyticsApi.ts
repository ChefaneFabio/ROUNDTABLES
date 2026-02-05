import api from './api'

export interface CorporateAnalytics {
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
  recentCompletions: {
    studentName: string
    courseName: string
    completedAt: string
    grade?: string
  }[]
  topPerformers: {
    studentName: string
    courseName: string
    averageScore: number
    grade?: string
  }[]
  monthlyProgress: {
    month: string
    enrolled: number
    completed: number
  }[]
}

export interface StudentReport {
  student: {
    id: string
    name: string
    email: string
    school: string
    languageLevel: string
    createdAt: string
  }
  summary: {
    totalCourses: number
    completedCourses: number
    activeCourses: number
    averageProgress: number
    attendanceRate: number
    certificatesEarned: number
    assessmentsTaken: number
  }
  enrollments: any[]
  progress: any[]
  recentAttendance: any[]
  recentFeedback: any[]
  assessments: any[]
  certificates: any[]
}

export interface CourseReport {
  course: {
    id: string
    name: string
    description?: string
    status: string
    startDate?: string
    endDate?: string
    school: string
    teachers: string[]
  }
  summary: {
    totalEnrollments: number
    completedEnrollments: number
    completionRate: number
    totalLessons: number
    completedLessons: number
  }
  lessonStats: {
    lessonNumber: number
    title?: string
    scheduledAt: string
    attendanceRate: number
    feedbackCount: number
  }[]
  studentPerformance: {
    studentName: string
    percentage: number
    grade?: string
    completedAt?: string
  }[]
  enrollmentsByStatus: Record<string, number>
}

export const analyticsApi = {
  // Get corporate analytics (school admin)
  async getCorporateAnalytics(startDate?: string, endDate?: string): Promise<CorporateAnalytics> {
    const params: any = {}
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate

    const response = await api.get('/analytics/corporate', { params })
    return response.data.data
  },

  // Get student report
  async getStudentReport(studentId: string): Promise<StudentReport> {
    const response = await api.get(`/analytics/student/${studentId}`)
    return response.data.data
  },

  // Get my report (student)
  async getMyReport(): Promise<StudentReport> {
    const response = await api.get('/analytics/my-report')
    return response.data.data
  },

  // Get course report
  async getCourseReport(courseId: string): Promise<CourseReport> {
    const response = await api.get(`/analytics/course/${courseId}`)
    return response.data.data
  },

  // Export report
  async exportReport(type: 'corporate' | 'student' | 'course', id: string, format: 'json' | 'pdf' = 'json'): Promise<any> {
    const response = await api.get(`/analytics/export/${type}/${id}`, {
      params: { format },
      responseType: format === 'pdf' ? 'blob' : 'json'
    })
    return response.data
  }
}
