import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-brasil-generico.png";

const navLinks = [
  { href: "#regioes", label: "Edições 2026" },
  { href: "#sobre", label: "Sobre" },
  { href: "#anteriores", label: "Edições Anteriores" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/"><img src={logo} alt="AWS Community Day Brasil" className="h-10" /></Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="container flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
