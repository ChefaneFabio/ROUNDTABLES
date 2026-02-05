import api from './api'

export interface ChatSession {
  id: string
  studentId: string
  language: string
  topic?: string
  cefrLevel?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  messages?: ChatMessage[]
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}

export interface ChatTopic {
  id: string
  name: string
  description: string
}

export interface ChatLanguage {
  code: string
  name: string
}

export const chatApi = {
  // Create new chat session
  async createSession(language: string, topic?: string): Promise<{
    session: ChatSession
    greeting: string
  }> {
    const response = await api.post('/chat/session', { language, topic })
    return response.data.data
  },

  // Get chat sessions
  async getMySessions(limit?: number): Promise<ChatSession[]> {
    const params = limit ? { limit } : {}
    const response = await api.get('/chat/sessions', { params })
    return response.data.data || []
  },

  // Get session by ID
  async getSession(id: string): Promise<ChatSession> {
    const response = await api.get(`/chat/session/${id}`)
    return response.data.data
  },

  // Send message
  async sendMessage(sessionId: string, message: string): Promise<{
    userMessage: string
    aiResponse: string
    messageCount: number
  }> {
    const response = await api.post(`/chat/session/${sessionId}/message`, { message })
    return response.data.data
  },

  // End session
  async endSession(sessionId: string): Promise<{
    session: ChatSession
    stats: {
      totalMessages: number
      userMessages: number
      aiMessages: number
      duration: number
    }
  }> {
    const response = await api.post(`/chat/session/${sessionId}/end`)
    return response.data.data
  },

  // Get available topics
  async getTopics(): Promise<ChatTopic[]> {
    const response = await api.get('/chat/topics')
    return response.data.data || []
  },

  // Get available languages
  async getLanguages(): Promise<ChatLanguage[]> {
    const response = await api.get('/chat/languages')
    return response.data.data || []
  }
}
