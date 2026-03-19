

## Plano: Mapa SVG do Brasil + Seção de Líderes Regionais

### Visão Geral
Substituir os cards de regiões pelo mapa SVG interativo do Brasil (extraído do HTML original) e criar uma nova seção de Líderes Regionais abaixo, com fotos de cartão-postal de cada cidade como background.

### Mudanças

**1. `src/components/RegionsSection.tsx` — Redesenho completo**
- Remover os cards atuais de região
- Inserir o SVG do mapa do Brasil como componente React (`BrazilMapSVG`)
- Colorir cada região com as cores do site original (Norte: roxo, Nordeste: laranja, Centro-Oeste: amarelo, Sudeste: cinza-azulado, Sul: azul-escuro)
- Adicionar interatividade: hover muda brilho da região, clique leva ao link do evento
- Adicionar marcadores de pin nas cidades-sede (Belém, Salvador, Brasília, BH, Curitiba)
- Manter título "Edições 2026" e subtítulo "5 regiões, 1 comunidade"

**2. `src/components/LeadersSection.tsx` — Novo componente**
- Criar seção "Líderes Regionais" com 5 cards
- Cada card terá:
  - Imagem de fundo: cartão-postal da cidade (usando Unsplash URLs para fotos icônicas: Catedral de Brasília, Praça da Liberdade/BH, Pelourinho/Salvador, Jardim Botânico/Curitiba, Ver-o-Peso/Belém)
  - Overlay escuro gradiente
  - Foto do líder (circular, com borda)
  - Nome do líder e LinkedIn
  - Nome da região e cidade
- Layout: 3 cards na primeira linha + 2 centralizados na segunda (como o atual)
- Hover: escala da imagem de fundo + borda accent

**3. `src/pages/Index.tsx`**
- Importar e adicionar `LeadersSection` entre `RegionsSection` e `PastEditionsSection`

### Dados dos Líderes (mantidos do código atual)
- Centro-Oeste: Wagner Landim (Brasília)
- Sudeste: Rafaela Vidotti (Belo Horizonte)  
- Nordeste: Caio Nunes (Salvador)
- Sul: Alceu Neto (Curitiba)
- Norte: Thayana Mamoré (Belém)

### Imagens de Cartão-Postal
Serão usadas as imagens de região já existentes em `src/assets/region-*.jpg` como background dos cards de líderes, mantendo coerência com o projeto.

