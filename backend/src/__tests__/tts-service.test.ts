/**
 * TTS Service Tests
 * Tests voice selection consistency, dialogue parsing, and speaker assignment
 */

// We test the internal logic by accessing private methods via (service as any)
// since the TtsService constructor requires OpenAI, we mock it
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({}))
})

// Mock fs to avoid file system operations
jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
}))

import { TtsService } from '../services/TtsService'

describe('TtsService', () => {
  let service: any // use any to access private methods

  beforeEach(() => {
    service = new TtsService()
  })

  describe('pickVoice', () => {
    it('should return consistent voice for the same questionId', () => {
      const voice1 = service.pickVoice('English', 'question-abc-123')
      const voice2 = service.pickVoice('English', 'question-abc-123')
      expect(voice1).toBe(voice2)
    })

    it('should return consistent voice across multiple calls', () => {
      const results = new Set<string>()
      for (let i = 0; i < 10; i++) {
        results.add(service.pickVoice('English', 'same-question-id'))
      }
      // All 10 calls should produce the same voice
      expect(results.size).toBe(1)
    })

    it('should return different voices for different questionIds', () => {
      const voices = new Set<string>()
      // With enough different IDs, we should get multiple voices
      for (let i = 0; i < 50; i++) {
        voices.add(service.pickVoice('English', `question-${i}`))
      }
      expect(voices.size).toBeGreaterThan(1)
    })

    it('should return a valid English voice', () => {
      const validVoices = ['alloy', 'nova', 'echo', 'shimmer', 'onyx', 'fable']
      const voice = service.pickVoice('English', 'test-question')
      expect(validVoices).toContain(voice)
    })

    it('should return a valid Italian voice', () => {
      const validVoices = ['onyx', 'nova', 'alloy', 'shimmer']
      const voice = service.pickVoice('Italian', 'test-question')
      expect(validVoices).toContain(voice)
    })

    it('should fall back to English voices for unknown language', () => {
      const validEnglishVoices = ['alloy', 'nova', 'echo', 'shimmer', 'onyx', 'fable']
      const voice = service.pickVoice('Klingon', 'test-question')
      expect(validEnglishVoices).toContain(voice)
    })
  })

  describe('isDialogue', () => {
    it('should detect SPEAKER_A/SPEAKER_B format', () => {
      const script = 'SPEAKER_A: Hello!\nSPEAKER_B: Hi there!'
      expect(service.isDialogue(script)).toBe(true)
    })

    it('should detect PERSON_A/PERSON_B format', () => {
      const script = 'PERSON_A: Good morning.\nPERSON_B: Good morning to you.'
      expect(service.isDialogue(script)).toBe(true)
    })

    it('should not detect plain text as dialogue', () => {
      // Reset regex state since isDialogue uses a global regex
      const script = 'The weather is nice today. I think we should go for a walk.'
      expect(service.isDialogue(script)).toBe(false)
    })
  })

  describe('parseDialogue', () => {
    it('should parse simple two-speaker dialogue', () => {
      const script = 'SPEAKER_A: Hello!\nSPEAKER_B: Hi there!'
      const segments = service.parseDialogue(script)
      expect(segments).toHaveLength(2)
      expect(segments[0]).toEqual({ speaker: 'SPEAKER_A', text: 'Hello!' })
      expect(segments[1]).toEqual({ speaker: 'SPEAKER_B', text: 'Hi there!' })
    })

    it('should handle continuation lines', () => {
      const script = 'SPEAKER_A: Hello!\nHow are you?\nSPEAKER_B: Fine.'
      const segments = service.parseDialogue(script)
      expect(segments).toHaveLength(2)
      expect(segments[0].text).toBe('Hello! How are you?')
      expect(segments[1].text).toBe('Fine.')
    })

    it('should treat text without speaker prefix as narrator', () => {
      const script = 'Welcome to the listening exercise.'
      const segments = service.parseDialogue(script)
      expect(segments).toHaveLength(1)
      expect(segments[0].speaker).toBe('NARRATOR')
    })

    it('should handle multiple speakers', () => {
      const script = 'SPEAKER_A: One\nSPEAKER_B: Two\nSPEAKER_A: Three'
      const segments = service.parseDialogue(script)
      expect(segments).toHaveLength(3)
      expect(segments[2].speaker).toBe('SPEAKER_A')
    })
  })

  describe('assignSpeakerVoices', () => {
    it('should assign different voices to different speakers', () => {
      const assignment = service.assignSpeakerVoices(['SPEAKER_A', 'SPEAKER_B'], 'English')
      expect(assignment['SPEAKER_A']).not.toBe(assignment['SPEAKER_B'])
    })

    it('should assign male voice to first speaker (even index)', () => {
      const maleVoices = ['alloy', 'echo', 'onyx', 'fable']
      const assignment = service.assignSpeakerVoices(['SPEAKER_A', 'SPEAKER_B'], 'English')
      expect(maleVoices).toContain(assignment['SPEAKER_A'])
    })

    it('should assign female voice to second speaker (odd index)', () => {
      const femaleVoices = ['nova', 'shimmer']
      const assignment = service.assignSpeakerVoices(['SPEAKER_A', 'SPEAKER_B'], 'English')
      expect(femaleVoices).toContain(assignment['SPEAKER_B'])
    })

    it('should handle single speaker', () => {
      const assignment = service.assignSpeakerVoices(['NARRATOR'], 'English')
      expect(assignment['NARRATOR']).toBeDefined()
    })

    it('should handle many speakers without crashing', () => {
      const speakers = ['A', 'B', 'C', 'D', 'E', 'F']
      const assignment = service.assignSpeakerVoices(speakers, 'English')
      expect(Object.keys(assignment)).toHaveLength(6)
      // Each speaker should have a voice
      speakers.forEach(s => expect(assignment[s]).toBeDefined())
    })

    it('should use language-appropriate voices', () => {
      const italianVoices = ['onyx', 'nova', 'alloy', 'shimmer']
      const assignment = service.assignSpeakerVoices(['SPEAKER_A', 'SPEAKER_B'], 'Italian')
      expect(italianVoices).toContain(assignment['SPEAKER_A'])
      expect(italianVoices).toContain(assignment['SPEAKER_B'])
    })
  })
})
