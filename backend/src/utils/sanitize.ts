import validator from 'validator'
import xss from 'xss'

/**
 * Sanitization utilities to prevent XSS and other injection attacks
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes dangerous tags and attributes while keeping safe formatting
 */
export const sanitizeHTML = (input: string): string => {
  if (!input || typeof input !== 'string') return ''

  return xss(input, {
    whiteList: {
      // Allow basic formatting tags only
      p: [],
      br: [],
      strong: [],
      em: [],
      u: [],
      h1: [],
      h2: [],
      h3: [],
      ul: [],
      ol: [],
      li: [],
      blockquote: [],
      code: [],
      pre: []
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style']
  })
}

/**
 * Sanitize plain text input
 * Removes all HTML tags and dangerous characters
 */
export const sanitizeText = (input: string): string => {
  if (!input || typeof input !== 'string') return ''

  // Remove all HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '')

  // Escape dangerous characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')

  return sanitized.trim()
}

/**
 * Sanitize email address
 */
export const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return ''

  // Normalize and validate email
  const normalized = validator.normalizeEmail(email.toLowerCase().trim())

  if (!normalized || !validator.isEmail(normalized)) {
    throw new Error('Invalid email address')
  }

  return normalized
}

/**
 * Sanitize URL
 */
export const sanitizeURL = (url: string): string => {
  if (!url || typeof url !== 'string') return ''

  const trimmed = url.trim()

  if (!validator.isURL(trimmed, { protocols: ['http', 'https'], require_protocol: true })) {
    throw new Error('Invalid URL')
  }

  return trimmed
}

/**
 * Sanitize file name
 * Removes path traversal attempts and dangerous characters
 */
export const sanitizeFileName = (filename: string): string => {
  if (!filename || typeof filename !== 'string') return ''

  // Remove path traversal attempts
  let sanitized = filename.replace(/\.\./g, '')

  // Remove path separators
  sanitized = sanitized.replace(/[\/\\]/g, '')

  // Allow only alphanumeric, dash, underscore, and dot
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_')

  // Prevent hidden files
  if (sanitized.startsWith('.')) {
    sanitized = '_' + sanitized
  }

  // Limit length
  if (sanitized.length > 255) {
    const ext = sanitized.substring(sanitized.lastIndexOf('.'))
    sanitized = sanitized.substring(0, 255 - ext.length) + ext
  }

  return sanitized
}

/**
 * Sanitize integer input
 */
export const sanitizeInteger = (input: any): number => {
  const num = parseInt(input, 10)

  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid integer')
  }

  return num
}

/**
 * Sanitize boolean input
 */
export const sanitizeBoolean = (input: any): boolean => {
  if (typeof input === 'boolean') return input

  if (typeof input === 'string') {
    const lower = input.toLowerCase().trim()
    if (lower === 'true' || lower === '1' || lower === 'yes') return true
    if (lower === 'false' || lower === '0' || lower === 'no') return false
  }

  if (typeof input === 'number') {
    return input !== 0
  }

  throw new Error('Invalid boolean value')
}

/**
 * Sanitize array of strings
 */
export const sanitizeStringArray = (input: any[]): string[] => {
  if (!Array.isArray(input)) {
    throw new Error('Input must be an array')
  }

  return input
    .filter(item => typeof item === 'string' && item.trim().length > 0)
    .map(item => sanitizeText(item))
}

/**
 * Sanitize JSON input
 * Prevents prototype pollution and ensures safe JSON
 */
export const sanitizeJSON = <T = any>(input: string): T => {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid JSON input')
  }

  try {
    const parsed = JSON.parse(input)

    // Prevent prototype pollution
    if (parsed && typeof parsed === 'object') {
      delete parsed.__proto__
      delete parsed.constructor
      delete parsed.prototype
    }

    return parsed as T
  } catch (error) {
    throw new Error('Invalid JSON format')
  }
}

/**
 * Sanitize database query limit/offset parameters
 */
export const sanitizePaginationParams = (params: {
  page?: any
  limit?: any
}): { page: number; limit: number; skip: number } => {
  const page = Math.max(1, sanitizeInteger(params.page || 1))
  const limit = Math.min(100, Math.max(1, sanitizeInteger(params.limit || 10)))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

/**
 * Sanitize object for safe logging
 * Removes sensitive fields before logging
 */
export const sanitizeForLogging = (obj: any): any => {
  if (!obj || typeof obj !== 'object') return obj

  const sensitiveFields = [
    'password',
    'token',
    'secret',
    'apiKey',
    'api_key',
    'accessToken',
    'refreshToken',
    'authorization'
  ]

  const sanitized: any = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
      sanitized[key] = '[REDACTED]'
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitized[key] = sanitizeForLogging(obj[key])
    } else {
      sanitized[key] = obj[key]
    }
  }

  return sanitized
}

/**
 * Validate and sanitize UUID/CUID
 */
export const sanitizeId = (id: string): string => {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid ID')
  }

  const trimmed = id.trim()

  // Check if it's a valid CUID or UUID format
  if (!/^[a-z0-9_-]+$/i.test(trimmed) || trimmed.length < 10 || trimmed.length > 36) {
    throw new Error('Invalid ID format')
  }

  return trimmed
}
