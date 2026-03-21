import OrgTeamSection from "@/components/OrgTeamSection";
import { Mail, MapPin, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { getSettings, getEquipe } from "@/lib/cms";

export default function ContactContent() {
  const settings = getSettings();
  const team     = getEquipe();

  const socials = [
    { icon: Instagram, label: "Instagram",   href: settings.instagram },
    { icon: Linkedin,  label: "LinkedIn",    href: settings.linkedin  },
    { icon: Twitter,   label: "X / Twitter", href: settings.twitter   },
    { icon: Youtube,   label: "YouTube",     href: settings.youtube   },
  ].filter((s) => s.href && s.href !== "#");

  return (
    <main className="min-h-screen bg-background pb-0 pt-24">
      <div className="container-main max-w-2xl pb-16 text-center">
        <p className="section-subtitle">CONTATO</p>
        <h1 className="section-title mb-6">Fale com a gente</h1>
        <p className="mb-10 text-lg text-muted-foreground">
          Tem dúvidas, sugestões ou quer saber mais sobre o evento? Entre em contato pelos canais abaixo.
        </p>

        <div className="space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="text-primary" size={22} />
            </div>
            <h3 className="text-lg font-bold text-foreground">E-mail Geral</h3>
            <a href={`mailto:${settings.contactEmail}`} className="font-medium text-primary hover:underline">
              {settings.contactEmail}
            </a>
          </div>

          {settings.sponsorshipEmail && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="text-primary" size={22} />
              </div>
              <h3 className="text-lg font-bold text-foreground">Patrocínio</h3>
              <a href={`mailto:${settings.sponsorshipEmail}`} className="font-medium text-primary hover:underline">
                {settings.sponsorshipEmail}
              </a>
            </div>
          )}

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="text-primary" size={22} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Local do Evento</h3>
            <p className="text-muted-foreground">{settings.venueCity}</p>
          </div>

          {socials.length > 0 && (
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-lg font-bold text-foreground">Redes Sociais</h3>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <OrgTeamSection team={team} />
    </main>
  );
}
