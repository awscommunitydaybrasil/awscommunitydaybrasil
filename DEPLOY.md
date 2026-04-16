# 🚀 Guia de Deploy no GitHub Pages

Este guia explica como fazer o deploy deste projeto no GitHub Pages usando GitHub Actions.

## 📋 Pré-requisitos

- Repositório no GitHub
- Código commitado e enviado para o GitHub

## ⚙️ Configuração no GitHub

### Passo 1: Habilitar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Fonte), selecione:
   - **Source**: GitHub Actions

### Passo 2: Configuração Base

A configuração já está ajustada para o repositório:
- **Repositório**: `https://github.com/marcelojpaiva/awscommunitydaybrasil26`
- **URL do site**: `https://marcelojpaiva.github.io/awscommunitydaybrasil26/`
- **Base configurada**: `/awscommunitydaybrasil26/`

✅ Nenhuma alteração adicional necessária no `vite.config.ts`!

## 🚀 Deploy

### Deploy Automático

O deploy acontece automaticamente quando você faz push para a branch `main`:

```bash
git add .
git commit -m "Configurar GitHub Pages"
git push origin main
```

### Deploy Manual

Você também pode executar o workflow manualmente:

1. Vá até a aba **Actions** no GitHub
2. Selecione o workflow "Deploy to GitHub Pages"
3. Clique em **Run workflow**
4. Selecione a branch e clique em **Run workflow**

## 📊 Acompanhar o Deploy

1. Vá até a aba **Actions** no repositório
2. Você verá o workflow em execução
3. Aguarde até que apareça um ✅ verde
4. Seu site estará disponível em: **https://marcelojpaiva.github.io/awscommunitydaybrasil26/**

## 🔧 Arquivos Criados

- `.github/workflows/deploy.yml` - Workflow do GitHub Actions
- `public/.nojekyll` - Evita processamento Jekyll do GitHub
- `vite.config.ts` - Atualizado com configuração `base`

## 🐛 Troubleshooting

### Página em branco ou erro 404

- ✅ A configuração `base` já está correta: `/awscommunitydaybrasil26/`
- Certifique-se de que o GitHub Pages está configurado para usar "GitHub Actions"

### Build falha

- Verifique os logs na aba Actions
- Certifique-se de que `npm run build` funciona localmente

### Assets não carregam

- ✅ A configuração `base` já está ajustada para `/awscommunitydaybrasil26/`
- Se ainda houver problemas, limpe o cache do navegador com Ctrl+Shift+R

## 📝 Notas

- O deploy leva cerca de 1-2 minutos
- Mudanças podem levar alguns minutos para aparecer devido ao cache do GitHub
- Use Ctrl+Shift+R (ou Cmd+Shift+R no Mac) para forçar atualização do cache no navegador
