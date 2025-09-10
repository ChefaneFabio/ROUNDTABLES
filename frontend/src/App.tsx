import { Routes, Route } from 'react-router-dom'
import { VotingPage } from './pages/VotingPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/vote/:roundtableId" element={<VotingPage />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Maka Roundtables</h1>
              <p className="text-gray-600">Welcome to the Maka Roundtables platform</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App