

## Plano: Criar região oculta "regiaomodelo"

### O que sera feito

Criar uma região modelo completa em `/regiaomodelo` com dados extraidos do site historico (edição 2025 Campinas), usando a estrutura da centro-oeste como base. A rota não será linkada em nenhum menu ou mapa -- acesso apenas por URL direto.

### Dados extraidos do site historico

**Palestrantes (13):**
William Lino, Daiane Dalavi, Léo Oliveira, Humberto "Beto" Demolinari, Cleiton Nascimento, Erika Nagamine, Christiano Milfont, Rodrigo Pokemão, Bruno Marangoni, Lays Rodrigues, Filipe Almeida Guimarães, Leo Ciccone & Dan Rezende, Michelle Perez & Leonardo Azize, Carlos Alberto Marangon & Leticia Massae Uchida, Walter Neto, Amom Luiz & Lucas Vitoreti

**Programação (22 itens):** Grade completa de 08:00 às 19:30, com Palco Talk e Palco Hands-On

**Patrocinadores (8):** AWS e Caylent (Platina), OPS Team e Alura+FIAP (Ouro), Cloudfaster, TNKR, Dati, GFT (Prata), Darede (Bronze)

**Organizadores:** Usar os 4 da centro-oeste (Priscila, Wagner, Deivid, Marcelo) com fotos locais já existentes

### Arquivos a criar

- `src/regions/regiaomodelo/data/config.json` — baseado no centro-oeste, ajustado para "Região Modelo", local "Expo Dom Pedro, Campinas/SP"
- `src/regions/regiaomodelo/data/speakers.json` — 13+ palestrantes com fotos externas (URLs do site historico)
- `src/regions/regiaomodelo/data/schedule.json` — 22 itens da grade completa
- `src/regions/regiaomodelo/data/sponsors.json` — 8 patrocinadores com logos externos (URLs do site historico)
- `src/regions/regiaomodelo/data/organizers.json` — copia dos 4 organizadores centro-oeste
- `src/regions/regiaomodelo/index.tsx` — importa dados e reutiliza RegionPage, importa fotos dos organizadores de centro-oeste
- `src/regions/regiaomodelo/assets/` — symlink ou copia do postcard de brasilia como hero image

### Arquivos a modificar

- `src/App.tsx` — adicionar rota `/regiaomodelo` (sem adicionar ao mapa ou menus)

### Detalhes tecnicos

- Fotos de palestrantes e logos de patrocinadores usarão URLs externas diretas do site historico (evita copiar dezenas de imagens)
- Fotos dos organizadores reutilizarão os imports ja existentes em centro-oeste/assets
- O `tier` dos sponsors será mapeado: Platina→diamond, Ouro→gold, Prata→silver, Bronze→bronze
- Rota oculta: não aparece no mapa, na LeadersSection nem no RegionsSection

