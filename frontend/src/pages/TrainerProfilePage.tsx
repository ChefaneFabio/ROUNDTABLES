import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  MessageSquare,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Send,
  LogOut
} from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

interface TrainerProfile {
  id: string
  name: string
  email: string
  expertise: string[]
  isActive: boolean
  stats: {
    upcomingSessionsCount: number
    completedSessionsCount: number
    questionsPendingCount: number
    feedbackPendingCount: number
    totalSessions: number
  }
}

interface SessionContext {
  previousSession: {
    sessionNumber: number
    topicTitle: string
    scheduledAt: Date
    trainerName: string
  } | null
  nextSession: {
    sessionNumber: number
    topicTitle: string
    scheduledAt: Date
    trainerName: string
  } | null
}

interface TrainerSession {
  id: string
  sessionNumber: number
  scheduledAt: Date
  status: string
  roundtable: {
    id: string
    name: string
    client: {
      name: string
      company: string
    }
    participants: any[]
  }
  topic: {
    id: string
    title: string
    description: string
  } | null
  questions: any[]
  feedback: any[]
  context: SessionContext
  deadlines: {
    questions: Date
    feedback: Date
  }
  actionRequired: {
    needsQuestions: boolean
    needsFeedback: boolean
  }
}

export function TrainerProfilePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sessions' | 'calendar' | 'profile'>('dashboard')
  const [profile, setProfile] = useState<TrainerProfile | null>(null)
  const [sessions, setSessions] = useState<TrainerSession[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedSession, setExpandedSession] = useState<string | null>(null)

  // Forms state
  const [showQuestionsForm, setShowQuestionsForm] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [selectedSession, setSelectedSession] = useState<TrainerSession | null>(null)
  const [questions, setQuestions] = useState(['', '', ''])
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchTrainerData()
  }, [])

  const fetchTrainerData = async () => {
    try {
      setLoading(true)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

      // Get email from logged-in user
      const trainerEmail = user?.email

      if (!trainerEmail) {
        console.error('No user email found')
        setLoading(false)
        return
      }

      // Fetch trainer profile
      const profileRes = await axios.get(`${apiUrl}/trainers/me?email=${trainerEmail}`)
      setProfile(profileRes.data.data)

      // Fetch sessions
      const sessionsRes = await axios.get(`${apiUrl}/trainers/me/sessions?email=${trainerEmail}`)
      setSessions(sessionsRes.data.data)
    } catch (error) {
      console.error('Error fetching trainer data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitQuestions = async () => {
    if (!selectedSession || questions.some(q => !q.trim())) {
      alert('Please fill in all 3 questions')
      return
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const trainerEmail = user?.email

      if (!trainerEmail) {
        alert('User email not found')
        return
      }

      await axios.post(
        `${apiUrl}/trainers/me/sessions/${selectedSession.id}/questions?email=${trainerEmail}`,
        {
          questions: questions.map((q) => ({ question: q }))
        }
      )

      alert('Questions submitted successfully! Awaiting coordinator approval.')
      setShowQuestionsForm(false)
      setQuestions(['', '', ''])
      fetchTrainerData() // Refresh data
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to submit questions')
    }
  }

  const handleSubmitFeedback = async () => {
    if (!selectedSession) return

    const feedbackArray = selectedSession.roundtable.participants.map(p => ({
      participantId: p.id,
      content: feedbacks[p.id] || ''
    }))

    if (feedbackArray.some(f => !f.content.trim())) {
      alert('Please provide feedback for all participants')
      return
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const trainerEmail = user?.email

      if (!trainerEmail) {
        alert('User email not found')
        return
      }

      await axios.post(
        `${apiUrl}/trainers/me/sessions/${selectedSession.id}/feedback?email=${trainerEmail}`,
        { feedbacks: feedbackArray }
      )

      alert('Feedback submitted successfully! Awaiting coordinator approval.')
      setShowFeedbackForm(false)
      setFeedbacks({})
      fetchTrainerData() // Refresh data
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to submit feedback')
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getDaysUntil = (date: Date) => {
    const days = Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return days
  }

  const getSessionStatusColor = (session: TrainerSession) => {
    if (session.actionRequired.needsQuestions) return 'bg-red-100 border-red-300 text-red-800'
    if (session.actionRequired.needsFeedback) return 'bg-orange-100 border-orange-300 text-orange-800'
    if (session.questions.length > 0 && session.questions[0].status === 'PENDING') return 'bg-yellow-100 border-yellow-300 text-yellow-800'
    if (session.feedback.length > 0) return 'bg-green-100 border-green-300 text-green-800'
    return 'bg-gray-100 border-gray-300 text-gray-800'
  }

  const getSessionStatusLabel = (session: TrainerSession) => {
    if (session.actionRequired.needsQuestions) return 'Questions Overdue'
    if (session.actionRequired.needsFeedback) return 'Feedback Needed'
    if (session.questions.length > 0 && session.questions[0].status === 'PENDING') return 'Questions Pending Approval'
    if (session.feedback.length > 0 && session.feedback[0].status === 'PENDING') return 'Feedback Pending Approval'
    if (session.feedback.length > 0) return 'Completed'
    return 'Scheduled'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Trainer Not Found</h2>
          <p className="text-gray-600 mb-4">Unable to load trainer profile</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Maka Roundtables</h1>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Trainer Portal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{profile.name}</span>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600 mt-1">{profile.email}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.expertise.map((exp, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Status</div>
              <div className={`mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                profile.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {profile.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{profile.stats.upcomingSessionsCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Questions Pending</p>
                <p className="text-2xl font-bold text-gray-900">{profile.stats.questionsPendingCount}</p>
              </div>
              <MessageSquare className={`h-8 w-8 ${
                profile.stats.questionsPendingCount > 0 ? 'text-red-600' : 'text-gray-400'
              }`} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Feedback Pending</p>
                <p className="text-2xl font-bold text-gray-900">{profile.stats.feedbackPendingCount}</p>
              </div>
              <FileText className={`h-8 w-8 ${
                profile.stats.feedbackPendingCount > 0 ? 'text-orange-600' : 'text-gray-400'
              }`} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{profile.stats.completedSessionsCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'dashboard'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('sessions')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'sessions'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                My Sessions ({sessions.length})
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'calendar'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar View
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Required</h3>
                  {sessions.filter(s => s.actionRequired.needsQuestions || s.actionRequired.needsFeedback).length === 0 ? (
                    <div className="text-center py-8 bg-green-50 rounded-lg">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800">All caught up! No actions required.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sessions
                        .filter(s => s.actionRequired.needsQuestions || s.actionRequired.needsFeedback)
                        .map(session => (
                          <div key={session.id} className={`p-4 border-2 rounded-lg ${getSessionStatusColor(session)}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold">
                                  Session {session.sessionNumber} - {session.topic?.title || 'TBD'}
                                </h4>
                                <p className="text-sm mt-1">
                                  {session.roundtable.name} • {formatDate(session.scheduledAt)} at {formatTime(session.scheduledAt)}
                                </p>
                                <div className="mt-2">
                                  {session.actionRequired.needsQuestions && (
                                    <span className="text-sm font-medium">⚠️ Questions overdue!</span>
                                  )}
                                  {session.actionRequired.needsFeedback && (
                                    <span className="text-sm font-medium">⚠️ Feedback needed!</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 ml-4">
                                {session.actionRequired.needsQuestions && session.questions.length === 0 && (
                                  <button
                                    onClick={() => {
                                      setSelectedSession(session)
                                      setShowQuestionsForm(true)
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm whitespace-nowrap"
                                  >
                                    Submit Questions
                                  </button>
                                )}
                                {session.actionRequired.needsFeedback && session.feedback.length === 0 && (
                                  <button
                                    onClick={() => {
                                      setSelectedSession(session)
                                      setShowFeedbackForm(true)
                                    }}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm whitespace-nowrap"
                                  >
                                    Submit Feedback
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
                  <div className="space-y-3">
                    {sessions
                      .filter(s => new Date(s.scheduledAt) > new Date())
                      .slice(0, 5)
                      .map(session => (
                        <div key={session.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                Session {session.sessionNumber}/10
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {session.topic?.title || 'Topic TBD'} • {session.roundtable.name}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {formatDate(session.scheduledAt)} at {formatTime(session.scheduledAt)} ({getDaysUntil(session.scheduledAt)} days)
                              </p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Sessions Tab */}
            {activeTab === 'sessions' && (
              <div className="space-y-4">
                {sessions.map(session => (
                  <div key={session.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Session Header */}
                    <div
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${getSessionStatusColor(session)}`}
                      onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-lg">
                              Session {session.sessionNumber}/10
                            </h4>
                            <span className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs font-medium">
                              {getSessionStatusLabel(session)}
                            </span>
                          </div>
                          <p className="text-sm mt-1 font-medium">
                            {session.topic?.title || 'Topic TBD'}
                          </p>
                          <p className="text-sm mt-1">
                            {session.roundtable.name} • {session.roundtable.client.company}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatDate(session.scheduledAt)} at {formatTime(session.scheduledAt)}
                            </span>
                            <span>
                              {session.roundtable.participants.length} participants
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.questions.length > 0 && (
                            <span className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                              {session.questions.length} Q
                            </span>
                          )}
                          {session.feedback.length > 0 && (
                            <span className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                              {session.feedback.length} F
                            </span>
                          )}
                          {expandedSession === session.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Session Details */}
                    {expandedSession === session.id && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        {/* Context */}
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Session Context</h5>
                          <div className="bg-white rounded-lg p-3 space-y-2 text-sm">
                            {session.context.previousSession && (
                              <div className="flex items-center text-gray-600">
                                <ArrowLeft className="h-4 w-4 mr-2 text-gray-400" />
                                <span>
                                  Previous: Session {session.context.previousSession.sessionNumber} - "{session.context.previousSession.topicTitle}"
                                  ({formatDate(session.context.previousSession.scheduledAt)})
                                </span>
                              </div>
                            )}
                            <div className="flex items-center font-medium">
                              <span className="mr-2">→</span>
                              <span>
                                THIS SESSION: Session {session.sessionNumber} - "{session.topic?.title || 'TBD'}"
                                ({formatDate(session.scheduledAt)})
                              </span>
                            </div>
                            {session.context.nextSession && (
                              <div className="flex items-center text-gray-600">
                                <ArrowRight className="h-4 w-4 mr-2 text-gray-400" />
                                <span>
                                  Next: Session {session.context.nextSession.sessionNumber} - "{session.context.nextSession.topicTitle}"
                                  ({formatDate(session.context.nextSession.scheduledAt)})
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          {session.questions.length === 0 ? (
                            <button
                              onClick={() => {
                                setSelectedSession(session)
                                setShowQuestionsForm(true)
                              }}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Submit Questions
                            </button>
                          ) : (
                            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Questions {session.questions[0].status.toLowerCase()}
                            </div>
                          )}

                          {new Date(session.scheduledAt) < new Date() && session.feedback.length === 0 && (
                            <button
                              onClick={() => {
                                setSelectedSession(session)
                                setFeedbacks({})
                                setShowFeedbackForm(true)
                              }}
                              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Submit Feedback
                            </button>
                          )}

                          {session.feedback.length > 0 && (
                            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Feedback {session.feedback[0].status.toLowerCase()}
                            </div>
                          )}
                        </div>

                        {/* Deadlines */}
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                          <div className="font-medium text-yellow-900 mb-1">Deadlines:</div>
                          <div className="text-yellow-800">
                            Questions: {formatDate(session.deadlines.questions)} (7 days before session)
                          </div>
                          <div className="text-yellow-800">
                            Feedback: {formatDate(session.deadlines.feedback)} (1 day after session)
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div>
                <p className="text-gray-600 text-center py-8">
                  Calendar view coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Questions Form Modal */}
      {showQuestionsForm && selectedSession && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Submit Questions - Session {selectedSession.sessionNumber}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedSession.topic?.title} • {selectedSession.roundtable.name}
              </p>
            </div>

            <div className="p-6 space-y-4">
              {[0, 1, 2].map(idx => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question {idx + 1} *
                  </label>
                  <textarea
                    value={questions[idx]}
                    onChange={(e) => {
                      const newQuestions = [...questions]
                      newQuestions[idx] = e.target.value
                      setQuestions(newQuestions)
                    }}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter question ${idx + 1}...`}
                  />
                </div>
              ))}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <strong>Note:</strong> Questions will be sent to the coordinator for approval before being shared with participants.
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowQuestionsForm(false)
                  setQuestions(['', '', ''])
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuestions}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Questions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Form Modal */}
      {showFeedbackForm && selectedSession && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Submit Feedback - Session {selectedSession.sessionNumber}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedSession.topic?.title} • {selectedSession.roundtable.name}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {selectedSession.roundtable.participants.map((participant: any) => (
                <div key={participant.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{participant.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {participant.email} • Level: {participant.languageLevel}
                  </p>
                  <textarea
                    value={feedbacks[participant.id] || ''}
                    onChange={(e) => setFeedbacks({ ...feedbacks, [participant.id]: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide detailed feedback for this participant..."
                  />
                </div>
              ))}

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-orange-800">
                <strong>Note:</strong> Feedback will be sent to the coordinator for approval before being shared with participants.
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowFeedbackForm(false)
                  setFeedbacks({})
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
