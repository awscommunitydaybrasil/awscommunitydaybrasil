

## Plano: Animações de scroll com fade-in

### 1. Criar hook `useScrollAnimation` (`src/hooks/use-scroll-animation.ts`)

Hook reutilizável usando `IntersectionObserver`:
- Recebe `threshold` (default 0.1) e `rootMargin`
- Retorna `ref` e `isVisible` (boolean)
- Marca como visível quando o elemento entra no viewport (uma vez só)

### 2. Aplicar animações nas seções

Adicionar o hook em cada seção para animar elementos ao aparecerem:

- **AboutSection**: imagem entra da esquerda, texto da direita
- **RegionsSection**: título fade-in, mapa fade-in com delay
- **LeadersSection**: título fade-in, cada card com delay escalonado
- **PastEditionsSection**: título fade-in, cada item com delay escalonado
- **CTASection**: título e botão fade-in

### 3. Estilos de animação

Usar classes Tailwind + inline styles:
- Estado inicial: `opacity-0 translate-y-6`
- Estado visível: `opacity-100 translate-y-0`
- Transição: `transition-all duration-700 ease-out`
- Delays escalonados para cards/itens via `style={{ transitionDelay }}`

**Arquivos criados:** `src/hooks/use-scroll-animation.ts`
**Arquivos editados:** `AboutSection`, `RegionsSection`, `LeadersSection`, `PastEditionsSection`, `CTASection`

