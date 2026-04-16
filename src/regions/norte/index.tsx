import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-belem.png";

const Norte = () => (
  <RegionPage
    config={config}
    organizers={organizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={sponsors}
    heroImage={heroImage}
  />
);

export default Norte;
