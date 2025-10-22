import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Users,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Play,
  Send,
  FileText,
  Search,
  Building,
  MoreVertical,
  Edit
} from 'lucide-react'
import { sessionsApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

interface Session {
  id: string
  sessionNumber: number
  scheduledAt: string
  status: string
  questionsStatus: string
  feedbacksStatus: string
  topic: {
    title: string
  }
  roundtable: {
    id: string
    name: string
    client: {
      name: string
      company: string
    }
  }
  trainer?: {
    name: string
    email: string
  }
  questions: any[]
  feedback: any[]
}

export function SessionsPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDropdown, setShowDropdown] = useState<string | null>(null)

  // Check if user is coordinator or admin
  const isCoordinator = user?.role === 'COORDINATOR' || user?.role === 'ADMIN'

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      const response = await sessionsApi.getAll()
      if (response?.data) {
        setSessions(response.data)
      }
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800'
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800'
      case 'COMPLETED': return 'bg-gray-100 text-gray-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return Clock
      case 'IN_PROGRESS': return Play
      case 'COMPLETED': return CheckCircle
      case 'CANCELLED': return AlertCircle
      default: return Clock
    }
  }

  const getQuestionsStatusColor = (status: string) => {
    switch (status) {
      case 'NOT_REQUESTED': return 'bg-gray-100 text-gray-600'
      case 'REQUESTED_FROM_COORDINATOR': return 'bg-orange-100 text-orange-800'
      case 'SAVED_BY_TRAINER': return 'bg-yellow-100 text-yellow-800'
      case 'PENDING_APPROVAL': return 'bg-blue-100 text-blue-800'
      case 'SENT_TO_PARTICIPANTS': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getFeedbacksStatusColor = (status: string) => {
    switch (status) {
      case 'NOT_REQUESTED': return 'bg-gray-100 text-gray-600'
      case 'REQUESTED_FROM_COORDINATOR': return 'bg-orange-100 text-orange-800'
      case 'SAVED_BY_TRAINER': return 'bg-yellow-100 text-yellow-800'
      case 'PENDING_APPROVAL': return 'bg-blue-100 text-blue-800'
      case 'SENT_TO_PARTICIPANTS': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const formatStatusLabel = (status: string) => {
    return status
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ')
  }

  const getNextAction = (session: Session) => {
    const now = new Date()
    const sessionDate = new Date(session.scheduledAt)
    const oneWeekBefore = new Date(sessionDate.getTime() - 7 * 24 * 60 * 60 * 1000)

    if (session.status === 'SCHEDULED') {
      if (now >= oneWeekBefore && session.questions.length === 0) {
        return {
          action: 'request_questions',
          label: 'Request Questions',
          color: 'bg-orange-600',
          icon: MessageSquare
        }
      }
      if (session.questions.length > 0 && now < sessionDate) {
        return {
          action: 'send_questions',
          label: 'Send Questions',
          color: 'bg-blue-600',
          icon: Send
        }
      }
      if (now >= sessionDate) {
        return {
          action: 'start_session',
          label: 'Start Session',
          color: 'bg-green-600',
          icon: Play
        }
      }
    }
    
    if (session.status === 'COMPLETED' && session.feedback.length === 0) {
      return {
        action: 'request_feedback',
        label: 'Request Feedback',
        color: 'bg-purple-600',
        icon: FileText
      }
    }

    return null
  }

  const handleAction = (session: Session, actionType: string) => {
    const topicTitle = session.topic?.title || 'TBD'

    switch (actionType) {
      case 'request_questions':
        alert(`Questions request sent to trainer for ${topicTitle}`)
        break
      case 'send_questions':
        alert(`Questions sent to participants for ${topicTitle}`)
        break
      case 'start_session':
        alert(`Session ${session.sessionNumber} started`)
        break
      case 'request_feedback':
        alert(`Feedback request sent to trainer for ${topicTitle}`)
        break
      default:
        break
    }
  }

  const filteredSessions = sessions.filter(session => {
    const matchesSearch =
      (session.topic?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.roundtable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.roundtable.client.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || session.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/roundtables" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Roundtables</a>
                <a href="/clients" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Clients</a>
                <a href="/sessions" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sessions</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Session Management</h1>
          <p className="text-gray-600 mt-2">Manage all roundtable sessions, questions, and feedback</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.filter(s => s.status === 'SCHEDULED').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Play className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.filter(s => s.status === 'IN_PROGRESS').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.filter(s => s.status === 'COMPLETED').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sessions, topics, or clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredSessions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredSessions.map((session) => {
                const StatusIcon = getStatusIcon(session.status)
                const nextAction = getNextAction(session)
                
                return (
                  <div key={session.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                              <StatusIcon className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="text-lg font-semibold text-gray-900">
                                Session {session.sessionNumber}: {session.topic?.title || 'TBD'}
                              </h3>
                              <span className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                                {formatStatusLabel(session.status)}
                              </span>
                            </div>

                            {/* 3-Column Status Display */}
                            <div className="mt-2 flex items-center space-x-3">
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1 text-gray-400" />
                                <span className={`px-2 py-1 text-xs rounded ${getQuestionsStatusColor(session.questionsStatus)}`}>
                                  Q: {formatStatusLabel(session.questionsStatus)}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-1 text-gray-400" />
                                <span className={`px-2 py-1 text-xs rounded ${getFeedbacksStatusColor(session.feedbacksStatus)}`}>
                                  F: {formatStatusLabel(session.feedbacksStatus)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex items-center text-sm text-gray-600 space-x-4">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                <span>{session.roundtable.client.company} - {session.roundtable.name}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{new Date(session.scheduledAt).toLocaleString()}</span>
                              </div>
                              {session.trainer && (
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>{session.trainer.name}</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-2 flex items-center space-x-4 text-sm">
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1 text-gray-400" />
                                <span className={session.questions.length > 0 ? 'text-green-600' : 'text-gray-500'}>
                                  {session.questions.length} questions
                                </span>
                              </div>
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-1 text-gray-400" />
                                <span className={session.feedback.length > 0 ? 'text-green-600' : 'text-gray-500'}>
                                  {session.feedback.length} feedback
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {nextAction && (
                          <button
                            onClick={() => handleAction(session, nextAction.action)}
                            className={`${nextAction.color} text-white px-4 py-2 rounded-md hover:opacity-90 flex items-center text-sm`}
                          >
                            <nextAction.icon className="h-4 w-4 mr-2" />
                            {nextAction.label}
                          </button>
                        )}
                        
                        <div className="relative">
                          <button
                            onClick={() => setShowDropdown(showDropdown === session.id ? null : session.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                          {showDropdown === session.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                              <button
                                onClick={() => navigate(`/sessions/${session.id}`)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Details
                              </button>
                              {isCoordinator && (
                                <button
                                  onClick={() => navigate(`/sessions/${session.id}/edit`)}
                                  className="flex items-center px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 w-full border-t border-gray-100"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Session
                                </button>
                              )}
                              <button
                                onClick={() => navigate(`/roundtables/${session.roundtable.id}`)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full border-t border-gray-100"
                              >
                                <Building className="h-4 w-4 mr-2" />
                                View Roundtable
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
              <p className="text-gray-600 mb-6">
                Sessions will appear here once roundtables are scheduled
              </p>
              <button
                onClick={() => navigate('/roundtables')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                View Roundtables
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}