import { useState, useEffect } from 'react'
import { assessmentApi } from '../../services/assessmentApi'

interface PendingSection {
  id: string
  skill: string
  cefrLevel: string
  aiScore: any
  assessment: {
    id: string
    language: string
    student: { id: string; user: { name: string; email: string } }
  }
}

export function TeacherReviewPanel() {
  const [sections, setSections] = useState<PendingSection[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [reviewData, setReviewData] = useState<any>(null)
  const [scoreForm, setScoreForm] = useState({
    grammar: 0, coherence: 0, vocabulary: 0, spelling: 0,
    taskAchievement: 0, pronunciation: 0, fluency: 0,
    overall: 0, cefrLevel: 'B1', feedback: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadPending()
  }, [])

  const loadPending = async () => {
    try {
      const data = await assessmentApi.getPendingReview()
      setSections(data)
    } catch (err) {
      console.error('Failed to load pending reviews:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectSection = async (section: PendingSection) => {
    setSelectedSection(section.id)
    // Load full results for this assessment
    try {
      const results = await assessmentApi.getMultiSkillResults(section.assessment.id)
      setReviewData(results)
      // Pre-fill with AI scores
      if (section.aiScore) {
        setScoreForm(prev => ({ ...prev, ...section.aiScore }))
      }
    } catch (err) {
      console.error('Failed to load review data:', err)
    }
  }

  const handleSubmitScore = async () => {
    if (!selectedSection) return
    const section = sections.find(s => s.id === selectedSection)
    if (!section) return

    try {
      setSubmitting(true)
      await assessmentApi.submitTeacherScore(section.assessment.id, selectedSection, scoreForm)
      // Remove from pending list
      setSections(prev => prev.filter(s => s.id !== selectedSection))
      setSelectedSection(null)
      setReviewData(null)
    } catch (err: any) {
      alert('Failed to submit score: ' + (err.response?.data?.error || err.message))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center p-8 text-gray-500">Loading pending reviews...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Pending Teacher Reviews</h2>

      {sections.length === 0 && (
        <p className="text-gray-500">No sections pending review.</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="space-y-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleSelectSection(section)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedSection === section.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="font-medium text-gray-900">{section.assessment.student.user.name}</p>
              <p className="text-sm text-gray-500">
                {section.skill} &middot; {section.assessment.language}
              </p>
              {section.aiScore?.overall && (
                <p className="text-xs text-blue-600 mt-1">AI Score: {section.aiScore.overall}/100</p>
              )}
            </button>
          ))}
        </div>

        {/* Review panel */}
        {selectedSection && reviewData && (
          <div className="lg:col-span-2 space-y-4">
            {/* Student responses */}
            {reviewData.writingResponses?.map((wr: any) => (
              <div key={wr.id} className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Writing Response</h4>
                <p className="text-gray-800 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
                  {wr.responseText}
                </p>
                <p className="text-xs text-gray-500 mt-1">{wr.wordCount} words</p>
                {wr.aiEvaluation && (
                  <div className="mt-2 text-xs text-blue-600">
                    AI: Grammar {wr.aiEvaluation.grammar}, Vocabulary {wr.aiEvaluation.vocabulary}, Overall {wr.aiEvaluation.overall} ({wr.aiEvaluation.cefrLevel})
                  </div>
                )}
              </div>
            ))}

            {reviewData.speakingResponses?.map((sr: any) => (
              <div key={sr.id} className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Speaking Response</h4>
                {sr.audioUrl && <audio controls src={sr.audioUrl} className="w-full mb-2" />}
                {sr.transcript && (
                  <p className="text-gray-800 text-sm bg-gray-50 p-3 rounded italic">{sr.transcript}</p>
                )}
                {sr.aiEvaluation && (
                  <div className="mt-2 text-xs text-blue-600">
                    AI: Pronunciation {sr.aiEvaluation.pronunciation}, Fluency {sr.aiEvaluation.fluency}, Overall {sr.aiEvaluation.overall} ({sr.aiEvaluation.cefrLevel})
                  </div>
                )}
              </div>
            ))}

            {/* Score form */}
            <div className="bg-white border rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-gray-700">Teacher Score</h4>

              <div className="grid grid-cols-2 gap-3">
                {['grammar', 'vocabulary', 'coherence', 'fluency', 'overall'].map(field => (
                  <div key={field}>
                    <label className="text-xs text-gray-500 capitalize">{field} (0-100)</label>
                    <input
                      type="number" min="0" max="100"
                      value={(scoreForm as any)[field]}
                      onChange={(e) => setScoreForm(prev => ({ ...prev, [field]: parseInt(e.target.value) || 0 }))}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs text-gray-500">CEFR Level</label>
                <select
                  value={scoreForm.cefrLevel}
                  onChange={(e) => setScoreForm(prev => ({ ...prev, cefrLevel: e.target.value }))}
                  className="w-full p-2 border rounded text-sm"
                >
                  {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500">Feedback</label>
                <textarea
                  value={scoreForm.feedback}
                  onChange={(e) => setScoreForm(prev => ({ ...prev, feedback: e.target.value }))}
                  rows={3}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>

              <button
                onClick={handleSubmitScore}
                disabled={submitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {submitting ? 'Saving...' : 'Save Teacher Score'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
