import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MessageSquare,
  FileText,
  Send,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  Building,
  AlertCircle,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Mail,
  Star,
  TrendingUp
} from 'lucide-react'

interface Feedback {
  id: string
  content: string
  status: 'PENDING' | 'REVIEWED' | 'SENT' | 'REJECTED'
  originalContent?: string
  editedContent?: string
  reviewNotes?: string
  submittedAt: string
  reviewedAt?: string
  sentAt?: string
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
    trainer: {
      name: string
      email: string
    }
  }
  participant: {
    id: string
    name: string
    email: string
  }
  rating?: number
}

export function FeedbackPage() {
  const navigate = useNavigate()
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [trainerFilter, setTrainerFilter] = useState('all')
  const [showDropdown, setShowDropdown] = useState<string | null>(null)
  const [editingFeedback, setEditingFeedback] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [reviewNotes, setReviewNotes] = useState('')
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [selectedFeedbacks, setSelectedFeedbacks] = useState<string[]>([])

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      setLoading(true)
      // Simulate API call - in real implementation this would fetch from backend
      const mockFeedbacks: Feedback[] = [
        {
          id: '1',
          content: 'You effectively connected diversity and inclusion concepts, emphasizing how inclusive workplaces boost employee satisfaction and engagement, particularly in technical fields and concerning gender equality. You rightly identified the salary gap as a significant barrier and stressed the need for dedicated training. Your points on promoting the value of D&I, implementing regular assessments and feedback, and creating safe spaces for expression were well-highlighted and insightful.',
          status: 'PENDING',
          submittedAt: '2024-01-20T10:30:00Z',
          session: {
            id: '1',
            sessionNumber: 3,
            scheduledAt: '2024-01-19T14:00:00Z',
            topic: { title: 'Diversity & Inclusion' },
            roundtable: {
              name: 'Leadership Training Q1',
              client: { company: 'Fastweb' }
            },
            trainer: { name: 'Marco Rossi', email: 'marco.rossi@trainer.com' }
          },
          participant: {
            id: '1',
            name: 'Stefania Bianchi',
            email: 'stefania.bianchi@fastweb.it'
          },
          rating: 4
        },
        {
          id: '2',
          content: 'Great participation in the negotiation discussion. You demonstrated solid understanding of the key principles. I encourage you to broaden your functional vocabulary and enhance your pronunciation.',
          status: 'REVIEWED',
          originalContent: 'Good job in negotiation session. Need to improve vocabulary.',
          editedContent: 'Great participation in the negotiation discussion. You demonstrated solid understanding of the key principles. I encourage you to broaden your functional vocabulary and enhance your pronunciation.',
          reviewNotes: 'Expanded the feedback to be more specific and encouraging',
          submittedAt: '2024-01-18T16:45:00Z',
          reviewedAt: '2024-01-19T09:15:00Z',
          session: {
            id: '2',
            sessionNumber: 4,
            scheduledAt: '2024-01-18T15:00:00Z',
            topic: { title: 'The Art of Negotiation' },
            roundtable: {
              name: 'Communication Skills',
              client: { company: 'UniCredit' }
            },
            trainer: { name: 'Anna Verdi', email: 'anna.verdi@trainer.com' }
          },
          participant: {
            id: '2',
            name: 'Giovanni Rossi',
            email: 'giovanni.rossi@unicredit.it'
          },
          rating: 5
        },
        {
          id: '3',
          content: 'Excellent contributions to the leadership discussion. Your insights on team motivation were particularly valuable. Continue to expand your leadership vocabulary and practice expressing complex ideas clearly.',
          status: 'SENT',
          submittedAt: '2024-01-17T11:20:00Z',
          reviewedAt: '2024-01-17T14:30:00Z',
          sentAt: '2024-01-17T15:00:00Z',
          session: {
            id: '3',
            sessionNumber: 2,
            scheduledAt: '2024-01-17T10:00:00Z',
            topic: { title: 'Effective Leadership' },
            roundtable: {
              name: 'Management Development',
              client: { company: 'Intesa Sanpaolo' }
            },
            trainer: { name: 'Luca Neri', email: 'luca.neri@trainer.com' }
          },
          participant: {
            id: '3',
            name: 'Maria Ferrari',
            email: 'maria.ferrari@intesasanpaolo.com'
          },
          rating: 5
        }
      ]
      setFeedbacks(mockFeedbacks)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReviewFeedback = async (feedbackId: string, action: 'approve' | 'reject', notes?: string) => {
    try {
      const updatedFeedbacks = feedbacks.map(f => 
        f.id === feedbackId 
          ? { 
              ...f, 
              status: action === 'approve' ? 'REVIEWED' : 'REJECTED' as const,
              reviewNotes: notes,
              reviewedAt: new Date().toISOString()
            }
          : f
      )
      setFeedbacks(updatedFeedbacks)
      setReviewNotes('')
      alert(`Feedback ${action === 'approve' ? 'approved' : 'rejected'} successfully!`)
    } catch (error) {
      console.error('Error reviewing feedback:', error)
      alert('Error reviewing feedback')
    }
  }

  const handleEditFeedback = async (feedbackId: string, newContent: string) => {
    try {
      const updatedFeedbacks = feedbacks.map(f => 
        f.id === feedbackId 
          ? { 
              ...f, 
              editedContent: newContent,
              originalContent: f.originalContent || f.content,
              content: newContent,
              status: 'REVIEWED' as const,
              reviewedAt: new Date().toISOString()
            }
          : f
      )
      setFeedbacks(updatedFeedbacks)
      setEditingFeedback(null)
      setEditContent('')
      alert('Feedback updated successfully!')
    } catch (error) {
      console.error('Error editing feedback:', error)
      alert('Error updating feedback')
    }
  }

  const handleSendFeedback = async (feedbackId: string) => {
    try {
      const updatedFeedbacks = feedbacks.map(f => 
        f.id === feedbackId 
          ? { 
              ...f, 
              status: 'SENT' as const,
              sentAt: new Date().toISOString()
            }
          : f
      )
      setFeedbacks(updatedFeedbacks)
      alert('Feedback sent to participant successfully!')
    } catch (error) {
      console.error('Error sending feedback:', error)
      alert('Error sending feedback')
    }
  }

  const handleBulkAction = async (action: string) => {
    if (selectedFeedbacks.length === 0) {
      alert('Please select feedbacks first')
      return
    }

    if (confirm(`Are you sure you want to ${action} ${selectedFeedbacks.length} selected feedback(s)?`)) {
      try {
        const updatedFeedbacks = feedbacks.map(f => 
          selectedFeedbacks.includes(f.id) 
            ? { 
                ...f, 
                status: action === 'approve' ? 'REVIEWED' : action === 'send' ? 'SENT' : f.status,
                reviewedAt: action === 'approve' ? new Date().toISOString() : f.reviewedAt,
                sentAt: action === 'send' ? new Date().toISOString() : f.sentAt
              }
            : f
        )
        setFeedbacks(updatedFeedbacks)
        setSelectedFeedbacks([])
        setShowBulkActions(false)
        alert(`${selectedFeedbacks.length} feedback(s) ${action}ed successfully!`)
      } catch (error) {
        console.error('Error with bulk action:', error)
        alert('Error with bulk action')
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'REVIEWED': return 'bg-blue-100 text-blue-800'
      case 'SENT': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return Clock
      case 'REVIEWED': return CheckCircle
      case 'SENT': return Send
      case 'REJECTED': return XCircle
      default: return Clock
    }
  }

  const getUrgencyLevel = (submittedAt: string) => {
    const now = new Date()
    const submitted = new Date(submittedAt)
    const hoursAgo = (now.getTime() - submitted.getTime()) / (1000 * 60 * 60)
    
    if (hoursAgo >= 48) return { level: 'urgent', color: 'text-red-600', label: 'Urgent (>48h)' }
    if (hoursAgo >= 24) return { level: 'high', color: 'text-orange-600', label: 'High (>24h)' }
    if (hoursAgo >= 12) return { level: 'medium', color: 'text-yellow-600', label: 'Medium (>12h)' }
    return { level: 'low', color: 'text-green-600', label: 'Recent' }
  }

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = 
      feedback.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.session.topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.session.roundtable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.session.roundtable.client.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter
    const matchesTrainer = trainerFilter === 'all' || feedback.session.trainer.name === trainerFilter
    
    return matchesSearch && matchesStatus && matchesTrainer
  })

  const pendingFeedbacks = filteredFeedbacks.filter(f => f.status === 'PENDING')
  const urgentFeedbacks = pendingFeedbacks.filter(f => getUrgencyLevel(f.submittedAt).level === 'urgent')
  const trainers = [...new Set(feedbacks.map(f => f.session.trainer.name))]

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
            <h1 className="text-3xl font-bold text-gray-900">Feedback Management</h1>
            <p className="text-gray-600 mt-2">Review and manage trainer feedback before sending to participants</p>
          </div>
          <div className="flex space-x-3">
            {selectedFeedbacks.length > 0 && (
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Bulk Actions ({selectedFeedbacks.length})
              </button>
            )}
          </div>
        </div>

        {/* Alert for urgent feedbacks */}
        {urgentFeedbacks.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  {urgentFeedbacks.length} urgent feedback{urgentFeedbacks.length > 1 ? 's' : ''} need review
                </h3>
                <p className="text-sm text-red-700">
                  Feedback submitted more than 48 hours ago should be reviewed promptly
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Actions Panel */}
        {showBulkActions && selectedFeedbacks.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedFeedbacks.length} feedback(s) selected
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('approve')}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Approve All
                </button>
                <button
                  onClick={() => handleBulkAction('send')}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Send All
                </button>
                <button
                  onClick={() => {
                    setSelectedFeedbacks([])
                    setShowBulkActions(false)
                  }}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                >
                  Clear Selection
                </button>
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
                <p className="text-sm text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold text-gray-900">{feedbacks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedbacks.filter(f => f.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Sent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedbacks.filter(f => f.status === 'SENT').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(feedbacks.filter(f => f.rating).reduce((sum, f) => sum + (f.rating || 0), 0) / 
                    feedbacks.filter(f => f.rating).length || 0).toFixed(1)}
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
                  placeholder="Search feedback, participants, topics..."
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
                <option value="REVIEWED">Reviewed</option>
                <option value="SENT">Sent</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <select
                value={trainerFilter}
                onChange={(e) => setTrainerFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Trainers</option>
                {trainers.map((trainer) => (
                  <option key={trainer} value={trainer}>{trainer}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => {
              const StatusIcon = getStatusIcon(feedback.status)
              const urgency = getUrgencyLevel(feedback.submittedAt)
              
              return (
                <div key={feedback.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        checked={selectedFeedbacks.includes(feedback.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFeedbacks([...selectedFeedbacks, feedback.id])
                          } else {
                            setSelectedFeedbacks(selectedFeedbacks.filter(id => id !== feedback.id))
                          }
                        }}
                        className="mt-1 mr-4"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <StatusIcon className={`h-5 w-5 mr-2 ${
                            feedback.status === 'SENT' ? 'text-green-600' :
                            feedback.status === 'REVIEWED' ? 'text-blue-600' :
                            feedback.status === 'REJECTED' ? 'text-red-600' :
                            'text-yellow-600'
                          }`} />
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(feedback.status)}`}>
                            {feedback.status}
                          </span>
                          <span className={`ml-3 text-sm font-medium ${urgency.color}`}>
                            {urgency.label}
                          </span>
                          {feedback.rating && (
                            <div className="ml-3 flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm text-gray-600">{feedback.rating}/5</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {feedback.session.topic.title} - Session {feedback.session.sessionNumber}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>{feedback.participant.name}</span>
                            </div>
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              <span>{feedback.session.roundtable.client.company} - {feedback.session.roundtable.name}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Trainer: {feedback.session.trainer.name}</span>
                            </div>
                          </div>
                        </div>

                        {/* Feedback Content */}
                        {editingFeedback === feedback.id ? (
                          <div className="mb-4">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={4}
                            />
                            <div className="flex justify-end space-x-2 mt-2">
                              <button
                                onClick={() => setEditingFeedback(null)}
                                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleEditFeedback(feedback.id, editContent)}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            {feedback.originalContent && feedback.editedContent && (
                              <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                <p className="text-sm font-medium text-yellow-800 mb-1">Original:</p>
                                <p className="text-sm text-yellow-700 mb-2">{feedback.originalContent}</p>
                                <p className="text-sm font-medium text-yellow-800 mb-1">Edited:</p>
                              </div>
                            )}
                            <p className="text-gray-900">{feedback.content}</p>
                            {feedback.status === 'PENDING' && (
                              <button
                                onClick={() => {
                                  setEditingFeedback(feedback.id)
                                  setEditContent(feedback.content)
                                }}
                                className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit Feedback
                              </button>
                            )}
                          </div>
                        )}

                        {feedback.reviewNotes && (
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Review Notes:</strong> {feedback.reviewNotes}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Submitted: {new Date(feedback.submittedAt).toLocaleString()}</span>
                          {feedback.sentAt && (
                            <span>Sent: {new Date(feedback.sentAt).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="relative ml-4">
                      <button
                        onClick={() => setShowDropdown(showDropdown === feedback.id ? null : feedback.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {showDropdown === feedback.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <button
                            onClick={() => alert(`Participant: ${feedback.participant.email}\nTrainer: ${feedback.session.trainer.email}`)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Contact Info
                          </button>
                          <button
                            onClick={() => navigate(`/sessions/${feedback.session.id}`)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Session
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {feedback.status === 'PENDING' && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Review Notes (optional)
                        </label>
                        <textarea
                          value={reviewNotes}
                          onChange={(e) => setReviewNotes(e.target.value)}
                          placeholder="Add notes about changes made or approval reason..."
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => handleReviewFeedback(feedback.id, 'reject', reviewNotes)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleReviewFeedback(feedback.id, 'approve', reviewNotes)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </button>
                      </div>
                    </div>
                  )}

                  {feedback.status === 'REVIEWED' && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSendFeedback(feedback.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send to Participant
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
              <p className="text-gray-600 mb-6">
                Feedback will appear here when trainers submit session evaluations
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