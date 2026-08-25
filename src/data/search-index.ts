// Search index for Bangladesh National Portal
// Combines all searchable content from the portal

import { ministries } from './bangladesh-data'

export interface SearchEntry {
  id: string
  title: string
  titleEn: string
  category: string
  categoryBn: string
  href: string
  icon?: string
  keywords?: string[]
}

export const searchIndex: SearchEntry[] = [
  // E-Services
  { id: 's1', title: 'ডিজিটাল সেন্টার', titleEn: 'Digital Center', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Monitor', keywords: ['ডিজিটাল', 'সেন্টার', 'digital', 'center', 'udc'] },
  { id: 's2', title: 'অর্থ ও বাণিজ্য', titleEn: 'Finance & Commerce', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'DollarSign', keywords: ['অর্থ', 'বাণিজ্য', 'finance', 'commerce', 'money'] },
  { id: 's3', title: 'অনলাইন আবেদন', titleEn: 'Online Application', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'FileText', keywords: ['আবেদন', 'application', 'apply', 'online'] },
  { id: 's4', title: 'শিক্ষা-বিষয়ক', titleEn: 'Education', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'GraduationCap', keywords: ['শিক্ষা', 'education', 'school'] },
  { id: 's5', title: 'অনলাইন নিবন্ধন', titleEn: 'Online Registration', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'ClipboardCheck', keywords: ['নিবন্ধন', 'registration', 'register'] },
  { id: 's6', title: 'কৃষি', titleEn: 'Agriculture', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Wheat', keywords: ['কৃষি', 'agriculture', 'farm', 'krishi'] },
  { id: 's7', title: 'নিয়োগ সংক্রান্ত', titleEn: 'Employment', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Briefcase', keywords: ['নিয়োগ', 'job', 'employment', 'career'] },
  { id: 's8', title: 'পাসপোর্ট, ভিসা ও ইমিগ্রেশন', titleEn: 'Passport, Visa & Immigration', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Plane', keywords: ['পাসপোর্ট', 'passport', 'ভিসা', 'visa', 'ইমিগ্রেশন', 'immigration'] },
  { id: 's9', title: 'ভর্তির আবেদন', titleEn: 'Admission Application', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'School', keywords: ['ভর্তি', 'admission', 'admission'] },
  { id: 's10', title: 'ইউটিলিটি বিল', titleEn: 'Utility Bills', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Receipt', keywords: ['বিল', 'bill', 'utility', 'বিদ্যুৎ', 'পানি', 'গ্যাস'] },
  { id: 's11', title: 'পরীক্ষার ফলাফল', titleEn: 'Exam Results', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Award', keywords: ['ফলাফল', 'result', 'পরীক্ষা', 'exam'] },
  { id: 's12', title: 'তথ্য ভাণ্ডার', titleEn: 'Information Repository', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Database', keywords: ['তথ্য', 'information', 'repository'] },
  { id: 's13', title: 'প্রশিক্ষণ', titleEn: 'Training', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'BookOpen', keywords: ['প্রশিক্ষণ', 'training'] },
  { id: 's14', title: 'আয়কর', titleEn: 'Income Tax', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Calculator', keywords: ['আয়কর', 'tax', 'income', 'nbr'] },
  { id: 's15', title: 'যানবাহন সেবা', titleEn: 'Vehicle Services', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Car', keywords: ['যানবাহন', 'vehicle', 'car', 'brta', 'গাড়ি'] },
  { id: 's16', title: 'পোস্টাল ও কুরিয়ার', titleEn: 'Postal & Courier', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Package', keywords: ['পোস্ট', 'postal', 'কুরিয়ার', 'courier', 'ডাক'] },
  { id: 's17', title: 'টিকিট বুকিং ও ক্রয়', titleEn: 'Ticket Booking', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Ticket', keywords: ['টিকিট', 'ticket', 'বুকিং', 'booking', 'বাস', 'ট্রেন'] },
  { id: 's18', title: 'স্বাস্থ্য বিষয়ক', titleEn: 'Health Services', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'HeartPulse', keywords: ['স্বাস্থ্য', 'health', 'চিকিৎসা', 'medical'] },
  { id: 's19', title: 'ট্রেজারি চালান', titleEn: 'Treasury Challan', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Landmark', keywords: ['ট্রেজারি', 'treasury', 'চালান', 'challan'] },
  { id: 's20', title: 'ফরমস', titleEn: 'Forms', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'FileCheck', keywords: ['ফরম', 'form', 'ফরমস'] },
  { id: 's21', title: 'মৎস্য ও প্রাণী', titleEn: 'Fisheries & Livestock', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Fish', keywords: ['মৎস্য', 'fisheries', 'প্রাণী', 'livestock', 'মাছ'] },
  { id: 's22', title: 'রেডিও, টিভির খবর', titleEn: 'Radio & TV News', category: 'e-service', categoryBn: 'ই-সেবা', href: '#e-services', icon: 'Radio', keywords: ['রেডিও', 'radio', 'টিভি', 'tv', 'news'] },
  { id: 's23', title: 'বাংলা এআই টুলস', titleEn: 'Bangla AI Tools', category: 'e-service', categoryBn: 'ই-সেবা', href: '#ai-tools', icon: 'BrainCircuit', keywords: ['এআই', 'ai', 'চ্যাটবট', 'chatbot'] },

  // Emergency Services
  { id: 'e1', title: '৩৩৩ — সরকারি তথ্য ও সেবা', titleEn: '333 Government Info', category: 'emergency', categoryBn: 'জরুরি সেবা', href: '#emergency', keywords: ['৩৩৩', '333', 'সরকারি', 'তথ্য', 'information'] },
  { id: 'e2', title: '৯৯৯ — জরুরি সেবা', titleEn: '999 Emergency', category: 'emergency', categoryBn: 'জরুরি সেবা', href: '#emergency', keywords: ['৯৯৯', '999', 'জরুরি', 'emergency', 'পুলিশ', 'police'] },
  { id: 'e3', title: '১০২ — ফায়ার সার্ভিস', titleEn: '102 Fire Service', category: 'emergency', categoryBn: 'জরুরি সেবা', href: '#emergency', keywords: ['১০২', '102', 'ফায়ার', 'fire', 'আগুন'] },
  { id: 'e4', title: '১০৯ — নারী ও শিশু নির্যাতন প্রতিরোধ', titleEn: '109 Women & Child Helpline', category: 'emergency', categoryBn: 'জরুরি সেবা', href: '#emergency', keywords: ['১০৯', '109', 'নারী', 'women', 'শিশু', 'child'] },
  { id: 'e5', title: '১০৯৮ — শিশু সহায়তা লাইন', titleEn: '1098 Child Helpline', category: 'emergency', categoryBn: 'জরুরি সেবা', href: '#emergency', keywords: ['১০৯৮', '1098', 'শিশু', 'child'] },
  { id: 'e6', title: '১৬১২২ — স্মার্ট ভূমি সেবা', titleEn: '16122 Smart Land Services', category: 'emergency', categoryBn: 'জরুরি সেবা', href: '#emergency', keywords: ['ভূমি', 'land', 'খতিয়ান', '১৬১২২'] },

  // Quick Links
  { id: 'q1', title: 'সরকারি নিয়োগ', titleEn: 'Government Jobs', category: 'quick-link', categoryBn: 'দ্রুত লিংক', href: '#quick-links', icon: 'Briefcase', keywords: ['নিয়োগ', 'job', 'চাকরি', 'career'] },
  { id: 'q2', title: 'জাতীয় বাজেট', titleEn: 'National Budget', category: 'quick-link', categoryBn: 'দ্রুত লিংক', href: '#quick-links', icon: 'Wallet', keywords: ['বাজেট', 'budget'] },
  { id: 'q3', title: 'স্টক এক্সচেঞ্জ', titleEn: 'Stock Exchange', category: 'quick-link', categoryBn: 'দ্রুত লিংক', href: '#quick-links', icon: 'TrendingUp', keywords: ['স্টক', 'stock', 'শেয়ার', 'share'] },
  { id: 'q4', title: 'বৈদেশিক মুদ্রার হার', titleEn: 'Exchange Rate', category: 'quick-link', categoryBn: 'দ্রুত লিংক', href: '#live-widgets', icon: 'DollarSign', keywords: ['মুদ্রা', 'currency', 'exchange', 'ডলার'] },
  { id: 'q5', title: 'আবহাওয়া', titleEn: 'Weather', category: 'quick-link', categoryBn: 'দ্রুত লিংক', href: '#live-widgets', icon: 'CloudSun', keywords: ['আবহাওয়া', 'weather', 'তাপমাত্রা'] },

  // Sections
  { id: 'sec1', title: 'বাংলাদেশের পরিসংখ্যান', titleEn: 'Bangladesh Statistics', category: 'section', categoryBn: 'বিভাগ', href: '#statistics', keywords: ['পরিসংখ্যান', 'statistics', 'মন্ত্রণালয়', 'জেলা'] },
  { id: 'sec2', title: 'জাতীয় প্রতীক', titleEn: 'National Identity', category: 'section', categoryBn: 'বিভাগ', href: '#national-identity', keywords: ['জাতীয়', 'national', 'প্রতীক', 'পতাকা', 'সঙ্গীত'] },
  { id: 'sec3', title: 'মন্ত্রণালয় ও বিভাগ', titleEn: 'Ministries', category: 'section', categoryBn: 'বিভাগ', href: '#ministries', keywords: ['মন্ত্রণালয়', 'ministry', 'বিভাগ', 'department'] },
  { id: 'sec4', title: 'বাংলা এআই টুলস', titleEn: 'Bangla AI Tools', category: 'section', categoryBn: 'বিভাগ', href: '#ai-tools', keywords: ['এআই', 'ai', 'চ্যাটবট', 'chatbot'] },
  { id: 'sec5', title: 'জরুরি সেবা নম্বর', titleEn: 'Emergency Numbers', category: 'section', categoryBn: 'বিভাগ', href: '#emergency', keywords: ['জরুরি', 'emergency', 'হটলাইন', 'hotline'] },
  { id: 'sec6', title: 'ফটোগ্যালারি', titleEn: 'Photo Gallery', category: 'section', categoryBn: 'বিভাগ', href: '#gallery', keywords: ['ফটো', 'photo', 'গ্যালারি', 'gallery', 'ছবি'] },

  // Ministries & Departments (dynamically indexed)
  ...ministries.map((m, i) => ({
    id: `m${i + 1}`,
    title: m.name,
    titleEn: m.nameEn,
    category: 'ministry',
    categoryBn: 'মন্ত্রণালয়',
    href: '#ministries',
    icon: 'Landmark',
    keywords: [
      m.name,
      m.nameEn,
      ...m.nameEn.toLowerCase().split(/[\s(),.&/-]+/).filter((w) => w.length > 2),
    ],
  })),
]

// Search function with simple fuzzy matching
export function searchPortal(query: string, limit = 8): SearchEntry[] {
  const q = query.toLowerCase().trim()
  if (!q || q.length < 1) return []

  const scored = searchIndex.map((entry) => {
    let score = 0
    const title = entry.title.toLowerCase()
    const titleEn = entry.titleEn.toLowerCase()
    const keywords = (entry.keywords || []).map((k) => k.toLowerCase())

    // Exact title match
    if (title === q || titleEn === q) score += 100
    // Title starts with query
    if (title.startsWith(q) || titleEn.startsWith(q)) score += 60
    // Title contains query
    if (title.includes(q) || titleEn.includes(q)) score += 40
    // Keyword exact match
    if (keywords.some((k) => k === q)) score += 80
    // Keyword contains query
    if (keywords.some((k) => k.includes(q))) score += 30
    // Partial keyword match (any word)
    const qWords = q.split(/\s+/)
    qWords.forEach((w) => {
      if (keywords.some((k) => k.includes(w))) score += 15
      if (title.includes(w) || titleEn.includes(w)) score += 10
    })

    return { entry, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry)
}
