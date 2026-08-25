'use client'

import { useState, useEffect } from 'react'
import { NotificationPrefsModal } from '@/components/bangladesh/notification-prefs-modal'

/**
 * Wraps the app to provide the notification preferences modal.
 * Triggered by 'toggle-notifications-modal' custom event.
 */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen((o) => !o)
    window.addEventListener('toggle-notifications-modal', handler)
    return () => window.removeEventListener('toggle-notifications-modal', handler)
  }, [])

  return (
    <>
      {children}
      <NotificationPrefsModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
