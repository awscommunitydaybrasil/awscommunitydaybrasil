import { useScrollAnimation } from "@/hooks/use-scroll-animation";

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

const ExpectationsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-secondary">
      <div className="container max-w-5xl">
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
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
              className={`rounded-lg border border-border bg-card p-6 transition-all duration-700 ease-out hover:border-primary/50 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
  );
};

export default ExpectationsSection;
