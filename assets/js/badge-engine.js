/* ═══════════════════════════════════════════════════════
   GitGloss — badge-engine.js
   배지 렌더링 + 빌더 상태 + 이벤트 바인딩 + 스택 시스템
   
   EXTERNAL DEPS (badges.js에서 전역 주입):
     BADGE_TEMPLATES, BADGE_STYLES, SERVICES, COLOR_PRESETS
     getBadgeById(), getService()
   ═══════════════════════════════════════════════════════ */
'use strict';

/* ════════════════════════════════════════════════════════
   1. 상태
   ════════════════════════════════════════════════════════ */
const S = {
  service:    'github',
  label:      'GitHub',
  value:      'Follow',
  style:      'flat',
  size:       'm',
  radius:     6,
  shadow:     false,
  color:      null,    // null = 서비스 기본색 사용
  codeFormat: 'html',
};

/* ════════════════════════════════════════════════════════
   2. 배지 HTML 생성
   ════════════════════════════════════════════════════════ */

/* 반지름 계산 */
function getRadius(styleId, overrideRadius) {
  if (styleId === 'pill')   return 999;
  if (styleId === 'square') return 3;
  return overrideRadius ?? 6;
}

/* 색상 헬퍼 */
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r:0,g:0,b:0 };
}
function lighten(hex, amount = 30) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.min(255,r+amount)},${Math.min(255,g+amount)},${Math.min(255,b+amount)})`;
}
function toRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* 배지 사이즈 */
const SIZES = {
  s: { h: 20, fs: 10, px: 8,  iconW: 24, gap: 6 },
  m: { h: 28, fs: 12, px: 10, iconW: 32, gap: 8 },
  l: { h: 36, fs: 14, px: 14, iconW: 42, gap: 10 },
};

/**
 * renderBadgeHTML(config) → HTML string
 * config: { service, label, value, style, size, radius, shadow, color }
 */
function renderBadgeHTML(cfg) {
  const svc    = getService(cfg.service);
  const sz     = SIZES[cfg.size] || SIZES.m;
  const r      = getRadius(cfg.style, cfg.radius);
  const mainColor = cfg.color || svc.color;
  const shadow = cfg.shadow ? '0 4px 12px rgba(0,0,0,0.25)' : 'none';

  const iconText  = svc.abbr;
  const hasValue  = cfg.value && cfg.value.trim() !== '';

  let iconStyle, labelStyle, valueStyle, wrapStyle;

  const base = `
    display:inline-flex;align-items:center;
    height:${sz.h}px;border-radius:${r}px;
    overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;
    font-size:${sz.fs}px;font-weight:600;
    box-shadow:${shadow};text-decoration:none;
    white-space:nowrap;
  `;

  switch (cfg.style) {

    case 'flat':
      wrapStyle   = base;
      iconStyle   = `
        display:inline-flex;align-items:center;justify-content:center;
        padding:0 ${sz.px}px;height:100%;
        background:${mainColor};color:${svc.text};
        min-width:${sz.iconW}px;letter-spacing:.03em;
      `;
      labelStyle  = `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;background:${lighten(mainColor, 25)};color:#fff;
        ${mainColor === '#000000' || mainColor === '#000' ? 'background:#586069;' : ''}
      `;
      valueStyle  = hasValue ? `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;background:rgba(255,255,255,0.18);color:#fff;
        border-left:1px solid rgba(255,255,255,0.12);
      ` : '';
      break;

    case 'gradient':
      wrapStyle   = base + `background:linear-gradient(135deg,${mainColor},${lighten(mainColor,40)});`;
      iconStyle   = `
        display:inline-flex;align-items:center;justify-content:center;
        padding:0 ${sz.px}px;height:100%;min-width:${sz.iconW}px;
        background:rgba(0,0,0,0.25);color:#fff;letter-spacing:.03em;
      `;
      labelStyle  = `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;color:#fff;letter-spacing:.01em;
      `;
      valueStyle  = hasValue ? `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;background:rgba(255,255,255,0.2);color:#fff;
        border-left:1px solid rgba(255,255,255,0.15);
      ` : '';
      break;

    case 'outline':
      wrapStyle   = base + `
        background:transparent;
        border:1.5px solid ${mainColor};
        color:${mainColor};
      `;
      iconStyle   = `
        display:inline-flex;align-items:center;justify-content:center;
        padding:0 ${sz.px}px;height:100%;min-width:${sz.iconW}px;
        background:${toRgba(mainColor, 0.08)};letter-spacing:.03em;
      `;
      labelStyle  = `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;border-left:1px solid ${toRgba(mainColor,0.2)};
      `;
      valueStyle  = hasValue ? `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;border-left:1px solid ${toRgba(mainColor,0.2)};
        background:${toRgba(mainColor,0.06)};
      ` : '';
      break;

    case 'glass':
      wrapStyle   = base + `
        background:rgba(255,255,255,0.12);
        backdrop-filter:blur(12px);
        -webkit-backdrop-filter:blur(12px);
        border:1px solid rgba(255,255,255,0.2);
        color:#fff;
      `;
      iconStyle   = `
        display:inline-flex;align-items:center;justify-content:center;
        padding:0 ${sz.px}px;height:100%;min-width:${sz.iconW}px;
        background:${toRgba(mainColor,0.7)};letter-spacing:.03em;
      `;
      labelStyle  = `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;background:rgba(255,255,255,0.1);
        border-left:1px solid rgba(255,255,255,0.15);
      `;
      valueStyle  = hasValue ? `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;background:rgba(255,255,255,0.08);
        border-left:1px solid rgba(255,255,255,0.12);
      ` : '';
      break;

    case 'pill':
      wrapStyle   = base + `border-radius:999px;`;
      iconStyle   = `
        display:inline-flex;align-items:center;justify-content:center;
        padding:0 ${sz.px+2}px;height:100%;min-width:${sz.iconW}px;
        background:${mainColor};color:${svc.text};
        border-radius:999px 0 0 999px;letter-spacing:.03em;
      `;
      labelStyle  = `
        display:inline-flex;align-items:center;padding:0 ${sz.gap+2}px;
        height:100%;background:${lighten(mainColor,20)};color:#fff;
        ${mainColor === '#000000' ? 'background:#444;' : ''}
      `;
      valueStyle  = hasValue ? `
        display:inline-flex;align-items:center;padding:0 ${sz.gap+4}px;
        height:100%;background:rgba(255,255,255,0.2);color:#fff;
        border-radius:0 999px 999px 0;
      ` : `padding-right:${sz.px+2}px;`;
      break;

    case 'square':
      wrapStyle   = base + `border-radius:3px;`;
      iconStyle   = `
        display:inline-flex;align-items:center;justify-content:center;
        padding:0 ${sz.px}px;height:100%;min-width:${sz.iconW}px;
        background:${mainColor};color:${svc.text};
        font-family:'Courier New',monospace;font-size:${sz.fs-1}px;
        letter-spacing:.06em;text-transform:uppercase;
      `;
      labelStyle  = `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;background:${toRgba(mainColor,0.75)};color:#fff;
        font-family:'Courier New',monospace;font-size:${sz.fs-1}px;
        letter-spacing:.04em;
      `;
      valueStyle  = hasValue ? `
        display:inline-flex;align-items:center;padding:0 ${sz.gap}px;
        height:100%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);
        border-left:1px solid rgba(255,255,255,0.08);
        font-family:'Courier New',monospace;font-size:${sz.fs-1}px;
      ` : '';
      break;

    default:
      wrapStyle  = base;
      iconStyle  = `display:inline-flex;align-items:center;padding:0 ${sz.px}px;height:100%;background:${mainColor};color:#fff;`;
      labelStyle = `display:inline-flex;align-items:center;padding:0 ${sz.gap}px;height:100%;background:#555;color:#fff;`;
      valueStyle = '';
  }

  const cleanStyle = s => s.replace(/\s+/g,' ').trim();

  return `<a href="#" style="${cleanStyle(wrapStyle)}">`
    + `<span style="${cleanStyle(iconStyle)}">${iconText}</span>`
    + `<span style="${cleanStyle(labelStyle)}">${escHtml(cfg.label)}</span>`
    + (hasValue ? `<span style="${cleanStyle(valueStyle)}">${escHtml(cfg.value)}</span>` : '')
    + `</a>`;
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}



/* ════════════════════════════════════════════════════════
   4. 썸네일 그리드 렌더
   ════════════════════════════════════════════════════════ */
function renderTemplateThumbs(filterStyle) {
  const grid = document.getElementById('template-grid');
  if (!grid) return;

  const list = filterStyle
    ? BADGE_TEMPLATES.filter(t => t.style === filterStyle)
    : BADGE_TEMPLATES;

  grid.innerHTML = list.map(tpl => {
    const svc = getService(tpl.service);
    const mainColor = svc.color;
    const isActive  = (S.style === tpl.style && S.service === tpl.service) ? 'active' : '';

    return `<div class="tpl-thumb ${isActive}" data-id="${tpl.id}" onclick="onThumbClick('${tpl.id}')">
      <div class="tpl-thumb-inner" style="background:${mainColor}12;border:1px solid ${mainColor}30;">
        <span class="tpl-mini-icon" style="background:${mainColor};color:#fff;">${svc.abbr}</span>
        <span class="tpl-mini-label" style="color:${mainColor};">${tpl.label}</span>
        ${tpl.value ? `<span class="tpl-mini-value">${tpl.value}</span>` : ''}
      </div>
      <div class="tpl-thumb-name">${tpl.style} · ${svc.label}</div>
    </div>`;
  }).join('');
}

function onThumbClick(id) {
  const tpl = getBadgeById(id);
  if (!tpl) return;

  S.service = tpl.service;
  S.label   = tpl.label;
  S.value   = tpl.value || '';
  S.style   = tpl.style;
  S.color   = null; // 서비스 기본색으로 리셋

  /* 스타일 chip 업데이트 */
  document.querySelectorAll('.style-chip').forEach(b => {
    b.classList.toggle('on', b.dataset.style === S.style);
  });

  /* 서비스 chip 업데이트 */
  document.querySelectorAll('.service-chip').forEach(b => {
    b.classList.toggle('on', b.dataset.service === S.service);
  });

  /* 인풋 동기화 */
  const inpLabel = document.getElementById('inp-label');
  const inpValue = document.getElementById('inp-value');
  if (inpLabel) inpLabel.value = S.label;
  if (inpValue) inpValue.value = S.value;

  /* 썸네일 활성화 */
  document.querySelectorAll('.tpl-thumb').forEach(t => t.classList.remove('active'));
  const active = document.querySelector(`.tpl-thumb[data-id="${id}"]`);
  if (active) active.classList.add('active');

  refresh();
}


/* ════════════════════════════════════════════════════════
   5. 빌더 UI 초기화
   ════════════════════════════════════════════════════════ */
function initBuilder() {
  renderStyleChips();
  renderServiceChips();
  renderColorPresets();
  renderTemplateThumbs('flat');
  bindInputs();
  bindSizeButtons();
  bindRadiusButtons();
  bindShadowToggle();
  bindCodeFormatTabs();
  refresh();
}

/* 스타일 chip */
function renderStyleChips() {
  const row = document.getElementById('style-row');
  if (!row) return;
  row.innerHTML = BADGE_STYLES.map(s => `
    <button class="style-chip type-chip${s.id === S.style ? ' on' : ''}"
            data-style="${s.id}"
            title="${s.desc}"
            onclick="selectStyle('${s.id}')">
      ${s.name}
    </button>`
  ).join('');
}

function selectStyle(styleId) {
  S.style = styleId;
  document.querySelectorAll('.style-chip').forEach(b => b.classList.toggle('on', b.dataset.style === styleId));
  renderTemplateThumbs(styleId);
  refresh();
}

/* 서비스 chip */
function renderServiceChips() {
  const grid = document.getElementById('service-grid');
  if (!grid) return;
  grid.innerHTML = Object.entries(SERVICES).map(([key, svc]) => `
    <button class="service-chip${key === S.service ? ' on' : ''}"
            data-service="${key}"
            title="${svc.label}"
            style="--sc:${svc.color}"
            onclick="selectService('${key}')">
      <span class="sc-icon" style="background:${svc.color};color:${svc.text};">${svc.abbr}</span>
      <span class="sc-name">${svc.label}</span>
    </button>`
  ).join('');
}

function selectService(key) {
  S.service = key;
  S.label   = getService(key).label;
  S.color   = null;
  document.querySelectorAll('.service-chip').forEach(b => b.classList.toggle('on', b.dataset.service === key));
  const inp = document.getElementById('inp-label');
  if (inp) inp.value = S.label;
  refresh();
}

/* 컬러 프리셋 */
function renderColorPresets() {
  const row = document.getElementById('color-row');
  if (!row) return;
  row.innerHTML = COLOR_PRESETS.map(p => `
    <button class="sw" title="${p.name}" style="background:${p.color}"
            onclick="selectColor('${p.color}')"></button>`
  ).join('') + `
    <label class="sw sw-custom" title="직접 입력" style="background:linear-gradient(135deg,#ff6b6b,#6bcbff,#a8ff78)">
      <input type="color" id="custom-color-input" style="opacity:0;position:absolute;width:0;height:0"
             oninput="selectColor(this.value)">
      +
    </label>`;
}

function selectColor(hex) {
  S.color = hex;
  document.querySelectorAll('.sw').forEach(b => {
    b.classList.toggle('on', b.style.background === hex);
  });
  refresh();
}

/* 인풋 바인딩 */
function bindInputs() {
  const inpLabel = document.getElementById('inp-label');
  const inpValue = document.getElementById('inp-value');
  if (inpLabel) inpLabel.addEventListener('input', e => { S.label = e.target.value; refresh(); });
  if (inpValue) inpValue.addEventListener('input', e => { S.value = e.target.value; refresh(); });
}

/* 사이즈 */
function bindSizeButtons() {
  document.querySelectorAll('[data-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      S.size = btn.dataset.size;
      document.querySelectorAll('[data-size]').forEach(b => b.classList.toggle('active', b.dataset.size === S.size));
      refresh();
    });
  });
}

/* 반지름 */
function bindRadiusButtons() {
  document.querySelectorAll('[data-radius]').forEach(btn => {
    btn.addEventListener('click', () => {
      S.radius = parseInt(btn.dataset.radius);
      document.querySelectorAll('[data-radius]').forEach(b => b.classList.toggle('active', b.dataset.radius === btn.dataset.radius));
      refresh();
    });
  });
}

/* 그림자 */
function bindShadowToggle() {
  const toggle = document.getElementById('shadow-toggle');
  if (toggle) toggle.addEventListener('change', e => { S.shadow = e.target.checked; refresh(); });
}



/* 코드 포맷 탭 */
function bindCodeFormatTabs() {
  document.querySelectorAll('.ctab').forEach(btn => {
    btn.addEventListener('click', () => {
      S.codeFormat = btn.dataset.format;
      document.querySelectorAll('.ctab').forEach(b => b.classList.toggle('on', b.dataset.format === S.codeFormat));
      refreshCode();
    });
  });
}


/* ════════════════════════════════════════════════════════
   6. 미리보기 + 코드 업데이트
   ════════════════════════════════════════════════════════ */
function currentConfig() {
  return {
    service: S.service,
    label:   S.label   || getService(S.service).label,
    value:   S.value,
    style:   S.style,
    size:    S.size,
    radius:  S.radius,
    shadow:  S.shadow,
    color:   S.color,
  };
}

function refresh() {
  refreshPreview();
  refreshCode();
}

function refreshPreview() {
  const area = document.getElementById('badge-preview');
  if (!area) return;

  /* 미리보기: 실제 배지 HTML을 직접 렌더 (글래스 효과 등 CSS 적용) */
  const cfg  = currentConfig();
  const svc  = getService(cfg.service);
  const sz   = SIZES[cfg.size] || SIZES.m;
  const r    = getRadius(cfg.style, cfg.radius);
  const mainColor = cfg.color || svc.color;
  const shadow = cfg.shadow ? `box-shadow:0 4px 12px rgba(0,0,0,0.25);` : '';

  area.innerHTML = renderBadgeHTMLPreview(cfg);
}

/* 미리보기용 (preview-area에서는 backdrop-filter가 살아있어야 하므로 CSS class 사용) */
function renderBadgeHTMLPreview(cfg) {
  const svc       = getService(cfg.service);
  const sz        = SIZES[cfg.size] || SIZES.m;
  const r         = getRadius(cfg.style, cfg.radius);
  const mainColor = cfg.color || svc.color;
  const hasValue  = cfg.value && cfg.value.trim() !== '';
  const shadow    = cfg.shadow ? 'box-shadow:0 4px 16px rgba(0,0,0,0.25);' : '';

  /* pill일 때 label 오른쪽 패딩 */
  const isPill   = cfg.style === 'pill';
  const isSquare = cfg.style === 'square';
  const isOutline= cfg.style === 'outline';
  const isGlass  = cfg.style === 'glass';

  const sz_px   = SIZES[cfg.size].px;
  const sz_gap  = SIZES[cfg.size].gap;

  /* Wrapper */
  let wrapCSS = `
    display:inline-flex;align-items:center;
    height:${sz.h}px;border-radius:${r}px;
    overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;
    font-size:${sz.fs}px;font-weight:600;
    white-space:nowrap;text-decoration:none;cursor:default;
    ${shadow}
  `;
  if (isGlass) wrapCSS += `
    backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
    border:1px solid rgba(255,255,255,0.2);
    background:rgba(255,255,255,0.12);color:#fff;
  `;
  if (isOutline) wrapCSS += `
    background:transparent;border:1.5px solid ${mainColor};color:${mainColor};
  `;
  if (cfg.style === 'gradient') wrapCSS += `
    background:linear-gradient(135deg,${mainColor},${lighten(mainColor,40)});
  `;
  if (isPill) wrapCSS += `border-radius:999px;`;
  if (isSquare) wrapCSS += `border-radius:3px;`;

  /* Icon section */
  let iconCSS = `
    display:inline-flex;align-items:center;justify-content:center;
    padding:0 ${sz_px}px;height:100%;min-width:${sz.iconW}px;
    letter-spacing:.03em;flex-shrink:0;
  `;
  if (cfg.style === 'flat' || cfg.style === 'pill')
    iconCSS += `background:${mainColor};color:${svc.text};`;
  else if (cfg.style === 'gradient')
    iconCSS += `background:rgba(0,0,0,0.25);color:#fff;`;
  else if (cfg.style === 'outline')
    iconCSS += `background:${toRgba(mainColor,0.08)};`;
  else if (cfg.style === 'glass')
    iconCSS += `background:${toRgba(mainColor,0.7)};`;
  else if (isSquare) {
    iconCSS += `background:${mainColor};color:${svc.text};font-family:'Courier New',monospace;font-size:${sz.fs-1}px;letter-spacing:.06em;text-transform:uppercase;`;
  }
  if (isPill) iconCSS += `border-radius:999px 0 0 999px;`;

  /* Label section */
  let labelCSS = `
    display:inline-flex;align-items:center;
    padding:0 ${sz_gap}px;height:100%;
  `;
  if (cfg.style === 'flat')
    labelCSS += `background:${lighten(mainColor,25)};color:#fff;${mainColor==='#000000'?'background:#586069;':''}`;
  else if (cfg.style === 'gradient')
    labelCSS += `color:#fff;`;
  else if (cfg.style === 'outline')
    labelCSS += `border-left:1px solid ${toRgba(mainColor,0.2)};`;
  else if (cfg.style === 'glass')
    labelCSS += `background:rgba(255,255,255,0.1);border-left:1px solid rgba(255,255,255,0.15);`;
  else if (cfg.style === 'pill')
    labelCSS += `background:${lighten(mainColor,20)};color:#fff;${mainColor==='#000000'?'background:#444;':''}`;
  else if (isSquare)
    labelCSS += `background:${toRgba(mainColor,0.75)};color:#fff;font-family:'Courier New',monospace;font-size:${sz.fs-1}px;letter-spacing:.04em;`;

  /* Value section */
  let valueCSS = `
    display:inline-flex;align-items:center;
    padding:0 ${sz_gap + (isPill ? 4 : 0)}px;height:100%;
    ${isPill ? 'border-radius:0 999px 999px 0;' : ''}
  `;
  if (cfg.style === 'flat')
    valueCSS += `background:rgba(255,255,255,0.18);color:#fff;border-left:1px solid rgba(255,255,255,0.12);`;
  else if (cfg.style === 'gradient')
    valueCSS += `background:rgba(255,255,255,0.2);color:#fff;border-left:1px solid rgba(255,255,255,0.15);`;
  else if (cfg.style === 'outline')
    valueCSS += `border-left:1px solid ${toRgba(mainColor,0.2)};background:${toRgba(mainColor,0.06)};`;
  else if (cfg.style === 'glass')
    valueCSS += `background:rgba(255,255,255,0.08);border-left:1px solid rgba(255,255,255,0.12);`;
  else if (cfg.style === 'pill')
    valueCSS += `background:rgba(255,255,255,0.2);color:#fff;`;
  else if (isSquare)
    valueCSS += `background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.8);border-left:1px solid rgba(255,255,255,0.08);font-family:'Courier New',monospace;font-size:${sz.fs-1}px;`;

  const clean = s => s.replace(/\s+/g,' ').trim();

  return `<span style="${clean(wrapCSS)}">`
    + `<span style="${clean(iconCSS)}">${svc.abbr}</span>`
    + `<span style="${clean(labelCSS)}">${escHtml(cfg.label)}</span>`
    + (hasValue ? `<span style="${clean(valueCSS)}">${escHtml(cfg.value)}</span>` : '')
    + `</span>`;
}

function refreshCode() {
  const pre = document.getElementById('code-pre');
  if (!pre) return;
  const cfg = currentConfig();

  if (S.codeFormat === 'md') {
    const svc   = getService(cfg.service);
    const label = encodeURIComponent(cfg.label);
    const value = cfg.value ? encodeURIComponent(cfg.value) : '';
    const color = (cfg.color || svc.color).replace('#', '');
    pre.textContent = value
      ? '![' + cfg.label + '](https://img.shields.io/badge/' + label + '-' + value + '-' + color + '?style=' + cfg.style + ')'
      : '![' + cfg.label + '](https://img.shields.io/badge/' + label + '-' + color + '?style=' + cfg.style + ')';
  } else {
    pre.textContent = renderBadgeHTML(cfg);
  }
}





/* ════════════════════════════════════════════════════════
   8. 복사
   ════════════════════════════════════════════════════════ */
function doCopy() {
  const pre = document.getElementById('code-pre');
  if (!pre) return;
  const text = pre.textContent;
  const btn  = document.getElementById('copy-btn');

  const succeed = () => {
    if (btn) { btn.textContent = '✓ Copied'; btn.classList.add('copied'); }
    setTimeout(() => { if (btn) { btn.textContent = 'Copy'; btn.classList.remove('copied'); } }, 2000);
    /* 광고 노출 */
    const adB2 = document.getElementById('ad-b2');
    if (adB2) adB2.classList.add('show');
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(succeed).catch(() => fallbackCopy(text, succeed));
  } else {
    fallbackCopy(text, succeed);
  }
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); cb(); } catch(e){}
  document.body.removeChild(ta);
}




/* ════════════════════════════════════════════════════════
   9. URL 파라미터 처리
   ════════════════════════════════════════════════════════ */
function handleUrlParams() {
  const p = new URLSearchParams(window.location.search);
  const tplId  = p.get('template');
  const style  = p.get('style');
  const service= p.get('service');

  if (tplId) {
    const tpl = getBadgeById(tplId);
    if (tpl) {
      renderTemplateThumbs(tpl.style);
      setTimeout(() => onThumbClick(tplId), 50);
      return;
    }
  }
  if (style)   { S.style = style; }
  if (service) { S.service = service; }

  renderTemplateThumbs(S.style);
  setTimeout(() => {
    const first = BADGE_TEMPLATES.find(t => t.style === S.style);
    if (first) onThumbClick(first.id);
    else refresh();
  }, 50);
}


/* ════════════════════════════════════════════════════════
   10. 갤러리 렌더 (gallery.html용)
   ════════════════════════════════════════════════════════ */
function renderGallery(filterStyle) {
  const grid  = document.getElementById('gallery-grid');
  const stats = document.getElementById('gallery-stats');
  if (!grid) return;

  const list = filterStyle && filterStyle !== 'all'
    ? BADGE_TEMPLATES.filter(t => t.style === filterStyle)
    : BADGE_TEMPLATES;

  grid.innerHTML = list.map(tpl => {
    const svc = getService(tpl.service);
    const cfg = {
      service: tpl.service, label: tpl.label, value: tpl.value || '',
      style: tpl.style, size: 'm', radius: 6, shadow: false, color: null,
    };

    return `<div class="gallery-card" onclick="goToBuilder('${tpl.id}')">
      <div class="gallery-preview" style="background:${svc.color}08;">
        <div class="gallery-badge-wrap">
          ${renderBadgeHTMLPreview(cfg)}
        </div>
      </div>
      <div class="gallery-info">
        <div class="gallery-name">${svc.label} · ${tpl.style.charAt(0).toUpperCase()+tpl.style.slice(1)}</div>
        <div class="gallery-meta">
          <span class="gallery-tag">${tpl.style}</span>
          ${tpl.value ? `<span class="gallery-value">${tpl.value}</span>` : ''}
        </div>
        <div class="gallery-action">빌더에서 열기 →</div>
      </div>
    </div>`;
  }).join('');

  if (stats) stats.textContent = `${list.length}개 배지 템플릿`;
}

function goToBuilder(id) {
  window.location.href = `builder.html?template=${id}`;
}

function initGallery() {
  renderGallery('all');

  /* 필터 탭 */
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });
}


/* ════════════════════════════════════════════════════════
   11. DOMContentLoaded
   ════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* builder.html */
  if (document.getElementById('template-grid')) {
    initBuilder();
    handleUrlParams();
  }

  /* gallery.html */
  if (document.getElementById('gallery-grid')) {
    initGallery();
  }

  /* Copy 버튼 */
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) copyBtn.addEventListener('click', doCopy);


});
