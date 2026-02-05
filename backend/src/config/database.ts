import { PrismaClient } from '@prisma/client'

// PrismaClient singleton pattern to avoid multiple instances
// This prevents connection pool exhaustion in development with hot reloading

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
  })
}

export const prisma = globalThis.__prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}

// Graceful shutdown helper
export const disconnectPrisma = async () => {
  await prisma.$disconnect()
}
