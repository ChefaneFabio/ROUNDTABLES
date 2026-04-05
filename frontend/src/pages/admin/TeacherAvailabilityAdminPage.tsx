import { useState } from 'react'
import { useQuery } from 'react-query'
import { Clock, Users, ChevronRight } from 'lucide-react'
import { studentsApi } from '../../services/api'
import { availabilityApi } from '../../services/availabilityApi'
import { LoadingPage } from '../../components/common/LoadingSpinner'
import { Card } from '../../components/common/Card'

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: 'bg-green-500',
  BUSY: 'bg-red-400',
  TENTATIVE: 'bg-yellow-400',
  VACATION: 'bg-purple-400',
  SICK_LEAVE: 'bg-gray-400',
}

export default function TeacherAvailabilityAdminPage() {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null)

  // Load all teachers
  const { data: teachersData, isLoading: loadingTeachers } = useQuery(
    'adminTeachers',
    async () => {
      const res = await studentsApi.getAll({ page: 1, limit: 100 }) // Using a generic fetch
      return res
    },
    { enabled: false } // We'll use a different approach
  )

  // Actually load teachers from the teachers API
  const { data: teachers, isLoading } = useQuery(
    'allTeachersForAvailability',
    async () => {
      // Use the api directly since teachersApi might not have the right method
      const { default: api } = await import('../../services/api')
      const res = await api.get('/teachers', { params: { page: 1, limit: 100 } })
      return res.data?.data || res.data || []
    }
  )

  // Load selected teacher's availability
  const { data: teacherAvailability, isLoading: loadingAvailability } = useQuery(
    ['teacherAvailability', selectedTeacherId],
    () => availabilityApi.getTeacher(selectedTeacherId!),
    { enabled: !!selectedTeacherId }
  )

  if (isLoading) return <LoadingPage />

  const teacherList = Array.isArray(teachers) ? teachers : []

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Clock className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Availability</h1>
          <p className="text-sm text-gray-500">View and manage teacher schedules</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Teacher List */}
        <div>
          <Card>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Teachers</h2>
            <div className="space-y-1">
              {teacherList.length === 0 ? (
                <p className="text-sm text-gray-400 py-4 text-center">No teachers found</p>
              ) : (
                teacherList.map((t: any) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTeacherId(t.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all ${
                      selectedTeacherId === t.id
                        ? 'bg-primary-50 border border-primary-200 text-primary-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">{t.user?.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-400">{t.user?.email}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Availability Grid */}
        <div className="lg:col-span-2">
          {!selectedTeacherId ? (
            <Card>
              <div className="text-center py-12 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">Select a teacher to view their availability</p>
              </div>
            </Card>
          ) : loadingAvailability ? (
            <Card>
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
              </div>
            </Card>
          ) : (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {teacherAvailability?.teacher?.user?.name || 'Teacher'}
                  </h2>
                  <p className="text-sm text-gray-500">{teacherAvailability?.teacher?.user?.email}</p>
                </div>
                <div className="flex gap-2 text-xs">
                  {Object.entries(STATUS_COLORS).map(([status, color]) => (
                    <div key={status} className="flex items-center gap-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                      <span className="text-gray-500 capitalize">{status.toLowerCase().replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly grid */}
              <div className="grid grid-cols-7 gap-2">
                {DAYS_SHORT.map((day, dayIndex) => {
                  const daySlots = (teacherAvailability?.availability || [])
                    .filter((s: any) => s.dayOfWeek === dayIndex)
                    .sort((a: any, b: any) => a.startTime.localeCompare(b.startTime))

                  return (
                    <div key={day} className="min-h-[120px]">
                      <p className="text-xs font-semibold text-gray-500 text-center mb-2">{day}</p>
                      <div className="space-y-1">
                        {daySlots.length === 0 ? (
                          <div className="h-8 bg-gray-50 rounded border border-dashed border-gray-200 flex items-center justify-center">
                            <span className="text-[10px] text-gray-300">No slots</span>
                          </div>
                        ) : (
                          daySlots.map((slot: any, i: number) => (
                            <div
                              key={i}
                              className={`${STATUS_COLORS[slot.status] || 'bg-gray-200'} rounded px-1.5 py-1 text-[10px] font-medium text-center`}
                              title={`${slot.startTime} - ${slot.endTime} (${slot.status})`}
                            >
                              {slot.startTime?.slice(0, 5)}-{slot.endTime?.slice(0, 5)}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Upcoming lessons */}
              {teacherAvailability?.upcomingLessons?.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Upcoming Lessons</h3>
                  <div className="space-y-2">
                    {teacherAvailability.upcomingLessons.slice(0, 5).map((lesson: any) => (
                      <div key={lesson.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
                        <div>
                          <p className="font-medium text-gray-900">{lesson.title || `Lesson ${lesson.lessonNumber}`}</p>
                          <p className="text-xs text-gray-500">{lesson.course?.name}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {lesson.scheduledAt ? new Date(lesson.scheduledAt).toLocaleString('en-GB', {
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                          }) : '--'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
