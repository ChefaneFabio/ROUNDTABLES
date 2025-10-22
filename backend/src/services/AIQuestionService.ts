import { PrismaClient, LanguageLevel, QuestionSource } from '@prisma/client'
import Anthropic from '@anthropic-ai/sdk'
import { addHours } from 'date-fns'

const prisma = new PrismaClient()

interface QuestionSuggestion {
  question: string
  rationale: string
  source: QuestionSource
}

interface GenerateQuestionsOptions {
  count?: number
  useCache?: boolean
}

/**
 * AI Question Service
 *
 * Generates context-aware question suggestions using Claude AI
 * Features:
 * - 24-hour caching to reduce API costs
 * - Rate limiting per trainer
 * - Session context awareness (topic, participant levels, session sequence)
 * - Quality analysis and improvement suggestions
 */
export class AIQuestionService {
  private anthropic: Anthropic | null = null

  constructor() {
    // Initialize Anthropic client if API key is available
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
      })
    }
  }

  /**
   * Generate AI-powered question suggestions for a session
   */
  async generateQuestionSuggestions(
    sessionId: string,
    options: GenerateQuestionsOptions = {}
  ): Promise<QuestionSuggestion[]> {
    const { count = 3, useCache = true } = options

    if (!this.anthropic) {
      throw new Error('AI service not configured. Please set ANTHROPIC_API_KEY environment variable.')
    }

    // Fetch session with context
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        topic: true,
        roundtable: {
          include: {
            participants: { where: { status: 'ACTIVE' } },
            sessions: {
              include: { topic: true },
              orderBy: { sessionNumber: 'asc' }
            }
          }
        },
        trainer: true
      }
    })

    if (!session) {
      throw new Error('Session not found')
    }

    // Check cache first
    if (useCache) {
      const cached = await this.getCachedSuggestions(sessionId)
      if (cached.length > 0) {
        return cached.slice(0, count)
      }
    }

    // Build context for AI
    const context = this.buildSessionContext(session)

    // Generate suggestions using Claude
    const suggestions = await this.callClaudeAPI(context, count)

    // Cache the suggestions
    await this.cacheSuggestions(sessionId, session.topic?.id, suggestions, context.prompt)

    return suggestions
  }

  /**
   * Build rich context for AI prompt
   */
  private buildSessionContext(session: any) {
    const participantLevels = session.roundtable.participants
      .map((p: any) => p.languageLevel)
      .filter((level: string, index: number, self: string[]) => self.indexOf(level) === index)
      .join(', ')

    const currentSession = session.sessionNumber
    const totalSessions = 10

    // Get previous and next session topics
    const previousSession = session.roundtable.sessions.find(
      (s: any) => s.sessionNumber === currentSession - 1
    )
    const nextSession = session.roundtable.sessions.find(
      (s: any) => s.sessionNumber === currentSession + 1
    )

    // Build the AI prompt
    const prompt = `You are an expert facilitator for professional development roundtable discussions.

Generate ${3} thought-provoking questions for a training session with these details:

**Session Context:**
- Topic: "${session.topic?.title}"
- Description: ${session.topic?.description || 'No description provided'}
- Session: ${currentSession}/${totalSessions} in the roundtable series
- Roundtable: ${session.roundtable.name}
- Participant language levels: ${participantLevels}

**Session Flow Context:**
${previousSession ? `- Previous session (${currentSession - 1}): "${previousSession.topic?.title}"` : '- This is the first content session'}
${nextSession ? `- Next session (${currentSession + 1}): "${nextSession.topic?.title}"` : '- This is the final session'}

**Question Requirements:**
1. Be open-ended and encourage discussion among participants
2. Be appropriate for ${participantLevels} English proficiency learners
3. ${previousSession ? `Build on concepts from "${previousSession.topic?.title}" when relevant` : 'Set a foundation for future sessions'}
4. ${nextSession ? `Prepare participants for upcoming topic "${nextSession.topic?.title}"` : 'Consolidate learnings from the entire series'}
5. Be practical and applicable to workplace scenarios
6. Encourage participants to share personal experiences

**Format:**
Return ONLY a valid JSON array with exactly ${3} questions. Each object must have:
- "question": The actual question text
- "rationale": A brief explanation (1-2 sentences) of why this question is effective

Example format:
[
  {
    "question": "What challenges have you faced when communicating complex ideas to team members with different levels of expertise?",
    "rationale": "This question encourages reflection on real workplace scenarios and allows participants to share concrete examples."
  }
]`

    return {
      prompt,
      topicTitle: session.topic?.title || 'General Discussion',
      topicDescription: session.topic?.description || '',
      sessionNumber: currentSession,
      participantLevels,
      previousTopicTitle: previousSession?.topic?.title,
      nextTopicTitle: nextSession?.topic?.title
    }
  }

  /**
   * Call Claude API to generate suggestions
   */
  private async callClaudeAPI(
    context: any,
    count: number
  ): Promise<QuestionSuggestion[]> {
    if (!this.anthropic) {
      throw new Error('Anthropic client not initialized')
    }

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: context.prompt
          }
        ]
      })

      // Extract the text content
      const contentBlock = response.content[0]
      if (contentBlock.type !== 'text') {
        throw new Error('Unexpected response type from Claude')
      }

      const responseText = contentBlock.text

      // Parse JSON from response (handle potential markdown code blocks)
      let jsonText = responseText.trim()
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '')
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '')
      }

      const suggestions = JSON.parse(jsonText)

      // Validate and transform response
      if (!Array.isArray(suggestions) || suggestions.length === 0) {
        throw new Error('Invalid response format from AI')
      }

      return suggestions.slice(0, count).map(s => ({
        question: s.question,
        rationale: s.rationale || 'AI-generated suggestion',
        source: 'AI_GENERATED' as QuestionSource
      }))
    } catch (error: any) {
      console.error('Error calling Claude API:', error)

      // Provide fallback questions if AI fails
      return this.getFallbackQuestions(context.topicTitle, count)
    }
  }

  /**
   * Get fallback questions if AI service fails
   */
  private getFallbackQuestions(topicTitle: string, count: number): QuestionSuggestion[] {
    const fallbacks = [
      {
        question: `What are your initial thoughts or experiences related to ${topicTitle}?`,
        rationale: 'Opens the discussion with personal reflection'
      },
      {
        question: `What challenges have you encountered in your work that relate to ${topicTitle}?`,
        rationale: 'Connects topic to real workplace scenarios'
      },
      {
        question: `How do you think ${topicTitle} skills can impact team effectiveness?`,
        rationale: 'Explores broader implications and applications'
      },
      {
        question: `Can you share an example of when ${topicTitle} made a difference in a project outcome?`,
        rationale: 'Encourages concrete examples and storytelling'
      },
      {
        question: `What strategies have you found most effective when practicing ${topicTitle}?`,
        rationale: 'Facilitates peer learning through strategy sharing'
      }
    ]

    return fallbacks.slice(0, count).map(f => ({
      ...f,
      source: 'TEMPLATE' as QuestionSource
    }))
  }

  /**
   * Cache AI suggestions for 24 hours
   */
  private async cacheSuggestions(
    sessionId: string,
    topicId: string | undefined,
    suggestions: QuestionSuggestion[],
    prompt: string
  ): Promise<void> {
    const expiresAt = addHours(new Date(), 24)

    await Promise.all(
      suggestions.map(s =>
        prisma.aIQuestionSuggestion.create({
          data: {
            question: s.question,
            rationale: s.rationale,
            prompt,
            sessionId,
            topicId,
            expiresAt,
            usedByTrainer: false
          }
        })
      )
    )
  }

  /**
   * Get cached suggestions if available
   */
  private async getCachedSuggestions(sessionId: string): Promise<QuestionSuggestion[]> {
    const cached = await prisma.aIQuestionSuggestion.findMany({
      where: {
        sessionId,
        expiresAt: { gte: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    })

    return cached.map(c => ({
      question: c.question,
      rationale: c.rationale || 'AI-generated suggestion',
      source: 'AI_GENERATED' as QuestionSource
    }))
  }

  /**
   * Mark a suggestion as used by trainer
   */
  async markSuggestionAsUsed(suggestionId: string): Promise<void> {
    await prisma.aIQuestionSuggestion.update({
      where: { id: suggestionId },
      data: { usedByTrainer: true }
    })
  }

  /**
   * Check if trainer has reached their daily AI request limit
   */
  async checkTrainerRateLimit(trainerEmail: string): Promise<{
    allowed: boolean
    remainingRequests: number
    dailyLimit: number
  }> {
    // Get trainer's sessions from today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const trainer = await prisma.trainer.findUnique({
      where: { email: trainerEmail },
      include: {
        sessions: {
          where: {
            createdAt: { gte: today }
          }
        }
      }
    })

    if (!trainer) {
      throw new Error('Trainer not found')
    }

    // Count AI suggestion requests made today
    const requestsToday = await prisma.aIQuestionSuggestion.count({
      where: {
        createdAt: { gte: today },
        sessionId: { in: trainer.sessions.map(s => s.id) }
      }
    })

    // Default limit: 5 requests per trainer per day (can be overridden per client)
    const dailyLimit = Number(process.env.AI_REQUESTS_PER_TRAINER_PER_DAY) || 5

    return {
      allowed: requestsToday < dailyLimit,
      remainingRequests: Math.max(0, dailyLimit - requestsToday),
      dailyLimit
    }
  }

  /**
   * Analyze question quality and provide improvement suggestions
   */
  async analyzeQuestionQuality(question: string, topicTitle: string): Promise<{
    score: number
    strengths: string[]
    improvements: string[]
  }> {
    // Simple heuristic-based analysis (can be enhanced with AI)
    const score = this.calculateQuestionScore(question)
    const strengths: string[] = []
    const improvements: string[] = []

    // Check if question is open-ended
    if (question.toLowerCase().startsWith('what') ||
        question.toLowerCase().startsWith('how') ||
        question.toLowerCase().startsWith('why')) {
      strengths.push('Open-ended question that encourages discussion')
    } else {
      improvements.push('Consider rephrasing as an open-ended question (What/How/Why)')
    }

    // Check length
    if (question.length < 30) {
      improvements.push('Question might be too brief - add more context')
    } else if (question.length > 200) {
      improvements.push('Question is quite long - consider breaking into simpler parts')
    } else {
      strengths.push('Good length - clear and concise')
    }

    // Check for topic relevance (simple keyword matching)
    const topicKeywords = topicTitle.toLowerCase().split(' ')
    const questionLower = question.toLowerCase()
    const hasTopicKeyword = topicKeywords.some(keyword =>
      keyword.length > 3 && questionLower.includes(keyword)
    )

    if (hasTopicKeyword) {
      strengths.push('Clearly relates to the session topic')
    } else {
      improvements.push('Consider explicitly mentioning the topic to clarify relevance')
    }

    // Check for experiential element
    if (questionLower.includes('experience') ||
        questionLower.includes('example') ||
        questionLower.includes('encountered') ||
        questionLower.includes('faced')) {
      strengths.push('Encourages participants to share personal experiences')
    }

    return { score, strengths, improvements }
  }

  /**
   * Calculate a quality score for a question (0-100)
   */
  private calculateQuestionScore(question: string): number {
    let score = 50 // Base score

    // Open-ended (+20)
    if (question.toLowerCase().match(/^(what|how|why|when|describe|explain)/)) {
      score += 20
    }

    // Good length (+10)
    if (question.length >= 30 && question.length <= 150) {
      score += 10
    }

    // Contains experiential keywords (+15)
    if (question.toLowerCase().match(/(experience|example|encountered|faced|challenge)/)) {
      score += 15
    }

    // Ends with question mark (+5)
    if (question.trim().endsWith('?')) {
      score += 5
    }

    return Math.min(100, Math.max(0, score))
  }

  /**
   * Clean up expired AI suggestions (called by cron job)
   */
  async cleanupExpiredSuggestions(): Promise<number> {
    const result = await prisma.aIQuestionSuggestion.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    })

    return result.count
  }
}
