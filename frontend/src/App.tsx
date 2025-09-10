import { Routes, Route } from 'react-router-dom'
import { VotingPage } from './pages/VotingPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vote/:roundtableId" element={<VotingPage />} />
      </Routes>
    </div>
  )
}

export default App