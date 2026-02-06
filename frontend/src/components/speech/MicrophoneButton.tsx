import React from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'

interface MicrophoneButtonProps {
  isListening: boolean
  isProcessing?: boolean
  disabled?: boolean
  onStart: () => void
  onStop: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isListening,
  isProcessing = false,
  disabled = false,
  onStart,
  onStop,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  }

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36
  }

  const handleClick = () => {
    if (disabled) return
    if (isListening) {
      onStop()
    } else {
      onStart()
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isProcessing}
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex items-center justify-center
        transition-all duration-300
        focus:outline-none focus:ring-4
        ${disabled || isProcessing
          ? 'bg-gray-300 cursor-not-allowed'
          : isListening
            ? 'bg-red-500 hover:bg-red-600 focus:ring-red-200 animate-pulse'
            : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-200'
        }
        ${className}
      `}
      aria-label={isListening ? 'Stop recording' : 'Start recording'}
    >
      {isProcessing ? (
        <Loader2
          size={iconSizes[size]}
          className="text-white animate-spin"
        />
      ) : isListening ? (
        <MicOff size={iconSizes[size]} className="text-white" />
      ) : (
        <Mic size={iconSizes[size]} className="text-white" />
      )}
    </button>
  )
}

export default MicrophoneButton
