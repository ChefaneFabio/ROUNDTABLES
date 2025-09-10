import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Import routes
import clientRoutes from './controllers/clientController'
import roundtableRoutes from './controllers/roundtableController'
import sessionRoutes from './controllers/sessionController'
import participantRoutes from './controllers/participantController'
import notificationRoutes from './controllers/notificationController'
import topicRoutes from './controllers/topicController'
import questionRoutes from './controllers/questionController'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { requestLogger } from './middleware/requestLogger'

// Import scheduled jobs
import './jobs/scheduler'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

// Welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'Maka Roundtables API',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      health: '/health',
      documentation: '/api',
      clients: '/api/clients',
      roundtables: '/api/roundtables',
      sessions: '/api/sessions',
      participants: '/api/participants',
      topics: '/api/topics',
      voting: '/api/topics/vote/:roundtableId'
    },
    message: 'Welcome to Maka Roundtables Backend API'
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API documentation
app.get('/api', (req, res) => {
  res.json({
    title: 'API Documentation',
    endpoints: [
      { method: 'GET', path: '/api/clients', description: 'List clients' },
      { method: 'POST', path: '/api/roundtables', description: 'Create roundtable' },
      { method: 'GET', path: '/api/topics/vote/:id', description: 'Get voting page' },
      { method: 'POST', path: '/api/topics/vote/:id', description: 'Submit votes' }
    ]
  })
})

// API Routes
app.use('/api/clients', clientRoutes)
app.use('/api/roundtables', roundtableRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/participants', participantRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/questions', questionRoutes)

// Error handling
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`🚀 Roundtable API running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})

export { prisma }
export default app