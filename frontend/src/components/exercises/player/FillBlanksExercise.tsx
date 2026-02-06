import React, { useState, useEffect } from 'react'
import { ExerciseItem } from '../../../services/exerciseApi'

interface FillBlanksExerciseProps {
  item: ExerciseItem
  onAnswer: (answer: string[]) => void
  showResult?: boolean
  result?: { isCorrect: boolean; correctAnswer?: any }
  disabled?: boolean
}

export const FillBlanksExercise: React.FC<FillBlanksExerciseProps> = ({
  item,
  onAnswer,
  showResult = false,
  result,
  disabled = false
}) => {
  const [answers, setAnswers] = useState<string[]>([])

  // Parse the content to find blanks
  // Content format: { text: "The cat ___ on the mat. It ___ sleeping.", blanks: ["sat", "was"] }
  const content = item.content as { text: string; blanks?: string[] }
  const text = content.text || ''

  // Split text by blanks (marked with ___)
  const parts = text.split(/___/)
  const numBlanks = parts.length - 1

  // Initialize answers array
  useEffect(() => {
    setAnswers(new Array(numBlanks).fill(''))
  }, [numBlanks, item.id])

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    onAnswer(answers)
  }

  const getInputStyle = (index: number) => {
    if (!showResult || !result) {
      return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    }

    const correctBlanks = result.correctAnswer?.blanks || []
    const isBlankCorrect = correctBlanks[index]?.toLowerCase().trim() ===
      answers[index]?.toLowerCase().trim()

    return isBlankCorrect
      ? 'border-green-500 bg-green-50 text-green-700'
      : 'border-red-500 bg-red-50 text-red-700'
  }

  return (
    <div className="space-y-6">
      {/* Question text if exists */}
      {item.questionText && (
        <p className="text-gray-700 font-medium">{item.questionText}</p>
      )}

      {/* Fill in the blanks text */}
      <div className="text-lg leading-relaxed">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span>{part}</span>
            {index < numBlanks && (
              <input
                type="text"
                value={answers[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={disabled || showResult}
                className={`inline-block w-32 mx-1 px-3 py-1 border-2 rounded-lg text-center ${getInputStyle(index)}`}
                placeholder="..."
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Hint */}
      {item.hint && !showResult && (
        <p className="text-sm text-gray-500 italic">Hint: {item.hint}</p>
      )}

      {/* Result feedback */}
      {showResult && result && (
        <div className={`p-4 rounded-lg ${result.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-medium ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {result.isCorrect ? 'Correct!' : 'Not quite right'}
          </p>
          {!result.isCorrect && result.correctAnswer?.blanks && (
            <p className="text-sm mt-1 text-gray-600">
              Correct answers: {result.correctAnswer.blanks.join(', ')}
            </p>
          )}
          {item.explanation && (
            <p className="text-sm mt-2 text-gray-600">{item.explanation}</p>
          )}
        </div>
      )}

      {/* Submit button */}
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={disabled || answers.some(a => !a.trim())}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Check Answer
        </button>
      )}
    </div>
  )
}

export default FillBlanksExercise
