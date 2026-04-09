import { useEffect, useRef, useState, useCallback } from 'react'
import { assessmentApi } from '../services/assessmentApi'

interface UseTestSecurityOptions {
  assessmentId: string
  expiresAt?: string | null
  onExpired: () => void
  // Admin-configurable security settings
  blockTabSwitch?: boolean    // Detect and report tab switches
  blockCopyPaste?: boolean    // Block copy/cut/right-click
  requireFullscreen?: boolean // Force fullscreen mode during test
  warnOnLeave?: boolean       // Show "leave page?" browser warning
}

export function useTestSecurity({
  assessmentId,
  expiresAt,
  onExpired,
  blockTabSwitch = true,
  blockCopyPaste = true,
  requireFullscreen = false,
  warnOnLeave = true,
}: UseTestSecurityOptions) {
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
    if (!isTimed || !blockTabSwitch) return
    const handler = () => {
      if (document.hidden) {
        reportViolation('TAB_SWITCH', 'Student switched away from test tab')
      }
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [isTimed, blockTabSwitch, reportViolation])

  // Focus loss
  useEffect(() => {
    if (!isTimed || !blockTabSwitch) return
    const handler = () => reportViolation('FOCUS_LOSS', 'Window lost focus')
    window.addEventListener('blur', handler)
    return () => window.removeEventListener('blur', handler)
  }, [isTimed, blockTabSwitch, reportViolation])

  // beforeunload warning
  useEffect(() => {
    if (!isTimed || !warnOnLeave) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = 'Test in progress. Are you sure you want to leave?'
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isTimed, warnOnLeave])

  // Copy/cut prevention
  useEffect(() => {
    if (!isTimed || !blockCopyPaste) return
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
  }, [isTimed, blockCopyPaste, reportViolation])

  // Right-click prevention
  useEffect(() => {
    if (!isTimed || !blockCopyPaste) return
    const handler = (e: Event) => {
      e.preventDefault()
      reportViolation('RIGHT_CLICK', 'Student attempted right-click')
    }
    document.addEventListener('contextmenu', handler)
    return () => document.removeEventListener('contextmenu', handler)
  }, [isTimed, blockCopyPaste, reportViolation])

  // Fullscreen enforcement
  useEffect(() => {
    if (!isTimed || !requireFullscreen) return

    // Request fullscreen on mount
    document.documentElement.requestFullscreen?.().catch(() => {})

    const handler = () => {
      if (!document.fullscreenElement) {
        reportViolation('FULLSCREEN_EXIT', 'Student exited fullscreen mode')
        // Re-request fullscreen
        setTimeout(() => {
          document.documentElement.requestFullscreen?.().catch(() => {})
        }, 500)
      }
    }
    document.addEventListener('fullscreenchange', handler)
    return () => {
      document.removeEventListener('fullscreenchange', handler)
      // Exit fullscreen on unmount
      if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {})
      }
    }
  }, [isTimed, requireFullscreen, reportViolation])

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
