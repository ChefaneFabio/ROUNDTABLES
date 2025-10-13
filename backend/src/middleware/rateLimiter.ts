import rateLimit from 'express-rate-limit'

/**
 * General API rate limiter
 * Limits requests to 100 per 15 minutes per IP
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
})

/**
 * Strict rate limiter for authentication endpoints
 * Limits login attempts to prevent brute force attacks
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  skipSuccessfulRequests: true, // Don't count successful requests
  message: {
    success: false,
    error: 'Too many login attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

/**
 * Voting rate limiter
 * Prevents vote spamming
 */
export const votingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 vote submissions per hour
  message: {
    success: false,
    error: 'Too many voting attempts. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

/**
 * Email/notification rate limiter
 * Prevents email flooding
 */
export const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 email operations per hour
  message: {
    success: false,
    error: 'Too many email operations. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

/**
 * Creation/write operation limiter
 * Prevents abuse of resource creation endpoints
 */
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // Limit each IP to 30 create operations per hour
  message: {
    success: false,
    error: 'Too many create operations. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
})
