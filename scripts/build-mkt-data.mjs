/**
 * build-mkt-data.mjs — Data pipeline for the /mkt/ marketing card generator.
 *
 * Reads each region's speakers.json + config.json, keeps speakers with a
 * non-empty talk, drops regions with 0 talks, copies the kept speaker photos
 * and the two brand assets into public/mkt/, and emits public/mkt/data.json.
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

function main() {
  // Fresh photos & postcards directories for idempotency.
  rmrf(PHOTOS_DIR);
  fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  rmrf(POSTCARDS_DIR);

  const regions = [];
  const summary = [];

  for (const slug of REGIONS) {
    const regionDir = path.join(SRC_REGIONS, slug);
    const speakersPath = path.join(regionDir, "data", "speakers.json");
    const configPath = path.join(regionDir, "data", "config.json");

    if (!fs.existsSync(speakersPath) || !fs.existsSync(configPath)) {
      summary.push(`${slug}: SKIP (missing speakers.json/config.json)`);
      continue;
    }

    const speakers = readJSON(speakersPath);
    const config = readJSON(configPath);

    // Keep speakers with a non-empty talk string.
    const kept = speakers.filter(
      (s) => typeof s.talk === "string" && s.talk.trim().length > 0
    );

    if (kept.length === 0) {
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
    const talks = [];
    for (const s of kept) {
      // The filename recorded in speakers.json may use a different image
      // extension than the file actually on disk (e.g. .jpg recorded but
      // .png/.jpeg present). src/ is read-only, so resolve the real file
      // here and emit the entry using the actual copied filename.
      const photoFile = resolvePhotoFile(speakersAssetsDir, s.photo);
      if (!photoFile) {
        throw new Error(
          `Missing photo for ${slug}/${s.name}: ${path.join(
            speakersAssetsDir,
            s.photo
          )}`
        );
      }
      fs.copyFileSync(
        path.join(speakersAssetsDir, photoFile),
        path.join(regionPhotosDir, photoFile)
      );

      talks.push({
        speakerName: s.name,
        talk: s.talk,
        photo: `./photos/${slug}/${photoFile}`,
        slug: slugify(s.name),
      });
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

    summary.push(`${slug}: ${talks.length} card(s)`);
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
