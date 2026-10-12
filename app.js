const photos = [
  {
    "src": "taal-volcano.jpg",
    "title": "By Donkey along the Slopes of Taal Volcano",
    "alt": "Riding a donkey on a trail at Taal Volcano in the Philippines."
  },
  {
    "src": "thai-myanmar-border.jpg",
    "title": "An Injured Foot and a Helping Hand on the Thai–Myanmar Border",
    "alt": "Being carried across a shallow stream after a foot injury on the Thai–Myanmar border."
  },
  {
    "src": "kathmandu.jpg",
    "title": "Looking Out over Kathmandu",
    "alt": "Looking toward the hills and evening sky above Kathmandu."
  },
  {
    "src": "western-sichuan.jpg",
    "title": "Climbing above the Clouds in Western Sichuan",
    "alt": "Standing on a frosty mountain slope above the clouds in western Sichuan."
  },
  {
    "src": "lapland.jpg",
    "title": "A Barefoot Stroll through Lapland",
    "alt": "Walking barefoot across the snow in Lapland."
  },
  {
    "src": "china-myanmar-fieldwork.jpg",
    "title": "Fieldwork beneath Open Skies on the China–Myanmar Border",
    "alt": "Working on a laptop beside green fields during fieldwork on the China–Myanmar border."
  }
];
const themes = ['classic', 'paper', 'sidebar'];
let theme = 'classic';
if (!themes.includes(theme)) theme = 'classic';
const pages = ['about', 'research', 'commentary', 'teaching', 'elsewhere'];
const labels = ['About', 'Research', 'Commentary', 'Teaching', 'Elsewhere'];
const escapeHtml = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function citation(s) {
  const url = s.match(/https?:\/\/\S+/);
  const clean = s.replace(/https?:\/\/\S+/, '').trim();
  const year = clean.match(/\b20\d\d\b/);
  return `<article class="entry"><span class="year">${year ? year[0] : ''}</span><div><p>${escapeHtml(clean)}</p>${url ? `<a href="${escapeHtml(url[0])}" target="_blank" rel="noopener noreferrer">Read article ↗</a>` : ''}</div></article>`;
}
function render() {
  let page = location.hash.slice(1);
  if (page === 'publications') page = 'research';
  if (!pages.includes(page)) page = 'about';
  document.body.dataset.theme = theme;
  document.querySelector('nav').innerHTML = pages.map((p, i) => `<a href="#${p}" ${p === page ? 'class="active" aria-current="page"' : ''}>${labels[i]}</a>`).join('');
  document.querySelectorAll('.themes button').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === theme);
    b.setAttribute('aria-pressed', String(b.dataset.theme === theme));
  });
  const main = document.querySelector('main');
  if (page === 'about') main.innerHTML = `<section class="about-copy"><h1>XIAN Yaolong</h1><p>I am a doctoral researcher at Peace Research Institute Frankfurt (PRIF). My work focuses on rebel governance, conflict economies, and political legitimacy.</p><p>My research has been published in the <em>Journal of Contemporary China</em>, <em>Media, War &amp; Conflict</em>, and <em>The British Journal of Politics and International Relations</em>, among others.</p><p>I hold a joint master’s degree in International Humanitarian Action from Ruhr University Bochum and Uppsala University, which I completed as an Erasmus Mundus scholarship recipient.</p><p>I am currently seeking postdoctoral research opportunities.</p><div class="links"><a href="mailto:xian@prif.org">Email ↗</a></div></section>`;
  if (page === 'research') main.innerHTML = `<h1>Research</h1><h2>Peer-reviewed Articles</h2><div class="publication-list">${cvContent.publications.map(citation).join('')}</div><h2>Work in Progress</h2>${cvContent.progress.map(s => `<article class="working-paper"><p>${escapeHtml(s)}</p></article>`).join('')}`;
  if (page === 'commentary') main.innerHTML = `<h1>Commentary</h1><div class="publication-list">${cvContent.writing.map(citation).join('')}</div>`;
  if (page === 'teaching') main.innerHTML = `<h1>Teaching</h1><div class="publication-list"><article class="entry"><span class="year">2026<br>2027</span><div><h3>China’s Foreign Policy: States, Parties, and Non-State Armed Groups</h3><p>Master’s students · Goethe University Frankfurt</p><p class="muted">Winter semester 2026/27</p></div></article><article class="entry"><span class="year">2024</span><div><h3>Workshop on Human Rights and Peacebuilding</h3><p>MA students in European Studies · Ateneo de Manila University</p><p class="muted">October 2024</p></div></article></div>`;
  if (page === 'elsewhere') {
    const photoCard = (photo, i) => `<button class="photo" data-photo="${i}" style="order:${i}" aria-label="View photo: ${escapeHtml(photo.title)}"><img src="${photo.src}" alt="${escapeHtml(photo.alt)}" loading="lazy" decoding="async"><span class="photo-title">${escapeHtml(photo.title)}</span></button>`;
    main.innerHTML = `<h1>Elsewhere</h1><div class="gallery">${[0, 1].map(column => `<div class="photo-column">${photos.map((photo, i) => i % 2 === column ? photoCard(photo, i) : '').join('')}</div>`).join('')}</div>`;
    main.querySelectorAll('[data-photo]').forEach(b => b.onclick = () => {
      const photo = photos[Number(b.dataset.photo)];
      document.querySelector('#photo-detail').innerHTML = `<img class="full-photo" src="${photo.src}" alt="${escapeHtml(photo.alt)}"><p class="photo-title">${escapeHtml(photo.title)}</p>`;
      document.querySelector('dialog').showModal();
    });
  }
  document.title = `XIAN Yaolong · ${labels[pages.indexOf(page)]}`;
}
document.querySelectorAll('.themes button').forEach(b => b.onclick = () => {
  theme = b.dataset.theme;
  localStorage.setItem('academic-theme', theme);
  render();
});
document.querySelector('#close-dialog').onclick = () => document.querySelector('dialog').close();
document.querySelector('dialog').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
window.addEventListener('hashchange', render);
render();
