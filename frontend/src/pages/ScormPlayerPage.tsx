import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Package, Clock, Award, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { scormApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { ScormPlayer } from '../components/scorm/ScormPlayer'

const ScormPlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  useAuth()
  const [packageInfo, setPackageInfo] = useState<any>(null)
  const [launchInfo, setLaunchInfo] = useState<any>(null)
  const [attempt, setAttempt] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentStatus, setCurrentStatus] = useState<string>('')

  useEffect(() => {
    if (id) loadScorm(id)
  }, [id])

  const loadScorm = async (packageId: string) => {
    setIsLoading(true)
    setError('')
    try {
      const [pkg, launch, att] = await Promise.all([
        scormApi.getById(packageId),
        scormApi.getLaunchInfo(packageId),
        scormApi.getAttempt(packageId)
      ])
      setPackageInfo(pkg)
      setLaunchInfo(launch)
      setAttempt(att)
      setCurrentStatus(att.status || 'NOT_ATTEMPTED')
    } catch (err: any) {
      setError(err.message || 'Failed to load SCORM package')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCommit = useCallback(async (cmiData: Record<string, string>) => {
    if (!id || !attempt) return
    try {
      const updated = await scormApi.saveRuntime(id, attempt.id, cmiData)
      setAttempt(updated)
      if (updated.status) setCurrentStatus(updated.status)
    } catch (err) {
      console.error('Failed to save SCORM data:', err)
    }
  }, [id, attempt])

  const handleStatusChange = useCallback((status: string) => {
    setCurrentStatus(status)
  }, [])

  const getStatusBadge = () => {
    const badges: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
      NOT_ATTEMPTED: { color: 'bg-gray-100 text-gray-600', icon: <Clock className="w-3.5 h-3.5" />, label: 'Not Started' },
      INCOMPLETE: { color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-3.5 h-3.5" />, label: 'In Progress' },
      COMPLETED: { color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3.5 h-3.5" />, label: 'Completed' },
      PASSED: { color: 'bg-green-100 text-green-700', icon: <Award className="w-3.5 h-3.5" />, label: 'Passed' },
      FAILED: { color: 'bg-red-100 text-red-700', icon: <XCircle className="w-3.5 h-3.5" />, label: 'Failed' },
      // SCORM raw values
      completed: { color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3.5 h-3.5" />, label: 'Completed' },
      passed: { color: 'bg-green-100 text-green-700', icon: <Award className="w-3.5 h-3.5" />, label: 'Passed' },
      failed: { color: 'bg-red-100 text-red-700', icon: <XCircle className="w-3.5 h-3.5" />, label: 'Failed' },
      incomplete: { color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-3.5 h-3.5" />, label: 'In Progress' }
    }
    const badge = badges[currentStatus] || badges.NOT_ATTEMPTED
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.icon}
        {badge.label}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded w-2/3" />
          <div className="h-[680px] bg-gray-200 rounded-lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!packageInfo || !launchInfo || !attempt) return null

  // Build full launch URL
  const apiBase = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'
  const fullLaunchUrl = `${apiBase}${launchInfo.launchUrl}`

  const isFinished = ['COMPLETED', 'PASSED', 'FAILED'].includes(currentStatus)

  const handleRetry = async () => {
    if (!id) return
    try {
      const newAttempt = await scormApi.retry(id)
      setAttempt(newAttempt)
      setCurrentStatus('NOT_ATTEMPTED')
    } catch (err: any) {
      console.error('Retry failed:', err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      {/* Header */}
      <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Package className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{packageInfo.title}</h1>
            {packageInfo.description && (
              <p className="text-sm text-gray-500 mt-1">{packageInfo.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {attempt.score !== null && attempt.score !== undefined && (
            <span className="text-sm font-medium text-gray-700">
              Score: {attempt.score}%
            </span>
          )}
          {getStatusBadge()}
          {isFinished && (
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry
            </button>
          )}
        </div>
      </div>

      {/* Player */}
      <ScormPlayer
        launchUrl={fullLaunchUrl}
        version={launchInfo.version}
        attemptId={attempt.id}
        packageId={packageInfo.id}
        initialData={attempt.runtimeData}
        onCommit={handleCommit}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}

export default ScormPlayerPage
