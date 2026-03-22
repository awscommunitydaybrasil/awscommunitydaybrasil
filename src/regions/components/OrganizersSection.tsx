import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { Organizer } from "@/regions/types";

interface OrganizersSectionProps {
  organizers: Organizer[];
}

const OrganizersSection = ({ organizers }: OrganizersSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  if (organizers.length === 0) return null;

  return (
    <section id="organizadores" className="py-20 scroll-mt-16">
      <div className="container max-w-4xl">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Organizadores</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Quem faz acontecer</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {organizers.map((org, i) => (
            <a
              key={org.name}
              href={org.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`group text-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-[3px] border-primary transition-transform duration-500 group-hover:scale-110" style={{ boxShadow: "var(--shadow-glow)" }}>
                <img src={org.photo} alt={org.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 text-sm font-bold font-display text-foreground group-hover:text-primary transition-colors">{org.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizersSection;
