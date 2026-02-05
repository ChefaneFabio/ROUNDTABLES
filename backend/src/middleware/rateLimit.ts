import { Request, Response, NextFunction } from 'express'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory rate limit store (use Redis in production for distributed systems)
const stores: Map<string, RateLimitStore> = new Map()

interface RateLimitOptions {
  windowMs: number      // Time window in milliseconds
  max: number          // Max requests per window
  message?: string     // Custom error message
  keyGenerator?: (req: Request) => string  // Custom key generator
  skip?: (req: Request) => boolean         // Skip rate limiting for certain requests
}

// Clean up expired entries periodically
const cleanupInterval = setInterval(() => {
  const now = Date.now()
  stores.forEach((store, storeName) => {
    Object.keys(store).forEach(key => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })
  })
}, 60000) // Clean up every minute

// Prevent memory leak on shutdown
if (typeof process !== 'undefined') {
  process.on('beforeExit', () => {
    clearInterval(cleanupInterval)
  })
}

export const rateLimit = (options: RateLimitOptions) => {
  const {
    windowMs,
    max,
    message = 'Too many requests, please try again later',
    keyGenerator = (req: Request) => req.ip || 'unknown',
    skip = () => false
  } = options

  const storeName = `rateLimit_${windowMs}_${max}`
  if (!stores.has(storeName)) {
    stores.set(storeName, {})
  }
  const store = stores.get(storeName)!

  return (req: Request, res: Response, next: NextFunction) => {
    // Skip rate limiting if configured
    if (skip(req)) {
      return next()
    }

    const key = keyGenerator(req)
    const now = Date.now()

    // Initialize or reset if window expired
    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs
      }
      return next()
    }

    // Increment count
    store[key].count++

    // Check if over limit
    if (store[key].count > max) {
      const retryAfter = Math.ceil((store[key].resetTime - now) / 1000)

      res.set('Retry-After', String(retryAfter))
      res.set('X-RateLimit-Limit', String(max))
      res.set('X-RateLimit-Remaining', '0')
      res.set('X-RateLimit-Reset', String(store[key].resetTime))

      return res.status(429).json({
        success: false,
        error: message,
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter
      })
    }

    // Set rate limit headers
    res.set('X-RateLimit-Limit', String(max))
    res.set('X-RateLimit-Remaining', String(max - store[key].count))
    res.set('X-RateLimit-Reset', String(store[key].resetTime))

    next()
  }
}

// Preset configurations
export const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window
  message: 'Too many requests, please try again in 15 minutes'
})

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 10,                    // 10 attempts per hour
  message: 'Too many authentication attempts, please try again later',
  keyGenerator: (req) => {
    // Rate limit by email for login attempts
    const email = req.body?.email
    return email ? `auth_${email}` : req.ip || 'unknown'
  }
})

export const strictLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 10,              // 10 requests per minute
  message: 'Rate limit exceeded, please slow down'
})

export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 50,                    // 50 uploads per hour
  message: 'Upload limit reached, please try again later'
})

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 60,              // 60 requests per minute
  message: 'API rate limit exceeded'
})
