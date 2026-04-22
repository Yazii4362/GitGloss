/* ═══════════════════════════════════════════════════════
   GitGloss — widget-engine.js
   테마 클래스 적용 + 위젯 DOM 렌더링 엔진
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── 링크 메타데이터 (파비콘 + 브랜드 컬러 + URL 패턴) ── */
const LINK_META = {
  github:    { label: 'GitHub',      favicon: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',      color: '#181717', bg: '#f0f0f0', brand: 'github',    urlTpl: 'https://github.com/{username}' },
  blog:      { label: '블로그',       favicon: 'https://www.google.com/s2/favicons?domain=velog.io&sz=32',        color: '#20c997', bg: '#e8fdf5', brand: 'velog',     urlTpl: 'https://velog.io/@{username}' },
  email:     { label: 'Email',       favicon: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=32',       color: '#EA4335', bg: '#fde8e6', brand: 'gmail',     urlTpl: 'mailto:{email}' },
  linkedin:  { label: 'LinkedIn',    favicon: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=32',    color: '#0A66C2', bg: '#e7f0fa', brand: 'linkedin',  urlTpl: 'https://linkedin.com/in/{username}' },
  twitter:   { label: 'X / Twitter', favicon: 'https://www.google.com/s2/favicons?domain=x.com&sz=32',          color: '#000000', bg: '#f0f0f0', brand: 'x',         urlTpl: 'https://twitter.com/{username}' },
  instagram: { label: 'Instagram',   favicon: 'https://www.google.com/s2/favicons?domain=instagram.com&sz=32',  color: '#E1306C', bg: '#fde8f0', brand: 'instagram', urlTpl: 'https://instagram.com/{username}' },
  youtube:   { label: 'YouTube',     favicon: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=32',    color: '#FF0000', bg: '#ffe8e8', brand: 'youtube',   urlTpl: 'https://youtube.com/@{username}' },
  twitch:    { label: 'Twitch',      favicon: 'https://www.google.com/s2/favicons?domain=twitch.tv&sz=32',      color: '#9146FF', bg: '#f0e8ff', brand: 'twitch',    urlTpl: 'https://twitch.tv/{username}' },
  kakao:     { label: 'KakaoTalk',   favicon: 'https://www.google.com/s2/favicons?domain=kakao.com&sz=32',      color: '#3A1D1D', bg: '#FEE500', brand: 'kakaotalk', urlTpl: 'https://open.kakao.com/o/{roomid}' },
  discord:   { label: 'Discord',     favicon: 'https://www.google.com/s2/favicons?domain=discord.com&sz=32',    color: '#5865F2', bg: '#eef0fe', brand: 'discord',   urlTpl: 'https://discord.gg/{server}' },
  notion:    { label: 'Notion',      favicon: 'https://www.google.com/s2/favicons?domain=notion.so&sz=32',      color: '#000000', bg: '#f5f5f5', brand: 'notion',    urlTpl: 'https://notion.so/{page}' },
  portfolio: { label: 'Portfolio',   favicon: 'https://www.google.com/s2/favicons?domain=github.io&sz=32',      color: '#4285F4', bg: '#e8f0fe', brand: '',          urlTpl: 'https://{username}.github.io' },
  npm:       { label: 'npm',         favicon: 'https://www.google.com/s2/favicons?domain=npmjs.com&sz=32',      color: '#CB3837', bg: '#fee8e8', brand: 'npm',       urlTpl: 'https://npmjs.com/~{username}' },
};

/* shields.io 배지 URL 생성 */
function shieldsBadge(label, msg, color, logo, style = 'flat-square') {
  const base = 'https://img.shields.io/badge/';
  const l = encodeURIComponent(label.replace(/-/g,'--'));
  const m = encodeURIComponent(msg.replace(/-/g,'--'));
  const logoParam = logo ? `&logo=${logo}&logoColor=white` : '';
  return `${base}${l}-${m}-${color}?style=${style}${logoParam}`;
}

/* ── 현재 상태 ───────────────────────────────────────── */
const WE = {
  type:    'stats',
  theme:   'cotton-candy',
  layout:  '',
  emoji:   '👨‍💻',
  accent:  '#ED93B1',
  username: 'octocat',
  title:   'GitHub Stats',
  stats:   [
    { label: 'Stars',  val: '2.8k' },
    { label: 'Repos',  val: '142'  },
    { label: 'Active', val: '98%'  }
  ],
  tags:    ['React', 'TypeScript', 'Node.js'],
  pname:   '',
  handle:  '@octocat',
  role:    'Full-stack Developer',
  bio:     'Building amazing things with code',
  streak:  '42',
  longest: '87',
  total:   '1,247',
  /* links 전용 */
  linkItems: [
    { type: 'github',   url: '' },
    { type: 'blog',     url: '' },
    { type: 'email',    url: '' },
  ],
  /* banner 전용 */
  bannerText:   'Hi! Welcome!',
  bannerHeight: '160',
  bannerColor:  'gradient',
  bannerType:   'wave',
};

/* 모든 테마/레이아웃 클래스 목록 */
const ALL_THEME_CLASSES = TEMPLATES.map(t => [
  `theme-${t.theme}`,
  t.layout
]).flat().filter(Boolean);

const ALL_THEME_UNIQUE = [...new Set(ALL_THEME_CLASSES)];

/* ── 핵심: 테마 적용 ─────────────────────────────────── */
function applyTheme(templateId) {
  const tpl = getById(templateId);
  if (!tpl) return;

  WE.type   = tpl.type;
  WE.theme  = tpl.theme;
  WE.layout = tpl.layout || '';
  WE.accent = tpl.accentColor;

  const card = document.getElementById('widget-card');
  if (!card) return;

  /* 배너 → 다른 타입 전환 시 인라인 스타일 리셋 */
  if (tpl.type !== 'banner') {
    card.style.cssText = '';
  }

  card.classList.remove(...ALL_THEME_UNIQUE);
  card.classList.add(`theme-${WE.theme}`);
  if (WE.layout) card.classList.add(WE.layout);

  renderWidgetDOM();
  updateCodeStrip();
}

/* ── DOM 렌더링 ─────────────────────────────────────── */
function renderWidgetDOM() {
  const card = document.getElementById('widget-card');
  if (!card) return;

  switch (WE.type) {
    case 'stats':   renderStats(card);   break;
    case 'tech':    renderTech(card);    break;
    case 'profile': renderProfile(card); break;
    case 'streak':  renderStreak(card);  break;
    case 'links':   renderLinks(card);   break;
    case 'banner':  renderBanner(card);  break;
  }
}

/* ── SPECIAL THEMES RENDERING ────────────────────────── */
const SPECIAL_THEMES = {
  /* Stats */
  'blog-card': (card) => {
    card.innerHTML = `
      <div class="w-header" style="margin-bottom:12px;">
        <div style="font-size:11px;font-weight:700;color:var(--google-blue);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Latest Blog Post</div>
        <div class="w-name" style="font-size:16px;">Restoring GitGloss Architecture</div>
      </div>
      <div style="display:flex;gap:12px;align-items:center;background:rgba(255,255,255,0.4);padding:10px;border-radius:12px;border:1px solid rgba(0,0,0,0.05);">
        <div style="width:60px;height:60px;border-radius:8px;background:var(--accent);display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;">📝</div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:600;color:var(--text-main);margin-bottom:4px;">How we fixed the gallery...</div>
          <div style="font-size:11px;color:var(--text-sub);">2025.04.22 · 5 min read</div>
        </div>
      </div>
    `;
  },
  'progress-100': (card) => {
    card.innerHTML = `
      <div class="w-header">
        <div class="w-name">100 Days of Code</div>
        <div class="w-handle">Challenge Progress</div>
      </div>
      <div style="margin:16px 0;">
        <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:6px;">
          <span style="color:var(--accent);">Day 42</span>
          <span style="color:var(--text-sub);">42%</span>
        </div>
        <div style="height:10px;background:rgba(0,0,0,0.05);border-radius:5px;overflow:hidden;">
          <div style="width:42%;height:100%;background:linear-gradient(90deg, var(--accent), #9B8FE8);border-radius:5px;"></div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--text-hint);text-align:center;">Keep going! You're doing great. 🚀</div>
    `;
  },
  'radar-chart': (card) => {
    card.innerHTML = `
      <div class="w-header" style="margin-bottom:10px;">
        <div class="w-name">Skill Radar</div>
        <div class="w-handle">Competency Map</div>
      </div>
      <div style="display:flex;justify-content:center;padding:10px;">
        <div style="width:100px;height:100px;background:rgba(66,133,244,0.1);clip-path:polygon(50% 0%, 100% 38%, 81% 91%, 19% 91%, 0% 38%);display:flex;align-items:center;justify-content:center;border:2px solid var(--accent);">
          <div style="width:60px;height:60px;background:rgba(66,133,244,0.3);clip-path:polygon(50% 0%, 100% 38%, 81% 91%, 19% 91%, 0% 38%);"></div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:10px;">
        <div style="font-size:9px;text-align:center;font-weight:700;color:var(--text-sub);">Frontend</div>
        <div style="font-size:9px;text-align:center;font-weight:700;color:var(--text-sub);">Backend</div>
        <div style="font-size:9px;text-align:center;font-weight:700;color:var(--text-sub);">Design</div>
      </div>
    `;
  },
  /* Profile */
  'mbti-status': (card) => {
    card.innerHTML = `
      <div class="w-header">
        <div class="w-avatar" id="w-avatar">${WE.emoji}</div>
        <div>
          <div class="w-name">INTP Developer</div>
          <div class="w-handle">MBTI / Current Status</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <div style="flex:1;background:rgba(155,143,232,0.1);padding:10px;border-radius:12px;text-align:center;border:1px solid rgba(155,143,232,0.2);">
          <div style="font-size:10px;font-weight:700;color:#9B8FE8;margin-bottom:4px;">MOOD</div>
          <div style="font-size:13px;font-weight:600;">버그 잡는 중 🐛</div>
        </div>
        <div style="flex:1;background:rgba(237,147,177,0.1);padding:10px;border-radius:12px;text-align:center;border:1px solid rgba(237,147,177,0.2);">
          <div style="font-size:10px;font-weight:700;color:#ED93B1;margin-bottom:4px;">FUEL</div>
          <div style="font-size:13px;font-weight:600;">커피 필요함 ☕</div>
        </div>
      </div>
    `;
  },
  /* Links */
  'spotify-glass': (card) => {
    card.innerHTML = `
      <div style="display:flex;gap:16px;align-items:center;">
        <div style="width:70px;height:70px;border-radius:50%;background:url('https://i.scdn.co/image/ab67616d0000b273b251a37c012876f1e5828468') no-repeat center;background-size:cover;border:3px solid #1DB954;animation:rotate 10s linear infinite;box-shadow:0 8px 24px rgba(29,185,84,0.3);"></div>
        <div style="flex:1;">
          <div style="font-size:10px;font-weight:800;color:#1DB954;text-transform:uppercase;margin-bottom:4px;">Now Playing</div>
          <div style="font-size:15px;font-weight:700;color:var(--text-main);margin-bottom:2px;">Cruel Summer</div>
          <div style="font-size:12px;color:var(--text-sub);">Taylor Swift</div>
          <div style="margin-top:8px;height:3px;background:rgba(29,185,84,0.2);border-radius:2px;">
            <div style="width:65%;height:100%;background:#1DB954;border-radius:2px;"></div>
          </div>
        </div>
      </div>
      <style>@keyframes rotate { from { transform:rotate(0); } to { transform:rotate(360deg); } }</style>
    `;
  },
  'coffee-meter': (card) => {
    card.innerHTML = `
      <div class="w-header" style="margin-bottom:12px;">
        <div class="w-name">Today's Fuel</div>
        <div class="w-handle">Caffeine Intake</div>
      </div>
      <div style="display:flex;justify-content:center;gap:8px;font-size:28px;">
        <span>☕</span><span>☕</span><span style="opacity:0.2;">☕</span><span style="opacity:0.2;">☕</span>
      </div>
      <div style="text-align:center;font-size:12px;font-weight:700;color:var(--accent);margin-top:10px;">2 / 4 Cups Done</div>
    `;
  }
};

/* ── Stats 위젯 ── */
function renderStats(card) {
  if (SPECIAL_THEMES[WE.theme]) return SPECIAL_THEMES[WE.theme](card);

  card.innerHTML = `
    <div class="w-header">
      <div class="w-avatar" id="w-avatar">${WE.emoji}</div>
      <div>
        <div class="w-name" id="w-name">${WE.username || 'octocat'}</div>
        <div class="w-handle" id="w-handle">@${WE.username || 'octocat'} · GitHub</div>
      </div>
    </div>
    <div class="w-stats" id="w-stats">
      ${WE.stats.map((s, i) => `
        <div class="w-stat">
          <div class="w-num" id="w-s${i+1}-val">${s.val}</div>
          <div class="w-lbl" id="w-s${i+1}-lbl">${s.label}</div>
        </div>
      `).join('')}
    </div>
    <div class="w-tags" id="w-tags">${renderBadges(WE.tags)}</div>
  `;
}

/* ── Tech 위젯 ── */
function renderTech(card) {
  card.innerHTML = `
    <div class="w-header">
      <div class="w-avatar" id="w-avatar">${WE.emoji}</div>
      <div>
        <div class="w-name" id="w-name">${WE.username || 'octocat'}</div>
        <div class="w-handle" id="w-handle">Tech Stack</div>
      </div>
    </div>
    <div class="w-tags" id="w-tags">${renderBadges(WE.tags)}</div>
  `;
}

/* ── Profile 위젯 ── */
function renderProfile(card) {
  if (SPECIAL_THEMES[WE.theme]) return SPECIAL_THEMES[WE.theme](card);

  const hasRole = ['profile-portfolio','profile-glass-grid','profile-soft'].includes(WE.theme);
  card.innerHTML = `
    <div class="w-header">
      <div class="w-avatar" id="w-avatar">${WE.emoji}</div>
      <div>
        <div class="w-name" id="w-name">${WE.pname || WE.username || 'octocat'}</div>
        ${hasRole ? `<div class="w-role">${WE.role}</div>` : ''}
        <div class="w-handle" id="w-handle">${WE.handle || '@octocat'}</div>
      </div>
    </div>
    <div class="w-bio" id="w-bio">${WE.bio}</div>
    <div class="w-tags" id="w-tags">${renderBadges(WE.tags)}</div>
  `;
}

/* ── Streak 위젯 ── */
function renderStreak(card) {
  card.innerHTML = `
    <div class="w-header">
      <div class="w-avatar" id="w-avatar">${WE.emoji}</div>
      <div>
        <div class="w-name" id="w-name">${WE.username || 'octocat'}</div>
        <div class="w-handle" id="w-handle">@${WE.username || 'octocat'} · GitHub</div>
      </div>
    </div>
    <div class="w-streak-main">
      <div class="w-streak-num">${WE.streak}</div>
      <div class="w-streak-label">Day Streak 🔥</div>
    </div>
    <div class="w-streak-sub">
      <div class="w-stat">
        <div class="w-num">${WE.longest}</div>
        <div class="w-lbl">Longest</div>
      </div>
      <div class="w-stat">
        <div class="w-num">${WE.total}</div>
        <div class="w-lbl">Total</div>
      </div>
    </div>
  `;
}

/* ── Links 위젯 ── */
function renderLinks(card) {
  if (SPECIAL_THEMES[WE.theme]) return SPECIAL_THEMES[WE.theme](card);

  const theme = WE.theme;
  const items = WE.linkItems;
  
  let wrapStyle = 'display:flex;flex-wrap:wrap;gap:10px;justify-content:center;';
  let btnRenderer = renderLinkBtnPill;

  if (theme === 'links-icon-grid') {
    wrapStyle = 'display:grid;grid-template-columns:repeat(3,1fr);gap:10px;';
    btnRenderer = renderLinkBtnIconGrid;
  } else if (theme === 'links-minimal-list') {
    wrapStyle = 'display:flex;flex-direction:column;gap:8px;';
    btnRenderer = renderLinkBtnMinimal;
  } else if (theme === 'links-gradient-btns') {
    btnRenderer = renderLinkBtnGradient;
  } else if (theme === 'links-bordered') {
    btnRenderer = renderLinkBtnBordered;
  } else if (theme === 'links-social-pack') {
    btnRenderer = renderLinkBtnSocial;
  } else if (theme === 'links-dark-row') {
    btnRenderer = renderLinkBtnDark;
  } else if (theme === 'links-contact-card') {
    wrapStyle = 'display:flex;flex-direction:column;gap:10px;';
    btnRenderer = renderLinkBtnContact;
  } else if (theme === 'links-dev-hub') {
    btnRenderer = renderLinkBtnDevHub;
  }

  card.innerHTML = `
    <div class="w-header">
      <div class="w-avatar" id="w-avatar">${WE.emoji}</div>
      <div>
        <div class="w-name">${WE.pname || WE.username || 'octocat'}</div>
        <div class="w-handle">링크 모음</div>
      </div>
    </div>
    <div id="w-links-wrap" style="${wrapStyle}padding-top:8px;">
      ${items.map(item => btnRenderer(item)).join('')}
    </div>
  `;
}

function renderLinkBtnPill(item) {
  const m = LINK_META[item.type] || { label: item.type, favicon: '', color: '#555', bg: '#eee' };
  return `<a href="${item.url || '#'}" target="_blank" style="
    display:inline-flex;align-items:center;gap:6px;
    padding:8px 18px;border-radius:999px;
    background:${m.bg};border:1.5px solid ${m.color}22;
    color:${m.color};font-size:13px;font-weight:600;
    text-decoration:none;transition:transform .15s;">
    <img src="${m.favicon}" width="16" height="16" style="object-fit:contain;" alt="${m.label}">${m.label}
  </a>`;
}

function renderLinkBtnIconGrid(item) {
  const m = LINK_META[item.type] || { label: item.type, favicon: '', color: '#555', bg: '#eee' };
  return `<a href="${item.url || '#'}" target="_blank" style="
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
    padding:16px 8px;border-radius:16px;
    background:${m.bg};border:1.5px solid ${m.color}22;
    color:${m.color};font-size:11px;font-weight:700;
    text-decoration:none;aspect-ratio:1;">
    <img src="${m.favicon}" width="24" height="24" style="object-fit:contain;" alt="${m.label}">${m.label}
  </a>`;
}

function renderLinkBtnMinimal(item) {
  const m = LINK_META[item.type] || { label: item.type, favicon: '', color: '#333', bg: '#fff' };
  return `<a href="${item.url || '#'}" target="_blank" style="
    display:flex;align-items:center;justify-content:space-between;
    padding:10px 16px;border-radius:8px;
    background:transparent;border-bottom:1px solid rgba(0,0,0,.08);
    color:#1a1a2e;font-size:14px;font-weight:600;text-decoration:none;">
    <span style="display:flex;align-items:center;gap:10px;">
      <img src="${m.favicon}" width="16" height="16" style="object-fit:contain;" alt="${m.label}">${m.label}
    </span>
    <span style="font-size:12px;color:#999;">→</span>
  </a>`;
}

function renderLinkBtnGradient(item) {
  const gradients = {
    github:    'linear-gradient(135deg,#333,#111)',
    blog:      'linear-gradient(135deg,#20c997,#0ca678)',
    email:     'linear-gradient(135deg,#EA4335,#c5221f)',
    linkedin:  'linear-gradient(135deg,#0A66C2,#0952a0)',
    twitter:   'linear-gradient(135deg,#1DA1F2,#0c85d0)',
    instagram: 'linear-gradient(135deg,#E1306C,#833AB4,#FD1D1D)',
    youtube:   'linear-gradient(135deg,#FF0000,#cc0000)',
    twitch:    'linear-gradient(135deg,#9146FF,#6441a5)',
    kakao:     'linear-gradient(135deg,#FEE500,#f0d800)',
    discord:   'linear-gradient(135deg,#5865F2,#3c45bd)',
    notion:    'linear-gradient(135deg,#555,#333)',
    portfolio: 'linear-gradient(135deg,#4285F4,#185FC5)',
    npm:       'linear-gradient(135deg,#CB3837,#a82e2d)',
  };
  const m = LINK_META[item.type] || { label: item.type, favicon: '' };
  const grad = gradients[item.type] || 'linear-gradient(135deg,#555,#333)';
  const textColor = item.type === 'kakao' ? '#3A1D1D' : '#fff';
  return `<a href="${item.url || '#'}" target="_blank" style="
    display:inline-flex;align-items:center;gap:8px;
    padding:10px 20px;border-radius:999px;
    background:${grad};color:${textColor};
    font-size:13px;font-weight:700;text-decoration:none;
    box-shadow:0 4px 12px rgba(0,0,0,.15);">
    <img src="${m.favicon}" width="16" height="16" style="object-fit:contain;filter:brightness(0) invert(1);" alt="${m.label}">${m.label}
  </a>`;
}

function renderLinkBtnBordered(item) {
  const m = LINK_META[item.type] || { label: item.type, favicon: '', color: '#4285F4', bg: '#eee' };
  return `<a href="${item.url || '#'}" target="_blank" style="
    display:inline-flex;align-items:center;gap:8px;
    padding:9px 18px;border-radius:10px;
    background:transparent;border:2px solid ${m.color};
    color:${m.color};font-size:13px;font-weight:600;text-decoration:none;">
    <img src="${m.favicon}" width="16" height="16" style="object-fit:contain;" alt="${m.label}">${m.label}
  </a>`;
}

function renderLinkBtnSocial(item) {
  const m = LINK_META[item.type] || { label: item.type, favicon: '', color: '#333', bg: '#eee' };
  return `<a href="${item.url || '#'}" target="_blank" style="
    display:inline-flex;align-items:center;gap:7px;
    padding:8px 16px;border-radius:12px;
    background:${m.bg};
    color:${m.color};font-size:12px;font-weight:700;text-decoration:none;
    border:1.5px solid ${m.color}33;">
    <img src="${m.favicon}" width="16" height="16" style="object-fit:contain;" alt="${m.label}">${m.label}
  </a>`;
}

function renderLinkBtnDark(item) {
  const m = LINK_META[item.type] || { label: item.type, favicon: '', color: '#fff', bg: '#333' };
  return `<a href="${item.url || '#'}" target="_blank" style="
    display:inline-flex;align-items:center;gap:8px;
    padding:9px 18px;border-radius:10px;
    background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);
    color:#fff;font-size:13px;font-weight:600;text-decoration:none;">
    <img src="${m.favicon}" width="16" height="16" style="object-fit:contain;filter:brightness(0) invert(1);" alt="${m.label}">${m.label}
  </a>`;
}

function renderLinkBtnContact(item) {
  const m = LINK_META[item.type] || { label: item.type, favicon: '', color: '#333', bg: '#eee' };
  return `<a href="${item.url || '#'}" target="_blank" style="
    display:flex;align-items:center;gap:14px;
    padding:14px 18px;border-radius:16px;
    background:${m.bg};border:1.5px solid ${m.color}22;
    color:${m.color};font-size:14px;font-weight:600;text-decoration:none;">
    <img src="${m.favicon}" width="24" height="24" style="object-fit:contain;" alt="${m.label}">
    <div>
      <div style="font-size:13px;font-weight:700;">${m.label}</div>
      <div style="font-size:11px;opacity:.6;margin-top:1px;">${item.url || '링크를 입력해주세요'}</div>
    </div>
    <span style="margin-left:auto;font-size:14px;">→</span>
  </a>`;
}

function renderLinkBtnDevHub(item) {
  const m = LINK_META[item.type] || { label: item.type, favicon: '', color: '#333', bg: '#f5f5f5' };
  return `<a href="${item.url || '#'}" target="_blank" style="
    display:inline-flex;align-items:center;gap:7px;
    padding:8px 14px;border-radius:8px;
    background:#f8f8f8;border:1px solid #e0e0e0;
    color:#333;font-size:12px;font-weight:600;text-decoration:none;">
    <img src="${m.favicon}" width="16" height="16" style="object-fit:contain;" alt="${m.label}">${m.label}
  </a>`;
}

/* ── Banner 위젯 렌더 (미리보기 전용 — 실제 이미지는 코드로) ── */
function renderBanner(card) {
  const theme = WE.theme;
  const text  = WE.bannerText || 'Hi! Welcome!';
  const user  = WE.username || 'octocat';

  /* 배너는 카드 컨테이너 스타일을 리셋해서 전체 너비로 표시 */
  card.style.cssText = 'width:100%;max-width:560px;padding:0;background:transparent;border:none;box-shadow:none;border-radius:16px;overflow:hidden;';

  /* 미리보기: 테마별 CSS 스타일 배너 박스 */
  const previewStyles = {
    'banner-wave-pink':      'background:linear-gradient(135deg,#FFF0F7,#F4C0D1);',
    'banner-wave-blue':      'background:linear-gradient(135deg,#E6F1FB,#B5D4F4);',
    'banner-slice-gradient': 'background:linear-gradient(120deg,#9B8FE8,#4285F4,#ED93B1);',
    'banner-egg':            'background:linear-gradient(135deg,#FFF5F9,#F0EEFF);',
    'banner-cylinder':       'background:linear-gradient(135deg,#E1F5EE,#7EC8E3);',
    'banner-shark':          'background:linear-gradient(135deg,#1a1a2e,#0d0d1a);',
    'banner-divider-hits':   'background:#f0f4ff;',
    'banner-typing':         'background:#0d1117;',
    'banner-github-trophy':  'background:linear-gradient(135deg,#fff9e6,#fff3c0);',
    'banner-snake':          'background:linear-gradient(135deg,#EAF3DE,#C0DD97);',
    'premium-hit':           'background:linear-gradient(135deg,#f0f4ff,#4285f408);',
  };

  const isDark = ['banner-shark','banner-typing'].includes(theme);
  const bgStyle = previewStyles[theme] || 'background:#f5f5f5;';
  const textColor = isDark ? '#fff' : '#1a1a2e';

  let innerContent = '';

  if (theme === 'banner-divider-hits') {
    innerContent = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
        <div style="font-size:13px;font-weight:600;color:#555;">방문자 카운터</div>
        <div style="display:flex;align-items:center;gap:0;border-radius:6px;overflow:hidden;border:1px solid #ddd;">
          <div style="background:#555;color:#fff;padding:6px 14px;font-size:13px;font-weight:600;">hits</div>
          <div style="background:#34A853;color:#fff;padding:6px 14px;font-size:13px;font-weight:700;">1,234</div>
        </div>
        <div style="font-size:11px;color:#999;">seeyoufarm.com Hits 카운터</div>
      </div>`;
  } else if (theme === 'banner-typing') {
    innerContent = `
      <div style="font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:600;color:#61DAFB;">
        ${text.split(';')[0]}<span style="border-right:3px solid #61DAFB;"> </span>
      </div>
      <div style="font-size:11px;color:#8b949e;margin-top:8px;">readme-typing-svg 애니메이션</div>`;
  } else if (theme === 'banner-github-trophy') {
    innerContent = `
      <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
        ${['🏆','⭐','🔥','💎','🚀','📚'].map(e=>`
          <div style="background:#fff;border:1px solid #f0c060;border-radius:10px;padding:10px 12px;text-align:center;min-width:50px;">
            <div style="font-size:20px;">${e}</div>
            <div style="font-size:9px;color:#888;margin-top:4px;">Trophy</div>
          </div>`).join('')}
      </div>`;
  } else if (theme === 'banner-snake') {
    innerContent = `
      <div style="position:relative;width:100%;height:60px;overflow:hidden;">
        <div style="position:absolute;width:16px;height:16px;background:#34A853;border-radius:3px;top:20px;left:20px;"></div>
        <div style="position:absolute;width:16px;height:16px;background:#4CAF50;border-radius:3px;top:20px;left:40px;"></div>
        <div style="position:absolute;width:16px;height:16px;background:#66BB6A;border-radius:3px;top:20px;left:60px;"></div>
        <div style="position:absolute;width:8px;height:8px;background:#FF5252;border-radius:50%;top:24px;left:90px;"></div>
        <div style="font-size:11px;color:${textColor};opacity:.6;position:absolute;bottom:4px;right:8px;">contribution snake 애니메이션</div>
      </div>`;
  } else if (theme === 'premium-hit') {
    innerContent = `
      <div style="display:flex;flex-direction:column;align-items:center;background:rgba(255,255,255,0.1);padding:16px 24px;border-radius:24px;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);box-shadow:0 12px 40px rgba(0,0,0,0.15);">
        <div style="font-size:12px;font-weight:700;color:${textColor};opacity:0.7;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">${text || 'Visitors'}</div>
        <div style="font-size:44px;font-weight:800;color:${textColor};font-family:'Inter', sans-serif;">1,247</div>
        <div style="margin-top:10px;width:100px;height:4px;background:rgba(255,255,255,0.2);border-radius:2px;overflow:hidden;">
          <div style="width:70%;height:100%;background:var(--accent);"></div>
        </div>
      </div>`;
  } else {
    innerContent = `
      <div style="font-size:28px;font-weight:800;color:${textColor};letter-spacing:-.02em;">${text}</div>`;
  }

  card.innerHTML = `
    <div style="width:100%;border-radius:16px;overflow:hidden;${bgStyle}padding:32px 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:120px;">
      ${innerContent}
      <div style="margin-top:12px;font-size:10px;opacity:.5;color:${textColor};">미리보기 · 실제 코드는 아래 탭에서 복사</div>
    </div>
  `;
}

/* 배지 HTML 생성 */
function renderBadges(tags) {
  const colors = ['pk','pu','sk','pk','pu','sk'];
  return tags.map((tag, i) =>
    `<span class="w-badge w-badge-${colors[i % 3]}" data-tech="${tag}">${tag}</span>`
  ).join('');
}

/* ── 코드 스트립 — 실제 동작하는 코드 생성 ─────────────── */
function updateCodeStrip() {
  const pre = document.getElementById('code-pre');
  if (!pre) return;

  const tab = document.querySelector('.ctab.on');
  const fmt = tab ? tab.dataset.fmt || tab.textContent.trim().toLowerCase() : 'md';

  let code = '';

  switch (WE.type) {
    case 'stats':   code = genStatsCode(fmt);   break;
    case 'tech':    code = genTechCode(fmt);    break;
    case 'profile': code = genProfileCode(fmt); break;
    case 'streak':  code = genStreakCode(fmt);  break;
    case 'links':   code = genLinksCode(fmt);   break;
    case 'banner':  code = genBannerCode(fmt);  break;
    default:        code = `<!-- GitGloss: ${WE.type} -->`;
  }

  pre.textContent = code;
}

/* ── 코드 생성 함수들 ─────────────────────────────────── */

function genStatsCode(fmt) {
  const user  = WE.username || 'octocat';
  const theme = WE.theme;

  if (theme === 'blog-card') {
    return `<!-- Blog Feed Widget: Use a tool like blog-post-workflow -->\n[![Latest Blog Post](https://img.shields.io/badge/Latest_Blog_Post-20c997?style=for-the-badge&logo=velog&logoColor=white)](https://github.com/gautamkrishnar/blog-post-workflow)`;
  }
  if (theme === 'progress-100') {
    return `<!-- 100 Days of Code: Use a progress bar SVG generator -->\n![Progress](https://geps.dev/progress/42)`;
  }
  if (theme === 'radar-chart') {
    return `<!-- Skill Radar: Use a radar chart generator -->\n![Radar Chart](https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact)`;
  }

  /* github-readme-stats 실제 API */
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&include_all_commits=true&theme=default&hide_title=false&hide_border=false`;
  const topLangUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&theme=default`;

  if (fmt === 'md') return [
    `![${user}'s GitHub stats](${statsUrl})`,
    ``,
    `![Top Langs](${topLangUrl})`,
  ].join('\n');

  if (fmt === 'html') return [
    `<img src="${statsUrl}" alt="${user}'s GitHub stats" />`,
    `<br/>`,
    `<img src="${topLangUrl}" alt="Top Languages" />`,
  ].join('\n');

  return `<image href="${statsUrl}" width="495" height="195" />`;
}

function genTechCode(fmt) {
  const tags = WE.tags.length ? WE.tags : ['React', 'TypeScript', 'Node.js'];

  /* shields.io 배지 URL 매핑 */
  const TECH_SHIELD = {
    'React':      { logo: 'react',      color: '61DAFB', label: 'React' },
    'TypeScript': { logo: 'typescript', color: '3178C6', label: 'TypeScript' },
    'JavaScript': { logo: 'javascript', color: 'F7DF1E', label: 'JavaScript' },
    'Node.js':    { logo: 'nodedotjs',  color: '339933', label: 'Node.js' },
    'Python':     { logo: 'python',     color: '3776AB', label: 'Python' },
    'Go':         { logo: 'go',         color: '00ADD8', label: 'Go' },
    'Rust':       { logo: 'rust',       color: '000000', label: 'Rust' },
    'Vue.js':     { logo: 'vuedotjs',   color: '4FC08D', label: 'Vue.js' },
    'Next.js':    { logo: 'nextdotjs',  color: '000000', label: 'Next.js' },
    'Docker':     { logo: 'docker',     color: '2496ED', label: 'Docker' },
    'AWS':        { logo: 'amazonaws',  color: 'FF9900', label: 'AWS' },
    'MySQL':      { logo: 'mysql',      color: '4479A1', label: 'MySQL' },
    'PostgreSQL': { logo: 'postgresql', color: '4169E1', label: 'PostgreSQL' },
    'MongoDB':    { logo: 'mongodb',    color: '47A248', label: 'MongoDB' },
    'Figma':      { logo: 'figma',      color: 'F24E1E', label: 'Figma' },
    'Swift':      { logo: 'swift',      color: 'F05138', label: 'Swift' },
    'Kotlin':     { logo: 'kotlin',     color: '7F52FF', label: 'Kotlin' },
    'Flutter':    { logo: 'flutter',    color: '02569B', label: 'Flutter' },
  };

  const style = 'flat-square';
  const badges = tags.map(tag => {
    const info = TECH_SHIELD[tag];
    if (info) {
      return `https://img.shields.io/badge/${encodeURIComponent(info.label)}-${info.color}?style=${style}&logo=${info.logo}&logoColor=white`;
    }
    return `https://img.shields.io/badge/${encodeURIComponent(tag)}-555555?style=${style}`;
  });

  if (fmt === 'md') return badges.map(url => `![](${url})`).join(' ');
  if (fmt === 'html') return badges.map(url => `<img src="${url}" alt="badge" />`).join('\n');
  return badges.map((url, i) => `<image href="${url}" y="${i * 32}" width="120" height="28" />`).join('\n');
}

function genProfileCode(fmt) {
  const user = WE.username || 'octocat';
  /* github-readme-stats 프로필 카드 */
  const url = `https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&include_all_commits=true&count_private=true&theme=default`;

  if (fmt === 'md') return `![${user}'s GitHub Profile](${url})`;
  if (fmt === 'html') return `<img src="${url}" alt="${user}'s GitHub Profile" />`;
  return `<image href="${url}" width="495" height="195" />`;
}

function genStreakCode(fmt) {
  const user = WE.username || 'octocat';
  /* github-readme-streak-stats 실제 API */
  const url = `https://streak-stats.demolab.com/?user=${user}&theme=default`;

  if (fmt === 'md') return `[![GitHub Streak](${url})](https://git.io/streak-stats)`;
  if (fmt === 'html') return `<img src="${url}" alt="GitHub Streak" />`;
  return `<image href="${url}" width="495" height="195" />`;
}

function genLinksCode(fmt) {
  const items = WE.linkItems;
  const theme = WE.theme;

  if (theme === 'spotify-glass') {
    return `<!-- Spotify Now Playing: Use spotify-github-profile-readme -->\n[![Spotify](https://novatide.vercel.app/api/spotify?background_color=1db954&border_color=ffffff&github_username=${WE.username || 'octocat'})](https://github.com/kittinan/spotify-github-profile-readme)`;
  }
  if (theme === 'coffee-meter') {
    return `<!-- Buy Me A Coffee: Use buy-me-a-coffee badge -->\n[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/)`;
  }

  /* shields.io 기반 링크 버튼 생성 */
  const LINK_SHIELD = {
    github:    { logo: 'github',    color: '181717', label: 'GitHub' },
    blog:      { logo: 'velog',     color: '20C997', label: '블로그' },
    email:     { logo: 'gmail',     color: 'EA4335', label: 'Email' },
    linkedin:  { logo: 'linkedin',  color: '0A66C2', label: 'LinkedIn' },
    twitter:   { logo: 'x',         color: '000000', label: 'X/Twitter' },
    instagram: { logo: 'instagram', color: 'E4405F', label: 'Instagram' },
    youtube:   { logo: 'youtube',   color: 'FF0000', label: 'YouTube' },
    twitch:    { logo: 'twitch',    color: '9146FF', label: 'Twitch' },
    kakao:     { logo: 'kakaotalk', color: 'FAE100', label: 'KakaoTalk' },
    discord:   { logo: 'discord',   color: '5865F2', label: 'Discord' },
    notion:    { logo: 'notion',    color: '000000', label: 'Notion' },
    portfolio: { logo: 'github',    color: '4285F4', label: 'Portfolio' },
    npm:       { logo: 'npm',       color: 'CB3837', label: 'npm' },
  };

  const style = 'for-the-badge';

  if (fmt === 'md') {
    return items.map(item => {
      const info = LINK_SHIELD[item.type] || { logo: '', color: '555', label: item.type };
      const shieldUrl = `https://img.shields.io/badge/${encodeURIComponent(info.label)}-${info.color}?style=${style}&logo=${info.logo}&logoColor=white`;
      const href = item.url || '#';
      return `[![${info.label}](${shieldUrl})](${href})`;
    }).join('\n');
  }

  if (fmt === 'html') {
    return `<p align="center">\n` + items.map(item => {
      const info = LINK_SHIELD[item.type] || { logo: '', color: '555', label: item.type };
      const shieldUrl = `https://img.shields.io/badge/${encodeURIComponent(info.label)}-${info.color}?style=${style}&logo=${info.logo}&logoColor=white`;
      const href = item.url || '#';
      return `  <a href="${href}"><img src="${shieldUrl}" alt="${info.label}" /></a>`;
    }).join('\n') + `\n</p>`;
  }

  return items.map((item, i) => {
    const info = LINK_SHIELD[item.type] || { logo: '', color: '555', label: item.type };
    const shieldUrl = `https://img.shields.io/badge/${encodeURIComponent(info.label)}-${info.color}?style=${style}&logo=${info.logo}&logoColor=white`;
    return `<image href="${shieldUrl}" y="${i * 40}" width="160" height="32" />`;
  }).join('\n');
}

function genBannerCode(fmt) {
  const theme = WE.theme;
  const text  = encodeURIComponent(WE.bannerText || 'Hi! Welcome!');
  const user  = WE.username || 'octocat';

  /* 테마별 실제 서비스 URL */
  const bannerUrls = {
    'banner-wave-pink':      `https://capsule-render.vercel.app/api?type=wave&color=gradient&customColorList=12&height=160&section=header&text=${text}&fontSize=60&fontColor=ffffff&animation=fadeIn`,
    'banner-wave-blue':      `https://capsule-render.vercel.app/api?type=wave&color=gradient&customColorList=2&height=160&section=header&text=${text}&fontSize=60&fontColor=ffffff`,
    'banner-slice-gradient': `https://capsule-render.vercel.app/api?type=slice&color=gradient&height=160&section=header&text=${text}&fontAlign=50&fontAlignY=65&fontSize=70&fontColor=ffffff`,
    'banner-egg':            `https://capsule-render.vercel.app/api?type=egg&color=gradient&customColorList=12&height=200&text=${text}&fontSize=60&fontColor=ffffff`,
    'banner-cylinder':       `https://capsule-render.vercel.app/api?type=cylinder&color=gradient&customColorList=6&height=150&section=header&text=${text}&fontSize=55&fontColor=ffffff`,
    'banner-shark':          `https://capsule-render.vercel.app/api?type=shark&color=0D1117&height=160&section=header&text=${text}&fontSize=55&fontColor=ffffff&reversal=false`,
    'banner-divider-hits':   `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2F${user}&count_bg=%2341B883&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false`,
    'banner-typing':         `https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=4285F4&width=435&lines=${text}`,
    'banner-github-trophy':  `https://github-profile-trophy.vercel.app/?username=${user}&theme=flat&no-frame=true&margin-w=4`,
    'banner-snake':          `https://github.com/${user}/${user}/blob/output/snake.svg`,
    'premium-hit':           `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2F${user}&count_bg=%234285F4&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=visitors&edge_flat=false`,
  };

  const url = bannerUrls[theme] || bannerUrls['banner-wave-pink'];

  if (fmt === 'md') {
    if (theme === 'banner-divider-hits') {
      return `<p align="center">\n  <a href="https://hits.seeyoufarm.com"><img src="${url}" /></a>\n</p>`;
    }
    if (theme === 'banner-github-trophy') {
      return `<p align="center">\n  <img src="${url}" alt="GitHub Trophy" />\n</p>`;
    }
    if (theme === 'banner-snake') {
      return `<!-- Snake 게임 설정: 먼저 GitHub Actions를 설정해야 합니다. -->\n<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="${url}" />\n  <img alt="Snake animation" src="${url}" />\n</picture>`;
    }
    return `![header](${url})`;
  }

  if (fmt === 'html') {
    return `<p align="center">\n  <img src="${url}" alt="header banner" />\n</p>`;
  }

  return `<image href="${url}" width="840" height="160" />`;
}

/* ── 입력 바인딩 ─────────────────────────────────────── */
function bindInputs() {
  const bind = (id, key, render = true) => {
    const el = document.getElementById(id);
    if (!el) return;
    /* 초기값 동기화 */
    if (el.value) WE[key] = el.value;
    el.addEventListener('input', () => {
      WE[key] = el.value;
      if (render) renderWidgetDOM();
      updateCodeStrip();
    });
  };

  bind('inp-username', 'username');
  bind('inp-title',    'title', false);
  bind('inp-pname',    'pname');
  bind('inp-handle',   'handle');
  bind('inp-role',     'role');
  bind('inp-bio',      'bio');
  bind('inp-streak',   'streak');
  bind('inp-longest-streak', 'longest');
  bind('inp-total-contributions', 'total');
  bind('inp-banner-text',   'bannerText');
  bind('inp-banner-height', 'bannerHeight');

  /* inp-username-banner → WE.username (배너 전용) */
  const bannerUserEl = document.getElementById('inp-username-banner');
  if (bannerUserEl) {
    bannerUserEl.addEventListener('input', () => {
      WE.username = bannerUserEl.value;
      renderWidgetDOM();
      updateCodeStrip();
    });
  }

  /* Stat 라벨/값 */
  [1,2,3].forEach(n => {
    const lbl = document.getElementById(`s${n}-label`);
    const val = document.getElementById(`s${n}-val`);
    if (lbl) lbl.addEventListener('input', () => {
      WE.stats[n-1].label = lbl.value || WE.stats[n-1].label;
      renderWidgetDOM(); updateCodeStrip();
    });
    if (val) val.addEventListener('input', () => {
      WE.stats[n-1].val = val.value || WE.stats[n-1].val;
      renderWidgetDOM(); updateCodeStrip();
    });
  });

  /* Links 동적 행 바인딩 (초기화 후 호출) */
  bindLinkInputs();
}

/* 링크 입력 행 바인딩 */
function bindLinkInputs() {
  document.querySelectorAll('.link-row-url').forEach((inp, idx) => {
    inp.addEventListener('input', () => {
      if (WE.linkItems[idx]) {
        WE.linkItems[idx].url = inp.value;
        renderWidgetDOM();
        updateCodeStrip();
      }
    });
  });
  document.querySelectorAll('.link-row-type').forEach((sel, idx) => {
    sel.addEventListener('change', () => {
      if (WE.linkItems[idx]) {
        WE.linkItems[idx].type = sel.value;
        renderWidgetDOM();
        updateCodeStrip();
      }
    });
  });
}

/* 링크 행 추가 */
function addLinkRow() {
  WE.linkItems.push({ type: 'blog', url: '' });
  renderLinkRows();
  renderWidgetDOM();
  updateCodeStrip();
}

/* 링크 행 삭제 */
function removeLinkRow(idx) {
  WE.linkItems.splice(idx, 1);
  renderLinkRows();
  renderWidgetDOM();
  updateCodeStrip();
}

/* 링크 행 DOM 재렌더 */
function renderLinkRows() {
  const wrap = document.getElementById('link-rows-wrap');
  if (!wrap) return;

  const linkTypeOptions = Object.keys(LINK_META).map(k =>
    `<option value="${k}">${LINK_META[k].label}</option>`
  ).join('');

  wrap.innerHTML = WE.linkItems.map((item, idx) => `
    <div class="field-group" style="display:flex;gap:5px;align-items:center;padding-bottom:0;">
      <select class="field-input link-row-type" style="flex:0 0 120px;font-size:11px;">
        ${Object.keys(LINK_META).map(k =>
          `<option value="${k}" ${k === item.type ? 'selected' : ''}>${LINK_META[k].label}</option>`
        ).join('')}
      </select>
      <input class="field-input link-row-url" placeholder="URL 입력" value="${item.url}"
        style="flex:1;font-size:11px;">
      <button onclick="removeLinkRow(${idx})" style="
        background:none;border:none;cursor:pointer;
        color:#EA4335;font-size:16px;padding:0 4px;">×</button>
    </div>
  `).join('');

  bindLinkInputs();
}

/* ── 퍼블릭 함수들 ───────────────────────────────────── */

function selectEmoji(btn, emoji) {
  document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  WE.emoji = emoji;
  const avatar = document.getElementById('w-avatar');
  if (avatar) avatar.textContent = emoji;
}

function selColor(el, color) {
  document.querySelectorAll('.sw').forEach(s => s.classList.remove('on'));
  el.classList.add('on');
  WE.accent = color;
}

function selectType(btn, type) {
  document.querySelectorAll('.type-chip').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  WE.type = type;

  /* 필드 패널 전환 */
  ['stats','tech','profile','streak','links','banner'].forEach(t => {
    const el = document.getElementById(`fields-${t}`);
    if (el) el.style.display = t === type ? '' : 'none';
  });

  /* links/banner 선택 시 이모지·사용자명 숨김 */
  const hideForTypes = ['links', 'banner'];
  const shouldHide = hideForTypes.includes(type);
  ['divider-emoji','label-emoji','emoji-grid','divider-username','field-username'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = shouldHide ? 'none' : '';
  });

  if (typeof renderTemplateThumbs === 'function') renderTemplateThumbs(type);

  setTimeout(() => {
    const first = TEMPLATES.find(t => t.type === type);
    if (first) {
      applyTheme(first.id);
      document.querySelectorAll('.tpl-thumb').forEach(t => t.classList.remove('active'));
      const firstThumb = document.querySelector(`.tpl-thumb[data-id="${first.id}"]`);
      if (firstThumb) firstThumb.classList.add('active');
    }
  }, 10);
}

function selCtab(btn, fmt) {
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  btn.dataset.fmt = fmt;
  updateCodeStrip();
}

function doCopy() {
  const pre = document.getElementById('code-pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent).then(() => {
    const btn = document.getElementById('copy-btn');
    const orig = btn.textContent;
    btn.textContent = '✓ 복사됨';
    btn.classList.add('copied');
    const ad = document.getElementById('ad-b2');
    if (ad) ad.classList.add('show');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 2000);
  });
}

function addTag(e, input) {
  if (e.key !== 'Enter') return;
  const val = input.value.trim();
  if (!val) return;
  WE.tags.push(val);
  const wrap = document.getElementById('tag-wrap');
  if (wrap) {
    const span = document.createElement('span');
    span.className = 'tag tag-pk';
    span.innerHTML = `${val} <button class="tag-x" onclick="removeTag(this)">×</button>`;
    wrap.appendChild(span);
  }
  input.value = '';
  renderWidgetDOM(); updateCodeStrip();
}

function addTagTo(e, input, wrapId) {
  if (e.key !== 'Enter') return;
  const val = input.value.trim();
  if (!val) return;
  WE.tags.push(val);
  const wrap = document.getElementById(wrapId);
  if (wrap) {
    const span = document.createElement('span');
    span.className = 'tag tag-pk';
    span.innerHTML = `${val} <button class="tag-x" onclick="removeTag(this)">×</button>`;
    wrap.appendChild(span);
  }
  input.value = '';
  renderWidgetDOM(); updateCodeStrip();
}

function removeTag(btn) {
  const tag = btn.parentElement;
  const text = tag.textContent.replace('×','').trim();
  WE.tags = WE.tags.filter(t => t !== text);
  tag.remove();
  renderWidgetDOM(); updateCodeStrip();
}

function exportWidget() {
  const card = document.getElementById('widget-card');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const w = Math.round(rect.width);
  const h = Math.round(rect.height);
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">${card.outerHTML}</div>
  </foreignObject>
</svg>`;
  const blob = new Blob([svgStr], { type: 'image/svg+xml' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `gitgloss-${WE.theme}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ── 초기화 ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  bindInputs();
  applyTheme('stats-01');
  const first = document.querySelector('.tpl-thumb');
  if (first) first.classList.add('active');
});