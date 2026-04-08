import { useState, useMemo, useRef } from 'react'
import { SpecialCharactersBar } from './SpecialCharactersBar'

interface WritingQuestionProps {
  question: {
    id: string
    questionText: string
    rubric?: { minWords?: number; maxWords?: number }
    cefrLevel?: string
  }
  onSubmit: (responseText: string) => void
  disabled?: boolean
  language?: string
}

export function WritingQuestion({ question, onSubmit, disabled, language }: WritingQuestionProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const wordCount = useMemo(() => {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length
  }, [text])

  const maxWords = question.rubric?.maxWords || 300
  const isOverMax = wordCount > maxWords

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim())
      setText('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-lg font-medium text-gray-900">{question.questionText}</p>
        <p className="text-sm text-amber-700 mt-2">
          Maximum {maxWords} words.
        </p>
      </div>

      {language && (
        <SpecialCharactersBar language={language} inputRef={textareaRef} onInsert={setText} />
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder="Start writing your response here..."
          rows={10}
          className={`w-full p-4 border-2 rounded-lg outline-none resize-y transition-colors
            ${isOverMax ? 'border-red-400 focus:border-red-500' :
              wordCount > 0 ? 'border-green-400 focus:border-green-500' :
              'border-gray-200 focus:border-blue-500'}
          `}
        />

        {/* Word counter */}
        <div className={`absolute bottom-3 right-3 text-sm font-medium px-2 py-1 rounded
          ${isOverMax ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-600'}
        `}>
          {wordCount} / {maxWords} words
        </div>
      </div>

      {isOverMax && (
        <p className="text-sm text-red-600">
          Your response exceeds the maximum word count. Please shorten it.
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim() || isOverMax}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Submit Writing
      </button>
    </div>
  )
}
