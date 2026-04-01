import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Edit, Mail, GraduationCap, ClipboardCheck, Copy, Check } from 'lucide-react'
import { studentsApi, authApi } from '../services/api'
import { assessmentApi } from '../services/assessmentApi'
import { useAuth } from '../contexts/AuthContext'

interface Student {
  id: string
  languageLevel: string
  bio?: string
  isActive: boolean
  user: {
    id: string
    name: string
    email: string
  }
  _count?: {
    enrollments: number
    assessments: number
    certificates: number
  }
}

const LEVEL_COLORS: Record<string, string> = {
  A1: 'bg-green-100 text-green-700',
  A2: 'bg-green-200 text-green-800',
  B1: 'bg-blue-100 text-blue-700',
  B2: 'bg-blue-200 text-blue-800',
  C1: 'bg-purple-100 text-purple-700',
  C2: 'bg-purple-200 text-purple-800'
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

export const StudentsPage: React.FC = () => {
  useAuth() // Ensure user is authenticated
  const navigate = useNavigate()
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
      student.user.email.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage your student enrollments</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedStudents.size > 0 && (
            <button
              onClick={() => setShowAssignModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <ClipboardCheck className="w-5 h-5" />
              Assign Test ({selectedStudents.size})
            </button>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Student
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{students.length}</div>
          <div className="text-sm text-gray-500">Total Students</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {students.filter(s => s.isActive).length}
          </div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">
            {students.filter(s => ['B1', 'B2'].includes(s.languageLevel)).length}
          </div>
          <div className="text-sm text-gray-500">Intermediate (B1-B2)</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">
            {students.filter(s => ['C1', 'C2'].includes(s.languageLevel)).length}
          </div>
          <div className="text-sm text-gray-500">Advanced (C1-C2)</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Level filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterLevel(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filterLevel === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Levels
          </button>
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setFilterLevel(level)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterLevel === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Students table */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {searchQuery || filterLevel ? 'No students found matching your criteria' : 'No students enrolled yet'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
                    onChange={toggleAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assessments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map(student => (
                <tr key={student.id} className={`hover:bg-gray-50 ${selectedStudents.has(student.id) ? 'bg-blue-50' : ''}`}>
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.has(student.id)}
                      onChange={() => toggleStudent(student.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-blue-600">
                          {student.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{student.user.name}</div>
                        <div className="text-sm text-gray-500">{student.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      LEVEL_COLORS[student.languageLevel] || 'bg-gray-100 text-gray-700'
                    }`}>
                      {student.languageLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student._count?.enrollments || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student._count?.assessments || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student._count?.certificates || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      student.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`mailto:${student.user.email}`}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => navigate(`/admin/student/${student.id}/assessments`)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Assessments"
                      >
                        <ClipboardCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingStudent(student)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              Assign a timed placement test to {selectedStudents.size} selected student{selectedStudents.size !== 1 ? 's' : ''}.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={assignLanguage}
                  onChange={e => setAssignLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={isAssigning}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">Edit {editingStudent.user.name}</h2>
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
                  alert('Failed to update student')
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="">Not set</option>
          {['A1','A2','B1','B2','C1','C2'].map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save'}
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
      setError(err.response?.data?.error || 'Failed to create student account')
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
          {created ? 'Student Account Created' : 'Create Student Account'}
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
              Share these credentials with the student. They can change their password after logging in.
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Language Level</label>
              <select
                value={form.languageLevel}
                onChange={e => setForm({ ...form, languageLevel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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

export default StudentsPage
