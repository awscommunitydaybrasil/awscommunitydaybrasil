import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const editions = [
  {
    year: "Setembro 2025",
    location: "Campinas / SP",
    description: "Edição realizada no Expo Dom Pedro",
    link: "/hist/2025-dec/index.html",
  },
  {
    year: "Novembro 2024",
    location: "Goiânia e Florianópolis",
    description: "Edição simultânea em duas cidades",
    link: "/hist/2024-nov/index.html",
  },
  {
    year: "2023",
    location: "Ribeirão Preto / SP",
    description: "Confira os podcasts da edição",
    link: "https://youtube.com/playlist?list=PLM7HrN8Vfc3o3H6LK-iR7SNq5pPNWfgtF&si=duFt9rD1N78tyF3Z",
  },
  {
    year: "2022",
    location: "Online",
    description: "Edição on-line",
    link: "https://youtube.com/playlist?list=PLM7HrN8Vfc3qkHf4siwu-S6TI3MzQBQ25&si=MbGxr-45Ku2PeB32",
  },
  {
    year: "2021",
    location: "Online",
    description: "Edição on-line",
    link: "https://youtube.com/playlist?list=PL7D77BqXy3EPzqoHxUtT2ZfJ4uRLV2Apt&si=dhI8shGmEX08sXAB",
  },
  {
    year: "2020",
    location: "Online",
    description: "Edição on-line",
    link: "https://www.youtube.com/playlist?list=PL7D77BqXy3EP7qajLWNW6UYOsaGXKj69Q",
  },
];

const PastEditionsSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation();

  return (
    <section id="anteriores" className="py-24 bg-secondary">
      <div className="container max-w-3xl">
        <div
          ref={titleRef}
          className={`text-center mb-4 transition-all duration-700 ease-out ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Edições Anteriores</h2>
          <p className="text-muted-foreground mt-3">
            Confira como foram as edições anteriores do AWS Community Day Brasil
          </p>
        </div>
        <div ref={listRef} className="mt-10 space-y-4">
          {editions.map((ed, i) => (
            <a
              key={ed.year}
              href={ed.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-6 p-5 rounded-lg border border-border hover:border-primary/50 transition-all group ${listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                transitionDuration: "700ms",
                transitionTimingFunction: "ease-out",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span className="text-lg md:text-xl font-bold font-display text-primary whitespace-nowrap">
                {ed.year}
              </span>
              <div className="h-px flex-1 bg-border" />
              <div className="text-right">
                <p className="text-foreground font-medium">{ed.location}</p>
                <p className="text-sm text-muted-foreground">{ed.description}</p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEditionsSection;
