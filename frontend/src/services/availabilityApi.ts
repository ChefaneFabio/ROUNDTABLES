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

export interface AvailabilitySlot {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isRecurring: boolean
  specificDate?: string
  status: 'AVAILABLE' | 'BUSY' | 'TENTATIVE' | 'VACATION' | 'SICK_LEAVE'
  notes?: string
  teacherId: string
}

export interface AvailabilityCheck {
  isAvailable: boolean
  hasAvailabilitySlot: boolean
  hasConflict: boolean
  conflictDetails?: {
    id: string
    scheduledAt: string
    duration: number
    title?: string
    course?: { name: string }
  }
}

export interface BulkSlot {
  dayOfWeek: number
  startTime: string
  endTime: string
  status?: string
}

export const availabilityApi = {
  getMy: async (): Promise<AvailabilitySlot[]> => {
    const res = await api.get('/availability/my')
    return res.data.data
  },

  create: async (slot: Omit<AvailabilitySlot, 'id' | 'teacherId'>): Promise<AvailabilitySlot> => {
    const res = await api.post('/availability', slot)
    return res.data.data
  },

  bulkSet: async (slots: BulkSlot[]): Promise<AvailabilitySlot[]> => {
    const res = await api.put('/availability/bulk', { slots })
    return res.data.data
  },

  update: async (id: string, data: Partial<AvailabilitySlot>): Promise<AvailabilitySlot> => {
    const res = await api.patch(`/availability/${id}`, data)
    return res.data.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/availability/${id}`)
  },

  getTeacher: async (teacherId: string): Promise<{ teacher: any; availability: AvailabilitySlot[]; upcomingLessons: any[] }> => {
    const res = await api.get(`/availability/teacher/${teacherId}`)
    return res.data.data
  },

  check: async (teacherId: string, date: string, duration?: number): Promise<AvailabilityCheck> => {
    const res = await api.get('/availability/check', { params: { teacherId, date, duration } })
    return res.data.data
  },
}
