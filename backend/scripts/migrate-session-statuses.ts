import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Migration script to convert old single-column session status
 * to new 3-column design (status, questionsStatus, feedbacksStatus)
 */

async function migrateSessionStatuses() {
  console.log('🔄 Starting session status migration...')
  console.log('')

  try {
    // Get all sessions with current status
    const sessions = await prisma.$queryRaw<Array<{ id: string; status: string; sessionNumber: number }>>`
      SELECT id, status, "sessionNumber"
      FROM sessions
    `

    console.log(`Found ${sessions.length} sessions to migrate`)
    console.log('')

    // Mapping logic from old single status to new 3 columns:
    const migrations = sessions.map((session) => {
      let newStatus = 'SCHEDULED'
      let questionsStatus = 'NOT_REQUESTED'
      let feedbacksStatus = 'NOT_REQUESTED'

      switch (session.status) {
        case 'SCHEDULED':
          newStatus = 'SCHEDULED'
          questionsStatus = 'NOT_REQUESTED'
          feedbacksStatus = 'NOT_REQUESTED'
          break

        case 'REMINDER_SENT':
        case 'QUESTIONS_REQUESTED':
          newStatus = 'SCHEDULED'
          questionsStatus = 'REQUESTED_FROM_COORDINATOR'
          feedbacksStatus = 'NOT_REQUESTED'
          break

        case 'QUESTIONS_READY':
          newStatus = 'SCHEDULED'
          questionsStatus = 'SENT_TO_PARTICIPANTS'
          feedbacksStatus = 'NOT_REQUESTED'
          break

        case 'IN_PROGRESS':
          newStatus = 'IN_PROGRESS'
          questionsStatus = 'SENT_TO_PARTICIPANTS'
          feedbacksStatus = 'NOT_REQUESTED'
          break

        case 'FEEDBACK_PENDING':
          newStatus = 'COMPLETED'
          questionsStatus = 'SENT_TO_PARTICIPANTS'
          feedbacksStatus = 'REQUESTED_FROM_COORDINATOR'
          break

        case 'FEEDBACK_SENT':
        case 'COMPLETED':
          newStatus = 'COMPLETED'
          questionsStatus = 'SENT_TO_PARTICIPANTS'
          feedbacksStatus = 'SENT_TO_PARTICIPANTS'
          break

        case 'CANCELLED':
          newStatus = 'CANCELLED'
          questionsStatus = 'NOT_REQUESTED'
          feedbacksStatus = 'NOT_REQUESTED'
          break

        default:
          console.warn(`⚠️  Unknown status: ${session.status} for session ${session.id}`)
          newStatus = 'SCHEDULED'
          questionsStatus = 'NOT_REQUESTED'
          feedbacksStatus = 'NOT_REQUESTED'
      }

      return {
        id: session.id,
        sessionNumber: session.sessionNumber,
        oldStatus: session.status,
        newStatus,
        questionsStatus,
        feedbacksStatus
      }
    })

    // Display migration plan
    console.log('📋 Migration Plan:')
    console.log('')
    migrations.forEach(m => {
      console.log(`Session ${m.sessionNumber}:`)
      console.log(`  OLD: ${m.oldStatus}`)
      console.log(`  NEW: status=${m.newStatus}, questions=${m.questionsStatus}, feedbacks=${m.feedbacksStatus}`)
      console.log('')
    })

    // Execute migrations using raw SQL (since schema not yet updated)
    console.log('✍️  Applying migrations...')
    for (const migration of migrations) {
      await prisma.$executeRaw`
        UPDATE sessions
        SET
          status = ${migration.newStatus}::text::"SessionStatus",
          "questionsStatus" = ${migration.questionsStatus}::text::"QuestionsStatus",
          "feedbacksStatus" = ${migration.feedbacksStatus}::text::"FeedbacksStatus"
        WHERE id = ${migration.id}
      `
      console.log(`  ✅ Session ${migration.sessionNumber} migrated`)
    }

    console.log('')
    console.log('✅ Migration completed successfully!')
    console.log(`   Migrated ${migrations.length} sessions`)

  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

migrateSessionStatuses()
