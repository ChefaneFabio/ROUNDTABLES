import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Building, Plus, Trash2 } from 'lucide-react'
import { roundtablesApi, clientsApi } from '../services/api'

interface Client {
  id: string
  name: string
  company: string
}

interface Topic {
  title: string
  description: string
}

export function CreateRoundtablePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselectedClientId = searchParams.get('clientId')
  
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientId: preselectedClientId || '',
    startDate: '',
    maxParticipants: 6
  })
  
  const [topics, setTopics] = useState<Topic[]>([
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' }
  ])

  useEffect(() => {
    fetchClients()
  }, [])

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

  const updateTopic = (index: number, field: keyof Topic, value: string) => {
    const newTopics = [...topics]
    newTopics[index] = { ...newTopics[index], [field]: value }
    setTopics(newTopics)
  }

  const addTopic = () => {
    setTopics([...topics, { title: '', description: '' }])
  }

  const removeTopic = (index: number) => {
    if (topics.length > 6) {
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
    
    // Validate topics
    const validTopics = topics.filter(t => t.title.trim())
    if (validTopics.length < 6) {
      alert(`Please provide at least 6 topics (currently have ${validTopics.length} valid topics)`)
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

    try {
      setLoading(true)
      
      const roundtableData = {
        ...formData,
        topics: validTopics,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined
      }

      const response = await roundtablesApi.create(roundtableData)
      
      if (response?.id) {
        navigate(`/roundtables/${response.id}`)
      } else {
        navigate('/roundtables')
      }
    } catch (error) {
      console.error('Error creating roundtable:', error)
      alert('Error creating roundtable. Please try again.')
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} - {client.company}
                    </option>
                  ))}
                </select>
                {selectedClient && (
                  <div className="mt-2 p-2 bg-blue-50 rounded-md flex items-center">
                    <Building className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-800">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number of participants"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Between 1 and 20 participants. Optimal discussion quality with 4-8 participants.
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of this roundtable program..."
              />
            </div>
          </div>

          {/* Topics Configuration */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Discussion Topics</h2>
              <span className="text-sm text-gray-600">{topics.length} topics</span>
            </div>
            <p className="text-gray-600 mb-6">
              Define topics that participants will vote on. Minimum 6 topics required.
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
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Topic
            </button>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Session Structure</h4>
                  <p className="text-sm text-blue-700">
                    Participants will vote to select 8 topics for the sessions (from {topics.length} topics)
                  </p>
                </div>
              </div>
            </div>
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
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Roundtable'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}