"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import navigationData from "@/data/navigation.json";
import siteData from "@/data/site.json";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = hasMounted && pathname === "/";
  const isSolid = !isHome || scrolled;

  useEffect(() => {
    setHasMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid ? "bg-aws-dark shadow-lg" : "bg-aws-dark/80 backdrop-blur-md"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16">
        <Link href="/" className="text-white font-bold text-lg whitespace-nowrap">
          {siteData.name}
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navigationData.primary.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#ingressos" className="btn-primary text-sm py-2 px-5">
            Garanta seu Ingresso
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden bg-aws-dark border-t border-white/10 px-5 pb-5 pt-2">
          {navigationData.primary.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-white/80 text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#ingressos"
            onClick={() => setMenuOpen(false)}
            className="btn-primary block text-center text-sm py-2.5 mt-3"
          >
            Garanta seu Ingresso
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
