'use client'

import { motion } from 'framer-motion'
import { Quote, BookOpen, Music, Flag, Bird, Flower, Star } from 'lucide-react'

const nationalSymbols = [
  {
    icon: Flag,
    title: 'জাতীয় পতাকা',
    titleEn: 'National Flag',
    desc: 'কমলা লাল বৃত্তের সবুজ আয়তক্ষেত্র',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Bird,
    title: 'জাতীয় পশু',
    titleEn: 'National Animal',
    desc: 'রয়েল বেঙ্গল টাইগার',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Flower,
    title: 'জাতীয় ফুল',
    titleEn: 'National Flower',
    desc: 'শাপলা (Nymphaea nouchali)',
    color: 'from-pink-400 to-rose-500',
  },
  {
    icon: Star,
    title: 'জাতীয় ফল',
    titleEn: 'National Fruit',
    desc: 'কাঁঠাল (Artocarpus heterophyllus)',
    color: 'from-yellow-400 to-amber-600',
  },
  {
    icon: Music,
    title: 'জাতীয় সঙ্গীত',
    titleEn: 'National Anthem',
    desc: 'আমার সোনার বাংলা — রবীন্দ্রনাথ ঠাকুর',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: BookOpen,
    title: 'জাতীয় কবি',
    titleEn: 'National Poet',
    desc: 'কাজী নজরুল ইসলাম',
    color: 'from-purple-500 to-violet-600',
  },
]

export function NationalIdentitySection() {
  return (
    <section id="national-identity" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-chart-2/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-chart-2/10 text-chart-2 text-sm font-medium font-bengali mb-3">
              জাতীয় পরিচয়
            </span>
            <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
              বাংলাদেশের জাতীয় প্রতীক ও সংস্কৃতি
            </h2>
            <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
              গৌরবময় ঐতিহ্য, সংস্কৃতি ও জাতীয় প্রতীকসমূহ
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-chart-2 to-primary rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* National quote banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-10 text-primary-foreground overflow-hidden">
            <Quote className="absolute top-4 right-4 h-16 w-16 opacity-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-chart-2/20 rounded-full blur-2xl" />
            <div className="relative">
              <p className="font-bengali text-xl md:text-2xl font-medium leading-relaxed mb-4">
                “আমার সোনার বাংলা, আমি তোমায় ভালোবাসি। চিরদিন তোমার আকাশ, তোমার বাতাস,
                আমার প্রাণে বাজায় বাঁশি॥”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-primary-foreground/40" />
                <p className="font-bengali text-sm opacity-80">
                  রবীন্দ্রনাথ ঠাকুর — জাতীয় সঙ্গীত
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* National symbols grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {nationalSymbols.map((symbol, i) => (
            <motion.div
              key={symbol.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group"
            >
              <div className="relative h-full bg-card rounded-2xl border border-border p-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${symbol.color}`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${symbol.color} mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                  <symbol.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="font-bengali text-sm font-bold mb-1 group-hover:text-primary transition-colors">
                  {symbol.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{symbol.titleEn}</p>
                <p className="font-bengali text-xs text-foreground/80 leading-tight">
                  {symbol.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
