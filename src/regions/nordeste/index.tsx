import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import volunteers from "./data/volunteers.json";
import heroImage from "./assets/postcard-salvador.png";
import type { Sponsor, Speaker, Organizer } from "@/regions/types";

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

const resolvedSpeakers: Speaker[] = (speakers as Speaker[]).map((speaker) => ({
  ...speaker,
  photo: speakerPhotoMap[speaker.photo] || speaker.photo,
}));

const volunteerPhotoModules = import.meta.glob(
  "./assets/volunteers/*.{png,jpg,jpeg,svg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const volunteerPhotoMap: Record<string, string> = Object.fromEntries(
  Object.entries(volunteerPhotoModules).map(([path, url]) => [
    path.split("/").pop() ?? path,
    url,
  ]),
);

const resolvedVolunteers: Organizer[] = (volunteers as Organizer[])
  .map((vol) => ({
    ...vol,
    photo: volunteerPhotoMap[vol.photo] || vol.photo,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

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
    speakers={resolvedSpeakers}
    schedule={schedule}
    sponsors={resolvedSponsors}
    volunteers={resolvedVolunteers}
    heroImage={heroImage}
  />
);

export default Nordeste;
