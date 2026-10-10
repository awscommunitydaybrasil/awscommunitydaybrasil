# Gerador de Cards de Divulgação (`/mkt/`)

Página standalone (HTML + ES modules, sem framework) servida em `/mkt/` que
gera cards de divulgação das palestras do AWS Community Day para redes sociais.

## O que é gerado e commitado

- `data.json` — editions + talks (gerado por `scripts/build-mkt-data.mjs`).
- `photos/<regiao>/*.jpg` — fotos dos palestrantes copiadas de `src/`.
- `logo-community-day.png`, `postcard-salvador.png` — assets de marca.
- `cards/nordeste/*.png` — 17 cards 1080×1080 pré-gerados (via
  `scripts/gen-mkt-cards.mjs`, requer dev server — entregue na FEAT-002).

> `card.js` e `app.js` são código-fonte (não gerados). `drawCard()` em
> `card.js` é puro (recebe `Image` já carregadas, sem acesso ao DOM) e é
> reutilizado tanto na página quanto na pré-geração headless.

## Como re-gerar

### 1. Dados + assets

Do diretório raiz do worktree:

```bash
node scripts/build-mkt-data.mjs
# ou
npm run build:mkt-data
```

Lê `src/regions/<r>/data/{speakers.json,config.json}` para
`centro-oeste, nordeste, sudeste, sul` (ignora `regiaomodelo`; descarta `norte`
por não ter palestras), copia fotos/assets para `public/mkt/` e escreve
`public/mkt/data.json`. Idempotente.

### 2. Cards pré-gerados (precisa do dev server) — FEAT-002

```bash
npm run dev            # terminal A (porta 8080)
npm run gen:mkt-cards  # terminal B
# ou: node scripts/gen-mkt-cards.mjs
```

Dirige a página real `/mkt/` com Playwright e salva os 17 cards de Nordeste em
`public/mkt/cards/nordeste/`.

## Uso da página

Abra `http://localhost:8080/mkt/` (dev) ou `/mkt/` no build de produção:

1. Escolha a **edição** e a **palestra**.
2. Edite o **título** e o **nome** do palestrante se quiser.
3. **Confirme ou troque a foto** (upload de uma imagem local).
4. Alterne o **formato** (Feed 1:1 ou Story 9:16).
5. Clique em **Baixar PNG** — arquivo `<regiao>-<palestrante>-<formato>.png`.

## API headless

`window.__renderCardToDataURL({ region, slug, format })` → `Promise<string>`
(dataURL PNG). Usado pela pré-geração (FEAT-002). `format` é `"square"`
(padrão) ou `"story"`.
