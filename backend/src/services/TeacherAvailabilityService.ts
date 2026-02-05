import prisma from '../config/database';
import { AvailabilityStatus, SubstitutionReason, SubstitutionStatus } from '@prisma/client';

interface TimeSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface AvailabilityInput {
  teacherId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isRecurring?: boolean;
  specificDate?: Date;
  status?: AvailabilityStatus;
  notes?: string;
}

interface SubstitutionRequest {
  lessonId: string;
  originalTeacherId: string;
  reason: SubstitutionReason;
  notes?: string;
}

export class TeacherAvailabilityService {
  // ============================================
  // AVAILABILITY MANAGEMENT
  // ============================================

  static async setAvailability(input: AvailabilityInput) {
    return prisma.teacherAvailability.create({
      data: {
        teacherId: input.teacherId,
        dayOfWeek: input.dayOfWeek,
        startTime: input.startTime,
        endTime: input.endTime,
        isRecurring: input.isRecurring ?? true,
        specificDate: input.specificDate,
        status: input.status ?? AvailabilityStatus.AVAILABLE,
        notes: input.notes,
      },
    });
  }

  static async setWeeklyAvailability(teacherId: string, slots: TimeSlot[]) {
    // Delete existing recurring availability
    await prisma.teacherAvailability.deleteMany({
      where: {
        teacherId,
        isRecurring: true,
      },
    });

    // Create new availability slots
    return prisma.teacherAvailability.createMany({
      data: slots.map(slot => ({
        teacherId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isRecurring: true,
        status: AvailabilityStatus.AVAILABLE,
      })),
    });
  }

  static async getTeacherAvailability(teacherId: string, date?: Date) {
    const where: any = { teacherId };

    if (date) {
      const dayOfWeek = date.getDay();
      where.OR = [
        { isRecurring: true, dayOfWeek },
        { specificDate: date },
      ];
    }

    return prisma.teacherAvailability.findMany({
      where,
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  static async blockTime(
    teacherId: string,
    date: Date,
    startTime: string,
    endTime: string,
    status: AvailabilityStatus,
    notes?: string
  ) {
    return prisma.teacherAvailability.create({
      data: {
        teacherId,
        dayOfWeek: date.getDay(),
        startTime,
        endTime,
        isRecurring: false,
        specificDate: date,
        status,
        notes,
      },
    });
  }

  static async isTeacherAvailable(
    teacherId: string,
    date: Date,
    startTime: string,
    endTime: string
  ): Promise<boolean> {
    const dayOfWeek = date.getDay();

    // Check for blocked time
    const blockedTime = await prisma.teacherAvailability.findFirst({
      where: {
        teacherId,
        OR: [
          { isRecurring: true, dayOfWeek },
          { specificDate: date },
        ],
        status: {
          in: [AvailabilityStatus.BUSY, AvailabilityStatus.VACATION, AvailabilityStatus.SICK_LEAVE],
        },
        startTime: { lte: startTime },
        endTime: { gte: endTime },
      },
    });

    if (blockedTime) {
      return false;
    }

    // Check for available time slot
    const availableSlot = await prisma.teacherAvailability.findFirst({
      where: {
        teacherId,
        OR: [
          { isRecurring: true, dayOfWeek },
          { specificDate: date },
        ],
        status: AvailabilityStatus.AVAILABLE,
        startTime: { lte: startTime },
        endTime: { gte: endTime },
      },
    });

    return !!availableSlot;
  }

  // ============================================
  // AUTOMATIC SCHEDULING
  // ============================================

  static async findAvailableTeachers(
    schoolId: string,
    date: Date,
    startTime: string,
    endTime: string,
    expertise?: string[]
  ) {
    const dayOfWeek = date.getDay();

    // Get all teachers from the school
    const teachers = await prisma.teacher.findMany({
      where: {
        schoolId,
        isActive: true,
        deletedAt: null,
        ...(expertise?.length ? {
          expertise: { hasSome: expertise },
        } : {}),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        availability: {
          where: {
            OR: [
              { isRecurring: true, dayOfWeek },
              { specificDate: date },
            ],
          },
        },
        lessons: {
          where: {
            scheduledAt: {
              gte: new Date(date.setHours(0, 0, 0, 0)),
              lt: new Date(date.setHours(23, 59, 59, 999)),
            },
            deletedAt: null,
          },
        },
      },
    });

    // Filter teachers who are available at the requested time
    return teachers.filter(teacher => {
      // Check if teacher has availability for this time
      const hasAvailability = teacher.availability.some(
        a => a.status === AvailabilityStatus.AVAILABLE &&
          a.startTime <= startTime &&
          a.endTime >= endTime
      );

      if (!hasAvailability) return false;

      // Check if teacher is blocked
      const isBlocked = teacher.availability.some(
        a => [AvailabilityStatus.BUSY, AvailabilityStatus.VACATION, AvailabilityStatus.SICK_LEAVE].includes(a.status) &&
          a.startTime <= startTime &&
          a.endTime >= endTime
      );

      if (isBlocked) return false;

      // Check if teacher has conflicting lessons
      const hasConflict = teacher.lessons.some(lesson => {
        const lessonStart = lesson.scheduledAt;
        const lessonEnd = new Date(lessonStart.getTime() + lesson.duration * 60000);

        const requestedStart = new Date(date);
        const [reqStartHour, reqStartMin] = startTime.split(':').map(Number);
        requestedStart.setHours(reqStartHour, reqStartMin, 0, 0);

        const requestedEnd = new Date(date);
        const [reqEndHour, reqEndMin] = endTime.split(':').map(Number);
        requestedEnd.setHours(reqEndHour, reqEndMin, 0, 0);

        return lessonStart < requestedEnd && lessonEnd > requestedStart;
      });

      return !hasConflict;
    });
  }

  static async suggestLessonTimes(
    teacherId: string,
    duration: number, // minutes
    preferredDays?: number[],
    weeksAhead: number = 2
  ) {
    const suggestions: { date: Date; startTime: string; endTime: string }[] = [];
    const today = new Date();

    // Get teacher's recurring availability
    const availability = await prisma.teacherAvailability.findMany({
      where: {
        teacherId,
        isRecurring: true,
        status: AvailabilityStatus.AVAILABLE,
      },
    });

    // Get existing lessons for the next weeks
    const existingLessons = await prisma.lesson.findMany({
      where: {
        teacherId,
        scheduledAt: {
          gte: today,
          lt: new Date(today.getTime() + weeksAhead * 7 * 24 * 60 * 60 * 1000),
        },
        deletedAt: null,
      },
    });

    // Generate suggestions for each day in the range
    for (let dayOffset = 0; dayOffset < weeksAhead * 7; dayOffset++) {
      const date = new Date(today.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      const dayOfWeek = date.getDay();

      // Skip days not in preferred days
      if (preferredDays?.length && !preferredDays.includes(dayOfWeek)) {
        continue;
      }

      // Find availability for this day
      const dayAvailability = availability.filter(a => a.dayOfWeek === dayOfWeek);

      for (const slot of dayAvailability) {
        // Generate possible time slots within the availability window
        const slotStart = this.parseTime(slot.startTime);
        const slotEnd = this.parseTime(slot.endTime);

        for (
          let startMinutes = slotStart;
          startMinutes + duration <= slotEnd;
          startMinutes += 30 // 30-minute increments
        ) {
          const startTime = this.formatTime(startMinutes);
          const endTime = this.formatTime(startMinutes + duration);

          // Check for conflicts with existing lessons
          const hasConflict = existingLessons.some(lesson => {
            const lessonDate = new Date(lesson.scheduledAt);
            if (lessonDate.toDateString() !== date.toDateString()) return false;

            const lessonStart = lessonDate.getHours() * 60 + lessonDate.getMinutes();
            const lessonEnd = lessonStart + lesson.duration;

            return startMinutes < lessonEnd && startMinutes + duration > lessonStart;
          });

          if (!hasConflict) {
            suggestions.push({ date: new Date(date), startTime, endTime });
          }
        }
      }
    }

    return suggestions.slice(0, 20); // Return up to 20 suggestions
  }

  // ============================================
  // SUBSTITUTION MANAGEMENT
  // ============================================

  static async requestSubstitution(request: SubstitutionRequest) {
    // Verify the lesson exists and get details
    const lesson = await prisma.lesson.findUnique({
      where: { id: request.lessonId },
      include: {
        course: true,
        teacher: true,
      },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    if (lesson.teacherId !== request.originalTeacherId) {
      throw new Error('Teacher is not assigned to this lesson');
    }

    // Create substitution request
    return prisma.substitution.create({
      data: {
        lessonId: request.lessonId,
        originalTeacherId: request.originalTeacherId,
        reason: request.reason,
        notes: request.notes,
        status: SubstitutionStatus.PENDING,
      },
      include: {
        lesson: {
          include: {
            course: true,
          },
        },
        originalTeacher: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  static async findSubstituteTeachers(lessonId: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        course: {
          include: {
            school: true,
          },
        },
        teacher: true,
      },
    });

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    const lessonDate = new Date(lesson.scheduledAt);
    const startTime = `${lessonDate.getHours().toString().padStart(2, '0')}:${lessonDate.getMinutes().toString().padStart(2, '0')}`;
    const endMinutes = lessonDate.getHours() * 60 + lessonDate.getMinutes() + lesson.duration;
    const endTime = this.formatTime(endMinutes);

    // Find available teachers excluding the original teacher
    const availableTeachers = await this.findAvailableTeachers(
      lesson.course.schoolId,
      lessonDate,
      startTime,
      endTime
    );

    return availableTeachers.filter(t => t.id !== lesson.teacherId);
  }

  static async assignSubstitute(substitutionId: string, substituteTeacherId: string) {
    const substitution = await prisma.substitution.findUnique({
      where: { id: substitutionId },
      include: {
        lesson: true,
      },
    });

    if (!substitution) {
      throw new Error('Substitution request not found');
    }

    // Verify the substitute is available
    const lessonDate = new Date(substitution.lesson.scheduledAt);
    const startTime = `${lessonDate.getHours().toString().padStart(2, '0')}:${lessonDate.getMinutes().toString().padStart(2, '0')}`;
    const endMinutes = lessonDate.getHours() * 60 + lessonDate.getMinutes() + substitution.lesson.duration;
    const endTime = this.formatTime(endMinutes);

    const isAvailable = await this.isTeacherAvailable(
      substituteTeacherId,
      lessonDate,
      startTime,
      endTime
    );

    if (!isAvailable) {
      throw new Error('Selected teacher is not available at this time');
    }

    // Update substitution and lesson
    const [updatedSubstitution] = await prisma.$transaction([
      prisma.substitution.update({
        where: { id: substitutionId },
        data: {
          substituteTeacherId,
          status: SubstitutionStatus.SUBSTITUTE_FOUND,
        },
        include: {
          lesson: true,
          originalTeacher: {
            include: { user: true },
          },
          substituteTeacher: {
            include: { user: true },
          },
        },
      }),
      prisma.lesson.update({
        where: { id: substitution.lessonId },
        data: {
          teacherId: substituteTeacherId,
          originalTeacherId: substitution.originalTeacherId,
        },
      }),
    ]);

    return updatedSubstitution;
  }

  static async confirmSubstitution(substitutionId: string) {
    return prisma.substitution.update({
      where: { id: substitutionId },
      data: {
        status: SubstitutionStatus.CONFIRMED,
        confirmedAt: new Date(),
      },
    });
  }

  static async cancelSubstitution(substitutionId: string) {
    const substitution = await prisma.substitution.findUnique({
      where: { id: substitutionId },
    });

    if (!substitution) {
      throw new Error('Substitution request not found');
    }

    // Restore original teacher if a substitute was assigned
    if (substitution.substituteTeacherId) {
      await prisma.lesson.update({
        where: { id: substitution.lessonId },
        data: {
          teacherId: substitution.originalTeacherId,
          originalTeacherId: null,
        },
      });
    }

    return prisma.substitution.update({
      where: { id: substitutionId },
      data: {
        status: SubstitutionStatus.CANCELLED,
      },
    });
  }

  static async getPendingSubstitutions(schoolId: string) {
    return prisma.substitution.findMany({
      where: {
        status: SubstitutionStatus.PENDING,
        lesson: {
          course: {
            schoolId,
          },
        },
      },
      include: {
        lesson: {
          include: {
            course: true,
          },
        },
        originalTeacher: {
          include: { user: true },
        },
      },
      orderBy: {
        lesson: {
          scheduledAt: 'asc',
        },
      },
    });
  }

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  private static parseTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private static formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
}

export default TeacherAvailabilityService;
