import { PrismaClient, RoundtableStatus, SessionStatus } from '@prisma/client'
import { addWeeks, addDays, setHours, setMinutes } from 'date-fns'

const prisma = new PrismaClient()

export class RoundtableService {
  
  async createRoundtable(data: {
    name: string
    description?: string
    clientId: string
    startDate?: Date
    maxParticipants: number
    topics: { title: string; description: string }[]
  }) {
    return prisma.$transaction(async (tx) => {
      // Create roundtable
      const roundtable = await tx.roundtable.create({
        data: {
          name: data.name,
          description: data.description,
          clientId: data.clientId,
          startDate: data.startDate,
          maxParticipants: data.maxParticipants,
          status: 'SETUP'
        }
      })

      // Create 10 topics
      const topics = await tx.topic.createMany({
        data: data.topics.map(topic => ({
          title: topic.title,
          description: topic.description,
          roundtableId: roundtable.id
        }))
      })

      // Create placeholder sessions (will be scheduled later)
      const sessions = await tx.session.createMany({
        data: Array.from({ length: 10 }, (_, i) => ({
          sessionNumber: i + 1,
          scheduledAt: new Date(), // Temporary date
          status: 'SCHEDULED' as SessionStatus,
          roundtableId: roundtable.id
        }))
      })

      return roundtable
    })
  }

  async updateStatus(roundtableId: string, status: RoundtableStatus) {
    return prisma.roundtable.update({
      where: { id: roundtableId },
      data: { status, updatedAt: new Date() }
    })
  }

  async startTopicVoting(roundtableId: string) {
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: { participants: true }
    })

    if (!roundtable) {
      throw new Error('Roundtable not found')
    }

    if (roundtable.participants.length === 0) {
      throw new Error('Cannot start voting without participants')
    }

    // Update status to TOPIC_VOTING
    await this.updateStatus(roundtableId, 'TOPIC_VOTING')

    // Here you would typically send voting invitations via email
    // For now, we'll return the voting URL structure
    return {
      votingUrl: `/vote/${roundtableId}`,
      participantsCount: roundtable.participants.length,
      message: 'Topic voting started successfully'
    }
  }

  async finalizeTopicVoting(roundtableId: string) {
    return prisma.$transaction(async (tx) => {
      // Get all topics with vote counts
      const topics = await tx.topic.findMany({
        where: { roundtableId },
        include: {
          votes: true
        }
      })

      // Sort by vote count and select top 8
      const sortedTopics = topics.sort((a, b) => b.votes.length - a.votes.length)
      const selectedTopics = sortedTopics.slice(0, 8)
      const rejectedTopics = sortedTopics.slice(8)

      // Mark selected topics
      await tx.topic.updateMany({
        where: { id: { in: selectedTopics.map(t => t.id) } },
        data: { isSelected: true }
      })

      // Update roundtable status
      await tx.roundtable.update({
        where: { id: roundtableId },
        data: { status: 'SCHEDULED' }
      })

      return {
        selectedTopics: selectedTopics.map(t => ({ id: t.id, title: t.title, votes: t.votes.length })),
        rejectedTopics: rejectedTopics.map(t => ({ id: t.id, title: t.title, votes: t.votes.length }))
      }
    })
  }

  async scheduleAllSessions(roundtableId: string, options: {
    startDate: Date
    sessionDuration?: number
    sessionFrequency?: 'weekly' | 'bi-weekly'
  }) {
    return prisma.$transaction(async (tx) => {
      const roundtable = await tx.roundtable.findUnique({
        where: { id: roundtableId },
        include: { 
          topics: { where: { isSelected: true } },
          sessions: { orderBy: { sessionNumber: 'asc' } }
        }
      })

      if (!roundtable) {
        throw new Error('Roundtable not found')
      }

      const selectedTopics = roundtable.topics

      // Session 1: Introduction (no topic assigned)
      const session1Date = setMinutes(setHours(options.startDate, 14), 0) // Default 2 PM
      await tx.session.update({
        where: { 
          roundtableId_sessionNumber: { 
            roundtableId, 
            sessionNumber: 1 
          }
        },
        data: {
          scheduledAt: session1Date,
          status: 'SCHEDULED'
        }
      })

      // Sessions 2-9: Topic discussions
      for (let i = 2; i <= 9; i++) {
        const sessionDate = options.sessionFrequency === 'bi-weekly' 
          ? addWeeks(session1Date, (i - 1) * 2)
          : addWeeks(session1Date, i - 1)

        const topicIndex = (i - 2) % selectedTopics.length
        const topicId = selectedTopics[topicIndex]?.id

        await tx.session.update({
          where: { 
            roundtableId_sessionNumber: { 
              roundtableId, 
              sessionNumber: i 
            }
          },
          data: {
            scheduledAt: sessionDate,
            topicId,
            status: 'SCHEDULED'
          }
        })
      }

      // Session 10: Conclusion (no topic assigned)
      const session10Date = options.sessionFrequency === 'bi-weekly' 
        ? addWeeks(session1Date, 18)
        : addWeeks(session1Date, 9)

      await tx.session.update({
        where: { 
          roundtableId_sessionNumber: { 
            roundtableId, 
            sessionNumber: 10 
          }
        },
        data: {
          scheduledAt: session10Date,
          status: 'SCHEDULED'
        }
      })

      // Update roundtable dates
      await tx.roundtable.update({
        where: { id: roundtableId },
        data: {
          startDate: session1Date,
          endDate: session10Date
        }
      })

      return { message: 'All sessions scheduled successfully' }
    })
  }

  calculateProgress(sessions: any[]): number {
    if (!sessions || sessions.length === 0) return 0

    const completedSessions = sessions.filter(s => 
      s.status === 'COMPLETED' || s.status === 'FEEDBACK_SENT'
    ).length

    return Math.round((completedSessions / 10) * 100)
  }

  async getUpcomingSessions(roundtableId?: string) {
    const where: any = {
      scheduledAt: { gte: new Date() },
      status: { in: ['SCHEDULED', 'REMINDER_SENT', 'QUESTIONS_READY'] }
    }

    if (roundtableId) {
      where.roundtableId = roundtableId
    }

    return prisma.session.findMany({
      where,
      include: {
        roundtable: {
          select: { name: true, client: { select: { name: true } } }
        },
        topic: { select: { title: true } },
        trainer: { select: { name: true, email: true } }
      },
      orderBy: { scheduledAt: 'asc' },
      take: 10
    })
  }

  async getDashboardStats() {
    const [
      totalRoundtables,
      activeRoundtables,
      totalParticipants,
      upcomingSessions,
      pendingFeedback
    ] = await Promise.all([
      prisma.roundtable.count(),
      prisma.roundtable.count({ 
        where: { status: { in: ['TOPIC_VOTING', 'SCHEDULED', 'IN_PROGRESS'] } }
      }),
      prisma.participant.count({ where: { status: 'ACTIVE' } }),
      prisma.session.count({ 
        where: { 
          scheduledAt: { gte: new Date() },
          status: { in: ['SCHEDULED', 'REMINDER_SENT', 'QUESTIONS_READY'] }
        }
      }),
      prisma.feedback.count({ where: { status: 'PENDING' } })
    ])

    return {
      totalRoundtables,
      activeRoundtables,
      totalParticipants,
      upcomingSessions,
      pendingFeedback
    }
  }
}