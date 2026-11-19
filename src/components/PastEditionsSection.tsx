import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const editions = [
  {
    year: "Setembro 2025",
    location: "Campinas / SP",
    description: "Edição realizada no Expo Dom Pedro",
    link: "hist/2025-dec/index.html",
  },
  {
    year: "Novembro 2024",
    location: "Goiânia e Florianópolis",
    description: "Edição simultânea em duas cidades",
    link: "hist/2024-nov/index.html",
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
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-2 rounded-lg border border-border p-4 transition-all group hover:border-primary/50 sm:flex sm:gap-6 sm:p-5 ${listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                transitionDuration: "700ms",
                transitionTimingFunction: "ease-out",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span className="col-start-1 row-start-1 shrink-0 whitespace-nowrap font-display text-[0.72rem] font-bold text-primary sm:text-lg md:text-xl">
                {ed.year}
              </span>
              <div className="hidden h-px flex-1 bg-border sm:block" />
              <div className="col-span-3 row-start-2 min-w-0 text-left sm:col-auto sm:row-auto sm:flex-[0_1_270px] sm:text-right">
                <p className="break-words text-sm font-medium text-foreground sm:text-base">{ed.location}</p>
                <p className="break-words text-[0.65rem] text-muted-foreground sm:text-sm">{ed.description}</p>
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
                className="col-start-3 row-start-1 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
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
