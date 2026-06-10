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

const BASE_URL = "https://awscommunityday.com.br";

const Index = () => {
  const title = "AWS Community Day Brasil 2026";
  const description = "AWS Community Day Brasil 2026 - pela primeira vez em todas as 5 regiões do país.";
  const canonicalUrl = BASE_URL;
  const ogImage = "https://awscommunityday.com.br/og/home.png";

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    url: BASE_URL,
    inLanguage: "pt-BR",
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AWS Community Day Brasil",
    url: BASE_URL,
    logo: "https://awscommunityday.com.br/favicon.png",
    sameAs: [
      "https://www.instagram.com/awscommunitydaybr/",
      "https://www.linkedin.com/company/aws-community-day-brasil/",
      "https://twitter.com/awscommunitybr",
      "https://www.youtube.com/@AWSUserGroupBrasil",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AWS Community Day Brasil" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Identidade visual do AWS Community Day Brasil 2026" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Identidade visual do AWS Community Day Brasil 2026" />
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
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
