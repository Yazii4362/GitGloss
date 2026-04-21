/* ═══════════════════════════════════════════════════════
   GitGloss — template-loader.js  (UI only)
   템플릿 썸네일 렌더링 + URL 파라미터 처리
   데이터 정의는 assets/data/templates.js 에만 있음
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── URL 파라미터 파싱 ───────────────────────────────── */
function getUrlParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* ── 썸네일 그리드 렌더링 ────────────────────────────── */
function renderTemplateThumbs(type) {
  const grid = document.getElementById('template-grid');
  if (!grid) return;

  const list = type ? TEMPLATES.filter(t => t.type === type) : TEMPLATES;

  grid.innerHTML = list.map(tpl => {
    const badgeHtml = tpl.badge
      ? `<span style="position:absolute;top:4px;right:4px;font-size:7px;font-weight:700;
           padding:2px 5px;border-radius:4px;background:rgba(52,168,83,0.9);color:#fff;
           letter-spacing:.04em;">${tpl.badge}</span>`
      : '';

    return `
      <div class="tpl-thumb" data-id="${tpl.id}" data-theme="${tpl.theme}"
           onclick="onThumbClick('${tpl.id}')" title="${tpl.title}">
        <div class="tpl-thumb-inner" style="color:${tpl.accentColor}">
          ${buildThumbPreview(tpl)}
        </div>
        ${badgeHtml}
        <div class="tpl-thumb-name">${tpl.title}</div>
      </div>
    `;
  }).join('');
}

/* ── 썸네일 내부 미니 프리뷰 ─────────────────────────── */
function buildThumbPreview(tpl) {
  switch (tpl.type) {
    case 'stats':
      return `
        <div style="display:flex;flex-direction:column;gap:3px;width:85%;opacity:.85">
          <div style="height:7px;border-radius:4px;background:currentColor;opacity:.3;width:55%"></div>
          <div style="display:flex;gap:3px">
            <div style="flex:1;height:18px;border-radius:4px;background:currentColor;opacity:.18"></div>
            <div style="flex:1;height:18px;border-radius:4px;background:currentColor;opacity:.18"></div>
            <div style="flex:1;height:18px;border-radius:4px;background:currentColor;opacity:.18"></div>
          </div>
          <div style="display:flex;gap:3px">
            <div style="height:7px;border-radius:10px;background:currentColor;opacity:.28;width:28%"></div>
            <div style="height:7px;border-radius:10px;background:currentColor;opacity:.28;width:22%"></div>
          </div>
        </div>`;

    case 'tech':
      return `
        <div style="display:flex;flex-wrap:wrap;gap:3px;width:90%;justify-content:center;opacity:.85">
          ${[36,28,32,24].map((w,i) =>
            `<div style="height:9px;border-radius:8px;background:currentColor;opacity:${0.32-i*0.04};width:${w}%"></div>`
          ).join('')}
        </div>`;

    case 'profile':
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;opacity:.85">
          <div style="width:22px;height:22px;border-radius:50%;background:currentColor;opacity:.4"></div>
          <div style="height:6px;border-radius:4px;background:currentColor;opacity:.28;width:55%"></div>
          <div style="height:5px;border-radius:4px;background:currentColor;opacity:.18;width:40%"></div>
        </div>`;

    case 'links':
      return `
        <div style="display:flex;flex-direction:column;gap:3px;width:85%;opacity:.85">
          ${[70,55,65].map(w =>
            `<div style="height:8px;border-radius:6px;background:currentColor;opacity:.22;width:${w}%"></div>`
          ).join('')}
        </div>`;

    case 'banner':
      return `
        <div style="width:90%;opacity:.85">
          <div style="height:28px;border-radius:6px;background:currentColor;opacity:.2;width:100%;margin-bottom:4px"></div>
          <div style="height:7px;border-radius:4px;background:currentColor;opacity:.15;width:60%;margin:0 auto"></div>
        </div>`;

    case 'streak':
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;opacity:.85">
          <div style="font-size:18px;font-weight:800;opacity:.65;color:currentColor">42</div>
          <div style="height:5px;border-radius:4px;background:currentColor;opacity:.22;width:50%"></div>
        </div>`;

    default:
      return '';
  }
}

/* ── 썸네일 클릭 ─────────────────────────────────────── */
function onThumbClick(id) {
  document.querySelectorAll('.tpl-thumb').forEach(t => t.classList.remove('active'));
  const thumb = document.querySelector(`.tpl-thumb[data-id="${id}"]`);
  if (thumb) thumb.classList.add('active');

  const tpl = getById(id);
  if (tpl) {
    /* 타입 chip 업데이트 */
    document.querySelectorAll('.type-chip').forEach(b => {
      b.classList.toggle('on', b.textContent.trim().toLowerCase() === tpl.type);
    });
    /* 필드 패널 전환 */
    ['stats','tech','profile','streak','links','banner'].forEach(t => {
      const el = document.getElementById(`fields-${t}`);
      if (el) el.style.display = t === tpl.type ? '' : 'none';
    });
  }

  /* 위젯 엔진에 테마 적용 */
  if (typeof applyTheme === 'function') applyTheme(id);
}

/* ── URL 파라미터로 자동 로드 ────────────────────────── */
function handleUrlParams() {
  const templateId = getUrlParam('template');
  const type       = getUrlParam('type');
  const theme      = getUrlParam('theme');

  if (templateId) {
    const tpl = getById(templateId);
    if (tpl) {
      renderTemplateThumbs(tpl.type);
      setTimeout(() => onThumbClick(templateId), 50);
      return;
    }
  }

  if (type) {
    renderTemplateThumbs(type);
    const match = theme
      ? TEMPLATES.find(t => t.type === type && t.theme === theme)
      : TEMPLATES.find(t => t.type === type);
    if (match) {
      setTimeout(() => onThumbClick(match.id), 50);
    }
    return;
  }

  /* 기본: stats 타입 */
  renderTemplateThumbs('stats');
  setTimeout(() => onThumbClick('stats-01'), 50);
}

/* ── 타입 버튼 ↔ 썸네일 연동 ────────────────────────── */
function bindTypeToThumbs() {
  document.querySelectorAll('.type-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.textContent.trim().toLowerCase();
      renderTemplateThumbs(type);
    });
  });
}

/* ── 초기화 ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  bindTypeToThumbs();
  handleUrlParams();
});
