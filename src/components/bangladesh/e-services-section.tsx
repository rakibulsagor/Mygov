'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Monitor,
  DollarSign,
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
  Star,
  Sparkles,
  Smartphone,
  Building2,
  LayoutGrid,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Trash2,
  Download,
  Upload,
  GitCompare,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { eServices, govServiceCategories } from '@/data/bangladesh-data'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { useRecentlyViewed } from '@/hooks/use-recently-viewed'
import { useComparison } from '@/hooks/use-comparison'
import { StarRating } from '@/components/bangladesh/star-rating'
import { AggregateRating } from '@/components/bangladesh/aggregate-rating'
import { ServiceDetailModal } from '@/components/bangladesh/service-detail-modal'
import { ComparisonModal } from '@/components/bangladesh/comparison-modal'
import { getServiceDetail } from '@/data/service-details'

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  DollarSign,
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
  Star,
  Sparkles,
  Smartphone,
  Building2,
  LayoutGrid,
}

const categoryIconMap: Record<string, LucideIcon> = {
  Star,
  Sparkles,
  Smartphone,
  Building2,
  LayoutGrid,
}

// Stable id for each service (index-based)
function serviceId(title: string) {
  return `svc-${title}`
}

export function EServicesSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [selectedService, setSelectedService] = useState<{ title: string; titleEn: string; icon: string; sid: string } | null>(null)
  const [compareOpen, setCompareOpen] = useState(false)
  const [compareMsg, setCompareMsg] = useState<string | null>(null)
  const { bookmarks, isBookmarked, toggleBookmark, clearBookmarks, exportBookmarks, importBookmarks } = useBookmarks()
  const { addRecent } = useRecentlyViewed()
  const { compareItems, isInCompare, toggleCompare, clearCompare, maxItems } = useComparison()
  const [importMsg, setImportMsg] = useState<string | null>(null)

  const handleCompareToggle = (sid: string, title: string, titleEn: string, icon: string) => {
    const result = toggleCompare({ id: sid, title, titleEn, icon })
    if (!result.ok && result.error) {
      setCompareMsg(result.error)
      setTimeout(() => setCompareMsg(null), 2500)
    }
  }

  const handleExport = () => {
    const json = exportBookmarks()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bangladesh-portal-bookmarks-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = (ev.target?.result as string) || ''
      const result = importBookmarks(text, 'merge')
      if (result.ok) {
        setImportMsg(`${result.count} টি সেবা সফলভাবে ইম্পোর্ট হয়েছে`)
      } else {
        setImportMsg(result.error || 'ইম্পোর্ট ব্যর্থ')
      }
      setTimeout(() => setImportMsg(null), 3000)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  // Build display list: if favorites tab (index 5), show bookmarked services
  const isFavoritesTab = activeCategory === govServiceCategories.length
  const displayedServices = useMemo(() => {
    if (isFavoritesTab) {
      // Show services that are bookmarked
      return eServices.filter((s) => isBookmarked(serviceId(s.title)))
    }
    return showAll ? eServices : eServices.slice(0, 12)
  }, [isFavoritesTab, showAll, isBookmarked])

  const bookmarkCount = bookmarks.length

  return (
    <section id="e-services" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium font-bengali mb-3">
              ই-সেবাসমূহ
            </span>
            <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
              সরকারি সেবাসমূহ
            </h2>
            <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
              অনলাইনে সহজেই গ্রহণ করুন সরকারি সেবা — ঘরে বসেই সকল প্রয়োজনীয় সেবা
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {govServiceCategories.map((cat, i) => {
            const Icon = categoryIconMap[cat.icon] || Star
            return (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all font-bengali ${
                  activeCategory === i
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card text-foreground hover:bg-accent border border-border'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.title}
              </button>
            )
          })}
          {/* Favorites tab */}
          <button
            onClick={() => setActiveCategory(govServiceCategories.length)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all font-bengali relative ${
              isFavoritesTab
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                : 'bg-card text-foreground hover:bg-accent border border-border'
            }`}
          >
            <BookmarkCheck className="h-4 w-4" />
            প্রিয় সেবা
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-chart-2 text-white text-[10px] font-bold flex items-center justify-center">
                {bookmarkCount > 9 ? '9+' : bookmarkCount}
              </span>
            )}
          </button>
        </div>

        {/* Favorites tab — empty state or clear button */}
        {isFavoritesTab && (
          <div className="mb-6">
            {bookmarkCount === 0 ? (
              <div className="text-center py-8 bg-card rounded-2xl border border-dashed border-border">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 mb-3">
                  <Bookmark className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="font-bengali text-lg font-bold mb-1">এখনো কোন সেবা যোগ করা হয়নি</h3>
                <p className="font-bengali text-sm text-muted-foreground max-w-md mx-auto">
                  সেবার কার্ডে থাকা <Star className="inline h-3.5 w-3.5 text-amber-500" /> আইকনে ক্লিক করে
                  আপনার প্রিয় সেবাসমূহ এখানে সংরক্ষণ করুন।
                </p>
              </div>
            ) : (
              bookmarkCount > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-4 py-2 bg-amber-500/5 rounded-xl border border-amber-500/20 flex-wrap gap-2">
                    <p className="font-bengali text-sm text-amber-700 dark:text-amber-400">
                      আপনার সংরক্ষিত সেবা: <strong>{bookmarkCount}</strong> টি
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={handleExport}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-card hover:bg-primary/10 hover:text-primary border border-border transition-colors font-bengali"
                        title="বুকমার্ক এক্সপোর্ট করুন"
                      >
                        <Download className="h-3.5 w-3.5" />
                        এক্সপোর্ট
                      </button>
                      <label
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-card hover:bg-primary/10 hover:text-primary border border-border transition-colors font-bengali cursor-pointer"
                        title="বুকমার্ক ইম্পোর্ট করুন"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        ইম্পোর্ট
                        <input
                          type="file"
                          accept="application/json,.json"
                          onChange={handleImport}
                          className="hidden"
                        />
                      </label>
                      <button
                        onClick={clearBookmarks}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-card hover:bg-destructive/10 hover:text-destructive border border-border transition-colors font-bengali"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        সব মুছুন
                      </button>
                    </div>
                  </div>
                  {importMsg && (
                    <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="font-bengali text-sm text-green-700 dark:text-green-400">
                        ✓ {importMsg}
                      </p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}

        {/* Services grid */}
        {(!isFavoritesTab || bookmarkCount > 0) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {displayedServices.map((service, i) => {
                const Icon = iconMap[service.icon] || Monitor
                const sid = serviceId(service.title)
                const bookmarked = isBookmarked(sid)
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.03 }}
                    className="group relative bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* New badge */}
                    {service.category === 'new' && (
                      <span className="absolute top-2 right-2 z-10 px-1.5 py-0.5 text-[10px] font-bold bg-chart-2 text-white rounded-full">
                        NEW
                      </span>
                    )}

                    {/* Bookmark star */}
                    {!bookmarked && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleBookmark({
                            id: sid,
                            title: service.title,
                            titleEn: service.titleEn,
                            icon: service.icon,
                            href: service.href,
                          })
                        }}
                        className="absolute top-2 left-2 z-10 w-7 h-7 rounded-lg bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-amber-500/20 hover:text-amber-500 flex items-center justify-center transition-all"
                        aria-label="প্রিয় সেবায় যোগ করুন"
                        title="প্রিয় সেবায় যোগ করুন"
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                      </button>
                    )}
                    {bookmarked && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleBookmark({
                            id: sid,
                            title: service.title,
                            titleEn: service.titleEn,
                            icon: service.icon,
                            href: service.href,
                          })
                        }}
                        className="absolute top-2 left-2 z-10 w-7 h-7 rounded-lg bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 flex items-center justify-center transition-all"
                        aria-label="প্রিয় সেবা থেকে সরান"
                        title="প্রিয় সেবা থেকে সরান"
                      >
                        <BookmarkCheck className="h-3.5 w-3.5 fill-current" />
                      </button>
                    )}

                    {/* Compare button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleCompareToggle(sid, service.title, service.titleEn, service.icon)
                      }}
                      className={`absolute top-2 left-11 z-10 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        isInCompare(sid)
                          ? 'bg-violet-500/20 text-violet-500'
                          : 'bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-violet-500/20 hover:text-violet-500'
                      }`}
                      aria-label="তুলনা করুন"
                      title="তুলনা তালিকায় যোগ করুন"
                    >
                      <GitCompare className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedService({
                          title: service.title,
                          titleEn: service.titleEn,
                          icon: service.icon,
                          sid,
                        })
                      }
                      className="block p-4 md:p-5 text-center w-full"
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className="relative">
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 mb-3 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-chart-2/20 transition-all">
                          <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                        </div>
                        <h3 className="font-bengali text-sm md:text-base font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-tight mb-2">
                          {service.titleEn}
                        </p>
                        {/* Star rating */}
                        <div onClick={(e) => e.preventDefault()} className="flex flex-col items-center gap-1">
                          <StarRating serviceId={sid} size="sm" />
                          <AggregateRating serviceId={sid} size="sm" />
                        </div>
                      </div>

                      {/* Arrow icon on hover */}
                      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      </div>
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Show more / less — only for non-favorites tab */}
        {!isFavoritesTab && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="font-bengali gap-2 rounded-full px-8"
            >
              {showAll ? 'কম দেখুন' : 'আরো দেখুন'}
              <span className="text-lg">{showAll ? '↑' : '↓'}</span>
            </Button>
          </div>
        )}

        {/* Service detail modal */}
        <ServiceDetailModal
          service={selectedService ? getServiceDetail(selectedService.sid, selectedService.title, selectedService.titleEn, selectedService.icon) : null}
          onClose={() => setSelectedService(null)}
        />

        {/* Comparison modal */}
        <ComparisonModal
          open={compareOpen}
          services={compareItems.map((c) => getServiceDetail(c.id, c.title, c.titleEn, c.icon))}
          onClose={() => setCompareOpen(false)}
        />

        {/* Comparison floating bar */}
        <AnimatePresence>
          {compareItems.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl"
            >
              <div className="bg-card rounded-2xl border border-border shadow-2xl p-3 flex items-center gap-3">
                {/* Items */}
                <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto">
                  {compareItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 flex-shrink-0"
                    >
                      <span className="font-bengali text-xs font-medium truncate max-w-[100px]">{item.title}</span>
                      <button
                        onClick={() => toggleCompare(item)}
                        className="w-4 h-4 rounded hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
                        aria-label="সরান"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Compare button */}
                <Button
                  size="sm"
                  onClick={() => setCompareOpen(true)}
                  disabled={compareItems.length < 2}
                  className="font-bengali gap-1.5 flex-shrink-0"
                >
                  <GitCompare className="h-4 w-4" />
                  তুলনা করুন ({compareItems.length}/{maxItems})
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compare message toast */}
        <AnimatePresence>
          {compareMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-bengali shadow-lg"
            >
              {compareMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
