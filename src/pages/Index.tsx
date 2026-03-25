import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RegionsSection from "@/components/RegionsSection";
import LeadersSection from "@/components/LeadersSection";
import GalleryCarousel from "@/components/GalleryCarousel";
import PastEditionsSection from "@/components/PastEditionsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <RegionsSection />
      <LeadersSection />
      <GalleryCarousel />
      <PastEditionsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
