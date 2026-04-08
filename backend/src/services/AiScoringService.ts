import Anthropic from '@anthropic-ai/sdk'
import { Prisma } from '@prisma/client'
import { prisma } from '../config/database'

interface WritingEvaluation {
  grammar: number        // 0-100
  coherence: number      // 0-100
  vocabulary: number     // 0-100
  spelling: number       // 0-100
  taskAchievement: number // 0-100
  overall: number        // 0-100
  cefrLevel: string      // A1-C2
  feedback: string       // Detailed feedback text
}

interface SpeakingEvaluation {
  pronunciation: number  // 0-100 (approximated from transcript)
  fluency: number        // 0-100
  grammar: number        // 0-100
  vocabulary: number     // 0-100
  overall: number        // 0-100
  cefrLevel: string      // A1-C2
  feedback: string
}

export class AiScoringService {
  private anthropic: Anthropic | null = null

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY
    if (apiKey) {
      this.anthropic = new Anthropic({ apiKey })
    }
  }

  isConfigured(): boolean {
    return !!this.anthropic
  }

  private async callClaude(systemPrompt: string, userMessage: string): Promise<string> {
    if (!this.anthropic) throw new Error('Anthropic API key not configured')

    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
      temperature: 0.3
    })

    const block = response.content[0]
    return block.type === 'text' ? block.text : ''
  }

  // Evaluate a writing response against CEFR rubrics
  async evaluateWriting(params: {
    responseText: string
    prompt: string
    targetLevel: string
    language: string
    rubric?: Record<string, any>
  }): Promise<WritingEvaluation> {
    const { responseText, prompt, targetLevel, language, rubric } = params

    const systemPrompt = `You are an expert language assessor specializing in CEFR-aligned evaluation of ${language} writing.
Evaluate the student's writing response on the following criteria, each scored 0-100:
- grammar: Grammatical accuracy and range of structures
- coherence: Logical organization, paragraphing, use of cohesive devices
- vocabulary: Range and precision of vocabulary
- spelling: Spelling and punctuation accuracy
- taskAchievement: How well the response addresses the prompt requirements

Also determine the overall CEFR level (A1, A2, B1, B2, C1, C2) based on the writing quality.
Provide brief, constructive feedback (2-3 sentences) that would help the student improve.

${rubric ? `Additional rubric criteria: ${JSON.stringify(rubric)}` : ''}

Respond ONLY with valid JSON in this exact format:
{"grammar":N,"coherence":N,"vocabulary":N,"spelling":N,"taskAchievement":N,"overall":N,"cefrLevel":"XX","feedback":"..."}`

    try {
      const content = await this.callClaude(systemPrompt, `Prompt: ${prompt}\n\nStudent's response:\n${responseText}`)
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('No JSON found')
      return JSON.parse(jsonMatch[0]) as WritingEvaluation
    } catch {
      return {
        grammar: 50, coherence: 50, vocabulary: 50, spelling: 50,
        taskAchievement: 50, overall: 50, cefrLevel: targetLevel,
        feedback: 'Automated evaluation could not be completed. A teacher will review your response.'
      }
    }
  }

  // Evaluate a speaking transcript
  async evaluateSpeaking(params: {
    transcript: string
    prompt: string
    targetLevel: string
    language: string
    duration?: number
  }): Promise<SpeakingEvaluation> {
    const { transcript, prompt, targetLevel, language, duration } = params

    const systemPrompt = `You are an expert language assessor specializing in CEFR-aligned evaluation of ${language} speaking.
You are evaluating a transcript of a student's spoken response. Evaluate on these criteria (0-100 each):
- pronunciation: Approximated from transcript accuracy (well-formed words suggest good pronunciation)
- fluency: Smoothness and natural flow (inferred from sentence completeness and length)
- grammar: Grammatical accuracy and range
- vocabulary: Range and appropriateness of vocabulary

${duration ? `The student spoke for ${duration} seconds.` : ''}

Determine the overall CEFR level (A1, A2, B1, B2, C1, C2).
Provide brief, constructive feedback (2-3 sentences).

Respond ONLY with valid JSON:
{"pronunciation":N,"fluency":N,"grammar":N,"vocabulary":N,"overall":N,"cefrLevel":"XX","feedback":"..."}`

    try {
      const content = await this.callClaude(systemPrompt, `Prompt: ${prompt}\n\nStudent's transcript:\n${transcript}`)
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('No JSON found')
      return JSON.parse(jsonMatch[0]) as SpeakingEvaluation
    } catch {
      return {
        pronunciation: 50, fluency: 50, grammar: 50, vocabulary: 50,
        overall: 50, cefrLevel: targetLevel,
        feedback: 'Automated evaluation could not be completed. A teacher will review your response.'
      }
    }
  }

  // Transcribe audio using browser-provided transcript (no server-side transcription)
  // Speaking responses should include a transcript from the browser's Web Speech API
  async transcribeAudio(_audioPath: string, _language: string): Promise<string> {
    // Claude API does not support audio transcription.
    // Transcription should happen client-side via Web Speech API or be provided manually.
    throw new Error('Audio transcription requires client-side Web Speech API. No server-side transcription available.')
  }

  // Score a writing response and save to DB
  async scoreWritingResponse(writingResponseId: string) {
    const response = await prisma.writingResponse.findUnique({
      where: { id: writingResponseId },
      include: {
        section: { include: { assessment: true } }
      }
    })

    if (!response) throw new Error('Writing response not found')

    const question = await prisma.assessmentQuestion.findUnique({
      where: { id: response.questionId }
    })

    const evaluation = await this.evaluateWriting({
      responseText: response.responseText,
      prompt: question?.questionText || '',
      targetLevel: response.section.targetLevel,
      language: response.section.assessment.language,
      rubric: question?.rubric as Record<string, any> | undefined
    })

    await prisma.writingResponse.update({
      where: { id: writingResponseId },
      data: { aiEvaluation: evaluation as any }
    })

    return evaluation
  }

  // Score a speaking response: evaluate transcript with Claude
  async scoreSpeakingResponse(speakingResponseId: string) {
    const response = await prisma.speakingResponse.findUnique({
      where: { id: speakingResponseId },
      include: {
        section: { include: { assessment: true } }
      }
    })

    if (!response) throw new Error('Speaking response not found')

    const question = await prisma.assessmentQuestion.findUnique({
      where: { id: response.questionId }
    })

    const transcript = response.transcript
    if (!transcript) {
      // No transcript available — return a pending evaluation rather than failing
      return {
        pronunciation: 0, fluency: 0, grammar: 0, vocabulary: 0,
        overall: 0, cefrLevel: response.section.targetLevel,
        feedback: 'No transcript was captured. A teacher should review the audio recording manually.'
      } as SpeakingEvaluation
    }

    const evaluation = await this.evaluateSpeaking({
      transcript,
      prompt: question?.speakingPrompt || question?.questionText || '',
      targetLevel: response.section.targetLevel,
      language: response.section.assessment.language,
      duration: response.duration || undefined
    })

    await prisma.speakingResponse.update({
      where: { id: speakingResponseId },
      data: { aiEvaluation: evaluation as any }
    })

    return evaluation
  }

  // Score all writing/speaking responses for a section
  async scoreSectionResponses(sectionId: string) {
    const section = await prisma.assessmentSection.findUnique({
      where: { id: sectionId },
      include: {
        writingResponses: true,
        speakingResponses: true
      }
    })

    if (!section) throw new Error('Section not found')

    const results: any[] = []

    if (section.skill === 'WRITING') {
      for (const wr of section.writingResponses) {
        if (!wr.aiEvaluation) {
          try {
            const eval_ = await this.scoreWritingResponse(wr.id)
            results.push({ id: wr.id, type: 'writing', evaluation: eval_ })
          } catch (error: any) {
            results.push({ id: wr.id, type: 'writing', error: error.message })
          }
        }
      }

      // Calculate section AI score as average of writing evaluations
      const evaluatedResponses = await prisma.writingResponse.findMany({
        where: { sectionId, NOT: { aiEvaluation: { equals: Prisma.DbNull } } }
      })

      if (evaluatedResponses.length > 0) {
        const evals = evaluatedResponses
          .map(r => r.aiEvaluation as any)
          .filter(e => e && e.overall != null)

        if (evals.length > 0) {
          const avgOverall = Math.round(evals.reduce((sum: number, e: any) => sum + e.overall, 0) / evals.length)
          const levels = evals.map((e: any) => e.cefrLevel)
          const cefrLevel = mode(levels) || section.targetLevel

          const aiScore = {
            overall: avgOverall,
            cefrLevel,
            responseEvaluations: evals
          }

          await prisma.assessmentSection.update({
            where: { id: sectionId },
            data: {
              aiScore: aiScore as any,
              aiScoredAt: new Date(),
              finalScore: aiScore as any,
              percentageScore: avgOverall,
              cefrLevel
            }
          })
        }
      }
    }

    if (section.skill === 'SPEAKING') {
      for (const sr of section.speakingResponses) {
        if (!sr.aiEvaluation && sr.transcript) {
          try {
            const eval_ = await this.scoreSpeakingResponse(sr.id)
            results.push({ id: sr.id, type: 'speaking', evaluation: eval_ })
          } catch (error: any) {
            results.push({ id: sr.id, type: 'speaking', error: error.message })
          }
        }
      }

      const evaluatedResponses = await prisma.speakingResponse.findMany({
        where: { sectionId, NOT: { aiEvaluation: { equals: Prisma.DbNull } } }
      })

      if (evaluatedResponses.length > 0) {
        const evals = evaluatedResponses
          .map(r => r.aiEvaluation as any)
          .filter(e => e && e.overall != null)

        if (evals.length > 0) {
          const avgOverall = Math.round(evals.reduce((sum: number, e: any) => sum + e.overall, 0) / evals.length)
          const levels = evals.map((e: any) => e.cefrLevel)
          const cefrLevel = mode(levels) || section.targetLevel

          const aiScore = {
            overall: avgOverall,
            cefrLevel,
            responseEvaluations: evals
          }

          await prisma.assessmentSection.update({
            where: { id: sectionId },
            data: {
              aiScore: aiScore as any,
              aiScoredAt: new Date(),
              finalScore: aiScore as any,
              percentageScore: avgOverall,
              cefrLevel
            }
          })
        }
      }
    }

    return results
  }
}

// Helper: find the mode (most frequent value) of an array
function mode(arr: string[]): string | undefined {
  const counts: Record<string, number> = {}
  let maxCount = 0
  let result: string | undefined

  for (const val of arr) {
    counts[val] = (counts[val] || 0) + 1
    if (counts[val] > maxCount) {
      maxCount = counts[val]
      result = val
    }
  }

  return result
}

export const aiScoringService = new AiScoringService()
