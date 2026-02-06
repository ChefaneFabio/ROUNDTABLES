import { prisma } from '../config/database'
import { Prisma } from '@prisma/client'

interface CreateLibraryInput {
  schoolId: string
  title: string
  description?: string
  coverImage?: string
  isPublished?: boolean
}

interface UpdateLibraryInput {
  title?: string
  description?: string
  coverImage?: string
  isPublished?: boolean
}

interface CreateCategoryInput {
  libraryId: string
  name: string
  description?: string
  orderIndex?: number
}

interface CreateVideoInput {
  libraryId: string
  categoryId?: string
  lessonId?: string
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
  orderIndex?: number
}

interface UpdateVideoInput {
  categoryId?: string
  lessonId?: string
  title?: string
  description?: string
  url?: string
  thumbnailUrl?: string
  duration?: number
  language?: string
  cefrLevel?: string
  tags?: string[]
  transcript?: string
  subtitlesUrl?: string
  isPublished?: boolean
  orderIndex?: number
}

interface UpdateProgressInput {
  videoId: string
  studentId: string
  watchedSeconds: number
  totalSeconds: number
}

export class VideoLibraryService {
  // ==================== Library CRUD ====================

  async createLibrary(data: CreateLibraryInput) {
    return prisma.videoLibrary.create({
      data: {
        schoolId: data.schoolId,
        title: data.title,
        description: data.description,
        coverImage: data.coverImage,
        isPublished: data.isPublished ?? false
      },
      include: {
        categories: true,
        _count: { select: { videos: true } }
      }
    })
  }

  async getLibrary(id: string) {
    const library = await prisma.videoLibrary.findUnique({
      where: { id },
      include: {
        categories: {
          orderBy: { orderIndex: 'asc' },
          include: {
            _count: { select: { videos: true } }
          }
        },
        videos: {
          where: { isPublished: true },
          orderBy: { orderIndex: 'asc' },
          take: 10
        },
        _count: { select: { videos: true } }
      }
    })

    if (!library) {
      throw new Error('Library not found')
    }

    return library
  }

  async getLibraries(schoolId: string, includeUnpublished: boolean = false) {
    const where: Prisma.VideoLibraryWhereInput = { schoolId }
    if (!includeUnpublished) {
      where.isPublished = true
    }

    return prisma.videoLibrary.findMany({
      where,
      include: {
        categories: { orderBy: { orderIndex: 'asc' } },
        _count: { select: { videos: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  async updateLibrary(id: string, data: UpdateLibraryInput) {
    return prisma.videoLibrary.update({
      where: { id },
      data,
      include: {
        categories: true,
        _count: { select: { videos: true } }
      }
    })
  }

  async deleteLibrary(id: string) {
    return prisma.videoLibrary.delete({
      where: { id }
    })
  }

  // ==================== Category CRUD ====================

  async createCategory(data: CreateCategoryInput) {
    // Get next order index if not provided
    if (data.orderIndex === undefined) {
      const maxOrder = await prisma.videoCategory.aggregate({
        where: { libraryId: data.libraryId },
        _max: { orderIndex: true }
      })
      data.orderIndex = (maxOrder._max.orderIndex ?? -1) + 1
    }

    return prisma.videoCategory.create({
      data: {
        libraryId: data.libraryId,
        name: data.name,
        description: data.description,
        orderIndex: data.orderIndex
      },
      include: {
        _count: { select: { videos: true } }
      }
    })
  }

  async updateCategory(id: string, data: Partial<CreateCategoryInput>) {
    return prisma.videoCategory.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        orderIndex: data.orderIndex
      }
    })
  }

  async deleteCategory(id: string) {
    return prisma.videoCategory.delete({
      where: { id }
    })
  }

  async reorderCategories(libraryId: string, categoryIds: string[]) {
    const updates = categoryIds.map((id, index) =>
      prisma.videoCategory.update({
        where: { id },
        data: { orderIndex: index }
      })
    )
    return prisma.$transaction(updates)
  }

  // ==================== Video CRUD ====================

  async createVideo(data: CreateVideoInput) {
    // Get next order index if not provided
    if (data.orderIndex === undefined) {
      const maxOrder = await prisma.videoContent.aggregate({
        where: { libraryId: data.libraryId },
        _max: { orderIndex: true }
      })
      data.orderIndex = (maxOrder._max.orderIndex ?? -1) + 1
    }

    return prisma.videoContent.create({
      data: {
        libraryId: data.libraryId,
        categoryId: data.categoryId,
        lessonId: data.lessonId,
        title: data.title,
        description: data.description,
        url: data.url,
        thumbnailUrl: data.thumbnailUrl,
        duration: data.duration,
        language: data.language,
        cefrLevel: data.cefrLevel,
        tags: data.tags ?? [],
        transcript: data.transcript,
        subtitlesUrl: data.subtitlesUrl,
        isPublished: data.isPublished ?? false,
        orderIndex: data.orderIndex
      },
      include: {
        category: true,
        library: { select: { id: true, title: true } }
      }
    })
  }

  async getVideo(id: string) {
    const video = await prisma.videoContent.findUnique({
      where: { id },
      include: {
        category: true,
        library: { select: { id: true, title: true, schoolId: true } },
        lesson: { select: { id: true, title: true } }
      }
    })

    if (!video) {
      throw new Error('Video not found')
    }

    // Increment view count
    await prisma.videoContent.update({
      where: { id },
      data: { viewCount: { increment: 1 } }
    })

    return video
  }

  async updateVideo(id: string, data: UpdateVideoInput) {
    return prisma.videoContent.update({
      where: { id },
      data,
      include: {
        category: true,
        library: { select: { id: true, title: true } }
      }
    })
  }

  async deleteVideo(id: string) {
    return prisma.videoContent.delete({
      where: { id }
    })
  }

  async getLibraryVideos(
    libraryId: string,
    options: {
      categoryId?: string
      cefrLevel?: string
      search?: string
      includeUnpublished?: boolean
      page?: number
      limit?: number
    } = {}
  ) {
    const { categoryId, cefrLevel, search, includeUnpublished, page = 1, limit = 20 } = options
    const skip = (page - 1) * limit

    const where: Prisma.VideoContentWhereInput = { libraryId }

    if (categoryId) where.categoryId = categoryId
    if (cefrLevel) where.cefrLevel = cefrLevel
    if (!includeUnpublished) where.isPublished = true
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ]
    }

    const [videos, total] = await Promise.all([
      prisma.videoContent.findMany({
        where,
        include: {
          category: true,
          _count: { select: { watchProgress: true } }
        },
        orderBy: { orderIndex: 'asc' },
        skip,
        take: limit
      }),
      prisma.videoContent.count({ where })
    ])

    return {
      videos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  // ==================== Student Browsing ====================

  async browseVideos(
    schoolId: string,
    studentId: string,
    options: {
      language?: string
      cefrLevel?: string
      search?: string
      categoryId?: string
      page?: number
      limit?: number
    } = {}
  ) {
    const { language, cefrLevel, search, categoryId, page = 1, limit = 20 } = options
    const skip = (page - 1) * limit

    const where: Prisma.VideoContentWhereInput = {
      library: {
        schoolId,
        isPublished: true
      },
      isPublished: true
    }

    if (language) where.language = language
    if (cefrLevel) where.cefrLevel = cefrLevel
    if (categoryId) where.categoryId = categoryId
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ]
    }

    const [videos, total] = await Promise.all([
      prisma.videoContent.findMany({
        where,
        include: {
          category: true,
          library: { select: { id: true, title: true } },
          watchProgress: {
            where: { studentId },
            select: { percentage: true, isCompleted: true, watchedSeconds: true }
          }
        },
        orderBy: [{ library: { title: 'asc' } }, { orderIndex: 'asc' }],
        skip,
        take: limit
      }),
      prisma.videoContent.count({ where })
    ])

    // Transform to include progress info
    const videosWithProgress = videos.map(video => ({
      ...video,
      progress: video.watchProgress[0] || null,
      watchProgress: undefined
    }))

    return {
      videos: videosWithProgress,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async getVideosByLevel(schoolId: string, studentId: string, cefrLevel: string) {
    const videos = await prisma.videoContent.findMany({
      where: {
        library: { schoolId, isPublished: true },
        isPublished: true,
        cefrLevel
      },
      include: {
        category: true,
        library: { select: { id: true, title: true } },
        watchProgress: {
          where: { studentId },
          select: { percentage: true, isCompleted: true, watchedSeconds: true }
        }
      },
      orderBy: { orderIndex: 'asc' }
    })

    return videos.map(video => ({
      ...video,
      progress: video.watchProgress[0] || null,
      watchProgress: undefined
    }))
  }

  async getContinueWatching(studentId: string, limit: number = 5) {
    const progress = await prisma.videoProgress.findMany({
      where: {
        studentId,
        isCompleted: false,
        percentage: { gt: 0 }
      },
      include: {
        video: {
          include: {
            category: true,
            library: { select: { id: true, title: true } }
          }
        }
      },
      orderBy: { lastWatchedAt: 'desc' },
      take: limit
    })

    return progress.map(p => ({
      ...p.video,
      progress: {
        percentage: p.percentage,
        watchedSeconds: p.watchedSeconds,
        isCompleted: p.isCompleted
      }
    }))
  }

  // ==================== Progress Tracking ====================

  async updateProgress(data: UpdateProgressInput) {
    const percentage = data.totalSeconds > 0
      ? Math.round((data.watchedSeconds / data.totalSeconds) * 100)
      : 0
    const isCompleted = percentage >= 90 // Consider complete at 90%

    const progress = await prisma.videoProgress.upsert({
      where: {
        videoId_studentId: {
          videoId: data.videoId,
          studentId: data.studentId
        }
      },
      update: {
        watchedSeconds: data.watchedSeconds,
        totalSeconds: data.totalSeconds,
        percentage,
        isCompleted,
        lastWatchedAt: new Date(),
        completedAt: isCompleted ? new Date() : undefined
      },
      create: {
        videoId: data.videoId,
        studentId: data.studentId,
        watchedSeconds: data.watchedSeconds,
        totalSeconds: data.totalSeconds,
        percentage,
        isCompleted,
        completedAt: isCompleted ? new Date() : undefined
      }
    })

    return progress
  }

  async getProgress(videoId: string, studentId: string) {
    return prisma.videoProgress.findUnique({
      where: {
        videoId_studentId: { videoId, studentId }
      }
    })
  }

  async getStudentProgress(studentId: string) {
    const [totalVideos, completedVideos, totalWatchTime] = await Promise.all([
      prisma.videoProgress.count({ where: { studentId } }),
      prisma.videoProgress.count({ where: { studentId, isCompleted: true } }),
      prisma.videoProgress.aggregate({
        where: { studentId },
        _sum: { watchedSeconds: true }
      })
    ])

    return {
      totalVideos,
      completedVideos,
      totalWatchTime: totalWatchTime._sum.watchedSeconds || 0,
      completionRate: totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0
    }
  }

  // ==================== Analytics ====================

  async getLibraryStats(libraryId: string) {
    const [videoCount, totalViews, avgCompletion] = await Promise.all([
      prisma.videoContent.count({ where: { libraryId } }),
      prisma.videoContent.aggregate({
        where: { libraryId },
        _sum: { viewCount: true }
      }),
      prisma.videoProgress.aggregate({
        where: { video: { libraryId } },
        _avg: { percentage: true }
      })
    ])

    return {
      videoCount,
      totalViews: totalViews._sum.viewCount || 0,
      avgCompletion: Math.round(avgCompletion._avg.percentage || 0)
    }
  }
}

export const videoLibraryService = new VideoLibraryService()
