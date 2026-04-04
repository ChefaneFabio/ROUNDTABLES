import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ClipboardCheck, Search, Eye, RefreshCw, Plus, Download, X, Check } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { organizationApi } from '../../services/organizationApi'
import { assessmentApi } from '../../services/assessmentApi'
import api from '../../services/api'
import { LoadingPage } from '../../components/common/LoadingSpinner'
import { Card } from '../../components/common/Card'

const STATUS_STYLES: Record<string, string> = {
  ASSIGNED: 'bg-amber-100 text-amber-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  PAUSED: 'bg-gray-100 text-gray-800',
  COMPLETED: 'bg-green-100 text-green-800',
  EXPIRED: 'bg-red-100 text-red-800',
}

const SKILL_SHORT: Record<string, string> = {
  READING: 'R',
  LISTENING: 'L',
  WRITING: 'W',
  SPEAKING: 'S',
  GRAMMAR: 'G',
  VOCABULARY: 'V',
  ERROR_CORRECTION: 'EC',
  SENTENCE_TRANSFORMATION: 'ST',
}

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Italian']
const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export default function OrgAssessmentsPage() {
  const { organizationId } = useAuth()
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState('')
  const [filterLanguage, setFilterLanguage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Assign modal state
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [assignLanguage, setAssignLanguage] = useState('English')
  const [testType, setTestType] = useState<'placement' | 'level'>('placement')
  const [fixedLevel, setFixedLevel] = useState('B1')
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set())
  const [assigning, setAssigning] = useState(false)
  const [assignError, setAssignError] = useState('')

  // Export state
  const [exporting, setExporting] = useState(false)

  const { data: assessments, isLoading, refetch, isFetching } = useQuery(
    ['orgAssessments', organizationId, filterStatus, filterLanguage],
    () => organizationApi.getAssessments(organizationId!, {
      status: filterStatus || undefined,
      language: filterLanguage || undefined,
    }),
    {
      enabled: !!organizationId,
      refetchInterval: 30000, // Real-time: refresh every 30s
    }
  )

  // Load employees when modal is open
  const { data: employeesData } = useQuery(
    ['orgEmployees', organizationId],
    () => organizationApi.getEmployees(organizationId!),
    {
      enabled: !!organizationId && showAssignModal,
    }
  )
  const employees = employeesData?.data || employeesData || []

  const filtered = assessments?.filter((a: any) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      a.student?.name?.toLowerCase().includes(term) ||
      a.student?.email?.toLowerCase().includes(term)
    )
  })

  // Derive available languages from data
  const languages = [...new Set((assessments || []).map((a: any) => a.language))].sort()

  // Stats
  const total = assessments?.length || 0
  const completed = assessments?.filter((a: any) => a.status === 'COMPLETED').length || 0
  const inProgress = assessments?.filter((a: any) => a.status === 'IN_PROGRESS' || a.status === 'PAUSED').length || 0
  const assigned = assessments?.filter((a: any) => a.status === 'ASSIGNED').length || 0

  // Assign test handler
  const handleAssign = async () => {
    if (selectedEmployees.size === 0) return
    try {
      setAssigning(true)
      setAssignError('')
      await assessmentApi.assignMultiSkillAssessment({
        studentIds: Array.from(selectedEmployees),
        language: assignLanguage,
        fixedLevel: testType === 'level' ? fixedLevel : undefined,
      })
      setShowAssignModal(false)
      setSelectedEmployees(new Set())
      refetch()
    } catch (err: any) {
      setAssignError(err?.response?.data?.message || 'Failed to assign assessment')
    } finally {
      setAssigning(false)
    }
  }

  // Export XLSX handler
  const handleExportXlsx = async () => {
    const completedAssessments = (assessments || []).filter((a: any) => a.status === 'COMPLETED')
    if (completedAssessments.length === 0) return
    try {
      setExporting(true)
      const response = await api.post('/analytics/export/assessments/xlsx', {
        assessmentIds: completedAssessments.map((a: any) => a.id),
      }, { responseType: 'blob' })

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `assessment-results-${new Date().toISOString().slice(0, 10)}.xlsx`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch {
      // silent fail - could add toast here
    } finally {
      setExporting(false)
    }
  }

  const toggleEmployee = (id: string) => {
    setSelectedEmployees(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedEmployees.size === employees.length) {
      setSelectedEmployees(new Set())
    } else {
      setSelectedEmployees(new Set(employees.map((e: any) => e.studentId || e.id)))
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
            <h1 className="text-2xl font-bold text-gray-900">Employee Assessments</h1>
            <p className="text-sm text-gray-500">Monitor placement test progress in real-time</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAssignModal(true)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white bg-primary-600 rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            Assign Test
          </button>
          <button
            onClick={handleExportXlsx}
            disabled={exporting || completed === 0}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            title={completed === 0 ? 'No completed assessments to export' : `Export ${completed} completed assessment(s)`}
          >
            <Download className={`w-4 h-4 ${exporting ? 'animate-pulse' : ''}`} />
            Export
          </button>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{total}</p>
          <p className="text-xs text-gray-500">Total Tests</p>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{completed}</p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
          <p className="text-xs text-gray-500">In Progress</p>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{assigned}</p>
          <p className="text-xs text-gray-500">Assigned</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by employee name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={filterLanguage}
            onChange={e => setFilterLanguage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="">All Languages</option>
            {languages.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="">All Statuses</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PAUSED">Paused</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </Card>

      {/* Assessments Table */}
      <Card>
        {!filtered || filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ClipboardCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No assessments found</p>
            <p className="text-sm mt-1">Employee assessments will appear here once assigned or started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Employee</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Language</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Progress</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">R</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">L</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">W</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">S</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Overall</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a: any) => {
                  const completedSections = a.sections?.filter((s: any) => s.status === 'COMPLETED').length || 0
                  const totalSections = a.sections?.length || 0
                  const readingSection = a.sections?.find((s: any) => s.skill === 'READING')
                  const listeningSection = a.sections?.find((s: any) => s.skill === 'LISTENING')
                  const writingSection = a.sections?.find((s: any) => s.skill === 'WRITING')
                  const speakingSection = a.sections?.find((s: any) => s.skill === 'SPEAKING')

                  return (
                    <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{a.student?.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{a.student?.email}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{a.language}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[a.status] || 'bg-gray-100 text-gray-800'}`}>
                          {a.status === 'IN_PROGRESS' ? 'In Progress' : a.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[80px]">
                            <div
                              className="h-full bg-green-500 rounded-full transition-all"
                              style={{ width: `${totalSections > 0 ? (completedSections / totalSections) * 100 : 0}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{completedSections}/{totalSections}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <SectionCell section={readingSection} />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <SectionCell section={listeningSection} />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <SectionCell section={writingSection} />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <SectionCell section={speakingSection} />
                      </td>
                      <td className="py-3 px-4">
                        {a.cefrLevel ? (
                          <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-bold">
                            {a.cefrLevel}
                          </span>
                        ) : (
                          <span className="text-gray-400">--</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-500">
                        {a.completedAt
                          ? new Date(a.completedAt).toLocaleDateString()
                          : a.startedAt
                          ? new Date(a.startedAt).toLocaleDateString()
                          : '--'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {a.status === 'COMPLETED' && (
                          <button
                            onClick={() => navigate(`/assessment/multi-skill/${a.id}/results`)}
                            className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Assign Test Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Assign Assessment</h2>
              <button
                onClick={() => { setShowAssignModal(false); setAssignError('') }}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-4 space-y-4 overflow-y-auto flex-1">
              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={assignLanguage}
                  onChange={e => setAssignLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {LANGUAGES.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Test type toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTestType('placement')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                      testType === 'placement'
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Placement Test
                  </button>
                  <button
                    onClick={() => setTestType('level')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                      testType === 'level'
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Level Test
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {testType === 'placement'
                    ? 'Adaptive test that determines the student\'s CEFR level automatically.'
                    : 'Fixed-level test at a specific CEFR level.'}
                </p>
              </div>

              {/* CEFR level buttons (only for level test) */}
              {testType === 'level' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CEFR Level</label>
                  <div className="flex gap-2 flex-wrap">
                    {CEFR_LEVELS.map(level => (
                      <button
                        key={level}
                        onClick={() => setFixedLevel(level)}
                        className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-colors ${
                          fixedLevel === level
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Employee list */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Employees ({selectedEmployees.size} selected)
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleSelectAll}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {selectedEmployees.size === employees.length && employees.length > 0 ? 'Clear' : 'Select All'}
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg max-h-48 overflow-y-auto divide-y divide-gray-100">
                  {employees.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No employees found</p>
                  ) : (
                    employees.map((emp: any) => {
                      const empId = emp.studentId || emp.id
                      const isSelected = selectedEmployees.has(empId)
                      return (
                        <label
                          key={empId}
                          className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? 'bg-primary-600 border-primary-600'
                                : 'border-gray-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isSelected}
                            onChange={() => toggleEmployee(empId)}
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {emp.student?.name || emp.name || emp.email}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {emp.student?.email || emp.email}
                            </p>
                          </div>
                        </label>
                      )
                    })
                  )}
                </div>
              </div>

              {assignError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{assignError}</p>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
              <button
                onClick={() => { setShowAssignModal(false); setAssignError('') }}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={assigning || selectedEmployees.size === 0}
                className="px-4 py-2 text-sm text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 inline-flex items-center gap-2"
              >
                {assigning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Assign to {selectedEmployees.size} employee{selectedEmployees.size !== 1 ? 's' : ''}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionCell({ section }: { section?: any }) {
  if (!section) return <span className="text-gray-300">--</span>
  if (section.status === 'COMPLETED' && section.cefrLevel) {
    return (
      <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
        {section.cefrLevel}
      </span>
    )
  }
  if (section.status === 'IN_PROGRESS') {
    const pct = section.questionsTotal > 0
      ? Math.round((section.questionsAnswered / section.questionsTotal) * 100)
      : 0
    return <span className="text-xs text-blue-600 font-medium">{pct}%</span>
  }
  return <span className="text-gray-300 text-xs">--</span>
}
