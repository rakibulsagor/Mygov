'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { navMenu } from '@/data/bangladesh-data'
import { BangladeshLogo } from './logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg border-b border-border/40'
          : 'bg-card/95 backdrop-blur-sm'
      }`}
    >
      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all ${scrolled ? 'py-2' : 'py-3'}`}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BangladeshLogo size={scrolled ? 'sm' : 'md'} />
            <div className="hidden sm:block">
              <h1 className="font-bengali text-lg font-bold text-primary leading-tight">
                বাংলাদেশ জাতীয় তথ্য বাতায়ন
              </h1>
              <p className="text-xs text-muted-foreground font-bengali">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
              </p>
            </div>
          </div>

          {/* Search bar - desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="অনুসন্ধান করুন..."
                className="pl-10 pr-4 h-10 bg-background/50 border-border/50 focus-visible:bg-background transition-all"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle - mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-bengali text-right">মেনু</SheetTitle>
                </SheetHeader>
                <MobileNav onClose={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="অনুসন্ধান করুন..."
                    className="pl-10 h-10"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden xl:block border-t border-border/40 bg-card/50">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-1">
            {navMenu.map((item) => (
              <li
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors font-bengali"
                >
                  {item.title}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  )}
                </a>

                {/* Mega menu */}
                {item.children && (
                  <AnimatePresence>
                    {activeMenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full z-50 w-72 pt-1"
                      >
                        <div className="rounded-xl border border-border bg-popover shadow-xl overflow-hidden">
                          <div className="h-1 bg-gradient-to-r from-primary via-primary to-chart-2" />
                          <ul className="p-2">
                            {item.children.map((child) => (
                              <li key={child.title}>
                                <a
                                  href={child.href}
                                  className="block px-3 py-2 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-bengali"
                                >
                                  <span className="block">{child.title}</span>
                                  <span className="block text-xs text-muted-foreground">
                                    {child.titleEn}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

function MobileNav({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <nav className="mt-4">
      <ul className="space-y-1">
        {navMenu.map((item) => (
          <li key={item.title}>
            {item.children ? (
              <>
                <button
                  onClick={() => setExpanded(expanded === item.title ? null : item.title)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-accent transition-colors font-bengali text-right"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      expanded === item.title ? 'rotate-180' : ''
                    }`}
                  />
                  <span>{item.title}</span>
                </button>
                <AnimatePresence>
                  {expanded === item.title && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mr-3 space-y-0.5"
                    >
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <a
                            href={child.href}
                            onClick={onClose}
                            className="block px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors font-bengali text-right"
                          >
                            <span className="block">{child.title}</span>
                            <span className="block text-xs text-muted-foreground">
                              {child.titleEn}
                            </span>
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <a
                href={item.href}
                onClick={onClose}
                className="block px-3 py-2.5 rounded-lg hover:bg-accent transition-colors font-bengali text-right"
              >
                {item.title}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Contact info */}
      <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 justify-end font-bengali">
          <span>৩৩৩ (সরকারি তথ্য ও সেবা)</span>
          <Phone className="h-4 w-4 text-primary" />
        </div>
        <div className="flex items-center gap-2 justify-end font-bengali">
          <span>info@bangladesh.gov.bd</span>
          <Mail className="h-4 w-4 text-primary" />
        </div>
        <div className="flex items-center gap-2 justify-end font-bengali">
          <span>ঢাকা, বাংলাদেশ</span>
          <MapPin className="h-4 w-4 text-primary" />
        </div>
      </div>
    </nav>
  )
}
