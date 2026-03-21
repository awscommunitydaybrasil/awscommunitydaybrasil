import ScrollReveal from "./ScrollReveal";
import type { SettingsSite } from "@/lib/cms";

interface Props {
  settings: SettingsSite;
}

const CTASection = ({ settings }: Props) => {
  const date = settings.eventDisplayDate || "";
  const city = settings.venueCity || "";
  const subtitle = [date, city].filter(Boolean).join(" — ");

  return (
    <section className="bg-cta-gradient section-padding">
      <div className="container-main text-center">
        <ScrollReveal>
          <h2 className="text-white font-extrabold text-3xl md:text-4xl text-balance mb-4">
            Pronto para fazer parte dessa comunidade?
          </h2>
          {subtitle && (
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              {subtitle}. Garanta seu ingresso para o maior evento de cloud da região Norte.
            </p>
          )}
          <a
            href="#ingressos"
            className="inline-block bg-white text-primary font-bold rounded-xl px-8 py-4 text-lg shadow-lg transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
          >
            Garanta seu Ingresso
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
