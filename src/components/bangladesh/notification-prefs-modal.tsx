'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Bell,
  BellOff,
  Mail,
  Phone,
  Check,
  Megaphone,
  FileText,
  Newspaper,
  Briefcase,
  Gavel,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react'
import { useNotifications, type NotificationCategory } from '@/hooks/use-notifications'
import { newsCategories } from '@/data/news-data'

const categoryConfig: Record<
  NotificationCategory,
  { icon: LucideIcon; label: string; labelEn: string; color: string; desc: string }
> = {
  notice: { icon: Megaphone, label: 'নোটিশ', labelEn: 'Notices', color: 'text-blue-600', desc: 'সরকারি নোটিশ ও বিজ্ঞপ্তি' },
  circular: { icon: FileText, label: 'প্রজ্ঞাপন', labelEn: 'Circulars', color: 'text-purple-600', desc: 'প্রজ্ঞাপন ও সংশোধনী' },
  news: { icon: Newspaper, label: 'সংবাদ', labelEn: 'News', color: 'text-green-600', desc: 'সরকারি সংবাদ ও ঘোষণা' },
  job: { icon: Briefcase, label: 'নিয়োগ', labelEn: 'Jobs', color: 'text-amber-600', desc: 'সরকারি নিয়োগ বিজ্ঞপ্তি' },
  tender: { icon: Gavel, label: 'টেন্ডার', labelEn: 'Tenders', color: 'text-rose-600', desc: 'টেন্ডার ও দরপত্র' },
}

interface NotificationPrefsModalProps {
  open: boolean
  onClose: () => void
}

export function NotificationPrefsModal({ open, onClose }: NotificationPrefsModalProps) {
  const { prefs, setEnabled, toggleCategory, setContact, reset, enabledCategories } = useNotifications()
  const [savedMsg, setSavedMsg] = useState(false)

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

  // Expose toggle globally
  useEffect(() => {
    ;(window as unknown as { __toggleNotificationPrefs?: () => void }).__toggleNotificationPrefs = () => {
      window.dispatchEvent(new CustomEvent('toggle-notifications-modal'))
    }
    return () => {
      delete (window as unknown as { __toggleNotificationPrefs?: () => void }).__toggleNotificationPrefs
    }
  }, [])

  const handleToggleCategory = (cat: NotificationCategory) => {
    toggleCategory(cat)
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 1500)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[105] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[85vh] overflow-hidden bg-card rounded-2xl border border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-chart-2/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-bengali font-bold text-base">বিজ্ঞপ্তি পছন্দ</h2>
                  <p className="text-[10px] text-muted-foreground">Notification Preferences</p>
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

            {/* Content */}
            <div className="overflow-y-auto p-4 space-y-4 flex-1">
              {/* Master toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2">
                  {prefs.enabled ? (
                    <Bell className="h-5 w-5 text-primary" />
                  ) : (
                    <BellOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <div className="font-bengali text-sm font-semibold">
                      {prefs.enabled ? 'বিজ্ঞপ্তি চালু' : 'বিজ্ঞপ্তি বন্ধ'}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-bengali">
                      {prefs.enabled ? 'নতুন বিজ্ঞপ্তি পাবেন' : 'কোন বিজ্ঞপ্তি পাবেন না'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setEnabled(!prefs.enabled)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    prefs.enabled ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  role="switch"
                  aria-checked={prefs.enabled}
                  aria-label="বিজ্ঞপ্তি চালু/বন্ধ"
                >
                  <motion.span
                    animate={{ x: prefs.enabled ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                  />
                </button>
              </div>

              {/* Categories */}
              <div className={prefs.enabled ? '' : 'opacity-50 pointer-events-none'}>
                <h3 className="font-bengali text-sm font-bold mb-2">বিভাগ নির্বাচন করুন</h3>
                <div className="space-y-2">
                  {(Object.keys(categoryConfig) as NotificationCategory[]).map((cat) => {
                    const config = categoryConfig[cat]
                    const Icon = config.icon
                    const isActive = prefs.categories[cat]
                    return (
                      <button
                        key={cat}
                        onClick={() => handleToggleCategory(cat)}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                          isActive
                            ? 'border-primary/40 bg-primary/5'
                            : 'border-border hover:bg-accent'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <Icon className={`h-4 w-4 ${isActive ? config.color : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1 min-w-0 text-right">
                          <div className="font-bengali text-sm font-medium">{config.label}</div>
                          <div className="text-[10px] text-muted-foreground font-bengali">{config.desc}</div>
                        </div>
                        <div className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                          isActive ? 'bg-primary border-primary' : 'border-border'
                        }`}>
                          {isActive && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Contact info */}
              <div className={prefs.enabled ? '' : 'opacity-50 pointer-events-none'}>
                <h3 className="font-bengali text-sm font-bold mb-2">যোগাযোগের ঠিকানা</h3>
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={prefs.email || ''}
                      onChange={(e) => setContact('email', e.target.value)}
                      placeholder="ইমেইল ঠিকানা"
                      className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border-0 text-sm font-bengali focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={prefs.phone || ''}
                      onChange={(e) => setContact('phone', e.target.value)}
                      placeholder="মোবাইল নম্বর"
                      className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border-0 text-sm font-bengali focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 font-bengali">
                  💡 আপনার তথ্য শুধু এই ব্রাউজারে সংরক্ষিত হয়, সার্ভারে নয়।
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between flex-shrink-0">
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg hover:bg-accent transition-colors font-bengali"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                ডিফল্ট
              </button>
              <div className="flex items-center gap-2">
                {savedMsg && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-bengali text-xs text-green-600 dark:text-green-400 flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    সংরক্ষিত
                  </motion.span>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bengali font-medium hover:opacity-90 transition-opacity"
                >
                  সম্পন্ন
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
