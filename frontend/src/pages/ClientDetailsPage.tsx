import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Building,
  Mail,
  Phone,
  Calendar,
  Users,
  BarChart3,
  Plus,
  Edit,
  MessageSquare,
  TrendingUp,
  Target,
  FileText,
  CheckCircle
} from 'lucide-react'

interface ClientDetails {
  id: string
  name: string
  email: string
  company: string
  phone?: string
  description?: string
  createdAt: string
  roundtables: {
    id: string
    name: string
    status: string
    participantCount: number
    maxParticipants: number
    startDate?: string
    endDate?: string
    progress: number
    completedSessions: number
    totalSessions: number
  }[]
  stats: {
    totalRoundtables: number
    activeRoundtables: number
    completedRoundtables: number
    totalParticipants: number
    totalSessions: number
    completedSessions: number
  }
  contractInfo?: {
    contractNumber: string
    startDate: string
    endDate: string
    value: number
    currency: string
  }
  communicationHistory: {
    id: string
    type: 'EMAIL' | 'MEETING' | 'CALL' | 'NOTE'
    subject: string
    content: string
    date: string
    author: string
  }[]
}

export function ClientDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [client, setClient] = useState<ClientDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddNote, setShowAddNote] = useState(false)
  const [newNote, setNewNote] = useState({
    subject: '',
    content: ''
  })

  useEffect(() => {
    if (id) {
      fetchClientDetails()
    }
  }, [id])

  const fetchClientDetails = async () => {
    try {
      setLoading(true)
      // Simulate API call - in real implementation this would fetch from backend
      const mockClient: ClientDetails = {
        id: id!,
        name: 'Marco Bianchi',
        email: 'marco.bianchi@fastweb.it',
        company: 'Fastweb',
        phone: '+39 02 4545 4545',
        description: 'Leading telecommunications company in Italy focused on employee development and leadership training.',
        createdAt: '2023-09-15T10:00:00Z',
        roundtables: [
          {
            id: '1',
            name: 'Leadership Training Q1',
            status: 'IN_PROGRESS',
            participantCount: 6,
            maxParticipants: 6,
            startDate: '2024-01-15T00:00:00Z',
            endDate: '2024-03-15T00:00:00Z',
            progress: 65,
            completedSessions: 6,
            totalSessions: 10
          },
          {
            id: '2',
            name: 'Communication Skills',
            status: 'COMPLETED',
            participantCount: 5,
            maxParticipants: 6,
            startDate: '2023-10-01T00:00:00Z',
            endDate: '2023-12-15T00:00:00Z',
            progress: 100,
            completedSessions: 10,
            totalSessions: 10
          },
          {
            id: '3',
            name: 'Innovation Workshop',
            status: 'SCHEDULED',
            participantCount: 4,
            maxParticipants: 6,
            startDate: '2024-02-01T00:00:00Z',
            progress: 0,
            completedSessions: 0,
            totalSessions: 10
          }
        ],
        stats: {
          totalRoundtables: 3,
          activeRoundtables: 2,
          completedRoundtables: 1,
          totalParticipants: 15,
          totalSessions: 30,
          completedSessions: 16
        },
        contractInfo: {
          contractNumber: 'CNT-2023-FST-001',
          startDate: '2023-09-01',
          endDate: '2024-08-31',
          value: 45000,
          currency: 'EUR'
        },
        communicationHistory: [
          {
            id: '1',
            type: 'EMAIL',
            subject: 'Q1 Leadership Training Update',
            content: 'Discussed progress and upcoming sessions with HR team.',
            date: '2024-01-18T14:30:00Z',
            author: 'Jean Kamotondo'
          },
          {
            id: '2',
            type: 'MEETING',
            subject: 'Innovation Workshop Planning',
            content: 'Met with HR to plan topics and participant selection for upcoming Innovation Workshop.',
            date: '2024-01-15T10:00:00Z',
            author: 'Alessia Cardile'
          },
          {
            id: '3',
            type: 'EMAIL',
            subject: 'Communication Skills Completion',
            content: 'Sent final feedback reports and completion certificates.',
            date: '2023-12-20T16:45:00Z',
            author: 'Jean Kamotondo'
          }
        ]
      }
      setClient(mockClient)
    } catch (error) {
      console.error('Error fetching client details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newNote.subject || !newNote.content) {
      alert('Please fill in all fields')
      return
    }

    try {
      const note = {
        id: Date.now().toString(),
        type: 'NOTE' as const,
        subject: newNote.subject,
        content: newNote.content,
        date: new Date().toISOString(),
        author: 'Current User'
      }

      if (client) {
        setClient({
          ...client,
          communicationHistory: [note, ...client.communicationHistory]
        })
      }

      setShowAddNote(false)
      setNewNote({ subject: '', content: '' })
      alert('Note added successfully!')
    } catch (error) {
      console.error('Error adding note:', error)
      alert('Error adding note')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SETUP': return 'bg-gray-100 text-gray-800'
      case 'TOPIC_VOTING': return 'bg-blue-100 text-blue-800'
      case 'SCHEDULED': return 'bg-purple-100 text-purple-800'
      case 'IN_PROGRESS': return 'bg-green-100 text-green-800'
      case 'COMPLETED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case 'EMAIL': return Mail
      case 'MEETING': return Users
      case 'CALL': return Phone
      case 'NOTE': return FileText
      default: return MessageSquare
    }
  }

  const getCommunicationColor = (type: string) => {
    switch (type) {
      case 'EMAIL': return 'bg-blue-100 text-blue-800'
      case 'MEETING': return 'bg-green-100 text-green-800'
      case 'CALL': return 'bg-purple-100 text-purple-800'
      case 'NOTE': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Client not found</h2>
          <button
            onClick={() => navigate('/clients')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Clients
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
                <a href="/clients" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Clients</a>
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
            onClick={() => navigate('/clients')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Clients
          </button>
          
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="bg-blue-100 p-4 rounded-lg mr-6">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{client.company}</h1>
                <p className="text-xl text-gray-600 mt-1">{client.name}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/roundtables/new?clientId=${client.id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Roundtable
              </button>
              <button
                onClick={() => navigate(`/clients/${client.id}/edit`)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Client
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Roundtables</p>
                <p className="text-2xl font-bold text-gray-900">{client.stats.totalRoundtables}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{client.stats.activeRoundtables}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{client.stats.completedRoundtables}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-gray-900">{client.stats.totalParticipants}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-pink-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{client.stats.totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((client.stats.completedSessions / client.stats.totalSessions) * 100)}%
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
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'roundtables', label: 'Roundtables', icon: Users },
                { id: 'contract', label: 'Contract', icon: FileText },
                { id: 'communication', label: 'Communication', icon: MessageSquare }
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Description</h3>
                  <p className="text-gray-600">
                    {client.description || 'No description provided.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {client.communicationHistory.slice(0, 3).map((item) => {
                      const Icon = getCommunicationIcon(item.type)
                      return (
                        <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 mr-3">
                            <Icon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.subject}</p>
                            <p className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Since</h3>
                  <p className="text-gray-600">{new Date(client.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            {activeTab === 'roundtables' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Roundtables</h3>
                  <button
                    onClick={() => navigate(`/roundtables/new?clientId=${client.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Roundtable
                  </button>
                </div>
                
                <div className="space-y-4">
                  {client.roundtables.map((roundtable) => (
                    <div key={roundtable.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{roundtable.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(roundtable.status)}`}>
                            {roundtable.status.replace('_', ' ')}
                          </span>
                        </div>
                        <button
                          onClick={() => navigate(`/roundtables/${roundtable.id}`)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Details →
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Participants</p>
                          <p className="font-medium">{roundtable.participantCount}/{roundtable.maxParticipants}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Sessions</p>
                          <p className="font-medium">{roundtable.completedSessions}/{roundtable.totalSessions}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Progress</p>
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${roundtable.progress}%` }}
                              />
                            </div>
                            <span className="font-medium">{roundtable.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Start Date</p>
                          <p className="font-medium">
                            {roundtable.startDate 
                              ? new Date(roundtable.startDate).toLocaleDateString()
                              : 'Not scheduled'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contract' && (
              <div className="space-y-6">
                {client.contractInfo ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Details</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Contract Number</p>
                            <p className="font-medium">{client.contractInfo.contractNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Contract Value</p>
                            <p className="font-medium text-lg text-green-600">
                              {client.contractInfo.currency} {client.contractInfo.value.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Start Date</p>
                            <p className="font-medium">{new Date(client.contractInfo.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">End Date</p>
                            <p className="font-medium">{new Date(client.contractInfo.endDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Duration</p>
                            <p className="font-medium">
                              {Math.round((new Date(client.contractInfo.endDate).getTime() - new Date(client.contractInfo.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Contract Status</h4>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-green-800">Active Contract</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No contract information</h3>
                    <p className="text-gray-600">Contract details have not been added for this client.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'communication' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Communication History</h3>
                  <button
                    onClick={() => setShowAddNote(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </button>
                </div>
                
                <div className="space-y-4">
                  {client.communicationHistory.map((item) => {
                    const Icon = getCommunicationIcon(item.type)
                    return (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <Icon className="h-5 w-5 text-gray-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-medium text-gray-900">{item.subject}</h4>
                              <div className="flex items-center">
                                <span className={`px-2 py-1 text-xs rounded-full ${getCommunicationColor(item.type)}`}>
                                  {item.type}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-2">{item.content}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{new Date(item.date).toLocaleString()}</span>
                              <span className="mx-2">•</span>
                              <span>{item.author}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add Communication Note</h3>
            </div>
            
            <form onSubmit={handleAddNote} className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={newNote.subject}
                    onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Follow-up call about Q2 planning"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <textarea
                    required
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the communication details..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddNote(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}