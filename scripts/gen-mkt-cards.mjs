/**
 * Pré-geração dos cards de divulgação para TODAS as edições (FEAT-002).
 *
 * Dirige a página real `/mkt/` com Playwright e usa a MESMA lógica de desenho
 * (`drawCard` via `window.__renderCardToDataURL`) da página, garantindo paridade
 * visual. Não há implementação de desenho divergente nem dependência `canvas`.
 *
 * Por padrão itera TODAS as regiões presentes em public/mkt/data.json. Para
 * restringir a uma única edição (fallback de conveniência), defina a variável
 * de ambiente MKT_REGION com o slug desejado (ex.: MKT_REGION=norte).
 *
 * Uso:
 *   1. Inicie o servidor: npm run dev   (porta 8080)
 *   2. Em outro terminal: npm run gen:mkt-cards
 *      (ou: node scripts/gen-mkt-cards.mjs)
 *      (ou: MKT_REGION=norte node scripts/gen-mkt-cards.mjs)
 *
 * Saída: public/mkt/cards/<region.slug>/<talkSlug>.png (um por grupo de
 * palestra; palestras com 2+ palestrantes geram UM card combinado), 1080×1080.
 */

import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";
const FORMAT = "square";

// Fallback opcional: restringe a geração a uma única edição. Vazio = todas.
const ONLY_REGION = process.env.MKT_REGION?.trim() || null;

const DATA_FILE = path.resolve(__dirname, "../public/mkt/data.json");
const CARDS_ROOT = path.resolve(__dirname, "../public/mkt/cards");

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  // Lista de regiões: todas por padrão, ou apenas a de MKT_REGION se definida.
  let regions = data.regions;
  if (ONLY_REGION) {
    const match = data.regions.find((r) => r.slug === ONLY_REGION);
    if (!match) {
      throw new Error(
        `MKT_REGION="${ONLY_REGION}" não encontrada em data.json. ` +
          `Regiões disponíveis: ${data.regions.map((r) => r.slug).join(", ")}`
      );
    }
    regions = [match];
  }

  console.log(
    `🗂️  Gerando cards para ${regions.length} edição(ões): ` +
      regions.map((r) => r.slug).join(", ")
  );

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // A página desenha num canvas offscreen; viewport só precisa existir.
  await page.setViewportSize({ width: 1080, height: 1080 });

  // Carrega a página uma vez e reutiliza entre todas as palestras/edições.
  // __renderCardToDataURL resolve a região por slug no data.json já carregado,
  // sem depender da seleção atual dos dropdowns, então é seguro iterar tudo.
  await page.goto(`${BASE_URL}/mkt/`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__mktReady === true, { timeout: 30_000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);

  let total = 0;
  for (const region of regions) {
    const talks = region.talks;
    const outputDir = path.join(CARDS_ROOT, region.slug);

    // Recria o diretório da edição para remover PNGs obsoletos (ex.: arquivos
    // antigos por palestrante) e deixar apenas um arquivo por grupo de palestra.
    fs.rmSync(outputDir, { recursive: true, force: true });
    fs.mkdirSync(outputDir, { recursive: true });

    console.log(
      `\n📁  ${region.regionName} (${region.slug}) — ${talks.length} palestra(s)`
    );

    let count = 0;
    for (const talk of talks) {
      const talkSlug = talk.slug;
      const outFile = path.join(outputDir, `${talkSlug}.png`);

      const dataUrl = await page.evaluate(
        ({ region, slug, format }) =>
          window.__renderCardToDataURL({ region, slug, format }),
        { region: region.slug, slug: talkSlug, format: FORMAT }
      );

      if (!dataUrl || !dataUrl.startsWith("data:image/png;base64,")) {
        throw new Error(`dataURL inválido para ${region.slug}/${talkSlug}`);
      }

      const base64 = dataUrl.slice("data:image/png;base64,".length);
      fs.writeFileSync(outFile, Buffer.from(base64, "base64"));
      count += 1;
      total += 1;
      console.log(
        `  ✅  ${count.toString().padStart(2, "0")}/${talks.length}  ${path.basename(outFile)}`
      );
    }
  }

  await browser.close();
  console.log(
    `\n🎉  ${total} card(s) gerado(s) em ${regions.length} edição(ões).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
