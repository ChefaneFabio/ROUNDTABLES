import React from 'react'
import { CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react'

interface WordFeedback {
  word: string
  status: 'correct' | 'incorrect' | 'missing' | 'extra'
  recognized?: string
}

interface PronunciationFeedbackProps {
  accuracyScore: number
  fluencyScore: number
  wordFeedback: WordFeedback[]
  overallFeedback: string
  suggestions: string[]
  className?: string
}

export const PronunciationFeedback: React.FC<PronunciationFeedbackProps> = ({
  accuracyScore,
  fluencyScore,
  wordFeedback,
  overallFeedback,
  suggestions,
  className = ''
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getWordStatusStyle = (status: WordFeedback['status']) => {
    switch (status) {
      case 'correct':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'incorrect':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'missing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 line-through'
      case 'extra':
        return 'bg-gray-100 text-gray-600 border-gray-200 italic'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const avgScore = Math.round((accuracyScore + fluencyScore) / 2)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Score Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg ${getScoreBgColor(accuracyScore)} text-center`}>
          <div className={`text-3xl font-bold ${getScoreColor(accuracyScore)}`}>
            {accuracyScore}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Accuracy</div>
        </div>
        <div className={`p-4 rounded-lg ${getScoreBgColor(fluencyScore)} text-center`}>
          <div className={`text-3xl font-bold ${getScoreColor(fluencyScore)}`}>
            {fluencyScore}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Fluency</div>
        </div>
        <div className={`p-4 rounded-lg ${getScoreBgColor(avgScore)} text-center`}>
          <div className={`text-3xl font-bold ${getScoreColor(avgScore)}`}>
            {avgScore}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Overall</div>
        </div>
      </div>

      {/* Overall Feedback */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          {avgScore >= 70 ? (
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : avgScore >= 50 ? (
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          ) : (
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-gray-700">{overallFeedback}</p>
        </div>
      </div>

      {/* Word-by-Word Feedback */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Word Analysis</h4>
        <div className="flex flex-wrap gap-2">
          {wordFeedback.map((word, index) => (
            <div
              key={index}
              className={`px-3 py-1.5 rounded-lg border text-sm ${getWordStatusStyle(word.status)}`}
              title={
                word.status === 'incorrect' && word.recognized
                  ? `You said: "${word.recognized}"`
                  : word.status === 'missing'
                    ? 'Word was not spoken'
                    : word.status === 'extra'
                      ? 'Extra word detected'
                      : 'Correctly pronounced'
              }
            >
              {word.word}
              {word.status === 'correct' && (
                <CheckCircle className="w-3 h-3 ml-1 inline" />
              )}
              {word.status === 'incorrect' && (
                <XCircle className="w-3 h-3 ml-1 inline" />
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-100 border border-green-200"></span>
            Correct
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-100 border border-red-200"></span>
            Incorrect
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200"></span>
            Missing
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-gray-100 border border-gray-200"></span>
            Extra
          </span>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Tips for Improvement</h4>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-blue-500 mt-0.5">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PronunciationFeedback
