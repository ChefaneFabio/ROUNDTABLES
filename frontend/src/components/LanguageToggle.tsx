import { useLanguage } from '../contexts/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'it' : 'en')}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors shadow-sm"
      title={lang === 'en' ? 'Switch to Italian' : 'Passa all\'inglese'}
    >
      <span className="text-sm">{lang === 'en' ? '\u{1F1EC}\u{1F1E7}' : '\u{1F1EE}\u{1F1F9}'}</span>
      <span className="text-gray-700">{lang === 'en' ? 'EN' : 'IT'}</span>
    </button>
  )
}
