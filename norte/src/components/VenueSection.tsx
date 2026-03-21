import ScrollReveal from "./ScrollReveal";
import { Car, Accessibility, UtensilsCrossed, MapPin } from "lucide-react";
import type { SettingsSite } from "@/lib/cms";

type Props = { settings: Pick<SettingsSite, "venueName" | "venueAddress" | "venueCity" | "venueMapUrl"> };

const VenueSection = ({ settings }: Props) => (
  <section id="local" className="section-padding bg-background">
    <div className="container-main">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <ScrollReveal>
          <p className="section-subtitle">LOCALIZAÇÃO</p>
          <h2 className="section-title text-3xl">Onde vai acontecer</h2>
          <p className="text-aws-dark font-bold text-xl mb-2">
            {settings.venueName || "Centro de Convenções — Belém, PA"}
          </p>
          <p className="text-muted-foreground mb-6">
            {settings.venueAddress || "Endereço a confirmar — Belém, Pará, Brasil"}
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-aws-gray text-sm"><Car size={18} className="text-primary" /> Estacionamento disponível</li>
            <li className="flex items-center gap-3 text-aws-gray text-sm"><Accessibility size={18} className="text-primary" /> Acessibilidade garantida</li>
            <li className="flex items-center gap-3 text-aws-gray text-sm"><UtensilsCrossed size={18} className="text-primary" /> Área de alimentação no local</li>
          </ul>
          {settings.venueMapUrl ? (
            <a href={settings.venueMapUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-primary text-sm">Como Chegar</a>
          ) : (
            <span className="btn-outline-primary text-sm opacity-50 cursor-not-allowed">Como Chegar</span>
          )}
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="aspect-[4/3] rounded-2xl bg-muted flex items-center justify-center border border-border">
            {settings.venueMapUrl ? (
              <iframe
                src={settings.venueMapUrl}
                className="w-full h-full rounded-2xl"
                loading="lazy"
                title="Mapa do evento"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <MapPin size={40} className="mx-auto mb-2" />
                <span className="text-sm">Mapa será exibido aqui</span>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default VenueSection;
