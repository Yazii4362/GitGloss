/* ═══════════════════════════════════════════════════════
   GitGloss — template-loader.js
   빌더 좌측 패널 썸네일 렌더링 + URL 파라미터 처리
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
      ? `<span style="
          position:absolute;top:4px;right:4px;
          font-size:7px;font-weight:700;
          padding:2px 5px;border-radius:4px;
          background:rgba(52,168,83,0.9);color:#fff;
          letter-spacing:.04em;">${tpl.badge}</span>`
      : '';

    /* 썸네일 내부 미리보기 */
    const preview = buildThumbPreview(tpl);

    return `
      <div class="tpl-thumb" data-id="${tpl.id}" data-theme="${tpl.theme}"
           onclick="onThumbClick('${tpl.id}')" title="${tpl.title}">
        <div class="tpl-thumb-inner" data-theme="${tpl.theme}">
          ${preview}
        </div>
        ${badgeHtml}
        <div class="tpl-thumb-name">${tpl.title}</div>
      </div>
    `;
  }).join('');
}

/* 썸네일 안 미니 프리뷰 HTML */
function buildThumbPreview(tpl) {
  switch (tpl.type) {
    case 'stats':
      return `
        <div style="display:flex;flex-direction:column;gap:3px;width:85%;opacity:.8">
          <div style="height:8px;border-radius:4px;background:currentColor;opacity:.25;width:60%"></div>
          <div style="display:flex;gap:3px">
            <div style="flex:1;height:16px;border-radius:4px;background:currentColor;opacity:.18"></div>
            <div style="flex:1;height:16px;border-radius:4px;background:currentColor;opacity:.18"></div>
            <div style="flex:1;height:16px;border-radius:4px;background:currentColor;opacity:.18"></div>
          </div>
          <div style="display:flex;gap:3px">
            <div style="height:7px;border-radius:10px;background:currentColor;opacity:.25;padding:0 8px;width:28%"></div>
            <div style="height:7px;border-radius:10px;background:currentColor;opacity:.25;padding:0 8px;width:22%"></div>
          </div>
        </div>`;
    case 'tech':
      return `
        <div style="display:flex;flex-wrap:wrap;gap:3px;width:90%;justify-content:center;opacity:.8">
          ${['','','',''].map((_,i)=>`<div style="height:9px;border-radius:8px;background:currentColor;opacity:${0.3-i*0.04};width:${[36,28,32,24][i]}%"></div>`).join('')}
        </div>`;
    case 'profile':
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;opacity:.8">
          <div style="width:24px;height:24px;border-radius:50%;background:currentColor;opacity:.35"></div>
          <div style="height:6px;border-radius:4px;background:currentColor;opacity:.25;width:55%"></div>
          <div style="height:5px;border-radius:4px;background:currentColor;opacity:.15;width:40%"></div>
        </div>`;
    case 'streak':
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;opacity:.8">
          <div style="font-size:18px;font-weight:800;opacity:.6;color:currentColor">42</div>
          <div style="height:5px;border-radius:4px;background:currentColor;opacity:.2;width:50%"></div>
        </div>`;
    default:
      return '';
  }
}

/* ── 썸네일 클릭 ─────────────────────────────────────── */
function onThumbClick(id) {
  /* active 표시 */
  document.querySelectorAll('.tpl-thumb').forEach(t => t.classList.remove('active'));
  const thumb = document.querySelector(`.tpl-thumb[data-id="${id}"]`);
  if (thumb) thumb.classList.add('active');

  /* 타입 chip 업데이트 */
  const tpl = getById(id);
  if (tpl) {
    document.querySelectorAll('.type-chip').forEach(b => {
      b.classList.toggle('on', b.textContent.trim().toLowerCase() === tpl.type);
    });

    /* 필드 패널 전환 */
    ['stats','tech','profile','streak'].forEach(t => {
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
  const presetId   = getUrlParam('preset');
  const type       = getUrlParam('type');
  const theme      = getUrlParam('theme');

  if (templateId) {
    const tpl = getById(templateId);
    if (tpl) {
      /* 현재 타입으로 썸네일 필터 후 적용 */
      renderTemplateThumbs(tpl.type);
      setTimeout(() => onThumbClick(templateId), 50);
      return;
    }
  }

  if (presetId) {
    /* preset ID로 검색 */
    const tpl = TEMPLATES.find(t => t.preset === presetId);
    if (tpl) {
      renderTemplateThumbs(tpl.type);
      setTimeout(() => onThumbClick(tpl.id), 50);
      return;
    }
  }

  if (type) {
    renderTemplateThumbs(type);
    const first = TEMPLATES.find(t => t.type === type);
    if (first && theme) {
      const match = TEMPLATES.find(t => t.type === type && t.theme === theme);
      if (match) {
        setTimeout(() => onThumbClick(match.id), 50);
        return;
      }
    }
    if (first) {
      setTimeout(() => onThumbClick(first.id), 50);
    }
    return;
  }

  /* 기본: stats 타입 썸네일 표시 */
  renderTemplateThumbs('stats');
}

/* ── 타입 버튼과 썸네일 연동 ─────────────────────────── */
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
