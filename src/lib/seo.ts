export interface SeoImageConfig {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface SeoOgConfig {
  type?: "website" | "article";
  url?: string;
  siteName?: string;
  locale?: string;
  image: SeoImageConfig;
}

export interface SeoTwitterConfig {
  card?: "summary" | "summary_large_image";
  url?: string;
  image: SeoImageConfig;
}

export interface SeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
  og: SeoOgConfig;
  twitter: SeoTwitterConfig;
  jsonLd?: Array<Record<string, unknown>>;
}

export interface BuiltSeoMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  og: Required<Omit<SeoOgConfig, "image">> & { image: Required<SeoImageConfig> };
  twitter: Required<Omit<SeoTwitterConfig, "image">> & { image: Required<SeoImageConfig> };
  jsonLd: Array<Record<string, unknown>>;
}

const DEFAULT_ROBOTS = "index,follow,max-image-preview:large";
const DEFAULT_OG_SITE_NAME = "AWS Community Day Brasil";
const DEFAULT_OG_LOCALE = "pt_BR";
const DEFAULT_OG_IMAGE_WIDTH = 1200;
const DEFAULT_OG_IMAGE_HEIGHT = 630;

function isBlank(value: string | undefined): boolean {
  return !value || value.trim().length === 0;
}

function isAbsoluteHttpUrl(value: string): boolean {
  return /^https?:\/\/.+/i.test(value);
}

function assertNonEmpty(value: string | undefined, field: string): asserts value is string {
  if (isBlank(value)) {
    throw new Error(`SEO config invalida: campo obrigatorio ausente (${field}).`);
  }
}

function assertAbsoluteUrl(value: string, field: string): void {
  if (!isAbsoluteHttpUrl(value)) {
    throw new Error(`SEO config invalida: URL absoluta obrigatoria em ${field}.`);
  }
}

export function buildSeoMeta(config: SeoConfig): BuiltSeoMeta {
  assertNonEmpty(config.title, "title");
  assertNonEmpty(config.description, "description");
  assertNonEmpty(config.canonicalUrl, "canonicalUrl");
  assertAbsoluteUrl(config.canonicalUrl, "canonicalUrl");

  assertNonEmpty(config.og?.image?.url, "og.image.url");
  assertAbsoluteUrl(config.og.image.url, "og.image.url");

  assertNonEmpty(config.twitter?.image?.url, "twitter.image.url");
  assertAbsoluteUrl(config.twitter.image.url, "twitter.image.url");

  const ogUrl = config.og.url ?? config.canonicalUrl;
  const twitterUrl = config.twitter.url ?? config.canonicalUrl;

  assertAbsoluteUrl(ogUrl, "og.url");
  assertAbsoluteUrl(twitterUrl, "twitter.url");

  return {
    title: config.title,
    description: config.description,
    canonicalUrl: config.canonicalUrl,
    robots: config.robots ?? DEFAULT_ROBOTS,
    og: {
      type: config.og.type ?? "website",
      url: ogUrl,
      siteName: config.og.siteName ?? DEFAULT_OG_SITE_NAME,
      locale: config.og.locale ?? DEFAULT_OG_LOCALE,
      image: {
        url: config.og.image.url,
        alt: config.og.image.alt ?? config.title,
        width: config.og.image.width ?? DEFAULT_OG_IMAGE_WIDTH,
        height: config.og.image.height ?? DEFAULT_OG_IMAGE_HEIGHT,
      },
    },
    twitter: {
      card: config.twitter.card ?? "summary_large_image",
      url: twitterUrl,
      image: {
        url: config.twitter.image.url,
        alt: config.twitter.image.alt ?? config.title,
        width: config.twitter.image.width ?? DEFAULT_OG_IMAGE_WIDTH,
        height: config.twitter.image.height ?? DEFAULT_OG_IMAGE_HEIGHT,
      },
    },
    jsonLd: config.jsonLd ?? [],
  };
}