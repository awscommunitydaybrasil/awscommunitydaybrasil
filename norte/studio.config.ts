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
          { name: "showHero",          type: "boolean", defaultValue: true  },
          { name: "showAbout",         type: "boolean", defaultValue: true  },
          { name: "showCounts",        type: "boolean", defaultValue: true  },
          { name: "showIngress",       type: "boolean", defaultValue: true  },
          { name: "showSchedule",      type: "boolean", defaultValue: true  },
          { name: "showSpeakers",      type: "boolean", defaultValue: true  },
          { name: "showSponsors",      type: "boolean", defaultValue: true  },
          { name: "showSponsorship",   type: "boolean", defaultValue: true  },
          { name: "showUserGroups",    type: "boolean", defaultValue: true  },
          { name: "showVenue",         type: "boolean", defaultValue: true  },
          { name: "showFaq",           type: "boolean", defaultValue: true  },
          { name: "showCta",           type: "boolean", defaultValue: true  },
          // Location
          { name: "venueName",         type: "text" },
          { name: "venueAddress",      type: "text" },
          { name: "venueCity",         type: "text" },
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
  },
};

export default config;
