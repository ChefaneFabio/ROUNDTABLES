import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from '../config/database'
import { generateTokens, verifyRefreshToken } from '../middleware/auth'
import { UserRole } from '@prisma/client'

const SALT_ROUNDS = 12

interface RegisterUserInput {
  email: string
  password: string
  name: string
  role: UserRole
}

interface RegisterSchoolInput extends RegisterUserInput {
  schoolName: string
  company?: string
  description?: string
}

interface RegisterTeacherInput extends RegisterUserInput {
  schoolId: string
  bio?: string
  expertise?: string[]
}

interface RegisterStudentInput extends RegisterUserInput {
  schoolId: string
  languageLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  bio?: string
}

export class AuthService {
  // Hash password
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS)
  }

  // Verify password
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  // Register a new admin user
  async registerAdmin(input: RegisterUserInput) {
    const { email, password, name } = input

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await this.hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN'
      }
    })

    const tokens = generateTokens(user)
    return { user: this.sanitizeUser(user), ...tokens }
  }

  // Register a new language school
  async registerSchool(input: RegisterSchoolInput) {
    const { email, password, name, schoolName, company, description } = input

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await this.hashPassword(password)

    // Create user and school profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'LANGUAGE_SCHOOL'
        }
      })

      const school = await tx.school.create({
        data: {
          name: schoolName,
          email,
          company,
          description,
          userId: user.id
        }
      })

      return { user, school }
    })

    const tokens = generateTokens(result.user)
    return {
      user: this.sanitizeUser(result.user),
      school: result.school,
      ...tokens
    }
  }

  // Register a new teacher (by school admin)
  async registerTeacher(input: RegisterTeacherInput, creatorId: string) {
    const { email, password, name, schoolId, bio, expertise } = input

    // Verify creator has access to the school
    const creator = await prisma.user.findUnique({
      where: { id: creatorId },
      include: { schoolProfile: true }
    })

    if (!creator) {
      throw new Error('Creator not found')
    }

    if (creator.role !== 'ADMIN' && creator.schoolProfile?.id !== schoolId) {
      throw new Error('Not authorized to add teachers to this school')
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await this.hashPassword(password)

    // Create user and teacher profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'TEACHER'
        }
      })

      const teacher = await tx.teacher.create({
        data: {
          userId: user.id,
          schoolId,
          bio,
          expertise: expertise || []
        }
      })

      return { user, teacher }
    })

    return {
      user: this.sanitizeUser(result.user),
      teacher: result.teacher
    }
  }

  // Register a new student (by school admin or self-registration)
  async registerStudent(input: RegisterStudentInput, creatorId?: string) {
    const { email, password, name, schoolId, languageLevel, bio } = input

    // If creator is specified, verify they have access
    if (creatorId) {
      const creator = await prisma.user.findUnique({
        where: { id: creatorId },
        include: { schoolProfile: true }
      })

      if (!creator) {
        throw new Error('Creator not found')
      }

      if (creator.role !== 'ADMIN' && creator.schoolProfile?.id !== schoolId) {
        throw new Error('Not authorized to add students to this school')
      }
    }

    // Verify school exists
    const school = await prisma.school.findUnique({ where: { id: schoolId } })
    if (!school) {
      throw new Error('School not found')
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await this.hashPassword(password)

    // Create user and student profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'STUDENT'
        }
      })

      const student = await tx.student.create({
        data: {
          userId: user.id,
          schoolId,
          languageLevel: languageLevel || 'B1',
          bio
        }
      })

      return { user, student }
    })

    const tokens = generateTokens(result.user)
    return {
      user: this.sanitizeUser(result.user),
      student: result.student,
      ...tokens
    }
  }

  // Login user
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        schoolProfile: true,
        teacherProfile: { include: { school: true } },
        studentProfile: { include: { school: true } }
      }
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated')
    }

    if (user.deletedAt) {
      throw new Error('Account has been deleted')
    }

    const isValidPassword = await this.verifyPassword(password, user.password)
    if (!isValidPassword) {
      throw new Error('Invalid email or password')
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    const tokens = generateTokens(user)

    // Store refresh token
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt
      }
    })

    return {
      user: this.sanitizeUser(user),
      profile: this.getProfileData(user),
      ...tokens
    }
  }

  // Refresh access token
  async refreshAccessToken(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken)
    if (!decoded) {
      throw new Error('Invalid refresh token')
    }

    // Check if refresh token exists and is valid
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }
    })

    if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
      throw new Error('Invalid or expired refresh token')
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || !user.isActive || user.deletedAt) {
      throw new Error('User not found or inactive')
    }

    // Revoke old refresh token and issue new ones
    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { isRevoked: true }
    })

    const tokens = generateTokens(user)

    // Store new refresh token
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt
      }
    })

    return tokens
  }

  // Logout - revoke refresh token
  async logout(refreshToken: string) {
    await prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { isRevoked: true }
    })
  }

  // Logout all sessions
  async logoutAll(userId: string) {
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true }
    })
  }

  // Change password
  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new Error('User not found')
    }

    const isValid = await this.verifyPassword(currentPassword, user.password)
    if (!isValid) {
      throw new Error('Current password is incorrect')
    }

    const hashedPassword = await this.hashPassword(newPassword)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    })

    // Revoke all refresh tokens
    await this.logoutAll(userId)
  }

  // Request password reset
  async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Don't reveal if user exists
      return { message: 'If an account exists, a reset email has been sent' }
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    // In a real app, store reset token in database and send email
    // For now, just return the token (would be sent via email)
    console.log(`Password reset token for ${email}: ${resetToken}`)

    return {
      message: 'If an account exists, a reset email has been sent',
      // Remove this in production - only for development
      ...(process.env.NODE_ENV === 'development' && { resetToken })
    }
  }

  // Get current user profile
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        schoolProfile: {
          include: {
            teachers: { include: { user: { select: { name: true, email: true } } } },
            students: { include: { user: { select: { name: true, email: true } } } },
            courses: true
          }
        },
        teacherProfile: {
          include: {
            school: true,
            courseTeachers: { include: { course: true } }
          }
        },
        studentProfile: {
          include: {
            school: true,
            enrollments: { include: { course: true } },
            progress: true
          }
        }
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      user: this.sanitizeUser(user),
      profile: this.getProfileData(user)
    }
  }

  // Remove sensitive data from user object
  private sanitizeUser(user: any) {
    const { password, ...sanitized } = user
    return sanitized
  }

  // Get profile based on role
  private getProfileData(user: any) {
    switch (user.role) {
      case 'LANGUAGE_SCHOOL':
        return user.schoolProfile
      case 'TEACHER':
        return user.teacherProfile
      case 'STUDENT':
        return user.studentProfile
      default:
        return null
    }
  }
}

export const authService = new AuthService()
