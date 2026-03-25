

## Plano: Botão CTA "Call for Speakers" nas páginas regionais

### 1. `src/regions/types.ts`
Adicionar campo opcional `callForSpeakersUrl?: string` no `RegionConfig`.

### 2. `src/regions/centro-oeste/data/config.json` (e demais configs)
Adicionar campo `"callForSpeakersUrl": ""` em cada config regional. Quando preenchido com URL, o botão aparece; vazio = não aparece.

### 3. `src/regions/RegionPage.tsx`
Entre `<RegionHero>` e `<InfoCardsSection>`, adicionar um bloco condicional:
- Se `config.callForSpeakersUrl` existir e não for vazio, renderizar uma `<section>` centralizada com um botão/link CTA estilizado (fundo primário, texto bold, ícone de microfone, `target="_blank"`).
- Texto: "Call for Speakers" ou "Submeta sua palestra".
- Responsivo com padding adequado (`py-6`, centralizado com `text-center`).

### 4. `src/regions/regiaomodelo/data/config.json`
Colocar uma URL de exemplo para validação visual (ex: `"callForSpeakersUrl": "https://sessionize.com/exemplo"`).

### Arquivos a modificar
- `src/regions/types.ts` — novo campo
- `src/regions/RegionPage.tsx` — CTA condicional
- `src/regions/*/data/config.json` (6 configs) — adicionar campo vazio
- `src/regions/regiaomodelo/data/config.json` — URL de exemplo

