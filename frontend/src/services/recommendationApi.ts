import api from './api'

export interface Recommendation {
  type: 'course' | 'lesson' | 'assessment'
  id: string
  title: string
  description?: string
  reason: string
  priority: number
  metadata?: any
}

export interface StudySchedule {
  studentId: string
  upcomingLessons: {
    lessonId: string
    courseName: string
    lessonTitle: string
    scheduledAt: string
    duration: number
  }[]
  totalHoursThisWeek: number
}

export const recommendationApi = {
  // Get personalized recommendations
  async getMyRecommendations(limit?: number): Promise<Recommendation[]> {
    const params = limit ? { limit } : {}
    const response = await api.get('/recommendations/my', { params })
    return response.data.data || []
  },

  // Get recommendations for a specific student (admin)
  async getStudentRecommendations(studentId: string, limit?: number): Promise<Recommendation[]> {
    const params = limit ? { limit } : {}
    const response = await api.get(`/recommendations/student/${studentId}`, { params })
    return response.data.data || []
  },

  // Get similar courses
  async getSimilarCourses(courseId: string, limit?: number): Promise<any[]> {
    const params = limit ? { limit } : {}
    const response = await api.get(`/recommendations/similar/${courseId}`, { params })
    return response.data.data || []
  },

  // Get trending courses
  async getTrendingCourses(schoolId?: string, limit?: number): Promise<any[]> {
    const params: any = {}
    if (schoolId) params.schoolId = schoolId
    if (limit) params.limit = limit

    const response = await api.get('/recommendations/trending', { params })
    return response.data.data || []
  },

  // Get study schedule
  async getStudySchedule(): Promise<StudySchedule> {
    const response = await api.get('/recommendations/schedule')
    return response.data.data
  }
}
