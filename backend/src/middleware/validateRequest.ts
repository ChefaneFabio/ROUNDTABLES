import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true 
    })

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ')
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: errorMessage
      })
    }

    req.body = value
    next()
  }
}