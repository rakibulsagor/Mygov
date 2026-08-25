import { ScrollProgress } from '@/components/bangladesh/scroll-progress'
import { GlobalSearchProvider } from '@/components/bangladesh/global-search-provider'
import { SectionNavigator } from '@/components/bangladesh/section-navigator'
import { TopBar } from '@/components/bangladesh/top-bar'
import { Header } from '@/components/bangladesh/header'
import { NewsTicker } from '@/components/bangladesh/news-ticker'
import { HeroSection } from '@/components/bangladesh/hero-section'
import { StatsSection } from '@/components/bangladesh/stats-section'
import { NationalIdentitySection } from '@/components/bangladesh/national-identity-section'
import { EServicesSection } from '@/components/bangladesh/e-services-section'
import { BanglaAIToolsSection } from '@/components/bangladesh/bangla-ai-tools-section'
import { LiveWidgetsSection } from '@/components/bangladesh/live-widgets-section'
import { MinistriesSection } from '@/components/bangladesh/ministries-section'
import { EmergencyServicesSection } from '@/components/bangladesh/emergency-services-section'
import { QuickLinksSection } from '@/components/bangladesh/quick-links-section'
import { PortalDirectorySection } from '@/components/bangladesh/portal-directory-section'
import { PhotoGallerySection } from '@/components/bangladesh/photo-gallery-section'
import { NewsNoticesSection } from '@/components/bangladesh/news-notices-section'
import { Footer } from '@/components/bangladesh/footer'
import { FloatingActions } from '@/components/bangladesh/floating-actions'
import { OnboardingTour } from '@/components/bangladesh/onboarding-tour'
import { KeyboardShortcutsHelp } from '@/components/bangladesh/keyboard-shortcuts-help'

export default function Home() {
  return (
    <GlobalSearchProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <ScrollProgress />
        <TopBar />
        <Header />
        <NewsTicker />
        <main className="flex-1">
          <HeroSection />
          <StatsSection />
          <NationalIdentitySection />
          <EServicesSection />
          <BanglaAIToolsSection />
          <LiveWidgetsSection />
          <MinistriesSection />
          <EmergencyServicesSection />
          <QuickLinksSection />
          <NewsNoticesSection />
          <PortalDirectorySection />
          <PhotoGallerySection />
        </main>
        <Footer />
        <FloatingActions />
        <SectionNavigator />
        <OnboardingTour />
        <KeyboardShortcutsHelp />
      </div>
    </GlobalSearchProvider>
  )
}
