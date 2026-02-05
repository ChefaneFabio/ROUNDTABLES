// Magic numbers and constants extracted for maintainability

// Voting configuration
export const VOTING = {
  REQUIRED_TOPICS: 8,         // Number of topics students must select
  MIN_TOPICS_FOR_COURSE: 10,  // Minimum topics required to create a course
  MAX_TOPICS_PER_COURSE: 20   // Maximum topics allowed per course
} as const

// Lesson configuration
export const LESSON = {
  DEFAULT_DURATION: 60,       // Default lesson duration in minutes
  MIN_DURATION: 15,           // Minimum lesson duration
  MAX_DURATION: 180,          // Maximum lesson duration
  LESSONS_PER_COURSE: 10      // Default number of lessons per course
} as const

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
} as const

// Password requirements
export const PASSWORD = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 100
} as const

// File upload limits
export const UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024,  // 10MB
  MAX_FILES_PER_LESSON: 10,
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/webm',
    'audio/mpeg',
    'audio/wav',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
} as const

// Course configuration
export const COURSE = {
  MAX_STUDENTS: 50,
  DEFAULT_MAX_STUDENTS: 10,
  MIN_STUDENTS: 1
} as const

// Notification timing (in milliseconds)
export const NOTIFICATION_TIMING = {
  LESSON_REMINDER_BEFORE: 24 * 60 * 60 * 1000,  // 24 hours before lesson
  QUESTION_REQUEST_BEFORE: 48 * 60 * 60 * 1000, // 48 hours before lesson
  FEEDBACK_REQUEST_AFTER: 2 * 60 * 60 * 1000,   // 2 hours after lesson
  VOTING_DEADLINE_REMINDER: 24 * 60 * 60 * 1000 // 24 hours before voting deadline
} as const

// Session/Token configuration
export const TOKEN = {
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
  PASSWORD_RESET_EXPIRY: 60 * 60 * 1000  // 1 hour
} as const

// Rate limiting configuration
export const RATE_LIMIT = {
  STANDARD: { windowMs: 15 * 60 * 1000, max: 100 },
  AUTH: { windowMs: 60 * 60 * 1000, max: 10 },
  STRICT: { windowMs: 60 * 1000, max: 10 },
  UPLOAD: { windowMs: 60 * 60 * 1000, max: 50 }
} as const

// Grading scale
export const GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'] as const

// Language levels (CEFR)
export const LANGUAGE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const

// Subscription plans and their limits
export const SUBSCRIPTION_LIMITS = {
  BASIC: {
    maxCourses: 5,
    maxTeachers: 2,
    maxStudents: 50,
    maxStorageGB: 1
  },
  PROFESSIONAL: {
    maxCourses: 20,
    maxTeachers: 10,
    maxStudents: 200,
    maxStorageGB: 10
  },
  ENTERPRISE: {
    maxCourses: -1,  // Unlimited
    maxTeachers: -1,
    maxStudents: -1,
    maxStorageGB: 100
  }
} as const

// Status transitions (state machines)
export const VALID_STATUS_TRANSITIONS = {
  course: {
    DRAFT: ['TOPIC_VOTING', 'CANCELLED'],
    TOPIC_VOTING: ['SCHEDULED', 'CANCELLED'],
    SCHEDULED: ['IN_PROGRESS', 'CANCELLED'],
    IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
    COMPLETED: ['ARCHIVED'],
    CANCELLED: ['ARCHIVED'],
    ARCHIVED: []
  },
  lesson: {
    SCHEDULED: ['REMINDER_SENT', 'CANCELLED'],
    REMINDER_SENT: ['QUESTIONS_REQUESTED', 'IN_PROGRESS', 'CANCELLED'],
    QUESTIONS_REQUESTED: ['QUESTIONS_READY', 'IN_PROGRESS', 'CANCELLED'],
    QUESTIONS_READY: ['IN_PROGRESS', 'CANCELLED'],
    IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
    COMPLETED: ['FEEDBACK_PENDING'],
    FEEDBACK_PENDING: ['FEEDBACK_SENT'],
    FEEDBACK_SENT: [],
    CANCELLED: []
  },
  enrollment: {
    PENDING: ['ACTIVE', 'DROPPED'],
    ACTIVE: ['COMPLETED', 'DROPPED', 'SUSPENDED'],
    SUSPENDED: ['ACTIVE', 'DROPPED'],
    COMPLETED: [],
    DROPPED: []
  },
  payment: {
    PENDING: ['PARTIAL', 'PAID', 'OVERDUE'],
    PARTIAL: ['PAID', 'OVERDUE'],
    PAID: ['REFUNDED'],
    OVERDUE: ['PARTIAL', 'PAID'],
    REFUNDED: []
  }
} as const

// Default currency
export const DEFAULT_CURRENCY = 'EUR'

// Time zones (for scheduling)
export const DEFAULT_TIMEZONE = 'Europe/Rome'
