'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, X } from 'lucide-react'
import { useVoiceSearch } from '@/hooks/use-voice-search'

interface VoiceSearchButtonProps {
  onResult: (transcript: string) => void
  className?: string
  size?: 'sm' | 'md'
}

export function VoiceSearchButton({ onResult, className = '', size = 'md' }: VoiceSearchButtonProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const { isListening, transcript, isSupported, error, startListening, stopListening, reset } =
    useVoiceSearch({
      lang: 'bn-BD',
      onResult: (text) => {
        onResult(text)
        setTimeout(() => setShowOverlay(false), 500)
      },
    })

  // Cleanup on unmount
  useEffect(() => {
    return () => stopListening()
  }, [stopListening])

  const handleClick = () => {
    setShowOverlay(true)
    reset()
    startListening()
  }

  const handleClose = () => {
    stopListening()
    setShowOverlay(false)
    reset()
  }

  const dims = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10'
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`${dims} rounded-xl bg-muted hover:bg-accent flex items-center justify-center transition-colors flex-shrink-0 ${className}`}
        aria-label="ভয়েস সার্চ"
        title="ভয়েস সার্চ"
      >
        <Mic className={`${iconSize} text-muted-foreground`} />
      </button>

      {/* Voice search overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card rounded-3xl border border-border shadow-2xl p-8 max-w-md w-full text-center"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="h-4 w-4" />
              </button>

              {!isSupported ? (
                <div>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                    <MicOff className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-bengali text-lg font-bold mb-2">
                    ভয়েস সার্চ সমর্থিত নয়
                  </h3>
                  <p className="font-bengali text-sm text-muted-foreground mb-4">
                    আপনার ব্রাউজারে ভয়েস সার্চ সুবিধা উপলব্ধ নয়। অনুগ্রহ করে Google Chrome বা
                    Microsoft Edge ব্যবহার করুন।
                  </p>
                </div>
              ) : (
                <>
                  {/* Animated mic icon */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {isListening && (
                      <>
                        <motion.span
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-chart-2"
                        />
                        <motion.span
                          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                          className="absolute inset-0 rounded-full bg-chart-2"
                        />
                      </>
                    )}
                    <div
                      className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full transition-colors ${
                        isListening
                          ? 'bg-gradient-to-br from-chart-2 to-red-600'
                          : 'bg-gradient-to-br from-primary to-primary/80'
                      }`}
                    >
                      <Mic className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Status text */}
                  <h3 className="font-bengali text-xl font-bold mb-2">
                    {isListening ? 'শুনছি...' : 'ভয়েস সার্চ'}
                  </h3>
                  <p className="font-bengali text-sm text-muted-foreground mb-4">
                    {isListening
                      ? 'বাংলায় আপনার প্রশ্ন বলুন'
                      : 'নিচের বাটনে ক্লিক করে কথা বলুন'}
                  </p>

                  {/* Transcript display */}
                  {transcript && (
                    <div className="mb-4 p-3 rounded-xl bg-muted/50 border border-border">
                      <p className="font-bengali text-sm text-foreground leading-relaxed">
                        {transcript}
                      </p>
                    </div>
                  )}

                  {/* Error message */}
                  {error && (
                    <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                      <p className="font-bengali text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  {/* Control buttons */}
                  <div className="flex items-center justify-center gap-3">
                    {isListening ? (
                      <button
                        onClick={handleClose}
                        className="px-6 py-2.5 rounded-full bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity font-bengali text-sm font-medium"
                      >
                        বন্ধ করুন
                      </button>
                    ) : (
                      <button
                        onClick={startListening}
                        className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-bengali text-sm font-medium"
                      >
                        আবার চেষ্টা করুন
                      </button>
                    )}
                  </div>

                  {/* Tip */}
                  <p className="font-bengali text-xs text-muted-foreground mt-4">
                    💡 টিপ: পরিষ্কারভাবে বাংলায় কথা বলুন এবং শব্দের মাঝে বিরতি দিন
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
