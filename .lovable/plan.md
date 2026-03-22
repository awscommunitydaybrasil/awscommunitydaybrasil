

## Plano: Substituir header principal pelo menu regional na página modelo

### O que sera feito

Remover o `<Header />` global da `RegiaoModeloPage.tsx` e transformar o menu regional sticky (que ja existe) no header principal da pagina. O menu regional passara a incluir o logo com link para home e os anchor links das secoes, ocupando a posicao fixa no topo (z-50, top-0).

### Mudancas em `src/regions/regiaomodelo/RegiaoModeloPage.tsx`

1. **Remover** o import e uso de `<Header />` (linhas 3 e 166)
2. **Transformar** o nav sticky (linha 203) no header fixo da pagina:
   - Mover para `fixed top-0` com z-50 (mesmo comportamento do Header global)
   - Adicionar logo (link para `/`) no lado esquerdo
   - Manter os anchor links (Sobre, Palestrantes, Programacao, Patrocinadores, Organizadores) no centro/direita
   - Adicionar menu hamburguer mobile para os anchor links
   - Manter o indicador de secao ativa (IntersectionObserver ja implementado)
3. **Ajustar** o `pt-16` do hero para compensar o novo header fixo
4. **Remover** o link "Voltar para Home" do hero (ja tera o logo no header)

### Resultado

Ao acessar `/regiaomodelo`, o usuario vera apenas o menu regional no topo -- sem o header generico do site. O logo leva de volta a home, e os links navegam pelas secoes da pagina.

