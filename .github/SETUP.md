# ⚡ Setup Rápido - GitHub Pages

## Configuração Atual

- **Repositório**: https://github.com/marcelojpaiva/awscommunitydaybrasil26
- **URL do Site**: https://marcelojpaiva.github.io/awscommunitydaybrasil26/
- **Base Path**: `/awscommunitydaybrasil26/`

## 🎯 Checklist de Deploy

### 1️⃣ Configurar GitHub Pages (FAÇA ISSO PRIMEIRO!)

1. Acesse: https://github.com/marcelojpaiva/awscommunitydaybrasil26/settings/pages
2. Em **Source**, selecione: **GitHub Actions**
3. Salve (não precisa selecionar branch)

### 2️⃣ Fazer Push do Código

```bash
# Adicionar todos os arquivos
git add .

# Commit
git commit -m "Configurar GitHub Pages com Actions"

# Push para main
git push origin main
```

### 3️⃣ Acompanhar Deploy

1. Acesse: https://github.com/marcelojpaiva/awscommunitydaybrasil26/actions
2. Aguarde o workflow "Deploy to GitHub Pages" completar (1-2 minutos)
3. Quando aparecer ✅ verde, acesse: https://marcelojpaiva.github.io/awscommunitydaybrasil26/

## 🧪 Testar Localmente

Antes de fazer o deploy, teste se o build funciona:

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Fazer build
npm run build

# Testar o build localmente
npm run preview
```

O preview vai abrir em `http://localhost:4173/awscommunitydaybrasil26/`

## ✅ Arquivos Configurados

- ✅ `.github/workflows/deploy.yml` - Workflow de deploy automático
- ✅ `vite.config.ts` - Base path configurado
- ✅ `public/.nojekyll` - Bypass do Jekyll
- ✅ Documentação criada

## 🔄 Próximos Deploys

Após a configuração inicial, todo push para `main` fará deploy automático:

```bash
git add .
git commit -m "Sua mensagem"
git push origin main
```

## 📞 Problemas?

Se algo não funcionar:

1. Verifique se configurou "GitHub Actions" em Settings → Pages
2. Veja os logs em: https://github.com/marcelojpaiva/awscommunitydaybrasil26/actions
3. Certifique-se que `npm run build` funciona localmente
