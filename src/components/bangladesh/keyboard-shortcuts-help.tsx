'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Keyboard,
  Search,
  Phone,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  RotateCcw,
  HelpCircle,
} from 'lucide-react'

interface Shortcut {
  keys: string[]
  label: string
  labelEn: string
  description: string
  icon: typeof Search
}

const shortcuts: Shortcut[] = [
  {
    keys: ['Ctrl', 'K'],
    label: 'সার্চ খুলুন',
    labelEn: 'Open Search',
    description: 'সেবা, মন্ত্রণালয়, জরুরি নম্বর সার্চ করুন',
    icon: Search,
  },
  {
    keys: ['?'],
    label: 'শর্টকাট দেখুন',
    labelEn: 'Show Shortcuts',
    description: 'এই সাহায্য ডায়ালগ খুলুন',
    icon: Keyboard,
  },
  {
    keys: ['↑'],
    label: 'পূর্ববর্তী ফলাফল',
    labelEn: 'Previous result',
    description: 'সার্চ ফলাফলে উপরে যান',
    icon: ArrowUp,
  },
  {
    keys: ['↓'],
    label: 'পরবর্তী ফলাফল',
    labelEn: 'Next result',
    description: 'সার্চ ফলাফলে নিচে যান',
    icon: ArrowDown,
  },
  {
    keys: ['↵'],
    label: 'নির্বাচন করুন',
    labelEn: 'Select',
    description: 'নির্বাচিত সার্চ ফলাফলে যান',
    icon: CornerDownLeft,
  },
  {
    keys: ['Esc'],
    label: 'বন্ধ করুন',
    labelEn: 'Close',
    description: 'মডাল বা ডায়ালগ বন্ধ করুন',
    icon: X,
  },
]

export function KeyboardShortcutsHelp() {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => setOpen((o) => !o), [])

  // Global '?' shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Only trigger '?' when not typing in an input
      const target = e.target as HTMLElement
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      if (isInput) return

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Expose toggle globally for the floating help button
  useEffect(() => {
    ;(window as unknown as { __toggleShortcutsHelp?: () => void }).__toggleShortcutsHelp = toggle
    return () => {
      delete (window as unknown as { __toggleShortcutsHelp?: () => void }).__toggleShortcutsHelp
    }
  }, [toggle])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[105] flex items-start justify-center p-4 pt-[12vh]"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-chart-2/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Keyboard className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bengali font-bold text-sm">কীবোর্ড শর্টকাট</h3>
                  <p className="text-[10px] text-muted-foreground">Keyboard Shortcuts</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Shortcuts list */}
            <div className="p-3 space-y-1">
              {shortcuts.map((sc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <sc.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bengali text-sm font-medium">{sc.label}</div>
                    <div className="text-[11px] text-muted-foreground font-bengali">
                      {sc.description}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {sc.keys.map((key, ki) => (
                      <span key={ki} className="flex items-center gap-1">
                        {ki > 0 && <span className="text-muted-foreground text-xs">+</span>}
                        <kbd className="px-2 py-1 rounded-md bg-muted border border-border text-xs font-mono font-bold min-w-[24px] text-center">
                          {key}
                        </kbd>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border bg-muted/30 text-center">
              <p className="font-bengali text-xs text-muted-foreground">
                টিপ: ইনপুট ফিল্ডে টাইপ করার সময় শর্টকাট কাজ করবে না
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
