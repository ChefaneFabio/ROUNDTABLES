import { PrismaClient } from '@prisma/client'
import { RoundtableService } from '../../services/RoundtableService'
import { VotingService } from '../../services/VotingService'
import { QuestionService } from '../../services/QuestionService'
import { NotificationService } from '../../services/NotificationService'
import {
  createTestClient,
  createTestTrainer,
  createTestParticipant,
  cleanupTestData
} from '../utils/testHelpers'

const prisma = new PrismaClient()

describe('End-to-End Workflow Tests', () => {
  let roundtableService: RoundtableService
  let votingService: VotingService
  let questionService: QuestionService
  let notificationService: NotificationService

  let testClientId: string
  let testTrainerId: string
  let testRoundtableId: string
  let testParticipantEmail: string

  beforeAll(async () => {
    roundtableService = new RoundtableService()
    votingService = new VotingService()
    questionService = new QuestionService()
    notificationService = new NotificationService()

    await cleanupTestData()

    // Create test data
    const client = await createTestClient({ name: 'E2E Test Client' })
    testClientId = client.id

    const trainer = await createTestTrainer({ name: 'E2E Test Trainer' })
    testTrainerId = trainer.id
  })

  afterAll(async () => {
    await cleanupTestData()
    await prisma.$disconnect()
  })

  describe('Complete Roundtable Workflow', () => {
    it('should execute the full roundtable lifecycle', async () => {
      // Step 1: Create Roundtable with 10 topics
      console.log('Step 1: Creating roundtable...')
      
      const roundtable = await roundtableService.createRoundtable({
        name: 'E2E Test Roundtable',
        description: 'End-to-end test roundtable',
        clientId: testClientId,
        maxParticipants: 6,
        topics: [
          { title: 'Leadership Development', description: 'Advanced leadership skills' },
          { title: 'Effective Communication', description: 'Master communication techniques' },
          { title: 'Team Management', description: 'Building high-performance teams' },
          { title: 'Negotiation Skills', description: 'Advanced negotiation strategies' },
          { title: 'Presentation Mastery', description: 'Public speaking excellence' },
          { title: 'Conflict Resolution', description: 'Resolving workplace conflicts' },
          { title: 'Strategic Decision Making', description: 'Data-driven decision processes' },
          { title: 'Change Management', description: 'Leading organizational transformation' },
          { title: 'Innovation Leadership', description: 'Fostering creative solutions' },
          { title: 'Digital Communication', description: 'Virtual leadership skills' }
        ]
      })

      testRoundtableId = roundtable.id
      expect(roundtable.status).toBe('SETUP')

      // Verify 10 sessions were created
      const sessions = await prisma.session.findMany({
        where: { roundtableId: testRoundtableId }
      })
      expect(sessions).toHaveLength(10)

      // Step 2: Add participants
      console.log('Step 2: Adding participants...')
      
      const participants = await Promise.all([
        createTestParticipant(testRoundtableId, { name: 'Alice Johnson', email: 'alice@test.com' }),
        createTestParticipant(testRoundtableId, { name: 'Bob Smith', email: 'bob@test.com' }),
        createTestParticipant(testRoundtableId, { name: 'Carol Davis', email: 'carol@test.com' }),
        createTestParticipant(testRoundtableId, { name: 'David Wilson', email: 'david@test.com' })
      ])

      testParticipantEmail = participants[0].email
      expect(participants).toHaveLength(4)

      // Step 3: Start topic voting
      console.log('Step 3: Starting topic voting...')
      
      const votingResult = await roundtableService.startTopicVoting(testRoundtableId)
      expect(votingResult.votingUrl).toContain('/vote/')

      // Step 4: Participants vote on topics (each selects 8 out of 10)
      console.log('Step 4: Participants voting...')
      
      const topics = await prisma.topic.findMany({
        where: { roundtableId: testRoundtableId }
      })

      // Alice votes for first 8 topics
      const aliceTopics = topics.slice(0, 8).map(t => t.id)
      await votingService.submitVotes(testRoundtableId, participants[0].email, aliceTopics)

      // Bob votes for topics 2-9
      const bobTopics = topics.slice(1, 9).map(t => t.id)
      await votingService.submitVotes(testRoundtableId, participants[1].email, bobTopics)

      // Carol votes for topics 0,2,3,4,5,6,7,9
      const carolTopics = [0,2,3,4,5,6,7,9].map(i => topics[i].id)
      await votingService.submitVotes(testRoundtableId, participants[2].email, carolTopics)

      // David votes for last 8 topics
      const davidTopics = topics.slice(2, 10).map(t => t.id)
      await votingService.submitVotes(testRoundtableId, participants[3].email, davidTopics)

      // Step 5: Finalize topic voting (selects top 8)
      console.log('Step 5: Finalizing topic voting...')
      
      const finalizeResult = await roundtableService.finalizeTopicVoting(testRoundtableId)
      expect(finalizeResult.selectedTopics).toHaveLength(8)
      expect(finalizeResult.rejectedTopics).toHaveLength(2)

      // Verify roundtable status updated
      const updatedRoundtable = await prisma.roundtable.findUnique({
        where: { id: testRoundtableId }
      })
      expect(updatedRoundtable?.status).toBe('SCHEDULED')

      // Step 6: Schedule all sessions with dates
      console.log('Step 6: Scheduling sessions...')
      
      const startDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week from now
      const scheduleResult = await roundtableService.scheduleAllSessions(testRoundtableId, {
        startDate,
        sessionDuration: 60,
        sessionFrequency: 'weekly'
      })

      expect(scheduleResult.sessionsScheduled).toBe(10)

      // Step 7: Assign trainers to sessions 2-9
      console.log('Step 7: Assigning trainers...')
      
      // Assign trainer to session 2 (first topic discussion)
      const session2 = await prisma.session.findFirst({
        where: { roundtableId: testRoundtableId, sessionNumber: 2 }
      })
      
      await prisma.session.update({
        where: { id: session2!.id },
        data: { trainerId: testTrainerId }
      })

      // Step 8: Trainer submits questions for session 2
      console.log('Step 8: Submitting questions...')
      
      const questionSubmission = await questionService.submitQuestionsForSession({
        questions: [
          'What do you think makes an effective leader in today\'s business environment?',
          'How do you handle difficult conversations with team members?',
          'Can you share an example of when you had to adapt your leadership style?'
        ],
        trainerId: testTrainerId,
        sessionId: session2!.id
      })

      expect(questionSubmission.questionsSubmitted).toBe(3)

      // Step 9: Questions get reviewed and approved
      console.log('Step 9: Reviewing and approving questions...')
      
      const questions = await prisma.question.findMany({
        where: { sessionId: session2!.id }
      })

      const reviews = questions.map(q => ({
        questionId: q.id,
        status: 'APPROVED' as const,
        reviewNotes: 'Good question, approved for session'
      }))

      await questionService.reviewQuestions(reviews, 'reviewer-id')

      // Verify session status updated
      const updatedSession = await prisma.session.findUnique({
        where: { id: session2!.id }
      })
      expect(updatedSession?.status).toBe('QUESTIONS_READY')

      // Step 10: Verify complete workflow state
      console.log('Step 10: Verifying final state...')
      
      // Check roundtable progress
      const progress = roundtableService.calculateProgress(sessions)
      expect(progress).toBe(0) // No sessions completed yet

      // Check voting results
      const votingResults = await votingService.getVotingResults(testRoundtableId)
      expect(votingResults.statistics.votingProgress).toBe(100) // All participants voted
      expect(votingResults.statistics.selectedTopics).toBe(8)

      // Check questions dashboard
      const questionsDashboard = await questionService.getQuestionsDashboard()
      expect(questionsDashboard.totalQuestions).toBeGreaterThan(0)

      // Check dashboard stats
      const dashboardStats = await roundtableService.getDashboardStats()
      expect(dashboardStats.totalRoundtables).toBeGreaterThan(0)
      expect(dashboardStats.activeRoundtables).toBeGreaterThan(0)

      console.log('✅ Complete E2E workflow test passed!')
    }, 60000) // 60 second timeout for this comprehensive test

    it('should handle error scenarios in workflow', async () => {
      // Test voting with insufficient participants
      const smallRoundtable = await roundtableService.createRoundtable({
        name: 'Small Test Roundtable',
        clientId: testClientId,
        maxParticipants: 2,
        topics: [
          { title: 'Topic 1', description: 'Description 1' },
          { title: 'Topic 2', description: 'Description 2' }
        ]
      })

      // Try to start voting without participants
      await expect(roundtableService.startTopicVoting(smallRoundtable.id))
        .rejects.toThrow('Cannot start voting without participants')

      // Test invalid voting scenarios
      await createTestParticipant(smallRoundtable.id, { email: 'test@error.com' })
      await roundtableService.startTopicVoting(smallRoundtable.id)

      const topics = await prisma.topic.findMany({
        where: { roundtableId: smallRoundtable.id }
      })

      // Try to vote with wrong number of topics
      await expect(votingService.submitVotes(smallRoundtable.id, 'test@error.com', [topics[0].id]))
        .rejects.toThrow('You must select exactly 8 topics')

      // Try to submit questions without trainer assignment
      const sessions = await prisma.session.findMany({
        where: { roundtableId: smallRoundtable.id }
      })

      await expect(questionService.submitQuestionsForSession({
        questions: ['Q1', 'Q2', 'Q3'],
        trainerId: testTrainerId,
        sessionId: sessions[0].id
      })).rejects.toThrow('You are not assigned to this session')

      console.log('✅ Error handling workflow test passed!')
    })
  })

  describe('Performance and Scalability', () => {
    it('should handle multiple concurrent operations', async () => {
      // Create multiple roundtables concurrently
      const concurrentRoundtables = await Promise.all([
        roundtableService.createRoundtable({
          name: 'Concurrent RT 1',
          clientId: testClientId,
          maxParticipants: 4,
          topics: [{ title: 'Topic 1', description: 'Desc 1' }]
        }),
        roundtableService.createRoundtable({
          name: 'Concurrent RT 2',  
          clientId: testClientId,
          maxParticipants: 4,
          topics: [{ title: 'Topic 2', description: 'Desc 2' }]
        }),
        roundtableService.createRoundtable({
          name: 'Concurrent RT 3',
          clientId: testClientId,
          maxParticipants: 4,
          topics: [{ title: 'Topic 3', description: 'Desc 3' }]
        })
      ])

      expect(concurrentRoundtables).toHaveLength(3)
      concurrentRoundtables.forEach(rt => {
        expect(rt.status).toBe('SETUP')
      })

      console.log('✅ Concurrent operations test passed!')
    })
  })
})