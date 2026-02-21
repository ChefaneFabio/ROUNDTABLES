import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
  src: string | null
  ttsScript?: string
  language?: string
  maxPlays?: number
  onPlayComplete?: () => void
}

export function AudioPlayer({ src, ttsScript, language, maxPlays = 2, onPlayComplete }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playCount, setPlayCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [useFallback, setUseFallback] = useState(!src)

  const canPlay = playCount < maxPlays

  useEffect(() => {
    setPlayCount(0)
    setIsPlaying(false)
  }, [src, ttsScript])

  const handlePlay = () => {
    if (!canPlay) return

    if (!useFallback && audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    } else if (ttsScript && 'speechSynthesis' in window) {
      // Client-side TTS fallback
      const utterance = new SpeechSynthesisUtterance(ttsScript)
      utterance.lang = language === 'Italian' ? 'it-IT' :
                       language === 'Spanish' ? 'es-ES' :
                       language === 'French' ? 'fr-FR' :
                       language === 'German' ? 'de-DE' : 'en-US'
      utterance.rate = 0.9
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => {
        setIsPlaying(false)
        setPlayCount(c => c + 1)
        onPlayComplete?.()
      }
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleAudioEnd = () => {
    setIsPlaying(false)
    setPlayCount(c => c + 1)
    onPlayComplete?.()
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      {src && !useFallback && (
        <audio
          ref={audioRef}
          src={src}
          onEnded={handleAudioEnd}
          onError={() => setUseFallback(true)}
          preload="auto"
        />
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={handlePlay}
          disabled={!canPlay || isPlaying}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all
            ${isPlaying ? 'bg-blue-600 text-white animate-pulse' :
              canPlay ? 'bg-blue-500 text-white hover:bg-blue-600' :
              'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">
            {isPlaying ? 'Playing audio...' : canPlay ? 'Click to play audio' : 'No more plays available'}
          </p>
          <p className="text-xs text-gray-500">
            Plays: {playCount}/{maxPlays}
            {useFallback && ' (using browser speech)'}
          </p>
        </div>
      </div>
    </div>
  )
}
