import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-salvador.png";
import type { Sponsor } from "@/regions/types";

import caioPhoto from "./assets/caio-nunes.jpg";
import danielPhoto from "./assets/daniel-carneiro.jpg";
import daviPhoto from "./assets/davi-brito-chagas.jpg";
import flavioFoxPhoto from "./assets/flavio-fox.jpg";
import flavioPimentaPhoto from "./assets/flavio-pimenta.jpg";
import marcosPhoto from "./assets/marcos-menezes.jpg";
import rodrigoPhoto from "./assets/rodrigo-gandarela.jpg";

const photoMap: Record<string, string> = {
  "caio-nunes.jpg": caioPhoto,
  "daniel-carneiro.jpg": danielPhoto,
  "davi-brito-chagas.jpg": daviPhoto,
  "flavio-fox.jpg": flavioFoxPhoto,
  "flavio-pimenta.jpg": flavioPimentaPhoto,
  "marcos-menezes.jpg": marcosPhoto,
  "rodrigo-gandarela.jpg": rodrigoPhoto,
};

const resolvedOrganizers = organizers.map((org) => ({
  ...org,
  photo: photoMap[org.photo] || org.photo,
}));

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

const Nordeste = () => (
  <RegionPage
    config={config}
    organizers={resolvedOrganizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={resolvedSponsors}
    heroImage={heroImage}
  />
);

export default Nordeste;
