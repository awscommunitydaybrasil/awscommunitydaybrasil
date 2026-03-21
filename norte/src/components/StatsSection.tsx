"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import type { CountsData } from "@/lib/cms";

type Props = { counts: CountsData };

function useCountUp(target: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1200;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = duration / (target / step);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(start);
      }
    }, interval);
    return () => clearInterval(id);
  }, [target, trigger]);
  return count;
}

const StatItem = ({ display, label, delay }: { display: string; label: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Extract numeric part and suffix
  const match = display.match(/^(\d+)(.*)$/);
  const numericValue = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : display;

  const count = useCountUp(numericValue, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <ScrollReveal delay={delay}>
      <div ref={ref} className="text-center py-6">
        <div className="text-primary font-extrabold text-5xl tabular-nums">
          {numericValue > 0 ? `${count}${suffix}` : display}
        </div>
        <div className="text-white text-sm mt-2 font-medium">{label}</div>
      </div>
    </ScrollReveal>
  );
};

const StatsSection = ({ counts }: Props) => {
  const stats = [
    { display: counts.participants,  label: counts.participantsLabel  },
    { display: counts.talks,         label: counts.talksLabel         },
    { display: counts.speakers,      label: counts.speakersLabel      },
    { display: counts.days,          label: counts.daysLabel          },
  ];

  return (
    <section className="bg-aws-dark section-padding">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatItem key={s.label} display={s.display} label={s.label} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
