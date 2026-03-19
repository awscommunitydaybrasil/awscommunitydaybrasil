

## Plano: Redesign dos cards de Líderes

### Mudança principal em `src/components/LeadersSection.tsx`

Redesenhar o `LeaderCard` para dar destaque muito maior à foto do líder e usar imagens de cartão-postal como fundo.

**Novo layout do card:**
- Aspect ratio mais alto (`aspect-[3/4]`) para card mais vertical
- Imagem de fundo: cartão-postal da cidade (mantendo os assets `region-*.jpg` existentes)
- Overlay gradiente escuro sobre a imagem de fundo
- **Foto do líder grande e centralizada**: circular, ~120px (`w-28 h-28`), com borda dourada (primary), shadow glow, posicionada no centro superior do card
- Abaixo da foto: nome do líder em destaque (texto grande, bold)
- Label "Líder Regional" com badge
- Região + cidade + data
- Ícone LinkedIn linkado
- Hover: foto escala levemente, borda do card brilha

**Estrutura visual:**
```text
┌──────────────────────┐
│   [postcard bg]      │
│                      │
│      ┌──────┐        │
│      │ FOTO │ 120px  │
│      │LÍDER │        │
│      └──────┘        │
│                      │
│    Nome do Líder     │
│    Líder Regional    │
│   Centro-Oeste       │
│   Brasília           │
│   27/06/2026         │
│   [LinkedIn]         │
└──────────────────────┘
```

Arquivo editado: `src/components/LeadersSection.tsx` apenas.

