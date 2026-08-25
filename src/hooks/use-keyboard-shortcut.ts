'use client'

import { useEffect } from 'react'

interface KeyboardShortcutOptions {
  ctrlKey?: boolean
  metaKey?: boolean
  key: string
  handler: () => void
}

export function useKeyboardShortcut({
  ctrlKey = false,
  metaKey = false,
  key,
  handler,
}: KeyboardShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrlMatch = ctrlKey ? (e.ctrlKey || e.metaKey) : true
      const metaMatch = metaKey ? (e.metaKey || e.ctrlKey) : true
      if (ctrlMatch && metaMatch && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault()
        handler()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [ctrlKey, metaKey, key, handler])
}
