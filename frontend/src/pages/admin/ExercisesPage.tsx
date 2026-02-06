import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, BarChart2, Target } from 'lucide-react'
import { exerciseApi, Exercise, ExerciseType } from '../../services/exerciseApi'
import LevelFilter from '../../components/video/LevelFilter'

const EXERCISE_TYPE_LABELS: Record<ExerciseType, string> = {
  MULTIPLE_CHOICE: 'Multiple Choice',
  TRUE_FALSE: 'True/False',
  FILL_BLANKS: 'Fill in the Blanks',
  MATCHING: 'Matching',
  DRAG_DROP: 'Drag & Drop',
  REORDER: 'Reorder',
  LISTENING: 'Listening'
}

const AdminExercisesPage: React.FC = () => {
  const navigate = useNavigate()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<ExerciseType | null>(null)

  useEffect(() => {
    loadExercises()
  }, [selectedLevel, selectedType])

  const loadExercises = async () => {
    setIsLoading(true)
    try {
      const result = await exerciseApi.getExercises({
        cefrLevel: selectedLevel || undefined,
        type: selectedType || undefined,
        page: 1,
        limit: 50
      })
      setExercises(result.exercises)
    } catch (error) {
      console.error('Failed to load exercises:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exercise?')) return
    try {
      await exerciseApi.deleteExercise(id)
      loadExercises()
    } catch (error) {
      console.error('Failed to delete exercise:', error)
    }
  }

  const togglePublish = async (exercise: Exercise) => {
    try {
      await exerciseApi.updateExercise(exercise.id, {
        isPublished: !exercise.isPublished
      })
      loadExercises()
    } catch (error) {
      console.error('Failed to update exercise:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Exercises</h1>
          <p className="text-gray-600">Create and manage interactive exercises</p>
        </div>
        <button
          onClick={() => navigate('/admin/exercises/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Exercise
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Level:</span>
          <LevelFilter
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
          />
        </div>

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
          {Object.entries(EXERCISE_TYPE_LABELS).map(([type, label]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as ExerciseType)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises table */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      ) : exercises.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No exercises found</p>
          <button
            onClick={() => navigate('/admin/exercises/new')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Create your first exercise
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exercise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attempts</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {exercises.map(exercise => (
                <tr key={exercise.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{exercise.title}</div>
                      {exercise.description && (
                        <div className="text-sm text-gray-500 line-clamp-1">{exercise.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {EXERCISE_TYPE_LABELS[exercise.type]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {exercise.cefrLevel ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {exercise.cefrLevel}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {exercise._count?.items || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {exercise._count?.attempts || 0}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(exercise)}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        exercise.isPublished
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {exercise.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/exercises/${exercise.id}`)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/exercises/${exercise.id}/stats`)}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="View Stats"
                      >
                        <BarChart2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(exercise.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminExercisesPage
