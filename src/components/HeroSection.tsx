import logo from "@/assets/logo-community-day.png";
import BrazilMapSVG from "./BrazilMapSVG";

const HeroSection = () => {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 flex items-center justify-center hero-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="w-[600px] h-[600px] pt-8">
          <BrazilMapSVG outlineOnly className="w-full h-full opacity-10" />
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
      </div>
    </section>
  );
};

export default HeroSection;
