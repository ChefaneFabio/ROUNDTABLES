import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createTestClient = async (overrides = {}) => {
  return prisma.client.create({
    data: {
      name: 'Test Client',
      email: `test-${Date.now()}@example.com`,
      company: 'Test Company',
      ...overrides
    }
  })
}

export const createTestTrainer = async (overrides = {}) => {
  return prisma.trainer.create({
    data: {
      name: 'Test Trainer',
      email: `trainer-${Date.now()}@example.com`,
      expertise: ['Leadership'],
      ...overrides
    }
  })
}

export const createTestRoundtable = async (clientId: string, overrides = {}) => {
  return prisma.roundtable.create({
    data: {
      name: 'Test Roundtable',
      clientId,
      maxParticipants: 6,
      status: 'SETUP',
      ...overrides
    }
  })
}

export const createTestTopics = async (roundtableId: string) => {
  const topicsData = [
    { title: 'Leadership', description: 'Leadership skills' },
    { title: 'Communication', description: 'Communication skills' },
    { title: 'Teamwork', description: 'Teamwork skills' },
    { title: 'Problem Solving', description: 'Problem solving skills' },
    { title: 'Time Management', description: 'Time management skills' },
    { title: 'Negotiation', description: 'Negotiation skills' },
    { title: 'Presentation', description: 'Presentation skills' },
    { title: 'Innovation', description: 'Innovation skills' },
    { title: 'Decision Making', description: 'Decision making skills' },
    { title: 'Conflict Resolution', description: 'Conflict resolution skills' }
  ]

  return prisma.topic.createMany({
    data: topicsData.map(topic => ({
      ...topic,
      roundtableId
    }))
  })
}

export const createTestParticipant = async (roundtableId: string, overrides = {}) => {
  return prisma.participant.create({
    data: {
      name: 'Test Participant',
      email: `participant-${Date.now()}@example.com`,
      roundtableId,
      status: 'ACTIVE',
      languageLevel: 'B1',
      ...overrides
    }
  })
}

export const createTestSessions = async (roundtableId: string) => {
  const sessionsData = Array.from({ length: 10 }, (_, i) => ({
    sessionNumber: i + 1,
    scheduledAt: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000), // Each day ahead
    roundtableId,
    status: 'SCHEDULED' as const
  }))

  return prisma.session.createMany({
    data: sessionsData
  })
}

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const expectToThrowAsync = async (fn: () => Promise<any>, expectedError?: string) => {
  try {
    await fn()
    throw new Error('Expected function to throw, but it did not')
  } catch (error: any) {
    if (expectedError && !error.message.includes(expectedError)) {
      throw new Error(`Expected error to contain "${expectedError}", but got "${error.message}"`)
    }
    return error
  }
}

export const cleanupTestData = async () => {
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
}