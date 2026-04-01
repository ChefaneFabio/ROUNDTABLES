import { useState } from 'react'
import { useQuery } from 'react-query'
import { RefreshCw, CheckCircle, XCircle, Zap, AlertCircle } from 'lucide-react'
import api from '../../services/api'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'

const integrationsApi = {
  getStatus: async () => { const r = await api.get('/integrations/status'); return r.data.data },
  syncHubSpot: async (entity?: string) => { const r = await api.post(`/integrations/hubspot/sync${entity ? `/${entity}` : ''}`); return r.data },
  syncQuickBooks: async (entity?: string) => { const r = await api.post(`/integrations/quickbooks/sync${entity ? `/${entity}` : ''}`); return r.data },
}

export default function IntegrationsPage() {
  const { data: status, isLoading } = useQuery('integrations-status', integrationsApi.getStatus)
  const [syncing, setSyncing] = useState<string | null>(null)
  const [result, setResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const doSync = async (platform: 'hubspot' | 'quickbooks', entity?: string) => {
    const key = `${platform}-${entity || 'all'}`
    setSyncing(key)
    setResult(null)
    try {
      const fn = platform === 'hubspot' ? integrationsApi.syncHubSpot : integrationsApi.syncQuickBooks
      const res = await fn(entity)
      setResult({ type: 'success', text: res.message || 'Sync completed' })
    } catch (e: any) {
      setResult({ type: 'error', text: e.response?.data?.error || 'Sync failed' })
    } finally {
      setSyncing(null)
    }
  }

  if (isLoading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600">Connect ROUNDTABLES with your CRM and accounting tools</p>
      </div>

      {result && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
          result.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {result.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {result.text}
          <button onClick={() => setResult(null)} className="ml-auto opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* HubSpot */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-orange-600">H</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">HubSpot CRM</h2>
              <p className="text-sm text-gray-500">Sync contacts, companies, and deals</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {status?.hubspot?.configured ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" /> Connected
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">
                <XCircle className="w-4 h-4" /> Not configured
              </span>
            )}
          </div>
        </div>

        {status?.hubspot?.configured ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Contacts', desc: 'Students + Teachers + HR', entity: 'contacts' },
                { label: 'Companies', desc: 'Client organizations', entity: 'companies' },
                { label: 'Deals', desc: 'Enrollments', entity: 'deals' },
              ].map(item => (
                <button
                  key={item.entity}
                  onClick={() => doSync('hubspot', item.entity)}
                  disabled={!!syncing}
                  className="flex flex-col items-center gap-1 p-4 border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 text-orange-600 ${syncing === `hubspot-${item.entity}` ? 'animate-spin' : ''}`} />
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.desc}</span>
                </button>
              ))}
              <button
                onClick={() => doSync('hubspot')}
                disabled={!!syncing}
                className="flex flex-col items-center gap-1 p-4 border-2 border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 disabled:opacity-50 transition-colors"
              >
                <Zap className={`w-5 h-5 text-orange-600 ${syncing === 'hubspot-all' ? 'animate-spin' : ''}`} />
                <span className="text-sm font-bold text-orange-700">Sync All</span>
                <span className="text-xs text-orange-600">Full sync</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-sm text-gray-500">
            Set <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">HUBSPOT_PRIVATE_APP_TOKEN</code> in your environment to enable HubSpot sync.
          </div>
        )}
      </div>

      {/* QuickBooks */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">Q</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">QuickBooks Online</h2>
              <p className="text-sm text-gray-500">Sync customers, vendors, invoices, and payments</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {status?.quickbooks?.configured ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" /> Connected
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">
                <XCircle className="w-4 h-4" /> Not configured
              </span>
            )}
          </div>
        </div>

        {status?.quickbooks?.configured ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
              {[
                { label: 'Customers', desc: 'Client orgs', entity: 'customers' },
                { label: 'Vendors', desc: 'Teachers', entity: 'vendors' },
                { label: 'Invoices', desc: 'Sales invoices', entity: 'invoices' },
                { label: 'Payments', desc: 'Received', entity: 'payments' },
              ].map(item => (
                <button
                  key={item.entity}
                  onClick={() => doSync('quickbooks', item.entity)}
                  disabled={!!syncing}
                  className="flex flex-col items-center gap-1 p-4 border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 text-green-600 ${syncing === `quickbooks-${item.entity}` ? 'animate-spin' : ''}`} />
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.desc}</span>
                </button>
              ))}
              <button
                onClick={() => doSync('quickbooks')}
                disabled={!!syncing}
                className="flex flex-col items-center gap-1 p-4 border-2 border-green-200 bg-green-50 rounded-lg hover:bg-green-100 disabled:opacity-50 transition-colors"
              >
                <Zap className={`w-5 h-5 text-green-600 ${syncing === 'quickbooks-all' ? 'animate-spin' : ''}`} />
                <span className="text-sm font-bold text-green-700">Sync All</span>
                <span className="text-xs text-green-600">Full sync</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-sm text-gray-500">
            Set <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">QUICKBOOKS_CLIENT_ID</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">QUICKBOOKS_CLIENT_SECRET</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">QUICKBOOKS_REALM_ID</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">QUICKBOOKS_REFRESH_TOKEN</code> in your environment.
          </div>
        )}
      </div>

      {/* Data mapping info */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Data Mapping</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-orange-600 mb-2">HubSpot CRM</h4>
            <table className="w-full">
              <tbody className="divide-y divide-gray-100">
                <tr><td className="py-1 text-gray-600">Organizations</td><td className="py-1 font-medium">→ Companies (clients)</td></tr>
                <tr><td className="py-1 text-gray-600">Students</td><td className="py-1 font-medium">→ Contacts (client)</td></tr>
                <tr><td className="py-1 text-gray-600">Teachers</td><td className="py-1 font-medium">→ Contacts (vendor)</td></tr>
                <tr><td className="py-1 text-gray-600">HR Contacts</td><td className="py-1 font-medium">→ Contacts (client HR)</td></tr>
                <tr><td className="py-1 text-gray-600">Enrollments</td><td className="py-1 font-medium">→ Deals</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="font-medium text-green-600 mb-2">QuickBooks Online</h4>
            <table className="w-full">
              <tbody className="divide-y divide-gray-100">
                <tr><td className="py-1 text-gray-600">Organizations</td><td className="py-1 font-medium">→ Customers</td></tr>
                <tr><td className="py-1 text-gray-600">Teachers</td><td className="py-1 font-medium">→ Vendors</td></tr>
                <tr><td className="py-1 text-gray-600">Invoices</td><td className="py-1 font-medium">→ Invoices</td></tr>
                <tr><td className="py-1 text-gray-600">Payments</td><td className="py-1 font-medium">→ Payments</td></tr>
                <tr><td className="py-1 text-gray-600">Payroll</td><td className="py-1 font-medium">→ Bills</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
