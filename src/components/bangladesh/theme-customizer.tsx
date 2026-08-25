'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, X, RotateCcw } from 'lucide-react'

const STORAGE_KEY = 'bangladesh-portal-accent'

interface AccentTheme {
  id: string
  name: string
  nameEn: string
  primary: string
  primaryLight: string
  primaryDark: string
  swatch: string
}

// Bangladesh flag green is the default; other accent options
const accentThemes: AccentTheme[] = [
  {
    id: 'green',
    name: 'বাংলা সবুজ',
    nameEn: 'Bengal Green',
    primary: 'oklch(0.45 0.13 155)',
    primaryLight: 'oklch(0.55 0.14 155)',
    primaryDark: 'oklch(0.35 0.12 155)',
    swatch: 'bg-[oklch(0.45_0.13_155)]',
  },
  {
    id: 'teal',
    name: 'টিল',
    nameEn: 'Teal',
    primary: 'oklch(0.50 0.11 190)',
    primaryLight: 'oklch(0.60 0.12 190)',
    primaryDark: 'oklch(0.40 0.10 190)',
    swatch: 'bg-[oklch(0.50_0.11_190)]',
  },
  {
    id: 'rose',
    name: 'গোলাপি',
    nameEn: 'Rose',
    primary: 'oklch(0.52 0.18 15)',
    primaryLight: 'oklch(0.62 0.19 15)',
    primaryDark: 'oklch(0.42 0.17 15)',
    swatch: 'bg-[oklch(0.52_0.18_15)]',
  },
  {
    id: 'amber',
    name: 'অম্বর',
    nameEn: 'Amber',
    primary: 'oklch(0.60 0.16 70)',
    primaryLight: 'oklch(0.70 0.17 70)',
    primaryDark: 'oklch(0.50 0.15 70)',
    swatch: 'bg-[oklch(0.60_0.16_70)]',
  },
  {
    id: 'violet',
    name: 'বেগুনি',
    nameEn: 'Violet',
    primary: 'oklch(0.48 0.18 300)',
    primaryLight: 'oklch(0.58 0.19 300)',
    primaryDark: 'oklch(0.38 0.17 300)',
    swatch: 'bg-[oklch(0.48_0.18_300)]',
  },
  {
    id: 'cyan',
    name: 'নীল',
    nameEn: 'Cyan',
    primary: 'oklch(0.55 0.14 210)',
    primaryLight: 'oklch(0.65 0.15 210)',
    primaryDark: 'oklch(0.45 0.13 210)',
    swatch: 'bg-[oklch(0.55_0.14_210)]',
  },
]

function applyAccent(theme: AccentTheme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.style.setProperty('--primary', theme.primary)
  root.style.setProperty('--ring', theme.primary)
  root.style.setProperty('--sidebar-primary', theme.primary)
  root.style.setProperty('--sidebar-ring', theme.primary)
}

function clearAccent() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.style.removeProperty('--primary')
  root.style.removeProperty('--ring')
  root.style.removeProperty('--sidebar-primary')
  root.style.removeProperty('--sidebar-ring')
}

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false)
  // Lazy initializer reads localStorage once on client render (SSR returns 'green')
  const [activeId, setActiveId] = useState(() => {
    if (typeof window === 'undefined') return 'green'
    try {
      return localStorage.getItem(STORAGE_KEY) || 'green'
    } catch {
      return 'green'
    }
  })

  // Apply saved accent on mount (no state update needed)
  useEffect(() => {
    const saved = activeId
    const theme = accentThemes.find((t) => t.id === saved)
    if (theme) {
      applyAccent(theme)
    }
  }, [activeId])

  const selectTheme = useCallback((theme: AccentTheme) => {
    applyAccent(theme)
    setActiveId(theme.id)
    try {
      localStorage.setItem(STORAGE_KEY, theme.id)
      window.dispatchEvent(new CustomEvent('accent-changed'))
    } catch {
      // ignore
    }
  }, [])

  const resetTheme = useCallback(() => {
    clearAccent()
    setActiveId('green')
    try {
      localStorage.removeItem(STORAGE_KEY)
      window.dispatchEvent(new CustomEvent('accent-changed'))
    } catch {
      // ignore
    }
  }, [])

  // Expose toggle globally for the top bar button
  useEffect(() => {
    ;(window as unknown as { __toggleThemeCustomizer?: () => void }).__toggleThemeCustomizer = () => setOpen((o) => !o)
    return () => {
      delete (window as unknown as { __toggleThemeCustomizer?: () => void }).__toggleThemeCustomizer
    }
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[105] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-chart-2/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Palette className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bengali font-bold text-sm">থিম কালার</h3>
                  <p className="text-[10px] text-muted-foreground">Accent Color</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="বন্ধ"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Color grid */}
            <div className="p-4 grid grid-cols-3 gap-3">
              {accentThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => selectTheme(theme)}
                  className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    activeId === theme.id
                      ? 'border-primary shadow-md'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  {/* Color swatch */}
                  <div className={`w-12 h-12 rounded-full ${theme.swatch} flex items-center justify-center shadow-inner`}>
                    {activeId === theme.id && (
                      <Check className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="font-bengali text-xs font-medium">{theme.name}</div>
                    <div className="text-[9px] text-muted-foreground">{theme.nameEn}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
              <button
                onClick={resetTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg hover:bg-accent transition-colors font-bengali"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                ডিফল্টে ফিরুন
              </button>
              <span className="font-bengali text-xs text-muted-foreground">
                নির্বাচিত: <strong className="text-foreground">{accentThemes.find((t) => t.id === activeId)?.name}</strong>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
