import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { VotingPage } from './pages/VotingPage'
import { DashboardPage } from './pages/DashboardPage'
import { RoundtablesPage } from './pages/RoundtablesPage'
import { ClientsPage } from './pages/ClientsPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/roundtables" element={<RoundtablesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/vote/:roundtableId" element={<VotingPage />} />
        
        {/* Placeholder routes for future pages */}
        <Route path="/roundtables/new" element={<div className="p-8">Create Roundtable - Coming Soon</div>} />
        <Route path="/roundtables/:id" element={<div className="p-8">Roundtable Details - Coming Soon</div>} />
        <Route path="/clients/new" element={<div className="p-8">Add Client - Coming Soon</div>} />
        <Route path="/clients/:id" element={<div className="p-8">Client Details - Coming Soon</div>} />
        <Route path="/sessions" element={<div className="p-8">Sessions - Coming Soon</div>} />
        
        {/* 404 fallback */}
        <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
      </Routes>
    </div>
  )
}

export default App