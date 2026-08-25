import { TopBar } from '@/components/bangladesh/top-bar'
import { Header } from '@/components/bangladesh/header'
import { NewsTicker } from '@/components/bangladesh/news-ticker'
import { HeroSection } from '@/components/bangladesh/hero-section'
import { StatsSection } from '@/components/bangladesh/stats-section'
import { EServicesSection } from '@/components/bangladesh/e-services-section'
import { MinistriesSection } from '@/components/bangladesh/ministries-section'
import { EmergencyServicesSection } from '@/components/bangladesh/emergency-services-section'
import { QuickLinksSection } from '@/components/bangladesh/quick-links-section'
import { PortalDirectorySection } from '@/components/bangladesh/portal-directory-section'
import { PhotoGallerySection } from '@/components/bangladesh/photo-gallery-section'
import { Footer } from '@/components/bangladesh/footer'
import { FloatingActions } from '@/components/bangladesh/floating-actions'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      <NewsTicker />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <EServicesSection />
        <MinistriesSection />
        <EmergencyServicesSection />
        <QuickLinksSection />
        <PortalDirectorySection />
        <PhotoGallerySection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
