import React from 'react'

interface TranscriptDisplayProps {
  transcript: string
  interimTranscript?: string
  targetText?: string
  placeholder?: string
  className?: string
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  interimTranscript = '',
  targetText,
  placeholder = 'Start speaking...',
  className = ''
}) => {
  const displayText = transcript + interimTranscript
  const hasContent = displayText.length > 0

  return (
    <div className={`relative ${className}`}>
      {targetText && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-600 font-medium mb-1">Say this:</p>
          <p className="text-lg text-blue-900">{targetText}</p>
        </div>
      )}

      <div className="p-4 bg-white rounded-lg border border-gray-200 min-h-[120px]">
        <p className="text-sm text-gray-500 font-medium mb-2">Your speech:</p>
        <div className="text-lg">
          {hasContent ? (
            <>
              <span className="text-gray-900">{transcript}</span>
              {interimTranscript && (
                <span className="text-gray-400 italic">{interimTranscript}</span>
              )}
            </>
          ) : (
            <span className="text-gray-400 italic">{placeholder}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default TranscriptDisplay
