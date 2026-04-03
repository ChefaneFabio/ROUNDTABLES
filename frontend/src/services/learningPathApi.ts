import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export interface LearningPath {
  id: string
  name: string
  description?: string
  language?: string
  targetLevel?: string
  difficulty?: string
  thumbnailUrl?: string
  estimatedHours?: number
  isPublished: boolean
  courses: PathCourse[]
  _count?: { enrollments: number }
  enrollment?: PathEnrollment | null
}

export interface PathCourse {
  id: string
  orderIndex: number
  isRequired: boolean
  minScore?: number
  courseId: string
  course: {
    id: string
    name: string
    description?: string
    courseType?: string
    language?: string
    _count?: { lessons: number; enrollments: number }
  }
}

export interface PathEnrollment {
  id: string
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED'
  progress: number
  currentCourseIndex: number
  startedAt: string
  completedAt?: string
  courseProgress?: Record<string, number>
}

export const learningPathApi = {
  getAll: async (page = 1, limit = 20): Promise<{ data: LearningPath[]; meta: any }> => {
    const res = await api.get('/learning-paths', { params: { page, limit } })
    return { data: res.data.data, meta: res.data.meta }
  },

  getById: async (id: string): Promise<LearningPath> => {
    const res = await api.get(`/learning-paths/${id}`)
    return res.data.data
  },

  create: async (data: any): Promise<LearningPath> => {
    const res = await api.post('/learning-paths', data)
    return res.data.data
  },

  update: async (id: string, data: any): Promise<LearningPath> => {
    const res = await api.put(`/learning-paths/${id}`, data)
    return res.data.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/learning-paths/${id}`)
  },

  enroll: async (id: string): Promise<PathEnrollment> => {
    const res = await api.post(`/learning-paths/${id}/enroll`)
    return res.data.data
  },

  getMyEnrolled: async (): Promise<Array<PathEnrollment & { path: LearningPath; courseProgress: Record<string, number> }>> => {
    const res = await api.get('/learning-paths/my/enrolled')
    return res.data.data
  },

  advance: async (id: string): Promise<{ completed: boolean; nextCourse?: string }> => {
    const res = await api.post(`/learning-paths/${id}/advance`)
    return res.data.data
  },
}
