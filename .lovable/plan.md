

## Plano: Adicionar fotos dos organizadores Centro-Oeste

### O que será feito

1. **Copiar 4 imagens** para `src/regions/centro-oeste/assets/`:
   - `user-uploads://deivid.jpg` → `deivid.jpg`
   - `user-uploads://paiva.jpg` → `marcelopaiva.jpg`
   - `user-uploads://priscilla.jpg` → `priscila.jpg`
   - `user-uploads://wagner.jpg` → `wagner.jpg`

2. **Atualizar `organizers.json`** — trocar as URLs externas por imports locais. Como JSON não suporta imports, será necessário ajustar o `index.tsx` da região para processar os caminhos locais, ou converter o `photo` para paths relativos que serão resolvidos via import no componente.

### Detalhes técnicos

Como JSONs não suportam `import`, a abordagem será:
- Salvar as fotos nos assets da região
- No `organizers.json`, usar nomes de arquivo simples (ex: `"photo": "deivid.jpg"`)
- No `src/regions/centro-oeste/index.tsx`, importar as imagens e criar um mapeamento, ou alternativamente importar os organizadores diretamente com as fotos já mapeadas
- Atualizar `RegionPage.tsx` para aceitar organizadores com fotos já resolvidas

**Alternativa mais simples**: manter as fotos como imports estáticos no `index.tsx` e sobrescrever o campo `photo` dos organizadores antes de passar ao `RegionPage`. Isso mantém o JSON limpo e os assets corretamente bundled pelo Vite.

### Arquivos modificados
- `src/regions/centro-oeste/data/organizers.json` — campo photo com nome do arquivo
- `src/regions/centro-oeste/index.tsx` — importar imagens e mapear nos organizadores

### Arquivos criados
- `src/regions/centro-oeste/assets/deivid.jpg`
- `src/regions/centro-oeste/assets/marcelopaiva.jpg`
- `src/regions/centro-oeste/assets/priscila.jpg`
- `src/regions/centro-oeste/assets/wagner.jpg`

