import cron from 'node-cron'
import { PrismaClient } from '@prisma/client'
import { NotificationService } from '../services/NotificationService'
import { addDays, addWeeks, isToday, isTomorrow } from 'date-fns'

const prisma = new PrismaClient()
const notificationService = new NotificationService()

console.log('🕐 Job scheduler initialized')

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
  } catch (error) {
    console.error('Error in database cleanup job:', error)
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