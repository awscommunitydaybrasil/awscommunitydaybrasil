import { useEffect } from "react";
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
import CommunitiesSection from "./components/CommunitiesSection";
import PhotoGalleryCard from "./components/PhotoGalleryCard";
import OrganizersSection from "./components/OrganizersSection";
import RegionFooter from "./components/RegionFooter";
import SeoHead from "@/components/SeoHead";

interface RegionPageProps {
  config: RegionConfig;
  organizers: Organizer[];
  speakers: Speaker[];
  schedule: ScheduleItem[];
  sponsors: Sponsor[];
  heroImage: string;
  eventPhoto?: string;
}

const BASE_URL = "https://awscommunityday.com.br";

function isPastEvent(targetDate: string): boolean {
  const eventDate = new Date(targetDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate < today;
}

const RegionPage = ({ config, organizers, speakers, schedule, sponsors, heroImage, eventPhoto }: RegionPageProps) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const past = isPastEvent(config.targetDate);

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
    eventStatus: past ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
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
      <SeoHead
        config={{
          title: pageTitle,
          description: pageDescription,
          canonicalUrl,
          og: {
            url: canonicalUrl,
            image: {
              url: ogImageUrl,
              alt: `Postcard oficial da edicao ${config.regionName} do AWS Community Day Brasil`,
              width: 1200,
              height: 630,
            },
          },
          twitter: {
            url: canonicalUrl,
            image: {
              url: ogImageUrl,
              alt: `Postcard oficial da edicao ${config.regionName} do AWS Community Day Brasil`,
              width: 1200,
              height: 630,
            },
          },
          jsonLd: [eventJsonLd],
        }}
      />
      <RegionHeader registrationUrl={past ? undefined : config.registration.url} />
      <RegionHero config={config} heroImage={heroImage} past={past} />
      {past && config.pastEvent?.photosUrl && eventPhoto && (
        <PhotoGalleryCard photosUrl={config.pastEvent.photosUrl} photoImage={eventPhoto} />
      )}
      <InfoCardsSection config={config} formattedDate={formattedDate} past={past} />
      {!past && config.callForSpeakersUrl && <CallForSpeakersSection url={config.callForSpeakersUrl} config={config} formattedDate={formattedDate} />}
      {!past && <ExpectationsSection />}
      <SpeakersSection speakers={speakers} past={past} />
      <ScheduleSection schedule={schedule} hasSpeakers={speakers.length > 0} />
      {!past && config.callForSponsorsUrl && <CallForSponsorsSection url={config.callForSponsorsUrl} config={config} />}
      <SponsorsSection sponsors={sponsors} />
      {(config.communities || config.pastEvent?.communities) && (
        <CommunitiesSection communities={config.communities || config.pastEvent?.communities || []} />
      )}
      <OrganizersSection organizers={organizers} />
      <RegionFooter config={config} />
    </div>
  );
};

export default RegionPage;
