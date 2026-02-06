import React, { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { ExerciseItem } from '../../../services/exerciseApi'

interface MultipleChoiceExerciseProps {
  item: ExerciseItem
  onAnswer: (answer: string) => void
  showResult?: boolean
  result?: { isCorrect: boolean; correctAnswer?: any }
  disabled?: boolean
}

export const MultipleChoiceExercise: React.FC<MultipleChoiceExerciseProps> = ({
  item,
  onAnswer,
  showResult = false,
  result,
  disabled = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  // Content format: { options: [{ value: 'a', label: 'Option A' }, ...] }
  const content = item.content as { options: Array<{ value: string; label: string }> }
  const options = content.options || []

  const handleSelect = (value: string) => {
    if (disabled || showResult) return
    setSelectedOption(value)
  }

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption)
    }
  }

  const getOptionStyle = (optionValue: string) => {
    const isSelected = selectedOption === optionValue
    const correctValue = result?.correctAnswer?.value

    if (!showResult) {
      return isSelected
        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
    }

    // Show result state
    if (optionValue === correctValue) {
      return 'border-green-500 bg-green-50'
    }
    if (isSelected && optionValue !== correctValue) {
      return 'border-red-500 bg-red-50'
    }
    return 'border-gray-200 opacity-50'
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      {item.questionText && (
        <p className="text-lg text-gray-900 font-medium">{item.questionText}</p>
      )}

      {/* Image if exists */}
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt="Question visual"
          className="max-w-md rounded-lg shadow-sm"
        />
      )}

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedOption === option.value
          const correctValue = result?.correctAnswer?.value
          const isCorrect = option.value === correctValue
          const isWrongSelection = showResult && isSelected && !isCorrect

          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              disabled={disabled || showResult}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all flex items-center gap-3 ${getOptionStyle(option.value)}`}
            >
              <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option.label}</span>
              {showResult && isCorrect && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {isWrongSelection && (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </button>
          )
        })}
      </div>

      {/* Hint */}
      {item.hint && !showResult && (
        <p className="text-sm text-gray-500 italic">Hint: {item.hint}</p>
      )}

      {/* Result feedback */}
      {showResult && result && (
        <div className={`p-4 rounded-lg ${result.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-medium ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {result.isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          {item.explanation && (
            <p className="text-sm mt-2 text-gray-600">{item.explanation}</p>
          )}
        </div>
      )}

      {/* Submit button */}
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={disabled || !selectedOption}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Check Answer
        </button>
      )}
    </div>
  )
}

export default MultipleChoiceExercise
