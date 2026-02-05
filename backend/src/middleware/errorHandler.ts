import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/apiResponse'

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.error('Error:', {
    message: error.message,
    code: error.code,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    path: req.path,
    method: req.method
  })

  // Handle custom AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
      code: error.code,
      ...(error.details && { details: error.details })
    })
  }

  // Prisma errors
  if (error.code === 'P2002') {
    const field = error.meta?.target?.[0] || 'field'
    return res.status(400).json({
      success: false,
      error: `A record with this ${field} already exists`,
      code: 'DUPLICATE_ENTRY'
    })
  }

  if (error.code === 'P2025') {
    return res.status(404).json({
      success: false,
      error: 'Record not found',
      code: 'NOT_FOUND'
    })
  }

  if (error.code === 'P2003') {
    return res.status(400).json({
      success: false,
      error: 'Invalid reference - related record not found',
      code: 'INVALID_REFERENCE'
    })
  }

  if (error.code === 'P2014') {
    return res.status(400).json({
      success: false,
      error: 'The change would violate a required relation',
      code: 'RELATION_VIOLATION'
    })
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token',
      code: 'INVALID_TOKEN'
    })
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expired',
      code: 'TOKEN_EXPIRED'
    })
  }

  // Validation errors (Joi)
  if (error.isJoi) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      code: 'VALIDATION_ERROR',
      details: error.details?.map((d: any) => ({
        field: d.path.join('.'),
        message: d.message
      }))
    })
  }

  // Syntax error in JSON body
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON in request body',
      code: 'INVALID_JSON'
    })
  }

  // Default error
  const statusCode = error.statusCode || error.status || 500
  const message = statusCode === 500 && process.env.NODE_ENV !== 'development'
    ? 'Internal server error'
    : error.message || 'An unexpected error occurred'

  res.status(statusCode).json({
    success: false,
    error: message,
    code: error.code || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      details: error.details
    })
  })
}
