import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  Download,
  Filter,
  RefreshCw,
  Target,
  Award,
  MessageSquare,
  Mail
} from 'lucide-react'

interface ReportData {
  overview: {
    totalRoundtables: number
    activeRoundtables: number
    completedRoundtables: number
    totalParticipants: number
    totalSessions: number
    completedSessions: number
    averageRating: number
    completionRate: number
  }
  monthlyStats: {
    month: string
    roundtables: number
    participants: number
    sessions: number
    completion: number
  }[]
  topClients: {
    name: string
    company: string
    roundtables: number
    participants: number
    value: number
  }[]
  trainerPerformance: {
    name: string
    sessions: number
    rating: number
    feedback: number
  }[]
  participantEngagement: {
    level: string
    count: number
    percentage: number
  }[]
}

export function ReportsPage() {
  const navigate = useNavigate()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('last-3-months')
  const [activeReport, setActiveReport] = useState('overview')

  useEffect(() => {
    fetchReportData()
  }, [dateRange])

  const fetchReportData = async () => {
    try {
      setLoading(true)
      // Simulate API call - in real implementation this would fetch from backend
      const mockData: ReportData = {
        overview: {
          totalRoundtables: 12,
          activeRoundtables: 5,
          completedRoundtables: 7,
          totalParticipants: 72,
          totalSessions: 120,
          completedSessions: 84,
          averageRating: 4.7,
          completionRate: 87
        },
        monthlyStats: [
          { month: 'Oct 2023', roundtables: 2, participants: 12, sessions: 20, completion: 95 },
          { month: 'Nov 2023', roundtables: 3, participants: 18, sessions: 30, completion: 89 },
          { month: 'Dec 2023', roundtables: 2, participants: 12, sessions: 20, completion: 92 },
          { month: 'Jan 2024', roundtables: 5, participants: 30, sessions: 50, completion: 82 }
        ],
        topClients: [
          { name: 'Marco Bianchi', company: 'Fastweb', roundtables: 3, participants: 18, value: 25000 },
          { name: 'Anna Rossi', company: 'UniCredit', roundtables: 2, participants: 12, value: 18000 },
          { name: 'Giuseppe Verde', company: 'Intesa Sanpaolo', roundtables: 2, participants: 12, value: 16000 }
        ],
        trainerPerformance: [
          { name: 'Marco Rossi', sessions: 28, rating: 4.8, feedback: 25 },
          { name: 'Anna Verdi', sessions: 22, rating: 4.9, feedback: 20 },
          { name: 'Luca Neri', sessions: 18, rating: 4.6, feedback: 16 }
        ],
        participantEngagement: [
          { level: 'High (90-100%)', count: 45, percentage: 62 },
          { level: 'Medium (70-89%)', count: 20, percentage: 28 },
          { level: 'Low (<70%)', count: 7, percentage: 10 }
        ]
      }
      setReportData(mockData)
    } catch (error) {
      console.error('Error fetching report data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = (format: string) => {
    alert(`Exporting report as ${format.toUpperCase()}...`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!reportData) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Maka Roundtables</h1>
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/roundtables" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Roundtables</a>
                <a href="/participants" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Participants</a>
                <a href="/sessions" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sessions</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600 mt-2">Comprehensive insights into your roundtable programs</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="last-month">Last Month</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="last-year">Last Year</option>
            </select>
            <button
              onClick={() => fetchReportData()}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={() => exportReport('pdf')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Roundtables</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalRoundtables}</p>
                <p className="text-sm text-green-600">
                  {reportData.overview.activeRoundtables} active
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalParticipants}</p>
                <p className="text-sm text-blue-600">
                  Across all programs
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.completionRate}%</p>
                <p className="text-sm text-green-600">
                  {reportData.overview.completedSessions}/{reportData.overview.totalSessions} sessions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.averageRating}/5</p>
                <p className="text-sm text-yellow-600">
                  Excellent feedback
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'clients', label: 'Top Clients', icon: Users },
                { id: 'trainers', label: 'Trainer Performance', icon: Award },
                { id: 'engagement', label: 'Participant Engagement', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveReport(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeReport === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeReport === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {reportData.monthlyStats.map((month) => (
                        <div key={month.month} className="text-center">
                          <h4 className="font-medium text-gray-900">{month.month}</h4>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600">{month.roundtables} roundtables</p>
                            <p className="text-sm text-gray-600">{month.participants} participants</p>
                            <p className="text-sm text-gray-600">{month.sessions} sessions</p>
                            <p className="text-sm font-medium text-green-600">{month.completion}% completion</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-green-800">Completed Programs</span>
                        <span className="font-bold text-green-900">{reportData.overview.completedRoundtables}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-800">Active Programs</span>
                        <span className="font-bold text-blue-900">{reportData.overview.activeRoundtables}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Analytics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-purple-800">Total Sessions</span>
                        <span className="font-bold text-purple-900">{reportData.overview.totalSessions}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-800">Completed Sessions</span>
                        <span className="font-bold text-gray-900">{reportData.overview.completedSessions}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeReport === 'clients' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Clients</h3>
                <div className="space-y-4">
                  {reportData.topClients.map((client, index) => (
                    <div key={client.company} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-4">
                          <span className="font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{client.name}</h4>
                          <p className="text-sm text-gray-600">{client.company}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{client.roundtables}</p>
                          <p className="text-sm text-gray-600">Roundtables</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">{client.participants}</p>
                          <p className="text-sm text-gray-600">Participants</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-600">€{client.value.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Contract Value</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeReport === 'trainers' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trainer Performance Analysis</h3>
                <div className="space-y-4">
                  {reportData.trainerPerformance.map((trainer, index) => (
                    <div key={trainer.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <Award className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{trainer.name}</h4>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm text-gray-600">{trainer.rating}/5 rating</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-8 text-center">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{trainer.sessions}</p>
                          <p className="text-sm text-gray-600">Sessions Led</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-blue-600">{trainer.feedback}</p>
                          <p className="text-sm text-gray-600">Feedback Given</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeReport === 'engagement' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Participant Engagement Levels</h3>
                <div className="space-y-4">
                  {reportData.participantEngagement.map((level) => (
                    <div key={level.level} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{level.level}</h4>
                        <span className="text-lg font-bold text-gray-900">{level.count} participants</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            level.level.includes('High') ? 'bg-green-500' :
                            level.level.includes('Medium') ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${level.percentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{level.percentage}% of all participants</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Engagement Insights</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 90% of participants maintain high engagement throughout programs</li>
                    <li>• Average session attendance rate: {reportData.overview.completionRate}%</li>
                    <li>• Most engaged participants complete 100% of sessions</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => exportReport('pdf')}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export as PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export as Excel
            </button>
            <button
              onClick={() => exportReport('csv')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}