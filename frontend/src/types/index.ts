// =====================================================
// USER & AUTHENTICATION
// =====================================================

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
  schoolProfile?: School
  teacherProfile?: Teacher
  studentProfile?: Student
}

export enum UserRole {
  ADMIN = 'ADMIN',
  LANGUAGE_SCHOOL = 'LANGUAGE_SCHOOL',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginResponse {
  user: User
  profile: School | Teacher | Student | null
  accessToken: string
  refreshToken: string
}

// =====================================================
// SCHOOL (Previously Client)
// =====================================================

export interface School {
  id: string
  name: string
  email: string
  company?: string
  description?: string
  logo?: string
  subscriptionPlan: SubscriptionPlan
  billingEmail?: string
  billingAddress?: BillingAddress
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
  teachers?: Teacher[]
  students?: Student[]
  courses?: Course[]
  _count?: {
    teachers: number
    students: number
    courses: number
  }
}

export interface BillingAddress {
  street?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}

export enum SubscriptionPlan {
  BASIC = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE'
}

// =====================================================
// TEACHER
// =====================================================

export interface Teacher {
  id: string
  bio?: string
  expertise: string[]
  hourlyRate?: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
  schoolId: string
  school?: School
  lessons?: Lesson[]
  courseTeachers?: CourseTeacher[]
  _count?: {
    lessons: number
    courseTeachers: number
    feedback: number
  }
}

// =====================================================
// STUDENT
// =====================================================

export interface Student {
  id: string
  languageLevel: LanguageLevel
  bio?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
  schoolId: string
  school?: School
  enrollments?: Enrollment[]
  progress?: Progress[]
  _count?: {
    enrollments: number
    attendance: number
    feedback: number
  }
}

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}

// =====================================================
// COURSE (Previously Roundtable)
// =====================================================

export interface Course {
  id: string
  name: string
  description?: string
  status: CourseStatus
  startDate?: Date
  endDate?: Date
  maxStudents: number
  price?: number
  currency: string
  thumbnailUrl?: string
  createdAt: Date
  updatedAt: Date
  schoolId: string
  school?: School
  enrollments?: Enrollment[]
  lessons?: Lesson[]
  modules?: Module[]
  courseTeachers?: CourseTeacher[]
  progress?: number
  _count?: {
    enrollments: number
    lessons: number
    modules: number
  }
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  TOPIC_VOTING = 'TOPIC_VOTING',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED'
}

export interface CourseTeacher {
  id: string
  isPrimary: boolean
  createdAt: Date
  courseId: string
  course?: Course
  teacherId: string
  teacher?: Teacher
}

// =====================================================
// MODULE (Topic/Chapter)
// =====================================================

export interface Module {
  id: string
  title: string
  description?: string
  orderIndex: number
  isSelected: boolean
  createdAt: Date
  updatedAt: Date
  courseId: string
  course?: Course
  votes?: TopicVote[]
  lessons?: Lesson[]
  _count?: {
    votes: number
  }
}

// =====================================================
// LESSON (Previously Session)
// =====================================================

export interface Lesson {
  id: string
  lessonNumber: number
  title?: string
  description?: string
  scheduledAt: Date
  duration: number
  status: LessonStatus
  meetingLink?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  courseId: string
  course?: Course
  moduleId?: string
  module?: Module
  teacherId?: string
  teacher?: Teacher
  questions?: Question[]
  feedback?: Feedback[]
  attendance?: Attendance[]
  materials?: Material[]
  _count?: {
    materials: number
    attendance: number
    questions: number
  }
}

export enum LessonStatus {
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

// =====================================================
// ENROLLMENT
// =====================================================

export interface Enrollment {
  id: string
  enrolledAt: Date
  status: EnrollmentStatus
  paymentStatus: PaymentStatus
  amountDue?: number
  amountPaid?: number
  notes?: string
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
  studentId: string
  student?: Student
  courseId: string
  course?: Course
  payments?: Payment[]
}

export enum EnrollmentStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
  SUSPENDED = 'SUSPENDED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  REFUNDED = 'REFUNDED'
}

// =====================================================
// ATTENDANCE
// =====================================================

export interface Attendance {
  id: string
  attended: boolean
  joinedAt?: Date
  leftAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
  lessonId: string
  lesson?: Lesson
  studentId: string
  student?: Student
}

// =====================================================
// PROGRESS
// =====================================================

export interface Progress {
  id: string
  completedLessons: number
  totalLessons: number
  percentage: number
  grade?: string
  averageScore?: number
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
  studentId: string
  student?: Student
  courseId: string
  course?: Course
}

// =====================================================
// TOPIC VOTING
// =====================================================

export interface TopicVote {
  id: string
  createdAt: Date
  studentId: string
  student?: Student
  moduleId: string
  module?: Module
  courseId: string
  course?: Course
}

export interface VotingData {
  course: {
    id: string
    name: string
    schoolName: string
  }
  modules: (Module & { _count?: { votes: number } })[]
  hasVoted: boolean
  studentVotes: string[]
  requiredVotes: number
}

// =====================================================
// QUESTIONS
// =====================================================

export interface Question {
  id: string
  question: string
  status: QuestionStatus
  reviewNotes?: string
  createdAt: Date
  updatedAt: Date
  lessonId: string
  lesson?: Lesson
  teacherId?: string
  teacher?: Teacher
}

export enum QuestionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  NEEDS_REVISION = 'NEEDS_REVISION',
  REJECTED = 'REJECTED'
}

// =====================================================
// FEEDBACK
// =====================================================

export interface Feedback {
  id: string
  content: string
  score?: number
  status: FeedbackStatus
  reviewNotes?: string
  sentAt?: Date
  createdAt: Date
  updatedAt: Date
  lessonId: string
  lesson?: Lesson
  studentId: string
  student?: Student
  teacherId: string
  teacher?: Teacher
}

export enum FeedbackStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  NEEDS_REVISION = 'NEEDS_REVISION',
  SENT = 'SENT',
  REJECTED = 'REJECTED'
}

// =====================================================
// MATERIALS
// =====================================================

export interface Material {
  id: string
  title: string
  description?: string
  type: MaterialType
  url: string
  fileSize?: number
  mimeType?: string
  orderIndex: number
  uploadedAt: Date
  createdAt: Date
  updatedAt: Date
  lessonId: string
  lesson?: Lesson
}

export enum MaterialType {
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  LINK = 'LINK',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  AUDIO = 'AUDIO',
  OTHER = 'OTHER'
}

// =====================================================
// PAYMENTS
// =====================================================

export interface Payment {
  id: string
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethod?: string
  transactionId?: string
  invoiceNumber?: string
  invoiceUrl?: string
  notes?: string
  paidAt?: Date
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
  enrollmentId?: string
  enrollment?: Enrollment
  schoolId?: string
  school?: School
}

// =====================================================
// NOTIFICATIONS
// =====================================================

export interface Notification {
  id: string
  type: NotificationType
  subject: string
  content: string
  status: NotificationStatus
  scheduledAt?: Date
  sentAt?: Date
  readAt?: Date
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
  lessonId?: string
  lesson?: Lesson
}

export enum NotificationType {
  TEACHER_REMINDER = 'TEACHER_REMINDER',
  QUESTIONS_REQUEST = 'QUESTIONS_REQUEST',
  FEEDBACK_REQUEST = 'FEEDBACK_REQUEST',
  ENROLLMENT_CONFIRMED = 'ENROLLMENT_CONFIRMED',
  LESSON_REMINDER = 'LESSON_REMINDER',
  VOTING_INVITE = 'VOTING_INVITE',
  PAYMENT_REMINDER = 'PAYMENT_REMINDER',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  COURSE_UPDATE = 'COURSE_UPDATE',
  GENERAL = 'GENERAL'
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  READ = 'READ'
}

// =====================================================
// API RESPONSE TYPES
// =====================================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  code?: string
  message?: string
  meta?: PaginationMeta
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

// =====================================================
// FORM/REQUEST TYPES
// =====================================================

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterSchoolRequest {
  email: string
  password: string
  name: string
  schoolName: string
  company?: string
  description?: string
}

export interface RegisterTeacherRequest {
  email: string
  password: string
  name: string
  schoolId: string
  bio?: string
  expertise?: string[]
}

export interface RegisterStudentRequest {
  email: string
  password: string
  name: string
  schoolId: string
  languageLevel?: LanguageLevel
  bio?: string
}

export interface CreateCourseRequest {
  name: string
  description?: string
  startDate?: string
  endDate?: string
  maxStudents?: number
  price?: number
  currency?: string
  modules?: {
    title: string
    description?: string
  }[]
}

export interface CreateEnrollmentRequest {
  studentId: string
  courseId: string
  amountDue?: number
  notes?: string
}

export interface ScheduleLessonsRequest {
  startDate: string
  frequency?: 'daily' | 'weekly' | 'biweekly'
  preferredTime?: string
  skipWeekends?: boolean
  numberOfLessons?: number
  duration?: number
}

// =====================================================
// DASHBOARD TYPES
// =====================================================

export interface DashboardStats {
  // Admin
  totalSchools?: number
  totalTeachers?: number
  totalStudents?: number
  totalCourses?: number
  activeCourses?: number
  totalLessons?: number
  upcomingLessons?: number
  pendingPayments?: number

  // School
  teachers?: number
  students?: number
  courseDraft?: number
  courseVoting?: number
  courseScheduled?: number
  courseInProgress?: number
  courseCompleted?: number
  pendingQuestions?: number
  pendingFeedback?: number

  // Teacher
  assignedCourses?: number
  upcomingLessonsCount?: number
  completedLessons?: number
  completionRate?: number

  // Student
  enrolledCourses?: number
  completedCourses?: number
  averageProgress?: number
  lessonsAttended?: number
  lessonsMissed?: number
  attendanceRate?: number
}

export interface PaymentSummary {
  totalDue: number
  totalPaid: number
  outstanding: number
  pendingCount: number
  overdueCount: number
}

// Legacy support - aliases for backward compatibility
export type Roundtable = Course
export type RoundtableStatus = CourseStatus
export type Session = Lesson
export type SessionStatus = LessonStatus
export type Participant = Student
export type ParticipantStatus = EnrollmentStatus
export type Topic = Module
export type Trainer = Teacher
export type Client = School
