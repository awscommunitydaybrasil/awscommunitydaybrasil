import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import type { RegionConfig, Organizer, Speaker, ScheduleItem, Sponsor } from "./types";
import RegionHeader from "./components/RegionHeader";
import RegionHero from "./components/RegionHero";
import InfoCardsSection from "./components/InfoCardsSection";
import ExpectationsSection from "./components/ExpectationsSection";
import CallForSpeakersSection from "./components/CallForSpeakersSection";
import CallForSponsorsSection from "./components/CallForSponsorsSection";
import SpeakersSection from "./components/SpeakersSection";
import ScheduleSection from "./components/ScheduleSection";
import SponsorsSection from "./components/SponsorsSection";
import OrganizersSection from "./components/OrganizersSection";
import RegionFooter from "./components/RegionFooter";

interface RegionPageProps {
  config: RegionConfig;
  organizers: Organizer[];
  speakers: Speaker[];
  schedule: ScheduleItem[];
  sponsors: Sponsor[];
  heroImage: string;
}

const BASE_URL = "https://awscommunityday.com.br";

const RegionPage = ({ config, organizers, speakers, schedule, sponsors, heroImage }: RegionPageProps) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const targetDateObj = new Date(config.targetDate);
  const formattedDate = `${String(targetDateObj.getDate()).padStart(2, "0")}/${String(targetDateObj.getMonth() + 1).padStart(2, "0")}/${targetDateObj.getFullYear()}`;

  const pageTitle = `AWS Community Day Brasil 2026 — ${config.regionName} (${config.location.city})`;
  const pageDescription = `${config.subtitle}. ${config.location.city} — ${formattedDate}.`;
  const slug = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
  const canonicalUrl = `${BASE_URL}/${slug}/`;
  const ogImageUrl = `${BASE_URL}/og/${slug}.png`;

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `AWS Community Day Brasil 2026 - ${config.regionName}`,
    startDate: config.targetDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: config.location.venue,
      address: config.location.city,
    },
    image: [ogImageUrl],
    description: pageDescription,
    organizer: {
      "@type": "Organization",
      name: "AWS Community Day Brasil",
      url: BASE_URL,
    },
    url: canonicalUrl,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="AWS Community Day Brasil" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content={`Postcard oficial da edicao ${config.regionName} do AWS Community Day Brasil`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={`Postcard oficial da edicao ${config.regionName} do AWS Community Day Brasil`} />
        <script type="application/ld+json">{JSON.stringify(eventJsonLd)}</script>
      </Helmet>
      <RegionHeader registrationUrl={config.registration.url} />
      <RegionHero config={config} heroImage={heroImage} />
      <InfoCardsSection config={config} formattedDate={formattedDate} />
      {config.callForSpeakersUrl && <CallForSpeakersSection url={config.callForSpeakersUrl} config={config} formattedDate={formattedDate} />}
      <ExpectationsSection />
      <SpeakersSection speakers={speakers} />
      <ScheduleSection schedule={schedule} hasSpeakers={speakers.length > 0} />
      {config.callForSponsorsUrl && <CallForSponsorsSection url={config.callForSponsorsUrl} config={config} />}
      <SponsorsSection sponsors={sponsors} />
      <OrganizersSection organizers={organizers} />
      <RegionFooter config={config} />
    </div>
  );
};

export default RegionPage;
