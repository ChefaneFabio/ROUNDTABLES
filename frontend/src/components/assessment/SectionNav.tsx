import { AssessmentSection } from '../../services/assessmentApi'

const SKILL_LABELS: Record<string, string> = {
  READING: 'Reading',
  LISTENING: 'Listening',
  WRITING: 'Writing',
  SPEAKING: 'Speaking'
}

const SKILL_ICONS: Record<string, string> = {
  READING: '📖',
  LISTENING: '🎧',
  WRITING: '✍️',
  SPEAKING: '🎤'
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-gray-200 text-gray-600',
  IN_PROGRESS: 'bg-blue-500 text-white',
  COMPLETED: 'bg-green-500 text-white',
  SKIPPED: 'bg-yellow-500 text-white'
}

interface SectionNavProps {
  sections: AssessmentSection[]
  currentSectionId?: string
  onSectionClick?: (section: AssessmentSection) => void
}

export function SectionNav({ sections, currentSectionId, onSectionClick }: SectionNavProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {sections.map((section, index) => (
        <div key={section.id} className="flex items-center">
          <button
            onClick={() => onSectionClick?.(section)}
            disabled={section.status === 'PENDING' && index > 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${section.id === currentSectionId ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
              ${STATUS_COLORS[section.status]}
              ${section.status === 'PENDING' && index > 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}
            `}
          >
            <span>{SKILL_ICONS[section.skill]}</span>
            <span>{SKILL_LABELS[section.skill]}</span>
            {section.status === 'COMPLETED' && section.cefrLevel && (
              <span className="ml-1 text-xs font-bold bg-white/20 px-1.5 py-0.5 rounded">
                {section.cefrLevel}
              </span>
            )}
          </button>
          {index < sections.length - 1 && (
            <div className={`w-8 h-0.5 mx-1 ${
              section.status === 'COMPLETED' ? 'bg-green-400' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}
