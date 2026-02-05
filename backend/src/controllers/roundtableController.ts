import { Router, Request, Response } from 'express'
import { PrismaClient, RoundtableStatus } from '@prisma/client'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { RoundtableService } from '../services/RoundtableService'

const router = Router()
const prisma = new PrismaClient()
const roundtableService = new RoundtableService()

// Validation schemas
const createRoundtableSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  description: Joi.string().optional().max(500),
  clientId: Joi.string().required(),
  startDate: Joi.date().optional(),
  maxParticipants: Joi.number().integer().min(1).max(12).default(6),
  topics: Joi.array().items(
    Joi.object({
      title: Joi.string().required().min(2).max(100),
      description: Joi.string().required().min(10).max(500)
    })
  ).min(10).max(10).required()
})

const updateStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(RoundtableStatus)).required()
})

// Get all roundtables
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status, clientId } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const where: any = {}

    if (status) where.status = status
    if (clientId) where.clientId = clientId

    const [roundtables, total] = await Promise.all([
      prisma.roundtable.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          client: { select: { name: true, company: true } },
          participants: { select: { id: true, status: true } },
          sessions: { 
            select: { 
              id: true, 
              sessionNumber: true, 
              scheduledAt: true, 
              status: true,
              topic: { select: { title: true } }
            },
            orderBy: { sessionNumber: 'asc' }
          },
          topics: {
            where: { isSelected: true },
            select: { id: true, title: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.roundtable.count({ where })
    ])

    // Add progress calculation
    const roundtablesWithProgress = roundtables.map(rt => ({
      ...rt,
      progress: roundtableService.calculateProgress(rt.sessions),
      activeParticipants: rt.participants.filter(p => p.status === 'ACTIVE').length
    }))

    res.json({
      success: true,
      data: roundtablesWithProgress,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching roundtables:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get roundtable by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const roundtable = await prisma.roundtable.findUnique({
      where: { id },
      include: {
        client: true,
        participants: {
          include: {
            topicVotes: {
              include: { topic: { select: { title: true } } }
            }
          }
        },
        sessions: {
          include: {
            topic: true,
            trainer: { select: { name: true, email: true } },
            questions: true,
            feedback: { select: { id: true, status: true } }
          },
          orderBy: { sessionNumber: 'asc' }
        },
        topics: {
          include: {
            votes: { select: { participantId: true } }
          },
          orderBy: { title: 'asc' }
        },
        topicVotes: {
          include: {
            participant: { select: { name: true } },
            topic: { select: { title: true } }
          }
        }
      }
    })

    if (!roundtable) {
      return res.status(404).json({ success: false, error: 'Roundtable not found' })
    }

    // Add vote counts to topics
    const topicsWithVotes = roundtable.topics.map(topic => ({
      ...topic,
      voteCount: topic.votes.length
    }))

    res.json({ 
      success: true, 
      data: { 
        ...roundtable, 
        topics: topicsWithVotes,
        progress: roundtableService.calculateProgress(roundtable.sessions)
      } 
    })
  } catch (error) {
    console.error('Error fetching roundtable:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Create new roundtable
router.post('/', validateRequest(createRoundtableSchema), async (req: Request, res: Response) => {
  try {
    const { name, description, clientId, startDate, maxParticipants, topics } = req.body

    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    })

    if (!client) {
      return res.status(400).json({ success: false, error: 'Client not found' })
    }

    const roundtable = await roundtableService.createRoundtable({
      name,
      description,
      clientId,
      startDate: startDate ? new Date(startDate) : undefined,
      maxParticipants: maxParticipants || 6,
      topics
    })

    res.status(201).json({ success: true, data: roundtable })
  } catch (error) {
    console.error('Error creating roundtable:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Update roundtable status
router.patch('/:id/status', validateRequest(updateStatusSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const roundtable = await prisma.roundtable.findUnique({
      where: { id }
    })

    if (!roundtable) {
      return res.status(404).json({ success: false, error: 'Roundtable not found' })
    }

    const updatedRoundtable = await roundtableService.updateStatus(id, status)

    res.json({ success: true, data: updatedRoundtable })
  } catch (error) {
    console.error('Error updating roundtable status:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Start topic voting
router.post('/:id/start-voting', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await roundtableService.startTopicVoting(id)

    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Error starting topic voting:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Finalize topic voting
router.post('/:id/finalize-voting', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const result = await roundtableService.finalizeTopicVoting(id)

    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Error finalizing topic voting:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Schedule all sessions
router.post('/:id/schedule-sessions', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { startDate, sessionDuration = 60, sessionFrequency = 'weekly' } = req.body

    if (!startDate) {
      return res.status(400).json({ success: false, error: 'Start date is required' })
    }

    const result = await roundtableService.scheduleAllSessions(id, {
      startDate: new Date(startDate),
      sessionDuration,
      sessionFrequency
    })

    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Error scheduling sessions:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router