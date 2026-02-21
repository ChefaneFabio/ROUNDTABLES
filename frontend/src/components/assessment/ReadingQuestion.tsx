import { useState } from 'react'

interface ReadingQuestionProps {
  question: {
    id: string
    questionText: string
    questionType: string
    passage?: string
    passageTitle?: string
    options?: { label: string; value: string }[]
  }
  onSubmit: (answer: string) => void
  disabled?: boolean
}

export function ReadingQuestion({ question, onSubmit, disabled }: ReadingQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [fillAnswer, setFillAnswer] = useState('')

  const isMC = question.questionType === 'MULTIPLE_CHOICE' || question.questionType === 'READING'
  const isFillBlank = question.questionType === 'FILL_BLANK' || question.questionType === 'SHORT_ANSWER'

  const handleSubmit = () => {
    const answer = isMC ? selectedAnswer : fillAnswer.trim()
    if (answer) {
      onSubmit(answer)
      setSelectedAnswer('')
      setFillAnswer('')
    }
  }

  return (
    <div className="space-y-4">
      {/* Passage */}
      {question.passage && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          {question.passageTitle && (
            <h3 className="font-semibold text-blue-900 mb-2">{question.passageTitle}</h3>
          )}
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{question.passage}</p>
        </div>
      )}

      {/* Question */}
      <p className="text-lg font-medium text-gray-900">{question.questionText}</p>

      {/* Answer options */}
      {isMC && question.options && (
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

      {isFillBlank && (
        <input
          type="text"
          value={fillAnswer}
          onChange={(e) => setFillAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={disabled}
          placeholder="Type your answer..."
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={disabled || (!selectedAnswer && !fillAnswer.trim())}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Submit Answer
      </button>
    </div>
  )
}
