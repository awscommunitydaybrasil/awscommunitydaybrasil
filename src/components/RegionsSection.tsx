import BrazilMapSVG from "./BrazilMapSVG";

const RegionsSection = () => {
  return (
    <section id="regioes" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">
            Edições 2026
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground">
            5 regiões, 1 comunidade
          </h2>
        </div>
        <div className="flex justify-center">
          <BrazilMapSVG />
        </div>
        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          {[
            { name: "Norte", color: "#554492" },
            { name: "Nordeste", color: "#E69019" },
            { name: "Centro-Oeste", color: "#FBC064" },
            { name: "Sudeste", color: "#77889D" },
            { name: "Sul", color: "#322F5A" },
          ].map((r) => (
            <div key={r.name} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: r.color }} />
              <span className="text-sm text-muted-foreground font-display">{r.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionsSection;
