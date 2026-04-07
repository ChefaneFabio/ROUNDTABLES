import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Users, Plus, Search, ChevronDown, ChevronUp, Mail, Phone, MapPin,
  Shield, GraduationCap, BookOpen, Building2, X, ToggleLeft, ToggleRight,
  Edit2, Calendar, Clock, Globe, User, Hash
} from 'lucide-react'
import api from '../../services/api'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Alert } from '../../components/common/Alert'
import { LoadingPage } from '../../components/common/LoadingSpinner'

type RoleFilter = 'ALL' | 'ADMIN' | 'TEACHER' | 'STUDENT' | 'ORG_ADMIN'

interface UserRecord {
  id: string
  name: string
  surname: string | null
  email: string
  role: string
  phone: string | null
  address: string | null
  city: string | null
  province: string | null
  postalCode: string | null
  country: string | null
  dateOfBirth: string | null
  placeOfBirth: string | null
  nationality: string | null
  fiscalCode: string | null
  gender: string | null
  nativeLanguage: string | null
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  teacherProfile?: { id: string; expertise: string[]; hourlyRate: number | null }
  studentProfile?: { id: string; languageLevel: string; organizationId: string | null }
}

interface PaginatedResponse {
  users: UserRecord[]
  pagination: { page: number; limit: number; total: number; totalPages: number }
}

const ROLE_BADGES: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  ADMIN: { label: 'Admin', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: Shield },
  TEACHER: { label: 'Teacher', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: GraduationCap },
  STUDENT: { label: 'Student', color: 'bg-sky-50 text-sky-700 border-sky-200', icon: BookOpen },
  ORG_ADMIN: { label: 'HR / Org Admin', color: 'bg-violet-50 text-violet-700 border-violet-200', icon: Building2 },
}

const ROLE_FILTERS: { value: RoleFilter; label: string }[] = [
  { value: 'ALL', label: 'All Roles' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'TEACHER', label: 'Teacher' },
  { value: 'STUDENT', label: 'Student' },
  { value: 'ORG_ADMIN', label: 'HR / Org Admin' },
]

type CreateRole = 'ADMIN' | 'TEACHER' | 'STUDENT'

const emptyForm = {
  role: 'STUDENT' as CreateRole,
  name: '',
  surname: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  city: '',
  // teacher-specific
  expertise: '',
  hourlyRate: '',
  // student-specific
  languageLevel: 'B1',
  schoolId: 'maka-language-centre',
}

export default function AdminUsersPage() {
  const queryClient = useQueryClient()
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Debounce search
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)
  const handleSearchChange = (val: string) => {
    setSearch(val)
    if (searchTimeout) clearTimeout(searchTimeout)
    const t = setTimeout(() => { setDebouncedSearch(val); setPage(1) }, 400)
    setSearchTimeout(t)
  }

  const { data, isLoading } = useQuery<PaginatedResponse>(
    ['adminUsers', roleFilter, debouncedSearch, page],
    async () => {
      const res = await api.get('/auth/admin/users', {
        params: { role: roleFilter, search: debouncedSearch || undefined, page, limit: 25 }
      })
      return res.data.data
    },
    { keepPreviousData: true }
  )

  const toggleActiveMutation = useMutation(
    async (userId: string) => {
      const res = await api.patch(`/auth/admin/users/${userId}/toggle-active`)
      return res.data.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminUsers')
        setSuccess('User status updated')
        setTimeout(() => setSuccess(''), 3000)
      },
      onError: (err: any) => setError(err.response?.data?.error || 'Failed to update user')
    }
  )

  const createMutation = useMutation(
    async (formData: typeof form) => {
      if (formData.role === 'ADMIN') {
        const res = await api.post('/auth/register/admin', {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          surname: formData.surname || undefined,
          phone: formData.phone || undefined,
        })
        return res.data.data
      } else if (formData.role === 'TEACHER') {
        const res = await api.post('/auth/register/teacher', {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          schoolId: 'maka-language-centre',
          expertise: formData.expertise ? formData.expertise.split(',').map(s => s.trim()) : [],
        })
        return res.data.data
      } else {
        const res = await api.post('/auth/register/student', {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          schoolId: 'maka-language-centre',
          languageLevel: formData.languageLevel || 'B1',
        })
        return res.data.data
      }
    },
    {
      onSuccess: () => {
        setShowModal(false)
        setEditingUser(null)
        setForm(emptyForm)
        setSuccess('User created successfully')
        setTimeout(() => setSuccess(''), 5000)
        queryClient.invalidateQueries('adminUsers')
      },
      onError: (err: any) => setError(err.response?.data?.error || 'Failed to create user')
    }
  )

  const updateMutation = useMutation(
    async ({ id, data }: { id: string; data: any }) => {
      const res = await api.put(`/auth/admin/users/${id}`, data)
      return res.data.data
    },
    {
      onSuccess: () => {
        setShowModal(false)
        setEditingUser(null)
        setForm(emptyForm)
        setSuccess('User updated successfully')
        setTimeout(() => setSuccess(''), 5000)
        queryClient.invalidateQueries('adminUsers')
      },
      onError: (err: any) => setError(err.response?.data?.error || 'Failed to update user')
    }
  )

  const openCreate = () => {
    setEditingUser(null)
    setForm(emptyForm)
    setError('')
    setShowModal(true)
  }

  const openEdit = (user: UserRecord) => {
    setEditingUser(user)
    setForm({
      role: user.role as CreateRole,
      name: user.name || '',
      surname: user.surname || '',
      email: user.email || '',
      password: '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      expertise: user.teacherProfile?.expertise?.join(', ') || '',
      hourlyRate: user.teacherProfile?.hourlyRate?.toString() || '',
      languageLevel: user.studentProfile?.languageLevel || 'B1',
      schoolId: 'maka-language-centre',
    })
    setError('')
    setShowModal(true)
  }

  const handleSubmit = () => {
    setError('')
    if (editingUser) {
      updateMutation.mutate({
        id: editingUser.id,
        data: {
          name: form.name,
          surname: form.surname || null,
          email: form.email,
          phone: form.phone || null,
          address: form.address || null,
          city: form.city || null,
        }
      })
    } else {
      createMutation.mutate(form)
    }
  }

  const formatDate = (d: string | null) => {
    if (!d) return '-'
    return new Date(d).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const formatDateTime = (d: string | null) => {
    if (!d) return 'Never'
    return new Date(d).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  if (isLoading && !data) return <LoadingPage />

  const users = data?.users || []
  const pagination = data?.pagination || { page: 1, limit: 25, total: 0, totalPages: 1 }

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 rounded-xl">
            <Users className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-sm text-gray-500">
              {pagination.total} user{pagination.total !== 1 ? 's' : ''} in the platform
            </p>
          </div>
        </div>
        <Button onClick={openCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add User
        </Button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} />}

      {/* Filters */}
      <Card className="!p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
            />
          </div>
          {/* Role filter */}
          <div className="flex gap-1.5 flex-wrap">
            {ROLE_FILTERS.map(rf => (
              <button
                key={rf.value}
                onClick={() => { setRoleFilter(rf.value); setPage(1) }}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  roleFilter === rf.value
                    ? 'bg-slate-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {rf.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Users list */}
      <div className="space-y-2">
        {users.length === 0 ? (
          <Card className="!py-12 text-center">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No users found</p>
          </Card>
        ) : (
          users.map(user => {
            const badge = ROLE_BADGES[user.role] || ROLE_BADGES.STUDENT
            const BadgeIcon = badge.icon
            const isExpanded = expandedId === user.id

            return (
              <Card key={user.id} className="!p-0 overflow-hidden">
                {/* Main row */}
                <div
                  className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50/60 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : user.id)}
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    user.isActive ? 'bg-slate-100 text-slate-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {(user.name?.charAt(0) || 'U').toUpperCase()}
                  </div>

                  {/* Name & email */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium text-sm ${user.isActive ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                        {user.name} {user.surname || ''}
                      </span>
                      {!user.isActive && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-50 text-red-500 border border-red-100">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>

                  {/* Role badge */}
                  <span className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${badge.color}`}>
                    <BadgeIcon className="w-3 h-3" />
                    {badge.label}
                  </span>

                  {/* Phone */}
                  <span className="hidden md:block text-xs text-gray-400 w-28 text-right truncate">
                    {user.phone || '-'}
                  </span>

                  {/* Last login */}
                  <span className="hidden lg:block text-xs text-gray-400 w-32 text-right">
                    {formatDateTime(user.lastLoginAt)}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); openEdit(user) }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                      title="Edit user"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleActiveMutation.mutate(user.id) }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        user.isActive
                          ? 'text-emerald-500 hover:text-red-500 hover:bg-red-50'
                          : 'text-gray-300 hover:text-emerald-500 hover:bg-emerald-50'
                      }`}
                      title={user.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {user.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <DetailField icon={Mail} label="Email" value={user.email} />
                      <DetailField icon={Phone} label="Phone" value={user.phone} />
                      <DetailField icon={MapPin} label="Address" value={[user.address, user.city, user.province, user.postalCode].filter(Boolean).join(', ')} />
                      <DetailField icon={Globe} label="Country" value={user.country} />
                      <DetailField icon={Calendar} label="Date of Birth" value={formatDate(user.dateOfBirth)} />
                      <DetailField icon={MapPin} label="Place of Birth" value={user.placeOfBirth} />
                      <DetailField icon={Globe} label="Nationality" value={user.nationality} />
                      <DetailField icon={Hash} label="Fiscal Code" value={user.fiscalCode} />
                      <DetailField icon={User} label="Gender" value={user.gender} />
                      <DetailField icon={Globe} label="Native Language" value={user.nativeLanguage} />
                      <DetailField icon={Clock} label="Created" value={formatDate(user.createdAt)} />
                      <DetailField icon={Clock} label="Last Login" value={formatDateTime(user.lastLoginAt)} />

                      {user.teacherProfile && (
                        <>
                          <DetailField icon={BookOpen} label="Expertise" value={user.teacherProfile.expertise?.join(', ')} />
                          <DetailField icon={Hash} label="Hourly Rate" value={user.teacherProfile.hourlyRate ? `${user.teacherProfile.hourlyRate} EUR/h` : undefined} />
                        </>
                      )}
                      {user.studentProfile && (
                        <>
                          <DetailField icon={BookOpen} label="Language Level" value={user.studentProfile.languageLevel} />
                          <DetailField icon={Building2} label="Organization" value={user.studentProfile.organizationId || 'Independent'} />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, pagination.totalPages - 4))
              const p = start + i
              if (p > pagination.totalPages) return null
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 text-xs rounded-lg border ${
                    p === page ? 'bg-slate-700 text-white border-slate-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              )
            })}
            <button
              onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingUser ? 'Edit User' : 'Add User'}
              </h2>
              <button onClick={() => { setShowModal(false); setEditingUser(null) }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && <Alert type="error" message={error} onClose={() => setError('')} />}

              {/* Role selector (only for new users) */}
              {!editingUser && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Role</label>
                  <div className="flex gap-2">
                    {(['ADMIN', 'TEACHER', 'STUDENT'] as CreateRole[]).map(r => (
                      <button
                        key={r}
                        onClick={() => setForm({ ...form, role: r })}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                          form.role === r
                            ? 'bg-slate-700 text-white border-slate-700'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {r.charAt(0) + r.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Common fields */}
              <div className="grid grid-cols-2 gap-3">
                <FormField label="First Name" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Alessia" required />
                <FormField label="Surname" value={form.surname} onChange={v => setForm({ ...form, surname: v })} placeholder="Carde" />
              </div>

              <FormField label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="name@makalanguage.com" required />

              {!editingUser && (
                <FormField label="Password" type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} placeholder="Min 8 characters" required />
              )}

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="+39 333 123 4567" />
                <FormField label="City" value={form.city} onChange={v => setForm({ ...form, city: v })} placeholder="Milan" />
              </div>

              <FormField label="Address" value={form.address} onChange={v => setForm({ ...form, address: v })} placeholder="Via Roma 1" />

              {/* Teacher-specific */}
              {form.role === 'TEACHER' && !editingUser && (
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Teacher Details</p>
                  <FormField label="Expertise (comma-separated)" value={form.expertise} onChange={v => setForm({ ...form, expertise: v })} placeholder="English, Business English, IELTS" />
                </div>
              )}

              {/* Student-specific */}
              {form.role === 'STUDENT' && !editingUser && (
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Student Details</p>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Language Level</label>
                    <select
                      value={form.languageLevel}
                      onChange={e => setForm({ ...form, languageLevel: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                    >
                      {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => { setShowModal(false); setEditingUser(null) }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <Button
                onClick={handleSubmit}
                disabled={createMutation.isLoading || updateMutation.isLoading || !form.email || !form.name || (!editingUser && !form.password)}
              >
                {(createMutation.isLoading || updateMutation.isLoading) ? 'Saving...' : editingUser ? 'Save Changes' : 'Create User'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DetailField({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | null }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-700">{value || '-'}</p>
      </div>
    </div>
  )
}

function FormField({ label, value, onChange, placeholder, type = 'text', required }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
        placeholder={placeholder}
      />
    </div>
  )
}
