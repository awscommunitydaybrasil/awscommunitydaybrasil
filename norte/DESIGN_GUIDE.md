# AWS Community Day Norte 2026 — Guia de Design e Manutenção

## Sumário

1. [Visão Geral](#visão-geral)
2. [Design System](#design-system)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Como Adicionar Novas Sessões na Programação](#como-adicionar-novas-sessões-na-programação)
5. [Como Adicionar Novos Speakers](#como-adicionar-novos-speakers)
6. [Como Adicionar Membros da Equipe](#como-adicionar-membros-da-equipe)
7. [Como Adicionar Patrocinadores](#como-adicionar-patrocinadores)
8. [Componentes Reutilizáveis](#componentes-reutilizáveis)
9. [Regras de Estilo](#regras-de-estilo)
10. [Responsividade](#responsividade)

---

## Visão Geral

Landing page para o **AWS Community Day Norte 2026**, construída com:

- **React 18** + **TypeScript**
- **Vite** (bundler)
- **Tailwind CSS** (estilização)
- **shadcn/ui** (componentes base: Accordion, Button, etc.)
- **Lucide React** (ícones)

A identidade visual é **bold, comunitária e tropical**, usando as cores oficiais da AWS com toques amazônicos.

---

## Design System

### Paleta de Cores (CSS Variables — HSL)

Todas as cores são definidas em `src/index.css` como variáveis CSS em formato HSL e mapeadas no `tailwind.config.ts`.

| Token | Valor HSL | Cor | Uso |
|---|---|---|---|
| `--primary` | `32 100% 50%` | Laranja AWS `#FF9900` | CTAs, badges, destaques |
| `--secondary` | `122 52% 33%` | Verde Floresta `#2E7D32` | Checkmarks, badges secundários |
| `--accent` | `43 100% 57%` | Amarelo `#FFC107` | Detalhes e hovers |
| `--aws-dark` | `216 28% 17%` | Azul Escuro `#232F3E` | Fundos escuros, navbar, footer |
| `--aws-darker` | `225 24% 14%` | Azul Profundo `#1a1f2e` | Gradiente hero |
| `--background` | `0 0% 100%` | Branco `#FFFFFF` | Fundo principal |
| `--muted` | `0 0% 96%` | Cinza Claro `#F5F5F5` | Seções alternadas |
| `--schedule-talk` | `252 47% 45%` | Roxo | Bloco "Palco Talk" |
| `--schedule-handson` | `0 72% 45%` | Vermelho | Bloco "Palco Hands-On" |

### Como usar cores nos componentes

**NUNCA** use cores hardcoded como `text-white`, `bg-[#FF9900]`, etc. Use sempre os tokens semânticos:

```tsx
// ✅ Correto
<div className="bg-primary text-primary-foreground" />
<p className="text-muted-foreground" />
<div className="bg-card border-border" />

// ❌ Errado
<div className="bg-[#FF9900] text-white" />
<p className="text-gray-500" />
```

**Exceção:** as classes utilitárias customizadas (`bg-aws-dark`, `text-aws-dark`, etc.) definidas em `index.css` são permitidas para seções específicas.

### Tipografia

- **Fonte:** Inter (importada via Google Fonts)
- **Títulos de seção:** `font-extrabold text-3xl md:text-4xl` (classe `.section-title`)
- **Subtítulos:** `font-semibold text-sm tracking-[2px] uppercase` (classe `.section-subtitle`)
- **Corpo:** `16px` com `line-height: 1.6-1.7`

### Classes Utilitárias Customizadas

Definidas em `src/index.css`:

| Classe | Descrição |
|---|---|
| `.section-padding` | Padding vertical padrão entre seções (`py-20 md:py-24 lg:py-28`) |
| `.container-main` | Container centralizado com `max-w-[1200px]` e padding horizontal |
| `.section-subtitle` | Subtítulo laranja uppercase com tracking largo |
| `.section-title` | Título principal da seção em azul escuro, extra-bold |
| `.btn-primary` | Botão laranja com hover e efeito de escala |
| `.btn-outline-white` | Botão outline branco (para fundos escuros) |
| `.btn-outline-primary` | Botão outline laranja |
| `.card-hover` | Efeito hover para cards (borda laranja, sombra, translate-y) |
| `.bg-hero-gradient` | Gradiente azul escuro → azul profundo |
| `.bg-cta-gradient` | Gradiente laranja para a seção CTA final |

### Espaçamento

- **Entre seções:** 80-112px vertical (via `.section-padding`)
- **Container:** max 1200px centralizado
- **Cards:** `border-radius: 12-16px`, `padding: 32px`
- **Sombras:** `shadow-sm` para cards, `shadow-lg` para hover

---

## Estrutura do Projeto

```
src/
├── assets/              # Imagens (hero, speakers, equipe)
├── components/
│   ├── ui/              # Componentes shadcn/ui (Accordion, Button, etc.)
│   ├── AboutSection.tsx
│   ├── BackToTop.tsx
│   ├── CTASection.tsx
│   ├── FAQSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── OrgTeamSection.tsx     # Equipe organizadora (usado na página Contato)
│   ├── ScheduleSection.tsx    # Programação com palcos
│   ├── ScrollReveal.tsx       # Componente de animação on-scroll
│   ├── SpeakersSection.tsx
│   ├── SponsorsSection.tsx    # Logos dos patrocinadores
│   ├── SponsorshipSection.tsx # Planos de patrocínio
│   ├── StatsSection.tsx
│   ├── TicketsSection.tsx
│   ├── UserGroupsSection.tsx
│   └── VenueSection.tsx
├── pages/
│   ├── Index.tsx              # Landing page principal
│   ├── Contato.tsx            # Página de contato + equipe
│   └── NotFound.tsx
├── index.css                  # Design tokens e classes utilitárias
└── App.tsx                    # Rotas
```

---

## Como Adicionar Novas Sessões na Programação

Arquivo: `src/components/ScheduleSection.tsx`

### Estrutura de uma sessão

```tsx
interface Session {
  time: string;      // Faixa de horário, ex: "09:10 - 09:50"
  title: string;     // Título em UPPERCASE
  speaker: string | null; // Nome do speaker ou null
  stage: Stage;      // "Geral" | "Palco Talk" | "Palco Hands-On"
  avatar?: string;   // Import da foto do speaker (opcional)
}
```

### Passo a passo

1. **Adicione a foto do speaker** (se houver) em `src/assets/`:
   ```
   src/assets/novo-speaker.jpg
   ```

2. **Importe a foto** no topo do arquivo:
   ```tsx
   import novoSpeaker from "@/assets/novo-speaker.jpg";
   ```

3. **Adicione a sessão** no array `sessions`:
   ```tsx
   {
     time: "14:30 - 15:10",
     title: "TÍTULO DA PALESTRA EM MAIÚSCULAS",
     speaker: "Nome do Speaker",
     stage: "Palco Talk",
     avatar: novoSpeaker,
   },
   ```

### Tipos de palco (Stage)

| Stage | Cor | Uso |
|---|---|---|
| `"Geral"` | Laranja (primary) | Credenciamento, abertura, encerramento, intervalos |
| `"Palco Talk"` | Roxo | Palestras tradicionais |
| `"Palco Hands-On"` | Vermelho | Workshops práticos |

### Adicionando um novo tipo de palco

1. Adicione o tipo no `type Stage`:
   ```tsx
   type Stage = "Geral" | "Palco Talk" | "Palco Hands-On" | "Novo Palco";
   ```

2. Adicione a cor no `stageColors`:
   ```tsx
   const stageColors: Record<Stage, string> = {
     // ...existentes
     "Novo Palco": "bg-[hsl(var(--schedule-novo))]",
   };
   ```

3. Defina a variável CSS em `src/index.css`:
   ```css
   --schedule-novo: 180 60% 40%; /* Exemplo: teal */
   ```

---

## Como Adicionar Novos Speakers

Arquivo: `src/components/SpeakersSection.tsx`

1. **Adicione a foto** em `src/assets/speaker-N.jpg`
2. **Importe** no componente
3. **Adicione ao array** `speakers`:
   ```tsx
   { name: "Nome Completo", role: "Cargo, Empresa", photo: speakerN },
   ```

---

## Como Adicionar Membros da Equipe

Arquivo: `src/components/OrgTeamSection.tsx`

1. **Adicione a foto** em `src/assets/org-N.jpg`
2. **Importe** no componente
3. **Adicione ao array** `team`:
   ```tsx
   { name: "Nome", role: "Função na organização", photo: orgN },
   ```

---

## Como Adicionar Patrocinadores

Arquivo: `src/components/SponsorsSection.tsx`

Os patrocinadores estão organizados por tier. Para adicionar:

```tsx
const goldSponsors = ["Empresa Alpha", "Empresa Beta", "Nova Empresa"];
```

Para usar logos reais, substitua o componente `SponsorPlaceholder` por `<img>` com o logo importado.

---

## Componentes Reutilizáveis

### `ScrollReveal`

Wrapper que anima filhos com fade-in + translate-Y ao entrar no viewport.

```tsx
<ScrollReveal delay={100} className="text-center">
  <h2>Conteúdo animado</h2>
</ScrollReveal>
```

- `delay` (ms): atraso para stagger em listas
- `className`: classes adicionais aplicadas ao wrapper

### Classes de botão

```tsx
<a className="btn-primary">Botão Laranja</a>
<a className="btn-outline-white">Outline Branco</a>
<a className="btn-outline-primary">Outline Laranja</a>
```

### Padrão de seção

Toda seção segue este padrão:

```tsx
<section id="nome-da-secao" className="section-padding bg-background">
  <div className="container-main">
    <ScrollReveal className="text-center mb-12">
      <p className="section-subtitle">SUBTÍTULO</p>
      <h2 className="section-title">Título da Seção</h2>
    </ScrollReveal>

    {/* Conteúdo */}
  </div>
</section>
```

- `id` é usado para navegação por âncora na navbar
- Alterne `bg-background` e `bg-muted` entre seções para ritmo visual
- Seções escuras usam `bg-aws-dark` com texto branco

---

## Regras de Estilo

1. **Sem emojis** — use ícones Lucide ou imagens reais
2. **Sem cores hardcoded** — use tokens do design system
3. **Componentes pequenos e focados** — cada seção é um componente separado
4. **Imagens importadas como ES6 modules** — nunca referencie por URL direta
5. **Acessibilidade** — HTML semântico (`<section>`, `<nav>`, `<footer>`), `aria-label` em botões de ícone, `alt` em imagens

---

## Responsividade

O site é **mobile-first** com breakpoints Tailwind:

| Breakpoint | Largura | Uso |
|---|---|---|
| Base | < 640px | Mobile (1 coluna) |
| `sm` | ≥ 640px | Tablet pequeno |
| `md` | ≥ 768px | Tablet |
| `lg` | ≥ 1024px | Desktop |

Padrões comuns:
- Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Fontes: `text-3xl md:text-4xl`
- Padding: `px-5 sm:px-6 lg:px-8`
- Navbar: colapsa em hamburguer abaixo de `lg`
