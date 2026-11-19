import Header from "@/components/Header";
import SeasonRetrospective from "@/components/SeasonRetrospective";
import AboutSection from "@/components/AboutSection";
import GalleryCarousel from "@/components/GalleryCarousel";
import PastEditionsSection from "@/components/PastEditionsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div
      className="min-h-screen bg-background"
      style={{ backgroundImage: "radial-gradient(ellipse at 78% 5%, rgba(255, 153, 0, 0.1), transparent 34rem)" }}
    >
      <Header />
      <main>
        <SeasonRetrospective />
        <AboutSection />
        <GalleryCarousel />
        <PastEditionsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
