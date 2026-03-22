import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-brasilia.png";

import deividPhoto from "./assets/deivid.jpg";
import marcelopaivaPhoto from "./assets/marcelopaiva.jpg";
import priscilaPhoto from "./assets/priscila.jpg";
import wagnerPhoto from "./assets/wagner.jpg";

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

const CentroOeste = () => (
  <RegionPage
    config={config}
    organizers={resolvedOrganizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={sponsors}
    heroImage={heroImage}
  />
);

export default CentroOeste;
