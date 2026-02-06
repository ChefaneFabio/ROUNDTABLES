import React, { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { ExerciseItem } from '../../../services/exerciseApi'

interface MatchingExerciseProps {
  item: ExerciseItem
  onAnswer: (answer: Array<{ left: string; right: string }>) => void
  showResult?: boolean
  result?: { isCorrect: boolean; correctAnswer?: any }
  disabled?: boolean
}

export const MatchingExercise: React.FC<MatchingExerciseProps> = ({
  item,
  onAnswer,
  showResult = false,
  result,
  disabled = false
}) => {
  // Content format: { leftItems: ['word1', 'word2'], rightItems: ['def1', 'def2'] }
  const content = item.content as { leftItems: string[]; rightItems: string[] }
  const leftItems = content.leftItems || []
  const rightItems = content.rightItems || []

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matches, setMatches] = useState<Array<{ left: string; right: string }>>([])

  const handleLeftClick = (item: string) => {
    if (disabled || showResult) return
    // Check if already matched
    if (matches.some(m => m.left === item)) return
    setSelectedLeft(item)
  }

  const handleRightClick = (item: string) => {
    if (disabled || showResult || !selectedLeft) return
    // Check if already matched
    if (matches.some(m => m.right === item)) return

    const newMatch = { left: selectedLeft, right: item }
    setMatches([...matches, newMatch])
    setSelectedLeft(null)
  }

  const removeMatch = (left: string) => {
    if (disabled || showResult) return
    setMatches(matches.filter(m => m.left !== left))
  }

  const handleSubmit = () => {
    onAnswer(matches)
  }

  const getMatchForLeft = (leftItem: string) => matches.find(m => m.left === leftItem)
  const getMatchForRight = (rightItem: string) => matches.find(m => m.right === rightItem)

  const isCorrectMatch = (left: string, right: string) => {
    if (!result?.correctAnswer?.pairs) return false
    return result.correctAnswer.pairs.some(
      (p: { left: string; right: string }) => p.left === left && p.right === right
    )
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      {item.questionText && (
        <p className="text-lg text-gray-900 font-medium">{item.questionText}</p>
      )}

      {/* Matching area */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-500 uppercase">Match from</h4>
          {leftItems.map((leftItem, index) => {
            const match = getMatchForLeft(leftItem)
            const isSelected = selectedLeft === leftItem

            let style = 'border-gray-200 hover:border-gray-300'
            if (isSelected) style = 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
            if (match) {
              if (showResult) {
                style = isCorrectMatch(leftItem, match.right)
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              } else {
                style = 'border-blue-500 bg-blue-50'
              }
            }

            return (
              <button
                key={`left-${index}`}
                onClick={() => match ? removeMatch(leftItem) : handleLeftClick(leftItem)}
                disabled={disabled || showResult}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all flex items-center justify-between ${style}`}
              >
                <span>{leftItem}</span>
                {match && showResult && (
                  isCorrectMatch(leftItem, match.right)
                    ? <CheckCircle className="w-5 h-5 text-green-600" />
                    : <XCircle className="w-5 h-5 text-red-600" />
                )}
              </button>
            )
          })}
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-500 uppercase">Match to</h4>
          {rightItems.map((rightItem, index) => {
            const match = getMatchForRight(rightItem)

            let style = 'border-gray-200'
            if (!match && selectedLeft) style = 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
            if (match) {
              if (showResult) {
                style = isCorrectMatch(match.left, rightItem)
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
              } else {
                style = 'border-blue-500 bg-blue-50'
              }
            }

            return (
              <button
                key={`right-${index}`}
                onClick={() => handleRightClick(rightItem)}
                disabled={disabled || showResult || !!match || !selectedLeft}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${style}`}
              >
                {rightItem}
              </button>
            )
          })}
        </div>
      </div>

      {/* Instructions */}
      {!showResult && (
        <p className="text-sm text-gray-500">
          Click an item on the left, then click the matching item on the right.
          Click a matched item to unmatch it.
        </p>
      )}

      {/* Hint */}
      {item.hint && !showResult && (
        <p className="text-sm text-gray-500 italic">Hint: {item.hint}</p>
      )}

      {/* Result feedback */}
      {showResult && result && (
        <div className={`p-4 rounded-lg ${result.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-medium ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {result.isCorrect ? 'All matches correct!' : 'Some matches are incorrect'}
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
          disabled={disabled || matches.length !== leftItems.length}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Check Matches ({matches.length}/{leftItems.length})
        </button>
      )}
    </div>
  )
}

export default MatchingExercise
