import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, Dumbbell, CheckCircle, Circle, BookOpen, Package } from 'lucide-react'
import { coursesApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

const SelfPacedCoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  useAuth() // verify authentication
  const [course, setCourse] = useState<any>(null)
  const [contents, setContents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      loadCourse(id)
    }
  }, [id])

  const loadCourse = async (courseId: string) => {
    setIsLoading(true)
    setError('')
    try {
      const data = await coursesApi.getById(courseId)
      setCourse(data)
      // Use courseContents from the course detail response if available
      const courseContents = data.courseContents || data.contents || []
      // Sort by order
      const sorted = [...courseContents].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
      setContents(sorted)
    } catch (err: any) {
      setError(err.message || 'Failed to load course.')
    } finally {
      setIsLoading(false)
    }
  }

  const completedCount = contents.filter((c) => c.completed || c.progress?.completed).length
  const totalCount = contents.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const getContentLink = (item: any) => {
    const type = (item.contentType || item.type || '').toLowerCase()
    if (type === 'video' && item.videoId) return `/videos/${item.videoId}`
    if (type === 'exercise' && item.exerciseId) return `/exercises/${item.exerciseId}`
    if (type === 'scorm' && item.scormPackageId) return `/scorm/${item.scormPackageId}`
    // Auto-detect from available IDs
    if (item.scormPackageId) return `/scorm/${item.scormPackageId}`
    return '#'
  }

  const getTypeIcon = (item: any) => {
    const type = (item.contentType || item.type || '').toLowerCase()
    if (type === 'video') return <Play className="w-5 h-5 text-blue-500" />
    if (type === 'exercise') return <Dumbbell className="w-5 h-5 text-purple-500" />
    if (type === 'scorm' || item.scormPackageId) return <Package className="w-5 h-5 text-indigo-500" />
    return <BookOpen className="w-5 h-5 text-gray-500" />
  }

  const isCompleted = (item: any) => item.completed || item.progress?.completed

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded-full w-full" />
          <div className="space-y-3 mt-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!course) return null

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back link */}
      <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      {/* Course header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{course.title || course.name}</h1>
        {course.description && (
          <p className="mt-2 text-gray-600">{course.description}</p>
        )}
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Course Progress</span>
          <span className="text-sm text-gray-500">
            {completedCount} / {totalCount} completed ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Content list */}
      {contents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No content available for this course yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contents.map((item, index) => {
            const completed = isCompleted(item)
            const link = getContentLink(item)

            return (
              <Link
                key={item.id || index}
                to={link}
                className={`flex items-center gap-4 p-4 bg-white rounded-lg border transition-colors ${
                  completed
                    ? 'border-green-200 hover:border-green-300'
                    : 'border-gray-200 hover:border-gray-300'
                } hover:shadow-sm`}
              >
                {/* Order number */}
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                  {item.order ?? index + 1}
                </div>

                {/* Type icon */}
                <div className="flex-shrink-0">{getTypeIcon(item)}</div>

                {/* Content info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.title || item.name || 'Untitled'}
                    </h3>
                    {item.required && (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                        Required
                      </span>
                    )}
                    {item.cefrLevel && (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {item.cefrLevel}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-500 truncate mt-0.5">{item.description}</p>
                  )}
                </div>

                {/* Completion status */}
                <div className="flex-shrink-0">
                  {completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SelfPacedCoursePage
