/* ═══════════════════════════════════════════════════════
   ReadMe.kit — gallery.js  v2.0
   갤러리 그리드 렌더링 + 필터 (identity 카테고리 포함)
   ═══════════════════════════════════════════════════════ */

'use strict';

let currentFilter = 'all';

/* ── 카테고리 라벨 ───────────────────────────────────── */
const CATEGORY_META = {
  stats:    { label: 'Stats',      cls: 'category-stats'    },
  tech:     { label: 'Tech',       cls: 'category-tech'     },
  profile:  { label: 'Profile',    cls: 'category-profile'  },
  creative: { label: 'Creative',   cls: 'category-creative' },
  links:    { label: 'Links',      cls: 'category-links'    },
  banner:   { label: 'Banner',     cls: 'category-banner'   },
  vibe:     { label: 'Vibe ✨',    cls: 'category-vibe'     },
  identity: { label: 'Identity 🪪', cls: 'category-identity' },
};

function getFluentUrl(name) {
  const folder = name.replace(/_/g, ' ');
  const file = name.toLowerCase().replace(/ /g, '_').replace(/%20/g, '_');
  return `https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/${folder}/3D/${file}_3d.png`;
}

/* ── 썸네일 배경 ──────────────────────────────────────── */
const PREVIEW_STYLES = {
  /* 기존 테마 */
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
  'links-pill-row':     'background:linear-gradient(135deg,#F0F4FF,#FFF0F7);',
  'links-glass-card':   'background:linear-gradient(135deg,#FFF0F7,#F4C0D1);',
  'links-dark-row':     'background:linear-gradient(135deg,#1a1a2e,#0d0d1a);',
  'links-icon-grid':    'background:linear-gradient(135deg,#F0EEFF,#FFF0F9);',
  'links-minimal-list': 'background:#fff;',
  'links-gradient-btns':'background:linear-gradient(135deg,#fff,#f8f0ff);',
  'links-bordered':     'background:#F8FAFF;',
  'links-social-pack':  'background:linear-gradient(135deg,#fff,#f0f9ff);',
  'links-contact-card': 'background:linear-gradient(135deg,#EAF3DE,#E8F4FD);',
  'links-dev-hub':      'background:#f9f9f9;',
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
  'blog-card':             'background:linear-gradient(135deg,#e8fdf5,#20c99711);',
  'progress-100':          'background:linear-gradient(135deg,#fff0f7,#ff006e08);',
  'radar-chart':           'background:linear-gradient(135deg,#f0f4ff,#4285f408);',
  'spotify-glass':         'background:linear-gradient(135deg,#edfff4,#1db95408);',
  'coffee-meter':          'background:linear-gradient(135deg,#fdf9f6,#6f4e3708);',
  'mbti-status':           'background:linear-gradient(135deg,#f8f0ff,#9b8fe808);',
  'premium-hit':           'background:linear-gradient(135deg,#f0f4ff,#4285f408);',
  /* Stats — 누락 보강 */
  'aurora':                'background:linear-gradient(135deg,#00C9A7,#4285F4,#9B8FE8);',
  'glass-neon':            'background:linear-gradient(135deg,#0D0714,#1a1035);',
  'mono-border':           'background:#fff;outline:2px solid #08080F;outline-offset:-2px;',

  /* ── Identity 신규 테마 ─────────────────────────────── */
  /* MBTI */
  'identity-mbti-nf':      'background:linear-gradient(135deg,#edfff9,#a8f0dc);',
  'identity-mbti-nt':      'background:linear-gradient(135deg,#f0ecff,#c4b8ff);',
  'identity-mbti-sj':      'background:linear-gradient(135deg,#e8f0fe,#bbd3ff);',
  'identity-mbti-sp':      'background:linear-gradient(135deg,#fff5e6,#ffd0a0);',
  'identity-mbti-pack':    'background:linear-gradient(135deg,#f8f4ff,#f0e8ff);border-top:3px solid #9B8FE8;',
  /* Status */
  'identity-status-green':  'background:linear-gradient(135deg,#f0fff4,#b2f5d3);',
  'identity-status-purple': 'background:linear-gradient(135deg,#f4f0ff,#c4b8ff);',
  'identity-status-brown':  'background:linear-gradient(135deg,#fff9f5,#e8c9a8);',
  'identity-status-dark':   'background:linear-gradient(135deg,#1a1030,#0a0818);',
  'identity-status-red':    'background:linear-gradient(135deg,#fff5f5,#ffd0cc);',
  'identity-status-orange': 'background:linear-gradient(135deg,#fff8f0,#ffd8a8);',
  'identity-status-blue':   'background:linear-gradient(135deg,#f0f4ff,#bed3ff);',
  'identity-status-gray':   'background:linear-gradient(135deg,#f8f9fa,#e2e8f0);',
  /* Role */
  'identity-role-blue':    'background:linear-gradient(135deg,#eef3ff,#bdd1ff);',
  'identity-role-green':   'background:linear-gradient(135deg,#effff4,#b2f5cc);',
  'identity-role-purple':  'background:linear-gradient(135deg,#f2efff,#c8bcff);',
  'identity-role-pink':    'background:linear-gradient(135deg,#fff0f7,#ffc8e0);',
  'identity-role-orange':  'background:linear-gradient(135deg,#fff8f0,#ffd0a0);',
  'identity-role-red':     'background:linear-gradient(135deg,#fff4f4,#ffc0bb);',
  'identity-role-teal':    'background:linear-gradient(135deg,#edfafc,#a8e8f0);',
  'identity-role-dark':    'background:linear-gradient(135deg,#1e1630,#12102a);',
  /* Vibe */
  'identity-vibe-dark':    'background:linear-gradient(135deg,#0d0d1a,#1a1a2e);',
  'identity-vibe-green':   'background:linear-gradient(135deg,#edfff9,#a8f0dc);',
  'identity-vibe-orange':  'background:linear-gradient(135deg,#fff8f0,#ffd8a8);',
  'identity-vibe-brown':   'background:linear-gradient(135deg,#fdf9f5,#e8c9a8);',
  'identity-vibe-dark2':   'background:#000;',
  'identity-vibe-slate':   'background:linear-gradient(135deg,#f1f5f9,#cbd5e1);',
  'identity-vibe-gray':    'background:linear-gradient(135deg,#fff4f0,#ffd0c0);',
};

/* ── MBTI 타입별 색상 정의 ────────────────────────────── */
const MBTI_COLORS = {
  ENFP: '#00C9A7', ENFJ: '#00B4CC', INFP: '#3CB371', INFJ: '#2E8B57',
  ENTP: '#7B68EE', ENTJ: '#6A5ACD', INTP: '#9370DB', INTJ: '#483D8B',
  ESFP: '#FF8C00', ESTP: '#FF6347', ISFP: '#DAA520', ISTP: '#CD853F',
  ESFJ: '#4285F4', ESTJ: '#1967D2', ISFJ: '#7EC8E3', ISTJ: '#5F9EA0',
};

/* ── 배지 행 공통 렌더 유틸 ───────────────────────────── */
function shieldsBadgePreview(labelBg, label, valueBg, value, textColor = '#fff') {
  return `
    <div style="display:flex;flex-direction:column;gap:10px;align-items:center;">
      <div style="display:flex;border-radius:6px;overflow:hidden;
                  box-shadow:0 3px 10px rgba(0,0,0,0.18);font-family:monospace;">
        <div style="background:#555;color:#fff;padding:7px 12px;
                    font-size:11px;font-weight:700;white-space:nowrap;">${label}</div>
        <div style="background:${valueBg};color:${textColor};padding:7px 12px;
                    font-size:11px;font-weight:700;white-space:nowrap;">${value}</div>
      </div>
      <div style="font-size:8px;color:rgba(0,0,0,0.3);font-weight:600;
                  letter-spacing:0.5px;text-transform:uppercase;">shields.io compatible</div>
    </div>`;
}

/* ── Identity 카테고리 프리뷰 ────────────────────────── */
function renderIdentityPreview(tpl) {
  const sub = tpl.subtype || '';

  /* MBTI */
  if (sub === 'mbti') {
    if (tpl.mbtiType) {
      const color = MBTI_COLORS[tpl.mbtiType] || '#9B8FE8';
      return shieldsBadgePreview('#555', 'MBTI', color, tpl.mbtiType);
    }
    /* 팩 미리보기 — 여러 타입 나열 */
    const sample = ['ENFP','INTJ','INFJ','ENTP','ISFP','ESTJ'];
    const pills = sample.map(t =>
      `<div style="display:flex;border-radius:4px;overflow:hidden;
                   font-size:8px;font-family:monospace;
                   box-shadow:0 1px 4px rgba(0,0,0,0.12);">
         <span style="background:#555;color:#fff;padding:3px 6px;">MBTI</span>
         <span style="background:${MBTI_COLORS[t]};color:#fff;padding:3px 6px;">${t}</span>
       </div>`
    ).join('');
    return `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
        <div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center;max-width:200px;">
          ${pills}
        </div>
        <div style="font-size:8px;color:rgba(0,0,0,0.35);font-weight:600;
                    letter-spacing:0.5px;text-transform:uppercase;">16종 전체 선택 가능</div>
      </div>`;
  }

  /* Status */
  if (sub === 'status') {
    const STATUS_MAP = {
      'identity-status-green':  { bg: '#34A853', label: `${tpl.statusEmoji || '🟢'} Status`, msg: tpl.statusMsg || 'Coding' },
      'identity-status-purple': { bg: '#7B68EE', label: `${tpl.statusEmoji || '🎧'} Status`, msg: tpl.statusMsg || 'Deep Focus' },
      'identity-status-brown':  { bg: '#8B5A2B', label: `${tpl.statusEmoji || '☕'} Status`, msg: tpl.statusMsg || 'Coffee Break' },
      'identity-status-dark':   { bg: '#2D1F42', label: `${tpl.statusEmoji || '🌙'} Status`, msg: tpl.statusMsg || 'Night Shift' },
      'identity-status-red':    { bg: '#EA4335', label: `${tpl.statusEmoji || '🐛'} Status`, msg: tpl.statusMsg || 'Debugging' },
      'identity-status-orange': { bg: '#FF8C00', label: `${tpl.statusEmoji || '🚀'} Status`, msg: tpl.statusMsg || 'Shipping' },
      'identity-status-blue':   { bg: '#4285F4', label: `${tpl.statusEmoji || '📝'} Status`, msg: tpl.statusMsg || 'Code Review' },
      'identity-status-gray':   { bg: '#64748B', label: `${tpl.statusEmoji || '💤'} Status`, msg: tpl.statusMsg || 'AFK' },
    };
    const d = STATUS_MAP[tpl.theme] || STATUS_MAP['identity-status-green'];
    const isDark = ['identity-status-dark', 'identity-status-brown'].includes(tpl.theme);
    return shieldsBadgePreview('#555', d.label, d.bg, d.msg, '#fff');
  }

  /* Role */
  if (sub === 'role') {
    const ROLE_MAP = {
      'identity-role-blue':   { bg: '#4285F4', label: `${tpl.roleIcon || '🌐'} Role`, msg: tpl.roleMsg || 'Frontend Dev' },
      'identity-role-green':  { bg: '#34A853', label: `${tpl.roleIcon || '⚙️'} Role`, msg: tpl.roleMsg || 'Backend Dev' },
      'identity-role-purple': { bg: '#7B68EE', label: `${tpl.roleIcon || '💫'} Role`, msg: tpl.roleMsg || 'Full Stack Dev' },
      'identity-role-pink':   { bg: '#ED93B1', label: `${tpl.roleIcon || '🎨'} Role`, msg: tpl.roleMsg || 'UX Designer' },
      'identity-role-orange': { bg: '#FF8C00', label: `${tpl.roleIcon || '🔧'} Role`, msg: tpl.roleMsg || 'DevOps Eng.' },
      'identity-role-red':    { bg: '#EA4335', label: `${tpl.roleIcon || '🤖'} Role`, msg: tpl.roleMsg || 'ML Engineer' },
      'identity-role-teal':   { bg: '#00B4CC', label: `${tpl.roleIcon || '📱'} Role`, msg: tpl.roleMsg || 'Mobile Dev' },
      'identity-role-dark':   { bg: '#2D1F42', label: `${tpl.roleIcon || '🛡️'} Role`, msg: tpl.roleMsg || 'Security Eng.' },
    };
    const d = ROLE_MAP[tpl.theme] || ROLE_MAP['identity-role-blue'];
    return shieldsBadgePreview('#555', d.label, d.bg, d.msg, '#fff');
  }

  /* Vibe */
  if (sub === 'vibe') {
    const VIBE_MAP = {
      'identity-vibe-dark':   { bg: '#1a1a2e', label: `${tpl.vibeEmoji || '🦉'} Vibe`, msg: tpl.vibeMsg || 'Night Owl' },
      'identity-vibe-green':  { bg: '#00C9A7', label: `${tpl.vibeEmoji || '🏡'} Vibe`, msg: tpl.vibeMsg || 'Remote Worker' },
      'identity-vibe-orange': { bg: '#FF8C00', label: `${tpl.vibeEmoji || '❤️'} Vibe`, msg: tpl.vibeMsg || 'Open Source' },
      'identity-vibe-brown':  { bg: '#8B5A2B', label: `${tpl.vibeEmoji || '☕'} Vibe`, msg: tpl.vibeMsg || 'Coffee Addict' },
      'identity-vibe-dark2':  { bg: '#111',    label: `${tpl.vibeEmoji || '🌑'} Vibe`, msg: tpl.vibeMsg || 'Dark Mode Only' },
      'identity-vibe-slate':  { bg: '#64748B', label: `${tpl.vibeEmoji || '⌨️'} Vibe`, msg: tpl.vibeMsg || 'Keyboard Warrior' },
      'identity-vibe-gray':   { bg: '#F05032', label: `${tpl.vibeEmoji || '🌿'} Vibe`, msg: tpl.vibeMsg || 'Git Addict' },
    };
    const d = VIBE_MAP[tpl.theme] || VIBE_MAP['identity-vibe-dark'];
    return shieldsBadgePreview('#555', d.label, d.bg, d.msg, '#fff');
  }

  return `<div style="font-size:28px;">🪪</div>`;
}

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

/* ── Links 10종 미리보기 ────────────────────────────── */
function renderLinksPreview(tpl, isDark) {
  const items = [
    { label: 'GitHub',   color: '#181717', bg: '#f0f0f0' },
    { label: 'Blog',     color: '#20c997', bg: '#e8fdf5' },
    { label: 'Email',    color: '#EA4335', bg: '#fde8e6' },
  ];

  switch (tpl.theme) {
    case 'links-pill-row':
      return `<div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center;">${items.map(i =>
        `<span style="background:${i.color};color:#fff;padding:4px 12px;border-radius:99px;font-size:9px;font-weight:700;">${i.label}</span>`
      ).join('')}</div>`;
    case 'links-glass-card':
      return `<div style="background:rgba(255,255,255,0.5);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.7);padding:8px;border-radius:12px;display:grid;grid-template-columns:1fr 1fr;gap:5px;width:75%;">${items.concat([{label:'In',color:'#0077B5',bg:'#e8f4ff'}]).map(i =>
        `<span style="background:rgba(255,255,255,0.6);color:${i.color};padding:4px 8px;border-radius:6px;font-size:9px;font-weight:700;text-align:center;">${i.label}</span>`
      ).join('')}</div>`;
    case 'links-dark-row':
      return `<div style="display:flex;flex-direction:column;gap:4px;width:80%;">${items.map(i =>
        `<div style="background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);padding:5px 10px;border-radius:6px;font-size:9px;font-weight:700;display:flex;align-items:center;gap:6px;"><span style="width:6px;height:6px;background:${i.color};border-radius:50%;"></span>${i.label}</div>`
      ).join('')}</div>`;
    case 'links-icon-grid':
      return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:75%;">${['GH','Bl','✉','In','Tw','YT'].map((l,idx) => {
        const c = ['#181717','#20c997','#EA4335','#0077B5','#1DA1F2','#FF0000'][idx];
        return `<div style="background:${c}22;color:${c};border:1px solid ${c}44;border-radius:8px;padding:6px;font-size:11px;font-weight:800;text-align:center;">${l}</div>`;
      }).join('')}</div>`;
    case 'links-minimal-list':
      return `<div style="display:flex;flex-direction:column;gap:3px;width:75%;font-family:monospace;">${items.map((i,idx) =>
        `<div style="border-bottom:1px solid rgba(0,0,0,0.08);padding:3px 0;font-size:10px;color:#08080F;font-weight:600;">→ ${i.label}</div>`
      ).join('')}</div>`;
    case 'links-gradient-btns':
      return `<div style="display:flex;flex-direction:column;gap:5px;width:75%;">${items.map((i,idx) => {
        const grads = ['linear-gradient(90deg,#181717,#333)','linear-gradient(90deg,#20c997,#0d9970)','linear-gradient(90deg,#EA4335,#ff7a6f)'];
        return `<div style="background:${grads[idx]};color:#fff;padding:5px 12px;border-radius:8px;font-size:9px;font-weight:700;text-align:center;">${i.label}</div>`;
      }).join('')}</div>`;
    case 'links-bordered':
      return `<div style="display:flex;flex-direction:column;gap:4px;width:75%;">${items.map(i =>
        `<div style="background:transparent;color:${i.color};border:2px solid ${i.color};padding:4px 10px;border-radius:8px;font-size:9px;font-weight:700;text-align:center;">${i.label}</div>`
      ).join('')}</div>`;
    case 'links-social-pack':
      return `<div style="display:flex;gap:5px;justify-content:center;">${[
        { l:'GH', c:'#181717' },{ l:'Tw', c:'#1DA1F2' },{ l:'IG', c:'#E4405F' },{ l:'YT', c:'#FF0000' }
      ].map(s => `<div style="width:26px;height:26px;border-radius:50%;background:${s.c};color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;">${s.l}</div>`).join('')}</div>`;
    case 'links-contact-card':
      return `<div style="background:rgba(255,255,255,0.7);border-radius:10px;padding:8px 10px;width:75%;display:flex;flex-direction:column;gap:4px;">
        <div style="font-size:9px;font-weight:700;color:#34A853;">📧 Contact Me</div>
        <div style="height:5px;width:60%;background:rgba(0,0,0,0.08);border-radius:2px;"></div>
        <div style="height:5px;width:80%;background:rgba(0,0,0,0.08);border-radius:2px;"></div>
      </div>`;
    case 'links-dev-hub':
      return `<div style="background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:8px;width:75%;display:flex;flex-direction:column;gap:3px;">
        ${['📦 npm','🌐 portfolio','✍️ blog'].map(l =>
          `<div style="font-size:9px;color:#181717;font-weight:600;padding:2px 4px;border-bottom:1px solid rgba(0,0,0,0.04);">${l}</div>`
        ).join('')}
      </div>`;
  }
  // 폴백 (기본 generic)
  return `<div style="display:flex;flex-direction:column;gap:5px;width:80%;">${items.map((i,idx) =>
    `<div style="background:${isDark?'rgba(255,255,255,.1)':i.bg};color:${isDark?'rgba(255,255,255,.8)':i.color};padding:5px 10px;border-radius:8px;font-size:9px;font-weight:700;">${i.label}</div>`
  ).join('')}</div>`;
}

/* ── Vibe 15종 미리보기 (라이프/커리어/협업/유머/상태 × glass/dark/neu) ─── */
function renderVibePreview(tpl) {
  const stack = (tpl.config && tpl.config.stack) || ['Vibe 1','Vibe 2','Vibe 3'];
  const isDark = tpl.theme === 'badge-dark-pro';
  const isPastel = tpl.theme === 'badge-pastel';
  const isSoft = tpl.theme === 'badge-soft';
  // 카테고리별 액센트
  const categoryColor = (() => {
    if (tpl.id.includes('lifestyle')) return '#9B8FE8';
    if (tpl.id.includes('career'))    return '#4285F4';
    if (tpl.id.includes('collab'))    return '#34A853';
    if (tpl.id.includes('humor'))     return '#EA4335';
    if (tpl.id.includes('status'))    return '#FF8C00';
    return '#9B8FE8';
  })();
  const bg = isDark ? 'rgba(255,255,255,0.08)'
            : isPastel ? `${categoryColor}26`
            : `${categoryColor}1f`;
  const fg = isDark ? '#a0d0ff' : categoryColor;
  const border = isDark ? 'rgba(255,255,255,0.15)' : `${categoryColor}55`;
  return `<div style="display:flex;flex-direction:column;gap:5px;width:85%;align-items:center;">
    ${stack.map(label =>
      `<span style="background:${bg};color:${fg};border:1px solid ${border};padding:3px 10px;border-radius:99px;font-size:9px;font-weight:700;letter-spacing:.2px;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis;">${label}</span>`
    ).join('')}
  </div>`;
}

/* ── 카테고리별 미리보기 빌더 ─────────────────────────── */
function buildGalleryPreview(tpl) {
  const isDark = ['aqua-veil','dark-candy','plum-night','dusk-purple','profile-dark-hero',
    'profile-obsidian','profile-simple-dark','dev-card','engineer','tech-dark','dark-lite',
    'links-dark-row','banner-shark','banner-typing','badge-dark-pro',
    'identity-status-dark','identity-vibe-dark','identity-vibe-dark2','identity-role-dark',
  ].includes(tpl.theme);
  const textColor = isDark ? 'rgba(255,255,255,' : 'rgba(8,8,15,';

  /* Identity 카테고리 → 전용 렌더러 */
  if (tpl.type === 'identity') {
    return renderIdentityPreview(tpl);
  }

  /* Vibe 카테고리 → 전용 렌더러 (creative case 안에 있던 분기 분리) */
  if (tpl.type === 'vibe') {
    return renderVibePreview(tpl);
  }

  /* 라우팅 버그 보정: type='creative' 인데 theme이 banner-* 면 banner case 로 보냄 */
  const effectiveType = (tpl.type === 'creative' && /^banner-/.test(tpl.theme))
    ? 'banner' : tpl.type;

  switch (effectiveType) {
    case 'stats':
      return `
        <div style="width:82%;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <div style="width:36px;height:36px;border-radius:50%;background:${isDark?'rgba(255,255,255,.15)':'rgba(0,0,0,.1)'};display:flex;align-items:center;justify-content:center;padding:4px;">
              <img src="${getFluentUrl('Person')}" style="width:24px;height:24px;">
            </div>
            <div>
              <div style="height:8px;width:72px;background:${isDark?'rgba(255,255,255,.25)':'rgba(0,0,0,.12)'};border-radius:4px;margin-bottom:4px;"></div>
              <div style="height:6px;width:48px;background:${isDark?'rgba(255,255,255,.12)':'rgba(0,0,0,.06)'};border-radius:3px;"></div>
            </div>
          </div>
          <div style="display:flex;gap:10px;">
            ${['2.8k','142','98%'].map((v,i)=>`
              <div style="flex:1;background:${isDark?'rgba(255,255,255,.08)':'rgba(0,0,0,.04)'};border-radius:10px;padding:8px 6px;text-align:center;">
                <div style="font-size:13px;font-weight:800;color:${isDark?'rgba(255,255,255,.9)':'#4285F4'}">${v}</div>
                <div style="height:5px;width:24px;background:${isDark?'rgba(255,255,255,.15)':'rgba(0,0,0,.1)'};border-radius:2px;margin:4px auto 0;"></div>
              </div>
            `).join('')}
          </div>
        </div>`;

    case 'tech':
      return `
        <div style="width:85%;display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            ${['React','TypeScript','Node.js','Python'].map((t,i)=>{
              const colors=['#61DAFB','#3178C6','#339933','#3776AB'];
              return `<span style="background:${colors[i]}22;color:${colors[i]};border:1px solid ${colors[i]}44;padding:3px 8px;border-radius:4px;font-size:9px;font-weight:700;">${t}</span>`;
            }).join('')}
          </div>
        </div>`;

    case 'profile':
      return `
        <div style="width:85%;display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:32px;height:32px;border-radius:50%;background:${isDark?'rgba(255,255,255,.2)':'rgba(0,0,0,.1)'};display:flex;align-items:center;justify-content:center;">
              <img src="${getFluentUrl('Person')}" style="width:20px;height:20px;">
            </div>
            <div>
              <div style="height:7px;width:60px;background:${isDark?'rgba(255,255,255,.3)':'rgba(0,0,0,.12)'};border-radius:3px;margin-bottom:3px;"></div>
              <div style="height:5px;width:40px;background:${isDark?'rgba(255,255,255,.15)':'rgba(0,0,0,.07)'};border-radius:2px;"></div>
            </div>
          </div>
          <div style="height:5px;background:${isDark?'rgba(255,255,255,.08)':'rgba(0,0,0,.04)'};border-radius:3px;"></div>
          <div style="height:5px;width:80%;background:${isDark?'rgba(255,255,255,.08)':'rgba(0,0,0,.04)'};border-radius:3px;"></div>
        </div>`;

    case 'creative':
      if (tpl.theme === 'blog-card') {
        return `<div style="width:85%;background:rgba(255,255,255,0.8);border-radius:12px;padding:10px;border:1px solid rgba(0,0,0,0.05);">
          <div style="height:6px;width:60%;background:rgba(0,0,0,0.1);border-radius:3px;margin-bottom:8px;"></div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div style="width:30px;height:30px;background:#20c997;border-radius:6px;opacity:0.4;"></div>
            <div style="flex:1;">
              <div style="height:5px;width:80%;background:rgba(0,0,0,0.1);border-radius:2px;margin-bottom:4px;"></div>
              <div style="height:4px;width:40%;background:rgba(0,0,0,0.05);border-radius:2px;"></div>
            </div>
          </div>
        </div>`;
      }
      if (tpl.theme === 'progress-100') {
        return `<div style="width:85%;">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <div style="height:6px;width:40px;background:rgba(0,0,0,0.1);border-radius:3px;"></div>
            <div style="font-size:8px;font-weight:700;color:#ff006e;">42%</div>
          </div>
          <div style="height:8px;background:rgba(0,0,0,0.05);border-radius:4px;overflow:hidden;">
            <div style="width:42%;height:100%;background:linear-gradient(90deg,#ff006e,#9b8fe8);border-radius:4px;"></div>
          </div>
        </div>`;
      }
      if (tpl.theme === 'spotify-glass') {
        return `<div style="display:flex;gap:10px;align-items:center;background:rgba(255,255,255,0.6);padding:8px 12px;border-radius:12px;backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,0.8);">
          <div style="width:30px;height:30px;border-radius:50%;background:#1db954;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;">🎵</div>
          <div style="flex:1;"><div style="height:6px;width:40px;background:rgba(0,0,0,0.1);border-radius:3px;margin-bottom:4px;"></div><div style="height:4px;width:25px;background:rgba(0,0,0,0.05);border-radius:2px;"></div></div>
        </div>`;
      }
      if (tpl.theme === 'coffee-meter') {
        const coffeeImg = `<img src="${getFluentUrl('Hot Beverage')}" style="width:18px;height:18px;">`;
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:2px;">${coffeeImg}${coffeeImg}<span style="opacity:0.2;">${coffeeImg}${coffeeImg}</span></div>
          <div style="height:5px;width:40px;background:rgba(111,78,55,0.2);border-radius:3px;"></div>
        </div>`;
      }
      if (tpl.theme === 'mbti-status') {
        return `<div style="display:flex;flex-direction:column;gap:6px;width:80%;">
          <div style="height:14px;background:rgba(155,143,232,0.15);border-radius:6px;border:1px solid rgba(155,143,232,0.2);display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#9B8FE8;">INTP</div>
          <div style="height:14px;background:rgba(237,147,177,0.15);border-radius:6px;border:1px solid rgba(237,147,177,0.2);display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#ED93B1;">WORKING...</div>
        </div>`;
      }
      return `<div style="font-size:24px;">✨</div>`;

    case 'links':
      return renderLinksPreview(tpl, isDark);

    case 'banner': {
      const bannerColors = {
        'banner-wave-pink':      'linear-gradient(135deg,#FF6B9D,#C44569)',
        'banner-wave-blue':      'linear-gradient(135deg,#4285F4,#34A4F4)',
        'banner-slice-gradient': 'linear-gradient(120deg,#9B8FE8,#4285F4,#ED93B1)',
        'banner-egg':            'linear-gradient(135deg,#ED93B1,#9B8FE8)',
        'banner-cylinder':       'linear-gradient(135deg,#00B4CC,#7EC8E3)',
        'banner-shark':          'linear-gradient(135deg,#434343,#000)',
      };
      const grad = bannerColors[tpl.theme] || 'linear-gradient(135deg,#ddd,#eee)';
      if (tpl.theme === 'banner-typing') {
        return `<div style="font-family:monospace;font-size:14px;font-weight:600;color:#61DAFB;">
          Hi! I'm a Dev<span style="border-right:2px solid #61DAFB;"> </span>
        </div>`;
      }
      if (tpl.theme === 'banner-github-trophy') {
        const trophyImgs = ['Trophy','Star','Fire','Gem Stone'].map(name =>
          `<img src="${getFluentUrl(name)}" style="width:20px;height:20px;">`
        );
        return `<div style="display:flex;gap:5px;">
          ${trophyImgs.map(img => `<div style="background:rgba(255,255,255,.9);border:1px solid rgba(255,200,0,.4);border-radius:8px;padding:6px;">${img}</div>`).join('')}
        </div>`;
      }
      if (tpl.theme === 'banner-snake') {
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:3px;">${Array(6).fill(0).map((_,i)=>`<div style="width:14px;height:14px;background:${i===0?'#E53935':i<4?'#34A853':'#81C784'};border-radius:3px;opacity:${1-i*.1}"></div>`).join('')}</div>
          <div style="font-size:9px;color:#555;">contribution snake</div>
        </div>`;
      }
      if (tpl.theme === 'banner-divider-hits') {
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;align-items:center;border-radius:6px;overflow:hidden;font-family:monospace;box-shadow:0 2px 8px rgba(0,0,0,0.12);">
            <div style="background:#555;color:#fff;padding:5px 10px;font-size:9px;font-weight:700;">hits</div>
            <div style="background:#34A853;color:#fff;padding:5px 10px;font-size:9px;font-weight:700;">1.2k</div>
          </div>
          <div style="font-size:8px;color:rgba(0,0,0,0.4);font-weight:600;letter-spacing:0.5px;">VISITOR COUNTER</div>
        </div>`;
      }
      if (tpl.theme === 'premium-hit') {
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(255,255,255,0.4);padding:12px;border-radius:16px;border:1px solid rgba(255,255,255,0.6);backdrop-filter:blur(4px);">
          <div style="font-size:8px;font-weight:700;color:#4285F4;opacity:0.6;letter-spacing:1px;">VISITORS</div>
          <div style="font-size:24px;font-weight:800;color:#08080F;">1,247</div>
        </div>`;
      }
      return `<div style="width:80%;height:35px;background:${grad};border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;box-shadow:0 4px 12px rgba(0,0,0,0.1)">BANNER</div>`;
    }

    default:
      return `<div style="font-size:24px;">✨</div>`;
  }
}

/* ── 빌더로 이동 ─────────────────────────────────────── */
function goToBuilder(id) {
  window.location.href = `builder.html?template=${id}`;
}

/* ── 랜딩 페이지 추천 카드 렌더 (featured: true) ───────── */
function renderLandingCard(tpl) {
  const catMeta = CATEGORY_META[tpl.type] || { label: tpl.type };
  const previewStyle = PREVIEW_STYLES[tpl.theme] || 'background:#f5f5f5;';
  const previewContent = buildGalleryPreview(tpl);
  return `
    <article class="g-card" role="listitem">
      <div class="g-thumb" style="${previewStyle}" aria-hidden="true">
        ${previewContent}
      </div>
      <div class="g-info">
        <div class="g-cat">${catMeta.label}</div>
        <div class="g-name">${tpl.title}</div>
        <a href="builder.html?template=${tpl.id}" class="g-use-btn">사용하기 →</a>
      </div>
    </article>`;
}

function renderLandingFeatured() {
  const grid = document.querySelector('.page-landing .gallery-grid');
  if (!grid) return;
  const registry = window.TEMPLATE_REGISTRY || window.TEMPLATES;
  if (!registry) return;
  const featured = registry.filter(t => t.featured === true).slice(0, 6);
  if (featured.length === 0) return;
  grid.innerHTML = featured.map(renderLandingCard).join('');
}

/* 페이지 진입 시 자동 호출 — body에 page-landing 클래스가 있을 때만 */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.body && document.body.classList.contains('page-landing')) {
      renderLandingFeatured();
    }
  });
}

/* ── 갤러리 렌더링 (필터 + 검색) ─────────────────────── */
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  const searchInput = document.getElementById('gallery-search');
  if (!grid) return;

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const registry = window.TEMPLATE_REGISTRY || TEMPLATES;
  const getFiltered = (type) => type === 'all' ? registry : registry.filter(t => t.type === type);
  let list = getFiltered(currentFilter);

  if (query) {
    list = list.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.desc.toLowerCase().includes(query) ||
      t.type.toLowerCase().includes(query) ||
      (t.subtype && t.subtype.toLowerCase().includes(query))
    );
  }

  grid.innerHTML = list.map(renderCard).join('');

  const statsEl = document.getElementById('gallery-stats');
  if (statsEl) statsEl.textContent = `${list.length}개 템플릿 표시 중`;
}

/* ── 필터 탭 ─────────────────────────────────────────── */
function applyFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.filter === filter);
  });
  renderGallery();
}

/* ── 초기화 ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => applyFilter(tab.dataset.filter));
  });

  const searchInput = document.getElementById('gallery-search');
  if (searchInput) {
    searchInput.addEventListener('input', renderGallery);
  }

  applyFilter('all');
});