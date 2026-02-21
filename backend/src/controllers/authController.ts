import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate, optionalAuth } from '../middleware/auth'
import { authLimiter } from '../middleware/rateLimit'
import { authService } from '../services/AuthService'
import { apiResponse, handleError } from '../utils/apiResponse'

const router = Router()

// Validation schemas
const registerTeacherSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
  name: Joi.string().min(2).max(100).required(),
  schoolId: Joi.string().required(),
  bio: Joi.string().max(1000).optional(),
  expertise: Joi.array().items(Joi.string()).optional()
})

const registerStudentSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
  name: Joi.string().min(2).max(100).required(),
  schoolId: Joi.string().required(),
  languageLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
  bio: Joi.string().max(1000).optional()
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).max(100).required()
})

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required()
})

// Register a new teacher (school admin only)
router.post(
  '/register/teacher',
  authenticate,
  validateRequest(registerTeacherSchema),
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json(apiResponse.error('Authentication required', 'UNAUTHORIZED'))
      }

      // Only school admins and system admins can create teachers
      if (req.user.role !== 'ADMIN') {
        return res.status(403).json(apiResponse.error('Only school administrators can create teachers', 'FORBIDDEN'))
      }

      const result = await authService.registerTeacher(
        { ...req.body, role: 'TEACHER' },
        req.user.id
      )

      res.status(201).json(apiResponse.success(result, 'Teacher registered successfully'))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Register a new student (school admin or self-registration with school invite)
router.post(
  '/register/student',
  optionalAuth,
  validateRequest(registerStudentSchema),
  async (req: Request, res: Response) => {
    try {
      const result = await authService.registerStudent(
        { ...req.body, role: 'STUDENT' },
        req.user?.id // Optional - if logged in as school admin
      )

      res.status(201).json(apiResponse.success(result, 'Student registered successfully'))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Login
router.post(
  '/login',
  authLimiter,
  validateRequest(loginSchema),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const result = await authService.login(email, password)

      res.json(apiResponse.success(result, 'Login successful'))
    } catch (error) {
      handleError(res, error, 401)
    }
  }
)

// Refresh token
router.post(
  '/refresh',
  validateRequest(refreshTokenSchema),
  async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body
      const tokens = await authService.refreshAccessToken(refreshToken)

      res.json(apiResponse.success(tokens, 'Token refreshed successfully'))
    } catch (error) {
      handleError(res, error, 401)
    }
  }
)

// Logout
router.post(
  '/logout',
  async (req: Request, res: Response) => {
    try {
      const refreshToken = req.body?.refreshToken
      if (refreshToken) {
        await authService.logout(refreshToken)
      }

      res.json(apiResponse.success(null, 'Logged out successfully'))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Logout all sessions
router.post('/logout-all', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(apiResponse.error('Authentication required', 'UNAUTHORIZED'))
    }

    await authService.logoutAll(req.user.id)

    res.json(apiResponse.success(null, 'Logged out from all sessions'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get current user profile
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(apiResponse.error('Authentication required', 'UNAUTHORIZED'))
    }

    const profile = await authService.getProfile(req.user.id)

    res.json(apiResponse.success(profile))
  } catch (error) {
    handleError(res, error)
  }
})

// Update current user profile
const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  phone: Joi.string().max(30).allow('', null).optional(),
  address: Joi.string().max(500).allow('', null).optional(),
  bio: Joi.string().max(1000).allow('', null).optional(),
  preferredLanguage: Joi.string().max(10).optional(),
})

router.put(
  '/me',
  authenticate,
  validateRequest(updateProfileSchema),
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json(apiResponse.error('Authentication required', 'UNAUTHORIZED'))
      }

      const profile = await authService.updateProfile(req.user.id, req.body)

      res.json(apiResponse.success(profile, 'Profile updated successfully'))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Change password
router.post(
  '/change-password',
  authenticate,
  validateRequest(changePasswordSchema),
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json(apiResponse.error('Authentication required', 'UNAUTHORIZED'))
      }

      const { currentPassword, newPassword } = req.body
      await authService.changePassword(req.user.id, currentPassword, newPassword)

      res.json(apiResponse.success(null, 'Password changed successfully'))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Request password reset (public)
router.post(
  '/forgot-password',
  authLimiter,
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      if (!email) {
        return res.status(400).json(apiResponse.error('Email is required', 'VALIDATION_ERROR'))
      }

      const result = await authService.requestPasswordReset(email)

      res.json(apiResponse.success(result))
    } catch (error) {
      handleError(res, error)
    }
  }
)

export default router
