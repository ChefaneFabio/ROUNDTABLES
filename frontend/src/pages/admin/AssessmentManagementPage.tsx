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
  FileText,
  Trash2,
} from 'lucide-react'
import { assessmentApi } from '../../services/assessmentApi'
import api, { studentsApi } from '../../services/api'
import { organizationApi } from '../../services/organizationApi'
import { LoadingPage } from '../../components/common/LoadingSpinner'
import { Alert } from '../../components/common/Alert'
import { Button } from '../../components/common/Button'
import { Card } from '../../components/common/Card'
import { HelpHint, HelpRole, HelpRow } from '../../components/common/HelpHint'

const LANGUAGES = [
  { code: 'English', name: 'English' },
  { code: 'Spanish', name: 'Spanish' },
  { code: 'French', name: 'French' },
  { code: 'German', name: 'German' },
  { code: 'Italian', name: 'Italian' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'ASSIGNED', label: 'Assigned (not started)' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'PAUSED', label: 'Paused' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'EXPIRED', label: 'Expired / abandoned' },
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
  const [showTestData, setShowTestData] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [exporting, setExporting] = useState(false)
  const [showTestPdfMenu, setShowTestPdfMenu] = useState(false)

  const deleteMutation = useMutation(
    (id: string) => assessmentApi.deleteAssessment(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('adminAssessments')
        setSuccessMsg('Assessment deleted')
        setTimeout(() => setSuccessMsg(''), 3000)
      },
      onError: (err: any) => {
        setError(err.response?.data?.error || 'Failed to delete assessment')
      }
    }
  )

  const handleDelete = (id: string, studentName: string) => {
    if (window.confirm(`Delete assessment for ${studentName}? This will permanently remove all answers, responses, and scores.`)) {
      deleteMutation.mutate(id)
    }
  }

  const { data: assessments, isLoading } = useQuery(
    ['adminAssessments', filterLanguage, filterStatus, showTestData],
    () =>
      assessmentApi.getAdminAssessments({
        language: filterLanguage || undefined,
        status: filterStatus || undefined,
        includeTestData: showTestData,
      }),
    // Poll every 15s so the live progress bar updates while a learner is
    // taking a test. Backend payload stays bounded (limit=50 by default,
    // cap=200) so the cost is small.
    { refetchInterval: 15000 }
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

  const handleExportXlsx = async (ids?: string[]) => {
    const targetIds = ids ?? Array.from(selectedIds)
    if (targetIds.length === 0) return
    try {
      setExporting(true)
      const response = await api.post('/analytics/export/assessments/xlsx', {
        assessmentIds: targetIds,
      }, { responseType: 'blob' })

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `assessment-results-${new Date().toISOString().slice(0, 10)}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
      setSuccessMsg(`Exported ${targetIds.length} assessment(s)`)
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err: any) {
      setError('Failed to export. Make sure the assessments are completed.')
    } finally {
      setExporting(false)
    }
  }

  // "Export all completed" — flat shortcut so Sara doesn't need to know about
  // the per-row checkboxes when she just wants every completed test.
  const completedVisible = filtered?.filter((a: any) => a.status === 'COMPLETED') ?? []

  const handleDownloadTestPdf = async (language: string, skill?: string) => {
    try {
      const blob = await assessmentApi.downloadTestPdf(language, skill)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${language}-test${skill ? `-${skill}` : ''}-questions.pdf`
      a.click()
      URL.revokeObjectURL(url)
      setShowTestPdfMenu(false)
    } catch {
      setError('Failed to generate PDF')
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
            <div className="flex items-center gap-1.5">
              <h1 className="text-2xl font-bold text-gray-900">Assessment Management</h1>
              <HelpHint title="What you can do here">
                <HelpRole role="maka" />
                <HelpRow label="Scope">every assessment across every company. HR contacts only see their own company's tests.</HelpRow>
                <HelpRow label="Find a learner">type the name or email — search runs locally on the loaded list. Filters narrow by language + status.</HelpRow>
                <HelpRow label="Export to XLSX">tick rows, or click "Export all completed" when nothing is selected. File has overall + per-section scores.</HelpRow>
                <HelpRow label="Assign New Test">picks a learner + language; the test skips the approval queue.</HelpRow>
                <HelpRow label="Test PDF">full test or a single section, for offline review or pen-and-paper.</HelpRow>
                <HelpRow label="Pending requests">live on the separate Test Requests page.</HelpRow>
              </HelpHint>
            </div>
            <p className="text-sm text-gray-500">Assign and track 4-skill assessments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 ? (
            <Button
              onClick={() => handleExportXlsx()}
              disabled={exporting}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Exporting...' : `Export ${selectedIds.size} to XLSX`}
            </Button>
          ) : completedVisible.length > 0 ? (
            <Button
              onClick={() => handleExportXlsx(completedVisible.map((a: any) => a.id))}
              disabled={exporting}
              variant="secondary"
              className="flex items-center gap-2"
              title="Export every completed test currently shown"
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Exporting...' : `Export all ${completedVisible.length} completed`}
            </Button>
          ) : null}
          <div className="relative">
            <Button variant="outline" onClick={() => setShowTestPdfMenu(!showTestPdfMenu)} className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Test PDF
            </Button>
            {showTestPdfMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowTestPdfMenu(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">Download Questions</p>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => handleDownloadTestPdf(l.code)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                      {l.name} — Full Test
                    </button>
                  ))}
                  <hr className="my-1" />
                  <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">By Section</p>
                  {['READING', 'LISTENING', 'WRITING', 'SPEAKING'].map(skill => (
                    <button
                      key={skill}
                      onClick={() => handleDownloadTestPdf('English', skill)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                      English — {skill.charAt(0) + skill.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
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
              placeholder="Search by learner name or email..."
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
          <label
            className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none whitespace-nowrap"
            title="Demo Student, Load Test, and *@example.com accounts are filtered out by default to keep this page focused on real learners."
          >
            <input
              type="checkbox"
              checked={showTestData}
              onChange={e => setShowTestData(e.target.checked)}
              className="rounded"
            />
            Show demo/test accounts
          </label>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Learner</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Language</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 hidden md:table-cell">Sections</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 hidden sm:table-cell">Score / Level</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 hidden sm:table-cell">Date</th>
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
                    <td className="py-3 px-4">
                      <span className="text-gray-700">{a.language}</span>
                      {a.type === 'PROGRESS' && a.targetLevel && (
                        <span className="ml-1.5 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {a.targetLevel}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(a.status)}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <SectionProgress sections={a.sections} status={a.status} />
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      {a.status === 'COMPLETED' ? (
                        <div>
                          <span className="font-medium text-gray-900">{a.score}%</span>
                          {a.cefrLevel && (
                            <span className="ml-2 px-1.5 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                              {a.cefrLevel}
                            </span>
                          )}
                        </div>
                      ) : a.status === 'IN_PROGRESS' || a.status === 'PAUSED' ? (
                        <OverallProgress sections={a.sections} />
                      ) : (
                        <span className="text-gray-400">--</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs hidden sm:table-cell">
                      {a.assignedAt
                        ? new Date(a.assignedAt).toLocaleDateString()
                        : a.createdAt
                        ? new Date(a.createdAt).toLocaleDateString()
                        : '--'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
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
                        <button
                          onClick={() => handleDelete(a.id, a.student?.user?.name || 'this learner')}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete assessment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
          <StatCard
            icon={Clock}
            label="Paused / Partial"
            value={assessments.filter((a: any) => a.status === 'PAUSED').length}
            color="text-orange-600"
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

// ─── Section-by-section progress for an in-progress test ───────────────
// Shows R / L / W / S pills with a tiny fill bar beneath each, so Maka can
// see at a glance "Reading is done, Listening is half-way, Writing not
// started" without opening the test detail.
function SectionProgress({ sections }: { sections: any[]; status: string }) {
  if (!sections || sections.length === 0) return <span className="text-gray-400 text-xs">--</span>
  return (
    <div className="flex gap-1.5">
      {sections.map(s => {
        const answers = Array.isArray(s.answers) ? s.answers.length : 0
        const total = s.questionsLimit || 0
        const pct = total > 0 ? Math.min(100, Math.round((answers / total) * 100)) : 0

        // Color logic mirrors status; in-progress shows blue with the
        // partial fill, completed is green, pending is gray.
        const isDone = s.status === 'COMPLETED'
        const isLive = s.status === 'IN_PROGRESS'
        const pillBg = isDone ? 'bg-green-100 text-green-700'
          : isLive ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-400'
        const barBg = isDone ? 'bg-green-500'
          : isLive ? 'bg-blue-500'
          : 'bg-gray-300'

        const elapsed = s.startedAt && !isDone
          ? Math.max(0, Math.round((Date.now() - new Date(s.startedAt).getTime()) / 60000))
          : null
        const tooltip = [
          `${s.skill}: ${s.status}`,
          total > 0 ? `${answers}/${total} questions` : null,
          s.cefrLevel ? `Level: ${s.cefrLevel}` : null,
          s.percentageScore != null ? `Score: ${s.percentageScore}%` : null,
          elapsed != null ? `${elapsed}m elapsed of ${s.timeLimitMin}m` : null,
        ].filter(Boolean).join(' · ')

        return (
          <div key={s.id} title={tooltip} className="flex flex-col items-center gap-0.5">
            <span className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${pillBg}`}>
              {s.skill?.charAt(0)}
            </span>
            <div className="w-6 h-1 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full ${barBg} transition-all`}
                style={{ width: `${isDone ? 100 : pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Overall test-completion bar for in-progress assessments ──────────
// Replaces the "--" placeholder in the Score column with a slim bar
// showing total questions answered across all sections.
function OverallProgress({ sections }: { sections: any[] }) {
  if (!sections || sections.length === 0) return <span className="text-gray-400 text-xs">--</span>
  const { answered, total } = sections.reduce(
    (acc: { answered: number; total: number }, s: any) => {
      acc.answered += Array.isArray(s.answers) ? s.answers.length : 0
      acc.total += s.questionsLimit || 0
      return acc
    },
    { answered: 0, total: 0 }
  )
  const pct = total > 0 ? Math.min(100, Math.round((answered / total) * 100)) : 0
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <span className="font-medium">{answered}</span>
        <span className="text-gray-400">/ {total}</span>
        <span className="text-gray-400">·</span>
        <span>{pct}%</span>
      </div>
      <div className="w-24 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
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
  const [testMode, setTestMode] = useState<'placement' | 'level'>('placement')
  const [fixedLevel, setFixedLevel] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('')
  const [studentSearch, setStudentSearch] = useState('')

  // Load organizations
  const { data: orgsData } = useQuery(
    'allOrganizations',
    () => organizationApi.getOrganizations({ page: 1, limit: 100 }),
    { staleTime: 60000 }
  )
  const orgs = orgsData?.data || []

  // Load students — from org if selected, otherwise all
  const { data: studentsData, isLoading: loadingStudents } = useQuery(
    ['assignStudents', selectedOrg],
    () => selectedOrg
      ? organizationApi.getEmployees(selectedOrg, { page: 1, limit: 500 })
      : studentsApi.getAll({ page: 1, limit: 500 }),
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

  const assignMutation = useMutation(
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
      onError('Please select at least one learner')
      return
    }
    if (!language) {
      onError('Please select a language')
      return
    }
    if (testMode === 'level' && !fixedLevel) {
      onError('Please select a CEFR level')
      return
    }
    assignMutation.mutate({
      studentIds: selectedStudents,
      language,
      ...(testMode === 'level' && fixedLevel ? { fixedLevel } : {}),
    })
  }

  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    const allIds = filteredStudents.map((s: any) => s.id)
    setSelectedStudents(allIds)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-gray-900">Assign Placement Test</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
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
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </div>

          {/* Test Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setTestMode('placement'); setFixedLevel('') }}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  testMode === 'placement' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-medium text-sm">Placement Test</p>
                <p className="text-xs text-gray-500 mt-1">Adaptive difficulty (like Versant)</p>
              </button>
              <button
                onClick={() => setTestMode('level')}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  testMode === 'level' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-medium text-sm">Level Test</p>
                <p className="text-xs text-gray-500 mt-1">All questions at one CEFR level</p>
              </button>
            </div>
            {testMode === 'level' && (
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">CEFR Level</label>
                <div className="flex gap-2">
                  {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
                    <button
                      key={level}
                      onClick={() => setFixedLevel(level)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        fixedLevel === level
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Organization filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization (optional)</label>
            <select
              value={selectedOrg}
              onChange={(e) => { setSelectedOrg(e.target.value); setSelectedStudents([]) }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Learners</option>
              {orgs.map((o: any) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>

          {/* Student Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Learners ({selectedStudents.length} selected)
              </label>
              <div className="flex gap-2">
                <button onClick={selectAll} className="text-xs text-primary-600 hover:text-primary-700">
                  Select all
                </button>
                {selectedStudents.length > 0 && (
                  <button onClick={() => setSelectedStudents([])} className="text-xs text-gray-500 hover:text-gray-700">
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="border border-gray-200 rounded-lg max-h-52 overflow-y-auto">
              {loadingStudents ? (
                <p className="p-3 text-sm text-gray-500">Loading...</p>
              ) : filteredStudents.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No learners found</p>
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
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {s.user?.name || 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{s.user?.email}</p>
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
            {testMode === 'placement'
              ? 'Placement Test: Adaptive difficulty across Reading, Listening, Writing, Speaking (~60 min). Determines CEFR level (A1-C2).'
              : `Level ${fixedLevel || '...'} Test: All questions at ${fixedLevel || 'selected'} level across Reading, Listening, Writing, Speaking (~60 min). Verifies competency at this level.`
            }
            {' '}Learners will receive a notification and can start when ready.
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3 z-10">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <Button onClick={handleAssign} disabled={assignMutation.isLoading}>
            {assignMutation.isLoading ? 'Assigning...' : `Assign to ${selectedStudents.length} Learner(s)`}
          </Button>
        </div>
      </div>
    </div>
  )
}
