import React, { useRef, useEffect, useCallback, useState } from 'react'
import { Maximize, Minimize, RotateCcw, AlertCircle } from 'lucide-react'

interface ScormPlayerProps {
  launchUrl: string
  version: 'SCORM_12' | 'SCORM_2004'
  attemptId: string
  packageId: string
  initialData?: Record<string, string> | null
  onCommit: (cmiData: Record<string, string>) => void
  onStatusChange?: (status: string) => void
  className?: string
}

/**
 * SCORM Player — renders SCORM content in an iframe and bridges the
 * SCORM Runtime API (1.2 and 2004) between the content and our backend.
 *
 * The SCORM spec requires a JavaScript object (API for 1.2, API_1484_11 for 2004)
 * to be accessible from the iframe's parent window chain. The content calls
 * methods like LMSGetValue / GetValue to read/write CMI data.
 */
export const ScormPlayer: React.FC<ScormPlayerProps> = ({
  launchUrl,
  version,
  attemptId: _attemptId,
  packageId: _packageId,
  initialData,
  onCommit,
  onStatusChange,
  className = ''
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)

  // CMI data store — mutable ref so the API object always sees current state
  const cmiData = useRef<Record<string, string>>(initialData || {})
  const lastError = useRef<string>('0')
  const commitTimer = useRef<number | null>(null)

  // Auto-commit: batch commits every 10 seconds if there are changes
  const pendingChanges = useRef(false)
  // Stable ref so the timer never needs to be recreated when onCommit changes
  const onCommitRef = useRef(onCommit)
  onCommitRef.current = onCommit

  const doCommit = useCallback(() => {
    if (pendingChanges.current) {
      pendingChanges.current = false
      onCommitRef.current({ ...cmiData.current })
    }
  }, [])

  useEffect(() => {
    commitTimer.current = window.setInterval(doCommit, 10000)
    return () => {
      if (commitTimer.current) clearInterval(commitTimer.current)
      // Final commit on unmount
      doCommit()
    }
  }, [doCommit])

  // ─── SCORM 1.2 API ──────────────────────────────────────────
  const scorm12API = useCallback(() => ({
    LMSInitialize: (_param: string): string => {
      setIsInitialized(true)
      lastError.current = '0'
      return 'true'
    },
    LMSFinish: (_param: string): string => {
      doCommit()
      lastError.current = '0'
      return 'true'
    },
    LMSGetValue: (key: string): string => {
      lastError.current = '0'
      return cmiData.current[key] || ''
    },
    LMSSetValue: (key: string, value: string): string => {
      lastError.current = '0'
      cmiData.current[key] = value
      pendingChanges.current = true

      // Track status changes
      if (key === 'cmi.core.lesson_status' && onStatusChange) {
        onStatusChange(value)
      }
      return 'true'
    },
    LMSCommit: (_param: string): string => {
      doCommit()
      lastError.current = '0'
      return 'true'
    },
    LMSGetLastError: (): string => lastError.current,
    LMSGetErrorString: (code: string): string => {
      const errors: Record<string, string> = {
        '0': 'No Error',
        '101': 'General Exception',
        '201': 'Invalid argument error',
        '202': 'Element cannot have children',
        '203': 'Element not an array',
        '301': 'Not initialized',
        '401': 'Not implemented error',
        '402': 'Invalid set value',
        '403': 'Element is read only',
        '404': 'Element is write only'
      }
      return errors[code] || 'Unknown Error'
    },
    LMSGetDiagnostic: (_code: string): string => ''
  }), [doCommit, onStatusChange])

  // ─── SCORM 2004 API ─────────────────────────────────────────
  const scorm2004API = useCallback(() => ({
    Initialize: (_param: string): string => {
      setIsInitialized(true)
      lastError.current = '0'
      return 'true'
    },
    Terminate: (_param: string): string => {
      doCommit()
      lastError.current = '0'
      return 'true'
    },
    GetValue: (key: string): string => {
      lastError.current = '0'
      // Return version info
      if (key === 'cmi._version') return '1.0'
      return cmiData.current[key] || ''
    },
    SetValue: (key: string, value: string): string => {
      lastError.current = '0'
      cmiData.current[key] = value
      pendingChanges.current = true

      if ((key === 'cmi.completion_status' || key === 'cmi.success_status') && onStatusChange) {
        onStatusChange(value)
      }
      return 'true'
    },
    Commit: (_param: string): string => {
      doCommit()
      lastError.current = '0'
      return 'true'
    },
    GetLastError: (): string => lastError.current,
    GetErrorString: (code: string): string => {
      const errors: Record<string, string> = {
        '0': 'No Error',
        '101': 'General Exception',
        '102': 'General Initialization Failure',
        '103': 'Already Initialized',
        '104': 'Content Instance Terminated',
        '111': 'General Termination Failure',
        '112': 'Termination Before Initialization',
        '113': 'Termination After Termination',
        '122': 'Retrieve Data Before Initialization',
        '123': 'Retrieve Data After Termination',
        '132': 'Store Data Before Initialization',
        '133': 'Store Data After Termination',
        '142': 'Commit Before Initialization',
        '143': 'Commit After Termination',
        '201': 'General Argument Error',
        '301': 'General Get Failure',
        '351': 'General Set Failure',
        '391': 'General Commit Failure',
        '401': 'Undefined Data Model Element',
        '402': 'Unimplemented Data Model Element',
        '403': 'Data Model Element Value Not Initialized',
        '404': 'Data Model Element Is Read Only',
        '405': 'Data Model Element Is Write Only',
        '406': 'Data Model Element Type Mismatch',
        '407': 'Data Model Element Value Out Of Range',
        '408': 'Data Model Dependency Not Established'
      }
      return errors[code] || 'Unknown Error'
    },
    GetDiagnostic: (_code: string): string => ''
  }), [doCommit, onStatusChange])

  // ─── Mount API on window so iframe content can find it ──────
  useEffect(() => {
    const win = window as any

    if (version === 'SCORM_12') {
      win.API = scorm12API()
    } else {
      win.API_1484_11 = scorm2004API()
    }

    return () => {
      delete win.API
      delete win.API_1484_11
    }
  }, [version, scorm12API, scorm2004API])

  // ─── Fullscreen handling ────────────────────────────────────
  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current.requestFullscreen()
    }
  }

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const handleRestart = () => {
    if (iframeRef.current) {
      cmiData.current = {}
      pendingChanges.current = true
      doCommit()
      iframeRef.current.src = launchUrl
    }
  }

  const handleIframeError = () => {
    setError('Failed to load SCORM content. The package may be corrupted.')
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 uppercase">
            {version === 'SCORM_12' ? 'SCORM 1.2' : 'SCORM 2004'}
          </span>
          {isInitialized && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Connected
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            className="p-1.5 text-gray-500 hover:text-gray-700 rounded transition-colors"
            title="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-gray-500 hover:text-gray-700 rounded transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="text-center p-8">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* SCORM content iframe */}
      <iframe
        ref={iframeRef}
        src={launchUrl}
        className="w-full border-0"
        style={{ height: isFullscreen ? 'calc(100vh - 44px)' : '680px' }}
        title="SCORM Content"
        sandbox="allow-scripts allow-same-origin allow-forms"
        onError={handleIframeError}
      />
    </div>
  )
}

export default ScormPlayer
