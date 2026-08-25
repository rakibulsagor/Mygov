'use client'

import { useState, useCallback, useEffect } from 'react'
import { SearchModal } from '@/components/bangladesh/search-modal'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'

/**
 * Wraps the app to provide a global search modal triggered by Ctrl+K / Cmd+K.
 * Also exposes an imperative API via window.__openSearch for other components.
 */
export function GlobalSearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const openSearch = useCallback((q = '') => {
    setQuery(q)
    setOpen(true)
  }, [])

  useKeyboardShortcut({ ctrlKey: true, key: 'k', handler: () => openSearch() })

  // Expose globally for header/hero search buttons
  useEffect(() => {
    ;(window as unknown as { __openSearch?: (q?: string) => void }).__openSearch = openSearch
    return () => {
      delete (window as unknown as { __openSearch?: (q?: string) => void }).__openSearch
    }
  }, [openSearch])

  return (
    <>
      {children}
      <SearchModal open={open} onClose={() => setOpen(false)} initialQuery={query} />
    </>
  )
}
