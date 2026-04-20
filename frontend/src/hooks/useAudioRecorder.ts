import { useState, useRef, useCallback, useEffect } from 'react'

interface UseAudioRecorderReturn {
  isRecording: boolean
  isPaused: boolean
  audioBlob: Blob | null
  audioUrl: string | null
  duration: number
  transcript: string
  startRecording: (language?: string, options?: { maxDurationSeconds?: number }) => Promise<void>
  stopRecording: () => void
  resetRecording: () => void
  error: string | null
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const startTimeRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const recognitionRef = useRef<any>(null)

  // Cleanup on unmount: stop recording, revoke URL, clear timer
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
        recognitionRef.current = null
      }
    }
  }, [])

  const startRecording = useCallback(async (language?: string, options?: { maxDurationSeconds?: number }) => {
    try {
      setError(null)
      setTranscript('')
      chunksRef.current = []

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      })

      // Try mp4 first (best Safari support), then webm, then default
      const mimeType = MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : MediaRecorder.isTypeSupported('audio/webm')
            ? 'audio/webm'
            : ''

      const recorderOptions = mimeType ? { mimeType } : undefined
      const recorder = new MediaRecorder(stream, recorderOptions)

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach(track => track.stop())

        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
      }

      recorder.onerror = () => {
        setError('Recording error occurred')
        setIsRecording(false)
      }

      mediaRecorderRef.current = recorder
      recorder.start(100) // Collect data every 100ms
      setIsRecording(true)
      setAudioBlob(null)
      setAudioUrl(null)
      startTimeRef.current = Date.now()
      setDuration(0)

      const maxDuration = options?.maxDurationSeconds
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        setDuration(elapsed)
        if (maxDuration && elapsed >= maxDuration) {
          // Hard cap reached — stop the recording automatically.
          if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop()
          }
          if (recognitionRef.current) {
            try { recognitionRef.current.stop() } catch { /* already stopped */ }
            recognitionRef.current = null
          }
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
          setIsRecording(false)
        }
      }, 1000)

      // Start Web Speech API for live transcription
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        const langCode = language === 'Italian' ? 'it-IT' :
                         language === 'Spanish' ? 'es-ES' :
                         language === 'French' ? 'fr-FR' :
                         language === 'German' ? 'de-DE' : 'en-US'
        recognition.lang = langCode
        recognition.continuous = true
        recognition.interimResults = false

        let fullTranscript = ''
        recognition.onresult = (event: any) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              fullTranscript += event.results[i][0].transcript + ' '
              setTranscript(fullTranscript.trim())
            }
          }
        }

        recognition.onerror = () => {
          // Speech recognition not critical — continue recording without it
        }

        recognition.start()
        recognitionRef.current = recognition
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        setError('Microphone access denied. Please allow microphone access and try again.')
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone and try again.')
      } else {
        setError('Failed to start recording: ' + err.message)
      }
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
  }, [])

  const resetRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioBlob(null)
    setAudioUrl(null)
    setDuration(0)
    setTranscript('')
    setIsRecording(false)
    setIsPaused(false)
    setError(null)
    chunksRef.current = []
  }, [audioUrl])

  return {
    isRecording,
    isPaused,
    audioBlob,
    audioUrl,
    duration,
    transcript,
    startRecording,
    stopRecording,
    resetRecording,
    error
  }
}
