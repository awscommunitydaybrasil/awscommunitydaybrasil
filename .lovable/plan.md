

## Plano: Botão "Inscreva-se" no header regional

### Mudança única em `src/regions/regiaomodelo/RegiaoModeloPage.tsx`

Adicionar um botão "Inscreva-se" condicional no header, visível apenas quando `config.registration.url` não está vazio.

**Desktop (linha ~190, após o `</nav>`):**
- Inserir um `<a>` estilizado como botão primário (bg-primary, rounded-full, text-sm font-semibold) com `target="_blank"` apontando para `config.registration.url`
- Posicionar entre o nav e o botão hamburger mobile

**Mobile (dentro do menu dropdown, linha ~218):**
- Adicionar o mesmo botão "Inscreva-se" ao final da lista de links do menu mobile

**Condição:** Renderizar apenas se `config.registration.url` for truthy (string não vazia).

