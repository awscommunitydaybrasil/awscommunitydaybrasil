import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>AWS Community Day Brasil 2026</title>
        <meta name="description" content="AWS Community Day Brasil 2026 — pela primeira vez em todas as 5 regiões do país." />
        <link rel="canonical" href="https://awscommunityday.com.br" />
        <meta property="og:url" content="https://awscommunityday.com.br" />
      </Helmet>
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
