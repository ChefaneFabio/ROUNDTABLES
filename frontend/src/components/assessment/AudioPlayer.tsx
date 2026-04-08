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

  const handleStop = () => {
    if (!useFallback && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsPlaying(false)
    setPlayCount(c => c + 1)
    onPlayComplete?.()
  }

  const handlePlayStop = () => {
    if (isPlaying) {
      handleStop()
      return
    }

    if (!canPlay) return

    if (!useFallback && audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    } else if (ttsScript && 'speechSynthesis' in window) {
      // Client-side TTS fallback — try to pick a voice matching the language
      const langCode = language === 'Italian' ? 'it' :
                       language === 'Spanish' ? 'es' :
                       language === 'French' ? 'fr' :
                       language === 'German' ? 'de' : 'en'
      const voices = window.speechSynthesis.getVoices()
      const langVoices = voices.filter(v => v.lang.startsWith(langCode))

      const utterance = new SpeechSynthesisUtterance(ttsScript)
      utterance.lang = `${langCode}-${langCode === 'en' ? 'US' : langCode.toUpperCase()}`
      // Pick a random voice from available ones for variety
      if (langVoices.length > 0) {
        utterance.voice = langVoices[Math.floor(Math.random() * langVoices.length)]
      }
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
          onClick={handlePlayStop}
          disabled={!canPlay && !isPlaying}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all
            ${isPlaying ? 'bg-red-500 text-white hover:bg-red-600' :
              canPlay ? 'bg-blue-500 text-white hover:bg-blue-600' :
              'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="1" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">
            {isPlaying ? 'Playing... click to stop' : canPlay ? 'Click to play audio' : 'No more plays available'}
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
