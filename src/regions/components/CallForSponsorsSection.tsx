import { Handshake } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface CallForSponsorsSectionProps {
  url: string;
}

const CallForSponsorsSection = ({ url }: CallForSponsorsSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-secondary">
      <div className="container max-w-3xl">
        <div
          ref={ref}
          className={`rounded-xl border border-border bg-card p-10 text-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">
            Seja patrocinador
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
            Conecte sua marca a quem faz acontecer
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            O AWS Community Day Brasil 2026 — edição Sudeste — está com cotas abertas.
            Employer branding, inovação e presença de mercado: tudo em um único evento
            para uma comunidade ativa de profissionais AWS.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-colors"
          >
            <Handshake className="w-5 h-5" />
            Quero patrocinar
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallForSponsorsSection;
