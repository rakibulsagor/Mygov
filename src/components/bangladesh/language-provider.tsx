'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Language = 'bn' | 'en'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('bn')
  const [hasLoadedPreference, setHasLoadedPreference] = useState(false)

  useEffect(() => {
    if (!hasLoadedPreference) return
    document.documentElement.lang = language
    window.localStorage.setItem('mygov-language', language)
  }, [hasLoadedPreference, language])

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('mygov-language')
    if (savedLanguage === 'bn' || savedLanguage === 'en') setLanguage(savedLanguage)
    setHasLoadedPreference(true)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}