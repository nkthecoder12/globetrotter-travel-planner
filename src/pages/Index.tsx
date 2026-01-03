import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { FeaturedDestinations } from '@/components/home/FeaturedDestinations';
import { HowItWorks } from '@/components/home/HowItWorks';
import { CTASection } from '@/components/home/CTASection';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedDestinations />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
