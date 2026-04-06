import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Mail, BookOpen, Copy, Check, Phone, Clock, Euro, Calendar, MessageSquare } from 'lucide-react'
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
    phone?: string
    lastLoginAt?: string
  }
  availability?: { id: string }[]
  _count?: {
    lessons: number
    courseTeachers: number
    feedback: number
  }
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Never'
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
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

  const activeCount = teachers.filter(t => t.isActive).length
  const totalLessons = teachers.reduce((sum, t) => sum + (t._count?.lessons || 0), 0)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeCount} active of {teachers.length} total &middot; {totalLessons} lessons delivered
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Teacher
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, email, or expertise..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-400 focus:border-slate-400 shadow-sm"
        />
        {searchQuery && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {filteredTeachers.length} result{filteredTeachers.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Teachers grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gray-100 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {searchQuery ? 'No teachers found matching your search' : 'No teachers added yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredTeachers.map(teacher => {
            const hasAvailability = teacher.availability && teacher.availability.length > 0
            return (
              <div
                key={teacher.id}
                className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Card header */}
                <div className="p-5 pb-0">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-slate-600">
                        {teacher.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 truncate text-sm">{teacher.user.name}</h3>
                        <span className={`flex-shrink-0 inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          teacher.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {teacher.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{teacher.user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Contact details */}
                <div className="px-5 pt-3 space-y-1.5">
                  {teacher.user.phone && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span>{teacher.user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span>Last login: {formatDate(teacher.user.lastLoginAt)}</span>
                  </div>
                  {hasAvailability !== undefined && (
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className={hasAvailability ? 'text-emerald-600' : 'text-amber-600'}>
                        {hasAvailability ? 'Availability configured' : 'No availability set'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bio preview */}
                {teacher.bio && (
                  <div className="px-5 pt-3">
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {teacher.bio.length > 100 ? teacher.bio.slice(0, 100) + '...' : teacher.bio}
                    </p>
                  </div>
                )}

                {/* Expertise tags */}
                {teacher.expertise.length > 0 && (
                  <div className="px-5 pt-3 flex flex-wrap gap-1">
                    {teacher.expertise.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-slate-50 text-slate-600 border border-slate-200 rounded text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                    {teacher.expertise.length > 4 && (
                      <span className="px-2 py-0.5 text-gray-400 text-[11px]">
                        +{teacher.expertise.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Stats row */}
                <div className="px-5 pt-3 mt-auto">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-gray-800">{teacher._count?.courseTeachers || 0}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wide">Courses</div>
                    </div>
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-gray-800">{teacher._count?.lessons || 0}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wide">Lessons</div>
                    </div>
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      {teacher.hourlyRate ? (
                        <>
                          <div className="text-sm font-semibold text-gray-800">{'\u20AC'}{teacher.hourlyRate}</div>
                          <div className="text-[10px] text-gray-400 uppercase tracking-wide">Per hr</div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-gray-400">--</div>
                          <div className="text-[10px] text-gray-400 uppercase tracking-wide">Rate</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Feedback summary */}
                {(teacher._count?.feedback || 0) > 0 && (
                  <div className="px-5 pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MessageSquare className="w-3 h-3 text-gray-400" />
                      <span>{teacher._count?.feedback} feedback report{(teacher._count?.feedback || 0) !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 p-4 pt-3 mt-3 border-t border-gray-100">
                  <a
                    href={`mailto:${teacher.user.email}`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </a>
                  {teacher.user.phone && (
                    <a
                      href={`tel:${teacher.user.phone}`}
                      className="p-2 text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                      title="Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setEditingTeacher(teacher)}
                    className="p-2 text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(teacher)}
                    disabled={deletingId === teacher.id}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Deactivate"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
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
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Edit Teacher</h2>
        <p className="text-sm text-gray-500 mb-5">{teacher.user.name} &middot; {teacher.user.email}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              placeholder="Short description of this teacher's background..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expertise (comma-separated)</label>
            <input
              type="text"
              value={expertise}
              onChange={e => setExpertise(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
              placeholder="English, Business English, IELTS"
            />
            <p className="mt-1 text-xs text-gray-400">Languages and specializations this teacher covers</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (EUR)</label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)}
                min="0"
                step="0.01"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
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
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
              />
            </div>
            <p className="text-xs text-gray-500">
              A password will be generated automatically. You'll be able to copy the credentials after creation.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
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
