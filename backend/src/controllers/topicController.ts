import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { VotingService } from '../services/VotingService'

const router = Router()
const prisma = new PrismaClient()
const votingService = new VotingService()

// Validation schemas
const voteSchema = Joi.object({
  participantEmail: Joi.string().email().required(),
  topicIds: Joi.array().items(Joi.string()).length(8).required()
})

// Get all topics for a roundtable
router.get('/roundtable/:roundtableId', async (req: Request, res: Response) => {
  try {
    const { roundtableId } = req.params

    const topics = await prisma.topic.findMany({
      where: { roundtableId },
      include: {
        votes: {
          include: {
            participant: { select: { name: true, email: true } }
          }
        }
      },
      orderBy: { title: 'asc' }
    })

    // Add vote count to each topic
    const topicsWithVotes = topics.map(topic => ({
      ...topic,
      voteCount: topic.votes.length,
      votes: topic.votes // Include vote details if needed
    }))

    res.json({ success: true, data: topicsWithVotes })
  } catch (error) {
    console.error('Error fetching topics:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get voting page data (public endpoint)
router.get('/vote/:roundtableId', async (req: Request, res: Response) => {
  try {
    const { roundtableId } = req.params
    const { email } = req.query

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email parameter is required' })
    }

    const votingData = await votingService.getVotingData(roundtableId, String(email))

    res.json({ success: true, data: votingData })
  } catch (error) {
    console.error('Error fetching voting data:', error)
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
})

// Submit votes (public endpoint)
router.post('/vote/:roundtableId', validateRequest(voteSchema), async (req: Request, res: Response) => {
  try {
    const { roundtableId } = req.params
    const { participantEmail, topicIds } = req.body

    const result = await votingService.submitVotes(roundtableId, participantEmail, topicIds)

    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Error submitting votes:', error)
    if (error instanceof Error) {
      res.status(400).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
})

// Get voting results for a roundtable
router.get('/results/:roundtableId', async (req: Request, res: Response) => {
  try {
    const { roundtableId } = req.params

    const results = await votingService.getVotingResults(roundtableId)

    res.json({ success: true, data: results })
  } catch (error) {
    console.error('Error fetching voting results:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Check if participant has voted
router.get('/check-vote/:roundtableId/:email', async (req: Request, res: Response) => {
  try {
    const { roundtableId, email } = req.params

    const hasVoted = await votingService.hasParticipantVoted(roundtableId, email)

    res.json({ success: true, data: { hasVoted } })
  } catch (error) {
    console.error('Error checking vote status:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Delete all votes for a participant (admin only)
router.delete('/votes/:roundtableId/:participantId', async (req: Request, res: Response) => {
  try {
    const { roundtableId, participantId } = req.params

    await prisma.topicVote.deleteMany({
      where: {
        roundtableId,
        participantId
      }
    })

    res.json({ success: true, message: 'Votes deleted successfully' })
  } catch (error) {
    console.error('Error deleting votes:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router