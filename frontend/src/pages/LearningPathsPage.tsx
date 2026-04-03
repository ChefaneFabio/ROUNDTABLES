import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { learningPathApi, LearningPath } from '../services/learningPathApi'
import { Route, BookOpen, Clock, Users, ChevronRight } from 'lucide-react'

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

const LEVEL_COLORS: Record<string, string> = {
  A1: 'bg-green-100 text-green-700',
  A2: 'bg-green-100 text-green-700',
  B1: 'bg-blue-100 text-blue-700',
  B2: 'bg-blue-100 text-blue-700',
  C1: 'bg-purple-100 text-purple-700',
  C2: 'bg-purple-100 text-purple-700',
}

export default function LearningPathsPage() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [paths, setPaths] = useState<LearningPath[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPaths()
  }, [])

  const loadPaths = async () => {
    try {
      const result = await learningPathApi.getAll(1, 50)
      setPaths(result.data)
    } catch (err) {
      console.error('Failed to load paths:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Route className="w-7 h-7 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Learning Paths</h1>
        </div>
        {isAdmin && (
          <button
            onClick={() => navigate('/admin/learning-paths/new')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
          >
            Create Path
          </button>
        )}
      </div>

      <p className="text-gray-500 mb-6">
        Structured learning journeys that guide you through courses in the right order.
      </p>

      {paths.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Route className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">No learning paths available yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paths.map(path => (
            <div
              key={path.id}
              onClick={() => navigate(`/learning-paths/${path.id}`)}
              className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:shadow-md hover:border-primary-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg text-gray-900">{path.name}</h3>
                    {!path.isPublished && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">Draft</span>
                    )}
                  </div>
                  {path.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{path.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-gray-500">
                      <BookOpen className="w-3.5 h-3.5" />
                      {path.courses.length} courses
                    </span>
                    {path.estimatedHours && (
                      <span className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        ~{path.estimatedHours}h
                      </span>
                    )}
                    {path._count?.enrollments !== undefined && (
                      <span className="flex items-center gap-1 text-gray-500">
                        <Users className="w-3.5 h-3.5" />
                        {path._count.enrollments} enrolled
                      </span>
                    )}
                    {path.targetLevel && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${LEVEL_COLORS[path.targetLevel] || 'bg-gray-100 text-gray-600'}`}>
                        Target: {path.targetLevel}
                      </span>
                    )}
                    {path.difficulty && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${DIFFICULTY_COLORS[path.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                        {path.difficulty}
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              </div>

              {/* Course preview dots */}
              <div className="flex items-center gap-1 mt-3">
                {path.courses.slice(0, 8).map((c, i) => (
                  <div key={c.id} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </div>
                    {i < Math.min(path.courses.length - 1, 7) && (
                      <div className="w-4 h-0.5 bg-gray-200" />
                    )}
                  </div>
                ))}
                {path.courses.length > 8 && (
                  <span className="text-xs text-gray-400 ml-1">+{path.courses.length - 8}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
