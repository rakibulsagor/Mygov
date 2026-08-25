'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  GitCompare,
  Clock,
  DollarSign,
  Globe,
  Phone,
  CheckCircle2,
  ListChecks,
  UserCheck,
  Trash2,
} from 'lucide-react'
import type { ServiceDetail } from '@/data/service-details'
import { useComparison } from '@/hooks/use-comparison'

interface ComparisonModalProps {
  open: boolean
  services: ServiceDetail[]
  onClose: () => void
}

export function ComparisonModal({ open, services, onClose }: ComparisonModalProps) {
  const { removeFromCompare, clearCompare } = useComparison()

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [open])

  if (!open || services.length === 0) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden bg-card rounded-2xl border border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-primary/80 text-primary-foreground flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <GitCompare className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bengali text-lg font-bold">সেবা তুলনা</h2>
                  <p className="text-xs opacity-80 font-bengali">{services.length} টি সেবা তুলনা করা হচ্ছে</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearCompare}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-xs font-bengali flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  সব মুছুন
                </button>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
                  aria-label="বন্ধ করুন"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Comparison table */}
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <tbody>
                  {/* Service names row */}
                  <tr className="border-b border-border">
                    <td className="p-3 font-bengali font-bold text-muted-foreground text-right sticky left-0 bg-card z-10 min-w-[120px]">
                      সেবা
                    </td>
                    {services.map((svc) => (
                      <td key={svc.id} className="p-3 align-top border-l border-border min-w-[200px]">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bengali font-bold leading-tight">{svc.title}</h3>
                            <p className="text-xs text-muted-foreground">{svc.titleEn}</p>
                          </div>
                          <button
                            onClick={() => removeFromCompare(svc.id)}
                            className="w-6 h-6 rounded hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors flex-shrink-0"
                            aria-label="তালিকা থেকে সরান"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Description */}
                  <CompareRow icon={null} label="বিবরণ">
                    {services.map((svc) => (
                      <td key={svc.id} className="p-3 border-l border-border">
                        <p className="font-bengali text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {svc.description}
                        </p>
                      </td>
                    ))}
                  </CompareRow>

                  {/* Fee */}
                  <CompareRow icon={DollarSign} label="ফি">
                    {services.map((svc) => (
                      <td key={svc.id} className="p-3 border-l border-border">
                        <span className="font-bengali text-sm font-medium text-green-600 dark:text-green-400">{svc.fee}</span>
                      </td>
                    ))}
                  </CompareRow>

                  {/* Processing time */}
                  <CompareRow icon={Clock} label="প্রক্রিয়াকরণ সময়">
                    {services.map((svc) => (
                      <td key={svc.id} className="p-3 border-l border-border">
                        <span className="font-bengali text-sm">{svc.processingTime}</span>
                      </td>
                    ))}
                  </CompareRow>

                  {/* Eligibility */}
                  <CompareRow icon={UserCheck} label="যোগ্যতা">
                    {services.map((svc) => (
                      <td key={svc.id} className="p-3 border-l border-border align-top">
                        <ul className="space-y-1">
                          {svc.eligibility.map((e, i) => (
                            <li key={i} className="flex items-start gap-1.5 font-bengali text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                              {e}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </CompareRow>

                  {/* Requirements */}
                  <CompareRow icon={ListChecks} label="কাগজপত্র">
                    {services.map((svc) => (
                      <td key={svc.id} className="p-3 border-l border-border align-top">
                        <ul className="space-y-1">
                          {svc.requirements.map((r, i) => (
                            <li key={i} className="flex items-start gap-1.5 font-bengali text-xs text-muted-foreground">
                              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </CompareRow>

                  {/* Steps count */}
                  <CompareRow icon={ListChecks} label="ধাপসমূহ">
                    {services.map((svc) => (
                      <td key={svc.id} className="p-3 border-l border-border">
                        <span className="font-bengali text-sm">{svc.steps.length} টি ধাপ</span>
                      </td>
                    ))}
                  </CompareRow>

                  {/* Website */}
                  <CompareRow icon={Globe} label="ওয়েবসাইট">
                    {services.map((svc) => (
                      <td key={svc.id} className="p-3 border-l border-border">
                        <a
                          href={`https://${svc.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline truncate block"
                        >
                          {svc.website}
                        </a>
                      </td>
                    ))}
                  </CompareRow>

                  {/* Phone */}
                  <CompareRow icon={Phone} label="হটলাইন">
                    {services.map((svc) => (
                      <td key={svc.id} className="p-3 border-l border-border">
                        <a href={`tel:${svc.phone}`} className="text-xs text-primary hover:underline font-bengali">
                          {svc.phone}
                        </a>
                      </td>
                    ))}
                  </CompareRow>
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CompareRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }> | null
  label: string
  children: React.ReactNode
}) {
  return (
    <tr className="border-b border-border hover:bg-muted/30">
      <td className="p-3 font-bengali font-medium text-muted-foreground text-right sticky left-0 bg-card z-10 min-w-[120px]">
        <div className="flex items-center justify-end gap-1.5">
          {Icon && <Icon className="h-3.5 w-3.5 text-primary" />}
          <span className="text-xs">{label}</span>
        </div>
      </td>
      {children}
    </tr>
  )
}
