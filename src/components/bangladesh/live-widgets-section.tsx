'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CloudSun,
  CloudRain,
  Sun,
  Cloud,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Calendar,
  Wind,
  Droplets,
  Eye,
} from 'lucide-react'

// Weather data for major cities
const weatherData = [
  { city: 'ঢাকা', cityEn: 'Dhaka', temp: 32, condition: 'আংশিক মেঘলা', conditionEn: 'Partly Cloudy', icon: CloudSun, humidity: 75, wind: 12 },
  { city: 'চট্টগ্রাম', cityEn: 'Chittagong', temp: 30, condition: 'বৃষ্টি', conditionEn: 'Rainy', icon: CloudRain, humidity: 88, wind: 18 },
  { city: 'রাজশাহী', cityEn: 'Rajshahi', temp: 35, condition: 'রৌদ্রোজ্জ্বল', conditionEn: 'Sunny', icon: Sun, humidity: 55, wind: 8 },
  { city: 'সিলেট', cityEn: 'Sylhet', temp: 29, condition: 'মেঘলা', conditionEn: 'Cloudy', icon: Cloud, humidity: 82, wind: 10 },
]

// Exchange rates (BDT per unit)
const exchangeRates = [
  { currency: 'USD', currencyBn: 'মার্কিন ডলার', buy: 120.50, sell: 121.20, flag: '🇺🇸', trend: 'up' as const },
  { currency: 'EUR', currencyBn: 'ইউরো', buy: 130.75, sell: 131.50, flag: '🇪🇺', trend: 'down' as const },
  { currency: 'GBP', currencyBn: 'পাউন্ড', buy: 152.30, sell: 153.10, flag: '🇬🇧', trend: 'up' as const },
  { currency: 'SAR', currencyBn: 'রিয়াল', buy: 32.10, sell: 32.30, flag: '🇸🇦', trend: 'up' as const },
  { currency: 'JPY', currencyBn: 'ইয়েন', buy: 0.80, sell: 0.82, flag: '🇯🇵', trend: 'down' as const },
  { currency: 'INR', currencyBn: 'রুপি', buy: 1.43, sell: 1.45, flag: '🇮🇳', trend: 'up' as const },
]

// Convert number to Bengali numerals
function toBn(num: number): string {
  const map = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num.toFixed(2).split('').map((c) => /\d/.test(c) ? map[parseInt(c)] : c).join('')
}

function LiveClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const map = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
      const toBn = (s: string) => s.split('').map((c) => /\d/.test(c) ? map[parseInt(c)] : c).join('')
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      const period = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12
      setTime(`${toBn(displayHours.toString())}:${toBn(minutes)}:${toBn(seconds)} ${period}`)

      const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর']
      const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার']
      setDate(`${days[now.getDay()]}, ${toBn(now.getDate().toString())} ${months[now.getMonth()]} ${toBn(now.getFullYear().toString())}`)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 text-primary-foreground">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 opacity-80" />
        <span className="font-bengali text-sm font-medium">বর্তমান সময়</span>
      </div>
      <div className="font-bengali text-3xl font-bold tabular-nums mb-1" suppressHydrationWarning>
        {time}
      </div>
      <div className="flex items-center gap-1.5 text-sm opacity-80 font-bengali" suppressHydrationWarning>
        <Calendar className="h-3.5 w-3.5" />
        {date}
      </div>
      <div className="mt-3 pt-3 border-t border-primary-foreground/20 flex items-center justify-between text-xs">
        <span className="opacity-70 font-bengali">সময় অঞ্চল</span>
        <span className="font-medium">GMT+6 (BST)</span>
      </div>
    </div>
  )
}

export function LiveWidgetsSection() {
  const [activeCity, setActiveCity] = useState(0)

  return (
    <section id="live-widgets" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-chart-3/10 text-chart-3 text-sm font-medium font-bengali mb-3">
              লাইভ আপডেট
            </span>
            <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
              বাংলাদেশের বর্তমান তথ্য
            </h2>
            <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
              আবহাওয়া, বৈদেশিক মুদ্রার হার ও সময় — সব এক জায়গায়
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-chart-3 to-chart-4 rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Weather Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-2xl border border-border overflow-hidden h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <CloudSun className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bengali font-bold">আবহাওয়া</h3>
                </div>
                <span className="text-xs text-muted-foreground font-bengali">শেষ আপডেট: এইমাত্র</span>
              </div>

              {/* Active city weather */}
              <div className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
                {(() => {
                  const city = weatherData[activeCity]
                  const Icon = city.icon
                  return (
                    <div className="flex items-center gap-5">
                      <div className="flex-shrink-0">
                        <motion.div
                          key={activeCity}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg"
                        >
                          <Icon className="h-12 w-12 text-white" />
                        </motion.div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bengali text-4xl font-bold">{toBn(city.temp)}°</span>
                          <span className="text-lg text-muted-foreground">C</span>
                        </div>
                        <h4 className="font-bengali text-lg font-semibold">{city.city}</h4>
                        <p className="font-bengali text-sm text-muted-foreground">{city.condition} • {city.conditionEn}</p>
                      </div>
                      <div className="hidden sm:flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Droplets className="h-4 w-4 text-cyan-500" />
                          <span className="font-bengali">আর্দ্রতা: {toBn(city.humidity)}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Wind className="h-4 w-4 text-cyan-500" />
                          <span className="font-bengali">বাতাস: {toBn(city.wind)} km/h</span>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* City selector */}
              <div className="grid grid-cols-4 divide-x divide-border border-t border-border">
                {weatherData.map((city, i) => {
                  const Icon = city.icon
                  return (
                    <button
                      key={city.city}
                      onClick={() => setActiveCity(i)}
                      className={`p-3 text-center transition-colors ${
                        activeCity === i
                          ? 'bg-primary/5 text-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mx-auto mb-1 ${activeCity === i ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="font-bengali text-xs font-medium">{city.city}</div>
                      <div className="font-bengali text-sm font-bold">{toBn(city.temp)}°</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Clock Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <LiveClock />
          </motion.div>
        </div>

        {/* Exchange rates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-5"
        >
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-bengali font-bold">বৈদেশিক মুদ্রার হার</h3>
              </div>
              <span className="text-xs text-muted-foreground font-bengali">বাংলাদেশ ব্যাংক অনুসারে</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-border md:divide-y-0">
              {exchangeRates.map((rate, i) => (
                <motion.div
                  key={rate.currency}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{rate.flag}</span>
                    <div className={`flex items-center gap-0.5 text-xs font-medium ${
                      rate.trend === 'up' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {rate.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {rate.trend === 'up' ? '↑' : '↓'}
                    </div>
                  </div>
                  <div className="font-bold text-sm mb-0.5">{rate.currency}</div>
                  <div className="text-xs text-muted-foreground font-bengali mb-2">{rate.currencyBn}</div>
                  <div className="space-y-0.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-bengali">ক্রয়:</span>
                      <span className="font-bengali font-medium tabular-nums">৳{toBn(rate.buy)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-bengali">বিক্রয়:</span>
                      <span className="font-bengali font-medium tabular-nums">৳{toBn(rate.sell)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
