

## Plano de Ajustes Globais e Regionais

### 1. Página Global

**1.1 - Líderes por ordem de data**
- `src/components/LeadersSection.tsx`: Ordenar o array `leaders` por data do evento (já está quase em ordem, mas Sul/19-09 vem antes de Nordeste/03-10 — precisa reordenar: Centro-Oeste 27/06, Sudeste 22/08, Sul 19/09, Nordeste 03/10, Norte 14/11).

**1.2 e 1.3 - Edições Anteriores como HTML estático**
- Copiar o HTML completo das páginas `https://www.awscommunityday.com.br/hist/2024-nov/index.html` e `https://www.awscommunityday.com.br/hist/2025-dec/index.html` para `public/hist/2024-nov/index.html` e `public/hist/2025-dec/index.html` respectivamente.
- Atualizar `src/components/PastEditionsSection.tsx`: mudar os links dessas duas edições para `/hist/2024-nov/index.html` e `/hist/2025-dec/index.html` (mantendo `target="_blank"`).

**1.4 - Rodapé com redes sociais**
- `src/components/Footer.tsx`: Adicionar ícones de YouTube e Instagram linkando para `https://www.youtube.com/@awscommunitybrasil` e `https://www.instagram.com/awscommunitybrasil`. Incluir também o link do código de conduta AWS como já existe no rodapé regional.

**1.5 - Favicon a partir da logo**
- Usar a logo existente `src/assets/logo-brasil-generico.png` como base. Copiar para `public/favicon.png` e atualizar `index.html` para referenciar `/favicon.png`.

---

### 2. Páginas Regionais

**2.1 - Código de conduta**
- Já existe no `RegionFooter.tsx` com link para `https://aws.amazon.com/codeofconduct/`. Nenhuma alteração necessária — já está em todas as regionais.

**2.2 - Data e horário nos cards**
- Adicionar campo `eventTime` nos `config.json` de cada região (ex: `"eventTime": "09h às 18h"`).
- Atualizar `RegionConfig` em `types.ts` com `eventTime?: string`.
- Atualizar `InfoCardsSection.tsx` para exibir a data formatada do `targetDate` e o horário do `eventTime` no card "Data e Hora", em vez de "Em Breve!" quando já há data.
- Ajustar datas nos configs para corresponder à página global:
  - Centro-Oeste: 2026-06-27 (já correto)
  - Sudeste: 2026-08-22 (atualmente 2026-06-21 — corrigir)
  - Sul: 2026-09-19 (atualmente 2026-10-01 — corrigir)
  - Nordeste: 2026-10-03 (atualmente 2026-08-01 — corrigir)
  - Norte: 2026-11-14 (atualmente 2026-09-01 — corrigir)
  - RegiaoModelo: manter como está

**2.3 - Redes sociais dos organizadores**
- Atualizar `Organizer` em `types.ts`: trocar `linkedin: string` por `social?: { linkedin?: string; instagram?: string; twitter?: string; }`.
- Atualizar `OrganizersSection.tsx`: renderizar ícones de LinkedIn, Instagram e X abaixo do nome, condicionalmente.
- Atualizar os JSONs de organizers existentes (regiaomodelo e centro-oeste) para usar o novo formato `social`.

**2.4 - Reformatar schedule.json da regiaomodelo**
- Reformatar `src/regions/regiaomodelo/data/schedule.json` com indentação de 2 espaços, cada campo em linha separada para facilitar leitura.

---

### Arquivos a modificar
| Arquivo | Ação |
|---------|------|
| `src/components/LeadersSection.tsx` | Reordenar leaders por data |
| `public/hist/2024-nov/index.html` | Criar com HTML estático |
| `public/hist/2025-dec/index.html` | Criar com HTML estático |
| `src/components/PastEditionsSection.tsx` | Atualizar links |
| `src/components/Footer.tsx` | Adicionar redes sociais e código de conduta |
| `public/favicon.png` | Copiar da logo |
| `index.html` | Atualizar ref do favicon |
| `src/regions/types.ts` | Adicionar `eventTime` em RegionConfig, reformular `Organizer.social` |
| `src/regions/components/InfoCardsSection.tsx` | Exibir data + horário |
| `src/regions/components/OrganizersSection.tsx` | Ícones sociais |
| `src/regions/*/data/config.json` (5 regiões) | Corrigir datas + adicionar `eventTime` |
| `src/regions/regiaomodelo/data/organizers.json` | Migrar para formato `social` |
| `src/regions/centro-oeste/data/organizers.json` | Migrar para formato `social` |
| `src/regions/regiaomodelo/data/schedule.json` | Reformatar indentação |

