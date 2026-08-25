'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Image, Video, Camera, Play, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const galleryItems = [
  {
    title: 'Beautiful Bangladesh - Land Of Stories',
    type: 'photo' as const,
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    emoji: '🌾',
  },
  {
    title: 'জাতীয় সংসদ ভবন',
    type: 'photo' as const,
    gradient: 'from-slate-600 via-slate-700 to-slate-800',
    emoji: '🏛️',
  },
  {
    title: 'কক্সবাজার সমুদ্রসৈকত',
    type: 'photo' as const,
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    emoji: '🏖️',
  },
  {
    title: 'সুন্দরবন - পৃথিবীর বৃহত্তম ম্যানগ্রোভ',
    type: 'video' as const,
    gradient: 'from-green-600 via-emerald-700 to-green-800',
    emoji: '🌳',
  },
  {
    title: 'পদ্মা সেতু',
    type: 'photo' as const,
    gradient: 'from-orange-500 via-red-500 to-rose-600',
    emoji: '🌉',
  },
  {
    title: 'জামুনা বহুমুখী সেতু',
    type: 'video' as const,
    gradient: 'from-purple-500 via-violet-600 to-purple-700',
    emoji: '🏗️',
  },
]

export function PhotoGallerySection() {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all')

  const filtered = galleryItems.filter((item) =>
    filter === 'all' ? true : item.type === filter
  )

  return (
    <section id="gallery" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-chart-5/10 text-chart-5 text-sm font-medium font-bengali mb-3">
              ফটোগ্যালারি
            </span>
            <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
              বাংলাদেশের আকর্ষণীয় মুহূর্তসমূহ
            </h2>
            <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
              ছবি ও ভিডিওর মাধ্যমে দেখুন সুন্দর বাংলাদেশ
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-chart-5 to-chart-2 rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { value: 'all', label: 'সকল', icon: Camera },
            { value: 'photo', label: 'ছবি', icon: Image },
            { value: 'video', label: 'ভিডিও', icon: Video },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value as typeof filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all font-bengali ${
                filter === tab.value
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card text-foreground hover:bg-accent border border-border'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                  {item.emoji}
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  {item.type === 'video' && (
                    <Badge className="bg-red-500 hover:bg-red-500 gap-1">
                      <Play className="h-3 w-3 fill-white" />
                      ভিডিও
                    </Badge>
                  )}
                  {item.type === 'photo' && (
                    <Badge className="bg-white/20 hover:bg-white/20 backdrop-blur-sm gap-1">
                      <Camera className="h-3 w-3" />
                      ছবি
                    </Badge>
                  )}
                </div>
                <h3 className="font-bengali text-lg font-bold leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Hover icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="font-bengali gap-2 rounded-full px-8">
            সকল ফটোগ্যালারি দেখুন
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
