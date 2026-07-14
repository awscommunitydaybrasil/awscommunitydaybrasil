import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-salvador.png";

import caioPhoto from "./assets/caio-nunes.jpg";

const photoMap: Record<string, string> = {
  "caio-nunes.jpg": caioPhoto,
};

const resolvedOrganizers = organizers.map((org) => ({
  ...org,
  photo: photoMap[org.photo] || org.photo,
}));

const Nordeste = () => (
  <RegionPage
    config={config}
    organizers={resolvedOrganizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={sponsors}
    heroImage={heroImage}
  />
);

export default Nordeste;
