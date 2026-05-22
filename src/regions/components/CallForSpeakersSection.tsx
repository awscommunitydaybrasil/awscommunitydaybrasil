import { Mic } from "lucide-react";
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
            {config.location.city} · {formattedDate}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-colors"
          >
            <Mic className="w-5 h-5" />
            Submeter proposta
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallForSpeakersSection;
