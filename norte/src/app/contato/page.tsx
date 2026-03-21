import type { Metadata } from "next";
import ContactContent from "@/components/page-content/ContactContent";
import { getSettings } from "@/lib/cms";
import { SchemaMarkup, generateBreadcrumbs, organizationSchema } from "@/lib/schema";

const settings = getSettings();

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a organização do AWS Community Day Norte sobre ingressos, patrocínio e dúvidas gerais.",
  openGraph: {
    title: `Contato | ${settings.siteName}`,
    description: "Entre em contato com a organização do AWS Community Day Norte.",
    url: `${settings.siteUrl}/contato`,
    images: [settings.ogImage],
  },
  alternates: {
    canonical: `${settings.siteUrl}/contato`,
  },
};

export default function ContatoPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          organizationSchema,
          generateBreadcrumbs([
            { name: "Início", url: settings.siteUrl },
            { name: "Contato", url: `${settings.siteUrl}/contato` },
          ]),
        ]}
      />
      <ContactContent />
    </>
  );
}
