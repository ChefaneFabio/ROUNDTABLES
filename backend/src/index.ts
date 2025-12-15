import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

// Import routes
import authRoutes from './controllers/authController'
import auditLogRoutes from './controllers/auditLogController'
import clientRoutes from './controllers/clientController'
import roundtableRoutes from './controllers/roundtableController'
import sessionRoutes from './controllers/sessionController'
import participantRoutes from './controllers/participantController'
import notificationRoutes from './controllers/notificationController'
import topicRoutes from './controllers/topicController'
import questionRoutes from './controllers/questionController'
import dashboardRoutes from './controllers/dashboardController'
import trainerRoutes from './controllers/trainerController'
import feedbackRoutes from './controllers/feedbackController'
import emailTemplateRoutes from './controllers/emailTemplateController'
import microsoftFormsRoutes from './controllers/microsoftFormsController'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { requestLogger } from './middleware/requestLogger'
import { apiLimiter } from './middleware/rateLimiter'

// Import scheduled jobs
import './jobs/scheduler'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

// Allowed frontend origins (NO WILDCARDS for security)
const allowedOrigins = [
  'https://roundtables-frontend-final.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
]

// Add specific preview deployments if needed
if (process.env.VERCEL_PREVIEW_ORIGIN) {
  allowedOrigins.push(process.env.VERCEL_PREVIEW_ORIGIN)
}

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}))

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.warn(`Blocked request from unauthorized origin: ${origin}`)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // Cache preflight requests for 24 hours
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(requestLogger)

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter)

// Welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'Maka Roundtables API',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      health: '/health',
      documentation: '/api',
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      clients: '/api/clients',
      roundtables: '/api/roundtables',
      sessions: '/api/sessions',
      participants: '/api/participants',
      topics: '/api/topics',
      voting: '/api/topics/vote/:roundtableId',
      formsVoting: '/api/forms/vote/:token',
      trainers: '/api/trainers',
      feedback: '/api/feedback',
      emailTemplates: '/api/email-templates'
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
      { method: 'GET', path: '/api/dashboard/stats', description: 'Get dashboard statistics' },
      { method: 'GET', path: '/api/clients', description: 'List clients' },
      { method: 'POST', path: '/api/clients', description: 'Create client' },
      { method: 'GET', path: '/api/roundtables', description: 'List roundtables' },
      { method: 'POST', path: '/api/roundtables', description: 'Create roundtable' },
      { method: 'GET', path: '/api/topics/vote/:id', description: 'Get voting page' },
      { method: 'POST', path: '/api/topics/vote/:id', description: 'Submit votes' },
      { method: 'GET', path: '/api/trainers', description: 'List trainers' },
      { method: 'POST', path: '/api/trainers', description: 'Create trainer' },
      { method: 'GET', path: '/api/feedback', description: 'List feedback' },
      { method: 'POST', path: '/api/feedback', description: 'Submit feedback' },
      { method: 'GET', path: '/api/email-templates', description: 'List email templates' },
      { method: 'POST', path: '/api/email-templates', description: 'Create email template' }
    ]
  })
})

// API Routes
app.use('/api/auth', authRoutes) // Authentication routes (public + protected)
app.use('/api/audit-logs', auditLogRoutes) // Audit logs (admin only)
app.use('/api/forms', microsoftFormsRoutes) // Microsoft Forms integration (token-based)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/roundtables', roundtableRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/participants', participantRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/trainers', trainerRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/email-templates', emailTemplateRoutes)

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

// Initialize default users on startup
async function initializeDefaultUsers() {
  try {
    // Create default admin user if not exists
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@makaitalia.com' }
    })

    if (!adminExists) {
      const hashedAdminPassword = await bcrypt.hash('Admin123!', 10)
      await prisma.user.create({
        data: {
          email: 'admin@makaitalia.com',
          password: hashedAdminPassword,
          name: 'Admin',
          role: 'ADMIN',
          isActive: true
        }
      })
      console.log('✅ Default admin user created: admin@makaitalia.com')
    }

    // Create default trainer user if not exists
    const trainerUserExists = await prisma.user.findUnique({
      where: { email: 'jean@trainer.com' }
    })

    if (!trainerUserExists) {
      const hashedTrainerPassword = await bcrypt.hash('Trainer123!', 10)
      await prisma.user.create({
        data: {
          email: 'jean@trainer.com',
          password: hashedTrainerPassword,
          name: 'JEAN',
          role: 'TRAINER',
          isActive: true
        }
      })
      console.log('✅ Default trainer user created: jean@trainer.com')
    }

    // Create trainer profile if not exists
    const trainerProfileExists = await prisma.trainer.findUnique({
      where: { email: 'jean@trainer.com' }
    })

    if (!trainerProfileExists) {
      await prisma.trainer.create({
        data: {
          name: 'JEAN',
          email: 'jean@trainer.com',
          phone: '+39 333 123 4567',
          expertise: ['Leadership', 'Team Management', 'Communication', 'Innovation'],
          languages: ['English', 'Italian'],
          hourlyRate: 85,
          availability: { mon: true, tue: true, wed: true, thu: true, fri: true },
          notes: 'Senior trainer specializing in corporate leadership development',
          rating: 4.8,
          isActive: true
        }
      })
      console.log('✅ Default trainer profile created: JEAN')
    }
  } catch (error) {
    console.error('Error initializing default users:', error)
  }
}

app.listen(PORT, async () => {
  console.log(`🚀 Roundtable API running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)

  // Initialize default users
  await initializeDefaultUsers()
})

export { prisma }
export default app