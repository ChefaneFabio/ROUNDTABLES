import { useState, useEffect } from 'react'
import { AudioPlayer } from './AudioPlayer'
import { assessmentApi } from '../../services/assessmentApi'

interface ListeningQuestionProps {
  question: {
    id: string
    questionText: string
    questionType: string
    options?: { label: string; value: string }[]
    ttsScript?: string
    audioUrl?: string
    language?: string
  }
  onSubmit: (answer: string) => void
  disabled?: boolean
}

export function ListeningQuestion({ question, onSubmit, disabled }: ListeningQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [dictationAnswer, setDictationAnswer] = useState('')
  const [audioSrc, setAudioSrc] = useState<string | null>(question.audioUrl || null)
  const [ttsScript, setTtsScript] = useState<string>(question.ttsScript || '')

  const isDictation = question.questionType === 'DICTATION'

  // Load TTS audio if needed
  useEffect(() => {
    if (!question.audioUrl && question.id) {
      assessmentApi.getTtsAudio(question.id).then(result => {
        if (result.audioUrl) {
          setAudioSrc(result.audioUrl)
        }
        if (result.ttsScript) {
          setTtsScript(result.ttsScript)
        }
      }).catch(() => {
        // Fallback to client-side TTS
      })
    }
  }, [question.id, question.audioUrl])

  const handleSubmit = () => {
    const answer = isDictation ? dictationAnswer.trim() : selectedAnswer
    if (answer) {
      onSubmit(answer)
      setSelectedAnswer('')
      setDictationAnswer('')
    }
  }

  return (
    <div className="space-y-4">
      {/* Audio player */}
      <AudioPlayer
        src={audioSrc}
        ttsScript={ttsScript}
        language={question.language}
        maxPlays={2}
      />

      {/* Question */}
      <p className="text-lg font-medium text-gray-900">{question.questionText}</p>

      {/* MC options */}
      {!isDictation && question.options && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => !disabled && setSelectedAnswer(option.value)}
              disabled={disabled}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all
                ${selectedAnswer === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 bg-white'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Dictation input */}
      {isDictation && (
        <textarea
          value={dictationAnswer}
          onChange={(e) => setDictationAnswer(e.target.value)}
          disabled={disabled}
          placeholder="Write what you hear..."
          rows={3}
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={disabled || (!selectedAnswer && !dictationAnswer.trim())}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Submit Answer
      </button>
    </div>
  )
}
