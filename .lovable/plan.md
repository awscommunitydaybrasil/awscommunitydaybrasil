

## Plano: Aplicar keynote, ordenação e redes sociais na RegionPage.tsx

### Arquivo: `src/regions/RegionPage.tsx`

**1. Adicionar imports** (topo do arquivo):
- `Star`, `Linkedin`, `Instagram` de `lucide-react`

**2. Seção Palestrantes (linhas 180-207)**: Replicar a mesma lógica do `RegiaoModeloPage.tsx`:
- Ordenar speakers: keynotes primeiro, depois alfabético por nome
- Adicionar badge "Keynote" com estrela dourada
- Estilizar card de keynote com `border-primary/40 ring-1 ring-primary/20`
- Adicionar ícones sociais (LinkedIn, Instagram, X) condicionalmente
- Manter o comportamento existente: seção só aparece se `speakers.length > 0`

**3. Manter cards "Em Breve"**: As seções de programação (linhas 214-230) e patrocinadores (linhas 234-252) já exibem cards "Em Breve" quando vazias — nenhuma alteração necessária nessas seções.

### Arquivos NÃO alterados
- `types.ts` — já possui `keynote` e `social` (atualizado anteriormente)
- JSONs regionais — mantêm-se como estão (arrays vazios ou com dados)

