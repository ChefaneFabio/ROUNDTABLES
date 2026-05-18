import { useState, useMemo, useRef, useEffect } from 'react'
import { Check } from 'lucide-react'
import { SpecialCharactersBar } from './SpecialCharactersBar'

interface WritingQuestionProps {
  question: {
    id: string
    questionText: string
    rubric?: { minWords?: number; maxWords?: number }
    cefrLevel?: string
  }
  // May return a Promise; if it rejects (e.g. network failure, JWT expiry)
  // we keep the localStorage draft so the learner can retry without losing
  // their text.
  onSubmit: (responseText: string) => void | Promise<unknown>
  disabled?: boolean
  language?: string
}

// localStorage key per writing question — survives session timeouts, page
// reloads, and accidental tab closes. We scope by question.id because the
// student is at most writing one draft per question at a time. Cleared on
// successful submit.
function draftKey(questionId: string): string {
  return `roundtables:writingDraft:${questionId}`
}

export function WritingQuestion({ question, onSubmit, disabled, language }: WritingQuestionProps) {
  const [text, setText] = useState('')
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // On mount or question change, restore any draft for this question.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(draftKey(question.id))
      if (stored && stored.length > 0) {
        setText(stored)
        setSavedAt(Date.now())
      } else {
        setText('')
        setSavedAt(null)
      }
    } catch {
      // localStorage can throw in some private-mode browsers; ignore.
    }
  }, [question.id])

  // Debounced autosave — every 600ms after the last keystroke we write the
  // current text into localStorage. This means the worst case loss is the
  // last few characters before a crash.
  useEffect(() => {
    if (!text) {
      // Nothing to save; clear the slot so the placeholder reappears.
      try { localStorage.removeItem(draftKey(question.id)) } catch { /* */ }
      setSavedAt(null)
      return
    }
    const t = setTimeout(() => {
      try {
        localStorage.setItem(draftKey(question.id), text)
        setSavedAt(Date.now())
      } catch {
        // Storage quota errors are rare for plain text — ignore silently.
      }
    }, 600)
    return () => clearTimeout(t)
  }, [text, question.id])

  const wordCount = useMemo(() => {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length
  }, [text])

  const maxWords = question.rubric?.maxWords || 150
  const isOverMax = wordCount > maxWords

  const handleSubmit = async () => {
    const trimmed = text.trim()
    if (!trimmed) return
    // Snapshot the draft synchronously before the network call: the
    // debounced autosave above runs 600ms after the last keystroke, so if
    // the user types fast and clicks Submit immediately the draft may not
    // be in localStorage yet. Saving here guarantees the text survives any
    // failure between this line and the server confirming the response.
    try { localStorage.setItem(draftKey(question.id), trimmed) } catch { /* */ }
    try {
      const maybePromise = onSubmit(trimmed)
      // Await if the parent returned a Promise; otherwise fall through
      // immediately. Either way, only clear the draft after the parent
      // signals success (or returns sync).
      if (maybePromise && typeof (maybePromise as any).then === 'function') {
        await maybePromise
      }
      try { localStorage.removeItem(draftKey(question.id)) } catch { /* */ }
      setText('')
      setSavedAt(null)
    } catch {
      // Parent rejected — leave the draft in place so the user can retry
      // without retyping. The textarea also keeps its current value because
      // we don't reset state on failure.
    }
  }

  // "Draft saved 3s ago" style label — purposely vague to avoid implying
  // the server has the text. This is a local browser draft only.
  const savedLabel = (() => {
    if (!savedAt) return null
    const sec = Math.max(0, Math.round((Date.now() - savedAt) / 1000))
    if (sec < 5) return 'Draft saved'
    if (sec < 60) return `Draft saved ${sec}s ago`
    return `Draft saved ${Math.round(sec / 60)}m ago`
  })()

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-lg font-medium text-gray-900">{question.questionText}</p>
        <p className="text-sm text-amber-700 mt-2">
          Maximum {maxWords} words.
        </p>
      </div>

      {language && (
        <SpecialCharactersBar language={language} inputRef={textareaRef} onInsert={setText} />
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder="Start writing your response here..."
          rows={10}
          className={`w-full p-4 border-2 rounded-lg outline-none resize-y transition-colors
            ${isOverMax ? 'border-red-400 focus:border-red-500' :
              wordCount > 0 ? 'border-green-400 focus:border-green-500' :
              'border-gray-200 focus:border-blue-500'}
          `}
        />

        {/* Word counter */}
        <div className={`absolute bottom-3 right-3 text-sm font-medium px-2 py-1 rounded
          ${isOverMax ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-600'}
        `}>
          {wordCount} / {maxWords} words
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-gray-500">
          {savedLabel && (
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <Check className="w-3.5 h-3.5" />
              {savedLabel} · safe to reload
            </span>
          )}
        </div>
        {isOverMax && (
          <p className="text-sm text-red-600">
            Your response exceeds the maximum word count. Please shorten it.
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim() || isOverMax}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Submit Writing
      </button>
    </div>
  )
}
