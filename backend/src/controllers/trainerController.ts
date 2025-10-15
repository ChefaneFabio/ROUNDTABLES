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

    // Calculate stats
    const upcomingSessions = trainer.sessions.filter(s => new Date(s.scheduledAt) > new Date())
    const completedSessions = trainer.sessions.filter(s => s.status === 'COMPLETED' || s.status === 'FEEDBACK_SENT')
    const questionsPending = trainer.sessions.filter(s =>
      s.status === 'REMINDER_SENT' && s.questions.length === 0
    )
    const feedbackPending = trainer.sessions.filter(s =>
      (s.status === 'COMPLETED' || s.status === 'FEEDBACK_PENDING') && s.feedback.length === 0
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

    // Check if questions already exist
    if (session.questions.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Questions already submitted for this session'
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

    // Update session status
    await prisma.session.update({
      where: { id: sessionId },
      data: { status: 'QUESTIONS_REQUESTED' }
    })

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

    // Check if feedback already exists
    if (session.feedback.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Feedback already submitted for this session'
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

    // Update session status
    await prisma.session.update({
      where: { id: sessionId },
      data: { status: 'FEEDBACK_PENDING' }
    })

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

export default router