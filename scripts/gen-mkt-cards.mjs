/**
 * Pré-geração dos cards de divulgação da edição Nordeste (FEAT-002).
 *
 * Dirige a página real `/mkt/` com Playwright e usa a MESMA lógica de desenho
 * (`drawCard` via `window.__renderCardToDataURL`) da página, garantindo paridade
 * visual. Não há implementação de desenho divergente nem dependência `canvas`.
 *
 * Uso:
 *   1. Inicie o servidor: npm run dev   (porta 8080)
 *   2. Em outro terminal: npm run gen:mkt-cards
 *      (ou: node scripts/gen-mkt-cards.mjs)
 *
 * Saída: public/mkt/cards/nordeste/<speakerSlug>-<talkSlug>.png (17 arquivos,
 * 1080×1080).
 */

import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
const REGION = "nordeste";
const FORMAT = "square";

const DATA_FILE = path.resolve(__dirname, "../public/mkt/data.json");
const OUTPUT_DIR = path.resolve(__dirname, `../public/mkt/cards/${REGION}`);

/** accent-stripped, lowercased, hyphenated slug (mesma regra do build-mkt-data). */
function slugify(str) {
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const region = data.regions.find((r) => r.slug === REGION);
  if (!region) throw new Error(`Região "${REGION}" não encontrada em data.json`);

  const talks = region.talks;
  console.log(`🗂️  ${talks.length} palestras em ${region.regionName}`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // A página desenha num canvas offscreen; viewport só precisa existir.
  await page.setViewportSize({ width: 1080, height: 1080 });

  // Carrega a página uma vez e reutiliza entre as palestras.
  await page.goto(`${BASE_URL}/mkt/`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__mktReady === true, { timeout: 30_000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);

  let count = 0;
  for (const talk of talks) {
    const speakerSlug = talk.slug;
    const talkSlug = slugify(talk.talk);
    const outFile = path.join(OUTPUT_DIR, `${speakerSlug}-${talkSlug}.png`);

    const dataUrl = await page.evaluate(
      ({ region, slug, format }) =>
        window.__renderCardToDataURL({ region, slug, format }),
      { region: REGION, slug: speakerSlug, format: FORMAT }
    );

    if (!dataUrl || !dataUrl.startsWith("data:image/png;base64,")) {
      throw new Error(`dataURL inválido para ${speakerSlug}`);
    }

    const base64 = dataUrl.slice("data:image/png;base64,".length);
    fs.writeFileSync(outFile, Buffer.from(base64, "base64"));
    count += 1;
    console.log(`  ✅  ${count.toString().padStart(2, "0")}/${talks.length}  ${path.basename(outFile)}`);
  }

  await browser.close();
  console.log(`\n🎉  ${count} cards gerados em public/mkt/cards/${REGION}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
