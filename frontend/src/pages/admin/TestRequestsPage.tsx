import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { ClipboardCheck, CheckCircle, XCircle, Loader2, Mail, AlertTriangle, Building2 } from 'lucide-react'
import { assessmentApi } from '../../services/assessmentApi'
import { HelpHint, HelpRole, HelpRow } from '../../components/common/HelpHint'

interface PendingRequest {
  id: string
  language: string
  type: string
  status: string
  student?: {
    user?: { name?: string; email?: string }
    organization?: { name?: string } | null
  }
}

function formatRequestedAt(iso?: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

export default function TestRequestsPage() {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)
  const [denyingId, setDenyingId] = useState<string | null>(null)
  const [denyReason, setDenyReason] = useState('')
  const [confirmApprove, setConfirmApprove] = useState<PendingRequest | null>(null)

  const { data: requests = [], isLoading } = useQuery(
    'test-requests',
    () => assessmentApi.listPendingTestRequests() as Promise<PendingRequest[]>,
    { refetchInterval: 60000 }
  )

  const invalidate = () => {
    queryClient.invalidateQueries('test-requests')
  }

  const approveMutation = useMutation(
    (id: string) => assessmentApi.approveTestRequest(id),
    {
      onSuccess: () => { invalidate(); setConfirmApprove(null) },
      onError: (err: any) => setError(err.response?.data?.error || err.message),
    }
  )

  const denyMutation = useMutation(
    ({ id, reason }: { id: string; reason?: string }) => assessmentApi.denyTestRequest(id, reason),
    {
      onSuccess: () => {
        invalidate()
        setDenyingId(null)
        setDenyReason('')
      },
      onError: (err: any) => setError(err.response?.data?.error || err.message),
    }
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <ClipboardCheck className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-2xl font-bold text-gray-900">Test Requests</h1>
              <HelpHint title="What happens here">
                <HelpRole role="maka" />
                <HelpRow label="The queue">learners who self-requested a placement test. They cannot start until you act.</HelpRow>
                <HelpRow label="Approve" tone="good">opens a confirmation with full identity. Learner gets an email and can begin immediately.</HelpRow>
                <HelpRow label="Deny" tone="warn">optional reason stored on the request for audit.</HelpRow>
                <HelpRow label="Bypass">tests you assign from a company page skip this queue — they're already approved.</HelpRow>
                <HelpRow label="HR">never sees this page. They can't approve tests for their own learners.</HelpRow>
              </HelpHint>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">Approve or deny learner requests to take a placement test</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          ) : (
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              requests.length > 0 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
            }`}>
              {requests.length > 0
                ? `${requests.length} pending`
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

      {confirmApprove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setConfirmApprove(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Approve placement test?</h3>
            </div>
            <div className="px-6 py-5 space-y-3">
              <p className="text-sm text-gray-600">
                You are about to approve a placement test request. The learner below will receive an
                email and be allowed to start the test.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Learner</span>
                  <span className="font-semibold text-gray-900 text-right">{confirmApprove.student?.user?.name || '—'}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Email</span>
                  <span className="text-gray-900 text-right">{confirmApprove.student?.user?.email || '—'}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Company</span>
                  <span className="text-gray-900 text-right">{confirmApprove.student?.organization?.name || 'No organization'}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Language</span>
                  <span className="font-semibold text-blue-700 text-right">{confirmApprove.language}</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setConfirmApprove(null)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => approveMutation.mutate(confirmApprove.id)}
                disabled={approveMutation.isLoading}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                {approveMutation.isLoading ? 'Approving...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <ClipboardCheck className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-medium">No test requests</p>
            <p className="text-sm text-gray-400 mt-1">When a learner requests a placement test, it will appear here.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Learner</th>
                <th className="text-left px-4 py-3 font-medium">Company</th>
                <th className="text-left px-4 py-3 font-medium">Language</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => {
                const busy =
                  (approveMutation.isLoading && approveMutation.variables === r.id) ||
                  (denyMutation.isLoading && denyMutation.variables?.id === r.id)
                return (
                  <tr key={r.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{r.student?.user?.name || '—'}</div>
                      {r.student?.user?.email && (
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" />
                          {r.student.user.email}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {r.student?.organization?.name ? (
                        <span className="inline-flex items-center gap-1 text-xs">
                          <Building2 className="w-3 h-3 text-gray-400" />
                          {r.student.organization.name}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">no organization</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                        {r.language}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{r.type}</td>
                    <td className="px-4 py-3 text-right">
                      {denyingId === r.id ? (
                        <div className="inline-flex items-center gap-2">
                          <input
                            type="text"
                            value={denyReason}
                            onChange={e => setDenyReason(e.target.value)}
                            placeholder="Reason (optional)"
                            className="px-2 py-1 text-xs border border-gray-200 rounded-md w-44"
                          />
                          <button
                            onClick={() => denyMutation.mutate({ id: r.id, reason: denyReason || undefined })}
                            disabled={busy}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => { setDenyingId(null); setDenyReason('') }}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => setDenyingId(r.id)}
                            disabled={busy}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Deny
                          </button>
                          <button
                            onClick={() => setConfirmApprove(r)}
                            disabled={busy}
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
