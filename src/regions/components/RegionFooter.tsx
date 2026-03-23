import { Instagram, Linkedin, Youtube } from "lucide-react";
import type { RegionConfig } from "@/regions/types";

interface RegionFooterProps {
  config: RegionConfig;
}

const RegionFooter = ({ config }: RegionFooterProps) => (
  <footer className="py-16 border-t border-border bg-card">
    <div className="container max-w-5xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h4 className="text-sm font-bold font-display uppercase tracking-wider text-primary mb-4">Redes Sociais</h4>
          <div className="flex gap-4">
            {config.socialLinks.instagram && <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram"><Instagram size={22} /></a>}
            {config.socialLinks.linkedin && <a href={config.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin size={22} /></a>}
            {config.socialLinks.twitter && <a href={config.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="X (Twitter)"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>}
            {config.socialLinks.youtube && <a href={config.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube"><Youtube size={22} /></a>}
          </div>
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
          <a href="https://github.com/awscommunitydaybrasil/codigo-de-conduta" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline font-medium">Leia o Código de Conduta →</a>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© 2026 AWS Community Day Brasil — Edição {config.regionName}. Organizado pela comunidade, para a comunidade.</p>
      </div>
    </div>
  </footer>
);

export default RegionFooter;
