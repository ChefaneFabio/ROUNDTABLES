import { useQuery } from 'react-query'
import {
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { dashboardApi } from '../services/api'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { StatCard } from '../components/dashboard/StatCard'
import { UpcomingLessons } from '../components/dashboard/UpcomingLessons'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { RecommendationsCard } from '../components/dashboard/RecommendationsCard'

export function DashboardPage() {
  const { user, isAdmin, isSchool, isTeacher, isStudent } = useAuth()

  const { data, isLoading, error } = useQuery('dashboard', dashboardApi.getDashboard)

  const { data: activities } = useQuery(
    'activities',
    () => dashboardApi.getActivity(10),
    { enabled: !!data }
  )

  if (isLoading) return <LoadingPage />

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert type="error" message="Failed to load dashboard data" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          {isAdmin && "Here's an overview of your platform."}
          {isSchool && `Here's an overview of ${data?.school?.name || 'your school'}.`}
          {isTeacher && "Here's your teaching schedule and tasks."}
          {isStudent && "Here's your learning progress."}
        </p>
      </div>

      {/* Admin Dashboard */}
      {isAdmin && <AdminDashboard data={data} />}

      {/* School Dashboard */}
      {isSchool && <SchoolDashboard data={data} />}

      {/* Teacher Dashboard */}
      {isTeacher && <TeacherDashboard data={data} />}

      {/* Student Dashboard */}
      {isStudent && <StudentDashboard data={data} />}

      {/* Recent Activity - shown for all */}
      {activities && activities.length > 0 && (
        <RecentActivity activities={activities} />
      )}
    </div>
  )
}

function AdminDashboard({ data }: { data: any }) {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Schools"
          value={data?.stats?.totalSchools || 0}
          icon={BookOpen}
          color="primary"
          href="/schools"
        />
        <StatCard
          title="Total Teachers"
          value={data?.stats?.totalTeachers || 0}
          icon={GraduationCap}
          color="green"
          href="/teachers"
        />
        <StatCard
          title="Total Students"
          value={data?.stats?.totalStudents || 0}
          icon={Users}
          color="blue"
          href="/students"
        />
        <StatCard
          title="Active Courses"
          value={data?.stats?.activeCourses || 0}
          icon={Calendar}
          color="purple"
          href="/courses"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Courses"
          value={data?.stats?.totalCourses || 0}
          icon={BookOpen}
          color="yellow"
        />
        <StatCard
          title="Total Lessons"
          value={data?.stats?.totalLessons || 0}
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Upcoming Lessons"
          value={data?.stats?.upcomingLessons || 0}
          icon={Clock}
          color="blue"
        />
        <StatCard
          title="Pending Payments"
          value={data?.stats?.pendingPayments || 0}
          icon={DollarSign}
          color="red"
          href="/payments"
        />
      </div>

      {/* Recent Schools */}
      {data?.recentSchools && data.recentSchools.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recently Registered Schools
          </h3>
          <div className="space-y-4">
            {data.recentSchools.map((school: any) => (
              <div
                key={school.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{school.name}</p>
                  <p className="text-sm text-gray-500">{school.user?.email}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{school._count?.courses || 0} courses</p>
                  <p>{school._count?.students || 0} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function SchoolDashboard({ data }: { data: any }) {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Teachers"
          value={data?.stats?.teachers || 0}
          icon={GraduationCap}
          color="green"
          href="/teachers"
        />
        <StatCard
          title="Students"
          value={data?.stats?.students || 0}
          icon={Users}
          color="blue"
          href="/students"
        />
        <StatCard
          title="Active Courses"
          value={data?.stats?.courseInProgress || 0}
          icon={BookOpen}
          color="purple"
          href="/courses"
        />
        <StatCard
          title="Upcoming Lessons"
          value={data?.stats?.upcomingLessonsCount || 0}
          icon={Calendar}
          color="yellow"
          href="/lessons"
        />
      </div>

      {/* Course Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-gray-500">
            {data?.stats?.courseDraft || 0}
          </p>
          <p className="text-sm text-gray-500">Draft</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">
            {data?.stats?.courseVoting || 0}
          </p>
          <p className="text-sm text-gray-500">Voting</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {data?.stats?.courseScheduled || 0}
          </p>
          <p className="text-sm text-gray-500">Scheduled</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {data?.stats?.courseInProgress || 0}
          </p>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-gray-600">
            {data?.stats?.courseCompleted || 0}
          </p>
          <p className="text-sm text-gray-500">Completed</p>
        </div>
      </div>

      {/* Pending Tasks & Payments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pending Questions"
          value={data?.stats?.pendingQuestions || 0}
          icon={MessageSquare}
          color="yellow"
        />
        <StatCard
          title="Pending Feedback"
          value={data?.stats?.pendingFeedback || 0}
          icon={MessageSquare}
          color="purple"
        />
        <StatCard
          title="Outstanding Payments"
          value={`$${data?.paymentSummary?.outstanding || 0}`}
          icon={DollarSign}
          color="red"
          href="/payments"
        />
      </div>

      {/* Upcoming Lessons */}
      {data?.upcomingLessons && (
        <UpcomingLessons lessons={data.upcomingLessons} showTeacher />
      )}
    </>
  )
}

function TeacherDashboard({ data }: { data: any }) {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Courses"
          value={data?.stats?.assignedCourses || 0}
          icon={BookOpen}
          color="primary"
          href="/courses"
        />
        <StatCard
          title="Upcoming Lessons"
          value={data?.stats?.upcomingLessonsCount || 0}
          icon={Calendar}
          color="yellow"
          href="/lessons"
        />
        <StatCard
          title="Completed Lessons"
          value={data?.stats?.completedLessons || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Completion Rate"
          value={`${data?.stats?.completionRate || 0}%`}
          icon={TrendingUp}
          color="blue"
        />
      </div>

      {/* Pending Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Questions to Review"
          value={data?.stats?.pendingQuestions || 0}
          icon={MessageSquare}
          color="yellow"
        />
        <StatCard
          title="Feedback to Submit"
          value={data?.stats?.pendingFeedback || 0}
          icon={MessageSquare}
          color="purple"
        />
      </div>

      {/* My Courses */}
      {data?.courses && data.courses.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            My Courses
          </h3>
          <div className="grid gap-4">
            {data.courses.map((course: any) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{course.name}</p>
                  <p className="text-sm text-gray-500">
                    {course._count?.enrollments || 0} students •{' '}
                    {course._count?.lessons || 0} lessons
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === 'IN_PROGRESS'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {course.status.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Lessons */}
      {data?.upcomingLessons && (
        <UpcomingLessons lessons={data.upcomingLessons} />
      )}
    </>
  )
}

function StudentDashboard({ data }: { data: any }) {
  return (
    <>
      {/* AI Recommendations */}
      <RecommendationsCard />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Enrolled Courses"
          value={data?.stats?.enrolledCourses || 0}
          icon={BookOpen}
          color="primary"
          href="/courses"
        />
        <StatCard
          title="Completed Courses"
          value={data?.stats?.completedCourses || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Average Progress"
          value={`${data?.stats?.averageProgress || 0}%`}
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Attendance Rate"
          value={`${data?.stats?.attendanceRate || 0}%`}
          icon={Calendar}
          color="purple"
        />
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Lessons Attended"
          value={data?.stats?.lessonsAttended || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Lessons Missed"
          value={data?.stats?.lessonsMissed || 0}
          icon={Clock}
          color="red"
        />
      </div>

      {/* Course Progress */}
      {data?.progress && data.progress.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Course Progress
          </h3>
          <div className="space-y-4">
            {data.progress.map((prog: any) => (
              <div key={prog.id}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">
                    {prog.course?.name}
                  </p>
                  <span className="text-sm text-gray-500">
                    {prog.completedLessons}/{prog.totalLessons} lessons
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Lessons */}
      {data?.upcomingLessons && (
        <UpcomingLessons lessons={data.upcomingLessons} showTeacher />
      )}

      {/* Recent Feedback */}
      {data?.recentFeedback && data.recentFeedback.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Feedback
          </h3>
          <div className="space-y-4">
            {data.recentFeedback.map((feedback: any) => (
              <div
                key={feedback.id}
                className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary-500"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">
                    {feedback.lesson?.title || 'Lesson'}
                  </p>
                  {feedback.score && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-sm font-medium">
                      {feedback.score}/10
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{feedback.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  From: {feedback.teacher?.user?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
