import ScrollReveal from "./ScrollReveal";
import { Check, Sprout, Medal, Award, Trophy, Star } from "lucide-react";
import type { PatrocinioTier, SettingsSite } from "@/lib/cms";

const iconMap: Record<string, React.ReactNode> = {
  Sprout: <Sprout size={28} className="text-primary" />,
  Medal:  <Medal  size={28} className="text-primary" />,
  Award:  <Award  size={28} className="text-primary" />,
  Trophy: <Trophy size={28} className="text-primary" />,
  Star:   <Star   size={28} className="text-primary" />,
};

type Props = { tiers: PatrocinioTier[]; settings: Pick<SettingsSite, "sponsorshipEmail"> };

const SponsorshipSection = ({ tiers, settings }: Props) => (
  <section id="patrocinio" className="section-padding bg-aws-dark">
    <div className="container-main">
      <ScrollReveal className="text-center mb-12">
        <p className="section-subtitle">PATROCÍNIO</p>
        <h2 className="text-white font-extrabold text-3xl md:text-4xl text-balance leading-tight mb-4">
          Apoie o maior evento de cloud da Amazônia
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Conecte sua marca a centenas de profissionais de tecnologia da região Norte. Escolha o plano ideal para sua empresa.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 80}>
            <div
              className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                p.featured
                  ? "border-2 border-primary hover:shadow-[0_0_20px_rgba(255,153,0,0.15)]"
                  : "border border-white/10 hover:border-primary"
              } bg-white/[0.06]`}
            >
              {p.featured && p.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {p.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                {p.icon && iconMap[p.icon] ? iconMap[p.icon] : <Star size={28} className="text-primary" />}
              </div>
              <h3 className="text-white font-bold text-2xl mb-1">{p.name}</h3>
              <div className="text-primary font-extrabold text-3xl mb-4">{p.price}</div>
              <div className="border-t border-white/10 mb-4" />
              <ul className="space-y-2 flex-1 mb-6">
                {(p.benefits ?? []).map((b) => (
                  <li key={b.item} className="flex items-start gap-2 text-sm text-white/60">
                    <Check size={15} className="text-secondary mt-0.5 shrink-0" />
                    {b.item}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${settings.sponsorshipEmail}`}
                className={`text-center text-sm font-semibold rounded-lg px-6 py-3 transition-all duration-200 active:scale-[0.98] ${
                  p.featured ? "btn-primary" : "border-2 border-white/30 text-white hover:bg-white/10"
                }`}
              >
                {p.ctaLabel}
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="text-center mt-10">
        <p className="text-white/40 text-sm">
          Precisa de um plano personalizado? Entre em contato:{" "}
          <a href={`mailto:${settings.sponsorshipEmail}`} className="text-primary hover:underline">
            {settings.sponsorshipEmail}
          </a>
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default SponsorshipSection;
