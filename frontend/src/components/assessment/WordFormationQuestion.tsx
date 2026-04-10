import { useState, useRef } from 'react'
import { SpecialCharactersBar } from './SpecialCharactersBar'

interface WordFormationQuestionProps {
  question: {
    id: string
    questionText: string
    passage?: string
  }
  onSubmit: (answer: string) => void
  disabled?: boolean
  language?: string
}

export function WordFormationQuestion({ question, onSubmit, disabled, language }: WordFormationQuestionProps) {
  const [answer, setAnswer] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim())
      setAnswer('')
    }
  }

  const handleInsertChar = (char: string) => {
    if (!inputRef.current) return
    const start = inputRef.current.selectionStart || answer.length
    const end = inputRef.current.selectionEnd || answer.length
    const newVal = answer.slice(0, start) + char + answer.slice(end)
    setAnswer(newVal)
    setTimeout(() => {
      inputRef.current?.setSelectionRange(start + 1, start + 1)
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <div className="space-y-5">
      {/* Base word / context */}
      {question.passage && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-amber-700 mb-1">Base word</p>
          <p className="text-xl font-bold text-amber-900">{question.passage}</p>
        </div>
      )}

      <p className="text-lg font-semibold text-gray-900">{question.questionText}</p>

      <div>
        <input
          ref={inputRef}
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          disabled={disabled}
          placeholder="Type the correct form..."
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none disabled:opacity-50"
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <SpecialCharactersBar language={language || 'English'} inputRef={inputRef} onInsert={handleInsertChar} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!answer.trim() || disabled}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Submit Answer
      </button>
    </div>
  )
}
