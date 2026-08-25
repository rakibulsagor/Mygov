'use client'

import { useState } from 'react'
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
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { eServices, govServiceCategories } from '@/data/bangladesh-data'
import {
  Star,
  Sparkles,
  Smartphone,
  Building2,
  LayoutGrid,
  ArrowUpRight,
} from 'lucide-react'

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

export function EServicesSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const displayedServices = showAll ? eServices : eServices.slice(0, 12)

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
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service, i) => {
              const Icon = iconMap[service.icon] || Monitor
              return (
                <motion.a
                  key={service.title}
                  href={service.href}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.03 }}
                  className="group relative bg-card rounded-2xl border border-border p-4 md:p-5 text-center hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* New badge */}
                  {service.category === 'new' && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[10px] font-bold bg-chart-2 text-white rounded-full">
                      NEW
                    </span>
                  )}

                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 mb-3 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-chart-2/20 transition-all">
                      <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                    </div>
                    <h3 className="font-bengali text-sm md:text-base font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {service.titleEn}
                    </p>
                  </div>

                  {/* Arrow icon on hover */}
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </motion.a>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Show more / less */}
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
      </div>
    </section>
  )
}
