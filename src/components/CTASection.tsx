import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary to-background" />
      <div
        ref={ref}
        className={`relative z-10 container text-center transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-6">
          Participe do AWS Community Day Brasil
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
          Conecte-se com a maior comunidade AWS do Brasil. Aprenda, compartilhe e faça networking.
        </p>
        <a
          href="#regioes"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all animate-pulse-glow"
        >
          Garantir vaga
        </a>
      </div>
    </section>
  );
};

export default CTASection;
