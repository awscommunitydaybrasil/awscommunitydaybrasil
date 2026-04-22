/**
 * Script para gerar og:images de cada página de região via screenshot do Playwright.
 *
 * Uso:
 *   1. Inicie o servidor: npm run dev  (ou npm run preview após npm run build)
 *   2. Em outro terminal: npm run gen:og
 *
 * As imagens serão salvas em public/og/{rota}.png (1200x630px).
 */

import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";

const OUTPUT_DIR = path.resolve(__dirname, "../public/og");

const ROUTES: { path: string; label: string }[] = [
  { path: "/centro-oeste", label: "centro-oeste" },
  { path: "/nordeste",     label: "nordeste"     },
  { path: "/norte",        label: "norte"        },
  { path: "/sudeste",      label: "sudeste"      },
  { path: "/sul",          label: "sul"          },
];

/** Dimensões padrão de og:image */
const WIDTH  = 1200;
const HEIGHT = 630;

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const page    = await browser.newPage();

  await page.setViewportSize({ width: WIDTH, height: HEIGHT });

  for (const route of ROUTES) {
    const url      = `${BASE_URL}${route.path}`;
    const outFile  = path.join(OUTPUT_DIR, `${route.label}.png`);

    console.log(`📸  Capturando ${url} → public/og/${route.label}.png`);

    await page.goto(url, { waitUntil: "networkidle" });

    // Aguarda a hero section carregar (título da região)
    await page.waitForSelector("h1", { timeout: 10_000 }).catch(() => {});

    // Remove o header fixo e o banner de CTA para não poluir a imagem
    await page.evaluate(() => {
      document.querySelectorAll("header, nav").forEach((el) => {
        (el as HTMLElement).style.display = "none";
      });
    });

    await page.screenshot({ path: outFile, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });

    console.log(`    ✅  Salvo em ${outFile}`);
  }

  await browser.close();
  console.log("\n🎉  Todas as og:images geradas em public/og/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
