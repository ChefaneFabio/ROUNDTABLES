import { AssessmentSection } from '../../services/assessmentApi'

const getStatusColor = (section: AssessmentSection): string => {
  if (section.status === 'COMPLETED' && section.completionReason === 'INTERRUPTED') return 'bg-amber-500 text-white'
  if (section.status === 'COMPLETED' && section.completionReason === 'EXPIRED') return 'bg-orange-500 text-white'
  return STATUS_COLORS[section.status] || STATUS_COLORS['PENDING']
}

const SKILL_LABELS: Record<string, string> = {
  GRAMMAR: 'Grammar',
  VOCABULARY: 'Vocabulary',
  READING: 'Reading',
  ERROR_CORRECTION: 'Error Fix',
  SENTENCE_TRANSFORMATION: 'Transform',
  WRITING: 'Writing',
  LISTENING: 'Listening',
  SPEAKING: 'Speaking'
}

const SKILL_ICONS: Record<string, string> = {
  GRAMMAR: '📝',
  VOCABULARY: '📚',
  READING: '📖',
  ERROR_CORRECTION: '✏️',
  SENTENCE_TRANSFORMATION: '🔄',
  WRITING: '✍️',
  LISTENING: '🎧',
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
  showLevels?: boolean // Only show CEFR levels for admins
}

export function SectionNav({ sections, currentSectionId, onSectionClick, showLevels = false }: SectionNavProps) {
  return (
    <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
      {sections.map((section, index) => (
        <div key={section.id} className="flex items-center">
          <button
            onClick={() => onSectionClick?.(section)}
            disabled={section.status === 'PENDING' && index > 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${section.id === currentSectionId ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
              ${getStatusColor(section)}
              ${section.status === 'PENDING' && index > 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}
            `}
          >
            <span>{SKILL_ICONS[section.skill]}</span>
            <span>{SKILL_LABELS[section.skill]}</span>
            {showLevels && section.status === 'COMPLETED' && section.cefrLevel && (
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
