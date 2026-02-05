import { Request, Response, NextFunction } from 'express'
import { UserRole } from '@prisma/client'
import { prisma } from '../config/database'

// Role hierarchy: ADMIN > LANGUAGE_SCHOOL > TEACHER > STUDENT
const roleHierarchy: Record<UserRole, number> = {
  ADMIN: 100,
  LANGUAGE_SCHOOL: 50,
  TEACHER: 25,
  STUDENT: 10
}

// Check if user has one of the required roles
export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      })
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
        code: 'FORBIDDEN',
        requiredRoles: allowedRoles
      })
    }

    next()
  }
}

// Check if user has minimum role level
export const requireMinRole = (minRole: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      })
    }

    if (roleHierarchy[req.user.role] < roleHierarchy[minRole]) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
        code: 'FORBIDDEN',
        requiredMinRole: minRole
      })
    }

    next()
  }
}

// Admin only
export const requireAdmin = requireRole('ADMIN')

// School admin or higher
export const requireSchoolAdmin = requireRole('ADMIN', 'LANGUAGE_SCHOOL')

// Teacher or higher
export const requireTeacher = requireRole('ADMIN', 'LANGUAGE_SCHOOL', 'TEACHER')

// Any authenticated user
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
      code: 'UNAUTHORIZED'
    })
  }
  next()
}

// Multi-tenant isolation: ensure user can only access their school's data
export const requireSchoolAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
      code: 'UNAUTHORIZED'
    })
  }

  // Admin can access everything
  if (req.user.role === 'ADMIN') {
    return next()
  }

  // Get schoolId from params or query
  const requestedSchoolId = req.params.schoolId || req.query.schoolId || req.body?.schoolId

  if (!requestedSchoolId) {
    return next() // No specific school requested, let the controller handle filtering
  }

  // School users can only access their own school
  if (req.user.schoolId && req.user.schoolId !== requestedSchoolId) {
    return res.status(403).json({
      success: false,
      error: 'Access denied to this school',
      code: 'SCHOOL_ACCESS_DENIED'
    })
  }

  next()
}

// Ensure user can access a specific course
export const requireCourseAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
      code: 'UNAUTHORIZED'
    })
  }

  // Admin can access everything
  if (req.user.role === 'ADMIN') {
    return next()
  }

  const courseId = req.params.courseId || req.params.id

  if (!courseId) {
    return next()
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        schoolId: true,
        enrollments: {
          where: { studentId: req.user.studentId || '' },
          select: { id: true }
        },
        courseTeachers: {
          where: { teacherId: req.user.teacherId || '' },
          select: { id: true }
        }
      }
    })

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found',
        code: 'NOT_FOUND'
      })
    }

    // School admin owns the course
    if (req.user.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === course.schoolId) {
      return next()
    }

    // Teacher is assigned to the course
    if (req.user.role === 'TEACHER' && course.courseTeachers.length > 0) {
      return next()
    }

    // Student is enrolled in the course
    if (req.user.role === 'STUDENT' && course.enrollments.length > 0) {
      return next()
    }

    return res.status(403).json({
      success: false,
      error: 'Access denied to this course',
      code: 'COURSE_ACCESS_DENIED'
    })
  } catch (error) {
    console.error('Course access check error:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to verify course access',
      code: 'ACCESS_CHECK_ERROR'
    })
  }
}

// Ensure user can access a specific lesson
export const requireLessonAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
      code: 'UNAUTHORIZED'
    })
  }

  // Admin can access everything
  if (req.user.role === 'ADMIN') {
    return next()
  }

  const lessonId = req.params.lessonId || req.params.id

  if (!lessonId) {
    return next()
  }

  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: {
        teacherId: true,
        course: {
          select: {
            schoolId: true,
            enrollments: {
              where: { studentId: req.user.studentId || '' },
              select: { id: true }
            }
          }
        }
      }
    })

    if (!lesson) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found',
        code: 'NOT_FOUND'
      })
    }

    // School admin owns the course
    if (req.user.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === lesson.course.schoolId) {
      return next()
    }

    // Teacher is assigned to the lesson
    if (req.user.role === 'TEACHER' && lesson.teacherId === req.user.teacherId) {
      return next()
    }

    // Student is enrolled in the course
    if (req.user.role === 'STUDENT' && lesson.course.enrollments.length > 0) {
      return next()
    }

    return res.status(403).json({
      success: false,
      error: 'Access denied to this lesson',
      code: 'LESSON_ACCESS_DENIED'
    })
  } catch (error) {
    console.error('Lesson access check error:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to verify lesson access',
      code: 'ACCESS_CHECK_ERROR'
    })
  }
}

// Owner or admin only - for resources that belong to a specific user
export const requireOwnerOrAdmin = (
  getOwnerId: (req: Request) => string | undefined
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      })
    }

    if (req.user.role === 'ADMIN') {
      return next()
    }

    const ownerId = getOwnerId(req)
    if (ownerId && ownerId === req.user.id) {
      return next()
    }

    return res.status(403).json({
      success: false,
      error: 'Access denied',
      code: 'FORBIDDEN'
    })
  }
}
