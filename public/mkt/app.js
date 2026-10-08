/**
 * app.js — UI wiring for the /mkt/ marketing card generator.
 *
 * Fetches ./data.json, populates edition/talk dropdowns, lets the user edit
 * the title/name, replace the photo, toggle square/story format, and download
 * the card as a PNG. Imports the shared pure drawCard() from ./card.js.
 *
 * Also exposes window.__renderCardToDataURL({region, slug, format}) used by the
 * FEAT-002 Playwright pre-generation script.
 *
 * All asset paths are RELATIVE so the page works under any VITE_BASE_URL and
 * in both `npm run dev` and the production dist/.
 */

import { drawCard, formatDatePtBR, FORMATS } from "./card.js";

const els = {
  edition: document.getElementById("edition"),
  talk: document.getElementById("talk"),
  title: document.getElementById("title-input"),
  name: document.getElementById("name-input"),
  photo: document.getElementById("photo-input"),
  photoPreview: document.getElementById("photo-preview-img"),
  fmtSquare: document.getElementById("fmt-square"),
  fmtStory: document.getElementById("fmt-story"),
  download: document.getElementById("download"),
  canvas: document.getElementById("card-canvas"),
};

const ctx = els.canvas.getContext("2d");

/** Load an image from a URL; resolves even on error (null) so draw never hangs. */
function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

const state = {
  data: null,
  region: null, // region object
  talkEntry: null, // selected talk object
  format: "square",
  logoImg: null,
  postcardImg: null,
  photoImg: null,
  customPhotoURL: null, // object URL for uploaded photo (overrides talkEntry.photo)
};

function regionBySlug(slug) {
  return state.data.regions.find((r) => r.slug === slug) || null;
}

/** Draw the current state onto the given canvas/ctx (defaults to the page canvas). */
function render(targetCtx = ctx, targetCanvas = els.canvas) {
  const dims = FORMATS[state.format] || FORMATS.square;
  if (targetCanvas.width !== dims.w) targetCanvas.width = dims.w;
  if (targetCanvas.height !== dims.h) targetCanvas.height = dims.h;

  const region = state.region;
  drawCard(targetCtx, {
    format: state.format,
    logoImg: state.logoImg,
    postcardImg: state.postcardImg,
    photoImg: state.photoImg,
    talk: els.title.value || (state.talkEntry ? state.talkEntry.talk : ""),
    speakerName: els.name.value || (state.talkEntry ? state.talkEntry.speakerName : ""),
    city: region ? region.city : "",
    dateStr: region ? formatDatePtBR(region.targetDate) : "",
  });
}

async function loadPhotoForEntry(entry) {
  // A user-uploaded photo overrides the default when present.
  if (state.customPhotoURL) {
    state.photoImg = await loadImage(state.customPhotoURL);
  } else if (entry) {
    state.photoImg = await loadImage(entry.photo);
  } else {
    state.photoImg = null;
  }
  els.photoPreview.src =
    state.customPhotoURL || (entry ? entry.photo : "");
}

function populateTalks() {
  els.talk.innerHTML = "";
  for (let i = 0; i < state.region.talks.length; i++) {
    const t = state.region.talks[i];
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = `${t.talk} — ${t.speakerName}`;
    els.talk.appendChild(opt);
  }
}

async function selectTalk(index) {
  state.talkEntry = state.region.talks[index] || null;
  // Reset any custom upload when switching talk.
  if (state.customPhotoURL) {
    URL.revokeObjectURL(state.customPhotoURL);
    state.customPhotoURL = null;
  }
  if (state.talkEntry) {
    els.title.value = state.talkEntry.talk;
    els.name.value = state.talkEntry.speakerName;
  }
  await loadPhotoForEntry(state.talkEntry);
  render();
}

async function selectEdition(slug) {
  state.region = regionBySlug(slug);
  if (!state.region) return;
  populateTalks();
  els.talk.value = "0";
  await selectTalk(0);
}

function setFormat(fmt) {
  state.format = fmt;
  els.fmtSquare.classList.toggle("active", fmt === "square");
  els.fmtStory.classList.toggle("active", fmt === "story");
  render();
}

async function init() {
  const res = await fetch("./data.json");
  state.data = await res.json();

  // Edition dropdown from data.json regions only (norte absent).
  for (const r of state.data.regions) {
    const opt = document.createElement("option");
    opt.value = r.slug;
    opt.textContent = `${r.regionName} — ${r.city}`;
    els.edition.appendChild(opt);
  }

  // Preload brand assets.
  [state.logoImg, state.postcardImg] = await Promise.all([
    loadImage("./logo-community-day.png"),
    loadImage("./postcard-salvador.png"),
  ]);

  // Ensure webfonts are ready before the first draw.
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  // Events.
  els.edition.addEventListener("change", (e) => selectEdition(e.target.value));
  els.talk.addEventListener("change", (e) =>
    selectTalk(parseInt(e.target.value, 10))
  );
  els.title.addEventListener("input", () => render());
  els.name.addEventListener("input", () => render());
  els.fmtSquare.addEventListener("click", () => setFormat("square"));
  els.fmtStory.addEventListener("click", () => setFormat("story"));

  els.photo.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (state.customPhotoURL) URL.revokeObjectURL(state.customPhotoURL);
    state.customPhotoURL = URL.createObjectURL(file);
    state.photoImg = await loadImage(state.customPhotoURL);
    els.photoPreview.src = state.customPhotoURL;
    render();
  });

  els.download.addEventListener("click", () => {
    const region = state.region ? state.region.slug : "card";
    const speakerSlug = state.talkEntry ? state.talkEntry.slug : "card";
    const filename = `${region}-${speakerSlug}-${state.format}.png`;
    els.canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  });

  // Initial selection: first edition, first talk.
  if (state.data.regions.length > 0) {
    els.edition.value = state.data.regions[0].slug;
    await selectEdition(state.data.regions[0].slug);
  }

  window.__mktReady = true;
}

/**
 * Headless render for FEAT-002 pre-generation. Loads the needed images for the
 * given region/slug, draws onto an offscreen canvas, and returns a PNG dataURL.
 *   window.__renderCardToDataURL({ region, slug, format })
 *     region: region slug (e.g. "nordeste")
 *     slug:   speaker slug (data.json talks[].slug); if a speaker shares a
 *             talk, the first matching entry is used
 *     format: "square" | "story" (default "square")
 *   -> Promise<string> dataURL ("data:image/png;base64,...")
 */
window.__renderCardToDataURL = async function (opts) {
  const { region: regionSlug, slug, format = "square" } = opts || {};
  const region = regionBySlug(regionSlug);
  if (!region) throw new Error(`Unknown region: ${regionSlug}`);
  const entry = region.talks.find((t) => t.slug === slug);
  if (!entry) throw new Error(`Unknown slug "${slug}" in region "${regionSlug}"`);

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const [logoImg, postcardImg, photoImg] = await Promise.all([
    state.logoImg ? Promise.resolve(state.logoImg) : loadImage("./logo-community-day.png"),
    state.postcardImg ? Promise.resolve(state.postcardImg) : loadImage("./postcard-salvador.png"),
    loadImage(entry.photo),
  ]);

  const dims = FORMATS[format] || FORMATS.square;
  const off = document.createElement("canvas");
  off.width = dims.w;
  off.height = dims.h;
  const offCtx = off.getContext("2d");
  drawCard(offCtx, {
    format,
    logoImg,
    postcardImg,
    photoImg,
    talk: entry.talk,
    speakerName: entry.speakerName,
    city: region.city,
    dateStr: formatDatePtBR(region.targetDate),
  });
  return off.toDataURL("image/png");
};

init().catch((err) => {
  console.error("mkt generator init failed:", err);
});
