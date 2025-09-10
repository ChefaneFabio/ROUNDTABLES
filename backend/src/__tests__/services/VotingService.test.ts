import { VotingService } from '../../services/VotingService'
import { RoundtableService } from '../../services/RoundtableService'
import { prisma } from '../setup'

describe('VotingService', () => {
  let votingService: VotingService
  let roundtableService: RoundtableService
  let testClientId: string
  let testRoundtableId: string
  let testParticipantEmail: string

  beforeAll(async () => {
    votingService = new VotingService()
    roundtableService = new RoundtableService()

    // Create test client
    const client = await prisma.client.create({
      data: {
        name: 'Test Client',
        email: 'test@example.com',
        company: 'Test Company'
      }
    })
    testClientId = client.id

    // Create test roundtable with topics
    const roundtable = await roundtableService.createRoundtable({
      name: 'Test Roundtable',
      clientId: testClientId,
      maxParticipants: 6,
      topics: [
        { title: 'Topic 1', description: 'Description 1' },
        { title: 'Topic 2', description: 'Description 2' },
        { title: 'Topic 3', description: 'Description 3' },
        { title: 'Topic 4', description: 'Description 4' },
        { title: 'Topic 5', description: 'Description 5' },
        { title: 'Topic 6', description: 'Description 6' },
        { title: 'Topic 7', description: 'Description 7' },
        { title: 'Topic 8', description: 'Description 8' },
        { title: 'Topic 9', description: 'Description 9' },
        { title: 'Topic 10', description: 'Description 10' }
      ]
    })
    testRoundtableId = roundtable.id

    // Update status to TOPIC_VOTING
    await roundtableService.updateStatus(testRoundtableId, 'TOPIC_VOTING')

    // Create test participant
    const participant = await prisma.participant.create({
      data: {
        name: 'Test Participant',
        email: 'participant@example.com',
        roundtableId: testRoundtableId,
        status: 'ACTIVE'
      }
    })
    testParticipantEmail = participant.email
  })

  afterEach(async () => {
    // Clean up votes between tests
    await prisma.topicVote.deleteMany({
      where: { roundtableId: testRoundtableId }
    })
  })

  describe('getVotingData', () => {
    it('should return voting data for valid participant', async () => {
      const votingData = await votingService.getVotingData(testRoundtableId, testParticipantEmail)

      expect(votingData).toBeDefined()
      expect(votingData.roundtable.id).toBe(testRoundtableId)
      expect(votingData.participant.email).toBe(testParticipantEmail)
      expect(votingData.topics).toHaveLength(10)
      expect(votingData.votingInstructions.maxSelections).toBe(8)
    })

    it('should throw error for non-existent participant', async () => {
      await expect(votingService.getVotingData(testRoundtableId, 'nonexistent@example.com'))
        .rejects.toThrow('You are not registered for this roundtable')
    })

    it('should throw error for non-existent roundtable', async () => {
      await expect(votingService.getVotingData('invalid-id', testParticipantEmail))
        .rejects.toThrow('Roundtable not found')
    })
  })

  describe('submitVotes', () => {
    it('should submit votes successfully', async () => {
      const topics = await prisma.topic.findMany({
        where: { roundtableId: testRoundtableId }
      })
      const topicIds = topics.slice(0, 8).map(t => t.id)

      const result = await votingService.submitVotes(testRoundtableId, testParticipantEmail, topicIds)

      expect(result.votesSubmitted).toBe(8)
      expect(result.message).toContain('successfully')

      // Verify votes were created
      const votes = await prisma.topicVote.findMany({
        where: { roundtableId: testRoundtableId }
      })
      expect(votes).toHaveLength(8)
    })

    it('should replace existing votes', async () => {
      const topics = await prisma.topic.findMany({
        where: { roundtableId: testRoundtableId }
      })

      // Submit first set of votes
      const firstTopicIds = topics.slice(0, 8).map(t => t.id)
      await votingService.submitVotes(testRoundtableId, testParticipantEmail, firstTopicIds)

      // Submit different set of votes
      const secondTopicIds = topics.slice(2, 10).map(t => t.id) // Different selection
      const result = await votingService.submitVotes(testRoundtableId, testParticipantEmail, secondTopicIds)

      expect(result.votesSubmitted).toBe(8)

      // Verify only latest votes exist
      const votes = await prisma.topicVote.findMany({
        where: { roundtableId: testRoundtableId }
      })
      expect(votes).toHaveLength(8)
      expect(votes.map(v => v.topicId).sort()).toEqual(secondTopicIds.sort())
    })

    it('should reject wrong number of topics', async () => {
      const topics = await prisma.topic.findMany({
        where: { roundtableId: testRoundtableId }
      })
      const topicIds = topics.slice(0, 5).map(t => t.id) // Only 5 topics

      await expect(votingService.submitVotes(testRoundtableId, testParticipantEmail, topicIds))
        .rejects.toThrow('You must select exactly 8 topics')
    })
  })

  describe('getVotingResults', () => {
    it('should return voting results with statistics', async () => {
      // Submit some votes first
      const topics = await prisma.topic.findMany({
        where: { roundtableId: testRoundtableId }
      })
      const topicIds = topics.slice(0, 8).map(t => t.id)
      await votingService.submitVotes(testRoundtableId, testParticipantEmail, topicIds)

      const results = await votingService.getVotingResults(testRoundtableId)

      expect(results.topics).toHaveLength(10)
      expect(results.statistics).toBeDefined()
      expect(results.statistics.totalParticipants).toBe(1)
      expect(results.statistics.votedParticipants).toBe(1)
      expect(results.statistics.votingProgress).toBe(100)
      expect(results.top8Topics).toHaveLength(8)

      // Check vote counts
      const votedTopics = results.topics.filter(t => t.voteCount > 0)
      expect(votedTopics).toHaveLength(8)
    })
  })

  describe('hasParticipantVoted', () => {
    it('should return false for participant who hasnt voted', async () => {
      const hasVoted = await votingService.hasParticipantVoted(testRoundtableId, testParticipantEmail)
      expect(hasVoted).toBe(false)
    })

    it('should return true for participant who has voted', async () => {
      // Submit votes
      const topics = await prisma.topic.findMany({
        where: { roundtableId: testRoundtableId }
      })
      const topicIds = topics.slice(0, 8).map(t => t.id)
      await votingService.submitVotes(testRoundtableId, testParticipantEmail, topicIds)

      const hasVoted = await votingService.hasParticipantVoted(testRoundtableId, testParticipantEmail)
      expect(hasVoted).toBe(true)
    })
  })

  describe('getVotingProgress', () => {
    it('should return voting progress statistics', async () => {
      const progress = await votingService.getVotingProgress(testRoundtableId)

      expect(progress).toBeDefined()
      expect(progress.totalParticipants).toBe(1)
      expect(progress.votedParticipants).toBe(0)
      expect(progress.progress).toBe(0)
      expect(progress.pendingParticipants).toHaveLength(1)
      expect(progress.canFinalize).toBe(false)
    })
  })
})