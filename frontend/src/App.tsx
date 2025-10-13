import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { VotingPage } from './pages/VotingPage'
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
import { VotingResultsPage } from './pages/VotingResultsPage'
import { NotificationsPage } from './pages/NotificationsPage'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/vote/:roundtableId" element={<VotingPage />} />

          {/* Redirect root to dashboard if authenticated, otherwise to login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/roundtables" element={<ProtectedRoute><RoundtablesPage /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute><ClientsPage /></ProtectedRoute>} />

          {/* Complete Management Pages */}
          <Route path="/roundtables/new" element={<ProtectedRoute><CreateRoundtablePage /></ProtectedRoute>} />
          <Route path="/roundtables/:id" element={<ProtectedRoute><RoundtableDetailsPage /></ProtectedRoute>} />
          <Route path="/clients/new" element={<ProtectedRoute><CreateClientPage /></ProtectedRoute>} />
          <Route path="/clients/:id" element={<ProtectedRoute><ClientDetailsPage /></ProtectedRoute>} />
          <Route path="/sessions" element={<ProtectedRoute><SessionsPage /></ProtectedRoute>} />
          <Route path="/sessions/:id" element={<ProtectedRoute><SessionDetailsPage /></ProtectedRoute>} />
          <Route path="/questions" element={<ProtectedRoute><QuestionsPage /></ProtectedRoute>} />
          <Route path="/participants" element={<ProtectedRoute><ParticipantsPage /></ProtectedRoute>} />
          <Route path="/email-templates" element={<ProtectedRoute><EmailTemplatesPage /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
          <Route path="/trainers" element={<ProtectedRoute><TrainersPage /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
          <Route path="/roundtables/:roundtableId/voting" element={<ProtectedRoute><VotingResultsPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

          {/* 404 fallback */}
          <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App