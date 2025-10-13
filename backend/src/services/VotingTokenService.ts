import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { addDays, addMinutes } from 'date-fns'

const prisma = new PrismaClient()

export class VotingTokenService {

  /**
   * Generate a secure random token
   */
  private generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  /**
   * Create voting tokens for all participants in a roundtable
   * Tokens are valid for 7 days by default
   */
  async createVotingTokensForRoundtable(
    roundtableId: string,
    expirationDays: number = 7
  ): Promise<number> {
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: {
        participants: {
          where: {
            status: { notIn: ['DROPPED_OUT', 'LEVEL_TEST_FAILED'] }
          }
        }
      }
    })

    if (!roundtable) {
      throw new Error('Roundtable not found')
    }

    if (roundtable.status !== 'TOPIC_VOTING') {
      throw new Error('Roundtable must be in TOPIC_VOTING status to generate tokens')
    }

    const expiresAt = addDays(new Date(), expirationDays)
    const tokens = []

    for (const participant of roundtable.participants) {
      // Check if participant already has an active token
      const existingToken = await prisma.votingToken.findFirst({
        where: {
          participantId: participant.id,
          roundtableId,
          expiresAt: { gt: new Date() },
          usedAt: null
        }
      })

      if (!existingToken) {
        const token = await prisma.votingToken.create({
          data: {
            token: this.generateSecureToken(),
            roundtableId,
            participantId: participant.id,
            expiresAt
          }
        })
        tokens.push(token)
      }
    }

    return tokens.length
  }

  /**
   * Verify a voting token and return participant/roundtable info
   */
  async verifyToken(token: string) {
    const votingToken = await prisma.votingToken.findUnique({
      where: { token },
      include: {
        participant: true,
        roundtable: {
          include: {
            topics: { orderBy: { title: 'asc' } }
          }
        }
      }
    })

    if (!votingToken) {
      throw new Error('Invalid voting token')
    }

    // Check if token is expired
    if (votingToken.expiresAt < new Date()) {
      throw new Error('This voting token has expired')
    }

    // Check if token has been used
    if (votingToken.usedAt) {
      throw new Error('This voting token has already been used')
    }

    // Check if roundtable is in voting phase
    if (votingToken.roundtable.status !== 'TOPIC_VOTING') {
      throw new Error('Voting is no longer open for this roundtable')
    }

    // Check if participant has already voted
    const hasVoted = await prisma.topicVote.findFirst({
      where: {
        participantId: votingToken.participantId,
        roundtableId: votingToken.roundtableId
      }
    })

    return {
      token: votingToken,
      participant: votingToken.participant,
      roundtable: votingToken.roundtable,
      hasAlreadyVoted: !!hasVoted,
      canVote: !hasVoted
    }
  }

  /**
   * Mark token as used after successful vote
   */
  async markTokenAsUsed(token: string): Promise<void> {
    await prisma.votingToken.update({
      where: { token },
      data: { usedAt: new Date() }
    })
  }

  /**
   * Get voting token for a specific participant
   */
  async getTokenForParticipant(
    participantId: string,
    roundtableId: string
  ): Promise<string | null> {
    const token = await prisma.votingToken.findFirst({
      where: {
        participantId,
        roundtableId,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    })

    return token ? token.token : null
  }

  /**
   * Revoke all tokens for a roundtable
   */
  async revokeTokensForRoundtable(roundtableId: string): Promise<number> {
    const result = await prisma.votingToken.deleteMany({
      where: {
        roundtableId,
        usedAt: null
      }
    })

    return result.count
  }

  /**
   * Clean up expired tokens
   * Should be run periodically via cron job
   */
  async cleanupExpiredTokens(): Promise<number> {
    const result = await prisma.votingToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    })

    console.log(`Cleaned up ${result.count} expired voting tokens`)
    return result.count
  }

  /**
   * Extend token expiration
   */
  async extendTokenExpiration(
    token: string,
    additionalDays: number = 7
  ): Promise<void> {
    const votingToken = await prisma.votingToken.findUnique({
      where: { token }
    })

    if (!votingToken) {
      throw new Error('Token not found')
    }

    if (votingToken.usedAt) {
      throw new Error('Cannot extend a used token')
    }

    const newExpiryDate = addDays(votingToken.expiresAt, additionalDays)

    await prisma.votingToken.update({
      where: { token },
      data: { expiresAt: newExpiryDate }
    })
  }

  /**
   * Get statistics for voting tokens
   */
  async getTokenStatistics(roundtableId: string) {
    const [total, used, expired, active] = await Promise.all([
      prisma.votingToken.count({
        where: { roundtableId }
      }),
      prisma.votingToken.count({
        where: {
          roundtableId,
          usedAt: { not: null }
        }
      }),
      prisma.votingToken.count({
        where: {
          roundtableId,
          expiresAt: { lt: new Date() },
          usedAt: null
        }
      }),
      prisma.votingToken.count({
        where: {
          roundtableId,
          expiresAt: { gt: new Date() },
          usedAt: null
        }
      })
    ])

    return {
      total,
      used,
      expired,
      active,
      usageRate: total > 0 ? Math.round((used / total) * 100) : 0
    }
  }

  // ==========================================
  // Microsoft Forms Integration Methods
  // ==========================================

  /**
   * Generate Microsoft Forms integration URL
   * Creates a short-lived session and redirects to MS Forms with pre-filled data
   */
  async generateFormsIntegrationUrl(
    token: string,
    formsUrl: string
  ): Promise<{ url: string; sessionId: string }> {
    // Verify token first
    const tokenData = await this.verifyToken(token)

    // Create a short-lived session for Microsoft Forms (30 minutes)
    const sessionId = crypto.randomBytes(16).toString('hex')

    await prisma.votingSession.create({
      data: {
        sessionId,
        tokenId: tokenData.token.id,
        participantId: tokenData.participant.id,
        roundtableId: tokenData.roundtable.id,
        expiresAt: addMinutes(new Date(), 30), // 30 min session
        isUsed: false
      }
    })

    // Build Microsoft Forms URL with pre-filled data
    const formsUrlWithParams = new URL(formsUrl)

    // Add query parameters that pre-fill form fields
    // These parameter names must match your Microsoft Form field IDs
    formsUrlWithParams.searchParams.set('entry.sessionId', sessionId)
    formsUrlWithParams.searchParams.set('entry.participantName', tokenData.participant.name)
    formsUrlWithParams.searchParams.set('entry.participantEmail', tokenData.participant.email)
    formsUrlWithParams.searchParams.set('entry.roundtableId', tokenData.roundtable.id)
    formsUrlWithParams.searchParams.set('entry.roundtableName', tokenData.roundtable.name)

    return {
      url: formsUrlWithParams.toString(),
      sessionId
    }
  }

  /**
   * Validate session from Microsoft Forms response
   * Ensures session is valid, not expired, and not already used
   */
  async validateFormsSession(sessionId: string) {
    const session = await prisma.votingSession.findUnique({
      where: { sessionId },
      include: {
        token: true,
        participant: true,
        roundtable: {
          include: {
            topics: {
              orderBy: { title: 'asc' }
            }
          }
        }
      }
    })

    if (!session) {
      throw new Error('Invalid session ID')
    }

    if (session.expiresAt < new Date()) {
      throw new Error('Session has expired. Please request a new voting link.')
    }

    if (session.isUsed) {
      throw new Error('This session has already been used')
    }

    // Also check if the original token is still valid
    if (session.token.expiresAt < new Date()) {
      throw new Error('Voting token has expired')
    }

    if (session.token.usedAt) {
      throw new Error('Voting token has already been used')
    }

    return session
  }

  /**
   * Mark session as used after vote is recorded
   */
  async markSessionUsed(sessionId: string): Promise<void> {
    await prisma.votingSession.update({
      where: { sessionId },
      data: {
        isUsed: true,
        usedAt: new Date()
      }
    })
  }

  /**
   * Get session statistics for a roundtable
   */
  async getSessionStatistics(roundtableId: string) {
    const [total, used, expired, active] = await Promise.all([
      prisma.votingSession.count({
        where: { roundtableId }
      }),
      prisma.votingSession.count({
        where: {
          roundtableId,
          isUsed: true
        }
      }),
      prisma.votingSession.count({
        where: {
          roundtableId,
          expiresAt: { lt: new Date() },
          isUsed: false
        }
      }),
      prisma.votingSession.count({
        where: {
          roundtableId,
          expiresAt: { gt: new Date() },
          isUsed: false
        }
      })
    ])

    return {
      total,
      used,
      expired,
      active,
      usageRate: total > 0 ? Math.round((used / total) * 100) : 0
    }
  }

  /**
   * Clean up expired voting sessions
   * Should be run periodically via cron job
   */
  async cleanupExpiredSessions(): Promise<number> {
    const result = await prisma.votingSession.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { isUsed: true, usedAt: { lt: addDays(new Date(), -7) } } // Clean up used sessions older than 7 days
        ]
      }
    })

    console.log(`Cleaned up ${result.count} expired voting sessions`)
    return result.count
  }
}
