'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ThumbsUp } from 'lucide-react'

interface StarRatingProps {
  serviceId: string
  size?: 'sm' | 'md'
  showLabel?: boolean
}

const labels = ['', 'খুবই খারাপ', 'খারাপ', 'মোটামুটি', 'ভালো', 'চমৎকার']

export function StarRating({ serviceId, size = 'sm', showLabel = false }: StarRatingProps) {
  const [hoverStar, setHoverStar] = useState(0)
  const [savedStar, setSavedStar] = useState(0)
  const [showThanks, setShowThanks] = useState(false)

  // Lazy import to avoid circular deps — read rating directly from localStorage
  const getCurrentRating = (): number => {
    try {
      const raw = localStorage.getItem('bangladesh-portal-ratings')
      if (!raw) return 0
      const parsed = JSON.parse(raw)
      return parsed[serviceId]?.stars || 0
    } catch {
      return 0
    }
  }

  const current = getCurrentRating()
  const displayStar = hoverStar || savedStar || current

  const handleClick = (star: number) => {
    // Save directly to localStorage + dispatch event
    try {
      const raw = localStorage.getItem('bangladesh-portal-ratings')
      const ratings = raw ? JSON.parse(raw) : {}
      ratings[serviceId] = { serviceId, stars: star, ratedAt: Date.now() }
      localStorage.setItem('bangladesh-portal-ratings', JSON.stringify(ratings))
      window.dispatchEvent(new CustomEvent('ratings-changed'))
      setSavedStar(star)
      setShowThanks(true)
      setTimeout(() => setShowThanks(false), 2000)
    } catch {
      // ignore
    }
  }

  const dims = size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5'
  const gap = size === 'sm' ? 'gap-0.5' : 'gap-1'

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className={`flex items-center ${gap}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleClick(star)
            }}
            onMouseEnter={() => setHoverStar(star)}
            onMouseLeave={() => setHoverStar(0)}
            className="transition-transform hover:scale-125 focus:outline-none"
            aria-label={`${star} তারকা`}
            title={labels[star]}
          >
            <Star
              className={`${dims} transition-colors ${
                star <= displayStar
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-transparent text-muted-foreground/40'
              }`}
            />
          </button>
        ))}
      </div>
      {showLabel && (
        <span className="text-[10px] text-muted-foreground font-bengali mt-0.5 h-3">
          {displayStar > 0 ? labels[displayStar] : ''}
        </span>
      )}
      <AnimatePresence>
        {showThanks && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.9 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-lg bg-green-500 text-white text-[10px] font-bengali flex items-center gap-1 shadow-lg z-20"
          >
            <ThumbsUp className="h-2.5 w-2.5" />
            ধন্যবাদ!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
