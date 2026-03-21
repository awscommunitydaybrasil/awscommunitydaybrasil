import ScrollReveal from "./ScrollReveal";
import type { Patrocinador } from "@/lib/cms";
import { imgSrc } from "@/lib/utils";

type Props = { sponsors: Patrocinador[] };

const tierOrder = ["ouro", "prata", "bronze", "comunidade"] as const;
type Tier = typeof tierOrder[number];

const tierSizes: Record<Tier, string> = {
  ouro:       "w-40 h-20 md:w-48 md:h-24 text-sm",
  prata:      "w-32 h-16 md:w-40 md:h-20 text-xs",
  bronze:     "w-28 h-14 md:w-36 md:h-18 text-xs",
  comunidade: "w-24 h-12 md:w-32 md:h-16 text-[10px]",
};

const SponsorCard = ({ sponsor, size }: { sponsor: Patrocinador; size: string }) => (
  <a
    href={sponsor.link ?? "#"}
    target="_blank"
    rel="noopener noreferrer"
    className={`${size} rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary hover:shadow-md transition-all duration-300 p-4`}
  >
    {sponsor.logoUrl ? (
      <img src={imgSrc(sponsor.logoUrl)} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
    ) : (
      <span className="text-muted-foreground font-semibold text-center">{sponsor.name}</span>
    )}
  </a>
);

const SponsorsSection = ({ sponsors }: Props) => {
  const byTier = (tier: Tier) => sponsors.filter((s) => s.tier === tier);

  return (
    <section id="patrocinadores" className="section-padding bg-muted">
      <div className="container-main">
        <ScrollReveal className="text-center mb-12">
          <p className="section-subtitle">PATROCINADORES</p>
          <h2 className="section-title">Empresas que apoiam a comunidade</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-2">
            Agradecemos às empresas que tornam este evento possível.
          </p>
        </ScrollReveal>

        {tierOrder.map((tier) => {
          const items = byTier(tier);
          if (items.length === 0) return null;
          return (
            <ScrollReveal key={tier} className="mb-10">
              <h3 className="text-center text-primary font-bold text-lg mb-4 capitalize">{tier}</h3>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {items.map((s) => (
                  <SponsorCard key={s.name} sponsor={s} size={tierSizes[tier]} />
                ))}
              </div>
            </ScrollReveal>
          );
        })}

        <ScrollReveal className="text-center mt-10">
          <p className="text-muted-foreground text-sm">
            Quer ver sua marca aqui?{" "}
            <a href="#patrocinio" className="text-primary hover:underline font-medium">
              Confira os planos de patrocínio
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SponsorsSection;
