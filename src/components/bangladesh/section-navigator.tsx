'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  Flag,
  LayoutGrid,
  BrainCircuit,
  CloudSun,
  Building2,
  Phone,
  Link2,
  Globe,
  Image as ImageIcon,
  Newspaper,
  X,
  type LucideIcon,
} from 'lucide-react'

interface NavSection {
  id: string
  label: string
  labelEn: string
  icon: LucideIcon
}

const sections: NavSection[] = [
  { id: 'statistics', label: 'পরিসংখ্যান', labelEn: 'Stats', icon: BarChart3 },
  { id: 'national-identity', label: 'জাতীয় পরিচয়', labelEn: 'Identity', icon: Flag },
  { id: 'e-services', label: 'ই-সেবা', labelEn: 'E-Services', icon: LayoutGrid },
  { id: 'ai-tools', label: 'এআই টুলস', labelEn: 'AI Tools', icon: BrainCircuit },
  { id: 'live-widgets', label: 'লাইভ তথ্য', labelEn: 'Live', icon: CloudSun },
  { id: 'ministries', label: 'মন্ত্রণালয়', labelEn: 'Ministries', icon: Building2 },
  { id: 'emergency', label: 'জরুরি', labelEn: 'Emergency', icon: Phone },
  { id: 'quick-links', label: 'দ্রুত লিংক', labelEn: 'Quick', icon: Link2 },
  { id: 'news', label: 'বিজ্ঞপ্তি', labelEn: 'News', icon: Newspaper },
  { id: 'portal-directory', label: 'বাতায়ন', labelEn: 'Directory', icon: Globe },
  { id: 'gallery', label: 'গ্যালারি', labelEn: 'Gallery', icon: ImageIcon },
]

export function SectionNavigator() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)

  // Show navigator after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll spy - detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setExpanded(false)
    }
  }

  const activeIndex = sections.findIndex((s) => s.id === activeSection)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        >
          {/* Expanded panel */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="absolute left-12 top-1/2 -translate-y-1/2 bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-center justify-between px-2 py-1.5 mb-1">
                    <span className="text-xs font-bold text-muted-foreground font-bengali">
                      বিভাগসমূহ
                    </span>
                    <button
                      onClick={() => setExpanded(false)}
                      className="w-5 h-5 rounded hover:bg-muted flex items-center justify-center"
                      aria-label="বন্ধ করুন"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="space-y-0.5 max-h-[60vh] overflow-y-auto">
                    {sections.map((section, i) => {
                      const isActive = section.id === activeSection
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors font-bengali text-right ${
                            isActive
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-muted text-foreground'
                          }`}
                        >
                          <span className={`text-[10px] tabular-nums w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <section.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="flex-1">{section.label}</span>
                          {isActive && (
                            <motion.span
                              layoutId="nav-dot"
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vertical dot tracker */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative flex flex-col items-center gap-1.5 p-2 bg-card/90 backdrop-blur-md border border-border rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="বিভাগ নেভিগেটর"
          >
            {/* Progress line */}
            <div className="absolute left-1/2 top-2 bottom-2 w-px bg-border -translate-x-1/2" />
            <motion.div
              className="absolute left-1/2 top-2 w-px bg-primary -translate-x-1/2"
              animate={{
                height: `${((activeIndex + 1) / sections.length) * 100}%`,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              style={{ maxHeight: 'calc(100% - 16px)' }}
            />

            {sections.map((section) => {
              const isActive = section.id === activeSection
              return (
                <div
                  key={section.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    scrollToSection(section.id)
                  }}
                  className="relative group cursor-pointer"
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive
                        ? 'bg-primary scale-150'
                        : 'bg-muted-foreground/40 hover:bg-muted-foreground'
                    }`}
                  />
                  {/* Tooltip */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap font-bengali">
                      {section.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
