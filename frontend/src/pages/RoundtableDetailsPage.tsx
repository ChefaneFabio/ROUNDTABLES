import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Users,
  Building,
  CheckCircle,
  Play,
  MessageSquare,
  BarChart3,
  Plus,
  Vote,
  FileText,
  Settings
} from 'lucide-react'
import { roundtablesApi } from '../services/api'

interface Roundtable {
  id: string
  name: string
  description?: string
  status: string
  startDate?: string
  endDate?: string
  maxParticipants: number
  currentParticipants: number
  client: {
    id: string
    name: string
    company: string
  }
  sessions: any[]
  topics: any[]
  participants?: any[]
  progress: number
}

export function RoundtableDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [roundtable, setRoundtable] = useState<Roundtable | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [scheduleData, setScheduleData] = useState({
    startDate: '',
    sessionFrequency: 'weekly' as 'weekly' | 'bi-weekly',
    sessionDuration: 60
  })
  const [settings, setSettings] = useState({
    minQuestionsPerSession: 0,
    maxQuestionsPerSession: 10,
    minFeedbackItemsPerParticipant: 1,
    maxFeedbackItemsPerParticipant: 5
  })
  const [savingSettings, setSavingSettings] = useState(false)

  useEffect(() => {
    if (id) {
      fetchRoundtable()
      fetchSettings()
    }
  }, [id])

  const fetchRoundtable = async () => {
    try {
      setLoading(true)
      const response = await roundtablesApi.getById(id!)
      if (response?.data) {
        setRoundtable(response.data)
      }
    } catch (error) {
      console.error('Error fetching roundtable:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSettings = async () => {
    try {
      const response = await roundtablesApi.getSettings(id!)
      if (response?.data) {
        setSettings({
          minQuestionsPerSession: response.data.minQuestionsPerSession,
          maxQuestionsPerSession: response.data.maxQuestionsPerSession,
          minFeedbackItemsPerParticipant: response.data.minFeedbackItemsPerParticipant,
          maxFeedbackItemsPerParticipant: response.data.maxFeedbackItemsPerParticipant
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const handleUpdateSettings = async () => {
    if (!id) return

    // Validation
    if (settings.minQuestionsPerSession > settings.maxQuestionsPerSession) {
      alert('Minimum questions cannot be greater than maximum questions')
      return
    }

    if (settings.minFeedbackItemsPerParticipant > settings.maxFeedbackItemsPerParticipant) {
      alert('Minimum feedback items cannot be greater than maximum feedback items')
      return
    }

    try {
      setSavingSettings(true)
      await roundtablesApi.updateSettings(id, settings)
      alert('Settings updated successfully!')
    } catch (error: any) {
      console.error('Error updating settings:', error)
      alert(error.message || 'Error updating settings. Please try again.')
    } finally {
      setSavingSettings(false)
    }
  }

  const handleStartVoting = async () => {
    if (!id) return
    
    try {
      await roundtablesApi.startTopicVoting(id)
      fetchRoundtable() // Refresh data
      alert('Topic voting has been started! Participants can now vote.')
    } catch (error) {
      console.error('Error starting voting:', error)
      alert('Error starting voting. Please try again.')
    }
  }

  const handleFinalizeVoting = async () => {
    if (!id) return

    try {
      await roundtablesApi.finalizeTopicVoting(id)
      fetchRoundtable() // Refresh data
      alert('Topic voting has been finalized! Sessions can now be scheduled.')
    } catch (error) {
      console.error('Error finalizing voting:', error)
      alert('Error finalizing voting. Please try again.')
    }
  }

  const handleScheduleSessions = async () => {
    if (!id || !scheduleData.startDate) {
      alert('Please select a start date')
      return
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${apiUrl}/roundtables/${id}/schedule-sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleData)
      })

      const data = await response.json()

      if (data.success) {
        alert(`Successfully scheduled ${data.data.sessions?.length || 10} sessions!`)
        setShowScheduleModal(false)
        fetchRoundtable() // Refresh data
      } else {
        throw new Error(data.error || 'Failed to schedule sessions')
      }
    } catch (error: any) {
      console.error('Error scheduling sessions:', error)
      alert(error.message || 'Error scheduling sessions. Please try again.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SETUP': return 'bg-gray-100 text-gray-800'
      case 'TOPIC_VOTING': return 'bg-blue-100 text-blue-800'
      case 'SCHEDULED': return 'bg-purple-100 text-purple-800'
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800'
      case 'COMPLETED': return 'bg-gray-400 text-white'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getNextAction = () => {
    if (!roundtable) return null

    switch (roundtable.status) {
      case 'SETUP':
        return {
          title: 'Start Topic Voting',
          description: 'Begin the topic voting process for participants',
          action: handleStartVoting,
          icon: Vote,
          color: 'bg-blue-600'
        }
      case 'TOPIC_VOTING':
        return {
          title: 'Finalize Voting',
          description: 'Close voting and prepare selected topics',
          action: handleFinalizeVoting,
          icon: CheckCircle,
          color: 'bg-green-600'
        }
      case 'SCHEDULED':
        return {
          title: 'Start Sessions',
          description: 'Begin the first roundtable session',
          action: () => alert('Session management coming soon'),
          icon: Play,
          color: 'bg-purple-600'
        }
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!roundtable) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Roundtable not found</h2>
          <button
            onClick={() => navigate('/roundtables')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Roundtables
          </button>
        </div>
      </div>
    )
  }

  const nextAction = getNextAction()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* This page uses AppLayout now, so remove duplicate navigation */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/roundtables')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Roundtables
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{roundtable.name}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{roundtable.client.name} - {roundtable.client.company}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(roundtable.status)}`}>
                  {roundtable.status.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/vote/${roundtable.id}`)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
              >
                <Vote className="h-4 w-4 mr-2" />
                Voting Page
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roundtable.currentParticipants || 0} / {roundtable.maxParticipants}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roundtable.sessions?.length || 0} / 10
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Topics</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roundtable.topics?.length || 0} / 10
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roundtable.progress || 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Action */}
        {nextAction && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`${nextAction.color} p-3 rounded-lg`}>
                  <nextAction.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{nextAction.title}</h3>
                  <p className="text-gray-600">{nextAction.description}</p>
                </div>
              </div>
              <button
                onClick={nextAction.action}
                className={`${nextAction.color} text-white px-6 py-2 rounded-md hover:opacity-90`}
              >
                {nextAction.title}
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'participants', label: 'Participants', icon: Users },
                { id: 'sessions', label: 'Sessions', icon: Calendar },
                { id: 'topics', label: 'Topics', icon: MessageSquare },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">
                    {roundtable.description || 'No description provided.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Timeline</h3>
                  <div className="space-y-2">
                    {roundtable.startDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Start Date: {new Date(roundtable.startDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {roundtable.endDate && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>End Date: {new Date(roundtable.endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'participants' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Participants</h3>
                  <button
                    onClick={() => navigate('/participants')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Manage Participants
                  </button>
                </div>

                {roundtable.participants && roundtable.participants.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roundtable.participants.map((participant: any) => (
                      <div key={participant.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900">{participant.name}</h4>
                        <p className="text-sm text-gray-600">{participant.email}</p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {participant.languageLevel}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            participant.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {participant.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No participants added yet</p>
                    <p className="text-sm">Click "Manage Participants" to add participants</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sessions' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sessions</h3>
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Sessions
                  </button>
                </div>

                {roundtable.sessions && roundtable.sessions.length > 0 ? (
                  <div className="space-y-3">
                    {roundtable.sessions.map((session: any) => {
                      // Check if session has a proper scheduled date (not the placeholder date)
                      const isScheduled = session.scheduledAt && new Date(session.scheduledAt) > new Date('2020-01-01')

                      return (
                        <div
                          key={session.id}
                          className={`border rounded-lg p-4 ${
                            isScheduled
                              ? 'border-gray-200 hover:bg-gray-50 cursor-pointer'
                              : 'border-gray-300 bg-gray-50'
                          }`}
                          onClick={() => isScheduled && navigate(`/sessions/${session.id}`)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                Session {session.sessionNumber}/10
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {session.topic?.title || 'Topic TBD'}
                              </p>
                              {isScheduled ? (
                                <p className="text-sm text-gray-500 mt-1">
                                  {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                                  {new Date(session.scheduledAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              ) : (
                                <p className="text-sm text-orange-600 mt-1 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Not scheduled yet - Click "Schedule Sessions" above
                                </p>
                              )}
                              {session.trainer && (
                                <p className="text-sm text-gray-600 mt-1">
                                  Trainer: {session.trainer.name}
                                </p>
                              )}
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                              {session.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No sessions created yet</p>
                    <p className="text-sm">Sessions will be created when the roundtable is set up</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'topics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion Topics</h3>

                {roundtable.topics && roundtable.topics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roundtable.topics.map((topic, index) => (
                      <div key={topic.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {index + 1}. {topic.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                        {topic.isSelected && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Selected
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No topics defined yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Roundtable Settings</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Configure question and feedback limits for this roundtable. These settings will apply to all sessions.
                </p>

                <div className="max-w-2xl space-y-6">
                  {/* Questions Settings */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                      Question Limits
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Questions per Session
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={settings.minQuestionsPerSession}
                          onChange={(e) => setSettings({
                            ...settings,
                            minQuestionsPerSession: parseInt(e.target.value) || 0
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum: 0 (optional), Maximum: 10
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Questions per Session
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={settings.maxQuestionsPerSession}
                          onChange={(e) => setSettings({
                            ...settings,
                            maxQuestionsPerSession: parseInt(e.target.value) || 10
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum: 1, Maximum: 10
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-xs text-blue-800">
                        💡 Trainers can submit between {settings.minQuestionsPerSession} and {settings.maxQuestionsPerSession} questions per session
                      </p>
                    </div>
                  </div>

                  {/* Feedback Settings */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-purple-600" />
                      Feedback Limits
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Feedback Items per Participant
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={settings.minFeedbackItemsPerParticipant}
                          onChange={(e) => setSettings({
                            ...settings,
                            minFeedbackItemsPerParticipant: parseInt(e.target.value) || 1
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum: 1, Maximum: 10
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Feedback Items per Participant
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={settings.maxFeedbackItemsPerParticipant}
                          onChange={(e) => setSettings({
                            ...settings,
                            maxFeedbackItemsPerParticipant: parseInt(e.target.value) || 5
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum: 1, Maximum: 10
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-md">
                      <p className="text-xs text-purple-800">
                        💡 Trainers can provide between {settings.minFeedbackItemsPerParticipant} and {settings.maxFeedbackItemsPerParticipant} feedback items for each participant
                      </p>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleUpdateSettings}
                      disabled={savingSettings}
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium"
                    >
                      {savingSettings ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Save Settings
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Sessions Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Schedule Sessions
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Create a calendar for all 10 roundtable sessions
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={scheduleData.startDate}
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, startDate: e.target.value })
                  }
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Date for the first session (Session 1)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Frequency
                </label>
                <select
                  value={scheduleData.sessionFrequency}
                  onChange={(e) =>
                    setScheduleData({
                      ...scheduleData,
                      sessionFrequency: e.target.value as 'weekly' | 'bi-weekly'
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="weekly">Weekly (every 7 days)</option>
                  <option value="bi-weekly">Bi-weekly (every 14 days)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Duration (minutes)
                </label>
                <input
                  type="number"
                  value={scheduleData.sessionDuration}
                  onChange={(e) =>
                    setScheduleData({
                      ...scheduleData,
                      sessionDuration: parseInt(e.target.value) || 60
                    })
                  }
                  min="30"
                  max="180"
                  step="15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-medium mb-1">What happens next:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>10 sessions will be created automatically</li>
                  <li>Session 1: Introduction (no topic)</li>
                  <li>Sessions 2-9: Assigned to selected topics</li>
                  <li>Session 10: Wrap-up and conclusion</li>
                  <li>Trainers can be assigned to sessions later</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleSessions}
                disabled={!scheduleData.startDate}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule 10 Sessions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}