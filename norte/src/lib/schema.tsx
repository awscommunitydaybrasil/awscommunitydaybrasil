import { getSettings } from "@/lib/cms";

const s = getSettings();

type BreadcrumbItem = {
  name: string;
  url: string;
};

type FaqItem = {
  q: string;
  a: string;
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: s.siteName,
  url: s.siteUrl,
  description: s.siteDescription,
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: s.organizationName,
  url: s.siteUrl,
  logo: `${s.siteUrl}${s.ogImage}`,
  description: s.siteDescription,
  areaServed: "BR",
  sameAs: [s.instagram, s.linkedin, s.youtube].filter(Boolean),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: s.contactEmail,
  },
};

export const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: s.siteName,
  description: s.siteDescription,
  startDate: s.eventStartDate,
  endDate: s.eventEndDate,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  image: [`${s.siteUrl}${s.ogImage}`],
  location: {
    "@type": "Place",
    name: s.venueName,
    address: {
      "@type": "PostalAddress",
      addressLocality: s.venueCity,
      addressRegion: s.eventRegion,
      addressCountry: s.eventCountry,
    },
  },
  organizer: {
    "@type": "Organization",
    name: s.organizationName,
    url: s.siteUrl,
  },
};

export function generateFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function generateBreadcrumbs(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface SchemaMarkupProps {
  schema: object | object[];
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
