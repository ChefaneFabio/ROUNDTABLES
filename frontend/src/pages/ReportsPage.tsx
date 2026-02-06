import React, { useState } from 'react'
import { FileText, Download, TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react'
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
    name: 'Student Progress Report',
    description: 'Overview of student performance, assessments, and certificates earned',
    icon: Users,
    category: 'Students'
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

  const handleGenerateReport = async () => {
    if (!selectedReport) return

    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      alert(`Report "${REPORT_TYPES.find(r => r.id === selectedReport)?.name}" generated successfully!`)
    }, 2000)
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
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Select a report type from the left to generate
              </p>
            )}
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Student Progress</p>
                    <p className="text-xs text-gray-500">Jan 1 - Jan 15, 2024</p>
                  </div>
                </div>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Revenue Report</p>
                    <p className="text-xs text-gray-500">Dec 1 - Dec 31, 2023</p>
                  </div>
                </div>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
