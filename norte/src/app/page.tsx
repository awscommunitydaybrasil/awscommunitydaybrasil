import type { Metadata } from "next";
import HomeContent from "@/components/page-content/HomeContent";
import { getSettings, getFaq } from "@/lib/cms";
import {
  SchemaMarkup,
  websiteSchema,
  organizationSchema,
  eventSchema,
  generateBreadcrumbs,
  generateFaqSchema,
} from "@/lib/schema";

const settings = getSettings();

export const metadata: Metadata = {
  title: {
    absolute: `${settings.siteName} | ${settings.siteTagline}`,
  },
  description: settings.siteDescription,
  openGraph: {
    title: `${settings.siteName} | ${settings.siteTagline}`,
    description: settings.siteDescription,
    url: settings.siteUrl,
    images: [settings.ogImage],
  },
  alternates: {
    canonical: settings.siteUrl,
  },
};

export default function HomePage() {
  const faqs = getFaq().map((f) => ({ q: f.question, a: f.answer }));

  return (
    <>
      <SchemaMarkup
        schema={[
          websiteSchema,
          organizationSchema,
          eventSchema,
          generateFaqSchema(faqs),
          generateBreadcrumbs([{ name: "Início", url: settings.siteUrl }]),
        ]}
      />
      <HomeContent />
    </>
  );
}
