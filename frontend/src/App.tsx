import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { UserRole } from './types'

// Layout
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoadingPage } from './components/common/LoadingSpinner'

// Pages
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { CoursesPage } from './pages/CoursesPage'
import { LessonsPage } from './pages/LessonsPage'
import { VotingPage } from './pages/VotingPage'

// Placeholder pages for features that need to be built out
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">This page is under construction.</p>
    </div>
  )
}

function TeachersPage() {
  return <PlaceholderPage title="Teachers" />
}

function StudentsPage() {
  return <PlaceholderPage title="Students" />
}

function FeedbackPage() {
  return <PlaceholderPage title="Feedback" />
}

function PaymentsPage() {
  return <PlaceholderPage title="Payments" />
}

function ReportsPage() {
  return <PlaceholderPage title="Reports" />
}

function NotificationsPage() {
  return <PlaceholderPage title="Notifications" />
}

function ProfilePage() {
  return <PlaceholderPage title="Profile" />
}

function SettingsPage() {
  return <PlaceholderPage title="Settings" />
}

function CourseDetailPage() {
  return <PlaceholderPage title="Course Details" />
}

function CreateCoursePage() {
  return <PlaceholderPage title="Create Course" />
}

function LessonDetailPage() {
  return <PlaceholderPage title="Lesson Details" />
}

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
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
        }
      />

      {/* Public voting page (accessed via email link) */}
      <Route path="/vote/:roundtableId" element={<VotingPage />} />

      {/* Protected routes */}
      <Route
        path="/"
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
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL]}>
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
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL]}>
            <Layout>
              <TeachersPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL]}>
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
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL]}>
            <Layout>
              <PaymentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL]}>
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

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
