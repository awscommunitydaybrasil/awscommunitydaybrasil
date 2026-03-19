

## Plano: Substituir título do Hero pela logo

**O que muda:**
- Copiar a imagem `logo-2.png` para `src/assets/logo-community-day.png`
- No `HeroSection.tsx`, remover o `<h1>` com o texto "AWS Community Day / Brasil" e substituir por uma tag `<img>` importada do assets
- Manter o subtítulo "2026", a descrição e o botão como estão
- A imagem terá largura responsiva (ex: `max-w-md md:max-w-lg lg:max-w-2xl`) e `alt` acessível

**Arquivo editado:** `src/components/HeroSection.tsx`
- Adicionar `import logo from "@/assets/logo-community-day.png"`
- Trocar linhas 45-49 (o `<h1>`) por `<img src={logo} alt="AWS Community Day Brasil" className="max-w-sm md:max-w-lg lg:max-w-2xl mx-auto mb-6" />`

