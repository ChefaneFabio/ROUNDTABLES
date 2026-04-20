import { Router, Request, Response } from 'express'
import Joi from 'joi'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate, optionalAuth, generateTokens } from '../middleware/auth'
import { requireOrgAdmin } from '../middleware/rbac'
import { authLimiter } from '../middleware/rateLimit'
import { authService } from '../services/AuthService'
import { prisma } from '../config/database'
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

const registerOrganizationSchema = Joi.object({
  // Organization details
  organizationName: Joi.string().min(2).max(200).required(),
  organizationEmail: Joi.string().email().required(),
  phone: Joi.string().max(30).optional(),
  website: Joi.string().uri().optional(),
  industry: Joi.string().max(100).optional(),
  size: Joi.string().valid('1-10', '11-50', '51-200', '201-500', '500+').optional(),
  vatNumber: Joi.string().max(20).optional(),
  fiscalCode: Joi.string().max(20).optional(),
  // Admin user details
  adminEmail: Joi.string().email().required(),
  adminPassword: Joi.string().min(8).max(100).required(),
  adminName: Joi.string().min(2).max(100).required(),
})

const registerEmployeeSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(100).required(),
  languageLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
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

// Create additional admin user (existing admin only)
router.post(
  '/register/admin',
  authenticate,
  validateRequest(Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(100).required(),
    surname: Joi.string().max(100).optional(),
    phone: Joi.string().max(30).optional(),
  })),
  async (req: Request, res: Response) => {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json(apiResponse.error('Only administrators can create admin users', 'FORBIDDEN'))
      }

      const { email, password, name, surname, phone } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)

      // Check if user already exists
      const existing = await prisma.user.findUnique({ where: { email } })
      if (existing) {
        return res.status(409).json(apiResponse.error('Email already in use', 'DUPLICATE'))
      }

      // Get the admin's school
      const school = await prisma.school.findFirst({ where: { userId: req.user.id } })

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          surname: surname || null,
          phone: phone || null,
          role: 'ADMIN',
          schoolProfile: school ? undefined : {
            create: { name: 'Maka Language Consulting', email }
          }
        }
      })

      // If school exists, create a school profile linked to the same school
      // (multiple admins can share the same school)

      res.status(201).json(apiResponse.success({ id: user.id, email: user.email, name: user.name }, 'Admin user created'))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Public self-registration for any of the three main roles. Used by the
// frontend register page when a new user picks Maka / Trainer / Learner.
const publicRegisterSchema = Joi.object({
  role: Joi.string().valid('ADMIN', 'TEACHER', 'STUDENT').required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
  name: Joi.string().min(2).max(100).required(),
})

router.post(
  '/register-public',
  authLimiter,
  validateRequest(publicRegisterSchema),
  async (req: Request, res: Response) => {
    try {
      const result = await authService.registerPublic(req.body)
      res.status(201).json(apiResponse.success(result, 'Account created'))
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
  surname: Joi.string().max(100).allow('', null).optional(),
  phone: Joi.string().max(30).allow('', null).optional(),
  address: Joi.string().max(500).allow('', null).optional(),
  city: Joi.string().max(100).allow('', null).optional(),
  province: Joi.string().max(100).allow('', null).optional(),
  postalCode: Joi.string().max(20).allow('', null).optional(),
  country: Joi.string().max(100).allow('', null).optional(),
  dateOfBirth: Joi.string().allow('', null).optional(),
  placeOfBirth: Joi.string().max(200).allow('', null).optional(),
  nationality: Joi.string().max(100).allow('', null).optional(),
  fiscalCode: Joi.string().max(20).allow('', null).optional(),
  gender: Joi.string().valid('M', 'F', 'Other').allow('', null).optional(),
  bio: Joi.string().max(1000).allow('', null).optional(),
  preferredLanguage: Joi.string().max(10).optional(),
  nativeLanguage: Joi.string().max(50).allow('', null).optional(),
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

// Register a new organization + ORG_ADMIN user (public)
router.post(
  '/register/organization',
  validateRequest(registerOrganizationSchema),
  async (req: Request, res: Response) => {
    try {
      const {
        organizationName, organizationEmail, phone, website, industry, size,
        vatNumber, fiscalCode,
        adminEmail, adminPassword, adminName
      } = req.body

      // Check if admin email already exists
      const existingUser = await prisma.user.findUnique({ where: { email: adminEmail } })
      if (existingUser) {
        return res.status(400).json(apiResponse.error('User with this email already exists', 'EMAIL_EXISTS'))
      }

      // Check if org email already exists
      const existingOrg = await prisma.organization.findUnique({ where: { email: organizationEmail } })
      if (existingOrg) {
        return res.status(400).json(apiResponse.error('Organization with this email already exists', 'ORG_EMAIL_EXISTS'))
      }

      const hashedPassword = await bcrypt.hash(adminPassword, 12)

      // Hardcode Maka Learning Centre school ID
      const MAKA_SCHOOL_ID = 'maka-language-centre'

      const result = await prisma.$transaction(async (tx) => {
        // Create organization
        const organization = await tx.organization.create({
          data: {
            name: organizationName,
            email: organizationEmail,
            phone,
            website,
            industry,
            size,
            vatNumber,
            fiscalCode,
            schoolId: MAKA_SCHOOL_ID,
          }
        })

        // Create ORG_ADMIN user
        const user = await tx.user.create({
          data: {
            email: adminEmail,
            password: hashedPassword,
            name: adminName,
            role: 'ORG_ADMIN',
          }
        })

        // Create OrgAdmin profile
        const orgAdmin = await tx.orgAdmin.create({
          data: {
            userId: user.id,
            organizationId: organization.id,
          }
        })

        return { user, organization, orgAdmin }
      })

      const tokens = generateTokens(result.user)

      // Store refresh token
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7)
      await prisma.refreshToken.create({
        data: { token: tokens.refreshToken, userId: result.user.id, expiresAt }
      })

      const { password: _, ...sanitizedUser } = result.user

      res.status(201).json(apiResponse.success({
        user: sanitizedUser,
        organization: result.organization,
        ...tokens
      }, 'Organization registered successfully'))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Register an employee under an organization (ORG_ADMIN only)
router.post(
  '/register/employee',
  authenticate,
  requireOrgAdmin,
  validateRequest(registerEmployeeSchema),
  async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.organizationId) {
        return res.status(403).json(apiResponse.error('Organization admin profile required', 'NO_ORG_PROFILE'))
      }

      const { email, name, languageLevel } = req.body

      // Check if email already exists
      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        return res.status(400).json(apiResponse.error('User with this email already exists', 'EMAIL_EXISTS'))
      }

      // Get organization to find schoolId
      const organization = await prisma.organization.findUnique({
        where: { id: req.user.organizationId },
        select: { id: true, schoolId: true }
      })

      if (!organization) {
        return res.status(404).json(apiResponse.error('Organization not found', 'NOT_FOUND'))
      }

      const randomPassword = crypto.randomBytes(16).toString('hex')
      const hashedPassword = await bcrypt.hash(randomPassword, 12)

      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
            role: 'STUDENT',
          }
        })

        const student = await tx.student.create({
          data: {
            userId: user.id,
            schoolId: organization.schoolId,
            organizationId: organization.id,
            languageLevel: languageLevel || 'B1',
          }
        })

        return { user, student }
      })

      const { password: _, ...sanitizedUser } = result.user

      res.status(201).json(apiResponse.success({
        user: sanitizedUser,
        student: result.student,
      }, 'Employee registered successfully'))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Admin: Get all users with filters (admin only)
router.get(
  '/admin/users',
  authenticate,
  async (req: Request, res: Response) => {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json(apiResponse.error('Admin access required', 'FORBIDDEN'))
      }

      const { role, search, page = '1', limit = '25' } = req.query
      const pageNum = Math.max(1, parseInt(page as string) || 1)
      const limitNum = Math.min(100, Math.max(1, parseInt(limit as string) || 25))
      const skip = (pageNum - 1) * limitNum

      // Build where clause
      const where: any = {}

      if (role && role !== 'ALL') {
        where.role = role as string
      }

      if (search) {
        const searchStr = search as string
        where.OR = [
          { name: { contains: searchStr, mode: 'insensitive' } },
          { surname: { contains: searchStr, mode: 'insensitive' } },
          { email: { contains: searchStr, mode: 'insensitive' } },
        ]
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
            phone: true,
            address: true,
            city: true,
            province: true,
            postalCode: true,
            country: true,
            dateOfBirth: true,
            placeOfBirth: true,
            nationality: true,
            fiscalCode: true,
            gender: true,
            nativeLanguage: true,
            isActive: true,
            lastLoginAt: true,
            createdAt: true,
            teacherProfile: { select: { id: true, expertise: true, hourlyRate: true } },
            studentProfile: { select: { id: true, languageLevel: true, organizationId: true } },
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limitNum,
        }),
        prisma.user.count({ where }),
      ])

      res.json(apiResponse.success({
        users,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        }
      }))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Admin: Update a user (admin only)
router.put(
  '/admin/users/:id',
  authenticate,
  async (req: Request, res: Response) => {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json(apiResponse.error('Admin access required', 'FORBIDDEN'))
      }

      const { id } = req.params
      const { name, surname, email, phone, address, city, province, postalCode, country,
              dateOfBirth, placeOfBirth, nationality, fiscalCode, gender, nativeLanguage, isActive } = req.body

      const updateData: any = {}
      if (name !== undefined) updateData.name = name
      if (surname !== undefined) updateData.surname = surname
      if (email !== undefined) updateData.email = email
      if (phone !== undefined) updateData.phone = phone
      if (address !== undefined) updateData.address = address
      if (city !== undefined) updateData.city = city
      if (province !== undefined) updateData.province = province
      if (postalCode !== undefined) updateData.postalCode = postalCode
      if (country !== undefined) updateData.country = country
      if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null
      if (placeOfBirth !== undefined) updateData.placeOfBirth = placeOfBirth
      if (nationality !== undefined) updateData.nationality = nationality
      if (fiscalCode !== undefined) updateData.fiscalCode = fiscalCode
      if (gender !== undefined) updateData.gender = gender
      if (nativeLanguage !== undefined) updateData.nativeLanguage = nativeLanguage
      if (isActive !== undefined) updateData.isActive = isActive

      const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true, name: true, surname: true, email: true, role: true, phone: true,
          isActive: true, lastLoginAt: true, createdAt: true,
        }
      })

      res.json(apiResponse.success(user, 'User updated successfully'))
    } catch (error) {
      handleError(res, error)
    }
  }
)

// Admin: Toggle user active status (admin only)
router.patch(
  '/admin/users/:id/toggle-active',
  authenticate,
  async (req: Request, res: Response) => {
    try {
      if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json(apiResponse.error('Admin access required', 'FORBIDDEN'))
      }

      const { id } = req.params
      const existing = await prisma.user.findUnique({ where: { id }, select: { isActive: true } })
      if (!existing) {
        return res.status(404).json(apiResponse.error('User not found', 'NOT_FOUND'))
      }

      const user = await prisma.user.update({
        where: { id },
        data: { isActive: !existing.isActive },
        select: { id: true, isActive: true }
      })

      res.json(apiResponse.success(user, `User ${user.isActive ? 'activated' : 'deactivated'} successfully`))
    } catch (error) {
      handleError(res, error)
    }
  }
)

export default router
