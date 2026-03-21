import ScrollReveal from "./ScrollReveal";
import { Linkedin } from "lucide-react";
import type { EquipeMember } from "@/lib/cms";

type Props = { team: EquipeMember[] };

const OrgTeamSection = ({ team }: Props) => (
  <section id="equipe" className="section-padding bg-background">
    <div className="container-main">
      <ScrollReveal className="text-center mb-12">
        <p className="section-subtitle">EQUIPE</p>
        <h2 className="section-title">Quem faz o evento acontecer</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mt-2">
          Voluntários apaixonados por cloud e comunidade, trabalhando para criar uma experiência incrível.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {team.map((m, i) => (
          <ScrollReveal key={m.name} delay={i * 60}>
            <div className="text-center group">
              <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28 mb-3">
                {m.photoUrl ? (
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    className="w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary transition-colors duration-300"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-muted border-2 border-border group-hover:border-primary transition-colors flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    {m.name.charAt(0)}
                  </div>
                )}
              </div>
              <h4 className="text-foreground font-bold text-sm">{m.name}</h4>
              <p className="text-muted-foreground text-xs mt-0.5">{m.role}</p>
              {m.linkedin && (
                <div className="flex items-center justify-center mt-2">
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                    <Linkedin size={14} />
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default OrgTeamSection;
