

## Plano: Mover assets regionais e atualizar links da página Brasil

### O que será feito

1. **Mover imagens regionais para pastas específicas** — copiar cada postcard da pasta `src/assets/` para `src/regions/[regiao]/assets/`:
   - `postcard-brasilia.png` → `src/regions/centro-oeste/assets/`
   - `postcard-salvador.png` → `src/regions/nordeste/assets/`
   - `postcard-belem.png` → `src/regions/norte/assets/`
   - `postcard-bh.png` → `src/regions/sudeste/assets/`
   - `postcard-curitiba.png` → `src/regions/sul/assets/`

2. **Atualizar imports nas páginas regionais** — cada `regions/[regiao]/index.tsx` passará a importar o heroImage de `./assets/` em vez de `@/assets/`.

3. **Atualizar links da LeadersSection** — todos os cards na home que apontam para `#` ou links externos serão atualizados para rotas internas (`/nordeste`, `/norte`, `/sul`).

4. **Atualizar config.json de cada região** — campo `heroImage` apontará para o path local.

5. **Imagens globais permanecem em `src/assets/`** — logo, community-illustration e region-*.jpg (usados na home) ficam onde estão.

### Detalhes técnicos

**Arquivos modificados:**
- `src/regions/centro-oeste/index.tsx` — import de `./assets/postcard-brasilia.png`
- `src/regions/nordeste/index.tsx` — import de `./assets/postcard-salvador.png`
- `src/regions/norte/index.tsx` — import de `./assets/postcard-belem.png`
- `src/regions/sudeste/index.tsx` — import de `./assets/postcard-bh.png`
- `src/regions/sul/index.tsx` — import de `./assets/postcard-curitiba.png`
- `src/components/LeadersSection.tsx` — links de Nordeste (`/nordeste`), Sul (`/sul`), Norte (`/norte`) em vez de `#`; Sudeste para `/sudeste` em vez do link externo
- 5x `config.json` — atualizar campo heroImage

**Arquivos criados (cópia de assets):**
- `src/regions/centro-oeste/assets/postcard-brasilia.png`
- `src/regions/nordeste/assets/postcard-salvador.png`
- `src/regions/norte/assets/postcard-belem.png`
- `src/regions/sudeste/assets/postcard-bh.png`
- `src/regions/sul/assets/postcard-curitiba.png`

