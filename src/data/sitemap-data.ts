// Sitemap data for Bangladesh National Portal - hierarchical view of all sections

export interface SitemapNode {
  id: string
  label: string
  labelEn: string
  icon: string
  href: string
  children?: SitemapNode[]
}

export const sitemapData: SitemapNode[] = [
  {
    id: 'statistics',
    label: 'বাংলাদেশের পরিসংখ্যান',
    labelEn: 'Bangladesh Statistics',
    icon: 'BarChart3',
    href: '#statistics',
    children: [
      { id: 'stat-1', label: '৫৭ মন্ত্রণালয় ও বিভাগ', labelEn: '57 Ministries', icon: 'Building2', href: '#statistics' },
      { id: 'stat-2', label: '৮১ অধিদপ্তর', labelEn: '81 Departments', icon: 'Landmark', href: '#statistics' },
      { id: 'stat-3', label: '৮ বিভাগ', labelEn: '8 Divisions', icon: 'Map', href: '#statistics' },
      { id: 'stat-4', label: '৬৪ জেলা', labelEn: '64 Districts', icon: 'MapPin', href: '#statistics' },
      { id: 'stat-5', label: '৪৯৯ উপজেলা', labelEn: '499 Upazilas', icon: 'Navigation', href: '#statistics' },
      { id: 'stat-6', label: '৪৫৬৮ ইউনিয়ন', labelEn: '4568 Unions', icon: 'Users', href: '#statistics' },
    ],
  },
  {
    id: 'national-identity',
    label: 'জাতীয় প্রতীক ও সংস্কৃতি',
    labelEn: 'National Identity & Culture',
    icon: 'Flag',
    href: '#national-identity',
    children: [
      { id: 'nid-1', label: 'জাতীয় পতাকা', labelEn: 'National Flag', icon: 'Flag', href: '#national-identity' },
      { id: 'nid-2', label: 'রয়েল বেঙ্গল টাইগার', labelEn: 'Royal Bengal Tiger', icon: 'Bird', href: '#national-identity' },
      { id: 'nid-3', label: 'শাপলা ফুল', labelEn: 'Shapla Flower', icon: 'Flower', href: '#national-identity' },
      { id: 'nid-4', label: 'কাঁঠাল', labelEn: 'Jackfruit', icon: 'Star', href: '#national-identity' },
      { id: 'nid-5', label: 'জাতীয় সঙ্গীত', labelEn: 'National Anthem', icon: 'Music', href: '#national-identity' },
      { id: 'nid-6', label: 'কাজী নজরুল ইসলাম', labelEn: 'National Poet', icon: 'BookOpen', href: '#national-identity' },
    ],
  },
  {
    id: 'e-services',
    label: 'ই-সেবাসমূহ',
    labelEn: 'E-Services',
    icon: 'LayoutGrid',
    href: '#e-services',
    children: [
      { id: 'es-1', label: 'ডিজিটাল সেন্টার', labelEn: 'Digital Center', icon: 'Monitor', href: '#e-services' },
      { id: 'es-2', label: 'অর্থ ও বাণিজ্য', labelEn: 'Finance & Commerce', icon: 'DollarSign', href: '#e-services' },
      { id: 'es-3', label: 'অনলাইন আবেদন', labelEn: 'Online Application', icon: 'FileText', href: '#e-services' },
      { id: 'es-4', label: 'শিক্ষা-বিষয়ক', labelEn: 'Education', icon: 'GraduationCap', href: '#e-services' },
      { id: 'es-5', label: 'পাসপোর্ট ও ভিসা', labelEn: 'Passport & Visa', icon: 'Plane', href: '#e-services' },
      { id: 'es-6', label: 'ইউটিলিটি বিল', labelEn: 'Utility Bills', icon: 'Receipt', href: '#e-services' },
      { id: 'es-7', label: 'আয়কর', labelEn: 'Income Tax', icon: 'Calculator', href: '#e-services' },
      { id: 'es-8', label: 'স্বাস্থ্য বিষয়ক', labelEn: 'Health', icon: 'HeartPulse', href: '#e-services' },
    ],
  },
  {
    id: 'ai-tools',
    label: 'বাংলা এআই টুলস',
    labelEn: 'Bangla AI Tools',
    icon: 'BrainCircuit',
    href: '#ai-tools',
    children: [
      { id: 'ai-1', label: 'বাংলা চ্যাটবট', labelEn: 'Bengali Chatbot', icon: 'MessageSquare', href: '#ai-tools' },
      { id: 'ai-2', label: 'লেখালেখি', labelEn: 'AI Writer', icon: 'PenTool', href: '#ai-tools' },
      { id: 'ai-3', label: 'অনুবাদ', labelEn: 'Translation', icon: 'Languages', href: '#ai-tools' },
      { id: 'ai-4', label: 'স্মার্ট সার্চ', labelEn: 'Smart Search', icon: 'Search', href: '#ai-tools' },
      { id: 'ai-5', label: 'ভয়েস সার্চ', labelEn: 'Voice Search', icon: 'Mic', href: '#ai-tools' },
    ],
  },
  {
    id: 'live-widgets',
    label: 'লাইভ তথ্য',
    labelEn: 'Live Information',
    icon: 'CloudSun',
    href: '#live-widgets',
    children: [
      { id: 'lw-1', label: 'আবহাওয়া', labelEn: 'Weather', icon: 'CloudSun', href: '#live-widgets' },
      { id: 'lw-2', label: 'বৈদেশিক মুদ্রার হার', labelEn: 'Exchange Rate', icon: 'DollarSign', href: '#live-widgets' },
      { id: 'lw-3', label: 'বর্তমান সময়', labelEn: 'Current Time', icon: 'Clock', href: '#live-widgets' },
    ],
  },
  {
    id: 'ministries',
    label: 'মন্ত্রণালয় ও বিভাগ',
    labelEn: 'Ministries & Departments',
    icon: 'Building2',
    href: '#ministries',
    children: [
      { id: 'm-1', label: 'ধর্ম মন্ত্রণালয়', labelEn: 'Ministry of Religious Affairs', icon: 'Landmark', href: '#ministries' },
      { id: 'm-2', label: 'পররাষ্ট্র মন্ত্রণালয়', labelEn: 'Ministry of Foreign Affairs', icon: 'Landmark', href: '#ministries' },
      { id: 'm-3', label: 'শিক্ষা মন্ত্রণালয়', labelEn: 'Ministry of Education', icon: 'Landmark', href: '#ministries' },
      { id: 'm-4', label: 'স্বাস্থ্য মন্ত্রণালয়', labelEn: 'Ministry of Health', icon: 'Landmark', href: '#ministries' },
      { id: 'm-5', label: 'কৃষি মন্ত্রণালয়', labelEn: 'Ministry of Agriculture', icon: 'Landmark', href: '#ministries' },
    ],
  },
  {
    id: 'emergency',
    label: 'জরুরি সেবা',
    labelEn: 'Emergency Services',
    icon: 'Phone',
    href: '#emergency',
    children: [
      { id: 'em-1', label: '৩৩৩ — সরকারি তথ্য', labelEn: '333 Government Info', icon: 'Phone', href: '#emergency' },
      { id: 'em-2', label: '৯৯৯ — জরুরি সেবা', labelEn: '999 Emergency', icon: 'Phone', href: '#emergency' },
      { id: 'em-3', label: '১০২ — ফায়ার সার্ভিস', labelEn: '102 Fire Service', icon: 'Phone', href: '#emergency' },
      { id: 'em-4', label: '১০৯ — নারী ও শিশু', labelEn: '109 Women & Child', icon: 'Phone', href: '#emergency' },
      { id: 'em-5', label: '১০৯৮ — শিশু সহায়তা', labelEn: '1098 Child Helpline', icon: 'Phone', href: '#emergency' },
    ],
  },
  {
    id: 'news',
    label: 'বিজ্ঞপ্তি ও সংবাদ',
    labelEn: 'News & Notices',
    icon: 'Newspaper',
    href: '#news',
    children: [
      { id: 'nw-1', label: 'নোটিশ', labelEn: 'Notices', icon: 'Megaphone', href: '#news' },
      { id: 'nw-2', label: 'প্রজ্ঞাপন', labelEn: 'Circulars', icon: 'FileText', href: '#news' },
      { id: 'nw-3', label: 'সংবাদ', labelEn: 'News', icon: 'Newspaper', href: '#news' },
      { id: 'nw-4', label: 'নিয়োগ', labelEn: 'Jobs', icon: 'Briefcase', href: '#news' },
      { id: 'nw-5', label: 'টেন্ডার', labelEn: 'Tenders', icon: 'Gavel', href: '#news' },
    ],
  },
  {
    id: 'faq',
    label: 'সচরাচর জিজ্ঞাসা',
    labelEn: 'FAQ',
    icon: 'HelpCircle',
    href: '#faq',
  },
  {
    id: 'gallery',
    label: 'ফটোগ্যালারি',
    labelEn: 'Photo Gallery',
    icon: 'Image',
    href: '#gallery',
  },
]
