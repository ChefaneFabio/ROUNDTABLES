import { prisma } from '../config/database'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'
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

  // Generate certificate for SCORM package completion
  async generateScormCertificate(studentId: string, scormPackageId: string) {
    // Find the best completed attempt
    const attempt = await prisma.scormAttempt.findFirst({
      where: {
        studentId,
        scormPackageId,
        status: { in: ['COMPLETED', 'PASSED'] }
      },
      orderBy: { score: 'desc' },
      include: {
        scormPackage: true,
        student: {
          include: { user: { select: { name: true, email: true } } }
        }
      }
    })

    if (!attempt) {
      throw new Error('No completed SCORM attempt found')
    }

    // Check passing score if defined
    if (attempt.scormPackage.passingScore !== null &&
        attempt.score !== null &&
        attempt.score < attempt.scormPackage.passingScore) {
      throw new Error(`Score ${attempt.score}% does not meet passing threshold of ${attempt.scormPackage.passingScore}%`)
    }

    // Check if certificate already exists
    const existingCert = await prisma.certificate.findFirst({
      where: { studentId, scormPackageId }
    })

    if (existingCert) {
      return existingCert
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId }
    })

    const certificate = await prisma.certificate.create({
      data: {
        studentId,
        scormPackageId,
        cefrLevel: student?.languageLevel || 'B1',
        language: 'English',
        certificateNumber: this.generateCertificateNumber(),
        validUntil: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000),
        metadata: {
          scormPackageTitle: attempt.scormPackage.title,
          scormScore: attempt.score,
          scormStatus: attempt.status,
          totalTime: attempt.totalTime,
          completedAt: attempt.completedAt
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
  async generateMultiSkillResultPdf(assessmentId: string, detailed = false): Promise<Buffer> {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        sections: { orderBy: { orderIndex: 'asc' } },
        writingResponses: detailed ? true : false,
        speakingResponses: detailed ? true : false
      }
    })

    if (!assessment) throw new Error('Assessment not found')
    if (assessment.status !== 'COMPLETED') throw new Error('Assessment not yet completed')

    const LEVEL_NAMES: Record<string, string> = {
      A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate',
      B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficiency'
    }

    const SKILL_LABELS: Record<string, string> = {
      READING: 'Reading', LISTENING: 'Listening', WRITING: 'Writing', SPEAKING: 'Speaking',
      GRAMMAR: 'Grammar', VOCABULARY: 'Vocabulary',
      ERROR_CORRECTION: 'Error Correction', SENTENCE_TRANSFORMATION: 'Transformation'
    }

    const SKILL_COLORS: Record<string, string> = {
      READING: '#3b82f6', LISTENING: '#22c55e', WRITING: '#f59e0b', SPEAKING: '#a855f7',
      GRAMMAR: '#6366f1', VOCABULARY: '#14b8a6',
      ERROR_CORRECTION: '#ef4444', SENTENCE_TRANSFORMATION: '#f97316'
    }

    const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    const CEFR_GSE: Record<string, number> = { A1: 22, A2: 33, B1: 46, B2: 59, C1: 76, C2: 85 }
    const CEFR_COLORS: Record<string, string> = {
      A1: '#9ca3af', A2: '#22c55e', B1: '#3b82f6', B2: '#6366f1', C1: '#a855f7', C2: '#f59e0b'
    }

    const LEVEL_DESCRIPTIONS: Record<string, string> = {
      A1: 'Can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type.',
      A2: 'Can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar and routine matters.',
      B1: 'Can deal with most situations likely to arise whilst travelling in an area where the language is spoken. Can produce simple connected text on familiar topics.',
      B2: 'Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible. Can produce clear, detailed text on a wide range of subjects.',
      C1: 'Can express ideas fluently and spontaneously without much obvious searching for expressions. Can use language flexibly and effectively for social, academic and professional purposes.',
      C2: 'Can understand with ease virtually everything heard or read. Can express him/herself spontaneously, very fluently and precisely.',
    }

    const logoPath = path.join(__dirname, '../../public/logo.png')
    const hasLogo = fs.existsSync(logoPath)

    return new Promise(async (resolve, reject) => {
      // Tighter margin so we can use the page width better; we manage our own
      // padding per section.
      const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true })
      const chunks: Buffer[] = []

      doc.on('data', (chunk: Buffer) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      const pageW = doc.page.width
      const pageH = doc.page.height
      const MARGIN = 40
      const contentW = pageW - MARGIN * 2

      const overallLevel = assessment.cefrLevel || 'A1'
      const overallColor = CEFR_COLORS[overallLevel] || '#6366f1'

      // ─── Header band (dark, with brand stripe) ─────────────────────────
      // Deep slate bar across the top with a thin colored accent at the
      // bottom drawn in the user's overall-CEFR color.
      doc.rect(0, 0, pageW, 90).fill('#0f172a')
      doc.rect(0, 88, pageW, 4).fill(overallColor)

      if (hasLogo) {
        try { doc.image(logoPath, MARGIN, 22, { height: 46 }) } catch { /* skip */ }
      }

      const titleX = hasLogo ? MARGIN + 60 : MARGIN
      doc.fillColor('#ffffff').fontSize(18).text('MAKA Language Consulting', titleX, 28)
      doc.fillColor('#cbd5e1').fontSize(10).text('Placement Test Results · Confidential', titleX, 52)

      if (assessment.completedAt) {
        const dateStr = new Date(assessment.completedAt).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'long', year: 'numeric'
        })
        doc.fillColor('#94a3b8').fontSize(9).text('COMPLETED', pageW - MARGIN - 150, 30, { width: 150, align: 'right' })
        doc.fillColor('#ffffff').fontSize(11).text(dateStr, pageW - MARGIN - 150, 44, { width: 150, align: 'right' })
      }

      // ─── Learner info strip ────────────────────────────────────────────
      let y = 115
      doc.fillColor('#0f172a').fontSize(22).text(assessment.student.user.name, MARGIN, y)
      y += 28
      doc.fillColor('#64748b').fontSize(10)
      doc.text(`${assessment.student.user.email}    ·    ${assessment.language} placement`, MARGIN, y)
      y += 24

      // ─── Hero result card ─────────────────────────────────────────────
      // A big card that does the heavy lifting visually: huge CEFR letter,
      // friendly name, descriptive sentence, a strip showing the GSE scale
      // with the learner's position marked.
      const heroY = y
      const heroH = 200
      // Card body
      doc.roundedRect(MARGIN, heroY, contentW, heroH, 12).fill('#f8fafc')
      // Color block on the left (CEFR letter showcase)
      doc.roundedRect(MARGIN, heroY, 160, heroH, 12).fill(overallColor)
      // Re-clip the right side of the color block so only the left half is colored
      doc.save()
      doc.rect(MARGIN + 145, heroY, 20, heroH).fill('#f8fafc')
      doc.restore()

      // Big CEFR letter
      doc.fillColor('#ffffff').fontSize(11).text('YOUR LEVEL', MARGIN, heroY + 24, { width: 160, align: 'center' })
      doc.fontSize(64).text(overallLevel, MARGIN, heroY + 48, { width: 160, align: 'center' })
      doc.fontSize(11).text(LEVEL_NAMES[overallLevel] || '', MARGIN, heroY + 125, { width: 160, align: 'center' })

      // Right side: description + GSE + scale
      const rightX = MARGIN + 184
      const rightW = contentW - 184 - 20
      doc.fillColor('#0f172a').fontSize(13).text(`${LEVEL_NAMES[overallLevel] || ''} — what this means`, rightX, heroY + 22)
      doc.fillColor('#475569').fontSize(9)
        .text(LEVEL_DESCRIPTIONS[overallLevel] || '', rightX, heroY + 42, { width: rightW, lineGap: 1.5 })

      // Two-stat row: GSE + accuracy
      const statY = heroY + 110
      const statW = (rightW - 10) / 2
      // GSE pill
      doc.fillColor('#475569').fontSize(8).text('GSE SCORE', rightX, statY)
      doc.fillColor('#0f172a').fontSize(22).text(`${CEFR_GSE[overallLevel] || 22}`, rightX, statY + 12)
      doc.fillColor('#94a3b8').fontSize(10).text(' / 90', rightX + 30, statY + 22)
      // Accuracy
      if (assessment.score != null) {
        doc.fillColor('#475569').fontSize(8).text('OVERALL ACCURACY', rightX + statW + 10, statY)
        doc.fillColor('#0f172a').fontSize(22).text(`${assessment.score}%`, rightX + statW + 10, statY + 12)
      }

      // GSE scale with marker dot at user's position
      const scaleY = heroY + heroH - 32
      const scaleX = rightX
      const scaleW = rightW
      // Track
      doc.roundedRect(scaleX, scaleY, scaleW, 6, 3).fill('#e2e8f0')
      // Filled portion
      const fillW = ((CEFR_GSE[overallLevel] || 22) / 90) * scaleW
      doc.roundedRect(scaleX, scaleY, fillW, 6, 3).fill(overallColor)
      // Tick marks + labels
      doc.fontSize(7).fillColor('#64748b')
      CEFR_LEVELS.forEach((lv) => {
        const tickX = scaleX + (CEFR_GSE[lv] / 90) * scaleW
        const isUser = lv === overallLevel
        // Tick
        doc.rect(tickX - 0.5, scaleY - 3, 1, 12).fill(isUser ? overallColor : '#cbd5e1')
        // Label
        doc.fillColor(isUser ? overallColor : '#64748b').fontSize(isUser ? 9 : 7)
          .text(lv, tickX - 8, scaleY + 12, { width: 16, align: 'center' })
        if (isUser) {
          // Filled dot marker
          doc.circle(tickX, scaleY + 3, 4).fill(overallColor)
          doc.circle(tickX, scaleY + 3, 2).fill('#ffffff')
        }
      })

      y = heroY + heroH + 24

      // ─── Skill cards (2x2 grid) ───────────────────────────────────────
      doc.fillColor('#0f172a').fontSize(14).text('Skill breakdown', MARGIN, y)
      y += 24

      const sections = (assessment as any).sections as any[]
      const cardGap = 12
      const cardW = (contentW - cardGap) / 2
      const cardH = 100

      sections.forEach((section, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const cx = MARGIN + col * (cardW + cardGap)
        const cy = y + row * (cardH + cardGap)

        const skillColor = SKILL_COLORS[section.skill] || '#6366f1'
        const level = section.cefrLevel || 'A1'
        const lvColor = CEFR_COLORS[level] || '#9ca3af'
        const sGse = CEFR_GSE[level] || 22

        // Card body
        doc.roundedRect(cx, cy, cardW, cardH, 8).fill('#ffffff')
        // Hairline border via stroke (PDFKit: fill then stroke a second time)
        doc.roundedRect(cx, cy, cardW, cardH, 8).lineWidth(0.8).stroke('#e2e8f0')
        // Accent stripe left
        doc.rect(cx, cy, 4, cardH).fill(skillColor)

        // Skill name + CEFR badge in one row
        doc.fillColor('#0f172a').fontSize(12).text(SKILL_LABELS[section.skill] || section.skill, cx + 16, cy + 14)

        // CEFR badge at top-right
        doc.roundedRect(cx + cardW - 60, cy + 12, 48, 22, 6).fill(lvColor)
        doc.fillColor('#ffffff').fontSize(11).text(level, cx + cardW - 60, cy + 18, { width: 48, align: 'center' })

        // GSE row
        doc.fillColor('#64748b').fontSize(8).text('GSE', cx + 16, cy + 40)
        doc.fillColor('#0f172a').fontSize(13).text(`${sGse}`, cx + 36, cy + 36)

        // Score row
        if (section.percentageScore != null) {
          doc.fillColor('#64748b').fontSize(8).text('ACCURACY', cx + 80, cy + 40)
          doc.fillColor('#0f172a').fontSize(13).text(`${section.percentageScore}%`, cx + 130, cy + 36)
        }

        // Questions answered
        const answered = section.questionsAnswered ?? 0
        const total = section.questionsTotal || section.questionsLimit || 0
        if (total > 0) {
          doc.fillColor('#94a3b8').fontSize(8)
            .text(`${answered} / ${total} questions`, cx + cardW - 96, cy + 42, { width: 80, align: 'right' })
        }

        // Progress bar at the bottom of the card
        const barX = cx + 16
        const barY = cy + 72
        const barW = cardW - 32
        doc.roundedRect(barX, barY, barW, 6, 3).fill('#f1f5f9')
        doc.roundedRect(barX, barY, Math.max(4, (sGse / 90) * barW), 6, 3).fill(skillColor)
      })

      const rows = Math.ceil(sections.length / 2)
      y += rows * (cardH + cardGap) + 16

      // ─── CEFR Scale Reference ─────────────────────────────────────────
      doc.fillColor('#0f172a').fontSize(12).text('CEFR scale reference', MARGIN, y)
      y += 20
      const refCellW = contentW / 6
      CEFR_LEVELS.forEach((lv, i) => {
        const x = MARGIN + i * refCellW
        const cellH = 38
        const isUser = lv === overallLevel
        doc.roundedRect(x + 2, y, refCellW - 6, cellH, 6).fill(CEFR_COLORS[lv])
        if (isUser) {
          doc.roundedRect(x + 2, y, refCellW - 6, cellH, 6).lineWidth(2).stroke('#0f172a')
        }
        doc.fillColor('#ffffff').fontSize(10).text(lv, x + 8, y + 6)
        doc.fontSize(7).text(LEVEL_NAMES[lv], x + 8, y + 19, { width: refCellW - 14 })
        doc.fillColor('rgba(255,255,255,0.85)').fontSize(7)
          .text(`GSE ${CEFR_GSE[lv]}`, x + 8, y + 28)
      })

      // ─── Footer ───────────────────────────────────────────────────────
      const footerY = pageH - 36
      doc.moveTo(MARGIN, footerY - 8).lineTo(pageW - MARGIN, footerY - 8).lineWidth(0.5).stroke('#e2e8f0')
      doc.fillColor('#94a3b8').fontSize(8)
        .text('Maka Language Consulting · makalmc.com', MARGIN, footerY, { width: contentW / 2 })
      doc.text('Confidential Assessment Report', MARGIN + contentW / 2, footerY, { width: contentW / 2, align: 'right' })

      // Legacy alias used by the detailed-breakdown block below
      const w = contentW

      // ─── Detailed Answer Breakdown (optional) ───
      if (detailed) {
        const questionIds: string[] = []
        for (const section of (assessment as any).sections) {
          const answers = (section.answers || []) as Array<{ questionId: string; answer: string; isCorrect: boolean; cefrLevel: string; points: number }>
          for (const a of answers) {
            if (a.questionId) questionIds.push(a.questionId)
          }
        }

        // Fetch all questions in one query
        const questions = questionIds.length > 0
          ? await prisma.assessmentQuestion.findMany({
              where: { id: { in: questionIds } },
              select: { id: true, questionText: true, correctAnswer: true, cefrLevel: true, questionType: true, options: true, passage: true }
            })
          : []
        const questionMap = new Map(questions.map(q => [q.id, q]))

        for (const section of (assessment as any).sections) {
          const answers = (section.answers || []) as Array<{ questionId: string; answer: string; isCorrect: boolean; cefrLevel: string; points: number }>
          if (answers.length === 0) continue

          const skillLabel = SKILL_LABELS[section.skill] || section.skill
          const skillColor = SKILL_COLORS[section.skill] || '#6b7280'

          // New page for each section
          doc.addPage()

          // Section header
          doc.rect(0, 0, pageW, 50).fill('#1e293b')
          doc.fillColor('#ffffff').fontSize(14).text(`${skillLabel} — Detailed Answer Report`, 50, 16)
          doc.fillColor('#94a3b8').fontSize(9)
            .text(`${assessment.student.user.name} | ${assessment.language} | ${section.cefrLevel || 'Pending'}`, 50, 34)

          let dy = 70
          const correct = answers.filter(a => a.isCorrect).length
          const total = answers.length

          // Summary bar
          doc.roundedRect(50, dy, w, 28, 4).fill('#f1f5f9')
          doc.fillColor('#22c55e').fontSize(10).text(`${correct} correct`, 60, dy + 8)
          doc.fillColor('#ef4444').text(`${total - correct} incorrect`, 160, dy + 8)
          doc.fillColor('#6b7280').text(`${total} total`, 280, dy + 8)
          if (section.cefrLevel) {
            const lvColor = CEFR_COLORS[section.cefrLevel] || '#6b7280'
            doc.roundedRect(w - 10, dy + 4, 50, 20, 3).fill(lvColor)
            doc.fillColor('#ffffff').fontSize(9).text(section.cefrLevel, w - 10, dy + 9, { width: 50, align: 'center' })
          }
          dy += 40

          // Each answer
          for (let i = 0; i < answers.length; i++) {
            const a = answers[i]
            const q = questionMap.get(a.questionId)

            // Check if we need a new page
            if (dy > doc.page.height - 100) {
              doc.addPage()
              dy = 50
            }

            const bgColor = a.isCorrect ? '#f0fdf4' : '#fef2f2'
            const borderColor = a.isCorrect ? '#bbf7d0' : '#fecaca'
            const iconColor = a.isCorrect ? '#22c55e' : '#ef4444'

            // Question box
            const boxH = q?.passage ? 80 : 56
            doc.roundedRect(50, dy, w, boxH, 4).fill(bgColor)
            doc.roundedRect(50, dy, 3, boxH, 0).fill(borderColor)

            // Q number + level
            doc.fillColor(iconColor).fontSize(9).text(a.isCorrect ? '\u2713' : '\u2717', 60, dy + 6)
            doc.fillColor('#111827').fontSize(9).text(`Q${i + 1}`, 75, dy + 6)
            doc.fillColor('#6b7280').fontSize(8).text(a.cefrLevel, 100, dy + 6)

            // Question text (truncated)
            if (q) {
              const qText = (q.questionText || '').substring(0, 120) + ((q.questionText || '').length > 120 ? '...' : '')
              doc.fillColor('#374151').fontSize(8).text(qText, 60, dy + 20, { width: w - 30 })
            }

            // Student answer vs correct
            const answerY = q?.passage ? dy + 48 : dy + 36
            doc.fillColor('#6b7280').fontSize(7).text('Student:', 60, answerY)
            doc.fillColor(a.isCorrect ? '#166534' : '#991b1b').fontSize(8)
              .text(String(a.answer).substring(0, 80), 110, answerY)

            if (!a.isCorrect && q) {
              doc.fillColor('#6b7280').fontSize(7).text('Correct:', 60, answerY + 12)
              doc.fillColor('#166534').fontSize(8)
                .text(q.correctAnswer.substring(0, 80), 110, answerY + 12)
            }

            dy += boxH + 6
          }

          // Writing responses
          if (section.skill === 'WRITING' && (assessment as any).writingResponses) {
            const writingForSection = (assessment as any).writingResponses.filter((wr: any) => wr.sectionId === section.id)
            for (const wr of writingForSection) {
              if (dy > doc.page.height - 150) { doc.addPage(); dy = 50 }

              doc.fillColor('#111827').fontSize(10).text('Writing Response:', 50, dy)
              dy += 16
              doc.fillColor('#374151').fontSize(8)
                .text((wr.responseText || '').substring(0, 500), 50, dy, { width: w })
              dy += doc.heightOfString((wr.responseText || '').substring(0, 500), { width: w }) + 10

              if (wr.aiEvaluation) {
                const ai = wr.aiEvaluation as any
                doc.fillColor('#6366f1').fontSize(8).text(`AI Score: ${ai.overall || 'N/A'}/100 — ${ai.cefrLevel || ''}`, 50, dy)
                dy += 14
                if (ai.feedback) {
                  doc.fillColor('#6b7280').fontSize(7).text(`Feedback: ${String(ai.feedback).substring(0, 300)}`, 50, dy, { width: w })
                  dy += doc.heightOfString(String(ai.feedback).substring(0, 300), { width: w }) + 8
                }
              }
            }
          }

          // Speaking responses
          if (section.skill === 'SPEAKING' && (assessment as any).speakingResponses) {
            const speakingForSection = (assessment as any).speakingResponses.filter((sr: any) => sr.sectionId === section.id)
            for (const sr of speakingForSection) {
              if (dy > doc.page.height - 100) { doc.addPage(); dy = 50 }

              doc.fillColor('#111827').fontSize(10).text('Speaking Response:', 50, dy)
              dy += 14
              doc.fillColor('#6b7280').fontSize(8).text(`Duration: ${sr.duration || 0}s`, 50, dy)
              dy += 14

              if (sr.aiEvaluation) {
                const ai = sr.aiEvaluation as any
                doc.fillColor('#a855f7').fontSize(8).text(`AI Score: ${ai.overall || 'N/A'}/100 — ${ai.cefrLevel || ''}`, 50, dy)
                dy += 14
                if (ai.feedback) {
                  doc.fillColor('#6b7280').fontSize(7).text(`Feedback: ${String(ai.feedback).substring(0, 300)}`, 50, dy, { width: w })
                  dy += doc.heightOfString(String(ai.feedback).substring(0, 300), { width: w }) + 8
                }
              }
            }
          }

          // Section footer
          if (dy < doc.page.height - 60) {
            doc.moveTo(50, doc.page.height - 50).lineTo(50 + w, doc.page.height - 50).lineWidth(0.5).stroke('#e5e7eb')
            doc.fillColor('#9ca3af').fontSize(7)
              .text('Maka Language Consulting — Confidential', 50, doc.page.height - 42)
          }
        }
      }

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
