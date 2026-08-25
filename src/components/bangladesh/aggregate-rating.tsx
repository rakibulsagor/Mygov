'use client'

import { Star, Users } from 'lucide-react'

interface AggregateRatingProps {
  serviceId: string
  size?: 'sm' | 'md'
}

// Deterministic pseudo-random aggregate data based on serviceId
// (simulates server-side aggregate ratings — in production this would come from an API)
function getAggregate(serviceId: string): { average: number; count: number } {
  // Simple hash from serviceId
  let hash = 0
  for (let i = 0; i < serviceId.length; i++) {
    hash = ((hash << 5) - hash) + serviceId.charCodeAt(i)
    hash |= 0
  }
  const seed = Math.abs(hash)
  // Average between 3.5 and 4.9
  const average = 3.5 + (seed % 15) / 10
  // Count between 12 and 342
  const count = 12 + (seed % 331)
  return { average: Math.round(average * 10) / 10, count }
}

function toBn(num: number): string {
  const map = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num.toString().split('').map((d) => (/[0-9]/.test(d) ? map[parseInt(d)] : d)).join('')
}

export function AggregateRating({ serviceId, size = 'sm' }: AggregateRatingProps) {
  const { average, count } = getAggregate(serviceId)
  const dims = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'

  return (
    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
      {/* Filled stars showing average */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${dims} ${
              star <= Math.round(average)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      <span className="font-bengali font-medium text-amber-600 dark:text-amber-400">
        {toBn(average)}
      </span>
      <span className="flex items-center gap-0.5">
        (<Users className="h-2.5 w-2.5" />
        {toBn(count)})
      </span>
    </div>
  )
}
