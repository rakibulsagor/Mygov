'use client'

import { motion } from 'framer-motion'
import {
  Briefcase,
  Megaphone,
  Wallet,
  TrendingUp,
  CloudSun,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { CurrencyTaka } from '@/components/ui/currency-taka'
import { quickLinks } from '@/data/bangladesh-data'
import { RecentlyViewedWidget } from '@/components/bangladesh/recently-viewed-widget'

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Megaphone,
  Wallet,
  TrendingUp,
  DollarSign: CurrencyTaka,
  CloudSun,
  ShieldCheck,
  Sparkles,
}

export function QuickLinksSection() {
  return (
    <section id="quick-links" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-chart-3/10 text-chart-3 text-sm font-medium font-bengali mb-3">
              দ্রুত লিংক
            </span>
            <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
              গুরুত্বপূর্ণ তথ্য ও সেবা
            </h2>
            <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
              সরকারি নিয়োগ, বাজেট, স্টক এক্সচেঞ্জ সহ গুরুত্বপূর্ণ সকল তথ্য
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-chart-3 to-chart-4 rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* Layout: quick links grid + recently viewed sidebar */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Quick links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => {
              const Icon = iconMap[link.icon] || Briefcase
              return (
                <motion.a
                  key={link.title}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden bg-card rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center group-hover:scale-110 group-hover:from-primary/20 group-hover:to-chart-2/20 transition-all">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bengali text-sm font-semibold group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{link.titleEn}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all flex-shrink-0" />
                  </div>
                </motion.a>
              )
            })}
          </div>

          {/* Recently viewed sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <RecentlyViewedWidget />
          </div>
        </div>
      </div>
    </section>
  )
}
