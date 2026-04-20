import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const LANGUAGE_TO_ISO: Record<string, string> = {
  English: 'en',
  Italian: 'it',
  Spanish: 'es',
  French: 'fr',
  German: 'de',
}

export class WhisperService {
  private client: OpenAI | null = null

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY
    if (apiKey && !apiKey.startsWith('your-') && apiKey.length > 10) {
      this.client = new OpenAI({ apiKey })
    }
  }

  isConfigured(): boolean {
    return this.client !== null
  }

  /** Resolve a stored audioUrl ("/uploads/speaking/foo.webm") to its disk path. */
  private resolveAudioPath(audioUrl: string): string {
    // __dirname is backend/dist/services in production, backend/src/services in dev
    return path.join(__dirname, '../../', audioUrl.replace(/^\/+/, ''))
  }

  /** Transcribe an audio file with Whisper. Returns null if unavailable / fails. */
  async transcribe(audioUrl: string, language?: string): Promise<string | null> {
    if (!this.client) return null

    const filePath = this.resolveAudioPath(audioUrl)
    if (!fs.existsSync(filePath)) {
      console.warn(`[Whisper] Audio file not found: ${filePath}`)
      return null
    }

    try {
      const langCode = language ? LANGUAGE_TO_ISO[language] : undefined
      const result = await this.client.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: 'whisper-1',
        language: langCode,
        response_format: 'text',
      })
      // When response_format is 'text', the SDK returns the raw string
      const text = typeof result === 'string' ? result : (result as any)?.text || ''
      return text.trim() || null
    } catch (error: any) {
      console.error('[Whisper] Transcription failed:', error?.message || error)
      return null
    }
  }
}

export const whisperService = new WhisperService()
