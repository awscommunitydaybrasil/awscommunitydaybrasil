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
      {settings.sections.hero        && <HeroSection about={about} settings={settings} />}
      {settings.sections.about       && <AboutSection about={about} />}
      {settings.sections.counts      && <StatsSection counts={counts} />}
      {settings.sections.ingress     && <TicketsSection tickets={tickets} />}
      {settings.sections.schedule    && <ScheduleSection items={schedule} />}
      {settings.sections.speakers    && <SpeakersSection speakers={speakers} />}
      {settings.sections.userGroups  && <UserGroupsSection groups={community} />}
      {settings.sections.venue       && <VenueSection settings={settings} />}
      {settings.sections.sponsors    && <SponsorsSection sponsors={sponsors} />}
      {settings.sections.sponsorship && <SponsorshipSection tiers={tiers} settings={settings} />}
      {settings.sections.faq         && <FAQSection faqs={faqs} />}
      {settings.sections.cta         && <CTASection settings={settings} />}
    </main>
  );
}
