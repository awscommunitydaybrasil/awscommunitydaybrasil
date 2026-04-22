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

<div class="badge">National Sponsorship 2026</div>

# AWS Community Day *Brasil 2026*

5 Regions · 5 Cities · 1 Opportunity

---

<!-- _class: stats -->

# The largest AWS community event in Brazil

<div class="sub">For the first time in history, across <strong>all 5 regions of the country</strong>.</div>

<div class="sg">
<div><div class="n">5</div><div class="l">Regions</div></div>
<div><div class="n">5</div><div class="l">Cities</div></div>
<div><div class="n">6</div><div class="l">Years</div></div>
<div><div class="n">3</div><div class="l">Tiers</div></div>
</div>

---

<!-- _class: content -->

## About *AWS Community Day*

Events organized by **AWS user groups** around the world, with workshops and networking led by industry-leading professionals. In Brazil since **2020**, it has already gathered thousands of attendees.

<div class="cards">
<div class="card"><div class="ico">🎤</div><h3>High-level technical content</h3><p>Sessions for all levels: architecture, security, data, AI/ML, DevOps and more.</p></div>
<div class="card"><div class="ico">🤝</div><h3>Qualified networking</h3><p>Architects, engineers, devs and decision-makers who use AWS daily.</p></div>
<div class="card"><div class="ico">🌎</div><h3>Unprecedented national reach</h3><p>In 2026, the event covers Norte, Nordeste, Centro-Oeste, Sudeste and Sul.</p></div>
<div class="card"><div class="ico">❤️</div><h3>Social impact</h3><p>Ticket revenue donated to charity.</p></div>
</div>

---

<!-- _class: timeline -->

## Our *Journey*

<div class="tl">
<div class="tl-i"><span class="y">2020–2022</span> <span class="t">Online editions</span><br><span class="d">Birth and consolidation during the pandemic</span></div>
<div class="tl-i"><span class="y">2023</span> <span class="t">Return to in-person</span><br><span class="d">Ribeirão Preto / SP — First in-person edition</span></div>
<div class="tl-i"><span class="y">2024</span> <span class="t">Simultaneous edition</span><br><span class="d">Goiânia + Florianópolis — Expansion to two cities</span></div>
<div class="tl-i"><span class="y">2025</span> <span class="t">Largest edition yet</span><br><span class="d">Campinas / SP — Expo Dom Pedro — Record attendance</span></div>
<div class="tl-i"><span class="y">2026</span> <span class="t">5 Regions of Brazil 🚀</span><br><span class="d">Historic edition covering the entire national territory</span></div>
</div>

---

<!-- _class: editions -->

## *2026* Editions

<div class="ed-grid">
<div class="ed"><div class="r">Centro-Oeste</div><div class="c">Taguatinga / DF</div><div class="dt">June 27</div></div>
<div class="ed"><div class="r">Sul</div><div class="c">Curitiba / PR</div><div class="dt">September 19</div></div>
<div class="ed"><div class="r">Sudeste</div><div class="c">Belo Horizonte / MG</div><div class="dt">August 22</div></div>
<div class="ed"><div class="r">Nordeste</div><div class="c">Salvador / BA</div><div class="dt">October 3</div></div>
<div class="ed"><div class="r">Norte</div><div class="c">Belém / PA</div><div class="dt">November 14</div></div>
</div>

---

<!-- _class: table-slide -->

## National *Sponsorship Tiers*

<div class="sub">Presence at all 5 editions with a 10% discount on the sum of individual regional tiers.</div>

| Benefit | 🥉 Bronze | 🥈 Silver | 💎 Platinum |
|-----------|:---------:|:--------:|:----------:|
| Logo on all editions websites | ✓ | ✓ | ✓ |
| Social media promotion (5 regions) | ✓ | ✓ | ✓ |
| Logo on banners / marketing materials | ✓ | ✓ | ✓ |
| Swag distribution in attendee kit | ✓ | ✓ | ✓ |
| Tickets (total across 5 regions) | 10 | 20 | 40 |
| Featured stage logo | — | ✓ | ✓ |
| Booth / Promotional stand | — | ✓ | ✓ |
| Brand on screens / room banners | — | ✓ | ✓ |

---

<!-- _class: table-slide -->

## *Platinum* Exclusive Benefits

<div class="sub">Maximum visibility with premium benefits across all 5 regions.</div>

| Benefit | 🥉 Bronze | 🥈 Silver | 💎 Platinum |
|-----------|:---------:|:--------:|:----------:|
| Institutional video display (up to 60s) | — | — | ✓ |
| Access to attendee mailing list (opt-in) | — | — | ✓ |
| Logo on badge lanyards ¹ | — | — | ✓ |
| Featured logo at Warm-up events ² | — | — | ✓ |
| Talk at the event ³ | — | — | ✓ |

<span class="note">¹ Centro-Oeste region only · ² Sul region only · ³ Norte region only</span>

---

<!-- _class: invest -->

## *Investment*

<div class="price-grid">
<div class="price-card">
<div class="tier">🥉 Bronze</div>
<div class="val">R$ 12.600</div>
<div class="desc">Visibility across 5 regions<br>10 tickets</div>
</div>
<div class="price-card">
<div class="tier">🥈 Silver</div>
<div class="val">R$ 24.300</div>
<div class="desc">Stand + stage across 5 regions<br>20 tickets</div>
</div>
<div class="price-card featured">
<div class="tier">💎 Platinum</div>
<div class="val">R$ 45.000</div>
<div class="desc">Full premium presence<br>40 tickets</div>
</div>
</div>

<div class="footnote">Prices with 10% discount on the sum of individual regional tiers.</div>

---

<!-- _class: cta -->

# Be part of this history

Take your brand to every region of Brazil at the largest AWS community event in the country.

<div class="btn">I want to sponsor →</div>

<div class="contact">📧 brasil@awscommunity.com.br · 🌐 awscommunityday.com.br</div>
