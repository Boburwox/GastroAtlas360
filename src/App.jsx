
import React, { useMemo, useState } from 'react';
import { countries, metricMeta, regions, regionStats, sources, timeline } from './data.js';

const defaultWeights = { H: 18, T: 15, X: 18, S: 14, A: 12, L: 13, D: 10 };

function Icon({ name, size = 18 }) {
  const paths = {
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 4.5 6.2 4.5 9S15 17.8 12 21c-3-3.2-4.5-6.2-4.5-9S9 6.2 12 3Z"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19V2"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3H4Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H14v18a3 3 0 0 1 3-3h3Z"/></>,
    route: <><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h4a4 4 0 0 0 4-4v-2M8 6h4"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    print: <><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z"/></>,
    spark: <><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z"/></>,
    leaf: <><path d="M20 4C10 4 5 9 5 15c0 3 2 5 5 5 6 0 10-6 10-16Z"/><path d="M5 20c2-5 6-8 11-11"/></>,
    external: <><path d="M14 3h7v7M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

function scoreCountry(country, weights = defaultWeights) {
  const total = Object.values(weights).reduce((sum, value) => sum + Number(value), 0) || 1;
  return Object.entries(weights).reduce((sum, [key, value]) => sum + country.metrics[key] * Number(value), 0) / total;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['atlas', 'Atlas'], ['statistika', 'Statistika'], ['nazariya', 'Nazariya'], ['laboratoriya', 'Innovatsiya'], ['manbalar', 'Manbalar']];
  return (
    <header className="site-header">
      <button className="brand" onClick={() => scrollTo('top')} aria-label="Bosh sahifa">
        <span className="brand-mark"><Icon name="globe" size={20}/></span>
        <span>GASTRO<span>ATLAS</span><sup>360</sup></span>
      </button>
      <nav className={open ? 'nav open' : 'nav'}>
        {links.map(([id, label]) => <button key={id} onClick={() => { scrollTo(id); setOpen(false); }}>{label}</button>)}
      </nav>
      <button className="outline-btn header-cta" onClick={() => window.print()}><Icon name="print"/> Hisobot</button>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menyuni ochish">{open ? '×' : '☰'}</button>
    </header>
  );
}

function GlobeArt() {
  return (
    <div className="globe-wrap" aria-hidden="true">
      <div className="orbit orbit-a"></div><div className="orbit orbit-b"></div>
      <div className="globe">
        <div className="land land-a"></div><div className="land land-b"></div><div className="land land-c"></div>
        <span className="pin p1">🍣</span><span className="pin p2">🥘</span><span className="pin p3">🥟</span><span className="pin p4">🌮</span><span className="pin p5">🍲</span>
      </div>
      <div className="floating-note note-a"><b>+8%</b><span>Afrika o‘sishi</span></div>
      <div className="floating-note note-b"><b>408</b><span>UNESCO ijodiy shahar</span></div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span></span> ILMIY • STATISTIK • INTERAKTIV</div>
        <h1>Dunyo ta’mini<br/><em>ma’lumotlar orqali</em> kashf eting</h1>
        <p className="hero-lead">Jahon gastronomik merosi, turizm oqimlari va barqaror rivojlanishni yagona raqamli atlasda birlashtirgan tadqiqot platformasi.</p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={() => scrollTo('atlas')}>Atlasni ochish <Icon name="arrow"/></button>
          <button className="text-btn" onClick={() => scrollTo('laboratoriya')}><Icon name="spark"/> GASTRONEXUS-7™</button>
        </div>
        <div className="hero-proof">
          <div><strong>27</strong><span>chuqur mamlakat profili</span></div>
          <div><strong>9</strong><span>xalqaro manba</span></div>
          <div><strong>7</strong><span>indeks o‘lchovi</span></div>
        </div>
      </div>
      <GlobeArt />
      <div className="hero-side-label">GLOBAL FOODSCAPE / 2026</div>
    </section>
  );
}

function StatStrip() {
  const items = [
    { value: '1,52', unit: 'mlrd', label: 'xalqaro turist', note: '2025 • +4%' },
    { value: '$2,2', unit: 'trln', label: 'turizm eksporti', note: '2025 • rekord' },
    { value: '$10,9', unit: 'trln', label: 'global YAIM hissasi', note: '2024 • 10%' },
    { value: '357', unit: 'mln', label: 'ish o‘rni', note: '2024 • 1/10' },
  ];
  return <section className="stat-strip">{items.map(item => <div className="headline-stat" key={item.label}><span className="stat-value">{item.value}<small>{item.unit}</small></span><span className="stat-label">{item.label}</span><span className="stat-note">{item.note}</span></div>)}</section>;
}

function SectionHead({ kicker, title, text, invert = false }) {
  return <div className={`section-head ${invert ? 'invert' : ''}`}><div><span className="section-kicker">{kicker}</span><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

function CountryModal({ country, onClose }) {
  if (!country) return null;
  const score = scoreCountry(country).toFixed(1);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article className="country-modal" role="dialog" aria-modal="true" aria-label={`${country.name} profili`} onMouseDown={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Yopish"><Icon name="close"/></button>
        <div className="modal-hero">
          <span className="modal-flag">{country.flag}</span>
          <div><span className="tiny-label">{regions.find(r => r.id === country.region)?.label}</span><h3>{country.name}</h3><p>{country.capital} • tashriflar: {country.arrivals.toFixed(1)} mln (2024)</p></div>
          <div className="score-ring" style={{ '--score': `${score * 3.6}deg` }}><b>{score}</b><small>G-N7</small></div>
        </div>
        <p className="modal-story">{country.story}</p>
        <div className="modal-grid">
          <div><span className="tiny-label">Gastronomik meros</span><p>{country.heritage}</p></div>
          <div><span className="tiny-label">Asosiy turizm geografiyasi</span><p>{country.tourism}</p></div>
          <div><span className="tiny-label">Eng yaxshi davr</span><p>{country.best}</p></div>
          <div><span className="tiny-label">Tajriba profili</span><p>{country.style.join(' • ')}</p></div>
        </div>
        <div className="taste-row">{country.dishes.map(d => <span key={d}>{d}</span>)}</div>
        <div className="metric-bars">
          {metricMeta.map(meta => <div className="metric-line" key={meta.key}><span>{meta.short}</span><div><i style={{ width: `${country.metrics[meta.key]}%`, background: meta.color }}></i></div><b>{country.metrics[meta.key]}</b></div>)}
        </div>
        <p className="data-caveat">Mamlakat ko‘rsatkichlari turli milliy statistik qatorlardan yig‘ilgan va yaxlitlangan. Metodologik ta’riflar mamlakatlar kesimida farq qilishi mumkin.</p>
      </article>
    </div>
  );
}

function Atlas() {
  const [region, setRegion] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => countries.filter(c => (region === 'all' || c.region === region) && `${c.name} ${c.dishes.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [region, query]);
  return (
    <section id="atlas" className="atlas-section page-section">
      <SectionHead kicker="01 / GLOBAL ATLAS" title="Mamlakatlar gastronomik pasporti" text="Mamlakatni qidiring, mintaqa bo‘yicha saralang va uning taom merosi, turistik geografiyasi hamda GASTRONEXUS-7™ profilini oching."/>
      <div className="atlas-toolbar">
        <div className="search-box"><Icon name="search"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Mamlakat yoki taomni qidiring..."/></div>
        <div className="region-tabs">{regions.map(r => <button className={region === r.id ? 'active' : ''} key={r.id} onClick={() => setRegion(r.id)}>{r.label}</button>)}</div>
      </div>
      <div className="results-line"><span>{filtered.length} ta profil topildi</span><span>2024 mamlakat ma’lumotlari • 2025 global kontekst</span></div>
      <div className="country-grid">
        {filtered.map(c => {
          const score = scoreCountry(c).toFixed(1);
          return <button className="country-card" key={c.code} onClick={() => setSelected(c)}>
            <div className="country-card-top"><span className="flag">{c.flag}</span><span className="mini-score">G-N7 <b>{score}</b></span></div>
            <span className="region-label">{regions.find(r => r.id === c.region)?.label}</span>
            <h3>{c.name}</h3>
            <p>{c.story}</p>
            <div className="dish-list">{c.dishes.slice(0, 3).map(d => <span key={d}>{d}</span>)}</div>
            <div className="country-card-foot"><span><b>{c.arrivals.toFixed(1)}</b> mln tashrif</span><span>Batafsil <Icon name="arrow" size={15}/></span></div>
          </button>;
        })}
      </div>
      {!filtered.length && <div className="empty-state">So‘rov bo‘yicha mamlakat topilmadi. Boshqa nom yoki taomni kiriting.</div>}
      <CountryModal country={selected} onClose={() => setSelected(null)}/>
    </section>
  );
}

function TrendChart() {
  const max = 1600, min = 300, width = 760, height = 280, pad = 36;
  const points = timeline.map((d, i) => ({ ...d, x: pad + i * ((width - pad * 2) / (timeline.length - 1)), y: height - pad - ((d.value - min) / (max - min)) * (height - pad * 2) }));
  const line = points.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},${height-pad} ${line} ${points.at(-1).x},${height-pad}`;
  return <div className="trend-chart">
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="2019–2025 xalqaro turistlar dinamikasi">
      {[400,800,1200,1600].map(v => { const y = height - pad - ((v-min)/(max-min))*(height-pad*2); return <g key={v}><line x1={pad} y1={y} x2={width-pad} y2={y} className="grid-line"/><text x="4" y={y+4}>{v}</text></g>; })}
      <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#df6a3f" stopOpacity=".32"/><stop offset="1" stopColor="#df6a3f" stopOpacity="0"/></linearGradient></defs>
      <polygon points={area} fill="url(#areaFill)"/>
      <polyline points={line} className="data-line"/>
      {points.map(p => <g key={p.year}><circle cx={p.x} cy={p.y} r="5"/><text x={p.x} y={height-8} textAnchor="middle">{p.year}</text><text className="point-label" x={p.x} y={p.y-13} textAnchor="middle">{p.value}</text></g>)}
    </svg>
    <div className="chart-note"><span className="status-dot"></span><b>2025:</b> pandemiyadan keyingi yangi rekord — 1,52 mlrd</div>
  </div>;
}

function Statistics() {
  return (
    <section id="statistika" className="statistics page-section dark-section">
      <SectionHead invert kicker="02 / DATA OBSERVATORY" title="Global turizm pulsini kuzating" text="UN Tourism va World Bank ma’lumotlari asosida tiklanish trayektoriyasi, mintaqaviy ulush va iqtisodiy ta’sir. Qiymatlar million xalqaro turistda."/>
      <div className="stats-layout">
        <div className="panel trend-panel"><div className="panel-head"><div><span>DINAMIKA</span><h3>Xalqaro turistlar, 2019–2025</h3></div><span className="source-pill">UN Tourism</span></div><TrendChart/></div>
        <div className="panel region-panel"><div className="panel-head"><div><span>GEOGRAFIYA</span><h3>2025-yil mintaqalar kesimida</h3></div></div>
          <div className="region-total"><strong>1 523</strong><span>mln • yaxlitlangan mintaqaviy jami</span></div>
          <div className="region-bars">{regionStats.map(r => <div key={r.name}><div className="region-bar-label"><span>{r.name}</span><span>{r.value} mln <b>{r.growth}</b></span></div><div className="region-bar"><i style={{ width: `${r.value/8}%`, background: r.color }}></i></div></div>)}</div>
        </div>
      </div>
      <div className="insight-row">
        <div><span className="insight-number">01</span><p><b>Yevropa</b> 793 mln tashrif bilan global oqimning yarmidan ko‘pini saqlab qoldi.</p></div>
        <div><span className="insight-number">02</span><p><b>Afrika</b> +8% bilan 2025-yilda eng tez o‘sgan makromintaqa bo‘ldi.</p></div>
        <div><span className="insight-number">03</span><p><b>Osiyo–Tinch okeani</b> +6% o‘sdi, ammo 2019 darajasining 91%iga yetdi.</p></div>
      </div>
      <p className="method-note">Izoh: 2024 va 2025 global qiymatlari UN Tourism’ning yangilanadigan baholaridir; mintaqalar jami yaxlitlash sabab global qiymatdan ozgina farq qilishi mumkin.</p>
    </section>
  );
}

function Theory() {
  const concepts = [
    { n:'I', title:'Motivatsiya', text:'Ta’m yangiligi, prestij, sog‘lomlik, nostalgiya va bilim olish sayohat qarorini shakllantiradi.' },
    { n:'II', title:'Madaniyat', text:'Taom — joyning tarixi, dini, ekologiyasi va ijtimoiy xotirasini uzatuvchi tirik kod.' },
    { n:'III', title:'Autentiklik', text:'Mahsulot kelib chiqishi, mahalliy usul va mezbon bilan aloqa tajribaning ishonchliligini belgilaydi.' },
    { n:'IV', title:'Qiymat zanjiri', text:'Fermer → bozor → oshpaz → gid → turist oqimi daromadning hududda qolish ulushini belgilaydi.' },
    { n:'V', title:'Foodscape', text:'Taom alohida obyekt emas; makon, odam, hikoya, servis va raqamli tasvir birgalikda tajriba yaratadi.' },
  ];
  return (
    <section id="nazariya" className="theory page-section">
      <SectionHead kicker="03 / SCIENTIFIC FRAMEWORK" title="Gastronomik turizmning ilmiy arxitekturasi" text="UN Tourism ta’rifi va zamonaviy tadqiqotlarda gastronomik turizm — ovqat, unga bog‘liq mahsulotlar hamda ishlab chiqarish jarayonlari bilan bog‘langan tashrif tajribasidir."/>
      <div className="theory-layout">
        <div className="concept-stack">{concepts.map(c => <div className="concept-card" key={c.n}><span>{c.n}</span><div><h3>{c.title}</h3><p>{c.text}</p></div></div>)}</div>
        <div className="evolution-card">
          <div className="eyebrow light"><span></span> RICHARDS, 2015</div>
          <h3>Taomdan — foodscape’gacha</h3>
          <div className="evolution-step"><span>1.0</span><div><b>FOOD</b><p>Taomni iste’mol qilish</p></div></div>
          <div className="evolution-line"></div>
          <div className="evolution-step"><span>2.0</span><div><b>FOODIE</b><p>Faol qiziquvchi va hamkor ijodkor</p></div></div>
          <div className="evolution-line"></div>
          <div className="evolution-step active"><span>3.0</span><div><b>FOODSCAPE</b><p>Joy, jamoa, ishlab chiqarish va hikoyaning yaxlit tizimi</p></div></div>
          <blockquote>“Gastronomiya ovqatdan ko‘ra kengroq: u xalqning madaniyati, merosi, an’analari va hamjamiyat tuyg‘usini aks ettiradi.”<cite>— UN Tourism</cite></blockquote>
        </div>
      </div>
      <div className="research-chain">
        <span>RESURS</span><i></i><span>MAHSULOT</span><i></i><span>TAJRIBA</span><i></i><span>QIYMAT</span><i></i><span>HUDUDIY NATIJA</span>
      </div>
      <div className="method-cards">
        <div><Icon name="book"/><h4>Nazariy usullar</h4><p>Tizimli tahlil, madaniy antropologiya, institutsional va destinatsion yondashuv.</p></div>
        <div><Icon name="chart"/><h4>Miqdoriy usullar</h4><p>Kompozit indeks, normalizatsiya, korrelyatsiya, panel tahlili va ssenariy prognozi.</p></div>
        <div><Icon name="route"/><h4>Empirik usullar</h4><p>Turist so‘rovi, ekspert bahosi, GIS xaritalash, xarajat kundaligi va kontent tahlili.</p></div>
        <div><Icon name="leaf"/><h4>Ta’sir usullari</h4><p>Mahalliy daromad multiplikatori, oziq-ovqat izi, isrof va carrying capacity bahosi.</p></div>
      </div>
    </section>
  );
}

function InnovationLab() {
  const [weights, setWeights] = useState(defaultWeights);
  const [compare, setCompare] = useState(['UZ', 'JP', 'IT']);
  const ranking = useMemo(() => countries.map(c => ({ ...c, score: scoreCountry(c, weights) })).sort((a,b) => b.score-a.score), [weights]);
  const selectedCountries = compare.map(code => countries.find(c => c.code === code));
  const total = Object.values(weights).reduce((a,b) => a + Number(b), 0);
  const updateCompare = (index, code) => setCompare(prev => prev.map((v,i) => i === index ? code : v));
  return (
    <section id="laboratoriya" className="innovation page-section">
      <SectionHead kicker="04 / INVENTION CONCEPT" title="GASTRONEXUS-7™ tahliliy dvigateli" text="Gastronomik merosni turistik talab, tajriba, barqarorlik, kirish imkoniyati, mahalliy qiymat zanjiri va raqamli brend bilan birlashtiruvchi original kompozit model."/>
      <div className="patent-banner">
        <div className="patent-seal"><Icon name="spark" size={28}/><span>ORIGINAL<br/>MODEL</span></div>
        <div><span className="tiny-label">Ixtiro konsepsiyasi / v1.0</span><h3>Ko‘p mezonli, vazni boshqariladigan gastronomik-turistik reyting</h3><p>Model statik reyting bermaydi: tadqiqot maqsadiga qarab mezon vaznlari o‘zgartiriladi va natija real vaqtda qayta hisoblanadi.</p></div>
        <div className="formula">G<sub>i</sub> = <span>Σ w<sub>j</sub> · z<sub>ij</sub></span> / Σw<sub>j</sub></div>
      </div>
      <div className="lab-grid">
        <div className="weights-panel lab-panel">
          <div className="lab-head"><div><span>01</span><h3>Mezon vaznlarini sozlang</h3></div><button onClick={() => setWeights(defaultWeights)}>Tiklash</button></div>
          <p className="lab-intro">Vaznlar avtomatik normalizatsiya qilinadi. Joriy xom yig‘indi: <b>{total}</b>.</p>
          {metricMeta.map(meta => <label className="range-control" key={meta.key}><div><span><i style={{ background: meta.color }}></i>{meta.full}</span><b>{weights[meta.key]}%</b></div><input type="range" min="0" max="30" value={weights[meta.key]} onChange={e => setWeights({ ...weights, [meta.key]: Number(e.target.value) })} style={{ '--range-color': meta.color }}/></label>)}
        </div>
        <div className="ranking-panel lab-panel">
          <div className="lab-head"><div><span>02</span><h3>Dinamik TOP-10</h3></div><span className="live-pill"><i></i> LIVE</span></div>
          <div className="ranking-list">{ranking.slice(0,10).map((c,i) => <div key={c.code}><span className="rank">{String(i+1).padStart(2,'0')}</span><span className="rank-country">{c.flag} {c.name}</span><div className="rank-bar"><i style={{ width: `${c.score}%` }}></i></div><b>{c.score.toFixed(1)}</b></div>)}</div>
        </div>
      </div>
      <div className="compare-panel lab-panel">
        <div className="lab-head"><div><span>03</span><h3>Mamlakatlarni o‘lchovlar bo‘yicha solishtiring</h3></div></div>
        <div className="compare-selects">{compare.map((code,i) => <select key={i} value={code} onChange={e => updateCompare(i,e.target.value)}>{countries.map(c => <option value={c.code} key={c.code}>{c.flag} {c.name}</option>)}</select>)}</div>
        <div className="compare-table">
          <div className="compare-row compare-header"><span>Ko‘rsatkich</span>{selectedCountries.map(c => <span key={c.code}>{c.flag} {c.name}</span>)}</div>
          {metricMeta.map(meta => <div className="compare-row" key={meta.key}><span><i style={{background:meta.color}}></i>{meta.short}</span>{selectedCountries.map(c => <span key={c.code}><b>{c.metrics[meta.key]}</b><em style={{width:`${c.metrics[meta.key]}%`, background:meta.color}}></em></span>)}</div>)}
          <div className="compare-row total-row"><span>G-N7 integral baho</span>{selectedCountries.map(c => <span key={c.code}><b>{scoreCountry(c, weights).toFixed(1)}</b></span>)}</div>
        </div>
      </div>
      <div className="novelty-grid">
        <div><span>YANGILIK 01</span><h4>Dinamik vaznlash</h4><p>Bir xil ma’lumotlar turli siyosat maqsadlari — meros, daromad yoki barqarorlik — uchun qayta baholanadi.</p></div>
        <div><span>YANGILIK 02</span><h4>Foodscape integratsiyasi</h4><p>Taom emas, balki ishlab chiqaruvchi, makon, servis, hikoya va raqamli ko‘rinish birgalikda o‘lchanadi.</p></div>
        <div><span>YANGILIK 03</span><h4>Qaror tavsiyasi</h4><p>Zaif o‘lchovlar avtomatik aniqlanib, investitsiya va destinatsiya boshqaruvi uchun ustuvorlik beradi.</p></div>
      </div>
      <p className="patent-disclaimer">Huquqiy izoh: “patent darajasi” bu yerda original texnik konsepsiya va himoyaga tayyor tavsifni anglatadi. Patentga layoqatlilik yangilik qidiruvi va vakolatli patent ekspertizasi bilan alohida tasdiqlanadi.</p>
    </section>
  );
}

function RoutePlanner() {
  const [region, setRegion] = useState('all');
  const [budget, setBudget] = useState('any');
  const [interest, setInterest] = useState('culture');
  const [days, setDays] = useState(10);
  const picks = useMemo(() => countries.map(c => {
    let value = scoreCountry(c);
    if (region !== 'all' && c.region === region) value += 14;
    if (budget !== 'any' && c.budget === budget) value += 10;
    if (c.style.includes(interest)) value += 13;
    return { ...c, routeScore: value };
  }).sort((a,b) => b.routeScore-a.routeScore).slice(0,3), [region,budget,interest,days]);
  return (
    <section className="planner page-section">
      <SectionHead kicker="05 / SMART ROUTE" title="Ilmiy mezonlar asosida marshrut yarating" text="Bu prototip tanlangan mintaqa, budjet va motivatsiyani GASTRONEXUS-7™ bazaviy bahosi bilan birlashtirib, mos yo‘nalishlarni saralaydi."/>
      <div className="planner-shell">
        <div className="planner-controls">
          <label><span>Mintaqa</span><select value={region} onChange={e => setRegion(e.target.value)}>{regions.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}</select></label>
          <label><span>Budjet</span><select value={budget} onChange={e => setBudget(e.target.value)}><option value="any">Har qanday</option><option value="low">Tejamkor</option><option value="mid">O‘rtacha</option><option value="high">Premium</option></select></label>
          <label><span>Asosiy qiziqish</span><select value={interest} onChange={e => setInterest(e.target.value)}><option value="culture">Madaniyat va meros</option><option value="street">Ko‘cha taomlari</option><option value="wine">Vino yo‘llari</option><option value="nature">Tabiat</option><option value="sea">Dengiz</option><option value="innovation">Innovatsiya</option><option value="market">Bozorlar</option></select></label>
          <label><span>Davomiylik: <b>{days} kun</b></span><input type="range" min="4" max="21" value={days} onChange={e => setDays(Number(e.target.value))}/></label>
        </div>
        <div className="route-results">
          <div className="route-line"></div>
          {picks.map((c,i) => <div className="route-stop" key={c.code}><span className="route-node">{i+1}</span><span className="route-flag">{c.flag}</span><div><span className="tiny-label">{Math.max(2, Math.round(days/3))} KUN • MOSLIK {Math.min(99,Math.round(c.routeScore))}%</span><h3>{c.name}</h3><p>{c.dishes.slice(0,3).join(' • ')}<br/>{c.tourism.split(',').slice(0,3).join(' → ')}</p></div></div>)}
        </div>
      </div>
    </section>
  );
}

function Sources() {
  return (
    <section id="manbalar" className="sources page-section dark-section">
      <SectionHead invert kicker="06 / EVIDENCE BASE" title="Ma’lumot va ilmiy manbalar" text="Har bir ko‘rsatkichning mazmuni, yili va metodologik chegarasi ko‘rsatiladi. Havolalar asl nashr yoki rasmiy tashkilot sahifasiga olib boradi."/>
      <div className="source-list">{sources.map((s,i) => <a key={s.title} href={s.url} target="_blank" rel="noreferrer"><span className="source-index">{String(i+1).padStart(2,'0')}</span><span className="source-type">{s.type}<small>{s.year}</small></span><span className="source-main"><b>{s.title}</b><small>{s.note}</small></span><Icon name="external"/></a>)}</div>
      <div className="integrity-box"><Icon name="book" size={26}/><div><h4>Ilmiy halollik protokoli</h4><p>Global statistika rasmiy manbadan; mamlakat tashriflari turli milliy qatorlardan olingan, yaxlitlangan va to‘g‘ridan-to‘g‘ri qiyoslashda ehtiyotkorlik talab qiladi. GASTRONEXUS-7™ baholari — metodni ko‘rsatish uchun ekspert-normalizatsion prototip bo‘lib, rasmiy xalqaro reyting emas.</p></div></div>
    </section>
  );
}

function Footer() {
  return <footer><div className="footer-brand"><span className="brand-mark"><Icon name="globe" size={20}/></span><div><b>GASTROATLAS<sup>360</sup></b><span>Global gastronomy intelligence</span></div></div><div className="footer-author"><span>Loyiha konsepsiyasi</span><b>Ro‘zibayev Otabek Mardon o‘g‘li, PhD</b></div><div className="footer-meta"><span>Versiya 1.0 • 20.07.2026</span><span>Ilmiy-tahliliy prototip</span></div></footer>;
}

export default function App() {
  return <><Header/><main><Hero/><StatStrip/><Atlas/><Statistics/><Theory/><InnovationLab/><RoutePlanner/><Sources/></main><Footer/></>;
}
