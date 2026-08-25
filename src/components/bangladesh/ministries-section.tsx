'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Building2, ArrowUpRight, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ministries } from '@/data/bangladesh-data'
import { officialLinks } from '@/data/official-links'

const officialUrlAliases: Record<string, string> = {
  a2i: 'https://a2i.gov.bd/',
  desco: 'https://desco.gov.bd/',
  bida: 'https://bida.gov.bd/',
  bmet: 'https://bmet.gov.bd/',
  bpsc: 'https://bpsc.gov.bd/',
  'ministry of information': 'https://mib.gov.bd/',
  'ministry of power energy and mineral resources': 'https://powerdivision.gov.bd/',
  "ministry of expatriates welfare": 'https://probashi.gov.bd/',
  'bangladesh bank': 'https://www.bb.org.bd/',
  bcc: 'https://bcc.gov.bd/',
  'postal department': 'https://bdpost.gov.bd/',
  rjsc: 'https://roc.gov.bd/',
  'election commission': 'https://ecs.gov.bd/',
  'fire service and civil defense': 'https://fireservice.gov.bd/',
  'finance division': 'https://mof.gov.bd/',
  wasa: 'https://dwasa.org.bd/',
  dpdc: 'https://dpdc.gov.bd/',
}

function getOfficialUrl(nameEn: string) {
  const normalizedName = nameEn.toLowerCase().replace(/&/g, ' and ').replace(/[(),.'-]/g, ' ').replace(/\s+/g, ' ').trim()
  return officialUrlAliases[normalizedName] ?? officialLinks.find((link) => {
    const normalizedLinkName = link.nameEn.toLowerCase().replace(/&/g, ' and ').replace(/[(),.'-]/g, ' ').replace(/\s+/g, ' ').trim()
    return normalizedLinkName === normalizedName
  })?.url
}

export function MinistriesSection() {
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return ministries
    return ministries.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.nameEn.toLowerCase().includes(q)
    )
  }, [query])

  const displayed = showAll ? filtered : filtered.slice(0, 24)

  return (
    <section id="ministries" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-chart-2/10 text-chart-2 text-sm font-medium font-bengali mb-3">
              মন্ত্রণালয় ও বিভাগ
            </span>
            <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-2">
              সরকারি অফিস ও মন্ত্রণালয়সমূহ
            </h2>
            <p className="text-muted-foreground font-bengali max-w-2xl mx-auto">
              খুঁজে নিন সকল মন্ত্রণালয়, বিভাগ ও অধিদপ্তরের তথ্য
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-chart-2 to-primary rounded-full mx-auto mt-4" />
          </motion.div>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="মন্ত্রণালয়ের নাম লিখে খুঁজুন..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 font-bengali rounded-full"
            />
            {query && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-bengali">
                {filtered.length} টি ফলাফল
              </span>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {displayed.map((ministry, i) => (
            <motion.a
              key={ministry.name}
              href={getOfficialUrl(ministry.nameEn) ?? '#official-links'}
              target={getOfficialUrl(ministry.nameEn) ? '_blank' : undefined}
              rel={getOfficialUrl(ministry.nameEn) ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.02, 0.5) }}
              className="group flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bengali text-sm font-semibold truncate group-hover:text-primary transition-colors">
                  {ministry.name}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {ministry.nameEn}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all flex-shrink-0" />
            </motion.a>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-bengali text-muted-foreground">
              কোন ফলাফল পাওয়া যায়নি — "{query}"
            </p>
          </div>
        )}

        {/* Show more */}
        {filtered.length > 24 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="font-bengali gap-2 rounded-full px-8"
            >
              {showAll
                ? 'কম দেখুন'
                : `আরো দেখুন (${filtered.length - 24})`}
              <span className="text-lg">{showAll ? '↑' : '↓'}</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
