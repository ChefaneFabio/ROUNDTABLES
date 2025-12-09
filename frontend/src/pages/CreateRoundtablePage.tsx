import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Building, Plus, Trash2 } from 'lucide-react'
import { roundtablesApi, clientsApi } from '../services/api'
import { SessionFormFields } from '../components/SessionFormFields'
import axios from 'axios'

interface Client {
  id: string
  name: string
  company: string
}

interface Topic {
  title: string
  description: string
}

interface Trainer {
  id: string
  name: string
  email: string
  expertise: string[]
  isActive: boolean
}

interface SessionData {
  sessionNumber: number
  scheduledAt: string
  topicId?: string
  customTopicTitle?: string
  trainerId?: string
  notes?: string
  meetingLink?: string
}

export function CreateRoundtablePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselectedClientId = searchParams.get('clientId')

  const [clients, setClients] = useState<Client[]>([])
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientId: preselectedClientId || '',
    startDate: '',
    maxParticipants: 6,
    numberOfSessions: 10
  })

  // Initialize topics based on default numberOfSessions (10 sessions = 8 topics)
  const [topics, setTopics] = useState<Topic[]>(() => {
    const defaultTopicCount = 10 - 2 // numberOfSessions - 2 (first and last are intro/conclusion)
    return Array.from({ length: defaultTopicCount }, () => ({ title: '', description: '' }))
  })

  const [sessions, setSessions] = useState<SessionData[]>([])
  const [sessionsConfigured, setSessionsConfigured] = useState(false)

  useEffect(() => {
    fetchClients()
    fetchTrainers()
  }, [])

  // Sync topics count with numberOfSessions
  // Formula: topics = sessions - 2 (first session = intro, last session = conclusion)
  useEffect(() => {
    const requiredTopics = Math.max(6, formData.numberOfSessions - 2) // Minimum 6 topics
    const currentTopics = topics.length

    if (requiredTopics !== currentTopics) {
      if (requiredTopics > currentTopics) {
        // Add empty topics
        const newTopics = [...topics]
        for (let i = currentTopics; i < requiredTopics; i++) {
          newTopics.push({ title: '', description: '' })
        }
        setTopics(newTopics)
      } else if (requiredTopics < currentTopics) {
        // Remove extra topics, but only if they're empty
        const filledTopics = topics.filter(t => t.title.trim())
        if (filledTopics.length <= requiredTopics) {
          // Safe to truncate
          setTopics(topics.slice(0, requiredTopics))
        }
        // If user has more filled topics than required, keep them (don't force delete user data)
      }
    }
  }, [formData.numberOfSessions])

  const fetchClients = async () => {
    try {
      const response = await clientsApi.getAll()
      if (response?.data) {
        setClients(response.data)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const fetchTrainers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await axios.get(`${API_URL}/api/trainers?isActive=true`)
      if (response.data?.data) {
        setTrainers(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching trainers:', error)
    }
  }

  const generateSessionFields = () => {
    const numSessions = formData.numberOfSessions
    const newSessions: SessionData[] = Array.from({ length: numSessions }, (_, i) => ({
      sessionNumber: i + 1,
      scheduledAt: '',
      topicId: '',
      customTopicTitle: '',
      trainerId: '',
      notes: '',
      meetingLink: ''
    }))
    setSessions(newSessions)
    setSessionsConfigured(true)
  }

  const updateSession = (index: number, field: keyof SessionData, value: string) => {
    const newSessions = [...sessions]
    newSessions[index] = { ...newSessions[index], [field]: value }
    setSessions(newSessions)
  }

  const removeSession = (index: number) => {
    if (sessions.length > 1) {
      const newSessions = sessions.filter((_, i) => i !== index)
      // Renumber sessions
      const renumbered = newSessions.map((s, i) => ({ ...s, sessionNumber: i + 1 }))
      setSessions(renumbered)
      setFormData({ ...formData, numberOfSessions: renumbered.length })
    }
  }

  const addSession = () => {
    const newSession: SessionData = {
      sessionNumber: sessions.length + 1,
      scheduledAt: '',
      topicId: '',
      customTopicTitle: '',
      trainerId: '',
      notes: '',
      meetingLink: ''
    }
    setSessions([...sessions, newSession])
    setFormData({ ...formData, numberOfSessions: sessions.length + 1 })
  }

  const updateTopic = (index: number, field: keyof Topic, value: string) => {
    const newTopics = [...topics]
    newTopics[index] = { ...newTopics[index], [field]: value }
    setTopics(newTopics)
  }

  const addTopic = () => {
    setTopics([...topics, { title: '', description: '' }])
  }

  const removeTopic = (index: number) => {
    const minTopics = Math.max(6, formData.numberOfSessions - 2)
    if (topics.length > minTopics) {
      const newTopics = topics.filter((_, i) => i !== index)
      setTopics(newTopics)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.clientId) {
      alert('Please fill in all required fields')
      return
    }

    // Validate topics (should match numberOfSessions - 2, minimum 6)
    const requiredTopics = Math.max(6, formData.numberOfSessions - 2)
    const validTopics = topics.filter(t => t.title.trim())
    if (validTopics.length < requiredTopics) {
      alert(
        `For ${formData.numberOfSessions} sessions, you need ${requiredTopics} topics.\n` +
        `(Session 1 is introduction, Session ${formData.numberOfSessions} is conclusion)\n` +
        `Currently you have ${validTopics.length} valid topics.`
      )
      return
    }

    // Check if any topic title is too short
    const tooShortTopics = validTopics.filter(t => t.title.trim().length < 2)
    if (tooShortTopics.length > 0) {
      alert('All topic titles must be at least 2 characters long')
      return
    }

    // Check if any topic title is too long
    const tooLongTopics = validTopics.filter(t => t.title.trim().length > 100)
    if (tooLongTopics.length > 0) {
      alert('Topic titles must be 100 characters or less')
      return
    }

    // Validate sessions if configured
    if (sessionsConfigured && sessions.length > 0) {
      const sessionsWithoutDate = sessions.filter(s => !s.scheduledAt)
      if (sessionsWithoutDate.length > 0) {
        alert(`Please set dates for all sessions. ${sessionsWithoutDate.length} sessions missing dates.`)
        return
      }
    }

    try {
      setLoading(true)

      const roundtableData: any = {
        name: formData.name,
        description: formData.description,
        clientId: formData.clientId,
        maxParticipants: formData.maxParticipants,
        numberOfSessions: formData.numberOfSessions,
        topics: validTopics,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined
      }

      // Include sessions if configured
      if (sessionsConfigured && sessions.length > 0) {
        roundtableData.sessions = sessions.map(s => {
          // Handle custom topic: if topicId is '__custom__', use customTopicTitle
          let topicValue = s.topicId
          if (s.topicId === '__custom__' && s.customTopicTitle) {
            topicValue = s.customTopicTitle
          }

          return {
            sessionNumber: s.sessionNumber,
            scheduledAt: new Date(s.scheduledAt).toISOString(),
            topicId: topicValue && topicValue !== '__custom__' ? topicValue : undefined,
            customTopicTitle: s.topicId === '__custom__' ? s.customTopicTitle : undefined,
            trainerId: s.trainerId || undefined,
            notes: s.notes || undefined,
            meetingLink: s.meetingLink || undefined
          }
        })
      }

      const response = await roundtablesApi.create(roundtableData)

      if (response?.id) {
        navigate(`/roundtables/${response.id}`)
      } else {
        navigate('/roundtables')
      }
    } catch (error: any) {
      console.error('Error creating roundtable:', error)

      // Show detailed validation errors if available
      if (error.response?.data?.details) {
        alert(`Validation Error:\n\n${error.response.data.details}`)
      } else {
        alert(error.message || 'Error creating roundtable. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const selectedClient = clients.find(c => c.id === formData.clientId)

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/roundtables')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Roundtables
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Roundtable</h1>
          <p className="text-gray-600 mt-2">Set up a new roundtable program with topics for participant voting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roundtable Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maka-teal"
                  placeholder="e.g., Q1 Leadership Training"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Organization *
                </label>
                <select
                  required
                  value={formData.clientId}
                  onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maka-teal"
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} - {client.company}
                    </option>
                  ))}
                </select>
                {selectedClient && (
                  <div className="mt-2 p-2 bg-primary-50 rounded-md flex items-center">
                    <Building className="h-4 w-4 text-maka-teal mr-2" />
                    <span className="text-sm text-maka-tealDark">
                      {selectedClient.name} at {selectedClient.company}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maka-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maka-teal"
                  placeholder="Enter number of participants"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Between 1 and 20 participants. Optimal discussion quality with 4-8 participants.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Sessions *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.numberOfSessions}
                  onChange={(e) => setFormData({...formData, numberOfSessions: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maka-teal"
                  placeholder="e.g., 10"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Session 1 will be the introduction, Session {formData.numberOfSessions} will be the conclusion.
                  You'll need {Math.max(6, formData.numberOfSessions - 2)} topics for the middle sessions.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maka-teal"
                placeholder="Brief description of this roundtable program..."
              />
            </div>
          </div>

          {/* Topics Configuration */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Discussion Topics</h2>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                topics.filter(t => t.title.trim()).length >= Math.max(6, formData.numberOfSessions - 2)
                  ? 'bg-green-100 text-green-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {topics.filter(t => t.title.trim()).length} / {Math.max(6, formData.numberOfSessions - 2)} topics
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              Define topics that participants will vote on. Based on {formData.numberOfSessions} sessions,
              you need {Math.max(6, formData.numberOfSessions - 2)} topics (minimum 6).
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Sessions 2 to {formData.numberOfSessions - 1} will have topics. Session 1 (introduction) and Session {formData.numberOfSessions} (conclusion) won't have topics.
            </p>

            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-8">#{index + 1}</span>
                    <input
                      type="text"
                      placeholder="Topic title (e.g., The Art of Negotiation)"
                      value={topic.title}
                      onChange={(e) => updateTopic(index, 'title', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maka-teal"
                    />
                    {topics.length > 6 && (
                      <button
                        type="button"
                        onClick={() => removeTopic(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        title="Remove topic"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addTopic}
              className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-maka-teal hover:text-maka-teal flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Topic
            </button>

            <div className="mt-4 p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-maka-teal mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-maka-navy">Session Structure</h4>
                  <p className="text-sm text-maka-tealDark">
                    Configure {formData.numberOfSessions} session{formData.numberOfSessions !== 1 ? 's' : ''} below or use topic voting flow
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Configuration */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Session Configuration</h2>
              <span className="text-sm text-gray-600">
                {sessions.length > 0 ? `${sessions.length} sessions` : 'Not configured'}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Configure all sessions with dates, topics, and trainers, or leave this blank to use the traditional scheduling flow later.
            </p>

            {!sessionsConfigured ? (
              <button
                type="button"
                onClick={generateSessionFields}
                className="w-full py-3 bg-maka-teal text-white rounded-lg hover:bg-maka-tealDark transition-all duration-200 flex items-center justify-center font-medium"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Configure {formData.numberOfSessions} Session{formData.numberOfSessions !== 1 ? 's' : ''} Now
              </button>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {sessions.map((session, index) => (
                    <SessionFormFields
                      key={index}
                      session={session}
                      topics={topics}
                      trainers={trainers}
                      onUpdate={(field, value) => updateSession(index, field, value)}
                      onRemove={() => removeSession(index)}
                      canRemove={sessions.length > 1}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addSession}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-maka-teal hover:text-maka-teal flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Session
                </button>
              </>
            )}

            {!sessionsConfigured && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> If you skip this step, you can schedule sessions later using the traditional flow (topic voting → automatic scheduling).
                </p>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/roundtables')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-maka-teal text-white rounded-md hover:bg-maka-tealDark transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Roundtable'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}