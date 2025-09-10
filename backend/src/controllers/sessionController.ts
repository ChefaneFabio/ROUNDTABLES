import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { SchedulingService } from '../services/SchedulingService'

const router = Router()
const prisma = new PrismaClient()
const schedulingService = new SchedulingService()

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

// Assign trainer to session
router.patch('/:id/assign-trainer', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { trainerId } = req.body

    // Verify trainer exists
    if (trainerId) {
      const trainer = await prisma.trainer.findUnique({
        where: { id: trainerId }
      })

      if (!trainer) {
        return res.status(400).json({ success: false, error: 'Trainer not found' })
      }
    }

    const session = await prisma.session.update({
      where: { id },
      data: { trainerId },
      include: { trainer: { select: { name: true, email: true } } }
    })

    res.json({ success: true, data: session })
  } catch (error) {
    console.error('Error assigning trainer:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router