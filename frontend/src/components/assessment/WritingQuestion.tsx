import { useState, useMemo } from 'react'

interface WritingQuestionProps {
  question: {
    id: string
    questionText: string
    rubric?: { minWords?: number; maxWords?: number }
    cefrLevel?: string
  }
  onSubmit: (responseText: string) => void
  disabled?: boolean
}

export function WritingQuestion({ question, onSubmit, disabled }: WritingQuestionProps) {
  const [text, setText] = useState('')

  const wordCount = useMemo(() => {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length
  }, [text])

  const minWords = question.rubric?.minWords || 20
  const maxWords = question.rubric?.maxWords || 300
  const meetsMinimum = wordCount >= minWords
  const isOverMax = wordCount > maxWords

  const handleSubmit = () => {
    if (text.trim() && meetsMinimum) {
      onSubmit(text.trim())
      setText('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-lg font-medium text-gray-900">{question.questionText}</p>
        <p className="text-sm text-amber-700 mt-2">
          Write between {minWords} and {maxWords} words.
        </p>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder="Start writing your response here..."
          rows={10}
          className={`w-full p-4 border-2 rounded-lg outline-none resize-y transition-colors
            ${isOverMax ? 'border-red-400 focus:border-red-500' :
              meetsMinimum ? 'border-green-400 focus:border-green-500' :
              'border-gray-200 focus:border-blue-500'}
          `}
        />

        {/* Word counter */}
        <div className={`absolute bottom-3 right-3 text-sm font-medium px-2 py-1 rounded
          ${isOverMax ? 'bg-red-100 text-red-700' :
            meetsMinimum ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-600'}
        `}>
          {wordCount} / {minWords}-{maxWords} words
        </div>
      </div>

      {!meetsMinimum && wordCount > 0 && (
        <p className="text-sm text-amber-600">
          {minWords - wordCount} more word{minWords - wordCount !== 1 ? 's' : ''} needed to meet the minimum requirement.
        </p>
      )}

      {isOverMax && (
        <p className="text-sm text-red-600">
          Your response exceeds the maximum word count. Please shorten it.
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={disabled || !meetsMinimum || isOverMax}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Submit Writing
      </button>
    </div>
  )
}
