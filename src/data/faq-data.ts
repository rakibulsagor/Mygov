// FAQ data for Bangladesh National Portal

export interface FAQItem {
  id: string
  question: string
  questionEn: string
  answer: string
  answerEn: string
  category: 'general' | 'passport' | 'tax' | 'land' | 'education' | 'emergency'
  categoryBn: string
  helpful?: number
}

export const faqCategories = [
  { id: 'all', label: 'সকল', labelEn: 'All' },
  { id: 'general', label: 'সাধারণ', labelEn: 'General' },
  { id: 'passport', label: 'পাসপোর্ট', labelEn: 'Passport' },
  { id: 'tax', label: 'আয়কর', labelEn: 'Tax' },
  { id: 'land', label: 'ভূমি', labelEn: 'Land' },
  { id: 'education', label: 'শিক্ষা', labelEn: 'Education' },
  { id: 'emergency', label: 'জরুরি', labelEn: 'Emergency' },
]

export const faqItems: FAQItem[] = [
  {
    id: 'f1',
    question: 'জাতীয় তথ্য বাতায়ন থেকে কিভাবে সেবা গ্রহণ করব?',
    questionEn: 'How to avail services from the National Portal?',
    answer: 'বাংলাদেশ জাতীয় তথ্য বাতায়ন (bangladesh.gov.bd) এ গিয়ে "ই-সেবাসমূহ" বিভাগে ক্লিক করুন। আপনার প্রয়োজনীয় সেবা নির্বাচন করে অনলাইনে আবেদন করতে পারেন। সেবা খুঁজে পেতে উপরের সার্চ বার ব্যবহার করুন অথবা Ctrl+K চাপুন।',
    answerEn: 'Visit bangladesh.gov.bd, click "E-Services" section, select your desired service and apply online.',
    category: 'general',
    categoryBn: 'সাধারণ',
    helpful: 245,
  },
  {
    id: 'f2',
    question: 'পাসপোর্ট রিনিউয়ালের জন্য কি কি কাগজপত্র লাগে?',
    questionEn: 'What documents are needed for passport renewal?',
    answer: 'পাসপোর্ট রিনিউয়ালের জন্য প্রয়োজন: ১) পুরাতন পাসপোর্ট, ২) জাতীয় পরিচয়পত্র (NID), ৩) পাসপোর্ট সাইজ ছবি, ৪) অনলাইন আবেদন ফরম। epassport.gov.bd এ গিয়ে অনলাইনে আবেদন করুন। ফি: সাধারণ ৪,০০০ টাকা, জরুরি ৬,০০০ টাকা।',
    answerEn: 'Documents needed: old passport, NID, passport photo, online application form. Apply at epassport.gov.bd.',
    category: 'passport',
    categoryBn: 'পাসপোর্ট',
    helpful: 189,
  },
  {
    id: 'f3',
    question: 'আয়কর রিটার্ন দাখিলের শেষ তারিখ কখন?',
    questionEn: 'What is the deadline for income tax return submission?',
    answer: 'বাংলাদেশে আয়কর রিটার্ন দাখিলের শেষ তারিখ হলো প্রতি বছরের ৩০ নভেম্বর। এই তারিখের মধ্যে রিটার্ন দাখিল করতে হয়, অন্যথায় জরিমানা প্রযোজ্য। e-TIN পোর্টাল (nbr.gov.bd) এ গিয়ে অনলাইনে রিটার্ন দাখিল করতে পারেন।',
    answerEn: 'Deadline is November 30 each year. Submit via e-TIN portal at nbr.gov.bd.',
    category: 'tax',
    categoryBn: 'আয়কর',
    helpful: 156,
  },
  {
    id: 'f4',
    question: 'জমির খতিয়ান অনলাইনে কিভাবে দেখব?',
    questionEn: 'How to view land records (khatian) online?',
    answer: 'জমির খতিয়ান অনলাইনে দেখতে ldpgls.gov.bd (e-খতিয়ান) ওয়েবসাইটে যান। জেলা, উপজেলা, মৌজা ও খতিয়ান নম্বর দিয়ে আপনার জমির তথ্য দেখতে পারবেন। বাংলাদেশ ভূমি ব্যবস্থাপনা ও কম্পিউটারাইজেশন প্রকল্পের মাধ্যমে এই সেবা প্রদান করা হয়।',
    answerEn: 'Visit ldpgls.gov.bd, select district/upazila/mouza/khatian number to view land records.',
    category: 'land',
    categoryBn: 'ভূমি',
    helpful: 134,
  },
  {
    id: 'f5',
    question: 'এসএসসি পরীক্ষার ফলাফল কিভাবে দেখব?',
    questionEn: 'How to check SSC exam results?',
    answer: 'এসএসসি পরীক্ষার ফলাফল অনলাইনে educationboardresults.gov.bd এ দেখা যায়। বোর্ড, রোল নম্বর ও রেজিস্ট্রেশন নম্বর দিয়ে ফলাফল দেখুন। মোবাইলে SMS এর মাধ্যমেও ফলাফল জানা যায়: ১৬২২২ নম্বরে "SSC <Board> <Roll> <Year>" পাঠান।',
    answerEn: 'Check results at educationboardresults.gov.bd or SMS "SSC Board Roll Year" to 16222.',
    category: 'education',
    categoryBn: 'শিক্ষা',
    helpful: 198,
  },
  {
    id: 'f6',
    question: 'জরুরি পরিস্থিতিতে কোন নম্বরে কল করব?',
    questionEn: 'Which numbers to call in emergency?',
    answer: 'জরুরি পরিস্থিতিতে নিচের নম্বরে কল করুন: ৩৩৩ (সরকারি তথ্য ও সেবা), ৯৯৯ (জরুরি সেবা - পুলিশ), ১০২ (ফায়ার সার্ভিস), ১০৯ (নারী ও শিশু নির্যাতন প্রতিরোধ), ১০৯৮ (শিশু সহায়তা)। এই সেবাগুলো ২৪ ঘন্টা বিনামূল্যে পাওয়া যায়।',
    answerEn: 'Call 333 (gov info), 999 (emergency/police), 102 (fire), 109 (women/child abuse), 1098 (child helpline).',
    category: 'emergency',
    categoryBn: 'জরুরি',
    helpful: 312,
  },
  {
    id: 'f7',
    question: 'জন্ম নিবন্ধন সনদ অনলাইনে কিভাবে আবেদন করব?',
    questionEn: 'How to apply for birth certificate online?',
    answer: 'জন্ম নিবন্ধন সনদের জন্য bdris.gov.bd (জন্ম ও মৃত্যু নিবন্ধন সিস্টেম) এ আবেদন করুন। অনলাইনে আবেদন করে নির্ধারিত তারিখে স্থানীয় ইউনিয়ন/পৌর/সিটি কর্পোরেশন অফিসে গিয়ে সনদ সংগ্রহ করতে হবে। প্রয়োজনীয়: জাতীয় পরিচয়পত্র, হাসপাতালের সনদ (যদি থাকে)।',
    answerEn: 'Apply at bdris.gov.bd, collect certificate from local union/municipality office.',
    category: 'general',
    categoryBn: 'সাধারণ',
    helpful: 167,
  },
  {
    id: 'f8',
    question: 'ট্রেড লাইসেন্স কিভাবে সংগ্রহ করব?',
    questionEn: 'How to get a trade license?',
    answer: 'ট্রেড লাইসেন্সের জন্য স্থানীয় সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদে আবেদন করতে হয়। অনেক এলাকায় অনলাইনে আবেদন করা যায়। প্রয়োজনীয় কাগজপত্র: জাতীয় পরিচয়পত্র, ছবি, নিয়ন্ত্রক সনদ (যদি প্রযোজ্য), ফি পরিশোধের রসিদ। ফি: ১,০০০-৫,০০০ টাকা (ব্যবসার ধরন অনুযায়ী)।',
    answerEn: 'Apply at local city corporation/municipality/union council. Need NID, photo, fee receipt.',
    category: 'general',
    categoryBn: 'সাধারণ',
    helpful: 143,
  },
  {
    id: 'f9',
    question: 'ভিসা আবেদন কিভাবে করব?',
    questionEn: 'How to apply for a visa?',
    answer: 'বিদেশ ভ্রমণের জন্য ভিসা আবেদন গন্তব্য দেশের দূতাবাসে করতে হয়। অনেক দেশের জন্য অনলাইনে আবেদন করা যায়। প্রয়োজনীয়: বৈধ পাসপোর্ট, ভিসা আবেদন ফরম, ছবি, ব্যাংক স্টেটমেন্ট, ভ্রমণ টিকিট। বিস্তারিত জানতে সংশ্লিষ্ট দূতাবাসের ওয়েবসাইট দেখুন।',
    answerEn: 'Apply at destination country embassy. Need valid passport, application form, photo, bank statement.',
    category: 'passport',
    categoryBn: 'পাসপোর্ট',
    helpful: 98,
  },
  {
    id: 'f10',
    question: 'সরকারি চাকরির বিজ্ঞপ্তি কোথায় পাব?',
    questionEn: 'Where to find government job circulars?',
    answer: 'সরকারি চাকরির বিজ্ঞপ্তি bangladesh.gov.bd এর "সরকারি নিয়োগ" বিভাগে পাওয়া যায়। এছাড়া সংশ্লিষ্ট মন্ত্রণালয়/অধিদপ্তরের ওয়েবসাইটেও বিজ্ঞপ্তি প্রকাশ করা হয়। জনপ্রশাসন মন্ত্রণালয়ের ministry.gov.bn এ সকল সরকারি নিয়োগের তথ্য পাওয়া যায়।',
    answerEn: 'Find job circulars at bangladesh.gov.bd "Gov Jobs" section or ministry websites.',
    category: 'general',
    categoryBn: 'সাধারণ',
    helpful: 176,
  },
]
