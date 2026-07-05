import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface PhotoGalleryCardProps {
  photosUrl: string;
  photoImage: string;
}

const PhotoGalleryCard = ({ photosUrl, photoImage }: PhotoGalleryCardProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="-mt-16 pb-8 relative z-10">
      <div
        ref={ref}
        className={`container max-w-4xl transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <a
          href={photosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Image side */}
          <div className="relative min-h-[200px] md:min-h-[240px] overflow-hidden">
            <img
              src={photoImage}
              alt="Fotos do evento AWS Community Day Centro-Oeste"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 to-primary/10" />
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                Galeria de Fotos
              </span>
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold font-display text-foreground mb-2">
              📸 Veja as fotos do evento
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Reviva os melhores momentos do AWS Community Day Centro-Oeste 2026. Palestras, networking, comunidade e muito mais!
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all duration-300">
              Abrir galeria
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default PhotoGalleryCard;
