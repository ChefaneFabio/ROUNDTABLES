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

// Mock data for development
const mockTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    email: 'marco.rossi@makaroundtables.com',
    specialties: ['Leadership', 'Team Management', 'Communication'],
    status: 'ACTIVE',
    rating: 4.8,
    sessionsCount: 24,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    joinedDate: '2023-06-15',
    lastActive: '2024-01-21T10:30:00Z',
    bio: 'Experienced leadership coach with 10+ years in corporate training',
    phone: '+39 345 678 9012',
    hourlyRate: 85
  },
  {
    id: '2',
    name: 'Laura Bianchi',
    email: 'laura.bianchi@makaroundtables.com',
    specialties: ['Negotiation', 'Sales', 'Conflict Resolution'],
    status: 'ACTIVE',
    rating: 4.9,
    sessionsCount: 18,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    joinedDate: '2023-08-20',
    lastActive: '2024-01-20T15:45:00Z',
    bio: 'Expert negotiator and sales trainer',
    phone: '+39 346 789 0123',
    hourlyRate: 90
  }
]

// GET /api/trainers - Get all trainers
router.get('/', (req: Request, res: Response) => {
  try {
    const { status, specialty, availability } = req.query

    let filteredTrainers = [...mockTrainers]

    // Filter by status
    if (status && status !== 'all') {
      filteredTrainers = filteredTrainers.filter(trainer => 
        trainer.status === status
      )
    }

    // Filter by specialty
    if (specialty && specialty !== 'all') {
      filteredTrainers = filteredTrainers.filter(trainer =>
        trainer.specialties.some(s => 
          s.toLowerCase().includes((specialty as string).toLowerCase())
        )
      )
    }

    // Filter by availability
    if (availability && availability !== 'all') {
      const day = availability as keyof Trainer['availability']
      filteredTrainers = filteredTrainers.filter(trainer =>
        trainer.availability[day]
      )
    }

    res.json({
      success: true,
      data: filteredTrainers,
      total: filteredTrainers.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainers',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/trainers/:id - Get trainer by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const trainer = mockTrainers.find(t => t.id === id)

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    res.json({
      success: true,
      data: trainer
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/trainers - Create new trainer
router.post('/', (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      specialties,
      bio,
      phone,
      hourlyRate,
      availability
    } = req.body

    // Validation
    if (!name || !email || !specialties || !Array.isArray(specialties)) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and specialties are required'
      })
    }

    const newTrainer: Trainer = {
      id: (mockTrainers.length + 1).toString(),
      name,
      email,
      specialties,
      status: 'ACTIVE',
      rating: 0,
      sessionsCount: 0,
      availability: availability || {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false
      },
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
      bio,
      phone,
      hourlyRate
    }

    mockTrainers.push(newTrainer)

    res.status(201).json({
      success: true,
      data: newTrainer,
      message: 'Trainer created successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create trainer',
      error: getErrorMessage(error)
    })
  }
})

// PUT /api/trainers/:id - Update trainer
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const trainerIndex = mockTrainers.findIndex(t => t.id === id)

    if (trainerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    const updatedTrainer = {
      ...mockTrainers[trainerIndex],
      ...req.body,
      id // Ensure ID doesn't change
    }

    mockTrainers[trainerIndex] = updatedTrainer

    res.json({
      success: true,
      data: updatedTrainer,
      message: 'Trainer updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update trainer',
      error: getErrorMessage(error)
    })
  }
})

// DELETE /api/trainers/:id - Delete trainer
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const trainerIndex = mockTrainers.findIndex(t => t.id === id)

    if (trainerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    const deletedTrainer = mockTrainers.splice(trainerIndex, 1)[0]

    res.json({
      success: true,
      data: deletedTrainer,
      message: 'Trainer deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete trainer',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/trainers/stats/overview - Get trainer statistics
router.get('/stats/overview', (req: Request, res: Response) => {
  try {
    const stats = {
      total: mockTrainers.length,
      active: mockTrainers.filter(t => t.status === 'ACTIVE').length,
      inactive: mockTrainers.filter(t => t.status === 'INACTIVE').length,
      unavailable: mockTrainers.filter(t => t.status === 'UNAVAILABLE').length,
      averageRating: mockTrainers.reduce((sum, t) => sum + t.rating, 0) / mockTrainers.length,
      totalSessions: mockTrainers.reduce((sum, t) => sum + t.sessionsCount, 0),
      specialties: [...new Set(mockTrainers.flatMap(t => t.specialties))],
      averageHourlyRate: mockTrainers
        .filter(t => t.hourlyRate)
        .reduce((sum, t) => sum + (t.hourlyRate || 0), 0) / 
        mockTrainers.filter(t => t.hourlyRate).length
    }

    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
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