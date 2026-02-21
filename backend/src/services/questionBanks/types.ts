// Extended question data interface for multi-skill assessments
export interface MultiSkillQuestionData {
  language: string
  cefrLevel: string
  questionType: string
  questionText: string
  options?: { label: string; value: string }[]
  correctAnswer: string
  passage?: string
  passageTitle?: string
  points: number
  orderIndex: number
  // Multi-skill fields
  skill: 'READING' | 'LISTENING' | 'WRITING' | 'SPEAKING'
  ttsScript?: string         // Text for TTS audio generation (listening)
  ttsLanguageCode?: string   // e.g. "en-US", "it-IT"
  speakingPrompt?: string    // Prompt text for speaking questions
  rubric?: Record<string, any> // Scoring rubric for writing/speaking
  tags?: string[]
  timeSuggested?: number     // Suggested time in seconds
}
