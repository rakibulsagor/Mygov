'use client'

import { useSyncExternalStore, useCallback } from 'react'

const STORAGE_KEY = 'bangladesh-portal-recent'

export interface RecentItem {
  id: string
  title: string
  titleEn: string
  category: string
  href: string
  viewedAt: number
}

const MAX_ITEMS = 8

function readRecent(): RecentItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function writeRecent(items: RecentItem[]) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new CustomEvent('recent-changed'))
  } catch {
    // storage full or unavailable
  }
}

let cache: RecentItem[] | null = null
const listeners = new Set<() => void>()

function getSnapshot(): RecentItem[] {
  if (cache === null) {
    cache = readRecent()
  }
  return cache
}

function getServerSnapshot(): RecentItem[] {
  return []
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onChange = () => {
    cache = readRecent()
    listeners.forEach((l) => l())
  }
  window.addEventListener('recent-changed', onChange)
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('recent-changed', onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function useRecentlyViewed() {
  const recent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const addRecent = useCallback((item: Omit<RecentItem, 'viewedAt'>) => {
    const current = getSnapshot()
    // Remove if already exists (move to top)
    const filtered = current.filter((r) => r.id !== item.id)
    const newItems = [{ ...item, viewedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS)
    writeRecent(newItems)
  }, [])

  const removeRecent = useCallback((id: string) => {
    const current = getSnapshot()
    writeRecent(current.filter((r) => r.id !== id))
  }, [])

  const clearRecent = useCallback(() => {
    writeRecent([])
  }, [])

  return {
    recent,
    addRecent,
    removeRecent,
    clearRecent,
  }
}
