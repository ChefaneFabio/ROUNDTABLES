import { useState } from 'react'
import { useQuery } from 'react-query'
import { Activity, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import api from '../../services/api'

interface LogEntry {
  id: string
  userId: string | null
  actorEmail: string | null
  actorName: string | null
  actorRole: string | null
  action: string
  subjectType: string | null
  subjectId: string | null
  metadata: Record<string, any> | null
  ipAddress: string | null
  createdAt: string
}

const ACTION_LABELS: Record<string, string> = {
  USER_REGISTERED: 'Registered',
  USER_LOGGED_IN: 'Logged in',
  USER_LOGGED_OUT: 'Logged out',
  LEARNER_INVITED: 'Invited learner',
  ASSESSMENT_ASSIGNED: 'Assigned test',
  ASSESSMENT_STARTED: 'Started test',
  ASSESSMENT_PAUSED: 'Paused test',
  ASSESSMENT_RESUMED: 'Resumed test',
  ASSESSMENT_RESTARTED: 'Restarted test',
  ASSESSMENT_CANCELLED: 'Cancelled test',
  ASSESSMENT_COMPLETED: 'Completed test',
  SECTION_COMPLETED: 'Completed section',
  RETRY_REQUESTED: 'Requested retry',
}

const ACTION_COLORS: Record<string, string> = {
  USER_REGISTERED: 'bg-blue-50 text-blue-700',
  USER_LOGGED_IN: 'bg-gray-50 text-gray-700',
  USER_LOGGED_OUT: 'bg-gray-50 text-gray-700',
  LEARNER_INVITED: 'bg-indigo-50 text-indigo-700',
  ASSESSMENT_ASSIGNED: 'bg-purple-50 text-purple-700',
  ASSESSMENT_STARTED: 'bg-cyan-50 text-cyan-700',
  ASSESSMENT_PAUSED: 'bg-amber-50 text-amber-700',
  ASSESSMENT_RESUMED: 'bg-cyan-50 text-cyan-700',
  ASSESSMENT_RESTARTED: 'bg-orange-50 text-orange-700',
  ASSESSMENT_CANCELLED: 'bg-red-50 text-red-700',
  ASSESSMENT_COMPLETED: 'bg-green-50 text-green-700',
  SECTION_COMPLETED: 'bg-green-50 text-green-700',
  RETRY_REQUESTED: 'bg-yellow-50 text-yellow-700',
}

const ROLE_COLORS: Record<string, string> = {
  ADMIN: 'bg-rose-100 text-rose-700',
  TEACHER: 'bg-emerald-100 text-emerald-700',
  STUDENT: 'bg-sky-100 text-sky-700',
  SYSTEM: 'bg-gray-100 text-gray-600',
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
}

function describeMetadata(m: Record<string, any> | null): string {
  if (!m) return ''
  const parts: string[] = []
  if (m.language) parts.push(m.language)
  if (m.cefrLevel) parts.push(`CEFR ${m.cefrLevel}`)
  if (m.score !== undefined) parts.push(`${m.score}%`)
  if (m.testType) parts.push(m.testType)
  if (m.startLevel) parts.push(`start ${m.startLevel}`)
  if (m.organizationName) parts.push(`@ ${m.organizationName}`)
  if (m.learnerEmail) parts.push(m.learnerEmail)
  return parts.join(' · ')
}

export default function ActivityLogPage() {
  const [page, setPage] = useState(1)
  const [actionFilter, setActionFilter] = useState('')
  const limit = 50

  const { data, isLoading } = useQuery(
    ['activity-log', page, actionFilter],
    async () => {
      const res = await api.get('/activity-log', {
        params: { page, limit, ...(actionFilter ? { action: actionFilter } : {}) },
      })
      return res.data.data as { items: LogEntry[]; total: number; page: number; limit: number }
    },
    { keepPreviousData: true }
  )

  const items = data?.items || []
  const total = data?.total || 0
  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="h-6 w-6 text-indigo-600" />
          Activity Log
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Cross-user feed of every meaningful action on the platform.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter className="h-4 w-4" />
          Filter by action:
        </div>
        <select
          value={actionFilter}
          onChange={e => { setActionFilter(e.target.value); setPage(1) }}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All actions</option>
          {Object.entries(ACTION_LABELS).map(([k, label]) => (
            <option key={k} value={k}>{label}</option>
          ))}
        </select>
        <span className="ml-auto text-sm text-gray-500">{total.toLocaleString()} entries</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading && items.length === 0 ? (
          <div className="p-12 text-center text-gray-400">Loading activity...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No activity matches this filter.</p>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(entry => {
                const role = entry.actorRole || 'SYSTEM'
                const actionLabel = ACTION_LABELS[entry.action] || entry.action
                const actionColor = ACTION_COLORS[entry.action] || 'bg-gray-50 text-gray-700'
                return (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap font-mono text-xs">
                      {formatTimestamp(entry.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{entry.actorName || '—'}</div>
                      <div className="text-xs text-gray-500">{entry.actorEmail || ''}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[role] || 'bg-gray-100 text-gray-600'}`}>
                        {role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${actionColor}`}>
                        {actionLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {describeMetadata(entry.metadata)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
