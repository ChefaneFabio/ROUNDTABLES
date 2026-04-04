import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ClipboardCheck, Search, Eye, RefreshCw, Download } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { organizationApi } from '../../services/organizationApi'
import api from '../../services/api'
import { LoadingPage } from '../../components/common/LoadingSpinner'
import { Card } from '../../components/common/Card'

const LANGUAGE_FLAGS: Record<string, string> = {
  English: '\u{1F1EC}\u{1F1E7}',
  Spanish: '\u{1F1EA}\u{1F1F8}',
  French: '\u{1F1EB}\u{1F1F7}',
  German: '\u{1F1E9}\u{1F1EA}',
  Italian: '\u{1F1EE}\u{1F1F9}',
}

const STATUS_STYLES: Record<string, string> = {
  ASSIGNED: 'bg-amber-100 text-amber-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  PAUSED: 'bg-gray-100 text-gray-800',
  COMPLETED: 'bg-green-100 text-green-800',
  EXPIRED: 'bg-red-100 text-red-800',
}


export default function OrgAssessmentsPage() {
  const { organizationId } = useAuth()
  const navigate = useNavigate()
  const [filterStatus, setFilterStatus] = useState('')
  const [filterLanguage, setFilterLanguage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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
              <option key={l} value={l}>{LANGUAGE_FLAGS[l] ? `${LANGUAGE_FLAGS[l]} ` : ''}{l}</option>
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
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{LANGUAGE_FLAGS[a.language] || ''}</span>
                          <span className="text-gray-700">{a.language}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[a.status] || 'bg-gray-100 text-gray-800'}`}>
                          {a.status === 'IN_PROGRESS' ? 'In Progress' : a.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {(a.sections || []).map((s: any, i: number) => (
                            <div
                              key={i}
                              title={`${s.skill}: ${s.status}`}
                              className={`w-3 h-3 rounded-full border transition-all ${
                                s.status === 'COMPLETED'
                                  ? 'bg-green-500 border-green-600'
                                  : s.status === 'IN_PROGRESS'
                                    ? 'bg-blue-400 border-blue-500 animate-pulse'
                                    : s.status === 'SKIPPED'
                                      ? 'bg-gray-300 border-gray-400'
                                      : 'bg-gray-100 border-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">{completedSections}/{totalSections}</span>
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

    </div>
  )
}

function SectionCell({ section }: { section?: any }) {
  if (!section) return <span className="text-gray-300">--</span>
  if (section.status === 'COMPLETED' && section.cefrLevel) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        {section.cefrLevel}
      </span>
    )
  }
  if (section.status === 'IN_PROGRESS') {
    const pct = section.questionsTotal > 0
      ? Math.round((section.questionsAnswered / section.questionsTotal) * 100)
      : 0
    return (
      <div className="inline-flex items-center gap-1.5" title={`${pct}% complete`}>
        <svg className="w-4 h-4 -rotate-90" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" fill="none" stroke="#E5E7EB" strokeWidth="3" />
          <circle cx="10" cy="10" r="8" fill="none" stroke="#3B82F6" strokeWidth="3"
            strokeDasharray={`${pct * 0.5} 50`} strokeLinecap="round" />
        </svg>
        <span className="text-xs text-blue-600 font-medium">{pct}%</span>
      </div>
    )
  }
  if (section.status === 'PENDING') {
    return <span className="inline-block w-2 h-2 rounded-full bg-gray-200" title="Pending" />
  }
  return <span className="text-gray-300 text-xs">--</span>
}
