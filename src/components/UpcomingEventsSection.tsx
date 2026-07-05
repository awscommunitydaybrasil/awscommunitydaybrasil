import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import postcardBrasilia from "@/assets/postcard-brasilia.png";
import postcardBH from "@/assets/postcard-bh.png";
import postcardSalvador from "@/assets/postcard-salvador.png";
import postcardCuritiba from "@/assets/postcard-curitiba.png";
import postcardBelem from "@/assets/postcard-belem.png";

const allEditions = [
  {
    name: "Centro-Oeste",
    city: "Brasília/DF",
    date: "2026-06-27",
    displayDate: "27 Jun 2026",
    image: postcardBrasilia,
    link: "/centro-oeste/",
  },
  {
    name: "Sudeste",
    city: "Belo Horizonte/MG",
    date: "2026-08-22",
    displayDate: "22 Ago 2026",
    image: postcardBH,
    link: "/sudeste/",
  },
  {
    name: "Sul",
    city: "Curitiba/PR",
    date: "2026-09-19",
    displayDate: "19 Set 2026",
    image: postcardCuritiba,
    link: "/sul/",
  },
  {
    name: "Nordeste",
    city: "Salvador/BA",
    date: "2026-10-10",
    displayDate: "10 Out 2026",
    image: postcardSalvador,
    link: "/nordeste/",
  },
  {
    name: "Norte",
    city: "Belém/PA",
    date: "2026-10-31",
    displayDate: "31 Out 2026",
    image: postcardBelem,
    link: "/norte/",
  },
];

function getUpcoming() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return allEditions
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

function getPast() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return allEditions
    .filter((e) => new Date(e.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const UpcomingEventsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const upcoming = useMemo(getUpcoming, []);
  const past = useMemo(getPast, []);

  if (upcoming.length === 0 && past.length === 0) return null;

  const [next, ...others] = upcoming;

  return (
    <section className="py-16 -mt-8">
      <div ref={ref} className="container max-w-5xl">
        {/* Next event - featured card */}
        {next && (
          <Link
            to={next.link}
            className={`group relative block rounded-2xl overflow-hidden mb-6 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="relative h-[280px] md:h-[320px]">
              <img
                src={next.image}
                alt={`${next.name} - ${next.city}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300" />
              <div className="relative h-full flex flex-col justify-center p-8 md:p-12 max-w-lg">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider w-fit mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Próximo evento
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
                  {next.name}
                </h3>
                <p className="text-muted-foreground mb-1">{next.city}</p>
                <p className="text-lg font-bold text-primary font-display">{next.displayDate}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mt-4 group-hover:gap-3 transition-all">
                  Ver evento
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Other upcoming events + past events in same grid */}
        {(others.length > 0 || past.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((edition, i) => (
              <Link
                key={edition.name}
                to={edition.link}
                className={`group relative rounded-xl overflow-hidden transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${(i + 1) * 150}ms`, boxShadow: "var(--shadow-card)" }}
              >
                <div className="relative h-[180px]">
                  <img
                    src={edition.image}
                    alt={`${edition.name} - ${edition.city}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  <div className="absolute inset-0 rounded-xl border border-border group-hover:border-primary/50 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-base font-bold font-display text-foreground">{edition.name}</h4>
                    <p className="text-xs text-muted-foreground">{edition.city}</p>
                    <p className="text-sm font-bold text-primary font-display mt-1">{edition.displayDate}</p>
                  </div>
                </div>
              </Link>
            ))}
            {past.map((edition, i) => (
              <Link
                key={edition.name}
                to={edition.link}
                className={`group relative rounded-xl overflow-hidden opacity-60 hover:opacity-100 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${(others.length + i + 1) * 150}ms`, boxShadow: "var(--shadow-card)" }}
              >
                <div className="relative h-[180px]">
                  <img
                    src={edition.image}
                    alt={`${edition.name} - ${edition.city}`}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                  <div className="absolute inset-0 rounded-xl border border-border/50 group-hover:border-primary/50 transition-colors duration-300" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-muted/80 text-muted-foreground rounded-full">
                      Realizado
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-base font-bold font-display text-foreground/70 group-hover:text-foreground transition-colors">{edition.name}</h4>
                    <p className="text-xs text-muted-foreground">{edition.city}</p>
                    <p className="text-sm font-semibold text-muted-foreground font-display mt-1">{edition.displayDate}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
