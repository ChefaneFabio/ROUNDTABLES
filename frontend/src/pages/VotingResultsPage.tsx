import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  BarChart3,
  Users,
  CheckCircle,
  TrendingUp,
  Star,
  Award,
  Target,
  MessageSquare
} from 'lucide-react'

interface VotingResult {
  topicId: string
  title: string
  description: string
  votes: number
  percentage: number
  isSelected: boolean
  voters: {
    name: string
    email: string
    votedAt: string
  }[]
}

interface VotingData {
  roundtableId: string
  roundtableName: string
  clientCompany: string
  votingStarted: string
  votingEnded?: string
  totalParticipants: number
  participantsVoted: number
  results: VotingResult[]
}

export function VotingResultsPage() {
  const { roundtableId } = useParams<{ roundtableId: string }>()
  const navigate = useNavigate()
  const [votingData, setVotingData] = useState<VotingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (roundtableId) {
      fetchVotingResults()
    }
  }, [roundtableId])

  const fetchVotingResults = async () => {
    try {
      setLoading(true)
      // Simulate API call
      const mockData: VotingData = {
        roundtableId: roundtableId!,
        roundtableName: 'Leadership Training Q1',
        clientCompany: 'Fastweb',
        votingStarted: '2024-01-15T10:00:00Z',
        votingEnded: '2024-01-20T23:59:00Z',
        totalParticipants: 6,
        participantsVoted: 6,
        results: [
          {
            topicId: '1',
            title: 'The Art of Negotiation',
            description: 'Understanding negotiation strategies and building trust',
            votes: 6,
            percentage: 100,
            isSelected: true,
            voters: [
              { name: 'Anna Bianchi', email: 'anna.bianchi@fastweb.it', votedAt: '2024-01-16T09:30:00Z' },
              { name: 'Giuseppe Verde', email: 'giuseppe.verde@fastweb.it', votedAt: '2024-01-16T10:15:00Z' }
            ]
          },
          {
            topicId: '2',
            title: 'Effective Leadership',
            description: 'Building and motivating high-performing teams',
            votes: 5,
            percentage: 83,
            isSelected: true,
            voters: [
              { name: 'Maria Rossi', email: 'maria.rossi@fastweb.it', votedAt: '2024-01-16T11:00:00Z' }
            ]
          },
          {
            topicId: '3',
            title: 'Communication Skills',
            description: 'Mastering verbal and non-verbal communication',
            votes: 5,
            percentage: 83,
            isSelected: true,
            voters: []
          },
          {
            topicId: '4',
            title: 'Time Management',
            description: 'Optimizing productivity and work-life balance',
            votes: 4,
            percentage: 67,
            isSelected: true,
            voters: []
          },
          {
            topicId: '5',
            title: 'Conflict Resolution',
            description: 'Managing and resolving workplace conflicts',
            votes: 4,
            percentage: 67,
            isSelected: true,
            voters: []
          },
          {
            topicId: '6',
            title: 'Decision Making',
            description: 'Strategic thinking and problem-solving techniques',
            votes: 4,
            percentage: 67,
            isSelected: true,
            voters: []
          },
          {
            topicId: '7',
            title: 'Team Building',
            description: 'Creating cohesive and collaborative teams',
            votes: 3,
            percentage: 50,
            isSelected: true,
            voters: []
          },
          {
            topicId: '8',
            title: 'Innovation & Creativity',
            description: 'Fostering innovation in the workplace',
            votes: 3,
            percentage: 50,
            isSelected: true,
            voters: []
          },
          {
            topicId: '9',
            title: 'Diversity & Inclusion',
            description: 'Building inclusive work environments',
            votes: 2,
            percentage: 33,
            isSelected: false,
            voters: []
          },
          {
            topicId: '10',
            title: 'Change Management',
            description: 'Leading organizations through transformation',
            votes: 1,
            percentage: 17,
            isSelected: false,
            voters: []
          }
        ]
      }
      setVotingData(mockData)
    } catch (error) {
      console.error('Error fetching voting results:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!votingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Voting data not found</h2>
          <button
            onClick={() => navigate('/roundtables')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Roundtables
          </button>
        </div>
      </div>
    )
  }

  const selectedTopics = votingData.results.filter(r => r.isSelected)
  const rejectedTopics = votingData.results.filter(r => !r.isSelected)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Maka Roundtables</h1>
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/roundtables" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Roundtables</a>
                <a href="/participants" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Participants</a>
                <a href="/sessions" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sessions</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/roundtables/${roundtableId}`)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Roundtable
          </button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Topic Voting Results</h1>
            <p className="text-gray-600 mt-2">{votingData.roundtableName} - {votingData.clientCompany}</p>
          </div>
        </div>

        {/* Voting Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Participation Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((votingData.participantsVoted / votingData.totalParticipants) * 100)}%
                </p>
                <p className="text-sm text-gray-600">
                  {votingData.participantsVoted}/{votingData.totalParticipants} voted
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Selected Topics</p>
                <p className="text-2xl font-bold text-gray-900">{selectedTopics.length}</p>
                <p className="text-sm text-gray-600">out of 10</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Top Choice</p>
                <p className="text-lg font-bold text-gray-900">{votingData.results[0]?.title}</p>
                <p className="text-sm text-gray-600">{votingData.results[0]?.percentage}% votes</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Voting Period</p>
                <p className="text-lg font-bold text-gray-900">
                  {Math.ceil((new Date(votingData.votingEnded!).getTime() - new Date(votingData.votingStarted).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
                <p className="text-sm text-gray-600">Duration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Topics */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Selected Topics (8)</h2>
            </div>
            <p className="text-gray-600 text-sm mt-1">These topics will be covered in sessions 2-9</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {selectedTopics.map((topic, index) => (
                <div key={topic.topicId} className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{topic.votes} votes</p>
                      <p className="text-sm text-gray-600">{topic.percentage}%</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{topic.description}</p>
                  
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${topic.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rejected Topics */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Topics Not Selected (2)</h2>
            </div>
            <p className="text-gray-600 text-sm mt-1">These topics received fewer votes</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {rejectedTopics.map((topic) => (
                <div key={topic.topicId} className="border border-gray-200 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-700">{topic.title}</h3>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-600">{topic.votes} votes</p>
                      <p className="text-sm text-gray-500">{topic.percentage}%</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{topic.description}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: `${topic.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate(`/roundtables/${roundtableId}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Continue to Session Planning
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  )
}