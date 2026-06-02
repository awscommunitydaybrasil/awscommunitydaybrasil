import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-bh.png";

import rafaelaPhoto from "./assets/rafaela-vidotti.jpg";
import flavioPhoto from "./assets/flavio-pimenta.jpg";
import alexandrePhoto from "./assets/alexandre-ballestero-paula.jpg";
import carlosPhoto from "./assets/carlos-augusto-souza-carvalho.jpg";
import fabioPhoto from "./assets/fabio-baldin.png";
import felipePhoto from "./assets/felipe-kiko.jpg";
import jessicaPhoto from "./assets/jessica-cristina-coelho.jpg";

const photoMap: Record<string, string> = {
  "rafaela-vidotti.jpg": rafaelaPhoto,
  "flavio-pimenta.jpg": flavioPhoto,
  "alexandre-ballestero-paula.jpg": alexandrePhoto,
  "carlos-augusto-souza-carvalho.jpg": carlosPhoto,
  "fabio-baldin.png": fabioPhoto,
  "felipe-kiko.jpg": felipePhoto,
  "jessica-cristina-coelho.jpg": jessicaPhoto,
};

const resolvedOrganizers = organizers.map((org) => ({
  ...org,
  photo: photoMap[org.photo] || org.photo,
}));

const Sudeste = () => (
  <RegionPage
    config={config}
    organizers={resolvedOrganizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={sponsors}
    heroImage={heroImage}
  />
);

export default Sudeste;
