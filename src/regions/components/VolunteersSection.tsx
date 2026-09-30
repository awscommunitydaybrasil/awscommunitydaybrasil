import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { Organizer } from "@/regions/types";

interface VolunteersSectionProps {
  volunteers: Organizer[];
}

const VolunteersSection = ({ volunteers }: VolunteersSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  const getLinkedin = (vol: Organizer) => vol.social?.linkedin;
  const getInstagram = (vol: Organizer) => vol.social?.instagram;
  const getTwitter = (vol: Organizer) => vol.social?.twitter;

  return (
    <section id="voluntarios" className="py-20 scroll-mt-16">
      <div className="container max-w-4xl">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Voluntários</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Nosso time de apoio</h2>
        </div>
        {volunteers.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {volunteers.map((vol, i) => {
              const cleanPosition = vol.photoPosition?.startsWith("object-")
                ? vol.photoPosition.replace("object-", "")
                : vol.photoPosition;

              return (
                <div
                  key={vol.name}
                  className={`group text-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-[3px] border-primary transition-transform duration-500 group-hover:scale-110" style={{ boxShadow: "var(--shadow-glow)" }}>
                    <img
                      src={vol.photo}
                      alt={vol.name}
                      className="w-full h-full object-cover transition-transform duration-300"
                      style={{
                        transform: vol.photoScale ? `scale(${vol.photoScale})` : undefined,
                        transformOrigin: cleanPosition || "center",
                        translate: vol.photoTranslate || undefined,
                        objectPosition: cleanPosition || "center",
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold font-display text-foreground">{vol.name}</p>
                  {(vol.subtitle || vol.role) && (
                    <p className="text-[11px] font-normal font-display text-muted-foreground mt-0.5">
                      {vol.subtitle || vol.role}
                    </p>
                  )}
                  {(getLinkedin(vol) || getInstagram(vol) || getTwitter(vol)) ? (
                    <div className="flex items-center justify-center gap-3 mt-2">
                      {getLinkedin(vol) && (
                        <a href={getLinkedin(vol)} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`LinkedIn de ${vol.name}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                      {getInstagram(vol) && (
                        <a href={getInstagram(vol)} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`Instagram de ${vol.name}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                          </svg>
                        </a>
                      )}
                      {getTwitter(vol) && (
                        <a href={getTwitter(vol)} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={`X de ${vol.name}`}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-2xl font-bold text-primary font-display">Em Breve!</p>
            <p className="text-muted-foreground mt-2">Nossos voluntários serão divulgados em breve.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VolunteersSection;
