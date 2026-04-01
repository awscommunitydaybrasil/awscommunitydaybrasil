# ✅ Configuração Completa para GitHub Pages

## 🎯 Repositório Configurado

**URL do Repositório**: https://github.com/marcelojpaiva/awscommunitydaybrasil26  
**URL do Site (após deploy)**: https://marcelojpaiva.github.io/awscommunitydaybrasil26/

---

## 📝 Alterações Realizadas

### 1. Workflow do GitHub Actions
✅ Criado: `.github/workflows/deploy.yml`
- Deploy automático ao fazer push na branch `main`
- Build com Node.js 20
- Upload para GitHub Pages

### 2. Configuração do Vite
✅ Atualizado: `vite.config.ts`
- Base path: `/awscommunitydaybrasil26/`
- Garante que assets sejam carregados corretamente

### 3. Configuração do React Router
✅ Atualizado: `src/App.tsx`
- BrowserRouter com basename: `/awscommunitydaybrasil26`
- Rotas funcionarão corretamente no GitHub Pages

### 4. Arquivo .nojekyll
✅ Criado: `public/.nojekyll`
- Previne processamento Jekyll do GitHub
- Permite arquivos/pastas começando com underscore

### 5. Documentação
✅ Criado: `DEPLOY.md` - Guia completo de deploy
✅ Criado: `.github/SETUP.md` - Setup rápido

---

## 🚀 Como Fazer o Deploy (Passo a Passo)

### Passo 1: Configurar GitHub Pages (IMPORTANTE!)

1. Acesse: https://github.com/marcelojpaiva/awscommunitydaybrasil26/settings/pages
2. Em **Build and deployment**:
   - **Source**: Selecione **GitHub Actions**
3. Pronto! Não precisa fazer mais nada nessa tela.

### Passo 2: Testar Localmente (Recomendado)

```bash
# Instalar dependências
npm install

# Fazer build de produção
npm run build

# Testar o build localmente
npm run preview
```

O preview abrirá em: `http://localhost:4173/awscommunitydaybrasil26/`

### Passo 3: Fazer Push para o GitHub

```bash
# Adicionar todos os arquivos
git add .

# Commit com mensagem descritiva
git commit -m "Configurar deploy para GitHub Pages"

# Push para a branch main
git push origin main
```

### Passo 4: Acompanhar o Deploy

1. Acesse: https://github.com/marcelojpaiva/awscommunitydaybrasil26/actions
2. Você verá o workflow "Deploy to GitHub Pages" em execução
3. Aguarde 1-2 minutos até aparecer ✅ verde
4. Acesse seu site: https://marcelojpaiva.github.io/awscommunitydaybrasil26/

---

## 🔄 Próximos Deploys

Após a configuração inicial, é muito simples:

```bash
# Faça suas alterações no código...

git add .
git commit -m "Descrição das alterações"
git push origin main

# O deploy acontece automaticamente! 🎉
```

---

## 🧪 Testando as Rotas

Após o deploy, teste todas as rotas:

- https://marcelojpaiva.github.io/awscommunitydaybrasil26/ (Home)
- https://marcelojpaiva.github.io/awscommunitydaybrasil26/centro-oeste
- https://marcelojpaiva.github.io/awscommunitydaybrasil26/nordeste
- https://marcelojpaiva.github.io/awscommunitydaybrasil26/norte
- https://marcelojpaiva.github.io/awscommunitydaybrasil26/sudeste
- https://marcelojpaiva.github.io/awscommunitydaybrasil26/sul

---

## 🐛 Troubleshooting

### ❌ Página em branco

**Causa**: Configuração do base path incorreta  
**Solução**: Já está configurado corretamente! Se persistir, limpe o cache: Ctrl+Shift+R

### ❌ Erro 404 ao acessar rotas

**Causa**: GitHub Pages não configurado para "GitHub Actions"  
**Solução**: Vá em Settings → Pages → Source: GitHub Actions

### ❌ Build falha no Actions

**Causa**: Erro de dependências ou código  
**Solução**: 
1. Teste localmente: `npm run build`
2. Veja os logs em: https://github.com/marcelojpaiva/awscommunitydaybrasil26/actions

### ❌ Assets (CSS/JS) não carregam

**Causa**: Base path incorreto  
**Solução**: Já está configurado! Verifique se fez push do `vite.config.ts` atualizado

---

## 📊 Monitoramento

### Ver status do último deploy
https://github.com/marcelojpaiva/awscommunitydaybrasil26/actions

### Ver configurações do GitHub Pages
https://github.com/marcelojpaiva/awscommunitydaybrasil26/settings/pages

---

## ✨ Pronto!

Tudo está configurado e pronto para deploy. Basta fazer o push e aguardar alguns minutos! 🚀

**Dúvidas?** Consulte o arquivo `DEPLOY.md` para mais detalhes.
