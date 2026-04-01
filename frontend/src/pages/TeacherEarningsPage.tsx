import { useState } from 'react'
import { useQuery } from 'react-query'
import { format } from 'date-fns'
import {
  DollarSign, Clock, ChevronLeft, ChevronRight,
  FileText, Calendar
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-blue-100 text-blue-700',
  PAID: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

const payrollApi = {
  getMyList: async (params?: any) => {
    const r = await api.get('/payroll/my/list', { params })
    return r.data.data || []
  },
  getMyReport: async (year: number) => {
    const r = await api.get(`/payroll/my/report/${year}`)
    return r.data.data
  }
}

export default function TeacherEarningsPage() {
  useAuth()
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const { data: payrolls = [], isLoading: loadingPayrolls } = useQuery(
    'teacher-payrolls',
    () => payrollApi.getMyList()
  )

  const { data: yearReport, isLoading: loadingReport } = useQuery(
    ['teacher-report', selectedYear],
    () => payrollApi.getMyReport(selectedYear)
  )

  const currentMonth = new Date().getMonth()
  const thisMonthEarnings = yearReport?.monthlyEarnings?.[currentMonth]

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Earnings</h1>
        <p className="text-gray-600">Payroll history and monthly breakdown</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
            <div>
              <div className="text-xl font-bold text-gray-900">
                {thisMonthEarnings ? formatCurrency(thisMonthEarnings.netAmount || thisMonthEarnings.grossAmount || 0) : '—'}
              </div>
              <div className="text-xs text-gray-500">This Month</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg"><Clock className="w-5 h-5 text-blue-600" /></div>
            <div>
              <div className="text-xl font-bold text-gray-900">{thisMonthEarnings?.hours || 0}h</div>
              <div className="text-xs text-gray-500">Hours This Month</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg"><Calendar className="w-5 h-5 text-purple-600" /></div>
            <div>
              <div className="text-xl font-bold text-gray-900">{thisMonthEarnings?.lessons || 0}</div>
              <div className="text-xs text-gray-500">Lessons This Month</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg"><FileText className="w-5 h-5 text-orange-600" /></div>
            <div>
              <div className="text-xl font-bold text-gray-900">
                {formatCurrency(yearReport?.yearTotal?.netAmount || yearReport?.yearTotal?.grossAmount || 0)}
              </div>
              <div className="text-xs text-gray-500">{selectedYear} Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly breakdown */}
      <div className="bg-white rounded-lg border">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Monthly Breakdown — {selectedYear}</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedYear(y => y - 1)} className="p-1 rounded hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium w-12 text-center">{selectedYear}</span>
            <button
              onClick={() => setSelectedYear(y => y + 1)}
              disabled={selectedYear >= new Date().getFullYear()}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loadingReport ? (
          <div className="flex justify-center py-12"><LoadingSpinner /></div>
        ) : (
          <div className="p-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="text-left py-2">Month</th>
                  <th className="text-right py-2">Hours</th>
                  <th className="text-right py-2">Lessons</th>
                  <th className="text-right py-2">Gross</th>
                  <th className="text-right py-2">Net</th>
                </tr>
              </thead>
              <tbody>
                {(yearReport?.monthlyEarnings || []).map((m: any, i: number) => (
                  m.hours > 0 && (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-2.5 font-medium text-gray-900">{m.monthName || new Date(selectedYear, i).toLocaleString('en', { month: 'long' })}</td>
                      <td className="text-right py-2.5 text-gray-700">{m.hours}h</td>
                      <td className="text-right py-2.5 text-gray-700">{m.lessons}</td>
                      <td className="text-right py-2.5 text-gray-700">{formatCurrency(m.grossAmount || 0)}</td>
                      <td className="text-right py-2.5 font-semibold text-gray-900">{formatCurrency(m.netAmount || m.grossAmount || 0)}</td>
                    </tr>
                  )
                ))}
              </tbody>
              {yearReport?.yearTotal && (
                <tfoot>
                  <tr className="border-t-2 font-semibold">
                    <td className="py-2.5">Total</td>
                    <td className="text-right py-2.5">{yearReport.yearTotal.hours || 0}h</td>
                    <td className="text-right py-2.5">{yearReport.yearTotal.lessons || 0}</td>
                    <td className="text-right py-2.5">{formatCurrency(yearReport.yearTotal.grossAmount || 0)}</td>
                    <td className="text-right py-2.5">{formatCurrency(yearReport.yearTotal.netAmount || yearReport.yearTotal.grossAmount || 0)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
      </div>

      {/* Payroll records */}
      <div className="bg-white rounded-lg border">
        <div className="p-5 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Payroll Records</h2>
        </div>

        {loadingPayrolls ? (
          <div className="flex justify-center py-12"><LoadingSpinner /></div>
        ) : payrolls.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No payroll records yet</p>
          </div>
        ) : (
          <div className="divide-y">
            {payrolls.map((p: any) => (
              <div key={p.id} className="p-5 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <div className="font-medium text-gray-900">
                    {format(new Date(p.periodStart), 'MMM d')} — {format(new Date(p.periodEnd), 'MMM d, yyyy')}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {p.totalHours}h · {p.lessonsCount} lessons · {formatCurrency(Number(p.hourlyRate))}/h
                  </div>
                  {p.bonuses > 0 && (
                    <div className="text-xs text-green-600 mt-0.5">+ {formatCurrency(Number(p.bonuses))} bonus{p.bonusNotes ? `: ${p.bonusNotes}` : ''}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{formatCurrency(Number(p.netAmount))}</div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[p.status] || 'bg-gray-100'}`}>
                    {p.status}
                  </span>
                  {p.paidAt && (
                    <div className="text-xs text-gray-500 mt-1">Paid {format(new Date(p.paidAt), 'MMM d, yyyy')}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
