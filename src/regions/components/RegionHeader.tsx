import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import siteLogo from "@/assets/logo-brasil-generico.png";

const navSections = [
  { id: "sobre", label: "Sobre" },
  { id: "palestrantes", label: "Palestrantes" },
  { id: "programacao", label: "Programação" },
  { id: "patrocinadores", label: "Patrocinadores" },
  { id: "organizadores", label: "Organizadores" },
];

interface RegionHeaderProps {
  registrationUrl?: string;
}

const RegionHeader = ({ registrationUrl }: RegionHeaderProps) => {
  const [activeNav, setActiveNav] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveNav(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/"><img src={siteLogo} alt="AWS Community Day Brasil" className="h-10" /></Link>
        <nav className="hidden md:flex items-center gap-1">
          {navSections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              className={`px-4 py-2 text-sm font-display font-semibold rounded-full transition-all whitespace-nowrap ${
                activeNav === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        {registrationUrl && (
          <a href={registrationUrl} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors">
            Inscreva-se
          </a>
        )}
        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border">
          <nav className="container flex flex-col gap-2 py-4">
            {navSections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                className={`px-4 py-2 text-sm font-display font-semibold rounded-full transition-all ${
                  activeNav === id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {label}
              </a>
            ))}
            {registrationUrl && (
              <a href={registrationUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="mx-4 mt-2 inline-flex items-center justify-center px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors">
                Inscreva-se
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default RegionHeader;
