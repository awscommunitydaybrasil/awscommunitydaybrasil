import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface Community {
  name: string;
  url: string;
  icon?: string;
}

interface CommunitiesSectionProps {
  communities: Community[];
}

const CommunitiesSection = ({ communities }: CommunitiesSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  if (communities.length === 0) return null;

  return (
    <section className="py-20 scroll-mt-16">
      <div className="container max-w-4xl">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">
            Comunidades
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Conheça as comunidades da região
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Participe dos grupos de usuários AWS da região e continue aprendendo e conectando com a comunidade.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {communities.map((community, i) => (
            <a
              key={community.name}
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-6 py-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-700 ease-out group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms`, boxShadow: "var(--shadow-card)" }}
            >
              {community.icon === "instagram" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover:scale-110 transition-transform">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              )}
              {!community.icon && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover:scale-110 transition-transform">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              )}
              <span className="text-sm font-semibold font-display text-foreground group-hover:text-primary transition-colors">
                {community.name}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary transition-colors ml-1">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;
