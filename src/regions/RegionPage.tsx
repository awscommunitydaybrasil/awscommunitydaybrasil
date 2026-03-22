import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import logo from "@/assets/logo-community-day.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Star, Linkedin, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RegionConfig, Organizer, Speaker, ScheduleItem, Sponsor } from "./types";

function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

const expectations = [
  {
    title: "Inspiração",
    description: "Encontre inspiração nas histórias dos membros que enfrentaram desafios e alcançaram sucesso.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Networking",
    description: "Conecte-se, troque ideias e crie relacionamentos profissionais e oportunidades de carreira.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Conteúdo para Todos",
    description: "Atividades para iniciantes, intermediários e especialistas em cloud AWS.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    title: "Responsabilidade Social",
    description: "Todo valor arrecadado será doado a instituições de caridade ou usado na operação do evento.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
];

interface RegionPageProps {
  config: RegionConfig;
  organizers: Organizer[];
  speakers: Speaker[];
  schedule: ScheduleItem[];
  sponsors: Sponsor[];
  heroImage: string;
}

const RegionPage = ({ config, organizers, speakers, schedule, sponsors, heroImage }: RegionPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();
  const { ref: expectRef, isVisible: expectVisible } = useScrollAnimation();
  const { ref: scheduleRef, isVisible: scheduleVisible } = useScrollAnimation();
  const { ref: sponsorsRef, isVisible: sponsorsVisible } = useScrollAnimation();
  const { ref: orgRef, isVisible: orgVisible } = useScrollAnimation();
  const { ref: speakersRef, isVisible: speakersVisible } = useScrollAnimation();

  const countdown = useCountdown(config.targetDate);

  const targetDateObj = new Date(config.targetDate);
  const formattedDate = `${String(targetDateObj.getDate()).padStart(2, "0")}/${String(targetDateObj.getMonth() + 1).padStart(2, "0")}/${targetDateObj.getFullYear()}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
        <img src={heroImage} alt={config.regionName} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
        <div
          ref={heroRef}
          className={`relative z-10 text-center container transition-all duration-1000 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-display">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar para Home
          </Link>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-4 font-display">
            Edição {config.regionName} · {config.location.city}
          </p>
          <img src={logo} alt="AWS Community Day Brasil" className="max-w-xs md:max-w-md lg:max-w-lg mx-auto mb-6" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body mb-10">
            {config.subtitle}
          </p>
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
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-8">
        <div ref={infoRef} className="container grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {[
            { label: "Local", value: config.location.venue, sub: config.location.city, icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
            { label: "Data e Hora", value: config.registration.status === "Em Breve!" ? "Em Breve!" : formattedDate, sub: formattedDate, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
            { label: "Inscrições", value: config.registration.status, sub: config.registration.url ? "Inscreva-se" : "Fique ligado", icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" },
          ].map((card, i) => (
            <div
              key={card.label}
              className={`rounded-lg border border-border bg-card p-6 text-center transition-all duration-700 ease-out hover:border-primary/50 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms`, boxShadow: "var(--shadow-card)" }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto mb-4">
                <path d={card.icon} />
              </svg>
              <h3 className="text-lg font-bold font-display text-foreground mb-1">{card.label}</h3>
              <p className="text-xl font-bold text-primary font-display">{card.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{card.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O que esperar */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-5xl">
          <div ref={expectRef} className={`text-center mb-12 transition-all duration-700 ease-out ${expectVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">O que esperar</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Do nosso evento?</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Renove seus conhecimentos em AWS no AWS Community Day Brasil! Aprenda sobre as últimas tendências, conecte-se com a comunidade e crie contatos valiosos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expectations.map((item, i) => (
              <div
                key={item.title}
                className={`rounded-lg border border-border bg-card p-6 transition-all duration-700 ease-out hover:border-primary/50 group ${expectVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms`, boxShadow: "var(--shadow-card)" }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold font-display text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Palestrantes */}
      {speakers.length > 0 && (
        <section className="py-20">
          <div className="container max-w-5xl">
            <div ref={speakersRef} className={`text-center mb-12 transition-all duration-700 ease-out ${speakersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Palestrantes</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Quem vai palestrar</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map((speaker, i) => (
                <div
                  key={speaker.name}
                  className={`rounded-lg border border-border bg-card p-6 text-center transition-all duration-700 ease-out hover:border-primary/50 ${speakersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 100}ms`, boxShadow: "var(--shadow-card)" }}
                >
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-[3px] border-primary mb-4" style={{ boxShadow: "var(--shadow-glow)" }}>
                    <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-foreground">{speaker.name}</h3>
                  <p className="text-sm text-primary font-medium">{speaker.title}</p>
                  <p className="text-xs text-muted-foreground">{speaker.company}</p>
                  {speaker.talk && <p className="text-sm text-muted-foreground mt-3 italic">"{speaker.talk}"</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programação */}
      <section className={`py-20 ${speakers.length > 0 ? "bg-secondary" : ""}`}>
        <div ref={scheduleRef} className={`container text-center max-w-3xl transition-all duration-700 ease-out ${scheduleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Programação</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">Nossa programação de palestras</h2>
          {schedule.length > 0 ? (
            <div className="space-y-3 text-left">
              {schedule.map((item, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-4 flex gap-4 items-start" style={{ boxShadow: "var(--shadow-card)" }}>
                  <span className="text-sm font-bold text-primary font-display whitespace-nowrap">{item.time}</span>
                  <div>
                    <p className="font-bold text-foreground font-display">{item.title}</p>
                    {item.speaker && <p className="text-sm text-muted-foreground">{item.speaker}</p>}
                    {item.track && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.track}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card p-12" style={{ boxShadow: "var(--shadow-card)" }}>
              <p className="text-2xl font-bold text-primary font-display">Em Breve!</p>
              <p className="text-muted-foreground mt-2">A grade de palestras será divulgada em breve.</p>
            </div>
          )}
        </div>
      </section>

      {/* Patrocinadores */}
      <section className="py-20 bg-secondary">
        <div ref={sponsorsRef} className={`container text-center max-w-3xl transition-all duration-700 ease-out ${sponsorsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Patrocinadores e Apoiadores</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">Quem apoia este evento</h2>
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sponsors.map((sponsor) => (
                <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border bg-card p-4 flex items-center justify-center hover:border-primary/50 transition-all">
                  <img src={sponsor.logo} alt={sponsor.name} className="max-h-16 object-contain" />
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card p-12" style={{ boxShadow: "var(--shadow-card)" }}>
              <p className="text-muted-foreground">
                Estamos animados em apresentar as empresas cujo apoio torna nosso evento possível. Em breve divulgaremos os patrocinadores desta edição.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Organizadores */}
      {organizers.length > 0 && (
        <section className="py-20">
          <div className="container max-w-4xl">
            <div ref={orgRef} className={`text-center mb-12 transition-all duration-700 ease-out ${orgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">Organizadores</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Quem faz acontecer</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {organizers.map((org, i) => (
                <a
                  key={org.name}
                  href={org.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group text-center transition-all duration-700 ease-out ${orgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-[3px] border-primary transition-transform duration-500 group-hover:scale-110" style={{ boxShadow: "var(--shadow-glow)" }}>
                    <img src={org.photo} alt={org.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-3 text-sm font-bold font-display text-foreground group-hover:text-primary transition-colors">{org.name}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer Regional */}
      <footer className="py-16 border-t border-border bg-card">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-primary mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-sm">
                {config.socialLinks.instagram && <li><a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>}
                {config.socialLinks.linkedin && <li><a href={config.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>}
                {config.socialLinks.twitter && <li><a href={config.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">X (Twitter)</a></li>}
                {config.socialLinks.youtube && <li><a href={config.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">YouTube</a></li>}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-primary mb-4">User Groups</h4>
              <ul className="space-y-2 text-sm">
                {config.userGroups.map((ug) => (
                  <li key={ug.name}><a href={ug.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">{ug.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-primary mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li><a href={`mailto:${config.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">{config.contact.email}</a></li>
                <li><a href={config.contact.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">{config.contact.website.replace("https://www.", "")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-primary mb-4">Código de Conduta</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">Nosso evento segue um código de conduta para garantir um ambiente seguro e inclusivo para todos.</p>
              <a href="https://aws.amazon.com/codeofconduct/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline font-medium">Leia o Código de Conduta →</a>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">© 2026 AWS Community Day Brasil — Edição {config.regionName}. Organizado pela comunidade, para a comunidade.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegionPage;
