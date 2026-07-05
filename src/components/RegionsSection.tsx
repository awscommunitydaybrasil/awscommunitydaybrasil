import BrazilMapSVG from "./BrazilMapSVG";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useNavigate } from "react-router-dom";

const RegionsSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation();
  const navigate = useNavigate();

  const regions = [
    { name: "Norte", color: "#554492", link: "/norte/" },
    { name: "Nordeste", color: "#E69019", link: "/nordeste/" },
    { name: "Centro-Oeste", color: "#FBC064", link: "/centro-oeste/" },
    { name: "Sudeste", color: "#77889D", link: "/sudeste/" },
    { name: "Sul", color: "#322F5A", link: "/sul/" },
  ];

  return (
    <section id="regioes" className="py-24">
      <div className="container">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">
            Edições 2026
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground">
            5 regiões, 1 comunidade
          </h2>
        </div>
        <div
          ref={mapRef}
          className={`flex justify-center transition-all duration-700 ease-out delay-200 ${mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <BrazilMapSVG />
        </div>
        <div className={`flex justify-center gap-3 mt-8 flex-wrap transition-all duration-700 ease-out ${mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "400ms" }}
        >
          {regions.map((r) => (
            <button
              key={r.name}
              onClick={() => navigate(r.link)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-3 h-3 rounded-full group-hover:scale-110 transition-transform" style={{ backgroundColor: r.color }} />
              <span className="text-sm text-muted-foreground group-hover:text-foreground font-display transition-colors">{r.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionsSection;
