import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface TrainerData {
  name: string
  email: string
  expertise: string[]
  isActive?: boolean
}

export interface TrainerUpdateData {
  name?: string
  email?: string
  expertise?: string[]
  isActive?: boolean
}

export interface TrainerFilters {
  isActive?: boolean
  expertise?: string
}

export class TrainerService {
  
  // Get all trainers with optional filtering
  static async getAllTrainers(filters?: TrainerFilters) {
    const where: any = {}
    
    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive
    }
    
    if (filters?.expertise) {
      where.expertise = {
        has: filters.expertise
      }
    }

    return await prisma.trainer.findMany({
      where,
      include: {
        sessions: {
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
            }
          }
        },
        feedback: {
          include: {
            participant: {
              select: {
                name: true
              }
            },
            session: {
              select: {
                sessionNumber: true,
                roundtable: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  // Get trainer by ID
  static async getTrainerById(id: string) {
    return await prisma.trainer.findUnique({
      where: { id },
      include: {
        sessions: {
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
          },
          orderBy: {
            scheduledAt: 'desc'
          }
        },
        feedback: {
          include: {
            participant: {
              select: {
                name: true
              }
            },
            session: {
              select: {
                sessionNumber: true,
                roundtable: {
                  select: {
                    name: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })
  }

  // Create new trainer
  static async createTrainer(data: TrainerData) {
    return await prisma.trainer.create({
      data: {
        name: data.name,
        email: data.email,
        expertise: data.expertise,
        isActive: data.isActive ?? true
      }
    })
  }

  // Update trainer
  static async updateTrainer(id: string, data: TrainerUpdateData) {
    return await prisma.trainer.update({
      where: { id },
      data
    })
  }

  // Delete trainer
  static async deleteTrainer(id: string) {
    // Check if trainer has active sessions
    const activeSessions = await prisma.session.count({
      where: {
        trainerId: id,
        status: {
          in: ['SCHEDULED', 'IN_PROGRESS']
        }
      }
    })

    if (activeSessions > 0) {
      throw new Error('Cannot delete trainer with active sessions')
    }

    return await prisma.trainer.delete({
      where: { id }
    })
  }

  // Get trainer statistics
  static async getTrainerStats(id?: string) {
    const where = id ? { trainerId: id } : {}

    const totalSessions = await prisma.session.count({ where })
    const completedSessions = await prisma.session.count({
      where: {
        ...where,
        status: 'COMPLETED'
      }
    })

    const feedbackStats = await prisma.feedback.aggregate({
      where: {
        trainerId: id
      },
      _count: {
        id: true
      }
    })

    return {
      totalSessions,
      completedSessions,
      feedbackCount: feedbackStats._count.id,
      // averageRating: feedbackStats._avg.rating || 0
      averageRating: 4.5 // Mock value for now
    }
  }

  // Get available trainers for a specific date/time
  static async getAvailableTrainers(dateTime: Date) {
    // This would ideally check against a trainer availability/calendar system
    // For now, return all active trainers
    return await prisma.trainer.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        expertise: true
      }
    })
  }

  // Assign trainer to session
  static async assignTrainerToSession(trainerId: string, sessionId: string) {
    // Verify trainer exists and is active
    const trainer = await prisma.trainer.findUnique({
      where: { id: trainerId }
    })

    if (!trainer || !trainer.isActive) {
      throw new Error('Trainer not found or inactive')
    }

    // Verify session exists
    const session = await prisma.session.findUnique({
      where: { id: sessionId }
    })

    if (!session) {
      throw new Error('Session not found')
    }

    // Update session with trainer
    return await prisma.session.update({
      where: { id: sessionId },
      data: {
        trainerId
      },
      include: {
        trainer: true,
        roundtable: {
          include: {
            client: true
          }
        }
      }
    })
  }

  // Get trainer workload
  static async getTrainerWorkload(trainerId: string, startDate?: Date, endDate?: Date) {
    const where: any = {
      trainerId,
      status: {
        not: 'CANCELLED'
      }
    }

    if (startDate || endDate) {
      where.scheduledAt = {}
      if (startDate) where.scheduledAt.gte = startDate
      if (endDate) where.scheduledAt.lte = endDate
    }

    const sessions = await prisma.session.findMany({
      where,
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
      },
      orderBy: {
        scheduledAt: 'asc'
      }
    })

    return {
      totalSessions: sessions.length,
      sessions
    }
  }

  // Search trainers by expertise or name
  static async searchTrainers(query: string) {
    return await prisma.trainer.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            expertise: {
              has: query
            }
          }
        ],
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        expertise: true
      }
    })
  }
}