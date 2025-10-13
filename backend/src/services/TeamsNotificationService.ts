import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { format } from 'date-fns'

const prisma = new PrismaClient()

/**
 * Microsoft Teams Notification Service
 *
 * Sends notifications to trainers via Teams webhooks
 * Used as alternative/complement to email notifications
 *
 * Setup:
 * 1. In Teams, go to the channel where you want notifications
 * 2. Click "..." → "Connectors" → "Incoming Webhook"
 * 3. Configure webhook and copy URL
 * 4. Add URL to .env as TEAMS_WEBHOOK_URL
 *
 * For trainer-specific webhooks:
 * - Store webhook URL in Trainer.metadata field
 * - Or use a central webhook and @mention trainers
 */

export class TeamsNotificationService {
  private defaultWebhookUrl: string | undefined

  constructor() {
    this.defaultWebhookUrl = process.env.TEAMS_WEBHOOK_URL
  }

  /**
   * Send adaptive card to Teams webhook
   */
  private async sendToWebhook(webhookUrl: string, card: any): Promise<boolean> {
    try {
      const response = await axios.post(webhookUrl, card, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        console.log('✅ Teams notification sent successfully')
        return true
      } else {
        console.error('❌ Teams notification failed:', response.status, response.statusText)
        return false
      }
    } catch (error) {
      console.error('❌ Error sending Teams notification:', error)
      return false
    }
  }

  /**
   * Send trainer reminder via Teams
   */
  async sendTrainerReminder(sessionId: string): Promise<boolean> {
    if (!this.defaultWebhookUrl) {
      console.log('⚠️ Teams webhook not configured, skipping Teams notification')
      return false
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: { include: { client: true } },
        topic: true,
        trainer: true
      }
    })

    if (!session || !session.trainer) {
      console.error('Session or trainer not found')
      return false
    }

    const daysUntilSession = Math.ceil(
      (session.scheduledAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )

    // Adaptive Card format for Teams
    const card = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: `Session Reminder - ${session.roundtable.name}`,
      themeColor: '0078D4',
      sections: [
        {
          activityTitle: `🔔 Session Reminder: ${session.roundtable.name}`,
          activitySubtitle: `Hello ${session.trainer.name}`,
          activityImage: 'https://makaitalia.com/logo.png',
          facts: [
            {
              name: 'Session',
              value: `${session.sessionNumber}/10`
            },
            {
              name: 'Topic',
              value: session.topic?.title || 'To be determined'
            },
            {
              name: 'Date',
              value: format(session.scheduledAt, 'PPP p')
            },
            {
              name: 'In',
              value: `${daysUntilSession} days (${format(session.scheduledAt, 'EEEE')})`
            },
            {
              name: 'Client',
              value: session.roundtable.client.name
            }
          ],
          text: `Please prepare 3 discussion questions for this session and submit them within the next 2 days.`
        }
      ],
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'Submit Questions',
          targets: [
            {
              os: 'default',
              uri: `${process.env.FRONTEND_URL || 'https://roundtables.makaitalia.com'}/trainer/sessions/${sessionId}`
            }
          ]
        }
      ]
    }

    return this.sendToWebhook(this.defaultWebhookUrl, card)
  }

  /**
   * Send questions request via Teams
   */
  async sendQuestionsRequest(sessionId: string): Promise<boolean> {
    if (!this.defaultWebhookUrl) return false

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: { include: { client: true } },
        topic: true,
        trainer: true
      }
    })

    if (!session || !session.trainer) return false

    const card = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: `Questions Needed - Session ${session.sessionNumber}`,
      themeColor: 'FF6B00',
      sections: [
        {
          activityTitle: `📝 Questions Required`,
          activitySubtitle: `${session.trainer.name}, we need your questions`,
          facts: [
            {
              name: 'Session',
              value: `${session.sessionNumber}/10`
            },
            {
              name: 'Topic',
              value: session.topic?.title || 'General'
            },
            {
              name: 'Date',
              value: format(session.scheduledAt, 'PPP p')
            },
            {
              name: 'Roundtable',
              value: session.roundtable.name
            }
          ],
          text: `⚠️ Please submit 3 discussion questions for this session as soon as possible. The session is coming up soon and participants need the questions in advance.`
        }
      ],
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'Submit Questions Now',
          targets: [
            {
              os: 'default',
              uri: `${process.env.FRONTEND_URL}/trainer/sessions/${sessionId}`
            }
          ]
        }
      ]
    }

    return this.sendToWebhook(this.defaultWebhookUrl, card)
  }

  /**
   * Send feedback request via Teams
   */
  async sendFeedbackRequest(sessionId: string): Promise<boolean> {
    if (!this.defaultWebhookUrl) return false

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: {
          include: {
            client: true,
            participants: { where: { status: 'ACTIVE' } }
          }
        },
        topic: true,
        trainer: true
      }
    })

    if (!session || !session.trainer) return false

    const card = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: `Feedback Needed - Session ${session.sessionNumber}`,
      themeColor: '28A745',
      sections: [
        {
          activityTitle: `💭 Feedback Required`,
          activitySubtitle: `${session.trainer.name}, please provide participant feedback`,
          facts: [
            {
              name: 'Session',
              value: `${session.sessionNumber}/10 - Completed`
            },
            {
              name: 'Topic',
              value: session.topic?.title || 'General Discussion'
            },
            {
              name: 'Date',
              value: format(session.scheduledAt, 'PPP')
            },
            {
              name: 'Participants',
              value: `${session.roundtable.participants.length} active participants`
            }
          ],
          text: `Please provide individual feedback for each participant. Your feedback helps them improve their language skills and engagement.`
        }
      ],
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'Submit Feedback',
          targets: [
            {
              os: 'default',
              uri: `${process.env.FRONTEND_URL}/trainer/feedback/${sessionId}`
            }
          ]
        }
      ]
    }

    return this.sendToWebhook(this.defaultWebhookUrl, card)
  }

  /**
   * Send late submission reminder via Teams
   */
  async sendLateSubmissionReminder(
    sessionId: string,
    type: 'questions' | 'feedback',
    daysLate: number
  ): Promise<boolean> {
    if (!this.defaultWebhookUrl) return false

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: { include: { client: true } },
        topic: true,
        trainer: true
      }
    })

    if (!session || !session.trainer) return false

    const isQuestions = type === 'questions'
    const title = isQuestions ? '⚠️ URGENT: Questions Still Needed' : '⚠️ URGENT: Feedback Still Needed'
    const message = isQuestions
      ? `This is an urgent reminder. The session is approaching and we still need your 3 discussion questions. This is now ${daysLate} days overdue.`
      : `This is an urgent reminder. The session was ${daysLate} days ago and we still need individual feedback for all participants.`

    const card = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: title,
      themeColor: 'DC3545',
      sections: [
        {
          activityTitle: title,
          activitySubtitle: `${session.trainer.name}, immediate action required`,
          facts: [
            {
              name: 'Session',
              value: `${session.sessionNumber}/10`
            },
            {
              name: 'Topic',
              value: session.topic?.title || 'General'
            },
            {
              name: 'Status',
              value: `⚠️ ${daysLate} days overdue`
            }
          ],
          text: message
        }
      ],
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: `Submit ${isQuestions ? 'Questions' : 'Feedback'} Now`,
          targets: [
            {
              os: 'default',
              uri: `${process.env.FRONTEND_URL}/trainer/sessions/${sessionId}`
            }
          ]
        }
      ]
    }

    return this.sendToWebhook(this.defaultWebhookUrl, card)
  }

  /**
   * Send coordinator alert about pending approvals
   */
  async sendCoordinatorAlert(
    type: 'questions' | 'feedback',
    count: number,
    items: Array<{
      sessionNumber: number
      roundtableName: string
      trainerName: string
      daysWaiting: number
    }>
  ): Promise<boolean> {
    if (!this.defaultWebhookUrl) return false

    const isQuestions = type === 'questions'
    const title = `⚠️ ${count} ${isQuestions ? 'Questions' : 'Feedback Items'} Awaiting Approval`

    const itemsList = items
      .map(
        item =>
          `• Session ${item.sessionNumber}: ${item.roundtableName} (${item.trainerName}) - ${item.daysWaiting} days waiting`
      )
      .join('\n\n')

    const card = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: title,
      themeColor: 'FFC107',
      sections: [
        {
          activityTitle: title,
          activitySubtitle: 'Please review and approve',
          text: `The following items have been waiting for approval for more than 2 days:\n\n${itemsList}\n\nPlease review and approve these items so they can be sent to participants.`
        }
      ],
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'Review Now',
          targets: [
            {
              os: 'default',
              uri: `${process.env.FRONTEND_URL}/${isQuestions ? 'questions' : 'feedback'}`
            }
          ]
        }
      ]
    }

    return this.sendToWebhook(this.defaultWebhookUrl, card)
  }

  /**
   * Send session completion summary to coordinators
   */
  async sendSessionCompletionSummary(sessionId: string): Promise<boolean> {
    if (!this.defaultWebhookUrl) return false

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: {
          include: {
            client: true,
            participants: { where: { status: 'ACTIVE' } }
          }
        },
        topic: true,
        trainer: true,
        questions: { where: { status: 'APPROVED' } },
        feedback: true
      }
    })

    if (!session) return false

    const feedbackSubmitted = session.feedback.length
    const feedbackNeeded = session.roundtable.participants.length
    const allFeedbackReceived = feedbackSubmitted === feedbackNeeded

    const card = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: `Session ${session.sessionNumber} Completed`,
      themeColor: allFeedbackReceived ? '28A745' : 'FFC107',
      sections: [
        {
          activityTitle: `✅ Session ${session.sessionNumber}/10 Completed`,
          activitySubtitle: session.roundtable.name,
          facts: [
            {
              name: 'Topic',
              value: session.topic?.title || 'General'
            },
            {
              name: 'Trainer',
              value: session.trainer?.name || 'Not assigned'
            },
            {
              name: 'Date',
              value: format(session.scheduledAt, 'PPP')
            },
            {
              name: 'Feedback Status',
              value: `${feedbackSubmitted}/${feedbackNeeded} submitted`
            }
          ],
          text: allFeedbackReceived
            ? '✅ All feedback has been received and can be reviewed for approval.'
            : `⚠️ Waiting for feedback from ${feedbackNeeded - feedbackSubmitted} participants.`
        }
      ],
      potentialAction: allFeedbackReceived
        ? [
            {
              '@type': 'OpenUri',
              name: 'Review Feedback',
              targets: [
                {
                  os: 'default',
                  uri: `${process.env.FRONTEND_URL}/feedback?session=${sessionId}`
                }
              ]
            }
          ]
        : []
    }

    return this.sendToWebhook(this.defaultWebhookUrl, card)
  }
}
