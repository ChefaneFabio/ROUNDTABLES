import React from 'react'
import { Clock, CheckCircle } from 'lucide-react'

interface ExerciseProgressProps {
  currentItem: number
  totalItems: number
  answeredItems: number
  timeLimit?: number
  elapsedTime?: number
  className?: string
}

export const ExerciseProgress: React.FC<ExerciseProgressProps> = ({
  currentItem,
  totalItems,
  answeredItems,
  timeLimit,
  elapsedTime = 0,
  className = ''
}) => {
  const progress = totalItems > 0 ? (answeredItems / totalItems) * 100 : 0
  const remainingTime = timeLimit ? Math.max(0, timeLimit - elapsedTime) : null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const isTimeRunningOut = remainingTime !== null && remainingTime < 60

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Progress bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4" />
          <span>{answeredItems}/{totalItems}</span>
        </div>
      </div>

      {/* Question indicator and timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalItems }, (_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < answeredItems
                  ? 'bg-green-500'
                  : i === currentItem
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {remainingTime !== null && (
          <div className={`flex items-center gap-1.5 text-sm font-medium ${
            isTimeRunningOut ? 'text-red-600' : 'text-gray-600'
          }`}>
            <Clock className={`w-4 h-4 ${isTimeRunningOut ? 'animate-pulse' : ''}`} />
            <span>{formatTime(remainingTime)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExerciseProgress
