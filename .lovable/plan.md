

## Plano: Página do Centro-Oeste

Criar uma página dedicada à edição Centro-Oeste (Brasília) do AWS Community Day, seguindo o tema escuro da página principal, com identidade visual do Centro-Oeste.

### Arquivos a criar/editar

**1. `src/pages/CentroOeste.tsx`** — Página principal com as seções:

- **Header**: Reutilizar o Header existente, adicionando link "Voltar" para home
- **Hero**: Fundo com postcard de Brasília (`postcard-brasilia.png`), logo do Community Day, subtítulo "Edição Centro-Oeste · Brasília", descrição do evento
- **Info Cards**: 3 cards (Local: "Em Breve! Taguatinga/DF", Data: "Em Breve!", Inscrições: em breve)
- **O que esperar**: 4 cards (Inspiração, Networking, Conteúdo para Todos, Responsabilidade Social) — ícones SVG inline
- **Programação**: Seção com texto "Em Breve!" (a grade está comentada no HTML original)
- **Patrocinadores**: Seção com texto aguardando (comentado no original)
- **Organizadores**: Grid com 4 organizadores — Priscila Araujo, Wagner Landim, Deivid Veras, Marcelo Paiva — com fotos e links LinkedIn
- **Edições Anteriores**: Lista das edições passadas (Set 2025, Nov 2024, 2023, 2022, 2021, 2020)
- **Footer**: Reutilizar Footer existente

**2. `src/App.tsx`** — Adicionar rota `/centro-oeste`

**3. `src/components/LeadersSection.tsx`** — Atualizar o link do Centro-Oeste de externo para `/centro-oeste`

### Identidade visual Centro-Oeste
- Cor de destaque: manter o `--primary` (laranja AWS) como cor principal
- Hero usa `postcard-brasilia.png` como background com overlay escuro
- Todas as seções seguem o tema escuro (`bg-background`, `bg-secondary`)
- Animações de scroll com o hook `useScrollAnimation` existente
- Cards com `bg-card`, bordas sutis, hover effects

### Dados extraídos do HTML original
- Organizadores com fotos de URLs externas do site oficial
- Programação marcada como "Em Breve"
- Patrocinadores marcados como "Em Breve"
- Edições anteriores: 6 itens com links para YouTube/site

