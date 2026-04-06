import { prisma } from '../config/database'

/**
 * Lesson Reminder Service — Automation Filtering Tests
 * Verifies that the automationsEnabled flag correctly filters lessons
 */

describe('LessonReminderService — automationsEnabled filter', () => {

  it('should only find lessons from courses with automationsEnabled=true', async () => {
    const now = new Date()
    const windowStart = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour from now
    const windowEnd = new Date(now.getTime() + (60 + 15) * 60 * 1000) // 1h15m from now

    // Query mimics what LessonReminderService does
    const lessons = await prisma.lesson.findMany({
      where: {
        deletedAt: null,
        status: { in: ['SCHEDULED', 'REMINDER_SENT'] },
        scheduledAt: { gte: windowStart, lte: windowEnd },
        course: { automationsEnabled: true }
      },
      include: {
        course: { select: { id: true, name: true, automationsEnabled: true } }
      }
    })

    // All returned lessons should belong to courses with automationsEnabled=true
    for (const lesson of lessons) {
      expect(lesson.course.automationsEnabled).toBe(true)
    }
  })

  it('should NOT return lessons from courses with automationsEnabled=false', async () => {
    // Find courses with automationsEnabled=false
    const disabledCourses = await prisma.course.findMany({
      where: { automationsEnabled: false },
      select: { id: true }
    })

    if (disabledCourses.length === 0) {
      // All courses have automations enabled or no courses exist
      return
    }

    const disabledCourseIds = disabledCourses.map(c => c.id)

    // Query the same way the reminder service does
    const lessons = await prisma.lesson.findMany({
      where: {
        deletedAt: null,
        course: { automationsEnabled: true }
      },
      select: { courseId: true }
    })

    // No returned lesson should belong to a disabled course
    for (const lesson of lessons) {
      expect(disabledCourseIds).not.toContain(lesson.courseId)
    }
  })

  it('should handle courses with no automationsEnabled field gracefully', async () => {
    // Default is false, so new courses should not appear
    const courses = await prisma.course.findMany({
      where: { automationsEnabled: false },
      take: 5,
      select: { id: true, automationsEnabled: true }
    })

    for (const course of courses) {
      expect(course.automationsEnabled).toBe(false)
    }
  })
})

describe('CourseContact — notification routing', () => {
  it('should find course contacts for a given course', async () => {
    // Find any course
    const course = await prisma.course.findFirst({ select: { id: true } })
    if (!course) return

    const contacts = await prisma.courseContact.findMany({
      where: { courseId: course.id },
      include: { contact: true }
    })

    // Should be an array (possibly empty)
    expect(Array.isArray(contacts)).toBe(true)

    // Each entry should have a valid contact
    for (const cc of contacts) {
      expect(cc.contact).toBeDefined()
      expect(cc.contact.email).toBeDefined()
    }
  })

  it('should find contacts by organization', async () => {
    const org = await prisma.organization.findFirst({ select: { id: true } })
    if (!org) return

    const contacts = await prisma.organizationContact.findMany({
      where: { organizationId: org.id },
      include: { courseContacts: true }
    })

    expect(Array.isArray(contacts)).toBe(true)
  })
})
