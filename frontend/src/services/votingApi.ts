import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
})

export interface VotingData {
  roundtable: {
    id: string
    name: string
    client: { name: string; company: string }
  }
  participant: {
    name: string
    email: string
    hasVoted: boolean
  }
  topics: Array<{
    id: string
    title: string
    description: string
    isSelected: boolean
  }>
  votingInstructions: {
    maxSelections: number
    message: string
  }
}

export interface VotingResults {
  topics: Array<{
    id: string
    title: string
    description: string
    voteCount: number
    percentage: number
    isSelected: boolean
    voters: Array<{ name: string; email: string }>
  }>
  statistics: {
    totalParticipants: number
    votedParticipants: number
    votingProgress: number
    selectedTopics: number
  }
  top8Topics: any[]
  status: {
    canFinalize: boolean
  }
}

export interface SubmitVotesRequest {
  participantEmail: string
  topicIds: string[]
}

export const votingApi = {
  async getVotingData(roundtableId: string, email: string): Promise<VotingData> {
    const response = await api.get(`/topics/vote/${roundtableId}`, {
      params: { email }
    })
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to load voting data')
    }
    
    return response.data.data
  },

  async submitVotes(roundtableId: string, votes: SubmitVotesRequest): Promise<any> {
    const response = await api.post(`/topics/vote/${roundtableId}`, votes)
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to submit votes')
    }
    
    return response.data.data
  },

  async getVotingResults(roundtableId: string): Promise<VotingResults> {
    const response = await api.get(`/topics/results/${roundtableId}`)
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to load voting results')
    }
    
    return response.data.data
  },

  async checkIfVoted(roundtableId: string, email: string): Promise<boolean> {
    const response = await api.get(`/topics/check-vote/${roundtableId}/${encodeURIComponent(email)}`)
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to check vote status')
    }
    
    return response.data.data.hasVoted
  },

  async getTopicsForRoundtable(roundtableId: string): Promise<any[]> {
    const response = await api.get(`/topics/roundtable/${roundtableId}`)
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to load topics')
    }
    
    return response.data.data
  }
}

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
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