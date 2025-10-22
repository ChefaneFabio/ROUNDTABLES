import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { RoundtablesPage } from './pages/RoundtablesPage'
import { ClientsPage } from './pages/ClientsPage'
import { CreateRoundtablePage } from './pages/CreateRoundtablePage'
import { CreateClientPage } from './pages/CreateClientPage'
import { RoundtableDetailsPage } from './pages/RoundtableDetailsPage'
import { SessionsPage } from './pages/SessionsPage'
import { QuestionsPage } from './pages/QuestionsPage'
import { ParticipantsPage } from './pages/ParticipantsPage'
import { EmailTemplatesPage } from './pages/EmailTemplatesPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { TrainersPage } from './pages/TrainersPage'
import { ClientDetailsPage } from './pages/ClientDetailsPage'
import { SessionDetailsPage } from './pages/SessionDetailsPage'
import { ReportsPage } from './pages/ReportsPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { CalendarViewPage } from './pages/CalendarViewPage'
import { TrainerProfilePage } from './pages/TrainerProfilePage'
import { SessionsCalendarPage } from './pages/SessionsCalendarPage'

// Component to handle role-based root redirect
function RootRedirect() {
  const { user } = useAuth()

  if (user?.role === 'TRAINER') {
    return <Navigate to="/trainer/profile" replace />
  }

  return <Navigate to="/dashboard" replace />
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Redirect root based on user role */}
          <Route path="/" element={<RootRedirect />} />

          {/* Coordinator/Admin Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><DashboardPage /></ProtectedRoute>} />
          <Route path="/roundtables" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><RoundtablesPage /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><ClientsPage /></ProtectedRoute>} />
          <Route path="/roundtables/new" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><CreateRoundtablePage /></ProtectedRoute>} />
          <Route path="/roundtables/:id" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><RoundtableDetailsPage /></ProtectedRoute>} />
          <Route path="/clients/new" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><CreateClientPage /></ProtectedRoute>} />
          <Route path="/clients/:id" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><ClientDetailsPage /></ProtectedRoute>} />
          <Route path="/sessions" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><SessionsPage /></ProtectedRoute>} />
          <Route path="/sessions/calendar" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><SessionsCalendarPage /></ProtectedRoute>} />
          <Route path="/sessions/:id" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><SessionDetailsPage /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><CalendarViewPage /></ProtectedRoute>} />
          <Route path="/questions" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><QuestionsPage /></ProtectedRoute>} />
          <Route path="/participants" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><ParticipantsPage /></ProtectedRoute>} />
          <Route path="/email-templates" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><EmailTemplatesPage /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><FeedbackPage /></ProtectedRoute>} />
          <Route path="/trainers" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><TrainersPage /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><ReportsPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDINATOR']}><NotificationsPage /></ProtectedRoute>} />

          {/* Trainer Protected Routes */}
          <Route path="/trainer/profile" element={<ProtectedRoute allowedRoles={['TRAINER']} useLayout={false}><TrainerProfilePage /></ProtectedRoute>} />

          {/* 404 fallback */}
          <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App