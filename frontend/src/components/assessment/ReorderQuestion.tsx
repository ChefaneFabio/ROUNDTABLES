import { useState } from 'react'

interface ReorderQuestionProps {
  question: {
    id: string
    questionText: string
    options?: { label: string; value: string }[]
  }
  onSubmit: (answer: string) => void
  disabled?: boolean
  language?: string
}

export function ReorderQuestion({ question, onSubmit, disabled }: ReorderQuestionProps) {
  const items = question.options || []
  const [ordered, setOrdered] = useState<{ label: string; value: string }[]>([])
  const [remaining, setRemaining] = useState<{ label: string; value: string }[]>([...items])

  const handleAdd = (item: { label: string; value: string }) => {
    if (disabled) return
    setOrdered(prev => [...prev, item])
    setRemaining(prev => prev.filter(r => r.value !== item.value))
  }

  const handleRemoveLast = () => {
    if (disabled || ordered.length === 0) return
    const last = ordered[ordered.length - 1]
    setOrdered(prev => prev.slice(0, -1))
    setRemaining(prev => [...prev, last])
  }

  const handleReset = () => {
    if (disabled) return
    setOrdered([])
    setRemaining([...items])
  }

  const handleSubmit = () => {
    if (ordered.length !== items.length) return
    onSubmit(ordered.map(o => o.value).join(','))
    setOrdered([])
    setRemaining([...items])
  }

  return (
    <div className="space-y-5">
      <p className="text-lg font-semibold text-gray-900">{question.questionText}</p>
      <p className="text-sm text-gray-500">Click words in the correct order to build the sentence.</p>

      {/* Ordered area */}
      <div className="min-h-[60px] p-4 bg-blue-50 border-2 border-blue-200 border-dashed rounded-xl flex flex-wrap gap-2 items-center">
        {ordered.length === 0 ? (
          <span className="text-gray-400 text-sm italic">Click words below to place them here...</span>
        ) : (
          ordered.map((item, i) => (
            <span
              key={`${item.value}-${i}`}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium"
            >
              {item.label}
            </span>
          ))
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleRemoveLast}
          disabled={disabled || ordered.length === 0}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 transition-all"
        >
          ← Undo
        </button>
        <button
          onClick={handleReset}
          disabled={disabled || ordered.length === 0}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-40 transition-all"
        >
          Reset
        </button>
      </div>

      {/* Remaining words */}
      <div className="flex flex-wrap gap-2">
        {remaining.map((item) => (
          <button
            key={item.value}
            onClick={() => handleAdd(item)}
            disabled={disabled}
            className="px-4 py-2 bg-white border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-800 hover:border-blue-400 hover:bg-blue-50 transition-all disabled:opacity-50"
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={ordered.length !== items.length || disabled}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Submit Answer
      </button>
    </div>
  )
}
