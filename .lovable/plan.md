

## Plano: Página modelo dedicada com programação por trilha, patrocinadores por tier e menu regional

### 1. Criar página TSX dedicada para a região modelo

Criar `src/regions/regiaomodelo/RegiaoModeloPage.tsx` -- uma copia do `RegionPage.tsx` mas independente, para poder evoluir sem afetar as demais regiões. O `index.tsx` passará a usar este componente em vez do `RegionPage` compartilhado.

### 2. Programação com filtro por trilha

Adicionar tabs/filtros na seção de programação:
- **Todas** (visão geral com todas as atividades)
- **Palco Talk**
- **Palco Hands-On**
- **Geral** (credenciamento, coffee, almoço, etc.)

Usar o componente `Tabs` (shadcn) para alternar entre as trilhas. Adicionalmente, criar no schedule.json campos `level` para as trilhas de nível: Iniciante, Intermediário e Avançado (distribuídos entre as palestras existentes), e adicionar um segundo grupo de filtros ou badges visuais por nível.

### 3. Patrocinadores agrupados por tier

Reorganizar a seção de patrocinadores para exibir por grupo hierárquico:
- **Platina** (diamond) -- logos maiores, destaque visual
- **Ouro** (gold) -- logos médios
- **Prata** (silver) -- logos menores
- **Bronze** (bronze) -- logos compactos

Cada tier terá um heading e tamanhos de logo proporcionais ao nível de patrocínio.

### 4. Menu de navegação regional (anchor links)

Adicionar um menu sticky abaixo do hero com links âncora para as seções da página:
- Sobre | Palestrantes | Programação | Patrocinadores | Organizadores

Cada seção receberá um `id` correspondente. O menu ficará fixo no topo ao fazer scroll (sticky).

### Arquivos a criar
- `src/regions/regiaomodelo/RegiaoModeloPage.tsx` -- página completa independente com as 3 melhorias

### Arquivos a modificar
- `src/regions/regiaomodelo/index.tsx` -- importar `RegiaoModeloPage` em vez de `RegionPage`
- `src/regions/regiaomodelo/data/schedule.json` -- adicionar campo `level` às palestras

