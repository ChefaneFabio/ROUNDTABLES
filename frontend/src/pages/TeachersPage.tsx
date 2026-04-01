import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Mail, BookOpen, Copy, Check } from 'lucide-react'
import { teachersApi, authApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { useToast } from '../components/common/Toast'

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
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Teacher | null>(null)
  const toast = useToast()

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

  const handleDelete = async (teacher: Teacher) => {
    setDeletingId(teacher.id)
    try {
      await teachersApi.update(teacher.id, { isActive: false })
      toast.success(`${teacher.user.name} deactivated`)
      loadTeachers()
    } catch (e) {
      toast.error('Failed to deactivate teacher')
    } finally {
      setDeletingId(null)
      setConfirmDelete(null)
    }
  }

  const handleEditSave = async (id: string, data: { bio?: string; expertise?: string[]; hourlyRate?: number }) => {
    try {
      await teachersApi.update(id, data)
      setEditingTeacher(null)
      toast.success('Teacher updated')
      loadTeachers()
    } catch (e) {
      toast.error('Failed to update teacher')
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
                <button
                  onClick={() => setEditingTeacher(teacher)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setConfirmDelete(teacher)}
                  disabled={deletingId === teacher.id}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddModal && (
        <AddTeacherModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); loadTeachers() }}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={!!confirmDelete}
        title="Deactivate Teacher"
        message={`Are you sure you want to deactivate ${confirmDelete?.user?.name}? They will no longer be able to access the platform.`}
        confirmLabel="Deactivate"
        variant="danger"
        loading={!!deletingId}
        onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <EditTeacherModal
          teacher={editingTeacher}
          onClose={() => setEditingTeacher(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  )
}

function EditTeacherModal({ teacher, onClose, onSave }: {
  teacher: Teacher
  onClose: () => void
  onSave: (id: string, data: any) => Promise<void>
}) {
  const [bio, setBio] = useState(teacher.bio || '')
  const [expertise, setExpertise] = useState(teacher.expertise.join(', '))
  const [hourlyRate, setHourlyRate] = useState(teacher.hourlyRate?.toString() || '')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave(teacher.id, {
      bio: bio || undefined,
      expertise: expertise.split(',').map(s => s.trim()).filter(Boolean),
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined
    })
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Edit {teacher.user.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expertise (comma-separated)</label>
            <input
              type="text"
              value={expertise}
              onChange={e => setExpertise(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="English, Business English, IELTS"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (EUR)</label>
            <input
              type="number"
              value={hourlyRate}
              onChange={e => setHourlyRate(e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AddTeacherModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', bio: '', expertise: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [created, setCreated] = useState<{ email: string; password: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let pw = ''
    for (let i = 0; i < 10; i++) pw += chars[Math.floor(Math.random() * chars.length)]
    return pw
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const password = generatePassword()
    try {
      await authApi.registerTeacher({
        email: form.email,
        password,
        name: form.name,
        schoolId: (user as any)?.schoolId || '',
        bio: form.bio || undefined,
        expertise: form.expertise ? form.expertise.split(',').map(s => s.trim()) : undefined
      })
      setCreated({ email: form.email, password })
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create teacher account')
    } finally {
      setLoading(false)
    }
  }

  const copyCredentials = () => {
    if (!created) return
    navigator.clipboard.writeText(`Email: ${created.email}\nPassword: ${created.password}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {created ? 'Teacher Account Created' : 'Create Teacher Account'}
        </h2>

        {created ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium mb-2">Account created successfully!</p>
              <div className="space-y-1 text-sm text-green-700">
                <p><strong>Email:</strong> {created.email}</p>
                <p><strong>Password:</strong> {created.password}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Share these credentials with the teacher. They can change their password after logging in.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={copyCredentials}
                className="flex items-center gap-1.5 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Credentials'}
              </button>
              <button
                onClick={onSuccess}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expertise (comma-separated)</label>
              <input
                type="text"
                value={form.expertise}
                onChange={e => setForm({ ...form, expertise: e.target.value })}
                placeholder="e.g. English, Business English, IELTS"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              A password will be generated automatically. You'll be able to copy the credentials after creation.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default TeachersPage
