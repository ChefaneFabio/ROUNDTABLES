import { useState } from 'react'

interface MatchingQuestionProps {
  question: {
    id: string
    questionText: string
    options?: { label: string; value: string }[]
    passage?: string
  }
  onSubmit: (answer: string) => void
  disabled?: boolean
  language?: string
}

export function MatchingQuestion({ question, onSubmit, disabled }: MatchingQuestionProps) {
  // Options format: first half are left items, second half are right items
  // Or: options contain pairs like "A-1", "B-2" etc.
  // We'll use a simpler approach: options are the right-side items to match
  // passage contains the left-side items (numbered)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)

  // Parse left items from passage (numbered lines) and right items from options
  const leftItems = (question.passage || '').split('\n').filter(l => l.trim()).map((line, i) => {
    const cleaned = line.replace(/^\d+[\.\)]\s*/, '').trim()
    return { id: `${i}`, text: cleaned || line.trim() }
  })

  const rightItems = (question.options || []).map(o => ({
    id: o.value,
    text: o.label,
  }))

  const handleRightClick = (rightId: string) => {
    if (disabled || !selectedLeft) return
    setMatches(prev => ({ ...prev, [selectedLeft]: rightId }))
    setSelectedLeft(null)
  }

  const handleLeftClick = (leftId: string) => {
    if (disabled) return
    if (selectedLeft === leftId) {
      setSelectedLeft(null)
    } else {
      setSelectedLeft(leftId)
    }
  }

  const handleRemoveMatch = (leftId: string) => {
    if (disabled) return
    setMatches(prev => {
      const next = { ...prev }
      delete next[leftId]
      return next
    })
  }

  const allMatched = leftItems.length > 0 && Object.keys(matches).length === leftItems.length

  const handleSubmit = () => {
    if (!allMatched) return
    // Submit as comma-separated pairs: "0-A,1-B,2-C"
    const answer = leftItems.map(l => `${l.id}-${matches[l.id]}`).join(',')
    onSubmit(answer)
    setMatches({})
    setSelectedLeft(null)
  }

  const matchedRightIds = new Set(Object.values(matches))

  return (
    <div className="space-y-5">
      <p className="text-lg font-semibold text-gray-900">{question.questionText}</p>
      <p className="text-sm text-gray-500">Click a left item, then click its match on the right.</p>

      <div className="grid grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-2">
          {leftItems.map((item) => {
            const isSelected = selectedLeft === item.id
            const isMatched = item.id in matches
            return (
              <button
                key={item.id}
                onClick={() => isMatched ? handleRemoveMatch(item.id) : handleLeftClick(item.id)}
                disabled={disabled}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all text-sm
                  ${isMatched
                    ? 'border-green-400 bg-green-50 text-green-800'
                    : isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-800 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-300 bg-white text-gray-800'}
                `}
              >
                <span className="font-medium">{parseInt(item.id) + 1}.</span> {item.text}
                {isMatched && (
                  <span className="float-right text-green-600 font-bold">
                    → {rightItems.find(r => r.id === matches[item.id])?.text}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          {rightItems.map((item) => {
            const isUsed = matchedRightIds.has(item.id)
            return (
              <button
                key={item.id}
                onClick={() => handleRightClick(item.id)}
                disabled={disabled || isUsed || !selectedLeft}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all text-sm
                  ${isUsed
                    ? 'border-gray-200 bg-gray-100 text-gray-400 line-through'
                    : selectedLeft
                      ? 'border-indigo-200 hover:border-indigo-400 bg-indigo-50 text-gray-800 cursor-pointer'
                      : 'border-gray-200 bg-white text-gray-800'}
                `}
              >
                {item.text}
              </button>
            )
          })}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allMatched || disabled}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Submit Answer
      </button>
    </div>
  )
}
