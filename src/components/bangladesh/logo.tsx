'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

export function BangladeshLogo({ size = 'md' }: LogoProps) {
  const dimensions = {
    sm: { w: 40, h: 40 },
    md: { w: 52, h: 52 },
    lg: { w: 72, h: 72 },
  }
  const { w, h } = dimensions[size]

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative flex-shrink-0"
    >
      <img
        width={w}
        height={h}
        src="/government-seal.svg"
        alt="গণপ্রজাতন্ত্রী বাংলাদেশ সরকার"
        className="object-contain"
      />
    </motion.div>
  )
}
