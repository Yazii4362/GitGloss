// GitGloss Builder — 2-column UI Controller
// Depends on: common.js, widget-engine.js

/* ══════════════════════════════
   State
══════════════════════════════ */
const state = {
  type:    'stats',
  theme:   'cotton-candy',
  accent:  '#ED93B1',
  ptab:    'gl',
  tab:     'md',
  tagCount: 3,
};

const TAG_COLORS = ['tag-pk', 'tag-pu', 'tag-sk'];
const BADGE_COLORS = ['w-badge-pk', 'w-badge-pu', 'w-badge-sk'];

const CODE = {
  md:   () => `![GitGloss](https://gitgloss.io/api/${state.type}?user=${username()}&theme=${state.theme}&accent=${state.accent.replace('#','')})`,
  html: () => `<img src="https://gitgloss.io/api/${state.type}?user=${username()}&theme=${state.theme}" alt="GitGloss widget" />`,
  svg:  () => `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="200">\n  <!-- theme:${state.theme} user:${username()} -->\n</svg>`,
};

/* ══════════════════════════════
   Init
══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildPresets('gl');
  readURLParams();
  updateCode();
});

/* ── URL parameter 연동 (gallery → builder) ── */
function readURLParams() {
  const p = new URLSearchParams(location.search);

  // ?type=stats|tech|profile|streak
  if (p.has('type')) {
    const t = p.get('type');
    const chips = document.querySelectorAll('.type-chip');
    const types = ['stats','tech','profile','streak'];
    chips.forEach((c, i) => {
      c.classList.toggle('on', types[i] === t);
    });
    switchFields(t);
    state.type = t;
  }

  // ?theme=cotton-candy|cotton-dark|neumorphic-candy
  if (p.has('theme')) {
    const themeMap = {
      'cotton-candy':    'gl',
      'cotton-dark':     'gd',
      'neumorphic-candy':'nm',
    };
    state.theme = p.get('theme');
    const ptabKey = themeMap[state.theme] || 'gl';
    selPtabByKey(ptabKey);
  }

  // ?preset=preset-01 등
  if (p.has('preset')) {
    state.preset = p.get('preset');
  }

  // ?user=octocat
  if (p.has('user')) {
    const inp = document.getElementById('inp-username');
    if (inp) { inp.value = p.get('user'); updateName(p.get('user')); }
  }

  updateCode();
}

/* ══════════════════════════════
   Widget type
══════════════════════════════ */
function selectType(el, type) {
  document.querySelectorAll('.type-chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  state.type = type;
  switchFields(type);
  updateCode();
}

function switchFields(type) {
  ['stats','tech','profile','streak'].forEach(t => {
    const el = document.getElementById('fields-' + t);
    if (el) el.style.display = (t === type) ? '' : 'none';
  });
}

/* ══════════════════════════════
   Preset tabs
══════════════════════════════ */
function selPtab(el, cls) {
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  state.ptab = cls;
  buildPresets(cls);
}

function selPtabByKey(key) {
  const btns = document.querySelectorAll('.ptab');
  const keys = ['gl','gd','nm','vv'];
  btns.forEach((b, i) => b.classList.toggle('on', keys[i] === key));
  buildPresets(key);
}

function buildPresets(cls) {
  const g = document.getElementById('preset-scroll');
  if (!g) return;
  g.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const d = document.createElement('div');
    d.className = 'p-thumb ' + cls + (i === 0 ? ' on' : '');
    d.title = `Preset ${i + 1}`;
    d.onclick = function () {
      document.querySelectorAll('.p-thumb').forEach(x => x.classList.remove('on'));
      this.classList.add('on');
      // theme 연동
      const themeMap = { gl:'cotton-candy', gd:'cotton-dark', nm:'neumorphic-candy', vv:'cotton-candy' };
      state.theme = themeMap[cls] || 'cotton-candy';
      updateCode();
    };
    g.appendChild(d);
  }
}

/* ══════════════════════════════
   Accent color
══════════════════════════════ */
function selColor(el, hex) {
  document.querySelectorAll('.sw').forEach(s => s.classList.remove('on'));
  el.classList.add('on');
  state.accent = hex;
  // 프리뷰 숫자 색상 반영
  document.querySelectorAll('.w-num').forEach(n => n.style.color = hex);
  document.getElementById('w-avatar').style.background = `linear-gradient(135deg,${hex},#9B8FE8)`;
  updateCode();
}

/* ══════════════════════════════
   Username
══════════════════════════════ */
function username() {
  return document.getElementById('inp-username')?.value.trim() || 'octocat';
}

function updateName(v) {
  const n = v.trim() || 'octocat';
  const nameEl   = document.getElementById('w-name');
  const handleEl = document.getElementById('w-handle');
  if (nameEl)   nameEl.textContent   = n;
  if (handleEl) handleEl.textContent = '@' + n + ' · GitHub';
  updateCode();
}

/* ══════════════════════════════
   Stat fields → preview sync
══════════════════════════════ */
['s1','s2','s3'].forEach(k => {
  ['label','val'].forEach(f => {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById(`${k}-${f}`);
      if (!el) return;
      el.addEventListener('input', () => {
        const target = document.getElementById(`w-${k}-${f === 'label' ? 'lbl' : 'val'}`);
        if (target) target.textContent = el.value || el.placeholder;
      });
    });
  });
});

/* ══════════════════════════════
   Tags
══════════════════════════════ */
function removeTag(btn) {
  btn.closest('.tag').remove();
  syncTags();
}

function addTag(e, inp) {
  if (e.key !== 'Enter' || !inp.value.trim()) return;
  addTagTo(e, inp, 'tag-wrap');
}

function addTagTo(e, inp, wrapId) {
  if (e.key !== 'Enter' || !inp.value.trim()) return;
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  const tag = document.createElement('span');
  tag.className = 'tag ' + TAG_COLORS[state.tagCount % 3];
  tag.innerHTML = inp.value.trim() + ' <button class="tag-x" onclick="removeTag(this)">×</button>';
  wrap.appendChild(tag);
  inp.value = '';
  state.tagCount++;
  syncTags();
}

function syncTags() {
  const labels = Array.from(document.querySelectorAll('#tag-wrap .tag'))
    .map(t => t.textContent.replace('×','').trim());
  const wt = document.getElementById('w-tags');
  if (wt) {
    wt.innerHTML = labels
      .map((l, i) => `<span class="w-badge ${BADGE_COLORS[i % 3]}">${l}</span>`)
      .join('');
  }
}

/* ══════════════════════════════
   Code tabs
══════════════════════════════ */
function selCtab(el, key) {
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  state.tab = key;
  updateCode();
}

function updateCode() {
  const el = document.getElementById('code-pre');
  if (el) el.textContent = CODE[state.tab]?.() ?? '';
}

/* ══════════════════════════════
   Copy + AD-B2 슬라이드인
══════════════════════════════ */
let copyTimer;

function doCopy() {
  const code = document.getElementById('code-pre')?.textContent;
  if (!code) return;

  navigator.clipboard.writeText(code).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });

  const btn = document.getElementById('copy-btn');
  if (btn) {
    btn.textContent = '✓ Copied!';
    btn.classList.add('done');
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('done');
    }, 2000);
  }

  // AD-B2 슬라이드인
  const adB2 = document.getElementById('ad-b2');
  if (adB2) {
    adB2.classList.add('show');
    setTimeout(() => adB2.classList.remove('show'), 8000);
  }
}

/* ══════════════════════════════
   Export SVG
══════════════════════════════ */
function exportWidget() {
  const btn = document.querySelector('.btn-export');
  if (btn) { btn.textContent = 'Exporting...'; setTimeout(() => btn.textContent = 'Export SVG', 1200); }

  if (typeof generateStatsSVG === 'undefined') return;

  const svg = state.type === 'tech'
    ? generateBadgeSVG({ techs: getTechs(), themeName: state.theme })
    : state.type === 'profile'
      ? generateProfileSVG({ username: username(), themeName: state.theme })
      : generateStatsSVG({ username: username(), stars: 2847, commits: 1203, repos: 42, themeName: state.theme });

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: `gitgloss-${state.type}-${state.theme}.svg` });
  a.click();
  URL.revokeObjectURL(url);
}

function getTechs() {
  return Array.from(document.querySelectorAll('#tag-wrap .tag'))
    .map(t => t.textContent.replace('×','').trim());
}
