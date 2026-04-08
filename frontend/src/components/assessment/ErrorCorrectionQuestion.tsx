import { useState, useRef } from 'react'
import { SpecialCharactersBar } from './SpecialCharactersBar'

interface ErrorCorrectionQuestionProps {
  question: {
    id: string
    questionText: string
    passage?: string
  }
  onSubmit: (answer: string) => void
  disabled?: boolean
  language?: string
}

export function ErrorCorrectionQuestion({ question, onSubmit, disabled, language }: ErrorCorrectionQuestionProps) {
  const [answer, setAnswer] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim())
      setAnswer('')
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-lg font-semibold text-gray-900">{question.questionText}</p>

      {question.passage && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
          <p className="text-lg text-red-900 font-medium leading-relaxed">{question.passage}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Write the corrected sentence:
        </label>
        {language && (
          <SpecialCharactersBar language={language} inputRef={inputRef} onInsert={setAnswer} />
        )}
        <input
          ref={inputRef}
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          disabled={disabled}
          placeholder="Type the corrected sentence..."
          className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={disabled || !answer.trim()}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
      >
        Submit Answer
      </button>
    </div>
  )
}
