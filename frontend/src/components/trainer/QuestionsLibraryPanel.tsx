import { useState, useEffect } from 'react'
import { X, BookOpen, Star, TrendingUp, Search, CheckCircle } from 'lucide-react'

interface LibraryQuestion {
  id: string
  question: string
  rating: number | null
  usageCount: number
  source: string
  topic: { title: string } | null
  sessionInfo: string
}

interface QuestionsLibraryPanelProps {
  sessionId: string
  isOpen: boolean
  onClose: () => void
  onUseQuestion: (question: string, source: 'LIBRARY') => void
}

export function QuestionsLibraryPanel({
  sessionId,
  isOpen,
  onClose,
  onUseQuestion
}: QuestionsLibraryPanelProps) {
  const [questions, setQuestions] = useState<LibraryQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [minRating, setMinRating] = useState<number>(3.5)
  const [sortBy, setSortBy] = useState<'rating' | 'usage'>('rating')

  useEffect(() => {
    if (isOpen) {
      fetchLibrary()
    }
  }, [isOpen, sessionId, minRating])

  const fetchLibrary = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/trainers/sessions/${sessionId}/question-library?minRating=${minRating}&limit=20`
      )
      const data = await response.json()

      if (response.ok) {
        setQuestions(data.data.questions)
      } else {
        console.error('Error fetching library:', data.message)
      }
    } catch (error) {
      console.error('Error fetching question library:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredQuestions = questions
    .filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0)
      } else {
        return b.usageCount - a.usageCount
      }
    })

  const handleUseQuestion = (question: LibraryQuestion) => {
    onUseQuestion(question.question, 'LIBRARY')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Question Library
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Browse highly-rated questions from previous sessions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Questions
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keywords..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="0">All Questions</option>
                <option value="3">3+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="5">5 Stars Only</option>
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">Sort by:</span>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-3 py-1 text-sm rounded-md ${
                sortBy === 'rating'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Star className="inline h-4 w-4 mr-1" />
              Highest Rated
            </button>
            <button
              onClick={() => setSortBy('usage')}
              className={`px-3 py-1 text-sm rounded-md ${
                sortBy === 'usage'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="inline h-4 w-4 mr-1" />
              Most Used
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading question library...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No questions found' : 'No highly-rated questions yet'}
              </h4>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'As coordinators rate questions, the best ones will appear here'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-4">
                Showing {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
              </div>

              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Question Text */}
                      <p className="text-gray-900 font-medium leading-relaxed mb-3">
                        {question.question}
                      </p>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm">
                        {/* Rating */}
                        {question.rating && (
                          <div className="flex items-center text-yellow-600">
                            <Star className="h-4 w-4 fill-current mr-1" />
                            <span className="font-medium">
                              {question.rating.toFixed(1)}
                            </span>
                          </div>
                        )}

                        {/* Usage Count */}
                        <div className="flex items-center text-gray-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>
                            Used {question.usageCount} time{question.usageCount !== 1 ? 's' : ''}
                          </span>
                        </div>

                        {/* Topic */}
                        {question.topic && (
                          <div className="text-gray-600">
                            Topic: <span className="font-medium">{question.topic.title}</span>
                          </div>
                        )}
                      </div>

                      {/* Session Info */}
                      <div className="mt-2 text-xs text-gray-500">
                        {question.sessionInfo}
                      </div>
                    </div>

                    {/* Use Button */}
                    <button
                      onClick={() => handleUseQuestion(question)}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 whitespace-nowrap flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Use This
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              💡 Questions from the library help maintain quality and save time
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
