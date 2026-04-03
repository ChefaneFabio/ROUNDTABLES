import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  ClipboardCheck,
  Plus,
  Search,
  X,
  Eye,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
} from 'lucide-react'
import { assessmentApi } from '../../services/assessmentApi'
import api, { studentsApi } from '../../services/api'
import { LoadingPage } from '../../components/common/LoadingSpinner'
import { Alert } from '../../components/common/Alert'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'

const LANGUAGES = [
  { code: 'English', name: 'English' },
  { code: 'Spanish', name: 'Spanish' },
  { code: 'French', name: 'French' },
  { code: 'German', name: 'German' },
  { code: 'Italian', name: 'Italian' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'ASSIGNED', label: 'Assigned' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'ASSIGNED':
      return 'bg-amber-100 text-amber-800'
    case 'IN_PROGRESS':
      return 'bg-blue-100 text-blue-800'
    case 'COMPLETED':
      return 'bg-green-100 text-green-800'
    case 'EXPIRED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function AssessmentManagementPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [filterLanguage, setFilterLanguage] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [exporting, setExporting] = useState(false)

  const { data: assessments, isLoading } = useQuery(
    ['adminAssessments', filterLanguage, filterStatus],
    () =>
      assessmentApi.getAdminAssessments({
        language: filterLanguage || undefined,
        status: filterStatus || undefined,
      }),
    { refetchInterval: 30000 }
  )

  const filtered = assessments?.filter((a: any) => {
    if (!searchTerm) return true
    const name = a.student?.user?.name?.toLowerCase() || ''
    const email = a.student?.user?.email?.toLowerCase() || ''
    const term = searchTerm.toLowerCase()
    return name.includes(term) || email.includes(term)
  })

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (!filtered) return
    const completedIds = filtered.filter((a: any) => a.status === 'COMPLETED').map((a: any) => a.id)
    if (selectedIds.size === completedIds.length && completedIds.every((id: string) => selectedIds.has(id))) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(completedIds))
    }
  }

  const handleExportXlsx = async () => {
    if (selectedIds.size === 0) return
    try {
      setExporting(true)
      const response = await api.post('/analytics/export/assessments/xlsx', {
        assessmentIds: Array.from(selectedIds),
      }, { responseType: 'blob' })

      // Trigger download
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `assessment-results-${new Date().toISOString().slice(0, 10)}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
      setSuccessMsg(`Exported ${selectedIds.size} assessment(s)`)
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setError('Failed to export. Make sure selected assessments are completed.')
    } finally {
      setExporting(false)
    }
  }

  if (isLoading) return <LoadingPage />

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assessment Management</h1>
            <p className="text-sm text-gray-500">Assign and track 4-skill assessments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <Button
              onClick={handleExportXlsx}
              disabled={exporting}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Exporting...' : `Export ${selectedIds.size} to XLSX`}
            </Button>
          )}
          <Button onClick={() => setShowAssignModal(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Assign New Test
          </Button>
        </div>
      </div>

      {error && <Alert type="error" message={error} />}
      {successMsg && <Alert type="success" message={successMsg} />}

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Languages</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Assessments Table */}
      <Card>
        {!filtered || filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ClipboardCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No assessments found</p>
            <p className="text-sm mt-1">Assign a test to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-2 w-8">
                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={filtered?.filter((a: any) => a.status === 'COMPLETED').length > 0 && filtered?.filter((a: any) => a.status === 'COMPLETED').every((a: any) => selectedIds.has(a.id))}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Student</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Language</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Sections</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Score / Level</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a: any) => (
                  <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      {a.status === 'COMPLETED' && (
                        <input
                          type="checkbox"
                          checked={selectedIds.has(a.id)}
                          onChange={() => toggleSelect(a.id)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{a.student?.user?.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{a.student?.user?.email}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{a.language}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(a.status)}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {a.sections?.map((s: any) => (
                          <span
                            key={s.id}
                            title={`${s.skill}: ${s.status}${s.cefrLevel ? ` (${s.cefrLevel})` : ''}`}
                            className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${
                              s.status === 'COMPLETED'
                                ? 'bg-green-100 text-green-700'
                                : s.status === 'IN_PROGRESS'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {s.skill?.charAt(0)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {a.status === 'COMPLETED' ? (
                        <div>
                          <span className="font-medium text-gray-900">{a.score}%</span>
                          {a.cefrLevel && (
                            <span className="ml-2 px-1.5 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                              {a.cefrLevel}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">--</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs">
                      {a.assignedAt
                        ? new Date(a.assignedAt).toLocaleDateString()
                        : a.createdAt
                        ? new Date(a.createdAt).toLocaleDateString()
                        : '--'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {a.status === 'COMPLETED' ? (
                        <button
                          onClick={() => navigate(`/assessment/multi-skill/${a.id}/results`)}
                          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          Results
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Summary Stats */}
      {assessments && assessments.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Assigned"
            value={assessments.length}
            color="text-gray-600"
          />
          <StatCard
            icon={Clock}
            label="In Progress"
            value={assessments.filter((a: any) => a.status === 'IN_PROGRESS').length}
            color="text-blue-600"
          />
          <StatCard
            icon={CheckCircle}
            label="Completed"
            value={assessments.filter((a: any) => a.status === 'COMPLETED').length}
            color="text-green-600"
          />
          <StatCard
            icon={AlertCircle}
            label="Awaiting Start"
            value={assessments.filter((a: any) => a.status === 'ASSIGNED').length}
            color="text-amber-600"
          />
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <AssignModal
          onClose={() => {
            setShowAssignModal(false)
            setError('')
          }}
          onSuccess={(count: number) => {
            setShowAssignModal(false)
            setSuccessMsg(`Successfully assigned ${count} assessment(s)`)
            queryClient.invalidateQueries('adminAssessments')
            setTimeout(() => setSuccessMsg(''), 5000)
          }}
          onError={(msg: string) => setError(msg)}
        />
      )}
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType
  label: string
  value: number
  color: string
}) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Icon className={`w-8 h-8 ${color}`} />
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </Card>
  )
}

function AssignModal({
  onClose,
  onSuccess,
  onError,
}: {
  onClose: () => void
  onSuccess: (count: number) => void
  onError: (msg: string) => void
}) {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [language, setLanguage] = useState('')
  const [testType, setTestType] = useState<'quick' | '4skill'>('4skill')
  const [timeLimitMin, setTimeLimitMin] = useState(30)
  const [questionsLimit, setQuestionsLimit] = useState(25)
  const [studentSearch, setStudentSearch] = useState('')

  const { data: studentsData, isLoading: loadingStudents } = useQuery(
    'allStudents',
    () => studentsApi.getAll({ page: 1, limit: 500 }),
    { staleTime: 60000 }
  )

  const students = studentsData?.data || []

  const filteredStudents = students.filter((s: any) => {
    if (!studentSearch) return true
    const name = s.user?.name?.toLowerCase() || ''
    const email = s.user?.email?.toLowerCase() || ''
    const term = studentSearch.toLowerCase()
    return name.includes(term) || email.includes(term)
  })

  const assignQuickMutation = useMutation(
    (data: any) => assessmentApi.assignAssessment(data),
    {
      onSuccess: (results) => {
        onSuccess(results.length)
      },
      onError: (err: Error) => onError(err.message),
    }
  )

  const assignMultiSkillMutation = useMutation(
    (data: any) => assessmentApi.assignMultiSkillAssessment(data),
    {
      onSuccess: (results) => {
        const successCount = results.filter((r: any) => !r.error).length
        onSuccess(successCount)
      },
      onError: (err: Error) => onError(err.message),
    }
  )

  const handleAssign = () => {
    if (selectedStudents.length === 0) {
      onError('Please select at least one student')
      return
    }
    if (!language) {
      onError('Please select a language')
      return
    }

    if (testType === 'quick') {
      assignQuickMutation.mutate({
        studentIds: selectedStudents,
        language,
        timeLimitMin,
        questionsLimit,
      })
    } else {
      assignMultiSkillMutation.mutate({
        studentIds: selectedStudents,
        language,
      })
    }
  }

  const isSubmitting = assignQuickMutation.isLoading || assignMultiSkillMutation.isLoading

  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Assign New Test</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Test Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTestType('quick')}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  testType === 'quick'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-medium text-sm">Quick Placement</p>
                <p className="text-xs text-gray-500 mt-1">Grammar & Vocabulary</p>
              </button>
              <button
                onClick={() => setTestType('4skill')}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  testType === '4skill'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-medium text-sm">4-Skills Assessment</p>
                <p className="text-xs text-gray-500 mt-1">R / L / W / S</p>
              </button>
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select language...</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick placement options */}
          {testType === 'quick' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Limit (min)
                </label>
                <input
                  type="number"
                  value={timeLimitMin}
                  onChange={(e) => setTimeLimitMin(Number(e.target.value))}
                  min={10}
                  max={120}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Questions
                </label>
                <input
                  type="number"
                  value={questionsLimit}
                  onChange={(e) => setQuestionsLimit(Number(e.target.value))}
                  min={10}
                  max={60}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          {/* Student Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Students ({selectedStudents.length} selected)
            </label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
              {loadingStudents ? (
                <p className="p-3 text-sm text-gray-500">Loading students...</p>
              ) : filteredStudents.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No students found</p>
              ) : (
                filteredStudents.map((s: any) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(s.id)}
                      onChange={() => toggleStudent(s.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {s.user?.name || 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{s.user?.email}</p>
                    </div>
                  </label>
                ))
              )}
            </div>
            {selectedStudents.length > 0 && (
              <button
                onClick={() => setSelectedStudents([])}
                className="text-xs text-primary-600 hover:text-primary-700 mt-1"
              >
                Clear selection
              </button>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <Button onClick={handleAssign} disabled={isSubmitting}>
            {isSubmitting ? 'Assigning...' : `Assign to ${selectedStudents.length} Student(s)`}
          </Button>
        </div>
      </div>
    </div>
  )
}
