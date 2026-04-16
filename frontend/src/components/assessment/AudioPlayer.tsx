import { useState, useRef, useEffect } from 'react'

const LANG_CODES: Record<string, string> = {
  English: 'en-US', Italian: 'it-IT', Spanish: 'es-ES', French: 'fr-FR', German: 'de-DE'
}

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
  const [audioError, setAudioError] = useState(false)
  const [useBrowserTts, setUseBrowserTts] = useState(false)

  const canPlay = playCount < maxPlays && (!!src || useBrowserTts) && (!audioError || useBrowserTts)

  // When src is null or errors out, fall back to browser TTS if ttsScript available
  useEffect(() => {
    if ((!src && ttsScript) || (audioError && ttsScript)) {
      setUseBrowserTts(true)
    }
  }, [src, audioError, ttsScript])

  // Stop audio when question changes or component unmounts
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    window.speechSynthesis?.cancel()
    setPlayCount(0)
    setIsPlaying(false)
    setAudioError(false)
    setUseBrowserTts(!src && !!ttsScript)

    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      window.speechSynthesis?.cancel()
    }
  }, [src, ttsScript])

  const handleStop = () => {
    if (useBrowserTts) {
      window.speechSynthesis?.cancel()
    } else if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
    setPlayCount(c => c + 1)
    onPlayComplete?.()
  }

  const playBrowserTts = () => {
    if (!ttsScript || !window.speechSynthesis) return

    const utterance = new SpeechSynthesisUtterance(ttsScript)
    utterance.lang = LANG_CODES[language || 'English'] || 'en-US'
    utterance.rate = 0.9
    utterance.onend = () => {
      setIsPlaying(false)
      setPlayCount(c => c + 1)
      onPlayComplete?.()
    }
    utterance.onerror = () => {
      setIsPlaying(false)
      setPlayCount(c => c + 1)
    }
    window.speechSynthesis.speak(utterance)
    setIsPlaying(true)
  }

  const handlePlayStop = () => {
    if (isPlaying) {
      handleStop()
      return
    }

    if (!canPlay) return

    if (useBrowserTts) {
      playBrowserTts()
    } else if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // File failed to play — fall back to browser TTS
        if (ttsScript) {
          setUseBrowserTts(true)
          playBrowserTts()
        }
      })
      setIsPlaying(true)
    }
  }

  const handleAudioEnd = () => {
    setIsPlaying(false)
    setPlayCount(c => c + 1)
    onPlayComplete?.()
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      {src && !useBrowserTts && (
        <audio
          ref={audioRef}
          src={src}
          onEnded={handleAudioEnd}
          onError={() => setAudioError(true)}
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
            {!src && !ttsScript ? 'Audio unavailable' :
             isPlaying ? 'Playing... click to stop' :
             canPlay ? 'Click to play audio' : 'No more plays available'}
          </p>
          <p className="text-xs text-gray-500">
            Plays: {playCount}/{maxPlays}
          </p>
        </div>
      </div>
    </div>
  )
}
