import { prisma } from '../config/database'

// Clean up database connection after all tests
afterAll(async () => {
  await prisma.$disconnect()
})
