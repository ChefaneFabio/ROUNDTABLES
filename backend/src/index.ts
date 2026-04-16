import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import dotenv from 'dotenv'
import { prisma, disconnectPrisma, startKeepAlive } from './config/database'
import { standardLimiter } from './middleware/rateLimit'

// Import routes
import authRoutes from './controllers/authController'
import schoolRoutes from './controllers/schoolController'
import courseRoutes from './controllers/courseController'
import lessonRoutes from './controllers/lessonController'
import teacherRoutes from './controllers/teacherController'
import studentRoutes from './controllers/studentController'
import enrollmentRoutes from './controllers/enrollmentController'
import moduleRoutes from './controllers/moduleController'
import materialRoutes from './controllers/materialController'
import feedbackRoutes from './controllers/feedbackController'
import questionRoutes from './controllers/questionController'
import notificationRoutes from './controllers/notificationController'
import paymentRoutes from './controllers/paymentController'
import dashboardRoutes from './controllers/dashboardController'
import availabilityRoutes from './controllers/availabilityController'
import payrollRoutes from './controllers/payrollController'
import invoiceRoutes from './controllers/invoiceController'
// New feature routes
import assessmentRoutes from './controllers/assessmentController'
import certificateRoutes from './controllers/certificateController'
import analyticsRoutes from './controllers/analyticsController'
import ssoRoutes from './controllers/ssoController'
import externalApiRoutes from './controllers/externalApiController'
import recommendationRoutes from './controllers/recommendationController'
import chatRoutes from './controllers/chatController'
// Phase 2 feature routes
import videoLibraryRoutes from './controllers/videoLibraryController'
import exerciseRoutes from './controllers/exerciseController'
import speechRoutes from './controllers/speechController'
import sectionAssessmentRoutes from './controllers/sectionAssessmentController'
// B2B feature routes
import organizationRoutes from './controllers/organizationController'
import seatLicenseRoutes from './controllers/seatLicenseController'
import catalogRoutes from './controllers/catalogController'
// Stripe payment routes
import stripeRoutes from './controllers/stripeController'
// Learning path routes
import learningPathRoutes from './controllers/learningPathController'
// Organization contacts, exercise assignments, material codes
import organizationContactRoutes from './controllers/organizationContactController'
import assignmentRoutes from './controllers/assignmentController'
import materialCodeRoutes from './controllers/materialCodeController'
// Integration routes (HubSpot, QuickBooks)
import integrationsRoutes from './controllers/integrationsController'
// SCORM routes
import scormRoutes from './controllers/scormController'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { requestLogger } from './middleware/requestLogger'

// Import scheduled jobs
import './jobs/scheduler'

dotenv.config()

// Validate required secrets in production
if (process.env.NODE_ENV === 'production') {
  const required = ['JWT_SECRET', 'CORS_ORIGIN']
  const missing = required.filter(key => !process.env[key])
  if (missing.length > 0) {
    console.error(`FATAL: Missing required environment variables in production: ${missing.join(', ')}`)
    process.exit(1)
  }

  const recommended = ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET']
  const missingRecommended = recommended.filter(key => !process.env[key])
  if (missingRecommended.length > 0) {
    console.warn(`WARNING: Missing recommended environment variables: ${missingRecommended.join(', ')}`)
  }
}

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())

const corsOrigin = process.env.CORS_ORIGIN
  || (process.env.NODE_ENV === 'production' ? undefined : '*')

if (process.env.NODE_ENV === 'production' && !corsOrigin) {
  console.error('FATAL: CORS_ORIGIN must be set in production')
  process.exit(1)
}

app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Stripe webhook needs raw body for signature verification — mount BEFORE json parsing
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Request logging
app.use(requestLogger)

// Static file serving for TTS audio and speaking uploads
app.use('/audio', express.static(path.join(__dirname, '../public/audio')))
app.use('/uploads/speaking', express.static(path.join(__dirname, '../uploads/speaking')))
app.use('/uploads/assignments', express.static(path.join(__dirname, '../uploads/assignments')))
app.use('/scorm-content', express.static(path.join(__dirname, '../uploads/scorm')))

// Apply rate limiting to all routes
app.use(standardLimiter)

// Health check (no auth required)
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    res.json({
      success: true,
      status: 'OK',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    })
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'ERROR',
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    })
  }
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/schools', schoolRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/teachers', teacherRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/modules', moduleRoutes)
app.use('/api/materials', materialRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/availability', availabilityRoutes)
app.use('/api/payroll', payrollRoutes)
app.use('/api/invoices', invoiceRoutes)
// New feature routes — multi-skill must be registered BEFORE /assessments
// so Express matches the more specific prefix first
app.use('/api/assessments/multi-skill', sectionAssessmentRoutes)
app.use('/api/assessments', assessmentRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/sso', ssoRoutes)
app.use('/api/external', externalApiRoutes)
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/chat', chatRoutes)
// Phase 2 feature routes
app.use('/api/videos', videoLibraryRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/speech', speechRoutes)
// B2B feature routes
app.use('/api/organizations', organizationRoutes)
app.use('/api/seat-licenses', seatLicenseRoutes)
app.use('/api/catalog', catalogRoutes)
// Stripe payment routes
app.use('/api/stripe', stripeRoutes)
// Learning path routes
app.use('/api/learning-paths', learningPathRoutes)
app.use('/api/organizations', organizationContactRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/material-codes', materialCodeRoutes)
app.use('/api/integrations', integrationsRoutes)
app.use('/api/scorm', scormRoutes)

// Error handling
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    code: 'NOT_FOUND',
    path: req.originalUrl
  })
})

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received, shutting down gracefully...`)
  await disconnectPrisma()
  process.exit(0)
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Start server (skip in test to avoid port conflicts)
if (process.env.NODE_ENV !== 'test') {
  // Connect to DB and start keepalive before listening
  prisma.$connect()
    .then(() => {
      console.log('[DB] Connected successfully')
      startKeepAlive()
    })
    .catch((err: unknown) => {
      console.error('[DB] Initial connection failed:', err)
    })

  app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║         Maka LMC API Server                               ║
╠═══════════════════════════════════════════════════════════╣
║  Port:        ${PORT}                                         ║
║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(40)}║
║  Health:      http://localhost:${PORT}/health                 ║
╚═══════════════════════════════════════════════════════════╝
    `)
  })
}

export { prisma }
export default app
