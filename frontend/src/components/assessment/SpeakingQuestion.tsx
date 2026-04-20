import { useState, useEffect } from 'react'
import { AudioRecorder } from './AudioRecorder'

interface SpeakingQuestionProps {
  question: {
    id: string
    questionText: string
    speakingPrompt?: string
    imageUrl?: string | null
    timeSuggested?: number | null
  }
  onSubmit: (audioBlob: Blob, duration: number, transcript?: string) => void
  disabled?: boolean
  language?: string
}

// If a question doesn't carry timeSuggested, default to a 60s suggestion.
// Hard cap = suggested + 30s buffer, with a sane floor of 60s.
const DEFAULT_SUGGESTED_SECONDS = 60
const BUFFER_SECONDS = 30

export function SpeakingQuestion({ question, onSubmit, disabled, language }: SpeakingQuestionProps) {
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    setAttempt(0)
  }, [question.id])

  const handleRecordingComplete = (blob: Blob, duration: number, transcript: string) => {
    setAttempt(a => a + 1)
    onSubmit(blob, duration, transcript || undefined)
  }

  const suggested = question.timeSuggested && question.timeSuggested > 0
    ? question.timeSuggested
    : DEFAULT_SUGGESTED_SECONDS
  const maxRecording = Math.max(60, suggested + BUFFER_SECONDS)

  return (
    <div className="space-y-4">
      {/* Prompt */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-700 font-medium mb-1">{question.questionText}</p>
        {question.speakingPrompt && (
          <p className="text-lg text-purple-900 font-semibold">{question.speakingPrompt}</p>
        )}
        {question.imageUrl && (
          <div className="mt-3">
            <img
              src={question.imageUrl}
              alt="Speaking prompt"
              className="w-full max-h-80 object-contain rounded-lg border border-purple-200 bg-white"
            />
          </div>
        )}
        <p className="text-xs text-purple-600 mt-2">
          Estimated speaking time: <strong>~{suggested}s</strong>
          <span className="text-purple-400 ml-2">· recording will auto-stop after {maxRecording}s</span>
        </p>
      </div>

      {/* Recorder — key forces reset on new question */}
      <AudioRecorder
        key={question.id}
        onRecordingComplete={handleRecordingComplete}
        maxAttempts={2}
        currentAttempt={attempt}
        disabled={disabled}
        language={language}
        suggestedDurationSeconds={suggested}
        maxDurationSeconds={maxRecording}
      />
    </div>
  )
}
