import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { RegionConfig } from "@/regions/types";

interface InfoCardsSectionProps {
  config: RegionConfig;
  formattedDate: string;
}

const InfoCardsSection = ({ config, formattedDate }: InfoCardsSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  // Format date from targetDate
  const eventDate = new Date(config.targetDate);
  const dateStr = eventDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const dateValue = config.registration.status === "Em Breve!" && !config.eventTime ? "Em Breve!" : dateStr;
  const timeSub = config.eventTime || formattedDate;

  const cards = [
    { label: "Local", value: config.location.venue, sub: config.location.city, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "Data e Hora", value: dateValue, sub: timeSub, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Inscrições", value: config.registration.status, sub: config.registration.url ? "Inscreva-se" : "Fique ligado", href: config.registration.url || undefined, icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" },
  ];

  return (
    <section id="sobre" className="py-8 scroll-mt-16">
      <div ref={ref} className="container grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {cards.map((card, i) => (
          <div
            key={card.label}
            className={`rounded-lg border border-border bg-card p-6 text-center transition-all duration-700 ease-out hover:border-primary/50 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: `${i * 150}ms`, boxShadow: "var(--shadow-card)" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto mb-4">
              <path d={card.icon} />
            </svg>
            <h3 className="text-lg font-bold font-display text-foreground mb-1">{card.label}</h3>
            <p className="text-xl font-bold text-primary font-display">{card.value}</p>
            {card.href ? (
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-3 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                {card.sub}
              </a>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">{card.sub}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoCardsSection;
