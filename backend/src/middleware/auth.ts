import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        role: Role
      }
    }
  }
}

interface JWTPayload {
  userId: string
  email: string
  role: Role
}

/**
 * Authentication middleware - verifies JWT token
 * Adds user information to req.user
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please provide a valid token.'
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured')
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      })
    }

    const decoded = jwt.verify(token, jwtSecret) as JWTPayload

    // Attach user info to request
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role
    }

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      })
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: 'Token has expired. Please login again.'
      })
    }

    console.error('Authentication error:', error)
    return res.status(500).json({
      success: false,
      error: 'Authentication failed'
    })
  }
}

/**
 * Authorization middleware - checks if user has required role(s)
 * Must be used after authenticate middleware
 */
export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      })
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions. This action requires elevated privileges.'
      })
    }

    next()
  }
}

/**
 * Optional authentication middleware
 * Attaches user if token is present, but doesn't require it
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const jwtSecret = process.env.JWT_SECRET

      if (jwtSecret) {
        const decoded = jwt.verify(token, jwtSecret) as JWTPayload
        req.user = {
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role
        }
      }
    }

    next()
  } catch (error) {
    // If token is invalid, continue without user (it's optional)
    next()
  }
}
