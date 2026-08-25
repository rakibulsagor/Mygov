'use client'

import { useSyncExternalStore, useCallback } from 'react'

const STORAGE_KEY = 'bangladesh-portal-compare'
const MAX_ITEMS = 3

export interface CompareItem {
  id: string
  title: string
  titleEn: string
  icon: string
}

function readCompare(): CompareItem[] {
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

function writeCompare(items: CompareItem[]) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new CustomEvent('compare-changed'))
  } catch {
    // ignore
  }
}

let cache: CompareItem[] | null = null
const listeners = new Set<() => void>()

function getSnapshot(): CompareItem[] {
  if (cache === null) {
    cache = readCompare()
  }
  return cache
}

function getServerSnapshot(): CompareItem[] {
  return []
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onChange = () => {
    cache = readCompare()
    listeners.forEach((l) => l())
  }
  window.addEventListener('compare-changed', onChange)
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('compare-changed', onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function useComparison() {
  const compareItems = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const isInCompare = useCallback(
    (id: string) => compareItems.some((c) => c.id === id),
    [compareItems]
  )

  const addToCompare = useCallback((item: CompareItem): { ok: boolean; error?: string } => {
    const current = getSnapshot()
    if (current.some((c) => c.id === item.id)) {
      return { ok: false, error: 'ইতিমধ্যে তালিকায় আছে' }
    }
    if (current.length >= MAX_ITEMS) {
      return { ok: false, error: `সর্বোচ্চ ${MAX_ITEMS} টি সেবা তুলনা করা যায়` }
    }
    writeCompare([...current, item])
    return { ok: true }
  }, [])

  const removeFromCompare = useCallback((id: string) => {
    const current = getSnapshot()
    writeCompare(current.filter((c) => c.id !== id))
  }, [])

  const toggleCompare = useCallback(
    (item: CompareItem): { ok: boolean; error?: string } => {
      if (isInCompare(item.id)) {
        removeFromCompare(item.id)
        return { ok: true }
      }
      return addToCompare(item)
    },
    [isInCompare, addToCompare, removeFromCompare]
  )

  const clearCompare = useCallback(() => {
    writeCompare([])
  }, [])

  return {
    compareItems,
    isInCompare,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    maxItems: MAX_ITEMS,
  }
}
