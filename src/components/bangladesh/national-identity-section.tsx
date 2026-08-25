'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, BookOpen, Music, Flag, Bird, Flower, Star, ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useLanguage } from './language-provider'

const nationalSymbols = [
  {
    icon: Flag,
    title: 'জাতীয় পতাকা',
    titleEn: 'National Flag',
    desc: 'কমলা লাল বৃত্তের সবুজ আয়তক্ষেত্র',
    image: '/national-symbols/flag-of-bangladesh.svg',
    detail: 'বাংলাদেশের জাতীয় পতাকা সবুজ পটভূমির ওপর একটি লাল বৃত্ত নিয়ে গঠিত। সবুজ বাংলাদেশের প্রকৃতি ও তারুণ্য, আর লাল সূর্যোদয় ও স্বাধীনতার জন্য আত্মত্যাগের প্রতীক।',
    detailEn: 'The national flag of Bangladesh features a red circle on a green field. The green represents the country’s nature and youth, while the red represents the rising sun and the sacrifice for independence.',
    facts: [
      { label: 'রং', labelEn: 'Colors', value: 'সবুজ ও লাল', valueEn: 'Green and red' },
      { label: 'আকৃতি', labelEn: 'Design', value: 'সবুজ পটভূমিতে লাল বৃত্ত', valueEn: 'Red circle on a green field' },
      { label: 'অনুপাত', labelEn: 'Proportion', value: 'দৈর্ঘ্য ও প্রস্থ ১০:৬', valueEn: '10:6 length-to-width ratio' },
    ],
    wiki: 'https://en.wikipedia.org/wiki/Flag_of_Bangladesh',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Bird,
    title: 'জাতীয় পশু',
    titleEn: 'National Animal',
    desc: 'রয়েল বেঙ্গল টাইগার',
    image: '/national-symbols/national-animal.jpeg',
    detail: 'রয়েল বেঙ্গল টাইগার বাংলাদেশের জাতীয় পশু এবং সুন্দরবনের অন্যতম পরিচিত বাসিন্দা। এটি শক্তি, সৌন্দর্য ও বন্যপ্রকৃতির প্রতীক।',
    detailEn: 'The Royal Bengal tiger is Bangladesh’s national animal and one of the best-known inhabitants of the Sundarbans. It represents strength, beauty, and the country’s wild heritage.',
    facts: [
      { label: 'বৈজ্ঞানিক নাম', labelEn: 'Scientific name', value: 'Panthera tigris tigris', valueEn: 'Panthera tigris tigris' },
      { label: 'প্রধান আবাসস্থল', labelEn: 'Main habitat', value: 'সুন্দরবন', valueEn: 'The Sundarbans' },
      { label: 'প্রতীকী অর্থ', labelEn: 'Symbolism', value: 'শক্তি ও বন্যপ্রকৃতি', valueEn: 'Strength and wild heritage' },
    ],
    wiki: 'https://en.wikipedia.org/wiki/Royal_Bengal_tiger',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Flower,
    title: 'জাতীয় ফুল',
    titleEn: 'National Flower',
    desc: 'শাপলা (Nymphaea nouchali)',
    image: '/national-symbols/national-flower.jpeg',
    detail: 'শাপলা বাংলাদেশের জাতীয় ফুল। জলাভূমি ও নদীমাতৃক বাংলাদেশের সঙ্গে এর গভীর সম্পর্ক রয়েছে।',
    detailEn: 'The water lily is Bangladesh’s national flower. It has a close relationship with the country’s wetlands, rivers, and water-rich landscape.',
    facts: [
      { label: 'বৈজ্ঞানিক নাম', labelEn: 'Scientific name', value: 'Nymphaea nouchali', valueEn: 'Nymphaea nouchali' },
      { label: 'রং', labelEn: 'Typical color', value: 'নীলচে-বেগুনি', valueEn: 'Blue to violet' },
      { label: 'প্রতীকী অর্থ', labelEn: 'Symbolism', value: 'বাংলার জলাভূমি ও নদী', valueEn: 'The rivers and wetlands of Bengal' },
    ],
    wiki: 'https://en.wikipedia.org/wiki/Nymphaea_nouchali',
    color: 'from-pink-400 to-rose-500',
  },
  {
    icon: Star,
    title: 'জাতীয় ফল',
    titleEn: 'National Fruit',
    desc: 'কাঁঠাল (Artocarpus heterophyllus)',
    image: '/national-symbols/national-fruit.jpeg',
    detail: 'কাঁঠাল বাংলাদেশের জাতীয় ফল। এর সুস্বাদু শাঁস, পুষ্টিগুণ এবং গ্রামীণ জীবনে ব্যাপক ব্যবহার এটিকে বিশেষ মর্যাদা দিয়েছে।',
    detailEn: 'The jackfruit is Bangladesh’s national fruit. Its flavour, nutritional value, and widespread use in rural life give it a special place in the country’s culture.',
    facts: [
      { label: 'বৈজ্ঞানিক নাম', labelEn: 'Scientific name', value: 'Artocarpus heterophyllus', valueEn: 'Artocarpus heterophyllus' },
      { label: 'ব্যবহার', labelEn: 'Uses', value: 'কাঁচা ও পাকা উভয়ভাবেই খাওয়া হয়', valueEn: 'Eaten both ripe and unripe' },
      { label: 'প্রতীকী অর্থ', labelEn: 'Symbolism', value: 'প্রাচুর্য ও গ্রামীণ জীবন', valueEn: 'Abundance and rural life' },
    ],
    wiki: 'https://en.wikipedia.org/wiki/Jackfruit',
    color: 'from-yellow-400 to-amber-600',
  },
  {
    icon: Music,
    title: 'জাতীয় সঙ্গীত',
    titleEn: 'National Anthem',
    desc: 'আমার সোনার বাংলা — রবীন্দ্রনাথ ঠাকুর',
    image: '/national-symbols/national-anthem.jpeg',
    detail: '“আমার সোনার বাংলা” রবীন্দ্রনাথ ঠাকুর রচিত বাংলাদেশের জাতীয় সঙ্গীত। গানটি বাংলার প্রকৃতি ও মাতৃভূমির প্রতি ভালোবাসা প্রকাশ করে।',
    detailEn: '“Amar Sonar Bangla,” written by Rabindranath Tagore, is the national anthem of Bangladesh. It expresses love for Bengal’s landscape and the motherland.',
    facts: [
      { label: 'রচয়িতা', labelEn: 'Author', value: 'রবীন্দ্রনাথ ঠাকুর', valueEn: 'Rabindranath Tagore' },
      { label: 'গৃহীত হয়', labelEn: 'Adopted', value: '১৯৭২ সালে', valueEn: 'In 1972' },
      { label: 'মূল ভাব', labelEn: 'Theme', value: 'দেশপ্রেম ও বাংলার প্রকৃতি', valueEn: 'Patriotism and Bengal’s landscape' },
    ],
    wiki: 'https://en.wikipedia.org/wiki/Amar_Sonar_Bangla',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: BookOpen,
    title: 'জাতীয় কবি',
    titleEn: 'National Poet',
    desc: 'কাজী নজরুল ইসলাম',
    image: '/national-symbols/kazi-nazrul-islam.jpeg',
    detail: 'কাজী নজরুল ইসলাম বাংলাদেশের জাতীয় কবি। তাঁর কবিতা ও গান সাম্য, স্বাধীনতা, মানবতা এবং অন্যায়ের বিরুদ্ধে প্রতিবাদের শক্তিশালী কণ্ঠস্বর।',
    detailEn: 'Kazi Nazrul Islam is the national poet of Bangladesh. His poetry and songs champion equality, freedom, humanity, and resistance to injustice.',
    facts: [
      { label: 'জন্ম', labelEn: 'Born', value: '২৪ মে ১৮৯৯', valueEn: '24 May 1899' },
      { label: 'পরিচিতি', labelEn: 'Known for', value: 'বিদ্রোহী কবিতা ও গান', valueEn: 'Rebel poetry and songs' },
      { label: 'প্রতীকী অর্থ', labelEn: 'Symbolism', value: 'সাম্য, স্বাধীনতা ও মানবতা', valueEn: 'Equality, freedom, and humanity' },
    ],
    wiki: 'https://en.wikipedia.org/wiki/Kazi_Nazrul_Islam',
    color: 'from-purple-500 to-violet-600',
  },
]

export function NationalIdentitySection() {
  const [selectedSymbol, setSelectedSymbol] = useState<(typeof nationalSymbols)[number] | null>(null)
  const { language } = useLanguage()

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
              <button
                type="button"
                onClick={() => setSelectedSymbol(symbol)}
                className="relative h-full w-full bg-card rounded-2xl border border-border p-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`${symbol.titleEn} details`}
              >
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${symbol.color}`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${symbol.color} mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg overflow-hidden`}>
                  <img src={symbol.image} alt="" className="h-full w-full object-cover" />
                </div>

                <h3 className="font-bengali text-sm font-bold mb-1 group-hover:text-primary transition-colors">
                  {symbol.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{symbol.titleEn}</p>
                <p className="font-bengali text-xs text-foreground/80 leading-tight">
                  {symbol.desc}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={selectedSymbol !== null} onOpenChange={(open) => !open && setSelectedSymbol(null)}>
        <DialogContent className="max-w-lg">
          {selectedSymbol && (
            <>
              <DialogHeader>
                <DialogTitle className="font-bengali text-xl">
                  {language === 'bn' ? selectedSymbol.title : selectedSymbol.titleEn}
                </DialogTitle>
                <DialogDescription className="font-bengali">
                  {language === 'bn' ? selectedSymbol.desc : selectedSymbol.title}
                </DialogDescription>
              </DialogHeader>
              <img src={selectedSymbol.image} alt="" className="h-48 w-full rounded-xl object-cover" />
              <p className="font-bengali text-sm leading-7 text-foreground/80">
                {language === 'bn' ? selectedSymbol.detail : selectedSymbol.detailEn}
              </p>
              <div className="grid gap-2 rounded-xl border border-border bg-muted/40 p-4">
                {selectedSymbol.facts.map((fact) => (
                  <div key={fact.label} className="flex items-start justify-between gap-4 text-sm">
                    <span className="shrink-0 text-muted-foreground">
                      {language === 'bn' ? fact.label : fact.labelEn}
                    </span>
                    <span className="text-right font-medium">
                      {language === 'bn' ? fact.value : fact.valueEn}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={selectedSymbol.wiki}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                {language === 'bn' ? 'উইকিপিডিয়ায় আরও জানুন' : 'Learn more on Wikipedia'}
                <ExternalLink className="h-4 w-4" />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
