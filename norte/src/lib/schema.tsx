import siteData from "@/data/site.json";

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
  name: siteData.name,
  url: siteData.url,
  description: siteData.description,
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteData.organization.name,
  url: siteData.url,
  logo: `${siteData.url}${siteData.ogImage}`,
  description: siteData.description,
  areaServed: "BR",
  sameAs: [
    siteData.social.instagram,
    siteData.social.linkedin,
    siteData.social.youtube
  ].filter(Boolean),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: siteData.contact.email,
  },
};

export const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: siteData.name,
  description: siteData.description,
  startDate: siteData.event.startDate,
  endDate: siteData.event.endDate,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  image: [`${siteData.url}${siteData.ogImage}`],
  location: {
    "@type": "Place",
    name: siteData.event.location.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteData.event.location.city,
      addressRegion: siteData.event.location.region,
      addressCountry: siteData.event.location.country,
    },
  },
  organizer: {
    "@type": "Organization",
    name: siteData.organization.name,
    url: siteData.url,
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
