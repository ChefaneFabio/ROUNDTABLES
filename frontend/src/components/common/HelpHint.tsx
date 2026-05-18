import { useEffect, useRef, useState } from 'react'
import { HelpCircle, X } from 'lucide-react'

interface HelpHintProps {
  title?: string
  /** Body content. Use \n for new paragraphs. */
  children: React.ReactNode
  /** Tailwind size class for the icon (default w-4 h-4). */
  iconClass?: string
  /** Horizontal position of the popover relative to the icon. */
  side?: 'left' | 'right' | 'center'
  /** Override the icon color (Tailwind classes). */
  triggerClass?: string
  /** Optional label rendered next to the icon (e.g. "What is this?"). */
  label?: string
}

/**
 * HelpHint — a "?" icon that opens a small popover with contextual help text.
 *
 * Designed to be sprinkled next to headings, buttons, or form fields anywhere
 * a Maka user, HR contact, or learner might pause and wonder what something
 * does. Click to open, click outside or press Esc to close. No external lib.
 */
export function HelpHint({
  title,
  children,
  iconClass = 'w-4 h-4',
  side = 'right',
  triggerClass = 'text-gray-400 hover:text-indigo-600',
  label,
}: HelpHintProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const sideClass =
    side === 'left' ? 'right-0' :
    side === 'center' ? 'left-1/2 -translate-x-1/2' :
    'left-0'

  return (
    <div ref={ref} className="relative inline-flex items-center align-middle">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={title || 'Help'}
        aria-expanded={open}
        className={`inline-flex items-center gap-1 ${triggerClass} transition-colors`}
      >
        <HelpCircle className={iconClass} />
        {label && <span className="text-xs underline-offset-2 hover:underline">{label}</span>}
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 ${sideClass} z-50 w-72 max-w-[90vw] rounded-lg border border-gray-200 bg-white shadow-xl text-left`}
          role="dialog"
        >
          <div className="flex items-start justify-between px-4 py-2.5 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{title || 'Help'}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 -mr-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="px-4 py-3 text-xs text-gray-600 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
