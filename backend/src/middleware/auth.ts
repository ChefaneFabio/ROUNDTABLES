import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/database'
import { UserRole } from '@prisma/client'

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        name: string
        role: UserRole
        schoolId?: string
        teacherId?: string
        studentId?: string
      }
    }
  }
}

interface JwtPayload {
  userId: string
  email: string
  role: UserRole
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Verify JWT token and attach user to request
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      })
    }

    const token = authHeader.substring(7)

    let decoded: JwtPayload
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          success: false,
          error: 'Token expired',
          code: 'TOKEN_EXPIRED'
        })
      }
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
        code: 'INVALID_TOKEN'
      })
    }

    // Fetch user with role-specific profile
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        schoolProfile: { select: { id: true } },
        teacherProfile: { select: { id: true, schoolId: true } },
        studentProfile: { select: { id: true, schoolId: true } }
      }
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      })
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Account is deactivated',
        code: 'ACCOUNT_DEACTIVATED'
      })
    }

    if (user.deletedAt) {
      return res.status(403).json({
        success: false,
        error: 'Account has been deleted',
        code: 'ACCOUNT_DELETED'
      })
    }

    // Attach user info to request
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      schoolId: user.schoolProfile?.id || user.teacherProfile?.schoolId || user.studentProfile?.schoolId,
      teacherId: user.teacherProfile?.id,
      studentId: user.studentProfile?.id
    }

    next()
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(500).json({
      success: false,
      error: 'Authentication failed',
      code: 'AUTH_ERROR'
    })
  }
}

// Optional authentication - doesn't fail if no token, just doesn't set user
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next()
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          schoolProfile: { select: { id: true } },
          teacherProfile: { select: { id: true, schoolId: true } },
          studentProfile: { select: { id: true, schoolId: true } }
        }
      })

      if (user && user.isActive && !user.deletedAt) {
        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          schoolId: user.schoolProfile?.id || user.teacherProfile?.schoolId || user.studentProfile?.schoolId,
          teacherId: user.teacherProfile?.id,
          studentId: user.studentProfile?.id
        }
      }
    } catch {
      // Token invalid or expired, continue without user
    }

    next()
  } catch (error) {
    next()
  }
}

// Generate JWT tokens
export const generateTokens = (user: { id: string; email: string; role: UserRole }) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { userId: user.id, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

// Verify refresh token
export const verifyRefreshToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; type: string }
    if (decoded.type !== 'refresh') return null
    return { userId: decoded.userId }
  } catch {
    return null
  }
}

export { JWT_SECRET }
