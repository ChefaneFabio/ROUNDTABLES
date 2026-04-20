import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { RotateCcw, CheckCircle, XCircle, Loader2, Mail, AlertTriangle } from 'lucide-react'
import { assessmentApi } from '../../services/assessmentApi'

function formatRequestedAt(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

export default function RetryRequestsPage() {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const { data: requests = [], isLoading } = useQuery(
    'retry-requests',
    () => assessmentApi.getRetryRequests(),
    { refetchInterval: 30000 }
  )

  const invalidate = () => {
    queryClient.invalidateQueries('retry-requests')
    queryClient.invalidateQueries('retry-requests-count')
  }

  const approveMutation = useMutation(
    ({ assessmentId, sectionId }: { assessmentId: string; sectionId: string }) =>
      assessmentApi.approveSectionRetry(assessmentId, sectionId),
    {
      onSuccess: invalidate,
      onError: (err: any) => setError(err.response?.data?.error || err.message),
    }
  )

  const denyMutation = useMutation(
    (notificationId: string) => assessmentApi.denyRetryRequest(notificationId),
    {
      onSuccess: invalidate,
      onError: (err: any) => setError(err.response?.data?.error || err.message),
    }
  )

  const pending = requests.filter(r => !r.alreadyHandled)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <RotateCcw className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Retry Requests</h1>
            <p className="text-sm text-gray-500 mt-0.5">Approve or deny student requests to retake assessment sections</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          ) : (
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              pending.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
            }`}>
              {pending.length > 0
                ? `${pending.length} pending`
                : 'No pending requests'}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-red-600 hover:text-red-800">×</button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <RotateCcw className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-medium">No retry requests</p>
            <p className="text-sm text-gray-400 mt-1">When a student asks to retake a section, it will appear here.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Student</th>
                <th className="text-left px-4 py-3 font-medium">Section</th>
                <th className="text-left px-4 py-3 font-medium">Language</th>
                <th className="text-left px-4 py-3 font-medium">Requested</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => {
                const busy =
                  (approveMutation.isLoading &&
                    approveMutation.variables?.sectionId === r.sectionId) ||
                  (denyMutation.isLoading && denyMutation.variables === r.notificationId)
                return (
                  <tr key={r.notificationId} className={`border-t border-gray-100 ${r.alreadyHandled ? 'opacity-60' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{r.studentName}</div>
                      {r.studentEmail && (
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" />
                          {r.studentEmail}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold">
                        {r.skill || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{r.language || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{formatRequestedAt(r.requestedAt)}</td>
                    <td className="px-4 py-3 text-right">
                      {r.alreadyHandled ? (
                        <span className="text-xs text-gray-400 italic">Already handled</span>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => denyMutation.mutate(r.notificationId)}
                            disabled={busy}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Deny
                          </button>
                          <button
                            onClick={() => r.assessmentId && r.sectionId && approveMutation.mutate({ assessmentId: r.assessmentId, sectionId: r.sectionId })}
                            disabled={busy || !r.assessmentId || !r.sectionId}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Approve
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
