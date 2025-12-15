import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  Filter,
  Users,
  ChevronLeft,
  ChevronRight,
  List,
  Grid,
  Download,
  X,
  Check
} from 'lucide-react'
import axios from 'axios'

interface Roundtable {
  id: string
  name: string
  status: string
  client: {
    name: string
    company: string
  }
}

interface Session {
  id: string
  sessionNumber: number
  scheduledAt: string
  status: string
  workflowStatus: string
  topic?: {
    id: string
    title: string
    description: string
  }
  trainer?: {
    id: string
    name: string
    email: string
  }
  questionsCount: number
  feedbackCount: number
  roundtableId: string
}

interface RoundtableGroup {
  roundtable: Roundtable
  sessions: Session[]
}

interface CalendarData {
  groups: RoundtableGroup[]
  totalSessions: number
  dateRange: {
    start: string | null
    end: string | null
  }
}

export function CalendarViewPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null)
  const [allRoundtables, setAllRoundtables] = useState<Roundtable[]>([])
  const [selectedRoundtableIds, setSelectedRoundtableIds] = useState<string[]>([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchAllRoundtables()
  }, [])

  useEffect(() => {
    if (allRoundtables.length > 0 && selectedRoundtableIds.length === 0) {
      // Select all active roundtables by default
      const activeIds = allRoundtables
        .filter(rt => rt.status !== 'COMPLETED' && rt.status !== 'CANCELLED')
        .map(rt => rt.id)
      setSelectedRoundtableIds(activeIds.slice(0, 5)) // Limit to 5 for initial load
    }
  }, [allRoundtables])

  useEffect(() => {
    if (selectedRoundtableIds.length > 0) {
      fetchCalendarData()
    }
  }, [selectedRoundtableIds, currentMonth])

  const fetchAllRoundtables = async () => {
    try {
      const response = await axios.get(`${apiUrl}/roundtables?limit=100`)
      if (response.data?.data) {
        setAllRoundtables(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching roundtables:', error)
    }
  }

  const fetchCalendarData = async () => {
    try {
      setLoading(true)

      // Calculate date range for current month
      const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
      const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

      const params = {
        roundtableIds: selectedRoundtableIds.join(','),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }

      const response = await axios.get(`${apiUrl}/sessions/calendar-view`, { params })
      if (response.data?.data) {
        setCalendarData(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleRoundtableSelection = (id: string) => {
    setSelectedRoundtableIds(prev =>
      prev.includes(id)
        ? prev.filter(rtId => rtId !== id)
        : [...prev, id]
    )
  }

  const getWorkflowColor = (workflowStatus: string) => {
    switch (workflowStatus) {
      case 'questions_requested':
        return 'bg-pink-100 border-pink-300 text-pink-800' // Pink - Questions requested to trainer
      case 'questions_sent':
        return 'bg-blue-100 border-blue-300 text-blue-800' // Blue - Questions sent to students
      case 'feedback_requested':
        return 'bg-orange-100 border-orange-300 text-orange-800' // Orange - Feedback requested from trainer
      case 'feedback_sent':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800' // Yellow - Feedback sent to students
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800' // Gray - Scheduled
    }
  }

  const getWorkflowLabel = (workflowStatus: string) => {
    switch (workflowStatus) {
      case 'questions_requested':
        return 'Questions Requested'
      case 'questions_sent':
        return 'Questions Sent'
      case 'feedback_requested':
        return 'Feedback Requested'
      case 'feedback_sent':
        return 'Feedback Sent'
      default:
        return 'Scheduled'
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getMonthName = () => {
    return currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  if (loading && !calendarData) {
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Session Calendar</h1>
            <p className="text-gray-600 mt-2">View and manage sessions across multiple roundtables</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2 text-gray-600" />
              Filter ({selectedRoundtableIds.length})
            </button>

            <div className="flex items-center bg-white border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Download className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <h2 className="text-xl font-semibold text-gray-900">{getMonthName()}</h2>

            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Workflow Status Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-pink-100 border-2 border-pink-300 rounded mr-2"></div>
              <span className="text-sm text-gray-700">Questions Requested (Trainer)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded mr-2"></div>
              <span className="text-sm text-gray-700">Questions Sent (Students)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded mr-2"></div>
              <span className="text-sm text-gray-700">Feedback Requested (Trainer)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-300 rounded mr-2"></div>
              <span className="text-sm text-gray-700">Feedback Sent (Students)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded mr-2"></div>
              <span className="text-sm text-gray-700">Scheduled</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid View */}
        {viewMode === 'grid' && calendarData && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              {calendarData.groups.map((group) => (
                <div key={group.roundtable.id} className="border-b border-gray-200 last:border-b-0">
                  {/* Roundtable Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">{group.roundtable.name}</h3>
                    <p className="text-sm text-gray-600">{group.roundtable.client.company}</p>
                  </div>

                  {/* Sessions Grid */}
                  <div className="p-6">
                    {group.sessions.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {group.sessions.map((session) => (
                          <div
                            key={session.id}
                            onClick={() => navigate(`/sessions/${session.id}`)}
                            className={`p-4 border-2 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${getWorkflowColor(session.workflowStatus)}`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold">Session {session.sessionNumber}</span>
                              <span className="text-xs">{formatDate(session.scheduledAt)}</span>
                            </div>

                            <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                              {session.topic?.title || 'No topic assigned'}
                            </h4>

                            <div className="space-y-1 text-xs">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{formatTime(session.scheduledAt)}</span>
                              </div>

                              {session.trainer && (
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span className="truncate">{session.trainer.name}</span>
                                </div>
                              )}

                              <div className="mt-2 pt-2 border-t border-current border-opacity-20">
                                <span className="text-xs font-medium">{getWorkflowLabel(session.workflowStatus)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No sessions scheduled this month</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {calendarData.groups.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
                <p className="text-gray-600 mb-6">Select roundtables from the filter to view sessions</p>
                <button
                  onClick={() => setShowFilterModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Select Roundtables
                </button>
              </div>
            )}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && calendarData && (
          <div className="bg-white rounded-lg shadow">
            {calendarData.groups.flatMap(group =>
              group.sessions.map(session => (
                <div
                  key={session.id}
                  onClick={() => navigate(`/sessions/${session.id}`)}
                  className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center flex-1">
                    <div className={`w-2 h-16 rounded-l-lg ${getWorkflowColor(session.workflowStatus)} mr-4`}></div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900">
                          {group.roundtable.name} - Session {session.sessionNumber}
                        </span>
                        <span className={`ml-3 px-2 py-1 text-xs rounded-full ${getWorkflowColor(session.workflowStatus)}`}>
                          {getWorkflowLabel(session.workflowStatus)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{session.topic?.title || 'No topic'}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                        <span>{formatDate(session.scheduledAt)} at {formatTime(session.scheduledAt)}</span>
                        {session.trainer && (
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {session.trainer.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Select Roundtables</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-4 overflow-y-auto max-h-96">
              <div className="space-y-2">
                {allRoundtables.map((roundtable) => (
                  <label
                    key={roundtable.id}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoundtableIds.includes(roundtable.id)}
                      onChange={() => toggleRoundtableSelection(roundtable.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{roundtable.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          roundtable.status === 'IN_PROGRESS' ? 'bg-green-100 text-green-800' :
                          roundtable.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {roundtable.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{roundtable.client.company}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {selectedRoundtableIds.length} roundtable(s) selected
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedRoundtableIds([])}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    setShowFilterModal(false)
                    fetchCalendarData()
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
