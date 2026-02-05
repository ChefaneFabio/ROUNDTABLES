import { PrismaClient } from '@prisma/client'
import { RoundtableService } from './services/RoundtableService'
import { VotingService } from './services/VotingService'
import { NotificationService } from './services/NotificationService'

const prisma = new PrismaClient()

export async function createTestData() {
  console.log('🧪 Creating test data...')

  try {
    // 1. Create test client
    const client = await prisma.client.create({
      data: {
        name: 'Mario Rossi',
        email: 'mario.rossi@fastweb.it',
        company: 'Fastweb',
        description: 'Test client for roundtable demo'
      }
    })

    console.log('✅ Created test client:', client.name)

    // 2. Create test trainers
    const trainers = await Promise.all([
      prisma.trainer.create({
        data: {
          name: 'Jean Kamotondo',
          email: 'jean@makaitalia.com',
          expertise: ['Leadership', 'Communication', 'Negotiation']
        }
      }),
      prisma.trainer.create({
        data: {
          name: 'Anna Smith',
          email: 'anna@makaitalia.com',
          expertise: ['Presentation Skills', 'Team Management']
        }
      }),
      prisma.trainer.create({
        data: {
          name: 'Marco Bianchi',
          email: 'marco@makaitalia.com',
          expertise: ['Digital Transformation', 'Innovation']
        }
      })
    ])

    console.log('✅ Created test trainers:', trainers.length)

    // 3. Create test roundtable with topics
    const roundtableService = new RoundtableService()
    
    const roundtable = await roundtableService.createRoundtable({
      name: 'Leadership & Communication Skills',
      description: 'Advanced leadership and communication roundtable for Fastweb executives',
      clientId: client.id,
      maxParticipants: 6,
      topics: [
        {
          title: 'The Art of Negotiation',
          description: 'Master negotiation techniques for business success and relationship building'
        },
        {
          title: 'Effective Leadership in Remote Teams',
          description: 'Leading and motivating distributed teams in the digital workplace'
        },
        {
          title: 'Presentation Skills & Public Speaking',
          description: 'Develop confidence and impact in presentations and public speaking'
        },
        {
          title: 'Conflict Resolution Strategies',
          description: 'Navigate workplace conflicts and turn them into opportunities'
        },
        {
          title: 'Digital Communication Best Practices',
          description: 'Optimize communication in digital channels and virtual meetings'
        },
        {
          title: 'Building High-Performance Teams',
          description: 'Create and maintain teams that deliver exceptional results'
        },
        {
          title: 'Strategic Decision Making',
          description: 'Framework for making effective decisions under uncertainty'
        },
        {
          title: 'Change Management & Innovation',
          description: 'Lead organizational change and foster innovation culture'
        },
        {
          title: 'Cross-Cultural Communication',
          description: 'Navigate cultural differences in international business'
        },
        {
          title: 'Time Management & Productivity',
          description: 'Optimize personal and team productivity in fast-paced environments'
        }
      ]
    })

    console.log('✅ Created test roundtable:', roundtable.name)

    // 4. Create test participants
    const participants = await Promise.all([
      prisma.participant.create({
        data: {
          name: 'Giulia Ferrari',
          email: 'giulia.ferrari@fastweb.it',
          company: 'Fastweb',
          languageLevel: 'B2',
          status: 'ACTIVE',
          roundtableId: roundtable.id
        }
      }),
      prisma.participant.create({
        data: {
          name: 'Alessandro Conti',
          email: 'alessandro.conti@fastweb.it',
          company: 'Fastweb',
          languageLevel: 'B1',
          status: 'ACTIVE',
          roundtableId: roundtable.id
        }
      }),
      prisma.participant.create({
        data: {
          name: 'Francesca Romano',
          email: 'francesca.romano@fastweb.it',
          company: 'Fastweb',
          languageLevel: 'C1',
          status: 'ACTIVE',
          roundtableId: roundtable.id
        }
      }),
      prisma.participant.create({
        data: {
          name: 'Stefano Marino',
          email: 'stefano.marino@fastweb.it',
          company: 'Fastweb',
          languageLevel: 'B2',
          status: 'ACTIVE',
          roundtableId: roundtable.id
        }
      })
    ])

    console.log('✅ Created test participants:', participants.length)

    return {
      client,
      roundtable,
      participants,
      trainers,
      votingUrl: `http://localhost:3000/vote/${roundtable.id}?email=giulia.ferrari@fastweb.it`
    }

  } catch (error) {
    console.error('❌ Error creating test data:', error)
    throw error
  }
}

export async function testVotingFlow(roundtableId: string, participantEmail: string) {
  console.log('🗳️ Testing voting flow...')
  
  const votingService = new VotingService()

  try {
    // 1. Get voting data
    const votingData = await votingService.getVotingData(roundtableId, participantEmail)
    console.log('✅ Got voting data for:', votingData.participant.name)

    // 2. Simulate vote submission (select first 8 topics)
    const topicIds = votingData.topics.slice(0, 8).map(t => t.id)
    
    const voteResult = await votingService.submitVotes(roundtableId, participantEmail, topicIds)
    console.log('✅ Submitted votes:', voteResult.votesSubmitted)

    // 3. Check voting results
    const results = await votingService.getVotingResults(roundtableId)
    console.log('✅ Voting results:', results.statistics)

    return results
  } catch (error) {
    console.error('❌ Error in voting flow:', error)
    throw error
  }
}

export async function testNotificationSystem() {
  console.log('📧 Testing notification system...')
  
  const notificationService = new NotificationService()

  try {
    // Test email template rendering
    const templateService = (notificationService as any).templateService
    
    const testData = {
      trainerName: 'Jean Kamotondo',
      sessionDate: new Date().toLocaleDateString(),
      sessionTime: '14:00',
      clientName: 'Mario Rossi',
      clientCompany: 'Fastweb',
      roundtableName: 'Leadership Skills',
      sessionNumber: 2,
      topicTitle: 'The Art of Negotiation',
      participantCount: 4
    }

    const { subject, html } = await templateService.renderTemplate('trainer_reminder', testData)
    
    console.log('✅ Template rendered successfully')
    console.log('Subject:', subject)
    console.log('HTML length:', html.length)

    return { subject, html }
  } catch (error) {
    console.error('❌ Error testing notifications:', error)
    throw error
  }
}

export async function cleanupTestData() {
  console.log('🧹 Cleaning up test data...')
  
  try {
    await prisma.topicVote.deleteMany()
    await prisma.notification.deleteMany()
    await prisma.feedback.deleteMany()
    await prisma.question.deleteMany()
    await prisma.session.deleteMany()
    await prisma.topic.deleteMany()
    await prisma.participant.deleteMany()
    await prisma.roundtable.deleteMany()
    await prisma.trainer.deleteMany()
    await prisma.client.deleteMany()
    
    console.log('✅ Test data cleaned up')
  } catch (error) {
    console.error('❌ Error cleaning up:', error)
    throw error
  }
}

// Run tests if called directly
if (require.main === module) {
  async function runTests() {
    try {
      console.log('🚀 Starting Roundtable System Tests\n')
      
      // 1. Create test data
      const testData = await createTestData()
      console.log('\n📊 Test data created successfully')
      
      // 2. Test voting
      await testVotingFlow(testData.roundtable.id, testData.participants[0].email)
      console.log('\n🗳️ Voting flow tested successfully')
      
      // 3. Test notifications
      await testNotificationSystem()
      console.log('\n📧 Notification system tested successfully')
      
      console.log('\n✅ All tests completed successfully!')
      console.log('\n🔗 Test voting URL:', testData.votingUrl)
      
      // Don't cleanup automatically - let user explore
      console.log('\n💡 Test data preserved for exploration')
      console.log('   Run cleanupTestData() when done testing')
      
    } catch (error) {
      console.error('\n❌ Tests failed:', error)
      process.exit(1)
    } finally {
      await prisma.$disconnect()
    }
  }
  
  runTests()
}