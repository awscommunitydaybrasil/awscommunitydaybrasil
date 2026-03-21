import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Linkedin, Twitter, Github, ArrowLeft } from "lucide-react";
import { getSpeakers, getSpeakerBySlug, getSchedule, getSettings } from "@/lib/cms";
import { imgSrc } from "@/lib/utils";

const settings = getSettings();

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const speakers = getSpeakers();
  return speakers
    .filter((s) => s.slug)
    .map((s) => ({ slug: s.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) return { title: "Speaker não encontrado" };

  const title = `${speaker.name} | ${settings.siteName}`;
  const description = `${speaker.role}${speaker.company ? `, ${speaker.company}` : ""} — Speaker no ${settings.siteName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${settings.siteUrl}/speakers/${slug}`,
      images: speaker.photo ? [speaker.photo] : [settings.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical: `${settings.siteUrl}/speakers/${slug}` },
  };
}

export default async function SpeakerPage({ params }: Props) {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) notFound();

  const allSchedule = getSchedule();
  const speakerTalks = allSchedule.filter(
    (s) => s.speaker && s.speaker.toLowerCase().includes(speaker.name.toLowerCase())
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: speaker.name,
    jobTitle: speaker.role,
    worksFor: speaker.company ? { "@type": "Organization", name: speaker.company } : undefined,
    image: speaker.photo,
    sameAs: [speaker.linkedin, speaker.twitter, speaker.github].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-main max-w-3xl">
          <Link href="/#speakers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-8">
            <ArrowLeft size={16} /> Todos os Speakers
          </Link>

          <div className="flex flex-col sm:flex-row gap-8 items-start mb-10">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/20 shrink-0">
              {speaker.photo ? (
                <img src={imgSrc(speaker.photo)} alt={speaker.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
                  {speaker.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-aws-dark mb-1">{speaker.name}</h1>
              <p className="text-primary font-semibold text-lg mb-1">
                {speaker.role}{speaker.company ? `, ${speaker.company}` : ""}
              </p>
              <div className="flex gap-3 mt-3">
                {speaker.linkedin && (
                  <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                )}
                {speaker.twitter && (
                  <a href={speaker.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                )}
                {speaker.github && (
                  <a href={speaker.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                    <Github size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {speaker.body && (
            <div className="prose prose-slate max-w-none mb-10 text-aws-gray leading-[1.7]">
              <div dangerouslySetInnerHTML={{ __html: speaker.body }} />
            </div>
          )}

          {speakerTalks.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-aws-dark mb-4">Palestras no evento</h2>
              <ul className="space-y-3">
                {speakerTalks.map((talk, i) => (
                  <li key={i} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                        {talk.time}
                      </span>
                      {talk.slug ? (
                        <Link href={`/talks/${talk.slug}`} className="text-aws-dark font-semibold hover:text-primary transition-colors">
                          {talk.title}
                        </Link>
                      ) : (
                        <span className="text-aws-dark font-semibold">{talk.title}</span>
                      )}
                    </div>
                    {talk.stage && (
                      <p className="text-muted-foreground text-xs mt-2 ml-[calc(theme(spacing.2)+56px)]">
                        {talk.stage}
                        {talk.tag && ` · ${talk.tag}`}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
