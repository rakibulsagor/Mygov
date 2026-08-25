'use client'

import { useSyncExternalStore, useCallback } from 'react'

const STORAGE_KEY = 'bangladesh-portal-notifications'

export type NotificationCategory = 'notice' | 'circular' | 'news' | 'job' | 'tender'

export interface NotificationPrefs {
  enabled: boolean
  categories: Record<NotificationCategory, boolean>
  email?: string
  phone?: string
}

const defaultPrefs: NotificationPrefs = {
  enabled: false,
  categories: {
    notice: true,
    circular: true,
    news: false,
    job: true,
    tender: false,
  },
}

function readPrefs(): NotificationPrefs {
  if (typeof window === 'undefined') return defaultPrefs
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultPrefs
    const parsed = JSON.parse(raw)
    return {
      ...defaultPrefs,
      ...parsed,
      categories: { ...defaultPrefs.categories, ...(parsed.categories || {}) },
    }
  } catch {
    return defaultPrefs
  }
}

function writePrefs(prefs: NotificationPrefs) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    window.dispatchEvent(new CustomEvent('notifications-changed'))
  } catch {
    // ignore
  }
}

let cache: NotificationPrefs | null = null
const listeners = new Set<() => void>()

function getSnapshot(): NotificationPrefs {
  if (cache === null) {
    cache = readPrefs()
  }
  return cache
}

function getServerSnapshot(): NotificationPrefs {
  return defaultPrefs
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onChange = () => {
    cache = readPrefs()
    listeners.forEach((l) => l())
  }
  window.addEventListener('notifications-changed', onChange)
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('notifications-changed', onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function useNotifications() {
  const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setEnabled = useCallback((enabled: boolean) => {
    writePrefs({ ...getSnapshot(), enabled })
  }, [])

  const toggleCategory = useCallback((category: NotificationCategory) => {
    const current = getSnapshot()
    writePrefs({
      ...current,
      categories: {
        ...current.categories,
        [category]: !current.categories[category],
      },
    })
  }, [])

  const setCategory = useCallback((category: NotificationCategory, enabled: boolean) => {
    const current = getSnapshot()
    writePrefs({
      ...current,
      categories: { ...current.categories, [category]: enabled },
    })
  }, [])

  const setContact = useCallback((field: 'email' | 'phone', value: string) => {
    writePrefs({ ...getSnapshot(), [field]: value })
  }, [])

  const reset = useCallback(() => {
    writePrefs(defaultPrefs)
  }, [])

  const enabledCategories = Object.entries(prefs.categories)
    .filter(([, v]) => v)
    .map(([k]) => k as NotificationCategory)

  return {
    prefs,
    setEnabled,
    toggleCategory,
    setCategory,
    setContact,
    reset,
    enabledCategories,
  }
}
