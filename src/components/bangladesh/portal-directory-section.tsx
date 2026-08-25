'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Search, ArrowRight, Building, MapPin, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { officeTypes } from '@/data/bangladesh-data'

export function PortalDirectorySection() {
  const [selectedType, setSelectedType] = useState(officeTypes[1])
  const [open, setOpen] = useState(false)

  return (
    <section id="portal-directory" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-chart-4/10 text-chart-4 text-sm font-medium font-bengali mb-3">
                জাতীয় বাতায়ন
              </span>
              <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
                সরকারি অফিসের ওয়েবসাইট খুঁজুন
              </h2>
              <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
                অফিসের ধরণ নির্বাচন করে খুঁজে নিন সংশ্লিষ্ট ওয়েবসাইট
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-chart-4 to-chart-5 rounded-full mx-auto mt-4" />
            </motion.div>
          </div>

          {/* Selector card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden"
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-0">
              {/* Left: Office type selector */}
              <div className="p-6 md:p-8">
                <label className="block text-sm font-medium text-muted-foreground mb-3 font-bengali">
                  অফিসের ধরণ নির্বাচন করুন
                </label>

                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:border-primary/40 transition-colors text-right font-bengali"
                  >
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                    <span className="flex-1 text-right">{selectedType}</span>
                    <Building className="h-5 w-5 text-primary" />
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-30 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-border bg-popover shadow-xl"
                      >
                        <ul className="p-1">
                          {officeTypes.map((type) => (
                            <li key={type}>
                              <button
                                onClick={() => {
                                  setSelectedType(type)
                                  setOpen(false)
                                }}
                                className={`w-full text-right px-3 py-2 text-sm rounded-lg transition-colors font-bengali ${
                                  selectedType === type
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'hover:bg-accent'
                                }`}
                              >
                                {type}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick type chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {officeTypes.slice(0, 6).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors font-bengali ${
                        selectedType === type
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-accent text-muted-foreground'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Action */}
              <div className="bg-gradient-to-br from-primary to-primary/80 p-6 md:p-8 flex flex-col justify-center items-center text-center text-primary-foreground">
                <Globe className="h-10 w-10 mb-3 opacity-80" />
                <p className="font-bengali text-sm mb-4 opacity-90">
                  নির্বাচিত ধরণের সকল ওয়েবসাইট দেখুন
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-bengali gap-2 w-full"
                >
                  ওয়েবসাইট দেখুন
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Portal stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { icon: Landmark, label: 'মন্ত্রণালয়', value: '৫৭', color: 'text-primary' },
              { icon: Building, label: 'অধিদপ্তর', value: '৮১', color: 'text-chart-2' },
              { icon: MapPin, label: 'জেলা বাতায়ন', value: '৬৪', color: 'text-chart-3' },
              { icon: Globe, label: 'উপজেলা বাতায়ন', value: '৪৯৯', color: 'text-chart-4' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <item.icon className={`h-8 w-8 ${item.color}`} />
                <div>
                  <div className="font-bengali text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-muted-foreground font-bengali">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
