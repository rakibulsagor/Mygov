'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
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

// Convert Bengali numerals to integer for animation
function bengaliToInt(bn: string): number {
  const map: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
  }
  return parseInt(bn.replace(/[০-৯]/g, (d) => map[d] || d), 10)
}

function intToBengali(num: number): string {
  const map = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num
    .toString()
    .split('')
    .map((d) => (/\d/.test(d) ? map[parseInt(d)] : d))
    .join('')
}

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let startTime: number | null = null
    let frame: number

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(Math.floor(eased * target))
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setValue(target)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return <span ref={ref}>{intToBengali(value)}</span>
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
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium font-bengali mb-3">
            পরিসংখ্যান
          </span>
          <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
            বাংলাদেশের প্রশাসনিক কাঠামো
          </h2>
          <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
            ডিজিটাল বাংলাদেশের বিস্তৃত প্রশাসনিক নেটওয়ার্কের সংক্ষিপ্ত চিত্র
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Building2
            const target = bengaliToInt(stat.value)
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
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-chart-2/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                  <div className="relative h-full bg-card rounded-2xl border border-border p-5 text-center hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    {/* Decorative number background */}
                    <div className="absolute -top-4 -right-2 text-7xl font-black text-primary/5 select-none pointer-events-none">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Icon with gradient ring */}
                    <div className="relative inline-flex items-center justify-center mb-3">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-chart-2 opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
                      <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    {/* Animated Value */}
                    <div className="font-bengali text-3xl md:text-4xl font-bold gradient-text mb-1 tabular-nums">
                      <AnimatedCounter target={target} />
                      <span className="text-primary/30">+</span>
                    </div>

                    {/* Label */}
                    <div className="font-bengali text-sm font-semibold text-foreground">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {stat.labelEn}
                    </div>

                    {/* Bottom accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
