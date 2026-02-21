import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, CheckCircle, BarChart2, Clock } from 'lucide-react'
import { exerciseApi, Exercise } from '../../services/exerciseApi'

const ExerciseStatsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [stats, setStats] = useState<{
    attemptCount: number
    completedCount: number
    completionRate: number
    avgScore: number
    avgTimeSpent: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) loadData(id)
  }, [id])

  const loadData = async (exerciseId: string) => {
    setIsLoading(true)
    try {
      const [ex, st] = await Promise.all([
        exerciseApi.getExercise(exerciseId),
        exerciseApi.getExerciseStats(exerciseId),
      ])
      setExercise(ex)
      setStats(st)
    } catch (err) {
      console.error('Failed to load stats:', err)
      setError('Failed to load exercise statistics')
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds) return '0s'
    const mins = Math.floor(seconds / 60)
    const secs = Math.round(seconds % 60)
    if (mins === 0) return `${secs}s`
    return `${mins}m ${secs}s`
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/exercises')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exercise Statistics</h1>
          {exercise && (
            <p className="text-gray-600">{exercise.title}</p>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Attempts</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.attemptCount}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Completion</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round(stats.completionRate)}%
            </p>
            <p className="text-sm text-gray-500">{stats.completedCount} completed</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart2 className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Avg Score</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round(stats.avgScore)}%
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Avg Time</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {formatTime(stats.avgTimeSpent)}
            </p>
          </div>
        </div>
      )}

      {/* Exercise Info */}
      {exercise && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Exercise Info</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Type</dt>
              <dd className="font-medium text-gray-900">{exercise.type.replace('_', ' ')}</dd>
            </div>
            <div>
              <dt className="text-gray-500">CEFR Level</dt>
              <dd className="font-medium text-gray-900">{exercise.cefrLevel || '-'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Questions</dt>
              <dd className="font-medium text-gray-900">{exercise._count?.items || exercise.items?.length || 0}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Passing Score</dt>
              <dd className="font-medium text-gray-900">{exercise.passingScore}%</dd>
            </div>
            <div>
              <dt className="text-gray-500">Status</dt>
              <dd className="font-medium text-gray-900">{exercise.isPublished ? 'Published' : 'Draft'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Time Limit</dt>
              <dd className="font-medium text-gray-900">{exercise.timeLimit ? `${exercise.timeLimit}s` : 'None'}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}

export default ExerciseStatsPage
