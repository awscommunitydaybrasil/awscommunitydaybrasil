"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { imgSrc } from "@/lib/utils";

type Props = { eventStartDate: string };

const HeroSection = ({ eventStartDate }: Props) => {
  const TARGET_DATE = new Date(`${eventStartDate}T08:00:00-03:00`).getTime();
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  function getTimeLeft() {
    const diff = TARGET_DATE - Date.now();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-hero-gradient relative overflow-hidden pt-16">
      {/* Hex pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 52px",
        }}
      />

      <div className="container-main relative z-10 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <div className="lg:col-span-3">
            <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide">
              Edição Norte 2026
            </span>
            <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-[52px] leading-[1.1] text-balance mb-5">
              A maior conferência de cloud da Amazônia está de volta
            </h1>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Um dia inteiro de palestras, workshops e networking com a comunidade AWS. Para todos os níveis.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#ingressos" className="btn-primary text-base py-3 px-7">
                Garanta seu Ingresso
              </a>
              <a href="#programacao" className="btn-outline-white text-base py-3 px-7">
                Ver Programação
              </a>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-white/50 text-sm">
              <span className="flex items-center gap-1.5"><CalendarDays size={15} /> 12 de Setembro de 2026</span>
              <span className="flex items-center gap-1.5"><MapPin size={15} /> Belém, PA</span>
              <span className="flex items-center gap-1.5"><Ticket size={15} /> Vagas Limitadas</span>
            </div>
          </div>

          {/* Right column — event image */}
          <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imgSrc("/images/hero-event.jpg")}
                alt="Evento AWS Community Day"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-16 md:mt-20">
          {timeLeft ? (
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                { value: timeLeft.days, label: "Dias" },
                { value: timeLeft.hours, label: "Horas" },
                { value: timeLeft.minutes, label: "Minutos" },
                { value: timeLeft.seconds, label: "Segundos" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-3 md:gap-4">
                  <div className="bg-white/[0.08] rounded-xl px-5 py-4 min-w-[80px] text-center">
                    <div className="text-white font-extrabold text-4xl md:text-5xl tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-white/50 text-xs mt-1 font-medium">{item.label}</div>
                  </div>
                  {i < 3 && (
                    <span className="text-primary font-bold text-3xl hidden md:block">:</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-primary text-center text-xl font-bold">O evento já aconteceu!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
