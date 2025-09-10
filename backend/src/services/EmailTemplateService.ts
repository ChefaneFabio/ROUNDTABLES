import fs from 'fs/promises'
import path from 'path'

export interface TemplateData {
  [key: string]: any
}

export class EmailTemplateService {
  private templatesPath: string

  constructor() {
    this.templatesPath = path.join(process.cwd(), '../../templates/email')
  }

  async renderTemplate(templateName: string, data: TemplateData): Promise<{ subject: string; html: string }> {
    try {
      const templatePath = path.join(this.templatesPath, `${templateName}.html`)
      let template = await fs.readFile(templatePath, 'utf-8')

      // Simple mustache-like template rendering
      template = this.processTemplate(template, data)

      // Extract subject from template or use default
      const subject = this.extractSubject(templateName, data)

      return { subject, html: template }
    } catch (error) {
      console.error(`Error rendering template ${templateName}:`, error)
      throw new Error(`Failed to render email template: ${templateName}`)
    }
  }

  private processTemplate(template: string, data: TemplateData): string {
    // Replace simple variables: {{variableName}}
    template = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match
    })

    // Handle conditional sections: {{#condition}} content {{/condition}}
    template = template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
      return data[key] ? this.processTemplate(content, data) : ''
    })

    // Handle inverse sections: {{^condition}} content {{/condition}}
    template = template.replace(/\{\{\^(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
      return !data[key] ? this.processTemplate(content, data) : ''
    })

    // Handle arrays/loops: {{#items}} content {{/items}}
    template = template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
      const items = data[key]
      if (Array.isArray(items)) {
        return items.map(item => this.processTemplate(content, { ...data, ...item })).join('')
      }
      return data[key] ? this.processTemplate(content, data) : ''
    })

    return template
  }

  private extractSubject(templateName: string, data: TemplateData): string {
    const subjects: Record<string, string> = {
      trainer_reminder: `Roundtable Session Reminder - ${data.sessionDate}`,
      pre_session: `${data.clientCompany} | ROUNDTABLE ${data.sessionDate} - ${data.topicTitle}`,
      feedback: `Your Roundtable Session Feedback - ${data.topicTitle}`,
      voting_invite: `Topic Voting for ${data.roundtableName}`,
      session_reminder: `Session Reminder - ${data.topicTitle || 'Roundtable Discussion'}`,
      questions_request: `Questions Required - Session ${data.sessionNumber}`,
      feedback_request: `Feedback Required - Session ${data.sessionNumber}`
    }

    return subjects[templateName] || 'Maka Roundtable Notification'
  }

  // Pre-defined template data generators
  static generateTrainerReminderData(session: any): TemplateData {
    return {
      trainerName: session.trainer.name,
      sessionDate: new Date(session.scheduledAt).toLocaleDateString(),
      sessionTime: new Date(session.scheduledAt).toLocaleTimeString(),
      clientName: session.roundtable.client.name,
      clientCompany: session.roundtable.client.company,
      roundtableName: session.roundtable.name,
      sessionNumber: session.sessionNumber,
      topicTitle: session.topic?.title,
      topicDescription: session.topic?.description,
      participantCount: session.roundtable.participants?.length || 0,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString() // 5 days from now
    }
  }

  static generatePreSessionData(session: any, questions: any[]): TemplateData {
    return {
      clientCompany: session.roundtable.client.company,
      sessionDate: new Date(session.scheduledAt).toLocaleDateString(),
      sessionTime: new Date(session.scheduledAt).toLocaleTimeString(),
      topicTitle: session.topic.title,
      topicIntro: this.getTopicIntro(session.topic.title),
      questions: questions.map((q, index) => ({
        questionNumber: index + 1,
        questionText: q.question
      })),
      meetingLink: session.meetingLink
    }
  }

  static generateFeedbackData(session: any, participant: any, feedback: string): TemplateData {
    return {
      participantName: participant.name,
      trainerName: session.trainer.name,
      topicTitle: session.topic?.title || `Session ${session.sessionNumber}`,
      feedbackContent: feedback,
      nextSession: session.nextSession ? {
        nextSessionDate: new Date(session.nextSession.scheduledAt).toLocaleDateString(),
        nextSessionTopic: session.nextSession.topic?.title
      } : null
    }
  }

  static generateVotingInviteData(roundtable: any, participant: any): TemplateData {
    return {
      participantName: participant.name,
      roundtableName: roundtable.name,
      clientCompany: roundtable.client.company,
      votingUrl: `${process.env.FRONTEND_URL}/vote/${roundtable.id}?email=${encodeURIComponent(participant.email)}`,
      votingDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() // 7 days from now
    }
  }

  private static getTopicIntro(topicTitle: string): string {
    const intros: Record<string, string> = {
      'The Art of Negotiation': 'According to a 2021 survey by McKinsey & Company, 80% of executives believe that effective negotiation skills are critical for driving business success, demonstrating the strategic value of mastering negotiation techniques in today\'s competitive landscape. In fact, the ability to navigate complex negotiations—whether in business, policy, or interpersonal relationships—has become a defining factor in leadership effectiveness.',
      'Leadership in the Digital Age': 'The digital transformation has fundamentally changed how leaders must operate, with 90% of companies now operating in digitally-enabled business models that require new leadership approaches.',
      'Effective Communication': 'Research shows that organizations with effective communication are 5 times more likely to be high-performing, making communication skills essential for professional success.',
      // Add more topic intros as needed
    }

    return intros[topicTitle] || `As we explore ${topicTitle}, we'll examine both theoretical frameworks and practical applications that can enhance your professional development.`
  }

  // Batch template rendering for multiple recipients
  async renderTemplateForMultipleRecipients(
    templateName: string,
    recipients: Array<{ email: string; data: TemplateData }>
  ): Promise<Array<{ email: string; subject: string; html: string }>> {
    const results = []

    for (const recipient of recipients) {
      try {
        const rendered = await this.renderTemplate(templateName, recipient.data)
        results.push({
          email: recipient.email,
          subject: rendered.subject,
          html: rendered.html
        })
      } catch (error) {
        console.error(`Failed to render template for ${recipient.email}:`, error)
      }
    }

    return results
  }

  // Template validation
  async validateTemplate(templateName: string): Promise<boolean> {
    try {
      const templatePath = path.join(this.templatesPath, `${templateName}.html`)
      await fs.access(templatePath, fs.constants.F_OK)
      return true
    } catch {
      return false
    }
  }

  // Get available templates
  async getAvailableTemplates(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.templatesPath)
      return files
        .filter(file => file.endsWith('.html'))
        .map(file => file.replace('.html', ''))
    } catch (error) {
      console.error('Error reading templates directory:', error)
      return []
    }
  }
}