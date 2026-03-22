import { useMemo, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { ScheduleItem } from "@/regions/types";

const levelColors: Record<string, string> = {
  Iniciante: "bg-green-500/20 text-green-400",
  Intermediário: "bg-yellow-500/20 text-yellow-400",
  Avançado: "bg-red-500/20 text-red-400",
};

interface ScheduleSectionProps {
  schedule: ScheduleItem[];
  hasSpeakers: boolean;
}

const ScheduleSection = ({ schedule, hasSpeakers }: ScheduleSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const [trackFilter, setTrackFilter] = useState("Todas");

  const tracks = useMemo(() => {
    const unique = [...new Set(schedule.map((s) => s.track))];
    return unique.length > 1 ? ["Todas", ...unique] : [];
  }, [schedule]);

  const filteredSchedule = useMemo(() => {
    if (trackFilter === "Todas") return schedule;
    return schedule.filter((s) => s.track === trackFilter);
  }, [schedule, trackFilter]);

  return (
    <section id="programacao" className={`py-20 scroll-mt-16 ${hasSpeakers ? "bg-secondary" : ""}`}>
      <div ref={ref} className={`container max-w-4xl transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="text-center mb-8">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Programação</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">Nossa programação de palestras</h2>
        </div>

        {tracks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tracks.map((track) => (
              <button
                key={track}
                onClick={() => setTrackFilter(track)}
                className={`px-4 py-2 text-sm font-display font-semibold rounded-full transition-all ${
                  trackFilter === track
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        )}

        {filteredSchedule.length > 0 ? (
          <div className="space-y-3">
            {filteredSchedule.map((item, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4 flex gap-4 items-start" style={{ boxShadow: "var(--shadow-card)" }}>
                <span className="text-sm font-bold text-primary font-display whitespace-nowrap mt-0.5">{item.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground font-display">{item.title}</p>
                  {item.speaker && <p className="text-sm text-muted-foreground">{item.speaker}</p>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.track && item.track !== "Geral" && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{item.track}</span>
                    )}
                    {item.track === "Geral" && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">{item.track}</span>
                    )}
                    {item.level && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[item.level] || "bg-muted text-muted-foreground"}`}>
                        {item.level}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-2xl font-bold text-primary font-display">Em Breve!</p>
            <p className="text-muted-foreground mt-2">A grade de palestras será divulgada em breve.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScheduleSection;
