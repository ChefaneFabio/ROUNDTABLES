import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  Building,
  Mail,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  BarChart3
} from 'lucide-react'
import axios from 'axios'

interface Client {
  id: string
  name: string
  email: string
  company: string
  description?: string
  createdAt: string
  roundtables?: any[]
}

export function ClientsPage() {
  const navigate = useNavigate()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState<string | null>(null)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await axios.get(`${apiUrl}/clients`)
      
      if (response.data?.data) {
        setClients(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        await axios.delete(`${apiUrl}/clients/${id}`)
        fetchClients()
      } catch (error) {
        console.error('Error deleting client:', error)
      }
    }
  }

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
                <a href="/clients" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Clients</a>
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
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-2">Manage your client organizations</p>
          </div>
          <button
            onClick={() => navigate('/clients/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Client
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <div key={client.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {client.name}
                        </h3>
                        <p className="text-sm text-gray-600">{client.company}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(showDropdown === client.id ? null : client.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {showDropdown === client.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <button
                            onClick={() => navigate(`/clients/${client.id}`)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => navigate(`/clients/${client.id}/edit`)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(client.id)}
                            className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{client.email}</span>
                    </div>
                    {client.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {client.description}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      <span>{client.roundtables?.length || 0} roundtables</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Added {new Date(client.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => navigate(`/roundtables/new?clientId=${client.id}`)}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
                    >
                      Create Roundtable
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
                <p className="text-gray-600 mb-6">
                  Add your first client organization to get started with roundtables
                </p>
                <button
                  onClick={() => navigate('/clients/new')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                >
                  Add Your First Client
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}