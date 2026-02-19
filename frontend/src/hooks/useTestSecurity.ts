import { useEffect, useRef, useState, useCallback } from 'react'
import { assessmentApi } from '../services/assessmentApi'

interface UseTestSecurityOptions {
  assessmentId: string
  expiresAt?: string | null
  onExpired: () => void
}

export function useTestSecurity({ assessmentId, expiresAt, onExpired }: UseTestSecurityOptions) {
  const [violationCount, setViolationCount] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null)
  const onExpiredRef = useRef(onExpired)
  const expiredFiredRef = useRef(false)

  onExpiredRef.current = onExpired

  const isTimed = !!expiresAt

  const reportViolation = useCallback((type: string, details?: string) => {
    setViolationCount(c => c + 1)
    assessmentApi.reportViolation(assessmentId, {
      type,
      timestamp: new Date().toISOString(),
      details
    }).catch(() => {}) // fire-and-forget
  }, [assessmentId])

  // Countdown timer
  useEffect(() => {
    if (!isTimed || !expiresAt) return

    const calcRemaining = () => {
      const ms = new Date(expiresAt).getTime() - Date.now()
      return Math.max(0, Math.ceil(ms / 1000))
    }

    setRemainingSeconds(calcRemaining())

    const interval = setInterval(() => {
      const secs = calcRemaining()
      setRemainingSeconds(secs)
      if (secs <= 0 && !expiredFiredRef.current) {
        expiredFiredRef.current = true
        onExpiredRef.current()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimed, expiresAt])

  // Tab switch detection
  useEffect(() => {
    if (!isTimed) return
    const handler = () => {
      if (document.hidden) {
        reportViolation('TAB_SWITCH', 'Student switched away from test tab')
      }
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [isTimed, reportViolation])

  // Focus loss
  useEffect(() => {
    if (!isTimed) return
    const handler = () => reportViolation('FOCUS_LOSS', 'Window lost focus')
    window.addEventListener('blur', handler)
    return () => window.removeEventListener('blur', handler)
  }, [isTimed, reportViolation])

  // beforeunload
  useEffect(() => {
    if (!isTimed) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = 'Test in progress. Are you sure you want to leave?'
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isTimed])

  // Copy/cut prevention
  useEffect(() => {
    if (!isTimed) return
    const handleCopy = (e: Event) => {
      e.preventDefault()
      reportViolation('COPY_ATTEMPT', 'Student attempted to copy content')
    }
    const handleCut = (e: Event) => {
      e.preventDefault()
      reportViolation('CUT_ATTEMPT', 'Student attempted to cut content')
    }
    document.addEventListener('copy', handleCopy)
    document.addEventListener('cut', handleCut)
    return () => {
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('cut', handleCut)
    }
  }, [isTimed, reportViolation])

  // Right-click prevention
  useEffect(() => {
    if (!isTimed) return
    const handler = (e: Event) => {
      e.preventDefault()
      reportViolation('RIGHT_CLICK', 'Student attempted right-click')
    }
    document.addEventListener('contextmenu', handler)
    return () => document.removeEventListener('contextmenu', handler)
  }, [isTimed, reportViolation])

  // Fullscreen exit detection
  useEffect(() => {
    if (!isTimed) return
    const handler = () => {
      if (!document.fullscreenElement) {
        reportViolation('FULLSCREEN_EXIT', 'Student exited fullscreen mode')
      }
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [isTimed, reportViolation])

  const requestFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {})
  }, [])

  return {
    violationCount,
    remainingSeconds,
    requestFullscreen,
    isTimed
  }
}
