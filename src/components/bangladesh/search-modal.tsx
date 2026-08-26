'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  X,
  ArrowRight,
  CornerDownLeft,
  Search as SearchIcon,
  Clock,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { CurrencyTaka } from '@/components/ui/currency-taka'
import { searchPortal, type SearchEntry } from '@/data/search-index'
import {
  Monitor,
  FileText,
  GraduationCap,
  ClipboardCheck,
  Wheat,
  Briefcase,
  Plane,
  School,
  Receipt,
  Award,
  Database,
  BookOpen,
  Calculator,
  Car,
  Package,
  HelpCircle,
  Ticket,
  HeartPulse,
  Landmark,
  FileCheck,
  Fish,
  Radio,
  BrainCircuit,
  Wallet,
  TrendingUp as TrendingUpIcon,
  CloudSun,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  DollarSign: CurrencyTaka,
  FileText,
  GraduationCap,
  ClipboardCheck,
  Wheat,
  Briefcase,
  Plane,
  School,
  Receipt,
  Award,
  Database,
  BookOpen,
  Calculator,
  Car,
  Package,
  HelpCircle,
  Ticket,
  HeartPulse,
  Landmark,
  FileCheck,
  Fish,
  Radio,
  BrainCircuit,
  Wallet,
  TrendingUp: TrendingUpIcon,
  CloudSun,
}

const categoryColors: Record<string, string> = {
  'e-service': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  emergency: 'bg-red-500/10 text-red-600 dark:text-red-400',
  'quick-link': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  section: 'bg-green-500/10 text-green-600 dark:text-green-400',
  ministry: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
}

const popularSearches = ['পাসপোর্ট', 'আয়কর', 'ভিসা', 'নিয়োগ', 'বিদ্যুৎ বিল']

interface SearchModalProps {
  open: boolean
  onClose: () => void
  initialQuery?: string
}

function SearchModalContent({ onClose, initialQuery = '' }: { onClose: () => void; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Derived results from query (no state)
  const results = useMemo(() => {
    const q = query.trim()
    return q ? searchPortal(query) : []
  }, [query])

  // Clamp activeIndex if out of range
  const safeActiveIndex = results.length === 0 ? 0 : Math.min(activeIndex, results.length - 1)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Handle selecting a search entry
  const handleSelect = useCallback(
    (entry: SearchEntry) => {
      if (entry.href.startsWith('#')) {
        const el = document.querySelector(entry.href)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.open(entry.href, '_blank')
      }
      onClose()
    },
    [onClose]
  )

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && results[safeActiveIndex]) {
        e.preventDefault()
        handleSelect(results[safeActiveIndex])
      } else if (e.key === 'Escape') {
        onClose()
      }
    },
    [results, safeActiveIndex, handleSelect, onClose]
  )

  // Scroll active item into view
  useEffect(() => {
    const el = resultsRef.current?.querySelector(`[data-idx="${safeActiveIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [safeActiveIndex])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] sm:pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
      >
            {/* Search input */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <SearchIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="সেবা, মন্ত্রণালয়, জরুরি নম্বর খুঁজুন..."
                className="flex-1 bg-transparent border-0 outline-none text-lg font-bengali text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground font-mono">
                ESC
              </kbd>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results / Suggestions */}
            <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto">
              {query.trim() === '' ? (
                /* Empty state - popular searches */
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3 font-bengali">
                    <TrendingUp className="h-3.5 w-3.5" />
                    জনপ্রিয় অনুসন্ধান
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-lg bg-muted hover:bg-accent text-sm font-bengali transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: 'ই-সেবা', icon: FileText, color: 'text-violet-500' },
                      { label: 'জরুরি', icon: HeartPulse, color: 'text-red-500' },
                      { label: 'মন্ত্রণালয়', icon: Landmark, color: 'text-amber-500' },
                      { label: 'এআই টুলস', icon: BrainCircuit, color: 'text-purple-500' },
                    ].map((cat) => (
                      <button
                        key={cat.label}
                        onClick={() => setQuery(cat.label)}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border hover:bg-accent transition-colors"
                      >
                        <cat.icon className={`h-5 w-5 ${cat.color}`} />
                        <span className="text-xs font-bengali">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                /* No results */
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="font-bengali text-sm text-muted-foreground mb-1">
                    "{query}" এর জন্য কোন ফলাফল নেই
                  </p>
                  <p className="font-bengali text-xs text-muted-foreground">
                    অন্য শব্দ দিয়ে চেষ্টা করুন অথবা ৩৩৩ নম্বরে কল করুন
                  </p>
                </div>
              ) : (
                /* Results list */
                <div className="p-2">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground font-bengali">
                    {results.length} টি ফলাফল পাওয়া গেছে
                  </div>
                  {results.map((entry, i) => {
                    const Icon = entry.icon ? iconMap[entry.icon] : Search
                    const isActive = i === activeIndex
                    return (
                      <button
                        key={entry.id}
                        data-idx={i}
                        onClick={() => handleSelect(entry)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                          isActive ? 'bg-accent' : 'hover:bg-accent/50'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${categoryColors[entry.category] || 'bg-muted'}`}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bengali text-sm font-medium truncate">
                            {entry.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {entry.titleEn}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`hidden sm:inline-block px-2 py-0.5 text-[10px] rounded-full font-bengali ${categoryColors[entry.category] || 'bg-muted'}`}>
                            {entry.categoryBn}
                          </span>
                          {isActive && (
                            <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/30 text-xs text-muted-foreground">
              <div className="flex items-center gap-3 font-bengali">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono">↑↓</kbd>
                  নেভিগেট
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono">↵</kbd>
                  নির্বাচন
                </span>
              </div>
              <span className="font-bengali">বাংলাদেশ জাতীয় তথ্য বাতায়ন</span>
            </div>
      </motion.div>
    </div>
  )
}

export function SearchModal({ open, onClose, initialQuery = '' }: SearchModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <SearchModalContent key="search-content" onClose={onClose} initialQuery={initialQuery} />
      )}
    </AnimatePresence>
  )
}
