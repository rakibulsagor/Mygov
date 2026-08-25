'use client'

import { useState, useCallback, useEffect } from 'react'
import { SitemapModal } from '@/components/bangladesh/sitemap-modal'
import { useKeyboardShortcut } from '@/hooks/use-keyboard-shortcut'

/**
 * Wraps the app to provide a global sitemap modal.
 */
export function SitemapProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const openSitemap = useCallback(() => {
    setOpen(true)
  }, [])

  // Keyboard shortcut: Ctrl+M for sitemap
  useKeyboardShortcut({ ctrlKey: true, key: 'm', handler: openSitemap })

  // Listen for toggle event from footer button
  useEffect(() => {
    const handler = () => setOpen((o) => !o)
    window.addEventListener('toggle-sitemap-modal', handler)
    return () => window.removeEventListener('toggle-sitemap-modal', handler)
  }, [])

  // Expose globally for footer button
  useEffect(() => {
    ;(window as unknown as { __openSitemap?: () => void }).__openSitemap = openSitemap
    return () => {
      delete (window as unknown as { __openSitemap?: () => void }).__openSitemap
    }
  }, [openSitemap])

  return (
    <>
      {children}
      <SitemapModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
