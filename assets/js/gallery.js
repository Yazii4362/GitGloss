/* ═══════════════════════════════════════════════════════
   GitGloss — gallery.js
   갤러리 그리드 렌더링 + 필터 (links, banner 포함)
   ═══════════════════════════════════════════════════════ */

'use strict';

let currentFilter = 'all';

/* ── 카테고리 라벨 ───────────────────────────────────── */
const CATEGORY_META = {
  stats:   { label: 'Stats',   cls: 'category-stats'   },
  tech:    { label: 'Tech',    cls: 'category-tech'    },
  profile: { label: 'Profile', cls: 'category-profile' },
  streak:  { label: 'Streak',  cls: 'category-streak'  },
  links:   { label: 'Links',   cls: 'category-links'   },
  banner:  { label: 'Banner',  cls: 'category-banner'  },
};

/* ── 썸네일 배경 ──────────────────────────────────────── */
const PREVIEW_STYLES = {
  'cotton-candy':       'background:linear-gradient(135deg,#FFF0F7,#F4C0D1);',
  'lavender-sky':       'background:linear-gradient(135deg,#C3B9F5,#7EC8E3);',
  'cream-glass':        'background:linear-gradient(135deg,#FFF8EB,#F5DFA0);',
  'aqua-veil':          'background:linear-gradient(135deg,#082832,#0A4050);',
  'dark-candy':         'background:linear-gradient(135deg,#0D0714,#1a0d28);',
  'plum-night':         'background:linear-gradient(135deg,#2D1F42,#1e0f32);',
  'dusk-purple':        'background:linear-gradient(135deg,#FF8C42,#C84B9E,#5C3F9F);',
  'neu-candy':          'background:#F5E6EE;',
  'neu-rose':           'background:#FFF0F5;',
  'candy-burst':        'background:#fff;outline:2px solid #ED93B1;',
  'badge-minimal':      'background:#fff;border-bottom:3px solid #08080F;border-radius:0;',
  'badge-glass':        'background:rgba(240,244,255,.8);',
  'badge-soft':         'background:linear-gradient(145deg,#FFF5F9,#F0EEFF);',
  'badge-pastel':       'background:linear-gradient(135deg,#ffd6e7,#d5ccff,#bde8f8);',
  'badge-dark-pro':     'background:#1a1a2e;',
  'badge-stack-heavy':  'background:#fff;border:2px solid #08080F;',
  'badge-clean':        'background:#fff;',
  'badge-cloud':        'background:linear-gradient(145deg,#e8f4fd,#f0e8ff);',
  'badge-frontend':     'background:linear-gradient(145deg,#f0f4ff,#fff5f9);',
  'badge-backend':      'background:linear-gradient(145deg,#f0fff4,#f5f5f5);',
  'profile-minimal':    'background:#fff;',
  'profile-dark-hero':  'background:linear-gradient(160deg,#0D0714,#1a1035);',
  'profile-soft':       'background:linear-gradient(145deg,#FFF5F9,#F0EEFF);',
  'profile-typography': 'background:#fff;',
  'profile-character':  'background:linear-gradient(145deg,#FFF0F9,#F0F0FF);',
  'profile-obsidian':   'background:#000;',
  'profile-glass-grid': 'background:rgba(240,245,255,.8);',
  'profile-interactive':'background:rgba(255,255,255,.8);',
  'profile-portfolio':  'background:#fff;',
  'profile-simple-dark':'background:#16161e;',
  'dev-card':           'background:linear-gradient(145deg,#08080F,#14102a);border-top:3px solid #ED93B1;',
  'designer':           'background:linear-gradient(135deg,#FF9A9E,#FECFEF,#C2E9FB);',
  'engineer':           'background:#0A0F0F;',
  'creator':            'background:#fff;border:2px solid #FF006E;',
  'minimal-dev':        'background:#fff;border-top:4px solid #08080F;border-radius:0;',
  'tech-light':         'background:#F8FAFF;',
  'tech-dark':          'background:#0F1923;',
  'tech-soft':          'background:linear-gradient(145deg,#EEF2FF,#F0FFF4);',
  'stats-lite':         'background:rgba(255,255,255,.9);',
  'dark-lite':          'background:rgba(14,14,22,.95);',
  /* Links */
  'links-pill-row':      'background:linear-gradient(135deg,#F0F4FF,#FFF0F7);',
  'links-glass-card':    'background:linear-gradient(135deg,#FFF0F7,#F4C0D1);',
  'links-dark-row':      'background:linear-gradient(135deg,#1a1a2e,#0d0d1a);',
  'links-icon-grid':     'background:linear-gradient(135deg,#F0EEFF,#FFF0F9);',
  'links-minimal-list':  'background:#fff;',
  'links-gradient-btns': 'background:linear-gradient(135deg,#fff,#f8f0ff);',
  'links-bordered':      'background:#F8FAFF;',
  'links-social-pack':   'background:linear-gradient(135deg,#fff,#f0f9ff);',
  'links-contact-card':  'background:linear-gradient(135deg,#EAF3DE,#E8F4FD);',
  'links-dev-hub':       'background:#f9f9f9;',
  /* Banner */
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
};

/* ── 카드 렌더 ───────────────────────────────────────── */
function renderCard(tpl) {
  const catMeta = CATEGORY_META[tpl.type] || { label: tpl.type, cls: '' };
  const previewStyle = PREVIEW_STYLES[tpl.theme] || 'background:#f5f5f5;';
  const badgeHtml = tpl.badge
    ? `<span class="template-badge">${tpl.badge}</span>`
    : '';
  const previewContent = buildGalleryPreview(tpl);

  return `
    <div class="template-card" onclick="goToBuilder('${tpl.id}')">
      <div class="template-preview" style="${previewStyle}">
        ${previewContent}
      </div>
      <div class="template-header">
        <div>
          <div class="template-title">${tpl.title}</div>
          <div class="template-meta">
            <span class="template-category ${catMeta.cls}">${catMeta.label}</span>
            ${badgeHtml}
          </div>
        </div>
      </div>
      <div class="template-theme">${tpl.desc}</div>
      <div class="template-action" style="margin-top:16px;">이 위젯 사용하기 →</div>
    </div>
  `;
}

/* ── 카테고리별 미리보기 빌더 ─────────────────────────── */
function buildGalleryPreview(tpl) {
  const isDark = ['aqua-veil','dark-candy','plum-night','dusk-purple','profile-dark-hero',
    'profile-obsidian','profile-simple-dark','dev-card','engineer','tech-dark','dark-lite',
    'links-dark-row','banner-shark','banner-typing'].includes(tpl.theme);
  const textColor = isDark ? 'rgba(255,255,255,' : 'rgba(8,8,15,';

  switch (tpl.type) {
    case 'stats':
      return `
        <div style="width:82%;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <div style="width:32px;height:32px;border-radius:50%;background:${isDark?'rgba(255,255,255,.15)':'rgba(0,0,0,.1)'};display:flex;align-items:center;justify-content:center;font-size:16px;">👨‍💻</div>
            <div>
              <div style="height:8px;border-radius:4px;background:${textColor}.3);width:60px;margin-bottom:4px;"></div>
              <div style="height:6px;border-radius:4px;background:${textColor}.15);width:44px;"></div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
            ${['2.8k','142','98%'].map(v=>`
              <div style="background:${isDark?'rgba(255,255,255,.07)':'rgba(0,0,0,.06)'};border-radius:8px;padding:8px 4px;text-align:center;">
                <div style="font-size:13px;font-weight:700;color:${textColor}.8);">${v}</div>
                <div style="height:5px;border-radius:3px;background:${textColor}.2);width:70%;margin:3px auto 0;"></div>
              </div>`).join('')}
          </div>
          <div style="display:flex;gap:4px;">
            ${['React','TS','Node'].map(t=>`<div style="background:${isDark?'rgba(255,255,255,.1)':'rgba(0,0,0,.07)'};border-radius:8px;padding:3px 8px;font-size:9px;font-weight:600;color:${textColor}.6);">${t}</div>`).join('')}
          </div>
        </div>`;

    case 'tech':
      return `
        <div style="width:85%;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <div style="width:28px;height:28px;border-radius:50%;background:${isDark?'rgba(255,255,255,.15)':'rgba(0,0,0,.1)'};font-size:14px;display:flex;align-items:center;justify-content:center;">🚀</div>
            <div style="height:7px;border-radius:4px;background:${textColor}.25);width:55px;"></div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;">
            ${['React','TypeScript','Node.js','Python','Docker'].map((t,i)=>`
              <div style="
                background:${isDark?`rgba(255,255,255,${0.08+i*0.02})`:`rgba(0,0,0,${0.06+i*0.01})`};
                border-radius:10px;padding:4px 10px;
                font-size:9px;font-weight:700;
                color:${textColor}${0.6+i*0.05});">${t}</div>`).join('')}
          </div>
        </div>`;

    case 'profile':
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:82%">
          <div style="width:44px;height:44px;border-radius:50%;background:${isDark?'rgba(255,255,255,.15)':'rgba(0,0,0,.1)'};font-size:22px;display:flex;align-items:center;justify-content:center;">🎨</div>
          <div style="height:9px;border-radius:5px;background:${textColor}.3);width:70%;"></div>
          <div style="height:6px;border-radius:4px;background:${textColor}.15);width:50%;"></div>
          <div style="height:5px;border-radius:4px;background:${textColor}.12);width:80%;margin-top:4px;"></div>
          <div style="height:5px;border-radius:4px;background:${textColor}.1);width:65%;"></div>
          <div style="display:flex;gap:4px;margin-top:4px;">
            ${['Dev','Code','UX'].map(t=>`<div style="background:${isDark?'rgba(255,255,255,.1)':'rgba(0,0,0,.07)'};border-radius:8px;padding:3px 8px;font-size:9px;font-weight:600;color:${textColor}.5);">${t}</div>`).join('')}
          </div>
        </div>`;

    case 'streak':
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:80%">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;align-self:flex-start;">
            <div style="width:28px;height:28px;border-radius:50%;background:${isDark?'rgba(255,255,255,.15)':'rgba(0,0,0,.1)'};font-size:14px;display:flex;align-items:center;justify-content:center;">🔥</div>
            <div style="height:7px;border-radius:4px;background:${textColor}.25);width:55px;"></div>
          </div>
          <div style="font-size:36px;font-weight:800;color:${textColor}.75);">42</div>
          <div style="height:5px;border-radius:3px;background:${textColor}.2);width:50%;"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;margin-top:4px;">
            ${[['87','Longest'],['1,247','Total']].map(([v,l])=>`
              <div style="background:${isDark?'rgba(255,255,255,.07)':'rgba(0,0,0,.06)'};border-radius:8px;padding:6px;text-align:center;">
                <div style="font-size:12px;font-weight:700;color:${textColor}.7);">${v}</div>
                <div style="font-size:8px;color:${textColor}.35);">${l}</div>
              </div>`).join('')}
          </div>
        </div>`;

    case 'links':
      return `
        <div style="display:flex;flex-direction:column;gap:7px;width:85%;">
          ${[
            { icon:'⚙', label:'GitHub',   color: isDark ? 'rgba(255,255,255,.85)' : '#181717', bg: isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.06)' },
            { icon:'✍', label:'블로그',    color: isDark ? 'rgba(32,201,151,.9)'   : '#20c997', bg: isDark ? 'rgba(32,201,151,.12)' : 'rgba(32,201,151,.12)' },
            { icon:'✉', label:'Email',    color: isDark ? 'rgba(234,67,53,.9)'     : '#EA4335', bg: isDark ? 'rgba(234,67,53,.12)'  : 'rgba(234,67,53,.1)' },
            { icon:'💼', label:'LinkedIn', color: isDark ? 'rgba(10,102,194,.9)'   : '#0A66C2', bg: isDark ? 'rgba(10,102,194,.12)' : 'rgba(10,102,194,.1)' },
          ].slice(0, tpl.theme.includes('icon-grid') ? 6 : 3).map(l=>`
            <div style="display:flex;align-items:center;gap:8px;padding:6px 10px;
              border-radius:10px;background:${l.bg};border:1px solid ${l.color}22;">
              <span style="font-size:13px;">${l.icon}</span>
              <span style="font-size:10px;font-weight:700;color:${l.color};">${l.label}</span>
              <span style="margin-left:auto;font-size:10px;color:${textColor}.3);">→</span>
            </div>`).join('')}
        </div>`;

    case 'banner':
      const bannerColors = {
        'banner-wave-pink':      'linear-gradient(135deg,#ED93B1,#F4C0D1)',
        'banner-wave-blue':      'linear-gradient(135deg,#4285F4,#B5D4F4)',
        'banner-slice-gradient': 'linear-gradient(120deg,#9B8FE8,#4285F4)',
        'banner-egg':            'linear-gradient(135deg,#ED93B1,#9B8FE8)',
        'banner-cylinder':       'linear-gradient(135deg,#7EC8E3,#34A853)',
        'banner-shark':          'linear-gradient(135deg,#333,#1a1a2e)',
        'banner-divider-hits':   'none',
        'banner-typing':         'none',
        'banner-github-trophy':  'linear-gradient(135deg,#FFD700,#FFA500)',
        'banner-snake':          'linear-gradient(135deg,#34A853,#C0DD97)',
      };
      const grad = bannerColors[tpl.theme] || 'linear-gradient(135deg,#ddd,#eee)';

      if (tpl.theme === 'banner-divider-hits') {
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <div style="font-size:11px;font-weight:600;color:#555;">Hits Counter</div>
          <div style="display:flex;border-radius:6px;overflow:hidden;border:1px solid #ddd;">
            <div style="background:#555;color:#fff;padding:5px 10px;font-size:10px;font-weight:600;">hits</div>
            <div style="background:#34A853;color:#fff;padding:5px 10px;font-size:10px;font-weight:700;">1,234</div>
          </div>
        </div>`;
      }
      if (tpl.theme === 'banner-typing') {
        return `<div style="font-family:monospace;font-size:14px;font-weight:600;color:#61DAFB;">
          Hi! I'm a Dev<span style="border-right:2px solid #61DAFB;"> </span>
        </div>`;
      }
      if (tpl.theme === 'banner-github-trophy') {
        return `<div style="display:flex;gap:5px;">
          ${['🏆','⭐','🔥','💎'].map(e=>`
            <div style="background:rgba(255,255,255,.9);border:1px solid rgba(255,200,0,.4);border-radius:8px;padding:6px;font-size:16px;">${e}</div>`).join('')}
        </div>`;
      }
      if (tpl.theme === 'banner-snake') {
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:3px;">${Array(6).fill(0).map((_,i)=>`<div style="width:14px;height:14px;background:${i===0?'#E53935':i<4?'#34A853':'#81C784'};border-radius:3px;opacity:${1-i*.1}"></div>`).join('')}</div>
          <div style="font-size:9px;color:#555;">contribution snake</div>
        </div>`;
      }
      return `<div style="width:85%;height:70px;border-radius:14px;background:${grad};display:flex;align-items:center;justify-content:center;">
        <div style="font-size:14px;font-weight:700;color:#fff;opacity:.9;text-shadow:0 1px 4px rgba(0,0,0,.2);">
          ${tpl.title}
        </div>
      </div>`;

    default: return '';
  }
}

/* ── 빌더로 이동 ─────────────────────────────────────── */
function goToBuilder(id) {
  window.location.href = `builder.html?template=${id}`;
}

/* ── 필터 탭 ─────────────────────────────────────────── */
function applyFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.filter === filter);
  });
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  const list = getByType(filter);
  grid.innerHTML = list.map(renderCard).join('');
  const statsEl = document.getElementById('gallery-stats');
  if (statsEl) statsEl.textContent = `${list.length}개 템플릿 표시 중`;
}

/* ── 초기화 ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => applyFilter(tab.dataset.filter));
  });
  applyFilter('all');
});