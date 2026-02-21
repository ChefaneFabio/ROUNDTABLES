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
  // Multi-skill fields
  isMultiSkill?: boolean
  currentSection?: number
  readingLevel?: string
  listeningLevel?: string
  writingLevel?: string
  speakingLevel?: string
  sections?: AssessmentSection[]
}

export interface AssessmentSection {
  id: string
  assessmentId: string
  skill: 'READING' | 'LISTENING' | 'WRITING' | 'SPEAKING'
  orderIndex: number
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED'
  timeLimitMin: number
  expiresAt?: string
  startedAt?: string
  completedAt?: string
  targetLevel: string
  questionsLimit: number
  answers?: any[]
  rawScore?: number
  maxScore?: number
  percentageScore?: number
  cefrLevel?: string
  aiScore?: any
  teacherScore?: any
  finalScore?: any
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

  // Download multi-skill results PDF
  async downloadMultiSkillResultsPdf(assessmentId: string): Promise<Blob> {
    const response = await api.get(`/assessments/multi-skill/${assessmentId}/results/pdf`, {
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
  },

  // ==================== Multi-Skill Assessment API ====================

  // Create a multi-skill assessment
  async createMultiSkill(language: string): Promise<Assessment> {
    const response = await api.post('/assessments/multi-skill', { language })
    return response.data.data
  },

  // Get sections for an assessment
  async getSections(assessmentId: string): Promise<AssessmentSection[]> {
    const response = await api.get(`/assessments/multi-skill/${assessmentId}/sections`)
    return response.data.data || []
  },

  // Start a section
  async startSection(assessmentId: string, sectionId: string): Promise<AssessmentSection> {
    const response = await api.post(`/assessments/multi-skill/${assessmentId}/sections/${sectionId}/start`)
    return response.data.data
  },

  // Get next question for a section
  async getSectionNextQuestion(assessmentId: string, sectionId: string): Promise<{
    isComplete: boolean
    expired?: boolean
    question?: AssessmentQuestion & { skill?: string; ttsScript?: string; speakingPrompt?: string; rubric?: any }
    progress?: { answered: number; total: number; currentLevel: string }
    remainingSeconds?: number | null
    totalAnswered?: number
  }> {
    const response = await api.get(`/assessments/multi-skill/${assessmentId}/sections/${sectionId}/next-question`)
    return response.data.data
  },

  // Submit section answer
  async submitSectionAnswer(assessmentId: string, sectionId: string, questionId: string, answer: string): Promise<{
    isCorrect: boolean
    correctAnswer: string
    points: number
    shouldAutoComplete?: boolean
    expired?: boolean
  }> {
    const response = await api.post(`/assessments/multi-skill/${assessmentId}/sections/${sectionId}/answer`, {
      questionId, answer
    })
    return response.data.data
  },

  // Complete a section
  async completeSection(assessmentId: string, sectionId: string): Promise<AssessmentSection> {
    const response = await api.post(`/assessments/multi-skill/${assessmentId}/sections/${sectionId}/complete`)
    return response.data.data
  },

  // Submit writing response
  async submitWritingResponse(assessmentId: string, sectionId: string, questionId: string, responseText: string): Promise<any> {
    const response = await api.post(`/assessments/multi-skill/${assessmentId}/sections/${sectionId}/writing`, {
      questionId, responseText
    })
    return response.data.data
  },

  // Submit speaking response
  async submitSpeakingResponse(assessmentId: string, sectionId: string, questionId: string, audioUrl: string, duration?: number): Promise<any> {
    const response = await api.post(`/assessments/multi-skill/${assessmentId}/sections/${sectionId}/speaking`, {
      questionId, audioUrl, duration
    })
    return response.data.data
  },

  // Upload audio file
  async uploadAudio(file: Blob): Promise<{ audioUrl: string; filename: string }> {
    const formData = new FormData()
    formData.append('audio', file, 'recording.webm')
    const response = await api.post('/assessments/multi-skill/upload-audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data.data
  },

  // Get TTS audio for a question
  async getTtsAudio(questionId: string): Promise<{ audioUrl: string | null; ttsScript: string; fallback: boolean }> {
    const response = await api.get(`/assessments/multi-skill/tts/${questionId}`)
    return response.data.data
  },

  // Get multi-skill results
  async getMultiSkillResults(assessmentId: string): Promise<any> {
    const response = await api.get(`/assessments/multi-skill/${assessmentId}/results`)
    return response.data.data
  },

  // Admin: Get sections pending teacher review
  async getPendingReview(): Promise<any[]> {
    const response = await api.get('/assessments/multi-skill/admin/pending-review')
    return response.data.data || []
  },

  // Admin: Submit teacher score
  async submitTeacherScore(assessmentId: string, sectionId: string, score: any): Promise<any> {
    const response = await api.post(`/assessments/multi-skill/${assessmentId}/sections/${sectionId}/teacher-score`, score)
    return response.data.data
  },

  // Admin: Trigger AI scoring
  async triggerAiScoring(assessmentId: string, sectionId: string): Promise<any> {
    const response = await api.post(`/assessments/multi-skill/${assessmentId}/sections/${sectionId}/ai-score`)
    return response.data.data
  },

  // Admin: Seed multi-skill questions
  async seedMultiSkillQuestions(language: string): Promise<any> {
    const response = await api.post('/assessments/multi-skill/admin/seed-multi-skill', { language })
    return response.data.data
  },

  // ==================== Question Bank Admin API ====================

  // Get question bank summary (counts by language/skill/level)
  async getQuestionBankSummary(): Promise<Record<string, Record<string, Record<string, number>>>> {
    const response = await api.get('/assessments/multi-skill/admin/question-bank/summary')
    return response.data.data
  },

  // List questions with filters + pagination
  async getQuestionBank(filters: {
    language?: string
    skill?: string
    cefrLevel?: string
    search?: string
    page?: number
    limit?: number
  }): Promise<{
    questions: any[]
    total: number
    page: number
    limit: number
    totalPages: number
  }> {
    const params = new URLSearchParams()
    if (filters.language) params.set('language', filters.language)
    if (filters.skill) params.set('skill', filters.skill)
    if (filters.cefrLevel) params.set('cefrLevel', filters.cefrLevel)
    if (filters.search) params.set('search', filters.search)
    if (filters.page) params.set('page', String(filters.page))
    if (filters.limit) params.set('limit', String(filters.limit))
    const response = await api.get(`/assessments/multi-skill/admin/question-bank?${params.toString()}`)
    return response.data.data
  },

  // Get single question detail
  async getQuestion(id: string): Promise<any> {
    const response = await api.get(`/assessments/multi-skill/admin/question-bank/${id}`)
    return response.data.data
  },

  // Create a new question
  async createQuestion(data: any): Promise<any> {
    const response = await api.post('/assessments/multi-skill/admin/question-bank', data)
    return response.data.data
  },

  // Update a question
  async updateQuestion(id: string, data: any): Promise<any> {
    const response = await api.put(`/assessments/multi-skill/admin/question-bank/${id}`, data)
    return response.data.data
  },

  // Delete a question (soft-delete)
  async deleteQuestion(id: string): Promise<void> {
    await api.delete(`/assessments/multi-skill/admin/question-bank/${id}`)
  }
}
