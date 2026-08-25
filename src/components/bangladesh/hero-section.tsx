'use client'

import { motion } from 'framer-motion'
import { Search, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const heroHighlights = [
  { icon: Zap, title: 'ডিজিটাল সেবা', desc: '২৪/৭ অনলাইন', color: 'text-amber-500' },
  { icon: ShieldCheck, title: 'নিরাপদ ও নির্ভরযোগ্য', desc: 'সরকারি প্রত্যায়িত', color: 'text-green-600' },
  { icon: Sparkles, title: 'এআই চালিত', desc: 'বাংলা এআই টুলস', color: 'text-purple-500' },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circle - flag motif */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-chart-2/20 blur-3xl" />
        <div className="absolute right-20 top-40 w-64 h-64 rounded-full bg-chart-2/10 blur-2xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-2 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-2" />
            </span>
            <span className="text-sm font-medium font-bengali">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-bengali text-4xl md:text-6xl font-bold mb-4 leading-tight"
          >
            বাংলাদেশ জাতীয় তথ্য বাতায়ন
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-bengali text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto"
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
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-focus-within:bg-white/30 transition-all" />
              <div className="relative flex items-center gap-2 p-2 bg-white rounded-2xl shadow-2xl">
                <Search className="h-5 w-5 text-muted-foreground ml-3" />
                <Input
                  type="search"
                  placeholder="যেমন: পাসপোর্ট, ইউটিলিটি বিল, পরীক্ষার ফলাফল..."
                  className="border-0 shadow-none focus-visible:ring-0 text-foreground h-12 text-base font-bengali"
                />
                <Button size="lg" className="h-12 px-6 rounded-xl font-bengali gap-1.5">
                  অনুসন্ধান
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-sm text-primary-foreground/70 font-bengali">জনপ্রিয়:</span>
              {['পাসপোর্ট', 'আয়কর', 'ভিসা', 'নিয়োগ', 'বিদ্যুৎ বিল'].map((term) => (
                <button
                  key={term}
                  className="px-3 py-1 text-sm rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors font-bengali"
                >
                  {term}
                </button>
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
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 hover:bg-primary-foreground/15 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="text-right flex-1">
                  <div className="text-sm font-semibold font-bengali">{item.title}</div>
                  <div className="text-xs text-primary-foreground/70 font-bengali">{item.desc}</div>
                </div>
              </div>
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
