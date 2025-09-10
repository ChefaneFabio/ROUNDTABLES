import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error)

  // Prisma errors
  if (error.code === 'P2002') {
    return res.status(400).json({
      success: false,
      error: 'A record with this information already exists'
    })
  }

  if (error.code === 'P2025') {
    return res.status(404).json({
      success: false,
      error: 'Record not found'
    })
  }

  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: error.message })
  })
}