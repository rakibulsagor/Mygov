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

  return {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    clearBookmarks,
  }
}

