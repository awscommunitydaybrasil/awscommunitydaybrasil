

## Plano: Documentar o projeto no README.md

### Arquivo: `README.md`

Reescrever completamente o README com as seguintes seções:

**1. Visão geral** — Descrição do projeto (site AWS Community Day Brasil 2026).

**2. Stack técnica** — React 18, Vite 5, TypeScript, Tailwind CSS, shadcn/ui, React Router, Lucide Icons.

**3. Estrutura do projeto** — Diagrama ASCII mostrando a árvore de diretórios relevante (`src/regions/[regiao]/data/`, `src/regions/components/`, `public/hist/`).

**4. Arquitetura regional** — Explicação do sistema modular: cada região tem sua pasta com `index.tsx`, `assets/` e `data/` contendo 5 arquivos JSON. O componente unificado `RegionPage.tsx` renderiza tudo.

**5. Guia de conteúdo por arquivo JSON** — Para cada arquivo, incluir: finalidade, campos obrigatórios/opcionais, tipos aceitos e exemplo completo:

| Arquivo | Finalidade |
|---------|-----------|
| `config.json` | Configuração geral da região (nome, data, local, inscrição, redes sociais, grupos) |
| `speakers.json` | Lista de palestrantes (nome, foto, cargo, palestra, keynote, redes sociais) |
| `schedule.json` | Programação do evento (horário, título, palestrante, trilha, nível) |
| `sponsors.json` | Patrocinadores por tier (diamond, gold, silver, bronze, community) |
| `organizers.json` | Organizadores com foto e redes sociais (linkedin, instagram, twitter) |

Cada um com exemplo JSON mínimo funcional e notas sobre comportamento (ex: seções vazias exibem "Em Breve", keynotes aparecem primeiro, sponsors agrupam por tier).

**6. Como adicionar uma nova região** — Passo a passo: criar pasta, copiar template dos JSONs, adicionar assets, registrar rota no `App.tsx`.

**7. Como rodar localmente** — `npm install` + `npm run dev`.

**8. Edições anteriores** — Nota sobre os HTMLs estáticos em `public/hist/`.

