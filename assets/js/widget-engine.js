/* ═══════════════════════════════════════════════════════
   GitGloss — widget-engine.js
   테마 클래스 적용 + 위젯 DOM 렌더링 엔진
   ═══════════════════════════════════════════════════════ */

'use strict';

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
  // profile-only
  pname:   '',
  handle:  '@octocat',
  role:    'Full-stack Developer',
  bio:     'Building amazing things with code',
  // streak-only
  streak:  '42',
  longest: '87',
  total:   '1,247'
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

  /* 기존 테마 클래스 전부 제거 */
  card.classList.remove(...ALL_THEME_UNIQUE);

  /* 새 테마 + 레이아웃 클래스 추가 */
  card.classList.add(`theme-${WE.theme}`);
  if (WE.layout) card.classList.add(WE.layout);

  /* 위젯 타입에 따라 DOM 구조 전환 */
  renderWidgetDOM();

  /* 코드 스트립 업데이트 */
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
  }
}

/* Stats 위젯 */
function renderStats(card) {
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
    <div class="w-tags" id="w-tags">
      ${renderBadges(WE.tags)}
    </div>
  `;
}

/* Tech 위젯 */
function renderTech(card) {
  card.innerHTML = `
    <div class="w-header">
      <div class="w-avatar" id="w-avatar">${WE.emoji}</div>
      <div>
        <div class="w-name" id="w-name">${WE.username || 'octocat'}</div>
        <div class="w-handle" id="w-handle">Tech Stack</div>
      </div>
    </div>
    <div class="w-tags" id="w-tags">
      ${renderBadges(WE.tags)}
    </div>
  `;
}

/* Profile 위젯 */
function renderProfile(card) {
  const theme = WE.theme;
  const isTypography = theme === 'profile-typography';
  const hasRole = ['profile-portfolio','profile-glass-grid','profile-soft'].includes(theme);

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
    <div class="w-tags" id="w-tags">
      ${renderBadges(WE.tags)}
    </div>
  `;
}

/* Streak 위젯 */
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

/* 배지 HTML 생성 */
function renderBadges(tags) {
  const colors = ['pk','pu','sk','pk','pu','sk'];
  return tags.map((tag, i) =>
    `<span class="w-badge w-badge-${colors[i % 3]}" data-tech="${tag}">${tag}</span>`
  ).join('');
}

/* ── 코드 스트립 ─────────────────────────────────────── */
function updateCodeStrip() {
  const pre = document.getElementById('code-pre');
  if (!pre) return;

  const tab = document.querySelector('.ctab.on');
  const fmt = tab ? tab.dataset.fmt || tab.textContent.trim().toLowerCase() : 'md';
  const user = WE.username || 'octocat';
  const theme = WE.theme;
  const type = WE.type;

  const url = `https://gitgloss.io/api/${type}?user=${user}&theme=${theme}`;

  const codes = {
    md:   `![GitGloss](${url})`,
    html: `<img src="${url}" alt="GitGloss Widget" />`,
    svg:  `<image href="${url}" width="360" height="180" />`
  };

  pre.textContent = codes[fmt] || codes.md;
}

/* ── 입력 바인딩 ─────────────────────────────────────── */
function bindInputs() {
  const bind = (id, key, render = true) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      WE[key] = el.value;
      if (render) renderWidgetDOM();
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

  /* Stat 라벨/값 */
  [1,2,3].forEach(n => {
    const lbl = document.getElementById(`s${n}-label`);
    const val = document.getElementById(`s${n}-val`);
    if (lbl) lbl.addEventListener('input', () => {
      WE.stats[n-1].label = lbl.value || WE.stats[n-1].label;
      renderWidgetDOM();
    });
    if (val) val.addEventListener('input', () => {
      WE.stats[n-1].val = val.value || WE.stats[n-1].val;
      renderWidgetDOM();
    });
  });
}

/* ── 퍼블릭 함수들 ───────────────────────────────────── */

/* 이모지 선택 */
function selectEmoji(btn, emoji) {
  document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  WE.emoji = emoji;
  const avatar = document.getElementById('w-avatar');
  if (avatar) avatar.textContent = emoji;
}

/* 액센트 색상 선택 */
function selColor(el, color) {
  document.querySelectorAll('.sw').forEach(s => s.classList.remove('on'));
  el.classList.add('on');
  WE.accent = color;
  /* accent는 CSS custom property가 아닌 테마 클래스로 제어 */
}

/* 위젯 타입 선택 (Config 패널 타입 버튼) */
function selectType(btn, type) {
  document.querySelectorAll('.type-chip').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  WE.type = type;

  /* 필드 패널 전환 먼저 */
  ['stats','tech','profile','streak'].forEach(t => {
    const el = document.getElementById(`fields-${t}`);
    if (el) el.style.display = t === type ? '' : 'none';
  });

  /* 해당 타입 썸네일 그리드 재렌더 */
  if (typeof renderTemplateThumbs === 'function') {
    renderTemplateThumbs(type);
  }

  /* 썸네일 렌더 완료 후 첫 번째 템플릿 자동 적용 */
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

/* 코드 탭 선택 */
function selCtab(btn, fmt) {
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  btn.dataset.fmt = fmt;
  updateCodeStrip();
}

/* 복사 */
function doCopy() {
  const pre = document.getElementById('code-pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent).then(() => {
    const btn = document.getElementById('copy-btn');
    const orig = btn.textContent;
    btn.textContent = '✓ 복사됨';
    btn.classList.add('copied');
    /* 광고 슬라이드인 */
    const ad = document.getElementById('ad-b2');
    if (ad) ad.classList.add('show');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 2000);
  });
}

/* 태그 추가 */
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
  renderWidgetDOM();
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
  renderWidgetDOM();
}

function removeTag(btn) {
  const tag = btn.parentElement;
  const text = tag.textContent.replace('×','').trim();
  WE.tags = WE.tags.filter(t => t !== text);
  tag.remove();
  renderWidgetDOM();
}

/* SVG Export */
function exportWidget() {
  const card = document.getElementById('widget-card');
  if (!card) return;

  /* 현재 computed style 기준 SVG foreignObject 래핑 */
  const rect = card.getBoundingClientRect();
  const w = Math.round(rect.width);
  const h = Math.round(rect.height);

  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      ${card.outerHTML}
    </div>
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
  /* 기본 템플릿 적용 */
  applyTheme('stats-01');
  /* 첫 번째 썸네일 active */
  const first = document.querySelector('.tpl-thumb');
  if (first) first.classList.add('active');
});