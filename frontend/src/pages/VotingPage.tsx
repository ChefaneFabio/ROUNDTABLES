import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Vote, CheckCircle, AlertTriangle, User, Building } from 'lucide-react'
import { votingApi } from '../services/votingApi'
import { Topic } from '../types'

interface VotingData {
  roundtable: {
    id: string
    name: string
    client: { name: string; company: string }
  }
  participant: {
    name: string
    email: string
    hasVoted: boolean
  }
  topics: Array<Topic & { isSelected: boolean }>
  votingInstructions: {
    maxSelections: number
    message: string
  }
}

export function VotingPage() {
  const { roundtableId } = useParams<{ roundtableId: string }>()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const [votingData, setVotingData] = useState<VotingData | null>(null)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!roundtableId || !email) {
      setError('Invalid voting link. Please check your email for the correct link.')
      setLoading(false)
      return
    }

    loadVotingData()
  }, [roundtableId, email])

  const loadVotingData = async () => {
    try {
      setLoading(true)
      const data = await votingApi.getVotingData(roundtableId!, email!)
      setVotingData(data)

      // Pre-select previously voted topics
      const preSelected = data.topics
        .filter(t => t.isSelected)
        .map(t => t.id)
      setSelectedTopics(preSelected)

    } catch (err: any) {
      setError(err.message || 'Failed to load voting data')
    } finally {
      setLoading(false)
    }
  }

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => {
      const isSelected = prev.includes(topicId)

      if (isSelected) {
        return prev.filter(id => id !== topicId)
      } else {
        if (prev.length >= 8) {
          // Replace the first selected topic to maintain max 8
          return [...prev.slice(1), topicId]
        }
        return [...prev, topicId]
      }
    })
  }

  const handleSubmit = async () => {
    if (selectedTopics.length !== 8) {
      setError('Please select exactly 8 topics')
      return
    }

    try {
      setSubmitting(true)
      setError('')

      await votingApi.submitVotes(roundtableId!, {
        participantEmail: email!,
        topicIds: selectedTopics
      })

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to submit votes')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error && !votingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
            Voting Unavailable
          </h2>
          <p className="text-gray-600 text-center">{error}</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Your votes have been submitted successfully. The selected topics will be used for your roundtable discussions.
          </p>
          <p className="text-sm text-gray-500 text-center">
            You will receive further information about the session schedule via email.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <Vote className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Topic Voting</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {votingData?.roundtable.name}
              </h2>
              <div className="flex items-center text-gray-600 mt-1">
                <Building className="h-4 w-4 mr-1" />
                <span>{votingData?.roundtable.client.company}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-1" />
                <span>{votingData?.participant.name}</span>
              </div>
              <p className="text-sm text-gray-500">{votingData?.participant.email}</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-md p-4">
            <p className="text-blue-800 text-sm">
              {votingData?.votingInstructions.message}
            </p>
          </div>
        </div>

        {/* Voting Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Selected Topics: {selectedTopics.length} / 8
            </span>
            <span className="text-sm text-gray-500">
              {8 - selectedTopics.length} remaining
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(selectedTopics.length / 8) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Topics Grid */}
        <div className="grid gap-4 mb-8">
          {votingData?.topics.map((topic) => {
            const isSelected = selectedTopics.includes(topic.id)
            return (
              <div
                key={topic.id}
                className={`
                  bg-white rounded-lg border-2 cursor-pointer transition-all duration-200 p-6
                  ${isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => handleTopicToggle(topic.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`
                      text-lg font-semibold mb-2
                      ${isSelected ? 'text-primary-900' : 'text-gray-900'}
                    `}>
                      {topic.title}
                    </h3>
                    <p className={`
                      text-sm leading-relaxed
                      ${isSelected ? 'text-primary-700' : 'text-gray-600'}
                    `}>
                      {topic.description}
                    </p>
                  </div>

                  <div className={`
                    ml-4 rounded-full border-2 w-6 h-6 flex items-center justify-center
                    ${isSelected
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                    }
                  `}>
                    {isSelected && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={handleSubmit}
            disabled={selectedTopics.length !== 8 || submitting}
            className={`
              w-full py-3 px-6 rounded-md font-semibold text-white transition-all duration-200
              ${selectedTopics.length === 8 && !submitting
                ? 'bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting Votes...
              </div>
            ) : (
              `Submit ${selectedTopics.length} Selected Topics`
            )}
          </button>

          {selectedTopics.length !== 8 && (
            <p className="text-center text-sm text-gray-500 mt-2">
              {selectedTopics.length < 8
                ? `Please select ${8 - selectedTopics.length} more topics`
                : `Please remove ${selectedTopics.length - 8} topics`
              }
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
