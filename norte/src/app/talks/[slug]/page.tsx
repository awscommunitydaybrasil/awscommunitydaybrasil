import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Mic } from "lucide-react";
import { getSchedule, getScheduleBySlug, getSpeakers, getSettings } from "@/lib/cms";
import { imgSrc } from "@/lib/utils";

const settings = getSettings();

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const schedule = getSchedule();
  return schedule
    .filter((s) => s.slug)
    .map((s) => ({ slug: s.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const talk = getScheduleBySlug(slug);
  if (!talk) return { title: "Talk não encontrada" };

  const title = `${talk.title} | ${settings.siteName}`;
  const description = `${talk.stage} · ${talk.time}${talk.speaker ? ` · ${talk.speaker}` : ""} — ${settings.siteName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${settings.siteUrl}/talks/${slug}`,
      images: [settings.ogImage],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `${settings.siteUrl}/talks/${slug}` },
  };
}

const stageColors: Record<string, string> = {
  "Geral":           "bg-primary text-primary-foreground",
  "Palco Talk":      "bg-[hsl(var(--schedule-talk))] text-white",
  "Palco Hands-On":  "bg-[hsl(var(--schedule-handson))] text-white",
};

export default async function TalkPage({ params }: Props) {
  const { slug } = await params;
  const talk = getScheduleBySlug(slug);
  if (!talk) notFound();

  const allSpeakers = getSpeakers();
  const speakerDetail = talk.speaker
    ? allSpeakers.find((s) => s.name.toLowerCase() === talk.speaker!.toLowerCase())
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: talk.title,
    description: `${talk.stage} · ${settings.siteName}`,
    startDate: settings.eventStartDate,
    location: {
      "@type": "Place",
      name: settings.venueName,
    },
    organizer: { "@type": "Organization", name: settings.organizationName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-main max-w-3xl">
          <Link href="/#programacao" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-8">
            <ArrowLeft size={16} /> Programação
          </Link>

          <div className="mb-4">
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${stageColors[talk.stage] ?? "bg-primary text-primary-foreground"}`}>
              {talk.stage}
            </span>
            {talk.tag && (
              <span className="ml-2 inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                {talk.tag}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-aws-dark leading-tight mb-6">
            {talk.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-muted-foreground text-sm mb-8">
            <span className="flex items-center gap-1.5"><Clock size={15} /> {talk.time}</span>
            {talk.speaker && (
              <span className="flex items-center gap-1.5"><Mic size={15} /> {talk.speaker}</span>
            )}
          </div>

          {speakerDetail && (
            <Link
              href={speakerDetail.slug ? `/speakers/${speakerDetail.slug}` : "#"}
              className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5 mb-8 hover:border-primary transition-colors group"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                {speakerDetail.photo ? (
                  <img src={imgSrc(speakerDetail.photo)} alt={speakerDetail.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                    {speakerDetail.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Palestrante</p>
                <h3 className="font-bold text-aws-dark group-hover:text-primary transition-colors">{speakerDetail.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {speakerDetail.role}{speakerDetail.company ? `, ${speakerDetail.company}` : ""}
                </p>
              </div>
            </Link>
          )}

          <div className="border-t border-border pt-8 mt-8 text-center">
            <p className="text-muted-foreground mb-4">Garanta já sua vaga no evento!</p>
            <Link href="/#ingressos" className="btn-primary">
              Ver Ingressos
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
