import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

// TTS speed varies by CEFR level
const SPEED_BY_LEVEL: Record<string, number> = {
  A1: 0.8, A2: 0.85, B1: 0.9, B2: 1.0, C1: 1.1, C2: 1.15
}

const VOICE_BY_LANGUAGE: Record<string, string> = {
  English: 'alloy',
  Italian: 'onyx',
  Spanish: 'nova',
  French: 'shimmer',
  German: 'echo'
}

export class TtsService {
  private openai: OpenAI | null = null
  private audioDir: string

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    }
    this.audioDir = path.join(__dirname, '../../public/audio')
    // Ensure audio directory exists
    if (!fs.existsSync(this.audioDir)) {
      fs.mkdirSync(this.audioDir, { recursive: true })
    }
  }

  isConfigured(): boolean {
    return !!this.openai
  }

  // Generate TTS audio for a question and return the file path
  async generateAudio(questionId: string, text: string, language: string, cefrLevel: string): Promise<string> {
    const filename = `tts_${questionId}.mp3`
    const filePath = path.join(this.audioDir, filename)

    // Return existing file if already generated
    if (fs.existsSync(filePath)) {
      return `/audio/${filename}`
    }

    if (!this.openai) {
      throw new Error('OpenAI API key not configured. Set OPENAI_API_KEY in .env')
    }

    const speed = SPEED_BY_LEVEL[cefrLevel] || 1.0
    const voice = (VOICE_BY_LANGUAGE[language] || 'alloy') as any

    const mp3 = await this.openai.audio.speech.create({
      model: 'tts-1',
      voice,
      input: text,
      speed,
      response_format: 'mp3'
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    fs.writeFileSync(filePath, buffer)

    return `/audio/${filename}`
  }

  // Get existing audio URL or generate on demand
  async getAudioUrl(questionId: string, ttsScript: string, language: string, cefrLevel: string): Promise<string | null> {
    const filename = `tts_${questionId}.mp3`
    const filePath = path.join(this.audioDir, filename)

    // Check if already exists
    if (fs.existsSync(filePath)) {
      return `/audio/${filename}`
    }

    // Generate if API is configured
    if (this.openai && ttsScript) {
      try {
        return await this.generateAudio(questionId, ttsScript, language, cefrLevel)
      } catch (error) {
        console.error(`TTS generation failed for question ${questionId}:`, error)
        return null
      }
    }

    return null
  }

  // Bulk pre-generate audio for all listening questions
  async preGenerateAll(questions: Array<{ id: string; ttsScript: string; language: string; cefrLevel: string }>) {
    const results: Array<{ id: string; status: 'success' | 'skipped' | 'error'; url?: string; error?: string }> = []

    for (const q of questions) {
      if (!q.ttsScript) {
        results.push({ id: q.id, status: 'skipped' })
        continue
      }

      try {
        const url = await this.generateAudio(q.id, q.ttsScript, q.language, q.cefrLevel)
        results.push({ id: q.id, status: 'success', url })
      } catch (error: any) {
        results.push({ id: q.id, status: 'error', error: error.message })
      }
    }

    return results
  }
}

export const ttsService = new TtsService()
