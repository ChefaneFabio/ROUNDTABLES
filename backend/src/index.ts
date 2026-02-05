import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { prisma, disconnectPrisma } from './config/database'
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

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { requestLogger } from './middleware/requestLogger'

// Import scheduled jobs
import './jobs/scheduler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Request logging
app.use(requestLogger)

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

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║         ROUNDTABLES LMS API Server                        ║
╠═══════════════════════════════════════════════════════════╣
║  Port:        ${PORT}                                         ║
║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(40)}║
║  Health:      http://localhost:${PORT}/health                 ║
╚═══════════════════════════════════════════════════════════╝
  `)
})

export { prisma }
export default app
