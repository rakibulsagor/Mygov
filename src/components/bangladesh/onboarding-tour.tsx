'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  BrainCircuit,
  Mic,
  Navigation,
  Bookmark,
  Sparkles,
  CheckCircle2,
  Keyboard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'bangladesh-portal-tour-completed'

interface TourStep {
  id: string
  icon: typeof Search
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  shortcut?: string
  shortcutLabel?: string
  color: string
  bgColor: string
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    icon: Sparkles,
    title: 'বাংলাদেশ জাতীয় তথ্য বাতায়নে স্বাগতম',
    titleEn: 'Welcome to Bangladesh National Portal',
    description: 'সরকারি সকল তথ্য ও সেবার আধুনিক ডিজিটাল পোর্টাল। চলুন ৩০ সেকেন্ডে মূল ফিচারগুলো দেখে নিই।',
    descriptionEn: 'Your modern digital gateway to all government information & services.',
    color: 'text-primary',
    bgColor: 'from-primary to-primary/80',
  },
  {
    id: 'search',
    icon: Search,
    title: 'দ্রুত সার্চ (Ctrl + K)',
    titleEn: 'Quick Search (Ctrl + K)',
    description: 'যেকোনো সময় Ctrl + K চেপে সার্চ মডাল খুলুন। সেবা, মন্ত্রণালয়, জরুরি নম্বর — সব এক জায়গায়।',
    descriptionEn: 'Press Ctrl+K anytime to open the search. Services, ministries, emergency numbers — all in one place.',
    shortcut: 'Ctrl K',
    shortcutLabel: 'সার্চ খুলুন',
    color: 'text-violet-600',
    bgColor: 'from-violet-500 to-purple-600',
  },
  {
    id: 'chatbot',
    icon: BrainCircuit,
    title: 'বাংলা এআই সহকারী',
    titleEn: 'Bengali AI Assistant',
    description: 'সরকারি সেবা সম্পর্কে যেকোনো প্রশ্ন করুন — এআই সহকারী বাংলায় উত্তর দেবে। উত্তর টাইপ হওয়ার সাথে সাথেই দেখতে পাবেন।',
    descriptionEn: 'Ask any question about government services — the AI assistant answers in Bengali with live streaming.',
    color: 'text-cyan-600',
    bgColor: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'voice',
    icon: Mic,
    title: 'ভয়েস সার্চ',
    titleEn: 'Voice Search',
    description: 'মাইক্রোফোন আইকনে ক্লিক করে বাংলায় কথা বলে সার্চ করুন। টাইপ না করেই দ্রুত তথ্য খুঁজুন।',
    descriptionEn: 'Click the mic icon and speak in Bengali to search — no typing needed.',
    color: 'text-rose-600',
    bgColor: 'from-rose-500 to-red-600',
  },
  {
    id: 'navigator',
    icon: Navigation,
    title: 'সেকশন নেভিগেটর',
    titleEn: 'Section Navigator',
    description: 'পেজের বাম পাশে থাকা ডট ট্র্যাকার দিয়ে যেকোনো বিভাগে দ্রুত যান। স্ক্রল করলেই বর্তমান অবস্থান দেখায়।',
    descriptionEn: 'Use the dot tracker on the left to jump to any section. Active section is highlighted as you scroll.',
    color: 'text-amber-600',
    bgColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 'bookmarks',
    icon: Bookmark,
    title: 'প্রিয় সেবা সংরক্ষণ',
    titleEn: 'Bookmark Favorite Services',
    description: 'সেবার কার্ডে স্টার আইকনে ক্লিক করে প্রিয় সেবা সংরক্ষণ করুন। "প্রিয় সেবা" ট্যাবে সব সংরক্ষিত সেবা দেখুন।',
    descriptionEn: 'Click the star icon on service cards to bookmark favorites. View all in the "Favorites" tab.',
    color: 'text-yellow-600',
    bgColor: 'from-yellow-500 to-amber-600',
  },
]

export function OnboardingTour() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  // Check if tour should show on first visit
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const completed = localStorage.getItem(STORAGE_KEY)
      if (!completed) {
        // Small delay so page loads first
        const timer = setTimeout(() => setOpen(true), 1500)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
      window.dispatchEvent(new CustomEvent('tour-completed'))
    } catch {
      // ignore
    }
  }, [])

  const handleSkip = useCallback(() => {
    handleClose()
  }, [handleClose])

  const handleNext = useCallback(() => {
    if (step < tourSteps.length - 1) {
      setStep((s) => s + 1)
    } else {
      handleClose()
    }
  }, [step, handleClose])

  const handlePrev = useCallback(() => {
    setStep((s) => Math.max(0, s - 1))
  }, [])

  const current = tourSteps[step]
  const isLast = step === tourSteps.length - 1
  const isFirst = step === 0

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={handleSkip} />

          {/* Modal */}
          <motion.div
            key={current.id}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-card rounded-3xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Top gradient banner */}
            <div className={`relative h-32 bg-gradient-to-br ${current.bgColor} overflow-hidden`}>
              {/* Decorative circles */}
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute right-16 top-8 w-20 h-20 rounded-full bg-white/5" />
              <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-white/5" />

              {/* Close button */}
              <button
                onClick={handleSkip}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors text-white"
                aria-label="ট্যুর বন্ধ করুন"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Step counter */}
              <div className="absolute top-3 left-4 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-mono">
                {step + 1} / {tourSteps.length}
              </div>

              {/* Icon */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="w-20 h-20 rounded-2xl bg-card shadow-xl flex items-center justify-center border-4 border-card">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${current.bgColor}`}>
                    <current.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="pt-14 p-6 text-center">
              <h2 className="font-bengali text-xl font-bold mb-1">{current.title}</h2>
              <p className="text-xs text-muted-foreground mb-3">{current.titleEn}</p>
              <p className="font-bengali text-sm text-muted-foreground leading-relaxed mb-5">
                {current.description}
              </p>

              {/* Shortcut display */}
              {current.shortcut && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border mb-5">
                  <Keyboard className="h-3.5 w-3.5 text-muted-foreground" />
                  <kbd className="px-2 py-0.5 rounded bg-card border border-border text-xs font-mono font-bold">
                    {current.shortcut}
                  </kbd>
                  <span className="font-bengali text-xs text-muted-foreground">
                    {current.shortcutLabel}
                  </span>
                </div>
              )}

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-1.5 mb-6">
                {tourSteps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setStep(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === step
                        ? 'w-6 bg-primary'
                        : i < step
                        ? 'w-1.5 bg-primary/50'
                        : 'w-1.5 bg-border'
                    }`}
                    aria-label={`ধাপ ${i + 1}`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {!isFirst && (
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    className="font-bengali gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    পূর্ববর্তী
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="font-bengali ml-auto"
                >
                  স্কিপ করুন
                </Button>
                <Button
                  onClick={handleNext}
                  className="font-bengali gap-1"
                >
                  {isLast ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      সম্পন্ন
                    </>
                  ) : (
                    <>
                      পরবর্তী
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
