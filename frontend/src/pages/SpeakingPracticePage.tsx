import React, { useState, useEffect } from 'react'
import { Mic, RefreshCw, History, TrendingUp, Volume2 } from 'lucide-react'
import { useSpeechRecognition, LANGUAGE_CODES } from '../hooks/useSpeechRecognition'
import { speechApi, SpeakingPrompt, SpeakingSession, SpeakingStats, AnalysisResult } from '../services/speechApi'
import MicrophoneButton from '../components/speech/MicrophoneButton'
import TranscriptDisplay from '../components/speech/TranscriptDisplay'
import PronunciationFeedback from '../components/speech/PronunciationFeedback'
import { useAuth } from '../contexts/AuthContext'

const SpeakingPracticePage: React.FC = () => {
  const { profile } = useAuth()
  const studentLevel = (profile as any)?.languageLevel || 'B1'

  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [currentPrompt, setCurrentPrompt] = useState<SpeakingPrompt | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [stats, setStats] = useState<SpeakingStats | null>(null)
  const [recentSessions, setRecentSessions] = useState<SpeakingSession[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const languageCode = LANGUAGE_CODES[selectedLanguage] || 'en-US'

  const {
    isListening,
    transcript,
    interimTranscript,
    error: speechError,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    language: languageCode,
    continuous: true,
    interimResults: true
  })

  // Load initial prompt and stats
  useEffect(() => {
    loadRandomPrompt()
    loadStats()
    loadRecentSessions()
  }, [studentLevel])

  const loadRandomPrompt = async () => {
    setIsLoading(true)
    try {
      const prompt = await speechApi.getRandomPrompt(studentLevel, selectedLanguage)
      setCurrentPrompt(prompt)
      setResult(null)
      resetTranscript()
      setError(null)
    } catch (err) {
      setError('Failed to load prompt')
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await speechApi.getStats()
      setStats(data)
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }

  const loadRecentSessions = async () => {
    try {
      const sessions = await speechApi.getSessions(5)
      setRecentSessions(sessions)
    } catch (err) {
      console.error('Failed to load sessions:', err)
    }
  }

  const handleStartRecording = () => {
    setResult(null)
    resetTranscript()
    startListening()
  }

  const handleStopRecording = async () => {
    stopListening()

    if (!transcript && !interimTranscript) {
      setError('No speech detected. Please try again.')
      return
    }

    if (!currentPrompt) return

    setIsAnalyzing(true)
    try {
      const analysisResult = await speechApi.analyzePronunciation({
        targetText: currentPrompt.text,
        recognizedText: transcript + interimTranscript,
        language: selectedLanguage,
        cefrLevel: studentLevel
      })
      setResult(analysisResult)
      loadStats()
      loadRecentSessions()
    } catch (err) {
      setError('Failed to analyze pronunciation')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const speakPrompt = () => {
    if (!currentPrompt || !('speechSynthesis' in window)) return

    const utterance = new SpeechSynthesisUtterance(currentPrompt.text)
    utterance.lang = languageCode
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  if (!isSupported) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <Mic className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            Speech Recognition Not Supported
          </h2>
          <p className="text-yellow-700">
            Your browser doesn't support speech recognition.
            Please use Chrome, Edge, or Safari for the best experience.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Speaking Practice</h1>
          <p className="text-gray-600">Practice your pronunciation and get instant feedback</p>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <History className="w-5 h-5" />
          History
        </button>
      </div>

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.totalSessions}</div>
            <div className="text-sm text-gray-500">Practice Sessions</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.avgAccuracy}%</div>
            <div className="text-sm text-gray-500">Avg. Accuracy</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">{stats.avgFluency}%</div>
            <div className="text-sm text-gray-500">Avg. Fluency</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-1">
              <TrendingUp className={`w-5 h-5 ${
                stats.improvementTrend === 'improving' ? 'text-green-600' :
                stats.improvementTrend === 'declining' ? 'text-red-600' : 'text-gray-400'
              }`} />
              <span className="text-sm font-medium capitalize">{stats.improvementTrend}</span>
            </div>
            <div className="text-sm text-gray-500">Trend</div>
          </div>
        </div>
      )}

      {/* Main practice area */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Language selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.keys(LANGUAGE_CODES).map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Level: {studentLevel}
            </span>
          </div>
          <button
            onClick={loadRandomPrompt}
            disabled={isLoading || isListening}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            New Prompt
          </button>
        </div>

        {/* Prompt display */}
        {currentPrompt && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Read this aloud:</span>
              <button
                onClick={speakPrompt}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Volume2 className="w-4 h-4" />
                Listen
              </button>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xl text-blue-900 leading-relaxed">{currentPrompt.text}</p>
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span>Category: {currentPrompt.category}</span>
              <span>Difficulty: {currentPrompt.difficulty}</span>
            </div>
          </div>
        )}

        {/* Microphone button */}
        <div className="flex flex-col items-center mb-8">
          <MicrophoneButton
            isListening={isListening}
            isProcessing={isAnalyzing}
            onStart={handleStartRecording}
            onStop={handleStopRecording}
            size="lg"
          />
          <p className="mt-4 text-gray-500 text-sm">
            {isListening ? 'Listening... Click to stop' : 'Click to start recording'}
          </p>
        </div>

        {/* Transcript display */}
        <TranscriptDisplay
          transcript={transcript}
          interimTranscript={interimTranscript}
          placeholder="Your speech will appear here..."
        />

        {/* Error display */}
        {(error || speechError) && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error || speechError}
          </div>
        )}

        {/* Results */}
        {result && result.feedback && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Results</h3>
            <PronunciationFeedback
              accuracyScore={result.accuracyScore}
              fluencyScore={result.fluencyScore}
              wordFeedback={result.feedback.wordFeedback}
              overallFeedback={result.feedback.overallFeedback}
              suggestions={result.feedback.suggestions}
            />
          </div>
        )}
      </div>

      {/* History sidebar/panel */}
      {showHistory && recentSessions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            {recentSessions.map(session => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm text-gray-900 line-clamp-1">
                    {session.targetText || 'Free practice'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-600 font-medium">
                    {session.accuracyScore}% accuracy
                  </span>
                  <span className="text-green-600 font-medium">
                    {session.fluencyScore}% fluency
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SpeakingPracticePage
