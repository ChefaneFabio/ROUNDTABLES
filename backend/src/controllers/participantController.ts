import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const createParticipantSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required(),
  phone: Joi.string().optional().allow(''),
  languageLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').required(),
  company: Joi.string().optional().allow(''),
  roundtableId: Joi.string().required(),
  status: Joi.string().valid('ACTIVE', 'INACTIVE', 'COMPLETED').default('ACTIVE')
})

const updateParticipantSchema = Joi.object({
  name: Joi.string().optional().min(2).max(100),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional().allow(''),
  languageLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
  company: Joi.string().optional().allow(''),
  status: Joi.string().valid('ACTIVE', 'INACTIVE', 'COMPLETED').optional()
})

// Get all participants
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 50, roundtableId, status } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const where: any = {}

    if (roundtableId) where.roundtableId = roundtableId
    if (status) where.status = status

    const [participants, total] = await Promise.all([
      prisma.participant.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          roundtable: {
            select: {
              id: true,
              name: true,
              client: {
                select: {
                  name: true,
                  company: true
                }
              }
            }
          },
          topicVotes: {
            include: {
              topic: { select: { title: true } }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.participant.count({ where })
    ])

    // Calculate additional stats for each participant
    // Fetch session counts for all roundtables in a single query
    const roundtableIds = [...new Set(participants.map(p => p.roundtableId))]
    const sessionCounts = await prisma.session.groupBy({
      by: ['roundtableId'],
      where: {
        roundtableId: { in: roundtableIds }
      },
      _count: {
        id: true
      }
    })

    // Create a map for quick lookup
    const sessionCountMap = new Map(
      sessionCounts.map(sc => [sc.roundtableId, sc._count.id])
    )

    // Add stats to each participant
    const participantsWithStats = participants.map(p => ({
      ...p,
      votingCompleted: p.topicVotes.length >= 8,
      sessionsAttended: 0, // TODO: Track session attendance
      totalSessions: sessionCountMap.get(p.roundtableId) || 0
    }))

    res.json({
      success: true,
      data: participantsWithStats,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching participants:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get participants by roundtable
router.get('/roundtable/:roundtableId', async (req: Request, res: Response) => {
  try {
    const { roundtableId } = req.params

    const participants = await prisma.participant.findMany({
      where: { roundtableId },
      include: {
        topicVotes: {
          include: {
            topic: { select: { title: true } }
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    })

    res.json({ success: true, data: participants })
  } catch (error) {
    console.error('Error fetching roundtable participants:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get participant by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const participant = await prisma.participant.findUnique({
      where: { id },
      include: {
        roundtable: {
          include: {
            client: true,
            sessions: {
              select: {
                id: true,
                sessionNumber: true,
                scheduledAt: true,
                status: true,
                topic: { select: { title: true } }
              },
              orderBy: { sessionNumber: 'asc' }
            }
          }
        },
        topicVotes: {
          include: {
            topic: true
          }
        },
        feedback: {
          include: {
            session: {
              select: {
                sessionNumber: true,
                topic: { select: { title: true } }
              }
            }
          }
        }
      }
    })

    if (!participant) {
      return res.status(404).json({ success: false, error: 'Participant not found' })
    }

    res.json({ success: true, data: participant })
  } catch (error) {
    console.error('Error fetching participant:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Create new participant
router.post('/', validateRequest(createParticipantSchema), async (req: Request, res: Response) => {
  try {
    const { name, email, phone, languageLevel, company, roundtableId, status } = req.body

    // Verify roundtable exists
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: {
        participants: { where: { status: 'ACTIVE' } }
      }
    })

    if (!roundtable) {
      return res.status(400).json({ success: false, error: 'Roundtable not found' })
    }

    // Check if roundtable is full
    if (roundtable.participants.length >= roundtable.maxParticipants) {
      return res.status(400).json({
        success: false,
        error: `Roundtable is full (max ${roundtable.maxParticipants} participants)`
      })
    }

    // Check for duplicate email in same roundtable
    const existingParticipant = await prisma.participant.findFirst({
      where: {
        email,
        roundtableId
      }
    })

    if (existingParticipant) {
      return res.status(400).json({
        success: false,
        error: 'Participant with this email already exists in this roundtable'
      })
    }

    const participant = await prisma.participant.create({
      data: {
        name,
        email,
        phone,
        languageLevel,
        company,
        roundtableId,
        status: status || 'ACTIVE'
      },
      include: {
        roundtable: {
          select: {
            name: true,
            client: { select: { name: true, company: true } }
          }
        }
      }
    })

    res.status(201).json({ success: true, data: participant })
  } catch (error) {
    console.error('Error creating participant:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Update participant
router.put('/:id', validateRequest(updateParticipantSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updates: any = {}

    if (req.body.name) updates.name = req.body.name
    if (req.body.email) updates.email = req.body.email
    if (req.body.phone !== undefined) updates.phone = req.body.phone
    if (req.body.languageLevel) updates.languageLevel = req.body.languageLevel
    if (req.body.company !== undefined) updates.company = req.body.company
    if (req.body.status) updates.status = req.body.status

    const participant = await prisma.participant.findUnique({
      where: { id }
    })

    if (!participant) {
      return res.status(404).json({ success: false, error: 'Participant not found' })
    }

    // Check email uniqueness if email is being updated
    if (updates.email && updates.email !== participant.email) {
      const emailExists = await prisma.participant.findFirst({
        where: {
          email: updates.email,
          roundtableId: participant.roundtableId,
          NOT: { id }
        }
      })

      if (emailExists) {
        return res.status(400).json({
          success: false,
          error: 'Participant with this email already exists in this roundtable'
        })
      }
    }

    const updatedParticipant = await prisma.participant.update({
      where: { id },
      data: updates,
      include: {
        roundtable: {
          select: {
            name: true,
            client: { select: { name: true, company: true } }
          }
        }
      }
    })

    res.json({ success: true, data: updatedParticipant })
  } catch (error) {
    console.error('Error updating participant:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Delete participant
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const participant = await prisma.participant.findUnique({
      where: { id },
      include: {
        topicVotes: true,
        feedback: true
      }
    })

    if (!participant) {
      return res.status(404).json({ success: false, error: 'Participant not found' })
    }

    // Check if participant has votes or feedback
    if (participant.topicVotes.length > 0 || participant.feedback.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete participant with existing votes or feedback. Set status to INACTIVE instead.'
      })
    }

    await prisma.participant.delete({ where: { id } })

    res.json({ success: true, message: 'Participant deleted successfully' })
  } catch (error) {
    console.error('Error deleting participant:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router