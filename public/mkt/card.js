/**
 * card.js — Shared canvas drawing for the /mkt/ marketing card generator.
 *
 * Pure drawing: drawCard(ctx, opts) takes already-loaded Image objects and
 * does NO DOM lookups, so it is reusable both on the page and headless
 * (Playwright). Implements two layouts: square 1080x1080 and story 1080x1920.
 *
 * Brand (from src/index.css CSS vars):
 *   navy background  #0d1526   (--background 222 47% 11%)
 *   card surface     #1e293b   (--card 217 33% 17%)
 *   AWS orange       #ff8c00   (--primary 32 100% 50%)
 *   white            #ffffff   (--foreground)
 *   muted            #94a3b8   (--muted-foreground 215 20% 65%)
 * Fonts: Montserrat (display/headings), Inter (body).
 */

export const COLORS = {
  navy: "#0d1526",
  card: "#1e293b",
  orange: "#ff8c00",
  orangeDeep: "#e67300", // hsl(25 100% 45%) for CTA gradient end
  white: "#ffffff",
  muted: "#94a3b8",
};

export const FORMATS = {
  square: { w: 1080, h: 1080 },
  story: { w: 1080, h: 1920 },
};

/** Format an ISO date string (or Date) to DD/MM/YYYY (pt-BR). */
export function formatDatePtBR(input) {
  if (!input) return "";
  const d = input instanceof Date ? input : new Date(input);
  if (isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Draw a circular, cover-fit image centered at (cx, cy) with the given radius.
 * Mirrors object-fit: cover — the image is scaled to fill the circle and
 * center-cropped.
 */
export function drawCircleImageCover(ctx, img, cx, cy, radius) {
  if (!img || !img.width || !img.height) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  const d = radius * 2;
  const scale = Math.max(d / img.width, d / img.height);
  const sw = img.width * scale;
  const sh = img.height * scale;
  ctx.drawImage(img, cx - sw / 2, cy - sh / 2, sw, sh);
  ctx.restore();
}

/** Draw image as cover-fit inside the rect (x,y,w,h), center-cropped. */
function drawImageCoverRect(ctx, img, x, y, w, h) {
  if (!img || !img.width || !img.height) return;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  const scale = Math.max(w / img.width, h / img.height);
  const sw = img.width * scale;
  const sh = img.height * scale;
  ctx.drawImage(img, x + w / 2 - sw / 2, y + h / 2 - sh / 2, sw, sh);
  ctx.restore();
}

/** Wrap `text` into lines that fit `maxWidth` at the current ctx.font. */
function wrapText(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width <= maxWidth || !current) {
      current = test;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Truncate a single line with an ellipsis so it fits maxWidth. */
function ellipsize(ctx, line, maxWidth) {
  if (ctx.measureText(line).width <= maxWidth) return line;
  let s = line;
  while (s.length > 1 && ctx.measureText(s + "…").width > maxWidth) {
    s = s.slice(0, -1);
  }
  return s.replace(/\s+$/, "") + "…";
}

/**
 * Fit `text` into a box: shrink the font from startSize (2px steps) until the
 * wrapped text fits maxLines within maxWidth; if still too tall at minSize,
 * clamp to maxLines and ellipsize the last line. Returns { lines, fontSize }.
 */
export function fitText(ctx, text, {
  fontFamily,
  fontWeight = "700",
  startSize,
  minSize,
  maxWidth,
  maxLines,
}) {
  let size = startSize;
  let lines = [];
  while (size >= minSize) {
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
    lines = wrapText(ctx, text, maxWidth);
    if (lines.length <= maxLines) break;
    size -= 2;
  }
  if (lines.length > maxLines) {
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
    lines = lines.slice(0, maxLines);
    lines[maxLines - 1] = ellipsize(ctx, lines[maxLines - 1], maxWidth);
  }
  return { lines, fontSize: size };
}

/** Draw an orange ring + glow around a circle (matches SpeakerCard styling). */
function drawPhotoRing(ctx, cx, cy, radius, ringWidth) {
  ctx.save();
  // Glow.
  ctx.shadowColor = "rgba(255,140,0,0.45)";
  ctx.shadowBlur = 40;
  ctx.beginPath();
  ctx.arc(cx, cy, radius + ringWidth / 2, 0, Math.PI * 2);
  ctx.lineWidth = ringWidth;
  ctx.strokeStyle = COLORS.orange;
  ctx.stroke();
  ctx.restore();
}

/** Vertical linear gradient navy scrim helper. */
function navyGradient(ctx, x, y, w, h, stops) {
  const g = ctx.createLinearGradient(x, y, x, y + h);
  for (const [offset, color] of stops) g.addColorStop(offset, color);
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
}

/**
 * drawCard(ctx, opts)
 *   opts = {
 *     format: "square" | "story",
 *     logoImg, postcardImg, photoImg,   // loaded Image objects (photoImg optional)
 *     talk, speakerName, city, dateStr, // strings
 *   }
 * Draws the full card onto ctx. Caller sizes the canvas to FORMATS[format].
 */
export function drawCard(ctx, opts) {
  const {
    format = "square",
    logoImg,
    postcardImg,
    photoImg,
    talk = "",
    speakerName = "",
    city = "",
    dateStr = "",
  } = opts || {};

  const { w, h } = FORMATS[format] || FORMATS.square;

  // Base navy fill.
  ctx.fillStyle = COLORS.navy;
  ctx.fillRect(0, 0, w, h);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  if (format === "story") {
    drawStory(ctx, { w, h, logoImg, postcardImg, photoImg, talk, speakerName, city, dateStr });
  } else {
    drawSquare(ctx, { w, h, logoImg, postcardImg, photoImg, talk, speakerName, city, dateStr });
  }
}

function drawLogo(ctx, logoImg, centerX, topY, targetH) {
  if (!logoImg || !logoImg.width) return;
  const scale = targetH / logoImg.height;
  const lw = logoImg.width * scale;
  ctx.drawImage(logoImg, centerX - lw / 2, topY, lw, targetH);
}

function editionLine(regionCity, dateStr) {
  const parts = ["AWS Community Day"];
  if (regionCity) parts.push(regionCity);
  if (dateStr) parts.push(dateStr);
  return parts.join("  ·  ");
}

function drawSquare(ctx, o) {
  const { w, logoImg, postcardImg, photoImg, talk, speakerName, city, dateStr } = o;

  // Postcard top band 0..360 cover with navy scrim.
  const bandH = 360;
  drawImageCoverRect(ctx, postcardImg, 0, 0, w, bandH);
  navyGradient(ctx, 0, 0, w, bandH, [
    [0, "rgba(13,21,38,0.55)"],
    [0.5, "rgba(13,21,38,0.25)"],
    [1, "rgba(13,21,38,0.95)"],
  ]);

  // Logo over the band.
  drawLogo(ctx, logoImg, w / 2, 40, 70);

  // Speaker photo circle d=300 center (540,430).
  const cx = 540, cy = 430, r = 150;
  drawPhotoRing(ctx, cx, cy, r, 8);
  if (photoImg) {
    drawCircleImageCover(ctx, photoImg, cx, cy, r);
  } else {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.card;
    ctx.fill();
    ctx.restore();
  }

  // Talk title box x[90,990], start y ~640, max 3 lines.
  const boxX = 90, boxW = 990 - 90;
  const title = fitText(ctx, talk, {
    fontFamily: "Montserrat",
    fontWeight: "700",
    startSize: 60,
    minSize: 28,
    maxWidth: boxW,
    maxLines: 3,
  });
  ctx.fillStyle = COLORS.white;
  ctx.font = `700 ${title.fontSize}px Montserrat`;
  const lineH = Math.round(title.fontSize * 1.18);
  let ty = 640 + title.fontSize;
  for (const line of title.lines) {
    ctx.fillText(line, boxX + boxW / 2, ty);
    ty += lineH;
  }

  // Speaker name orange ~44px, below title (anchor ~900 but keep below title).
  const nameY = Math.max(900, ty + 20);
  ctx.fillStyle = COLORS.orange;
  ctx.font = "700 44px Montserrat";
  ctx.fillText(ellipsize(ctx, speakerName, boxW), w / 2, nameY);

  // Edition/date line muted Inter ~30px.
  ctx.fillStyle = COLORS.muted;
  ctx.font = "500 30px Inter";
  ctx.fillText(editionLine(city, dateStr), w / 2, nameY + 48);
}

function drawStory(ctx, o) {
  const { w, h, logoImg, postcardImg, photoImg, talk, speakerName, city, dateStr } = o;

  // Postcard full-width top 0..720 cover, gradient to navy.
  const bandH = 720;
  drawImageCoverRect(ctx, postcardImg, 0, 0, w, bandH);
  navyGradient(ctx, 0, 0, w, bandH, [
    [0, "rgba(13,21,38,0.45)"],
    [0.55, "rgba(13,21,38,0.35)"],
    [1, "rgba(13,21,38,1)"],
  ]);

  // Logo ~y=90 height ~90.
  drawLogo(ctx, logoImg, w / 2, 90, 90);

  // Speaker photo circle d=420 center (540,760).
  const cx = 540, cy = 760, r = 210;
  drawPhotoRing(ctx, cx, cy, r, 10);
  if (photoImg) {
    drawCircleImageCover(ctx, photoImg, cx, cy, r);
  } else {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.card;
    ctx.fill();
    ctx.restore();
  }

  // Talk title box x[110,970] start y ~1120 max 4 lines, start 76px.
  const boxX = 110, boxW = 970 - 110;
  const title = fitText(ctx, talk, {
    fontFamily: "Montserrat",
    fontWeight: "700",
    startSize: 76,
    minSize: 34,
    maxWidth: boxW,
    maxLines: 4,
  });
  ctx.fillStyle = COLORS.white;
  ctx.font = `700 ${title.fontSize}px Montserrat`;
  const lineH = Math.round(title.fontSize * 1.18);
  let ty = 1120 + title.fontSize;
  for (const line of title.lines) {
    ctx.fillText(line, boxX + boxW / 2, ty);
    ty += lineH;
  }

  // Speaker name orange ~56px ~y=1560 (keep below title).
  const nameY = Math.max(1560, ty + 30);
  ctx.fillStyle = COLORS.orange;
  ctx.font = "700 56px Montserrat";
  ctx.fillText(ellipsize(ctx, speakerName, boxW), w / 2, nameY);

  // Edition/date line muted Inter ~38px ~y=1660.
  ctx.fillStyle = COLORS.muted;
  ctx.font = "500 38px Inter";
  ctx.fillText(editionLine(city, dateStr), w / 2, nameY + 60);

  // Footer orange CTA-gradient bar with site URL.
  const barH = 110;
  const barY = h - barH;
  const g = ctx.createLinearGradient(0, barY, w, barY);
  g.addColorStop(0, COLORS.orange);
  g.addColorStop(1, COLORS.orangeDeep);
  ctx.fillStyle = g;
  ctx.fillRect(0, barY, w, barH);
  ctx.fillStyle = COLORS.white;
  ctx.font = "600 40px Inter";
  ctx.textBaseline = "middle";
  ctx.fillText("awscommunityday.com.br", w / 2, barY + barH / 2);
  ctx.textBaseline = "alphabetic";
}
