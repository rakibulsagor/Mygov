'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Search,
  Map as MapIcon,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import {
  BarChart3,
  Flag,
  LayoutGrid,
  BrainCircuit,
  CloudSun,
  Building2,
  Phone,
  Newspaper,
  HelpCircle,
  Image as ImageIcon,
  Landmark,
  Map,
  MapPin,
  Navigation,
  Users,
  Bird,
  Flower,
  Star,
  Music,
  BookOpen,
  Monitor,
  FileText,
  GraduationCap,
  Plane,
  Receipt,
  Calculator,
  HeartPulse,
  MessageSquare,
  PenTool,
  Languages,
  Search as SearchIcon,
  Mic,
  Clock,
  Megaphone,
  Briefcase,
  Gavel,
} from 'lucide-react'
import { CurrencyTaka } from '@/components/ui/currency-taka'
import { sitemapData, type SitemapNode } from '@/data/sitemap-data'

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Flag,
  LayoutGrid,
  BrainCircuit,
  CloudSun,
  Building2,
  Phone,
  Newspaper,
  HelpCircle,
  Image: ImageIcon,
  Landmark,
  Map,
  MapPin,
  Navigation,
  Users,
  Bird,
  Flower,
  Star,
  Music,
  BookOpen,
  Monitor,
  DollarSign: CurrencyTaka,
  FileText,
  GraduationCap,
  Plane,
  Receipt,
  Calculator,
  HeartPulse,
  MessageSquare,
  PenTool,
  Languages,
  Search: SearchIcon,
  Mic,
  Clock,
  Megaphone,
  Briefcase,
  Gavel,
}

interface SitemapModalProps {
  open: boolean
  onClose: () => void
}

export function SitemapModal({ open, onClose }: SitemapModalProps) {
  const [query, setQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Filter sitemap based on search
  const filtered = useMemo(() => {
    if (!query.trim()) return sitemapData
    const q = query.toLowerCase()
    return sitemapData
      .map((node) => {
        const matchNode =
          node.label.toLowerCase().includes(q) ||
          node.labelEn.toLowerCase().includes(q)
        const matchingChildren = node.children?.filter(
          (child) =>
            child.label.toLowerCase().includes(q) ||
            child.labelEn.toLowerCase().includes(q)
        )
        if (matchNode || (matchingChildren && matchingChildren.length > 0)) {
          return {
            ...node,
            children: matchingChildren || node.children,
          }
        }
        return null
      })
      .filter(Boolean) as SitemapNode[]
  }, [query])

  const handleNavigate = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    onClose()
  }

  // Expose toggle globally
  useEffect(() => {
    ;(window as unknown as { __toggleSitemap?: () => void }).__toggleSitemap = () => {
      // Use a custom event to toggle from outside
      window.dispatchEvent(new CustomEvent('toggle-sitemap-modal'))
    }
    return () => {
      delete (window as unknown as { __toggleSitemap?: () => void }).__toggleSitemap
    }
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[105] flex items-start justify-center p-4 pt-[8vh]"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[80vh] overflow-hidden bg-card rounded-2xl border border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-chart-2/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <MapIcon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-bengali font-bold text-base">সাইট ম্যাপ</h2>
                  <p className="text-[10px] text-muted-foreground">Sitemap — সকল বিভাগ ও সেবা</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-border flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="বিভাগ বা সেবা খুঁজুন..."
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border-0 text-sm font-bengali focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Sitemap tree */}
            <div className="overflow-y-auto p-3 flex-1">
              <div className="space-y-1.5">
                {filtered.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-2">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-bengali text-sm text-muted-foreground">
                      "{query}" এর জন্য কোন ফলাফল নেই
                    </p>
                  </div>
                ) : (
                  filtered.map((node) => {
                    const Icon = iconMap[node.icon] || LayoutGrid
                    const hasChildren = node.children && node.children.length > 0
                    const isExpanded = expandedId === node.id || !!query.trim()
                    return (
                      <div key={node.id} className="rounded-lg border border-border overflow-hidden">
                        {/* Parent node */}
                        <div className="flex items-center">
                          <button
                            onClick={() => handleNavigate(node.href)}
                            className="flex items-center gap-2.5 flex-1 p-3 hover:bg-accent transition-colors text-right group"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0 text-right">
                              <div className="font-bengali text-sm font-medium group-hover:text-primary transition-colors">
                                {node.label}
                              </div>
                              <div className="text-[10px] text-muted-foreground">{node.labelEn}</div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                          {hasChildren && (
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : node.id)}
                              className="px-3 py-3 border-r border-border hover:bg-accent transition-colors"
                              aria-label={isExpanded ? 'সংকুচিত করুন' : 'প্রসারিত করুন'}
                            >
                              <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </motion.div>
                            </button>
                          )}
                        </div>

                        {/* Children */}
                        <AnimatePresence initial={false}>
                          {isExpanded && hasChildren && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden border-t border-border bg-muted/20"
                            >
                              <div className="p-2 space-y-0.5">
                                {node.children!.map((child) => {
                                  const ChildIcon = iconMap[child.icon] || FileText
                                  return (
                                    <button
                                      key={child.id}
                                      onClick={() => handleNavigate(child.href)}
                                      className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-accent transition-colors text-right group"
                                    >
                                      <div className="flex-shrink-0 w-6 h-6 rounded bg-card flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ChildIcon className="h-3 w-3 text-muted-foreground" />
                                      </div>
                                      <div className="flex-1 min-w-0 text-right">
                                        <span className="font-bengali text-xs font-medium group-hover:text-primary transition-colors">
                                          {child.label}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground mr-2">
                                          {child.labelEn}
                                        </span>
                                      </div>
                                    </button>
                                  )
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-border bg-muted/30 flex items-center justify-between flex-shrink-0">
              <span className="font-bengali text-xs text-muted-foreground">
                {filtered.length} টি বিভাগ
              </span>
              <span className="font-bengali text-xs text-muted-foreground">
                বাংলাদেশ জাতীয় তথ্য বাতায়ন
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
