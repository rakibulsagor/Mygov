'use client'

import { useSyncExternalStore, useCallback } from 'react'

const STORAGE_KEY = 'bangladesh-portal-ratings'

export interface Rating {
  serviceId: string
  stars: number // 1-5
  ratedAt: number
}

function readRatings(): Record<string, Rating> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    return parsed
  } catch {
    return {}
  }
}

function writeRatings(ratings: Record<string, Rating>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
    window.dispatchEvent(new CustomEvent('ratings-changed'))
  } catch {
    // ignore
  }
}

let cache: Record<string, Rating> | null = null
const listeners = new Set<() => void>()

function getSnapshot(): Record<string, Rating> {
  if (cache === null) {
    cache = readRatings()
  }
  return cache
}

function getServerSnapshot(): Record<string, Rating> {
  return {}
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onChange = () => {
    cache = readRatings()
    listeners.forEach((l) => l())
  }
  window.addEventListener('ratings-changed', onChange)
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('ratings-changed', onChange)
    window.removeEventListener('storage', onChange)
  }
}

export function useRatings() {
  const ratings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const getRating = useCallback(
    (serviceId: string): number => {
      return ratings[serviceId]?.stars || 0
    },
    [ratings]
  )

  const setRating = useCallback((serviceId: string, stars: number) => {
    const current = getSnapshot()
    const newRatings = {
      ...current,
      [serviceId]: { serviceId, stars, ratedAt: Date.now() },
    }
    writeRatings(newRatings)
  }, [])

  const removeRating = useCallback((serviceId: string) => {
    const current = getSnapshot()
    const newRatings = { ...current }
    delete newRatings[serviceId]
    writeRatings(newRatings)
  }, [])

  const ratedCount = Object.keys(ratings).length

  return {
    ratings,
    getRating,
    setRating,
    removeRating,
    ratedCount,
  }
}
