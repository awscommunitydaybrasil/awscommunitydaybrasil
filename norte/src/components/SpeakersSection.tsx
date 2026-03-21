import ScrollReveal from "./ScrollReveal";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import type { Speaker } from "@/lib/cms";
import { imgSrc } from "@/lib/utils";

type Props = { speakers: Speaker[] };

const SpeakersSection = ({ speakers }: Props) => (
  <section id="speakers" className="section-padding bg-background">
    <div className="container-main">
      <ScrollReveal className="text-center mb-12">
        <p className="section-subtitle">SPEAKERS</p>
        <h2 className="section-title">Conheça quem vai compartilhar conhecimento</h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {speakers.map((s, i) => (
          <ScrollReveal key={s.name} delay={i * 70}>
            <div className="bg-card rounded-2xl border border-border p-6 text-center card-hover">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                {s.photo ? (
                  <img src={imgSrc(s.photo)} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-2xl font-bold">
                    {s.name.charAt(0)}
                  </div>
                )}
              </div>
              {s.slug ? (
                <Link href={`/speakers/${s.slug}`} className="text-aws-dark font-bold text-base hover:text-primary transition-colors">
                  {s.name}
                </Link>
              ) : (
                <h4 className="text-aws-dark font-bold text-base">{s.name}</h4>
              )}
              <p className="text-muted-foreground text-sm mt-1">
                {s.role}{s.company ? `, ${s.company}` : ""}
              </p>
              <div className="flex justify-center gap-3 mt-3">
                {s.linkedin && (
                  <a href={s.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin size={16} />
                  </a>
                )}
                {s.twitter && (
                  <a href={s.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter size={16} />
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="text-center mt-10">
        <p className="text-muted-foreground">
          Mais speakers serão anunciados em breve!{" "}
          <a href="/contato" className="text-primary font-medium hover:underline">Quero ser speaker →</a>
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default SpeakersSection;
