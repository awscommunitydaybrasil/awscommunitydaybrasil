import type { StudioConfig } from "nextjs-studio";

const opt = (value: string) => ({ label: value, value });

const config: StudioConfig = {
  collections: {
    // ── Object collections ────────────────────────────────────────────────
    settingssite: {
      schema: {
        collection: "settingssite",
        label: "Settings do Site",
        fields: [
          // Feature flags — show/hide sections
          { name: "sections", type: "object", fields: [
            { name: "hero",        type: "boolean", defaultValue: true  },
            { name: "about",       type: "boolean", defaultValue: true  },
            { name: "counts",      type: "boolean", defaultValue: true  },
            { name: "ingress",     type: "boolean", defaultValue: true  },
            { name: "schedule",    type: "boolean", defaultValue: true  },
            { name: "speakers",    type: "boolean", defaultValue: true  },
            { name: "sponsors",    type: "boolean", defaultValue: true  },
            { name: "sponsorship", type: "boolean", defaultValue: true  },
            { name: "userGroups",  type: "boolean", defaultValue: true  },
            { name: "venue",       type: "boolean", defaultValue: true  },
            { name: "faq",         type: "boolean", defaultValue: true  },
            { name: "cta",         type: "boolean", defaultValue: true  },
          ]},
          { name: "hero", type: "object", fields: [
            { name: "showCountdown",  type: "boolean", defaultValue: true },
            { name: "showCtaButtons", type: "boolean", defaultValue: true },
          ]},
          // Site identity
          { name: "siteName",          type: "text" },
          { name: "siteTagline",       type: "text" },
          { name: "siteDescription",   type: "long-text" },
          { name: "siteUrl",           type: "url"  },
          { name: "ogImage",           type: "url"  },
          { name: "locale",            type: "text" },
          { name: "organizationName",  type: "text" },
          // Event date
          { name: "eventDisplayDate",  type: "text" },
          { name: "eventStartDate",    type: "text" },
          { name: "eventEndDate",      type: "text" },
          { name: "eventRegion",       type: "text" },
          { name: "eventCountry",      type: "text" },
          // Location
          { name: "venueName",         type: "text" },
          { name: "venueAddress",      type: "text" },
          { name: "venueCity",         type: "text" },
          { name: "venueLat",          type: "text" },
          { name: "venueLng",          type: "text" },
          { name: "venueMapUrl",       type: "url"  },
          // Social
          { name: "instagram",         type: "url"  },
          { name: "linkedin",          type: "url"  },
          { name: "twitter",           type: "url"  },
          { name: "youtube",           type: "url"  },
          // Contact
          { name: "contactEmail",      type: "email" },
          { name: "sponsorshipEmail",  type: "email" },
          // Footer links
          { name: "codeOfConductUrl",  type: "url"  },
          { name: "privacyPolicyUrl",  type: "url"  },
        ],
      },
    },

    about: {
      schema: {
        collection: "about",
        label: "Sobre o Evento",
        fields: [
          { name: "paragraph1", type: "long-text", required: true },
          { name: "paragraph2", type: "long-text", required: true },
          { name: "paragraph3", type: "long-text" },
          { name: "imageUrl",   type: "url" },
          { name: "imageAlt",   type: "text" },
          { name: "hero", type: "object", fields: [
            { name: "editionLabel",      type: "text" },
            { name: "headline",          type: "text" },
            { name: "subtitle",          type: "long-text" },
            { name: "ctaPrimaryLabel",   type: "text" },
            { name: "ctaPrimaryUrl",     type: "text" },
            { name: "ctaSecondaryLabel", type: "text" },
            { name: "ctaSecondaryUrl",   type: "text" },
            { name: "ticketsLabel",      type: "text" },
            { name: "imageUrl",          type: "url"  },
            { name: "imageAlt",          type: "text" },
          ]},
        ],
      },
    },

    counts: {
      schema: {
        collection: "counts",
        label: "Números do Evento",
        fields: [
          { name: "participants",  type: "text", required: true },
          { name: "participantsLabel", type: "text", required: true },
          { name: "talks",         type: "text", required: true },
          { name: "talksLabel",    type: "text", required: true },
          { name: "speakers",      type: "text", required: true },
          { name: "speakersLabel", type: "text", required: true },
          { name: "days",          type: "text", required: true },
          { name: "daysLabel",     type: "text", required: true },
        ],
      },
    },

    // ── Sheet collections ─────────────────────────────────────────────────
    community: {
      schema: {
        collection: "community",
        label: "Comunidade (User Groups)",
        fields: [
          { name: "name",        type: "text",      required: true },
          { name: "acronym",     type: "text",      required: true },
          { name: "city",        type: "text",      required: true },
          { name: "description", type: "long-text", required: true },
          { name: "link",        type: "url"  },
          { name: "logoUrl",     type: "url"  },
          { name: "order",       type: "number" },
        ],
      },
    },

    ingress: {
      schema: {
        collection: "ingress",
        label: "Ingressos",
        fields: [
          { name: "name",        type: "text",      required: true },
          { name: "price",       type: "text",      required: true },
          { name: "description", type: "text",      required: true },
          { name: "icon",        type: "text" },
          { name: "featured",    type: "boolean",   defaultValue: false },
          { name: "badge",       type: "text" },
          { name: "ctaLabel",    type: "text",      required: true },
          { name: "ctaUrl",      type: "url" },
          { name: "note",        type: "text" },
          { name: "benefits",    type: "array",
            itemFields: [{ name: "item", type: "text", required: true }]
          },
          { name: "order",       type: "number" },
        ],
      },
    },

    patrocinadores: {
      schema: {
        collection: "patrocinadores",
        label: "Patrocinadores",
        fields: [
          { name: "name",    type: "text",    required: true },
          { name: "logoUrl", type: "url",     required: true },
          { name: "link",    type: "url"  },
          { name: "tier",    type: "select",
            options: [opt("ouro"), opt("prata"), opt("bronze"), opt("comunidade")],
          },
          { name: "order",   type: "number" },
        ],
      },
    },

    "patrocinio-tier": {
      schema: {
        collection: "patrocinio-tier",
        label: "Planos de Patrocínio",
        fields: [
          { name: "name",     type: "text",    required: true },
          { name: "price",    type: "text",    required: true },
          { name: "icon",     type: "text" },
          { name: "featured", type: "boolean", defaultValue: false },
          { name: "badge",    type: "text" },
          { name: "ctaLabel", type: "text",    required: true },
          { name: "benefits", type: "array",
            itemFields: [{ name: "item", type: "text", required: true }]
          },
          { name: "order",    type: "number" },
        ],
      },
    },

    equipe: {
      schema: {
        collection: "equipe",
        label: "Equipe Organizadora",
        fields: [
          { name: "name",     type: "text", required: true },
          { name: "role",     type: "text", required: true },
          { name: "photoUrl", type: "url"  },
          { name: "linkedin", type: "url"  },
          { name: "order",    type: "number" },
        ],
      },
    },

    // ── Sheet + MDX collections ───────────────────────────────────────────
    schedule: {
      schema: {
        collection: "schedule",
        label: "Programação",
        fields: [
          { name: "title",   type: "text",   required: true },
          { name: "time",    type: "text",   required: true },
          { name: "speaker", type: "text"   },
          { name: "stage",   type: "select",
            options: [opt("Geral"), opt("Palco Talk"), opt("Palco Hands-On")],
          },
          { name: "tag",     type: "text"   },
          { name: "avatar",  type: "url"    },
          { name: "slug",    type: "text"   },
          { name: "order",   type: "number" },
        ],
      },
    },

    speakers: {
      mediaDir: "public/images/speakers",
      schema: {
        collection: "speakers",
        label: "Speakers",
        fields: [
          { name: "name",    type: "text",  required: true },
          { name: "role",    type: "text",  required: true },
          { name: "company", type: "text"  },
          { name: "photo",   type: "url"   },
          { name: "linkedin",type: "url"   },
          { name: "twitter", type: "url"   },
          { name: "github",  type: "url"   },
          { name: "slug",    type: "text"  },
          { name: "order",   type: "number"},
        ],
      },
    },

    faq: {
      schema: {
        collection: "faq",
        label: "FAQ",
        fields: [
          { name: "question", type: "text",      required: true },
          { name: "answer",   type: "long-text", required: true },
          { name: "order",    type: "number" },
        ],
      },
    },

    navigation: {
      schema: {
        collection: "navigation",
        label: "Navegação",
        fields: [
          { name: "label",  type: "text",   required: true },
          { name: "href",   type: "text",   required: true },
          { name: "order",  type: "number" },
        ],
      },
    },
  },
};

export default config;
