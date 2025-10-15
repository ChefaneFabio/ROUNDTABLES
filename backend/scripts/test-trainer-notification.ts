import { PrismaClient } from '@prisma/client'
import { NotificationService } from '../src/services/NotificationService'

const prisma = new PrismaClient()
const notificationService = new NotificationService()

async function testTrainerNotification() {
  console.log('🧪 Testing Trainer Assignment Notification System\n')

  try {
    // Find the trainer JEAN and one of their sessions
    const trainer = await prisma.trainer.findUnique({
      where: { email: 'jean@trainer.com' },
      include: {
        sessions: {
          include: {
            roundtable: {
              include: {
                client: true,
                participants: { where: { status: 'ACTIVE' } }
              }
            },
            topic: true
          },
          take: 1
        }
      }
    })

    if (!trainer || !trainer.sessions[0]) {
      console.log('❌ Trainer JEAN or sessions not found. Run the seed script first.')
      return
    }

    const session = trainer.sessions[0]

    console.log('📋 Test Data:')
    console.log(`   Trainer: ${trainer.name} (${trainer.email})`)
    console.log(`   Session: ${session.sessionNumber}/10`)
    console.log(`   Roundtable: ${session.roundtable.name}`)
    console.log(`   Client: ${session.roundtable.client.name}`)
    console.log(`   Topic: ${session.topic?.title || 'TBD'}`)
    console.log(`   Scheduled: ${session.scheduledAt.toLocaleString()}`)
    console.log(`   Participants: ${session.roundtable.participants.length}`)
    console.log('')

    console.log('📧 Sending trainer assignment notification...')

    // Send the notification
    await notificationService.sendTrainerAssignmentNotification(session.id)

    console.log('✅ Notification sent successfully!\n')

    // Fetch the notification from database
    const notification = await prisma.notification.findFirst({
      where: {
        type: 'TRAINER_ASSIGNMENT',
        recipient: trainer.email
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (notification) {
      console.log('📬 Notification Details:')
      console.log(`   ID: ${notification.id}`)
      console.log(`   Type: ${notification.type}`)
      console.log(`   Recipient: ${notification.recipient}`)
      console.log(`   Subject: ${notification.subject}`)
      console.log(`   Status: ${notification.status}`)
      console.log(`   Scheduled At: ${notification.scheduledAt.toLocaleString()}`)
      console.log('')
      console.log('📄 Email Content Preview:')
      console.log('─'.repeat(80))
      console.log(notification.content.substring(0, 500) + '...')
      console.log('─'.repeat(80))
      console.log('')
      console.log('✅ Test completed successfully!')
      console.log('')
      console.log('💡 What happens next:')
      console.log('   1. In production, this email would be sent automatically')
      console.log('   2. In development, the notification is saved to database')
      console.log('   3. The trainer receives session details and deadlines')
      console.log('   4. The trainer can login to their portal to manage the session')
    } else {
      console.log('⚠️  Notification was sent but not found in database')
    }

  } catch (error) {
    console.error('❌ Error testing notification:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testTrainerNotification()
