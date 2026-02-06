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

// Speech types
export interface SpeakingSession {
  id: string
  studentId: string
  chatSessionId?: string
  language: string
  cefrLevel?: string
  targetText?: string
  recognizedText?: string
  accuracyScore?: number
  fluencyScore?: number
  feedback?: PronunciationFeedback
  audioUrl?: string
  duration?: number
  createdAt: string
}

export interface PronunciationFeedback {
  wordFeedback: Array<{
    word: string
    status: 'correct' | 'incorrect' | 'missing' | 'extra'
    recognized?: string
  }>
  overallFeedback: string
  suggestions: string[]
  summary: {
    totalWords: number
    correctWords: number
    incorrectWords: number
    missingWords: number
    extraWords: number
  }
}

export interface SpeakingPrompt {
  id: string
  text: string
  category: string
  difficulty: string
  language: string
  cefrLevel: string
}

export interface AnalysisResult {
  session: SpeakingSession
  accuracyScore: number
  fluencyScore: number
  feedback: PronunciationFeedback
}

export interface SpeakingStats {
  totalSessions: number
  avgAccuracy: number
  avgFluency: number
  totalPracticeTime: number
  improvementTrend: 'improving' | 'stable' | 'declining' | 'none'
}

// Speech API
export const speechApi = {
  // Analyze pronunciation
  async analyzePronunciation(data: {
    targetText: string
    recognizedText: string
    language: string
    cefrLevel?: string
    chatSessionId?: string
    duration?: number
    audioUrl?: string
  }): Promise<AnalysisResult> {
    const response = await api.post('/speech/analyze', data)
    return response.data.data
  },

  // Save speaking session directly
  async saveSession(data: {
    language: string
    cefrLevel?: string
    targetText?: string
    recognizedText?: string
    accuracyScore?: number
    fluencyScore?: number
    feedback?: any
    audioUrl?: string
    duration?: number
    chatSessionId?: string
  }): Promise<SpeakingSession> {
    const response = await api.post('/speech/session', data)
    return response.data.data
  },

  // Get student's speaking sessions
  async getSessions(limit?: number): Promise<SpeakingSession[]> {
    const response = await api.get('/speech/sessions', {
      params: limit ? { limit } : undefined
    })
    return response.data.data || []
  },

  // Get session by ID
  async getSession(id: string): Promise<SpeakingSession> {
    const response = await api.get(`/speech/sessions/${id}`)
    return response.data.data
  },

  // Get speaking prompts by level
  async getPrompts(level?: string, language?: string): Promise<SpeakingPrompt[]> {
    const response = await api.get('/speech/prompts', {
      params: { level, language }
    })
    return response.data.data || []
  },

  // Get random prompt for level
  async getRandomPrompt(level: string, language?: string): Promise<SpeakingPrompt> {
    const response = await api.get('/speech/prompts/random', {
      params: { level, language }
    })
    return response.data.data
  },

  // Get speaking statistics
  async getStats(): Promise<SpeakingStats> {
    const response = await api.get('/speech/stats')
    return response.data.data
  }
}

export default speechApi
