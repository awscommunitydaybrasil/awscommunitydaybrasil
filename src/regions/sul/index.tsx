import RegionPage from "@/regions/RegionPage";
import type { Speaker } from "@/regions/types";
import type { Sponsor } from "@/regions/types";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import volunteers from "./data/volunteers.json";
import heroImage from "./assets/postcard-curitiba.png";

import daianePhoto from "./assets/daiane.jpg";
import leandroPhoto from "./assets/leandro.jpg";

import muriloPhoto from "./assets/speakers/murilo.png";
import lucianoPhoto from "./assets/speakers/luciano.jpg";
import leoPhoto from "./assets/speakers/leo.png";
import egonPhoto from "./assets/speakers/egon.jpg";
import eduardoPhoto from "./assets/speakers/eduardo.jpg";
import danPhoto from "./assets/speakers/dan.png";
import agataPhoto from "./assets/speakers/agata.png";
import robertoPhoto from "./assets/speakers/roberto.jpeg";
import pimentaPhoto from "./assets/speakers/pimenta.jpeg";
import brunoPhoto from "./assets/speakers/bruno.jpg";
import valdeciPhoto from "./assets/speakers/valdeci.jpeg";

import datiLogo from "./assets/sponsor/dati.png";
import daredeLogo from "./assets/sponsor/darede.png";
import dottedLogo from "./assets/sponsor/dotted.png";
import dssrLogo from "./assets/sponsor/dssr.png";

import thiagoVolPhoto from "./assets/volunteers/thiago.jpeg";
import danielVolPhoto from "./assets/volunteers/daniel.jpg";
import elielsonVolPhoto from "./assets/volunteers/elielson.jpg";

const photoMap: Record<string, string> = {
  "daiane.jpg": daianePhoto,
  "leandro.jpg": leandroPhoto,

};

const speakerPhotoMap: Record<string, string> = {
  "murilo.png": muriloPhoto,
  "luciano.jpg": lucianoPhoto,
  "leo.png": leoPhoto,
  "egon.jpg": egonPhoto,
  "eduardo.jpg": eduardoPhoto,
  "dan.png": danPhoto,
  "agata.png": agataPhoto,
  "roberto.jpeg": robertoPhoto,
  "pimenta.jpeg" : pimentaPhoto,
  "bruno.jpg" : brunoPhoto,
  "valdeci.jpg" : valdeciPhoto
};

const logoMap: Record<string, string> = {
  "dati.png": datiLogo,
  "darede.png": daredeLogo,
  "dotted.png": dottedLogo,
  "dssr.png" : dssrLogo,

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

const volunteerPhotoMap: Record<string, string> = {
  "thiago.jpeg": thiagoVolPhoto,
  "daniel.jpg" : danielVolPhoto,
  "elielson.jpg" : elielsonVolPhoto
};

const resolvedVolunteers = volunteers.map((vol) => ({
  ...vol,
  photo: volunteerPhotoMap[vol.photo] || vol.photo,
}));

const Sul = () => (
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

export default Sul;
