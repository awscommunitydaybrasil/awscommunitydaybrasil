

## Plano: Scroll suave global e ícones nas redes sociais

### 1. Scroll suave global

Adicionar `scroll-behavior: smooth` ao `html` em `src/index.css`. Isso faz com que todos os anchor links (`#sobre`, `#palestrantes`, etc.) naveguem suavemente sem precisar de JS adicional.

### 2. Redes sociais com ícones no footer

No footer da `RegiaoModeloPage.tsx` (linhas 486-493), substituir os links de texto por ícones do Lucide React:
- Instagram → `Instagram` icon
- LinkedIn → `Linkedin` icon  
- X (Twitter) → `Twitter` icon
- YouTube → `Youtube` icon

Renderizar como uma linha horizontal de ícones (`flex gap-4`) em vez de uma lista vertical de texto.

### Arquivos a modificar
- `src/index.css` — adicionar `scroll-behavior: smooth` no `html`
- `src/regions/regiaomodelo/RegiaoModeloPage.tsx` — importar ícones do Lucide e substituir os links textuais por ícones no footer

