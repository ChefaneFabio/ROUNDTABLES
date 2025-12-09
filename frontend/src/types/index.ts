// Database entity types
export interface Client {
  id: string
  name: string
  email: string
  company: string
  description?: string
  createdAt: Date
  updatedAt: Date
  roundtables?: Roundtable[]
}

export interface Roundtable {
  id: string
  name: string
  description?: string
  status: RoundtableStatus
  startDate?: Date
  endDate?: Date
  maxParticipants: number
  numberOfSessions: number
  createdAt: Date
  updatedAt: Date
  clientId: string
  client?: Client
  participants?: Participant[]
  sessions?: Session[]
  topics?: Topic[]
}

export interface Participant {
  id: string
  email: string
  name: string
  company?: string
  languageLevel: LanguageLevel
  status: ParticipantStatus
  createdAt: Date
  updatedAt: Date
  roundtableId: string
  roundtable?: Roundtable
}

export interface Topic {
  id: string
  title: string
  description: string
  isSelected: boolean
  createdAt: Date
  updatedAt: Date
  roundtableId: string
  roundtable?: Roundtable
  voteCount?: number
}

export interface Session {
  id: string
  sessionNumber: number
  scheduledAt: Date
  status: SessionStatus
  meetingLink?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  roundtableId: string
  topicId?: string
  trainerId?: string
  roundtable?: Roundtable
  topic?: Topic
  trainer?: Trainer
  questions?: Question[]
}

export interface Trainer {
  id: string
  name: string
  email: string
  expertise: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Question {
  id: string
  question: string
  status: QuestionStatus
  reviewNotes?: string
  createdAt: Date
  updatedAt: Date
  sessionId: string
  session?: Session
}

export interface Feedback {
  id: string
  content: string
  status: FeedbackStatus
  reviewNotes?: string
  sentAt?: Date
  createdAt: Date
  updatedAt: Date
  sessionId: string
  participantId: string
  trainerId: string
}

export interface Notification {
  id: string
  type: NotificationType
  recipient: string
  subject: string
  content: string
  status: NotificationStatus
  scheduledAt: Date
  sentAt?: Date
  createdAt: Date
  updatedAt: Date
  sessionId?: string
}

// Enums
export enum RoundtableStatus {
  SETUP = 'SETUP',
  TOPIC_VOTING = 'TOPIC_VOTING',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum ParticipantStatus {
  INVITED = 'INVITED',
  CONFIRMED = 'CONFIRMED',
  LEVEL_TEST_REQUIRED = 'LEVEL_TEST_REQUIRED',
  LEVEL_TEST_FAILED = 'LEVEL_TEST_FAILED',
  ACTIVE = 'ACTIVE',
  DROPPED_OUT = 'DROPPED_OUT'
}

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  REMINDER_SENT = 'REMINDER_SENT',
  QUESTIONS_REQUESTED = 'QUESTIONS_REQUESTED',
  QUESTIONS_READY = 'QUESTIONS_READY',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FEEDBACK_PENDING = 'FEEDBACK_PENDING',
  FEEDBACK_SENT = 'FEEDBACK_SENT',
  CANCELLED = 'CANCELLED'
}

export enum QuestionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  NEEDS_REVISION = 'NEEDS_REVISION',
  REJECTED = 'REJECTED'
}

export enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  NEEDS_REVISION = 'NEEDS_REVISION',
  SENT = 'SENT',
  REJECTED = 'REJECTED'
}

export enum NotificationType {
  TRAINER_REMINDER = 'TRAINER_REMINDER',
  QUESTIONS_REQUEST = 'QUESTIONS_REQUEST',
  FEEDBACK_REQUEST = 'FEEDBACK_REQUEST',
  PARTICIPANT_EMAIL = 'PARTICIPANT_EMAIL',
  VOTING_INVITE = 'VOTING_INVITE',
  SESSION_REMINDER = 'SESSION_REMINDER'
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface CreateRoundtableRequest {
  name: string
  description?: string
  clientId: string
  startDate?: string
  maxParticipants?: number
  numberOfSessions?: number
  topics: {
    title: string
    description: string
  }[]
  sessions?: {
    sessionNumber: number
    scheduledAt: string
    topicId?: string
    customTopicTitle?: string
    trainerId?: string
    notes?: string
    meetingLink?: string
  }[]
}

export interface ImportParticipantsRequest {
  roundtableId: string
  participants: {
    name: string
    email: string
    company?: string
    languageLevel?: LanguageLevel
  }[]
}

export interface ScheduleSessionsRequest {
  roundtableId: string
  sessions: {
    sessionNumber: number
    scheduledAt: string
    trainerId?: string
    topicId?: string
  }[]
}

// Dashboard types
export interface DashboardStats {
  totalRoundtables: number
  activeRoundtables: number
  totalParticipants: number
  upcomingSessions: number
  pendingFeedback: number
}

export interface RoundtableProgress {
  id: string
  name: string
  client: string
  status: RoundtableStatus
  progress: number // 0-100
  nextSession?: {
    date: Date
    topic: string
  }
}