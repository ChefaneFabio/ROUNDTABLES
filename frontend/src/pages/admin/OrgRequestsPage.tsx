import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Building2, CheckCircle, XCircle, Loader2, Mail, AlertTriangle, Globe } from 'lucide-react'
import { authApi } from '../../services/api'

interface PendingOrgRequest {
  id: string
  email: string
  name: string
  createdAt: string
  orgAdminProfile?: {
    organization?: {
      id: string
      name: string
      email: string
      industry?: string | null
      size?: string | null
      website?: string | null
    }
  } | null
}

function formatRequestedAt(iso?: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

export default function OrgRequestsPage() {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)
  const [denyingId, setDenyingId] = useState<string | null>(null)
  const [denyReason, setDenyReason] = useState('')

  const { data: requests = [], isLoading } = useQuery(
    'org-requests',
    () => authApi.listOrgRequests() as Promise<PendingOrgRequest[]>,
    { refetchInterval: 30000 }
  )

  const invalidate = () => {
    queryClient.invalidateQueries('org-requests')
    queryClient.invalidateQueries('org-requests-count')
  }

  const approveMutation = useMutation(
    (userId: string) => authApi.approveOrgRequest(userId),
    {
      onSuccess: invalidate,
      onError: (err: any) => setError(err.response?.data?.error || err.message),
    }
  )

  const denyMutation = useMutation(
    ({ userId, reason }: { userId: string; reason?: string }) => authApi.denyOrgRequest(userId, reason),
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
          <div className="p-2 bg-purple-100 rounded-lg">
            <Building2 className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Organization Requests</h1>
            <p className="text-sm text-gray-500 mt-0.5">Approve or deny HR self-registrations for B2B clients</p>
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

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-medium">No organization requests</p>
            <p className="text-sm text-gray-400 mt-1">When an HR contact registers, their account will appear here for approval.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">HR Contact</th>
                <th className="text-left px-4 py-3 font-medium">Organization</th>
                <th className="text-left px-4 py-3 font-medium">Industry / Size</th>
                <th className="text-left px-4 py-3 font-medium">Requested</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => {
                const org = r.orgAdminProfile?.organization
                const busy =
                  (approveMutation.isLoading && approveMutation.variables === r.id) ||
                  (denyMutation.isLoading && denyMutation.variables?.userId === r.id)
                return (
                  <tr key={r.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{r.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {r.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{org?.name || '—'}</div>
                      {org?.website && (
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Globe className="w-3 h-3" />
                          {org.website.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                      {org?.email && (
                        <div className="text-xs text-gray-500 mt-0.5">{org.email}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-700">{org?.industry || '—'}</div>
                      {org?.size && (
                        <div className="text-xs text-gray-400 mt-0.5">{org.size} employees</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatRequestedAt(r.createdAt)}</td>
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
                            onClick={() => denyMutation.mutate({ userId: r.id, reason: denyReason || undefined })}
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
                            onClick={() => approveMutation.mutate(r.id)}
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
