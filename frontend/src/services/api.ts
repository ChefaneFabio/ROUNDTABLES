import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { ApiResponse, LoginResponse, User } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Token management
let accessToken: string | null = localStorage.getItem('accessToken')
let refreshToken: string | null = localStorage.getItem('refreshToken')

export const setTokens = (access: string, refresh: string) => {
  accessToken = access
  refreshToken = refresh
  localStorage.setItem('accessToken', access)
  localStorage.setItem('refreshToken', refresh)
}

export const clearTokens = () => {
  accessToken = null
  refreshToken = null
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const getAccessToken = () => accessToken

// Request interceptor - add auth header
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle token refresh
let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token!)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any

    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        })

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data

        setTokens(newAccessToken, newRefreshToken)
        processQueue(null, newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        clearTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Extract error message
    const errorMessage =
      (error.response?.data as any)?.error ||
      error.message ||
      'An error occurred'

    return Promise.reject(new Error(errorMessage))
  }
)

// Auth API
export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', {
      email,
      password,
    })
    if (response.data.success && response.data.data) {
      setTokens(response.data.data.accessToken, response.data.data.refreshToken)
    }
    return response.data.data!
  },

  async registerTeacher(data: {
    email: string
    password: string
    name: string
    schoolId: string
    bio?: string
    expertise?: string[]
  }): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      '/auth/register/teacher',
      data
    )
    return response.data.data!
  },

  async registerStudent(data: {
    email: string
    password: string
    name: string
    schoolId: string
    languageLevel?: string
    bio?: string
  }): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>(
      '/auth/register/student',
      data
    )
    return response.data.data!
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } finally {
      clearTokens()
    }
  },

  async getMe(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/me')
    return response.data.data!
  },

  async getProfile(): Promise<{ user: User; profile: any }> {
    const response = await api.get<ApiResponse<{ user: User; profile: any }>>('/auth/me')
    return response.data.data!
  },

  async updateProfile(data: { name?: string; phone?: string; address?: string; bio?: string; preferredLanguage?: string }): Promise<{ user: User; profile: any }> {
    const response = await api.put<ApiResponse<{ user: User; profile: any }>>('/auth/me', data)
    return response.data.data!
  },

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await api.post('/auth/change-password', { currentPassword, newPassword })
  },
}

// Dashboard API
export const dashboardApi = {
  async getDashboard(): Promise<any> {
    const response = await api.get<ApiResponse<any>>('/dashboard')
    return response.data.data
  },

  async getActivity(limit = 20): Promise<any[]> {
    const response = await api.get<ApiResponse<any[]>>('/dashboard/activity', {
      params: { limit },
    })
    return response.data.data || []
  },
}

// Schools API
export const schoolsApi = {
  async getAll(params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<any> {
    const response = await api.get('/schools', { params })
    return response.data
  },

  async getById(id: string): Promise<any> {
    const response = await api.get(`/schools/${id}`)
    return response.data.data
  },

  async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/schools/${id}`, data)
    return response.data.data
  },

  async getTeachers(id: string): Promise<any[]> {
    const response = await api.get(`/schools/${id}/teachers`)
    return response.data.data || []
  },

  async getStudents(id: string): Promise<any[]> {
    const response = await api.get(`/schools/${id}/students`)
    return response.data.data || []
  },

  async getCourses(id: string): Promise<any[]> {
    const response = await api.get(`/schools/${id}/courses`)
    return response.data.data || []
  },
}

// Courses API
export const coursesApi = {
  async getAll(params?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<any> {
    const response = await api.get('/courses', { params })
    return response.data
  },

  async getById(id: string): Promise<any> {
    const response = await api.get(`/courses/${id}`)
    return response.data.data
  },

  async create(data: any): Promise<any> {
    const response = await api.post('/courses', data)
    return response.data.data
  },

  async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/courses/${id}`, data)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/courses/${id}`)
  },

  async updateStatus(id: string, status: string): Promise<any> {
    const response = await api.put(`/courses/${id}/status`, { status })
    return response.data.data
  },

  async assignTeacher(
    courseId: string,
    teacherId: string,
    isPrimary = false
  ): Promise<any> {
    const response = await api.post(`/courses/${courseId}/teachers`, {
      teacherId,
      isPrimary,
    })
    return response.data.data
  },

  async removeTeacher(courseId: string, teacherId: string): Promise<void> {
    await api.delete(`/courses/${courseId}/teachers/${teacherId}`)
  },

  async scheduleLessons(courseId: string, data: any): Promise<any> {
    const response = await api.post(`/courses/${courseId}/schedule`, data)
    return response.data.data
  },

  async getEnrollments(courseId: string): Promise<any[]> {
    const response = await api.get(`/courses/${courseId}/enrollments`)
    return response.data.data || []
  },

  async getLessons(courseId: string): Promise<any[]> {
    const response = await api.get(`/courses/${courseId}/lessons`)
    return response.data.data || []
  },
}

// Lessons API
export const lessonsApi = {
  async getAll(params?: {
    page?: number
    limit?: number
    status?: string
    teacherId?: string
    courseId?: string
  }): Promise<any> {
    const response = await api.get('/lessons', { params })
    return response.data
  },

  async getById(id: string): Promise<any> {
    const response = await api.get(`/lessons/${id}`)
    return response.data.data
  },

  async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/lessons/${id}`, data)
    return response.data.data
  },

  async updateStatus(id: string, status: string): Promise<any> {
    const response = await api.put(`/lessons/${id}/status`, { status })
    return response.data.data
  },

  async recordAttendance(lessonId: string, data: any): Promise<any> {
    const response = await api.post(`/lessons/${lessonId}/attendance`, data)
    return response.data.data
  },

  async getMaterials(lessonId: string): Promise<any[]> {
    const response = await api.get(`/lessons/${lessonId}/materials`)
    return response.data.data || []
  },
}

// Teachers API
export const teachersApi = {
  async getAll(params?: { page?: number; limit?: number }): Promise<any> {
    const response = await api.get('/teachers', { params })
    return response.data
  },

  async getById(id: string): Promise<any> {
    const response = await api.get(`/teachers/${id}`)
    return response.data.data
  },

  async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/teachers/${id}`, data)
    return response.data.data
  },

  async getCourses(id: string): Promise<any[]> {
    const response = await api.get(`/teachers/${id}/courses`)
    return response.data.data || []
  },

  async getLessons(id: string): Promise<any[]> {
    const response = await api.get(`/teachers/${id}/lessons`)
    return response.data.data || []
  },
}

// Students API
export const studentsApi = {
  async getAll(params?: { page?: number; limit?: number }): Promise<any> {
    const response = await api.get('/students', { params })
    return response.data
  },

  async getById(id: string): Promise<any> {
    const response = await api.get(`/students/${id}`)
    return response.data.data
  },

  async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/students/${id}`, data)
    return response.data.data
  },

  async getEnrollments(id: string): Promise<any[]> {
    const response = await api.get(`/students/${id}/enrollments`)
    return response.data.data || []
  },

  async getProgress(id: string): Promise<any[]> {
    const response = await api.get(`/students/${id}/progress`)
    return response.data.data || []
  },
}

// Enrollments API
export const enrollmentsApi = {
  async create(data: {
    studentId: string
    courseId: string
    amountDue?: number
  }): Promise<any> {
    const response = await api.post('/enrollments', data)
    return response.data.data
  },

  async bulkCreate(data: {
    studentIds: string[]
    courseId: string
  }): Promise<any> {
    const response = await api.post('/enrollments/bulk', data)
    return response.data.data
  },

  async updatePaymentStatus(
    id: string,
    status: string,
    amountPaid?: number
  ): Promise<any> {
    const response = await api.put(`/enrollments/${id}/payment`, {
      status,
      amountPaid,
    })
    return response.data.data
  },

  async withdraw(id: string): Promise<any> {
    const response = await api.post(`/enrollments/${id}/withdraw`)
    return response.data.data
  },
}

// Modules API
export const modulesApi = {
  async create(courseId: string, data: any): Promise<any> {
    const response = await api.post(`/courses/${courseId}/modules`, data)
    return response.data.data
  },

  async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/modules/${id}`, data)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/modules/${id}`)
  },

  async reorder(courseId: string, moduleIds: string[]): Promise<void> {
    await api.put(`/courses/${courseId}/modules/reorder`, { moduleIds })
  },
}

// Feedback API
export const feedbackApi = {
  async create(data: {
    lessonId: string
    studentId: string
    content: string
    score?: number
  }): Promise<any> {
    const response = await api.post('/feedback', data)
    return response.data.data
  },

  async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/feedback/${id}`, data)
    return response.data.data
  },

  async approve(id: string): Promise<any> {
    const response = await api.post(`/feedback/${id}/approve`)
    return response.data.data
  },

  async send(id: string): Promise<any> {
    const response = await api.post(`/feedback/${id}/send`)
    return response.data.data
  },
}

// Questions API
export const questionsApi = {
  async create(data: { lessonId: string; question: string }): Promise<any> {
    const response = await api.post('/questions', data)
    return response.data.data
  },

  async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/questions/${id}`, data)
    return response.data.data
  },

  async approve(id: string): Promise<any> {
    const response = await api.post(`/questions/${id}/approve`)
    return response.data.data
  },

  async requestRevision(id: string, notes: string): Promise<any> {
    const response = await api.post(`/questions/${id}/request-revision`, {
      notes,
    })
    return response.data.data
  },
}

// Notifications API
export const notificationsApi = {
  async getMyNotifications(params?: {
    page?: number
    limit?: number
    unreadOnly?: boolean
  }): Promise<any> {
    const response = await api.get('/notifications/me', { params })
    return response.data
  },

  async getUnreadCount(): Promise<number> {
    const response = await api.get('/notifications/me/unread-count')
    return response.data.data?.unreadCount || 0
  },

  async markAsRead(id: string): Promise<void> {
    await api.post(`/notifications/${id}/read`)
  },

  async markAllAsRead(): Promise<void> {
    await api.post('/notifications/me/read-all')
  },
}

// Payments API
export const paymentsApi = {
  async getAll(params?: { page?: number; limit?: number }): Promise<any> {
    const response = await api.get('/payments', { params })
    return response.data
  },

  async create(data: any): Promise<any> {
    const response = await api.post('/payments', data)
    return response.data.data
  },

  async recordPayment(id: string, data: any): Promise<any> {
    const response = await api.post(`/payments/${id}/record`, data)
    return response.data.data
  },
}

// Materials API
export const materialsApi = {
  async upload(lessonId: string, formData: FormData): Promise<any> {
    const response = await api.post(`/lessons/${lessonId}/materials`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/materials/${id}`)
  },

  async reorder(lessonId: string, materialIds: string[]): Promise<void> {
    await api.put(`/lessons/${lessonId}/materials/reorder`, { materialIds })
  },
}

export default api
