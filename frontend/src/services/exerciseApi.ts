import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Exercise types
export type ExerciseType =
  | 'DRAG_DROP'
  | 'MATCHING'
  | 'FILL_BLANKS'
  | 'LISTENING'
  | 'REORDER'
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'

export type ExerciseAttemptStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'

export interface Exercise {
  id: string
  title: string
  description?: string
  type: ExerciseType
  language: string
  cefrLevel?: string
  instructions?: string
  timeLimit?: number
  passingScore: number
  config: Record<string, any>
  isPublished: boolean
  createdById: string
  schoolId: string
  lessonId?: string
  items?: ExerciseItem[]
  createdBy?: { id: string; name: string }
  _count?: { items: number; attempts: number }
  lastAttempt?: {
    id: string
    status: ExerciseAttemptStatus
    score?: number
    percentage?: number
    completedAt?: string
  } | null
  createdAt: string
  updatedAt: string
}

export interface ExerciseItem {
  id: string
  exerciseId: string
  orderIndex: number
  questionText?: string
  content: Record<string, any>
  correctAnswer: Record<string, any>
  points: number
  hint?: string
  explanation?: string
  audioUrl?: string
  imageUrl?: string
}

export interface ExerciseAttempt {
  id: string
  exerciseId: string
  studentId: string
  status: ExerciseAttemptStatus
  score?: number
  maxScore?: number
  percentage?: number
  answers?: Array<{
    itemId: string
    answer: any
    isCorrect: boolean
    points: number
    submittedAt: string
  }>
  startedAt: string
  completedAt?: string
  timeSpent?: number
  exercise?: Exercise
}

export interface AnswerResult {
  isCorrect: boolean
  points: number
  explanation?: string
  correctAnswer?: any
}

export interface CompletionResult {
  attempt: ExerciseAttempt
  score: number
  maxScore: number
  percentage: number
  passed: boolean
  passingScore: number
  timeSpent: number
}

// Exercise API
export const exerciseApi = {
  // Admin/Teacher: Exercise CRUD
  async createExercise(data: {
    title: string
    description?: string
    type: ExerciseType
    language: string
    cefrLevel?: string
    instructions?: string
    timeLimit?: number
    passingScore?: number
    config?: Record<string, any>
    isPublished?: boolean
    lessonId?: string
  }): Promise<Exercise> {
    const response = await api.post('/exercises', data)
    return response.data.data
  },

  async getExercises(params?: {
    type?: ExerciseType
    language?: string
    cefrLevel?: string
    lessonId?: string
    page?: number
    limit?: number
  }): Promise<{ exercises: Exercise[]; pagination: any }> {
    const response = await api.get('/exercises', { params })
    return {
      exercises: response.data.data || [],
      pagination: response.data.meta
    }
  },

  async getExercise(id: string): Promise<Exercise> {
    const response = await api.get(`/exercises/${id}`)
    return response.data.data
  },

  async updateExercise(id: string, data: Partial<Exercise>): Promise<Exercise> {
    const response = await api.put(`/exercises/${id}`, data)
    return response.data.data
  },

  async deleteExercise(id: string): Promise<void> {
    await api.delete(`/exercises/${id}`)
  },

  async getExerciseStats(id: string): Promise<{
    attemptCount: number
    completedCount: number
    completionRate: number
    avgScore: number
    avgTimeSpent: number
  }> {
    const response = await api.get(`/exercises/${id}/stats`)
    return response.data.data
  },

  // Items CRUD
  async addItem(exerciseId: string, data: {
    orderIndex?: number
    questionText?: string
    content: Record<string, any>
    correctAnswer: Record<string, any>
    points?: number
    hint?: string
    explanation?: string
    audioUrl?: string
    imageUrl?: string
  }): Promise<ExerciseItem> {
    const response = await api.post(`/exercises/${exerciseId}/items`, data)
    return response.data.data
  },

  async updateItem(exerciseId: string, itemId: string, data: Partial<ExerciseItem>): Promise<ExerciseItem> {
    const response = await api.put(`/exercises/${exerciseId}/items/${itemId}`, data)
    return response.data.data
  },

  async deleteItem(exerciseId: string, itemId: string): Promise<void> {
    await api.delete(`/exercises/${exerciseId}/items/${itemId}`)
  },

  async reorderItems(exerciseId: string, itemIds: string[]): Promise<void> {
    await api.post(`/exercises/${exerciseId}/items/reorder`, { itemIds })
  },

  // Student: Available Exercises
  async getAvailableExercises(params?: {
    type?: ExerciseType
    language?: string
    cefrLevel?: string
    page?: number
    limit?: number
  }): Promise<{ exercises: Exercise[]; pagination: any }> {
    const response = await api.get('/exercises/available', { params })
    return {
      exercises: response.data.data || [],
      pagination: response.data.meta
    }
  },

  // Student: Taking Exercises
  async startAttempt(exerciseId: string): Promise<{
    attempt: ExerciseAttempt
    exercise: Exercise
  }> {
    const response = await api.post(`/exercises/${exerciseId}/start`)
    return response.data.data
  },

  async submitAnswer(attemptId: string, data: {
    itemId: string
    answer: any
  }): Promise<AnswerResult> {
    const response = await api.post(`/exercises/attempts/${attemptId}/answer`, data)
    return response.data.data
  },

  async completeAttempt(attemptId: string): Promise<CompletionResult> {
    const response = await api.post(`/exercises/attempts/${attemptId}/complete`)
    return response.data.data
  },

  async abandonAttempt(attemptId: string): Promise<ExerciseAttempt> {
    const response = await api.post(`/exercises/attempts/${attemptId}/abandon`)
    return response.data.data
  },

  async getAttempt(attemptId: string): Promise<ExerciseAttempt> {
    const response = await api.get(`/exercises/attempts/${attemptId}`)
    return response.data.data
  },

  async getMyAttempts(exerciseId?: string): Promise<ExerciseAttempt[]> {
    const response = await api.get('/exercises/my/attempts', {
      params: exerciseId ? { exerciseId } : undefined
    })
    return response.data.data || []
  },

  async getMyStats(): Promise<{
    totalAttempts: number
    completed: number
    avgScore: number
  }> {
    const response = await api.get('/exercises/my/stats')
    return response.data.data
  }
}

export default exerciseApi
