'use client'

import { useState } from 'react'
import { Calendar, Globe, Accessibility, Sun, Moon, ChevronDown, Palette } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from './language-provider'

function getBengaliDate() {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ]
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার']
  const now = new Date()
  const day = days[now.getDay()]
  const date = now.getDate()
  const month = months[now.getMonth()]
  const year = now.getFullYear()
  return `${day}, ${date} ${month} ${year}`
}

export function TopBar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [date] = useState(getBengaliDate)

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-sm">
          {/* Left: Date */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 opacity-80" />
              <span className="font-bengali" suppressHydrationWarning>{date}</span>
            </div>
          </div>

          {/* Right: Language, Accessibility, Theme */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 h-8 gap-1"
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{language === 'bn' ? 'বাংলা' : 'English'}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('bn')}>বাংলা (BN)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>English (EN)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Accessibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20 h-8 gap-1"
                >
                  <Accessibility className="h-4 w-4" />
                  <span className="hidden md:inline">এক্সেসিবিলিটি</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>ফন্ট বৃদ্ধি</DropdownMenuItem>
                <DropdownMenuItem>ফন্ট হ্রাস</DropdownMenuItem>
                <DropdownMenuItem>মনোক্রোম</DropdownMenuItem>
                <DropdownMenuItem>ইনভার্ট</DropdownMenuItem>
                <DropdownMenuItem>বড় কার্সর</DropdownMenuItem>
                <DropdownMenuItem>লিঙ্ক হাইলাইট</DropdownMenuItem>
                <DropdownMenuItem>শিরোনাম হাইলাইট</DropdownMenuItem>
                <DropdownMenuItem>পড়ার গাইড</DropdownMenuItem>
                <DropdownMenuItem>রিসেট</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme color customizer */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const toggle = (window as unknown as { __toggleThemeCustomizer?: () => void }).__toggleThemeCustomizer
                toggle?.()
              }}
              className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
              aria-label="থিম কালার"
              title="থিম কালার পরিবর্তন করুন"
            >
              <Palette className="h-4 w-4" />
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
