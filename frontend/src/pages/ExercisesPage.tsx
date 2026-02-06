import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, BookOpen, Target, Clock, CheckCircle } from 'lucide-react'
import { exerciseApi, Exercise, ExerciseType } from '../services/exerciseApi'
import LevelFilter from '../components/video/LevelFilter'
import { useAuth } from '../contexts/AuthContext'

const EXERCISE_TYPE_LABELS: Record<ExerciseType, { label: string; icon: string }> = {
  MULTIPLE_CHOICE: { label: 'Multiple Choice', icon: '📝' },
  TRUE_FALSE: { label: 'True/False', icon: '✓' },
  FILL_BLANKS: { label: 'Fill in the Blanks', icon: '📋' },
  MATCHING: { label: 'Matching', icon: '🔗' },
  DRAG_DROP: { label: 'Drag & Drop', icon: '↔️' },
  REORDER: { label: 'Reorder', icon: '🔢' },
  LISTENING: { label: 'Listening', icon: '🎧' }
}

const ExercisesPage: React.FC = () => {
  const navigate = useNavigate()
  useAuth() // For authentication check

  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<ExerciseType | null>(null)
  const [stats, setStats] = useState({ totalAttempts: 0, completed: 0, avgScore: 0 })

  useEffect(() => {
    loadExercises()
    loadStats()
  }, [selectedLevel, selectedType])

  const loadExercises = async () => {
    setIsLoading(true)
    try {
      const result = await exerciseApi.getAvailableExercises({
        cefrLevel: selectedLevel || undefined,
        type: selectedType || undefined,
        page: 1,
        limit: 20
      })
      setExercises(result.exercises)
    } catch (error) {
      console.error('Failed to load exercises:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await exerciseApi.getMyStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const handleExerciseClick = (exercise: Exercise) => {
    navigate(`/exercises/${exercise.id}`)
  }

  const getAttemptStatus = (exercise: Exercise) => {
    if (!exercise.lastAttempt) return null
    if (exercise.lastAttempt.status === 'IN_PROGRESS') return 'in-progress'
    if (exercise.lastAttempt.status === 'COMPLETED') {
      return (exercise.lastAttempt.percentage || 0) >= exercise.passingScore ? 'passed' : 'failed'
    }
    return null
  }

  const filteredExercises = exercises.filter(ex =>
    !searchQuery ||
    ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Interactive Exercises</h1>
        <p className="text-gray-600">Practice with various exercise types to improve your skills</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalAttempts}</div>
              <div className="text-sm text-gray-500">Exercises Attempted</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.avgScore}%</div>
              <div className="text-sm text-gray-500">Average Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Level:</span>
          </div>
          <LevelFilter
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
          />
        </div>

        {/* Type filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedType === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Types
          </button>
          {Object.entries(EXERCISE_TYPE_LABELS).map(([type, { label, icon }]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as ExerciseType)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : filteredExercises.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No exercises found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map(exercise => {
            const typeInfo = EXERCISE_TYPE_LABELS[exercise.type]
            const status = getAttemptStatus(exercise)

            return (
              <div
                key={exercise.id}
                onClick={() => handleExerciseClick(exercise)}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-2xl mr-2">{typeInfo.icon}</span>
                    <span className="text-xs text-gray-500 uppercase">{typeInfo.label}</span>
                  </div>
                  {exercise.cefrLevel && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {exercise.cefrLevel}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {exercise.title}
                </h3>
                {exercise.description && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {exercise.description}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-gray-500">
                    <span>{exercise._count?.items || 0} questions</span>
                    {exercise.timeLimit && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.floor(exercise.timeLimit / 60)}m
                      </span>
                    )}
                  </div>

                  {/* Status badge */}
                  {status && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      status === 'passed' ? 'bg-green-100 text-green-700' :
                      status === 'failed' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {status === 'passed' ? 'Passed' :
                       status === 'failed' ? 'Try Again' :
                       'In Progress'}
                    </span>
                  )}
                </div>

                {/* Last attempt score */}
                {exercise.lastAttempt?.status === 'COMPLETED' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Last Score</span>
                      <span className={`font-medium ${
                        (exercise.lastAttempt.percentage || 0) >= exercise.passingScore
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {exercise.lastAttempt.percentage}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ExercisesPage
