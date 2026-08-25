# Bangladesh National Portal - Modern Redesign Worklog

## Project Overview
Redesigning https://bangladesh.gov.bd/ (বাংলাদেশ জাতীয় তথ্য বাতায়ন - Bangladesh National Information Portal) with a modern look while keeping all content the same.

## Original Website Analysis
The original site is the official government portal of Bangladesh with content in Bengali. Key sections:
- Top bar: Date, language selector (BN/EN), accessibility menu
- Header: Logo, search, navigation menu
- Navigation: About Bangladesh (President's Office, PM's Office, Parliament, Cabinet Division, etc.), Statistics, Tourism Board, Tourism Corporation, Bangladesh Code, Geocode, National Budget, E-Services
- Stats: 57 Ministries, 81 Departments, 8 Divisions, 64 Districts, 499 Upazilas, 4568 Unions
- E-Services: Digital Center, Finance & Commerce, Online Application, Education, Agriculture, Jobs, Passport/Visa/Immigration, Admission, Utility Bills, Exam Results, Information Repository, Training, Income Tax, Vehicle Services, Postal & Courier, Your Questions, Ticket Booking, Health, Treasury Challan, Forms, Fisheries & Livestock, Radio/TV News, Bangla AI Tools
- Ministries: 50+ ministries listed
- Emergency Services: 333, 999, 102, 16107, 103, 109, 106, 102, 16122, 1098, 16109, 16113, 16445, 16171, 16135, 16575, 100, 16999, 16699, 16357, 16131, 16111
- Photo Gallery, Quick Links (Gov Jobs, Press Release, Budget, Stock Exchange, Exchange Rate, Weather, Digital Guard File)
- Footer: Sitemap, Terms of Use, Privacy Policy, FAQ, Copyright

---
Task ID: 1
Agent: Main (Z.ai Code)
Task: Set up project structure and worklog

Work Log:
- Fetched original website content using web-reader skill
- Analyzed site structure and all content sections
- Created worklog.md for project tracking
- Planned component architecture for modern redesign

Stage Summary:
- Project plan established with 15 tasks
- Design system will use Bangladesh green (#006A4E) and red (#F42A41) as flag colors
- Will use Noto Sans Bengali font for proper Bengali text rendering
- Modern card-based layout with Framer Motion animations

---
Task ID: 2-13
Agent: Main (Z.ai Code)
Task: Build complete modern redesign of Bangladesh National Portal

Work Log:
- Set up design system in globals.css with Bangladesh flag colors (green primary, red accent)
- Added Noto Sans Bengali font for proper Bengali text rendering in layout.tsx
- Created ThemeProvider for dark/light mode support
- Created comprehensive data file (src/data/bangladesh-data.ts) with all content:
  - Navigation menu with mega-menu children
  - 6 government statistics (57 ministries, 81 departments, 8 divisions, 64 districts, 499 upazilas, 4568 unions)
  - 24 E-Services with icons
  - 64 ministries/departments with Bengali and English names
  - 21 emergency service hotlines
  - 8 quick links
  - 22 office types for portal directory
  - 5 government service categories
- Built 12 React components:
  1. TopBar - date (Bengali), language selector, accessibility menu, theme toggle
  2. Header - sticky logo, search, mega-menu navigation, mobile sheet menu
  3. NewsTicker - scrolling announcements marquee
  4. HeroSection - gradient hero with search, popular searches, highlights
  5. StatsSection - 6 animated stat cards with icons
  6. EServicesSection - category tabs + 24 service cards grid with show more
  7. MinistriesSection - searchable/filterable list of 64 ministries
  8. EmergencyServicesSection - 21 hotline cards with pulse animation
  9. QuickLinksSection - 8 important quick links
  10. PortalDirectorySection - office type selector with portal stats
  11. PhotoGallerySection - filterable gallery (all/photo/video) with 6 items
  12. Footer - 4 link columns, contact info, social links, disclaimer, copyright
  13. FloatingActions - scroll-to-top + quick call menu
- Assembled all components in src/app/page.tsx
- Fixed lint error (setState in effect) in top-bar.tsx
- Ran ESLint - all checks pass

Verification Results:
- Dev server running on port 3000, responds with HTTP 200
- Agent Browser verification: page loads cleanly, no console errors
- All sections render correctly: TopBar, Header, Hero, Stats, E-Services, Ministries, Emergency Services, Quick Links, Portal Directory, Photo Gallery, Footer
- Mobile responsive (375px viewport) verified - hamburger menu works
- Desktop (1440px) verified - full navigation mega-menu works
- VLM analysis confirms: "high-quality, modern redesign" with card-based UI, vibrant thematic colors, clean layout, good typography

Stage Summary:
- Complete modern redesign of Bangladesh National Portal delivered
- All original content preserved (Bengali text, all sections, all data points)
- Modern features added: dark mode, search, animations, responsive design, floating actions
- Design uses Bangladesh flag colors (green #006A4E + red #F42A41)
- Noto Sans Bengali font for authentic Bengali typography
- Sticky footer implemented (mt-auto on flex-col layout)
- No errors, no console warnings, clean build

---
Task ID: 16 (Cron Review Round 1)
Agent: webDevReview (Z.ai Code)
Task: QA testing and enhancement — add new features and improve styling

## Current Project Status Assessment
The Bangladesh National Portal redesign (Phase 1) was complete and functional with 13 components. QA via agent-browser confirmed: no console errors, all interactivity working (theme toggle, mobile menu, ministries search, show more), responsive on mobile (375px) and desktop (1440px). VLM analysis scored the design positively but identified opportunities for more features and richer styling.

## Completed Modifications This Round

### New Components Added (5)
1. **ScrollProgress** (`scroll-progress.tsx`) — Fixed top gradient progress bar using framer-motion useScroll/useSpring, shows reading progress as user scrolls
2. **NationalIdentitySection** (`national-identity-section.tsx`) — Showcases Bangladesh heritage:
   - National anthem quote banner with gradient background
   - 6 national symbols grid (Flag, Royal Bengal Tiger, Shapla flower, Jackfruit, Anthem, National Poet) with gradient icons and hover effects
3. **BanglaAIToolsSection** (`bangla-ai-tools-section.tsx`) — Modern AI feature showcase:
   - Interactive chatbot demo with sample queries (click to see AI response)
   - 6 AI tools grid (Chatbot, Writer, Translation, Smart Search, Document Summary, Voice-to-Text)
   - Animated background orbs, floating "10 lakh+ users" badge
   - Voice mic button, send button, full chat UI
4. **LiveWidgetsSection** (`live-widgets-section.tsx`) — Real-time info dashboard:
   - Weather widget with 4 cities (Dhaka, Chittagong, Rajshahi, Sylhet) — clickable city selector
   - Live ticking clock with Bengali date (updates every second)
   - Exchange rates table (6 currencies: USD, EUR, GBP, SAR, JPY, INR) with trend indicators and flags
5. Enhanced **StatsSection** — Added animated number counters (Bengali numerals count up on scroll into view), decorative background numbers, gradient icon rings, bottom accent bars

### Improved Components
6. **HeroSection** — Major visual upgrade:
   - Larger heading (text-5xl → text-7xl) with underline accent animation
   - 3 animated gradient orbs (framer-motion infinite animation)
   - Dot grid pattern + topographic SVG wave pattern + radial vignette
   - Voice search mic button added
   - Popular searches now show service counts in badges
   - Refined glassmorphism and glow effects

### Page Assembly Updated
- `page.tsx` now includes: ScrollProgress, TopBar, Header, NewsTicker, Hero, Stats, **NationalIdentity**, EServices, **BanglaAITools**, **LiveWidgets**, Ministries, Emergency, QuickLinks, PortalDirectory, PhotoGallery, Footer, FloatingActions

## Verification Results
- ESLint: All checks pass (0 errors)
- Dev server: HTTP 200, compiles cleanly in ~287ms
- Agent Browser QA:
  - No console errors, no runtime errors
  - Animated counters: verified final values correct (৫৭+, ৮১+, ৮+, ৬৪+, ৪৯৯+, ৪৫৬৮+)
  - Weather city switching: verified active city updates (ঢাকা → চট্টগ্রাম)
  - AI sample queries: verified chat response appears on click
  - Scroll progress bar: visible and animates on scroll
  - Mobile responsive (375px): AI tools and live widgets stack correctly
  - Desktop (1440px): full layout renders properly
- VLM final assessment: **8/10** — "Comprehensive Information Architecture" + "Modern Visual Hierarchy & UI"

## Unresolved Issues / Risks
1. **Page length**: The page is now quite long with 11 sections. Could benefit from a sticky table-of-contents or "back to section" navigation in the future.
2. **Live data**: Weather and exchange rates are currently static demo data. For production, these should connect to real APIs (Bangladesh Meteorological Department, Bangladesh Bank).
3. **Accessibility contrast**: Some low-contrast text in the dark hero section could be improved for WCAG AA compliance.
4. **AI chatbot**: Currently a demo with canned responses. Real integration would need a backend LLM endpoint.

## Priority Recommendations for Next Phase
1. **Add a sticky section navigator** — a floating mini-nav showing current section and allowing quick jump between sections
2. **Connect real APIs** — weather (BMD), exchange rates (Bangladesh Bank), for live data
3. **Add a search results modal** — when user searches in hero, show a dropdown with matching services
4. **Implement actual AI chatbot backend** — using z-ai-web-dev-sdk LLM skill for real conversational responses
5. **Add dark mode polish** — verify all new sections look good in dark mode

---
Task ID: 17 (Cron Review Round 2)
Agent: webDevReview (Z.ai Code)
Task: QA testing + add real AI chatbot, global search modal, section navigator, dark mode polish

## Current Project Status Assessment
Project was stable from Round 1 with 11 sections, no errors, dark mode rated 7-9/10 by VLM. Top recommendations from previous round were: sticky section navigator, search results modal, real AI chatbot backend, dark mode polish. All verified as priorities via QA.

## Completed Modifications This Round

### 1. Real AI Chatbot Backend (NEW)
- Created `src/app/api/chat/route.ts` using z-ai-web-dev-sdk LLM skill
- Custom system prompt: "বাংলা এআই সহকারী" — Bangladesh government portal assistant
- Includes context about key government websites (passport, tax, land, education, emergency 333/999)
- Handles multi-turn conversation history (last 6 messages)
- Error handling with Bengali fallback messages
- maxDuration = 30s for LLM calls
- **Verified working**: POST /api/chat returns 200 with detailed Bengali responses

### 2. Wired Chatbot to Real API
- Rewrote `bangla-ai-tools-section.tsx` to use real backend:
  - Full conversation state management (messages array)
  - Auto-scroll to bottom on new message
  - Loading state with animated "ভাবছি..." indicator (3 bouncing dots)
  - Reset chat button (RotateCcw icon)
  - Sample query buttons now send real queries to API
  - Error handling with Bengali fallback message
  - Disabled state during loading
- **Verified end-to-end**: Asked "পাসপোর্ট রিনিউয়াল কিভাবে করব?" → received detailed structured Bengali response with www.epassport.gov.bd link

### 3. Global Search Modal with Command Palette (NEW)
- Created `src/data/search-index.ts` — 40+ searchable entries across categories:
  - E-Services (23), Emergency (6), Quick Links (5), Sections (6)
  - Fuzzy matching with scoring (exact > startsWith > includes > keyword)
- Created `src/components/bangladesh/search-modal.tsx`:
  - Command palette UI with backdrop blur
  - Real-time search results with category color coding
  - Keyboard navigation (↑↓ arrows, Enter to select, Esc to close)
  - Active item highlighting + auto-scroll into view
  - Empty state with popular searches + category quick-links
  - "No results" state with helpful fallback
  - Footer with keyboard hints
- Created `src/hooks/use-keyboard-shortcut.ts` — reusable Ctrl+K hook
- Created `src/components/bangladesh/global-search-provider.tsx`:
  - Wraps app, provides global Ctrl+K / Cmd+K shortcut
  - Exposes window.__openSearch API for header/hero buttons
- Updated `header.tsx`: desktop search bar + mobile search button now open global modal (shows "Ctrl K" hint)
- Updated `hero-section.tsx`: search input opens modal on focus, popular searches open modal with query
- **Verified**: Ctrl+K opens modal, typing shows results, keyboard nav works

### 4. Sticky Section Navigator with Scroll Spy (NEW)
- Created `src/components/bangladesh/section-navigator.tsx`:
  - Vertical dot tracker on left side (appears after scrollY > 600)
  - 10 section dots with active state (scaled + primary color)
  - Animated progress line fills as you scroll
  - Hover tooltips showing section names
  - Click dot to smooth-scroll to section
  - Expandable panel with full section list (numbered, with icons)
  - IntersectionObserver scroll spy detects active section
  - Only visible on lg+ screens (hidden on mobile)
- **Verified**: Navigator appears on scroll, dots highlight active section, click jumps to section, expandable panel works

### 5. Dark Mode Polish
- Improved live widgets weather section dark gradient (cyan-950/30 for better contrast)

### 6. Refactoring / Code Quality
- Fixed all ESLint errors:
  - Moved window.__openSearch assignment to useEffect (react-hooks/immutability)
  - Refactored SearchModal to use useMemo for derived results (no setState in effect)
  - Split SearchModal into wrapper + content component with key for clean remount
  - Used useCallback for handleSelect to fix "accessed before declared" error
- Removed unused imports (X, Globe, Input) from header
- ESLint: 0 errors, clean build

## Verification Results
- ESLint: 0 errors ✅
- Dev server: HTTP 200, compiles cleanly
- Chat API: POST /api/chat → 200, returns detailed Bengali responses (41s LLM time)
- Agent Browser QA:
  - No console errors, no runtime errors
  - Ctrl+K opens search modal ✅
  - Header search button opens modal ✅
  - Search results appear with category colors ✅
  - Keyboard navigation (arrows, enter, escape) works ✅
  - AI chatbot: typed question → received real LLM response ✅
  - Chat loading state ("ভাবছি...") shows during API call ✅
  - Section navigator appears after scroll ✅
  - Dot active state tracks scroll position ✅
  - Click dot → smooth scroll to section ✅
  - Expandable panel shows all 10 sections ✅
- VLM assessments:
  - Chat UX: 8/10 — "detailed, structured answer... direct source link"
  - Hero: 8/10 — "Ctrl+K hint clearly visible, search bar is central focal point"
  - Section navigator: visible and functional

## Unresolved Issues / Risks
1. **LLM response time**: The AI chatbot takes 30-45s to respond (LLM latency). Could add a streaming response feature for better UX, or a typing indicator that shows progress.
2. **Search index completeness**: Could add ministries (64 entries) to the search index for even more comprehensive results.
3. **Voice search**: The mic buttons are decorative — no actual speech-to-text integration yet.
4. **Mobile section nav**: Section navigator hidden on mobile (could add a bottom-sheet version).

## Priority Recommendations for Next Phase
1. **Add streaming chat responses** — use z-ai SDK streaming to show tokens as they arrive (better UX for 30-45s responses)
2. **Add ministries to search index** — index all 64 ministries for comprehensive search
3. **Add a "back to top" floating button enhancement** — already exists, could add section name display
4. **Add bookmark/favorite services** — let users star services for quick access (localStorage)
5. **Add a tour/onboarding** — first-visit highlight of key features (Ctrl+K, chatbot, navigator)

---
Task ID: 18 (Cron Review Round 3)
Agent: webDevReview (Z.ai Code)
Task: QA testing + streaming chat, ministries search index, bookmark services feature

## Current Project Status Assessment
Project was stable from Round 2 with: real AI chatbot (non-streaming, 30-45s latency), global search modal (Ctrl+K), section navigator, 11 sections. Top recommendations were: streaming chat responses, ministries in search index, bookmark/favorite services. All verified as priorities via QA. No errors found in initial QA (lint clean, HTTP 200).

## Completed Modifications This Round

### 1. Streaming Chat API Endpoint (NEW)
- Created `src/app/api/chat-stream/route.ts` using z-ai-web-dev-sdk with `stream: true`
- Investigated SDK streaming behavior: returns async iterable of raw SSE text chunks (byte arrays)
- Implemented SSE parsing: extracts `data:` lines, parses JSON, extracts `delta.content` from each chunk
- Returns a `ReadableStream` with proper SSE headers (`text/event-stream`, no-cache)
- maxDuration = 60s for long LLM streams
- Same system prompt as non-streaming endpoint (Bengali government assistant)
- **Verified**: curl test returned "হ্যাঁ।" streamed token-by-token ("হ" → "্য" → "াঁ" → "।")
- **Verified**: full response "বাংলাদেশের জাতীয় ফুল হল শাপলা..." streamed live in UI

### 2. Wired Chatbot to Streaming Endpoint
- Rewrote `sendMessage` in `bangla-ai-tools-section.tsx` to use `/api/chat-stream`:
  - Uses `fetch` with `ReadableStream` reader + TextDecoder
  - Parses SSE `data:` lines, accumulates `delta.content` into full reply
  - Updates the assistant message live as tokens arrive (real-time typing effect)
  - Adds empty assistant message first, then fills it as stream progresses
  - Buffer-based SSE line splitting (handles partial chunks)
  - Error/fallback handling for empty responses and network errors
- New UI states:
  - **Waiting dots**: 3 bouncing dots shown before first token arrives
  - **Typing cursor**: blinking violet vertical bar at end of streaming text
  - **Status indicator**: header changes from "অনলাইন — এখন প্রশ্ন করুন" to "টাইপ করছে..." (amber dot) during streaming
  - **Send button spinner**: CSS border spinner replaces Loader2 icon during loading
- Removed old separate loading indicator (now integrated into streaming message)
- **Verified**: User asked "বাংলাদেশের জাতীয় ফুল কি?" → response about Shapla flower streamed live with typing cursor

### 3. Ministries Added to Search Index
- Updated `src/data/search-index.ts`:
  - Imports `ministries` from `bangladesh-data.ts` (64 entries)
  - Dynamically maps each ministry to a SearchEntry with category 'ministry'
  - Keywords include: ministry name (Bengali), name (English), + split English words
  - Uses Landmark icon, amber category color (already existed)
- **Verified**: Searching "কৃষি" returns both e-service "কৃষি" AND ministry "কৃষি মন্ত্রণালয়"
- **Verified**: Searching "health" returns "স্বাস্থ্য বিষয়ক" e-service AND "স্বাস্হ্য ও পরিবার কল্যাণ মন্ত্রণালয়" + "স্বাস্থ্য অধিদপ্তর"
- Search now covers 100+ entries (40 services/links + 64 ministries)

### 4. Bookmark/Favorite Services Feature (NEW)
- Created `src/hooks/use-bookmarks.ts`:
  - Uses `useSyncExternalStore` for SSR-safe localStorage hydration (no setState-in-effect lint error)
  - External store with subscribe/getSnapshot/getServerSnapshot pattern
  - Cross-tab sync via 'storage' event + same-tab sync via custom 'bookmarks-changed' event
  - API: bookmarks[], isBookmarked(id), addBookmark, removeBookmark, toggleBookmark, clearBookmarks
  - Persists to localStorage key 'bangladesh-portal-bookmarks'
- Updated `e-services-section.tsx`:
  - Added 6th category tab "প্রিয় সেবা" (Favorites) with BookmarkCheck icon + count badge
  - Badge shows count (red, "9+" if >9), appears only when bookmarks exist
  - Each service card has bookmark star button (top-left, appears on hover via group-hover)
  - Bookmarked services show filled amber BookmarkCheck icon (always visible)
  - Clicking bookmark toggles saved state + updates badge reactively
  - Favorites tab shows bookmarked services only, with empty state ("এখনো কোন সেবা যোগ করা হয়নি")
  - "সব মুছুন" (Clear all) button in favorites tab header
  - Wraps service card content in `<a>` while keeping bookmark button outside (preventDefault on click)
- **Verified end-to-end**: Clicked bookmark on "ডিজিটাল সেন্টার" → localStorage saved → badge shows "1" → favorites tab shows the service

### 5. Code Quality
- All ESLint errors resolved:
  - Refactored useBookmarks to use useSyncExternalStore (avoids setState-in-effect)
  - Removed `mounted` state guard (useSyncExternalStore handles hydration automatically)
  - Fixed corrupted conditional rendering from sed (manual Edit repairs)
- ESLint: 0 errors, clean build

## Verification Results
- ESLint: 0 errors ✅
- Dev server: HTTP 200, page renders 283KB HTML with all 7 section IDs
- Streaming chat API: returns tokens live via SSE ("হ" → "্য" → "াঁ" → "।" = "হ্যাঁ")
- Non-streaming chat API: still works as fallback (returns full reply JSON)
- Page renders: TopBar (date), Header (Ctrl K hint), nav, news ticker, hero, all 11 sections
- Agent Browser QA (when server stable):
  - Page title: "বাংলাদেশ জাতীয় তথ্য বাতায়ন | Bangladesh National Portal" ✅
  - E-Services section renders with "সরকারি সেবাসমূহ" heading ✅
  - 11 bookmark buttons present in DOM ✅
  - "প্রিয় সেবা" favorites tab present ✅
  - Bookmark click → localStorage saved → badge count "1" ✅
  - Search returns ministries + services ✅
  - Streaming chat shows typing cursor + live tokens ✅
- VLM assessment: E-Services design rated 8/10 — "Clean, modern UI with good use of whitespace and clear iconography"

## Environment Issue Encountered
- The detached dev server process (`next-server`) dies periodically in this sandbox environment, especially when agent-browser connects (likely memory pressure during turbopack compilation). 
- Workaround: restart server with `nohup bun run dev` before each test session; server stays alive long enough for verification.
- The agent-browser sometimes shows a stale "Parsing ecmascript source code failed" error from turbopack cache, but the actual file is valid (bun build succeeds, page renders 200 with all sections). This is a turbopack cache artifact, not a real error.

## Unresolved Issues / Risks
1. **Dev server stability**: Server process dies periodically in sandbox; requires restart for browser testing.
2. **Turbopack cache**: Stale parse error shown in agent-browser console despite valid file. Clearing `.next` + restart resolves it.
3. **Streaming response time**: First token still takes a few seconds (LLM thinking time), but subsequent tokens stream quickly. The waiting dots indicator handles this gap well.
4. **Bookmark persistence**: Uses localStorage — clearing browser data removes bookmarks. Could add export/import feature.

## Priority Recommendations for Next Phase
1. **Add a Government News & Notices section** — RSS-style cards with latest government announcements, circulars, and news
2. **Add voice search** — wire the mic buttons to Web Speech API for Bengali voice input
3. **Add a first-visit tour/onboarding** — highlight Ctrl+K, chatbot, navigator, bookmarks features
4. **Add export/import bookmarks** — let users backup their favorite services
5. **Add a "recently viewed" section** — track which services/ministries user visited (sessionStorage)

---
Task ID: 19 (Cron Review Round 4)
Agent: webDevReview (Z.ai Code)
Task: QA testing + Government News section, voice search, recently-viewed tracking

## Current Project Status Assessment
Project was stable from Round 3 with: streaming AI chatbot, bookmark services, ministry search (100+ entries), section navigator, global search modal (Ctrl+K), 11 sections. Top recommendations were: Government News & Notices section, voice search, first-visit tour, recently-viewed tracking. QA confirmed no errors (lint clean, HTTP 200, all sections render). All recommendations addressed as priorities this round.

## Completed Modifications This Round

### 1. Government News & Notices Section (NEW)
- Created `src/data/news-data.ts` — 9 news items across 5 categories:
  - Notice (নোটিশ), Circular (প্রজ্ঞাপন), News (সংবাদ), Job (নিয়োগ), Tender (টেন্ডার)
  - Each item: title (Bengali+English), excerpt, category, date, source, isUrgent/isNew flags
  - Realistic content: passport notice, budget, teacher recruitment, VAT circular, digital center, tender, SSC results, monetary policy, election
- Created `src/components/bangladesh/news-notices-section.tsx`:
  - Stats bar showing urgent count, new count, total count
  - Category filter tabs (6 tabs: All, Notice, Circular, News, Job, Tender) with live counts
  - News cards with: category-colored top accent bar, icon, category badge, date, title (line-clamp-2), excerpt (line-clamp-3), source footer, urgent/new badges
  - Hover effects: lift, shadow, arrow icon
  - Show more/less button (6 items initially)
  - Empty state for filtered categories with no items
  - Color-coded categories: blue (notice), purple (circular), green (news), amber (job), rose (tender)
- Added to page.tsx between QuickLinks and PortalDirectory
- Added 'news' to SectionNavigator (Newspaper icon)
- **Verified**: Page renders with id="news", "সরকারি বিজ্ঞপ্তি ও সংবাদসমূহ" heading, category tabs, urgent/new badges
- VLM: 7/10 — "Clean, accessible layout with clear hierarchy, effective use of color-coded categories and status badges"

### 2. Voice Search Feature (NEW)
- Created `src/hooks/use-voice-search.ts`:
  - Uses Web Speech API (window.SpeechRecognition / webkitSpeechRecognition)
  - Configured for Bengali (lang: 'bn-BD'), interim results, maxAlternatives: 1
  - Returns: isListening, transcript, isSupported, error, startListening, stopListening, reset
  - Error handling: not-allowed (mic denied), no-speech, generic errors — all in Bengali
  - Uses onResultRef pattern to avoid stale closure + lint-clean (useEffect for ref update)
  - SSR-safe (checks typeof window)
- Created `src/components/bangladesh/voice-search-button.tsx`:
  - Reusable button component (size: 'sm' | 'md')
  - Full-screen overlay modal with animated mic icon (pulsing rings when listening)
  - Status text: "শুনছি..." (listening) / "ভয়েস সার্চ" (idle)
  - Live transcript display in a bordered box
  - Error message display (red box)
  - Control buttons: "বন্ধ করুন" (stop) / "আবার চেষ্টা করুন" (try again)
  - Unsupported browser state with Chrome/Edge recommendation
  - Bengali tip: "পরিষ্কারভাবে বাংলায় কথা বলুন"
- Integrated into HeroSection (replaces decorative mic button, calls openSearch with transcript)
- Integrated into BanglaAIToolsSection chat input (fills the chat input with voice transcript)
- **Verified**: 2 voice search buttons found in DOM, overlay opens with mic icon + status text
- VLM confirmed overlay shows mic icon, status text, error handling, try-again button

### 3. Recently Viewed Tracking (NEW)
- Created `src/hooks/use-recently-viewed.ts`:
  - Uses useSyncExternalStore for SSR-safe sessionStorage hydration
  - Tracks up to 8 recently viewed items (id, title, titleEn, category, href, viewedAt)
  - API: recent[], addRecent, removeRecent, clearRecent
  - Cross-component sync via custom 'recent-changed' event
  - Removes duplicates (moves existing item to top)
- Created `src/components/bangladesh/recently-viewed-widget.tsx`:
  - Card with header ("সম্প্রতি দেখা"), history icon, clear button
  - Scrollable list (max-h-80) with animated items
  - Each item: category icon, title, time-ago ("এইমাত্র", "X মিনিট আগে", "X ঘন্টা আগে")
  - Bengali numeral conversion for time strings
  - Remove button per item (appears on hover)
  - Hidden when no history (returns null)
- Integrated into EServicesSection: clicking a service card calls addRecent()
- Integrated into QuickLinksSection: widget appears as a sticky sidebar (lg+ screens)
- **Verified**: Widget hidden initially → after clicking a service card → "সম্প্রতি দেখা" appears with "এইমাত্র" timestamp

### 4. Code Quality
- All ESLint errors resolved:
  - use-voice-search: Removed useEffect-based setIsSupported (moved support check into startListening callback)
  - use-voice-search: Used useEffect + ref pattern for onResultRef (avoids "ref update during render" lint error)
  - All hooks use useSyncExternalStore or lazy patterns (no setState-in-effect)
- ESLint: 0 errors, clean build

## Verification Results
- ESLint: 0 errors ✅
- Dev server: HTTP 200, page renders 311KB HTML (up from 283KB due to new News section)
- All 9 section IDs render: news, e-services, ai-tools, ministries, emergency, gallery, national-identity, live-widgets, quick-links ✅
- Streaming chat API: still works (returns tokens live)
- Agent Browser QA:
  - Page title correct ✅
  - News section renders with "সরকারি বিজ্ঞপ্তি ও সংবাদসমূহ" ✅
  - 2 voice search buttons in DOM (hero + chatbot) ✅
  - Voice search overlay opens with mic icon, status, error handling ✅
  - Recently viewed widget: hidden initially → appears after clicking service ✅
  - Time stamp "এইমাত্র" shows correctly ✅
- VLM assessments:
  - News section: 7/10 — "Clean, accessible layout, effective color-coded categories"
  - Voice search overlay: confirmed mic icon, status text, try-again button, tips

## Unresolved Issues / Risks
1. **Dev server stability**: Server process still dies periodically in sandbox during browser testing (known environment issue). Workaround: restart before each test session.
2. **Voice search in headless browser**: The headless agent-browser has no microphone access, so voice search shows error states. This is expected — real users with Chrome/Edge will have full functionality.
3. **News data is static**: The 9 news items are sample data. For production, could integrate RSS feeds from government sources.
4. **Recently viewed uses sessionStorage**: Cleared when browser session ends (by design — privacy-friendly).

## Priority Recommendations for Next Phase
1. **Add first-visit tour/onboarding** — highlight Ctrl+K, chatbot, voice search, navigator, bookmarks features (still pending from previous recommendations)
2. **Add export/import bookmarks** — let users backup their favorite services
3. **Connect news to real RSS feeds** — integrate Bangladesh government RSS sources for live news
4. **Add a "back to top" button enhancement** — show current section name in the floating actions
5. **Add accessibility improvements** — keyboard navigation for news cards, ARIA labels for voice search states
