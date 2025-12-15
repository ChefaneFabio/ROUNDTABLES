import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { getErrorMessage } from '../utils/errorHandler'

const router = Router()
const prisma = new PrismaClient()

// GET /api/feedback - Get all feedback with filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      status,
      sessionId,
      roundtableId,
      trainerId,
      page = 1,
      limit = 10
    } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    // Build where clause
    const where: any = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (sessionId) {
      where.sessionId = sessionId
    }

    if (trainerId) {
      where.trainerId = trainerId
    }

    if (roundtableId) {
      where.session = {
        roundtableId: roundtableId
      }
    }

    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          session: {
            include: {
              topic: { select: { title: true } },
              roundtable: {
                include: {
                  client: { select: { company: true } }
                }
              }
            }
          },
          participant: {
            select: { id: true, name: true, email: true }
          },
          trainer: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      prisma.feedback.count({ where })
    ])

    res.json({
      success: true,
      data: feedbacks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    })
  } catch (error) {
    console.error('Error fetching feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/feedback/stats/overview - Get feedback statistics
router.get('/stats/overview', async (req: Request, res: Response) => {
  try {
    const [total, pending, approved, sent] = await Promise.all([
      prisma.feedback.count(),
      prisma.feedback.count({ where: { status: 'PENDING' } }),
      prisma.feedback.count({ where: { status: 'APPROVED' } }),
      prisma.feedback.count({ where: { status: 'SENT' } })
    ])

    res.json({
      success: true,
      data: {
        total,
        pending,
        approved,
        sent
      }
    })
  } catch (error) {
    console.error('Error fetching feedback stats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback statistics',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/feedback/:id - Get specific feedback item
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const feedback = await prisma.feedback.findUnique({
      where: { id },
      include: {
        session: {
          include: {
            topic: { select: { title: true } },
            roundtable: {
              include: {
                client: { select: { company: true } }
              }
            }
          }
        },
        participant: {
          select: { id: true, name: true, email: true }
        },
        trainer: {
          select: { id: true, name: true, email: true }
        }
      }
    })

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
    console.error('Error fetching feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/feedback - Create new feedback
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      sessionId,
      participantId,
      trainerId,
      content,
      feedbackType = 'GENERAL',
      orderIndex = 0
    } = req.body

    if (!sessionId || !participantId || !trainerId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: sessionId, participantId, trainerId, content'
      })
    }

    const feedback = await prisma.feedback.create({
      data: {
        sessionId,
        participantId,
        trainerId,
        content,
        feedbackType,
        orderIndex,
        status: 'PENDING'
      },
      include: {
        session: {
          include: {
            topic: { select: { title: true } },
            roundtable: {
              include: {
                client: { select: { company: true } }
              }
            }
          }
        },
        participant: {
          select: { id: true, name: true, email: true }
        },
        trainer: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    res.status(201).json({
      success: true,
      data: feedback,
      message: 'Feedback created successfully'
    })
  } catch (error) {
    console.error('Error creating feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create feedback',
      error: getErrorMessage(error)
    })
  }
})

// PUT /api/feedback/:id - Update feedback
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { content, status, reviewNotes } = req.body

    const existing = await prisma.feedback.findUnique({ where: { id } })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      })
    }

    const updateData: any = {}
    if (content !== undefined) updateData.content = content
    if (status !== undefined) updateData.status = status
    if (reviewNotes !== undefined) updateData.reviewNotes = reviewNotes

    // If status is being changed to SENT, add sentAt timestamp
    if (status === 'SENT' && !existing.sentAt) {
      updateData.sentAt = new Date()
    }

    const feedback = await prisma.feedback.update({
      where: { id },
      data: updateData,
      include: {
        session: {
          include: {
            topic: { select: { title: true } },
            roundtable: {
              include: {
                client: { select: { company: true } }
              }
            }
          }
        },
        participant: {
          select: { id: true, name: true, email: true }
        },
        trainer: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    res.json({
      success: true,
      data: feedback,
      message: 'Feedback updated successfully'
    })
  } catch (error) {
    console.error('Error updating feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update feedback',
      error: getErrorMessage(error)
    })
  }
})

// DELETE /api/feedback/:id - Delete feedback
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const existing = await prisma.feedback.findUnique({ where: { id } })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      })
    }

    await prisma.feedback.delete({ where: { id } })

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback',
      error: getErrorMessage(error)
    })
  }
})

export default router
