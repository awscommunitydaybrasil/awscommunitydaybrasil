

## Plano: Keynote, ordenação e redes sociais dos palestrantes

### 1. Atualizar tipo `Speaker` em `src/regions/types.ts`

Adicionar campos opcionais:
```ts
keynote?: boolean;
social?: {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
};
```

### 2. Atualizar `src/regions/regiaomodelo/data/speakers.json`

Adicionar `keynote: true` nos 2-3 primeiros palestrantes (como exemplo) e campos `social` com links fictícios de exemplo para demonstrar a funcionalidade.

### 3. Atualizar `src/regions/regiaomodelo/RegiaoModeloPage.tsx`

- **Ordenação**: Antes de renderizar, ordenar speakers: keynotes primeiro, depois alfabético por nome.
- **Badge "Keynote"**: Exibir um badge visual nos cards de keynote speakers (ex: badge dourado com estrela).
- **Ícones sociais**: No card de cada speaker, após o título/empresa, renderizar ícones de Instagram, LinkedIn e X (apenas os que tiverem link preenchido). Usar Lucide `Instagram`, `Linkedin` e SVG inline para X.

### Arquivos a modificar
- `src/regions/types.ts` — novos campos opcionais
- `src/regions/regiaomodelo/data/speakers.json` — adicionar `keynote` e `social`
- `src/regions/regiaomodelo/RegiaoModeloPage.tsx` — lógica de ordenação + badge keynote + ícones sociais

