import logo from "@/assets/logo-brasil-generico.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <img src={logo} alt="AWS Community Day Brasil" className="h-10" />
        <nav className="hidden md:flex items-center gap-8">
          <a href="#regioes" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Edições 2026
          </a>
          <a href="#sobre" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Sobre
          </a>
          <a href="#anteriores" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Edições Anteriores
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
