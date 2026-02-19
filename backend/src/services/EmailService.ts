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
      from: `"MAKA Language Centre" <${from}>`,
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
        <h1 style="margin:0;font-size:28px">MAKA Language Centre</h1>
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
          <p>This email was sent by MAKA Language Centre. ${pdfBuffer ? 'Your detailed results are attached as a PDF.' : ''}</p>
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

  isConfigured(): boolean {
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASSWORD
    return !!(user && pass && user !== 'your-email@gmail.com')
  }
}

export const emailService = new EmailService()
