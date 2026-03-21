import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSettings, getNavigation } from "@/lib/cms";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const settings   = getSettings();
const navItems   = getNavigation();

export const metadata: Metadata = {
  metadataBase: new URL(settings.siteUrl),
  title: {
    default: `${settings.siteName} | ${settings.siteTagline}`,
    template: `%s | ${settings.siteName}`,
  },
  description: settings.siteDescription,
  keywords: ["AWS", "Amazon Web Services", "Cloud Computing", "Community Day", "Norte", "Belém", "Pará"],
  authors: [{ name: settings.organizationName, url: settings.siteUrl }],
  creator: settings.organizationName,
  publisher: settings.organizationName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: settings.locale || "pt_BR",
    url: settings.siteUrl,
    title: `${settings.siteName} | ${settings.siteTagline}`,
    description: settings.siteDescription,
    siteName: settings.siteName,
    images: [
      {
        url: settings.ogImage,
        width: 1200,
        height: 630,
        alt: settings.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${settings.siteName} | ${settings.siteTagline}`,
    description: settings.siteDescription,
    images: [settings.ogImage],
  },
  alternates: {
    canonical: settings.siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={settings.locale || "pt-BR"} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Navbar navItems={navItems} />
            {children}
            <Footer />
            <BackToTop />
          </div>
          <nav className="sr-only" aria-label="Rotas principais">
            {navItems.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </Providers>
      </body>
    </html>
  );
}
