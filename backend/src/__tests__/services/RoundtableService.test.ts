import { RoundtableService } from '../../services/RoundtableService'
import { prisma } from '../setup'

describe('RoundtableService', () => {
  let roundtableService: RoundtableService
  let testClientId: string

  beforeAll(async () => {
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
  })

  afterEach(async () => {
    // Clean up test data
    await prisma.session.deleteMany()
    await prisma.topic.deleteMany()
    await prisma.roundtable.deleteMany({ where: { clientId: testClientId } })
  })

  describe('createRoundtable', () => {
    it('should create a roundtable with topics and sessions', async () => {
      const roundtableData = {
        name: 'Test Roundtable',
        description: 'Test description',
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
      }

      const roundtable = await roundtableService.createRoundtable(roundtableData)

      expect(roundtable).toBeDefined()
      expect(roundtable.name).toBe('Test Roundtable')
      expect(roundtable.status).toBe('SETUP')

      // Check topics were created
      const topics = await prisma.topic.findMany({
        where: { roundtableId: roundtable.id }
      })
      expect(topics).toHaveLength(10)

      // Check sessions were created
      const sessions = await prisma.session.findMany({
        where: { roundtableId: roundtable.id }
      })
      expect(sessions).toHaveLength(10)
      expect(sessions.map(s => s.sessionNumber).sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it('should fail with invalid client ID', async () => {
      const roundtableData = {
        name: 'Test Roundtable',
        clientId: 'invalid-id',
        maxParticipants: 6,
        topics: []
      }

      await expect(roundtableService.createRoundtable(roundtableData))
        .rejects.toThrow()
    })
  })

  describe('updateStatus', () => {
    it('should update roundtable status', async () => {
      const roundtable = await roundtableService.createRoundtable({
        name: 'Test Roundtable',
        clientId: testClientId,
        maxParticipants: 6,
        topics: [
          { title: 'Topic 1', description: 'Description 1' },
          { title: 'Topic 2', description: 'Description 2' }
        ]
      })

      const updated = await roundtableService.updateStatus(roundtable.id, 'TOPIC_VOTING')

      expect(updated.status).toBe('TOPIC_VOTING')
    })
  })

  describe('calculateProgress', () => {
    it('should calculate progress correctly', () => {
      const sessions = [
        { status: 'COMPLETED' },
        { status: 'COMPLETED' },
        { status: 'FEEDBACK_SENT' },
        { status: 'IN_PROGRESS' },
        { status: 'SCHEDULED' },
        { status: 'SCHEDULED' }
      ]

      const progress = roundtableService.calculateProgress(sessions as any)
      expect(progress).toBe(30) // 3 out of 10 completed = 30%
    })

    it('should return 0 for empty sessions', () => {
      const progress = roundtableService.calculateProgress([])
      expect(progress).toBe(0)
    })
  })

  describe('getDashboardStats', () => {
    it('should return dashboard statistics', async () => {
      // Create some test data
      await roundtableService.createRoundtable({
        name: 'Active Roundtable',
        clientId: testClientId,
        maxParticipants: 6,
        topics: [{ title: 'Topic 1', description: 'Description 1' }]
      })

      const stats = await roundtableService.getDashboardStats()

      expect(stats).toHaveProperty('totalRoundtables')
      expect(stats).toHaveProperty('activeRoundtables')
      expect(stats).toHaveProperty('totalParticipants')
      expect(stats).toHaveProperty('upcomingSessions')
      expect(stats).toHaveProperty('pendingFeedback')
      expect(typeof stats.totalRoundtables).toBe('number')
    })
  })
})