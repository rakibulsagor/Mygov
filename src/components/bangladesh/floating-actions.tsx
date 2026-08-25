'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X, MessageCircle, ArrowUp } from 'lucide-react'

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showCallMenu, setShowCallMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call menu */}
      <div className="relative">
        <AnimatePresence>
          {showCallMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-64 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
            >
              <div className="bg-primary p-4 text-primary-foreground">
                <h3 className="font-bengali text-sm font-bold">জরুরি সেবা</h3>
                <p className="text-xs opacity-80 font-bengali">২৪/৭ কল করুন</p>
              </div>
              <div className="p-2 space-y-1">
                {[
                  { num: '৩৩৩', label: 'সরকারি তথ্য ও সেবা' },
                  { num: '৯৯৯', label: 'জরুরি সেবা' },
                  { num: '১০২', label: 'ফায়ার সার্ভিস' },
                  { num: '১০৯', label: 'নারী ও শিশু নির্যাতন প্রতিরোধ' },
                ].map((item) => (
                  <a
                    key={item.num}
                    href={`tel:${item.num}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <span className="text-sm font-bengali">{item.label}</span>
                    <span className="text-sm font-bold text-primary font-bengali">
                      {item.num}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCallMenu(!showCallMenu)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-2xl flex items-center justify-center"
          aria-label="Quick call"
        >
          {!showCallMenu && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
          )}
          {showCallMenu ? (
            <X className="h-6 w-6 relative z-10" />
          ) : (
            <Phone className="h-6 w-6 relative z-10" />
          )}
        </motion.button>
      </div>
    </div>
  )
}
