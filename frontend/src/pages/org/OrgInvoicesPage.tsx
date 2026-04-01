import { useState, useEffect } from 'react'
import { FileText } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'

const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  SENT: 'bg-blue-100 text-blue-700',
  PAID: 'bg-green-100 text-green-700',
  OVERDUE: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

export default function OrgInvoicesPage() {
  const { profile } = useAuth()
  const orgId = (profile as any)?.organizationId
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orgId) return
    api.get(`/organizations/${orgId}/invoices`).then(r => {
      setInvoices(r.data.data || [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [orgId])

  const formatDate = (d: string) => new Date(d).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
  const formatCurrency = (amount: number, currency = 'EUR') =>
    amount.toLocaleString('it-IT', { style: 'currency', currency })

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <p className="text-gray-600">View and download your invoices</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{invoices.length}</div>
          <div className="text-sm text-gray-500">Total Invoices</div>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(invoices.filter(i => i.status === 'PAID').reduce((s: number, i: any) => s + Number(i.totalAmount), 0))}
          </div>
          <div className="text-sm text-gray-500">Paid</div>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(invoices.filter(i => i.status === 'OVERDUE' || i.status === 'SENT').reduce((s: number, i: any) => s + Number(i.totalAmount), 0))}
          </div>
          <div className="text-sm text-gray-500">Outstanding</div>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No invoices yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Due</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoices.map((inv: any) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(inv.invoiceDate)}</td>
                  <td className="px-4 py-3 text-gray-600">{inv.dueDate ? formatDate(inv.dueDate) : '—'}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatCurrency(Number(inv.totalAmount), inv.currency)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[inv.status] || 'bg-gray-100'}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
