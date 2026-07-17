import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { RegionConfig } from "@/regions/types";

interface CallForSpeakersSectionProps {
  url: string;
  config: RegionConfig;
  formattedDate: string;
}

const CallForSpeakersSection = ({ url, config, formattedDate }: CallForSpeakersSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-3xl">
        <div
          ref={ref}
          className={`rounded-xl border border-primary/30 bg-card p-10 text-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">
            Chamada de palestras
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
            Esse palco pode ser seu
          </h2>
          <p className="text-muted-foreground mb-2 max-w-xl mx-auto leading-relaxed">
            As submissões para o AWS Community Day {config.regionName} 2026 estão abertas!<br />
            Se você quer compartilhar experiências, aprendizados, ideias ou soluções com a comunidade AWS, convidamos você a submeter sua palestra e fazer parte deste grande encontro.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Data limite para submissão de propostas: 31/08/2026
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-colors"
          >
            {config.callForSpeakersIcon === "mail" ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            )}
            Submeter proposta
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallForSpeakersSection;
