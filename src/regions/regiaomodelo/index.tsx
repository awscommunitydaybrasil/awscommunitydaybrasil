import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import type { Sponsor } from "@/regions/types";
import heroImage from "@/regions/centro-oeste/assets/postcard-brasilia.png";

import deividPhoto from "@/regions/centro-oeste/assets/deivid.jpg";
import marcelopaivaPhoto from "@/regions/centro-oeste/assets/marcelopaiva.jpg";
import priscilaPhoto from "@/regions/centro-oeste/assets/priscila.jpg";
import wagnerPhoto from "@/regions/centro-oeste/assets/wagner.jpg";

const photoMap: Record<string, string> = {
  "deivid.jpg": deividPhoto,
  "marcelopaiva.jpg": marcelopaivaPhoto,
  "priscila.jpg": priscilaPhoto,
  "wagner.jpg": wagnerPhoto,
};

const resolvedOrganizers = organizers.map((org) => ({
  ...org,
  photo: photoMap[org.photo] || org.photo,
}));

const RegiaoModelo = () => (
  <RegionPage
    config={config}
    organizers={resolvedOrganizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={sponsors as Sponsor[]}
    heroImage={heroImage}
  />
);

export default RegiaoModelo;
