import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { CreditCard, Download, Search, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { paymentsApi } from '../services/api'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PARTIAL: 'bg-orange-100 text-orange-700',
  PAID: 'bg-green-100 text-green-700',
  OVERDUE: 'bg-red-100 text-red-700',
  REFUNDED: 'bg-gray-100 text-gray-700'
}

export const PaymentsPage: React.FC = () => {
  useAuth()
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery(
    ['payments', page],
    () => paymentsApi.getAll({ page, limit: 20 }),
    { keepPreviousData: true }
  )

  const payments = data?.data || []
  const meta = data?.meta

  const filteredPayments = payments.filter((payment: any) => {
    const matchesSearch = !searchQuery ||
      (payment.enrollment?.course?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.enrollment?.student?.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !filterStatus || payment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = payments
    .filter((p: any) => p.status === 'PAID')
    .reduce((sum: number, p: any) => sum + (p.amount || 0), 0)

  const pendingAmount = payments
    .filter((p: any) => p.status === 'PENDING' || p.status === 'PARTIAL')
    .reduce((sum: number, p: any) => sum + (p.amount || 0), 0)

  const overdueCount = payments.filter((p: any) => p.status === 'OVERDUE').length

  const handleExport = () => {
    const csvRows = [
      ['Date', 'Student', 'Course', 'Amount', 'Currency', 'Status'].join(','),
      ...payments.map((p: any) => [
        new Date(p.createdAt).toISOString().split('T')[0],
        `"${p.enrollment?.student?.user?.name || ''}"`,
        `"${p.enrollment?.course?.name || ''}"`,
        p.amount || 0,
        p.currency || 'EUR',
        p.status
      ].join(','))
    ]
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    })
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Manage transactions and billing</p>
        </div>
        <button
          onClick={handleExport}
          disabled={payments.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</div>
              <div className="text-sm text-gray-500">Revenue (Paid)</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg"><Clock className="w-5 h-5 text-yellow-600" /></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{pendingAmount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg"><CheckCircle className="w-5 h-5 text-blue-600" /></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{payments.filter((p: any) => p.status === 'PAID').length}</div>
              <div className="text-sm text-gray-500">Paid</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${overdueCount > 0 ? 'bg-red-100' : 'bg-gray-100'}`}>
              <AlertCircle className={`w-5 h-5 ${overdueCount > 0 ? 'text-red-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold ${overdueCount > 0 ? 'text-red-600' : 'text-gray-900'}`}>{overdueCount}</div>
              <div className="text-sm text-gray-500">Overdue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, course..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[null, 'PENDING', 'PAID', 'PARTIAL', 'OVERDUE', 'REFUNDED'].map(status => (
            <button
              key={status || 'all'}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner /></div>
      ) : error ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-4" />
          <p className="text-red-500">Failed to load payments</p>
        </div>
      ) : filteredPayments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{searchQuery || filterStatus ? 'No payments match your criteria' : 'No payments yet'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment: any) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{payment.enrollment?.course?.name || payment.description || '-'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {payment.enrollment?.student?.user?.name || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {(payment.amount || 0).toLocaleString('it-IT', { style: 'currency', currency: payment.currency || 'EUR' })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[payment.status] || 'bg-gray-100 text-gray-700'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(payment.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
            className="px-3 py-1.5 rounded border text-sm disabled:opacity-50 hover:bg-gray-50">Previous</button>
          <span className="px-3 py-1.5 text-sm text-gray-600">Page {page} of {meta.totalPages}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page >= meta.totalPages}
            className="px-3 py-1.5 rounded border text-sm disabled:opacity-50 hover:bg-gray-50">Next</button>
        </div>
      )}
    </div>
  )
}

export default PaymentsPage
