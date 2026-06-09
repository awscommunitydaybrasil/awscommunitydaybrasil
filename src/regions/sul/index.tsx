import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-curitiba.png";

import daianePhoto from "./assets/daiane.jpg";
import lucasPhoto from "./assets/lucas.jpg";
import leandroPhoto from "./assets/leandro.jpg";

const photoMap: Record<string, string> = {
  "daiane.jpg": daianePhoto,
  "lucas.jpg": lucasPhoto,
  "leandro.jpg": leandroPhoto,
  
};

const resolvedOrganizers = organizers.map((org) => ({
  ...org,
  photo: photoMap[org.photo] || org.photo,
}));

const Sul = () => (
  <RegionPage
    config={config}
    organizers={resolvedOrganizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={sponsors}
    heroImage={heroImage}
  />
);

export default Sul;
