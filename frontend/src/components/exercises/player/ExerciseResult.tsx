import React from 'react'
import { Trophy, Target, Clock, ArrowRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react'
import { CompletionResult } from '../../../services/exerciseApi'

interface ExerciseResultProps {
  result: CompletionResult
  onRetry?: () => void
  onContinue?: () => void
  className?: string
}

export const ExerciseResult: React.FC<ExerciseResultProps> = ({
  result,
  onRetry,
  onContinue,
  className = ''
}) => {
  const { score, maxScore, percentage, passed, passingScore, timeSpent } = result

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    if (mins === 0) return `${secs} seconds`
    return `${mins}m ${secs}s`
  }

  const getScoreColor = () => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 70) return 'text-blue-600'
    if (percentage >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = () => {
    if (percentage >= 90) return 'bg-green-100'
    if (percentage >= 70) return 'bg-blue-100'
    if (percentage >= 50) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getMessage = () => {
    if (percentage >= 90) return 'Excellent work!'
    if (percentage >= 70) return 'Great job!'
    if (percentage >= 50) return 'Good effort!'
    return 'Keep practicing!'
  }

  return (
    <div className={`text-center space-y-8 ${className}`}>
      {/* Trophy/Result icon */}
      <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${getScoreBg()}`}>
        {passed ? (
          <Trophy className={`w-12 h-12 ${getScoreColor()}`} />
        ) : (
          <Target className={`w-12 h-12 ${getScoreColor()}`} />
        )}
      </div>

      {/* Status */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {passed ? 'Exercise Completed!' : 'Exercise Finished'}
        </h2>
        <p className="text-gray-600">{getMessage()}</p>
      </div>

      {/* Score display */}
      <div className={`inline-block px-8 py-4 rounded-2xl ${getScoreBg()}`}>
        <div className={`text-5xl font-bold ${getScoreColor()}`}>
          {percentage}%
        </div>
        <div className="text-gray-600 mt-1">
          {score} / {maxScore} points
        </div>
      </div>

      {/* Pass/Fail indicator */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
        passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {passed ? (
          <>
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Passed</span>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5" />
            <span className="font-medium">Score below {passingScore}%</span>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-gray-400 text-sm uppercase mb-1">Time Spent</div>
          <div className="flex items-center gap-1.5 text-gray-900 font-medium">
            <Clock className="w-4 h-4" />
            {formatTime(timeSpent)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 text-sm uppercase mb-1">Passing Score</div>
          <div className="text-gray-900 font-medium">{passingScore}%</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default ExerciseResult
