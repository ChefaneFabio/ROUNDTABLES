import { useState } from 'react'
import { useQuery } from 'react-query'
import { format } from 'date-fns'
import {
  Clock, BookOpen, Calendar, ChevronLeft, ChevronRight,
  TrendingUp, AlertCircle, CheckCircle, Filter
} from 'lucide-react'
import { teachersApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

const STATUS_BADGE: Record<string, string> = {
  SCHEDULED: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
  ARCHIVED: 'bg-gray-100 text-gray-500',
}

export default function TeacherHoursPage() {
  const { isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState<'courses' | 'monthly' | 'history'>('courses')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Course hours
  const { data: courseHours = [], isLoading: loadingCourses } = useQuery(
    'teacher-course-hours',
    () => teachersApi.getMyCourseHours()
  )

  // Monthly hours
  const { data: monthlyData, isLoading: loadingMonthly } = useQuery(
    ['teacher-monthly-hours', selectedYear],
    () => teachersApi.getMyMonthlyHours(selectedYear)
  )

  // History filters
  const [histCourseId, setHistCourseId] = useState('')
  const [histFrom, setHistFrom] = useState('')
  const [histTo, setHistTo] = useState('')
  const [histPage, setHistPage] = useState(1)

  const { data: historyData, isLoading: loadingHistory } = useQuery(
    ['teacher-hours-history', histCourseId, histFrom, histTo, histPage],
    () => teachersApi.getMyHoursHistory({
      courseId: histCourseId || undefined,
      fromDate: histFrom || undefined,
      toDate: histTo || undefined,
      page: histPage,
      limit: 30
    }),
    { enabled: activeTab === 'history' }
  )

  const currentMonth = new Date().getMonth()
  const thisMonthHours = monthlyData?.months?.[currentMonth]?.totalHours || 0

  // Unique courses from courseHours for filter dropdown
  const uniqueCourses = courseHours.map((c: any) => ({ id: c.courseId, name: c.courseName }))

  const tabs = [
    { id: 'courses', label: 'Per Course', icon: BookOpen },
    { id: 'monthly', label: 'Monthly Summary', icon: Calendar },
    { id: 'history', label: 'Lesson History', icon: Clock },
  ] as const

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with quick stats */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Hours</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-700">{thisMonthHours}h</div>
            <div className="text-sm text-blue-600">This Month</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-700">{monthlyData?.yearTotalHours || 0}h</div>
            <div className="text-sm text-green-600">{selectedYear} Total</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-700">
              {courseHours.filter((c: any) => ['SCHEDULED', 'IN_PROGRESS'].includes(c.courseStatus)).length}
            </div>
            <div className="text-sm text-purple-600">Active Courses</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-orange-700">
              {courseHours.reduce((sum: number, c: any) => sum + c.remainingHours, 0).toFixed(1)}h
            </div>
            <div className="text-sm text-orange-600">Remaining Total</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: Per Course */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {loadingCourses ? (
            <div className="flex justify-center py-12"><LoadingSpinner /></div>
          ) : courseHours.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No courses assigned yet</p>
            </div>
          ) : (
            courseHours.map((course: any) => {
              const isActive = ['SCHEDULED', 'IN_PROGRESS'].includes(course.courseStatus)
              return (
                <div key={course.courseId} className={`bg-white rounded-lg border p-5 ${!isActive ? 'opacity-75' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{course.courseName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_BADGE[course.courseStatus] || 'bg-gray-100'}`}>
                          {course.courseStatus}
                        </span>
                        {course.courseCategory && (
                          <span className="text-xs text-gray-500">{course.courseCategory}</span>
                        )}
                        {course.isPrimary && (
                          <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">Primary</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {isActive && course.lastScheduledDate && (
                        <div className="text-sm text-gray-600">
                          Last lesson: <span className="font-medium">{format(new Date(course.lastScheduledDate), 'MMM d, yyyy')}</span>
                        </div>
                      )}
                      {isActive && course.nextLessonDate && (
                        <div className="text-sm text-gray-500">
                          Next: {format(new Date(course.nextLessonDate), 'MMM d')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        <span className="font-semibold text-green-700">{course.completedHours}h</span> completed
                      </span>
                      <span className="text-gray-600">
                        <span className={`font-semibold ${course.remainingHours > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                          {course.remainingHours}h
                        </span> remaining
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">{course.totalScheduledHours}h</div>
                      <div className="text-gray-500">Total</div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-700">{course.completedLessons}</div>
                      <div className="text-gray-500">Done</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-700">{course.upcomingLessons}</div>
                      <div className="text-gray-500">Upcoming</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{course.progress}%</div>
                      <div className="text-gray-500">Progress</div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* TAB: Monthly Summary */}
      {activeTab === 'monthly' && (
        <div className="bg-white rounded-lg border">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Hours — {selectedYear}</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => setSelectedYear(y => y - 1)} className="p-1 rounded hover:bg-gray-100">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium text-gray-700 w-12 text-center">{selectedYear}</span>
              <button
                onClick={() => setSelectedYear(y => y + 1)}
                disabled={selectedYear >= new Date().getFullYear()}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {loadingMonthly ? (
            <div className="flex justify-center py-12"><LoadingSpinner /></div>
          ) : (
            <div className="p-5">
              {/* Bar chart */}
              <div className="flex items-end gap-2 h-48 mb-6">
                {(monthlyData?.months || []).map((m: any, i: number) => {
                  const maxH = Math.max(...(monthlyData?.months || []).map((x: any) => x.totalHours), 1)
                  const pct = (m.totalHours / maxH) * 100
                  const isCurrent = selectedYear === new Date().getFullYear() && i === currentMonth
                  return (
                    <div key={m.month} className="flex-1 flex flex-col items-center">
                      <div className="text-xs font-medium text-gray-700 mb-1">
                        {m.totalHours > 0 ? `${m.totalHours}h` : ''}
                      </div>
                      <div
                        className={`w-full rounded-t transition-all ${
                          isCurrent ? 'bg-blue-500' : m.totalHours > 0 ? 'bg-green-400' : 'bg-gray-100'
                        }`}
                        style={{ height: `${Math.max(pct, 2)}%` }}
                      />
                      <div className={`text-[10px] mt-1 ${isCurrent ? 'font-bold text-blue-700' : 'text-gray-500'}`}>
                        {m.monthName.slice(0, 3)}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Table */}
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="text-left py-2">Month</th>
                    <th className="text-right py-2">Hours</th>
                    <th className="text-right py-2">Lessons</th>
                    <th className="text-right py-2">Courses</th>
                  </tr>
                </thead>
                <tbody>
                  {(monthlyData?.months || []).filter((m: any) => m.totalHours > 0).map((m: any) => (
                    <tr key={m.month} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-2.5 font-medium text-gray-900">{m.monthName}</td>
                      <td className="text-right py-2.5 font-semibold">{m.totalHours}h</td>
                      <td className="text-right py-2.5 text-gray-600">{m.totalLessons}</td>
                      <td className="text-right py-2.5 text-gray-600">{m.coursesCount}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 font-semibold">
                    <td className="py-2.5">Total</td>
                    <td className="text-right py-2.5">{monthlyData?.yearTotalHours || 0}h</td>
                    <td className="text-right py-2.5">{monthlyData?.yearTotalLessons || 0}</td>
                    <td className="text-right py-2.5"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB: History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={histCourseId}
                onChange={e => { setHistCourseId(e.target.value); setHistPage(1) }}
                className="rounded-lg border border-gray-300 text-sm py-2 px-3 bg-white"
              >
                <option value="">All Courses</option>
                {uniqueCourses.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <input
                type="date"
                value={histFrom}
                onChange={e => { setHistFrom(e.target.value); setHistPage(1) }}
                className="rounded-lg border border-gray-300 text-sm py-2 px-3"
                placeholder="From"
              />
              <input
                type="date"
                value={histTo}
                onChange={e => { setHistTo(e.target.value); setHistPage(1) }}
                className="rounded-lg border border-gray-300 text-sm py-2 px-3"
                placeholder="To"
              />
              {(histCourseId || histFrom || histTo) && (
                <button
                  onClick={() => { setHistCourseId(''); setHistFrom(''); setHistTo(''); setHistPage(1) }}
                  className="text-sm text-gray-500 hover:text-gray-700 px-2"
                >
                  Clear
                </button>
              )}
            </div>
            {historyData?.summary && (
              <div className="flex gap-6 mt-3 pt-3 border-t text-sm">
                <span className="text-gray-600">
                  Total: <span className="font-semibold text-gray-900">{historyData.summary.totalHours}h</span>
                </span>
                <span className="text-gray-600">
                  Lessons: <span className="font-semibold text-gray-900">{historyData.summary.totalLessons}</span>
                </span>
              </div>
            )}
          </div>

          {/* Lessons list */}
          {loadingHistory ? (
            <div className="flex justify-center py-12"><LoadingSpinner /></div>
          ) : !historyData?.lessons?.length ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No lessons found for the selected filters</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Lesson</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {historyData.lessons.map((lesson: any) => (
                    <tr key={lesson.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900 font-medium">
                        {format(new Date(lesson.scheduledAt), 'MMM d, yyyy')}
                        <div className="text-xs text-gray-500">{format(new Date(lesson.scheduledAt), 'HH:mm')}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{lesson.course?.name}</td>
                      <td className="px-4 py-3 text-gray-600">{lesson.title || `Lesson ${lesson.lessonNumber}`}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">{lesson.hours}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {historyData?.meta?.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setHistPage(p => Math.max(1, p - 1))}
                disabled={histPage <= 1}
                className="px-3 py-1.5 rounded border text-sm disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-1.5 text-sm text-gray-600">
                Page {histPage} of {historyData.meta.totalPages}
              </span>
              <button
                onClick={() => setHistPage(p => p + 1)}
                disabled={histPage >= historyData.meta.totalPages}
                className="px-3 py-1.5 rounded border text-sm disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
