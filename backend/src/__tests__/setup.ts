import { PrismaClient } from '@prisma/client'

// Test database setup
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/roundtables_test'
    }
  }
})

// Clean database before each test suite
beforeAll(async () => {
  // Clean up test data
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
})

// Clean up after all tests
afterAll(async () => {
  await prisma.$disconnect()
})

export { prisma }