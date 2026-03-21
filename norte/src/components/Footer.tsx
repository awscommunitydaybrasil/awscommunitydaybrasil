import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { getSettings, getNavigation, getCommunity } from "@/lib/cms";

const Footer = () => {
  const settings  = getSettings();
  const navItems  = getNavigation();
  const community = getCommunity();

  const socials = [
    { icon: Instagram, label: "Instagram", href: settings.instagram },
    { icon: Linkedin,  label: "LinkedIn",  href: settings.linkedin  },
    { icon: Twitter,   label: "X",         href: settings.twitter   },
    { icon: Youtube,   label: "YouTube",   href: settings.youtube   },
  ].filter((s) => s.href && s.href !== "#");

  return (
    <footer className="bg-aws-dark pt-16 pb-8">
      <div className="container-main">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h4 className="text-white font-bold mb-3">{settings.siteName}</h4>
            <p className="text-white/40 text-sm leading-relaxed">
              {settings.siteDescription}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Navegação</h4>
            <ul className="space-y-2">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">User Groups</h4>
            <ul className="space-y-2">
              {community.map((group) => (
                <li key={group.acronym}>
                  <a
                    href={group.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 text-sm hover:text-primary transition-colors"
                  >
                    {group.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Siga-nos</h4>
            {socials.length > 0 && (
              <div className="flex gap-3 mb-4">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-colors" aria-label={s.label}>
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            )}
            <a href={`mailto:${settings.contactEmail}`} className="text-white/40 text-sm hover:text-primary transition-colors block mb-3">
              {settings.contactEmail}
            </a>
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/contato" className="text-white/40 text-sm hover:text-primary transition-colors">
                Contato
              </Link>
              {settings.codeOfConductUrl && (
                <Link href={settings.codeOfConductUrl} className="text-white/40 text-sm hover:text-primary transition-colors">
                  Código de Conduta
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/30 text-sm">
            © 2026 {settings.siteName}. Evento organizado pela comunidade para a comunidade.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
