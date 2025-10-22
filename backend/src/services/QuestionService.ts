import { PrismaClient, QuestionStatus, QuestionSource } from '@prisma/client'
import { NotificationService } from './NotificationService'

const prisma = new PrismaClient()

export interface QuestionItem {
  question: string
  source?: QuestionSource
  aiPromptUsed?: string
}

export interface QuestionSubmission {
  questions: QuestionItem[]
  trainerId: string
  sessionId: string
}

export interface QuestionReview {
  questionId: string
  status: QuestionStatus
  reviewNotes?: string
  rating?: number // 1-5 stars
}

export interface QuestionLibraryFilters {
  topicId?: string
  minRating?: number
  source?: QuestionSource
  limit?: number
}

export class QuestionService {
  private notificationService = new NotificationService()

  async submitQuestionsForSession(submission: QuestionSubmission) {
    const { questions, trainerId, sessionId } = submission

    return prisma.$transaction(async (tx) => {
      // Verify session exists and trainer is assigned
      const session = await tx.session.findUnique({
        where: { id: sessionId },
        include: {
          trainer: true,
          roundtable: {
            include: {
              client: true
            },
            select: {
              name: true,
              minQuestionsPerSession: true,
              maxQuestionsPerSession: true,
              client: true
            }
          },
          topic: { select: { id: true, title: true } }
        }
      })

      if (!session) {
        throw new Error('Session not found')
      }

      if (session.trainerId !== trainerId) {
        throw new Error('You are not assigned to this session')
      }

      // Dynamic validation based on roundtable settings
      const min = session.roundtable.minQuestionsPerSession
      const max = session.roundtable.maxQuestionsPerSession

      if (questions.length < min) {
        throw new Error(`Minimum ${min} question(s) required for this roundtable`)
      }

      if (questions.length > max) {
        throw new Error(`Maximum ${max} questions allowed for this roundtable`)
      }

      // Delete existing questions for this session (if any)
      await tx.question.deleteMany({
        where: { sessionId }
      })

      // Create new questions with source tracking
      const createdQuestions = await Promise.all(
        questions.map((questionItem: QuestionItem) =>
          tx.question.create({
            data: {
              question: questionItem.question.trim(),
              sessionId,
              topicId: session.topic?.id,
              status: 'PENDING',
              source: questionItem.source || 'MANUAL',
              aiPromptUsed: questionItem.aiPromptUsed || null
            }
          })
        )
      )

      // Update session questionsStatus to indicate questions submitted for approval
      await tx.session.update({
        where: { id: sessionId },
        data: { questionsStatus: 'PENDING_APPROVAL' }
      })

      // Notify coordinators that questions are ready for review
      await this.notifyCoordinatorsForReview(sessionId)

      return {
        sessionId,
        questionsSubmitted: createdQuestions.length,
        submittedAt: new Date(),
        questions: createdQuestions,
        limits: {
          min: session.roundtable.minQuestionsPerSession,
          max: session.roundtable.maxQuestionsPerSession
        }
      }
    })
  }

  async reviewQuestions(reviews: QuestionReview[], reviewerId: string) {
    const results = []

    for (const review of reviews) {
      try {
        // Get the question first to check source
        const question = await prisma.question.findUnique({
          where: { id: review.questionId }
        })

        const updatedQuestion = await prisma.question.update({
          where: { id: review.questionId },
          data: {
            status: review.status,
            reviewNotes: review.reviewNotes,
            rating: review.rating,
            // Increment usage count if approved and from library
            usageCount: question && review.status === 'APPROVED' && question.source === 'LIBRARY'
              ? { increment: 1 }
              : undefined,
            updatedAt: new Date()
          },
          include: {
            session: {
              include: {
                trainer: true,
                topic: true,
                roundtable: { include: { client: true } }
              }
            }
          }
        })

        results.push(updatedQuestion)
      } catch (error) {
        console.error(`Error reviewing question ${review.questionId}:`, error)
      }
    }

    // Check if all questions for each session are reviewed
    const sessionIds = [...new Set(results.map(q => q.sessionId))]

    for (const sessionId of sessionIds) {
      await this.checkAndUpdateSessionStatus(sessionId)
    }

    return results
  }

  private async checkAndUpdateSessionStatus(sessionId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        questions: true,
        roundtable: {
          select: { minQuestionsPerSession: true }
        }
      }
    })

    if (!session) return

    const totalQuestions = session.questions.length
    const approvedQuestions = session.questions.filter(q => q.status === 'APPROVED').length
    const needsRevisionQuestions = session.questions.filter(q => q.status === 'NEEDS_REVISION').length
    const rejectedQuestions = session.questions.filter(q => q.status === 'REJECTED').length

    const minRequired = session.roundtable.minQuestionsPerSession
    let newQuestionsStatus = session.questionsStatus

    if (approvedQuestions >= minRequired && approvedQuestions === totalQuestions) {
      // All questions approved - ready to send to participants
      newQuestionsStatus = 'SENT_TO_PARTICIPANTS'
    } else if (needsRevisionQuestions > 0 || rejectedQuestions > 0) {
      // Some questions need work - back to requested
      newQuestionsStatus = 'REQUESTED_FROM_COORDINATOR'

      // Notify trainer about revisions needed
      await this.notifyTrainerOfRevisions(sessionId)
    }

    if (newQuestionsStatus !== session.questionsStatus) {
      await prisma.session.update({
        where: { id: sessionId },
        data: { questionsStatus: newQuestionsStatus }
      })
    }
  }

  async getQuestionsForSession(sessionId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        questions: {
          orderBy: { createdAt: 'asc' }
        },
        trainer: { select: { name: true, email: true } },
        roundtable: {
          select: { 
            name: true, 
            client: { select: { name: true, company: true } }
          }
        },
        topic: { select: { title: true, description: true } }
      }
    })

    if (!session) {
      throw new Error('Session not found')
    }

    return {
      session: {
        id: session.id,
        sessionNumber: session.sessionNumber,
        scheduledAt: session.scheduledAt,
        status: session.status,
        trainer: session.trainer,
        roundtable: session.roundtable,
        topic: session.topic
      },
      questions: session.questions,
      canSubmitQuestions: session.questions.length === 0 || session.questions.some(q => q.status === 'NEEDS_REVISION'),
      reviewStatus: this.getReviewStatus(session.questions)
    }
  }

  async getPendingQuestions() {
    const sessions = await prisma.session.findMany({
      where: {
        questions: {
          some: { status: 'PENDING' }
        }
      },
      include: {
        questions: {
          where: { status: 'PENDING' },
          orderBy: { createdAt: 'asc' }
        },
        trainer: { select: { name: true, email: true } },
        roundtable: {
          select: {
            name: true,
            client: { select: { name: true, company: true } }
          }
        },
        topic: { select: { title: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    })

    return sessions.map(session => ({
      session: {
        id: session.id,
        sessionNumber: session.sessionNumber,
        scheduledAt: session.scheduledAt,
        trainer: session.trainer,
        roundtable: session.roundtable,
        topic: session.topic
      },
      pendingQuestions: session.questions.length,
      totalQuestions: session.questions.length
    }))
  }

  async getQuestionsDashboard() {
    const [
      pendingSessions,
      questionsNeedingRevision,
      approvedSessions,
      totalQuestions
    ] = await Promise.all([
      prisma.session.count({
        where: { questions: { some: { status: 'PENDING' } } }
      }),
      prisma.question.count({
        where: { status: 'NEEDS_REVISION' }
      }),
      prisma.session.count({
        where: { questionsStatus: 'SENT_TO_PARTICIPANTS' }
      }),
      prisma.question.count()
    ])

    return {
      pendingSessions,
      questionsNeedingRevision,
      approvedSessions,
      totalQuestions,
      averageApprovalTime: await this.calculateAverageApprovalTime()
    }
  }

  private async calculateAverageApprovalTime(): Promise<number> {
    const approvedQuestions = await prisma.question.findMany({
      where: { 
        status: { in: ['APPROVED', 'REJECTED'] },
        updatedAt: { not: null }
      },
      select: { createdAt: true, updatedAt: true }
    })

    if (approvedQuestions.length === 0) return 0

    const totalTime = approvedQuestions.reduce((sum, question) => {
      const reviewTime = question.updatedAt!.getTime() - question.createdAt.getTime()
      return sum + reviewTime
    }, 0)

    return Math.round(totalTime / approvedQuestions.length / (1000 * 60 * 60)) // Hours
  }

  private getReviewStatus(questions: any[]) {
    const total = questions.length
    const approved = questions.filter(q => q.status === 'APPROVED').length
    const pending = questions.filter(q => q.status === 'PENDING').length
    const needsRevision = questions.filter(q => q.status === 'NEEDS_REVISION').length
    const rejected = questions.filter(q => q.status === 'REJECTED').length

    return {
      total,
      approved,
      pending,
      needsRevision,
      rejected,
      isComplete: approved >= 3,
      needsAttention: needsRevision > 0 || rejected > 0
    }
  }

  private async notifyCoordinatorsForReview(sessionId: string) {
    // Get coordinator emails from environment or database
    const coordinatorEmails = (process.env.COORDINATOR_EMAILS || '').split(',').filter(email => email.trim())
    
    if (coordinatorEmails.length === 0) {
      console.log('No coordinator emails configured for question review notifications')
      return
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        trainer: true,
        roundtable: { include: { client: true } },
        topic: true
      }
    })

    if (!session) return

    for (const email of coordinatorEmails) {
      try {
        await prisma.notification.create({
          data: {
            type: 'QUESTIONS_REQUEST',
            recipient: email.trim(),
            subject: `Questions Ready for Review - ${session.roundtable.client.company}`,
            content: `
New questions have been submitted for review:

Session: ${session.sessionNumber}/10
Trainer: ${session.trainer?.name}
Client: ${session.roundtable.client.company}
Roundtable: ${session.roundtable.name}
Topic: ${session.topic?.title || 'General'}
Date: ${session.scheduledAt.toLocaleDateString()}

Please review and approve the questions through the admin dashboard.
            `,
            scheduledAt: new Date(),
            status: 'PENDING'
          }
        })
      } catch (error) {
        console.error(`Error creating notification for ${email}:`, error)
      }
    }
  }

  private async notifyTrainerOfRevisions(sessionId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        trainer: true,
        questions: {
          where: { status: { in: ['NEEDS_REVISION', 'REJECTED'] } }
        },
        roundtable: { include: { client: true } },
        topic: true
      }
    })

    if (!session?.trainer) return

    const revisionsNeeded = session.questions.filter(q => q.status === 'NEEDS_REVISION')
    const rejectedQuestions = session.questions.filter(q => q.status === 'REJECTED')

    const content = `
Dear ${session.trainer.name},

Thank you for submitting questions for your upcoming roundtable session. We have reviewed them and need some revisions:

Session: ${session.sessionNumber}/10 - ${session.topic?.title || 'General Discussion'}
Date: ${session.scheduledAt.toLocaleDateString()}

${revisionsNeeded.length > 0 ? `
QUESTIONS NEEDING REVISION:
${revisionsNeeded.map((q, i) => `
${i + 1}. "${q.question}"
   Feedback: ${q.reviewNotes || 'Please revise this question'}
`).join('')}
` : ''}

${rejectedQuestions.length > 0 ? `
REJECTED QUESTIONS (please replace):
${rejectedQuestions.map((q, i) => `
${i + 1}. "${q.question}"
   Reason: ${q.reviewNotes || 'This question was not suitable'}
`).join('')}
` : ''}

Please submit revised questions through the trainer portal or reply to this email.

Best regards,
The Maka Team
    `

    await prisma.notification.create({
      data: {
        type: 'TRAINER_REMINDER',
        recipient: session.trainer.email,
        subject: `Question Revisions Required - ${session.roundtable.client.company}`,
        content,
        scheduledAt: new Date(),
        status: 'PENDING'
      }
    })
  }

  /**
   * Get question library - highly rated questions filtered by topic
   */
  async getQuestionLibrary(filters: QuestionLibraryFilters = {}) {
    const {
      topicId,
      minRating = 3.5,
      source,
      limit = 20
    } = filters

    const where: any = {
      status: 'APPROVED',
      rating: { gte: minRating }
    }

    if (topicId) {
      where.topicId = topicId
    }

    if (source) {
      where.source = source
    }

    const questions = await prisma.question.findMany({
      where,
      include: {
        topic: { select: { title: true } },
        session: {
          select: {
            sessionNumber: true,
            roundtable: { select: { name: true } }
          }
        }
      },
      orderBy: [
        { rating: 'desc' },
        { usageCount: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    })

    return questions.map(q => ({
      id: q.id,
      question: q.question,
      rating: q.rating,
      usageCount: q.usageCount,
      source: q.source,
      topic: q.topic,
      sessionInfo: q.session
        ? `Session ${q.session.sessionNumber} - ${q.session.roundtable.name}`
        : 'Unknown session'
    }))
  }

  /**
   * Rate a question (coordinator feature)
   */
  async rateQuestion(questionId: string, rating: number) {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    const updated = await prisma.question.update({
      where: { id: questionId },
      data: { rating }
    })

    return updated
  }

  /**
   * Get question statistics by source (manual vs AI vs template)
   */
  async getQuestionSourceStatistics() {
    const stats = await prisma.question.groupBy({
      by: ['source'],
      _count: { id: true },
      _avg: { rating: true }
    })

    return stats.map(s => ({
      source: s.source,
      count: s._count.id,
      averageRating: s._avg.rating || 0
    }))
  }

  /**
   * Get top rated questions across all topics
   */
  async getTopRatedQuestions(limit: number = 10) {
    return await prisma.question.findMany({
      where: {
        status: 'APPROVED',
        rating: { gte: 4.0 }
      },
      include: {
        topic: { select: { title: true } },
        session: {
          select: {
            trainer: { select: { name: true } }
          }
        }
      },
      orderBy: [
        { rating: 'desc' },
        { usageCount: 'desc' }
      ],
      take: limit
    })
  }

  /**
   * Get validation limits for a roundtable
   */
  async getRoundtableLimits(roundtableId: string) {
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      select: {
        minQuestionsPerSession: true,
        maxQuestionsPerSession: true,
        minFeedbackItemsPerParticipant: true,
        maxFeedbackItemsPerParticipant: true
      }
    })

    if (!roundtable) {
      throw new Error('Roundtable not found')
    }

    return roundtable
  }
}