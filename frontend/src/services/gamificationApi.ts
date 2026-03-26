import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Types
export interface GamificationProfile {
  totalXp: number
  level: number
  xpInCurrentLevel: number
  xpForNextLevel: number
  streak: StreakInfo
  badges: {
    earned: BadgeWithDate[]
    totalEarned: number
    totalAvailable: number
  }
  recentXp: XpTransaction[]
}

export interface StreakInfo {
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  freezesRemaining: number
  todayCompleted: boolean
}

export interface Badge {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  category: string
  criteria: { type: string; threshold: number | string }
  xpReward: number
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
  isActive: boolean
}

export interface BadgeWithDate extends Badge {
  earnedAt: string
}

export interface BadgesResponse {
  earned: BadgeWithDate[]
  available: Badge[]
  totalEarned: number
  totalAvailable: number
}

export interface XpTransaction {
  id: string
  amount: number
  source: string
  sourceId: string | null
  note: string | null
  createdAt: string
}

export interface LeaderboardEntry {
  studentId: string
  name: string
  level: string
  totalXp: number
  currentStreak: number
  rank: number
}

// API calls
export const gamificationApi = {
  getProfile: async (): Promise<GamificationProfile> => {
    const res = await api.get('/gamification/profile')
    return res.data.data
  },

  getBadges: async (): Promise<BadgesResponse> => {
    const res = await api.get('/gamification/badges')
    return res.data.data
  },

  getStreak: async (): Promise<StreakInfo> => {
    const res = await api.get('/gamification/streak')
    return res.data.data
  },

  getXpHistory: async (page = 1, limit = 20): Promise<{ data: XpTransaction[]; meta: { total: number; page: number; totalPages: number } }> => {
    const res = await api.get('/gamification/xp/history', { params: { page, limit } })
    return { data: res.data.data, meta: res.data.meta }
  },

  getLeaderboard: async (period: 'WEEKLY' | 'MONTHLY' | 'ALL_TIME' = 'WEEKLY', page = 1, limit = 20): Promise<{ data: LeaderboardEntry[]; meta: { total: number; page: number; totalPages: number } }> => {
    const res = await api.get('/gamification/leaderboard', { params: { period, page, limit } })
    return { data: res.data.data, meta: res.data.meta }
  },

  seedBadges: async (): Promise<void> => {
    await api.post('/gamification/seed-badges')
  },

  getStudentProfile: async (studentId: string): Promise<GamificationProfile> => {
    const res = await api.get(`/gamification/student/${studentId}`)
    return res.data.data
  },
}
