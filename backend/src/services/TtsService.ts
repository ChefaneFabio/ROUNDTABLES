import fs from 'fs'
import path from 'path'

// ElevenLabs multilingual voices — all support eleven_multilingual_v2.
// Accent variety is important for the Listening test, so the pool spans
// American, British, Irish, and Australian speakers.
type Voice = { id: string; name: string; gender: 'male' | 'female'; accent: string }
const VOICES: Voice[] = [
  // British
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily',      gender: 'female', accent: 'British' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', gender: 'female', accent: 'British' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel',    gender: 'male',   accent: 'British' },
  { id: 'JBFqnCBsd6RMkjVDRZzb', name: 'George',    gender: 'male',   accent: 'British' },
  // American
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah',     gender: 'female', accent: 'American' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel',    gender: 'female', accent: 'American' },
  { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda',   gender: 'female', accent: 'American' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam',      gender: 'male',   accent: 'American' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam',      gender: 'male',   accent: 'American' },
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian',     gender: 'male',   accent: 'American' },
  { id: 'pqHfZKP75CvOlQylNhV4', name: 'Bill',      gender: 'male',   accent: 'American' },
  // Irish / Australian
  { id: 'D38z5RcWu1voky8WS1ja', name: 'Fin',       gender: 'male',   accent: 'Irish' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie',   gender: 'male',   accent: 'Australian' },
]

// Voice settings by CEFR. Stability is intentionally low (0.35–0.55) — ElevenLabs treats
// high stability as monotone, which is what users perceive as "robotic". Style adds prosody.
const SETTINGS_BY_LEVEL: Record<string, { stability: number; similarity_boost: number; style: number; speed: number }> = {
  A1: { stability: 0.55, similarity_boost: 0.85, style: 0.20, speed: 0.90 },
  A2: { stability: 0.50, similarity_boost: 0.85, style: 0.25, speed: 0.92 },
  B1: { stability: 0.45, similarity_boost: 0.80, style: 0.30, speed: 0.95 },
  B2: { stability: 0.40, similarity_boost: 0.80, style: 0.35, speed: 1.00 },
  C1: { stability: 0.40, similarity_boost: 0.75, style: 0.40, speed: 1.05 },
  C2: { stability: 0.35, similarity_boost: 0.75, style: 0.45, speed: 1.05 },
}

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1'
const DIALOGUE_PATTERN = /^(SPEAKER_[A-Z]|PERSON_[A-Z]|[A-Z]+)\s*:\s*/gm

export class TtsService {
  private apiKey: string | null = null
  private audioDir: string

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY || null
    this.audioDir = path.join(__dirname, '../../public/audio')
    if (!fs.existsSync(this.audioDir)) {
      fs.mkdirSync(this.audioDir, { recursive: true })
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey
  }

  /** Pick a voice deterministically from questionId — same question always uses the
   *  same voice, but the larger pool spreads selections across accents. */
  private pickVoice(questionId: string): Voice {
    // djb2 — better distribution than the previous shift-based hash on short ids
    let hash = 5381
    for (let i = 0; i < questionId.length; i++) {
      hash = ((hash * 33) ^ questionId.charCodeAt(i)) >>> 0
    }
    return VOICES[hash % VOICES.length]
  }

  private isDialogue(ttsScript: string): boolean {
    DIALOGUE_PATTERN.lastIndex = 0
    return DIALOGUE_PATTERN.test(ttsScript)
  }

  private parseDialogue(ttsScript: string): Array<{ speaker: string; text: string }> {
    const lines = ttsScript.split('\n').filter(l => l.trim())
    const segments: Array<{ speaker: string; text: string }> = []

    for (const line of lines) {
      const match = line.match(/^(SPEAKER_[A-Z]|PERSON_[A-Z]|[A-Z]+)\s*:\s*(.+)/)
      if (match) {
        segments.push({ speaker: match[1], text: match[2].trim() })
      } else if (segments.length > 0) {
        segments[segments.length - 1].text += ' ' + line.trim()
      } else {
        segments.push({ speaker: 'NARRATOR', text: line.trim() })
      }
    }

    return segments
  }

  /** Assign male/female voices alternating for dialogue */
  private assignSpeakerVoices(speakers: string[]): Record<string, typeof VOICES[0]> {
    const males = VOICES.filter(v => v.gender === 'male')
    const females = VOICES.filter(v => v.gender === 'female')
    const assignment: Record<string, typeof VOICES[0]> = {}

    speakers.forEach((speaker, i) => {
      if (i % 2 === 0) {
        assignment[speaker] = females[Math.floor(i / 2) % females.length]
      } else {
        assignment[speaker] = males[Math.floor(i / 2) % males.length]
      }
    })

    return assignment
  }

  /** Call ElevenLabs TTS API and return audio buffer */
  private async generateSingleVoice(text: string, voiceId: string, cefrLevel: string): Promise<Buffer> {
    if (!this.apiKey) throw new Error('ElevenLabs API key not configured')

    const settings = SETTINGS_BY_LEVEL[cefrLevel] || SETTINGS_BY_LEVEL['B1']

    const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: settings.stability,
          similarity_boost: settings.similarity_boost,
          style: settings.style,
          use_speaker_boost: true,
          speed: settings.speed,
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`ElevenLabs API error ${response.status}: ${errorText}`)
    }

    return Buffer.from(await response.arrayBuffer())
  }

  /** Generate dialogue audio — concatenate multiple voice segments */
  private async generateDialogueAudio(
    segments: Array<{ speaker: string; text: string }>,
    voiceAssignment: Record<string, typeof VOICES[0]>,
    cefrLevel: string
  ): Promise<Buffer> {
    const buffers: Buffer[] = []

    for (const segment of segments) {
      const voice = voiceAssignment[segment.speaker] || VOICES[0]
      const buffer = await this.generateSingleVoice(segment.text, voice.id, cefrLevel)
      buffers.push(buffer)
    }

    return Buffer.concat(buffers)
  }

  /** Generate TTS audio for a question and save to disk */
  async generateAudio(questionId: string, text: string, _language: string, cefrLevel: string): Promise<string> {
    const filename = `tts_${questionId}.mp3`
    const filePath = path.join(this.audioDir, filename)

    if (fs.existsSync(filePath)) {
      return `/audio/${filename}`
    }

    if (!this.apiKey) {
      throw new Error('ElevenLabs API key not configured. Set ELEVENLABS_API_KEY in env.')
    }

    let buffer: Buffer

    DIALOGUE_PATTERN.lastIndex = 0
    if (this.isDialogue(text)) {
      DIALOGUE_PATTERN.lastIndex = 0
      const segments = this.parseDialogue(text)
      const uniqueSpeakers = [...new Set(segments.map(s => s.speaker))]
      const voiceAssignment = this.assignSpeakerVoices(uniqueSpeakers)
      buffer = await this.generateDialogueAudio(segments, voiceAssignment, cefrLevel)
    } else {
      const voice = this.pickVoice(questionId)
      buffer = await this.generateSingleVoice(text, voice.id, cefrLevel)
    }

    fs.writeFileSync(filePath, buffer)
    return `/audio/${filename}`
  }

  /** Get existing audio URL or generate on demand */
  async getAudioUrl(questionId: string, ttsScript: string, language: string, cefrLevel: string): Promise<string | null> {
    const filename = `tts_${questionId}.mp3`
    const filePath = path.join(this.audioDir, filename)

    const baseUrl = process.env.BACKEND_URL || process.env.RENDER_EXTERNAL_URL || ''

    if (fs.existsSync(filePath)) {
      return `${baseUrl}/audio/${filename}`
    }

    if (this.apiKey && ttsScript) {
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

  /** Bulk pre-generate audio for all listening questions */
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
