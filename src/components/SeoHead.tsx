import { Helmet } from "react-helmet-async";
import type { SeoConfig } from "@/lib/seo";
import { buildSeoMeta } from "@/lib/seo";

interface SeoHeadProps {
  config: SeoConfig;
}

const SeoHead = ({ config }: SeoHeadProps) => {
  const meta = buildSeoMeta(config);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.robots} />
      <link rel="canonical" href={meta.canonicalUrl} />

      <meta property="og:type" content={meta.og.type} />
      <meta property="og:url" content={meta.og.url} />
      <meta property="og:site_name" content={meta.og.siteName} />
      <meta property="og:locale" content={meta.og.locale} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.og.image.url} />
      <meta property="og:image:alt" content={meta.og.image.alt} />
      <meta property="og:image:width" content={String(meta.og.image.width)} />
      <meta property="og:image:height" content={String(meta.og.image.height)} />

      <meta name="twitter:card" content={meta.twitter.card} />
      <meta name="twitter:url" content={meta.twitter.url} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.twitter.image.url} />
      <meta name="twitter:image:alt" content={meta.twitter.image.alt} />

      {meta.jsonLd.map((entry, idx) => (
        <script key={`jsonld-${idx}`} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHead;