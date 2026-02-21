import { useAudioRecorder } from '../../hooks/useAudioRecorder'

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob, duration: number) => void
  maxAttempts?: number
  currentAttempt?: number
  disabled?: boolean
}

export function AudioRecorder({ onRecordingComplete, maxAttempts = 2, currentAttempt = 0, disabled }: AudioRecorderProps) {
  const { isRecording, audioBlob, audioUrl, duration, startRecording, stopRecording, resetRecording, error } = useAudioRecorder()

  const canRecord = currentAttempt < maxAttempts && !disabled

  const handleSubmit = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob, duration)
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

      {/* Recording controls */}
      <div className="flex items-center gap-4">
        {!isRecording && !audioUrl && (
          <button
            onClick={startRecording}
            disabled={!canRecord}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <div className="w-3 h-3 bg-white rounded-full" />
            Start Recording
          </button>
        )}

        {isRecording && (
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
              <span className="text-sm font-mono font-medium text-gray-700">{formatTime(duration)}</span>
            </div>
          </>
        )}

        {audioUrl && !isRecording && (
          <div className="flex items-center gap-3 flex-1">
            <audio controls src={audioUrl} className="flex-1 h-10" />
            <span className="text-sm text-gray-500">{formatTime(duration)}</span>
          </div>
        )}
      </div>

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
