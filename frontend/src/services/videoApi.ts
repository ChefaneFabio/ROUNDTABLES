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

// Video Library types
export interface VideoLibrary {
  id: string
  title: string
  description?: string
  coverImage?: string
  isPublished: boolean
  schoolId: string
  categories: VideoCategory[]
  _count?: { videos: number }
  createdAt: string
  updatedAt: string
}

export interface VideoCategory {
  id: string
  name: string
  description?: string
  orderIndex: number
  libraryId: string
  _count?: { videos: number }
}

export interface VideoContent {
  id: string
  title: string
  description?: string
  url: string
  thumbnailUrl?: string
  duration?: number
  language: string
  cefrLevel?: string
  tags: string[]
  transcript?: string
  subtitlesUrl?: string
  isPublished: boolean
  orderIndex: number
  viewCount: number
  libraryId: string
  categoryId?: string
  lessonId?: string
  category?: VideoCategory
  library?: { id: string; title: string }
  progress?: VideoProgress | null
  createdAt: string
  updatedAt: string
}

export interface VideoProgress {
  percentage: number
  watchedSeconds: number
  isCompleted: boolean
}

// Library API
export const videoLibraryApi = {
  // Admin: Library CRUD
  async createLibrary(data: {
    title: string
    description?: string
    coverImage?: string
    isPublished?: boolean
  }): Promise<VideoLibrary> {
    const response = await api.post('/videos/libraries', data)
    return response.data.data
  },

  async getLibraries(): Promise<VideoLibrary[]> {
    const response = await api.get('/videos/libraries')
    return response.data.data || []
  },

  async getLibrary(id: string): Promise<VideoLibrary> {
    const response = await api.get(`/videos/libraries/${id}`)
    return response.data.data
  },

  async updateLibrary(id: string, data: Partial<VideoLibrary>): Promise<VideoLibrary> {
    const response = await api.put(`/videos/libraries/${id}`, data)
    return response.data.data
  },

  async deleteLibrary(id: string): Promise<void> {
    await api.delete(`/videos/libraries/${id}`)
  },

  async getLibraryStats(id: string): Promise<{ videoCount: number; totalViews: number; avgCompletion: number }> {
    const response = await api.get(`/videos/libraries/${id}/stats`)
    return response.data.data
  },

  // Admin: Category CRUD
  async createCategory(libraryId: string, data: {
    name: string
    description?: string
    orderIndex?: number
  }): Promise<VideoCategory> {
    const response = await api.post(`/videos/libraries/${libraryId}/categories`, data)
    return response.data.data
  },

  async updateCategory(id: string, data: Partial<VideoCategory>): Promise<VideoCategory> {
    const response = await api.put(`/videos/categories/${id}`, data)
    return response.data.data
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/videos/categories/${id}`)
  },

  async reorderCategories(libraryId: string, categoryIds: string[]): Promise<void> {
    await api.post(`/videos/libraries/${libraryId}/categories/reorder`, { categoryIds })
  },

  // Admin: Video CRUD
  async createVideo(libraryId: string, data: {
    title: string
    description?: string
    url: string
    thumbnailUrl?: string
    duration?: number
    language: string
    cefrLevel?: string
    tags?: string[]
    transcript?: string
    subtitlesUrl?: string
    isPublished?: boolean
    categoryId?: string
    lessonId?: string
    orderIndex?: number
  }): Promise<VideoContent> {
    const response = await api.post(`/videos/libraries/${libraryId}/videos`, data)
    return response.data.data
  },

  async getLibraryVideos(libraryId: string, params?: {
    categoryId?: string
    cefrLevel?: string
    search?: string
    page?: number
    limit?: number
  }): Promise<{ videos: VideoContent[]; pagination: any }> {
    const response = await api.get(`/videos/libraries/${libraryId}/videos`, { params })
    return {
      videos: response.data.data || [],
      pagination: response.data.meta
    }
  },

  async getVideo(id: string): Promise<VideoContent> {
    const response = await api.get(`/videos/${id}`)
    return response.data.data
  },

  async updateVideo(id: string, data: Partial<VideoContent>): Promise<VideoContent> {
    const response = await api.put(`/videos/${id}`, data)
    return response.data.data
  },

  async deleteVideo(id: string): Promise<void> {
    await api.delete(`/videos/${id}`)
  },

  // Student: Browse & Watch
  async browseVideos(params?: {
    language?: string
    cefrLevel?: string
    search?: string
    categoryId?: string
    page?: number
    limit?: number
  }): Promise<{ videos: VideoContent[]; pagination: any }> {
    const response = await api.get('/videos/browse', { params })
    return {
      videos: response.data.data || [],
      pagination: response.data.meta
    }
  },

  async getVideosByLevel(level: string): Promise<VideoContent[]> {
    const response = await api.get(`/videos/browse/by-level/${level}`)
    return response.data.data || []
  },

  async searchVideos(query: string, params?: { page?: number; limit?: number }): Promise<{ videos: VideoContent[]; pagination: any }> {
    const response = await api.get('/videos/search', { params: { q: query, ...params } })
    return {
      videos: response.data.data || [],
      pagination: response.data.meta
    }
  },

  async getContinueWatching(): Promise<VideoContent[]> {
    const response = await api.get('/videos/continue-watching')
    return response.data.data || []
  },

  // Progress tracking
  async updateProgress(videoId: string, data: {
    watchedSeconds: number
    totalSeconds: number
  }): Promise<VideoProgress> {
    const response = await api.post(`/videos/${videoId}/progress`, data)
    return response.data.data
  },

  async getMyProgress(): Promise<{
    totalVideos: number
    completedVideos: number
    totalWatchTime: number
    completionRate: number
  }> {
    const response = await api.get('/videos/my/progress')
    return response.data.data
  }
}

export default videoLibraryApi
