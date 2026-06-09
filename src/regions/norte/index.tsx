import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-belem.png";
import type { Sponsor } from "@/regions/types";

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

const resolvedSponsors: Sponsor[] = sponsors.map((sponsor) => {
  const filename = sponsor.logo.split("/").pop() || "";
  return {
    ...sponsor,
    logo: logoMap[filename] || sponsor.logo,
    tier: sponsor.tier as Sponsor["tier"],
  };
});

const Norte = () => (
  <RegionPage
    config={config}
    organizers={organizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={resolvedSponsors}
    heroImage={heroImage}
  />
);

export default Norte;
