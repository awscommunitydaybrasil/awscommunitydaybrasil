

## Plano: Trocar imagens de fundo + remover badge "Líder Regional"

### 1. Copiar as 5 fotos de cartão postal para `src/assets/`

| Arquivo | Cidade | Líder |
|---------|--------|-------|
| `user-uploads://image-2.png` → `src/assets/postcard-brasilia.png` | Brasília | Wagner Landim |
| `user-uploads://image-3.png` → `src/assets/postcard-bh.png` | BH | Rafaela Vidotti |
| `user-uploads://image-4.png` → `src/assets/postcard-salvador.png` | Salvador | Caio Nunes |
| `user-uploads://image-5.png` → `src/assets/postcard-curitiba.png` | Curitiba | Alceu Neto |
| `user-uploads://image-6.png` → `src/assets/postcard-belem.png` | Belém | Thayana Mamoré |

### 2. Editar `src/components/LeadersSection.tsx`

- Substituir os imports das imagens `region-*.jpg` pelos novos `postcard-*.png`
- Atualizar o array `leaders` para usar as novas imagens
- Remover o badge "Líder Regional" do componente `LeaderCard`

