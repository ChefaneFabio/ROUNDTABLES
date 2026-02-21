import { prisma } from '../config/database'
import crypto from 'crypto'
import PDFDocument from 'pdfkit'

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

  // Generate PDF certificate
  async generatePdf(certificateId: string): Promise<Buffer> {
    const certificate = await this.getCertificate(certificateId)

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 50 })
      const chunks: Buffer[] = []

      doc.on('data', (chunk: Buffer) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      const w = doc.page.width
      const h = doc.page.height

      // Border
      doc.lineWidth(3).rect(30, 30, w - 60, h - 60).stroke('#4f46e5')
      doc.lineWidth(1).rect(36, 36, w - 72, h - 72).stroke('#c7d2fe')

      // Header
      doc.fontSize(14).fillColor('#6b7280').text('MAKA LEARNING MANAGEMENT CENTRE', 0, 70, { align: 'center' })
      doc.moveDown(0.3)
      doc.fontSize(32).fillColor('#111827').text('Certificate of Achievement', { align: 'center' })

      // Decorative line
      const cx = w / 2
      doc.moveTo(cx - 100, 145).lineTo(cx + 100, 145).lineWidth(2).stroke('#4f46e5')

      // Body
      doc.moveDown(1.5)
      doc.fontSize(14).fillColor('#6b7280').text('This is to certify that', { align: 'center' })
      doc.moveDown(0.5)
      doc.fontSize(26).fillColor('#111827').text(certificate.student.user.name, { align: 'center' })
      doc.moveDown(0.5)
      doc.fontSize(14).fillColor('#6b7280').text('has demonstrated proficiency at', { align: 'center' })
      doc.moveDown(0.5)
      doc.fontSize(42).fillColor('#4f46e5').text(`CEFR ${certificate.cefrLevel}`, { align: 'center' })
      doc.moveDown(0.3)
      doc.fontSize(16).fillColor('#374151').text(`in ${certificate.language}`, { align: 'center' })

      if (certificate.course) {
        doc.moveDown(0.5)
        doc.fontSize(12).fillColor('#6b7280').text(`Course: ${certificate.course.name}`, { align: 'center' })
      }

      // Footer
      const footerY = h - 120
      doc.fontSize(10).fillColor('#9ca3af')
      doc.text(`Certificate No: ${certificate.certificateNumber}`, 60, footerY, { align: 'left' })
      doc.text(`Issued: ${certificate.issuedAt.toISOString().split('T')[0]}`, 60, footerY + 14, { align: 'left' })
      if (certificate.validUntil) {
        doc.text(`Valid Until: ${certificate.validUntil.toISOString().split('T')[0]}`, 60, footerY + 28, { align: 'left' })
      }
      doc.text('Maka Learning Management Centre', 0, footerY + 14, { align: 'right', width: w - 60 })

      doc.end()
    })
  }

  // Generate assessment result PDF (detailed report)
  async generateAssessmentResultPdf(assessmentId: string): Promise<Buffer> {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } }
      }
    })

    if (!assessment) throw new Error('Assessment not found')
    if (assessment.status !== 'COMPLETED') throw new Error('Assessment not yet completed')

    const answers = (assessment.answers as any[]) || []
    const correctCount = answers.filter((a: any) => a.isCorrect).length

    const LEVEL_NAMES: Record<string, string> = {
      A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate',
      B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficiency'
    }
    const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

    // Build level breakdown
    const levelBreakdown: Record<string, { correct: number; total: number }> = {}
    for (const answer of answers) {
      if (!levelBreakdown[answer.cefrLevel]) {
        levelBreakdown[answer.cefrLevel] = { correct: 0, total: 0 }
      }
      levelBreakdown[answer.cefrLevel].total++
      if (answer.isCorrect) levelBreakdown[answer.cefrLevel].correct++
    }

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 })
      const chunks: Buffer[] = []

      doc.on('data', (chunk: Buffer) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      const w = doc.page.width - 100 // usable width

      // Header bar
      doc.rect(0, 0, doc.page.width, 80).fill('#4f46e5')
      doc.fontSize(22).fillColor('#ffffff').text('Maka Learning Management Centre', 50, 25)
      doc.fontSize(12).text('Placement Test Results', 50, 52)

      // Student info
      let y = 110
      doc.fillColor('#111827').fontSize(18).text(assessment.student.user.name, 50, y)
      y += 24
      doc.fillColor('#6b7280').fontSize(11).text(assessment.student.user.email, 50, y)
      y += 16
      doc.text(`${assessment.language} Placement Test  |  ${assessment.completedAt ? new Date(assessment.completedAt).toLocaleDateString() : ''}`, 50, y)

      // Result box
      y += 40
      doc.roundedRect(50, y, w, 90, 8).fill('#f3f4f6')
      doc.fillColor('#6b7280').fontSize(11).text('Your CEFR Level', 70, y + 12)
      doc.fillColor('#4f46e5').fontSize(36).text(assessment.cefrLevel || 'A1', 70, y + 28)
      doc.fillColor('#374151').fontSize(14).text(LEVEL_NAMES[assessment.cefrLevel || 'A1'] || '', 70, y + 68)

      // Score summary on right
      doc.fillColor('#111827').fontSize(28).text(`${assessment.score}%`, 350, y + 18, { width: w - 320, align: 'center' })
      doc.fillColor('#6b7280').fontSize(11).text('Overall Score', 350, y + 50, { width: w - 320, align: 'center' })

      doc.fillColor('#111827').fontSize(16).text(`${correctCount} / ${answers.length}`, 350, y + 68, { width: w - 320, align: 'center' })

      // Level breakdown table
      y += 120
      doc.fillColor('#111827').fontSize(16).text('Performance by Level', 50, y)
      y += 30

      // Table header
      doc.rect(50, y, w, 24).fill('#f9fafb')
      doc.fillColor('#374151').fontSize(10)
      doc.text('Level', 60, y + 7)
      doc.text('Name', 130, y + 7)
      doc.text('Correct', 300, y + 7)
      doc.text('Total', 370, y + 7)
      doc.text('Accuracy', 430, y + 7)
      y += 24

      for (const level of CEFR_LEVELS) {
        const data = levelBreakdown[level]
        if (!data) continue

        const pct = Math.round((data.correct / data.total) * 100)
        const barColor = pct >= 60 ? '#22c55e' : '#ef4444'

        doc.fillColor('#111827').fontSize(10)
        doc.text(level, 60, y + 6)
        doc.text(LEVEL_NAMES[level], 130, y + 6)
        doc.text(`${data.correct}`, 300, y + 6)
        doc.text(`${data.total}`, 370, y + 6)

        // Accuracy bar
        doc.rect(430, y + 4, 80, 12).fill('#e5e7eb')
        doc.rect(430, y + 4, Math.max(1, (pct / 100) * 80), 12).fill(barColor)
        doc.fillColor('#111827').text(`${pct}%`, 515, y + 6)

        doc.moveTo(50, y + 24).lineTo(50 + w, y + 24).lineWidth(0.5).stroke('#e5e7eb')
        y += 28
      }

      // Footer
      const footerY = doc.page.height - 60
      doc.fillColor('#9ca3af').fontSize(9)
      doc.text('This report was generated by Maka Learning Management Centre. Results are based on an adaptive placement test.', 50, footerY, { width: w, align: 'center' })

      doc.end()
    })
  }

  // Generate multi-skill assessment result PDF
  async generateMultiSkillResultPdf(assessmentId: string): Promise<Buffer> {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        sections: { orderBy: { orderIndex: 'asc' } }
      }
    })

    if (!assessment) throw new Error('Assessment not found')
    if (assessment.status !== 'COMPLETED') throw new Error('Assessment not yet completed')

    const LEVEL_NAMES: Record<string, string> = {
      A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate',
      B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficiency'
    }

    const SKILL_LABELS: Record<string, string> = {
      READING: 'Reading', LISTENING: 'Listening', WRITING: 'Writing', SPEAKING: 'Speaking'
    }

    const SKILL_COLORS: Record<string, string> = {
      READING: '#3b82f6', LISTENING: '#22c55e', WRITING: '#f59e0b', SPEAKING: '#a855f7'
    }

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 })
      const chunks: Buffer[] = []

      doc.on('data', (chunk: Buffer) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      const w = doc.page.width - 100

      // Header bar
      doc.rect(0, 0, doc.page.width, 80).fill('#4f46e5')
      doc.fontSize(22).fillColor('#ffffff').text('Maka Learning Management Centre', 50, 25)
      doc.fontSize(12).text('4-Skills Placement Test Results', 50, 52)

      // Student info
      let y = 110
      doc.fillColor('#111827').fontSize(18).text(assessment.student.user.name, 50, y)
      y += 24
      doc.fillColor('#6b7280').fontSize(11).text(assessment.student.user.email, 50, y)
      y += 16
      doc.text(`${assessment.language} 4-Skills Placement Test  |  ${assessment.completedAt ? new Date(assessment.completedAt).toLocaleDateString() : ''}`, 50, y)

      // Overall result box
      y += 40
      doc.roundedRect(50, y, w, 90, 8).fill('#f3f4f6')
      doc.fillColor('#6b7280').fontSize(11).text('Overall CEFR Level', 70, y + 12)
      doc.fillColor('#4f46e5').fontSize(36).text(assessment.cefrLevel || 'N/A', 70, y + 28)
      doc.fillColor('#374151').fontSize(14).text(LEVEL_NAMES[assessment.cefrLevel || ''] || 'Pending', 70, y + 68)

      if (assessment.score != null) {
        doc.fillColor('#111827').fontSize(28).text(`${assessment.score}%`, 350, y + 18, { width: w - 320, align: 'center' })
        doc.fillColor('#6b7280').fontSize(11).text('Average Score', 350, y + 50, { width: w - 320, align: 'center' })
      }

      // Per-skill breakdown
      y += 120
      doc.fillColor('#111827').fontSize(16).text('Skill Breakdown', 50, y)
      y += 30

      // Table header
      doc.rect(50, y, w, 24).fill('#f9fafb')
      doc.fillColor('#374151').fontSize(10)
      doc.text('Skill', 60, y + 7)
      doc.text('CEFR Level', 180, y + 7)
      doc.text('Score', 300, y + 7)
      doc.text('Questions', 390, y + 7)
      doc.text('Status', 460, y + 7)
      y += 24

      for (const section of (assessment as any).sections) {
        const skillColor = SKILL_COLORS[section.skill] || '#6b7280'
        const level = section.cefrLevel || '...'
        const pct = section.percentageScore != null ? `${section.percentageScore}%` : '—'

        doc.fillColor(skillColor).fontSize(11).text(SKILL_LABELS[section.skill] || section.skill, 60, y + 6)
        doc.fillColor('#111827').fontSize(10)
        doc.text(level, 180, y + 6)

        // Score bar
        if (section.percentageScore != null) {
          doc.rect(300, y + 4, 70, 12).fill('#e5e7eb')
          doc.rect(300, y + 4, Math.max(1, (section.percentageScore / 100) * 70), 12).fill(skillColor)
          doc.fillColor('#111827').text(pct, 375, y + 6)
        } else {
          doc.fillColor('#9ca3af').text('—', 300, y + 6)
        }

        const answered = section.questionsAnswered || 0
        const total = section.questionsTotal || section.questionsLimit || 0
        doc.fillColor('#6b7280').text(`${answered}/${total}`, 390, y + 6)

        const hasTeacher = section.teacherScore != null
        doc.fillColor(hasTeacher ? '#22c55e' : '#6b7280').text(
          hasTeacher ? 'Teacher Reviewed' : section.status === 'COMPLETED' ? 'AI Scored' : section.status,
          460, y + 6
        )

        doc.moveTo(50, y + 24).lineTo(50 + w, y + 24).lineWidth(0.5).stroke('#e5e7eb')
        y += 28
      }

      // Per-skill CEFR summary
      y += 20
      const skillLevels = [
        { label: 'Reading', level: assessment.readingLevel },
        { label: 'Listening', level: assessment.listeningLevel },
        { label: 'Writing', level: assessment.writingLevel },
        { label: 'Speaking', level: assessment.speakingLevel }
      ].filter(s => s.level)

      if (skillLevels.length > 0) {
        doc.fillColor('#111827').fontSize(14).text('Individual Skill Levels', 50, y)
        y += 24
        const boxW = (w - 30) / 4
        skillLevels.forEach((s, i) => {
          const x = 50 + i * (boxW + 10)
          doc.roundedRect(x, y, boxW, 60, 6).fill('#f3f4f6')
          doc.fillColor('#6b7280').fontSize(9).text(s.label, x + 8, y + 8)
          doc.fillColor('#4f46e5').fontSize(22).text(s.level || '', x + 8, y + 24)
        })
        y += 80
      }

      // Footer
      const footerY = doc.page.height - 60
      doc.fillColor('#9ca3af').fontSize(9)
      doc.text(
        'This report was generated by Maka Learning Management Centre. Results are based on a 4-skills adaptive placement test covering Reading, Listening, Writing, and Speaking.',
        50, footerY, { width: w, align: 'center' }
      )

      doc.end()
    })
  }

  // Generate LinkedIn share URL
  getLinkedInShareUrl(certificate: any): string {
    const certData = {
      name: `CEFR ${certificate.cefrLevel} - ${certificate.language}`,
      organizationName: 'Maka Learning Management Centre',
      issueYear: certificate.issuedAt.getFullYear(),
      issueMonth: certificate.issuedAt.getMonth() + 1,
      certId: certificate.certificateNumber,
      certUrl: `https://makalmc.com/verify/${certificate.certificateNumber}`
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
