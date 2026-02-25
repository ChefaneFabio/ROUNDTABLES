import { useState } from 'react'

interface SentenceTransformationQuestionProps {
  question: {
    id: string
    questionText: string
    passage?: string
  }
  onSubmit: (answer: string) => void
  disabled?: boolean
}

export function SentenceTransformationQuestion({ question, onSubmit, disabled }: SentenceTransformationQuestionProps) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim())
      setAnswer('')
    }
  }

  return (
    <div className="space-y-4">
      {question.passage && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-600 font-medium mb-1">Original sentence:</p>
          <p className="text-lg text-orange-900 font-medium">{question.passage}</p>
        </div>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-gray-800 font-medium">{question.questionText}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Write the transformed sentence:
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
          disabled={disabled}
          placeholder="Type the rewritten sentence..."
          rows={2}
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
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
