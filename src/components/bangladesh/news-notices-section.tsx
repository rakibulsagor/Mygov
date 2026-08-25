'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Megaphone,
  FileText,
  Newspaper,
  Briefcase,
  Gavel,
  ArrowUpRight,
  Clock,
  AlertCircle,
  Sparkles,
  Calendar,
  Building2,
  Bell,
} from 'lucide-react'
import { newsItems, newsCategories, type NewsItem } from '@/data/news-data'
import { Button } from '@/components/ui/button'
import { ShareButton } from '@/components/bangladesh/share-button'

const categoryConfig: Record<
  string,
  { icon: typeof Megaphone; color: string; bg: string; border: string }
> = {
  notice: { icon: Megaphone, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  circular: { icon: FileText, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  news: { icon: Newspaper, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  job: { icon: Briefcase, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  tender: { icon: Gavel, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const config = categoryConfig[item.category] || categoryConfig.notice
  const Icon = config.icon

  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04 }}
      className={`group relative block bg-card rounded-2xl border ${config.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${config.bg.replace('/10', '/60')}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${config.bg}`}>
              <Icon className={`h-4.5 w-4.5 ${config.color}`} />
            </div>
            <div>
              <span className={`text-xs font-bold ${config.color} font-bengali`}>
                {item.categoryBn}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-2.5 w-2.5" />
                {item.dateBn}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {item.isUrgent && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold bg-destructive/15 text-destructive rounded-full font-bengali">
                <AlertCircle className="h-2.5 w-2.5" />
                জরুরি
              </span>
            )}
            {item.isNew && (
              <span className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold bg-chart-2 text-white rounded-full">
                <Sparkles className="h-2.5 w-2.5" />
                নতুন
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bengali text-sm md:text-base font-bold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="font-bengali text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">
          {item.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/60">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground min-w-0">
            <Building2 className="h-3 w-3 flex-shrink-0" />
            <span className="font-bengali truncate">{item.sourceBn}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <ShareButton
              title={item.title}
              text={item.excerpt}
              variant="icon"
              size="sm"
            />
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export function NewsNoticesSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return newsItems
    return newsItems.filter((n) => n.category === activeCategory)
  }, [activeCategory])

  const displayed = showAll ? filtered : filtered.slice(0, 6)

  const urgentCount = newsItems.filter((n) => n.isUrgent).length
  const newCount = newsItems.filter((n) => n.isNew).length

  return (
    <section id="news" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="relative text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-chart-2/10 text-chart-2 text-sm font-medium font-bengali mb-3">
              <Megaphone className="h-3.5 w-3.5" />
              বিজ্ঞপ্তি ও সংবাদ
            </span>
            <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
              সরকারি বিজ্ঞপ্তি ও সংবাদসমূহ
            </h2>
            <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
              সরকারি নোটিশ, প্রজ্ঞাপন, নিয়োগ বিজ্ঞপ্তি, টেন্ডার ও সর্বশেষ সংবাদ
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-chart-2 to-chart-5 rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => {
              const toggle = (window as unknown as { __toggleNotificationPrefs?: () => void }).__toggleNotificationPrefs
              toggle?.()
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
            title="বিজ্ঞপ্তি পছন্দ নির্ধারণ করুন"
          >
            <Bell className="h-4 w-4 text-primary" />
            <span className="font-bengali text-sm font-medium text-primary">
              বিজ্ঞপ্তি পছন্দ
            </span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/5 border border-destructive/15">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="font-bengali text-sm font-medium text-destructive">
              জরুরি বিজ্ঞপ্তি: <strong>{urgentCount}</strong> টি
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-chart-2/5 border border-chart-2/15">
            <Sparkles className="h-4 w-4 text-chart-2" />
            <span className="font-bengali text-sm font-medium text-chart-2">
              নতুন: <strong>{newCount}</strong> টি
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/15">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-bengali text-sm font-medium text-primary">
              মোট: <strong>{newsItems.length}</strong> টি
            </span>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {newsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setShowAll(false)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all font-bengali ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card text-foreground hover:bg-accent border border-border'
              }`}
            >
              {cat.label}
              {cat.id !== 'all' && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({newsItems.filter((n) => n.category === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayed.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
              <Newspaper className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="font-bengali text-sm text-muted-foreground">
              এই বিভাগে কোন বিজ্ঞপ্তি নেই
            </p>
          </div>
        )}

        {/* Show more / less */}
        {filtered.length > 6 && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="font-bengali gap-2 rounded-full px-8"
            >
              {showAll ? 'কম দেখুন' : `আরো দেখুন (${filtered.length - 6})`}
              <span className="text-lg">{showAll ? '↑' : '↓'}</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
