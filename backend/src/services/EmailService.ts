import nodemailer from 'nodemailer'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType?: string
  }>
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null

  private getTransporter(): nodemailer.Transporter {
    if (!this.transporter) {
      const host = process.env.SMTP_HOST || 'smtp.gmail.com'
      const port = parseInt(process.env.SMTP_PORT || '587', 10)
      const user = process.env.SMTP_USER
      const pass = process.env.SMTP_PASSWORD

      if (!user || !pass || user === 'your-email@gmail.com') {
        throw new Error('SMTP credentials not configured. Set SMTP_USER and SMTP_PASSWORD in .env')
      }

      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      })
    }
    return this.transporter
  }

  async sendEmail(options: SendEmailOptions): Promise<{ messageId: string }> {
    const transporter = this.getTransporter()
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER || 'noreply@makalanguage.com'

    const info = await transporter.sendMail({
      from: `"Maka Learning Management Centre" <${from}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments
    })

    return { messageId: info.messageId }
  }

  async sendAssessmentResults(params: {
    to: string
    studentName: string
    language: string
    cefrLevel: string
    cefrName: string
    score: number
    totalQuestions: number
    correctAnswers: number
    levelBreakdown: Record<string, { correct: number; total: number; name: string }>
    pdfBuffer?: Buffer
  }): Promise<{ messageId: string }> {
    const { to, studentName, language, cefrLevel, cefrName, score, totalQuestions, correctAnswers, levelBreakdown, pdfBuffer } = params

    const breakdownRows = Object.entries(levelBreakdown)
      .map(([level, data]) => {
        const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
        const color = pct >= 60 ? '#22c55e' : '#ef4444'
        return `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600">${level}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${data.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${data.correct}/${data.total}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:${color};font-weight:600">${pct}%</td>
        </tr>`
      })
      .join('')

    const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:#4f46e5;color:#fff;padding:32px;text-align:center;border-radius:8px 8px 0 0">
        <h1 style="margin:0;font-size:28px">Maka Learning Management Centre</h1>
        <p style="margin:8px 0 0;opacity:0.9">Placement Test Results</p>
      </div>

      <div style="padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <p style="font-size:16px;color:#374151">Dear <strong>${studentName}</strong>,</p>
        <p style="font-size:16px;color:#374151">
          Congratulations on completing your <strong>${language}</strong> placement test! Here are your results:
        </p>

        <div style="background:#f3f4f6;border-radius:12px;padding:24px;text-align:center;margin:24px 0">
          <p style="margin:0;color:#6b7280;font-size:14px">Your CEFR Level</p>
          <p style="margin:8px 0 4px;font-size:48px;font-weight:700;color:#4f46e5">${cefrLevel}</p>
          <p style="margin:0;font-size:18px;font-weight:600;color:#374151">${cefrName}</p>
        </div>

        <div style="display:flex;gap:16px;margin:24px 0">
          <div style="flex:1;background:#f3f4f6;border-radius:8px;padding:16px;text-align:center">
            <p style="margin:0;font-size:32px;font-weight:700;color:#111827">${score}%</p>
            <p style="margin:4px 0 0;color:#6b7280;font-size:14px">Score</p>
          </div>
          <div style="flex:1;background:#f3f4f6;border-radius:8px;padding:16px;text-align:center">
            <p style="margin:0;font-size:32px;font-weight:700;color:#111827">${correctAnswers}/${totalQuestions}</p>
            <p style="margin:4px 0 0;color:#6b7280;font-size:14px">Correct</p>
          </div>
        </div>

        <h2 style="font-size:18px;color:#111827;margin:32px 0 16px">Performance by Level</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead>
            <tr style="background:#f9fafb">
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb">Level</th>
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb">Name</th>
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb">Score</th>
              <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb">%</th>
            </tr>
          </thead>
          <tbody>${breakdownRows}</tbody>
        </table>

        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px">
          <p>This email was sent by Maka Learning Management Centre. ${pdfBuffer ? 'Your detailed results are attached as a PDF.' : ''}</p>
        </div>
      </div>
    </div>`

    const attachments = pdfBuffer
      ? [{ filename: `${language}-placement-results.pdf`, content: pdfBuffer, contentType: 'application/pdf' }]
      : undefined

    return this.sendEmail({
      to,
      subject: `Your ${language} Placement Test Results — CEFR ${cefrLevel} (${cefrName})`,
      html,
      attachments
    })
  }

  async sendMultiSkillResults(params: {
    to: string
    studentName: string
    language: string
    overallLevel: string
    overallLevelName: string
    overallScore: number
    skills: Array<{
      skill: string
      cefrLevel: string
      score: number | null
      teacherReviewed: boolean
    }>
    pdfBuffer?: Buffer
  }): Promise<{ messageId: string }> {
    const { to, studentName, language, overallLevel, overallLevelName, overallScore, skills, pdfBuffer } = params

    const SKILL_COLORS: Record<string, string> = {
      READING: '#3b82f6', LISTENING: '#22c55e', WRITING: '#f59e0b', SPEAKING: '#a855f7'
    }
    const SKILL_LABELS: Record<string, string> = {
      READING: 'Reading', LISTENING: 'Listening', WRITING: 'Writing', SPEAKING: 'Speaking'
    }

    const skillCards = skills.map(s => {
      const color = SKILL_COLORS[s.skill] || '#6b7280'
      const label = SKILL_LABELS[s.skill] || s.skill
      return `<div style="flex:1;min-width:120px;background:#f9fafb;border-radius:8px;padding:16px;text-align:center;border-left:4px solid ${color}">
        <p style="margin:0;font-size:13px;color:#6b7280;font-weight:600">${label}</p>
        <p style="margin:8px 0 4px;font-size:28px;font-weight:700;color:${color}">${s.cefrLevel || '...'}</p>
        ${s.score != null ? `<p style="margin:0;font-size:13px;color:#6b7280">${s.score}%</p>` : ''}
        ${s.teacherReviewed ? '<p style="margin:4px 0 0;font-size:11px;color:#22c55e">✓ Teacher Reviewed</p>' : ''}
      </div>`
    }).join('')

    const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:#4f46e5;color:#fff;padding:32px;text-align:center;border-radius:8px 8px 0 0">
        <h1 style="margin:0;font-size:28px">Maka Learning Management Centre</h1>
        <p style="margin:8px 0 0;opacity:0.9">4-Skills Placement Test Results</p>
      </div>

      <div style="padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <p style="font-size:16px;color:#374151">Dear <strong>${studentName}</strong>,</p>
        <p style="font-size:16px;color:#374151">
          Congratulations on completing your <strong>${language}</strong> 4-Skills placement test! Here are your results:
        </p>

        <div style="background:#f3f4f6;border-radius:12px;padding:24px;text-align:center;margin:24px 0">
          <p style="margin:0;color:#6b7280;font-size:14px">Your Overall CEFR Level</p>
          <p style="margin:8px 0 4px;font-size:48px;font-weight:700;color:#4f46e5">${overallLevel}</p>
          <p style="margin:0;font-size:18px;font-weight:600;color:#374151">${overallLevelName}</p>
          <p style="margin:8px 0 0;font-size:14px;color:#6b7280">Average Score: ${overallScore}%</p>
        </div>

        <h2 style="font-size:18px;color:#111827;margin:32px 0 16px">Skill Breakdown</h2>
        <div style="display:flex;gap:12px;flex-wrap:wrap">${skillCards}</div>

        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px">
          <p>This email was sent by Maka Learning Management Centre. ${pdfBuffer ? 'Your detailed results are attached as a PDF.' : ''}</p>
        </div>
      </div>
    </div>`

    const attachments = pdfBuffer
      ? [{ filename: `${language}-4skills-results.pdf`, content: pdfBuffer, contentType: 'application/pdf' }]
      : undefined

    return this.sendEmail({
      to,
      subject: `Your ${language} 4-Skills Test Results — CEFR ${overallLevel} (${overallLevelName})`,
      html,
      attachments
    })
  }

  isConfigured(): boolean {
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASSWORD
    return !!(user && pass && user !== 'your-email@gmail.com')
  }
}

export const emailService = new EmailService()
