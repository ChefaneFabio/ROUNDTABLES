import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/database'
import { apiResponse } from '../utils/apiResponse'

// Extend Express Request to include API key info
declare global {
  namespace Express {
    interface Request {
      apiKey?: {
        id: string
        schoolId: string
        name: string
        permissions: string[]
      }
    }
  }
}

// Middleware to authenticate API key from X-API-Key header
export const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKeyHeader = req.headers['x-api-key'] as string

  if (!apiKeyHeader) {
    return res.status(401).json(
      apiResponse.error('API key required', 'API_KEY_REQUIRED')
    )
  }

  try {
    const apiKey = await prisma.apiKey.findUnique({
      where: { key: apiKeyHeader },
      include: {
        school: { select: { id: true, name: true, isActive: true } }
      }
    })

    if (!apiKey) {
      return res.status(401).json(
        apiResponse.error('Invalid API key', 'INVALID_API_KEY')
      )
    }

    if (!apiKey.isActive) {
      return res.status(401).json(
        apiResponse.error('API key is inactive', 'API_KEY_INACTIVE')
      )
    }

    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      return res.status(401).json(
        apiResponse.error('API key has expired', 'API_KEY_EXPIRED')
      )
    }

    if (!apiKey.school.isActive) {
      return res.status(403).json(
        apiResponse.error('School account is inactive', 'SCHOOL_INACTIVE')
      )
    }

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { lastUsedAt: new Date() }
    })

    // Attach API key info to request
    req.apiKey = {
      id: apiKey.id,
      schoolId: apiKey.schoolId,
      name: apiKey.name,
      permissions: apiKey.permissions as string[]
    }

    return next()
  } catch (error) {
    console.error('API key authentication error:', error)
    return res.status(500).json(
      apiResponse.error('Authentication error', 'AUTH_ERROR')
    )
  }
}

// Middleware to check specific permission
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.apiKey) {
      return res.status(401).json(
        apiResponse.error('API key required', 'API_KEY_REQUIRED')
      )
    }

    const permissions = req.apiKey.permissions
    const hasPermission = permissions.includes(permission) || permissions.includes('*')

    if (!hasPermission) {
      return res.status(403).json(
        apiResponse.error(
          `Permission denied. Required: ${permission}`,
          'PERMISSION_DENIED'
        )
      )
    }

    return next()
  }
}

// Available permissions for API keys
export const API_PERMISSIONS = {
  // Courses
  READ_COURSES: 'read:courses',
  WRITE_COURSES: 'write:courses',

  // Enrollments
  READ_ENROLLMENTS: 'read:enrollments',
  WRITE_ENROLLMENTS: 'write:enrollments',

  // Students
  READ_STUDENTS: 'read:students',
  WRITE_STUDENTS: 'write:students',

  // Progress
  READ_PROGRESS: 'read:progress',

  // Analytics
  READ_ANALYTICS: 'read:analytics',

  // Full access
  ALL: '*'
}
