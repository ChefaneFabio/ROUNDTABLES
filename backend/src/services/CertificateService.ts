import { prisma } from '../config/database'
import crypto from 'crypto'

interface GenerateCertificateInput {
  studentId: string
  courseId?: string
  assessmentId?: string
  cefrLevel: string
  language: string
}

export class CertificateService {
  // Generate a unique certificate number
  private generateCertificateNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = crypto.randomBytes(4).toString('hex').toUpperCase()
    return `MAKA-${timestamp}-${random}`
  }

  // Generate certificate for course completion
  async generateCourseCertificate(studentId: string, courseId: string) {
    // Verify student completed the course
    const progress = await prisma.progress.findUnique({
      where: {
        studentId_courseId: { studentId, courseId }
      },
      include: {
        course: true,
        student: {
          include: { user: { select: { name: true, email: true } } }
        }
      }
    })

    if (!progress) {
      throw new Error('Progress record not found')
    }

    if (!progress.completedAt) {
      throw new Error('Course not yet completed')
    }

    // Check if certificate already exists
    const existingCert = await prisma.certificate.findFirst({
      where: { studentId, courseId }
    })

    if (existingCert) {
      return existingCert
    }

    // Determine CEFR level from student's current level
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    })

    const certificate = await prisma.certificate.create({
      data: {
        studentId,
        courseId,
        cefrLevel: student?.languageLevel || 'B1',
        language: 'English', // Default, should come from course
        certificateNumber: this.generateCertificateNumber(),
        validUntil: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000), // 2 years validity
        metadata: {
          courseName: progress.course.name,
          completedAt: progress.completedAt,
          grade: progress.grade,
          score: progress.averageScore
        }
      },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        course: { select: { name: true } }
      }
    })

    return certificate
  }

  // Generate certificate for assessment (placement test)
  async generateAssessmentCertificate(studentId: string, assessmentId: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } }
      }
    })

    if (!assessment) {
      throw new Error('Assessment not found')
    }

    if (assessment.status !== 'COMPLETED') {
      throw new Error('Assessment not yet completed')
    }

    if (assessment.studentId !== studentId) {
      throw new Error('Assessment does not belong to this student')
    }

    // Check if certificate already exists
    const existingCert = await prisma.certificate.findFirst({
      where: { studentId, assessmentId }
    })

    if (existingCert) {
      return existingCert
    }

    const certificate = await prisma.certificate.create({
      data: {
        studentId,
        assessmentId,
        cefrLevel: assessment.cefrLevel || 'A1',
        language: assessment.language,
        certificateNumber: this.generateCertificateNumber(),
        validUntil: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000),
        metadata: {
          assessmentType: assessment.type,
          score: assessment.score,
          completedAt: assessment.completedAt
        }
      },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } }
      }
    })

    return certificate
  }

  // Get certificate by ID
  async getCertificate(certificateId: string) {
    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        course: { select: { name: true, description: true } }
      }
    })

    if (!certificate) {
      throw new Error('Certificate not found')
    }

    return certificate
  }

  // Get certificate by number (for verification)
  async verifyCertificate(certificateNumber: string) {
    const certificate = await prisma.certificate.findUnique({
      where: { certificateNumber },
      include: {
        student: { include: { user: { select: { name: true } } } },
        course: { select: { name: true } }
      }
    })

    if (!certificate) {
      return { valid: false, message: 'Certificate not found' }
    }

    const isExpired = certificate.validUntil && certificate.validUntil < new Date()

    return {
      valid: !isExpired,
      expired: isExpired,
      certificate: {
        certificateNumber: certificate.certificateNumber,
        studentName: certificate.student.user.name,
        cefrLevel: certificate.cefrLevel,
        language: certificate.language,
        courseName: certificate.course?.name,
        issuedAt: certificate.issuedAt,
        validUntil: certificate.validUntil
      }
    }
  }

  // Get student's certificates
  async getStudentCertificates(studentId: string) {
    return prisma.certificate.findMany({
      where: { studentId },
      include: {
        course: { select: { name: true } }
      },
      orderBy: { issuedAt: 'desc' }
    })
  }

  // Get school's certificates (for analytics)
  async getSchoolCertificates(schoolId: string) {
    return prisma.certificate.findMany({
      where: {
        student: { schoolId }
      },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        course: { select: { name: true } }
      },
      orderBy: { issuedAt: 'desc' }
    })
  }

  // Generate PDF certificate (placeholder - would use pdfkit in production)
  async generatePdf(certificateId: string): Promise<Buffer> {
    const certificate = await this.getCertificate(certificateId)

    // In production, use pdfkit to generate actual PDF
    // For now, return a placeholder
    const pdfContent = `
      MAKA LANGUAGE CENTRE
      Certificate of Achievement

      This is to certify that
      ${certificate.student.user.name}

      has achieved CEFR Level ${certificate.cefrLevel}
      in ${certificate.language}

      ${certificate.course ? `Course: ${certificate.course.name}` : ''}

      Certificate Number: ${certificate.certificateNumber}
      Issued: ${certificate.issuedAt.toISOString().split('T')[0]}
      Valid Until: ${certificate.validUntil?.toISOString().split('T')[0] || 'N/A'}
    `

    return Buffer.from(pdfContent)
  }

  // Generate LinkedIn share URL
  getLinkedInShareUrl(certificate: any): string {
    const certData = {
      name: `CEFR ${certificate.cefrLevel} - ${certificate.language}`,
      organizationName: 'MAKA Language Centre',
      issueYear: certificate.issuedAt.getFullYear(),
      issueMonth: certificate.issuedAt.getMonth() + 1,
      certId: certificate.certificateNumber,
      certUrl: `https://maka.language/verify/${certificate.certificateNumber}`
    }

    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: certData.name,
      organizationName: certData.organizationName,
      issueYear: certData.issueYear.toString(),
      issueMonth: certData.issueMonth.toString(),
      certId: certData.certId,
      certUrl: certData.certUrl
    })

    return `https://www.linkedin.com/profile/add?${params.toString()}`
  }
}

export const certificateService = new CertificateService()
