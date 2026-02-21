import { useEffect, useState, useRef } from 'react'

interface SectionTimerProps {
  expiresAt: string
  onExpired: () => void
}

export function SectionTimer({ expiresAt, onExpired }: SectionTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const expiredFiredRef = useRef(false)
  const onExpiredRef = useRef(onExpired)
  onExpiredRef.current = onExpired

  useEffect(() => {
    expiredFiredRef.current = false

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
  }, [expiresAt])

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  const isWarning = remainingSeconds < 120 && remainingSeconds > 0
  const isCritical = remainingSeconds < 30 && remainingSeconds > 0

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold
      ${isCritical ? 'bg-red-100 text-red-700 animate-pulse' :
        isWarning ? 'bg-amber-100 text-amber-700' :
        'bg-gray-100 text-gray-700'}
    `}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  )
}
