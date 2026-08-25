'use client'

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'bangladesh-portal-bookmarks'

export interface Bookmark {
  id: string
  title: string
  titleEn: string
  icon?: string
  href: string
  addedAt: number
}

function readBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function writeBookmarks(bookmarks: Bookmark[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    window.dispatchEvent(new CustomEvent('bookmarks-changed'))
  } catch {
    // storage full or unavailable
  }
}

// External store for bookmarks — useSyncExternalStore handles SSR + hydration
let cache: Bookmark[] | null = null
const listeners = new Set<() => void>()

function getSnapshot(): Bookmark[] {
  if (cache === null) {
    cache = readBookmarks()
  }
  return cache
}

function getServerSnapshot(): Bookmark[] {
  return []
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onChange = () => {
    cache = readBookmarks()
    listeners.forEach((l) => l())
  }
  window.addEventListener('bookmarks-changed', onChange)
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('bookmarks-changed', onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function useBookmarks() {
  // useSyncExternalStore returns [] on server and real bookmarks on client.
  // During hydration both are [], so after hydration the value updates automatically.
  const bookmarks = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  )

  const addBookmark = useCallback((bookmark: Omit<Bookmark, 'addedAt'>) => {
    const current = getSnapshot()
    if (current.some((b) => b.id === bookmark.id)) return
    const newBookmarks = [...current, { ...bookmark, addedAt: Date.now() }]
    writeBookmarks(newBookmarks)
  }, [])

  const removeBookmark = useCallback((id: string) => {
    const current = getSnapshot()
    const newBookmarks = current.filter((b) => b.id !== id)
    writeBookmarks(newBookmarks)
  }, [])

  const toggleBookmark = useCallback(
    (bookmark: Omit<Bookmark, 'addedAt'>) => {
      if (isBookmarked(bookmark.id)) {
        removeBookmark(bookmark.id)
      } else {
        addBookmark(bookmark)
      }
    },
    [isBookmarked, addBookmark, removeBookmark]
  )

  const clearBookmarks = useCallback(() => {
    writeBookmarks([])
  }, [])

  const exportBookmarks = useCallback((): string => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      bookmarks: getSnapshot(),
    }
    return JSON.stringify(data, null, 2)
  }, [])

  const importBookmarks = useCallback((jsonString: string, mode: 'merge' | 'replace' = 'merge'): { ok: boolean; count: number; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString)
      const imported: Bookmark[] = Array.isArray(parsed) ? parsed : parsed?.bookmarks
      if (!Array.isArray(imported)) {
        return { ok: false, count: 0, error: 'অবৈধ ফরম্যাট' }
      }
      // Validate structure
      const valid = imported.filter(
        (b) => b && typeof b.id === 'string' && typeof b.title === 'string' && typeof b.href === 'string'
      )
      if (mode === 'replace') {
        writeBookmarks(valid)
        return { ok: true, count: valid.length }
      }
      // merge: dedupe by id
      const current = getSnapshot()
      const existingIds = new Set(current.map((b) => b.id))
      const newOnes = valid.filter((b) => !existingIds.has(b.id))
      writeBookmarks([...newOnes, ...current])
      return { ok: true, count: newOnes.length }
    } catch {
      return { ok: false, count: 0, error: 'JSON পার্স করা যায়নি' }
    }
  }, [])

  return {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    clearBookmarks,
    exportBookmarks,
    importBookmarks,
  }
}

