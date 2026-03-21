import ScrollReveal from "./ScrollReveal";
import Link from "next/link";
import type { ScheduleItem } from "@/lib/cms";

type Stage = "Geral" | "Palco Talk" | "Palco Hands-On";

const stageColors: Record<Stage, string> = {
  "Geral": "bg-primary",
  "Palco Talk": "bg-[hsl(var(--schedule-talk))]",
  "Palco Hands-On": "bg-[hsl(var(--schedule-handson))]",
};

type Props = { items: ScheduleItem[] };

const ScheduleSection = ({ items }: Props) => (
  <section id="programacao" className="section-padding bg-muted">
    <div className="container-main">
      <ScrollReveal className="text-center mb-12">
        <p className="section-subtitle">PROGRAMAÇÃO</p>
        <h2 className="section-title">Confira o que preparamos para você</h2>
      </ScrollReveal>

      <div className="max-w-4xl mx-auto space-y-3">
        {items.map((s, i) => (
          <ScrollReveal key={i} delay={i * 50}>
            <div className="flex items-stretch rounded-xl overflow-hidden bg-card shadow-sm border border-border">
              <div className={`${stageColors[s.stage as Stage] ?? "bg-primary"} w-36 md:w-44 shrink-0 flex flex-col items-center justify-center text-center px-3 py-4`}>
                <span className="text-white font-bold text-xs md:text-sm leading-tight">{s.time}</span>
                <span className="text-white/90 font-semibold text-xs mt-1">{s.stage}</span>
              </div>
              <div className="flex items-center gap-4 px-5 py-4 flex-1 min-w-0">
                {s.avatar && (
                  <img
                    src={s.avatar}
                    alt={s.speaker || ""}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shrink-0 border-2 border-border"
                  />
                )}
                <div className="min-w-0">
                  {s.slug ? (
                    <Link href={`/talks/${s.slug}`} className="text-foreground font-bold text-sm md:text-base leading-snug hover:text-primary transition-colors">
                      {s.title}
                    </Link>
                  ) : (
                    <h4 className="text-foreground font-bold text-sm md:text-base leading-snug">{s.title}</h4>
                  )}
                  {s.speaker && (
                    <p className="text-muted-foreground text-xs md:text-sm mt-1">{s.speaker}</p>
                  )}
                  {s.tag && (
                    <span className="inline-block mt-1 bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                      {s.tag}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="text-center mt-8">
        <Link href="/#programacao" className="btn-primary">Ver Programação Completa</Link>
      </ScrollReveal>
    </div>
  </section>
);

export default ScheduleSection;
