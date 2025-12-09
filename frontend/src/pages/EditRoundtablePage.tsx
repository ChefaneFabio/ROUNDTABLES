import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Save, Info } from 'lucide-react'
import { roundtablesApi } from '../services/api'
import { Roundtable } from '../types'

interface ImpactReport {
  canProceed: boolean
  warnings: string[]
  blockers: string[]
  sessionsToDelete: Array<{
    sessionNumber: number
    status: string
    trainer: string | null
    topic: string | null
    hasQuestions: boolean
    hasFeedback: boolean
  }>
  oldValue: number
  newValue: number
  sessionsToCreate: number
}

export function EditRoundtablePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [roundtable, setRoundtable] = useState<Roundtable | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [impactReport, setImpactReport] = useState<ImpactReport | null>(null)
  const [showImpactDialog, setShowImpactDialog] = useState(false)
  const [confirmDangerous, setConfirmDangerous] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxParticipants: 6,
    numberOfSessions: 10
  })

  useEffect(() => {
    if (id) {
      fetchRoundtable()
    }
  }, [id])

  const fetchRoundtable = async () => {
    try {
      setLoading(true)
      const response = await roundtablesApi.getById(id!)
      if (response?.data) {
        setRoundtable(response.data)
        setFormData({
          name: response.data.name,
          description: response.data.description || '',
          maxParticipants: response.data.maxParticipants,
          numberOfSessions: response.data.numberOfSessions
        })
      }
    } catch (err: any) {
      console.error('Error fetching roundtable:', err)
      setError('Failed to load roundtable')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfSessions' || name === 'maxParticipants' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if numberOfSessions changed
    if (formData.numberOfSessions !== roundtable?.numberOfSessions) {
      await previewChanges()
      return
    }

    // No numberOfSessions change, save directly
    await saveChanges(false)
  }

  const previewChanges = async () => {
    try {
      setSaving(true)
      setError(null)

      // Try to save (will return impact report if dangerous)
      await saveChanges(false)
    } catch (err: any) {
      if (err.response?.status === 409 && err.response?.data?.impact) {
        // Requires confirmation
        setImpactReport(err.response.data.impact)
        setShowImpactDialog(true)
        setSaving(false)
      } else if (err.response?.status === 400 && err.response?.data?.blockers) {
        // Has blockers - cannot proceed
        setImpactReport(err.response.data.impact)
        setShowImpactDialog(true)
        setSaving(false)
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to save changes')
        setSaving(false)
      }
    }
  }

  const saveChanges = async (confirmed: boolean) => {
    try {
      setSaving(true)
      setError(null)

      const updateData: any = {
        name: formData.name,
        description: formData.description,
        maxParticipants: formData.maxParticipants
      }

      // Only include numberOfSessions if it changed
      if (formData.numberOfSessions !== roundtable?.numberOfSessions) {
        updateData.numberOfSessions = formData.numberOfSessions
        if (confirmed) {
          updateData.confirmDangerous = true
        }
      }

      const response = await roundtablesApi.update(id!, updateData)

      if (response?.data) {
        // Success - navigate back
        navigate(`/roundtables/${id}`)
      }
    } catch (err: any) {
      // If error is 409, let the caller handle it
      if (err.response?.status === 409 || err.response?.status === 400) {
        throw err
      }
      setError(err.response?.data?.error || err.message || 'Failed to save changes')
      setSaving(false)
    }
  }

  const confirmAndSave = async () => {
    setShowImpactDialog(false)
    setConfirmDangerous(false)
    await saveChanges(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!roundtable) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Roundtable not found</div>
      </div>
    )
  }

  const isNumberOfSessionsChanged = formData.numberOfSessions !== roundtable.numberOfSessions
  const isIncreasing = formData.numberOfSessions > roundtable.numberOfSessions
  const isDecreasing = formData.numberOfSessions < roundtable.numberOfSessions

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/roundtables/${id}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Roundtable</h1>
            <p className="text-sm text-gray-500 mt-1">Update roundtable settings</p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-900">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                maxLength={500}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Participants
              </label>
              <input
                type="number"
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min={1}
                max={50}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Current participants: {roundtable.participants?.length || 0}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Number of Sessions - Special Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Number of Sessions</h2>
          <p className="text-sm text-gray-600 mb-4">
            Change the total number of sessions for this roundtable. This operation may affect existing sessions.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="numberOfSessions" className="block text-sm font-medium text-gray-700 mb-2">
                Total Sessions
              </label>
              <input
                type="number"
                id="numberOfSessions"
                name="numberOfSessions"
                value={formData.numberOfSessions}
                onChange={handleChange}
                min={1}
                max={100}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Current: {roundtable.numberOfSessions} sessions | Scheduled: {roundtable.sessions?.length || 0} sessions
              </p>
            </div>

            {/* Change Impact Info */}
            {isNumberOfSessionsChanged && (
              <div className={`p-4 rounded-lg border ${
                isIncreasing ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-start gap-3">
                  <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    isIncreasing ? 'text-blue-600' : 'text-amber-600'
                  }`} />
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      isIncreasing ? 'text-blue-900' : 'text-amber-900'
                    }`}>
                      {isIncreasing ? 'Increasing Sessions' : 'Decreasing Sessions'}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      isIncreasing ? 'text-blue-700' : 'text-amber-700'
                    }`}>
                      {isIncreasing ? (
                        <>Creating <strong>{formData.numberOfSessions - roundtable.numberOfSessions}</strong> new session(s). You'll need to schedule dates and assign trainers/topics later.</>
                      ) : (
                        <>Removing <strong>{roundtable.numberOfSessions - formData.numberOfSessions}</strong> session(s). This may delete sessions with assigned trainers, questions, or feedback.</>
                      )}
                    </p>
                    {isDecreasing && (
                      <p className="text-sm mt-2 font-medium text-amber-900">
                        ⚠️ You'll see a preview of what will be deleted before confirming.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate(`/roundtables/${id}`)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : isNumberOfSessionsChanged && isDecreasing ? 'Preview Changes' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Impact Preview Dialog */}
      {showImpactDialog && impactReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {impactReport.blockers.length > 0 ? 'Cannot Change Sessions' : 'Confirm Changes'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {impactReport.newValue > impactReport.oldValue
                  ? `Adding ${impactReport.sessionsToCreate} new session(s)`
                  : `Removing ${impactReport.sessionsToDelete.length} session(s)`
                }
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Blockers */}
              {impactReport.blockers.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-red-900 mb-2">Cannot Proceed</h3>
                      <ul className="space-y-1">
                        {impactReport.blockers.map((blocker, index) => (
                          <li key={index} className="text-sm text-red-700">• {blocker}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Warnings */}
              {impactReport.warnings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-amber-900 mb-2">Warnings</h3>
                      <ul className="space-y-1">
                        {impactReport.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-amber-700">• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Sessions to Delete */}
              {impactReport.sessionsToDelete.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Sessions to be Deleted:</h3>
                  <div className="space-y-2">
                    {impactReport.sessionsToDelete.map((session) => (
                      <div key={session.sessionNumber} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-900">Session {session.sessionNumber}</div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            session.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            session.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          {session.trainer && <div>👤 Trainer: {session.trainer}</div>}
                          {session.topic && <div>📚 Topic: {session.topic}</div>}
                          {session.hasQuestions && <div>❓ Has questions</div>}
                          {session.hasFeedback && <div>💬 Has feedback</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sessions to Create */}
              {impactReport.sessionsToCreate > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900">New Sessions</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        {impactReport.sessionsToCreate} new session(s) will be created with placeholder dates.
                        You'll need to schedule them and assign trainers/topics afterwards.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirmation Checkbox (only if no blockers) */}
              {impactReport.warnings.length > 0 && impactReport.blockers.length === 0 && (
                <label className="flex items-start gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={confirmDangerous}
                    onChange={(e) => setConfirmDangerous(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I understand this action cannot be undone and I want to proceed with deleting {impactReport.sessionsToDelete.length} session(s).
                  </span>
                </label>
              )}
            </div>

            {/* Dialog Actions */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowImpactDialog(false)
                  setConfirmDangerous(false)
                  setSaving(false)
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              {impactReport.blockers.length === 0 && (
                <button
                  type="button"
                  onClick={confirmAndSave}
                  disabled={impactReport.warnings.length > 0 && !confirmDangerous}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Confirm & Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
