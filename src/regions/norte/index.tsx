import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-belem.png";
import type { Speaker, Sponsor } from "@/regions/types";
import { useNorteSchedule } from "./hooks/useNorteSchedule";

const sponsorLogoModules = import.meta.glob(
  "./assets/sponsors/*.{png,jpg,jpeg,svg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const logoMap: Record<string, string> = Object.fromEntries(
  Object.entries(sponsorLogoModules).map(([path, url]) => [
    path.split("/").pop() ?? path,
    url,
  ]),
);

const speakerPhotoModules = import.meta.glob(
  "./assets/speakers/*.{png,jpg,jpeg,svg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const speakerPhotoMap: Record<string, string> = Object.fromEntries(
  Object.entries(speakerPhotoModules).map(([path, url]) => [
    path.split("/").pop() ?? path,
    url,
  ]),
);

const resolvedSpeakers: Speaker[] = speakers.map((speaker) => ({
  ...speaker,
  photo: speakerPhotoMap[speaker.photo] || speaker.photo,
})).sort((a, b) => Number(b.keynote) - Number(a.keynote));

const resolvedSponsors: Sponsor[] = sponsors.map((sponsor) => {
  const filename = sponsor.logo.split("/").pop() || "";
  return {
    ...sponsor,
    logo: logoMap[filename] || sponsor.logo,
    tier: sponsor.tier as Sponsor["tier"],
  };
});

const Norte = () => {
  const { schedule, loading } = useNorteSchedule();

  return (
    <RegionPage
      config={config}
      organizers={organizers}
      speakers={resolvedSpeakers}
      schedule={schedule}
      scheduleLoading={loading}
      sponsors={resolvedSponsors}
      heroImage={heroImage}
    />
  );
};

export default Norte;
