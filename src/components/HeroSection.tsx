import logo from "@/assets/logo-community-day.png";

const BrazilMapSVG = () => (
  <svg viewBox="0 0 600 600" className="w-full h-full opacity-10" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Simplified Brazil outline */}
    <path
      d="M300 80 L380 100 L420 140 L450 180 L480 200 L500 260 L490 320 L470 360 L440 400 L400 440 L360 470 L320 490 L280 500 L240 490 L200 460 L180 420 L160 380 L150 340 L140 300 L150 260 L170 220 L200 180 L240 140 L280 100 Z"
      stroke="hsl(var(--accent))"
      strokeWidth="1"
      opacity="0.5"
    />
    {/* Connection nodes */}
    {[
      [300, 180], [380, 260], [450, 300], [260, 340], [340, 400],
      [200, 280], [320, 240], [400, 350], [280, 450], [360, 160],
    ].map(([cx, cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="3" fill="hsl(var(--primary))" opacity="0.6" />
        <circle cx={cx} cy={cy} r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
      </g>
    ))}
    {/* Connection lines */}
    {[
      [300, 180, 380, 260], [380, 260, 450, 300], [300, 180, 260, 340],
      [260, 340, 340, 400], [200, 280, 300, 180], [320, 240, 400, 350],
      [340, 400, 280, 450], [380, 260, 360, 160], [450, 300, 400, 350],
    ].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.3" />
    ))}
  </svg>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 flex items-center justify-center hero-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="w-[600px] h-[600px]">
          <BrazilMapSVG />
        </div>
      </div>
      <div className="relative z-10 text-center container">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-4 font-display hero-fade-in" style={{ animationDelay: "0.2s" }}>
          2026
        </p>
        <img src={logo} alt="AWS Community Day Brasil" className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl mx-auto mb-6 px-4 sm:px-0 hero-fade-in" style={{ animationDelay: "0.5s" }} />
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body hero-fade-in" style={{ animationDelay: "0.8s" }}>
          O maior movimento de comunidades AWS do Brasil
        </p>
        <a
          href="#regioes"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all hero-fade-in"
          style={{ animationDelay: "1.1s" }}
        >
          Explorar regiões
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
