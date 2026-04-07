import { useQuery } from 'react-query'
import { useNavigate, Link } from 'react-router-dom'
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
  ClipboardCheck,
  Headphones,
  PenTool,
  Mic,
  AlertCircle,
} from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '../contexts/AuthContext'
import { dashboardApi } from '../services/api'
import { assessmentApi, Assessment } from '../services/assessmentApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { StatCard } from '../components/dashboard/StatCard'
import { UpcomingLessons } from '../components/dashboard/UpcomingLessons'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { RecommendationsCard } from '../components/dashboard/RecommendationsCard'
export function DashboardPage() {
  const { user, isAdmin, isTeacher, isStudent } = useAuth()

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
      <div className={clsx(
        'rounded-lg shadow-md p-6',
        isStudent
          ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white'
          : 'bg-white'
      )}>
        <h1 className={clsx('text-2xl font-bold', isStudent ? 'text-white' : 'text-gray-900')}>
          Welcome back, {user?.name}!
        </h1>
        <p className={clsx('mt-1', isStudent ? 'text-white/80' : 'text-gray-600')}>
          {isAdmin && (data?.school ? `Here's an overview of ${data.school.name || 'your school'}.` : "Here's an overview of your platform.")}
          {isTeacher && "Here's your teaching schedule and tasks."}
          {isStudent && "Here's your learning progress."}
        </p>
      </div>

      {/* Admin Dashboard (school dashboard if admin has a school) */}
      {isAdmin && (data?.school ? <SchoolDashboard data={data} /> : <AdminDashboard data={data} />)}

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
  const navigate = useNavigate()
  const assignedAssessments = data?.assignedAssessments || []

  const { data: myAssessments } = useQuery(
    'my-assessments',
    assessmentApi.getMyAssessments,
    { staleTime: 5 * 60 * 1000 }
  )

  // Get latest completed multi-skill assessment per language
  const completedByLanguage = (myAssessments || [])
    .filter((a: Assessment) => a.status === 'COMPLETED' && a.isMultiSkill)
    .sort((a: Assessment, b: Assessment) =>
      new Date(b.completedAt || 0).getTime() - new Date(a.completedAt || 0).getTime()
    )
    .reduce((acc: Record<string, Assessment>, a: Assessment) => {
      if (!acc[a.language]) acc[a.language] = a
      return acc
    }, {} as Record<string, Assessment>)

  const completedAssessments = Object.values(completedByLanguage)

  // Check for in-progress or assigned tests
  const pendingAssessments = (myAssessments || []).filter(
    (a: Assessment) => a.status === 'IN_PROGRESS' || a.status === 'PAUSED'
  )

  const cefrColors: Record<string, string> = {
    A1: 'bg-red-100 text-red-800',
    A2: 'bg-orange-100 text-orange-800',
    B1: 'bg-yellow-100 text-yellow-800',
    B2: 'bg-blue-100 text-blue-800',
    C1: 'bg-indigo-100 text-indigo-800',
    C2: 'bg-purple-100 text-purple-800',
  }

  const getCefrColor = (level?: string) => cefrColors[level || ''] || 'bg-gray-100 text-gray-800'

  const skillBarWidth: Record<string, number> = {
    A1: 16, A2: 33, B1: 50, B2: 66, C1: 83, C2: 100,
  }

  const getSkillWidth = (level?: string) => skillBarWidth[level || ''] || 0

  // Gradient fills per skill type
  const skillGradients: Record<string, string> = {
    reading: 'bg-gradient-to-r from-blue-400 to-blue-600',
    listening: 'bg-gradient-to-r from-green-400 to-green-600',
    writing: 'bg-gradient-to-r from-amber-400 to-amber-600',
    speaking: 'bg-gradient-to-r from-purple-400 to-purple-600',
  }

  return (
    <>
      {/* Pending assigned tests */}
      {assignedAssessments.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <ClipboardCheck className="w-6 h-6 text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-800">Pending Placement Test{assignedAssessments.length > 1 ? 's' : ''}</h3>
          </div>
          <div className="space-y-3">
            {assignedAssessments.map((a: any) => (
              <div key={a.id} className="flex items-center justify-between bg-white rounded-lg p-4 border border-amber-200">
                <div>
                  <p className="font-medium text-gray-900">{a.language} Placement Test</p>
                  <p className="text-sm text-gray-500">
                    Time limit: {a.timeLimitMin} minutes
                    {a.assignedAt && ` | Assigned: ${new Date(a.assignedAt).toLocaleDateString()}`}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/assessment')}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Take Test
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In-progress assessment alert */}
      {pendingAssessments.length > 0 && (
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">
              You have {pendingAssessments.length === 1 ? 'an' : pendingAssessments.length} assessment{pendingAssessments.length > 1 ? 's' : ''} in progress
            </h3>
          </div>
          <div className="space-y-3">
            {pendingAssessments.map((a: Assessment) => (
              <div key={a.id} className="flex items-center justify-between bg-white rounded-lg p-4 border border-blue-200">
                <div>
                  <p className="font-medium text-gray-900">{a.language} Placement Test</p>
                  <p className="text-sm text-gray-500">
                    Status: {a.status === 'PAUSED' ? 'Paused' : 'In Progress'}
                    {a.startedAt && ` | Started: ${new Date(a.startedAt).toLocaleDateString()}`}
                  </p>
                </div>
                <button
                  onClick={() => navigate(a.isMultiSkill ? `/assessment/multi-skill/${a.id}` : '/assessment')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium animate-pulse shadow-lg shadow-blue-300"
                >
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <RecommendationsCard />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border-l-4 border-primary-500 rounded-lg hover:shadow-md transition-all">
          <StatCard
            title="Enrolled Courses"
            value={data?.stats?.enrolledCourses || 0}
            icon={BookOpen}
            color="primary"
            href="/courses"
          />
        </div>
        <div className="border-l-4 border-green-500 rounded-lg hover:shadow-md transition-all">
          <StatCard
            title="Completed Courses"
            value={data?.stats?.completedCourses || 0}
            icon={CheckCircle}
            color="green"
          />
        </div>
        <div className="border-l-4 border-blue-500 rounded-lg hover:shadow-md transition-all">
          <StatCard
            title="Average Progress"
            value={`${data?.stats?.averageProgress || 0}%`}
            icon={TrendingUp}
            color="blue"
          />
        </div>
        <div className="border-l-4 border-purple-500 rounded-lg hover:shadow-md transition-all">
          <StatCard
            title="Attendance Rate"
            value={`${data?.stats?.attendanceRate || 0}%`}
            icon={Calendar}
            color="purple"
          />
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-l-4 border-green-500 rounded-lg hover:shadow-md transition-all">
          <StatCard
            title="Lessons Attended"
            value={data?.stats?.lessonsAttended || 0}
            icon={CheckCircle}
            color="green"
          />
        </div>
        <div className="border-l-4 border-red-500 rounded-lg hover:shadow-md transition-all">
          <StatCard
            title="Lessons Missed"
            value={data?.stats?.lessonsMissed || 0}
            icon={Clock}
            color="red"
          />
        </div>
      </div>

      {/* Assessment Summary - Your Language Levels */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Your Language Levels
        </h3>
        {completedAssessments.length > 0 ? (
          <div className="space-y-6">
            {completedAssessments.map((assessment: Assessment) => (
              <div key={assessment.id} className="border border-gray-200 rounded-lg p-5">
                {/* Language header with overall CEFR badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-semibold text-gray-900">{assessment.language}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getCefrColor(assessment.cefrLevel)}`}>
                      {assessment.cefrLevel}
                    </span>
                  </div>
                  <Link
                    to={`/assessment/multi-skill/${assessment.id}/results`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-800 hover:underline"
                  >
                    View Details
                  </Link>
                </div>

                {/* 4 Skill bars */}
                <div className="space-y-3">
                  {/* Reading */}
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 w-20 flex-shrink-0">Reading</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${skillGradients.reading}`}
                        style={{ width: `${getSkillWidth(assessment.readingLevel)}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getCefrColor(assessment.readingLevel)}`}>
                      {assessment.readingLevel || '--'}
                    </span>
                  </div>

                  {/* Listening */}
                  <div className="flex items-center gap-3">
                    <Headphones className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 w-20 flex-shrink-0">Listening</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${skillGradients.listening}`}
                        style={{ width: `${getSkillWidth(assessment.listeningLevel)}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getCefrColor(assessment.listeningLevel)}`}>
                      {assessment.listeningLevel || '--'}
                    </span>
                  </div>

                  {/* Writing */}
                  <div className="flex items-center gap-3">
                    <PenTool className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 w-20 flex-shrink-0">Writing</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${skillGradients.writing}`}
                        style={{ width: `${getSkillWidth(assessment.writingLevel)}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getCefrColor(assessment.writingLevel)}`}>
                      {assessment.writingLevel || '--'}
                    </span>
                  </div>

                  {/* Speaking */}
                  <div className="flex items-center gap-3">
                    <Mic className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 w-20 flex-shrink-0">Speaking</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${skillGradients.speaking}`}
                        style={{ width: `${getSkillWidth(assessment.speakingLevel)}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getCefrColor(assessment.speakingLevel)}`}>
                      {assessment.speakingLevel || '--'}
                    </span>
                  </div>
                </div>

                {/* Completion date */}
                {assessment.completedAt && (
                  <p className="text-xs text-gray-400 mt-3">
                    Completed {new Date(assessment.completedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ClipboardCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No assessments completed yet</h4>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Take a placement test to discover your CEFR level across Reading, Listening, Writing, and Speaking.
            </p>
            <button
              onClick={() => navigate('/assessment')}
              className="inline-flex items-center gap-2 px-8 py-3 text-base bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              <ClipboardCheck className="w-5 h-5" />
              Take Placement Test
            </button>
          </div>
        )}
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
