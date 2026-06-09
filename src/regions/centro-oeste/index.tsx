import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-brasilia.png";
import type { Sponsor } from "@/regions/types";

import deividPhoto from "./assets/deivid.jpg";
import marcelopaivaPhoto from "./assets/marcelopaiva.jpg";
import priscilaPhoto from "./assets/priscila.jpg";
import wagnerPhoto from "./assets/wagner.jpg";

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
    speakers={speakers}
    schedule={schedule}
    sponsors={resolvedSponsors}
    heroImage={heroImage}
  />
);

export default CentroOeste;
