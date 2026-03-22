

## Plano: Reestruturar projeto por regiões com dados JSON

### Objetivo
Criar uma estrutura de pastas organizada por região, onde cada região tem seus próprios dados (JSON) e página, permitindo que pessoas diferentes editem cada região independentemente.

### Nova estrutura de pastas

```text
src/
  regions/
    types.ts                    # Tipos TypeScript compartilhados
    centro-oeste/
      data/
        config.json             # Dados gerais: nome, data, local, countdown, links
        organizers.json         # Organizadores
        speakers.json           # Palestrantes (vazio por enquanto)
        schedule.json           # Programação (vazio por enquanto)
        sponsors.json           # Patrocinadores (vazio por enquanto)
      assets/                   # Imagens específicas da região
      index.tsx                 # Página principal (refatorada do CentroOeste.tsx)
    nordeste/
      data/
        config.json
        organizers.json
        speakers.json
        schedule.json
        sponsors.json
      assets/
      index.tsx
    norte/
      data/  (mesma estrutura)
      assets/
      index.tsx
    sudeste/
      data/  (mesma estrutura)
      assets/
      index.tsx
    sul/
      data/  (mesma estrutura)
      assets/
      index.tsx
```

### Detalhes técnicos

**1. Tipos compartilhados (`types.ts`)**
- Interfaces: `RegionConfig`, `Organizer`, `Speaker`, `ScheduleItem`, `Sponsor`
- `RegionConfig` inclui: nome, subtítulo, data do evento, local, cidade, links de redes sociais, user groups, contato

**2. Arquivos JSON por região**
- `config.json`: nome da região, data-alvo do countdown, local, cidade/UF, links de footer (redes sociais, user groups, contato, código de conduta)
- `organizers.json`: array com {name, photo, linkedin}
- `speakers.json`: array com {name, photo, title, company, talk, bio} — vazio inicialmente exceto centro-oeste
- `schedule.json`: array com {time, title, speaker, track} — vazio inicialmente
- `sponsors.json`: array com {name, logo, url, tier} — vazio inicialmente

**3. Componente de página regional reutilizável**
- Criar `src/regions/RegionPage.tsx` — componente genérico que recebe os dados JSON e renderiza a página completa (hero, countdown, info cards, expectations, programação, patrocinadores, organizadores, footer)
- Cada `regions/[regiao]/index.tsx` simplesmente importa seus JSONs e passa para `RegionPage`

**4. Rotas**
- Atualizar `App.tsx` com rotas: `/centro-oeste`, `/nordeste`, `/norte`, `/sudeste`, `/sul`
- Atualizar `BrazilMapSVG.tsx` com os links internos para cada região

**5. Migração**
- Extrair dados hardcoded de `CentroOeste.tsx` para os JSONs
- Deletar `src/pages/CentroOeste.tsx` (substituído por `src/regions/centro-oeste/index.tsx`)
- Demais regiões terão JSONs com dados placeholder ("Em Breve")

### O que NÃO muda
- Página principal (`Index.tsx`) e seus componentes globais permanecem intactos
- Header e componentes UI compartilhados ficam onde estão

