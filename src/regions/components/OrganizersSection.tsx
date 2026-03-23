import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { Organizer } from "@/regions/types";

interface OrganizersSectionProps {
  organizers: Organizer[];
}

const OrganizersSection = ({ organizers }: OrganizersSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  if (organizers.length === 0) return null;

  const getLinkedin = (org: Organizer) => org.social?.linkedin || org.linkedin;
  const getInstagram = (org: Organizer) => org.social?.instagram;
  const getTwitter = (org: Organizer) => org.social?.twitter;

  return (
    <section id="organizadores" className="py-20 scroll-mt-16">
      <div className="container max-w-4xl">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Organizadores</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Quem faz acontecer</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {organizers.map((org, i) => (
            <div
              key={org.name}
              className={`group text-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-[3px] border-primary transition-transform duration-500 group-hover:scale-110" style={{ boxShadow: "var(--shadow-glow)" }}>
                <img src={org.photo} alt={org.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-3 text-sm font-bold font-display text-foreground">{org.name}</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                {getLinkedin(org) && (
                  <a href={getLinkedin(org)} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`LinkedIn de ${org.name}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {getInstagram(org) && (
                  <a href={getInstagram(org)} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`Instagram de ${org.name}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </a>
                )}
                {getTwitter(org) && (
                  <a href={getTwitter(org)} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`X de ${org.name}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizersSection;
