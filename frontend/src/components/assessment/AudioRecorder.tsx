import { useAudioRecorder } from '../../hooks/useAudioRecorder'

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob, duration: number, transcript: string) => void
  maxAttempts?: number
  currentAttempt?: number
  disabled?: boolean
  language?: string
  maxDurationSeconds?: number
  suggestedDurationSeconds?: number
}

export function AudioRecorder({
  onRecordingComplete,
  maxAttempts = 2,
  currentAttempt = 0,
  disabled,
  language,
  maxDurationSeconds,
  suggestedDurationSeconds,
}: AudioRecorderProps) {
  const { isRecording, audioBlob, audioUrl, duration, transcript, startRecording, stopRecording, resetRecording, error } = useAudioRecorder()

  const canRecord = currentAttempt < maxAttempts && !disabled

  const handleSubmit = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob, duration, transcript)
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Time guidance shown before recording */}
      {!isRecording && !audioUrl && (suggestedDurationSeconds || maxDurationSeconds) && (
        <div className="text-xs text-gray-600 flex items-center gap-3">
          {suggestedDurationSeconds && (
            <span>Suggested length: <strong>~{formatTime(suggestedDurationSeconds)}</strong></span>
          )}
          {maxDurationSeconds && (
            <span className="text-gray-400">Max: {formatTime(maxDurationSeconds)} (auto-stops)</span>
          )}
        </div>
      )}

      {/* Recording controls */}
      <div className="flex items-center gap-4">
        {!isRecording && !audioUrl && (
          <button
            onClick={() => startRecording(language, maxDurationSeconds ? { maxDurationSeconds } : undefined)}
            disabled={!canRecord}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <div className="w-3 h-3 bg-white rounded-full" />
            Start Recording
          </button>
        )}

        {isRecording && (() => {
          const remaining = maxDurationSeconds ? Math.max(0, maxDurationSeconds - duration) : null
          const nearCap = remaining !== null && remaining <= 10
          return (
            <>
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <div className="w-3 h-3 bg-red-500 rounded-sm" />
                Stop
              </button>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className={`text-sm font-mono font-medium ${nearCap ? 'text-red-600' : 'text-gray-700'}`}>
                  {formatTime(duration)}
                  {maxDurationSeconds ? ` / ${formatTime(maxDurationSeconds)}` : ''}
                </span>
                {remaining !== null && remaining <= 10 && (
                  <span className="text-xs font-medium text-red-600">{remaining}s left</span>
                )}
              </div>
            </>
          )
        })()}

        {audioUrl && !isRecording && (
          <div className="flex items-center gap-3 flex-1">
            <audio controls src={audioUrl} className="flex-1 h-10" />
            <span className="text-sm text-gray-500">{formatTime(duration)}</span>
          </div>
        )}
      </div>

      {/* Live transcript preview */}
      {(isRecording || transcript) && (
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Transcript {isRecording ? '(live)' : ''}</p>
          <p className="text-sm text-gray-700 italic">
            {transcript || (isRecording ? 'Listening...' : 'No transcript captured')}
          </p>
        </div>
      )}

      {/* Action buttons */}
      {audioUrl && !isRecording && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Recording
          </button>
          {canRecord && (
            <button
              onClick={resetRecording}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Re-record ({maxAttempts - currentAttempt - 1} attempt{maxAttempts - currentAttempt - 1 !== 1 ? 's' : ''} left)
            </button>
          )}
        </div>
      )}

      {/* Attempt counter */}
      <p className="text-xs text-gray-500">
        Attempt {currentAttempt + 1} of {maxAttempts}
      </p>
    </div>
  )
}
