'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  X,
  History,
  Trash2,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { useRecentlyViewed } from '@/hooks/use-recently-viewed'
import {
  Monitor,
  FileText,
  GraduationCap,
  ClipboardCheck,
  Wheat,
  Briefcase,
  Plane,
  School,
  Receipt,
  Award,
  Database,
  BookOpen,
  Calculator,
  Car,
  Package,
  HelpCircle,
  Ticket,
  HeartPulse,
  Landmark,
  FileCheck,
  Fish,
  Radio,
  BrainCircuit,
  Star,
  Sparkles,
  Smartphone,
  Building2,
  LayoutGrid,
  Wallet,
  TrendingUp,
  CloudSun,
  ShieldCheck,
  Megaphone,
  MapPin,
  Users,
  Navigation,
} from 'lucide-react'
import { CurrencyTaka } from '@/components/ui/currency-taka'

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  DollarSign: CurrencyTaka,
  FileText,
  GraduationCap,
  ClipboardCheck,
  Wheat,
  Briefcase,
  Plane,
  School,
  Receipt,
  Award,
  Database,
  BookOpen,
  Calculator,
  Car,
  Package,
  HelpCircle,
  Ticket,
  HeartPulse,
  Landmark,
  FileCheck,
  Fish,
  Radio,
  BrainCircuit,
  Star,
  Sparkles,
  Smartphone,
  Building2,
  LayoutGrid,
  Wallet,
  TrendingUp,
  CloudSun,
  ShieldCheck,
  Megaphone,
  MapPin,
  Users,
  Navigation,
  Building2,
}

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 1) return 'এইমাত্র'
  if (minutes < 60) return `${minutes} মিনিট আগে`
  if (hours < 24) return `${hours} ঘন্টা আগে`
  if (days < 7) return `${days} দিন আগে`
  return 'অনেক আগে'
}

// Convert numbers to Bengali numerals in time strings
function toBn(text: string): string {
  const map: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
  }
  return text.replace(/[0-9]/g, (d) => map[d] || d)
}

export function RecentlyViewedWidget() {
  const { recent, removeRecent, clearRecent } = useRecentlyViewed()

  if (recent.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-chart-2/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <History className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-bengali text-sm font-bold">সম্প্রতি দেখা</h3>
            <p className="text-[10px] text-muted-foreground font-bengali">
              আপনার সাম্প্রতিক কার্যকলাপ
            </p>
          </div>
        </div>
        <button
          onClick={clearRecent}
          className="flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors font-bengali"
          aria-label="ইতিহাস মুছুন"
        >
          <Trash2 className="h-3 w-3" />
          মুছুন
        </button>
      </div>

      {/* Items list */}
      <div className="max-h-80 overflow-y-auto">
        <AnimatePresence initial={false}>
          {recent.map((item, i) => {
            const Icon = iconMap[item.category] || FileText
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.03 }}
                className="group flex items-center gap-3 p-3 border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors"
              >
                <a href={item.href} className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bengali text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" />
                      <span className="font-bengali">{toBn(timeAgo(item.viewedAt))}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </a>
                <button
                  onClick={() => removeRecent(item.id)}
                  className="flex-shrink-0 w-6 h-6 rounded hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="মুছুন"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
