const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('/home/claude/site-data.json', 'utf8'));

const OUT = '/home/claude/site';

// ---------- Shared CSS ----------
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

:root {
  --bg: #0c0b0a;
  --bg-raised: #161412;
  --gold: #c9a15c;
  --gold-dim: #8a7444;
  --burgundy: #6e1f24;
  --burgundy-text: #b5555c;
  --cream: #e9e3d6;
  --grey: #7a746a;
  --line: #2a2622;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--bg);
  color: var(--cream);
  font-family: 'Public Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; }

header {
  position: sticky; top: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 24px 6vw;
  background: rgba(12,11,10,0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
  z-index: 10;
}
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--cream); font-family: 'Fraunces', serif; font-weight: 600; font-size: 16px; letter-spacing: 0.5px; }
.logo span { color: var(--gold); }
.logo-text { font-family: 'Fraunces', serif; font-weight: 600; font-size: 18px; letter-spacing: 0.5px; }
.logo-text span { color: var(--gold); }
nav { display: flex; gap: 32px; }
nav a { color: var(--grey); text-decoration: none; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; transition: color .25s; }
nav a:hover, nav a.active { color: var(--gold); }

.breadcrumb { padding: 24px 6vw 0; font-family: 'Space Mono', monospace; font-size: 12px; color: var(--grey); }
.breadcrumb a { color: var(--grey); text-decoration: none; }
.breadcrumb a:hover { color: var(--gold); }

.page-head { padding: 56px 6vw 40px; border-bottom: 1px solid var(--line); }
.eyebrow { font-family: 'Space Mono', monospace; font-size: 12px; color: var(--gold); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 18px; display: flex; align-items: center; gap: 12px; }
.eyebrow::before { content: ""; width: 28px; height: 1px; background: var(--gold); }
h1.page-title { font-family: 'Fraunces', serif; font-weight: 300; font-size: clamp(36px, 6vw, 72px); line-height: 1; letter-spacing: -0.5px; max-width: 900px; }
.page-sub { max-width: 560px; margin-top: 20px; color: var(--grey); font-size: 16px; line-height: 1.7; }

.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.card { background: var(--bg); padding: 0; text-decoration: none; color: inherit; display: block; transition: background .3s; }
.card:hover { background: var(--bg-raised); }
.card-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; background: #100e0b; filter: grayscale(15%) contrast(1.05); }
.card-body { padding: 22px 24px 26px; }
.card .year { font-family: 'Space Mono', monospace; color: var(--gold); font-size: 13px; letter-spacing: 1px; }
.card .year .repro { color: var(--grey); font-size: 11px; }
.card h3 { font-family: 'Fraunces', serif; font-weight: 500; font-size: 19px; margin-top: 8px; line-height: 1.3; }
.card .nickname { color: var(--gold); font-size: 15px; margin-top: 6px; font-style: italic; font-family: 'Fraunces', serif; font-weight: 500; }
.card .sold-badge { display: inline-block; margin-top: 12px; font-size: 10px; color: var(--grey); border: 1px solid var(--line); padding: 3px 8px; letter-spacing: 1px; text-transform: uppercase; }

section.list { padding: 60px 6vw 120px; }

/* Detail page */
.detail-wrap { display: grid; grid-template-columns: 1.3fr 1fr; gap: 0; }
.detail-img { width: 100%; height: 100%; min-height: 480px; object-fit: cover; background: #100e0b; filter: grayscale(10%) contrast(1.05); }
.detail-info { padding: 56px 5vw; border-left: 1px solid var(--line); }
.detail-nickname { font-family: 'Fraunces', serif; font-style: italic; font-weight: 600; color: var(--gold); font-size: 28px; margin-bottom: 6px; }
.detail-model { font-family: 'Fraunces', serif; font-weight: 300; font-size: clamp(28px, 3vw, 40px); line-height: 1.1; margin-bottom: 28px; }
.spec-table { font-family: 'Space Mono', monospace; font-size: 13px; border-top: 1px solid var(--line); margin-bottom: 28px; }
.spec-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--line); gap: 20px; }
.spec-row .k { color: var(--grey); letter-spacing: 0.5px; text-transform: uppercase; font-size: 11px; }
.spec-row .v { color: var(--cream); text-align: right; }
.detail-desc { color: var(--grey); font-size: 15px; line-height: 1.8; }
.sold-tag { display: inline-block; margin-bottom: 20px; font-size: 11px; color: var(--burgundy-text); border: 1px solid #4a1c1f; padding: 4px 12px; letter-spacing: 1.5px; text-transform: uppercase; }
.photo-gallery-section { padding: 60px 6vw 100px; border-top: 1px solid var(--line); }
.photo-gallery-head { font-family: 'Space Mono', monospace; font-size: 12px; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
.photo-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; }
.photo-gallery-grid img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; filter: grayscale(10%) contrast(1.05); transition: transform .3s, filter .3s; cursor: pointer; }
.photo-gallery-grid img:hover { filter: grayscale(0%) contrast(1.1); transform: scale(1.03); }
.no-photos-note { padding: 40px 6vw 80px; border-top: 1px solid var(--line); color: var(--grey); font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: 1px; }

.hero-flex { display: flex; justify-content: space-between; align-items: center; gap: 40px; flex-wrap: wrap; }
.hero-text { flex: 1 1 480px; }
.brand-mark { flex-shrink: 0; }
.brand-mark svg { width: 260px; height: 260px; }

@media (max-width: 900px) {
  .hero-flex { flex-direction: column; align-items: flex-start; }
  .brand-mark svg { width: 180px; height: 180px; }
  .grid { grid-template-columns: 1fr; }
  .detail-wrap { grid-template-columns: 1fr; }
  .detail-info { border-left: none; border-top: 1px solid var(--line); }
  nav { display: none; }
}

footer { padding: 50px 6vw; border-top: 1px solid var(--line); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; color: var(--grey); font-size: 13px; }
.footer-logo { font-family: 'Fraunces', serif; font-weight: 600; font-size: 15px; letter-spacing: 0.5px; color: var(--cream); display: block; margin-bottom: 6px; }
`;

// ---------- Helpers ----------
function yearLabel(g) {
  if (g.reproOf) {
    return `${g.buildYear} <span class="repro">/ '${String(g.reproOf).slice(2)} Repro</span>`;
  }
  return `${g.buildYear}`;
}

function nav(active) {
  const items = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['collection.html', 'Collection'],
    ['sold.html', 'Sold'],
    ['contact.html', 'Contact'],
  ];
  return items.map(([href, label]) =>
    `<a href="${href}"${active === href ? ' class="active"' : ''}>${label}</a>`
  ).join('\n    ');
}

function header(active) {
  return `<header>
  <a class="logo" href="index.html">CHRIS BURGSTALLER <span>GUITARS</span></a>
  <nav>
    ${nav(active)}
  </nav>
</header>`;
}

function footer() {
  return `<footer>
  <div>
    <span class="footer-logo">CHRIS BURGSTALLER GUITARS</span>
    Salzburg, Austria
  </div>
  <div>&copy; 2026 &mdash; Alle Rechte vorbehalten</div>
</footer>`;
}

function page({ title, active, breadcrumb, body }) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — Chris Burgstaller Guitars</title>
<style>${css}</style>
</head>
<body>
${header(active)}
${breadcrumb || ''}
${body}
${footer()}
</body>
</html>`;
}

function card(g, sold) {
  const img = g.img || 'https://via.placeholder.com/600x450/161412/7a746a?text=Foto+folgt';
  const href = sold ? `guitars/${g.slug}.html` : `guitars/${g.slug}.html`;
  return `<a class="card" href="${href}">
  <img class="card-img" src="${img}" alt="${g.model}" loading="lazy">
  <div class="card-body">
    <div class="year">${yearLabel(g)}</div>
    <h3>${g.model}</h3>
    ${g.nickname ? `<div class="nickname">"${g.nickname}"</div>` : ''}
    ${sold ? '<span class="sold-badge">Verkauft</span>' : ''}
  </div>
</a>`;
}

// ---------- Brand Mark (new logo, SVG) ----------
const brandMarkSVG = `<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chris Burgstaller Guitar Emblem">
  <circle cx="130" cy="130" r="126" fill="none" stroke="#c9a15c" stroke-width="1.5"/>
  <circle cx="130" cy="130" r="115" fill="none" stroke="#c9a15c" stroke-width="0.75"/>
  <path id="arcTop" d="M 40 130 A 90 90 0 0 1 220 130" fill="none"/>
  <path id="arcBottom" d="M 220 140 A 90 90 0 0 1 40 140" fill="none"/>
  <text font-family="Space Mono, monospace" font-size="11.5" letter-spacing="2" fill="#e9e3d6">
    <textPath href="#arcTop" startOffset="50%" text-anchor="middle">CHRIS BURGSTALLER GUITARS</textPath>
  </text>
  <text font-family="Space Mono, monospace" font-size="10.5" letter-spacing="2.2" fill="#c9a15c">
    <textPath href="#arcBottom" startOffset="50%" text-anchor="middle">GRO.RELLATSGRUB.WWW</textPath>
  </text>
  <g transform="translate(130,150) rotate(-12) scale(0.62)" fill="none" stroke="#c9a15c" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 25,15 C 45,10 55,35 52,58 C 50,82 32,98 3,100 C -28,102 -52,82 -54,52 C -56,26 -42,3 -18,-4 C -14,-5 -10,-6 -10,-6 C -2,-9 12,4 25,15 Z" stroke-width="3"/>
    <rect x="-18" y="30" width="34" height="9" rx="2" stroke-width="2"/>
    <rect x="-14" y="52" width="26" height="9" rx="2" stroke-width="2"/>
    <rect x="-10" y="74" width="20" height="6" rx="1.5" stroke-width="2"/>
    <circle cx="30" cy="66" r="5" stroke-width="2"/>
    <circle cx="34" cy="82" r="5" stroke-width="2"/>
    <path d="M -10,-6 L -22,-95 L -2,-95 L 6,-8" stroke-width="2.5"/>
    <line x1="-19" y1="-70" x2="1" y2="-70" stroke-width="1.5" opacity="0.7"/>
    <line x1="-18" y1="-50" x2="0" y2="-50" stroke-width="1.5" opacity="0.7"/>
    <line x1="-17" y1="-30" x2="-1" y2="-30" stroke-width="1.5" opacity="0.7"/>
    <path d="M -22,-95 C -30,-100 -30,-118 -22,-124 L -2,-124 C 4,-118 4,-100 -2,-95 Z" stroke-width="2.5"/>
    <circle cx="-27" cy="-100" r="3" fill="#c9a15c" stroke="none"/>
    <circle cx="-27" cy="-110" r="3" fill="#c9a15c" stroke="none"/>
    <circle cx="-27" cy="-120" r="3" fill="#c9a15c" stroke="none"/>
    <circle cx="3" cy="-100" r="3" fill="#c9a15c" stroke="none"/>
    <circle cx="3" cy="-110" r="3" fill="#c9a15c" stroke="none"/>
    <circle cx="3" cy="-120" r="3" fill="#c9a15c" stroke="none"/>
    <line x1="-19" y1="-95" x2="-6" y2="76" stroke-width="0.8" opacity="0.55"/>
    <line x1="-15" y1="-95" x2="-2" y2="76" stroke-width="0.8" opacity="0.55"/>
    <line x1="-11" y1="-95" x2="2" y2="76" stroke-width="0.8" opacity="0.55"/>
    <line x1="-7" y1="-95" x2="6" y2="76" stroke-width="0.8" opacity="0.55"/>
  </g>
</svg>`;


const featured = data.collection.find(g => g.slug === '1959-cc24-nicky') || data.collection[0];
const indexBody = `<section class="page-head" style="border-bottom:none;">
  <div class="hero-flex">
    <div class="hero-text">
      <div class="eyebrow">Salzburg, Austria — Private Collection</div>
      <h1 class="page-title">Vintage tone.<br><em style="color:var(--gold); font-style:italic; font-weight:600;">Living history.</em></h1>
      <p class="page-sub">Eine handverlesene Sammlung historischer Gibson- und Fender-Instrumente — vom '54er Goldtop-Nachbau bis zur Custom-Shop-Rarität. Jede Gitarre erzählt ihre eigene Geschichte.</p>
    </div>
    <div class="brand-mark">${brandMarkSVG}</div>
  </div>
</section>
<section class="list">
  <div class="grid">
    ${data.collection.slice(0, 6).map(g => card(g, false)).join('\n    ')}
  </div>
  <p style="margin-top:40px;"><a href="collection.html" style="color:var(--gold); text-decoration:none; font-family:'Space Mono',monospace; font-size:13px; letter-spacing:1px;">→ Alle ${data.collection.length} Gitarren ansehen</a></p>
</section>`;

fs.writeFileSync(path.join(OUT, 'index.html'), page({
  title: 'Home', active: 'index.html', body: indexBody
}));

// ---------- collection.html ----------
const collectionBody = `<section class="page-head">
  <div class="eyebrow">The Collection</div>
  <h1 class="page-title">${data.collection.length} Instrumente</h1>
  <p class="page-sub">Sortiert nach Baujahr des jeweiligen Nachbaus bzw. Originals. Reissues zeigen zusätzlich das Jahr des replizierten Vintage-Originals.</p>
</section>
<section class="list">
  <div class="grid">
    ${data.collection.map(g => card(g, false)).join('\n    ')}
  </div>
</section>`;

fs.writeFileSync(path.join(OUT, 'collection.html'), page({
  title: 'Collection', active: 'collection.html', body: collectionBody
}));

// ---------- sold.html ----------
const soldBody = `<section class="page-head">
  <div class="eyebrow">Archive</div>
  <h1 class="page-title">Verkaufte Gitarren</h1>
  <p class="page-sub">Instrumente, die die Sammlung im Laufe der Jahre durchlaufen haben.</p>
</section>
<section class="list">
  <div class="grid">
    ${data.soldGuitars.map(g => card(g, true)).join('\n    ')}
  </div>
</section>`;

fs.writeFileSync(path.join(OUT, 'sold.html'), page({
  title: 'Sold Guitars', active: 'sold.html', body: soldBody
}));

// ---------- about.html ----------
const aboutBody = `<section class="page-head">
  <div class="eyebrow">About</div>
  <h1 class="page-title">Chris Burgstaller</h1>
</section>
<section class="list" style="max-width:700px;">
  <p style="color:var(--grey); font-size:16px; line-height:1.9; margin-bottom:20px;">Willkommen in meiner Welt der feinen Gitarren! Mein Name ist Chris Burgstaller, ich lebe in der wunderschönen Stadt Salzburg, Österreich. Meine Reise mit der E-Gitarre begann in meiner Kindheit — eine Faszination, die nie verblasst ist. Über die Jahre hat sich diese anfängliche Neugier zu einer tiefen Leidenschaft entwickelt, die mich dazu brachte, eine eigene Sammlung aufzubauen.</p>
  <p style="color:var(--grey); font-size:16px; line-height:1.9; margin-bottom:20px;">Ich freue mich, meine Liebe zu diesen Instrumenten mit dir zu teilen. Nimm dir Zeit, die Seite zu erkunden und die Handwerkskunst zu genießen.</p>
  <p style="color:var(--grey); font-size:16px; line-height:1.9;">Bist du auf der Suche, deine Sammlung zu erweitern, oder möchtest du ein besonderes Instrument in gute Hände geben? Ob du eines meiner Stücke erwerben möchtest oder eine interessante Gitarre zu verkaufen hast — ich freue mich, von dir zu hören.</p>
  <p style="color:var(--cream); font-family:'Fraunces',serif; font-style:italic; margin-top:32px;">Keep on rocking,<br><strong>Chris Burgstaller</strong></p>
</section>`;

fs.writeFileSync(path.join(OUT, 'about.html'), page({
  title: 'About', active: 'about.html', body: aboutBody
}));

// ---------- contact.html ----------
const contactBody = `<section class="page-head">
  <div class="eyebrow">Get in Touch</div>
  <h1 class="page-title">Kontakt</h1>
  <p class="page-sub">Interesse an einem Instrument aus der Sammlung, oder du hast selbst eine interessante Gitarre abzugeben? Schreib mir gerne.</p>
</section>
<section class="list">
  <p style="font-family:'Space Mono',monospace; color:var(--gold);">[E-Mail-Adresse hier ergänzen]</p>
</section>`;

fs.writeFileSync(path.join(OUT, 'contact.html'), page({
  title: 'Contact', active: 'contact.html', body: contactBody
}));

// ---------- Individual guitar pages ----------
function detailPage(g, sold) {
  const img = g.img || 'https://via.placeholder.com/900x700/161412/7a746a?text=Foto+folgt';
  const listHref = sold ? '../sold.html' : '../collection.html';
  const listLabel = sold ? 'Sold Guitars' : 'Collection';

  const specRows = [
    ['Baujahr', g.buildYear],
    g.reproOf ? ['Original-Modelljahr', g.reproOf] : null,
    ['Finish', g.finish],
    ['Seriennummer', g.serial],
    ['Gewicht', g.weightKg ? `${g.weightKg} kg` : null],
    ['Made In', g.madeIn],
  ].filter(r => r && r[1]);

  const body = `<section class="list" style="padding-top:0;">
  <div class="detail-wrap">
    <img class="detail-img" src="${img}" alt="${g.model}">
    <div class="detail-info">
      ${sold ? '<span class="sold-tag">Verkauft</span>' : ''}
      ${g.nickname ? `<div class="detail-nickname">"${g.nickname}"</div>` : ''}
      <h1 class="detail-model">${g.buildYear}${g.reproOf ? ` <span style="color:var(--grey); font-size:0.55em;">/ '${String(g.reproOf).slice(2)} Repro</span>` : ''}<br>${g.model}</h1>
      <div class="spec-table">
        ${specRows.map(([k, v]) => `<div class="spec-row"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('\n        ')}
      </div>
      ${g.details ? `<p class="detail-desc">${g.details}</p>` : ''}
    </div>
  </div>
</section>
${g.photos && g.photos.length ? `<section class="photo-gallery-section">
  <div class="photo-gallery-head">Photo Gallery — ${g.photos.length} Fotos</div>
  <div class="photo-gallery-grid">
    ${g.photos.map(p => `<img src="${p}" alt="${g.model}" loading="lazy">`).join('\n    ')}
  </div>
</section>` : `<div class="no-photos-note">Vollständige Foto-Galerie folgt in Kürze.</div>`}`;

  const breadcrumb = `<div class="breadcrumb"><a href="../index.html">Home</a> / <a href="${listHref}">${listLabel}</a> / ${g.model}</div>`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${g.buildYear} ${g.model} — Chris Burgstaller Guitars</title>
<style>${css}</style>
</head>
<body>
${header(null)}
${breadcrumb}
${body}
${footer()}
</body>
</html>`;
}

let count = 0;
for (const g of data.collection) {
  fs.writeFileSync(path.join(OUT, 'guitars', `${g.slug}.html`), detailPage(g, false));
  count++;
}
for (const g of data.soldGuitars) {
  fs.writeFileSync(path.join(OUT, 'guitars', `${g.slug}.html`), detailPage(g, true));
  count++;
}

// fix header logo link inside /guitars/ subfolder (needs ../index.html)
const guitarsDir = path.join(OUT, 'guitars');
for (const file of fs.readdirSync(guitarsDir)) {
  const p = path.join(guitarsDir, file);
  let html = fs.readFileSync(p, 'utf8');
  html = html
    .replace('<a class="logo" href="index.html">', '<a class="logo" href="../index.html">')
    .replace('href="about.html"', 'href="../about.html"')
    .replace('href="collection.html"', 'href="../collection.html"')
    .replace('href="sold.html"', 'href="../sold.html"')
    .replace('href="contact.html"', 'href="../contact.html"');
  fs.writeFileSync(p, html);
}

fs.writeFileSync(path.join(OUT, 'css', 'style.css'), css);

console.log(`Built ${count} guitar pages + index, about, collection, sold, contact.`);
