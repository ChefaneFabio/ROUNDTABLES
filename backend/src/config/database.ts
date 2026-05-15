import { PrismaClient } from '@prisma/client'

// PrismaClient singleton pattern to avoid multiple instances
// This prevents connection pool exhaustion in development with hot reloading

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

// Bump connection pool from Prisma's default (num_cpus * 2 + 1, ≈3 on small
// Render plans) to a value that survives 200 concurrent placement tests.
// Override via PRISMA_CONNECTION_LIMIT env var if you need to tune further.
const withPoolLimit = (rawUrl: string | undefined): string | undefined => {
  if (!rawUrl) return rawUrl
  try {
    const url = new URL(rawUrl)
    if (!url.searchParams.has('connection_limit')) {
      url.searchParams.set('connection_limit', process.env.PRISMA_CONNECTION_LIMIT || '30')
    }
    return url.toString()
  } catch {
    return rawUrl
  }
}

const prismaClientSingleton = () => {
  const datasourceUrl = withPoolLimit(process.env.DATABASE_URL)
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
    ...(datasourceUrl ? { datasources: { db: { url: datasourceUrl } } } : {}),
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
