import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { SchedulingService } from '../services/SchedulingService'
import { NotificationService } from '../services/NotificationService'

const router = Router()
const prisma = new PrismaClient()
const schedulingService = new SchedulingService()
const notificationService = new NotificationService()

// Validation schemas
const scheduleRoundtableSchema = Joi.object({
  startDate: Joi.date().required(),
  sessionDuration: Joi.number().integer().min(30).max(180).default(60),
  sessionFrequency: Joi.string().valid('weekly', 'bi-weekly').default('weekly'),
  preferredTime: Joi.object({
    hour: Joi.number().integer().min(0).max(23).required(),
    minute: Joi.number().integer().min(0).max(59).default(0)
  }).required(),
  skipWeekends: Joi.boolean().default(true)
})

const rescheduleSessionSchema = Joi.object({
  newDate: Joi.date().required(),
  reason: Joi.string().optional().max(200)
})

// Get all sessions
router.get('/', async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      roundtableId,
      upcoming = false 
    } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const where: any = {}

    if (status) where.status = status
    if (roundtableId) where.roundtableId = roundtableId
    if (upcoming === 'true') {
      where.scheduledAt = { gte: new Date() }
    }

    const [sessions, total] = await Promise.all([
      prisma.session.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          roundtable: {
            select: {
              name: true,
              client: { select: { name: true, company: true } }
            }
          },
          topic: { select: { title: true } },
          trainer: { select: { name: true, email: true } },
          questions: { select: { id: true, status: true } },
          feedback: { select: { id: true, status: true } }
        },
        orderBy: { scheduledAt: 'asc' }
      }),
      prisma.session.count({ where })
    ])

    res.json({
      success: true,
      data: sessions,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get upcoming sessions (next 7 days)
router.get('/upcoming', async (req: Request, res: Response) => {
  try {
    const { days = 7 } = req.query

    const sessions = await schedulingService.getUpcomingSessions(Number(days))

    res.json({ success: true, data: sessions })
  } catch (error) {
    console.error('Error fetching upcoming sessions:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get session calendar
router.get('/calendar', async (req: Request, res: Response) => {
  try {
    const { roundtableId, month } = req.query

    const monthDate = month ? new Date(String(month)) : new Date()
    const calendar = await schedulingService.getSessionCalendar(
      roundtableId as string,
      monthDate
    )

    res.json({ success: true, data: calendar })
  } catch (error) {
    console.error('Error fetching session calendar:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get calendar view with multiple roundtables
router.get('/calendar-view', async (req: Request, res: Response) => {
  try {
    const { roundtableIds, startDate, endDate, groupBy = 'roundtable' } = req.query

    // Parse roundtable IDs (can be comma-separated string or array)
    let parsedRoundtableIds: string[] = []
    if (roundtableIds) {
      if (typeof roundtableIds === 'string') {
        parsedRoundtableIds = roundtableIds.split(',').filter(id => id.trim())
      } else if (Array.isArray(roundtableIds)) {
        parsedRoundtableIds = roundtableIds as string[]
      }
    }

    // Build where clause
    const where: any = {}

    if (parsedRoundtableIds.length > 0) {
      where.roundtableId = { in: parsedRoundtableIds }
    }

    if (startDate || endDate) {
      where.scheduledAt = {}
      if (startDate) where.scheduledAt.gte = new Date(String(startDate))
      if (endDate) where.scheduledAt.lte = new Date(String(endDate))
    }

    // Fetch sessions with full details
    const sessions = await prisma.session.findMany({
      where,
      include: {
        roundtable: {
          select: {
            id: true,
            name: true,
            status: true,
            client: { select: { name: true, company: true } }
          }
        },
        topic: { select: { id: true, title: true, description: true } },
        trainer: { select: { id: true, name: true, email: true } },
        questions: {
          select: { id: true, status: true },
          where: { status: 'APPROVED' }
        },
        feedback: {
          select: { id: true, status: true },
          where: { status: { in: ['APPROVED', 'SENT'] } }
        }
      },
      orderBy: [
        { roundtableId: 'asc' },
        { scheduledAt: 'asc' }
      ]
    })

    // Calculate workflow status for each session
    const sessionsWithWorkflow = sessions.map(session => {
      let workflowStatus = 'scheduled'

      // Determine workflow status based on session status and questions/feedback
      if (session.status === 'REMINDER_SENT' || session.status === 'QUESTIONS_REQUESTED') {
        workflowStatus = 'questions_requested'
      } else if (session.status === 'QUESTIONS_READY' && session.questions.length > 0) {
        workflowStatus = 'questions_sent'
      } else if (session.status === 'COMPLETED' || session.status === 'FEEDBACK_PENDING') {
        workflowStatus = 'feedback_requested'
      } else if (session.status === 'FEEDBACK_SENT' || session.feedback.length > 0) {
        workflowStatus = 'feedback_sent'
      }

      return {
        ...session,
        workflowStatus,
        questionsCount: session.questions.length,
        feedbackCount: session.feedback.length
      }
    })

    // Group sessions by roundtable
    const groupedByRoundtable = parsedRoundtableIds.length > 0
      ? parsedRoundtableIds.map(rtId => {
          const rtSessions = sessionsWithWorkflow.filter(s => s.roundtableId === rtId)
          return {
            roundtable: rtSessions[0]?.roundtable || null,
            sessions: rtSessions
          }
        }).filter(group => group.roundtable !== null)
      : Object.values(
          sessionsWithWorkflow.reduce((acc, session) => {
            if (!acc[session.roundtableId]) {
              acc[session.roundtableId] = {
                roundtable: session.roundtable,
                sessions: []
              }
            }
            acc[session.roundtableId].sessions.push(session)
            return acc
          }, {} as Record<string, any>)
        )

    res.json({
      success: true,
      data: {
        groups: groupedByRoundtable,
        totalSessions: sessions.length,
        dateRange: {
          start: startDate || null,
          end: endDate || null
        }
      }
    })

  } catch (error) {
    console.error('Error fetching calendar view:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get session by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        roundtable: {
          include: {
            client: true,
            participants: { where: { status: 'ACTIVE' } }
          }
        },
        topic: true,
        trainer: true,
        questions: {
          orderBy: { createdAt: 'asc' }
        },
        feedback: {
          include: {
            participant: { select: { name: true, email: true } }
          }
        }
      }
    })

    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' })
    }

    res.json({ success: true, data: session })
  } catch (error) {
    console.error('Error fetching session:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Schedule complete roundtable
router.post('/schedule-roundtable/:roundtableId', 
  validateRequest(scheduleRoundtableSchema), 
  async (req: Request, res: Response) => {
    try {
      const { roundtableId } = req.params
      const { startDate, sessionDuration, sessionFrequency, preferredTime, skipWeekends } = req.body

      const options = {
        startDate: new Date(startDate),
        sessionDuration,
        sessionFrequency,
        preferredTime,
        skipWeekends
      }

      const result = await schedulingService.scheduleRoundtableComplete(roundtableId, options)

      res.json({ success: true, data: result })
    } catch (error) {
      console.error('Error scheduling roundtable:', error)
      if (error instanceof Error) {
        res.status(400).json({ success: false, error: error.message })
      } else {
        res.status(500).json({ success: false, error: 'Internal server error' })
      }
    }
  }
)

// Reschedule individual session
router.patch('/:id/reschedule', 
  validateRequest(rescheduleSessionSchema),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { newDate, reason } = req.body

      const updatedSession = await schedulingService.updateSessionSchedule(
        id, 
        new Date(newDate), 
        reason
      )

      res.json({ success: true, data: updatedSession })
    } catch (error) {
      console.error('Error rescheduling session:', error)
      if (error instanceof Error) {
        res.status(400).json({ success: false, error: error.message })
      } else {
        res.status(500).json({ success: false, error: 'Internal server error' })
      }
    }
  }
)

// Auto-assign trainers to roundtable sessions
router.post('/:roundtableId/assign-trainers', async (req: Request, res: Response) => {
  try {
    const { roundtableId } = req.params

    const assignments = await schedulingService.autoAssignTrainers(roundtableId)

    res.json({ success: true, data: assignments })
  } catch (error) {
    console.error('Error assigning trainers:', error)
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
})

// Get scheduling recommendations
router.get('/:roundtableId/recommendations', async (req: Request, res: Response) => {
  try {
    const { roundtableId } = req.params

    const recommendations = await schedulingService.getOptimalSchedule(roundtableId)

    res.json({ success: true, data: recommendations })
  } catch (error) {
    console.error('Error getting scheduling recommendations:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Update session status
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status, notes } = req.body

    const session = await prisma.session.update({
      where: { id },
      data: {
        status,
        notes: notes || undefined,
        updatedAt: new Date()
      }
    })

    res.json({ success: true, data: session })
  } catch (error) {
    console.error('Error updating session status:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Check for trainer conflicts
router.post('/check-trainer-conflict', async (req: Request, res: Response) => {
  try {
    const { trainerId, sessionId, scheduledAt } = req.body

    if (!trainerId || !scheduledAt) {
      return res.status(400).json({
        success: false,
        error: 'Trainer ID and scheduled date are required'
      })
    }

    const sessionDate = new Date(scheduledAt)
    const sessionStart = sessionDate
    const sessionEnd = new Date(sessionDate.getTime() + 90 * 60000) // Assume 90 min sessions

    // Find all sessions for this trainer
    const trainerSessions = await prisma.session.findMany({
      where: {
        trainerId,
        id: { not: sessionId }, // Exclude current session if updating
        scheduledAt: {
          gte: new Date(sessionDate.getTime() - 90 * 60000), // 90 min before
          lte: new Date(sessionDate.getTime() + 90 * 60000)  // 90 min after
        }
      },
      include: {
        roundtable: {
          select: {
            name: true,
            client: { select: { name: true } }
          }
        },
        topic: { select: { title: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    })

    const hasConflict = trainerSessions.length > 0

    res.json({
      success: true,
      data: {
        hasConflict,
        conflicts: trainerSessions.map(s => ({
          sessionId: s.id,
          sessionNumber: s.sessionNumber,
          roundtable: s.roundtable.name,
          client: s.roundtable.client.name,
          topic: s.topic?.title,
          scheduledAt: s.scheduledAt,
          timeDiff: Math.abs(sessionDate.getTime() - new Date(s.scheduledAt).getTime()) / 60000 // minutes
        }))
      }
    })
  } catch (error) {
    console.error('Error checking trainer conflict:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Assign trainer to session
router.patch('/:id/assign-trainer', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { trainerId, skipConflictCheck } = req.body

    // Verify trainer exists
    if (trainerId) {
      const trainer = await prisma.trainer.findUnique({
        where: { id: trainerId }
      })

      if (!trainer) {
        return res.status(400).json({ success: false, error: 'Trainer not found' })
      }

      // Check for conflicts unless explicitly skipped
      if (!skipConflictCheck) {
        const session = await prisma.session.findUnique({
          where: { id }
        })

        if (session) {
          const sessionDate = new Date(session.scheduledAt)

          // Find conflicting sessions
          const conflictingSessions = await prisma.session.findMany({
            where: {
              trainerId,
              id: { not: id },
              scheduledAt: {
                gte: new Date(sessionDate.getTime() - 90 * 60000), // 90 min before
                lte: new Date(sessionDate.getTime() + 90 * 60000)  // 90 min after
              }
            },
            include: {
              roundtable: { select: { name: true } }
            }
          })

          if (conflictingSessions.length > 0) {
            return res.status(409).json({
              success: false,
              error: 'Trainer has conflicting sessions at this time',
              conflicts: conflictingSessions.map(s => ({
                sessionId: s.id,
                sessionNumber: s.sessionNumber,
                roundtable: s.roundtable.name,
                scheduledAt: s.scheduledAt
              }))
            })
          }
        }
      }
    }

    const session = await prisma.session.update({
      where: { id },
      data: { trainerId },
      include: { trainer: { select: { name: true, email: true } } }
    })

    // Send notification to trainer about the new assignment
    if (trainerId) {
      try {
        await notificationService.sendTrainerAssignmentNotification(id)
        console.log(`✅ Assignment notification sent to trainer for session ${id}`)
      } catch (error) {
        console.error('Error sending trainer assignment notification:', error)
        // Don't fail the request if notification fails
      }
    }

    res.json({ success: true, data: session })
  } catch (error) {
    console.error('Error assigning trainer:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router