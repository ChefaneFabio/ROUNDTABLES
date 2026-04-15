import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Edit, Mail, GraduationCap, ClipboardCheck, Copy, Check, Phone, Clock, Building2, Users } from 'lucide-react'
import { studentsApi, authApi } from '../services/api'
import { assessmentApi } from '../services/assessmentApi'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/common/Toast'

interface Student {
  id: string
  languageLevel: string
  bio?: string
  isActive: boolean
  user: {
    id: string
    name: string
    email: string
    phone?: string
    lastLoginAt?: string
  }
  organization?: {
    id: string
    name: string
  } | null
  _count?: {
    enrollments: number
    attendance: number
    feedback: number
    assessments: number
    certificates: number
  }
}

const LEVEL_COLORS: Record<string, string> = {
  A1: 'bg-slate-100 text-slate-600 border-slate-200',
  A2: 'bg-slate-100 text-slate-700 border-slate-200',
  B1: 'bg-sky-50 text-sky-700 border-sky-200',
  B2: 'bg-sky-100 text-sky-800 border-sky-200',
  C1: 'bg-violet-50 text-violet-700 border-violet-200',
  C2: 'bg-violet-100 text-violet-800 border-violet-200'
}

const LEVEL_LABELS: Record<string, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Int.',
  C1: 'Advanced',
  C2: 'Proficiency'
}

const LANGUAGES = [
  { code: 'English', name: 'English' },
  { code: 'Italian', name: 'Italian' },
  { code: 'Spanish', name: 'Spanish' },
  { code: 'French', name: 'French' },
  { code: 'German', name: 'German' }
]

const TIME_OPTIONS = [
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '60 minutes' },
  { value: 90, label: '90 minutes' }
]

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

export const StudentsPage: React.FC = () => {
  useAuth() // Ensure user is authenticated
  const navigate = useNavigate()
  const toast = useToast()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set())
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [assignLanguage, setAssignLanguage] = useState('English')
  const [assignTimeLimit, setAssignTimeLimit] = useState(60)
  const [isAssigning, setIsAssigning] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    setIsLoading(true)
    try {
      const response = await studentsApi.getAll({ page: 1, limit: 100 })
      setStudents(response.data || [])
    } catch (error) {
      console.error('Failed to load students:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.organization?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = !filterLevel || student.languageLevel === filterLevel
    return matchesSearch && matchesLevel
  })

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev => {
      const next = new Set(prev)
      if (next.has(studentId)) {
        next.delete(studentId)
      } else {
        next.add(studentId)
      }
      return next
    })
  }

  const toggleAll = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set())
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.id)))
    }
  }

  const handleAssign = async () => {
    setIsAssigning(true)
    try {
      await assessmentApi.assignAssessment({
        studentIds: Array.from(selectedStudents),
        language: assignLanguage,
        timeLimitMin: assignTimeLimit
      })
      setShowAssignModal(false)
      setSelectedStudents(new Set())
    } catch (error) {
      console.error('Failed to assign assessments:', error)
    } finally {
      setIsAssigning(false)
    }
  }

  const activeCount = students.filter(s => s.isActive).length
  const orgStudents = students.filter(s => s.organization).length

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learners</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your learner enrollments</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedStudents.size > 0 && (
            <button
              onClick={() => setShowAssignModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
            >
              <ClipboardCheck className="w-4 h-4" />
              Assign Test ({selectedStudents.size})
            </button>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Learner
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{students.length}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-600">{activeCount}</div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-sky-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-sky-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-sky-600">{orgStudents}</div>
              <div className="text-xs text-gray-400">Corporate</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-50 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-violet-600">
                {students.filter(s => ['C1', 'C2'].includes(s.languageLevel)).length}
              </div>
              <div className="text-xs text-gray-400">Advanced</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or organization..."
            className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
          />
          {searchQuery && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              {filteredStudents.length} result{filteredStudents.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterLevel(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterLevel === null
                ? 'bg-slate-800 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Levels
          </button>
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setFilterLevel(filterLevel === level ? null : level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterLevel === level
                  ? 'bg-slate-800 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Students card grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gray-100 rounded-full" />
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
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <GraduationCap className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {searchQuery || filterLevel ? 'No learners found matching your criteria' : 'No learners enrolled yet'}
          </p>
        </div>
      ) : (
        <>
          {/* Select all bar */}
          <div className="flex items-center gap-3 px-1">
            <input
              type="checkbox"
              checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
              onChange={toggleAll}
              className="rounded border-gray-300 text-slate-600 focus:ring-slate-400"
            />
            <span className="text-xs text-gray-500">
              {selectedStudents.size > 0
                ? `${selectedStudents.size} selected`
                : `Select all (${filteredStudents.length})`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredStudents.map(student => (
              <div
                key={student.id}
                className={`bg-white rounded-xl border hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col ${
                  selectedStudents.has(student.id) ? 'border-slate-400 ring-1 ring-slate-200' : 'border-gray-200'
                }`}
              >
                {/* Card header */}
                <div className="p-5 pb-0">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedStudents.has(student.id)}
                        onChange={() => toggleStudent(student.id)}
                        className="absolute -left-1 -top-1 rounded border-gray-300 text-slate-600 focus:ring-slate-400 z-10"
                      />
                      <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center ml-3">
                        <span className="text-sm font-semibold text-slate-600">
                          {student.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 truncate text-sm">{student.user.name}</h3>
                        <span className={`flex-shrink-0 inline-block px-1.5 py-0.5 rounded border text-[10px] font-semibold ${
                          LEVEL_COLORS[student.languageLevel] || 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {student.languageLevel}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{student.user.email}</p>
                      {student.languageLevel && LEVEL_LABELS[student.languageLevel] && (
                        <p className="text-[10px] text-gray-400 mt-0.5">{LEVEL_LABELS[student.languageLevel]}</p>
                      )}
                    </div>
                    <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${
                      student.isActive ? 'bg-emerald-400' : 'bg-gray-300'
                    }`} title={student.isActive ? 'Active' : 'Inactive'} />
                  </div>
                </div>

                {/* Details */}
                <div className="px-5 pt-3 space-y-1.5">
                  {student.organization && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      <span className="truncate">{student.organization.name}</span>
                    </div>
                  )}
                  {student.user.phone && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span>{student.user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span>Last login: {formatDate(student.user.lastLoginAt)}</span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="px-5 pt-3 mt-auto">
                  <div className="grid grid-cols-4 gap-1.5">
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-gray-800">{student._count?.enrollments || 0}</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wide">Courses</div>
                    </div>
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-gray-800">{student._count?.attendance || 0}</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wide">Attended</div>
                    </div>
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-gray-800">{student._count?.assessments || 0}</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wide">Tests</div>
                    </div>
                    <div className="text-center py-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-gray-800">{student._count?.certificates || 0}</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wide">Certs</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 p-4 pt-3 mt-3 border-t border-gray-100">
                  <a
                    href={`mailto:${student.user.email}`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-xs font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </a>
                  {student.user.phone && (
                    <a
                      href={`tel:${student.user.phone}`}
                      className="p-2 text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                      title="Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => navigate(`/admin/student/${student.id}/assessments`)}
                    className="p-2 text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    title="View Assessments"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="p-2 text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); loadStudents() }}
        />
      )}

      {/* Assign Test Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Assign Placement Test</h2>
            <p className="text-sm text-gray-600 mb-4">
              Assign a timed placement test to {selectedStudents.size} selected learner{selectedStudents.size !== 1 ? 's' : ''}.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={assignLanguage}
                  onChange={e => setAssignLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
                >
                  {LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit</label>
                <select
                  value={assignTimeLimit}
                  onChange={e => setAssignTimeLimit(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
                >
                  {TIME_OPTIONS.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={isAssigning}
                className="px-4 py-2 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                {isAssigning ? 'Assigning...' : 'Assign Test'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Edit Learner</h2>
            <p className="text-sm text-gray-500 mb-5">{editingStudent.user.name} &middot; {editingStudent.user.email}</p>
            <EditStudentForm
              student={editingStudent}
              onClose={() => setEditingStudent(null)}
              onSave={async (data) => {
                try {
                  await studentsApi.update(editingStudent.id, data)
                  setEditingStudent(null)
                  loadStudents()
                } catch (e) {
                  console.error('Failed to update:', e)
                  toast.error('Failed to update learner')
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function EditStudentForm({ student, onClose, onSave }: {
  student: Student; onClose: () => void; onSave: (data: any) => Promise<void>
}) {
  const [level, setLevel] = useState(student.languageLevel || '')
  const [bio, setBio] = useState(student.bio || '')
  const [saving, setSaving] = useState(false)

  return (
    <form onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave({ languageLevel: level || undefined, bio: bio || undefined }); setSaving(false) }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Language Level</label>
        <select value={level} onChange={e => setLevel(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm">
          <option value="">Not set</option>
          {['A1','A2','B1','B2','C1','C2'].map(l => <option key={l} value={l}>{l} - {LEVEL_LABELS[l]}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
          placeholder="Notes about this learner..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm" />
      </div>
      <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}

function AddStudentModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', languageLevel: 'B1' })
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
      await authApi.registerStudent({
        email: form.email,
        password,
        name: form.name,
        schoolId: (user as any)?.schoolId || '',
        languageLevel: form.languageLevel
      })
      setCreated({ email: form.email, password })
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create learner account')
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
          {created ? 'Learner Account Created' : 'Create Learner Account'}
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
              Share these credentials with the learner. They can change their password after logging in.
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Language Level</label>
              <select
                value={form.languageLevel}
                onChange={e => setForm({ ...form, languageLevel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-400 text-sm"
              >
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper Intermediate</option>
                <option value="C1">C1 - Advanced</option>
                <option value="C2">C2 - Proficiency</option>
              </select>
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

export default StudentsPage
