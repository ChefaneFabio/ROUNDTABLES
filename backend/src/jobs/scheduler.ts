import cron from 'node-cron'
import { PrismaClient } from '@prisma/client'
import { NotificationService } from '../services/NotificationService'
import { VotingTokenService } from '../services/VotingTokenService'
import { TeamsNotificationService } from '../services/TeamsNotificationService'
import { addDays, addWeeks, subDays, isToday, isTomorrow } from 'date-fns'

const prisma = new PrismaClient()
const notificationService = new NotificationService()
const votingTokenService = new VotingTokenService()
const teamsNotificationService = new TeamsNotificationService()

console.log('🕐 Job scheduler initialized - Maka Roundtables Automation')
console.log('📋 Scheduled jobs:')
console.log('  - 09:00: Trainer reminders (1 week before sessions)')
console.log('  - 10:00: Question requests')
console.log('  - 11:00: Pending question approval alerts')
console.log('  - 14:00: Pre-session emails to participants')
console.log('  - 15:00: Pending feedback approval alerts')
console.log('  - 16:00: Late trainer question reminders')
console.log('  - 18:00: Feedback requests (day of session)')
console.log('  - 19:00: Late trainer feedback reminders')
console.log('  - Every hour: Auto-update session status & send approved feedback')
console.log('  - Every 15min: Process scheduled notifications')
console.log('  - Sunday 02:00: Database cleanup')
console.log('')

// Check for trainer reminders - every day at 9 AM
cron.schedule('0 9 * * *', async () => {
  console.log('🔔 Checking for trainer reminders...')
  
  try {
    // Find sessions that need trainer reminders (1 week before)
    const oneWeekFromNow = addWeeks(new Date(), 1)
    
    const sessions = await prisma.session.findMany({
      where: {
        scheduledAt: {
          gte: oneWeekFromNow,
          lte: addDays(oneWeekFromNow, 1) // Within the next day
        },
        status: 'SCHEDULED',
        trainer: { isNot: null }
      },
      include: {
        trainer: true,
        roundtable: { include: { client: true } },
        topic: true
      }
    })

    console.log(`Found ${sessions.length} sessions needing trainer reminders`)

    for (const session of sessions) {
      try {
        await notificationService.sendTrainerReminder(session.id)
        
        // Update session status to track reminder sent
        await prisma.session.update({
          where: { id: session.id },
          data: { status: 'REMINDER_SENT' }
        })
        
        console.log(`✅ Trainer reminder sent for session ${session.id}`)
      } catch (error) {
        console.error(`❌ Failed to send trainer reminder for session ${session.id}:`, error)
      }
    }
  } catch (error) {
    console.error('Error in trainer reminder job:', error)
  }
})

// Check for question requests - every day at 10 AM
cron.schedule('0 10 * * *', async () => {
  console.log('📝 Checking for question requests...')
  
  try {
    // Find sessions needing questions (1 week before, after trainer reminder sent)
    const oneWeekFromNow = addWeeks(new Date(), 1)
    
    const sessions = await prisma.session.findMany({
      where: {
        scheduledAt: {
          gte: oneWeekFromNow,
          lte: addDays(oneWeekFromNow, 1)
        },
        status: 'REMINDER_SENT',
        questions: { none: {} } // No questions yet
      }
    })

    console.log(`Found ${sessions.length} sessions needing questions`)

    for (const session of sessions) {
      try {
        await notificationService.sendQuestionsRequest(session.id)
        console.log(`✅ Question request sent for session ${session.id}`)
      } catch (error) {
        console.error(`❌ Failed to send question request for session ${session.id}:`, error)
      }
    }
  } catch (error) {
    console.error('Error in question request job:', error)
  }
})

// Send pre-session emails - every day at 2 PM
cron.schedule('0 14 * * *', async () => {
  console.log('📧 Checking for pre-session emails...')
  
  try {
    // Find sessions with approved questions happening tomorrow
    const tomorrow = addDays(new Date(), 1)
    
    const sessions = await prisma.session.findMany({
      where: {
        scheduledAt: {
          gte: tomorrow,
          lte: addDays(tomorrow, 1)
        },
        status: 'QUESTIONS_READY',
        questions: {
          some: { status: 'APPROVED' }
        }
      }
    })

    console.log(`Found ${sessions.length} sessions needing pre-session emails`)

    for (const session of sessions) {
      try {
        const emailsSent = await notificationService.sendPreSessionEmail(session.id)
        console.log(`✅ Pre-session emails sent to ${emailsSent} participants for session ${session.id}`)
      } catch (error) {
        console.error(`❌ Failed to send pre-session email for session ${session.id}:`, error)
      }
    }
  } catch (error) {
    console.error('Error in pre-session email job:', error)
  }
})

// Check for feedback requests - every day at 6 PM
cron.schedule('0 18 * * *', async () => {
  console.log('💭 Checking for feedback requests...')
  
  try {
    // Find sessions that happened today and need feedback
    const today = new Date()
    
    const sessions = await prisma.session.findMany({
      where: {
        scheduledAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
          lte: addDays(today, 1)
        },
        status: 'COMPLETED',
        feedback: { none: {} } // No feedback yet
      }
    })

    console.log(`Found ${sessions.length} sessions needing feedback requests`)

    for (const session of sessions) {
      try {
        await notificationService.sendFeedbackRequest(session.id)
        
        // Update status to track feedback requested
        await prisma.session.update({
          where: { id: session.id },
          data: { status: 'FEEDBACK_PENDING' }
        })
        
        console.log(`✅ Feedback request sent for session ${session.id}`)
      } catch (error) {
        console.error(`❌ Failed to send feedback request for session ${session.id}:`, error)
      }
    }
  } catch (error) {
    console.error('Error in feedback request job:', error)
  }
})

// Process scheduled notifications - every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  try {
    const processed = await notificationService.processScheduledNotifications()
    if (processed > 0) {
      console.log(`📤 Processed ${processed} scheduled notifications`)
    }
  } catch (error) {
    console.error('Error processing scheduled notifications:', error)
  }
})

// Database cleanup - every Sunday at 2 AM
cron.schedule('0 2 * * 0', async () => {
  console.log('🧹 Running database cleanup...')

  try {
    // Clean up old notifications (older than 90 days)
    const threeMonthsAgo = addDays(new Date(), -90)

    const deletedNotifications = await prisma.notification.deleteMany({
      where: {
        createdAt: { lte: threeMonthsAgo },
        status: { in: ['SENT', 'FAILED'] }
      }
    })

    console.log(`🗑️ Cleaned up ${deletedNotifications.count} old notifications`)

    // Clean up expired voting tokens
    const deletedTokens = await votingTokenService.cleanupExpiredTokens()
    console.log(`🗑️ Cleaned up ${deletedTokens} expired voting tokens`)

    // Clean up expired voting sessions
    const deletedSessions = await votingTokenService.cleanupExpiredSessions()
    console.log(`🗑️ Cleaned up ${deletedSessions} expired voting sessions`)
  } catch (error) {
    console.error('Error in database cleanup job:', error)
  }
})

// Auto-update session status based on question approvals - every hour
cron.schedule('0 * * * *', async () => {
  console.log('🔄 Checking session status updates...')

  try {
    // Find sessions with QUESTIONS_REQUESTED status that now have all questions approved
    const sessionsWithApprovedQuestions = await prisma.session.findMany({
      where: {
        status: 'QUESTIONS_REQUESTED',
        questions: {
          some: { status: 'APPROVED' }
        }
      },
      include: {
        questions: true
      }
    })

    for (const session of sessionsWithApprovedQuestions) {
      const allApproved = session.questions.every(q => q.status === 'APPROVED')
      const hasQuestions = session.questions.length >= 3

      if (allApproved && hasQuestions) {
        await prisma.session.update({
          where: { id: session.id },
          data: { status: 'QUESTIONS_READY' }
        })
        console.log(`✅ Session ${session.id} status updated to QUESTIONS_READY`)
      }
    }
  } catch (error) {
    console.error('Error updating session status:', error)
  }
})

// Send approved feedback to participants - every hour
cron.schedule('30 * * * *', async () => {
  console.log('📧 Checking for approved feedback to send...')

  try {
    // Find feedback that's been approved but not yet sent
    const approvedFeedback = await prisma.feedback.findMany({
      where: {
        status: 'APPROVED',
        sentAt: null
      },
      include: {
        session: {
          include: {
            roundtable: true,
            topic: true,
            trainer: true
          }
        },
        participant: true,
        trainer: true
      }
    })

    console.log(`Found ${approvedFeedback.length} approved feedback items to send`)

    for (const feedback of approvedFeedback) {
      try {
        await notificationService.sendFeedbackToParticipant(
          feedback.sessionId,
          feedback.participantId,
          feedback.content
        )

        // Update feedback status
        await prisma.feedback.update({
          where: { id: feedback.id },
          data: {
            status: 'SENT',
            sentAt: new Date()
          }
        })

        console.log(`✅ Feedback sent to ${feedback.participant.name}`)
      } catch (error) {
        console.error(`❌ Failed to send feedback ${feedback.id}:`, error)
      }
    }

    // Check if all feedback for a session is sent, update session status
    const sessions = await prisma.session.findMany({
      where: {
        status: 'FEEDBACK_PENDING',
        feedback: {
          every: { status: 'SENT' }
        }
      }
    })

    for (const session of sessions) {
      await prisma.session.update({
        where: { id: session.id },
        data: { status: 'FEEDBACK_SENT' }
      })
      console.log(`✅ Session ${session.id} - all feedback sent`)
    }
  } catch (error) {
    console.error('Error sending approved feedback:', error)
  }
})

// Remind coordinators about pending question approvals - every day at 11 AM
cron.schedule('0 11 * * *', async () => {
  console.log('⚠️ Checking for pending question approvals...')

  try {
    const twoDaysAgo = subDays(new Date(), 2)

    // Find questions pending approval for more than 2 days
    const pendingQuestions = await prisma.question.findMany({
      where: {
        status: 'PENDING',
        createdAt: { lte: twoDaysAgo }
      },
      include: {
        session: {
          include: {
            roundtable: true,
            trainer: true,
            topic: true
          }
        }
      }
    })

    if (pendingQuestions.length > 0) {
      console.log(`Found ${pendingQuestions.length} questions awaiting approval for >2 days`)

      // Send reminder to coordinators
      const coordinatorEmails = process.env.COORDINATOR_EMAILS?.split(',') || []

      for (const email of coordinatorEmails) {
        const notification = {
          type: 'PARTICIPANT_EMAIL' as const,
          recipient: email.trim(),
          subject: `⚠️ ${pendingQuestions.length} Questions Awaiting Approval`,
          content: `
Hi,

There are ${pendingQuestions.length} questions that have been pending approval for more than 2 days:

${pendingQuestions.map(q => `
- Session ${q.session.sessionNumber}: ${q.session.roundtable.name}
  Topic: ${q.session.topic?.title || 'TBD'}
  Trainer: ${q.session.trainer?.name || 'Not assigned'}
  Submitted: ${q.createdAt.toLocaleDateString()}
`).join('\n')}

Please review and approve these questions so they can be sent to participants.

Dashboard: ${process.env.FRONTEND_URL || 'https://roundtables.makaitalia.com'}/questions

Best regards,
Roundtable Automation System
          `
        }

        await notificationService['createAndSendNotification'](notification)
      }
    }
  } catch (error) {
    console.error('Error checking pending questions:', error)
  }
})

// Remind coordinators about pending feedback approvals - every day at 3 PM
cron.schedule('0 15 * * *', async () => {
  console.log('⚠️ Checking for pending feedback approvals...')

  try {
    const twoDaysAgo = subDays(new Date(), 2)

    // Find feedback pending approval for more than 2 days
    const pendingFeedback = await prisma.feedback.findMany({
      where: {
        status: 'PENDING',
        createdAt: { lte: twoDaysAgo }
      },
      include: {
        session: {
          include: {
            roundtable: true,
            topic: true
          }
        },
        participant: true,
        trainer: true
      }
    })

    if (pendingFeedback.length > 0) {
      console.log(`Found ${pendingFeedback.length} feedback items awaiting approval for >2 days`)

      // Send reminder to coordinators
      const coordinatorEmails = process.env.COORDINATOR_EMAILS?.split(',') || []

      for (const email of coordinatorEmails) {
        const notification = {
          type: 'PARTICIPANT_EMAIL' as const,
          recipient: email.trim(),
          subject: `⚠️ ${pendingFeedback.length} Feedback Items Awaiting Approval`,
          content: `
Hi,

There are ${pendingFeedback.length} feedback items that have been pending approval for more than 2 days:

${pendingFeedback.map(f => `
- ${f.participant.name} - Session ${f.session.sessionNumber}
  Roundtable: ${f.session.roundtable.name}
  Topic: ${f.session.topic?.title || 'General'}
  Trainer: ${f.trainer.name}
  Submitted: ${f.createdAt.toLocaleDateString()}
`).join('\n')}

Please review and approve these feedback items so they can be sent to participants.

Dashboard: ${process.env.FRONTEND_URL || 'https://roundtables.makaitalia.com'}/feedback

Best regards,
Roundtable Automation System
          `
        }

        await notificationService['createAndSendNotification'](notification)
      }
    }
  } catch (error) {
    console.error('Error checking pending feedback:', error)
  }
})

// Remind trainers who haven't submitted questions - every day at 4 PM
cron.schedule('0 16 * * *', async () => {
  console.log('📝 Checking for trainers who haven\'t submitted questions...')

  try {
    const threeDaysFromNow = addDays(new Date(), 3)
    const oneWeekFromNow = addWeeks(new Date(), 1)

    // Find sessions happening in 3-7 days with no questions submitted
    const sessionsWithoutQuestions = await prisma.session.findMany({
      where: {
        scheduledAt: {
          gte: threeDaysFromNow,
          lte: oneWeekFromNow
        },
        status: { in: ['REMINDER_SENT', 'QUESTIONS_REQUESTED'] },
        questions: { none: {} },
        trainer: { isNot: null }
      },
      include: {
        trainer: true,
        roundtable: true,
        topic: true
      }
    })

    console.log(`Found ${sessionsWithoutQuestions.length} sessions needing question reminders`)

    for (const session of sessionsWithoutQuestions) {
      if (!session.trainer) continue

      const notification = {
        type: 'QUESTIONS_REQUEST' as const,
        recipient: session.trainer.email,
        subject: `⚠️ REMINDER: Questions Needed - Session ${session.sessionNumber}`,
        content: `
Dear ${session.trainer.name},

This is a reminder that we still need your 3 questions for the upcoming session:

Session: ${session.sessionNumber}/10
Roundtable: ${session.roundtable.name}
Topic: ${session.topic?.title || 'TBD'}
Date: ${session.scheduledAt.toLocaleDateString()}

The session is in ${Math.ceil((session.scheduledAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days.

Please submit your questions as soon as possible so we can send them to participants in time.

Submit here: ${process.env.FRONTEND_URL || 'https://roundtables.makaitalia.com'}/trainer/questions

Thank you,
The Maka Team
        `
      }

      await notificationService['createAndSendNotification'](notification)
      console.log(`✅ Reminder sent to ${session.trainer.name}`)
    }
  } catch (error) {
    console.error('Error sending trainer reminders:', error)
  }
})

// Remind trainers who haven't submitted feedback - every day at 7 PM
cron.schedule('0 19 * * *', async () => {
  console.log('💭 Checking for trainers who haven\'t submitted feedback...')

  try {
    const twoDaysAgo = subDays(new Date(), 2)

    // Find completed sessions from 2+ days ago with no feedback
    const sessionsWithoutFeedback = await prisma.session.findMany({
      where: {
        scheduledAt: { lte: twoDaysAgo },
        status: { in: ['COMPLETED', 'FEEDBACK_PENDING'] },
        feedback: { none: {} },
        trainer: { isNot: null }
      },
      include: {
        trainer: true,
        roundtable: {
          include: {
            participants: { where: { status: 'ACTIVE' } }
          }
        },
        topic: true
      }
    })

    console.log(`Found ${sessionsWithoutFeedback.length} sessions needing feedback reminders`)

    for (const session of sessionsWithoutFeedback) {
      if (!session.trainer) continue

      const notification = {
        type: 'FEEDBACK_REQUEST' as const,
        recipient: session.trainer.email,
        subject: `⚠️ URGENT: Feedback Needed - Session ${session.sessionNumber}`,
        content: `
Dear ${session.trainer.name},

This is an urgent reminder that we still need individual feedback for each participant from your recent session:

Session: ${session.sessionNumber}/10
Roundtable: ${session.roundtable.name}
Topic: ${session.topic?.title || 'General Discussion'}
Date: ${session.scheduledAt.toLocaleDateString()} (${Math.ceil((new Date().getTime() - session.scheduledAt.getTime()) / (1000 * 60 * 60 * 24))} days ago)

Participants: ${session.roundtable.participants.length}

Please submit feedback for all participants as soon as possible.

Submit here: ${process.env.FRONTEND_URL || 'https://roundtables.makaitalia.com'}/trainer/feedback

Thank you,
The Maka Team
        `
      }

      await notificationService['createAndSendNotification'](notification)
      console.log(`✅ Feedback reminder sent to ${session.trainer.name}`)
    }
  } catch (error) {
    console.error('Error sending feedback reminders:', error)
  }
})

// Export for testing
export const jobs = {
  sendTrainerReminders: async () => {
    // Manual trigger for testing
    console.log('🧪 Manually triggering trainer reminders...')
    // Implementation same as scheduled job
  }
}