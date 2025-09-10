import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import { format, addWeeks, addDays } from 'date-fns'
import { EmailTemplateService, TemplateData } from './EmailTemplateService'

const prisma = new PrismaClient()

export class NotificationService {
  private transporter: nodemailer.Transporter
  private templateService: EmailTemplateService

  constructor() {
    // Initialize email transporter (will be configured in environment)
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })

    this.templateService = new EmailTemplateService()
  }

  async sendSessionRescheduleNotification(
    sessionId: string, 
    oldDate: Date, 
    newDate: Date, 
    reason?: string
  ) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: {
          include: {
            participants: { where: { status: 'ACTIVE' } },
            client: true
          }
        },
        topic: true,
        trainer: true
      }
    })

    if (!session) return

    const notifications = []

    // Notify trainer
    if (session.trainer) {
      notifications.push({
        type: 'SESSION_RESCHEDULE' as const,
        recipient: session.trainer.email,
        subject: `Session Rescheduled - ${session.roundtable.name}`,
        content: this.generateRescheduleEmail({
          recipientName: session.trainer.name,
          sessionNumber: session.sessionNumber,
          roundtableName: session.roundtable.name,
          oldDate,
          newDate,
          reason,
          topic: session.topic?.title
        })
      })
    }

    // Notify participants
    for (const participant of session.roundtable.participants) {
      notifications.push({
        type: 'SESSION_RESCHEDULE' as const,
        recipient: participant.email,
        subject: `Session Rescheduled - ${session.roundtable.name}`,
        content: this.generateRescheduleEmail({
          recipientName: participant.name,
          sessionNumber: session.sessionNumber,
          roundtableName: session.roundtable.name,
          oldDate,
          newDate,
          reason,
          topic: session.topic?.title
        })
      })
    }

    // Save notifications to database and send
    for (const notification of notifications) {
      await this.createAndSendNotification(notification)
    }

    return notifications.length
  }

  private generateRescheduleEmail(data: {
    recipientName: string
    sessionNumber: number
    roundtableName: string
    oldDate: Date
    newDate: Date
    reason?: string
    topic?: string
  }) {
    return `
Dear ${data.recipientName},

We need to inform you that Session ${data.sessionNumber} of the ${data.roundtableName} roundtable has been rescheduled.

Original Date: ${format(data.oldDate, 'PPP p')}
New Date: ${format(data.newDate, 'PPP p')}
${data.topic ? `Topic: ${data.topic}` : ''}

${data.reason ? `Reason: ${data.reason}` : ''}

Please update your calendar accordingly. We apologize for any inconvenience.

Best regards,
The Maka Team
    `
  }

  async sendTrainerReminder(sessionId: string) {
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

    if (!session?.trainer) return

    try {
      const templateData = EmailTemplateService.generateTrainerReminderData(session)
      const { subject, html } = await this.templateService.renderTemplate('trainer_reminder', templateData)

      const notification = {
        type: 'TRAINER_REMINDER' as const,
        recipient: session.trainer.email,
        subject,
        content: html
      }

      return this.createAndSendNotification(notification)
    } catch (error) {
      console.error('Error sending trainer reminder:', error)
      throw error
    }
  }

  async sendQuestionsRequest(sessionId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: {
          include: { client: true }
        },
        topic: true,
        trainer: true
      }
    })

    if (!session?.trainer) return

    try {
      const templateData = EmailTemplateService.generateTrainerReminderData(session)
      const { subject, html } = await this.templateService.renderTemplate('trainer_reminder', templateData)

      const notification = {
        type: 'QUESTIONS_REQUEST' as const,
        recipient: session.trainer.email,
        subject: `Questions Required - Session ${session.sessionNumber}`,
        content: html
      }

      return this.createAndSendNotification(notification)
    } catch (error) {
      console.error('Error sending questions request:', error)
      throw error
    }
  }

  async sendPreSessionEmail(sessionId: string) {
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
        questions: { where: { status: 'APPROVED' } }
      }
    })

    if (!session || session.questions.length === 0) return

    try {
      const templateData = EmailTemplateService.generatePreSessionData(session, session.questions)
      const { subject, html } = await this.templateService.renderTemplate('pre_session', templateData)

      const recipients = session.roundtable.participants.map(participant => participant.email)
      const notifications = []

      for (const email of recipients) {
        const notification = {
          type: 'PARTICIPANT_EMAIL' as const,
          recipient: email,
          subject,
          content: html
        }
        notifications.push(this.createAndSendNotification(notification))
      }

      await Promise.all(notifications)
      return recipients.length
    } catch (error) {
      console.error('Error sending pre-session emails:', error)
      throw error
    }
  }

  async sendFeedbackRequest(sessionId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: { include: { client: true } },
        topic: true,
        trainer: true
      }
    })

    if (!session?.trainer) return

    const notification = {
      type: 'FEEDBACK_REQUEST' as const,
      recipient: session.trainer.email,
      subject: `Feedback Required - Session ${session.sessionNumber}`,
      content: `
Dear ${session.trainer.name},

Please provide individual feedback for each participant from today's session:

Session: ${session.sessionNumber}/10
Topic: ${session.topic?.title || 'General Discussion'}
Date: ${format(session.scheduledAt, 'PPP')}

Access the feedback form through your trainer dashboard or reply to this email.

Thank you,
The Maka Team
      `
    }

    return this.createAndSendNotification(notification)
  }

  async sendFeedbackToParticipant(sessionId: string, participantId: string, feedbackContent: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        roundtable: {
          include: { client: true }
        },
        topic: true,
        trainer: true
      }
    })

    const participant = await prisma.participant.findUnique({
      where: { id: participantId }
    })

    if (!session || !participant) return

    try {
      const templateData = EmailTemplateService.generateFeedbackData(session, participant, feedbackContent)
      const { subject, html } = await this.templateService.renderTemplate('feedback', templateData)

      const notification = {
        type: 'PARTICIPANT_EMAIL' as const,
        recipient: participant.email,
        subject,
        content: html
      }

      return this.createAndSendNotification(notification)
    } catch (error) {
      console.error('Error sending feedback to participant:', error)
      throw error
    }
  }

  async sendVotingInvitations(roundtableId: string) {
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: {
        client: true,
        participants: { where: { status: { not: 'DROPPED_OUT' } } }
      }
    })

    if (!roundtable) return

    try {
      const notifications = []

      for (const participant of roundtable.participants) {
        const templateData = EmailTemplateService.generateVotingInviteData(roundtable, participant)
        const { subject, html } = await this.templateService.renderTemplate('voting_invite', templateData)

        const notification = {
          type: 'VOTING_INVITE' as const,
          recipient: participant.email,
          subject,
          content: html
        }
        notifications.push(this.createAndSendNotification(notification))
      }

      await Promise.all(notifications)
      return roundtable.participants.length
    } catch (error) {
      console.error('Error sending voting invitations:', error)
      throw error
    }
  }

  async sendBulkNotifications(notifications: Array<{
    type: string
    recipient: string
    subject: string
    templateName: string
    templateData: TemplateData
  }>) {
    const results = []

    for (const notif of notifications) {
      try {
        const { subject, html } = await this.templateService.renderTemplate(notif.templateName, notif.templateData)
        
        const notification = {
          type: notif.type as any,
          recipient: notif.recipient,
          subject,
          content: html
        }

        results.push(await this.createAndSendNotification(notification))
      } catch (error) {
        console.error(`Error sending notification to ${notif.recipient}:`, error)
      }
    }

    return results
  }

  private async createAndSendNotification(notification: {
    type: string
    recipient: string
    subject: string
    content: string
  }) {
    try {
      // Save to database
      const savedNotification = await prisma.notification.create({
        data: {
          type: notification.type as any,
          recipient: notification.recipient,
          subject: notification.subject,
          content: notification.content,
          scheduledAt: new Date(),
          status: 'PENDING'
        }
      })

      // Send email (disabled in development)
      if (process.env.NODE_ENV === 'production') {
        await this.transporter.sendMail({
          from: process.env.FROM_EMAIL || 'noreply@makaitalia.com',
          to: notification.recipient,
          subject: notification.subject,
          text: notification.content
        })

        // Update status
        await prisma.notification.update({
          where: { id: savedNotification.id },
          data: {
            status: 'SENT',
            sentAt: new Date()
          }
        })
      } else {
        console.log(`[EMAIL] To: ${notification.recipient}`)
        console.log(`[EMAIL] Subject: ${notification.subject}`)
        console.log(`[EMAIL] Content: ${notification.content.substring(0, 100)}...`)
      }

      return savedNotification
    } catch (error) {
      console.error('Error sending notification:', error)
      throw error
    }
  }

  async processScheduledNotifications() {
    const pendingNotifications = await prisma.notification.findMany({
      where: {
        status: 'PENDING',
        scheduledAt: { lte: new Date() }
      }
    })

    console.log(`Processing ${pendingNotifications.length} scheduled notifications`)

    for (const notification of pendingNotifications) {
      try {
        await this.createAndSendNotification({
          type: notification.type,
          recipient: notification.recipient,
          subject: notification.subject,
          content: notification.content
        })
      } catch (error) {
        console.error(`Failed to send notification ${notification.id}:`, error)
        
        await prisma.notification.update({
          where: { id: notification.id },
          data: { status: 'FAILED' }
        })
      }
    }

    return pendingNotifications.length
  }
}