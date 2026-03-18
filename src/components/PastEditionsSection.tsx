const editions = [
  { year: "2025", location: "Campinas" },
  { year: "2024", location: "Goiânia e Florianópolis" },
  { year: "2023", location: "Ribeirão Preto" },
  { year: "2022", location: "Online" },
];

const PastEditionsSection = () => {
  return (
    <section id="anteriores" className="py-24 bg-secondary">
      <div className="container max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Edições Anteriores
          </h2>
        </div>
        <div className="space-y-4">
          {editions.map((ed) => (
            <div
              key={ed.year}
              className="flex items-center gap-6 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <span className="text-2xl font-bold font-display text-primary">{ed.year}</span>
              <div className="h-px flex-1 bg-border" />
              <span className="text-muted-foreground">{ed.location}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEditionsSection;
