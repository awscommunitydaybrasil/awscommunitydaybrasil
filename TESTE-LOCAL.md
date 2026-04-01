# 🧪 Como Testar Localmente Antes do Deploy

## Teste Rápido

### 1. Build de Produção

```bash
npm run build
```

Deve completar sem erros e gerar a pasta `dist/`.

### 2. Preview Local

```bash
npm run preview
```

Isso vai iniciar um servidor local em: `http://localhost:4173/awscommunitydaybrasil26/`

### 3. Testar Rotas

Abra o navegador e teste:

- ✅ http://localhost:4173/awscommunitydaybrasil26/
- ✅ http://localhost:4173/awscommunitydaybrasil26/regiaomodelo
- ✅ http://localhost:4173/awscommunitydaybrasil26/centro-oeste
- ✅ http://localhost:4173/awscommunitydaybrasil26/nordeste
- ✅ http://localhost:4173/awscommunitydaybrasil26/norte
- ✅ http://localhost:4173/awscommunitydaybrasil26/sudeste
- ✅ http://localhost:4173/awscommunitydaybrasil26/sul

### 4. Testar Navegação

- Clique nos links internos
- Use o botão voltar do navegador
- Faça refresh (F5) em cada página
- Tudo deve funcionar perfeitamente!

## ⚠️ Nota Importante

O servidor de preview do Vite já lida com rotas SPA automaticamente, então você NÃO verá o erro 404 localmente. A solução do `404.html` só é necessária no GitHub Pages.

Para simular o comportamento do GitHub Pages localmente, você precisaria de um servidor HTTP estático simples, mas não é necessário - confie na solução implementada!

## ✅ Checklist Antes do Deploy

- [ ] `npm run build` completa sem erros
- [ ] `npm run preview` funciona
- [ ] Todas as rotas carregam no preview
- [ ] Navegação entre páginas funciona
- [ ] Refresh (F5) não quebra as páginas
- [ ] Assets (imagens, CSS) carregam corretamente

Se tudo estiver OK, pode fazer o deploy com confiança! 🚀

## 🚀 Fazer Deploy

```bash
git add .
git commit -m "Configurar GitHub Pages com solução para rotas SPA"
git push origin main
```

Aguarde 1-2 minutos e acesse: https://marcelojpaiva.github.io/awscommunitydaybrasil26/
