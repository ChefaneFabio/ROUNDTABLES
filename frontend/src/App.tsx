import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/roundtables" element={<RoundtablesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/vote/:roundtableId" element={<VotingPage />} />
        
        {/* Complete Management Pages */}
        <Route path="/roundtables/new" element={<CreateRoundtablePage />} />
        <Route path="/roundtables/:id" element={<RoundtableDetailsPage />} />
        <Route path="/clients/new" element={<CreateClientPage />} />
        <Route path="/clients/:id" element={<div className="p-8">Client Details - Coming Soon</div>} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route path="/email-templates" element={<EmailTemplatesPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        
        {/* 404 fallback */}
        <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
      </Routes>
    </div>
  )
}

export default App