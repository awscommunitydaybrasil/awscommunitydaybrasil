# AWS Community Day Brasil 2026

Site oficial do **AWS Community Day Brasil 2026**, um evento de comunidade com edições regionais em todo o Brasil. Cada região possui sua própria página com palestrantes, programação, patrocinadores e organizadores.

---

## Stack Técnica

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | UI e componentes |
| Vite | 5 | Build tool e dev server |
| TypeScript | 5.8 | Tipagem estática |
| Tailwind CSS | 3.4 | Estilização |
| shadcn/ui | — | Componentes base (Radix UI) |
| React Router | 6 | Roteamento SPA |
| Lucide React | — | Ícones |
| Framer Motion | — | Animações de scroll |

---

## Estrutura do Projeto

```
src/
├── assets/                        # Assets globais (logos, imagens)
├── components/                    # Componentes da página principal
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── RegionsSection.tsx
│   ├── LeadersSection.tsx
│   ├── PastEditionsSection.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── pages/
│   ├── Index.tsx                  # Página principal (/)
│   └── NotFound.tsx
├── regions/
│   ├── RegionPage.tsx             # Componente unificado de renderização
│   ├── types.ts                   # Tipos TypeScript compartilhados
│   ├── components/                # Subcomponentes das páginas regionais
│   │   ├── RegionHero.tsx
│   │   ├── InfoCardsSection.tsx
│   │   ├── SpeakersSection.tsx
│   │   ├── SpeakerCard.tsx
│   │   ├── ScheduleSection.tsx
│   │   ├── SponsorsSection.tsx
│   │   ├── OrganizersSection.tsx
│   │   ├── ExpectationsSection.tsx
│   │   ├── RegionHeader.tsx
│   │   └── RegionFooter.tsx
│   ├── centro-oeste/              # ← Região exemplo
│   │   ├── index.tsx              # Ponto de entrada (importa dados + assets)
│   │   ├── assets/                # Imagens locais (postcard, fotos)
│   │   │   └── postcard-brasilia.png
│   │   └── data/
│   │       ├── config.json        # Configuração do evento
│   │       ├── speakers.json      # Palestrantes
│   │       ├── schedule.json      # Programação
│   │       ├── sponsors.json      # Patrocinadores
│   │       └── organizers.json    # Organizadores
│   ├── nordeste/
│   ├── norte/
│   ├── sudeste/
│   ├── sul/
│   └── regiaomodelo/              # Região de referência com dados completos
public/
├── favicon.png
└── hist/                          # Edições anteriores (HTML estático)
    ├── 2024-nov/index.html
    └── 2025-dec/index.html
```

---

## Arquitetura Regional

O projeto usa uma **arquitetura modular por região**. Cada região é uma pasta independente em `src/regions/[regiao]/` com:

1. **`index.tsx`** — Importa os JSONs de dados e assets locais, passa tudo para o `RegionPage`
2. **`assets/`** — Imagens locais (postcards, fotos de organizadores)
3. **`data/`** — 5 arquivos JSON que alimentam toda a página

O componente **`RegionPage.tsx`** é o renderizador unificado que recebe todos os dados via props e monta a página completa usando subcomponentes atômicos.

> **Importante:** Imagens locais (fotos de organizadores, postcards) devem ser importadas no `index.tsx` via `import` para que o Vite processe corretamente. URLs externas (https) podem ser usadas diretamente nos JSONs.

---

## Guia de Conteúdo por Arquivo JSON

### 1. `config.json` — Configuração do Evento

Define nome, data, local, inscrição, redes sociais e grupos de usuários da região.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `regionName` | `string` | ✅ | Nome da região (ex: "Centro-Oeste") |
| `subtitle` | `string` | ✅ | Subtítulo descritivo |
| `targetDate` | `string` (ISO 8601) | ✅ | Data e hora do evento com timezone |
| `eventTime` | `string` | ❌ | Horário legível (ex: "09h às 18h") |
| `heroImage` | `string` | ✅ | Caminho relativo da imagem hero |
| `location.venue` | `string` | ✅ | Nome do local (ou "Em Breve!") |
| `location.city` | `string` | ✅ | Cidade/Estado |
| `registration.status` | `string` | ✅ | "Aberto", "Em Breve!" ou "Encerrado" |
| `registration.url` | `string` | ✅ | URL de inscrição (vazio se não disponível) |
| `socialLinks` | `object` | ✅ | Links de redes sociais (`instagram`, `linkedin`, `twitter`, `youtube`) |
| `userGroups` | `array` | ✅ | Lista de user groups com `name` e `url` |
| `contact.email` | `string` | ✅ | Email de contato |
| `contact.website` | `string` | ✅ | URL do site |

**Exemplo:**
```json
{
  "regionName": "Centro-Oeste",
  "subtitle": "O maior evento de comunidades AWS do Centro-Oeste brasileiro",
  "targetDate": "2026-06-27T09:00:00-03:00",
  "eventTime": "09h às 18h",
  "heroImage": "./assets/postcard-brasilia.png",
  "location": {
    "venue": "Centro de Convenções",
    "city": "Brasília/DF"
  },
  "registration": {
    "status": "Em Breve!",
    "url": ""
  },
  "socialLinks": {
    "instagram": "https://www.instagram.com/awscommunitydaybr/",
    "linkedin": "https://www.linkedin.com/company/aws-community-day-brasil/",
    "twitter": "https://twitter.com/awscommunitybr",
    "youtube": "https://www.youtube.com/@AWSUserGroupBrasil"
  },
  "userGroups": [
    { "name": "AWS User Group Brasília", "url": "https://www.meetup.com/pt-BR/awsbsb/" }
  ],
  "contact": {
    "email": "contato@awscommunityday.com.br",
    "website": "https://www.awscommunityday.com.br"
  }
}
```

**Notas:**
- O `targetDate` alimenta o contador regressivo no hero e o card de "Data e Hora"
- Se `eventTime` estiver preenchido, o card mostrará a data formatada + horário; caso contrário, exibe "Em Breve!"
- Se `registration.status` for `"Em Breve!"`, o botão de inscrição fica desabilitado

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

**Exemplo:**
```json
[
  {
    "name": "Maria Silva",
    "photo": "https://exemplo.com/foto.jpg",
    "title": "Solutions Architect",
    "company": "AWS",
    "talk": "Construindo aplicações serverless modernas",
    "bio": "Arquiteta de soluções com 10 anos de experiência em cloud computing.",
    "keynote": true,
    "social": {
      "linkedin": "https://www.linkedin.com/in/mariasilva/",
      "twitter": "https://twitter.com/mariasilva"
    }
  }
]
```

**Notas:**
- Palestrantes com `"keynote": true` são exibidos primeiro, em cards maiores
- Para fotos locais, importe no `index.tsx` e use um `photoMap` (veja `centro-oeste/index.tsx` como exemplo)

---

### 3. `schedule.json` — Programação

Grade de programação do evento. **Se o array estiver vazio (`[]`), a seção não é exibida.**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `time` | `string` | ✅ | Horário (ex: "09:00 - 09:50") |
| `title` | `string` | ✅ | Título da atividade |
| `speaker` | `string` | ✅ | Nome do palestrante ou "Organização" |
| `track` | `string` | ✅ | Trilha (ex: "Palco Talk", "Palco Hands-On", "Geral") |
| `level` | `string` | ❌ | Nível: "Iniciante", "Intermediário", "Avançado" ou vazio |

**Exemplo:**
```json
[
  {
    "time": "09:00 - 09:10",
    "title": "Abertura do Community Day",
    "speaker": "Comunidades AWS User Groups",
    "track": "Geral",
    "level": ""
  },
  {
    "time": "09:10 - 09:50",
    "title": "Serverless na prática com AWS Lambda",
    "speaker": "João Santos",
    "track": "Palco Talk",
    "level": "Intermediário"
  }
]
```

**Notas:**
- Itens com `track: "Geral"` aparecem como intervalos (credenciamento, almoço, coffee break)
- O nível (`level`) é exibido como badge colorido no card da atividade
- Ordene cronologicamente no JSON — a renderização segue a ordem do array

---

### 4. `sponsors.json` — Patrocinadores

Lista de patrocinadores agrupados por tier. **Se o array estiver vazio (`[]`), a seção não é exibida.**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | `string` | ✅ | Nome do patrocinador |
| `logo` | `string` | ✅ | URL da imagem do logo |
| `url` | `string` | ✅ | Site do patrocinador |
| `tier` | `string` | ✅ | Nível: `"diamond"`, `"gold"`, `"silver"`, `"bronze"` ou `"community"` |

**Exemplo:**
```json
[
  {
    "name": "AWS",
    "logo": "https://exemplo.com/aws-logo.png",
    "url": "https://aws.amazon.com/",
    "tier": "diamond"
  },
  {
    "name": "Startup XYZ",
    "logo": "https://exemplo.com/startup.png",
    "url": "https://startup.xyz/",
    "tier": "silver"
  }
]
```

**Notas:**
- A renderização agrupa automaticamente por tier e exibe na ordem: Diamond → Gold → Silver → Bronze → Community
- Logos de tiers mais altos (Diamond) aparecem maiores

---

### 5. `organizers.json` — Organizadores

Lista da equipe organizadora. **Se o array estiver vazio (`[]`), a seção não é exibida.**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | `string` | ✅ | Nome completo |
| `photo` | `string` | ✅ | URL da foto ou nome do arquivo local |
| `social` | `object` | ❌ | Redes sociais |
| `social.linkedin` | `string` | ❌ | URL do LinkedIn |
| `social.instagram` | `string` | ❌ | URL do Instagram |
| `social.twitter` | `string` | ❌ | URL do X/Twitter |

**Exemplo:**
```json
[
  {
    "name": "Priscila Araujo",
    "photo": "priscila.jpg",
    "social": {
      "linkedin": "https://www.linkedin.com/in/priaaraujo/"
    }
  },
  {
    "name": "Paloma Lataliza",
    "photo": "https://exemplo.com/paloma.jpg",
    "social": {
      "twitter": "https://x.com/paloma"
    }
  }
]
```

**Notas:**
- Para fotos locais, coloque o arquivo em `assets/` e use um `photoMap` no `index.tsx` para resolver o caminho (veja `centro-oeste/index.tsx`)
- Para fotos externas (URL completa), use diretamente no campo `photo`
- Apenas as redes sociais preenchidas no objeto `social` serão exibidas como ícones

---

## Como Adicionar uma Nova Região

### Passo 1: Criar a pasta da região

```
src/regions/nova-regiao/
├── assets/
│   └── postcard-cidade.png       # Imagem do hero (postal da cidade)
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

> **Se houver fotos locais de organizadores/palestrantes**, importe-as e crie um `photoMap` para resolver os caminhos (veja `centro-oeste/index.tsx` como referência).

### Passo 3: Registrar a rota no `App.tsx`

```tsx
import NovaRegiao from "./regions/nova-regiao/index.tsx";

// Dentro de <Routes>:
<Route path="/nova-regiao" element={<NovaRegiao />} />
```

### Passo 4: Adicionar à página principal

Atualize `src/components/RegionsSection.tsx` para incluir o card da nova região com link para `/nova-regiao`.

---

## Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`.

```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## Edições Anteriores

As páginas de edições anteriores são arquivos HTML estáticos armazenados em `public/hist/`:

- `/hist/2024-nov/index.html` — Edição Novembro 2024
- `/hist/2025-dec/index.html` — Edição Dezembro 2025

Para adicionar uma nova edição anterior, basta criar uma nova pasta em `public/hist/[ano-mes]/` com o `index.html` completo.

---

## Região Modelo

A pasta `src/regions/regiaomodelo/` contém um **exemplo completo** com todos os JSONs preenchidos. Use como referência ao criar conteúdo para novas regiões.

Acesse em: [/regiaomodelo](https://awscday26br.lovable.app/regiaomodelo)

---

## Links Úteis

- 🌐 [AWS Community Day Brasil](https://www.awscommunityday.com.br)
- 📜 [Código de Conduta](https://github.com/awscommunitydaybrasil/codigo-de-conduta)
- 📺 [YouTube](https://www.youtube.com/@awscommunitybrasil)
- 📸 [Instagram](https://www.instagram.com/awscommunitybrasil)
