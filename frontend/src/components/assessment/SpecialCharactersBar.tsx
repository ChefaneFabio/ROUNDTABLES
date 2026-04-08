const LANGUAGE_CHARS: Record<string, string[]> = {
  French: ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'ù', 'û', 'ü', 'ï', 'î', 'ô', 'œ', 'æ', '«', '»'],
  Spanish: ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'],
  German: ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'],
  Italian: ['à', 'è', 'é', 'ì', 'ò', 'ù'],
}

interface SpecialCharactersBarProps {
  language: string
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>
  onInsert: (newValue: string) => void
}

export function SpecialCharactersBar({ language, inputRef, onInsert }: SpecialCharactersBarProps) {
  const chars = LANGUAGE_CHARS[language]
  if (!chars || chars.length === 0) return null

  const handleClick = (char: string) => {
    const el = inputRef.current
    if (!el) return

    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? start
    const newValue = el.value.slice(0, start) + char + el.value.slice(end)
    onInsert(newValue)

    // Restore cursor position after React re-render
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + char.length, start + char.length)
    })
  }

  return (
    <div className="flex flex-wrap gap-1.5 py-1.5">
      {chars.map((char) => (
        <button
          key={char}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleClick(char)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 font-medium text-base hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all active:scale-95 select-none"
        >
          {char}
        </button>
      ))}
    </div>
  )
}
