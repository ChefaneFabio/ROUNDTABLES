import { Router, Request, Response } from 'express'
import { getErrorMessage } from '../utils/errorHandler'

const router = Router()

interface FeedbackItem {
  id: string
  roundtableId: string
  roundtableName: string
  sessionId: string
  sessionTitle: string
  participantId: string
  participantName: string
  participantEmail: string
  trainerName: string
  type: 'SESSION' | 'TRAINER' | 'CONTENT' | 'LOGISTICS' | 'OVERALL'
  category: 'POSITIVE' | 'NEGATIVE' | 'SUGGESTION' | 'QUESTION'
  status: 'PENDING' | 'REVIEWED' | 'ADDRESSED' | 'DISMISSED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  subject: string
  message: string
  rating?: number
  isAnonymous: boolean
  createdAt: string
  reviewedAt?: string
  reviewedBy?: string
  response?: string
  actionTaken?: string
  tags: string[]
}

interface FeedbackStats {
  total: number
  pending: number
  reviewed: number
  averageRating: number
  byType: Record<string, number>
  byCategory: Record<string, number>
  byPriority: Record<string, number>
  recentTrends: {
    thisWeek: number
    lastWeek: number
    thisMonth: number
    lastMonth: number
  }
}

// Mock data for development
const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    roundtableId: '1',
    roundtableName: 'Leadership Training Q1',
    sessionId: '1',
    sessionTitle: 'The Art of Negotiation',
    participantId: '1',
    participantName: 'Anna Bianchi',
    participantEmail: 'anna.bianchi@fastweb.it',
    trainerName: 'Marco Rossi',
    type: 'SESSION',
    category: 'POSITIVE',
    status: 'REVIEWED',
    priority: 'MEDIUM',
    subject: 'Excellent session on negotiation tactics',
    message: 'The role-playing exercises were particularly helpful. I learned practical techniques I can immediately apply in my work.',
    rating: 5,
    isAnonymous: false,
    createdAt: '2024-01-20T16:30:00Z',
    reviewedAt: '2024-01-21T09:15:00Z',
    reviewedBy: 'Admin',
    response: 'Thank you for the positive feedback! We\'ll continue to include more practical exercises.',
    actionTaken: 'Shared feedback with trainer',
    tags: ['negotiation', 'role-playing', 'practical']
  },
  {
    id: '2',
    roundtableId: '1',
    roundtableName: 'Leadership Training Q1',
    sessionId: '2',
    sessionTitle: 'Effective Leadership',
    participantId: '2',
    participantName: 'Giuseppe Verde',
    participantEmail: 'giuseppe.verde@fastweb.it',
    trainerName: 'Laura Bianchi',
    type: 'CONTENT',
    category: 'SUGGESTION',
    status: 'PENDING',
    priority: 'HIGH',
    subject: 'More industry-specific examples needed',
    message: 'The content is good but would benefit from more examples specific to the telecommunications industry.',
    rating: 4,
    isAnonymous: false,
    createdAt: '2024-01-21T11:45:00Z',
    tags: ['content', 'industry-specific', 'telecommunications']
  },
  {
    id: '3',
    roundtableId: '2',
    roundtableName: 'Innovation Workshop',
    sessionId: '3',
    sessionTitle: 'Creative Problem Solving',
    participantId: '3',
    participantName: 'Anonymous',
    participantEmail: '',
    trainerName: 'Marco Rossi',
    type: 'TRAINER',
    category: 'NEGATIVE',
    status: 'PENDING',
    priority: 'URGENT',
    subject: 'Trainer seemed unprepared',
    message: 'The trainer appeared to be reading from slides and couldn\'t answer specific questions about implementation.',
    rating: 2,
    isAnonymous: true,
    createdAt: '2024-01-21T14:20:00Z',
    tags: ['trainer', 'preparation', 'implementation']
  }
]

// GET /api/feedback - Get all feedback with filtering
router.get('/', (req: Request, res: Response) => {
  try {
    const {
      status,
      type,
      category,
      priority,
      roundtableId,
      trainerName,
      startDate,
      endDate,
      page = 1,
      limit = 10
    } = req.query

    let filteredFeedback = [...mockFeedback]

    // Apply filters
    if (status && status !== 'all') {
      filteredFeedback = filteredFeedback.filter(f => f.status === status)
    }

    if (type && type !== 'all') {
      filteredFeedback = filteredFeedback.filter(f => f.type === type)
    }

    if (category && category !== 'all') {
      filteredFeedback = filteredFeedback.filter(f => f.category === category)
    }

    if (priority && priority !== 'all') {
      filteredFeedback = filteredFeedback.filter(f => f.priority === priority)
    }

    if (roundtableId) {
      filteredFeedback = filteredFeedback.filter(f => f.roundtableId === roundtableId)
    }

    if (trainerName) {
      filteredFeedback = filteredFeedback.filter(f => 
        f.trainerName.toLowerCase().includes((trainerName as string).toLowerCase())
      )
    }

    if (startDate) {
      filteredFeedback = filteredFeedback.filter(f => 
        new Date(f.createdAt) >= new Date(startDate as string)
      )
    }

    if (endDate) {
      filteredFeedback = filteredFeedback.filter(f => 
        new Date(f.createdAt) <= new Date(endDate as string)
      )
    }

    // Sort by creation date (newest first)
    filteredFeedback.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Pagination
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedFeedback = filteredFeedback.slice(startIndex, endIndex)

    res.json({
      success: true,
      data: paginatedFeedback,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredFeedback.length,
        pages: Math.ceil(filteredFeedback.length / limitNum)
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/feedback/:id - Get specific feedback item
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const feedback = mockFeedback.find(f => f.id === id)

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      })
    }

    res.json({
      success: true,
      data: feedback
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/feedback - Create new feedback
router.post('/', (req: Request, res: Response) => {
  try {
    const {
      roundtableId,
      sessionId,
      participantId,
      type,
      category,
      priority = 'MEDIUM',
      subject,
      message,
      rating,
      isAnonymous = false,
      tags = []
    } = req.body

    // Validation
    if (!roundtableId || !sessionId || !participantId || !type || !category || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: roundtableId, sessionId, participantId, type, category, subject, message'
      })
    }

    const newFeedback: FeedbackItem = {
      id: (mockFeedback.length + 1).toString(),
      roundtableId,
      roundtableName: 'Leadership Training Q1', // Would be fetched from DB
      sessionId,
      sessionTitle: 'Session Title', // Would be fetched from DB
      participantId,
      participantName: isAnonymous ? 'Anonymous' : 'Participant Name', // Would be fetched from DB
      participantEmail: isAnonymous ? '' : 'participant@email.com', // Would be fetched from DB
      trainerName: 'Trainer Name', // Would be fetched from DB
      type,
      category,
      status: 'PENDING',
      priority,
      subject,
      message,
      rating,
      isAnonymous,
      createdAt: new Date().toISOString(),
      tags
    }

    mockFeedback.push(newFeedback)

    res.status(201).json({
      success: true,
      data: newFeedback,
      message: 'Feedback submitted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: getErrorMessage(error)
    })
  }
})

// PUT /api/feedback/:id - Update feedback (review, respond, etc.)
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const feedbackIndex = mockFeedback.findIndex(f => f.id === id)

    if (feedbackIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      })
    }

    const updatedFeedback = {
      ...mockFeedback[feedbackIndex],
      ...req.body,
      id // Ensure ID doesn't change
    }

    // If status is being changed to reviewed, add reviewedAt timestamp
    if (req.body.status === 'REVIEWED' && !mockFeedback[feedbackIndex].reviewedAt) {
      updatedFeedback.reviewedAt = new Date().toISOString()
    }

    mockFeedback[feedbackIndex] = updatedFeedback

    res.json({
      success: true,
      data: updatedFeedback,
      message: 'Feedback updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update feedback',
      error: getErrorMessage(error)
    })
  }
})

// DELETE /api/feedback/:id - Delete feedback
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const feedbackIndex = mockFeedback.findIndex(f => f.id === id)

    if (feedbackIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      })
    }

    const deletedFeedback = mockFeedback.splice(feedbackIndex, 1)[0]

    res.json({
      success: true,
      data: deletedFeedback,
      message: 'Feedback deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/feedback/stats/overview - Get feedback statistics
router.get('/stats/overview', (req: Request, res: Response) => {
  try {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

    const stats: FeedbackStats = {
      total: mockFeedback.length,
      pending: mockFeedback.filter(f => f.status === 'PENDING').length,
      reviewed: mockFeedback.filter(f => f.status === 'REVIEWED').length,
      averageRating: mockFeedback
        .filter(f => f.rating)
        .reduce((sum, f) => sum + (f.rating || 0), 0) / 
        mockFeedback.filter(f => f.rating).length,
      byType: {
        SESSION: mockFeedback.filter(f => f.type === 'SESSION').length,
        TRAINER: mockFeedback.filter(f => f.type === 'TRAINER').length,
        CONTENT: mockFeedback.filter(f => f.type === 'CONTENT').length,
        LOGISTICS: mockFeedback.filter(f => f.type === 'LOGISTICS').length,
        OVERALL: mockFeedback.filter(f => f.type === 'OVERALL').length
      },
      byCategory: {
        POSITIVE: mockFeedback.filter(f => f.category === 'POSITIVE').length,
        NEGATIVE: mockFeedback.filter(f => f.category === 'NEGATIVE').length,
        SUGGESTION: mockFeedback.filter(f => f.category === 'SUGGESTION').length,
        QUESTION: mockFeedback.filter(f => f.category === 'QUESTION').length
      },
      byPriority: {
        LOW: mockFeedback.filter(f => f.priority === 'LOW').length,
        MEDIUM: mockFeedback.filter(f => f.priority === 'MEDIUM').length,
        HIGH: mockFeedback.filter(f => f.priority === 'HIGH').length,
        URGENT: mockFeedback.filter(f => f.priority === 'URGENT').length
      },
      recentTrends: {
        thisWeek: mockFeedback.filter(f => new Date(f.createdAt) >= oneWeekAgo).length,
        lastWeek: mockFeedback.filter(f => 
          new Date(f.createdAt) >= twoWeeksAgo && new Date(f.createdAt) < oneWeekAgo
        ).length,
        thisMonth: mockFeedback.filter(f => new Date(f.createdAt) >= oneMonthAgo).length,
        lastMonth: mockFeedback.filter(f => 
          new Date(f.createdAt) >= twoMonthsAgo && new Date(f.createdAt) < oneMonthAgo
        ).length
      }
    }

    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback statistics',
      error: getErrorMessage(error)
    })
  }
})

// PUT /api/feedback/bulk/update - Bulk update feedback status
router.put('/bulk/update', (req: Request, res: Response) => {
  try {
    const { ids, updates } = req.body

    if (!Array.isArray(ids) || !updates) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request: ids must be an array and updates object required'
      })
    }

    const updatedFeedback = []

    for (const id of ids) {
      const feedbackIndex = mockFeedback.findIndex(f => f.id === id)
      if (feedbackIndex !== -1) {
        mockFeedback[feedbackIndex] = {
          ...mockFeedback[feedbackIndex],
          ...updates
        }
        
        // If status is being changed to reviewed, add reviewedAt timestamp
        if (updates.status === 'REVIEWED' && !mockFeedback[feedbackIndex].reviewedAt) {
          mockFeedback[feedbackIndex].reviewedAt = new Date().toISOString()
        }
        
        updatedFeedback.push(mockFeedback[feedbackIndex])
      }
    }

    res.json({
      success: true,
      data: updatedFeedback,
      message: `Updated ${updatedFeedback.length} feedback items`
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to bulk update feedback',
      error: getErrorMessage(error)
    })
  }
})

export default router