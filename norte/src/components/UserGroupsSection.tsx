import ScrollReveal from "./ScrollReveal";
import type { Community } from "@/lib/cms";

type Props = { groups: Community[] };

const UserGroupsSection = ({ groups }: Props) => (
  <section id="usergroups" className="section-padding bg-muted">
    <div className="container-main">
      <ScrollReveal className="text-center mb-12">
        <p className="section-subtitle">COMUNIDADE</p>
        <h2 className="section-title">Conheça os AWS User Groups envolvidos</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Este evento é organizado e possível graças aos grupos de usuários AWS da região Norte.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map((g, i) => (
          <ScrollReveal key={g.name} delay={i * 80}>
            <div className="bg-card rounded-2xl shadow-sm border border-border p-8 h-full flex flex-col card-hover">
              <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-5">
                {g.acronym}
              </div>
              <h4 className="text-aws-dark font-bold text-lg mb-1">{g.name}</h4>
              <p className="text-muted-foreground text-sm mb-3">{g.city}</p>
              <p className="text-aws-gray text-sm leading-relaxed flex-1">{g.description}</p>
              {g.link && (
                <a href={g.link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium mt-4 hover:underline">
                  Participe do grupo →
                </a>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="text-center mt-10">
        <p className="text-muted-foreground">
          Quer levar um AWS User Group para sua cidade?{" "}
          <a href="https://aws.amazon.com/developer/community/usergroups/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
            Saiba como criar um grupo →
          </a>
        </p>
      </ScrollReveal>
    </div>
  </section>
);

export default UserGroupsSection;
