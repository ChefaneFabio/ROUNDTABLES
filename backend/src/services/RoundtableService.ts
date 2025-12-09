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
    numberOfSessions?: number
    topics: { title: string; description: string }[]
    sessions?: Array<{
      sessionNumber: number
      scheduledAt: Date
      topicId?: string
      customTopicTitle?: string
      trainerId?: string
      notes?: string
      meetingLink?: string
    }>
  }) {
    return prisma.$transaction(async (tx) => {
      // Calculate start/end dates from sessions if provided
      let startDate = data.startDate
      let endDate: Date | undefined

      if (data.sessions && data.sessions.length > 0) {
        const sortedDates = data.sessions
          .map(s => s.scheduledAt)
          .sort((a, b) => a.getTime() - b.getTime())
        startDate = sortedDates[0]
        endDate = sortedDates[sortedDates.length - 1]
      }

      // Create roundtable
      const roundtable = await tx.roundtable.create({
        data: {
          name: data.name,
          description: data.description,
          clientId: data.clientId,
          startDate,
          endDate,
          maxParticipants: data.maxParticipants,
          numberOfSessions: data.numberOfSessions || data.sessions?.length || 10,
          status: 'SETUP'
        }
      })

      // Create topics and get IDs
      const createdTopics = await Promise.all(
        data.topics.map(topic =>
          tx.topic.create({
            data: {
              title: topic.title,
              description: topic.description,
              roundtableId: roundtable.id
            }
          })
        )
      )

      // Build topic map by title for easy lookup
      const topicMap = new Map(createdTopics.map(t => [t.title.toLowerCase(), t.id]))

      // Collect custom topics from sessions and create them
      if (data.sessions && data.sessions.length > 0) {
        // Find all unique custom topics
        const customTopicTitles = new Set<string>()
        data.sessions.forEach(session => {
          if (session.customTopicTitle && session.customTopicTitle.trim()) {
            customTopicTitles.add(session.customTopicTitle.trim())
          }
        })

        // Create custom topics that don't already exist
        for (const title of customTopicTitles) {
          if (!topicMap.has(title.toLowerCase())) {
            const customTopic = await tx.topic.create({
              data: {
                title: title,
                description: `Custom topic for session`, // Default description
                roundtableId: roundtable.id,
                isSelected: false // Custom topics are not part of voting
              }
            })
            topicMap.set(title.toLowerCase(), customTopic.id)
          }
        }
      }

      // Create sessions
      if (data.sessions && data.sessions.length > 0) {
        // Create sessions with full details (new flow)
        // Map topicId references: if it's a topic title, convert to ID
        await tx.session.createMany({
          data: data.sessions.map(session => {
            let finalTopicId = session.topicId

            // Priority 1: Use customTopicTitle if provided
            if (session.customTopicTitle && session.customTopicTitle.trim()) {
              finalTopicId = topicMap.get(session.customTopicTitle.trim().toLowerCase())
            }
            // Priority 2: If topicId is provided and looks like a title (not a cuid), try to map it
            else if (session.topicId && !session.topicId.startsWith('c')) {
              finalTopicId = topicMap.get(session.topicId.toLowerCase()) || session.topicId
            }

            return {
              sessionNumber: session.sessionNumber,
              scheduledAt: session.scheduledAt,
              topicId: finalTopicId,
              trainerId: session.trainerId,
              notes: session.notes,
              meetingLink: session.meetingLink,
              status: 'SCHEDULED' as SessionStatus,
              roundtableId: roundtable.id
            }
          })
        })
      } else {
        // Create placeholder sessions (old flow - backward compatibility)
        const numSessions = data.numberOfSessions || 10
        await tx.session.createMany({
          data: Array.from({ length: numSessions }, (_, i) => ({
            sessionNumber: i + 1,
            scheduledAt: new Date(), // Temporary date
            status: 'SCHEDULED' as SessionStatus,
            roundtableId: roundtable.id
          }))
        })
      }

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
    daysBetweenSessions?: number
    numberOfSessions?: number
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

      // Determine number of sessions to schedule
      const targetSessionCount = options.numberOfSessions || roundtable.numberOfSessions || 10

      // Determine days between sessions
      const daysBetween = options.daysBetweenSessions ||
        (options.sessionFrequency === 'bi-weekly' ? 14 : 7)

      // Update roundtable numberOfSessions if changed
      if (options.numberOfSessions && options.numberOfSessions !== roundtable.numberOfSessions) {
        await tx.roundtable.update({
          where: { id: roundtableId },
          data: { numberOfSessions: options.numberOfSessions }
        })
      }

      const existingSessionCount = roundtable.sessions.length

      // Handle session count changes
      if (targetSessionCount < existingSessionCount) {
        // Delete excess sessions
        await tx.session.deleteMany({
          where: {
            roundtableId,
            sessionNumber: { gt: targetSessionCount }
          }
        })
      } else if (targetSessionCount > existingSessionCount) {
        // Create new sessions
        const newSessions = []
        for (let i = existingSessionCount + 1; i <= targetSessionCount; i++) {
          newSessions.push({
            sessionNumber: i,
            scheduledAt: new Date(), // Will be updated below
            status: 'SCHEDULED' as const,
            roundtableId
          })
        }
        await tx.session.createMany({ data: newSessions })
      }

      // Schedule all sessions with custom frequency
      const session1Date = setMinutes(setHours(options.startDate, 14), 0) // Default 2 PM
      let lastSessionDate = session1Date

      for (let i = 1; i <= targetSessionCount; i++) {
        const sessionDate = i === 1
          ? session1Date
          : addDays(session1Date, (i - 1) * daysBetween)

        lastSessionDate = sessionDate

        // Assign topics to middle sessions (not first and last)
        let topicId: string | undefined = undefined
        if (i > 1 && i < targetSessionCount && selectedTopics.length > 0) {
          const topicIndex = (i - 2) % selectedTopics.length
          topicId = selectedTopics[topicIndex]?.id
        }

        await tx.session.update({
          where: {
            roundtableId_sessionNumber: {
              roundtableId,
              sessionNumber: i
            }
          },
          data: {
            scheduledAt: sessionDate,
            topicId: topicId || null,
            status: 'SCHEDULED'
          }
        })
      }

      // Update roundtable dates
      await tx.roundtable.update({
        where: { id: roundtableId },
        data: {
          startDate: session1Date,
          endDate: lastSessionDate
        }
      })

      return {
        message: 'All sessions scheduled successfully',
        sessionsScheduled: targetSessionCount,
        daysBetween
      }
    })
  }

  calculateProgress(sessions: any[]): number {
    if (!sessions || sessions.length === 0) return 0

    const completedSessions = sessions.filter(s =>
      s.status === 'COMPLETED' || s.status === 'FEEDBACK_SENT'
    ).length

    return Math.round((completedSessions / sessions.length) * 100)
  }

  async getUpcomingSessions(roundtableId?: string) {
    const where: any = {
      scheduledAt: { gte: new Date() },
      status: { in: ['SCHEDULED', 'IN_PROGRESS'] }
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
          status: { in: ['SCHEDULED', 'IN_PROGRESS'] }
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

  /**
   * Check the impact of changing numberOfSessions
   * Returns warnings and blockers
   */
  async checkNumberOfSessionsImpact(roundtableId: string, newNumberOfSessions: number) {
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: {
        sessions: {
          include: {
            trainer: { select: { id: true, name: true, email: true } },
            topic: { select: { title: true } },
            questions: { select: { id: true, status: true } },
            feedback: { select: { id: true, status: true } }
          },
          orderBy: { sessionNumber: 'asc' }
        }
      }
    })

    if (!roundtable) {
      throw new Error('Roundtable not found')
    }

    const warnings: string[] = []
    const blockers: string[] = []
    const sessionsToDelete: any[] = []

    // If decreasing numberOfSessions
    if (newNumberOfSessions < roundtable.numberOfSessions) {
      const sessionsToRemove = roundtable.sessions.filter(
        s => s.sessionNumber > newNumberOfSessions
      )

      // Check each session that would be deleted
      for (const session of sessionsToRemove) {
        const sessionInfo: any = {
          id: session.id,
          sessionNumber: session.sessionNumber,
          status: session.status,
          trainer: session.trainer?.name || null,
          topic: session.topic?.title || null,
          hasQuestions: session.questions.length > 0,
          hasFeedback: session.feedback.length > 0
        }

        sessionsToDelete.push(sessionInfo)

        // BLOCKERS: Cannot delete these sessions
        if (session.status === 'COMPLETED') {
          blockers.push(`Cannot delete Session ${session.sessionNumber}: Session is COMPLETED`)
        } else if (session.status === 'IN_PROGRESS') {
          blockers.push(`Cannot delete Session ${session.sessionNumber}: Session is IN_PROGRESS`)
        } else if (session.status === 'FEEDBACK_SENT') {
          blockers.push(`Cannot delete Session ${session.sessionNumber}: Feedback already sent`)
        }

        // WARNINGS: Can delete but should warn user
        if (session.trainer) {
          warnings.push(`Session ${session.sessionNumber}: Trainer "${session.trainer.name}" will be unassigned`)
        }

        if (session.questions.length > 0) {
          const approvedCount = session.questions.filter(q => q.status === 'APPROVED').length
          if (approvedCount > 0) {
            warnings.push(`Session ${session.sessionNumber}: ${approvedCount} approved question(s) will be deleted`)
          }
        }

        if (session.feedback.length > 0) {
          const approvedCount = session.feedback.filter(f => f.status === 'APPROVED').length
          if (approvedCount > 0) {
            warnings.push(`Session ${session.sessionNumber}: ${approvedCount} approved feedback item(s) will be deleted`)
          }
        }
      }

      // Check if we're trying to decrease below highest completed session
      const highestCompletedSession = roundtable.sessions
        .filter(s => s.status === 'COMPLETED' || s.status === 'FEEDBACK_SENT')
        .sort((a, b) => b.sessionNumber - a.sessionNumber)[0]

      if (highestCompletedSession && newNumberOfSessions < highestCompletedSession.sessionNumber) {
        blockers.push(
          `Cannot decrease to ${newNumberOfSessions} sessions: Session ${highestCompletedSession.sessionNumber} is already completed`
        )
      }
    }

    return {
      canProceed: blockers.length === 0,
      warnings,
      blockers,
      sessionsToDelete,
      oldValue: roundtable.numberOfSessions,
      newValue: newNumberOfSessions,
      sessionsToCreate: Math.max(0, newNumberOfSessions - roundtable.sessions.length)
    }
  }

  /**
   * Adjust session count by creating or deleting sessions
   */
  async adjustSessionCount(
    roundtableId: string,
    newNumberOfSessions: number,
    oldNumberOfSessions: number
  ) {
    return prisma.$transaction(async (tx) => {
      const roundtable = await tx.roundtable.findUnique({
        where: { id: roundtableId },
        include: {
          sessions: { orderBy: { sessionNumber: 'asc' } }
        }
      })

      if (!roundtable) {
        throw new Error('Roundtable not found')
      }

      const existingSessionCount = roundtable.sessions.length

      // If decreasing, delete excess sessions
      if (newNumberOfSessions < existingSessionCount) {
        const deletedSessions = await tx.session.deleteMany({
          where: {
            roundtableId,
            sessionNumber: { gt: newNumberOfSessions }
          }
        })

        console.log(`Deleted ${deletedSessions.count} sessions for roundtable ${roundtableId}`)

        // TODO: Send notifications to affected trainers
        // This will be implemented in the notification service update
      }

      // If increasing, create new sessions
      if (newNumberOfSessions > existingSessionCount) {
        const newSessions = []
        for (let i = existingSessionCount + 1; i <= newNumberOfSessions; i++) {
          // Create placeholder date (will need to be scheduled later)
          const placeholderDate = addWeeks(new Date(), i)

          newSessions.push({
            sessionNumber: i,
            scheduledAt: placeholderDate,
            status: 'SCHEDULED' as SessionStatus,
            roundtableId
          })
        }

        await tx.session.createMany({ data: newSessions })
        console.log(`Created ${newSessions.length} new sessions for roundtable ${roundtableId}`)
      }

      return {
        oldCount: existingSessionCount,
        newCount: newNumberOfSessions,
        created: Math.max(0, newNumberOfSessions - existingSessionCount),
        deleted: Math.max(0, existingSessionCount - newNumberOfSessions)
      }
    })
  }
}