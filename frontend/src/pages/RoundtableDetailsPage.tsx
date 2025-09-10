import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Users,
  Building,
  Clock,
  CheckCircle,
  Play,
  MessageSquare,
  BarChart3,
  Edit,
  Trash2,
  Plus,
  Vote,
  FileText,
  Settings
} from 'lucide-react'
import { roundtablesApi, participantsApi, sessionsApi } from '../services/api'

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

  useEffect(() => {
    if (id) {
      fetchRoundtable()
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
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Maka Roundtables</h1>
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/roundtables" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Roundtables</a>
                <a href="/clients" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Clients</a>
                <a href="/sessions" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sessions</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit
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
                { id: 'topics', label: 'Topics', icon: MessageSquare }
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
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Participant
                  </button>
                </div>
                
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No participants added yet</p>
                  <p className="text-sm">Add participants to start the roundtable</p>
                </div>
              </div>
            )}

            {activeTab === 'sessions' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sessions</h3>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Sessions
                  </button>
                </div>
                
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No sessions scheduled yet</p>
                  <p className="text-sm">Sessions will be scheduled after topic voting is complete</p>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  )
}