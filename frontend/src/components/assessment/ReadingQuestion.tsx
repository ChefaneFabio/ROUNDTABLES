import { useState, useRef } from 'react'
import { SpecialCharactersBar } from './SpecialCharactersBar'

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

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
  language?: string
}

export function ReadingQuestion({ question, onSubmit, disabled, language }: ReadingQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [fillAnswer, setFillAnswer] = useState('')
  const fillInputRef = useRef<HTMLInputElement>(null)

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
    <div className="space-y-5">
      {/* Passage */}
      {question.passage && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          {question.passageTitle && (
            <h3 className="font-semibold text-blue-900 mb-2">{question.passageTitle}</h3>
          )}
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{question.passage}</p>
        </div>
      )}

      {/* Question */}
      <p className="text-lg font-semibold text-gray-900">{question.questionText}</p>

      {/* Answer options */}
      {isMC && question.options && (
        <div className="space-y-2.5">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === option.value
            return (
              <button
                key={option.value}
                onClick={() => !disabled && setSelectedAnswer(option.value)}
                disabled={disabled}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3
                  ${isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 bg-white'}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'}
                `}>
                  {OPTION_LETTERS[idx] || idx + 1}
                </span>
                <span className={`text-base ${isSelected ? 'text-blue-900 font-medium' : 'text-gray-800'}`}>
                  {option.label.length <= 2 ? option.value : option.label}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {isFillBlank && (
        <div>
          {language && (
            <SpecialCharactersBar language={language} inputRef={fillInputRef} onInsert={setFillAnswer} />
          )}
          <input
            ref={fillInputRef}
            type="text"
            value={fillAnswer}
            onChange={(e) => setFillAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={disabled}
            placeholder="Type your answer..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={disabled || (!selectedAnswer && !fillAnswer.trim())}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
      >
        Submit Answer
      </button>
    </div>
  )
}
