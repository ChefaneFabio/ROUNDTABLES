import { createContext, useContext, useState, ReactNode } from 'react'

type UILanguage = 'en' | 'it'

interface LanguageContextType {
  lang: UILanguage
  setLang: (lang: UILanguage) => void
  t: (en: string, it: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (en) => en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<UILanguage>(() => {
    const saved = localStorage.getItem('uiLanguage')
    return (saved === 'it' ? 'it' : 'en') as UILanguage
  })

  const setLang = (l: UILanguage) => {
    setLangState(l)
    localStorage.setItem('uiLanguage', l)
  }

  const t = (en: string, it: string) => (lang === 'it' ? it : en)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
