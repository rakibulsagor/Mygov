// Government News & Notices data for Bangladesh National Portal

export interface NewsItem {
  id: string
  title: string
  titleEn: string
  excerpt: string
  excerptEn: string
  category: 'notice' | 'circular' | 'news' | 'job' | 'tender'
  categoryBn: string
  date: string
  dateBn: string
  source: string
  sourceBn: string
  href: string
  isUrgent?: boolean
  isNew?: boolean
}

export const newsCategories = [
  { id: 'all', label: 'সকল', labelEn: 'All' },
  { id: 'notice', label: 'নোটিশ', labelEn: 'Notices' },
  { id: 'circular', label: 'প্রজ্ঞাপন', labelEn: 'Circulars' },
  { id: 'news', label: 'সংবাদ', labelEn: 'News' },
  { id: 'job', label: 'নিয়োগ', labelEn: 'Jobs' },
  { id: 'tender', label: 'টেন্ডার', labelEn: 'Tenders' },
]

export const newsItems: NewsItem[] = [
  {
    id: 'n1',
    title: 'ই-পাসপোর্ট সেবার সময়সীমা সংক্রান্ত জরুরি বিজ্ঞপ্তি',
    titleEn: 'Urgent notice on e-Passport service timeline',
    excerpt: 'সকল আবেদনকারীকে অবগত করা হচ্ছে যে, ই-পাসপোর্ট ডেলিভারি সময়সীমা আঞ্চলিক পাসপোর্ট অফিস অনুযায়ী ৭-২১ কর্মদিবস নির্ধারিত হয়েছে।',
    excerptEn: 'E-passport delivery timeline set to 7-21 working days based on regional office.',
    category: 'notice',
    categoryBn: 'নোটিশ',
    date: '২৫ আগস্ট ২০২৬',
    dateBn: '২৫ আগস্ট ২০২৬',
    source: 'Department of Immigration & Passports',
    sourceBn: 'ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর',
    href: '#',
    isUrgent: true,
    isNew: true,
  },
  {
    id: 'n2',
    title: '২০২৬-২০২৭ অর্থবছরের জাতীয় বাজেট প্রস্তাব প্রকাশ',
    titleEn: 'National Budget 2026-2027 proposal published',
    excerpt: 'অর্থ মন্ত্রণালয় কর্তৃক ২০২৬-২০২৭ অর্থবছরের বাজেট প্রস্তাব প্রকাশ করা হয়েছে। মোট বাজেট ৮.৫ লক্ষ কোটি টাকা।',
    excerptEn: 'Finance Ministry published FY 2026-27 budget proposal totaling 8.5 lakh crore BDT.',
    category: 'news',
    categoryBn: 'সংবাদ',
    date: '২৪ আগস্ট ২০২৬',
    dateBn: '২৪ আগস্ট ২০২৬',
    source: 'Ministry of Finance',
    sourceBn: 'অর্থ মন্ত্রণালয়',
    href: '#',
    isNew: true,
  },
  {
    id: 'n3',
    title: 'প্রাথমিক শিক্ষা অধিদপ্তরে সহকারী শিক্ষক পদে নিয়োগ বিজ্ঞপ্তি',
    titleEn: 'Assistant Teacher recruitment - Directorate of Primary Education',
    excerpt: 'প্রাথমিক বিদ্যালয়ে সহকারী শিক্ষক পদে ৩২,০০০ জন নিয়োগ দেওয়া হবে। অনলাইনে আবেদন শুরু ১ সেপ্টেম্বর থেকে।',
    excerptEn: '32,000 Assistant Teachers to be recruited. Online application starts Sept 1.',
    category: 'job',
    categoryBn: 'নিয়োগ',
    date: '২৩ আগস্ট ২০২৬',
    dateBn: '২৩ আগস্ট ২০২৬',
    source: 'Directorate of Primary Education',
    sourceBn: 'প্রাথমিক শিক্ষা অধিদপ্তর',
    href: '#',
    isNew: true,
  },
  {
    id: 'n4',
    title: 'জাতীয় রাজস্ব বোর্ড (এনবিআর) কর্তৃক ভ্যাট প্রজ্ঞাপন সংশোধন',
    titleEn: 'NBR VAT circular amendment',
    excerpt: 'ভ্যাট আইন ২০১২-এর বিধি ৪০ এর অধীনে রেয়াত সুবিধার ক্ষেত্রে কিছু সংশোধন আনা হয়েছে। বিস্তারিত প্রজ্ঞাপনে দেখুন।',
    excerptEn: 'Amendments to VAT refund procedures under VAT Act 2012 Rule 40.',
    category: 'circular',
    categoryBn: 'প্রজ্ঞাপন',
    date: '২২ আগস্ট ২০২৬',
    dateBn: '২২ আগস্ট ২০২৬',
    source: 'National Board of Revenue',
    sourceBn: 'জাতীয় রাজস্ব বোর্ড',
    href: '#',
  },
  {
    id: 'n5',
    title: 'ডিজিটাল সেন্টারের মাধ্যমে নতুন ১২টি সেবা চালু',
    titleEn: '12 new services launched via Digital Centers',
    excerpt: 'উদ্যোক্তা উন্নয়ন ও ক্ষুদ্র ঋণ সেবা সহ ১২টি নতুন সেবা দেশের সকল ইউনিয়ন ডিজিটাল সেন্টারে চালু হয়েছে।',
    excerptEn: '12 new services including entrepreneur development & micro-credit launched at all Union Digital Centers.',
    category: 'news',
    categoryBn: 'সংবাদ',
    date: '২১ আগস্ট ২০২৬',
    dateBn: '২১ আগস্ট ২০২৬',
    source: 'a2i (Aspire to Innovate)',
    sourceBn: 'এটুআই',
    href: '#',
  },
  {
    id: 'n6',
    title: 'জনস্বাস্থ্য প্রকৌশল অধিদপ্তর - নির্মাণ কাজের টেন্ডার আহ্বান',
    titleEn: 'Public Health Engineering - Construction tender',
    excerpt: 'পানি শুদ্ধাগার নির্মাণ ও পাইপলাইন স্থাপন কাজের জন্য দরপত্র আহ্বান করা হয়েছে। দাখিলের শেষ তারিখ: ১৫ সেপ্টেম্বর ২০২৬।',
    excerptEn: 'Tender invited for water treatment plant construction & pipeline. Deadline: Sept 15, 2026.',
    category: 'tender',
    categoryBn: 'টেন্ডার',
    date: '২০ আগস্ট ২০২৬',
    dateBn: '২০ আগস্ট ২০২৬',
    source: 'Department of Public Health Engineering',
    sourceBn: 'জনস্বাস্থ্য প্রকৌশল অধিদপ্তর',
    href: '#',
  },
  {
    id: 'n7',
    title: 'মাধ্যমিক ও উচ্চ শিক্ষা বোর্ড - এসএসসি পরীক্ষার ফলাফল প্রকাশ',
    titleEn: 'SSC examination results published',
    excerpt: '২০২৬ সালের এসএসসি পরীক্ষার ফলাফল প্রকাশ করা হয়েছে। সারাদেশে গড় পাশের হার ৮৯.৭%। ফলাফল অনলাইনে দেখুন।',
    excerptEn: 'SSC 2026 results published. National pass rate 89.7%. Check results online.',
    category: 'notice',
    categoryBn: 'নোটিশ',
    date: '১৯ আগস্ট ২০২৬',
    dateBn: '১৯ আগস্ট ২০২৬',
    source: 'Boards of Intermediate and Secondary Education',
    sourceBn: 'মাধ্যমিক ও উচ্চ শিক্ষা বোর্ড',
    href: '#',
  },
  {
    id: 'n8',
    title: 'বাংলাদেশ ব্যাংক - নতুন মুদ্রানীতি ঘোষণা',
    titleEn: 'Bangladesh Bank announces new monetary policy',
    excerpt: '২০২৬-২০২৭ অর্থবছরের জন্য নতুন মুদ্রানীতি ঘোষণা করা হয়েছে। মূল সুদহার ৬.৫% অপরিবর্তিত রাখা হয়েছে।',
    excerptEn: 'New monetary policy for FY 2026-27 announced. Policy rate unchanged at 6.5%.',
    category: 'news',
    categoryBn: 'সংবাদ',
    date: '১৮ আগস্ট ২০২৬',
    dateBn: '১৮ আগস্ট ২০২৬',
    source: 'Bangladesh Bank',
    sourceBn: 'বাংলাদেশ ব্যাংক',
    href: '#',
  },
  {
    id: 'n9',
    title: 'স্থানীয় সরকার বিভাগ - সিটি কর্পোরেশন নির্বাচন বিজ্ঞপ্তি',
    titleEn: 'City Corporation election notice',
    excerpt: 'আগামী সিটি কর্পোরেশন নির্বাচনের তফসিল ঘোষণা করা হয়েছে। ভোটার তালিকা হালনাগাদের শেষ তারিখ ৩০ সেপ্টেম্বর।',
    excerptEn: 'Schedule for upcoming City Corporation elections announced. Voter list update by Sept 30.',
    category: 'notice',
    categoryBn: 'নোটিশ',
    date: '১৭ আগস্ট ২০২৬',
    dateBn: '১৭ আগস্ট ২০২৬',
    source: 'Election Commission of Bangladesh',
    sourceBn: 'নির্বাচন কমিশন',
    href: '#',
  },
]
