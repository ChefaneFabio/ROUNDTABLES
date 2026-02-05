import { PrismaClient, QuestionStatus } from '@prisma/client'
import { NotificationService } from './NotificationService'

const prisma = new PrismaClient()

export interface QuestionSubmission {
  questions: string[]
  trainerId: string
  sessionId: string
}

export interface QuestionReview {
  questionId: string
  status: QuestionStatus
  reviewNotes?: string
}

export class QuestionService {
  private notificationService = new NotificationService()

  async submitQuestionsForSession(submission: QuestionSubmission) {
    const { questions, trainerId, sessionId } = submission

    if (questions.length !== 3) {
      throw new Error('Exactly 3 questions are required per session')
    }

    return prisma.$transaction(async (tx) => {
      // Verify session exists and trainer is assigned
      const session = await tx.session.findUnique({
        where: { id: sessionId },
        include: {
          trainer: true,
          roundtable: { include: { client: true } },
          topic: true
        }
      })

      if (!session) {
        throw new Error('Session not found')
      }

      if (session.trainerId !== trainerId) {
        throw new Error('You are not assigned to this session')
      }

      // Delete existing questions for this session (if any)
      await tx.question.deleteMany({
        where: { sessionId }
      })

      // Create new questions
      const createdQuestions = await Promise.all(
        questions.map((questionText, index) =>
          tx.question.create({
            data: {
              question: questionText.trim(),
              sessionId,
              status: 'PENDING'
            }
          })
        )
      )

      // Update session status to indicate questions submitted
      await tx.session.update({
        where: { id: sessionId },
        data: { status: 'QUESTIONS_REQUESTED' }
      })

      // Notify coordinators that questions are ready for review
      await this.notifyCoordinatorsForReview(sessionId)

      return {
        sessionId,
        questionsSubmitted: createdQuestions.length,
        submittedAt: new Date(),
        questions: createdQuestions
      }
    })
  }

  async reviewQuestions(reviews: QuestionReview[], reviewerId: string) {
    const results = []

    for (const review of reviews) {
      try {
        const updatedQuestion = await prisma.question.update({
          where: { id: review.questionId },
          data: {
            status: review.status,
            reviewNotes: review.reviewNotes,
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
      include: { questions: true }
    })

    if (!session) return

    const totalQuestions = session.questions.length
    const approvedQuestions = session.questions.filter(q => q.status === 'APPROVED').length
    const needsRevisionQuestions = session.questions.filter(q => q.status === 'NEEDS_REVISION').length
    const rejectedQuestions = session.questions.filter(q => q.status === 'REJECTED').length

    let newStatus = session.status

    if (approvedQuestions >= 3) {
      // Enough questions approved
      newStatus = 'QUESTIONS_READY'
      
      // Can now send pre-session emails automatically
      // This will be handled by the scheduler job
      
    } else if (needsRevisionQuestions > 0 || rejectedQuestions > 0) {
      // Some questions need work
      newStatus = 'QUESTIONS_REQUESTED'
      
      // Notify trainer about revisions needed
      await this.notifyTrainerOfRevisions(sessionId)
    }

    if (newStatus !== session.status) {
      await prisma.session.update({
        where: { id: sessionId },
        data: { status: newStatus }
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
        where: { status: 'QUESTIONS_READY' }
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
}