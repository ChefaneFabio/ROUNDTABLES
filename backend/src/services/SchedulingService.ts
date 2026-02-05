import { PrismaClient, SessionStatus } from '@prisma/client'
import { addWeeks, addDays, setHours, setMinutes, format, isWeekend, addHours } from 'date-fns'
import { NotificationService } from './NotificationService'

const prisma = new PrismaClient()

export interface SchedulingOptions {
  startDate: Date
  sessionDuration: number // minutes
  sessionFrequency: 'weekly' | 'bi-weekly'
  preferredTime: { hour: number; minute: number } // 24h format
  skipWeekends: boolean
  trainer?: {
    id: string
    availableDays: number[] // 0-6, Sunday = 0
    availableHours: { start: number; end: number }
  }
}

export class SchedulingService {
  private notificationService = new NotificationService()

  async scheduleRoundtableComplete(
    roundtableId: string, 
    options: SchedulingOptions
  ) {
    return prisma.$transaction(async (tx) => {
      // Get roundtable with selected topics and current sessions
      const roundtable = await tx.roundtable.findUnique({
        where: { id: roundtableId },
        include: {
          topics: { where: { isSelected: true }, orderBy: { title: 'asc' } },
          sessions: { orderBy: { sessionNumber: 'asc' } },
          participants: { where: { status: 'ACTIVE' } }
        }
      })

      if (!roundtable) {
        throw new Error('Roundtable not found')
      }

      if (roundtable.topics.length === 0) {
        throw new Error('No topics selected. Complete topic voting first.')
      }

      const selectedTopics = roundtable.topics
      const sessions = []

      // Session 1: Introduction by Jean
      const session1Date = this.adjustForWeekends(
        setMinutes(setHours(options.startDate, options.preferredTime.hour), options.preferredTime.minute),
        options.skipWeekends
      )

      sessions.push({
        sessionNumber: 1,
        scheduledAt: session1Date,
        topicId: null, // Introduction session
        description: 'Roundtable Introduction & Topic Selection',
        notes: 'Presentation by Jean - Roundtable overview and final topic selection'
      })

      // Sessions 2-9: Topic discussions
      for (let i = 2; i <= 9; i++) {
        const weeksToAdd = options.sessionFrequency === 'bi-weekly' ? (i - 1) * 2 : (i - 1)
        const sessionDate = this.adjustForWeekends(
          addWeeks(session1Date, weeksToAdd),
          options.skipWeekends
        )

        // Assign topics cyclically if we have fewer than 8 topics
        const topicIndex = (i - 2) % selectedTopics.length
        const topic = selectedTopics[topicIndex]

        sessions.push({
          sessionNumber: i,
          scheduledAt: sessionDate,
          topicId: topic.id,
          description: `Discussion: ${topic.title}`,
          notes: `Topic discussion session facilitated by assigned trainer`
        })
      }

      // Session 10: Conclusion by Jean
      const weeksToAdd = options.sessionFrequency === 'bi-weekly' ? 18 : 9
      const session10Date = this.adjustForWeekends(
        addWeeks(session1Date, weeksToAdd),
        options.skipWeekends
      )

      sessions.push({
        sessionNumber: 10,
        scheduledAt: session10Date,
        topicId: null, // Conclusion session
        description: 'Roundtable Conclusion & Wrap-up',
        notes: 'Final session by Jean - Summary and feedback collection'
      })

      // Update all sessions
      for (const sessionData of sessions) {
        await tx.session.update({
          where: {
            roundtableId_sessionNumber: {
              roundtableId,
              sessionNumber: sessionData.sessionNumber
            }
          },
          data: {
            scheduledAt: sessionData.scheduledAt,
            topicId: sessionData.topicId,
            status: 'SCHEDULED',
            notes: sessionData.notes
          }
        })
      }

      // Update roundtable dates and status
      await tx.roundtable.update({
        where: { id: roundtableId },
        data: {
          startDate: session1Date,
          endDate: session10Date,
          status: 'SCHEDULED'
        }
      })

      // Schedule automatic notifications for all sessions
      await this.scheduleSessionNotifications(roundtableId, sessions)

      return {
        roundtableId,
        sessionsScheduled: sessions.length,
        startDate: session1Date,
        endDate: session10Date,
        sessions: sessions.map(s => ({
          sessionNumber: s.sessionNumber,
          date: s.scheduledAt,
          description: s.description
        }))
      }
    })
  }

  private adjustForWeekends(date: Date, skipWeekends: boolean): Date {
    if (!skipWeekends) return date
    
    let adjustedDate = date
    while (isWeekend(adjustedDate)) {
      adjustedDate = addDays(adjustedDate, 1) // Move to next day if weekend
    }
    return adjustedDate
  }

  async getOptimalSchedule(roundtableId: string, constraints?: {
    trainerAvailability?: any[]
    participantTimezones?: string[]
    blockedDates?: Date[]
  }) {
    // Get roundtable data
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: {
        participants: true,
        topics: { where: { isSelected: true } }
      }
    })

    if (!roundtable) {
      throw new Error('Roundtable not found')
    }

    // Algorithm to find optimal schedule considering:
    // - Trainer availability
    // - Participant time zones
    // - Blocked dates
    // - Business days preference

    const recommendations = {
      recommendedStartDate: addWeeks(new Date(), 1), // Start next week
      frequency: 'weekly' as const,
      preferredTime: { hour: 14, minute: 0 }, // 2 PM
      duration: 60,
      skipWeekends: true,
      conflicts: [] as string[],
      alternativeOptions: [
        {
          startDate: addWeeks(new Date(), 2),
          frequency: 'bi-weekly' as const,
          reason: 'More preparation time for participants'
        }
      ]
    }

    return recommendations
  }

  async updateSessionSchedule(sessionId: string, newDate: Date, reason?: string) {
    return prisma.$transaction(async (tx) => {
      const session = await tx.session.findUnique({
        where: { id: sessionId },
        include: {
          roundtable: {
            include: { participants: true }
          }
        }
      })

      if (!session) {
        throw new Error('Session not found')
      }

      const oldDate = session.scheduledAt

      // Update session
      const updatedSession = await tx.session.update({
        where: { id: sessionId },
        data: {
          scheduledAt: newDate,
          notes: reason ? `${session.notes || ''}\nRescheduled: ${reason}` : session.notes
        }
      })

      // Create notifications for the change
      await this.notificationService.sendSessionRescheduleNotification(
        sessionId,
        oldDate,
        newDate,
        reason
      )

      return updatedSession
    })
  }

  async getUpcomingSessions(daysAhead: number = 7) {
    const fromDate = new Date()
    const toDate = addDays(new Date(), daysAhead)

    return prisma.session.findMany({
      where: {
        scheduledAt: {
          gte: fromDate,
          lte: toDate
        },
        status: {
          in: ['SCHEDULED', 'REMINDER_SENT', 'QUESTIONS_READY']
        }
      },
      include: {
        roundtable: {
          select: {
            name: true,
            client: { select: { name: true, company: true } }
          }
        },
        topic: { select: { title: true } },
        trainer: { select: { name: true, email: true } },
        participants: {
          where: { status: 'ACTIVE' },
          select: { name: true, email: true }
        }
      },
      orderBy: { scheduledAt: 'asc' }
    })
  }

  async getSessionCalendar(roundtableId?: string, month?: Date) {
    const startOfMonth = month ? setHours(setMinutes(month, 0), 0) : new Date()
    const endOfMonth = addDays(startOfMonth, 31)

    const where: any = {
      scheduledAt: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    }

    if (roundtableId) {
      where.roundtableId = roundtableId
    }

    const sessions = await prisma.session.findMany({
      where,
      include: {
        roundtable: {
          select: {
            name: true,
            client: { select: { name: true } }
          }
        },
        topic: { select: { title: true } },
        trainer: { select: { name: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    })

    // Group by date for calendar view
    const calendar = sessions.reduce((acc, session) => {
      const dateKey = format(session.scheduledAt, 'yyyy-MM-dd')
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push({
        id: session.id,
        time: format(session.scheduledAt, 'HH:mm'),
        title: session.topic?.title || `Session ${session.sessionNumber}`,
        roundtable: session.roundtable.name,
        client: session.roundtable.client.name,
        status: session.status,
        trainer: session.trainer?.name
      })
      return acc
    }, {} as Record<string, any[]>)

    return calendar
  }

  private async scheduleSessionNotifications(roundtableId: string, sessions: any[]) {
    const notifications = []

    for (const session of sessions) {
      // Trainer reminder - 1 week before
      const trainerReminderDate = addWeeks(session.scheduledAt, -1)
      notifications.push({
        type: 'TRAINER_REMINDER',
        scheduledAt: trainerReminderDate,
        sessionId: session.id,
        subject: `Roundtable Session Reminder - ${format(session.scheduledAt, 'PPP')}`,
        template: 'trainer_reminder'
      })

      // Questions request - 1 week before
      const questionsReminderDate = addWeeks(session.scheduledAt, -1)
      notifications.push({
        type: 'QUESTIONS_REQUEST',
        scheduledAt: questionsReminderDate,
        sessionId: session.id,
        subject: `Questions Required - Session ${session.sessionNumber}`,
        template: 'questions_request'
      })

      // Participant reminder - 1 day before
      const participantReminderDate = addDays(session.scheduledAt, -1)
      notifications.push({
        type: 'SESSION_REMINDER',
        scheduledAt: participantReminderDate,
        sessionId: session.id,
        subject: `Roundtable Session Tomorrow - ${session.description}`,
        template: 'session_reminder'
      })
    }

    // Create notification records
    // Implementation will be completed when NotificationService is ready

    return notifications.length
  }

  async autoAssignTrainers(roundtableId: string) {
    // Get available trainers and their expertise
    const trainers = await prisma.trainer.findMany({
      where: { isActive: true }
    })

    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: {
        sessions: {
          where: { sessionNumber: { gte: 2, lte: 9 } },
          include: { topic: true }
        }
      }
    })

    if (!roundtable) {
      throw new Error('Roundtable not found')
    }

    // Simple round-robin assignment (can be enhanced with expertise matching)
    let trainerIndex = 0
    const assignments = []

    for (const session of roundtable.sessions) {
      if (trainers.length === 0) break

      const trainer = trainers[trainerIndex % trainers.length]
      
      await prisma.session.update({
        where: { id: session.id },
        data: { trainerId: trainer.id }
      })

      assignments.push({
        sessionNumber: session.sessionNumber,
        topic: session.topic?.title,
        trainer: trainer.name
      })

      trainerIndex++
    }

    return assignments
  }
}