import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import type { Sponsor } from "@/regions/types";
import heroImage from "@/regions/centro-oeste/assets/postcard-brasilia.png";

const RegiaoModelo = () => (
  <RegionPage
    config={config}
    organizers={organizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={sponsors as Sponsor[]}
    heroImage={heroImage}
  />
);

export default RegiaoModelo;
