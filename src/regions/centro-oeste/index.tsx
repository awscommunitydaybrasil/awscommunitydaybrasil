import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-brasilia.png";
import type { Sponsor, Speaker } from "@/regions/types";

import deividPhoto from "./assets/deivid.jpg";
import marcelopaivaPhoto from "./assets/marcelopaiva.jpg";
import priscilaPhoto from "./assets/priscila.jpg";
import wagnerPhoto from "./assets/wagner.jpg";

import aldoPhoto from "./assets/speakers/aldo-henrique.jpg";
import carlosPhoto from "./assets/speakers/carlos-marangon.png";
import ciceroPhoto from "./assets/speakers/cicero-moura.jpg";
import danPhoto from "./assets/speakers/dan-rezende.png";
import erikaPhoto from "./assets/speakers/erika-nagamine.jpg";
import fellipePhoto from "./assets/speakers/fellipe-mendonca.jpg";
import flavioPhoto from "./assets/speakers/flavio-pimenta.png";
import leoPhoto from "./assets/speakers/leo-ciccone.png";
import luizgustavoPhoto from "./assets/speakers/luiz-gustavo.jpg";
import luizmachadoPhoto from "./assets/speakers/luiz-machado.jpg";
import naiaraPhoto from "./assets/speakers/naiara-medeiros.jpg";
import ninaPhoto from "./assets/speakers/nina-soraya.jpg";
import raphaelPhoto from "./assets/speakers/raphael-moura.jpg";
import sulamitaPhoto from "./assets/speakers/sulamita-dantas.jpg";
import thayanePhoto from "./assets/speakers/thayane-rodrigues.jpg";
import tiagoPhoto from "./assets/speakers/tiago-jorge.png";
import wederPhoto from "./assets/speakers/weder-mariano.png";
import williamPhoto from "./assets/speakers/william-lino.jpg";
import yasminPhoto from "./assets/speakers/yasmin-costa.jpg";

import awsLogo from "./assets/sponsors/aws.png";
import daredeLogo from "./assets/sponsors/darede.png";
import uniprojecaoLogo from "./assets/sponsors/uniprojecao.jpg";
import partycommunityLogo from "./assets/sponsors/party-community.jpg";

const photoMap: Record<string, string> = {
  "deivid.jpg": deividPhoto,
  "marcelopaiva.jpg": marcelopaivaPhoto,
  "priscila.jpg": priscilaPhoto,
  "wagner.jpg": wagnerPhoto,
};

const speakerPhotoMap: Record<string, string> = {
  "aldo-henrique.jpg": aldoPhoto,
  "carlos-marangon.png": carlosPhoto,
  "cicero-moura.jpg": ciceroPhoto,
  "dan-rezende.png": danPhoto,
  "erika-nagamine.jpg": erikaPhoto,
  "fellipe-mendonca.jpg": fellipePhoto,
  "flavio-pimenta.png": flavioPhoto,
  "leo-ciccone.png": leoPhoto,
  "luiz-gustavo.jpg": luizgustavoPhoto,
  "luiz-machado.jpg": luizmachadoPhoto,
  "naiara-medeiros.jpg": naiaraPhoto,
  "nina-soraya.jpg": ninaPhoto,
  "raphael-moura.jpg": raphaelPhoto,
  "sulamita-dantas.jpg": sulamitaPhoto,
  "thayane-rodrigues.jpg": thayanePhoto,
  "tiago-jorge.png": tiagoPhoto,
  "weder-mariano.png": wederPhoto,
  "william-lino.jpg": williamPhoto,
  "yasmin-costa.jpg": yasminPhoto,
};

const logoMap: Record<string, string> = {
  "aws.png": awsLogo,
  "darede.png": daredeLogo,
  "uniprojecao.jpg": uniprojecaoLogo,
  "party-community.jpg": partycommunityLogo,
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

const CentroOeste = () => (
  <RegionPage
    config={config}
    organizers={resolvedOrganizers}
    speakers={resolvedSpeakers}
    schedule={schedule}
    sponsors={resolvedSponsors}
    heroImage={heroImage}
  />
);

export default CentroOeste;
