import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/common/Toast'
import { learningPathApi, LearningPath } from '../services/learningPathApi'
import { Route, BookOpen, Clock, CheckCircle, Lock, ChevronRight, Play, TrendingUp, ArrowLeft } from 'lucide-react'

export default function LearningPathDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isStudent } = useAuth()
  const toast = useToast()
  const [path, setPath] = useState<LearningPath | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [advancing, setAdvancing] = useState(false)

  useEffect(() => {
    if (id) loadPath()
  }, [id])

  const loadPath = async () => {
    try {
      const data = await learningPathApi.getById(id!)
      setPath(data)
    } catch (err) {
      console.error('Failed to load path:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    if (!id) return
    setEnrolling(true)
    try {
      await learningPathApi.enroll(id)
      await loadPath()
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to enroll')
    } finally {
      setEnrolling(false)
    }
  }

  const handleAdvance = async () => {
    if (!id) return
    setAdvancing(true)
    try {
      const result = await learningPathApi.advance(id)
      if (result.completed) {
        toast.success('Congratulations! You completed this learning path!')
      }
      await loadPath()
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Cannot advance yet')
    } finally {
      setAdvancing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (!path) {
    return <div className="text-center py-20 text-gray-500">Learning path not found</div>
  }

  const enrollment = path.enrollment
  const courseProgress = (enrollment as any)?.courseProgress || {}
  const isEnrolled = !!enrollment
  const currentIndex = enrollment?.currentCourseIndex ?? -1

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Route className="w-6 h-6 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">{path.name}</h1>
            </div>
            {path.description && (
              <p className="text-gray-600 mb-4">{path.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {path.courses.length} courses
              </span>
              {path.estimatedHours && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ~{path.estimatedHours} hours
                </span>
              )}
              {path.targetLevel && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Target: {path.targetLevel}
                </span>
              )}
            </div>
          </div>

          {isStudent && !isEnrolled && (
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 font-medium"
            >
              {enrolling ? 'Enrolling...' : 'Start Path'}
            </button>
          )}
        </div>

        {/* Progress bar */}
        {isEnrolled && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                {enrollment?.status === 'COMPLETED' ? 'Completed!' : `${enrollment?.progress || 0}% complete`}
              </span>
              <span className="text-xs text-gray-500">
                {enrollment?.status === 'COMPLETED'
                  ? `Finished ${new Date(enrollment.completedAt!).toLocaleDateString()}`
                  : `Course ${currentIndex + 1} of ${path.courses.length}`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${
                  enrollment?.status === 'COMPLETED'
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : 'bg-gradient-to-r from-primary-400 to-primary-600'
                }`}
                style={{ width: `${enrollment?.progress || 0}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Course roadmap */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Roadmap</h2>
      <div className="space-y-3">
        {path.courses.map((pc: any, idx: number) => {
          const progress = courseProgress[pc.courseId] ?? 0
          const isComplete = progress >= 100
          const isCurrent = idx === currentIndex
          const isLocked = isEnrolled && idx > currentIndex && !isComplete
          const isAccessible = !isEnrolled || idx <= currentIndex || isComplete

          return (
            <div key={pc.id} className="relative">
              {/* Connector line */}
              {idx < path.courses.length - 1 && (
                <div className={`absolute left-5 top-14 w-0.5 h-6 ${
                  isComplete ? 'bg-green-400' : 'bg-gray-200'
                }`} />
              )}

              <div
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'border-primary-400 bg-primary-50 shadow-sm'
                    : isComplete
                      ? 'border-green-300 bg-green-50'
                      : isLocked
                        ? 'border-gray-200 bg-gray-50 opacity-60'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                } ${isAccessible && !isLocked ? 'cursor-pointer' : ''}`}
                onClick={() => isAccessible && !isLocked && navigate(`/courses/${pc.courseId}`)}
              >
                {/* Step indicator */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  isComplete
                    ? 'bg-green-500 text-white'
                    : isCurrent
                      ? 'bg-primary-600 text-white'
                      : isLocked
                        ? 'bg-gray-200 text-gray-400'
                        : 'bg-gray-100 text-gray-600'
                }`}>
                  {isComplete ? <CheckCircle className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : idx + 1}
                </div>

                {/* Course info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-medium ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                      {pc.course.name}
                    </h3>
                    {pc.isRequired && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded font-medium">Required</span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-primary-100 text-primary-700 rounded font-medium">Current</span>
                    )}
                  </div>
                  {pc.course.description && (
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{pc.course.description}</p>
                  )}

                  {/* Progress bar for current/completed courses */}
                  {isEnrolled && (isComplete || isCurrent) && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${isComplete ? 'bg-green-500' : 'bg-primary-500'}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">{Math.round(progress)}%</span>
                    </div>
                  )}
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  {isCurrent && !isComplete && (
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/courses/${pc.courseId}`) }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-medium hover:bg-primary-700"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Continue
                    </button>
                  )}
                  {isComplete && idx === currentIndex && idx < path.courses.length - 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAdvance() }}
                      disabled={advancing}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 disabled:opacity-50"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                      {advancing ? 'Advancing...' : 'Next Course'}
                    </button>
                  )}
                  {!isEnrolled && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
