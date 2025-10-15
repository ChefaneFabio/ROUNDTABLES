import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Clock,
  User,
  AlertTriangle,
  Building
} from 'lucide-react'

interface Session {
  id: string
  sessionNumber: number
  scheduledAt: string
  status: string
  roundtable: {
    id: string
    name: string
    client: {
      name: string
      company: string
    }
  }
  topic?: {
    id: string
    title: string
  }
  trainer?: {
    id: string
    name: string
    email: string
  }
}

interface TrainerConflict {
  trainerId: string
  trainerName: string
  sessions: Session[]
}

export function SessionsCalendarPage() {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTrainer, setSelectedTrainer] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list')
  const [conflicts, setConflicts] = useState<TrainerConflict[]>([])

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${apiUrl}/sessions?upcoming=true&limit=100`)
      const data = await response.json()

      if (data.success && data.data) {
        // Sort by scheduled date
        const sortedSessions = data.data.sort(
          (a: Session, b: Session) =>
            new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
        )
        setSessions(sortedSessions)
        detectConflicts(sortedSessions)
      }
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const detectConflicts = (sessionsList: Session[]) => {
    const trainerSessions: Record<string, Session[]> = {}

    // Group sessions by trainer
    sessionsList.forEach((session) => {
      if (session.trainer) {
        if (!trainerSessions[session.trainer.id]) {
          trainerSessions[session.trainer.id] = []
        }
        trainerSessions[session.trainer.id].push(session)
      }
    })

    // Find overlapping sessions for each trainer
    const conflictsList: TrainerConflict[] = []

    Object.entries(trainerSessions).forEach(([trainerId, trainerSessionList]) => {
      const overlappingSessions: Session[] = []

      for (let i = 0; i < trainerSessionList.length - 1; i++) {
        const current = trainerSessionList[i]
        const next = trainerSessionList[i + 1]

        const currentStart = new Date(current.scheduledAt)
        const currentEnd = new Date(currentStart.getTime() + 90 * 60000) // Assume 90 min sessions
        const nextStart = new Date(next.scheduledAt)

        // Check if sessions overlap (within 90 minutes of each other)
        if (nextStart < currentEnd) {
          if (!overlappingSessions.includes(current)) {
            overlappingSessions.push(current)
          }
          if (!overlappingSessions.includes(next)) {
            overlappingSessions.push(next)
          }
        }
      }

      if (overlappingSessions.length > 0 && trainerSessionList[0].trainer) {
        conflictsList.push({
          trainerId,
          trainerName: trainerSessionList[0].trainer.name,
          sessions: overlappingSessions
        })
      }
    })

    setConflicts(conflictsList)
  }

  const getUniqueTrainers = () => {
    const trainers = sessions
      .filter((s) => s.trainer)
      .map((s) => s.trainer!)
      .filter((trainer, index, self) =>
        index === self.findIndex((t) => t.id === trainer.id)
      )
    return trainers
  }

  const getFilteredSessions = () => {
    if (selectedTrainer === 'all') {
      return sessions
    }
    return sessions.filter((s) => s.trainer?.id === selectedTrainer)
  }

  const isConflictSession = (sessionId: string) => {
    return conflicts.some((conflict) =>
      conflict.sessions.some((s) => s.id === sessionId)
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-purple-100 text-purple-800'
      case 'REMINDER_SENT':
        return 'bg-blue-100 text-blue-800'
      case 'QUESTIONS_READY':
        return 'bg-green-100 text-green-800'
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
        return 'bg-gray-400 text-white'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const groupSessionsByDate = () => {
    const grouped: Record<string, Session[]> = {}

    getFilteredSessions().forEach((session) => {
      const date = new Date(session.scheduledAt).toLocaleDateString()
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(session)
    })

    return grouped
  }

  const filteredSessions = getFilteredSessions()
  const groupedSessions = groupSessionsByDate()
  const trainers = getUniqueTrainers()

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
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </a>
                <a href="/roundtables" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Roundtables
                </a>
                <a href="/sessions" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Sessions
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sessions Calendar</h1>
          <p className="text-gray-600">
            Chronological view of all sessions across roundtables
          </p>
        </div>

        {/* Conflicts Alert */}
        {conflicts.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900 mb-2">
                  ⚠️ Trainer Scheduling Conflicts Detected
                </h3>
                <div className="space-y-2">
                  {conflicts.map((conflict) => (
                    <div key={conflict.trainerId} className="text-sm text-red-800">
                      <strong>{conflict.trainerName}</strong> has {conflict.sessions.length} overlapping sessions
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <label className="text-sm font-medium text-gray-700 mr-2">Trainer:</label>
                <select
                  value={selectedTrainer}
                  onChange={(e) => setSelectedTrainer(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Trainers</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    viewMode === 'timeline'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Timeline View
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <strong>{filteredSessions.length}</strong> sessions
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredSessions.map((session) => {
              const hasConflict = isConflictSession(session.id)

              return (
                <div
                  key={session.id}
                  className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer ${
                    hasConflict ? 'border-2 border-red-400' : ''
                  }`}
                  onClick={() => navigate(`/sessions/${session.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {hasConflict && (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        )}
                        <h3 className="font-semibold text-gray-900">
                          {session.roundtable.name} - Session {session.sessionNumber}/10
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Building className="h-4 w-4 mr-2" />
                          {session.roundtable.client.name}
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                          {new Date(session.scheduledAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>

                        {session.trainer && (
                          <div className="flex items-center text-gray-600">
                            <User className="h-4 w-4 mr-2" />
                            {session.trainer.name}
                          </div>
                        )}

                        {session.topic && (
                          <div className="text-gray-600">
                            Topic: {session.topic.title}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                        {session.status.replace('_', ' ')}
                      </span>
                      {hasConflict && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          ⚠️ Conflict
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Timeline View - Group by Date
          <div className="space-y-6">
            {Object.entries(groupedSessions).map(([date, dateSessions]) => (
              <div key={date} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {date}
                </h3>

                <div className="relative pl-8">
                  {/* Timeline Line */}
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  <div className="space-y-4">
                    {dateSessions.map((session, idx) => {
                      const hasConflict = isConflictSession(session.id)

                      return (
                        <div key={session.id} className="relative">
                          {/* Timeline Dot */}
                          <div
                            className={`absolute -left-6 top-2 w-3 h-3 rounded-full ${
                              hasConflict ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                          ></div>

                          <div
                            className={`bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition cursor-pointer ${
                              hasConflict ? 'border-l-4 border-red-500' : 'border-l-4 border-blue-500'
                            }`}
                            onClick={() => navigate(`/sessions/${session.id}`)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">
                                  {new Date(session.scheduledAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                                {hasConflict && (
                                  <AlertTriangle className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                                {session.status.replace('_', ' ')}
                              </span>
                            </div>

                            <div className="text-sm text-gray-900 font-medium mb-1">
                              {session.roundtable.name} - Session {session.sessionNumber}/10
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Client: {session.roundtable.client.name}</div>
                              {session.trainer && <div>Trainer: {session.trainer.name}</div>}
                              {session.topic && <div>Topic: {session.topic.title}</div>}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredSessions.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Sessions Found</h3>
            <p className="text-gray-600">
              {selectedTrainer === 'all'
                ? 'No upcoming sessions scheduled yet'
                : 'No sessions for the selected trainer'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
