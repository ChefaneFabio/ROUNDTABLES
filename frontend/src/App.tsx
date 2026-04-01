import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { UserRole } from './types'

// Layout
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoadingPage } from './components/common/LoadingSpinner'

// Pages
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { CoursesPage } from './pages/CoursesPage'
import { LessonsPage } from './pages/LessonsPage'
import { VotingPage } from './pages/VotingPage'
// New feature pages
import { AssessmentPage } from './pages/AssessmentPage'
import { AssessmentTakePage } from './pages/AssessmentTakePage'
import { AssessmentResultPage } from './pages/AssessmentResultPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { CertificatesPage } from './pages/CertificatesPage'
import { ChatPage } from './pages/ChatPage'
import { ApiKeysPage } from './pages/ApiKeysPage'
// Phase 2 feature pages
import VideoLibraryPage from './pages/VideoLibraryPage'
import VideoPlayerPage from './pages/VideoPlayerPage'
import ExercisesPage from './pages/ExercisesPage'
import ExerciseTakePage from './pages/ExerciseTakePage'
import SpeakingPracticePage from './pages/SpeakingPracticePage'
// Admin pages for Phase 2
import AdminVideoLibrariesPage from './pages/admin/VideoLibrariesPage'
import AdminExercisesPage from './pages/admin/ExercisesPage'
import AdminExerciseEditorPage from './pages/admin/ExerciseEditorPage'
import AdminExerciseStatsPage from './pages/admin/ExerciseStatsPage'
import AdminAssessmentQuestionsPage from './pages/admin/AssessmentQuestionsPage'
import AdminAssessmentManagementPage from './pages/admin/AssessmentManagementPage'
import AdminCalendarPage from './pages/admin/CalendarPage'
// Assessment review pages
import { AssessmentReviewPage } from './pages/AssessmentReviewPage'
import { StudentAssessmentsPage } from './pages/StudentAssessmentsPage'
// Multi-skill assessment pages
import { MultiSkillAssessmentPage } from './pages/MultiSkillAssessmentPage'
import { SectionTakePage } from './pages/SectionTakePage'
import { MultiSkillResultPage } from './pages/MultiSkillResultPage'
// Portal pages
import TeachersPage from './pages/TeachersPage'
import StudentsPage from './pages/StudentsPage'
import PaymentsPage from './pages/PaymentsPage'
import ReportsPage from './pages/ReportsPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import NotificationsPage from './pages/NotificationsPage'
// B2B pages
import { CatalogPage } from './pages/CatalogPage'
import { CatalogCourseDetailPage } from './pages/CatalogCourseDetailPage'
import { OrgRegisterPage } from './pages/OrgRegisterPage'
import OrgDashboardPage from './pages/org/OrgDashboardPage'
import OrgEmployeesPage from './pages/org/OrgEmployeesPage'
import OrgSeatsPage from './pages/org/OrgSeatsPage'
import OrgSettingsPage from './pages/org/OrgSettingsPage'
import OrgPurchasePage from './pages/org/OrgPurchasePage'
import OrgInvoicesPage from './pages/org/OrgInvoicesPage'
import OrgReportsPage from './pages/org/OrgReportsPage'
import AdminOrganizationsPage from './pages/admin/OrganizationsPage'
import IntegrationsPage from './pages/admin/IntegrationsPage'
import OrganizationDetailPage from './pages/admin/OrganizationDetailPage'
import SelfPacedCoursePage from './pages/SelfPacedCoursePage'
import { BusinessPage } from './pages/BusinessPage'
// Calendar & availability pages
import StudentCalendarPage from './pages/StudentCalendarPage'
import TeacherAvailabilityPage from './pages/TeacherAvailabilityPage'
import TeacherHoursPage from './pages/TeacherHoursPage'
import TeacherEarningsPage from './pages/TeacherEarningsPage'
// Learning path pages
import LearningPathsPage from './pages/LearningPathsPage'
import LearningPathDetailPage from './pages/LearningPathDetailPage'
// Detail & form pages
import { CourseDetailPage } from './pages/CourseDetailPage'
import { CreateCoursePage } from './pages/CreateCoursePage'
import { LessonDetailPage } from './pages/LessonDetailPage'
import { FeedbackPage } from './pages/FeedbackPage'

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <a href="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Go back home
        </a>
      </div>
    </div>
  )
}

function App() {
  const { isLoading, isAuthenticated, user } = useAuth()

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Routes>
      {/* Public homepage */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to={user?.role === UserRole.ORG_ADMIN ? '/org/dashboard' : '/dashboard'} replace /> : <HomePage />
        }
      />

      {/* Public routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to={user?.role === UserRole.ORG_ADMIN ? '/org/dashboard' : '/dashboard'} replace /> : <LoginPage />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
        }
      />

      {/* Public voting page (accessed via email link) */}
      <Route path="/vote/:roundtableId" element={<VotingPage />} />

      {/* Public catalog routes */}
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<CatalogCourseDetailPage />} />

      {/* B2B landing page */}
      <Route path="/business" element={<BusinessPage />} />

      {/* Organization registration */}
      <Route
        path="/register/organization"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <OrgRegisterPage />
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Layout>
              <CoursesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/new"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <CreateCoursePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <CourseDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/lessons"
        element={
          <ProtectedRoute>
            <Layout>
              <LessonsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/lessons/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <LessonDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <TeachersPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <StudentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedback"
        element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER, UserRole.STUDENT]}>
            <Layout>
              <FeedbackPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <PaymentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <ReportsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Layout>
              <NotificationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <SettingsPage />
            </Layout>
          </ProtectedRoute>
        }
      />


      {/* Calendar & Availability Routes */}
      <Route
        path="/my-calendar"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <StudentCalendarPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/availability"
        element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]}>
            <Layout>
              <TeacherAvailabilityPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-earnings"
        element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]}>
            <Layout>
              <TeacherEarningsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-hours"
        element={
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]}>
            <Layout>
              <TeacherHoursPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Learning Path Routes */}
      <Route
        path="/learning-paths"
        element={
          <ProtectedRoute>
            <Layout>
              <LearningPathsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning-paths/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <LearningPathDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Assessment Routes */}
      <Route
        path="/assessment"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <AssessmentPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessment/take/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <AssessmentTakePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessment/result/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <AssessmentResultPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Assessment Review (student reviews own test) */}
      <Route
        path="/assessment/review/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <AssessmentReviewPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Multi-Skill Assessment Routes */}
      <Route
        path="/assessment/multi-skill/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <MultiSkillAssessmentPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessment/multi-skill/:id/section/:sectionId"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <SectionTakePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessment/multi-skill/:id/results"
        element={
          <ProtectedRoute>
            <Layout>
              <MultiSkillResultPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin: View student's assessments */}
      <Route
        path="/admin/student/:studentId/assessments"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <StudentAssessmentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin: Review a specific assessment in detail */}
      <Route
        path="/admin/assessment/:id/review"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <AssessmentReviewPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Analytics Route */}
      <Route
        path="/analytics"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <AnalyticsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Certificates Route */}
      <Route
        path="/certificates"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <CertificatesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* AI Chat Route */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <ChatPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* API Keys Route */}
      <Route
        path="/api-keys"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <ApiKeysPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/integrations"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <IntegrationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Phase 2: Video Library Routes */}
      <Route
        path="/videos"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <VideoLibraryPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/videos/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <VideoPlayerPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Phase 2: Exercises Routes */}
      <Route
        path="/exercises"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <ExercisesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/exercises/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <ExerciseTakePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Phase 2: Speaking Practice Route */}
      <Route
        path="/speaking"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <SpeakingPracticePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin: Video Libraries */}
      <Route
        path="/admin/videos/libraries"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}>
            <Layout>
              <AdminVideoLibrariesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin: Exercises */}
      <Route
        path="/admin/exercises"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}>
            <Layout>
              <AdminExercisesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin: Exercise Editor */}
      <Route
        path="/admin/exercises/new"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}>
            <Layout>
              <AdminExerciseEditorPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/exercises/:id/stats"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}>
            <Layout>
              <AdminExerciseStatsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/exercises/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}>
            <Layout>
              <AdminExerciseEditorPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin: Assessment Management */}
      <Route
        path="/admin/assessments"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}>
            <Layout>
              <AdminAssessmentManagementPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin: Calendar */}
      <Route
        path="/admin/calendar"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}>
            <Layout>
              <AdminCalendarPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin: Assessment Question Bank */}
      <Route
        path="/admin/assessment-questions"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.TEACHER]}>
            <Layout>
              <AdminAssessmentQuestionsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin: Organizations */}
      <Route
        path="/admin/organizations"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <AdminOrganizationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/organizations/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <Layout>
              <OrganizationDetailPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* ORG_ADMIN routes */}
      <Route
        path="/org/dashboard"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ORG_ADMIN]}>
            <Layout>
              <OrgDashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/org/employees"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ORG_ADMIN]}>
            <Layout>
              <OrgEmployeesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/org/seats"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ORG_ADMIN]}>
            <Layout>
              <OrgSeatsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/org/purchase"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ORG_ADMIN]}>
            <Layout>
              <OrgPurchasePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/org/settings"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ORG_ADMIN]}>
            <Layout>
              <OrgSettingsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/org/invoices"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ORG_ADMIN]}>
            <Layout>
              <OrgInvoicesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/org/reports"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ORG_ADMIN]}>
            <Layout>
              <OrgReportsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Self-paced course player */}
      <Route
        path="/courses/:id/learn"
        element={
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <Layout>
              <SelfPacedCoursePage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
