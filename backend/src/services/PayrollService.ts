import prisma from '../config/database';
import { PayrollStatus, LessonStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

interface PayrollCalculation {
  teacherId: string;
  periodStart: Date;
  periodEnd: Date;
  totalHours: number;
  hourlyRate: number;
  grossAmount: number;
  lessonsCount: number;
  lessons: {
    id: string;
    title: string;
    scheduledAt: Date;
    duration: number;
    courseName: string;
  }[];
}

interface CreatePayrollInput {
  teacherId: string;
  periodStart: Date;
  periodEnd: Date;
  bonuses?: number;
  bonusNotes?: string;
  deductions?: number;
  notes?: string;
}

export class PayrollService {
  // ============================================
  // PAYROLL CALCULATION
  // ============================================

  static async calculatePayroll(
    teacherId: string,
    periodStart: Date,
    periodEnd: Date
  ): Promise<PayrollCalculation> {
    // Get teacher's hourly rate
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    if (!teacher) {
      throw new Error('Teacher not found');
    }

    const hourlyRate = teacher.hourlyRate ? Number(teacher.hourlyRate) : 0;

    // Get completed lessons in the period
    const lessons = await prisma.lesson.findMany({
      where: {
        teacherId,
        status: LessonStatus.COMPLETED,
        scheduledAt: {
          gte: periodStart,
          lte: periodEnd,
        },
        deletedAt: null,
      },
      include: {
        course: {
          select: { name: true },
        },
      },
      orderBy: {
        scheduledAt: 'asc',
      },
    });

    // Calculate total hours (converting minutes to hours)
    const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
    const totalHours = totalMinutes / 60;

    // Calculate gross amount
    const grossAmount = totalHours * hourlyRate;

    return {
      teacherId,
      periodStart,
      periodEnd,
      totalHours,
      hourlyRate,
      grossAmount,
      lessonsCount: lessons.length,
      lessons: lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title || `Lesson ${lesson.lessonNumber}`,
        scheduledAt: lesson.scheduledAt,
        duration: lesson.duration,
        courseName: lesson.course.name,
      })),
    };
  }

  static async createPayroll(input: CreatePayrollInput) {
    const calculation = await this.calculatePayroll(
      input.teacherId,
      input.periodStart,
      input.periodEnd
    );

    const bonuses = input.bonuses || 0;
    const deductions = input.deductions || 0;
    const netAmount = calculation.grossAmount + bonuses - deductions;

    return prisma.teacherPayroll.create({
      data: {
        teacherId: input.teacherId,
        periodStart: input.periodStart,
        periodEnd: input.periodEnd,
        totalHours: new Decimal(calculation.totalHours),
        hourlyRate: new Decimal(calculation.hourlyRate),
        grossAmount: new Decimal(calculation.grossAmount),
        deductions: new Decimal(deductions),
        bonuses: new Decimal(bonuses),
        bonusNotes: input.bonusNotes,
        netAmount: new Decimal(netAmount),
        lessonsCount: calculation.lessonsCount,
        status: PayrollStatus.PENDING,
        notes: input.notes,
      },
      include: {
        teacher: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
      },
    });
  }

  static async generateMonthlyPayrolls(schoolId: string, year: number, month: number) {
    // Get all active teachers for the school
    const teachers = await prisma.teacher.findMany({
      where: {
        schoolId,
        isActive: true,
        deletedAt: null,
      },
    });

    // Calculate period dates
    const periodStart = new Date(year, month - 1, 1); // First day of month
    const periodEnd = new Date(year, month, 0, 23, 59, 59, 999); // Last day of month

    const payrolls = [];

    for (const teacher of teachers) {
      // Check if payroll already exists for this period
      const existing = await prisma.teacherPayroll.findFirst({
        where: {
          teacherId: teacher.id,
          periodStart,
          periodEnd,
        },
      });

      if (!existing) {
        const calculation = await this.calculatePayroll(teacher.id, periodStart, periodEnd);

        // Only create payroll if teacher has lessons
        if (calculation.lessonsCount > 0) {
          const payroll = await this.createPayroll({
            teacherId: teacher.id,
            periodStart,
            periodEnd,
          });
          payrolls.push(payroll);
        }
      }
    }

    return payrolls;
  }

  // ============================================
  // PAYROLL MANAGEMENT
  // ============================================

  static async approvePayroll(payrollId: string) {
    return prisma.teacherPayroll.update({
      where: { id: payrollId },
      data: {
        status: PayrollStatus.APPROVED,
      },
    });
  }

  static async markAsPaid(
    payrollId: string,
    paymentMethod: string,
    paymentReference?: string
  ) {
    return prisma.teacherPayroll.update({
      where: { id: payrollId },
      data: {
        status: PayrollStatus.PAID,
        paidAt: new Date(),
        paymentMethod,
        paymentReference,
      },
    });
  }

  static async cancelPayroll(payrollId: string) {
    return prisma.teacherPayroll.update({
      where: { id: payrollId },
      data: {
        status: PayrollStatus.CANCELLED,
      },
    });
  }

  static async getPayrollsByTeacher(teacherId: string, year?: number) {
    const where: any = { teacherId };

    if (year) {
      where.periodStart = {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      };
    }

    return prisma.teacherPayroll.findMany({
      where,
      orderBy: { periodStart: 'desc' },
      include: {
        invoice: true,
      },
    });
  }

  static async getPayrollsBySchool(schoolId: string, status?: PayrollStatus, year?: number, month?: number) {
    const where: any = {
      teacher: {
        schoolId,
      },
    };

    if (status) {
      where.status = status;
    }

    if (year) {
      if (month) {
        const periodStart = new Date(year, month - 1, 1);
        const periodEnd = new Date(year, month, 0, 23, 59, 59, 999);
        where.periodStart = { gte: periodStart };
        where.periodEnd = { lte: periodEnd };
      } else {
        where.periodStart = {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        };
      }
    }

    return prisma.teacherPayroll.findMany({
      where,
      orderBy: [
        { status: 'asc' },
        { periodStart: 'desc' },
      ],
      include: {
        teacher: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
        invoice: true,
      },
    });
  }

  // ============================================
  // REPORTING
  // ============================================

  static async getPayrollSummary(schoolId: string, year: number, month?: number) {
    const where: any = {
      teacher: { schoolId },
    };

    if (month) {
      const periodStart = new Date(year, month - 1, 1);
      const periodEnd = new Date(year, month, 0, 23, 59, 59, 999);
      where.periodStart = { gte: periodStart };
      where.periodEnd = { lte: periodEnd };
    } else {
      where.periodStart = {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      };
    }

    const payrolls = await prisma.teacherPayroll.findMany({
      where,
    });

    const summary = {
      totalPayrolls: payrolls.length,
      totalGross: 0,
      totalDeductions: 0,
      totalBonuses: 0,
      totalNet: 0,
      totalHours: 0,
      totalLessons: 0,
      byStatus: {
        pending: 0,
        approved: 0,
        paid: 0,
        cancelled: 0,
      },
    };

    for (const payroll of payrolls) {
      summary.totalGross += Number(payroll.grossAmount);
      summary.totalDeductions += Number(payroll.deductions);
      summary.totalBonuses += Number(payroll.bonuses);
      summary.totalNet += Number(payroll.netAmount);
      summary.totalHours += Number(payroll.totalHours);
      summary.totalLessons += payroll.lessonsCount;

      switch (payroll.status) {
        case PayrollStatus.PENDING:
          summary.byStatus.pending++;
          break;
        case PayrollStatus.APPROVED:
          summary.byStatus.approved++;
          break;
        case PayrollStatus.PAID:
          summary.byStatus.paid++;
          break;
        case PayrollStatus.CANCELLED:
          summary.byStatus.cancelled++;
          break;
      }
    }

    return summary;
  }

  static async getTeacherEarningsReport(teacherId: string, year: number) {
    const payrolls = await prisma.teacherPayroll.findMany({
      where: {
        teacherId,
        status: { not: PayrollStatus.CANCELLED },
        periodStart: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
      orderBy: { periodStart: 'asc' },
    });

    const monthlyEarnings = Array(12).fill(null).map((_, i) => ({
      month: i + 1,
      grossAmount: 0,
      netAmount: 0,
      hours: 0,
      lessons: 0,
    }));

    for (const payroll of payrolls) {
      const month = payroll.periodStart.getMonth();
      monthlyEarnings[month].grossAmount += Number(payroll.grossAmount);
      monthlyEarnings[month].netAmount += Number(payroll.netAmount);
      monthlyEarnings[month].hours += Number(payroll.totalHours);
      monthlyEarnings[month].lessons += payroll.lessonsCount;
    }

    const totalGross = monthlyEarnings.reduce((sum, m) => sum + m.grossAmount, 0);
    const totalNet = monthlyEarnings.reduce((sum, m) => sum + m.netAmount, 0);
    const totalHours = monthlyEarnings.reduce((sum, m) => sum + m.hours, 0);
    const totalLessons = monthlyEarnings.reduce((sum, m) => sum + m.lessons, 0);

    return {
      year,
      teacherId,
      monthlyEarnings,
      totals: {
        grossAmount: totalGross,
        netAmount: totalNet,
        hours: totalHours,
        lessons: totalLessons,
      },
    };
  }
}

export default PayrollService;
