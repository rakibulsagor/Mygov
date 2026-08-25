'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  Link as LinkIcon,
  X,
} from 'lucide-react'

interface ShareButtonProps {
  title: string
  text?: string
  url?: string
  variant?: 'icon' | 'full'
  size?: 'sm' | 'md'
}

export function ShareButton({
  title,
  text = '',
  url,
  variant = 'icon',
  size = 'sm',
}: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  // Use current page URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(text || title)

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-slate-500 hover:bg-slate-600',
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = shareUrl
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Native share API if available
  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, text: text || title, url: shareUrl })
        setOpen(false)
        return
      } catch {
        // user cancelled, fall through to custom menu
      }
    }
    setOpen((o) => !o)
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const dims = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
  const iconDim = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleNativeShare()
        }}
        className={`${dims} rounded-lg bg-background/60 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-primary/10 hover:text-primary ${
          variant === 'icon' ? 'opacity-0 group-hover:opacity-100' : ''
        }`}
        aria-label="শেয়ার করুন"
        title="শেয়ার করুন"
      >
        <Share2 className={iconDim} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30"
          >
            <div className="bg-card rounded-xl border border-border shadow-2xl overflow-hidden min-w-[200px]">
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
                <span className="font-bengali text-xs font-bold">শেয়ার করুন</span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-5 h-5 rounded hover:bg-muted flex items-center justify-center"
                  aria-label="বন্ধ"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>

              {/* Social options */}
              <div className="p-2 grid grid-cols-4 gap-1.5">
                {shareOptions.map((opt) => (
                  <a
                    key={opt.name}
                    href={opt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg text-white transition-colors ${opt.color}`}
                    title={opt.name}
                  >
                    <opt.icon className="h-4 w-4" />
                    <span className="text-[9px] font-bengali">{opt.name}</span>
                  </a>
                ))}
              </div>

              {/* Copy link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-2 px-3 py-2 border-t border-border hover:bg-accent transition-colors text-sm"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="font-bengali text-green-600">কপি হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-bengali">লিংক কপি করুন</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
