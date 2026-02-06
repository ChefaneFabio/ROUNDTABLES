import React from 'react'

interface LevelFilterProps {
  selectedLevel: string | null
  onLevelChange: (level: string | null) => void
  className?: string
}

const CEFR_LEVELS = [
  { value: 'A1', label: 'A1', description: 'Beginner' },
  { value: 'A2', label: 'A2', description: 'Elementary' },
  { value: 'B1', label: 'B1', description: 'Intermediate' },
  { value: 'B2', label: 'B2', description: 'Upper Intermediate' },
  { value: 'C1', label: 'C1', description: 'Advanced' },
  { value: 'C2', label: 'C2', description: 'Proficiency' }
]

export const LevelFilter: React.FC<LevelFilterProps> = ({
  selectedLevel,
  onLevelChange,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        onClick={() => onLevelChange(null)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedLevel === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Levels
      </button>
      {CEFR_LEVELS.map(level => (
        <button
          key={level.value}
          onClick={() => onLevelChange(level.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedLevel === level.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={level.description}
        >
          {level.label}
        </button>
      ))}
    </div>
  )
}

export default LevelFilter
