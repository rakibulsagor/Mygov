'use client'

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Globe,
  Heart,
  ArrowUp,
} from 'lucide-react'
import { BangladeshLogo } from './logo'
import { Button } from '@/components/ui/button'

const footerLinks = [
  {
    title: 'বাংলাদেশ সম্পর্কিত',
    links: [
      'রাষ্ট্রপতির কার্যালয়',
      'প্রধানমন্ত্রীর কার্যালয়',
      'জাতীয় সংসদ',
      'মন্ত্রিপরিষদ বিভাগ',
      'অধিদপ্তরসমূহ',
    ],
  },
  {
    title: 'ই-সেবাসমূহ',
    links: [
      'ডিজিটাল সেন্টার',
      'অনলাইন আবেদন',
      'ইউটিলিটি বিল',
      'পরীক্ষার ফলাফল',
      'পাসপোর্ট সেবা',
      'আয়কর',
    ],
  },
  {
    title: 'গুরুত্বপূর্ণ লিংক',
    links: [
      'সরকারি নিয়োগ',
      'জাতীয় বাজেট',
      'স্টক এক্সচেঞ্জ',
      'বৈদেশিক মুদ্রার হার',
      'আবহাওয়া',
      'বাংলা এআই টুলস',
    ],
  },
  {
    title: 'সহায়তা',
    links: ['সাইট ম্যাপ', 'ব্যবহারের শর্তাবলি', 'গোপনীয়তার নীতিমালা', 'সচরাচর জিজ্ঞাসা', 'যোগাযোগ'],
  },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Disclaimer banner */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-muted-foreground text-center font-bengali max-w-4xl mx-auto">
            এই ওয়েবসাইটে প্রকাশিত সকল তথ্য সংশ্লিষ্ট দপ্তর কর্তৃক নিয়মিত হালনাগাদ করা হয়।
            তথ্যের যথার্থতা, নির্ভুলতা ও নির্ভরযোগ্যতা নিশ্চিত করতে সংশ্লিষ্ট দপ্তর সর্বদা সচেষ্ট।
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <BangladeshLogo size="sm" />
              <div>
                <h3 className="font-bengali text-base font-bold text-primary">
                  বাংলাদেশ জাতীয় তথ্য বাতায়ন
                </h3>
                <p className="text-xs text-muted-foreground font-bengali">
                  গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground font-bengali mb-4 leading-relaxed">
              বাংলাদেশের অফিসিয়াল জাতীয় তথ্য বাতায়ন। এখানে সরকারি সকল তথ্য, সেবা ও
              প্রয়োজনীয় লিংক একত্রিত করা হয়েছে নাগরিকদের সুবিধার্থে।
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground font-bengali">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>৩৩৩ (সরকারি তথ্য ও সেবা)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>info@bangladesh.gov.bd</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground font-bengali">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>ঢাকা, গণপ্রজাতন্ত্রী বাংলাদেশ</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-bengali text-sm font-semibold mb-3 text-foreground">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    {link === 'সাইট ম্যাপ' ? (
                      <button
                        onClick={() => {
                          const open = (window as unknown as { __openSitemap?: () => void }).__openSitemap
                          open?.()
                        }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors font-bengali text-right"
                      >
                        {link}
                      </button>
                    ) : (
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors font-bengali"
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 font-bengali">
              <span>© ২০২৬ সর্বস্বত্ব সংরক্ষিত</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">বাংলাদেশ.গভ.বিডি (জাতীয় পোর্টাল)</span>
            </div>

            <div className="flex items-center gap-2 font-bengali text-xs">
              <span>সাইটটি শেষ হাল-নাগাদ করা হয়েছে:</span>
              <span className="text-foreground font-medium">
                {new Date().toLocaleDateString('bn-BD', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={scrollTop}
              className="gap-1.5 font-bengali"
            >
              উপরে যান
              <ArrowUp className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Made with love */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2.5 text-center text-xs font-bengali flex items-center justify-center gap-1.5">
          <span>পরিকল্পনা ও বাস্তবায়ন:</span>
          <span className="font-semibold">এটুআই (a2i)</span>
          <span className="opacity-60">|</span>
          <span>ডিজিটাল বাংলাদেশের জন্য</span>
          <Heart className="h-3 w-3 fill-current text-chart-2" />
        </div>
      </div>
    </footer>
  )
}
