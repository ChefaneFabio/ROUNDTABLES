import { useEffect, useRef, useState, useCallback } from 'react'
import { assessmentApi } from '../services/assessmentApi'

interface UseTestSecurityOptions {
  assessmentId: string
  expiresAt?: string | null
  onExpired: () => void
  blockTabSwitch?: boolean
  blockCopyPaste?: boolean
  requireFullscreen?: boolean
  warnOnLeave?: boolean
  maxViolations?: number       // Auto-submit after this many violations (0 = unlimited)
  onMaxViolations?: () => void // Called when max violations reached
}

export function useTestSecurity({
  assessmentId,
  expiresAt,
  onExpired,
  blockTabSwitch = true,
  blockCopyPaste = true,
  requireFullscreen = false,
  warnOnLeave = true,
  maxViolations = 0,
  onMaxViolations,
}: UseTestSecurityOptions) {
  const [violationCount, setViolationCount] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const onExpiredRef = useRef(onExpired)
  const expiredFiredRef = useRef(false)
  const maxViolationsTriggered = useRef(false)

  onExpiredRef.current = onExpired

  const isTimed = !!expiresAt

  const reportViolation = useCallback((type: string, details?: string) => {
    setViolationCount(c => {
      const next = c + 1
      if (maxViolations > 0 && next >= maxViolations && !maxViolationsTriggered.current) {
        maxViolationsTriggered.current = true
        onMaxViolations?.()
      }
      return next
    })
    assessmentApi.reportViolation(assessmentId, {
      type,
      timestamp: new Date().toISOString(),
      details
    }).catch(() => {})
  }, [assessmentId, maxViolations, onMaxViolations])

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

  // Tab switch detection — show warning overlay when returning
  useEffect(() => {
    if (!isTimed || !blockTabSwitch) return
    const handler = () => {
      if (document.hidden) {
        reportViolation('TAB_SWITCH', 'Student switched away from test tab')
      } else {
        // Student returned — show warning
        setShowWarning(true)
      }
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [isTimed, blockTabSwitch, reportViolation])

  // Focus loss — only show warning, don't count as separate violation
  // (visibilitychange already fires on tab switch, so counting blur too would double-count)
  useEffect(() => {
    if (!isTimed || !blockTabSwitch) return
    const handler = () => {
      // Only warn if the tab didn't also become hidden (avoids double-counting with visibilitychange)
      if (!document.hidden) {
        setShowWarning(true)
      }
    }
    window.addEventListener('blur', handler)
    return () => window.removeEventListener('blur', handler)
  }, [isTimed, blockTabSwitch])

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

    document.documentElement.requestFullscreen?.().catch(() => {})

    const handler = () => {
      if (!document.fullscreenElement) {
        reportViolation('FULLSCREEN_EXIT', 'Student exited fullscreen mode')
        setTimeout(() => {
          document.documentElement.requestFullscreen?.().catch(() => {})
        }, 500)
      }
    }
    document.addEventListener('fullscreenchange', handler)
    return () => {
      document.removeEventListener('fullscreenchange', handler)
      if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {})
      }
    }
  }, [isTimed, requireFullscreen, reportViolation])

  const dismissWarning = useCallback(() => {
    setShowWarning(false)
  }, [])

  const requestFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {})
  }, [])

  return {
    violationCount,
    remainingSeconds,
    requestFullscreen,
    isTimed,
    showWarning,
    dismissWarning
  }
}
