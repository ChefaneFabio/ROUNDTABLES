import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

// TTS speed varies by CEFR level
const SPEED_BY_LEVEL: Record<string, number> = {
  A1: 0.8, A2: 0.85, B1: 0.9, B2: 1.0, C1: 1.1, C2: 1.15
}

// Multiple voices per language for variety
const VOICES_BY_LANGUAGE: Record<string, string[]> = {
  English: ['alloy', 'nova', 'echo', 'shimmer', 'onyx', 'fable'],
  Italian: ['onyx', 'nova', 'alloy', 'shimmer'],
  Spanish: ['nova', 'alloy', 'shimmer', 'echo'],
  French: ['shimmer', 'nova', 'alloy', 'onyx'],
  German: ['echo', 'onyx', 'alloy', 'nova']
}

// Default single voice per language (backward compatible)
const DEFAULT_VOICE: Record<string, string> = {
  English: 'alloy',
  Italian: 'onyx',
  Spanish: 'nova',
  French: 'shimmer',
  German: 'echo'
}

// Dialogue line separator — ttsScript uses "SPEAKER_A:" / "SPEAKER_B:" prefixes
const DIALOGUE_PATTERN = /^(SPEAKER_[A-Z]|PERSON_[A-Z]|[A-Z]+)\s*:\s*/gm

export class TtsService {
  private openai: OpenAI | null = null
  private audioDir: string

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    }
    this.audioDir = path.join(__dirname, '../../public/audio')
    if (!fs.existsSync(this.audioDir)) {
      fs.mkdirSync(this.audioDir, { recursive: true })
    }
  }

  isConfigured(): boolean {
    return !!this.openai
  }

  /**
   * Pick a voice for a question — rotates through available voices
   * based on questionId hash for consistency (same question = same voice)
   */
  private pickVoice(language: string, questionId: string): string {
    const voices = VOICES_BY_LANGUAGE[language] || VOICES_BY_LANGUAGE['English']
    // Simple hash from questionId to pick a consistent voice
    let hash = 0
    for (let i = 0; i < questionId.length; i++) {
      hash = ((hash << 5) - hash + questionId.charCodeAt(i)) | 0
    }
    return voices[Math.abs(hash) % voices.length]
  }

  /**
   * Check if a ttsScript contains dialogue markers (multi-speaker)
   */
  private isDialogue(ttsScript: string): boolean {
    return DIALOGUE_PATTERN.test(ttsScript)
  }

  /**
   * Parse dialogue script into speaker segments
   * Format: "SPEAKER_A: Hello!\nSPEAKER_B: Hi there!"
   */
  private parseDialogue(ttsScript: string): Array<{ speaker: string; text: string }> {
    const lines = ttsScript.split('\n').filter(l => l.trim())
    const segments: Array<{ speaker: string; text: string }> = []

    for (const line of lines) {
      const match = line.match(/^(SPEAKER_[A-Z]|PERSON_[A-Z]|[A-Z]+)\s*:\s*(.+)/)
      if (match) {
        segments.push({ speaker: match[1], text: match[2].trim() })
      } else if (segments.length > 0) {
        // Continuation of previous speaker
        segments[segments.length - 1].text += ' ' + line.trim()
      } else {
        // No speaker prefix — treat as single narrator
        segments.push({ speaker: 'NARRATOR', text: line.trim() })
      }
    }

    return segments
  }

  /**
   * Assign distinct voices to dialogue speakers
   */
  private assignSpeakerVoices(speakers: string[], language: string): Record<string, string> {
    const voices = VOICES_BY_LANGUAGE[language] || VOICES_BY_LANGUAGE['English']
    const assignment: Record<string, string> = {}

    // Assign male+female alternating for natural dialogue
    const maleVoices = ['alloy', 'echo', 'onyx', 'fable']
    const femaleVoices = ['nova', 'shimmer']
    const availableMale = maleVoices.filter(v => voices.includes(v))
    const availableFemale = femaleVoices.filter(v => voices.includes(v))

    speakers.forEach((speaker, i) => {
      if (i % 2 === 0) {
        assignment[speaker] = availableMale[Math.floor(i / 2) % availableMale.length] || voices[0]
      } else {
        assignment[speaker] = availableFemale[Math.floor(i / 2) % availableFemale.length] || voices[1]
      }
    })

    return assignment
  }

  /**
   * Generate single-voice audio
   */
  private async generateSingleVoice(
    text: string, voice: string, speed: number
  ): Promise<Buffer> {
    if (!this.openai) throw new Error('OpenAI API key not configured')

    const mp3 = await this.openai.audio.speech.create({
      model: 'tts-1',
      voice: voice as any,
      input: text,
      speed,
      response_format: 'mp3'
    })

    return Buffer.from(await mp3.arrayBuffer())
  }

  /**
   * Generate dialogue audio — concatenates multiple voice segments
   */
  private async generateDialogueAudio(
    segments: Array<{ speaker: string; text: string }>,
    voiceAssignment: Record<string, string>,
    speed: number
  ): Promise<Buffer> {
    if (!this.openai) throw new Error('OpenAI API key not configured')

    const buffers: Buffer[] = []

    for (const segment of segments) {
      const voice = voiceAssignment[segment.speaker] || 'alloy'

      const mp3 = await this.openai.audio.speech.create({
        model: 'tts-1',
        voice: voice as any,
        input: segment.text,
        speed,
        response_format: 'mp3'
      })

      buffers.push(Buffer.from(await mp3.arrayBuffer()))
    }

    // Simple concatenation of MP3 buffers — works for sequential playback
    return Buffer.concat(buffers)
  }

  /**
   * Generate TTS audio for a question and return the file path
   */
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
    let buffer: Buffer

    // Check if this is a dialogue script
    DIALOGUE_PATTERN.lastIndex = 0 // Reset regex state
    if (this.isDialogue(text)) {
      DIALOGUE_PATTERN.lastIndex = 0
      const segments = this.parseDialogue(text)
      const uniqueSpeakers = [...new Set(segments.map(s => s.speaker))]
      const voiceAssignment = this.assignSpeakerVoices(uniqueSpeakers, language)
      buffer = await this.generateDialogueAudio(segments, voiceAssignment, speed)
    } else {
      // Single voice — rotate per question for variety
      const voice = this.pickVoice(language, questionId)
      buffer = await this.generateSingleVoice(text, voice, speed)
    }

    fs.writeFileSync(filePath, buffer)
    return `/audio/${filename}`
  }

  // Get existing audio URL or generate on demand
  async getAudioUrl(questionId: string, ttsScript: string, language: string, cefrLevel: string): Promise<string | null> {
    const filename = `tts_${questionId}.mp3`
    const filePath = path.join(this.audioDir, filename)

    const baseUrl = process.env.BACKEND_URL || process.env.RENDER_EXTERNAL_URL || ''

    // Check if already exists
    if (fs.existsSync(filePath)) {
      return `${baseUrl}/audio/${filename}`
    }

    // Generate if API is configured
    if (this.openai && ttsScript) {
      try {
        const relativePath = await this.generateAudio(questionId, ttsScript, language, cefrLevel)
        return `${baseUrl}${relativePath}`
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
