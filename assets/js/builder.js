/* ═══════════════════════════════════════════════════════
   GitGloss — builder.js  (slim glue layer)

   이 파일이 담당하는 것:
     - 클립보드 복사 폴백 (구형 브라우저 대응)
     - SVG Export 버튼 피드백

   나머지 모든 기능은 아래 파일에서 처리:
     widget-engine.js  → selectType, selectEmoji, selCtab,
                         doCopy, addTag, addTagTo, removeTag,
                         exportWidget, applyTheme, renderWidgetDOM,
                         bindInputs, updateCodeStrip
     template-loader.js → renderTemplateThumbs, onThumbClick,
                          handleUrlParams
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── 클립보드 복사 폴백 보강 ─────────────────────────────
   widget-engine.js의 doCopy()가 navigator.clipboard API를
   지원하지 않는 환경에서도 동작하도록 패치.              */
document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copy-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const pre = document.getElementById('code-pre');
    if (!pre) return;

    const text = pre.textContent;

    /* navigator.clipboard 지원 여부 확인 */
    if (navigator.clipboard && navigator.clipboard.writeText) {
      /* widget-engine.js의 doCopy()가 이미 처리 — 중복 실행 방지 */
      return;
    }

    /* 폴백: execCommand */
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      copyBtn.textContent = '✓ 복사됨';
      copyBtn.classList.add('copied');
      const adB2 = document.getElementById('ad-b2');
      if (adB2) adB2.classList.add('show');
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.warn('복사 실패:', err);
    }
    document.body.removeChild(ta);
  });
});