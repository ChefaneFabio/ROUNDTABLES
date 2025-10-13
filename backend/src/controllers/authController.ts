import { Router, Request, Response } from 'express'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { auditLog } from '../services/AuditLogService'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(100).required(),
  role: Joi.string().valid(...Object.values(Role)).optional()
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required()
})

/**
 * Generate JWT token for user
 */
const generateToken = (userId: string, email: string, role: Role): string => {
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    throw new Error('JWT_SECRET not configured')
  }

  return jwt.sign(
    { userId, email, role },
    jwtSecret,
    { expiresIn: '24h' } // Token expires in 24 hours
  )
}

/**
 * POST /api/auth/register - Register new user
 * Only ADMIN users can create new users
 */
router.post('/register',
  authenticate, // Require authentication
  validateRequest(registerSchema),
  async (req: Request, res: Response) => {
    try {
      // Only admins can create users
      if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({
          success: false,
          error: 'Only administrators can create new users'
        })
      }

      const { email, password, name, role } = req.body

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User with this email already exists'
        })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: role || 'COORDINATOR' // Default to COORDINATOR
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true
        }
      })

      // Audit log
      await auditLog.logUserCreate(user.id, req.user!.id, req)

      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      })
    } catch (error) {
      console.error('Registration error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to create user'
      })
    }
  }
)

/**
 * POST /api/auth/login - User login
 * Public endpoint
 */
router.post('/login', validateRequest(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Generic error message to prevent email enumeration
    const invalidCredentialsError = {
      success: false,
      error: 'Invalid email or password'
    }

    if (!user) {
      await auditLog.logLoginFailed(email, req, 'User not found')
      return res.status(401).json(invalidCredentialsError)
    }

    // Check if user is active
    if (!user.isActive) {
      await auditLog.logLoginFailed(email, req, 'Account deactivated')
      return res.status(403).json({
        success: false,
        error: 'Your account has been deactivated. Please contact an administrator.'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      await auditLog.logLoginFailed(email, req, 'Invalid password')
      return res.status(401).json(invalidCredentialsError)
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    })

    // Generate token
    const token = generateToken(user.id, user.email, user.role)

    // Audit log successful login
    await auditLog.logLogin(user.id, req)

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      },
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      error: 'Login failed. Please try again.'
    })
  }
})

/**
 * GET /api/auth/me - Get current user info
 * Requires authentication
 */
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user information'
    })
  }
})

/**
 * POST /api/auth/change-password - Change user password
 * Requires authentication
 */
router.post('/change-password',
  authenticate,
  validateRequest(changePasswordSchema),
  async (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body
      const userId = req.user!.id

      // Get user with password
      const user = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        })
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password)

      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: 'Current password is incorrect'
        })
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12)

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
      })

      res.json({
        success: true,
        message: 'Password changed successfully'
      })
    } catch (error) {
      console.error('Password change error:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to change password'
      })
    }
  }
)

/**
 * POST /api/auth/logout - Logout user
 * Note: With JWT, actual logout is handled client-side by removing token
 * This endpoint can be used for logging/audit purposes
 */
router.post('/logout', authenticate, async (req: Request, res: Response) => {
  try {
    // In a more advanced implementation, you could:
    // 1. Add token to a blacklist
    // 2. Store logout time in database
    // 3. Track session invalidation

    res.json({
      success: true,
      message: 'Logout successful. Please remove your token from storage.'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      error: 'Logout failed'
    })
  }
})

/**
 * GET /api/auth/users - List all users (Admin only)
 */
router.get('/users', authenticate, async (req: Request, res: Response) => {
  try {
    // Only admins can list users
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: users
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    })
  }
})

/**
 * PATCH /api/auth/users/:id/toggle-active - Toggle user active status (Admin only)
 */
router.patch('/users/:id/toggle-active', authenticate, async (req: Request, res: Response) => {
  try {
    // Only admins can toggle user status
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      })
    }

    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    // Prevent admin from deactivating themselves
    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'You cannot deactivate your own account'
      })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    })

    res.json({
      success: true,
      data: updatedUser,
      message: `User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`
    })
  } catch (error) {
    console.error('Error toggling user status:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update user status'
    })
  }
})

export default router
