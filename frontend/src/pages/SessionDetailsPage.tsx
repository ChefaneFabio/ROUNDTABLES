import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  Edit,
  Save,
  CheckCircle,
  Play,
  User,
  Building,
  Plus,
  Trash2,
  Mail
} from 'lucide-react'

interface SessionDetails {
  id: string
  sessionNumber: number
  scheduledAt: string
  duration: number
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  topic: {
    id: string
    title: string
    description: string
  }
  roundtable: {
    id: string
    name: string
    client: {
      company: string
    }
  }
  trainer: {
    id: string
    name: string
    email: string
    phone?: string
  }
  participants: {
    id: string
    name: string
    email: string
    attendanceStatus: 'PRESENT' | 'ABSENT' | 'LATE' | 'PENDING'
    notes?: string
  }[]
  questions: {
    id: string
    content: string
    status: 'SUBMITTED' | 'APPROVED' | 'SENT'
    submittedAt: string
  }[]
  materials: {
    id: string
    name: string
    type: 'DOCUMENT' | 'PRESENTATION' | 'VIDEO' | 'LINK'
    url: string
    uploadedAt: string
  }[]
  feedback: {
    id: string
    participantId: string
    content: string
    status: 'SUBMITTED' | 'REVIEWED' | 'SENT'
    submittedAt: string
  }[]
  notes: string
  recordingUrl?: string
  meetingLink?: string
}

export function SessionDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [session, setSession] = useState<SessionDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [editingNotes, setEditingNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [showAddMaterial, setShowAddMaterial] = useState(false)
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    type: 'DOCUMENT' as const,
    url: ''
  })

  useEffect(() => {
    if (id) {
      fetchSessionDetails()
    }
  }, [id])

  const fetchSessionDetails = async () => {
    try {
      setLoading(true)
      // Simulate API call - in real implementation this would fetch from backend
      const mockSession: SessionDetails = {
        id: id!,
        sessionNumber: 3,
        scheduledAt: '2024-01-22T14:00:00Z',
        duration: 60,
        status: 'SCHEDULED',
        topic: {
          id: '1',
          title: 'The Art of Negotiation',
          description: 'Understanding negotiation strategies, building trust, and achieving win-win outcomes in professional settings.'
        },
        roundtable: {
          id: '1',
          name: 'Leadership Training Q1',
          client: {
            company: 'Fastweb'
          }
        },
        trainer: {
          id: '1',
          name: 'Marco Rossi',
          email: 'marco.rossi@trainer.com',
          phone: '+39 345 678 9012'
        },
        participants: [
          {
            id: '1',
            name: 'Anna Bianchi',
            email: 'anna.bianchi@fastweb.it',
            attendanceStatus: 'PENDING'
          },
          {
            id: '2',
            name: 'Giuseppe Verde',
            email: 'giuseppe.verde@fastweb.it',
            attendanceStatus: 'PENDING'
          },
          {
            id: '3',
            name: 'Maria Rossi',
            email: 'maria.rossi@fastweb.it',
            attendanceStatus: 'PENDING'
          },
          {
            id: '4',
            name: 'Luca Neri',
            email: 'luca.neri@fastweb.it',
            attendanceStatus: 'PENDING'
          }
        ],
        questions: [
          {
            id: '1',
            content: 'What do you think makes someone a good negotiator?',
            status: 'APPROVED',
            submittedAt: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            content: 'Research shows that 90% of successful negotiators focus on understanding the other party\'s needs. Why do you think this approach works well?',
            status: 'APPROVED',
            submittedAt: '2024-01-15T10:00:00Z'
          },
          {
            id: '3',
            content: 'How important is trust when you are negotiating?',
            status: 'APPROVED',
            submittedAt: '2024-01-15T10:00:00Z'
          }
        ],
        materials: [
          {
            id: '1',
            name: 'Negotiation Strategies Guide.pdf',
            type: 'DOCUMENT',
            url: '/materials/negotiation-guide.pdf',
            uploadedAt: '2024-01-20T09:00:00Z'
          },
          {
            id: '2',
            name: 'Harvard Negotiation Techniques',
            type: 'LINK',
            url: 'https://harvard.edu/negotiation',
            uploadedAt: '2024-01-20T09:30:00Z'
          }
        ],
        feedback: [],
        notes: 'Focus on practical examples from participants\' work experience. Encourage role-playing exercises.',
        meetingLink: 'https://teams.microsoft.com/l/meetup-join/19%3ameeting'
      }
      setSession(mockSession)
      setNotes(mockSession.notes)
    } catch (error) {
      console.error('Error fetching session details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotes = async () => {
    try {
      if (session) {
        setSession({ ...session, notes })
      }
      setEditingNotes(false)
      alert('Notes saved successfully!')
    } catch (error) {
      console.error('Error saving notes:', error)
      alert('Error saving notes')
    }
  }

  const handleAttendanceChange = async (participantId: string, status: string) => {
    try {
      if (session) {
        const updatedParticipants = session.participants.map(p =>
          p.id === participantId 
            ? { ...p, attendanceStatus: status as any }
            : p
        )
        setSession({ ...session, participants: updatedParticipants })
      }
    } catch (error) {
      console.error('Error updating attendance:', error)
    }
  }

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return

    try {
      const question = {
        id: Date.now().toString(),
        content: newQuestion,
        status: 'SUBMITTED' as const,
        submittedAt: new Date().toISOString()
      }

      if (session) {
        setSession({
          ...session,
          questions: [...session.questions, question]
        })
      }

      setNewQuestion('')
      alert('Question added successfully!')
    } catch (error) {
      console.error('Error adding question:', error)
      alert('Error adding question')
    }
  }

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMaterial.name || !newMaterial.url) {
      alert('Please fill in all fields')
      return
    }

    try {
      const material = {
        id: Date.now().toString(),
        ...newMaterial,
        uploadedAt: new Date().toISOString()
      }

      if (session) {
        setSession({
          ...session,
          materials: [...session.materials, material]
        })
      }

      setShowAddMaterial(false)
      setNewMaterial({ name: '', type: 'DOCUMENT', url: '' })
      alert('Material added successfully!')
    } catch (error) {
      console.error('Error adding material:', error)
      alert('Error adding material')
    }
  }

  const handleStartSession = async () => {
    try {
      if (session) {
        setSession({ ...session, status: 'IN_PROGRESS' })
      }
      alert('Session started!')
    } catch (error) {
      console.error('Error starting session:', error)
    }
  }

  const handleCompleteSession = async () => {
    try {
      if (session) {
        setSession({ ...session, status: 'COMPLETED' })
      }
      alert('Session completed!')
    } catch (error) {
      console.error('Error completing session:', error)
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

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'bg-green-100 text-green-800'
      case 'ABSENT': return 'bg-red-100 text-red-800'
      case 'LATE': return 'bg-yellow-100 text-yellow-800'
      case 'PENDING': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getQuestionStatusColor = (status: string) => {
    switch (status) {
      case 'SUBMITTED': return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'SENT': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'DOCUMENT': return FileText
      case 'PRESENTATION': return FileText
      case 'VIDEO': return Play
      case 'LINK': return MessageSquare
      default: return FileText
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Session not found</h2>
          <button
            onClick={() => navigate('/sessions')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Sessions
          </button>
        </div>
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
                <a href="/sessions" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sessions</a>
                <a href="/participants" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Participants</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/sessions')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sessions
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Session {session.sessionNumber}: {session.topic.title}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{session.roundtable.client.company} - {session.roundtable.name}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                  {session.status.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {session.status === 'SCHEDULED' && (
                <button
                  onClick={handleStartSession}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Session
                </button>
              )}
              {session.status === 'IN_PROGRESS' && (
                <button
                  onClick={handleCompleteSession}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Session
                </button>
              )}
              {session.meetingLink && (
                <a
                  href={session.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Join Meeting
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Session Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Date & Time</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(session.scheduledAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(session.scheduledAt).toLocaleTimeString()} ({session.duration} min)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Trainer</p>
                <p className="text-lg font-bold text-gray-900">{session.trainer.name}</p>
                <p className="text-sm text-gray-600">{session.trainer.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-lg font-bold text-gray-900">{session.participants.length}</p>
                <p className="text-sm text-gray-600">
                  {session.participants.filter(p => p.attendanceStatus === 'PRESENT').length} present
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Questions</p>
                <p className="text-lg font-bold text-gray-900">{session.questions.length}</p>
                <p className="text-sm text-gray-600">
                  {session.questions.filter(q => q.status === 'APPROVED').length} approved
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'attendance', label: 'Attendance', icon: Users },
                { id: 'questions', label: 'Questions', icon: MessageSquare },
                { id: 'materials', label: 'Materials', icon: FileText }
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Topic Description</h3>
                  <p className="text-gray-600">{session.topic.description}</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Session Notes</h3>
                    {editingNotes ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingNotes(false)}
                          className="text-gray-600 hover:text-gray-800 text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNotes}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                        >
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingNotes(true)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </button>
                    )}
                  </div>
                  {editingNotes ? (
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add session notes..."
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-700">{notes || 'No notes added yet.'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Trainer Contact</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-600 mr-2" />
                        <a href={`mailto:${session.trainer.email}`} className="text-blue-600 hover:text-blue-800">
                          {session.trainer.email}
                        </a>
                      </div>
                      {session.trainer.phone && (
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-gray-600 mr-2" />
                          <span className="text-gray-700">{session.trainer.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Participant Attendance</h3>
                
                <div className="space-y-3">
                  {session.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{participant.name}</h4>
                        <p className="text-sm text-gray-600">{participant.email}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getAttendanceColor(participant.attendanceStatus)}`}>
                          {participant.attendanceStatus}
                        </span>
                        
                        <select
                          value={participant.attendanceStatus}
                          onChange={(e) => handleAttendanceChange(participant.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PRESENT">Present</option>
                          <option value="ABSENT">Absent</option>
                          <option value="LATE">Late</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Discussion Questions</h3>
                  <button
                    onClick={() => navigate('/questions')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Manage All Questions →
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  {session.questions.map((question, index) => (
                    <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getQuestionStatusColor(question.status)}`}>
                          {question.status}
                        </span>
                      </div>
                      <p className="text-gray-700">{question.content}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Submitted: {new Date(question.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Add New Question</h4>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Enter a new discussion question..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleAddQuestion}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Session Materials</h3>
                  <button
                    onClick={() => setShowAddMaterial(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Material
                  </button>
                </div>
                
                <div className="space-y-3">
                  {session.materials.map((material) => {
                    const Icon = getMaterialIcon(material.type)
                    return (
                      <div key={material.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <Icon className="h-5 w-5 text-gray-600 mr-3" />
                          <div>
                            <h4 className="font-medium text-gray-900">{material.name}</h4>
                            <p className="text-sm text-gray-600">{material.type} • {new Date(material.uploadedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <a
                            href={material.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View
                          </a>
                          <button className="text-red-600 hover:text-red-800 text-sm">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {session.materials.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No materials yet</h3>
                    <p className="text-gray-600">Add documents, presentations, or links for this session</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Material Modal */}
      {showAddMaterial && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add Session Material</h3>
            </div>
            
            <form onSubmit={handleAddMaterial} className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Material Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Negotiation Strategies Guide"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    required
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DOCUMENT">Document</option>
                    <option value="PRESENTATION">Presentation</option>
                    <option value="VIDEO">Video</option>
                    <option value="LINK">Link</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newMaterial.url}
                    onChange={(e) => setNewMaterial({...newMaterial, url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/document.pdf"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddMaterial(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}