import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { VotingTokenService } from '../services/VotingTokenService'
import { auditLog } from '../services/AuditLogService'
import { votingLimiter } from '../middleware/rateLimiter'
import { sanitizeId } from '../utils/sanitize'

const router = Router()
const prisma = new PrismaClient()
const votingTokenService = new VotingTokenService()

/**
 * GET /api/forms/vote/:token
 * Validates voting token and redirects to Microsoft Forms with session data
 *
 * This is the entry point participants click from their email
 */
router.get('/vote/:token', votingLimiter, async (req: Request, res: Response) => {
  try {
    const token = sanitizeId(req.params.token)

    // Get the Forms URL from environment or roundtable config
    let formsUrl = process.env.MS_FORMS_VOTING_URL

    // Try to get roundtable-specific Forms URL
    try {
      const tokenData = await votingTokenService.verifyToken(token)

      // Use roundtable-specific URL if configured
      if (tokenData.roundtable.formsUrl) {
        formsUrl = tokenData.roundtable.formsUrl
      }

      if (!formsUrl) {
        return res.status(500).json({
          success: false,
          error: 'Microsoft Forms URL not configured. Please contact the administrator.'
        })
      }

      // Generate Forms integration URL with session
      const { url: redirectUrl, sessionId } = await votingTokenService.generateFormsIntegrationUrl(
        token,
        formsUrl
      )

      // Audit log
      await auditLog.log({
        action: 'token_verify',
        resource: 'voting_token',
        ipAddress: getIpAddress(req),
        userAgent: req.headers['user-agent'],
        result: 'success',
        metadata: {
          participantId: tokenData.participant.id,
          roundtableId: tokenData.roundtable.id,
          sessionId,
          redirected: 'microsoft_forms'
        }
      })

      // Redirect to Microsoft Forms
      console.log(`Redirecting to Microsoft Forms: ${redirectUrl}`)
      res.redirect(redirectUrl)

    } catch (verifyError) {
      // Token verification failed
      const errorMessage = verifyError instanceof Error ? verifyError.message : 'Invalid token'

      await auditLog.log({
        action: 'token_verify',
        resource: 'voting_token',
        ipAddress: getIpAddress(req),
        userAgent: req.headers['user-agent'],
        result: 'failure',
        errorMessage
      })

      return res.status(400).json({
        success: false,
        error: errorMessage
      })
    }

  } catch (error) {
    console.error('Error generating Forms URL:', error)

    res.status(500).json({
      success: false,
      error: 'Failed to process voting link. Please try again or contact support.'
    })
  }
})

/**
 * POST /api/forms/webhook/vote
 * Receives Microsoft Forms responses via Power Automate webhook
 *
 * Expected payload:
 * {
 *   "sessionId": "abc123",
 *   "responses": {
 *     "topic_selections": ["topic_id_1", "topic_id_2", ...]
 *   }
 * }
 */
router.post('/webhook/vote', votingLimiter, async (req: Request, res: Response) => {
  try {
    const { sessionId, responses } = req.body

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Missing sessionId in request'
      })
    }

    if (!responses) {
      return res.status(400).json({
        success: false,
        error: 'Missing responses in request'
      })
    }

    // Validate webhook signature if configured
    const signature = req.headers['x-ms-signature'] as string
    if (process.env.MS_FORMS_WEBHOOK_SECRET) {
      if (!validateWebhookSignature(signature, req.body, process.env.MS_FORMS_WEBHOOK_SECRET)) {
        await auditLog.log({
          action: 'vote',
          resource: 'topic',
          ipAddress: getIpAddress(req),
          result: 'failure',
          errorMessage: 'Invalid webhook signature'
        })

        return res.status(401).json({
          success: false,
          error: 'Unauthorized - Invalid signature'
        })
      }
    }

    // Validate session
    const session = await votingTokenService.validateFormsSession(sessionId)

    // Parse Microsoft Forms response to extract topic selections
    const topicIds = parseTopicSelections(responses, session.roundtable.topics)

    if (topicIds.length !== 8) {
      await auditLog.log({
        action: 'vote',
        resource: 'topic',
        ipAddress: getIpAddress(req),
        result: 'failure',
        errorMessage: `Invalid topic count: ${topicIds.length}, expected 8`,
        metadata: {
          sessionId,
          participantId: session.participantId,
          roundtableId: session.roundtableId
        }
      })

      return res.status(400).json({
        success: false,
        error: `Must select exactly 8 topics (received ${topicIds.length})`
      })
    }

    // Store votes in database
    await prisma.$transaction(async (tx) => {
      // Delete any existing votes for this participant
      await tx.topicVote.deleteMany({
        where: {
          participantId: session.participantId,
          roundtableId: session.roundtableId
        }
      })

      // Create new votes
      await tx.topicVote.createMany({
        data: topicIds.map(topicId => ({
          participantId: session.participantId,
          topicId,
          roundtableId: session.roundtableId
        }))
      })
    })

    // Mark session as used
    await votingTokenService.markSessionUsed(sessionId)

    // Mark original voting token as used
    await votingTokenService.markTokenAsUsed(session.token.token)

    // Audit log successful vote
    await auditLog.log({
      action: 'vote',
      resource: 'topic',
      ipAddress: getIpAddress(req),
      result: 'success',
      metadata: {
        sessionId,
        participantId: session.participantId,
        roundtableId: session.roundtableId,
        topicCount: topicIds.length,
        source: 'microsoft_forms'
      }
    })

    console.log(`Vote recorded successfully for session ${sessionId}`)

    res.json({
      success: true,
      message: 'Votes recorded successfully',
      data: {
        participantName: session.participant.name,
        roundtableName: session.roundtable.name,
        topicsSelected: topicIds.length
      }
    })

  } catch (error) {
    console.error('Error processing Forms webhook:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    await auditLog.log({
      action: 'vote',
      resource: 'topic',
      ipAddress: getIpAddress(req),
      result: 'failure',
      errorMessage,
      metadata: {
        sessionId: req.body.sessionId
      }
    })

    res.status(400).json({
      success: false,
      error: errorMessage
    })
  }
})

/**
 * GET /api/forms/session/:sessionId/status
 * Check status of a voting session
 * Useful for Microsoft Forms to check if session is still valid
 */
router.get('/session/:sessionId/status', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params

    const session = await prisma.votingSession.findUnique({
      where: { sessionId },
      include: {
        participant: { select: { name: true, email: true } },
        roundtable: { select: { name: true } }
      }
    })

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      })
    }

    const isExpired = session.expiresAt < new Date()
    const isValid = !session.isUsed && !isExpired

    res.json({
      success: true,
      data: {
        sessionId: session.sessionId,
        isValid,
        isUsed: session.isUsed,
        isExpired,
        expiresAt: session.expiresAt,
        participant: session.participant,
        roundtable: session.roundtable
      }
    })

  } catch (error) {
    console.error('Error checking session status:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to check session status'
    })
  }
})

/**
 * Validate webhook signature from Microsoft Power Automate
 */
function validateWebhookSignature(
  signature: string | undefined,
  body: any,
  secret: string
): boolean {
  if (!signature) return false

  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex')

  return hash === signature
}

/**
 * Parse Microsoft Forms response to extract topic selections
 *
 * Microsoft Forms can send responses in different formats:
 * - Single question with multiple checkboxes: { "question_id": ["topic_id_1", "topic_id_2"] }
 * - Multiple questions: { "q1": "topic_id_1", "q2": "topic_id_2" }
 * - Custom format based on Power Automate transformation
 */
function parseTopicSelections(responses: any, availableTopics: any[]): string[] {
  const selectedTopicIds: string[] = []

  // Strategy 1: Look for a field called "topic_selections" or "topics"
  if (responses.topic_selections) {
    const selections = Array.isArray(responses.topic_selections)
      ? responses.topic_selections
      : [responses.topic_selections]
    selectedTopicIds.push(...selections)
  } else if (responses.topics) {
    const selections = Array.isArray(responses.topics)
      ? responses.topics
      : [responses.topics]
    selectedTopicIds.push(...selections)
  } else {
    // Strategy 2: Iterate through all response fields and collect topic IDs
    for (const [key, value] of Object.entries(responses)) {
      if (Array.isArray(value)) {
        // Multiple selections
        selectedTopicIds.push(...(value as string[]))
      } else if (typeof value === 'string' && value.trim()) {
        // Single selection
        selectedTopicIds.push(value)
      }
    }
  }

  // Validate all IDs exist in available topics
  const topicIdSet = new Set(availableTopics.map(t => t.id))
  const validIds = selectedTopicIds.filter(id => topicIdSet.has(id))

  // Remove duplicates
  return Array.from(new Set(validIds))
}

/**
 * Extract IP address from request (considering proxies)
 */
function getIpAddress(req: Request): string {
  const forwarded = req.headers['x-forwarded-for']

  if (forwarded) {
    const ips = typeof forwarded === 'string' ? forwarded.split(',') : forwarded
    return ips[0].trim()
  }

  return req.ip || req.socket.remoteAddress || 'unknown'
}

export default router
