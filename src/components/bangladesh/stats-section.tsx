'use client'

import { motion } from 'framer-motion'
import {
  Building2,
  Landmark,
  Map,
  MapPin,
  Navigation,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { stats } from '@/data/bangladesh-data'

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Landmark,
  Map,
  MapPin,
  Navigation,
  Users,
}

export function StatsSection() {
  return (
    <section id="statistics" className="py-16 md:py-20 -mt-2 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10"
        >
          <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
            বাংলাদেশের পরিসংখ্যান
          </h2>
          <p className="text-muted-foreground font-bengali">
            প্রশাসনিক কাঠামোর সংক্ষিপ্ত চিত্র
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Building2
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="group relative h-full">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                  <div className="relative h-full bg-card rounded-2xl border border-border p-5 text-center hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    {/* Value */}
                    <div className="font-bengali text-3xl md:text-4xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="font-bengali text-sm font-medium text-foreground">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {stat.labelEn}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
