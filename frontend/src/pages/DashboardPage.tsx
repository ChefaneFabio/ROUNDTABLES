import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  Building,
  MessageSquare,
  Activity,
  BarChart3
} from 'lucide-react'
import axios from 'axios'

interface DashboardStats {
  totalRoundtables: number
  activeRoundtables: number
  totalParticipants: number
  upcomingSessions: number
  pendingFeedback: number
  completedSessions: number
}

interface RecentRoundtable {
  id: string
  name: string
  clientName: string
  status: string
  progress: number
  participantCount: number
  nextSessionDate?: string
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats>({
    totalRoundtables: 0,
    activeRoundtables: 0,
    totalParticipants: 0,
    upcomingSessions: 0,
    pendingFeedback: 0,
    completedSessions: 0
  })
  const [recentRoundtables, setRecentRoundtables] = useState<RecentRoundtable[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      
      // Fetch dashboard stats
      const statsResponse = await axios.get(`${apiUrl}/dashboard/stats`)
      if (statsResponse.data) {
        setStats(statsResponse.data)
      }

      // Fetch recent roundtables
      const roundtablesResponse = await axios.get(`${apiUrl}/roundtables?limit=5`)
      if (roundtablesResponse.data?.data) {
        setRecentRoundtables(roundtablesResponse.data.data)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SETUP': return 'bg-gray-100 text-gray-800'
      case 'TOPIC_VOTING': return 'bg-blue-100 text-blue-800'
      case 'SCHEDULED': return 'bg-purple-100 text-purple-800'
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800'
      case 'COMPLETED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const quickActions = [
    { icon: Plus, label: 'New Roundtable', path: '/roundtables/new', color: 'bg-blue-600' },
    { icon: Users, label: 'Add Participants', path: '/participants/add', color: 'bg-green-600' },
    { icon: Calendar, label: 'Schedule Sessions', path: '/sessions/schedule', color: 'bg-purple-600' },
    { icon: MessageSquare, label: 'Review Questions', path: '/questions', color: 'bg-orange-600' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Maka Roundtables</h1>
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/dashboard" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/roundtables" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Roundtables</a>
                <a href="/clients" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Clients</a>
                <a href="/sessions" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sessions</a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-gray-600 hover:text-gray-900">
                <AlertCircle className="h-5 w-5" />
              </button>
              <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                New Roundtable
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your roundtables.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Roundtables</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRoundtables}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Roundtables</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeRoundtables}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalParticipants}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingSessions}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center space-x-3"
                >
                  <div className={`${action.color} p-2 rounded-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Recent Roundtables */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Recent Roundtables</h2>
              <button 
                onClick={() => navigate('/roundtables')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentRoundtables.length > 0 ? (
              recentRoundtables.map((roundtable) => (
                <div key={roundtable.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          {roundtable.name}
                        </h3>
                        <span className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusColor(roundtable.status)}`}>
                          {roundtable.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-1" />
                        <span className="mr-4">{roundtable.clientName}</span>
                        <Users className="h-4 w-4 mr-1" />
                        <span className="mr-4">{roundtable.participantCount} participants</span>
                        {roundtable.nextSessionDate && (
                          <>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Next: {new Date(roundtable.nextSessionDate).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Progress</p>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${roundtable.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{roundtable.progress || 0}%</span>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/roundtables/${roundtable.id}`)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">No roundtables yet</p>
                <button
                  onClick={() => navigate('/roundtables/new')}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create Your First Roundtable
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Topic voting completed for Leadership Training</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">4 new participants added to Q1 Roundtable</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Sessions scheduled for Innovation Workshop</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}