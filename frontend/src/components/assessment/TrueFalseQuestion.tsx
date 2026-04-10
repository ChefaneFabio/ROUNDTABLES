import { useState } from 'react'

interface TrueFalseQuestionProps {
  question: {
    id: string
    questionText: string
    passage?: string
    passageTitle?: string
  }
  onSubmit: (answer: string) => void
  disabled?: boolean
  language?: string
}

export function TrueFalseQuestion({ question, onSubmit, disabled }: TrueFalseQuestionProps) {
  const [selected, setSelected] = useState<string>('')

  const handleSubmit = () => {
    if (selected) {
      onSubmit(selected)
      setSelected('')
    }
  }

  return (
    <div className="space-y-5">
      {question.passage && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          {question.passageTitle && (
            <h3 className="font-semibold text-blue-900 mb-2">{question.passageTitle}</h3>
          )}
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">{question.passage}</p>
        </div>
      )}

      <p className="text-lg font-semibold text-gray-900">{question.questionText}</p>

      <div className="flex gap-4">
        {[
          { value: 'True', icon: '✓', color: 'green' },
          { value: 'False', icon: '✗', color: 'red' },
        ].map(({ value, icon, color }) => (
          <button
            key={value}
            onClick={() => !disabled && setSelected(value)}
            disabled={disabled}
            className={`flex-1 py-4 px-6 rounded-xl border-2 text-center font-semibold text-lg transition-all
              ${selected === value
                ? `border-${color}-500 bg-${color}-50 text-${color}-700 shadow-sm`
                : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="text-2xl block mb-1">{icon}</span>
            {value}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected || disabled}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Submit Answer
      </button>
    </div>
  )
}
