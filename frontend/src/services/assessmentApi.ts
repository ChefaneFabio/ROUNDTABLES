import api from './api'

export interface Assessment {
  id: string
  studentId: string
  language: string
  type: 'PLACEMENT' | 'PROGRESS' | 'FINAL'
  score?: number
  cefrLevel?: string
  status: 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED'
  answers?: any[]
  startedAt: string
  completedAt?: string
}

export interface AssessmentQuestion {
  id: string
  language: string
  cefrLevel: string
  questionType: 'MULTIPLE_CHOICE' | 'FILL_BLANK' | 'LISTENING' | 'READING' | 'WRITING'
  questionText: string
  options?: { label: string; value: string }[]
  audioUrl?: string
  imageUrl?: string
  points: number
}

export interface AssessmentResult {
  score: number
  cefrLevel: string
  totalQuestions: number
  correctAnswers: number
  levelBreakdown: Record<string, { correct: number; total: number }>
}

export const assessmentApi = {
  // Start a new assessment
  async startAssessment(language: string, type?: string): Promise<Assessment> {
    const response = await api.post('/assessments', { language, type })
    return response.data.data
  },

  // Get student's assessments
  async getMyAssessments(): Promise<Assessment[]> {
    const response = await api.get('/assessments/my')
    return response.data.data || []
  },

  // Get assessment by ID
  async getById(id: string): Promise<Assessment> {
    const response = await api.get(`/assessments/${id}`)
    return response.data.data
  },

  // Get next question
  async getNextQuestion(assessmentId: string): Promise<{
    isComplete: boolean
    question?: AssessmentQuestion
    progress?: { answered: number; currentLevel: string }
    totalAnswered?: number
  }> {
    const response = await api.get(`/assessments/${assessmentId}/next-question`)
    return response.data.data
  },

  // Submit an answer
  async submitAnswer(assessmentId: string, questionId: string, answer: string): Promise<{
    isCorrect: boolean
    correctAnswer: string
    points: number
  }> {
    const response = await api.post(`/assessments/${assessmentId}/answer`, {
      questionId,
      answer
    })
    return response.data.data
  },

  // Complete assessment and get results
  async completeAssessment(assessmentId: string): Promise<{
    assessment: Assessment
    result: AssessmentResult
  }> {
    const response = await api.post(`/assessments/${assessmentId}/complete`)
    return response.data.data
  },

  // Admin: Seed questions
  async seedQuestions(): Promise<{ message: string; count: number }> {
    const response = await api.post('/assessments/admin/seed-questions')
    return response.data.data
  }
}
