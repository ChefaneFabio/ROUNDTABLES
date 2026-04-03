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

// Keep DB connection alive — Render free-tier PG drops idle connections
// Runs a lightweight query every 4 minutes to prevent connection closure
let keepAliveInterval: ReturnType<typeof setInterval> | null = null

export const startKeepAlive = () => {
  if (keepAliveInterval) return
  keepAliveInterval = setInterval(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`
    } catch (e) {
      console.error('[DB KeepAlive] Connection lost, reconnecting...')
      try {
        await prisma.$disconnect()
        await prisma.$connect()
        console.log('[DB KeepAlive] Reconnected successfully')
      } catch (reconnectErr) {
        console.error('[DB KeepAlive] Reconnect failed:', reconnectErr)
      }
    }
  }, 4 * 60 * 1000) // every 4 minutes
}

// Graceful shutdown helper
export const disconnectPrisma = async () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval)
    keepAliveInterval = null
  }
  await prisma.$disconnect()
}
