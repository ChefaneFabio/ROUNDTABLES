import { prisma } from '../config/database'

interface AnalyzePronunciationInput {
  studentId: string
  targetText: string
  recognizedText: string
  language: string
  cefrLevel?: string
  chatSessionId?: string
  duration?: number
  audioUrl?: string
}

interface SpeakingPrompt {
  id: string
  text: string
  category: string
  difficulty: string
  language: string
  cefrLevel: string
}

// Pronunciation analysis helpers
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim()
}

const calculateLevenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

const calculateWordAccuracy = (targetWords: string[], recognizedWords: string[]): {
  wordFeedback: Array<{ word: string; status: 'correct' | 'incorrect' | 'missing' | 'extra'; recognized?: string }>
  correctCount: number
} => {
  const wordFeedback: Array<{ word: string; status: 'correct' | 'incorrect' | 'missing' | 'extra'; recognized?: string }> = []
  let correctCount = 0

  // Simple word-by-word comparison
  const maxLen = Math.max(targetWords.length, recognizedWords.length)

  for (let i = 0; i < maxLen; i++) {
    const target = targetWords[i]
    const recognized = recognizedWords[i]

    if (!target && recognized) {
      wordFeedback.push({ word: recognized, status: 'extra' })
    } else if (target && !recognized) {
      wordFeedback.push({ word: target, status: 'missing' })
    } else if (target === recognized) {
      wordFeedback.push({ word: target, status: 'correct' })
      correctCount++
    } else {
      // Check if it's a close match (could be pronunciation issue)
      const distance = calculateLevenshteinDistance(target, recognized)
      if (distance <= Math.ceil(target.length * 0.3)) {
        // Close enough - likely pronunciation issue
        wordFeedback.push({ word: target, status: 'incorrect', recognized })
      } else {
        wordFeedback.push({ word: target, status: 'incorrect', recognized })
      }
    }
  }

  return { wordFeedback, correctCount }
}

// Speaking prompts by CEFR level
const SPEAKING_PROMPTS: Record<string, SpeakingPrompt[]> = {
  A1: [
    { id: 'a1-1', text: 'Hello, my name is...', category: 'greetings', difficulty: 'easy', language: 'English', cefrLevel: 'A1' },
    { id: 'a1-2', text: 'I am from...', category: 'introduction', difficulty: 'easy', language: 'English', cefrLevel: 'A1' },
    { id: 'a1-3', text: 'I like coffee and tea.', category: 'preferences', difficulty: 'easy', language: 'English', cefrLevel: 'A1' },
    { id: 'a1-4', text: 'The weather is nice today.', category: 'small-talk', difficulty: 'easy', language: 'English', cefrLevel: 'A1' },
    { id: 'a1-5', text: 'I have two brothers and one sister.', category: 'family', difficulty: 'easy', language: 'English', cefrLevel: 'A1' },
  ],
  A2: [
    { id: 'a2-1', text: 'I usually wake up at seven o\'clock in the morning.', category: 'routine', difficulty: 'easy', language: 'English', cefrLevel: 'A2' },
    { id: 'a2-2', text: 'Last weekend, I visited my grandparents.', category: 'past-events', difficulty: 'medium', language: 'English', cefrLevel: 'A2' },
    { id: 'a2-3', text: 'I would like to order a pizza, please.', category: 'restaurant', difficulty: 'easy', language: 'English', cefrLevel: 'A2' },
    { id: 'a2-4', text: 'Can you tell me how to get to the train station?', category: 'directions', difficulty: 'medium', language: 'English', cefrLevel: 'A2' },
    { id: 'a2-5', text: 'I enjoy reading books and watching movies.', category: 'hobbies', difficulty: 'easy', language: 'English', cefrLevel: 'A2' },
  ],
  B1: [
    { id: 'b1-1', text: 'I think learning a new language is challenging but rewarding.', category: 'opinions', difficulty: 'medium', language: 'English', cefrLevel: 'B1' },
    { id: 'b1-2', text: 'If I had more free time, I would travel more often.', category: 'conditionals', difficulty: 'medium', language: 'English', cefrLevel: 'B1' },
    { id: 'b1-3', text: 'The movie was interesting, although it was a bit too long.', category: 'reviews', difficulty: 'medium', language: 'English', cefrLevel: 'B1' },
    { id: 'b1-4', text: 'I have been working in this company for three years now.', category: 'work', difficulty: 'medium', language: 'English', cefrLevel: 'B1' },
    { id: 'b1-5', text: 'Could you explain how this machine works, please?', category: 'requests', difficulty: 'medium', language: 'English', cefrLevel: 'B1' },
  ],
  B2: [
    { id: 'b2-1', text: 'In my opinion, social media has both advantages and disadvantages.', category: 'discussion', difficulty: 'hard', language: 'English', cefrLevel: 'B2' },
    { id: 'b2-2', text: 'Despite the challenges we faced, we managed to complete the project on time.', category: 'professional', difficulty: 'hard', language: 'English', cefrLevel: 'B2' },
    { id: 'b2-3', text: 'The environmental impact of climate change is becoming increasingly evident.', category: 'current-events', difficulty: 'hard', language: 'English', cefrLevel: 'B2' },
    { id: 'b2-4', text: 'I would appreciate it if you could send me the report by tomorrow morning.', category: 'formal-requests', difficulty: 'hard', language: 'English', cefrLevel: 'B2' },
    { id: 'b2-5', text: 'Having considered all the options, I believe this is the best approach.', category: 'argumentation', difficulty: 'hard', language: 'English', cefrLevel: 'B2' },
  ],
  C1: [
    { id: 'c1-1', text: 'The proliferation of artificial intelligence raises significant ethical considerations.', category: 'academic', difficulty: 'very-hard', language: 'English', cefrLevel: 'C1' },
    { id: 'c1-2', text: 'Notwithstanding the economic downturn, the company maintained its market position.', category: 'business', difficulty: 'very-hard', language: 'English', cefrLevel: 'C1' },
    { id: 'c1-3', text: 'The correlation between educational attainment and socioeconomic status is well documented.', category: 'research', difficulty: 'very-hard', language: 'English', cefrLevel: 'C1' },
    { id: 'c1-4', text: 'It is imperative that we address these systemic issues with a comprehensive strategy.', category: 'formal', difficulty: 'very-hard', language: 'English', cefrLevel: 'C1' },
    { id: 'c1-5', text: 'The nuances of intercultural communication often require careful interpretation.', category: 'culture', difficulty: 'very-hard', language: 'English', cefrLevel: 'C1' },
  ],
  C2: [
    { id: 'c2-1', text: 'The epistemological foundations of scientific inquiry have been subject to considerable philosophical scrutiny.', category: 'philosophy', difficulty: 'expert', language: 'English', cefrLevel: 'C2' },
    { id: 'c2-2', text: 'Contemporary discourse on sustainability necessitates a paradigm shift in our approach to resource management.', category: 'academic', difficulty: 'expert', language: 'English', cefrLevel: 'C2' },
    { id: 'c2-3', text: 'The juxtaposition of traditional values with modern sensibilities creates an intriguing dialectic.', category: 'culture', difficulty: 'expert', language: 'English', cefrLevel: 'C2' },
    { id: 'c2-4', text: 'One might argue that the inherent unpredictability of complex systems precludes definitive conclusions.', category: 'argumentation', difficulty: 'expert', language: 'English', cefrLevel: 'C2' },
    { id: 'c2-5', text: 'The ramifications of this unprecedented technological disruption extend far beyond the immediate economic implications.', category: 'analysis', difficulty: 'expert', language: 'English', cefrLevel: 'C2' },
  ],
}

export class SpeechService {
  // Analyze pronunciation and return detailed feedback
  async analyzePronunciation(data: AnalyzePronunciationInput) {
    const targetNormalized = normalizeText(data.targetText)
    const recognizedNormalized = normalizeText(data.recognizedText)

    const targetWords = targetNormalized.split(' ').filter(w => w)
    const recognizedWords = recognizedNormalized.split(' ').filter(w => w)

    // Calculate word-level accuracy
    const { wordFeedback, correctCount } = calculateWordAccuracy(targetWords, recognizedWords)

    // Calculate overall accuracy score (0-100)
    const accuracyScore = targetWords.length > 0
      ? Math.round((correctCount / targetWords.length) * 100)
      : 0

    // Calculate fluency score based on word count match and order
    const wordCountRatio = Math.min(recognizedWords.length, targetWords.length) /
      Math.max(recognizedWords.length, targetWords.length, 1)
    const fluencyScore = Math.round(wordCountRatio * 100)

    // Build feedback object
    const feedback = {
      wordFeedback,
      overallFeedback: this.generateOverallFeedback(accuracyScore, fluencyScore, data.cefrLevel),
      suggestions: this.generateSuggestions(wordFeedback, accuracyScore),
      summary: {
        totalWords: targetWords.length,
        correctWords: correctCount,
        incorrectWords: wordFeedback.filter(w => w.status === 'incorrect').length,
        missingWords: wordFeedback.filter(w => w.status === 'missing').length,
        extraWords: wordFeedback.filter(w => w.status === 'extra').length
      }
    }

    // Save the speaking session
    const session = await prisma.speakingSession.create({
      data: {
        studentId: data.studentId,
        chatSessionId: data.chatSessionId,
        language: data.language,
        cefrLevel: data.cefrLevel,
        targetText: data.targetText,
        recognizedText: data.recognizedText,
        accuracyScore,
        fluencyScore,
        feedback: feedback as any,
        audioUrl: data.audioUrl,
        duration: data.duration
      }
    })

    return {
      session,
      accuracyScore,
      fluencyScore,
      feedback
    }
  }

  private generateOverallFeedback(accuracy: number, fluency: number, level?: string): string {
    const avgScore = (accuracy + fluency) / 2

    if (avgScore >= 90) {
      return 'Excellent pronunciation! Your speech was clear and accurate.'
    } else if (avgScore >= 75) {
      return 'Good job! Your pronunciation is mostly correct with minor improvements needed.'
    } else if (avgScore >= 60) {
      return 'Nice effort! Focus on the words highlighted for improvement.'
    } else if (avgScore >= 40) {
      return 'Keep practicing! Try speaking more slowly and clearly.'
    } else {
      return 'Let\'s practice more! Try repeating each word carefully.'
    }
  }

  private generateSuggestions(wordFeedback: any[], accuracy: number): string[] {
    const suggestions: string[] = []

    const incorrectWords = wordFeedback.filter(w => w.status === 'incorrect')
    const missingWords = wordFeedback.filter(w => w.status === 'missing')

    if (incorrectWords.length > 0) {
      suggestions.push(`Focus on these words: ${incorrectWords.slice(0, 3).map(w => w.word).join(', ')}`)
    }

    if (missingWords.length > 0) {
      suggestions.push('Try to speak all the words in the sentence.')
    }

    if (accuracy < 70) {
      suggestions.push('Speak more slowly and enunciate each word clearly.')
    }

    if (suggestions.length === 0) {
      suggestions.push('Great job! Try a more challenging phrase next.')
    }

    return suggestions
  }

  // Save a speaking session directly (when already have the analysis)
  async saveSession(data: {
    studentId: string
    language: string
    cefrLevel?: string
    targetText?: string
    recognizedText?: string
    accuracyScore?: number
    fluencyScore?: number
    feedback?: any
    audioUrl?: string
    duration?: number
    chatSessionId?: string
  }) {
    return prisma.speakingSession.create({
      data: {
        studentId: data.studentId,
        chatSessionId: data.chatSessionId,
        language: data.language,
        cefrLevel: data.cefrLevel,
        targetText: data.targetText,
        recognizedText: data.recognizedText,
        accuracyScore: data.accuracyScore,
        fluencyScore: data.fluencyScore,
        feedback: data.feedback,
        audioUrl: data.audioUrl,
        duration: data.duration
      }
    })
  }

  // Get speaking sessions for a student
  async getStudentSessions(studentId: string, limit: number = 20) {
    return prisma.speakingSession.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
      take: limit
    })
  }

  // Get session by ID
  async getSession(id: string) {
    const session = await prisma.speakingSession.findUnique({
      where: { id },
      include: {
        chatSession: { select: { id: true, topic: true } }
      }
    })

    if (!session) {
      throw new Error('Session not found')
    }

    return session
  }

  // Get speaking prompts by level
  getPrompts(cefrLevel?: string, language: string = 'English'): SpeakingPrompt[] {
    if (cefrLevel && SPEAKING_PROMPTS[cefrLevel]) {
      return SPEAKING_PROMPTS[cefrLevel].filter(p => p.language === language)
    }

    // Return all prompts for the language
    return Object.values(SPEAKING_PROMPTS)
      .flat()
      .filter(p => p.language === language)
  }

  // Get random prompt for level
  getRandomPrompt(cefrLevel: string, language: string = 'English'): SpeakingPrompt | null {
    const prompts = this.getPrompts(cefrLevel, language)
    if (prompts.length === 0) return null
    return prompts[Math.floor(Math.random() * prompts.length)]
  }

  // Get student speaking statistics
  async getStudentStats(studentId: string) {
    const sessions = await prisma.speakingSession.findMany({
      where: { studentId },
      select: {
        accuracyScore: true,
        fluencyScore: true,
        duration: true,
        createdAt: true
      }
    })

    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        avgAccuracy: 0,
        avgFluency: 0,
        totalPracticeTime: 0,
        improvementTrend: 'none'
      }
    }

    const totalSessions = sessions.length
    const avgAccuracy = Math.round(
      sessions.reduce((sum, s) => sum + (s.accuracyScore || 0), 0) / totalSessions
    )
    const avgFluency = Math.round(
      sessions.reduce((sum, s) => sum + (s.fluencyScore || 0), 0) / totalSessions
    )
    const totalPracticeTime = sessions.reduce((sum, s) => sum + (s.duration || 0), 0)

    // Calculate improvement trend (compare first half to second half)
    let improvementTrend: 'improving' | 'stable' | 'declining' | 'none' = 'none'
    if (sessions.length >= 4) {
      const half = Math.floor(sessions.length / 2)
      const firstHalfAvg = sessions.slice(0, half).reduce((sum, s) => sum + (s.accuracyScore || 0), 0) / half
      const secondHalfAvg = sessions.slice(half).reduce((sum, s) => sum + (s.accuracyScore || 0), 0) / (sessions.length - half)

      if (secondHalfAvg > firstHalfAvg + 5) {
        improvementTrend = 'improving'
      } else if (secondHalfAvg < firstHalfAvg - 5) {
        improvementTrend = 'declining'
      } else {
        improvementTrend = 'stable'
      }
    }

    return {
      totalSessions,
      avgAccuracy,
      avgFluency,
      totalPracticeTime,
      improvementTrend
    }
  }
}

export const speechService = new SpeechService()
