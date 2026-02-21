import { useState } from 'react'
import { AudioRecorder } from './AudioRecorder'

interface SpeakingQuestionProps {
  question: {
    id: string
    questionText: string
    speakingPrompt?: string
  }
  onSubmit: (audioBlob: Blob, duration: number) => void
  disabled?: boolean
}

export function SpeakingQuestion({ question, onSubmit, disabled }: SpeakingQuestionProps) {
  const [attempt, setAttempt] = useState(0)

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    setAttempt(a => a + 1)
    onSubmit(blob, duration)
  }

  return (
    <div className="space-y-4">
      {/* Prompt */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-700 font-medium mb-1">{question.questionText}</p>
        {question.speakingPrompt && (
          <p className="text-lg text-purple-900 font-semibold">{question.speakingPrompt}</p>
        )}
      </div>

      {/* Recorder */}
      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        maxAttempts={2}
        currentAttempt={attempt}
        disabled={disabled}
      />
    </div>
  )
}
