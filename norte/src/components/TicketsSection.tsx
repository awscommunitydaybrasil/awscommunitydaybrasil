import ScrollReveal from "./ScrollReveal";
import { Check, Ticket, GraduationCap, Users, Rocket, Star } from "lucide-react";
import type { Ingress } from "@/lib/cms";

const iconMap: Record<string, React.ReactNode> = {
  Ticket:         <Ticket         size={24} className="text-primary" />,
  GraduationCap:  <GraduationCap  size={24} className="text-primary" />,
  Users:          <Users          size={24} className="text-primary" />,
  Rocket:         <Rocket         size={24} className="text-primary" />,
};

type Props = { tickets: Ingress[] };

const TicketsSection = ({ tickets }: Props) => (
  <section id="ingressos" className="section-padding bg-background">
    <div className="container-main">
      <ScrollReveal className="text-center mb-12">
        <p className="section-subtitle">INGRESSOS</p>
        <h2 className="section-title">Escolha seu ingresso e garanta sua vaga</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Vagas limitadas! Escolha a modalidade que melhor se encaixa para você.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tickets.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 80}>
            <div
              className={`relative rounded-2xl border-2 p-8 h-full flex flex-col card-hover bg-card ${
                t.featured ? "border-primary" : "border-border"
              }`}
            >
              {t.featured && t.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  {t.badge}
                </span>
              )}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {t.icon && iconMap[t.icon] ? iconMap[t.icon] : <Star size={24} className="text-primary" />}
              </div>
              <h3 className="text-aws-dark font-bold text-xl mb-1">{t.name}</h3>
              <div className="mb-2">
                <span className="text-primary font-extrabold text-4xl">{t.price}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-5">{t.description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {(t.benefits ?? []).map((b) => (
                  <li key={b.item} className="flex items-start gap-2 text-sm text-aws-gray">
                    <Check size={16} className="text-secondary mt-0.5 shrink-0" />
                    {b.item}
                  </li>
                ))}
              </ul>
              {t.note && (
                <p className="text-xs text-muted-foreground italic mb-4">{t.note}</p>
              )}
              <a href={t.ctaUrl ?? "#"} className="btn-primary text-center text-sm w-full">
                {t.ctaLabel}
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-sm mt-8">
        Pagamento seguro via plataforma parceira. Dúvidas? Consulte nosso{" "}
        <a href="#faq" className="text-primary hover:underline">FAQ</a>.
      </p>
    </div>
  </section>
);

export default TicketsSection;
