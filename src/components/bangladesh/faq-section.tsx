'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  Search,
  ChevronDown,
  ThumbsUp,
  MessageCircleQuestion,
  Phone,
  ExternalLink,
} from 'lucide-react'
import { faqItems, faqCategories, type FAQItem } from '@/data/faq-data'

function FAQCard({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden transition-all hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-3 p-4 text-right hover:bg-accent/30 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium font-bengali">
              {item.categoryBn}
            </span>
            {item.helpful && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <ThumbsUp className="h-2.5 w-2.5" />
                {item.helpful}
              </span>
            )}
          </div>
          <h3 className="font-bengali text-sm md:text-base font-semibold leading-snug">
            {item.question}
          </h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-1">
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-border/60">
              <p className="font-bengali text-sm text-muted-foreground leading-relaxed mt-3">
                {item.answer}
              </p>
              <p className="font-bengali text-xs text-muted-foreground/60 mt-2 italic">
                {item.answerEn}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let items = faqItems
    if (activeCategory !== 'all') {
      items = items.filter((f) => f.category === activeCategory)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      items = items.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.questionEn.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          f.answerEn.toLowerCase().includes(q)
      )
    }
    return items
  }, [query, activeCategory])

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="faq" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-chart-4/10 text-chart-4 text-sm font-medium font-bengali mb-3">
              <HelpCircle className="h-3.5 w-3.5" />
              সচরাচর জিজ্ঞাসা
            </span>
            <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
              প্রায়শই জিজ্ঞাসিত প্রশ্নাবলি
            </h2>
            <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
              সরকারি সেবা সম্পর্কে সাধারণ প্রশ্ন ও উত্তর — আপনার প্রশ্নের উত্তর খুঁজুন
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-chart-4 to-chart-5 rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="প্রশ্ন লিখে খুঁজুন..."
              className="w-full h-12 pl-10 pr-4 rounded-full bg-card border border-border focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bengali"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all font-bengali ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card text-foreground hover:bg-accent border border-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <FAQCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggleItem(item.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-3">
                <MessageCircleQuestion className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-bengali text-sm text-muted-foreground mb-1">
                "{query}" এর জন্য কোন প্রশ্ন পাওয়া যায়নি
              </p>
              <p className="font-bengali text-xs text-muted-foreground">
                অন্য শব্দ দিয়ে চেষ্টা করুন অথবা ৩৩৩ নম্বরে কল করুন
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-10">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 text-center">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-white/5" />
            <div className="relative">
              <h3 className="font-bengali text-lg font-bold mb-1">আপনার প্রশ্নের উত্তর পাননি?</h3>
              <p className="font-bengali text-sm opacity-90 mb-4">
                আমাদের এআই সহকারীকে প্রশ্ন করুন অথবা ৩৩৩ নম্বরে কল করুন
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <a
                  href="#ai-tools"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors font-bengali text-sm font-medium"
                >
                  <MessageCircleQuestion className="h-4 w-4" />
                  এআই সহকারীকে জিজ্ঞাসা করুন
                </a>
                <a
                  href="tel:333"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary hover:opacity-90 transition-opacity font-bengali text-sm font-bold"
                >
                  <Phone className="h-4 w-4" />
                  ৩৩৩ নম্বরে কল করুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
