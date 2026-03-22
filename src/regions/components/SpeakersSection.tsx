import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { Speaker } from "@/regions/types";
import SpeakerCard from "./SpeakerCard";

interface SpeakersSectionProps {
  speakers: Speaker[];
}

const SpeakersSection = ({ speakers }: SpeakersSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  if (speakers.length === 0) return null;

  const sortedSpeakers = [...speakers].sort((a, b) => {
    if (a.keynote && !b.keynote) return -1;
    if (!a.keynote && b.keynote) return 1;
    return a.name.localeCompare(b.name, "pt-BR");
  });

  return (
    <section id="palestrantes" className="py-20 scroll-mt-16">
      <div className="container max-w-5xl">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Palestrantes</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Quem vai palestrar</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSpeakers.map((speaker, i) => (
            <SpeakerCard key={speaker.name} speaker={speaker} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
