import { useEffect } from "react";
import { Mic } from "lucide-react";
import type { RegionConfig, Organizer, Speaker, ScheduleItem, Sponsor } from "./types";
import RegionHeader from "./components/RegionHeader";
import RegionHero from "./components/RegionHero";
import InfoCardsSection from "./components/InfoCardsSection";
import ExpectationsSection from "./components/ExpectationsSection";
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

const RegionPage = ({ config, organizers, speakers, schedule, sponsors, heroImage }: RegionPageProps) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const targetDateObj = new Date(config.targetDate);
  const formattedDate = `${String(targetDateObj.getDate()).padStart(2, "0")}/${String(targetDateObj.getMonth() + 1).padStart(2, "0")}/${targetDateObj.getFullYear()}`;

  return (
    <div className="min-h-screen bg-background">
      <RegionHeader registrationUrl={config.registration.url} />
      <RegionHero config={config} heroImage={heroImage} />

      {config.callForSpeakersUrl && (
        <section className="pt-0 pb-2 px-4 text-center">
          <a
            href={config.callForSpeakersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-colors"
          >
            <Mic className="w-5 h-5" />
            Submeta sua palestra — Call for Speakers
          </a>
        </section>
      )}

      <InfoCardsSection config={config} formattedDate={formattedDate} />
      <ExpectationsSection />
      <SpeakersSection speakers={speakers} />
      <ScheduleSection schedule={schedule} hasSpeakers={speakers.length > 0} />
      <SponsorsSection sponsors={sponsors} />
      <OrganizersSection organizers={organizers} />
      <RegionFooter config={config} />
    </div>
  );
};

export default RegionPage;
