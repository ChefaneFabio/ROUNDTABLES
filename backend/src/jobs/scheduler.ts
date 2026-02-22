import cron from 'node-cron'
import { emailService } from '../services/EmailService'
import { lessonReminderService } from '../services/LessonReminderService'

if (!emailService.isConfigured()) {
  console.log('[Scheduler] SMTP not configured — lesson reminder scheduler skipped')
} else {
  // Run every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('[Scheduler] Running lesson reminder check...')
    try {
      const result = await lessonReminderService.sendUpcomingLessonReminders()
      if (result.sent > 0 || result.failed > 0) {
        console.log(`[Scheduler] Lesson reminders: ${result.sent} sent, ${result.failed} failed`)
      }
    } catch (error) {
      console.error('[Scheduler] Lesson reminder job failed:', error)
    }
  })

  console.log('[Scheduler] Lesson reminder scheduler started (every 15 minutes)')
}
