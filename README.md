# AWS Community Day Brasil 2026

Site oficial do **AWS Community Day Brasil 2026**, um evento de comunidade com edições regionais em todo o Brasil. Cada região possui sua própria página com palestrantes, programação, patrocinadores e organizadores.

---

## Stack Técnica

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | UI e componentes |
| Vite | 7.3 | Build tool e dev server |
| TypeScript | 5.8 | Tipagem estática |
| Tailwind CSS | 3.4 | Estilização |
| shadcn/ui | — | Componentes base (Radix UI) |
| React Router | 6 | Roteamento SPA |
| Lucide React | — | Ícones |
| Chart.js | 4.4 | Gráficos interativos (páginas estáticas) |

---

## Estrutura do Projeto

```
src/
├── assets/                        # Assets globais (logos, imagens)
├── components/                    # Componentes da página principal
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── UpcomingEventsSection.tsx   # Cards de próximas edições + realizadas
│   ├── AboutSection.tsx
│   ├── RegionsSection.tsx         # Mapa + botões de navegação por região
│   ├── LeadersSection.tsx         # Cards de líderes (futuros primeiro, passados ao final)
│   ├── GalleryCarousel.tsx        # Carrossel de fotos (auto-scroll + drag)
│   ├── BrazilMapSVG.tsx
│   ├── SeoHead.tsx
│   ├── PastEditionsSection.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── lib/
│   └── seo.ts                     # Utilitários de SEO
├── pages/
│   ├── Index.tsx                  # Página principal (/)
│   └── NotFound.tsx
├── regions/
│   ├── RegionPage.tsx             # Componente unificado de renderização
│   ├── types.ts                   # Tipos TypeScript compartilhados
│   ├── components/                # Subcomponentes das páginas regionais
│   │   ├── RegionHero.tsx         # Hero com countdown ou badge "Evento Realizado"
│   │   ├── RegionHeader.tsx
│   │   ├── InfoCardsSection.tsx   # Cards de info (adapta para eventos passados)
│   │   ├── SpeakersSection.tsx    # "Quem vai palestrar" / "Quem palestrou"
│   │   ├── SpeakerCard.tsx
│   │   ├── ScheduleSection.tsx
│   │   ├── SponsorsSection.tsx
│   │   ├── PhotoGalleryCard.tsx   # Card de galeria de fotos (eventos passados)
│   │   ├── CommunitiesSection.tsx # Links de comunidades regionais
│   │   ├── OrganizersSection.tsx
│   │   ├── ExpectationsSection.tsx
│   │   ├── CallForSpeakersSection.tsx
│   │   ├── CallForSponsorsSection.tsx
│   │   └── RegionFooter.tsx
│   ├── centro-oeste/              # ← Região exemplo
│   │   ├── index.tsx              # Ponto de entrada (importa dados + assets)
│   │   ├── assets/                # Imagens locais (postcard, fotos, sponsors)
│   │   │   ├── postcard-brasilia.png
│   │   │   ├── event-photo.jpg
│   │   │   └── sponsors/
│   │   └── data/
│   │       ├── config.json        # Configuração do evento (inclui pastEvent)
│   │       ├── speakers.json
│   │       ├── schedule.json
│   │       ├── sponsors.json
│   │       └── organizers.json
│   ├── nordeste/
│   ├── norte/
│   ├── sudeste/
│   ├── sul/
│   └── regiaomodelo/              # Região de referência com dados completos
public/
├── favicon.png
├── centro-oeste/
│   ├── index.html                 # Fallback SPA para a região
│   └── resultado/                 # Página estática de resultados do evento
│       ├── index.html
│       └── event-photo.jpg
├── hist/                          # Edições anteriores (HTML estático)
│   ├── 2024-nov/index.html
│   └── 2025-dec/index.html
└── og/                            # Imagens Open Graph
```

---

## Arquitetura Regional

O projeto usa uma **arquitetura modular por região**. Cada região é uma pasta independente em `src/regions/[regiao]/` com:

1. **`index.tsx`** — Importa os JSONs de dados e assets locais, passa tudo para o `RegionPage`
2. **`assets/`** — Imagens locais (postcards, fotos de organizadores, sponsors, evento)
3. **`data/`** — 5 arquivos JSON que alimentam toda a página

O componente **`RegionPage.tsx`** é o renderizador unificado que recebe todos os dados via props e monta a página completa usando subcomponentes atômicos. Ele detecta automaticamente se o evento já aconteceu (baseado na `targetDate`) e adapta a interface.

> **Importante:** Imagens locais (fotos de organizadores, postcards, logos de sponsors) devem ser importadas no `index.tsx` via `import` para que o Vite processe corretamente. URLs externas (https) podem ser usadas diretamente nos JSONs.

---

## Eventos Passados — Comportamento Automático

Quando a data do evento (`targetDate`) é anterior à data atual, a página da região se adapta automaticamente:

| Elemento | Evento Futuro | Evento Passado |
|---|---|---|
| Hero | Countdown regressivo | Badge "Evento Realizado" |
| Card de fotos | Não exibido | Card com foto + link galeria (se configurado) |
| Info cards | Local, Data, Inscrições | Local, Realizado em, Galeria |
| Palestrantes | "Quem vai palestrar" | "Quem palestrou" |
| Header | Botão "Inscreva-se" | Sem botão |
| Seções opcionais | Call for Speakers/Sponsors, O que esperar | Removidas |
| Comunidades | Não exibido | Links das comunidades regionais (se configurado) |

### Configuração de evento passado

Adicione o campo `pastEvent` no `config.json` da região:

```json
{
  "pastEvent": {
    "photosUrl": "https://photos.app.goo.gl/...",
    "communities": [
      {
        "name": "AWS User Group Brasília",
        "url": "https://www.instagram.com/awsbrasilia/",
        "icon": "instagram"
      }
    ]
  }
}
```

Passe também a prop `eventPhoto` no `index.tsx` da região:

```tsx
import eventPhoto from "./assets/event-photo.jpg";

const MinhaRegiao = () => (
  <RegionPage
    config={config}
    // ...demais props
    eventPhoto={eventPhoto}
  />
);
```

### Página de resultados (opcional)

Para eventos passados, é possível criar uma página estática de resultados em `public/[regiao]/resultado/index.html` com dados de credenciamento, gráficos interativos (Chart.js) e métricas do evento.

---

## Página Principal — Home

### Líderes Regionais

Os cards de líderes na home são **ordenados automaticamente**:
1. Eventos futuros primeiro (por data crescente)
2. Eventos passados ao final (por data decrescente)

Eventos passados exibem:
- Tag **"Realizado"** no canto superior direito
- Botão **"Ver como foi →"** (em vez de "Ver evento →")
- Opacidade levemente reduzida

### Mapa e Navegação

A legenda abaixo do mapa do Brasil usa **botões clicáveis** (em vez de bolinhas decorativas) que navegam para a página de cada região.

---

## Guia de Conteúdo por Arquivo JSON

### 1. `config.json` — Configuração do Evento

Define nome, data, local, inscrição, redes sociais, grupos de usuários e dados de evento passado.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `regionName` | `string` | ✅ | Nome da região (ex: "Centro-Oeste") |
| `subtitle` | `string` | ✅ | Subtítulo descritivo |
| `targetDate` | `string` (ISO 8601) | ✅ | Data e hora do evento com timezone |
| `eventTime` | `string` | ❌ | Horário legível (ex: "08:30h às 17h") |
| `heroImage` | `string` | ✅ | Caminho relativo da imagem hero |
| `location.venue` | `string` | ✅ | Nome do local (ou "Em Breve!") |
| `location.city` | `string` | ✅ | Cidade/Estado |
| `registration.status` | `string` | ✅ | "Aberto", "Em Breve!" ou "Encerrado" |
| `registration.url` | `string` | ✅ | URL de inscrição (vazio se não disponível) |
| `socialLinks` | `object` | ✅ | Links de redes sociais |
| `userGroups` | `array` | ✅ | Lista de user groups com `name` e `url` |
| `callForSpeakersUrl` | `string` | ❌ | URL do Call for Speakers (não exibido se evento passado) |
| `callForSponsorsUrl` | `string` | ❌ | URL do Call for Sponsors (não exibido se evento passado) |
| `contact.email` | `string` | ✅ | Email de contato |
| `contact.website` | `string` | ✅ | URL do site |
| `pastEvent` | `object` | ❌ | Dados de evento passado (ver abaixo) |
| `pastEvent.photosUrl` | `string` | ❌ | Link da galeria de fotos |
| `pastEvent.communities` | `array` | ❌ | Comunidades da região |
| `pastEvent.communities[].name` | `string` | ✅ | Nome da comunidade |
| `pastEvent.communities[].url` | `string` | ✅ | Link (Instagram, Meetup, etc.) |
| `pastEvent.communities[].icon` | `string` | ❌ | Ícone: `"instagram"` (padrão: ícone genérico) |

---

### 2. `speakers.json` — Palestrantes

Lista de palestrantes do evento. **Se o array estiver vazio (`[]`), a seção não é exibida.**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | `string` | ✅ | Nome completo |
| `photo` | `string` | ✅ | URL da foto ou nome do arquivo local |
| `title` | `string` | ✅ | Cargo/título profissional |
| `company` | `string` | ✅ | Empresa |
| `talk` | `string` | ✅ | Título da palestra |
| `bio` | `string` | ✅ | Biografia curta |
| `keynote` | `boolean` | ❌ | Se `true`, aparece em destaque antes dos demais |
| `social` | `object` | ❌ | Redes sociais (`linkedin`, `instagram`, `twitter`) |

**Notas:**
- Palestrantes com `"keynote": true` são exibidos primeiro, em cards com destaque
- Para fotos locais, importe no `index.tsx` e use um `speakerPhotoMap`

---

### 3. `schedule.json` — Programação

Grade de programação do evento. **Se o array estiver vazio (`[]`), a seção não é exibida.**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `time` | `string` | ✅ | Horário (ex: "09:00 - 09:50") |
| `title` | `string` | ✅ | Título da atividade |
| `speaker` | `string` | ✅ | Nome do palestrante ou "Organização" |
| `track` | `string` | ✅ | Trilha (ex: "Palco Talk", "Palco Hands-On", "Geral") |
| `level` | `string` | ❌ | Nível: "Iniciante", "Intermediário", "Avançado" |

**Notas:**
- Itens com `track: "Geral"` aparecem como intervalos (credenciamento, almoço, coffee break)
- Ordene cronologicamente no JSON — a renderização segue a ordem do array

---

### 4. `sponsors.json` — Patrocinadores

Lista de patrocinadores agrupados por tier. **Se o array estiver vazio (`[]`), a seção não é exibida.**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | `string` | ✅ | Nome do patrocinador |
| `logo` | `string` | ✅ | Nome do arquivo do logo (resolvido via `logoMap`) |
| `url` | `string` | ✅ | Site do patrocinador |
| `tier` | `string` | ✅ | `"diamond"`, `"gold"`, `"silver"`, `"bronze"`, `"community"` ou `"support"` |

**Labels por tier:**
- `diamond` → "Platina"
- `gold` → "Ouro"
- `silver` → "Prata"
- `bronze` → "Bronze"
- `community` → "Comunidade"
- `support` → "Apoio"

**Notas:**
- Logos devem ser importados no `index.tsx` e mapeados via `logoMap` (mesmo padrão dos organizadores)
- A renderização agrupa automaticamente por tier e exibe na ordem definida acima

---

### 5. `organizers.json` — Organizadores

Lista da equipe organizadora. **Se o array estiver vazio (`[]`), a seção não é exibida.**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | `string` | ✅ | Nome completo |
| `photo` | `string` | ✅ | Nome do arquivo local (resolvido via `photoMap`) |
| `social` | `object` | ❌ | Redes sociais |
| `social.linkedin` | `string` | ❌ | URL do LinkedIn |
| `social.instagram` | `string` | ❌ | URL do Instagram |
| `social.twitter` | `string` | ❌ | URL do X/Twitter |

**Notas:**
- Fotos locais: coloque em `assets/` e mapeie no `index.tsx` via `photoMap`
- Fotos externas (URL completa): use diretamente no campo `photo`

---

## Como Adicionar uma Nova Região

### Passo 1: Criar a pasta da região

```
src/regions/nova-regiao/
├── assets/
│   ├── postcard-cidade.png       # Imagem do hero
│   └── sponsors/                  # Logos de patrocinadores
└── data/
    ├── config.json
    ├── speakers.json              # Pode iniciar como []
    ├── schedule.json              # Pode iniciar como []
    ├── sponsors.json              # Pode iniciar como []
    └── organizers.json            # Pode iniciar como []
```

### Passo 2: Criar o `index.tsx`

```tsx
import RegionPage from "@/regions/RegionPage";
import config from "./data/config.json";
import organizers from "./data/organizers.json";
import speakers from "./data/speakers.json";
import schedule from "./data/schedule.json";
import sponsors from "./data/sponsors.json";
import heroImage from "./assets/postcard-cidade.png";

const NovaRegiao = () => (
  <RegionPage
    config={config}
    organizers={organizers}
    speakers={speakers}
    schedule={schedule}
    sponsors={sponsors}
    heroImage={heroImage}
  />
);

export default NovaRegiao;
```

> **Se houver fotos locais**, importe-as e crie maps para resolver os caminhos (veja `centro-oeste/index.tsx` como referência completa com `photoMap`, `speakerPhotoMap` e `logoMap`).

### Passo 3: Registrar a rota no `App.tsx`

```tsx
import NovaRegiao from "./regions/nova-regiao/index.tsx";

// Dentro de <Routes>:
<Route path="/nova-regiao" element={<NovaRegiao />} />
```

### Passo 4: Adicionar à página principal

Atualize `src/components/LeadersSection.tsx` para incluir o card do líder da nova região (será ordenado automaticamente por data).

---

## Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:8080`.

```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## Deploy

O deploy é feito automaticamente via **GitHub Actions** para GitHub Pages ao fazer push/merge na branch `main`.

- Workflow: `.github/workflows/deploy.yml`
- Node.js: 22
- Domínio: `awscommunityday.com.br`

---

## Edições Anteriores

As páginas de edições anteriores são arquivos HTML estáticos armazenados em `public/hist/`:

- `/hist/2024-nov/` — Edição Novembro 2024
- `/hist/2025-dec/` — Edição Dezembro 2025

Para adicionar uma nova edição anterior, basta criar uma nova pasta em `public/hist/[ano-mes]/` com o `index.html` completo.

---

## Região Modelo

A pasta `src/regions/regiaomodelo/` contém um **exemplo completo** com todos os JSONs preenchidos. Use como referência ao criar conteúdo para novas regiões.

---

## Links Úteis

- 🌐 [AWS Community Day Brasil](https://www.awscommunityday.com.br)
- 📜 [Código de Conduta](https://github.com/awscommunitydaybrasil/codigo-de-conduta)
- 📺 [YouTube](https://www.youtube.com/@awscommunitybrasil)
- 📸 [Instagram](https://www.instagram.com/awscommunitybrasil)
