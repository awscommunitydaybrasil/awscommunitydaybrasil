

## Plano: Logos de patrocinadores com fundo branco e centralizadas

### Mudança em `src/regions/regiaomodelo/RegiaoModeloPage.tsx`

**Linha 434**: Alterar o `className` do `<a>` wrapper de cada sponsor para incluir `bg-white` (fundo branco fixo independente do tema) e garantir centralização.

**Linha 427**: Adicionar `place-items-center` ou `justify-center` ao grid container para centralizar as logos quando não preenchem toda a linha.

Mudanças específicas:
- `bg-card` → `bg-white` no link do sponsor (linha 434)
- Adicionar `justify-center` no `<div>` do grid (linha 427) para centralizar logos na última linha incompleta
- Mudar o grid para `flex flex-wrap justify-center` para melhor centralização geral

