import regionCentroOeste from "@/assets/region-centro-oeste.jpg";
import regionSudeste from "@/assets/region-sudeste.jpg";
import regionNordeste from "@/assets/region-nordeste.jpg";
import regionSul from "@/assets/region-sul.jpg";
import regionNorte from "@/assets/region-norte.jpg";

const leaders = [
  {
    name: "Centro-Oeste",
    city: "Brasília",
    date: "27/06/2026",
    image: regionCentroOeste,
    leader: "Wagner Landim",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-31.jpg",
    leaderLinkedin: "https://www.linkedin.com/in/wagnerlandim/",
    link: "https://www.awscommunityday.com.br/centrooeste/index.html",
  },
  {
    name: "Sudeste",
    city: "Belo Horizonte",
    date: "Em breve",
    image: regionSudeste,
    leader: "Rafaela Vidotti",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-03.jpg",
    leaderLinkedin: "https://www.linkedin.com/in/rafaelavidotti/",
    link: "https://www.awscommunityday.com.br/sudeste/index.html",
  },
  {
    name: "Nordeste",
    city: "Salvador",
    date: "Em breve",
    image: regionNordeste,
    leader: "Caio Nunes",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-30.jpg",
    leaderLinkedin: "https://www.linkedin.com/in/caionscloud/",
    link: "#",
  },
  {
    name: "Sul",
    city: "Curitiba",
    date: "Em breve",
    image: regionSul,
    leader: "Alceu Neto",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-32.jpg",
    leaderLinkedin: "https://www.linkedin.com/in/alceu-conerado-neto-0b4b6334/",
    link: "#",
  },
  {
    name: "Norte",
    city: "Belém",
    date: "Em breve",
    image: regionNorte,
    leader: "Thayana Mamoré",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-32.png",
    leaderLinkedin: "https://www.linkedin.com/in/thayanacmamore/",
    link: "#",
  },
];

const LeaderCard = ({
  name,
  city,
  date,
  image,
  leader,
  leaderPhoto,
  leaderLinkedin,
  link,
}: (typeof leaders)[number]) => (
  <div
    className="group relative overflow-hidden rounded-lg"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <div className="relative aspect-[4/3]">
      <img
        src={image}
        alt={`${city} - ${name}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-lg transition-colors duration-300" />

      <div className="relative h-full flex flex-col justify-end p-5">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-1 font-display">
          {date}
        </p>
        <h3 className="text-xl font-bold font-display text-foreground mb-0.5">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{city}</p>

        <a
          href={leaderLinkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group/leader"
        >
          <img
            src={leaderPhoto}
            alt={leader}
            className="w-10 h-10 rounded-full object-cover border-2 border-border group-hover/leader:border-primary transition-colors"
          />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Líder</p>
            <p className="text-sm font-semibold text-foreground group-hover/leader:text-primary transition-colors">
              {leader}
            </p>
          </div>
        </a>

        {link !== "#" && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors font-display mt-3"
          >
            Ver evento
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  </div>
);

const LeadersSection = () => {
  return (
    <section id="lideres" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">
            Líderes Regionais
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground">
            Quem faz acontecer
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.slice(0, 3).map((l) => (
            <LeaderCard key={l.name} {...l} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
          {leaders.slice(3).map((l) => (
            <LeaderCard key={l.name} {...l} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadersSection;
