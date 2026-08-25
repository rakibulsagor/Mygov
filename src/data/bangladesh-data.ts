// Bangladesh National Portal - Content Data
// All content sourced from https://bangladesh.gov.bd/

export interface NavItem {
  title: string;
  titleEn: string;
  href: string;
  children?: NavItem[];
}

export interface ServiceItem {
  title: string;
  titleEn: string;
  icon: string;
  href: string;
  category: string;
}

export interface Ministry {
  name: string;
  nameEn: string;
}

export interface EmergencyService {
  number: string;
  numberBn: string;
  title: string;
  titleEn: string;
}

export interface StatItem {
  value: string;
  label: string;
  labelEn: string;
  icon: string;
}

// Navigation menu
export const navMenu: NavItem[] = [
  {
    title: "বাংলাদেশ সম্পর্কিত",
    titleEn: "About Bangladesh",
    href: "#about",
    children: [
      { title: "রাষ্ট্রপতির কার্যালয়", titleEn: "President's Office", href: "#" },
      { title: "প্রধানমন্ত্রীর কার্যালয়", titleEn: "Prime Minister's Office", href: "#" },
      { title: "জাতীয় সংসদ", titleEn: "National Parliament", href: "#" },
      { title: "মন্ত্রিপরিষদ বিভাগ", titleEn: "Cabinet Division", href: "#" },
      { title: "অধিদপ্তরসমূহ ও অন্যান্য অফিস", titleEn: "Departments & Other Offices", href: "#" },
    ],
  },
  {
    title: "বাংলাদেশের পরিসংখ্যান",
    titleEn: "Bangladesh Statistics",
    href: "#statistics",
  },
  {
    title: "বাংলাদেশ ট্যুরিজম বোর্ড",
    titleEn: "Bangladesh Tourism Board",
    href: "#tourism",
  },
  {
    title: "বাংলাদেশ পর্যটন কর্পোরেশন",
    titleEn: "Bangladesh Tourism Corporation",
    href: "#tourism",
  },
  {
    title: "বাংলাদেশ কোড",
    titleEn: "Bangladesh Code",
    href: "#",
  },
  {
    title: "বাংলাদেশ জিওকোড",
    titleEn: "Bangladesh Geocode",
    href: "#",
  },
  {
    title: "জাতীয় বাজেট",
    titleEn: "National Budget",
    href: "#budget",
  },
  {
    title: "ই-সেবাসমূহ",
    titleEn: "E-Services",
    href: "#e-services",
    children: [
      { title: "সেবাখাত", titleEn: "Service Sectors", href: "#" },
      { title: "ব্যবসা-বাণিজ্য", titleEn: "Business & Commerce", href: "#" },
      { title: "নতুন উদ্যোক্তা", titleEn: "New Entrepreneurs", href: "#" },
      { title: "ট্রেড লাইসেন্স", titleEn: "Trade License", href: "#" },
      { title: "ট্রেডিং কর্পোরেশন অফ বাংলাদেশ", titleEn: "TCB", href: "#" },
      { title: "বৈদেশিক বিনিয়োগ", titleEn: "Foreign Investment", href: "#" },
      { title: "নতুন ব্যবসা", titleEn: "New Business", href: "#" },
      { title: "ব্যাংক হিসাব খোলা", titleEn: "Bank Account Opening", href: "#" },
      { title: "শেয়ার মার্কেট", titleEn: "Share Market", href: "#" },
      { title: "আইন-বিধি", titleEn: "Laws & Regulations", href: "#" },
      { title: "তথ্য বাতায়ন", titleEn: "Information Portal", href: "#" },
      { title: "জেলা বাতায়ন", titleEn: "District Portal", href: "#" },
      { title: "বাংলা এআই টুলস", titleEn: "Bangla AI Tools", href: "#" },
    ],
  },
]

// Government statistics
export const stats: StatItem[] = [
  { value: "৫৭", label: "মন্ত্রণালয় ও বিভাগ", labelEn: "Ministries & Divisions", icon: "Building2" },
  { value: "৮১", label: "অধিদপ্তর", labelEn: "Departments", icon: "Landmark" },
  { value: "৮", label: "বিভাগ", labelEn: "Divisions", icon: "Map" },
  { value: "৬৪", label: "জেলা", labelEn: "Districts", icon: "MapPin" },
  { value: "৪৯৯", label: "উপজেলা", labelEn: "Upazilas", icon: "Navigation" },
  { value: "৪৫৬৮", label: "ইউনিয়ন", labelEn: "Unions", icon: "Users" },
]

// E-Services
export const eServices: ServiceItem[] = [
  { title: "ডিজিটাল সেন্টার", titleEn: "Digital Center", icon: "Monitor", href: "#", category: "popular" },
  { title: "অর্থ ও বাণিজ্য", titleEn: "Finance & Commerce", icon: "DollarSign", href: "#", category: "popular" },
  { title: "অনলাইন আবেদন", titleEn: "Online Application", icon: "FileText", href: "#", category: "popular" },
  { title: "শিক্ষা-বিষয়ক", titleEn: "Education", icon: "GraduationCap", href: "#", category: "popular" },
  { title: "অনলাইন নিবন্ধন", titleEn: "Online Registration", icon: "ClipboardCheck", href: "#", category: "popular" },
  { title: "কৃষি", titleEn: "Agriculture", icon: "Wheat", href: "#", category: "popular" },
  { title: "নিয়োগ সংক্রান্ত", titleEn: "Employment", icon: "Briefcase", href: "#", category: "popular" },
  { title: "পাসপোর্ট, ভিসা ও ইমিগ্রেশন", titleEn: "Passport, Visa & Immigration", icon: "Plane", href: "#", category: "popular" },
  { title: "ভর্তির আবেদন", titleEn: "Admission Application", icon: "School", href: "#", category: "popular" },
  { title: "ইউটিলিটি বিল", titleEn: "Utility Bills", icon: "Receipt", href: "#", category: "popular" },
  { title: "পরীক্ষার ফলাফল", titleEn: "Exam Results", icon: "Award", href: "#", category: "popular" },
  { title: "তথ্য ভাণ্ডার", titleEn: "Information Repository", icon: "Database", href: "#", category: "popular" },
  { title: "প্রশিক্ষণ", titleEn: "Training", icon: "BookOpen", href: "#", category: "popular" },
  { title: "আয়কর", titleEn: "Income Tax", icon: "Calculator", href: "#", category: "popular" },
  { title: "যানবাহন সেবা", titleEn: "Vehicle Services", icon: "Car", href: "#", category: "popular" },
  { title: "পোস্টাল ও কুরিয়ার", titleEn: "Postal & Courier", icon: "Package", href: "#", category: "popular" },
  { title: "আপনার জিজ্ঞাসা", titleEn: "Your Questions", icon: "HelpCircle", href: "#", category: "popular" },
  { title: "টিকিট বুকিং ও ক্রয়", titleEn: "Ticket Booking", icon: "Ticket", href: "#", category: "popular" },
  { title: "স্বাস্থ্য বিষয়ক", titleEn: "Health Services", icon: "HeartPulse", href: "#", category: "popular" },
  { title: "ট্রেজারি চালান", titleEn: "Treasury Challan", icon: "Landmark", href: "#", category: "popular" },
  { title: "ফরমস", titleEn: "Forms", icon: "FileCheck", href: "https://dpp.gov.bd", category: "popular" },
  { title: "মৎস্য ও প্রাণী", titleEn: "Fisheries & Livestock", icon: "Fish", href: "#", category: "popular" },
  { title: "রেডিও, টিভির খবর", titleEn: "Radio & TV News", icon: "Radio", href: "#", category: "popular" },
  { title: "বাংলা এআই টুলস", titleEn: "Bangla AI Tools", icon: "BrainCircuit", href: "#", category: "new" },
]

// Ministries and Departments
export const ministries: Ministry[] = [
  { name: "এটুআই", nameEn: "a2i" },
  { name: "ডেসকো", nameEn: "DESCO" },
  { name: "বাংলাদেশ বিনিয়োগ উনয়ন কতৃপক্ষ (বিডা)", nameEn: "BIDA" },
  { name: "ধর্ম মন্ত্রণালয়", nameEn: "Ministry of Religious Affairs" },
  { name: "পররাষ্ট্র মন্ত্রণালয়", nameEn: "Ministry of Foreign Affairs" },
  { name: "শিক্ষা মন্ত্রণালয়", nameEn: "Ministry of Education" },
  { name: "বিজ্ঞান ও প্রযুক্তি মন্ত্রণালয়", nameEn: "Ministry of Science & Technology" },
  { name: "বেসামরিক বিমান পরিবহন ও পর্যটন মন্ত্রণালয়", nameEn: "Ministry of Civil Aviation & Tourism" },
  { name: "ভূমি মন্ত্রণালয়", nameEn: "Ministry of Land" },
  { name: "যুব ও ক্রীড়া মন্ত্রণালয়", nameEn: "Ministry of Youth & Sports" },
  { name: "প্রতিরক্ষা মন্ত্রণালয়", nameEn: "Ministry of Defence" },
  { name: "প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়", nameEn: "Ministry of Primary & Mass Education" },
  { name: "পানি সম্পদ মন্ত্রণালয়", nameEn: "Ministry of Water Resources" },
  { name: "খাদ্য মন্ত্রণালয়", nameEn: "Ministry of Food" },
  { name: "জাতীয় গণযোগাযোগ ইনস্টিটিউট", nameEn: "National Institute of Mass Communication" },
  { name: "রেলপথ মন্ত্রণালয়", nameEn: "Ministry of Railways" },
  { name: "সমাজকল্যাণ মন্ত্রণালয়", nameEn: "Ministry of Social Welfare" },
  { name: "বাণিজ্য মন্ত্রণালয়", nameEn: "Ministry of Commerce" },
  { name: "আইন ও বিচার বিভাগ", nameEn: "Law & Justice Division" },
  { name: "বিদ্যুৎ, জ্বালানি ও খনিজ সম্পদ মন্ত্রণালয়", nameEn: "Ministry of Power, Energy & Mineral Resources" },
  { name: "সংস্কৃতি বিষয়ক মন্ত্রণালয়", nameEn: "Ministry of Cultural Affairs" },
  { name: "স্বাস্হ্য ও পরিবার কল্যাণ মন্ত্রণালয়", nameEn: "Ministry of Health & Family Welfare" },
  { name: "প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রনালয়", nameEn: "Ministry of Expatriates' Welfare" },
  { name: "মুক্তিযুদ্ধ বিষয়ক মন্ত্রণালয়", nameEn: "Ministry of Liberation War Affairs" },
  { name: "স্বরাষ্ট্র মন্ত্রণালয়", nameEn: "Ministry of Home Affairs" },
  { name: "সড়ক পরিবহন ও মহাসড়ক বিভাগ", nameEn: "Road Transport & Highways Division" },
  { name: "শ্রম ও কর্মসংস্থান মন্ত্রণালয়", nameEn: "Ministry of Labour & Employment" },
  { name: "পরিকল্পনা মন্ত্রণালয়", nameEn: "Ministry of Planning" },
  { name: "মহিলা বিষয়ক অধিদপ্তর", nameEn: "Department of Women Affairs" },
  { name: "জনশক্তি কর্মসংস্থান ও প্রশিক্ষণ ব্যুরো (বিএমইটি)", nameEn: "BMET" },
  { name: "বেতার স্হানীয় সরকার বিভাগ", nameEn: "Local Government Division" },
  { name: "তথ্য ও যোগাযোগ প্রযুক্তি বিভাগ", nameEn: "ICT Division" },
  { name: "মৎস্য ও প্রাণিসম্পদ মন্ত্রণালয়", nameEn: "Ministry of Fisheries & Livestock" },
  { name: "প্রাথমিক শিক্ষা অধিদপ্তর", nameEn: "Directorate of Primary Education" },
  { name: "নৌ-পরিবহন মন্ত্রণালয়", nameEn: "Ministry of Shipping" },
  { name: "গৃহায়ণ ও গণপূর্ত মন্ত্রণালয়", nameEn: "Ministry of Housing & Public Works" },
  { name: "মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড, ঢাকা", nameEn: "Board of Intermediate & Secondary Education, Dhaka" },
  { name: "তথ্য মন্ত্রণালয়", nameEn: "Ministry of Information" },
  { name: "পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়", nameEn: "Ministry of Environment, Forest & Climate Change" },
  { name: "স্বাস্থ্য অধিদপ্তর", nameEn: "Directorate General of Health Services" },
  { name: "জাতীয় রাজস্ব বোর্ড", nameEn: "National Board of Revenue (NBR)" },
  { name: "এনএপিডি", nameEn: "NAPD" },
  { name: "বিপিএসসি", nameEn: "BPSC" },
  { name: "গণগ্রন্থাগার অধিদপ্তর", nameEn: "Department of Public Libraries" },
  { name: "পরিবেশ অধিদপ্তর", nameEn: "Department of Environment" },
  { name: "জনপ্রশাসন মন্ত্রণালয়", nameEn: "Ministry of Public Administration" },
  { name: "ব্যান্সডক", nameEn: "Bangladesh Bank" },
  { name: "বিসিসি", nameEn: "BCC" },
  { name: "ডাক বিভাগ", nameEn: "Postal Department" },
  { name: "সমবায় অধিদপ্তর", nameEn: "Department of Cooperatives" },
  { name: "আরজেএসসিএফ", nameEn: "RJSC" },
  { name: "বাংলাদেশ টেলিভিশন", nameEn: "Bangladesh Television" },
  { name: "প্রাণিসম্পদ অধিদপ্তর", nameEn: "Department of Livestock Services" },
  { name: "নির্বাচন কমিশন", nameEn: "Election Commission" },
  { name: "ফায়ার সার্ভিস ও সিভিল ডিফেন্স", nameEn: "Fire Service & Civil Defense" },
  { name: "শিল্প মন্ত্রণালয়", nameEn: "Ministry of Industries" },
  { name: "বাংলাদেশ কোস্ট গার্ড", nameEn: "Bangladesh Coast Guard" },
  { name: "ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর", nameEn: "Department of Immigration & Passports" },
  { name: "মাধ্যমিক ও উচ্চ শিক্ষা অধিদপ্তর", nameEn: "Directorate of Secondary & Higher Education" },
  { name: "সিপিটিইউ", nameEn: "CPTU" },
  { name: "অর্থ বিভাগ, অর্থ মন্ত্রালয়", nameEn: "Finance Division" },
  { name: "কৃষি মন্ত্রণালয়", nameEn: "Ministry of Agriculture" },
  { name: "ওয়াসা", nameEn: "WASA" },
  { name: "ডিপিডিসি", nameEn: "DPDC" },
]

// Emergency service hotlines
export const emergencyServices: EmergencyService[] = [
  { number: "333", numberBn: "৩৩৩", title: "সরকারি তথ্য ও সেবা", titleEn: "Government Info & Services" },
  { number: "999", numberBn: "৯৯৯", title: "জরুরি সেবা", titleEn: "Emergency Services" },
  { number: "102", numberBn: "১০২", title: "ফায়ার সার্ভিস হটলাইন", titleEn: "Fire Service Hotline" },
  { number: "16107", numberBn: "১৬১০৭", title: "বিআরটিএ সার্ভিস পোর্টাল", titleEn: "BRTA Service Portal" },
  { number: "103", numberBn: "১০৩", title: "সুপ্রীম কোর্ট হেল্পলাইন", titleEn: "Supreme Court Helpline" },
  { number: "109", numberBn: "১০৯", title: "নারী ও শিশু নির্যাতন প্রতিরোধ", titleEn: "Women & Child Abuse Prevention" },
  { number: "106", numberBn: "১০৬", title: "দুদক", titleEn: "Anti-Corruption Commission" },
  { number: "16122", numberBn: "১৬১২২", title: "স্মার্ট ভূমি সেবা", titleEn: "Smart Land Services" },
  { number: "1098", numberBn: "১০৯৮", title: "শিশু সহায়তা লাইন", titleEn: "Child Helpline" },
  { number: "16109", numberBn: "১৬১০৯", title: "বাংলাদেশ কর্মচারী কল্যাণ বোর্ড", titleEn: "Employee Welfare Board" },
  { number: "16113", numberBn: "১৬১১৩", title: "মাদকদ্রব্য নিয়ন্ত্রণ হটলাইন", titleEn: "Narcotics Control Hotline" },
  { number: "16445", numberBn: "১৬৪৪৫", title: "জরুরী অভ্যন্তরীণ নৌ-পরিবহন", titleEn: "Emergency Inland Water Transport" },
  { number: "16171", numberBn: "১৬১৭১", title: "পাসপোর্ট বাতায়ন হটলাইন", titleEn: "Passport Portal Hotline" },
  { number: "16135", numberBn: "১৬১৩৫", title: "বাংলাদেশ মুক্তিযোদ্ধা কল্যাণ ট্রাস্ট", titleEn: "Freedom Fighters Welfare Trust" },
  { number: "16575", numberBn: "১৬৫৭৫", title: "প্রবাসী কল সেন্টার", titleEn: "Expatriate Call Center" },
  { number: "100", numberBn: "১০০", title: "বাংলাদেশ টেলিযোগাযোগ সেবা", titleEn: "Telecom Service Hotline" },
  { number: "16999", numberBn: "১৬৯৯৯", title: "বিদ্যুৎ বিভাগ সেবা", titleEn: "Electricity Department Service" },
  { number: "16699", numberBn: "১৬৬৯৯", title: "লিগ্যাল এইড হেল্পলাইন", titleEn: "Legal Aid Helpline" },
  { number: "16357", numberBn: "১৬৩৫৭", title: "শ্রমিক হেল্পলাইন", titleEn: "Labor Helpline" },
  { number: "16131", numberBn: "১৬১৩১", title: "সর্বজনীন পেনশন স্কিম", titleEn: "Universal Pension Scheme" },
  { number: "16111", numberBn: "১৬১১১", title: "বাংলাদেশ কোস্ট গার্ড হটলাইন", titleEn: "Coast Guard Hotline" },
]

// Quick links
export const quickLinks = [
  { title: "সরকারি নিয়োগ", titleEn: "Government Jobs", icon: "Briefcase", href: "#" },
  { title: "বিজ্ঞপ্তি", titleEn: "Press Release", icon: "Megaphone", href: "#" },
  { title: "বাজেট", titleEn: "Budget", icon: "Wallet", href: "#" },
  { title: "স্টক এক্সচেঞ্জ", titleEn: "Stock Exchange", icon: "TrendingUp", href: "#" },
  { title: "বৈদেশিক মুদ্রার হার", titleEn: "Exchange Rate", icon: "DollarSign", href: "#" },
  { title: "আবহাওয়া", titleEn: "Weather", icon: "CloudSun", href: "#" },
  { title: "ডিজিটাল গার্ড ফাইল সেবা", titleEn: "Digital Guard File", icon: "ShieldCheck", href: "#" },
  { title: "সেবা সহজিকরণ", titleEn: "Service Simplification", icon: "Sparkles", href: "#" },
]

// Office types for the portal selector
export const officeTypes = [
  "স্বায়ত্তশাসিত",
  "মন্ত্রণালয়",
  "বিভাগ",
  "অধিদপ্তর",
  "কর্পোরেশন",
  "কমিশন",
  "কোম্পানি",
  "কর্তৃপক্ষ/অথরিটি",
  "এজেন্সী",
  "ব্যাংক / বীমা / আর্থিক প্রতিষ্ঠান",
  "বিভাগীয় পোর্টাল",
  "জেলা পোর্টাল",
  "পৌরসভা পোর্টাল",
  "উপজেলা পোর্টাল",
  "ইউনিয়ন পোর্টাল",
  "রেজাল্ট প্রকল্প",
  "বিদেশী দূতাবাস/মিশন",
  "জেলা পরিষদ পোর্টাল",
  "সিটি কর্পোরেশন পোর্টাল",
  "প্রশিক্ষণ",
  "শিক্ষা প্রতিষ্ঠান",
  "সরকারি মাঠ পর্যায়ের অফিস",
]

// Government service categories
export const govServiceCategories = [
  { title: "জনপ্রিয় সেবা", titleEn: "Popular Services", icon: "Star" },
  { title: "নতুন সেবা", titleEn: "New Services", icon: "Sparkles" },
  { title: "মোবাইল সেবা", titleEn: "Mobile Services", icon: "Smartphone" },
  { title: "দপ্তর সেবা", titleEn: "Department Services", icon: "Building2" },
  { title: "সকল ই-সেবা", titleEn: "All E-Services", icon: "LayoutGrid" },
]
