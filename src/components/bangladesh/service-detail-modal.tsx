'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  CheckCircle2,
  FileText,
  Clock,
  DollarSign,
  Globe,
  Phone,
  ListChecks,
  UserCheck,
  ExternalLink,
  Share2,
} from 'lucide-react'
import type { ServiceDetail } from '@/data/service-details'
import { StarRating } from '@/components/bangladesh/star-rating'
import { ShareButton } from '@/components/bangladesh/share-button'
import { useRecentlyViewed } from '@/hooks/use-recently-viewed'
import { useEffect } from 'react'

interface ServiceDetailModalProps {
  service: ServiceDetail | null
  onClose: () => void
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const { addRecent } = useRecentlyViewed()

  // Track view + lock body scroll when open
  useEffect(() => {
    if (service) {
      addRecent({
        id: service.id,
        title: service.title,
        titleEn: service.titleEn,
        category: service.icon,
        href: service.website ? `https://${service.website}` : '#',
      })
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [service, addRecent])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-card rounded-2xl border border-border shadow-2xl flex flex-col"
          >
            {/* Header with gradient */}
            <div className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-5 flex-shrink-0">
              {/* Decorative */}
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-white/5" />

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-medium font-bengali mb-2">
                    {service.categoryBn}
                  </span>
                  <h2 className="font-bengali text-xl md:text-2xl font-bold leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm opacity-80 mt-0.5">{service.titleEn}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <ShareButton
                    title={service.title}
                    text={service.shortDesc}
                    variant="full"
                    size="md"
                  />
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label="বন্ধ করুন"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto p-5 space-y-5">
              {/* Description */}
              <div>
                <p className="font-bengali text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Quick info grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-muted-foreground font-bengali">প্রক্রিয়াকরণ সময়</div>
                    <div className="font-bengali text-xs font-semibold truncate">{service.processingTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                  <DollarSign className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-muted-foreground font-bengali">ফি</div>
                    <div className="font-bengali text-xs font-semibold truncate">{service.fee}</div>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <h3 className="flex items-center gap-2 font-bengali text-sm font-bold mb-2">
                  <UserCheck className="h-4 w-4 text-primary" />
                  যোগ্যতা
                </h3>
                <ul className="space-y-1.5">
                  {service.eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-bengali text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="flex items-center gap-2 font-bengali text-sm font-bold mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  প্রয়োজনীয় কাগজপত্র
                </h3>
                <ul className="space-y-1.5">
                  {service.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-bengali text-sm text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process steps */}
              <div>
                <h3 className="flex items-center gap-2 font-bengali text-sm font-bold mb-3">
                  <ListChecks className="h-4 w-4 text-primary" />
                  আবেদন প্রক্রিয়া
                </h3>
                <div className="space-y-3">
                  {service.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </div>
                        {i < service.steps.length - 1 && (
                          <div className="w-px flex-1 bg-border my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <h4 className="font-bengali text-sm font-semibold mb-0.5">{step.title}</h4>
                        <p className="font-bengali text-xs text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <div>
                  <h3 className="font-bengali text-sm font-bold mb-0.5">আপনার রেটিং দিন</h3>
                  <p className="text-xs text-muted-foreground font-bengali">এই সেবার মান কেমন?</p>
                </div>
                <StarRating serviceId={service.id} size="md" showLabel />
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {service.website && (
                  <a
                    href={`https://${service.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-accent transition-colors"
                  >
                    <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-muted-foreground font-bengali">ওয়েবসাইট</div>
                      <div className="text-xs font-medium truncate flex items-center gap-1">
                        {service.website}
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </a>
                )}
                {service.phone && (
                  <a
                    href={`tel:${service.phone}`}
                    className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-accent transition-colors"
                  >
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-muted-foreground font-bengali">হটলাইন</div>
                      <div className="text-xs font-medium font-bengali">{service.phone}</div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30 flex-shrink-0">
              <p className="font-bengali text-[11px] text-muted-foreground text-center">
                বিস্তারিত তথ্যের জন্য ৩৩৩ নম্বরে কল করুন অথবা সংশ্লিষ্ট অধিদপ্তরে যোগাযোগ করুন
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
