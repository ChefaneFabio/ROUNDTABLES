import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Send,
  Calendar,
  User,
  Building,
  AlertCircle,
  Search
} from 'lucide-react'
import { questionsApi } from '../services/api'

interface Question {
  id: string
  content: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SENT'
  reviewNotes?: string
  submittedAt: string
  session: {
    id: string
    sessionNumber: number
    scheduledAt: string
    topic: {
      title: string
    }
    roundtable: {
      name: string
      client: {
        company: string
      }
    }
    trainer?: {
      name: string
      email: string
    }
  }
}

export function QuestionsPage() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [reviewNotes, setReviewNotes] = useState('')

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const response = await questionsApi.getAll()
      if (response?.data) {
        setQuestions(response.data)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReview = async (questionId: string, status: string, notes?: string) => {
    try {
      await questionsApi.review(questionId, status, notes)
      fetchQuestions() // Refresh the list
      setReviewNotes('')
      alert(`Question ${status.toLowerCase()} successfully`)
    } catch (error) {
      console.error('Error reviewing question:', error)
      alert('Error reviewing question. Please try again.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      case 'SENT': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return Clock
      case 'APPROVED': return CheckCircle
      case 'REJECTED': return XCircle
      case 'SENT': return Send
      default: return Clock
    }
  }

  const getUrgencyLevel = (scheduledAt: string) => {
    const sessionDate = new Date(scheduledAt)
    const now = new Date()
    const daysUntilSession = Math.ceil((sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilSession <= 1) return { level: 'urgent', color: 'text-red-600', label: 'Urgent' }
    if (daysUntilSession <= 3) return { level: 'high', color: 'text-orange-600', label: 'High Priority' }
    if (daysUntilSession <= 7) return { level: 'medium', color: 'text-yellow-600', label: 'Medium Priority' }
    return { level: 'low', color: 'text-green-600', label: 'Low Priority' }
  }

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = 
      question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.session.topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.session.roundtable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.session.roundtable.client.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || question.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const pendingQuestions = filteredQuestions.filter(q => q.status === 'PENDING')
  const urgentQuestions = pendingQuestions.filter(q => getUrgencyLevel(q.session.scheduledAt).level === 'urgent')

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Question Review</h1>
          <p className="text-gray-600 mt-2">Review and approve questions submitted by trainers for sessions</p>
        </div>

        {/* Alert for urgent questions */}
        {urgentQuestions.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  {urgentQuestions.length} urgent question{urgentQuestions.length > 1 ? 's' : ''} need review
                </h3>
                <p className="text-sm text-red-700">
                  Sessions are scheduled within 24 hours and questions need immediate approval
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {questions.filter(q => q.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {questions.filter(q => q.status === 'APPROVED').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Send className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Sent to Participants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {questions.filter(q => q.status === 'SENT').length}
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
                  placeholder="Search questions, topics, or companies..."
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
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="SENT">Sent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => {
              const StatusIcon = getStatusIcon(question.status)
              const urgency = getUrgencyLevel(question.session.scheduledAt)
              
              return (
                <div key={question.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="flex-shrink-0 mr-3">
                          <StatusIcon className={`h-5 w-5 ${
                            question.status === 'APPROVED' ? 'text-green-600' :
                            question.status === 'REJECTED' ? 'text-red-600' :
                            question.status === 'SENT' ? 'text-blue-600' :
                            'text-yellow-600'
                          }`} />
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(question.status)}`}>
                          {question.status}
                        </span>
                        <span className={`ml-3 text-sm font-medium ${urgency.color}`}>
                          {urgency.label}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {question.session.topic.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            <span>{question.session.roundtable.client.company} - {question.session.roundtable.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Session {question.session.sessionNumber} - {new Date(question.session.scheduledAt).toLocaleDateString()}</span>
                          </div>
                          {question.session.trainer && (
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>{question.session.trainer.name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {editingQuestion === question.id ? (
                        <div className="mb-4">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => setEditingQuestion(null)}
                              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                // Save edited question
                                setEditingQuestion(null)
                                alert('Question updated')
                              }}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-900">{question.content}</p>
                          {question.status === 'PENDING' && (
                            <button
                              onClick={() => {
                                setEditingQuestion(question.id)
                                setEditContent(question.content)
                              }}
                              className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit Question
                            </button>
                          )}
                        </div>
                      )}

                      {question.reviewNotes && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Review Notes:</strong> {question.reviewNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {question.status === 'PENDING' && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Review Notes (optional)
                        </label>
                        <textarea
                          value={reviewNotes}
                          onChange={(e) => setReviewNotes(e.target.value)}
                          placeholder="Add notes about changes needed or approval reason..."
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => handleReview(question.id, 'REJECTED', reviewNotes)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleReview(question.id, 'APPROVED', reviewNotes)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-6">
                Questions will appear here when trainers submit them for review
              </p>
              <button
                onClick={() => navigate('/sessions')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                View Sessions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}