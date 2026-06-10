import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SeoHead from "@/components/SeoHead";

const BASE_URL = "https://awscommunityday.com.br";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/home.png`;

const NotFound = () => {
  const location = useLocation();
  const canonicalUrl = `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SeoHead
        config={{
          title: "404 - Pagina nao encontrada | AWS Community Day Brasil",
          description: "A pagina solicitada nao foi encontrada.",
          canonicalUrl,
          robots: "noindex,nofollow",
          og: {
            url: canonicalUrl,
            image: {
              url: DEFAULT_OG_IMAGE,
              alt: "AWS Community Day Brasil",
            },
          },
          twitter: {
            url: canonicalUrl,
            image: {
              url: DEFAULT_OG_IMAGE,
              alt: "AWS Community Day Brasil",
            },
          },
        }}
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
