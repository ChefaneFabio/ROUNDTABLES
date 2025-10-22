import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Download,
  Upload,
  MoreVertical
} from 'lucide-react'
import { participantsApi, roundtablesApi } from '../services/api'

interface Participant {
  id: string
  name: string
  email: string
  phone?: string
  englishLevel: string
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED'
  company: string
  roundtable: {
    id: string
    name: string
    client: {
      company: string
    }
  }
  createdAt: string
  votingCompleted: boolean
  sessionsAttended: number
  totalSessions: number
}

export function ParticipantsPage() {
  const navigate = useNavigate()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [roundtables, setRoundtables] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roundtableFilter, setRoundtableFilter] = useState('all')
  const [showDropdown, setShowDropdown] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    email: '',
    phone: '',
    englishLevel: 'B1',
    company: '',
    roundtableId: ''
  })

  useEffect(() => {
    fetchParticipants()
    fetchRoundtables()
  }, [])

  const fetchParticipants = async () => {
    try {
      setLoading(true)
      // Since we don't have a direct participants endpoint, we'll simulate data
      // In real implementation, this would call participantsApi.getAll()
      setParticipants([])
    } catch (error) {
      console.error('Error fetching participants:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRoundtables = async () => {
    try {
      const response = await roundtablesApi.getAll()
      if (response?.data) {
        setRoundtables(response.data)
      }
    } catch (error) {
      console.error('Error fetching roundtables:', error)
    }
  }

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newParticipant.name || !newParticipant.email || !newParticipant.roundtableId) {
      alert('Please fill in all required fields')
      return
    }

    try {
      await participantsApi.create({
        ...newParticipant,
        status: 'ACTIVE'
      })
      
      setShowAddModal(false)
      setNewParticipant({
        name: '',
        email: '',
        phone: '',
        englishLevel: 'B1',
        company: '',
        roundtableId: ''
      })
      fetchParticipants()
      alert('Participant added successfully!')
    } catch (error) {
      console.error('Error adding participant:', error)
      alert('Error adding participant. Please try again.')
    }
  }

  const handleStatusChange = async (participantId: string, newStatus: string) => {
    try {
      await participantsApi.update(participantId, { status: newStatus })
      fetchParticipants()
      alert(`Participant status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating participant status:', error)
      alert('Error updating participant status')
    }
  }

  const handleDelete = async (participantId: string) => {
    if (confirm('Are you sure you want to remove this participant?')) {
      try {
        await participantsApi.delete(participantId)
        fetchParticipants()
        alert('Participant removed successfully')
      } catch (error) {
        console.error('Error deleting participant:', error)
        alert('Error removing participant')
      }
    }
  }

  const handleCSVImport = async () => {
    if (!csvFile) {
      alert('Please select a CSV file to import')
      return
    }

    setImporting(true)
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split('\n').filter(line => line.trim())

        if (lines.length < 2) {
          alert('CSV file is empty or has no data rows')
          setImporting(false)
          return
        }

        // Parse CSV header
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase())

        // Verify required columns
        const requiredColumns = ['name', 'email', 'roundtableid']
        const missingColumns = requiredColumns.filter(col => !headers.includes(col))

        if (missingColumns.length > 0) {
          alert(`Missing required columns: ${missingColumns.join(', ')}\n\nRequired columns: name, email, roundtableId\nOptional: phone, englishLevel, company`)
          setImporting(false)
          return
        }

        // Parse data rows
        let successCount = 0
        let errorCount = 0
        const errors: string[] = []

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim())

          if (values.length < headers.length) {
            continue // Skip incomplete rows
          }

          const participant: any = {}
          headers.forEach((header, index) => {
            participant[header] = values[index]
          })

          try {
            await participantsApi.create({
              name: participant.name,
              email: participant.email,
              phone: participant.phone || '',
              englishLevel: participant.englishlevel || participant.level || 'B1',
              company: participant.company || '',
              roundtableId: participant.roundtableid,
              status: 'ACTIVE'
            })
            successCount++
          } catch (error: any) {
            errorCount++
            errors.push(`Row ${i + 1}: ${participant.name || participant.email} - ${error.message}`)
          }
        }

        // Show results
        const message = `Import completed!\n\nSuccessfully imported: ${successCount}\nFailed: ${errorCount}${errors.length > 0 ? '\n\nErrors:\n' + errors.slice(0, 5).join('\n') : ''}`
        alert(message)

        // Refresh participants list
        fetchParticipants()
        setShowImportModal(false)
        setCsvFile(null)
      } catch (error) {
        console.error('Error parsing CSV:', error)
        alert('Error parsing CSV file. Please check the format.')
      } finally {
        setImporting(false)
      }
    }

    reader.readAsText(csvFile)
  }

  const handleExportCSV = () => {
    if (participants.length === 0) {
      alert('No participants to export')
      return
    }

    // Create CSV content
    const headers = ['Name', 'Email', 'Phone', 'English Level', 'Company', 'Roundtable', 'Status', 'Voting Completed']
    const csvContent = [
      headers.join(','),
      ...participants.map(p => [
        p.name,
        p.email,
        p.phone || '',
        p.englishLevel,
        p.company,
        p.roundtable.name,
        p.status,
        p.votingCompleted ? 'Yes' : 'No'
      ].join(','))
    ].join('\n')

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `participants_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return CheckCircle
      case 'INACTIVE': return XCircle
      case 'COMPLETED': return UserCheck
      default: return AlertTriangle
    }
  }

  const getEnglishLevelColor = (level: string) => {
    switch (level) {
      case 'A1':
      case 'A2': return 'bg-red-100 text-red-800'
      case 'B1': return 'bg-yellow-100 text-yellow-800'
      case 'B2': return 'bg-green-100 text-green-800'
      case 'C1':
      case 'C2': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = 
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.roundtable.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter
    const matchesRoundtable = roundtableFilter === 'all' || participant.roundtable.id === roundtableFilter
    
    return matchesSearch && matchesStatus && matchesRoundtable
  })

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
            <h1 className="text-3xl font-bold text-gray-900">Participant Management</h1>
            <p className="text-gray-600 mt-2">Manage participants across all roundtables</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowImportModal(true)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Participant
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-gray-900">{participants.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {participants.filter(p => p.status === 'ACTIVE').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {participants.filter(p => p.status === 'COMPLETED').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">B1+ Level</p>
                <p className="text-2xl font-bold text-gray-900">
                  {participants.filter(p => ['B1', 'B2', 'C1', 'C2'].includes(p.englishLevel)).length}
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
                  placeholder="Search participants, emails, companies..."
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
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="COMPLETED">Completed</option>
              </select>

              <select
                value={roundtableFilter}
                onChange={(e) => setRoundtableFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roundtables</option>
                {roundtables.map((rt) => (
                  <option key={rt.id} value={rt.id}>
                    {rt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Participants Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredParticipants.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    English Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roundtable
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParticipants.map((participant) => {
                  const StatusIcon = getStatusIcon(participant.status)
                  
                  return (
                    <tr key={participant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {participant.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {participant.company}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center mb-1">
                            <Mail className="h-4 w-4 text-gray-400 mr-1" />
                            {participant.email}
                          </div>
                          {participant.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-1" />
                              {participant.phone}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getEnglishLevelColor(participant.englishLevel)}`}>
                          {participant.englishLevel}
                        </span>
                        {!['B1', 'B2', 'C1', 'C2'].includes(participant.englishLevel) && (
                          <div className="flex items-center mt-1">
                            <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                            <span className="text-xs text-red-600">Below B1</span>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {participant.roundtable.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {participant.roundtable.client.company}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Sessions: {participant.sessionsAttended}/{participant.totalSessions}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ 
                              width: `${(participant.sessionsAttended / participant.totalSessions) * 100}%` 
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Voting: {participant.votingCompleted ? 'Complete' : 'Pending'}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StatusIcon className={`h-4 w-4 mr-2 ${
                            participant.status === 'ACTIVE' ? 'text-green-600' :
                            participant.status === 'COMPLETED' ? 'text-blue-600' :
                            'text-gray-600'
                          }`} />
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(participant.status)}`}>
                            {participant.status}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative">
                          <button
                            onClick={() => setShowDropdown(showDropdown === participant.id ? null : participant.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                          {showDropdown === participant.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                              <button
                                onClick={() => navigate(`/participants/${participant.id}`)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Details
                              </button>
                              {participant.status === 'ACTIVE' ? (
                                <button
                                  onClick={() => handleStatusChange(participant.id, 'INACTIVE')}
                                  className="flex items-center px-4 py-2 text-sm text-orange-700 hover:bg-orange-50 w-full"
                                >
                                  <UserX className="h-4 w-4 mr-2" />
                                  Mark Inactive
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStatusChange(participant.id, 'ACTIVE')}
                                  className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full"
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Mark Active
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(participant.id)}
                                className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No participants found</h3>
              <p className="text-gray-600 mb-6">
                Add participants to roundtables to get started
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Your First Participant
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Participant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add New Participant</h3>
            </div>
            
            <form onSubmit={handleAddParticipant} className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newParticipant.name}
                    onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newParticipant.email}
                    onChange={(e) => setNewParticipant({...newParticipant, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newParticipant.phone}
                    onChange={(e) => setNewParticipant({...newParticipant, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    English Level *
                  </label>
                  <select
                    required
                    value={newParticipant.englishLevel}
                    onChange={(e) => setNewParticipant({...newParticipant, englishLevel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="A1">A1 - Beginner</option>
                    <option value="A2">A2 - Elementary</option>
                    <option value="B1">B1 - Intermediate (Required)</option>
                    <option value="B2">B2 - Upper Intermediate</option>
                    <option value="C1">C1 - Advanced</option>
                    <option value="C2">C2 - Proficient</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newParticipant.company}
                    onChange={(e) => setNewParticipant({...newParticipant, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roundtable *
                  </label>
                  <select
                    required
                    value={newParticipant.roundtableId}
                    onChange={(e) => setNewParticipant({...newParticipant, roundtableId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a roundtable</option>
                    {roundtables.map((rt) => (
                      <option key={rt.id} value={rt.id}>
                        {rt.name} - {rt.client.company}
                      </option>
                    ))}
                  </select>
                </div>

                {newParticipant.englishLevel && !['B1', 'B2', 'C1', 'C2'].includes(newParticipant.englishLevel) && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm text-red-700">
                        Warning: Participant level is below required B1 minimum
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Participant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Import Participants from CSV</h3>
            </div>

            <div className="px-6 py-4">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    cursor-pointer"
                />
                {csvFile && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {csvFile.name}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">CSV Format Requirements:</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Required columns:</strong> name, email, roundtableId</p>
                  <p><strong>Optional columns:</strong> phone, englishLevel, company</p>
                  <p className="mt-2"><strong>Example CSV:</strong></p>
                  <pre className="bg-white p-2 rounded text-xs mt-1 overflow-x-auto">
name,email,roundtableId,phone,englishLevel,company{'\n'}
John Doe,john@example.com,abc123,+39123456789,B1,Acme Corp{'\n'}
Jane Smith,jane@example.com,abc123,,B2,Tech Inc
                  </pre>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Important Notes:</p>
                    <ul className="list-disc ml-4 mt-1 space-y-1">
                      <li>Duplicate emails will be skipped</li>
                      <li>Invalid roundtableId will cause row to fail</li>
                      <li>englishLevel defaults to B1 if not provided</li>
                      <li>All participants will be set to ACTIVE status</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowImportModal(false)
                    setCsvFile(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCSVImport}
                  disabled={!csvFile || importing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {importing ? 'Importing...' : 'Import CSV'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}