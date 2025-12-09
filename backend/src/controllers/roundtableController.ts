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
  maxParticipants: Joi.number().integer().min(1).max(20).default(6),
  numberOfSessions: Joi.number().integer().min(1).optional(),
  topics: Joi.array().items(
    Joi.object({
      title: Joi.string().required().min(2).max(100),
      description: Joi.string().optional().allow('').max(500)
    })
  ).min(0).required(),
  sessions: Joi.array().items(
    Joi.object({
      sessionNumber: Joi.number().integer().min(1).required(),
      scheduledAt: Joi.date().required(),
      topicId: Joi.string().optional().allow(null),
      customTopicTitle: Joi.string().optional().allow('').max(100),
      trainerId: Joi.string().optional().allow(null),
      notes: Joi.string().optional().allow(''),
      meetingLink: Joi.string().uri().optional().allow('')
    })
  ).optional()
})

const updateStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(RoundtableStatus)).required()
})

const updateRoundtableSchema = Joi.object({
  name: Joi.string().optional().min(2).max(100),
  description: Joi.string().optional().allow('').max(500),
  maxParticipants: Joi.number().integer().min(1).max(50).optional(),
  numberOfSessions: Joi.number().integer().min(1).max(100).optional(),
  confirmDangerous: Joi.boolean().optional()
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
              questionsStatus: true,
              feedbacksStatus: true,
              topic: { select: { id: true, title: true } },
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

    // Add progress calculation and workflow status for sessions
    const roundtablesWithProgress = roundtables.map(rt => {
      // Calculate workflow status for each session using new 3-column system
      const sessionsWithWorkflow = rt.sessions.map((session: any) => {
        let workflowStatus = 'scheduled'

        // Check questionsStatus first
        if (session.questionsStatus === 'REQUESTED_FROM_COORDINATOR') {
          workflowStatus = 'questions_requested'
        } else if (session.questionsStatus === 'PENDING_APPROVAL') {
          workflowStatus = 'questions_pending_approval'
        } else if (session.questionsStatus === 'SENT_TO_PARTICIPANTS') {
          workflowStatus = 'questions_sent'
        }

        // Then check feedbacksStatus
        if (session.feedbacksStatus === 'REQUESTED_FROM_COORDINATOR') {
          workflowStatus = 'feedback_requested'
        } else if (session.feedbacksStatus === 'PENDING_APPROVAL') {
          workflowStatus = 'feedback_pending_approval'
        } else if (session.feedbacksStatus === 'SENT_TO_PARTICIPANTS') {
          workflowStatus = 'feedback_sent'
        }

        return {
          ...session,
          workflowStatus,
          questionsCount: session.questions.length,
          feedbackCount: session.feedback.length
        }
      })

      return {
        ...rt,
        sessions: sessionsWithWorkflow,
        progress: roundtableService.calculateProgress(rt.sessions),
        activeParticipants: rt.participants.filter(p => p.status === 'ACTIVE').length
      }
    })

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
    const { name, description, clientId, startDate, maxParticipants, numberOfSessions, topics, sessions } = req.body

    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    })

    if (!client) {
      return res.status(400).json({ success: false, error: 'Client not found' })
    }

    // Additional validation: if sessions provided, verify trainers and topics exist
    if (sessions && sessions.length > 0) {
      const trainerIds = sessions.filter((s: any) => s.trainerId).map((s: any) => s.trainerId)
      const topicIds = sessions.filter((s: any) => s.topicId).map((s: any) => s.topicId)

      if (trainerIds.length > 0) {
        const trainers = await prisma.trainer.findMany({
          where: { id: { in: trainerIds } }
        })
        if (trainers.length !== trainerIds.length) {
          return res.status(400).json({ success: false, error: 'One or more trainers not found' })
        }
      }

      // Note: topicIds validation will happen after topics are created
      // For now, we'll allow topicId to be passed only if it's a text match with topic titles
    }

    const roundtable = await roundtableService.createRoundtable({
      name,
      description,
      clientId,
      startDate: startDate ? new Date(startDate) : undefined,
      maxParticipants: maxParticipants || 6,
      numberOfSessions,
      topics,
      sessions: sessions ? sessions.map((s: any) => ({
        ...s,
        scheduledAt: new Date(s.scheduledAt)
      })) : undefined
    })

    res.status(201).json({ success: true, data: roundtable })
  } catch (error) {
    console.error('Error creating roundtable:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Update roundtable (general fields)
router.put('/:id', validateRequest(updateRoundtableSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, description, maxParticipants, numberOfSessions, confirmDangerous } = req.body

    // Check if roundtable exists
    const roundtable = await prisma.roundtable.findUnique({
      where: { id },
      include: {
        sessions: {
          include: {
            trainer: { select: { name: true, email: true } },
            topic: { select: { title: true } },
            questions: { select: { id: true, status: true } },
            feedback: { select: { id: true, status: true } }
          },
          orderBy: { sessionNumber: 'asc' }
        }
      }
    })

    if (!roundtable) {
      return res.status(404).json({ success: false, error: 'Roundtable not found' })
    }

    // If numberOfSessions is changing, perform safety checks
    if (numberOfSessions !== undefined && numberOfSessions !== roundtable.numberOfSessions) {
      const impactReport = await roundtableService.checkNumberOfSessionsImpact(id, numberOfSessions)

      if (impactReport.blockers.length > 0) {
        // Cannot proceed - there are blockers
        return res.status(400).json({
          success: false,
          error: 'Cannot change number of sessions',
          blockers: impactReport.blockers,
          impact: impactReport
        })
      }

      if (impactReport.warnings.length > 0 && !confirmDangerous) {
        // Warnings exist but user hasn't confirmed
        return res.status(409).json({
          success: false,
          error: 'Confirmation required for dangerous operation',
          warnings: impactReport.warnings,
          impact: impactReport,
          requiresConfirmation: true
        })
      }
    }

    // Prepare update data
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (maxParticipants !== undefined) updateData.maxParticipants = maxParticipants
    if (numberOfSessions !== undefined) updateData.numberOfSessions = numberOfSessions

    // Update roundtable
    const updatedRoundtable = await prisma.roundtable.update({
      where: { id },
      data: updateData,
      include: {
        client: true,
        sessions: {
          include: {
            topic: true,
            trainer: { select: { name: true, email: true } }
          },
          orderBy: { sessionNumber: 'asc' }
        },
        topics: true
      }
    })

    // If numberOfSessions changed, adjust sessions
    if (numberOfSessions !== undefined && numberOfSessions !== roundtable.numberOfSessions) {
      await roundtableService.adjustSessionCount(id, numberOfSessions, roundtable.numberOfSessions)
    }

    res.json({ success: true, data: updatedRoundtable })
  } catch (error: any) {
    console.error('Error updating roundtable:', error)
    res.status(500).json({ success: false, error: error.message || 'Internal server error' })
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
    const {
      startDate,
      sessionDuration = 60,
      sessionFrequency = 'weekly',
      daysBetweenSessions,
      numberOfSessions
    } = req.body

    if (!startDate) {
      return res.status(400).json({ success: false, error: 'Start date is required' })
    }

    // Calculate daysBetweenSessions from sessionFrequency if not provided
    let finalDaysBetween = daysBetweenSessions
    if (!finalDaysBetween) {
      finalDaysBetween = sessionFrequency === 'bi-weekly' ? 14 : 7
    }

    const result = await roundtableService.scheduleAllSessions(id, {
      startDate: new Date(startDate),
      sessionDuration,
      sessionFrequency,
      daysBetweenSessions: finalDaysBetween,
      numberOfSessions
    })

    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Error scheduling sessions:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// PATCH /api/roundtables/:id/settings - Update question/feedback limits
router.patch('/:id/settings', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const {
      minQuestionsPerSession,
      maxQuestionsPerSession,
      minFeedbackItemsPerParticipant,
      maxFeedbackItemsPerParticipant
    } = req.body

    // Validation
    if (minQuestionsPerSession !== undefined && (minQuestionsPerSession < 0 || minQuestionsPerSession > 10)) {
      return res.status(400).json({
        success: false,
        error: 'minQuestionsPerSession must be between 0 and 10'
      })
    }

    if (maxQuestionsPerSession !== undefined && (maxQuestionsPerSession < 1 || maxQuestionsPerSession > 10)) {
      return res.status(400).json({
        success: false,
        error: 'maxQuestionsPerSession must be between 1 and 10'
      })
    }

    if (minQuestionsPerSession !== undefined && maxQuestionsPerSession !== undefined) {
      if (minQuestionsPerSession > maxQuestionsPerSession) {
        return res.status(400).json({
          success: false,
          error: 'minQuestionsPerSession cannot be greater than maxQuestionsPerSession'
        })
      }
    }

    if (minFeedbackItemsPerParticipant !== undefined && (minFeedbackItemsPerParticipant < 1 || minFeedbackItemsPerParticipant > 10)) {
      return res.status(400).json({
        success: false,
        error: 'minFeedbackItemsPerParticipant must be between 1 and 10'
      })
    }

    if (maxFeedbackItemsPerParticipant !== undefined && (maxFeedbackItemsPerParticipant < 1 || maxFeedbackItemsPerParticipant > 10)) {
      return res.status(400).json({
        success: false,
        error: 'maxFeedbackItemsPerParticipant must be between 1 and 10'
      })
    }

    if (minFeedbackItemsPerParticipant !== undefined && maxFeedbackItemsPerParticipant !== undefined) {
      if (minFeedbackItemsPerParticipant > maxFeedbackItemsPerParticipant) {
        return res.status(400).json({
          success: false,
          error: 'minFeedbackItemsPerParticipant cannot be greater than maxFeedbackItemsPerParticipant'
        })
      }
    }

    const updates: any = {}
    if (minQuestionsPerSession !== undefined) updates.minQuestionsPerSession = minQuestionsPerSession
    if (maxQuestionsPerSession !== undefined) updates.maxQuestionsPerSession = maxQuestionsPerSession
    if (minFeedbackItemsPerParticipant !== undefined) updates.minFeedbackItemsPerParticipant = minFeedbackItemsPerParticipant
    if (maxFeedbackItemsPerParticipant !== undefined) updates.maxFeedbackItemsPerParticipant = maxFeedbackItemsPerParticipant

    const updatedRoundtable = await prisma.roundtable.update({
      where: { id },
      data: updates
    })

    res.json({
      success: true,
      data: updatedRoundtable
    })
  } catch (error) {
    console.error('Error updating roundtable settings:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// GET /api/roundtables/:id/settings - Get question/feedback limits
router.get('/:id/settings', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const roundtable = await prisma.roundtable.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        minQuestionsPerSession: true,
        maxQuestionsPerSession: true,
        minFeedbackItemsPerParticipant: true,
        maxFeedbackItemsPerParticipant: true
      }
    })

    if (!roundtable) {
      return res.status(404).json({
        success: false,
        error: 'Roundtable not found'
      })
    }

    res.json({
      success: true,
      data: roundtable
    })
  } catch (error) {
    console.error('Error fetching roundtable settings:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router