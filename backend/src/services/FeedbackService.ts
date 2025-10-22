import { PrismaClient, FeedbackStatus } from '@prisma/client'

const prisma = new PrismaClient()

export interface FeedbackData {
  content: string
  sessionId: string
  participantId: string
  trainerId: string
}

export interface FeedbackUpdateData {
  content?: string
  status?: FeedbackStatus
  reviewNotes?: string
  sentAt?: Date
}

export interface FeedbackFilters {
  status?: FeedbackStatus
  sessionId?: string
  participantId?: string
  trainerId?: string
  startDate?: Date
  endDate?: Date
}

export interface FeedbackStats {
  total: number
  pending: number
  approved: number
  sent: number
  rejected: number
  byTrainer: { trainerId: string; trainerName: string; count: number }[]
  bySession: { sessionId: string; sessionTitle: string; count: number }[]
  averageResponseTime: number
}

export class FeedbackService {
  
  // Get all feedback with optional filtering
  static async getAllFeedback(filters?: FeedbackFilters, page = 1, limit = 20) {
    const where: any = {}
    
    if (filters?.status) {
      where.status = filters.status
    }
    
    if (filters?.sessionId) {
      where.sessionId = filters.sessionId
    }
    
    if (filters?.participantId) {
      where.participantId = filters.participantId
    }
    
    if (filters?.trainerId) {
      where.trainerId = filters.trainerId
    }

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {}
      if (filters.startDate) where.createdAt.gte = filters.startDate
      if (filters.endDate) where.createdAt.lte = filters.endDate
    }

    const offset = (page - 1) * limit

    const [feedback, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        include: {
          session: {
            include: {
              roundtable: {
                select: {
                  name: true,
                  client: {
                    select: {
                      name: true
                    }
                  }
                }
              },
              topic: {
                select: {
                  title: true
                }
              }
            }
          },
          participant: {
            select: {
              name: true,
              email: true
            }
          },
          trainer: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: offset,
        take: limit
      }),
      prisma.feedback.count({ where })
    ])

    return {
      feedback,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  // Get feedback by ID
  static async getFeedbackById(id: string) {
    return await prisma.feedback.findUnique({
      where: { id },
      include: {
        session: {
          include: {
            roundtable: {
              include: {
                client: true
              }
            },
            topic: true
          }
        },
        participant: true,
        trainer: true
      }
    })
  }

  // Create new feedback
  static async createFeedback(data: FeedbackData) {
    // Verify the session, participant, and trainer exist
    const [session, participant, trainer] = await Promise.all([
      prisma.session.findUnique({ where: { id: data.sessionId } }),
      prisma.participant.findUnique({ where: { id: data.participantId } }),
      prisma.trainer.findUnique({ where: { id: data.trainerId } })
    ])

    if (!session) throw new Error('Session not found')
    if (!participant) throw new Error('Participant not found')
    if (!trainer) throw new Error('Trainer not found')

    // Check existing feedback count for this session-participant combination
    const existingFeedbackCount = await prisma.feedback.count({
      where: {
        sessionId: data.sessionId,
        participantId: data.participantId
      }
    })

    // Get roundtable limits
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: session.roundtableId },
      select: { maxFeedbackItemsPerParticipant: true }
    })

    if (existingFeedbackCount >= (roundtable?.maxFeedbackItemsPerParticipant || 5)) {
      throw new Error(`Maximum ${roundtable?.maxFeedbackItemsPerParticipant || 5} feedback items allowed per participant`)
    }

    return await prisma.feedback.create({
      data: {
        content: data.content,
        sessionId: data.sessionId,
        participantId: data.participantId,
        trainerId: data.trainerId
      },
      include: {
        session: {
          include: {
            roundtable: {
              select: {
                name: true
              }
            }
          }
        },
        participant: {
          select: {
            name: true
          }
        },
        trainer: {
          select: {
            name: true
          }
        }
      }
    })
  }

  // Update feedback
  static async updateFeedback(id: string, data: FeedbackUpdateData) {
    return await prisma.feedback.update({
      where: { id },
      data,
      include: {
        session: {
          include: {
            roundtable: {
              select: {
                name: true
              }
            }
          }
        },
        participant: {
          select: {
            name: true
          }
        },
        trainer: {
          select: {
            name: true
          }
        }
      }
    })
  }

  // Delete feedback
  static async deleteFeedback(id: string) {
    return await prisma.feedback.delete({
      where: { id }
    })
  }

  // Approve feedback and mark as ready to send
  static async approveFeedback(id: string, reviewNotes?: string) {
    return await prisma.feedback.update({
      where: { id },
      data: {
        status: 'APPROVED',
        reviewNotes,
        updatedAt: new Date()
      }
    })
  }

  // Mark feedback as sent
  static async markFeedbackAsSent(id: string) {
    return await prisma.feedback.update({
      where: { id },
      data: {
        status: 'SENT',
        sentAt: new Date()
      }
    })
  }

  // Bulk approve feedback
  static async bulkApproveFeedback(ids: string[], reviewNotes?: string) {
    return await prisma.feedback.updateMany({
      where: {
        id: {
          in: ids
        }
      },
      data: {
        status: 'APPROVED',
        reviewNotes,
        updatedAt: new Date()
      }
    })
  }

  // Get feedback statistics
  static async getFeedbackStats(trainerId?: string, startDate?: Date, endDate?: Date): Promise<FeedbackStats> {
    const where: any = {}
    
    if (trainerId) {
      where.trainerId = trainerId
    }

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = startDate
      if (endDate) where.createdAt.lte = endDate
    }

    const [
      total,
      pending,
      approved,
      sent,
      rejected,
      byTrainer,
      bySessions
    ] = await Promise.all([
      prisma.feedback.count({ where }),
      prisma.feedback.count({ where: { ...where, status: 'PENDING' } }),
      prisma.feedback.count({ where: { ...where, status: 'APPROVED' } }),
      prisma.feedback.count({ where: { ...where, status: 'SENT' } }),
      prisma.feedback.count({ where: { ...where, status: 'REJECTED' } }),
      
      // Feedback by trainer
      prisma.feedback.groupBy({
        by: ['trainerId'],
        where,
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        }
      }),
      
      // Feedback by session
      prisma.feedback.groupBy({
        by: ['sessionId'],
        where,
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        }
      })
    ])

    // Get trainer names for the groupBy results
    const trainerIds = byTrainer.map(item => item.trainerId)
    const trainers = await prisma.trainer.findMany({
      where: { id: { in: trainerIds } },
      select: { id: true, name: true }
    })

    // Get session titles for the groupBy results
    const sessionIds = bySessions.map(item => item.sessionId)
    const sessions = await prisma.session.findMany({
      where: { id: { in: sessionIds } },
      select: {
        id: true,
        topic: {
          select: {
            title: true
          }
        },
        roundtable: {
          select: {
            name: true
          }
        }
      }
    })

    const byTrainerWithNames = byTrainer.map(item => {
      const trainer = trainers.find(t => t.id === item.trainerId)
      return {
        trainerId: item.trainerId,
        trainerName: trainer?.name || 'Unknown',
        count: item._count.id
      }
    })

    const bySessionWithTitles = bySessions.map(item => {
      const session = sessions.find(s => s.id === item.sessionId)
      return {
        sessionId: item.sessionId,
        sessionTitle: session?.topic?.title || session?.roundtable?.name || 'Unknown',
        count: item._count.id
      }
    })

    // Calculate average response time (mock calculation)
    const averageResponseTime = 2.5 // days - would need actual calculation

    return {
      total,
      pending,
      approved,
      sent,
      rejected,
      byTrainer: byTrainerWithNames,
      bySession: bySessionWithTitles,
      averageResponseTime
    }
  }

  // Get feedback for a specific session
  static async getFeedbackBySession(sessionId: string) {
    return await prisma.feedback.findMany({
      where: { sessionId },
      include: {
        participant: {
          select: {
            name: true,
            email: true
          }
        },
        trainer: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get feedback for a specific participant
  static async getFeedbackByParticipant(participantId: string) {
    return await prisma.feedback.findMany({
      where: { participantId },
      include: {
        session: {
          include: {
            roundtable: {
              select: {
                name: true
              }
            },
            topic: {
              select: {
                title: true
              }
            }
          }
        },
        trainer: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get feedback for a specific trainer
  static async getFeedbackByTrainer(trainerId: string) {
    return await prisma.feedback.findMany({
      where: { trainerId },
      include: {
        session: {
          include: {
            roundtable: {
              select: {
                name: true
              }
            },
            topic: {
              select: {
                title: true
              }
            }
          }
        },
        participant: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Search feedback by content
  static async searchFeedback(query: string, filters?: FeedbackFilters) {
    const where: any = {
      content: {
        contains: query,
        mode: 'insensitive'
      }
    }

    // Apply additional filters
    if (filters?.status) where.status = filters.status
    if (filters?.trainerId) where.trainerId = filters.trainerId
    if (filters?.sessionId) where.sessionId = filters.sessionId

    return await prisma.feedback.findMany({
      where,
      include: {
        session: {
          include: {
            roundtable: {
              select: {
                name: true
              }
            },
            topic: {
              select: {
                title: true
              }
            }
          }
        },
        participant: {
          select: {
            name: true
          }
        },
        trainer: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}