

## Plano: Tooltips nas regiões + Ajuste de marcadores

### 1. Ajustar posições dos marcadores (`BrazilMapSVG.tsx`)

Corrigir coordenadas baseando-se nas posições dos labels SVG de cada estado:

| UF | Atual | Novo | Motivo |
|----|-------|------|--------|
| PR | 278, 350 | 255, 358 | Está sobre SP, mover para sul/esquerda |
| BA | 398, 195 | 365, 205 | Muito à direita, aproximar do label BA |
| PA | 280, 88 | 240, 118 | Muito à direita/acima, aproximar do label PA |

DF e MG permanecem inalterados.

### 2. Adicionar tooltips ao hover nas regiões

- Adicionar estado `hoveredState` para rastrear o estado sob o mouse
- Ao passar o mouse sobre um estado sede (PA, BA, DF, MG, PR), exibir tooltip SVG com:
  - Nome da cidade (Belém, Salvador, Brasília, BH, Curitiba)
  - Data do evento
- Tooltip renderizado como grupo SVG (`<rect>` + `<text>`) posicionado próximo ao marcador
- Dados das cidades/datas:
  - PA/Belém: a definir
  - DF/Brasília: 26 Jul
  - BA/Salvador: a definir
  - MG/BH: 21 Jun
  - PR/Curitiba: a definir

**Arquivo editado:** `src/components/BrazilMapSVG.tsx`

