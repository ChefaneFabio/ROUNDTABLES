import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Calendar, Clock, User, Link as LinkIcon, FileText } from 'lucide-react'
import { sessionsApi } from '../services/api'
import axios from 'axios'

interface Session {
  id: string
  sessionNumber: number
  scheduledAt: string
  status: string
  questionsStatus: string
  feedbacksStatus: string
  meetingLink: string | null
  notes: string | null
  roundtable: {
    id: string
    name: string
    client: {
      name: string
      company: string
    }
  }
  topic: {
    id: string
    title: string
  } | null
  trainer: {
    id: string
    name: string
    email: string
  } | null
}

interface Trainer {
  id: string
  name: string
  email: string
  expertise: string[]
  isActive?: boolean
}

interface Topic {
  id: string
  title: string
}

export function SessionEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    scheduledAt: '',
    status: 'SCHEDULED',
    questionsStatus: 'NOT_REQUESTED',
    feedbacksStatus: 'NOT_REQUESTED',
    meetingLink: '',
    notes: '',
    trainerId: '',
    topicId: '',
    customTopicTitle: ''
  })

  useEffect(() => {
    fetchSessionData()
  }, [id])

  const fetchSessionData = async () => {
    try {
      setLoading(true)

      // Fetch session details
      const sessionRes = await sessionsApi.getById(id!)
      const sessionData = sessionRes.data
      setSession(sessionData)

      // Fetch available trainers
      const trainersRes = await axios.get(`${import.meta.env.VITE_API_URL || 'https://roundtables-backend.onrender.com/api'}/trainers`)
      if (trainersRes.data?.data) {
        setTrainers(trainersRes.data.data.filter((t: Trainer) => t.isActive !== false))
      }

      // Fetch topics for this roundtable
      const topicsRes = await axios.get(`${import.meta.env.VITE_API_URL || 'https://roundtables-backend.onrender.com/api'}/roundtables/${sessionData.roundtable.id}`)
      if (topicsRes.data?.data?.topics) {
        setTopics(topicsRes.data.data.topics)
      }

      // Populate form with current session data
      setFormData({
        scheduledAt: sessionData.scheduledAt ? new Date(sessionData.scheduledAt).toISOString().slice(0, 16) : '',
        status: sessionData.status || 'SCHEDULED',
        questionsStatus: sessionData.questionsStatus || 'NOT_REQUESTED',
        feedbacksStatus: sessionData.feedbacksStatus || 'NOT_REQUESTED',
        meetingLink: sessionData.meetingLink || '',
        notes: sessionData.notes || '',
        trainerId: sessionData.trainer?.id || '',
        topicId: sessionData.topic?.id || '',
        customTopicTitle: ''
      })

    } catch (error) {
      console.error('Error fetching session data:', error)
      setError('Failed to load session data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const updateData: any = {
        scheduledAt: new Date(formData.scheduledAt).toISOString(),
        status: formData.status,
        questionsStatus: formData.questionsStatus,
        feedbacksStatus: formData.feedbacksStatus,
        meetingLink: formData.meetingLink || null,
        notes: formData.notes || null
      }

      // Only include trainerId if it's set
      if (formData.trainerId) {
        updateData.trainerId = formData.trainerId
      }

      // Handle custom topic or existing topic
      if (formData.topicId === '__custom__' && formData.customTopicTitle) {
        // Pass custom topic title to backend
        updateData.customTopicTitle = formData.customTopicTitle
        updateData.roundtableId = session!.roundtable.id // Need roundtable ID for creating custom topic
      } else if (formData.topicId) {
        // Regular topic ID
        updateData.topicId = formData.topicId
      }

      await sessionsApi.update(id!, updateData)

      // Navigate back to sessions page
      navigate('/sessions')
    } catch (error: any) {
      console.error('Error updating session:', error)
      setError(error.response?.data?.message || error.message || 'Failed to update session')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Not Found</h2>
          <button
            onClick={() => navigate('/sessions')}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Sessions
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/sessions')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sessions
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Session {session.sessionNumber}</h1>
          <p className="text-gray-600 mt-2">
            {session.roundtable.name} • {session.roundtable.client.company}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scheduled Date/Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Scheduled Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({...formData, scheduledAt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Session Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Session Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="REMINDER_SENT">Reminder Sent</option>
                  <option value="QUESTIONS_REQUESTED">Questions Requested</option>
                  <option value="QUESTIONS_READY">Questions Ready</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="FEEDBACK_PENDING">Feedback Pending</option>
                  <option value="FEEDBACK_SENT">Feedback Sent</option>
                  <option value="CERTIFICATE_SENT">Certificate Sent</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              {/* Questions Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Questions Status *
                </label>
                <select
                  required
                  value={formData.questionsStatus}
                  onChange={(e) => setFormData({...formData, questionsStatus: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="NOT_REQUESTED">Not Requested</option>
                  <option value="REQUESTED_FROM_COORDINATOR">Requested from Coordinator</option>
                  <option value="SAVED_BY_TRAINER">Saved by Trainer</option>
                  <option value="PENDING_APPROVAL">Pending Approval</option>
                  <option value="SENT_TO_PARTICIPANTS">Sent to Participants</option>
                </select>
              </div>

              {/* Feedbacks Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedbacks Status *
                </label>
                <select
                  required
                  value={formData.feedbacksStatus}
                  onChange={(e) => setFormData({...formData, feedbacksStatus: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="NOT_REQUESTED">Not Requested</option>
                  <option value="REQUESTED_FROM_COORDINATOR">Requested from Coordinator</option>
                  <option value="SAVED_BY_TRAINER">Saved by Trainer</option>
                  <option value="PENDING_APPROVAL">Pending Approval</option>
                  <option value="SENT_TO_PARTICIPANTS">Sent to Participants</option>
                </select>
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Assignments</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trainer Assignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Assigned Trainer
                </label>
                <select
                  value={formData.trainerId}
                  onChange={(e) => setFormData({...formData, trainerId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- No Trainer Assigned --</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name} ({trainer.email})
                    </option>
                  ))}
                </select>
                {formData.trainerId && (
                  <p className="text-xs text-gray-500 mt-1">
                    Current: {trainers.find(t => t.id === formData.trainerId)?.name}
                  </p>
                )}
              </div>

              {/* Topic Assignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Assigned Topic
                </label>
                <select
                  value={formData.topicId}
                  onChange={(e) => setFormData({...formData, topicId: e.target.value, customTopicTitle: ''})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- No Topic Assigned --</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.title}
                    </option>
                  ))}
                  <option value="__custom__">✏️ Custom topic...</option>
                </select>
                {formData.topicId && formData.topicId !== '__custom__' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Current: {topics.find(t => t.id === formData.topicId)?.title}
                  </p>
                )}
              </div>

              {/* Custom Topic Input (appears when "Custom topic" is selected) */}
              {formData.topicId === '__custom__' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Topic Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter custom topic title..."
                    value={formData.customTopicTitle}
                    onChange={(e) => setFormData({...formData, customTopicTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Details</h2>

            <div className="space-y-4">
              {/* Meeting Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <LinkIcon className="h-4 w-4 inline mr-1" />
                  Meeting Link
                </label>
                <input
                  type="url"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({...formData, meetingLink: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://zoom.us/j/..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Add Zoom, Teams, or other meeting link
                </p>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internal Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add any internal notes or comments about this session..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  These notes are only visible to coordinators
                </p>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/sessions')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
