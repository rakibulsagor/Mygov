'use client'

import { motion } from 'framer-motion'
import { Megaphone, ChevronRight } from 'lucide-react'

const newsItems = [
  '📢 বাংলাদেশ জাতীয় তথ্য বাতায়নে নতুন ই-সেবা যুক্ত হয়েছে',
  '🎯 ডিজিটাল সেন্টার থেকে ৫০০+ সেবা অনলাইনে',
  '📋 ৩৩৩ নম্বরে কল করে সরকারি তথ্য ও সেবা নিন',
  '🚀 বাংলা এআই টুলস এখন জাতীয় বাতায়নে',
  '💼 সরকারি নিয়োগ বিজ্ঞপ্তি দেখুন',
  '💳 ইউটিলিটি বিল অনলাইনে পরিশোধ করুন',
]

export function NewsTicker() {
  return (
    <div className="bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-2.5">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive">
              <Megaphone className="h-3.5 w-3.5" />
              <span className="text-xs font-bold font-bengali">বিজ্ঞপ্তি</span>
            </div>
          </div>

          {/* Marquee */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {[...newsItems, ...newsItems].map((item, i) => (
                <span
                  key={i}
                  className="text-sm text-muted-foreground font-bengali flex items-center gap-2"
                >
                  <ChevronRight className="h-3 w-3 text-primary flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
