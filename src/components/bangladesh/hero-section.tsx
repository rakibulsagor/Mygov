'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Sparkles, ShieldCheck, Zap, Mic, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const heroHighlights = [
  { icon: Zap, title: 'ডিজিটাল সেবা', desc: '২৪/৭ অনলাইন', color: 'text-amber-300' },
  { icon: ShieldCheck, title: 'নিরাপদ ও নির্ভরযোগ্য', desc: 'সরকারি প্রত্যায়িত', color: 'text-green-300' },
  { icon: Sparkles, title: 'এআই চালিত', desc: 'বাংলা এআই টুলস', color: 'text-purple-300' },
]

const popularSearches = [
  { term: 'পাসপোর্ট', count: '২৩' },
  { term: 'আয়কর', count: '১৫' },
  { term: 'ভিসা', count: '৮' },
  { term: 'নিয়োগ', count: '৪৫' },
  { term: 'বিদ্যুৎ বিল', count: '৬' },
]

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const openSearch = (query = '') => {
    const open = (window as unknown as { __openSearch?: (q?: string) => void }).__openSearch
    open?.(query)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-chart-2/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute right-20 top-40 w-64 h-64 rounded-full bg-chart-2/10 blur-2xl"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -left-20 bottom-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl"
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Topographic lines - decorative SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 Q30 30 60 60 T120 60" stroke="white" strokeWidth="1" fill="none" />
              <path d="M0 90 Q30 60 60 90 T120 90" stroke="white" strokeWidth="1" fill="none" />
              <path d="M0 30 Q30 0 60 30 T120 30" stroke="white" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>

        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/20 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-2 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-2" />
            </span>
            <span className="text-sm font-medium font-bengali">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার • অফিসিয়াল পোর্টাল
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-bengali text-5xl md:text-7xl font-bold mb-4 leading-[1.1] tracking-tight"
          >
            বাংলাদেশ জাতীয়
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">তথ্য বাতায়ন</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-chart-2/30 -z-0 origin-left rounded"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-bengali text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto font-medium"
          >
            এক ক্লিকে সকল সরকারি তথ্য ও সেবা — নাগরিকদের জন্য ডিজিটাল বাংলাদেশের প্রবেশদ্বার
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/30 via-chart-2/30 to-white/30 rounded-2xl blur-lg opacity-60 group-focus-within:opacity-100 transition-opacity" />
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  openSearch(searchQuery)
                }}
                className="relative flex items-center gap-2 p-2 bg-white rounded-2xl shadow-2xl"
              >
                <Search className="h-5 w-5 text-muted-foreground ml-3 flex-shrink-0" />
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => openSearch(searchQuery)}
                  placeholder="আপনি কী খুঁজছেন? যেমন: পাসপোর্ট, ইউটিলিটি বিল..."
                  className="border-0 shadow-none focus-visible:ring-0 text-foreground h-11 text-base font-bengali cursor-pointer"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => openSearch()}
                  className="hidden sm:flex items-center gap-1 px-2 h-8 rounded-md bg-muted/60 text-[11px] text-muted-foreground font-mono"
                  title="সার্চ শর্টকাট"
                >
                  Ctrl K
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-xl bg-muted hover:bg-accent flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="ভয়েস সার্চ"
                >
                  <Mic className="h-4 w-4 text-muted-foreground" />
                </button>
                <Button type="submit" size="lg" className="h-11 px-6 rounded-xl font-bengali gap-1.5 flex-shrink-0">
                  অনুসন্ধান
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-sm text-primary-foreground/70 font-bengali flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" />
                জনপ্রিয়:
              </span>
              {popularSearches.map((item, i) => (
                <motion.button
                  key={item.term}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  onClick={() => openSearch(item.term)}
                  className="group inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all border border-primary-foreground/10 font-bengali"
                >
                  {item.term}
                  <span className="text-[10px] bg-primary-foreground/20 px-1.5 rounded-full group-hover:bg-primary-foreground/30 transition-colors">
                    {item.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto"
          >
            {heroHighlights.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15 hover:bg-primary-foreground/15 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-foreground/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="text-right flex-1">
                  <div className="text-sm font-semibold font-bengali">{item.title}</div>
                  <div className="text-xs text-primary-foreground/70 font-bengali">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V40C240 10 480 10 720 30C960 50 1200 70 1440 40V80H0Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  )
}
