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
  AlertCircle,
  Award,
  ArrowRight,
  Eye,
  Package,
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
        'rounded-xl p-6',
        isStudent
          ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white'
          : 'bg-white border border-gray-200'
      )}>
        <h1 className={clsx('text-lg font-semibold', isStudent ? 'text-white' : 'text-gray-900')}>
          Welcome back, {user?.name}
        </h1>
        <p className={clsx('text-sm mt-0.5', isStudent ? 'text-white/70' : 'text-gray-500')}>
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

  return (
    <>
      {/* Pending assigned tests */}
      {assignedAssessments.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <ClipboardCheck className="w-5 h-5 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pending Placement Test{assignedAssessments.length > 1 ? 's' : ''}</h3>
          </div>
          <div className="space-y-2.5">
            {assignedAssessments.map((a: any) => (
              <div key={a.id} className="flex items-center justify-between bg-gray-50/50 rounded-lg p-4 border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.language} Placement Test</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Time limit: {a.timeLimitMin} min
                    {a.assignedAt && ` -- Assigned ${new Date(a.assignedAt).toLocaleDateString()}`}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/assessment')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Take Test
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In-progress assessment alert */}
      {pendingAssessments.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Assessment{pendingAssessments.length > 1 ? 's' : ''} in progress
            </h3>
          </div>
          <div className="space-y-2.5">
            {pendingAssessments.map((a: Assessment) => (
              <div key={a.id} className="flex items-center justify-between bg-gray-50/50 rounded-lg p-4 border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.language} Placement Test</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {a.status === 'PAUSED' ? 'Paused' : 'In Progress'}
                    {a.startedAt && ` -- Started ${new Date(a.startedAt).toLocaleDateString()}`}
                  </p>
                </div>
                <button
                  onClick={() => navigate(a.isMultiSkill ? `/assessment/multi-skill/${a.id}` : '/assessment')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Continue
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <RecommendationsCard />

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow border-l-4 border-l-slate-400">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{data?.stats?.enrolledCourses || 0}</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow border-l-4 border-l-green-400">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{data?.stats?.lessonsAttended || 0}</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Lessons Attended</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow border-l-4 border-l-blue-400">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedAssessments.length}</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Assessments</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow border-l-4 border-l-purple-400">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{`${data?.stats?.attendanceRate || 0}%`}</p>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Attendance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Language Levels */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Your Language Levels
          </h3>
        </div>
        <div className="p-6">
          {completedAssessments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Language</th>
                    <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">R</th>
                    <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">L</th>
                    <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">W</th>
                    <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">S</th>
                    <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Overall</th>
                    <th className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {completedAssessments.map((assessment: Assessment) => (
                    <tr key={assessment.id} className="group hover:bg-gray-50/50">
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{assessment.language}</p>
                          {assessment.completedAt && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(assessment.completedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getCefrColor(assessment.readingLevel)}`}>
                          {assessment.readingLevel || '--'}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getCefrColor(assessment.listeningLevel)}`}>
                          {assessment.listeningLevel || '--'}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getCefrColor(assessment.writingLevel)}`}>
                          {assessment.writingLevel || '--'}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getCefrColor(assessment.speakingLevel)}`}>
                          {assessment.speakingLevel || '--'}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${getCefrColor(assessment.cefrLevel)}`}>
                          {assessment.cefrLevel}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <Link
                          to={`/assessment/multi-skill/${assessment.id}/results`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <ClipboardCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-gray-700 mb-1">No assessments completed yet</h4>
              <p className="text-sm text-gray-500 mb-5 max-w-xs mx-auto">
                Take a placement test to discover your CEFR level across all skills.
              </p>
              <button
                onClick={() => navigate('/assessment')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <ClipboardCheck className="w-4 h-4" />
                Take Placement Test
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Course Progress */}
      {data?.progress && data.progress.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Course Progress
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {data.progress.map((prog: any) => (
              <div key={prog.id}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">
                    {prog.course?.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {prog.completedLessons}/{prog.totalLessons} lessons
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-gray-700 h-1.5 rounded-full transition-all"
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCORM E-Learning Progress */}
      {data?.scormAttempts && data.scormAttempts.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              E-Learning Modules
            </h3>
          </div>
          <div className="p-6 space-y-3">
            {data.scormAttempts.map((attempt: any) => {
              const statusColors: Record<string, string> = {
                NOT_ATTEMPTED: 'bg-gray-100 text-gray-600',
                INCOMPLETE: 'bg-amber-100 text-amber-700',
                COMPLETED: 'bg-green-100 text-green-700',
                PASSED: 'bg-green-100 text-green-700',
                FAILED: 'bg-red-100 text-red-700'
              }
              const statusLabels: Record<string, string> = {
                NOT_ATTEMPTED: 'Not Started',
                INCOMPLETE: 'In Progress',
                COMPLETED: 'Completed',
                PASSED: 'Passed',
                FAILED: 'Failed'
              }
              return (
                <Link
                  key={attempt.id}
                  to={`/scorm/${attempt.scormPackageId}`}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Package className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {attempt.scormPackage?.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {attempt.scormPackage?.version === 'SCORM_12' ? 'SCORM 1.2' : 'SCORM 2004'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {attempt.score !== null && (
                      <span className="text-sm font-medium text-gray-700">{attempt.score}%</span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[attempt.status] || statusColors.NOT_ATTEMPTED}`}>
                      {statusLabels[attempt.status] || attempt.status}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Upcoming Lessons */}
      {data?.upcomingLessons && (
        <UpcomingLessons lessons={data.upcomingLessons} showTeacher />
      )}

      {/* Recent Feedback */}
      {data?.recentFeedback && data.recentFeedback.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Recent Feedback
            </h3>
          </div>
          <div className="p-6 space-y-3">
            {data.recentFeedback.map((feedback: any) => (
              <div
                key={feedback.id}
                className="p-4 rounded-lg border border-gray-100 bg-gray-50/50"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-gray-900">
                    {feedback.lesson?.title || 'Lesson'}
                  </p>
                  {feedback.score && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {feedback.score}/10
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{feedback.content}</p>
                <p className="text-xs text-gray-400 mt-2">
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
