import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get dashboard statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const [
      totalRoundtables,
      activeRoundtables,
      totalParticipants,
      upcomingSessions,
      completedSessions,
      pendingFeedback
    ] = await Promise.all([
      // Total roundtables
      prisma.roundtable.count(),
      
      // Active roundtables (not completed)
      prisma.roundtable.count({
        where: { 
          status: { not: 'COMPLETED' }
        }
      }),
      
      // Total participants
      prisma.participant.count({
        where: { status: 'ACTIVE' }
      }),
      
      // Upcoming sessions
      prisma.session.count({
        where: {
          scheduledAt: { gte: new Date() },
          status: 'SCHEDULED'
        }
      }),
      
      // Completed sessions
      prisma.session.count({
        where: { status: 'COMPLETED' }
      }),
      
      // Pending feedback
      prisma.feedback.count({
        where: { status: 'PENDING' }
      })
    ])

    res.json({
      totalRoundtables,
      activeRoundtables,
      totalParticipants,
      upcomingSessions,
      completedSessions,
      pendingFeedback
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router