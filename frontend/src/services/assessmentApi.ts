import api from './api'

export interface Assessment {
  id: string
  studentId: string
  language: string
  type: 'PLACEMENT' | 'PROGRESS' | 'FINAL'
  score?: number
  cefrLevel?: string
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED'
  answers?: any[]
  targetLevel?: string
  questionsLimit?: number
  startedAt?: string
  completedAt?: string
  assignedById?: string
  assignedAt?: string
  timeLimitMin?: number
  expiresAt?: string
  violations?: { type: string; timestamp: string; details?: string }[]
}

export interface AssessmentQuestion {
  id: string
  language: string
  cefrLevel: string
  questionType: 'MULTIPLE_CHOICE' | 'FILL_BLANK' | 'LISTENING' | 'READING' | 'WRITING'
  questionText: string
  options?: { label: string; value: string }[]
  passage?: string
  passageTitle?: string
  audioUrl?: string
  imageUrl?: string
  points: number
}

export interface AssessmentResult {
  score: number
  cefrLevel: string
  cefrName?: string
  totalQuestions: number
  correctAnswers: number
  levelBreakdown: Record<string, { correct: number; total: number; name?: string }>
}

export const assessmentApi = {
  // Start a new assessment
  async startAssessment(language: string, type?: string, questionsLimit?: number): Promise<Assessment> {
    const response = await api.post('/assessments', { language, type, questionsLimit })
    return response.data.data
  },

  // Get student's assessments
  async getMyAssessments(): Promise<Assessment[]> {
    const response = await api.get('/assessments/my')
    return response.data.data || []
  },

  // Get assigned assessments for current student
  async getAssignedAssessments(): Promise<Assessment[]> {
    const response = await api.get('/assessments/my/assigned')
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
    expired?: boolean
    question?: AssessmentQuestion
    progress?: { answered: number; total: number; currentLevel: string }
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
    shouldAutoComplete?: boolean
    expired?: boolean
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

  // Start an assigned assessment
  async startAssigned(id: string): Promise<Assessment> {
    const response = await api.post(`/assessments/${id}/start`)
    return response.data.data
  },

  // Report a violation event
  async reportViolation(id: string, data: { type: string; timestamp: string; details?: string }): Promise<void> {
    await api.post(`/assessments/${id}/violation`, data)
  },

  // Admin: Assign assessment to students
  async assignAssessment(data: {
    studentIds: string[]
    language: string
    type?: string
    timeLimitMin?: number
    questionsLimit?: number
  }): Promise<any[]> {
    const response = await api.post('/assessments/admin/assign', data)
    return response.data.data
  },

  // Download assessment results PDF
  async downloadResultsPdf(assessmentId: string): Promise<Blob> {
    const response = await api.get(`/assessments/${assessmentId}/download-pdf`, {
      responseType: 'blob'
    })
    return response.data
  },

  // Email assessment results
  async emailResults(assessmentId: string, email?: string): Promise<{ messageId: string; sentTo: string }> {
    const response = await api.post(`/assessments/${assessmentId}/email-results`, { email })
    return response.data.data
  },

  // Get detailed results (with question text, student answer, correct answer)
  async getDetailedResults(assessmentId: string): Promise<{
    assessment: {
      id: string
      language: string
      type: string
      score: number
      cefrLevel: string
      cefrName: string
      startedAt: string
      completedAt: string
      totalQuestions: number
      correctAnswers: number
    }
    student: { id: string; name: string; email: string }
    levelBreakdown: Record<string, { correct: number; total: number; name: string }>
    answers: Array<{
      questionId: string
      questionText: string
      questionType: string
      cefrLevel: string
      options: { label: string; value: string }[] | null
      passage: string | null
      passageTitle: string | null
      studentAnswer: string
      correctAnswer: string
      isCorrect: boolean
      points: number
    }>
  }> {
    const response = await api.get(`/assessments/${assessmentId}/detailed-results`)
    return response.data.data
  },

  // Admin: Get a student's assessments
  async getStudentAssessments(studentId: string): Promise<Assessment[]> {
    const response = await api.get(`/assessments/admin/student/${studentId}/assessments`)
    return response.data.data || []
  },

  // Admin: Seed questions
  async seedQuestions(): Promise<{ message: string; count: number }> {
    const response = await api.post('/assessments/admin/seed-questions')
    return response.data.data
  },

  // Admin: Seed all question banks (English + Italian)
  async seedAllQuestions(): Promise<{ english: any; italian: any; totalCount: number }> {
    const response = await api.post('/assessments/admin/seed-all-questions')
    return response.data.data
  }
}
