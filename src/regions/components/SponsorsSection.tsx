import { useMemo } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { Sponsor } from "@/regions/types";

const tierConfig: Record<string, { label: string; logoSize: string; order: number }> = {
  diamond: { label: "Platina", logoSize: "max-h-24", order: 0 },
  gold: { label: "Ouro", logoSize: "max-h-20", order: 1 },
  silver: { label: "Prata", logoSize: "max-h-14", order: 2 },
  bronze: { label: "Bronze", logoSize: "max-h-10", order: 3 },
  community: { label: "Comunidade", logoSize: "max-h-10", order: 4 },
};

interface SponsorsSectionProps {
  sponsors: Sponsor[];
}

const SponsorsSection = ({ sponsors }: SponsorsSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  const sponsorsByTier = useMemo(() => {
    const grouped: Record<string, Sponsor[]> = {};
    sponsors.forEach((s) => {
      if (!grouped[s.tier]) grouped[s.tier] = [];
      grouped[s.tier].push(s);
    });
    return Object.entries(grouped).sort(
      ([a], [b]) => (tierConfig[a]?.order ?? 99) - (tierConfig[b]?.order ?? 99)
    );
  }, [sponsors]);

  return (
    <section id="patrocinadores" className="py-20 bg-secondary scroll-mt-16">
      <div ref={ref} className={`container text-center max-w-4xl transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Patrocinadores e Apoiadores</p>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-10">Quem apoia este evento</h2>
        {sponsorsByTier.length > 0 ? (
          <div className="space-y-10">
            {sponsorsByTier.map(([tier, tierSponsors]) => {
              const tc = tierConfig[tier] || tierConfig.community;
              return (
                <div key={tier}>
                  <h3 className="text-sm font-bold font-display uppercase tracking-[0.2em] text-primary mb-4">
                    {tc.label}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {tierSponsors.map((sponsor) => (
                      <a
                        key={sponsor.name}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-border bg-white p-5 flex items-center justify-center hover:border-primary/50 transition-all w-40 md:w-48"
                      >
                        <img src={sponsor.logo} alt={sponsor.name} className={`${tc.logoSize} object-contain`} />
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-muted-foreground">
              Estamos animados em apresentar as empresas cujo apoio torna nosso evento possível. Em breve divulgaremos os patrocinadores desta edição.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SponsorsSection;
