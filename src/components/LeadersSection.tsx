import { Link } from "react-router-dom";
import postcardBrasilia from "@/assets/postcard-brasilia.png";
import postcardBH from "@/assets/postcard-bh.png";
import postcardSalvador from "@/assets/postcard-salvador.png";
import postcardCuritiba from "@/assets/postcard-curitiba.png";
import postcardBelem from "@/assets/postcard-belem.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const leaders = [
  {
    name: "Centro-Oeste",
    city: "Brasília",
    date: "27/06/2026",
    image: postcardBrasilia,
    leader: "Wagner Landim",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-31.jpg",
    leaderLinkedin: "https://www.linkedin.com/in/wagnerlandim/",
    link: "/centro-oeste",
  },
  {
    name: "Sudeste",
    city: "Belo Horizonte",
    date: "22/08/2026",
    image: postcardBH,
    leader: "Rafaela Vidotti",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-03.jpg",
    leaderLinkedin: "https://www.linkedin.com/in/rafaelavidotti/",
    link: "/sudeste",
  },
  {
    name: "Sul",
    city: "Curitiba",
    date: "19/09/2026",
    image: postcardCuritiba,
    leader: "Alceu Neto",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-32.jpg",
    leaderLinkedin: "https://www.linkedin.com/in/alceu-conerado-neto-0b4b6334/",
    link: "/sul",
  },
  {
    name: "Nordeste",
    city: "Salvador",
    date: "03/10/2026",
    image: postcardSalvador,
    leader: "Caio Nunes",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-30.jpg",
    leaderLinkedin: "https://www.linkedin.com/in/caionscloud/",
    link: "/nordeste",
  },
  {
    name: "Norte",
    city: "Belém",
    date: "14/11/2026",
    image: postcardBelem,
    leader: "Thayana Mamoré",
    leaderPhoto: "https://www.awscommunityday.com.br/assets/img/team/team-32.png",
    leaderLinkedin: "https://www.linkedin.com/in/thayanacmamore/",
    link: "/norte",
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
    className="group relative overflow-hidden rounded-lg aspect-[3/4]"
    style={{ boxShadow: "var(--shadow-card)" }}
  >
    <img
      src={image}
      alt={`${city} - ${name}`}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/50" />
    <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary transition-colors duration-300" />
    <div className="relative h-full flex flex-col items-center justify-center p-5 text-center">
      <a
        href={leaderLinkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mb-5 group/photo"
      >
        <div
          className="w-28 h-28 rounded-full overflow-hidden border-[3px] border-primary transition-transform duration-500 group-hover:scale-105"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <img src={leaderPhoto} alt={leader} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary-foreground">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
      </a>
      <h3 className="text-xl font-bold font-display text-foreground mb-1">{leader}</h3>
      <p className="text-base font-semibold font-display text-foreground mb-0.5">{name}</p>
      <p className="text-sm text-muted-foreground mb-1">{city}</p>
      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary font-display">{date}</p>
      {link !== "#" && (
        link.startsWith("/") ? (
          <Link
            to={link}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors font-display mt-4"
          >
            Ver evento
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors font-display mt-4"
          >
            Ver evento
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        )
      )}
    </div>
  </div>
);

const LeadersSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section id="lideres" className="py-24">
      <div className="container">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">
            Líderes Regionais
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground">
            Quem faz acontecer
          </h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.slice(0, 3).map((l, i) => (
            <div
              key={l.name}
              className={`transition-all duration-700 ease-out ${gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <LeaderCard {...l} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
          {leaders.slice(3).map((l, i) => (
            <div
              key={l.name}
              className={`transition-all duration-700 ease-out ${gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${(i + 3) * 150}ms` }}
            >
              <LeaderCard {...l} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadersSection;
