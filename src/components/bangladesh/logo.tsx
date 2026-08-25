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
      <svg
        width={w}
        height={h}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bg-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#006A4E" />
            <stop offset="100%" stopColor="#009965" />
          </linearGradient>
          <linearGradient id="bg-red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F42A41" />
            <stop offset="100%" stopColor="#E63946" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Outer rounded square with gradient */}
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="20"
          fill="url(#bg-green)"
          filter="url(#shadow)"
        />

        {/* Bangladesh flag red circle */}
        <circle cx="50" cy="50" r="22" fill="url(#bg-red)" />

        {/* Map pin / location dot accent */}
        <circle cx="50" cy="50" r="8" fill="white" opacity="0.95" />
        <circle cx="50" cy="50" r="4" fill="url(#bg-red)" />
      </svg>
    </motion.div>
  )
}
