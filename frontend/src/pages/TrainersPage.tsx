import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Calendar,
  Star,
  Award,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Building,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Download,
  Upload
} from 'lucide-react'

interface Trainer {
  id: string
  name: string
  email: string
  phone?: string
  specialties: string[]
  status: 'ACTIVE' | 'INACTIVE' | 'UNAVAILABLE'
  rating: number
  totalSessions: number
  completedSessions: number
  upcomingSessions: number
  languages: string[]
  hourlyRate?: number
  notes?: string
  createdAt: string
  lastActiveAt?: string
  availability: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
  }
}

export function TrainersPage() {
  const navigate = useNavigate()
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [specialtyFilter, setSpecialtyFilter] = useState('all')
  const [showDropdown, setShowDropdown] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: [] as string[],
    languages: [] as string[],
    hourlyRate: '',
    notes: '',
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true
    }
  })

  const specialtyOptions = [
    'Leadership',
    'Communication',
    'Negotiation',
    'Diversity & Inclusion',
    'Time Management',
    'Presentation Skills',
    'Team Building',
    'Conflict Resolution',
    'Decision Making',
    'Innovation'
  ]

  const languageOptions = ['English', 'Italian', 'Spanish', 'French', 'German']

  useEffect(() => {
    fetchTrainers()
  }, [])

  const fetchTrainers = async () => {
    try {
      setLoading(true)
      // Simulate API call - in real implementation this would fetch from backend
      const mockTrainers: Trainer[] = [
        {
          id: '1',
          name: 'Marco Rossi',
          email: 'marco.rossi@trainer.com',
          phone: '+39 345 678 9012',
          specialties: ['Leadership', 'Communication', 'Team Building'],
          status: 'ACTIVE',
          rating: 4.8,
          totalSessions: 45,
          completedSessions: 42,
          upcomingSessions: 3,
          languages: ['English', 'Italian'],
          hourlyRate: 85,
          notes: 'Excellent facilitator with strong background in corporate training',
          createdAt: '2023-06-15',
          lastActiveAt: '2024-01-20',
          availability: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: false,
            friday: true
          }
        },
        {
          id: '2',
          name: 'Anna Verdi',
          email: 'anna.verdi@trainer.com',
          phone: '+39 334 567 8901',
          specialties: ['Negotiation', 'Conflict Resolution', 'Decision Making'],
          status: 'ACTIVE',
          rating: 4.9,
          totalSessions: 38,
          completedSessions: 35,
          upcomingSessions: 2,
          languages: ['English', 'Italian', 'Spanish'],
          hourlyRate: 90,
          notes: 'Specialist in high-stakes negotiations and mediation',
          createdAt: '2023-08-20',
          lastActiveAt: '2024-01-19',
          availability: {
            monday: true,
            tuesday: true,
            wednesday: false,
            thursday: true,
            friday: true
          }
        },
        {
          id: '3',
          name: 'Luca Neri',
          email: 'luca.neri@trainer.com',
          specialties: ['Innovation', 'Presentation Skills', 'Time Management'],
          status: 'UNAVAILABLE',
          rating: 4.6,
          totalSessions: 28,
          completedSessions: 28,
          upcomingSessions: 0,
          languages: ['English', 'Italian'],
          hourlyRate: 80,
          notes: 'Currently on sabbatical, returning March 2024',
          createdAt: '2023-09-10',
          lastActiveAt: '2024-01-15',
          availability: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false
          }
        }
      ]
      setTrainers(mockTrainers)
    } catch (error) {
      console.error('Error fetching trainers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTrainer = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newTrainer.name || !newTrainer.email) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const trainer: Trainer = {
        id: Date.now().toString(),
        ...newTrainer,
        specialties: newTrainer.specialties,
        languages: newTrainer.languages,
        hourlyRate: newTrainer.hourlyRate ? parseFloat(newTrainer.hourlyRate) : undefined,
        status: 'ACTIVE',
        rating: 0,
        totalSessions: 0,
        completedSessions: 0,
        upcomingSessions: 0,
        createdAt: new Date().toISOString()
      }

      setTrainers([...trainers, trainer])
      setShowAddModal(false)
      setNewTrainer({
        name: '',
        email: '',
        phone: '',
        specialties: [],
        languages: [],
        hourlyRate: '',
        notes: '',
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true
        }
      })
      alert('Trainer added successfully!')
    } catch (error) {
      console.error('Error adding trainer:', error)
      alert('Error adding trainer. Please try again.')
    }
  }

  const handleStatusChange = async (trainerId: string, newStatus: string) => {
    const updated = trainers.map(t => 
      t.id === trainerId ? { ...t, status: newStatus as any } : t
    )
    setTrainers(updated)
    alert(`Trainer status updated to ${newStatus}`)
  }

  const handleDelete = async (trainerId: string) => {
    if (confirm('Are you sure you want to remove this trainer?')) {
      setTrainers(trainers.filter(t => t.id !== trainerId))
      alert('Trainer removed successfully')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800'
      case 'UNAVAILABLE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return CheckCircle
      case 'INACTIVE': return XCircle
      case 'UNAVAILABLE': return Clock
      default: return AlertCircle
    }
  }

  const getAvailabilityDays = (availability: Trainer['availability']) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const
    return days.filter((_, index) => availability[dayKeys[index]])
  }

  const toggleSpecialty = (specialty: string) => {
    if (newTrainer.specialties.includes(specialty)) {
      setNewTrainer({
        ...newTrainer,
        specialties: newTrainer.specialties.filter(s => s !== specialty)
      })
    } else {
      setNewTrainer({
        ...newTrainer,
        specialties: [...newTrainer.specialties, specialty]
      })
    }
  }

  const toggleLanguage = (language: string) => {
    if (newTrainer.languages.includes(language)) {
      setNewTrainer({
        ...newTrainer,
        languages: newTrainer.languages.filter(l => l !== language)
      })
    } else {
      setNewTrainer({
        ...newTrainer,
        languages: [...newTrainer.languages, language]
      })
    }
  }

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = 
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || trainer.status === statusFilter
    const matchesSpecialty = specialtyFilter === 'all' || trainer.specialties.includes(specialtyFilter)
    
    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const allSpecialties = [...new Set(trainers.flatMap(t => t.specialties))]

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
                <a href="/participants" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Participants</a>
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
            <h1 className="text-3xl font-bold text-gray-900">Trainer Management</h1>
            <p className="text-gray-600 mt-2">Manage your trainer network and assignments</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Trainer
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Trainers</p>
                <p className="text-2xl font-bold text-gray-900">{trainers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trainers.filter(t => t.status === 'ACTIVE').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trainers.reduce((sum, t) => sum + t.upcomingSessions, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(trainers.reduce((sum, t) => sum + t.rating, 0) / trainers.length || 0).toFixed(1)}
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
                  placeholder="Search trainers, specialties..."
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
                <option value="UNAVAILABLE">Unavailable</option>
              </select>

              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => {
              const StatusIcon = getStatusIcon(trainer.status)
              const availableDays = getAvailabilityDays(trainer.availability)
              
              return (
                <div key={trainer.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg mr-3">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{trainer.name}</h3>
                          <div className="flex items-center mt-1">
                            <StatusIcon className={`h-4 w-4 mr-1 ${
                              trainer.status === 'ACTIVE' ? 'text-green-600' :
                              trainer.status === 'UNAVAILABLE' ? 'text-red-600' :
                              'text-gray-600'
                            }`} />
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(trainer.status)}`}>
                              {trainer.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => setShowDropdown(showDropdown === trainer.id ? null : trainer.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        {showDropdown === trainer.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <button
                              onClick={() => navigate(`/trainers/${trainer.id}`)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </button>
                            {trainer.status === 'ACTIVE' ? (
                              <button
                                onClick={() => handleStatusChange(trainer.id, 'INACTIVE')}
                                className="flex items-center px-4 py-2 text-sm text-orange-700 hover:bg-orange-50 w-full"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Mark Inactive
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStatusChange(trainer.id, 'ACTIVE')}
                                className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50 w-full"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Active
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(trainer.id)}
                              className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{trainer.email}</span>
                      </div>
                      {trainer.phone && (
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{trainer.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>{trainer.rating}/5 ({trainer.completedSessions} sessions)</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specialties.map((specialty, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.languages.map((language, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Availability:</p>
                      <div className="flex flex-wrap gap-1">
                        {availableDays.length > 0 ? (
                          availableDays.map((day, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                              {day}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">Not available</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{trainer.upcomingSessions}</span> upcoming
                      </div>
                      {trainer.hourlyRate && (
                        <div className="text-sm font-medium text-gray-900">
                          €{trainer.hourlyRate}/hr
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => navigate(`/sessions?trainer=${trainer.id}`)}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
                      >
                        View Sessions
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No trainers found</h3>
                <p className="text-gray-600 mb-6">
                  Add trainers to your network to start assigning sessions
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                >
                  Add Your First Trainer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Trainer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add New Trainer</h3>
            </div>
            
            <form onSubmit={handleAddTrainer} className="px-6 py-4">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTrainer.name}
                      onChange={(e) => setNewTrainer({...newTrainer, name: e.target.value})}
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
                      value={newTrainer.email}
                      onChange={(e) => setNewTrainer({...newTrainer, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newTrainer.phone}
                      onChange={(e) => setNewTrainer({...newTrainer, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hourly Rate (€)
                    </label>
                    <input
                      type="number"
                      value={newTrainer.hourlyRate}
                      onChange={(e) => setNewTrainer({...newTrainer, hourlyRate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialties
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {specialtyOptions.map((specialty) => (
                      <label key={specialty} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newTrainer.specialties.includes(specialty)}
                          onChange={() => toggleSpecialty(specialty)}
                          className="mr-2"
                        />
                        <span className="text-sm">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((language) => (
                      <label key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newTrainer.languages.includes(language)}
                          onChange={() => toggleLanguage(language)}
                          className="mr-2"
                        />
                        <span className="text-sm">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                      <label key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newTrainer.availability[day as keyof typeof newTrainer.availability]}
                          onChange={(e) => setNewTrainer({
                            ...newTrainer,
                            availability: {
                              ...newTrainer.availability,
                              [day]: e.target.checked
                            }
                          })}
                          className="mr-1"
                        />
                        <span className="text-sm capitalize">{day.slice(0, 3)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newTrainer.notes}
                    onChange={(e) => setNewTrainer({...newTrainer, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional notes about this trainer..."
                  />
                </div>
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
                  Add Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}