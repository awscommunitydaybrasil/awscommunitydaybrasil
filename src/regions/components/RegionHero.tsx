import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import logo from "@/assets/logo-community-day.png";
import type { RegionConfig } from "@/regions/types";

const getCountdown = (targetDate: string) => {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
};

function useCountdown(targetDate: string) {
  const [time, setTime] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return time;
}

interface RegionHeroProps {
  config: RegionConfig;
  heroImage: string;
  past?: boolean;
}

const RegionHero = ({ config, heroImage, past = false }: RegionHeroProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const countdown = useCountdown(config.targetDate);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
      <img src={heroImage} alt={config.regionName} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
      <div
        ref={ref}
        className={`relative z-10 text-center container transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-4 font-display">
          Edição {config.regionName} · {config.location.city}
        </p>
        <img src={logo} alt="AWS Community Day Brasil" className="max-w-xs md:max-w-md lg:max-w-lg mx-auto mb-6" />
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body mb-10">
          {config.subtitle}
        </p>
        {past ? (
          <div className="flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/15 border border-primary/30 text-primary font-bold font-display text-lg uppercase tracking-wider">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Evento Realizado
            </span>
          </div>
        ) : (
          <div className="flex justify-center gap-4 md:gap-8">
            {([["days", "Dias"], ["hours", "Horas"], ["minutes", "Min"], ["seconds", "Seg"]] as const).map(([key, label]) => (
              <div key={key} className="flex flex-col items-center">
                <span className="text-4xl md:text-6xl font-bold font-display text-primary tabular-nums">
                  {String(countdown[key]).padStart(2, "0")}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground mt-1 font-display uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RegionHero;
