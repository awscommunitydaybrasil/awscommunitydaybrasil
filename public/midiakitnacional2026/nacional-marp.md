---
marp: true
theme: uncover
paginate: false
style: |
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');

  section {
    font-family: 'Inter', sans-serif;
    background: #0a0a1a;
    color: #e0e0e0;
    padding: 60px 70px;
  }

  /* === CAPA === */
  section.cover {
    background: linear-gradient(135deg, #0a0a1a 0%, #1a0a3a 40%, #2d1065 70%, #1a0a3a 100%);
    display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
  }
  section.cover::before {
    content: ''; position: absolute; top: -120px; right: -120px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%);
  }
  section.cover::after {
    content: ''; position: absolute; bottom: -100px; left: -100px;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%);
  }
  section.cover .badge {
    display: inline-block; background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4);
    padding: 10px 32px; border-radius: 50px; font-size: 0.65em; font-weight: 700;
    letter-spacing: 4px; text-transform: uppercase; color: #c4b5fd; margin-bottom: 24px;
  }
  section.cover h1 { font-size: 3.2em; line-height: 1.05; margin: 0; color: #fff; }
  section.cover h1 em { font-style: normal; background: linear-gradient(90deg,#a78bfa,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  section.cover p { color: #9999b5; font-size: 1em; margin-top: 28px; letter-spacing: 2px; }

  /* === STATS === */
  section.stats {
    background: linear-gradient(160deg, #0a0a1a 0%, #150a30 100%);
    text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;
  }
  section.stats h1 { font-size: 2em; color: #fff; margin-bottom: 8px; }
  section.stats .sub { color: #9999b5; font-size: 0.95em; margin-bottom: 40px; }
  .sg { display: flex; gap: 40px; justify-content: center; }
  .sg > div { text-align: center; }
  .sg .n { font-size: 3.5em; font-weight: 900; background: linear-gradient(90deg,#a78bfa,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1.1; }
  .sg .l { font-size: 0.7em; color: #7777aa; margin-top: 4px; text-transform: uppercase; letter-spacing: 2px; }

  /* === CONTEÚDO === */
  section.content { background: linear-gradient(170deg, #0a0a1a 0%, #120a28 100%); }
  section.content h2 { font-size: 1.8em; margin-bottom: 16px; color: #fff; }
  section.content h2 em { font-style: normal; background: linear-gradient(90deg,#a78bfa,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  section.content p { color: #9999b5; font-size: 0.82em; line-height: 1.7; }
  section.content strong { color: #c4b5fd; }

  /* === CARDS === */
  .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
  .card { background: linear-gradient(145deg, rgba(139,92,246,0.08), rgba(236,72,153,0.04)); border: 1px solid rgba(139,92,246,0.15); border-radius: 14px; padding: 20px; }
  .card .ico { font-size: 1.6em; margin-bottom: 8px; }
  .card h3 { font-size: 0.78em; color: #c4b5fd; margin: 0 0 4px; }
  .card p { font-size: 0.65em; color: #8888aa; margin: 0; line-height: 1.5; }

  /* === TIMELINE === */
  section.timeline { background: linear-gradient(170deg, #0a0a1a 0%, #120a28 100%); }
  section.timeline h2 { font-size: 1.8em; color: #fff; margin-bottom: 20px; }
  section.timeline h2 em { font-style: normal; background: linear-gradient(90deg,#a78bfa,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .tl { position: relative; padding-left: 28px; }
  .tl::before { content: ''; position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, #a78bfa, #ec4899); }
  .tl-i { position: relative; margin-bottom: 14px; }
  .tl-i::before { content: ''; position: absolute; left: -26px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: #6b21a8; border: 2px solid #a78bfa; }
  .tl-i .y { font-size: 0.65em; color: #a78bfa; font-weight: 700; }
  .tl-i .t { font-size: 0.72em; color: #e0e0e0; }
  .tl-i .d { font-size: 0.6em; color: #7777aa; }

  /* === EDIÇÕES === */
  section.editions { background: linear-gradient(170deg, #0a0a1a 0%, #120a28 100%); text-align: center; }
  section.editions h2 { font-size: 1.8em; color: #fff; margin-bottom: 24px; }
  section.editions h2 em { font-style: normal; background: linear-gradient(90deg,#a78bfa,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .ed-grid { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .ed { background: linear-gradient(135deg, rgba(107,33,168,0.3), rgba(236,72,153,0.15)); border: 1px solid rgba(139,92,246,0.25); border-radius: 14px; padding: 22px 20px; min-width: 150px; text-align: center; }
  .ed .r { font-size: 0.9em; font-weight: 800; color: #fff; }
  .ed .c { font-size: 0.7em; color: #c4b5fd; margin: 4px 0; }
  .ed .dt { font-size: 0.6em; color: #8888aa; }

  /* === TABELAS === */
  section.table-slide { background: linear-gradient(170deg, #0a0a1a 0%, #120a28 100%); }
  section.table-slide h2 { font-size: 1.5em; color: #fff; margin-bottom: 6px; }
  section.table-slide h2 em { font-style: normal; background: linear-gradient(90deg,#a78bfa,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  section.table-slide .sub { font-size: 0.7em; color: #8888aa; margin-bottom: 14px; }
  table { font-size: 0.58em; width: 100%; border-collapse: collapse; margin-top: 8px; }
  thead th { background: linear-gradient(90deg, rgba(107,33,168,0.35), rgba(236,72,153,0.2)); color: #c4b5fd; padding: 10px 8px; text-align: center; font-size: 0.85em; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(139,92,246,0.3); }
  thead th:first-child { text-align: left; }
  tbody td { padding: 8px; border-bottom: 1px solid rgba(139,92,246,0.08); color: #b0b0c8; text-align: center; }
  tbody td:first-child { text-align: left; color: #d0d0e0; }
  tbody tr:nth-child(even) { background: rgba(139,92,246,0.03); }
  .note { font-size: 0.55em; color: #777; font-style: italic; margin-top: 10px; display: block; }

  /* === INVESTIMENTO === */
  section.invest { background: linear-gradient(135deg, #1a0a3a 0%, #2d1065 50%, #1a0a3a 100%); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; }
  section.invest h2 { font-size: 2em; color: #fff; margin-bottom: 30px; }
  section.invest h2 em { font-style: normal; background: linear-gradient(90deg,#a78bfa,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .price-grid { display: flex; gap: 24px; justify-content: center; }
  .price-card { background: linear-gradient(145deg, rgba(139,92,246,0.12), rgba(236,72,153,0.06)); border: 1px solid rgba(139,92,246,0.25); border-radius: 18px; padding: 30px 36px; text-align: center; min-width: 180px; }
  .price-card.featured { border-color: rgba(236,72,153,0.5); background: linear-gradient(145deg, rgba(139,92,246,0.2), rgba(236,72,153,0.12)); transform: scale(1.05); }
  .price-card .tier { font-size: 0.75em; color: #8888aa; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; }
  .price-card .val { font-size: 1.8em; font-weight: 900; background: linear-gradient(90deg,#a78bfa,#ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .price-card .desc { font-size: 0.6em; color: #7777aa; margin-top: 6px; }
  section.invest .footnote { font-size: 0.65em; color: #7777aa; margin-top: 28px; }

  /* === CTA === */
  section.cta {
    background: linear-gradient(135deg, #2d1065 0%, #6b21a8 40%, #ec4899 100%);
    text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;
  }
  section.cta h1 { font-size: 2.6em; color: #fff; margin-bottom: 16px; }
  section.cta p { color: rgba(255,255,255,0.8); font-size: 1em; margin-bottom: 30px; }
  section.cta .btn { display: inline-block; background: #fff; color: #6b21a8; padding: 14px 44px; border-radius: 50px; font-weight: 800; font-size: 0.9em; text-decoration: none; }
  section.cta .contact { font-size: 0.75em; color: rgba(255,255,255,0.6); margin-top: 20px; }
---

<!-- _class: cover -->

<div class="badge">Patrocínio Nacional 2026</div>

# AWS Community Day *Brasil 2026*

5 Regiões · 5 Cidades · 1 Oportunidade

---

<!-- _class: stats -->

# O maior evento comunitário AWS do Brasil

<div class="sub">Pela primeira vez na história, em <strong>todas as 5 regiões do país</strong>.</div>

<div class="sg">
<div><div class="n">5</div><div class="l">Regiões</div></div>
<div><div class="n">5</div><div class="l">Cidades</div></div>
<div><div class="n">6</div><div class="l">Anos</div></div>
<div><div class="n">3</div><div class="l">Cotas</div></div>
</div>

---

<!-- _class: content -->

## Sobre o *AWS Community Day*

Eventos organizados pelos **grupos de usuários AWS** ao redor do mundo, com workshops e networking liderados por profissionais referência no mercado. No Brasil desde **2020**, já reuniu milhares de participantes.

<div class="cards">
<div class="card"><div class="ico">🎤</div><h3>Conteúdo técnico de alto nível</h3><p>Sessões para todos os níveis: arquitetura, segurança, dados, IA/ML, DevOps e mais.</p></div>
<div class="card"><div class="ico">🤝</div><h3>Networking qualificado</h3><p>Arquitetos, engenheiros, devs e decisores que usam AWS no dia a dia.</p></div>
<div class="card"><div class="ico">🌎</div><h3>Alcance nacional inédito</h3><p>Em 2026, o evento cobre Norte, Nordeste, Centro-Oeste, Sudeste e Sul.</p></div>
<div class="card"><div class="ico">❤️</div><h3>Impacto social</h3><p>Receita de ingressos doada a instituições de caridade.</p></div>
</div>

---

<!-- _class: timeline -->

## Nossa *Trajetória*

<div class="tl">
<div class="tl-i"><span class="y">2020–2022</span> <span class="t">Edições online</span><br><span class="d">Nascimento e consolidação durante a pandemia</span></div>
<div class="tl-i"><span class="y">2023</span> <span class="t">Retorno presencial</span><br><span class="d">Ribeirão Preto / SP — Primeira edição presencial</span></div>
<div class="tl-i"><span class="y">2024</span> <span class="t">Edição simultânea</span><br><span class="d">Goiânia + Florianópolis — Expansão para duas cidades</span></div>
<div class="tl-i"><span class="y">2025</span> <span class="t">Maior edição até então</span><br><span class="d">Campinas / SP — Expo Dom Pedro — Público recorde</span></div>
<div class="tl-i"><span class="y">2026</span> <span class="t">5 Regiões do Brasil 🚀</span><br><span class="d">Edição histórica cobrindo todo o território nacional</span></div>
</div>

---

<!-- _class: editions -->

## Edições *2026*

<div class="ed-grid">
<div class="ed"><div class="r">Centro-Oeste</div><div class="c">Taguatinga / DF</div><div class="dt">27 de Junho</div></div>
<div class="ed"><div class="r">Sul</div><div class="c">Curitiba / PR</div><div class="dt">19 de Setembro</div></div>
<div class="ed"><div class="r">Sudeste</div><div class="c">Belo Horizonte / MG</div><div class="dt">22 de Agosto</div></div>
<div class="ed"><div class="r">Nordeste</div><div class="c">Salvador / BA</div><div class="dt">03 de Outubro</div></div>
<div class="ed"><div class="r">Norte</div><div class="c">Belém / PA</div><div class="dt">14 de Novembro</div></div>
</div>

---

<!-- _class: table-slide -->

## Cotas de *Patrocínio Nacional*

<div class="sub">Presença em todas as 5 edições com 10% de desconto sobre a soma das cotas regionais.</div>

| Benefício | 🥉 Bronze | 🥈 Prata | 💎 Platina |
|-----------|:---------:|:--------:|:----------:|
| Logo no site de todas as edições | ✓ | ✓ | ✓ |
| Divulgação nas redes sociais (5 regiões) | ✓ | ✓ | ✓ |
| Logo em banners / materiais de marketing | ✓ | ✓ | ✓ |
| Distribuição de brindes no kit dos participantes | ✓ | ✓ | ✓ |
| Ingressos (total nas 5 regiões) | 10 | 20 | 40 |
| Logo destaque de palco | — | ✓ | ✓ |
| Piso Balcão / Stand promocional | — | ✓ | ✓ |
| Marca nas telas / banners de sala | — | ✓ | ✓ |

---

<!-- _class: table-slide -->

## Benefícios *Exclusivos Platina*

<div class="sub">Máxima visibilidade com benefícios premium nas 5 regiões.</div>

| Benefício | 🥉 Bronze | 🥈 Prata | 💎 Platina |
|-----------|:---------:|:--------:|:----------:|
| Exibição de vídeo institucional (até 60s) | — | — | ✓ |
| Acesso ao mailing dos participantes (opt-in) | — | — | ✓ |
| Logo nos cordões de crachá ¹ | — | — | ✓ |
| Logo destaque nos eventos de Warm-up ² | — | — | ✓ |
| Palestra no evento ³ | — | — | ✓ |

<span class="note">¹ Apenas na região Centro-Oeste · ² Apenas na região Sul · ³ Apenas na região Norte</span>

---

<!-- _class: invest -->

## *Investimento*

<div class="price-grid">
<div class="price-card">
<div class="tier">🥉 Bronze</div>
<div class="val">R$ 12.600</div>
<div class="desc">Visibilidade em 5 regiões<br>10 ingressos</div>
</div>
<div class="price-card">
<div class="tier">🥈 Prata</div>
<div class="val">R$ 24.300</div>
<div class="desc">Stand + palco em 5 regiões<br>20 ingressos</div>
</div>
<div class="price-card featured">
<div class="tier">💎 Platina</div>
<div class="val">R$ 45.000</div>
<div class="desc">Presença premium total<br>40 ingressos</div>
</div>
</div>

<div class="footnote">Valores com 10% de desconto sobre a soma das cotas regionais individuais.</div>

---

<!-- _class: cta -->

# Faça parte desta história

Leve sua marca para todas as regiões do Brasil no maior evento comunitário AWS do país.

<div class="btn">Quero patrocinar →</div>

<div class="contact">📧 brasil@awscommunity.com.br · 🌐 awscommunityday.com.br</div>
