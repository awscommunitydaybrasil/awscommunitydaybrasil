/**
 * build-mkt-data.mjs — Data pipeline for the /mkt/ marketing card generator.
 *
 * Derives talks from each region's schedule.json (the program source of truth):
 * keeps every schedule row with a non-empty speaker AND title, dedupes on
 * (title + speaker), parses the speaker string into individual people, and
 * enriches each parsed person with a photo looked up in that region's
 * speakers.json (matched by normalized name). Speakers with no match / no usable
 * photo keep photo "" (rendered as a placeholder circle downstream — the talk is
 * never dropped). Drops regions with 0 talks, copies kept photos + the two brand
 * assets into public/mkt/, and emits public/mkt/data.json.
 *
 * Node ESM, built-in fs/path only (NO new deps). Idempotent — safe to re-run.
 *
 * Usage (from the worktree root):
 *   node scripts/build-mkt-data.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SRC_REGIONS = path.join(ROOT, "src", "regions");
const PUBLIC_MKT = path.join(ROOT, "public", "mkt");
const PHOTOS_DIR = path.join(PUBLIC_MKT, "photos");
const POSTCARDS_DIR = path.join(PUBLIC_MKT, "postcards");

// Regions to consider (regiaomodelo is a template -> ignored).
const REGIONS = ["centro-oeste", "nordeste", "norte", "sudeste", "sul"];

// Postcard (card background) filename per region, relative to the region's
// assets/ directory. Each edition uses its own city postcard.
const POSTCARD_BY_REGION = {
  "centro-oeste": "postcard-brasilia.png",
  nordeste: "postcard-salvador.png",
  norte: "postcard-belem.png",
  sudeste: "postcard-bh.png",
  sul: "postcard-curitiba.png",
};

/** Lowercase, strip accents, non-alphanumerics -> hyphen, trim hyphens. */
function slugify(str) {
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Normalize a person name for matching: strip accents (combining marks),
 * lowercase, collapse internal whitespace, trim.
 */
function normalizeName(s) {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Split a schedule `speaker` string into individual people. Splits on commas,
 * the Portuguese " e " (whitespace REQUIRED on both sides so names like "Andre"
 * are not split), and "&". Trims, drops empties, preserves order.
 */
function splitSpeakers(str) {
  return String(str)
    .split(/\s*,\s*|\s+e\s+|\s*&\s*/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * Resolve the real photo file inside `dir` for a recorded filename.
 * Returns the exact filename if present, otherwise the same basename with a
 * different common image extension (handles .jpg/.jpeg/.png mismatches in the
 * read-only src data). Returns null if nothing matches.
 */
function resolvePhotoFile(dir, recorded) {
  if (fs.existsSync(path.join(dir, recorded))) return recorded;
  const base = recorded.replace(/\.[^.]+$/, "");
  for (const ext of [".jpg", ".jpeg", ".png", ".webp"]) {
    const candidate = base + ext;
    if (fs.existsSync(path.join(dir, candidate))) return candidate;
  }
  return null;
}

/** Remove a directory tree if it exists (so re-runs do not leave stale files). */
function rmrf(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * Build a normalized name index for a region's speakers.json.
 * Returns an array of { norm, tokens, photo } entries (photo = recorded
 * filename/URL from speakers.json; resolved to a real file later).
 */
function buildSpeakerIndex(speakers) {
  return speakers.map((s) => {
    const norm = normalizeName(s.name);
    return { norm, tokens: norm ? norm.split(" ") : [], photo: s.photo };
  });
}

/**
 * Two-tier name -> speakers.json entry matcher. Returns the matched entry's
 * recorded photo string, or null if there is no confident match.
 *
 * (a) exact normalized full-name equality;
 * (b) else conservative leading-word-subsequence: the shorter name's tokens are
 *     a leading-word prefix of the longer name's tokens, requiring either
 *     >= 2 words, or an exact single-token equality. Ambiguous (b) matches
 *     (more than one candidate) are treated as NO match.
 */
function matchSpeakerPhoto(name, index) {
  const norm = normalizeName(name);
  if (!norm) return null;

  // (a) exact normalized full-name match.
  const exact = index.find((e) => e.norm === norm);
  if (exact) return exact.photo;

  // (b) conservative leading-word-subsequence match.
  const tokens = norm.split(" ");
  const candidates = index.filter((e) => {
    if (!e.tokens.length) return false;
    const [shortT, longT] =
      tokens.length <= e.tokens.length ? [tokens, e.tokens] : [e.tokens, tokens];
    if (shortT.length === 1) {
      // Only accept an exact single-token equality (both single tokens).
      return longT.length === 1 && shortT[0] === longT[0];
    }
    // >= 2 words: every leading word of the shorter must equal the longer's.
    return shortT.every((t, i) => t === longT[i]);
  });

  if (candidates.length === 1) return candidates[0].photo;
  // No candidate, or ambiguous -> prefer no photo over a wrong photo.
  return null;
}

/**
 * Resolve a usable photo path for a parsed speaker name. Matches against the
 * region's speaker index; on a confident match whose photo resolves to a real
 * file on disk, copies it into regionPhotosDir and returns the public ref.
 * Otherwise returns "" (no match, or remote URL / missing file).
 */
function resolvePhotoForName(name, index, speakersAssetsDir, regionPhotosDir, slug) {
  const recorded = matchSpeakerPhoto(name, index);
  if (!recorded) return "";
  const photoFile = resolvePhotoFile(speakersAssetsDir, recorded);
  if (!photoFile) return ""; // remote URL or missing on disk.
  fs.copyFileSync(
    path.join(speakersAssetsDir, photoFile),
    path.join(regionPhotosDir, photoFile)
  );
  return `./photos/${slug}/${photoFile}`;
}

function main() {
  // Fresh photos & postcards directories for idempotency.
  rmrf(PHOTOS_DIR);
  fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  rmrf(POSTCARDS_DIR);

  const regions = [];
  const summary = [];

  for (const slug of REGIONS) {
    const regionDir = path.join(SRC_REGIONS, slug);
    const schedulePath = path.join(regionDir, "data", "schedule.json");
    const speakersPath = path.join(regionDir, "data", "speakers.json");
    const configPath = path.join(regionDir, "data", "config.json");

    if (!fs.existsSync(schedulePath) || !fs.existsSync(configPath)) {
      summary.push(`${slug}: SKIP (missing schedule.json/config.json)`);
      continue;
    }

    const schedule = readJSON(schedulePath);
    const config = readJSON(configPath);

    // speakers.json is used ONLY to enrich parsed speakers with photos.
    // Absent -> empty index (all photos degrade to "").
    const speakerIndex = fs.existsSync(speakersPath)
      ? buildSpeakerIndex(readJSON(speakersPath))
      : [];

    // Keep schedule rows with a non-empty speaker AND a non-empty title.
    // Then dedupe on (title + speaker), preserving first-appearance order:
    // the same person with two DIFFERENT titles yields two talks; an identical
    // title+speaker appearing twice yields one.
    const seen = new Set();
    const rows = [];
    for (const row of schedule) {
      if (
        typeof row.speaker !== "string" ||
        !row.speaker.trim() ||
        typeof row.title !== "string" ||
        !row.title.trim()
      ) {
        continue;
      }
      const title = row.title.trim();
      const speaker = row.speaker.trim();
      const key = `${title}||${speaker}`;
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({ title, speaker });
    }

    if (rows.length === 0) {
      summary.push(`${slug}: dropped (0 talks)`);
      continue;
    }

    const regionPhotosDir = path.join(PHOTOS_DIR, slug);
    fs.mkdirSync(regionPhotosDir, { recursive: true });

    // Copy this edition's postcard (card background) into public/mkt/postcards/.
    let postcardRel = "";
    const postcardFile = POSTCARD_BY_REGION[slug];
    if (postcardFile) {
      const postcardAbs = path.join(regionDir, "assets", postcardFile);
      if (fs.existsSync(postcardAbs)) {
        fs.mkdirSync(POSTCARDS_DIR, { recursive: true });
        const destName = `${slug}.png`;
        fs.copyFileSync(postcardAbs, path.join(POSTCARDS_DIR, destName));
        postcardRel = `./postcards/${destName}`;
      }
    }

    const speakersAssetsDir = path.join(regionDir, "assets", "speakers");

    // Build one talk per kept row. Slugs are talk-based; collisions within a
    // region are disambiguated deterministically (-2, -3, ...).
    const usedSlugs = new Set();
    const talks = [];
    let noPhoto = 0;
    let totalSpeakers = 0;
    for (const row of rows) {
      let slugValue = slugify(row.title);
      if (usedSlugs.has(slugValue)) {
        let n = 2;
        while (usedSlugs.has(`${slugValue}-${n}`)) n += 1;
        slugValue = `${slugValue}-${n}`;
      }
      usedSlugs.add(slugValue);

      const speakers = splitSpeakers(row.speaker).map((name) => {
        const photo = resolvePhotoForName(
          name,
          speakerIndex,
          speakersAssetsDir,
          regionPhotosDir,
          slug
        );
        totalSpeakers += 1;
        if (!photo) noPhoto += 1;
        return { name, photo };
      });

      talks.push({ talk: row.title, slug: slugValue, speakers });
    }

    regions.push({
      slug,
      regionName: config.regionName ?? slug,
      city: config.location?.city ?? "",
      venue: config.location?.venue ?? "",
      targetDate: config.targetDate ?? "",
      eventTime: config.eventTime ?? "",
      postcard: postcardRel,
      talks,
    });

    summary.push(
      `${slug}: ${talks.length} card(s), ${noPhoto}/${totalSpeakers} speaker(s) without photo (placeholder)`
    );
  }

  // Copy brand assets.
  fs.mkdirSync(PUBLIC_MKT, { recursive: true });
  const logoSrc = path.join(ROOT, "src", "assets", "logo-community-day.png");
  const postcardSrc = path.join(
    SRC_REGIONS,
    "nordeste",
    "assets",
    "postcard-salvador.png"
  );
  fs.copyFileSync(logoSrc, path.join(PUBLIC_MKT, "logo-community-day.png"));
  fs.copyFileSync(postcardSrc, path.join(PUBLIC_MKT, "postcard-salvador.png"));

  const data = { regions };
  fs.writeFileSync(
    path.join(PUBLIC_MKT, "data.json"),
    JSON.stringify(data, null, 2) + "\n",
    "utf8"
  );

  // Summary.
  const totalCards = regions.reduce((n, r) => n + r.talks.length, 0);
  console.log("Marketing card data generated:");
  for (const line of summary) console.log(`  - ${line}`);
  console.log(
    `  editions emitted: ${regions.map((r) => r.slug).join(", ")}`
  );
  console.log(`  total cards: ${totalCards}`);
  console.log(`  output: ${path.relative(ROOT, path.join(PUBLIC_MKT, "data.json"))}`);
}

main();
