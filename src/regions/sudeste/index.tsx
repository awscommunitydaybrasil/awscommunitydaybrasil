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
import anaPhoto from "./assets/ana-carolyne.png";
import carlosPhoto from "./assets/carlos-augusto-souza-carvalho.jpg";
import fabioPhoto from "./assets/fabio-baldin.png";
import felipePhoto from "./assets/felipe-kiko.jpg";
import jessicaPhoto from "./assets/jessica-cristina-coelho.jpg";
import mauricioPhoto from "./assets/mauricio-naka.jpg";
import palomaPhoto from "./assets/paloma-lataliza.jpg";
import rafaelPhoto from "./assets/rafael-fernandes.jpg";
import veronicaPhoto from "./assets/veronica-torres.jpg";

import darkoPhoto from "./assets/speakers/darko-mesaros.jpg";

import dayrellLogo from "./assets/sponsors/dayrell.png";
import escolaawsLogo from "./assets/sponsors/escola-aws.png";
import netminasLogo from "./assets/sponsors/net-minas.jpeg";

const photoMap: Record<string, string> = {
  "rafaela-vidotti.jpg": rafaelaPhoto,
  "flavio-pimenta.jpg": flavioPhoto,
  "alexandre-ballestero-paula.jpg": alexandrePhoto,
  "ana-carolyne.png": anaPhoto,
  "carlos-augusto-souza-carvalho.jpg": carlosPhoto,
  "fabio-baldin.png": fabioPhoto,
  "felipe-kiko.jpg": felipePhoto,
  "jessica-cristina-coelho.jpg": jessicaPhoto,
  "mauricio-naka.jpg": mauricioPhoto,
  "paloma-lataliza.jpg": palomaPhoto,
  "rafael-fernandes.jpg": rafaelPhoto,
  "veronica-torres.jpg": veronicaPhoto,
};

const speakerPhotoMap: Record<string, string> = {
  "darko-mesaros.jpg": darkoPhoto
};

const logoMap: Record<string, string> = {
  "dayrell.png": dayrellLogo,
  "escola-aws.png": escolaawsLogo,
  "net-minas.jpeg": netminasLogo
};

const resolvedOrganizers = organizers.map((org) => ({
  ...org,
  photo: photoMap[org.photo] || org.photo,
}));

const resolvedSpeakers: Speaker[] = speakers.map((speaker) => ({
  ...speaker,
  photo: speakerPhotoMap[speaker.photo] || speaker.photo,
}));

const resolvedSponsors: Sponsor[] = sponsors.map((sponsor) => {
  const filename = sponsor.logo.split("/").pop() || "";
  return {
    ...sponsor,
    logo: logoMap[filename] || sponsor.logo,
    tier: sponsor.tier as Sponsor["tier"],
  };
});

const Sudeste = () => (
  <RegionPage
    config={config}
    organizers={resolvedOrganizers}
    speakers={resolvedSpeakers}
    schedule={schedule}
    sponsors={resolvedSponsors}
    heroImage={heroImage}
  />
);

export default Sudeste;
