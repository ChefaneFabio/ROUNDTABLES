import React, { useRef, useEffect, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings } from 'lucide-react'

interface VideoPlayerProps {
  url: string
  title?: string
  onProgress?: (watchedSeconds: number, totalSeconds: number) => void
  onComplete?: () => void
  initialProgress?: number
  subtitlesUrl?: string
  className?: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  onProgress,
  onComplete,
  initialProgress = 0,
  subtitlesUrl,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressInterval = useRef<number | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)

  // Format time (seconds to mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      // Resume from initial progress
      if (initialProgress > 0) {
        videoRef.current.currentTime = initialProgress
      }
    }
  }

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  // Report progress periodically
  useEffect(() => {
    if (isPlaying && onProgress) {
      progressInterval.current = window.setInterval(() => {
        if (videoRef.current) {
          onProgress(
            Math.floor(videoRef.current.currentTime),
            Math.floor(videoRef.current.duration)
          )
        }
      }, 5000) // Report every 5 seconds
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying, onProgress])

  // Handle video end
  const handleEnded = () => {
    setIsPlaying(false)
    if (onProgress && videoRef.current) {
      onProgress(
        Math.floor(videoRef.current.duration),
        Math.floor(videoRef.current.duration)
      )
    }
    if (onComplete) {
      onComplete()
    }
  }

  // Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Mute/Unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  // Fullscreen
  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        containerRef.current.requestFullscreen()
      }
    }
  }

  // Restart
  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }

  // Change playback rate
  const cyclePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2]
    const currentIndex = rates.indexOf(playbackRate)
    const nextRate = rates[(currentIndex + 1) % rates.length]
    setPlaybackRate(nextRate)
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate
    }
  }

  // Auto-hide controls
  useEffect(() => {
    let timeout: number
    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)
      if (isPlaying) {
        timeout = window.setTimeout(() => setShowControls(false), 3000)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      clearTimeout(timeout)
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isPlaying])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
    >
      <video
        ref={videoRef}
        src={url}
        className="w-full aspect-video"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onClick={togglePlay}
      >
        {subtitlesUrl && (
          <track kind="subtitles" src={subtitlesUrl} default />
        )}
      </video>

      {/* Controls overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <div className="mb-3">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
            style={{
              background: `linear-gradient(to right, #3b82f6 ${progress}%, #4b5563 ${progress}%)`
            }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-2 text-white hover:text-blue-400 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            {/* Restart */}
            <button
              onClick={handleRestart}
              className="p-2 text-white hover:text-blue-400 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Volume */}
            <button
              onClick={toggleMute}
              className="p-2 text-white hover:text-blue-400 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            {/* Time display */}
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Playback speed */}
            <button
              onClick={cyclePlaybackRate}
              className="px-2 py-1 text-white text-sm hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <Settings className="w-4 h-4" />
              {playbackRate}x
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 text-white hover:text-blue-400 transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Title overlay */}
      {title && showControls && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4">
          <h3 className="text-white font-medium">{title}</h3>
        </div>
      )}

      {/* Center play button when paused */}
      {!isPlaying && showControls && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-600/90 flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Play className="w-10 h-10 text-white ml-1" />
        </button>
      )}
    </div>
  )
}

export default VideoPlayer
