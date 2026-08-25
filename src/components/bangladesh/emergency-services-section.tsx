'use client'

import { motion } from 'framer-motion'
import { Phone, AlertCircle } from 'lucide-react'
import { emergencyServices } from '@/data/bangladesh-data'

export function EmergencyServicesSection() {
  return (
    <section id="emergency" className="py-16 md:py-20 bg-gradient-to-br from-destructive/5 via-background to-chart-2/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium font-bengali mb-3">
              <AlertCircle className="h-3.5 w-3.5" />
              জরুরি সেবা
            </span>
            <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
              জরুরি সেবা নম্বরসমূহ
            </h2>
            <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
              জরুরি প্রয়োজনে সরাসরি যোগাযোগ করুন — ২৪ ঘন্টা সেবা প্রদান করা হয়
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-destructive to-chart-2 rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {emergencyServices.map((service, i) => (
            <motion.a
              key={service.number}
              href={`tel:${service.number}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.03, 0.6) }}
              className="group relative overflow-hidden"
            >
              <div className="relative bg-card rounded-2xl border border-border p-4 text-center hover:border-destructive/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Phone icon */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-destructive/10 mb-2 group-hover:bg-destructive group-hover:scale-110 transition-all">
                  <Phone className="h-5 w-5 text-destructive group-hover:text-destructive-foreground transition-colors" />
                </div>

                {/* Number */}
                <div className="font-bengali text-2xl md:text-3xl font-bold text-destructive mb-1">
                  {service.numberBn}
                </div>

                {/* Title */}
                <div className="font-bengali text-xs font-medium leading-tight mb-1 min-h-[2rem] flex items-center justify-center">
                  {service.title}
                </div>

                <div className="text-[10px] text-muted-foreground leading-tight">
                  {service.titleEn}
                </div>

                {/* Pulse effect */}
                <div className="absolute top-2 right-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-40" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="font-bengali text-sm text-muted-foreground max-w-2xl mx-auto">
            জরুরি অবস্থায় উপরের নম্বরে কল করুন। সকল নম্বর ২৪ ঘন্টা সক্রিয় এবং বিনামূল্যে।
          </p>
        </div>
      </div>
    </section>
  )
}
