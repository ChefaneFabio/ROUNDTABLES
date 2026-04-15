import React, { useState } from 'react'
import { Download, TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface ReportType {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: string
}

const REPORT_TYPES: ReportType[] = [
  {
    id: 'student-progress',
    name: 'Learner Progress Report',
    description: 'Overview of learner performance, assessments, and certificates earned',
    icon: Users,
    category: 'Learners'
  },
  {
    id: 'course-analytics',
    name: 'Course Analytics',
    description: 'Enrollment rates, completion rates, and course ratings',
    icon: BookOpen,
    category: 'Courses'
  },
  {
    id: 'revenue-report',
    name: 'Revenue Report',
    description: 'Financial summary including payments, subscriptions, and refunds',
    icon: DollarSign,
    category: 'Financial'
  },
  {
    id: 'engagement-report',
    name: 'Engagement Report',
    description: 'User activity, lesson attendance, and platform usage',
    icon: TrendingUp,
    category: 'Engagement'
  }
]

export const ReportsPage: React.FC = () => {
  useAuth() // Ensure user is authenticated
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateReport = async () => {
    if (!selectedReport) return

    setIsGenerating(true)
    setError(null)
    try {
      // Map report type to API params
      const reportMap: Record<string, { type: string; id: string }> = {
        'student-progress': { type: 'corporate', id: 'school' },
        'course-analytics': { type: 'corporate', id: 'school' },
        'revenue-report': { type: 'corporate', id: 'school' },
        'engagement-report': { type: 'corporate', id: 'school' },
      }
      const { type, id } = reportMap[selectedReport] || { type: 'corporate', id: 'school' }

      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const token = localStorage.getItem('accessToken')
      const url = `${baseUrl}/analytics/export/${type}/${id}?format=csv&startDate=${dateRange.start}&endDate=${dateRange.end}`

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) throw new Error('Export failed')

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `report-${selectedReport}-${dateRange.start}-to-${dateRange.end}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      console.error('Export failed:', err)
      setError('Failed to generate report. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const categories = [...new Set(REPORT_TYPES.map(r => r.category))]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and download detailed reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Selection */}
        <div className="lg:col-span-2 space-y-6">
          {categories.map(category => (
            <div key={category} className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REPORT_TYPES.filter(r => r.category === category).map(report => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedReport === report.id
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedReport === report.id ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <report.icon className={`w-5 h-5 ${
                          selectedReport === report.id ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{report.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Report Configuration */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Date Range</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Quick date ranges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const end = new Date()
                  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
                  setDateRange({
                    start: start.toISOString().split('T')[0],
                    end: end.toISOString().split('T')[0]
                  })
                }}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Last 7 days
              </button>
              <button
                onClick={() => {
                  const end = new Date()
                  const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000)
                  setDateRange({
                    start: start.toISOString().split('T')[0],
                    end: end.toISOString().split('T')[0]
                  })
                }}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Last 30 days
              </button>
              <button
                onClick={() => {
                  const end = new Date()
                  const start = new Date(end.getTime() - 90 * 24 * 60 * 60 * 1000)
                  setDateRange({
                    start: start.toISOString().split('T')[0],
                    end: end.toISOString().split('T')[0]
                  })
                }}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Last 90 days
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h2>
            {selectedReport ? (
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    {REPORT_TYPES.find(r => r.id === selectedReport)?.name}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    {dateRange.start} to {dateRange.end}
                  </p>
                </div>
                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Generate & Download
                    </>
                  )}
                </button>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Select a report type from the left to generate
              </p>
            )}
          </div>

          {/* Report Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Info</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>Reports are exported as CSV files that you can open in Excel or Google Sheets.</p>
              <p>Select a report type, choose a date range, and click Generate to download.</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-700 text-xs">
                <strong>Tip:</strong> For a full overview, select "Learner Progress" with the widest date range.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
