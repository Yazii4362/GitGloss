/* ═══════════════════════════════════════════════════════
   GitGloss — builder.js  (얇은 글루 레이어)
   
   역할: 구형 브라우저 클립보드 폴백만 담당
   나머지 모든 기능은 badge-engine.js에서 처리함
   
   EXTERNAL DEPS:
     doCopy() → badge-engine.js
   ═══════════════════════════════════════════════════════ */
'use strict';

/* navigator.clipboard 미지원 환경 추가 보강
   badge-engine.js의 doCopy()가 이미 fallbackCopy()를 내장하므로
   여기서는 이벤트 중복을 방지하고 SVG 내보내기 피드백만 추가 */
document.addEventListener('DOMContentLoaded', () => {
  const svgBtn = document.getElementById('export-svg-btn');
  if (!svgBtn) return;

  svgBtn.addEventListener('click', () => {
    const original = svgBtn.textContent;
    svgBtn.textContent = '✓ 다운로드됨';
    svgBtn.classList.add('copied');
    setTimeout(() => {
      svgBtn.textContent = original;
      svgBtn.classList.remove('copied');
    }, 2000);
  });
});