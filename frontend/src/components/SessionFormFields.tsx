import { Calendar, X } from 'lucide-react'

interface Topic {
  title: string
  description: string
}

interface Trainer {
  id: string
  name: string
  email: string
}

interface SessionData {
  sessionNumber: number
  scheduledAt: string
  topicId?: string
  customTopicTitle?: string
  trainerId?: string
  notes?: string
  meetingLink?: string
}

interface SessionFormFieldsProps {
  session: SessionData
  topics: Topic[]
  trainers: Trainer[]
  onUpdate: (field: keyof SessionData, value: string) => void
  onRemove?: () => void
  canRemove?: boolean
}

export function SessionFormFields({
  session,
  topics,
  trainers,
  onUpdate,
  onRemove,
  canRemove = false
}: SessionFormFieldsProps) {
  const validTopics = topics.filter(t => t.title.trim())

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold text-gray-700">
          Session {session.sessionNumber}
        </h4>
        {canRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 hover:text-red-800"
            title="Remove session"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scheduled Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date & Time *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="datetime-local"
              required
              value={session.scheduledAt}
              onChange={(e) => onUpdate('scheduledAt', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic
          </label>
          <select
            value={session.topicId || ''}
            onChange={(e) => onUpdate('topicId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">No topic (Intro/Conclusion)</option>
            {validTopics.map((topic, index) => (
              <option key={index} value={topic.title}>
                {topic.title}
              </option>
            ))}
            <option value="__custom__">✏️ Custom topic...</option>
          </select>
        </div>

        {/* Custom Topic Input (appears when "Custom topic" is selected) */}
        {session.topicId === '__custom__' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Topic Title
            </label>
            <input
              type="text"
              placeholder="Enter custom topic title..."
              value={session.customTopicTitle || ''}
              onChange={(e) => onUpdate('customTopicTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>
        )}

        {/* Trainer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trainer
          </label>
          <select
            value={session.trainerId || ''}
            onChange={(e) => onUpdate('trainerId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select a trainer (optional)</option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.name} ({trainer.email})
              </option>
            ))}
          </select>
        </div>

        {/* Meeting Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting Link
          </label>
          <input
            type="url"
            value={session.meetingLink || ''}
            onChange={(e) => onUpdate('meetingLink', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="https://zoom.us/j/..."
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (optional)
          </label>
          <textarea
            value={session.notes || ''}
            onChange={(e) => onUpdate('notes', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Add any notes for this session..."
          />
        </div>
      </div>
    </div>
  )
}
