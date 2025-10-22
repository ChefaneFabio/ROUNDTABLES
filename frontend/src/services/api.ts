import axios from 'axios'

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://roundtables-backend.onrender.com/api',
  timeout: 15000, // Increased timeout for Render free tier
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/login'
    }
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.')
    }
    if (!error.response) {
      throw new Error('Network error. Please check your connection.')
    }
    throw error
  }
)

// Dashboard API
export const dashboardApi = {
  async getStats() {
    const response = await api.get('/dashboard/stats')
    return response.data
  }
}

// Clients API  
export const clientsApi = {
  async getAll() {
    const response = await api.get('/clients')
    return response.data
  },

  async getById(id: string) {
    const response = await api.get(`/clients/${id}`)
    return response.data
  },

  async create(clientData: any) {
    const response = await api.post('/clients', clientData)
    return response.data
  },

  async update(id: string, clientData: any) {
    const response = await api.put(`/clients/${id}`, clientData)
    return response.data
  },

  async delete(id: string) {
    const response = await api.delete(`/clients/${id}`)
    return response.data
  }
}

// Roundtables API
export const roundtablesApi = {
  async getAll(params?: any) {
    const response = await api.get('/roundtables', { params })
    return response.data
  },

  async getById(id: string) {
    const response = await api.get(`/roundtables/${id}`)
    return response.data
  },

  async create(roundtableData: any) {
    const response = await api.post('/roundtables', roundtableData)
    return response.data
  },

  async update(id: string, roundtableData: any) {
    const response = await api.put(`/roundtables/${id}`, roundtableData)
    return response.data
  },

  async delete(id: string) {
    const response = await api.delete(`/roundtables/${id}`)
    return response.data
  },

  async getSettings(id: string) {
    const response = await api.get(`/roundtables/${id}/settings`)
    return response.data
  },

  async updateSettings(id: string, settings: any) {
    const response = await api.patch(`/roundtables/${id}/settings`, settings)
    return response.data
  }
}

// Sessions API
export const sessionsApi = {
  async getAll(params?: any) {
    const response = await api.get('/sessions', { params })
    return response.data
  },

  async getById(id: string) {
    const response = await api.get(`/sessions/${id}`)
    return response.data
  },

  async update(id: string, sessionData: any) {
    const response = await api.put(`/sessions/${id}`, sessionData)
    return response.data
  }
}

// Participants API
export const participantsApi = {
  async getByRoundtable(roundtableId: string) {
    const response = await api.get(`/participants/roundtable/${roundtableId}`)
    return response.data
  },

  async create(participantData: any) {
    const response = await api.post('/participants', participantData)
    return response.data
  },

  async update(id: string, participantData: any) {
    const response = await api.put(`/participants/${id}`, participantData)
    return response.data
  },

  async delete(id: string) {
    const response = await api.delete(`/participants/${id}`)
    return response.data
  }
}

// Trainers API
export const trainersApi = {
  async getProfile(email: string) {
    const response = await api.get(`/trainers/me?email=${email}`)
    return response.data
  },

  async getSessions(email: string) {
    const response = await api.get(`/trainers/me/sessions?email=${email}`)
    return response.data
  },

  async submitQuestions(sessionId: string, email: string, questions: Array<{ question: string }>) {
    const response = await api.post(`/trainers/me/sessions/${sessionId}/questions?email=${email}`, {
      questions
    })
    return response.data
  },

  async submitFeedback(sessionId: string, email: string, feedbacks: Array<{ participantId: string, content: string }>) {
    const response = await api.post(`/trainers/me/sessions/${sessionId}/feedback?email=${email}`, {
      feedbacks
    })
    return response.data
  }
}

// Questions API
export const questionsApi = {
  async getAll(params?: any) {
    const response = await api.get('/questions', { params })
    return response.data
  },

  async submitForSession(sessionId: string, questions: string[]) {
    const response = await api.post('/questions/submit', {
      sessionId,
      questions
    })
    return response.data
  },

  async review(questionId: string, status: string, notes?: string) {
    const response = await api.put(`/questions/${questionId}/review`, {
      status,
      reviewNotes: notes
    })
    return response.data
  }
}

export default api