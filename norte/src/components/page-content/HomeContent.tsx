import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import TicketsSection from "@/components/TicketsSection";
import ScheduleSection from "@/components/ScheduleSection";
import SpeakersSection from "@/components/SpeakersSection";
import UserGroupsSection from "@/components/UserGroupsSection";
import VenueSection from "@/components/VenueSection";
import SponsorsSection from "@/components/SponsorsSection";
import SponsorshipSection from "@/components/SponsorshipSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import {
  getSettings,
  getAbout,
  getCounts,
  getIngress,
  getSchedule,
  getSpeakers,
  getPatrocinadores,
  getPatrocinioTiers,
  getCommunity,
  getFaq,
} from "@/lib/cms";

export default function HomeContent() {
  const settings     = getSettings();
  const about        = getAbout();
  const counts       = getCounts();
  const tickets      = getIngress();
  const schedule     = getSchedule();
  const speakers     = getSpeakers();
  const sponsors     = getPatrocinadores();
  const tiers        = getPatrocinioTiers();
  const community    = getCommunity();
  const faqs         = getFaq();

  return (
    <main>
      {settings.showHero        && <HeroSection />}
      {settings.showAbout       && <AboutSection about={about} />}
      {settings.showCounts      && <StatsSection counts={counts} />}
      {settings.showIngress     && <TicketsSection tickets={tickets} />}
      {settings.showSchedule    && <ScheduleSection items={schedule} />}
      {settings.showSpeakers    && <SpeakersSection speakers={speakers} />}
      {settings.showUserGroups  && <UserGroupsSection groups={community} />}
      {settings.showVenue       && <VenueSection settings={settings} />}
      {settings.showSponsors    && <SponsorsSection sponsors={sponsors} />}
      {settings.showSponsorship && <SponsorshipSection tiers={tiers} settings={settings} />}
      {settings.showFaq         && <FAQSection faqs={faqs} />}
      {settings.showCta         && <CTASection />}
    </main>
  );
}
