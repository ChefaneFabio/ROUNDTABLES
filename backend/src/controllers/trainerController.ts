import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { getErrorMessage } from '../utils/errorHandler'
import { addWeeks, addDays } from 'date-fns'

const router = Router()
const prisma = new PrismaClient()

interface Trainer {
  id: string
  name: string
  email: string
  specialties: string[]
  status: 'ACTIVE' | 'INACTIVE' | 'UNAVAILABLE'
  rating: number
  sessionsCount: number
  availability: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
  joinedDate: string
  lastActive: string
  bio?: string
  phone?: string
  hourlyRate?: number
}

// ==================== TRAINER PORTAL ENDPOINTS ====================

// GET /api/trainers/me - Get current trainer's profile and stats
router.get('/me', async (req: Request, res: Response) => {
  try {
    // TODO: Get trainerId from JWT token (req.user.id)
    // For now, use email from query or mock
    const trainerEmail = req.query.email as string || 'jean@trainer.com'

    const trainer = await prisma.trainer.findUnique({
      where: { email: trainerEmail },
      include: {
        sessions: {
          include: {
            roundtable: { include: { client: true } },
            topic: true,
            questions: true,
            feedback: true
          },
          orderBy: { scheduledAt: 'asc' }
        }
      }
    })

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    // Calculate stats using new 3-column status
    const upcomingSessions = trainer.sessions.filter(s => new Date(s.scheduledAt) > new Date())
    const completedSessions = trainer.sessions.filter(s => s.status === 'COMPLETED')
    const questionsPending = trainer.sessions.filter(s =>
      s.questionsStatus === 'REQUESTED_FROM_COORDINATOR' && new Date(s.scheduledAt) > new Date()
    )
    const feedbackPending = trainer.sessions.filter(s =>
      s.feedbacksStatus === 'REQUESTED_FROM_COORDINATOR' && s.status === 'COMPLETED'
    )

    res.json({
      success: true,
      data: {
        ...trainer,
        stats: {
          upcomingSessionsCount: upcomingSessions.length,
          completedSessionsCount: completedSessions.length,
          questionsPendingCount: questionsPending.length,
          feedbackPendingCount: feedbackPending.length,
          totalSessions: trainer.sessions.length
        }
      }
    })
  } catch (error) {
    console.error('Error fetching trainer profile:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer profile',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/trainers/me/sessions - Get trainer's sessions with context
router.get('/me/sessions', async (req: Request, res: Response) => {
  try {
    const trainerEmail = req.query.email as string || 'jean@trainer.com'

    const trainer = await prisma.trainer.findUnique({
      where: { email: trainerEmail }
    })

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    const sessions = await prisma.session.findMany({
      where: { trainerId: trainer.id },
      include: {
        roundtable: {
          include: {
            client: true,
            participants: { where: { status: 'ACTIVE' } }
          }
        },
        topic: true,
        questions: true,
        feedback: true
      },
      orderBy: { scheduledAt: 'asc' }
    })

    // Add context for each session (previous and next topics in the roundtable)
    const sessionsWithContext = await Promise.all(sessions.map(async (session) => {
      // Get previous session
      const previousSession = await prisma.session.findFirst({
        where: {
          roundtableId: session.roundtableId,
          sessionNumber: session.sessionNumber - 1
        },
        include: { topic: true, trainer: true }
      })

      // Get next session
      const nextSession = await prisma.session.findFirst({
        where: {
          roundtableId: session.roundtableId,
          sessionNumber: session.sessionNumber + 1
        },
        include: { topic: true, trainer: true }
      })

      // Calculate deadlines
      const questionDeadline = addDays(new Date(session.scheduledAt), -7)
      const feedbackDeadline = addDays(new Date(session.scheduledAt), 1)

      return {
        ...session,
        context: {
          previousSession: previousSession ? {
            sessionNumber: previousSession.sessionNumber,
            topicTitle: previousSession.topic?.title,
            scheduledAt: previousSession.scheduledAt,
            trainerName: previousSession.trainer?.name
          } : null,
          nextSession: nextSession ? {
            sessionNumber: nextSession.sessionNumber,
            topicTitle: nextSession.topic?.title,
            scheduledAt: nextSession.scheduledAt,
            trainerName: nextSession.trainer?.name
          } : null
        },
        deadlines: {
          questions: questionDeadline,
          feedback: feedbackDeadline
        },
        actionRequired: {
          needsQuestions: session.questions.length === 0 && new Date() >= questionDeadline,
          needsFeedback: session.feedback.length === 0 && new Date() >= new Date(session.scheduledAt)
        }
      }
    }))

    res.json({
      success: true,
      data: sessionsWithContext
    })
  } catch (error) {
    console.error('Error fetching trainer sessions:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sessions',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/trainers/me/sessions/:sessionId/questions/save - Save questions WITHOUT submitting
router.post('/me/sessions/:sessionId/questions/save', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const { questions } = req.body // Array of { question: string }
    const trainerEmail = req.query.email as string || 'jean@trainer.com'

    // Validate
    if (!Array.isArray(questions) || questions.length !== 3) {
      return res.status(400).json({
        success: false,
        message: 'Exactly 3 questions are required'
      })
    }

    const trainer = await prisma.trainer.findUnique({
      where: { email: trainerEmail }
    })

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    // Verify session belongs to trainer
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { questions: true }
    })

    if (!session || session.trainerId !== trainer.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized for this session'
      })
    }

    // Delete existing questions if any (allow re-saving)
    if (session.questions.length > 0) {
      await prisma.question.deleteMany({
        where: { sessionId }
      })
    }

    // Create questions
    const createdQuestions = await Promise.all(
      questions.map((q: any) =>
        prisma.question.create({
          data: {
            sessionId,
            question: q.question,
            status: 'PENDING' // Not yet approved
          }
        })
      )
    )

    // Update session questionsStatus to SAVED_BY_TRAINER
    // This STOPS daily notifications for this session
    await prisma.session.update({
      where: { id: sessionId },
      data: { questionsStatus: 'SAVED_BY_TRAINER' }
    })

    res.status(201).json({
      success: true,
      data: createdQuestions,
      message: 'Questions saved successfully. You can edit them before submitting for approval. Daily reminders have been stopped.'
    })
  } catch (error) {
    console.error('Error saving questions:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to save questions',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/trainers/me/sessions/:sessionId/questions - Submit questions for a session
router.post('/me/sessions/:sessionId/questions', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const { questions } = req.body // Array of { question: string }
    const trainerEmail = req.query.email as string || 'jean@trainer.com'

    // Validate
    if (!Array.isArray(questions) || questions.length !== 3) {
      return res.status(400).json({
        success: false,
        message: 'Exactly 3 questions are required'
      })
    }

    const trainer = await prisma.trainer.findUnique({
      where: { email: trainerEmail }
    })

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    // Verify session belongs to trainer
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        questions: true
      }
    })

    if (!session || session.trainerId !== trainer.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized for this session'
      })
    }

    // Delete existing questions if any (allow re-submission)
    if (session.questions.length > 0) {
      await prisma.question.deleteMany({
        where: { sessionId }
      })
    }

    // Create questions
    const createdQuestions = await Promise.all(
      questions.map((q: any) =>
        prisma.question.create({
          data: {
            sessionId,
            question: q.question,
            status: 'PENDING' // Coordinator must approve
          }
        })
      )
    )

    // Update session questionsStatus to PENDING_APPROVAL
    // This also stops notifications (if not already stopped)
    await prisma.session.update({
      where: { id: sessionId },
      data: { questionsStatus: 'PENDING_APPROVAL' }
    })

    // TODO: Send notification to coordinator

    res.status(201).json({
      success: true,
      data: createdQuestions,
      message: 'Questions submitted successfully. Awaiting coordinator approval.'
    })
  } catch (error) {
    console.error('Error submitting questions:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit questions',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/trainers/me/sessions/:sessionId/feedback/save - Save feedback WITHOUT submitting
router.post('/me/sessions/:sessionId/feedback/save', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const { feedbacks } = req.body // Array of { participantId, content }
    const trainerEmail = req.query.email as string || 'jean@trainer.com'

    if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one feedback is required'
      })
    }

    const trainer = await prisma.trainer.findUnique({
      where: { email: trainerEmail }
    })

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    // Verify session belongs to trainer
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: {
          include: { participants: { where: { status: 'ACTIVE' } } }
        },
        feedback: true
      }
    })

    if (!session || session.trainerId !== trainer.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized for this session'
      })
    }

    // Delete existing feedback if any (allow re-saving)
    if (session.feedback.length > 0) {
      await prisma.feedback.deleteMany({
        where: { sessionId }
      })
    }

    // Create feedback for each participant
    const createdFeedbacks = await Promise.all(
      feedbacks.map((f: any) =>
        prisma.feedback.create({
          data: {
            sessionId,
            participantId: f.participantId,
            trainerId: trainer.id,
            content: f.content,
            status: 'PENDING' // Not yet approved
          }
        })
      )
    )

    // Update session feedbacksStatus to SAVED_BY_TRAINER
    // This STOPS daily notifications for this session
    await prisma.session.update({
      where: { id: sessionId },
      data: { feedbacksStatus: 'SAVED_BY_TRAINER' }
    })

    res.status(201).json({
      success: true,
      data: createdFeedbacks,
      message: `Feedback saved for ${createdFeedbacks.length} participant(s). You can edit them before submitting for approval. Daily reminders have been stopped.`
    })
  } catch (error) {
    console.error('Error saving feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to save feedback',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/trainers/me/sessions/:sessionId/feedback - Submit feedback for participants
router.post('/me/sessions/:sessionId/feedback', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const { feedbacks } = req.body // Array of { participantId, content }
    const trainerEmail = req.query.email as string || 'jean@trainer.com'

    if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one feedback is required'
      })
    }

    const trainer = await prisma.trainer.findUnique({
      where: { email: trainerEmail }
    })

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    // Verify session belongs to trainer
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: {
          include: { participants: { where: { status: 'ACTIVE' } } }
        },
        feedback: true
      }
    })

    if (!session || session.trainerId !== trainer.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized for this session'
      })
    }

    // Delete existing feedback if any (allow re-submission)
    if (session.feedback.length > 0) {
      await prisma.feedback.deleteMany({
        where: { sessionId }
      })
    }

    // Create feedback for each participant
    const createdFeedbacks = await Promise.all(
      feedbacks.map((f: any) =>
        prisma.feedback.create({
          data: {
            sessionId,
            participantId: f.participantId,
            trainerId: trainer.id,
            content: f.content,
            status: 'PENDING' // Coordinator must approve
          }
        })
      )
    )

    // Update session feedbacksStatus to PENDING_APPROVAL
    // This also stops notifications (if not already stopped)
    await prisma.session.update({
      where: { id: sessionId },
      data: { feedbacksStatus: 'PENDING_APPROVAL' }
    })

    // TODO: Send notification to coordinator

    res.status(201).json({
      success: true,
      data: createdFeedbacks,
      message: `Feedback submitted for ${createdFeedbacks.length} participant(s). Awaiting coordinator approval.`
    })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: getErrorMessage(error)
    })
  }
})

// ==================== ADMIN ENDPOINTS (For coordinators) ====================

// GET /api/trainers - Get all trainers from database
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, isActive } = req.query

    const where: any = {}

    if (isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    const trainers = await prisma.trainer.findMany({
      where,
      include: {
        sessions: {
          select: { id: true }
        }
      },
      orderBy: { name: 'asc' }
    })

    // Map to expected format
    const mappedTrainers = trainers.map(t => ({
      ...t,
      status: t.isActive ? 'ACTIVE' : 'INACTIVE',
      sessionsCount: t.sessions.length
    }))

    res.json({
      success: true,
      data: mappedTrainers,
      total: mappedTrainers.length
    })
  } catch (error) {
    console.error('Error fetching trainers:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainers',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/trainers/:id - Get trainer by ID from database
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const trainer = await prisma.trainer.findUnique({
      where: { id },
      include: {
        sessions: {
          include: {
            roundtable: { include: { client: true } },
            topic: true
          }
        }
      }
    })

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    res.json({
      success: true,
      data: {
        ...trainer,
        status: trainer.isActive ? 'ACTIVE' : 'INACTIVE',
        sessionsCount: trainer.sessions.length
      }
    })
  } catch (error) {
    console.error('Error fetching trainer:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/trainers - Create new trainer in database
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      expertise,
      languages,
      hourlyRate,
      availability,
      notes,
      isActive = true
    } = req.body

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      })
    }

    // Check if trainer with this email already exists
    const existing = await prisma.trainer.findUnique({
      where: { email }
    })

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A trainer with this email already exists'
      })
    }

    const trainer = await prisma.trainer.create({
      data: {
        name,
        email,
        phone: phone || null,
        expertise: expertise || [],
        languages: languages || [],
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        availability: availability || null,
        notes: notes || null,
        isActive
      }
    })

    res.status(201).json({
      success: true,
      data: trainer,
      message: 'Trainer created successfully'
    })
  } catch (error) {
    console.error('Error creating trainer:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create trainer',
      error: getErrorMessage(error)
    })
  }
})

// PUT /api/trainers/:id - Update trainer in database
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const existing = await prisma.trainer.findUnique({ where: { id } })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    const updateData: any = {}
    if (req.body.name !== undefined) updateData.name = req.body.name
    if (req.body.email !== undefined) updateData.email = req.body.email
    if (req.body.phone !== undefined) updateData.phone = req.body.phone
    if (req.body.expertise !== undefined) updateData.expertise = req.body.expertise
    if (req.body.languages !== undefined) updateData.languages = req.body.languages
    if (req.body.hourlyRate !== undefined) updateData.hourlyRate = parseFloat(req.body.hourlyRate) || null
    if (req.body.availability !== undefined) updateData.availability = req.body.availability
    if (req.body.notes !== undefined) updateData.notes = req.body.notes
    if (req.body.rating !== undefined) updateData.rating = parseFloat(req.body.rating) || 0
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive
    if (req.body.status !== undefined) updateData.isActive = req.body.status === 'ACTIVE'

    const trainer = await prisma.trainer.update({
      where: { id },
      data: updateData
    })

    res.json({
      success: true,
      data: trainer,
      message: 'Trainer updated successfully'
    })
  } catch (error) {
    console.error('Error updating trainer:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update trainer',
      error: getErrorMessage(error)
    })
  }
})

// DELETE /api/trainers/:id - Delete trainer from database
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const existing = await prisma.trainer.findUnique({
      where: { id },
      include: { sessions: true }
    })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    // Check if trainer has any sessions
    if (existing.sessions.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete trainer with assigned sessions. Deactivate instead.'
      })
    }

    await prisma.trainer.delete({ where: { id } })

    res.json({
      success: true,
      message: 'Trainer deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting trainer:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete trainer',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/trainers/stats/overview - Get trainer statistics from database
router.get('/stats/overview', async (req: Request, res: Response) => {
  try {
    const [total, active, inactive] = await Promise.all([
      prisma.trainer.count(),
      prisma.trainer.count({ where: { isActive: true } }),
      prisma.trainer.count({ where: { isActive: false } })
    ])

    const sessionsCount = await prisma.session.count()

    res.json({
      success: true,
      data: {
        total,
        active,
        inactive,
        unavailable: 0,
        totalSessions: sessionsCount
      }
    })
  } catch (error) {
    console.error('Error fetching trainer stats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer statistics',
      error: getErrorMessage(error)
    })
  }
})

// ==================== AI & QUESTION LIBRARY ENDPOINTS ====================

// GET /api/trainers/sessions/:sessionId/ai-suggestions
router.get('/sessions/:sessionId/ai-suggestions', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const trainerEmail = req.query.email as string

    if (!trainerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Trainer email is required'
      })
    }

    // Verify trainer is assigned to this session
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { trainer: true }
    })

    if (!session || session.trainer?.email !== trainerEmail) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this session'
      })
    }

    // Dynamic import to avoid circular dependencies
    const { AIQuestionService } = await import('../services/AIQuestionService')
    const aiService = new AIQuestionService()

    // Check rate limit
    const rateLimit = await aiService.checkTrainerRateLimit(trainerEmail)
    if (!rateLimit.allowed) {
      return res.status(429).json({
        success: false,
        message: `Daily AI suggestion limit reached. You have used all ${rateLimit.dailyLimit} requests for today.`,
        data: rateLimit
      })
    }

    // Generate suggestions
    const suggestions = await aiService.generateQuestionSuggestions(sessionId, {
      count: 3,
      useCache: true
    })

    res.json({
      success: true,
      data: {
        suggestions,
        rateLimit: {
          remaining: rateLimit.remainingRequests,
          dailyLimit: rateLimit.dailyLimit
        }
      }
    })
  } catch (error) {
    console.error('Error generating AI suggestions:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI suggestions',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/trainers/sessions/:sessionId/question-library
router.get('/sessions/:sessionId/question-library', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const minRating = req.query.minRating ? parseFloat(req.query.minRating as string) : 3.5
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20

    // Get session topic
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { topic: true }
    })

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      })
    }

    const { QuestionService } = await import('../services/QuestionService')
    const questionService = new QuestionService()

    const library = await questionService.getQuestionLibrary({
      topicId: session.topic?.id,
      minRating,
      limit
    })

    res.json({
      success: true,
      data: {
        questions: library,
        topic: session.topic,
        filters: {
          minRating,
          limit
        }
      }
    })
  } catch (error) {
    console.error('Error fetching question library:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch question library',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/trainers/sessions/:sessionId/limits
router.get('/sessions/:sessionId/limits', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: {
          select: {
            minQuestionsPerSession: true,
            maxQuestionsPerSession: true,
            minFeedbackItemsPerParticipant: true,
            maxFeedbackItemsPerParticipant: true
          }
        }
      }
    })

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      })
    }

    res.json({
      success: true,
      data: {
        questions: {
          min: session.roundtable.minQuestionsPerSession,
          max: session.roundtable.maxQuestionsPerSession
        },
        feedback: {
          min: session.roundtable.minFeedbackItemsPerParticipant,
          max: session.roundtable.maxFeedbackItemsPerParticipant
        }
      }
    })
  } catch (error) {
    console.error('Error fetching session limits:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch session limits',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/trainers/sessions/:sessionId/questions - Submit questions with dynamic count
router.post('/sessions/:sessionId/questions', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const { questions, trainerId } = req.body

    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: 'Questions array is required'
      })
    }

    if (!trainerId) {
      return res.status(400).json({
        success: false,
        message: 'Trainer ID is required'
      })
    }

    const { QuestionService } = await import('../services/QuestionService')
    const questionService = new QuestionService()

    const result = await questionService.submitQuestionsForSession({
      questions: questions.map((q: any) => ({
        question: typeof q === 'string' ? q : q.question,
        source: typeof q === 'object' ? q.source : 'MANUAL',
        aiPromptUsed: typeof q === 'object' ? q.aiPromptUsed : undefined
      })),
      trainerId,
      sessionId
    })

    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error submitting questions:', error)
    res.status(400).json({
      success: false,
      message: getErrorMessage(error)
    })
  }
})

// POST /api/trainers/sessions/:sessionId/feedback - Submit multiple feedback items
router.post('/sessions/:sessionId/feedback', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    const { feedbackItems, trainerId } = req.body

    if (!feedbackItems || !Array.isArray(feedbackItems)) {
      return res.status(400).json({
        success: false,
        message: 'Feedback items array is required'
      })
    }

    if (!trainerId) {
      return res.status(400).json({
        success: false,
        message: 'Trainer ID is required'
      })
    }

    // Verify session and get roundtable limits
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: {
          select: {
            minFeedbackItemsPerParticipant: true,
            maxFeedbackItemsPerParticipant: true,
            participants: { where: { status: 'ACTIVE' } }
          }
        }
      }
    })

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      })
    }

    // Group feedback by participant and validate counts
    const feedbackByParticipant = feedbackItems.reduce((acc: any, item: any) => {
      if (!acc[item.participantId]) {
        acc[item.participantId] = []
      }
      acc[item.participantId].push(item)
      return acc
    }, {})

    const min = session.roundtable.minFeedbackItemsPerParticipant
    const max = session.roundtable.maxFeedbackItemsPerParticipant

    // Validate each participant has min-max feedback items
    for (const participantId in feedbackByParticipant) {
      const count = feedbackByParticipant[participantId].length
      if (count < min) {
        return res.status(400).json({
          success: false,
          message: `Minimum ${min} feedback item(s) required per participant`
        })
      }
      if (count > max) {
        return res.status(400).json({
          success: false,
          message: `Maximum ${max} feedback items allowed per participant`
        })
      }
    }

    // Delete existing feedback for this session
    await prisma.feedback.deleteMany({
      where: { sessionId }
    })

    // Create new feedback items
    const createdFeedback = await Promise.all(
      feedbackItems.map((item: any, index: number) =>
        prisma.feedback.create({
          data: {
            content: item.content,
            sessionId,
            participantId: item.participantId,
            trainerId,
            feedbackType: item.feedbackType || 'GENERAL',
            orderIndex: item.orderIndex || index,
            status: 'PENDING'
          }
        })
      )
    )

    // Update session status
    await prisma.session.update({
      where: { id: sessionId },
      data: { feedbacksStatus: 'PENDING_APPROVAL' }
    })

    res.json({
      success: true,
      data: {
        feedbackSubmitted: createdFeedback.length,
        feedback: createdFeedback
      }
    })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    res.status(400).json({
      success: false,
      message: getErrorMessage(error)
    })
  }
})

export default router