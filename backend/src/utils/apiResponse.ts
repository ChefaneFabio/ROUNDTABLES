import { Response } from 'express'

// Standardized API response format
interface ApiSuccessResponse<T = any> {
  success: true
  data: T
  message?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

interface ApiErrorResponse {
  success: false
  error: string
  code?: string
  details?: any
}

type ApiResponseType<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

// Response helpers
export const apiResponse = {
  // Success response
  success<T>(data: T, message?: string, meta?: ApiSuccessResponse['meta']): ApiSuccessResponse<T> {
    return {
      success: true,
      data,
      ...(message && { message }),
      ...(meta && { meta })
    }
  },

  // Error response
  error(error: string, code?: string, details?: any): ApiErrorResponse {
    return {
      success: false,
      error,
      ...(code && { code }),
      ...(details && { details })
    }
  },

  // Paginated success response
  paginated<T>(
    data: T[],
    pagination: { page: number; limit: number; total: number },
    message?: string
  ): ApiSuccessResponse<T[]> {
    return {
      success: true,
      data,
      ...(message && { message }),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit)
      }
    }
  }
}

// Error code mapping
const errorCodes: Record<string, { status: number; code: string }> = {
  'User with this email already exists': { status: 400, code: 'EMAIL_EXISTS' },
  'Invalid email or password': { status: 401, code: 'INVALID_CREDENTIALS' },
  'Account is deactivated': { status: 403, code: 'ACCOUNT_DEACTIVATED' },
  'Account has been deleted': { status: 403, code: 'ACCOUNT_DELETED' },
  'User not found': { status: 404, code: 'USER_NOT_FOUND' },
  'Not found': { status: 404, code: 'NOT_FOUND' },
  'Unauthorized': { status: 401, code: 'UNAUTHORIZED' },
  'Forbidden': { status: 403, code: 'FORBIDDEN' },
  'Invalid refresh token': { status: 401, code: 'INVALID_REFRESH_TOKEN' },
  'Current password is incorrect': { status: 400, code: 'INVALID_PASSWORD' }
}

// Handle error and send appropriate response
export const handleError = (
  res: Response,
  error: unknown,
  defaultStatus = 500
): Response => {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred'

  // Check for known error messages
  const knownError = errorCodes[message]
  if (knownError) {
    return res.status(knownError.status).json(
      apiResponse.error(message, knownError.code)
    )
  }

  // Prisma-specific errors
  if (typeof error === 'object' && error !== null) {
    const prismaError = error as any

    if (prismaError.code === 'P2002') {
      return res.status(400).json(
        apiResponse.error('A record with this information already exists', 'DUPLICATE_ENTRY')
      )
    }

    if (prismaError.code === 'P2025') {
      return res.status(404).json(
        apiResponse.error('Record not found', 'NOT_FOUND')
      )
    }

    if (prismaError.code === 'P2003') {
      return res.status(400).json(
        apiResponse.error('Invalid reference - related record not found', 'INVALID_REFERENCE')
      )
    }
  }

  // Log unexpected errors
  console.error('Unhandled error:', error)

  // Don't expose internal error details in production
  const errorMessage = process.env.NODE_ENV === 'development'
    ? message
    : 'An unexpected error occurred'

  return res.status(defaultStatus).json(
    apiResponse.error(errorMessage, 'INTERNAL_ERROR')
  )
}

// Custom error classes
export class AppError extends Error {
  public statusCode: number
  public code: string
  public details?: any

  constructor(message: string, statusCode: number, code: string, details?: any) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.details = details
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND')
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED')
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 403, 'FORBIDDEN')
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT')
  }
}
