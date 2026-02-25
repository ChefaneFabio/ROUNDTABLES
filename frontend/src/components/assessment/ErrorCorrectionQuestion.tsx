import { useState } from 'react'

interface ErrorCorrectionQuestionProps {
  question: {
    id: string
    questionText: string
    passage?: string
  }
  onSubmit: (answer: string) => void
  disabled?: boolean
}

export function ErrorCorrectionQuestion({ question, onSubmit, disabled }: ErrorCorrectionQuestionProps) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim())
      setAnswer('')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 font-medium">{question.questionText}</p>

      {question.passage && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-lg text-red-900 font-medium">{question.passage}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Write the corrected sentence:
        </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={disabled}
          placeholder="Type the corrected sentence..."
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={disabled || !answer.trim()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Submit Answer
      </button>
    </div>
  )
}
