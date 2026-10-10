/**
 * app.js — UI wiring for the /mkt/ marketing card generator.
 *
 * Fetches ./data.json, populates edition/talk dropdowns, lets the user edit
 * the title and EACH speaker's name, replace EACH speaker's photo, toggle
 * square/story format, and download the card as a PNG. A talk with 2+ speakers
 * renders ONE combined card. Imports the shared pure drawCard() from ./card.js.
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
  speakers: document.getElementById("speakers"),
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
  talkEntry: null, // selected talk group object { talk, slug, speakers: [] }
  format: "square",
  logoImg: null,
  postcardImg: null,
  // Per-speaker UI state, parallel to talkEntry.speakers.
  // Each: { name, defaultPhoto, customPhotoURL, photoImg, nameInput, photoInput, previewImg }
  speakers: [],
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
    speakers: state.speakers.map((s) => ({
      photoImg: s.photoImg,
      name: s.nameInput ? s.nameInput.value : s.name,
    })),
    talk: els.title.value || (state.talkEntry ? state.talkEntry.talk : ""),
    city: region ? region.city : "",
    dateStr: region ? formatDatePtBR(region.targetDate) : "",
  });
}

/** Build the per-speaker UI (name input + photo-replace control) and load photos. */
function buildSpeakerControls() {
  // Revoke any previous object URLs before rebuilding.
  for (const s of state.speakers) {
    if (s.customPhotoURL) URL.revokeObjectURL(s.customPhotoURL);
  }
  els.speakers.innerHTML = "";
  state.speakers = [];

  const group = state.talkEntry;
  if (!group) return;

  group.speakers.forEach((sp, i) => {
    const entry = {
      name: sp.name,
      defaultPhoto: sp.photo,
      customPhotoURL: null,
      photoImg: null,
      nameInput: null,
      photoInput: null,
      previewImg: null,
    };

    const single = group.speakers.length === 1;
    const nameLabel = single ? "Nome do palestrante" : `Palestrante ${i + 1}`;

    const field = document.createElement("div");
    field.className = "field speaker-field";

    const nameFieldLabel = document.createElement("label");
    nameFieldLabel.textContent = nameLabel;
    field.appendChild(nameFieldLabel);

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = sp.name;
    nameInput.addEventListener("input", () => render());
    field.appendChild(nameInput);
    entry.nameInput = nameInput;

    const photoRow = document.createElement("div");
    photoRow.className = "photo-preview";

    const previewImg = document.createElement("img");
    previewImg.alt = `Prévia da foto de ${sp.name}`;
    previewImg.src = sp.photo;
    photoRow.appendChild(previewImg);
    entry.previewImg = previewImg;

    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoInput.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (entry.customPhotoURL) URL.revokeObjectURL(entry.customPhotoURL);
      entry.customPhotoURL = URL.createObjectURL(file);
      entry.photoImg = await loadImage(entry.customPhotoURL);
      previewImg.src = entry.customPhotoURL;
      render();
    });
    photoRow.appendChild(photoInput);
    entry.photoInput = photoInput;

    field.appendChild(photoRow);
    els.speakers.appendChild(field);

    state.speakers.push(entry);
  });
}

async function loadSpeakerPhotos() {
  await Promise.all(
    state.speakers.map(async (s) => {
      const src = s.customPhotoURL || s.defaultPhoto;
      s.photoImg = await loadImage(src);
    })
  );
}

function populateTalks() {
  els.talk.innerHTML = "";
  for (let i = 0; i < state.region.talks.length; i++) {
    const t = state.region.talks[i];
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = `${t.talk} — ${t.speakers.map((s) => s.name).join(", ")}`;
    els.talk.appendChild(opt);
  }
}

async function selectTalk(index) {
  state.talkEntry = state.region.talks[index] || null;
  if (state.talkEntry) {
    els.title.value = state.talkEntry.talk;
  }
  buildSpeakerControls();
  await loadSpeakerPhotos();
  render();
}

async function selectEdition(slug) {
  state.region = regionBySlug(slug);
  if (!state.region) return;
  // Load this edition's postcard background (fallback to Salvador postcard).
  state.postcardImg = await loadImage(
    state.region.postcard || "./postcard-salvador.png"
  );
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

  // Preload brand logo. The postcard background is per-edition and loaded
  // when an edition is selected (with the Salvador postcard as fallback).
  state.logoImg = await loadImage("./logo-community-day.png");

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
  els.fmtSquare.addEventListener("click", () => setFormat("square"));
  els.fmtStory.addEventListener("click", () => setFormat("story"));

  els.download.addEventListener("click", () => {
    const region = state.region ? state.region.slug : "card";
    const talkSlug = state.talkEntry ? state.talkEntry.slug : "card";
    const filename = `${region}-${talkSlug}-${state.format}.png`;
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
 * Headless render for FEAT-002 pre-generation. Loads ALL speaker photos for the
 * given region/slug group, draws onto an offscreen canvas, and returns a PNG
 * dataURL.
 *   window.__renderCardToDataURL({ region, slug, format })
 *     region: region slug (e.g. "nordeste")
 *     slug:   talk group slug (data.json talks[].slug)
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

  const logoImg = state.logoImg
    ? state.logoImg
    : await loadImage("./logo-community-day.png");
  const postcardImg = await loadImage(
    region.postcard || "./postcard-salvador.png"
  );
  const speakerImgs = await Promise.all(
    entry.speakers.map((s) => loadImage(s.photo))
  );
  const speakers = entry.speakers.map((s, i) => ({
    photoImg: speakerImgs[i],
    name: s.name,
  }));

  const dims = FORMATS[format] || FORMATS.square;
  const off = document.createElement("canvas");
  off.width = dims.w;
  off.height = dims.h;
  const offCtx = off.getContext("2d");
  drawCard(offCtx, {
    format,
    logoImg,
    postcardImg,
    speakers,
    talk: entry.talk,
    city: region.city,
    dateStr: formatDatePtBR(region.targetDate),
  });
  return off.toDataURL("image/png");
};

init().catch((err) => {
  console.error("mkt generator init failed:", err);
});
