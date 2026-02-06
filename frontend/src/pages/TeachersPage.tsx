import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Mail, BookOpen } from 'lucide-react'
import { teachersApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

interface Teacher {
  id: string
  bio?: string
  expertise: string[]
  hourlyRate?: number
  isActive: boolean
  user: {
    id: string
    name: string
    email: string
  }
  _count?: {
    lessons: number
    courseTeachers: number
  }
}

export const TeachersPage: React.FC = () => {
  useAuth() // Ensure user is authenticated
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadTeachers()
  }, [])

  const loadTeachers = async () => {
    setIsLoading(true)
    try {
      const response = await teachersApi.getAll({ page: 1, limit: 50 })
      setTeachers(response.data || [])
    } catch (error) {
      console.error('Failed to load teachers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600">Manage your teaching staff</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Teacher
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teachers by name, email, or expertise..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Teachers grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {searchQuery ? 'No teachers found matching your search' : 'No teachers added yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map(teacher => (
            <div
              key={teacher.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Teacher header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-semibold text-blue-600">
                    {teacher.user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{teacher.user.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{teacher.user.email}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                    teacher.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {teacher.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Bio */}
              {teacher.bio && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{teacher.bio}</p>
              )}

              {/* Expertise */}
              {teacher.expertise.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {teacher.expertise.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {teacher.expertise.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">
                      +{teacher.expertise.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>{teacher._count?.courseTeachers || 0} courses</span>
                <span>{teacher._count?.lessons || 0} lessons</span>
                {teacher.hourlyRate && (
                  <span>€{teacher.hourlyRate}/hr</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <a
                  href={`mailto:${teacher.user.email}`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Teacher Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Teacher</h2>
            <p className="text-gray-600 mb-4">
              To add a new teacher, they need to register using your school's registration link
              or you can invite them via email.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeachersPage
