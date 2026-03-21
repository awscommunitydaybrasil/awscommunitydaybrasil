/**
 * CMS data layer — wraps nextjs-studio queryCollection calls.
 * Types are sourced from the auto-generated .studio/studio.d.ts
 * via the "@studio" path alias defined in tsconfig.json.
 * All reads are synchronous (resolved at build time for static export).
 */
import { queryCollection } from "nextjs-studio/server";

// Re-export official entry types so components import from a single source.
export type {
  AboutEntry          as AboutData,
  CommunityEntry      as Community,
  CountsEntry         as CountsData,
  EquipeEntry         as EquipeMember,
  FaqEntry            as FaqItem,
  IngressEntry        as Ingress,
  PatrocinadoresEntry as Patrocinador,
  PatrocinioTierEntry as PatrocinioTier,
  ScheduleEntry       as ScheduleItem,
  SettingssiteEntry   as SettingsSite,
  SpeakersEntry       as Speaker,
} from "@studio";

// Speaker com conteúdo MDX (body vem do queryCollection, não está no schema gerado).
export interface SpeakerContent {
  name: string;
  role: string;
  company: string;
  photo: string;
  linkedin: string;
  twitter: string;
  github: string;
  slug: string;
  order: number;
  body: string;
}

// FAQ com conteúdo MDX.
export interface FaqContent {
  question: string;
  answer: string;
  order: number;
  body: string;
}

// ── Query helpers ─────────────────────────────────────────────────────────────

export function getSettings() {
  return queryCollection("settingssite").first();
}

export function getAbout() {
  return queryCollection("about").first();
}

export function getCounts() {
  return queryCollection("counts").first();
}

export function getCommunity() {
  return queryCollection("community").sort("order", "asc").all();
}

export function getIngress() {
  return queryCollection("ingress").sort("order", "asc").all();
}

export function getSchedule() {
  return queryCollection("schedule").sort("order", "asc").all();
}

export function getSpeakers(): SpeakerContent[] {
  return queryCollection("speakers").sort("order", "asc").all().map((s) => ({
    name:     s.name,
    role:     s.role,
    company:  s.company,
    photo:    s.photo,
    linkedin: s.linkedin,
    twitter:  s.twitter,
    github:   s.github,
    slug:     s.slug,
    order:    s.order,
    body:     (s as unknown as { body: string }).body ?? "",
  }));
}

export function getPatrocinadores() {
  return queryCollection("patrocinadores").sort("order", "asc").all();
}

export function getPatrocinioTiers() {
  return queryCollection("patrocinio-tier").sort("order", "asc").all();
}

export function getFaq(): FaqContent[] {
  return queryCollection("faq").sort("order", "asc").all().map((f) => ({
    question: f.question,
    answer:   f.answer,
    order:    f.order,
    body:     (f as unknown as { body: string }).body ?? "",
  }));
}

export function getEquipe() {
  return queryCollection("equipe").sort("order", "asc").all();
}

export function getSpeakerBySlug(slug: string): SpeakerContent | null {
  const s = queryCollection("speakers").all().find((s) => s.slug === slug);
  if (!s) return null;
  return {
    name:     s.name,
    role:     s.role,
    company:  s.company,
    photo:    s.photo,
    linkedin: s.linkedin,
    twitter:  s.twitter,
    github:   s.github,
    slug:     s.slug,
    order:    s.order,
    body:     (s as unknown as { body: string }).body ?? "",
  };
}

export function getScheduleBySlug(slug: string) {
  return queryCollection("schedule").all().find((s) => s.slug === slug) ?? null;
}
