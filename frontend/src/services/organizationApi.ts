import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance that shares the same interceptors
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Organization API
export const organizationApi = {
  async getOrganizations(params?: { page?: number; limit?: number; search?: string }): Promise<any> {
    const response = await api.get('/organizations', { params })
    return response.data
  },

  async getOrganization(id: string): Promise<any> {
    const response = await api.get(`/organizations/${id}`)
    return response.data.data
  },

  async updateOrganization(id: string, data: any): Promise<any> {
    const response = await api.put(`/organizations/${id}`, data)
    return response.data.data
  },

  async deleteOrganization(id: string): Promise<void> {
    await api.delete(`/organizations/${id}`)
  },

  async getEmployees(orgId: string, params?: { page?: number; limit?: number }): Promise<any> {
    const response = await api.get(`/organizations/${orgId}/employees`, { params })
    return response.data
  },

  async inviteEmployee(orgId: string, data: { email: string; name: string; languageLevel?: string }): Promise<any> {
    const response = await api.post(`/organizations/${orgId}/employees/invite`, data)
    return response.data.data
  },

  async removeEmployee(orgId: string, studentId: string): Promise<void> {
    await api.delete(`/organizations/${orgId}/employees/${studentId}`)
  },

  async getDashboard(orgId: string): Promise<any> {
    const response = await api.get(`/organizations/${orgId}/dashboard`)
    return response.data.data
  },
}

// Seat License API
export const seatLicenseApi = {
  async getAll(params?: { page?: number; limit?: number; organizationId?: string }): Promise<any> {
    const response = await api.get('/seat-licenses', { params })
    return response.data
  },

  async getById(id: string): Promise<any> {
    const response = await api.get(`/seat-licenses/${id}`)
    return response.data.data
  },

  async create(data: {
    organizationId: string
    courseId: string
    totalSeats: number
    pricePerSeat: number
    startsAt: string
    expiresAt?: string
    autoRenew?: boolean
    notes?: string
  }): Promise<any> {
    const response = await api.post('/seat-licenses', data)
    return response.data.data
  },

  async update(id: string, data: any): Promise<any> {
    const response = await api.put(`/seat-licenses/${id}`, data)
    return response.data.data
  },

  async cancel(id: string): Promise<void> {
    await api.delete(`/seat-licenses/${id}`)
  },

  async allocateSeat(licenseId: string, studentId: string): Promise<any> {
    const response = await api.post(`/seat-licenses/${licenseId}/allocate`, { studentId })
    return response.data.data
  },

  async revokeSeat(licenseId: string, studentId: string): Promise<void> {
    await api.delete(`/seat-licenses/${licenseId}/allocate/${studentId}`)
  },
}

// Public Catalog API (no auth required)
export const catalogApi = {
  async getCourses(params?: {
    page?: number
    limit?: number
    search?: string
    language?: string
    courseType?: string
    cefrLevel?: string
  }): Promise<any> {
    const response = await api.get('/catalog', { params })
    return response.data
  },

  async getCourse(id: string): Promise<any> {
    const response = await api.get(`/catalog/${id}`)
    return response.data.data
  },

  async getCourseContents(id: string): Promise<any> {
    const response = await api.get(`/catalog/${id}/contents`)
    return response.data.data
  },
}
