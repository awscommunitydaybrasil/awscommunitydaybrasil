import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import navigationData from "@/data/navigation.json";
import siteData from "@/data/site.json";
import { getSettings } from "@/lib/cms";

const Footer = () => {
  const settings = getSettings();

  const socials = [
    { icon: Instagram, label: "Instagram", href: settings.instagram  || siteData.social.instagram  },
    { icon: Linkedin,  label: "LinkedIn",  href: settings.linkedin   || siteData.social.linkedin   },
    { icon: Twitter,   label: "X",         href: settings.twitter    || siteData.social.twitterUrl },
    { icon: Youtube,   label: "YouTube",   href: settings.youtube    || siteData.social.youtube    },
  ].filter((s) => s.href && s.href !== "#");

  const contactEmail = settings.contactEmail || siteData.contact.email;

  return (
    <footer className="bg-aws-dark pt-16 pb-8">
      <div className="container-main">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h4 className="text-white font-bold mb-3">{siteData.name}</h4>
            <p className="text-white/40 text-sm leading-relaxed">
              {siteData.description}
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Navegação</h4>
            <ul className="space-y-2">
              {navigationData.primary.map((link) => (
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
              {navigationData.userGroups.map((group) => (
                <li key={group.label}>
                  <Link href={group.href} className="text-white/40 text-sm hover:text-primary transition-colors">
                    {group.label}
                  </Link>
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
            <a href={`mailto:${contactEmail}`} className="text-white/40 text-sm hover:text-primary transition-colors block mb-3">
              {contactEmail}
            </a>
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/contato" className="text-white/40 text-sm hover:text-primary transition-colors">
                Contato
              </Link>
              <Link href={settings.codeOfConductUrl || navigationData.codeOfConduct.href} className="text-white/40 text-sm hover:text-primary transition-colors">
                {navigationData.codeOfConduct.label}
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/30 text-sm">
            © 2026 {siteData.name}. Evento organizado pela comunidade para a comunidade.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
