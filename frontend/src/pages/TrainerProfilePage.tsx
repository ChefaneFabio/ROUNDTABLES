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
  LogOut,
  Plus,
  X,
  Sparkles,
  BookOpen
} from 'lucide-react'
import { trainersApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { QuestionSuggestionsPanel } from '../components/trainer/QuestionSuggestionsPanel'
import { QuestionsLibraryPanel } from '../components/trainer/QuestionsLibraryPanel'

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
  questionsStatus: string
  feedbacksStatus: string
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
  const [questions, setQuestions] = useState<string[]>([])
  const [feedbacks, setFeedbacks] = useState<Record<string, Array<{type: string, content: string}>>>({})

  // Question and feedback limits (TODO: fetch from roundtable settings API)
  const questionLimits = { min: 0, max: 10 }
  const feedbackLimits = { min: 1, max: 5 }

  // Panel states
  const [showAISuggestions, setShowAISuggestions] = useState(false)
  const [showQuestionLibrary, setShowQuestionLibrary] = useState(false)

  useEffect(() => {
    fetchTrainerData()
  }, [])

  const fetchTrainerData = async () => {
    try {
      setLoading(true)

      // Get email from logged-in user
      const trainerEmail = user?.email

      if (!trainerEmail) {
        console.error('No user email found')
        setLoading(false)
        return
      }

      // Fetch trainer profile
      const profileRes = await trainersApi.getProfile(trainerEmail)
      setProfile(profileRes.data)

      // Fetch sessions
      const sessionsRes = await trainersApi.getSessions(trainerEmail)
      setSessions(sessionsRes.data)
    } catch (error) {
      console.error('Error fetching trainer data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveQuestions = async () => {
    if (!selectedSession) {
      alert('No session selected')
      return
    }

    // Validate all questions are filled
    if (questions.some(q => !q.trim())) {
      alert('Please fill in all questions before saving')
      return
    }

    // Validate question count against limits
    if (questions.length < questionLimits.min) {
      alert(`Minimum ${questionLimits.min} question(s) required for this roundtable`)
      return
    }

    if (questions.length > questionLimits.max) {
      alert(`Maximum ${questionLimits.max} questions allowed for this roundtable`)
      return
    }

    try {
      const trainerEmail = user?.email

      if (!trainerEmail) {
        alert('User email not found')
        return
      }

      await trainersApi.saveQuestions(
        selectedSession.id,
        trainerEmail,
        questions.map((q) => ({ question: q }))
      )

      alert('Questions saved successfully! Weekly reminders have been stopped. You can edit and submit for approval later.')
      setShowQuestionsForm(false)
      setQuestions([])
      fetchTrainerData() // Refresh data
    } catch (error: any) {
      alert(error.message || 'Failed to save questions')
    }
  }

  const handleSubmitQuestions = async () => {
    if (!selectedSession) {
      alert('No session selected')
      return
    }

    // Validate all questions are filled
    if (questions.some(q => !q.trim())) {
      alert('Please fill in all questions before submitting')
      return
    }

    // Validate question count against limits
    if (questions.length < questionLimits.min) {
      alert(`Minimum ${questionLimits.min} question(s) required for this roundtable`)
      return
    }

    if (questions.length > questionLimits.max) {
      alert(`Maximum ${questionLimits.max} questions allowed for this roundtable`)
      return
    }

    try {
      const trainerEmail = user?.email

      if (!trainerEmail) {
        alert('User email not found')
        return
      }

      await trainersApi.submitQuestions(
        selectedSession.id,
        trainerEmail,
        questions.map((q) => ({ question: q }))
      )

      alert('Questions submitted successfully! Awaiting coordinator approval.')
      setShowQuestionsForm(false)
      setQuestions([])
      fetchTrainerData() // Refresh data
    } catch (error: any) {
      alert(error.message || 'Failed to submit questions')
    }
  }

  const handleAddQuestion = () => {
    if (questions.length < questionLimits.max) {
      setQuestions([...questions, ''])
    }
  }

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
  }

  const handleUseAISuggestion = (question: string, _source: 'AI_GENERATED' | 'TEMPLATE') => {
    if (questions.length < questionLimits.max) {
      setQuestions([...questions, question])
    } else {
      alert(`Maximum ${questionLimits.max} questions allowed`)
    }
  }

  const handleUseLibraryQuestion = (question: string, _source: 'LIBRARY') => {
    if (questions.length < questionLimits.max) {
      setQuestions([...questions, question])
    } else {
      alert(`Maximum ${questionLimits.max} questions allowed`)
    }
  }

  const handleSubmitFeedback = async () => {
    if (!selectedSession) return

    // Build flat array of feedback items
    const feedbackArray: any[] = []
    selectedSession.roundtable.participants.forEach(p => {
      const participantFeedbacks = feedbacks[p.id] || []
      participantFeedbacks.forEach((item, index) => {
        feedbackArray.push({
          participantId: p.id,
          content: item.content,
          feedbackType: item.type,
          orderIndex: index
        })
      })
    })

    // Validate each participant has min feedback items
    for (const participant of selectedSession.roundtable.participants) {
      const count = (feedbacks[participant.id] || []).length
      if (count < feedbackLimits.min) {
        alert(`Please provide at least ${feedbackLimits.min} feedback item(s) for ${participant.name}`)
        return
      }
      if (count > feedbackLimits.max) {
        alert(`Maximum ${feedbackLimits.max} feedback items allowed per participant`)
        return
      }
      // Check all items have content
      const items = feedbacks[participant.id] || []
      if (items.some(item => !item.content.trim())) {
        alert(`Please fill in all feedback items for ${participant.name}`)
        return
      }
    }

    try {
      const trainerEmail = user?.email

      if (!trainerEmail) {
        alert('User email not found')
        return
      }

      await trainersApi.submitFeedback(selectedSession.id, trainerEmail, feedbackArray)

      alert('Feedback submitted successfully! Awaiting coordinator approval.')
      setShowFeedbackForm(false)
      setFeedbacks({})
      fetchTrainerData() // Refresh data
    } catch (error: any) {
      alert(error.message || 'Failed to submit feedback')
    }
  }

  const handleAddFeedbackItem = (participantId: string) => {
    const current = feedbacks[participantId] || []
    if (current.length < feedbackLimits.max) {
      setFeedbacks({
        ...feedbacks,
        [participantId]: [...current, { type: 'GENERAL', content: '' }]
      })
    }
  }

  const handleRemoveFeedbackItem = (participantId: string, index: number) => {
    const current = feedbacks[participantId] || []
    setFeedbacks({
      ...feedbacks,
      [participantId]: current.filter((_, i) => i !== index)
    })
  }

  const handleFeedbackChange = (participantId: string, index: number, field: 'type' | 'content', value: string) => {
    const current = feedbacks[participantId] || []
    const updated = [...current]
    updated[index] = { ...updated[index], [field]: value }
    setFeedbacks({
      ...feedbacks,
      [participantId]: updated
    })
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

                          {/* 3-Column Status Display */}
                          <div className="flex items-center gap-3 mt-2">
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
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Submit Questions - Session {selectedSession.sessionNumber}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedSession.topic?.title} • {selectedSession.roundtable.name}
              </p>
              <div className="mt-2 text-sm text-gray-600">
                Questions: {questions.length} / {questionLimits.max}
                {questionLimits.min > 0 && ` (minimum: ${questionLimits.min})`}
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* AI Suggestions and Library Buttons */}
              <div className="flex gap-3 pb-4 border-b border-gray-200">
                <button
                  onClick={() => setShowAISuggestions(true)}
                  className="flex-1 px-4 py-3 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 text-purple-700 font-medium flex items-center justify-center"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  AI Suggestions
                </button>
                <button
                  onClick={() => setShowQuestionLibrary(true)}
                  className="flex-1 px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 text-blue-700 font-medium flex items-center justify-center"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Question Library
                </button>
              </div>

              {/* Dynamic Questions List */}
              {questions.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">
                    No questions yet. Click "Add Question" or use AI/Library to get started.
                  </p>
                  <button
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </button>
                </div>
              ) : (
                questions.map((question, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Question {idx + 1} *
                      </label>
                      {questions.length > questionLimits.min && (
                        <button
                          onClick={() => handleRemoveQuestion(idx)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Remove question"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={question}
                      onChange={(e) => handleQuestionChange(idx, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Enter question ${idx + 1}...`}
                    />
                  </div>
                ))
              )}

              {/* Add Question Button */}
              {questions.length > 0 && questions.length < questionLimits.max && (
                <button
                  onClick={handleAddQuestion}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-medium flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Question ({questions.length}/{questionLimits.max})
                </button>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <strong>Note:</strong> Questions will be sent to the coordinator for approval before being shared with participants.
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between items-center gap-3">
              <button
                onClick={() => {
                  setShowQuestionsForm(false)
                  setQuestions([])
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveQuestions}
                  disabled={questions.length < questionLimits.min || questions.length > questionLimits.max}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    questions.length >= questionLimits.min && questions.length <= questionLimits.max
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  title="Save questions and stop weekly reminders. You can edit later."
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Questions (Stop Reminders)
                </button>
                <button
                  onClick={handleSubmitQuestions}
                  disabled={questions.length < questionLimits.min || questions.length > questionLimits.max}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    questions.length >= questionLimits.min && questions.length <= questionLimits.max
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit for Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestions Panel */}
      <QuestionSuggestionsPanel
        sessionId={selectedSession?.id || ''}
        trainerEmail={user?.email || ''}
        isOpen={showAISuggestions}
        onClose={() => setShowAISuggestions(false)}
        onUseQuestion={handleUseAISuggestion}
      />

      {/* Question Library Panel */}
      <QuestionsLibraryPanel
        sessionId={selectedSession?.id || ''}
        isOpen={showQuestionLibrary}
        onClose={() => setShowQuestionLibrary(false)}
        onUseQuestion={handleUseLibraryQuestion}
      />

      {/* Feedback Form Modal */}
      {showFeedbackForm && selectedSession && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Submit Feedback - Session {selectedSession.sessionNumber}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedSession.topic?.title} • {selectedSession.roundtable.name}
              </p>
              <div className="mt-2 text-sm text-gray-600">
                Feedback items per participant: {feedbackLimits.min}-{feedbackLimits.max}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {selectedSession.roundtable.participants.map((participant: any) => {
                const participantFeedbacks = feedbacks[participant.id] || []

                return (
                  <div key={participant.id} className="border-2 border-gray-200 rounded-lg p-5 bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{participant.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {participant.email} • Level: {participant.languageLevel}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddFeedbackItem(participant.id)}
                        disabled={participantFeedbacks.length >= feedbackLimits.max}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                          participantFeedbacks.length < feedbackLimits.max
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Item
                      </button>
                    </div>

                    {/* Feedback Items */}
                    {participantFeedbacks.length === 0 ? (
                      <div className="text-center py-6 bg-white rounded border-2 border-dashed border-gray-300">
                        <p className="text-gray-600">
                          No feedback items yet. Click "Add Item" to start.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {participantFeedbacks.map((item, idx) => (
                          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1 grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Feedback Type
                                  </label>
                                  <select
                                    value={item.type}
                                    onChange={(e) => handleFeedbackChange(participant.id, idx, 'type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                    <option value="GENERAL">General</option>
                                    <option value="STRENGTHS">Strengths</option>
                                    <option value="IMPROVEMENTS">Areas to Improve</option>
                                    <option value="RECOMMENDATIONS">Recommendations</option>
                                  </select>
                                </div>
                                <div className="flex items-end">
                                  <span className="text-xs text-gray-500">
                                    Item {idx + 1} of {participantFeedbacks.length}
                                  </span>
                                </div>
                              </div>
                              {participantFeedbacks.length > feedbackLimits.min && (
                                <button
                                  onClick={() => handleRemoveFeedbackItem(participant.id, idx)}
                                  className="ml-3 text-red-600 hover:text-red-700 p-1"
                                  title="Remove feedback item"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                            <textarea
                              value={item.content}
                              onChange={(e) => handleFeedbackChange(participant.id, idx, 'content', e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder={`Enter ${item.type.toLowerCase()} feedback...`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-orange-800">
                <strong>Note:</strong> Feedback will be sent to the coordinator for approval before being shared with participants.
                Each participant requires {feedbackLimits.min}-{feedbackLimits.max} feedback items.
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
