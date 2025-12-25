import { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MarqueeSection from '../components/MarqueeSection';
import WorkSection from '../components/WorkSection';
import ExpertiseSection from '../components/ExpertiseSection';
import StatsSection from '../components/StatsSection';
import GlobalSection from '../components/GlobalSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Update page title and meta
    document.title = 'INNOCEAN | Creative Experience Company';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection />
        <WorkSection />
        <ExpertiseSection />
        <StatsSection />
        <GlobalSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
