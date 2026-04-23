/* ═══════════════════════════════════════════════════════
   GitGloss — widget-engine.js  v3.0
   블록 조합 빌더 엔진
   ═══════════════════════════════════════════════════════ */
'use strict';

/* ── 전역 상태 ───────────────────────────────────────── */
const WE = {
  style:  'glass',      // glass | dark | neu | border | gradient | minimal
  accent: '#4285F4',
  preset: null,         // 현재 적용된 프리셋 id

  /* 블록 배열 — 순서가 곧 렌더 순서 */
  blocks: [
    { id: 'b1', type: 'avatar',  data: { emoji: 'fluent:Technologist|👨‍💻' } },
    { id: 'b2', type: 'name',    data: { username: '', name: 'The Octocat', role: 'Full-stack Developer', handle: '@octocat' } },
    { id: 'b3', type: 'stats',   data: { items: [{ label:'Stars', val:'2.8k' }, { label:'Repos', val:'142' }, { label:'Active', val:'98%' }] } },
    { id: 'b4', type: 'badges',  data: { tags: ['React', 'TypeScript', 'Node.js'] } },
  ],

  _uid: 10,
};

/* ── 이모지 & 아이콘 데이터 ────────────────────────────── */
const AVATAR_DATA = {
  // Microsoft Fluent 3D Emojis (Official 3D Style)
  fluentEmojis: [
    { c: '👨‍💻', n: 'Technologist' }, { c: '🚀', n: 'Rocket' }, { c: '🔥', n: 'Fire' }, { c: '⚡', n: 'High Voltage' },
    { c: '💎', n: 'Gem Stone' }, { c: '🌟', n: 'Star' }, { c: '🎯', n: 'Direct Hit' }, { c: '💡', n: 'Light Bulb' },
    { c: '🎨', n: 'Artist Palette' }, { c: '🎮', n: 'Video Game' }, { c: '👾', n: 'Alien Monster' }, { c: '🤖', n: 'Robot' },
    { c: '☕', n: 'Hot Beverage' }, { c: '🌈', n: 'Rainbow' }, { c: '🦄', n: 'Unicorn' }, { c: '🐙', n: 'Octopus' },
    { c: '🦊', n: 'Fox' }, { c: '🐧', n: 'Penguin' }, { c: '🍕', n: 'Pizza' }, { c: '🍩', n: 'Doughnut' },
    { c: '🥑', n: 'Avocado' }, { c: '🎁', n: 'Wrapped Gift' }, { c: '😎', n: 'Smiling Face with Sunglasses' },
    { c: '💻', n: 'Laptop' }, { c: '📱', n: 'Mobile Phone' }, { c: '🔒', n: 'Locked' },
    { c: '👋', n: 'Waving Hand' }, { c: '✨', n: 'Sparkles' }, { c: '🔗', n: 'Link' }, { c: '⚙️', n: 'Gear' }
  ],
  icons: {
    'Solid (Material)': ['home','person','settings','favorite','star','bolt','rocket','terminal','code','database','cloud','shield','verified','campaign','mail','explore','build','smart_toy'],
    'Solid (FA)': ['house','user','gear','heart','star','bolt','rocket','terminal','code','database','cloud','shield','check','bell','envelope','compass','wrench','robot']
  }
};

function getFluentUrl(name) {
  // Folder: Title Case with spaces (e.g. Hot Beverage)
  // File: snake_case (e.g. hot_beverage_3d.png)
  const folder = name.replace(/_/g, ' '); 
  const file = name.toLowerCase().replace(/ /g, '_').replace(/%20/g, '_');
  return `https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/${folder}/3D/${file}_3d.png`;
}

function uid() { return 'b' + (++WE._uid); }

/* ── 카드 스타일 맵 ──────────────────────────────────── */
const STYLE_CLASS = {
  glass:    'ws-glass',
  dark:     'ws-dark',
  neu:      'ws-neu',
  border:   'ws-border',
  gradient: 'ws-gradient',
  minimal:  'ws-minimal',
};

/* ══════════════════════════════════════════════════════
   BLOCK PANEL — 왼쪽 패널 렌더
══════════════════════════════════════════════════════ */


function renderBlockList() {
  const list = document.getElementById('block-list');
  if (!list) return;

  list.innerHTML = WE.blocks.map(b => `
    <div class="block-item" data-id="${b.id}">
      <div class="block-item-header">
        <span class="block-drag">⠿</span>
        <span class="block-icon">${BLOCK_ICON[b.type] || '▪'}</span>
        <span class="block-label">${BLOCK_LABEL[b.type] || b.type}</span>
        <button class="block-toggle ${b.collapsed ? '' : 'open'}"
                onclick="toggleBlock('${b.id}')">▾</button>
        <button class="block-remove" onclick="removeBlock('${b.id}')">✕</button>
      </div>
      <div class="block-fields ${b.collapsed ? 'hidden' : ''}">
        ${renderBlockFields(b)}
      </div>
    </div>
  `).join('');

  initDrag();
}

const BLOCK_ICON  = { 
  avatar: `<img src="${getFluentUrl('Technologist')}" style="width:18px;height:18px;">`, 
  name:   `<img src="${getFluentUrl('Writing Hand')}" style="width:18px;height:18px;">`, 
  stats:  `<img src="${getFluentUrl('Bar Chart')}" style="width:18px;height:18px;">`, 
  badges: `<img src="${getFluentUrl('Label')}" style="width:18px;height:18px;">`, 
  streak: `<img src="${getFluentUrl('Fire')}" style="width:18px;height:18px;">`, 
  links:  `<img src="${getFluentUrl('Link')}" style="width:18px;height:18px;">`, 
  bio:    `<img src="${getFluentUrl('Memo')}" style="width:18px;height:18px;">`, 
  divider:`<img src="${getFluentUrl('Horizontal Line')}" style="width:18px;height:18px;">`, 
  trophy: `<img src="${getFluentUrl('Trophy')}" style="width:18px;height:18px;">`, 
  snake:  `<img src="${getFluentUrl('Snake')}" style="width:18px;height:18px;">`, 
  hits:   `<img src="${getFluentUrl('Eye')}" style="width:18px;height:18px;">`, 
  coffee: `<img src="${getFluentUrl('Hot Beverage')}" style="width:18px;height:18px;">`, 
  banner: `<img src="${getFluentUrl('Artist Palette')}" style="width:18px;height:18px;">`, 
  typing: `<img src="${getFluentUrl('Keyboard')}" style="width:18px;height:18px;">` 
};
const BLOCK_LABEL = { avatar:'이모지 아바타', name:'이름 / 직무', stats:'Stats 숫자', badges:'기술 배지', streak:'스트릭', links:'링크 버튼', bio:'소개글', divider:'구분선', trophy:'GitHub Trophy', snake:'Snake Game', hits:'Hits 카운터', coffee:'커피 카운터', banner:'배너', typing:'타이핑 SVG' };

function renderBlockFields(b) {
  const d = b.data;
  switch (b.type) {

    case 'avatar':
      let emojiTabs = '<div class="emoji-picker-scroll">';
      
      // Fluent 3D Emojis
      emojiTabs += `
        <div class="field-label" style="margin:4px 0 8px">Premium 3D Emojis</div>
        <div class="emoji-picker" style="grid-template-columns: repeat(4, 1fr); gap: 8px;">
          ${AVATAR_DATA.fluentEmojis.map(e => {
            const val = `fluent:${e.n}|${e.c}`; // name|char
            const isSelected = d.emoji === val;
            return `
              <button class="ep-btn ${isSelected ? 'on' : ''}" style="height:60px;"
                      onclick="setBlockData('${b.id}','emoji','${val}')">
                <img src="${getFluentUrl(e.n)}" style="width:40px; height:40px; object-fit:contain;" alt="${e.c}">
              </button>`;
          }).join('')}
        </div>`;
      // 아이콘 탭 (Material Symbols)
      emojiTabs += `
        <div class="field-label" style="margin:16px 0 6px">Solid Icons (Material)</div>
        <div class="emoji-picker">
          ${AVATAR_DATA.icons['Solid (Material)'].map(i => {
            const val = `ms:${i}`;
            return `
              <button class="ep-btn ${d.emoji === val ? 'on' : ''}"
                      onclick="setBlockData('${b.id}','emoji','${val}')">
                <span class="material-symbols-rounded" style="font-size:20px">${i}</span>
              </button>`;
          }).join('')}
        </div>`;
      // 아이콘 탭 (Font Awesome)
      emojiTabs += `
        <div class="field-label" style="margin:16px 0 6px">Solid Icons (Font Awesome)</div>
        <div class="emoji-picker">
          ${AVATAR_DATA.icons['Solid (FA)'].map(i => {
            const val = `fa:${i}`;
            return `
              <button class="ep-btn ${d.emoji === val ? 'on' : ''}"
                      onclick="setBlockData('${b.id}','emoji','${val}')">
                <i class="fa-solid fa-${i}" style="font-size:16px"></i>
              </button>`;
          }).join('')}
        </div>`;
      
      emojiTabs += '</div>'; // close scroll container

      return `<div class="field-row">${emojiTabs}</div>`;

    case 'name':
      return `
        <div class="field-row">
          <label class="field-label">GitHub 사용자명 <span style="color:var(--google-red)">*</span></label>
          <input class="field-input" value="${d.username || ''}" placeholder="octocat"
                 oninput="setBlockData('${b.id}','username',this.value)"
                 style="border-color:${d.username ? 'rgba(0,0,0,0.1)' : 'rgba(234,67,53,0.4)'}">
        </div>
        <div class="field-row">
          <label class="field-label">표시 이름</label>
          <input class="field-input" value="${d.name || ''}" placeholder="The Octocat"
                 oninput="setBlockData('${b.id}','name',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">직무 / 한 줄 소개</label>
          <input class="field-input" value="${d.role || ''}" placeholder="Full-stack Developer"
                 oninput="setBlockData('${b.id}','role',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">핸들 (선택)</label>
          <input class="field-input" value="${d.handle || ''}" placeholder="@octocat"
                 oninput="setBlockData('${b.id}','handle',this.value)">
        </div>`;

    case 'stats':
      return d.items.map((item, i) => `
        <div class="field-row stat-row">
          <input class="field-input" value="${item.label}" placeholder="라벨"
                 oninput="setStatItem('${b.id}',${i},'label',this.value)" style="flex:1.2">
          <input class="field-input" value="${item.val}" placeholder="값"
                 oninput="setStatItem('${b.id}',${i},'val',this.value)" style="flex:1">
          <button class="btn-icon-sm" onclick="removeStatItem('${b.id}',${i})">✕</button>
        </div>
      `).join('') + `
        <button class="btn-add-row" onclick="addStatItem('${b.id}')">+ 항목 추가</button>`;

    case 'badges':
      return `
        <div class="tag-wrap" id="tags-${b.id}">
          ${d.tags.map((t,i) => `
            <span class="tag tag-pk">${t}
              <button class="tag-x" onclick="removeBadge('${b.id}',${i})">×</button>
            </span>
          `).join('')}
        </div>
        <input class="field-input" placeholder="기술명 입력 후 Enter" style="margin-top:6px"
               onkeydown="addBadge(event,'${b.id}',this)">`;

    case 'streak':
      return `
        <div class="field-row">
          <label class="field-label">현재 스트릭 (일)</label>
          <input class="field-input" value="${d.current || '42'}" type="number"
                 oninput="setBlockData('${b.id}','current',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">최장 스트릭</label>
          <input class="field-input" value="${d.longest || '87'}" type="number"
                 oninput="setBlockData('${b.id}','longest',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">총 기여도</label>
          <input class="field-input" value="${d.total || '1,247'}"
                 oninput="setBlockData('${b.id}','total',this.value)">
        </div>`;

    case 'links':
      return `
        <div id="links-${b.id}">
          ${(d.items || []).map((item, i) => `
            <div class="field-row link-row">
              <select class="field-select" onchange="setLinkItem('${b.id}',${i},'type',this.value)">
                ${['github','blog','email','linkedin','twitter','instagram','youtube','discord','notion','portfolio'].map(t =>
                  `<option value="${t}" ${item.type===t?'selected':''}>${t}</option>`
                ).join('')}
              </select>
              <input class="field-input" value="${item.url || ''}" placeholder="URL"
                     oninput="setLinkItem('${b.id}',${i},'url',this.value)">
              <button class="btn-icon-sm" onclick="removeLinkItem('${b.id}',${i})">✕</button>
            </div>
          `).join('')}
        </div>
        <button class="btn-add-row" onclick="addLinkItem('${b.id}')">+ 링크 추가</button>`;

    case 'bio':
      return `
        <div class="field-row">
          <textarea class="field-input" rows="3" style="resize:vertical"
                    oninput="setBlockData('${b.id}','text',this.value)"
                    placeholder="한 줄 소개를 입력하세요">${d.text || ''}</textarea>
        </div>`;

    case 'divider':
      return `<div style="font-size:11px;color:var(--text-hint);padding:4px 0;">구분선이 추가됩니다</div>`;

    case 'trophy':
      return `
        <div class="field-row">
          <label class="field-label">GitHub 사용자명 <span style="color:var(--google-red)">*</span></label>
          <input class="field-input" value="${d.username || ''}" placeholder="octocat"
                 oninput="setBlockData('${b.id}','username',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">테마</label>
          <select class="field-select" onchange="setBlockData('${b.id}','theme',this.value)">
            ${['flat','onedark','gruvbox','dracula','monokai','chalk','nord','alduin','darkhub','juicyfresh','buddhism','oldie','radical','tokyonight'].map(t =>
              `<option value="${t}" ${(d.theme||'flat')===t?'selected':''}>${t}</option>`
            ).join('')}
          </select>
        </div>
        <div class="field-row" style="background:rgba(66,133,244,0.06);border-radius:8px;padding:8px;font-size:11px;color:var(--text-sub);">
          💡 GitHub 프로필 트로피를 자동으로 가져옵니다
        </div>`;

    case 'snake':
      return `
        <div class="field-row">
          <label class="field-label">GitHub 사용자명 <span style="color:var(--google-red)">*</span></label>
          <input class="field-input" value="${d.username || ''}" placeholder="octocat"
                 oninput="setBlockData('${b.id}','username',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">색상 테마</label>
          <select class="field-select" onchange="setBlockData('${b.id}','colorScheme',this.value)">
            <option value="github" ${(d.colorScheme||'github')==='github'?'selected':''}>GitHub (기본)</option>
            <option value="github-dark" ${d.colorScheme==='github-dark'?'selected':''}>GitHub Dark</option>
          </select>
        </div>
        <div class="field-row" style="background:rgba(52,168,83,0.06);border-radius:8px;padding:8px;font-size:11px;color:var(--text-sub);">
          🐍 기여 그래프를 먹는 스네이크 게임 애니메이션
        </div>`;

    case 'hits':
      return `
        <div class="field-row">
          <label class="field-label">GitHub 사용자명 <span style="color:var(--google-red)">*</span></label>
          <input class="field-input" value="${d.username || ''}" placeholder="octocat"
                 oninput="setBlockData('${b.id}','username',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">레포지토리 이름 (선택)</label>
          <input class="field-input" value="${d.repo || ''}" placeholder="octocat (비우면 프로필 카운터)"
                 oninput="setBlockData('${b.id}','repo',this.value)">
        </div>
        <div class="field-row" style="background:rgba(52,168,83,0.06);border-radius:8px;padding:8px;font-size:11px;color:var(--text-sub);">
          👁️ seeyoufarm.com 방문자 카운터 배지
        </div>`;

    case 'coffee':
      return `
        <div class="field-row">
          <label class="field-label">오늘 마신 잔 수</label>
          <input class="field-input" value="${d.cups || '2'}" type="number" min="0" max="10"
                 oninput="setBlockData('${b.id}','cups',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">최대 잔 수</label>
          <input class="field-input" value="${d.maxCups || '4'}" type="number" min="1" max="10"
                 oninput="setBlockData('${b.id}','maxCups',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">음료 이모지</label>
          <select class="field-select" onchange="setBlockData('${b.id}','drinkEmoji',this.value)">
            ${[
              { c:'☕', n:'Hot Beverage' }, { c:'🧋', n:'Bubble Tea' }, { c:'🍵', n:'Teacup Without Handle' }, 
              { c:'🥤', n:'Cup with Straw' }, { c:'🧃', n:'Beverage Box' }, { c:'🍺', n:'Beer Mug' }, { c:'🥛', n:'Glass of Milk' }
            ].map(e =>
              `<option value="fluent:${e.n}|${e.c}" ${(d.drinkEmoji||'').includes(e.n)?'selected':''}>${e.c} ${e.c === '☕' ? 'Coffee' : ''}</option>`
            ).join('')}
          </select>
        </div>`;

    case 'banner':
      return `
        <div class="field-row">
          <label class="field-label">배너 텍스트</label>
          <input class="field-input" value="${d.text || 'Hi! Welcome!'}" placeholder="Hi! Welcome!"
                 oninput="setBlockData('${b.id}','text',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">배너 스타일</label>
          <select class="field-select" onchange="setBlockData('${b.id}','bannerType',this.value)">
            <option value="wave" ${(d.bannerType||'wave')==='wave'?'selected':''}>🌊 Wave</option>
            <option value="slice" ${d.bannerType==='slice'?'selected':''}>✂️ Slice</option>
            <option value="egg" ${d.bannerType==='egg'?'selected':''}>🥚 Egg</option>
            <option value="cylinder" ${d.bannerType==='cylinder'?'selected':''}>🔵 Cylinder</option>
            <option value="shark" ${d.bannerType==='shark'?'selected':''}>🦈 Shark (Dark)</option>
          </select>
        </div>
        <div class="field-row">
          <label class="field-label">배경 색상</label>
          <input class="field-input" value="${d.color || 'ED93B1'}" placeholder="ED93B1 (hex, # 없이)"
                 oninput="setBlockData('${b.id}','color',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">높이 (px)</label>
          <input class="field-input" value="${d.height || '160'}" type="number"
                 oninput="setBlockData('${b.id}','height',this.value)">
        </div>`;

    case 'typing':
      return `
        <div class="field-row">
          <label class="field-label">타이핑 텍스트 (줄바꿈은 ; 로 구분)</label>
          <input class="field-input" value="${d.lines || "I'm a Developer;I love Open Source"}"
                 placeholder="Hello World;I love coding"
                 oninput="setBlockData('${b.id}','lines',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">폰트 색상 (hex)</label>
          <input class="field-input" value="${d.color || '4285F4'}" placeholder="4285F4"
                 oninput="setBlockData('${b.id}','color',this.value)">
        </div>
        <div class="field-row">
          <label class="field-label">폰트 크기</label>
          <input class="field-input" value="${d.size || '22'}" type="number"
                 oninput="setBlockData('${b.id}','size',this.value)">
        </div>`;

    default: return '';
  }
}

/* ══════════════════════════════════════════════════════
   PRESET — 갤러리 템플릿 → 빌더 프리셋 적용
══════════════════════════════════════════════════════ */

// 테마명 → 카드 스타일 매핑
const THEME_TO_STYLE = {
  'cotton-candy': 'glass',   'lavender-sky': 'gradient', 'cream-glass': 'glass',
  'aqua-veil': 'dark',       'dark-candy': 'dark',       'plum-night': 'dark',
  'dusk-purple': 'gradient', 'neu-candy': 'neu',         'neu-rose': 'neu',
  'candy-burst': 'border',   'badge-minimal': 'minimal', 'badge-glass': 'glass',
  'badge-soft': 'neu',       'badge-pastel': 'glass',    'badge-dark-pro': 'dark',
  'badge-stack-heavy': 'border', 'badge-clean': 'minimal', 'badge-cloud': 'glass',
  'badge-frontend': 'glass', 'badge-backend': 'dark',
  'profile-minimal': 'minimal', 'profile-dark-hero': 'dark', 'profile-soft': 'neu',
  'profile-character': 'glass', 'profile-obsidian': 'dark', 'profile-glass-grid': 'glass',
  'profile-interactive': 'glass', 'profile-portfolio': 'glass', 'profile-simple-dark': 'dark',
  'dev-card': 'dark',        'designer': 'gradient',     'engineer': 'dark',
  'creator': 'border',       'tech-light': 'glass',      'tech-dark': 'dark',
  'tech-soft': 'neu',        'stats-lite': 'minimal',    'dark-lite': 'dark',
  'glass-neon': 'dark',      'aurora': 'dark',           'mono-border': 'border',
};

// 타입 → 기본 블록 구성
const TYPE_TO_BLOCKS = {
  stats: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:technologist|👨‍💻' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'The Octocat', role: 'Full-stack Developer', handle: '@octocat' }, collapsed: false },
    { id: uid(), type: 'stats',   data: { items: [{ label:'Stars', val:'2.8k' }, { label:'Repos', val:'142' }, { label:'Active', val:'98%' }] }, collapsed: false },
    { id: uid(), type: 'badges',  data: { tags: ['React', 'TypeScript', 'Node.js'] }, collapsed: true },
  ],
  tech: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:rocket|🚀' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'The Octocat', role: 'Tech Stack', handle: '' }, collapsed: false },
    { id: uid(), type: 'badges',  data: { tags: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker'] }, collapsed: false },
  ],
  profile: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:technologist|👨‍💻' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'The Octocat', role: 'Full-stack Developer', handle: '@octocat' }, collapsed: false },
    { id: uid(), type: 'bio',     data: { text: 'Building amazing things with code ✨' }, collapsed: false },
    { id: uid(), type: 'badges',  data: { tags: ['React', 'TypeScript'] }, collapsed: false },
    { id: uid(), type: 'links',   data: { items: [{ type:'github', url:'' }, { type:'blog', url:'' }] }, collapsed: false },
  ],
  links: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:link|🔗' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'The Octocat', role: '링크 모음', handle: '' }, collapsed: false },
    { id: uid(), type: 'links',   data: { items: [{ type:'github', url:'' }, { type:'blog', url:'' }, { type:'email', url:'' }] }, collapsed: false },
  ],
  banner: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:waving_hand|👋' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'Hi! Welcome!', role: '', handle: '' }, collapsed: false },
    { id: uid(), type: 'bio',     data: { text: 'GitHub 프로필에 오신 것을 환영합니다.' }, collapsed: false },
  ],
  creative: (tplId) => {
    // 템플릿 ID에 따라 적절한 블록 구성
    if (tplId === 'banner-10') return [{ id: uid(), type: 'snake', data: { username: '' } }];
    if (tplId === 'banner-09') return [{ id: uid(), type: 'trophy', data: { username: '' } }];
    if (tplId === 'banner-07' || tplId === 'banner-11') return [{ id: uid(), type: 'hits', data: { username: '' } }];
    if (tplId === 'links-11') return [{ id: uid(), type: 'coffee', data: { cups: '2', maxCups: '4' } }];
    return [{ id: uid(), type: 'avatar', data: { emoji: 'fluent:sparkles|✨' } }];
  }
};

function applyPreset(templateId) {
  const tpl = (typeof TEMPLATES !== 'undefined') && TEMPLATES.find(t => t.id === templateId);
  if (!tpl) { console.warn('[GitGloss] Template not found:', templateId); return; }

  console.log('[GitGloss] Applying preset:', tpl.title, '| style:', THEME_TO_STYLE[tpl.theme] || 'glass');

  // 1. 카드 스타일 + 액센트 적용
  const style = THEME_TO_STYLE[tpl.theme] || 'glass';
  WE.style  = style;
  WE.accent = tpl.accentColor || '#4285F4';
  WE.preset = templateId;

  // 2. 블록 구성 — 타입에 맞는 팩토리 사용
  const typeKey = ['stats','tech','profile','links','creative','banner'].includes(tpl.type)
    ? tpl.type : 'stats';
  WE.blocks = typeKey === 'creative' ? TYPE_TO_BLOCKS.creative(templateId) : TYPE_TO_BLOCKS[typeKey]();

  // 3. 스타일 버튼 UI 동기화
  document.querySelectorAll('.style-btn').forEach(b => {
    b.classList.toggle('on', b.dataset.style === style);
  });

  // 4. 색상 스와치 동기화
  document.querySelectorAll('.sw').forEach(s => {
    s.classList.toggle('on', s.title === WE.accent);
  });

  // 5. 프리셋 썸네일 활성화
  document.querySelectorAll('.preset-thumb').forEach(p => {
    p.classList.toggle('on', p.dataset.id === templateId);
  });

  // 6. 그라디언트 피커 닫기
  const picker = document.getElementById('gradient-picker');
  if (picker) picker.classList.remove('open');

  // 7. 렌더 — 블록 패널 + 위젯 카드 동시 업데이트
  renderBlockList();
  renderWidget();
}

// URL 파라미터로 프리셋 자동 적용
function applyPresetFromURL() {
  const params = new URLSearchParams(location.search);
  const id = params.get('template') || params.get('preset');
  if (id) applyPreset(id);
}

function switchPresetFilter(el, type) {
  document.querySelectorAll('.preset-filter').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  renderPresetGrid(type);

  // 해당 타입의 첫 번째 프리셋 자동 적용
  if (typeof TEMPLATES !== 'undefined') {
    const first = type === 'all'
      ? TEMPLATES[0]
      : TEMPLATES.find(t => t.type === type);
    if (first) applyPreset(first.id);
  }
}

/* ══════════════════════════════════════════════════════
   PRESET GRID — 왼쪽 패널 프리셋 썸네일
══════════════════════════════════════════════════════ */
function renderPresetGrid(filterType = 'all') {
  const grid = document.getElementById('preset-grid');
  if (!grid || typeof TEMPLATES === 'undefined') return;

  const list = filterType === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.type === filterType);

  grid.innerHTML = list.map(tpl => {
    const bg = getPresetThumbBg(tpl);
    return `
      <button class="preset-thumb ${WE.preset === tpl.id ? 'on' : ''}"
              data-id="${tpl.id}" title="${tpl.title}">
        <div class="preset-thumb-inner" style="${bg}">
          ${tpl.badge ? `<span class="preset-badge">${tpl.badge}</span>` : ''}
        </div>
        <div class="preset-thumb-name">${tpl.title}</div>
      </button>
    `;
  }).join('');

  // 이벤트 위임 — onclick 인라인 대신 안전하게 처리
  grid.onclick = (e) => {
    const btn = e.target.closest('.preset-thumb');
    if (!btn) return;
    applyPreset(btn.dataset.id);
  };
}

function getPresetThumbBg(tpl) {
  const darkThemes = ['dark-candy','plum-night','aqua-veil','badge-dark-pro','profile-dark-hero','profile-obsidian','profile-simple-dark','dev-card','engineer','tech-dark','glass-neon','aurora','dark-lite'];
  const neuThemes  = ['neu-candy','neu-rose','badge-soft','badge-clean','profile-soft','tech-soft'];
  const gradThemes = ['lavender-sky','dusk-purple','designer'];

  if (darkThemes.includes(tpl.theme)) {
    return `background:linear-gradient(135deg,#1a1035,#0d0714);`;
  }
  if (neuThemes.includes(tpl.theme)) {
    return `background:linear-gradient(145deg,#f5eaf5,#ede0ed);`;
  }
  if (gradThemes.includes(tpl.theme)) {
    return `background:linear-gradient(135deg,#667eea,#f093fb);`;
  }
  const acc = tpl.accentColor || '#4285F4';
  return `background:linear-gradient(135deg,${hexAlpha(acc,0.12)},${hexAlpha(acc,0.06)});`;
}

/* ══════════════════════════════════════════════════════
   BLOCK ACTIONS
══════════════════════════════════════════════════════ */
function addBlock(type) {
  const defaults = {
    avatar:  { emoji: 'fluent:Technologist|👨‍💻' },
    name:    { username: '', name: '', role: '', handle: '' },
    stats:   { items: [{ label:'Stars', val:'2.8k' }, { label:'Repos', val:'142' }] },
    badges:  { tags: ['React', 'TypeScript'] },
    streak:  { current: '42', longest: '87', total: '1,247' },
    links:   { items: [{ type:'github', url:'' }, { type:'blog', url:'' }] },
    bio:     { text: '' },
    divider: {},
    trophy:  { username: '', theme: 'flat' },
    snake:   { username: '', colorScheme: 'github' },
    hits:    { username: '', repo: '' },
    coffee:  { cups: '2', maxCups: '4', drinkEmoji: 'fluent:Hot Beverage|☕' },
    banner:  { text: 'Hi! Welcome!', bannerType: 'wave', color: 'ED93B1', height: '160' },
    typing:  { lines: "I'm a Developer;I love Open Source", color: '4285F4', size: '22' },
  };
  WE.blocks.push({ id: uid(), type, data: defaults[type] || {}, collapsed: false });
  renderBlockList();
  renderWidget();
}

function removeBlock(id) {
  WE.blocks = WE.blocks.filter(b => b.id !== id);
  renderBlockList();
  renderWidget();
}

function toggleBlock(id) {
  const b = WE.blocks.find(b => b.id === id);
  if (b) b.collapsed = !b.collapsed;
  renderBlockList();
}

function setBlockData(id, key, val) {
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data[key] = val; renderWidget(); updateCode(); }
}

function setStatItem(id, i, key, val) {
  const b = WE.blocks.find(b => b.id === id);
  if (b && b.data.items[i]) { b.data.items[i][key] = val; renderWidget(); updateCode(); }
}

function addStatItem(id) {
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data.items.push({ label: 'Label', val: '0' }); renderBlockList(); renderWidget(); }
}

function removeStatItem(id, i) {
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data.items.splice(i, 1); renderBlockList(); renderWidget(); }
}

function addBadge(e, id, input) {
  if (e.key !== 'Enter' || !input.value.trim()) return;
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data.tags.push(input.value.trim()); input.value = ''; renderBlockList(); renderWidget(); }
}

function removeBadge(id, i) {
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data.tags.splice(i, 1); renderBlockList(); renderWidget(); }
}

function addLinkItem(id) {
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data.items.push({ type: 'github', url: '' }); renderBlockList(); renderWidget(); }
}

function removeLinkItem(id, i) {
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data.items.splice(i, 1); renderBlockList(); renderWidget(); }
}

function setLinkItem(id, i, key, val) {
  const b = WE.blocks.find(b => b.id === id);
  if (b && b.data.items[i]) { b.data.items[i][key] = val; renderWidget(); updateCode(); }
}

/* ── 스타일 / 액센트 ─────────────────────────────────── */
const GRADIENT_PRESETS = {
  sunset:   { from: '#FF6B6B', to: '#FFE66D', mid: '#FF8E53' },
  ocean:    { from: '#2193b0', to: '#6dd5ed', mid: '#4ab8d4' },
  forest:   { from: '#134E5E', to: '#71B280', mid: '#2d7a5a' },
  candy:    { from: '#ED93B1', to: '#9B8FE8', mid: '#c490cc' },
  midnight: { from: '#0f0c29', to: '#302b63', mid: '#24243e' },
  aurora:   { from: '#00C9FF', to: '#92FE9D', mid: '#4de8b0' },
};

WE.gradient = 'candy'; // 기본 그라디언트

function toggleGradientPicker(el) {
  const picker = document.getElementById('gradient-picker');
  if (!picker) return;
  const isOpen = picker.classList.contains('open');
  if (isOpen) {
    picker.classList.remove('open');
  } else {
    // 다른 스타일 버튼 off, gradient 버튼 on
    document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
    picker.classList.add('open');
    WE.style = 'gradient';
    renderWidget();
  }
}

function setGradient(el, name) {
  document.querySelectorAll('.grad-opt').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  WE.gradient = name;
  WE.style = 'gradient';
  renderWidget();
}

function setStyle(el, style) {
  // gradient picker 닫기
  const picker = document.getElementById('gradient-picker');
  if (picker) picker.classList.remove('open');

  document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  WE.style = style;
  renderWidget();
}

function setAccent(el, color) {
  document.querySelectorAll('.sw').forEach(s => s.classList.remove('on'));
  el.classList.add('on');
  WE.accent = color;
  renderWidget();
}

function selectEmoji(el, emoji) {
  // 첫 번째 avatar 블록에 적용
  const b = WE.blocks.find(b => b.type === 'avatar');
  if (b) { b.data.emoji = emoji; renderBlockList(); renderWidget(); }
}

/* ══════════════════════════════════════════════════════
   WIDGET RENDERER
══════════════════════════════════════════════════════ */
function renderWidget() {
  const card = document.getElementById('widget-card');
  if (!card) return;

  // 1. 인라인 스타일 완전 초기화
  card.removeAttribute('style');

  // 2. 스타일 클래스 적용
  card.className = 'widget-card ' + (STYLE_CLASS[WE.style] || 'ws-glass');

  // 3. CSS 변수 주입
  card.style.setProperty('--accent',        WE.accent);
  card.style.setProperty('--accent-alpha',  hexAlpha(WE.accent, 0.15));
  card.style.setProperty('--accent-border', hexAlpha(WE.accent, 0.35));
  card.style.setProperty('--accent-text',   darkenColor(WE.accent));

  // 4. gradient 스타일은 프리셋 기반으로 배경 직접 주입
  if (WE.style === 'gradient') {
    const preset = GRADIENT_PRESETS[WE.gradient] || GRADIENT_PRESETS.candy;
    card.style.background = `linear-gradient(145deg, ${preset.from} 0%, ${preset.mid} 50%, ${preset.to} 100%)`;
    card.style.boxShadow  = `0 16px 48px ${hexAlpha(preset.from, 0.4)}`;
  }

  // 5. 블록 순서대로 HTML 조합
  card.innerHTML = WE.blocks.map(b => renderBlockHTML(b)).join('');

  updateCode();
}

function renderBlockHTML(b) {
  const d = b.data;
  const acc = WE.accent;

  switch (b.type) {

    case 'avatar':
      let content = d.emoji || 'fluent:Technologist|👨‍💻';
      if (content.startsWith('fluent:')) {
        const [name, char] = content.replace('fluent:','').split('|');
        content = `<img src="${getFluentUrl(name)}" style="width:100%; height:100%; object-fit:contain;" alt="${char}">`;
      } else if (content.startsWith('ms:')) {
        const iconName = content.split(':')[1];
        content = `<span class="material-symbols-rounded">${iconName}</span>`;
      } else if (content.startsWith('fa:')) {
        const iconName = content.split(':')[1];
        content = `<i class="fa-solid fa-${iconName}"></i>`;
      }
      return `<div class="wb-avatar">${content}</div>`;

    case 'name':
      return `
        <div class="wb-name-block">
          ${d.name  ? `<div class="wb-name">${d.name}</div>` : ''}
          ${d.role  ? `<div class="wb-role">${d.role}</div>` : ''}
          ${d.handle? `<div class="wb-handle">${d.handle}</div>` : ''}
        </div>`;

    case 'stats':
      return `
        <div class="wb-stats">
          ${d.items.map(item => `
            <div class="wb-stat">
              <div class="wb-stat-val" style="color:${acc}">${item.val}</div>
              <div class="wb-stat-lbl">${item.label}</div>
            </div>
          `).join('')}
        </div>`;

    case 'badges':
      return `
        <div class="wb-badges">
          ${d.tags.map((t, i) => {
            // 액센트 색상 기반 배지 — 밝은 배경 + 진한 텍스트
            const bgColor = hexAlpha(acc, 0.15);
            const textColor = darkenColor(acc, 0.6);
            const borderColor = hexAlpha(acc, 0.35);
            return `<span class="wb-badge" style="background:${bgColor};border:1px solid ${borderColor};color:${textColor}">${t}</span>`;
          }).join('')}
        </div>`;

    case 'streak':
      return `
        <div class="wb-streak">
          <div class="wb-streak-num" style="color:${acc}">${d.current || '42'}</div>
          <div class="wb-streak-lbl">Day Streak 🔥</div>
          <div class="wb-streak-sub">
            <div class="wb-streak-item">
              <span class="wb-streak-item-val">${d.longest || '87'}</span>
              <span class="wb-streak-item-key">Longest</span>
            </div>
            <div class="wb-streak-item">
              <span class="wb-streak-item-val">${d.total || '1,247'}</span>
              <span class="wb-streak-item-key">Total</span>
            </div>
          </div>
        </div>`;

    case 'links':
      return `
        <div class="wb-links">
          ${(d.items || []).map(item => {
            const meta = LINK_META[item.type] || { label: item.type, color: acc, bg: hexAlpha(acc, 0.08) };
            return `<a class="wb-link-btn" href="${item.url || '#'}" target="_blank"
                       style="background:${meta.bg};border-color:${meta.color}22;color:${meta.color}">
                      ${meta.label}
                    </a>`;
          }).join('')}
        </div>`;

    case 'bio':
      return `<div class="wb-bio">${d.text || ''}</div>`;

    case 'divider':
      return `<div class="wb-divider" style="background:${hexAlpha(acc, 0.2)}"></div>`;

    case 'trophy': {
      const user = d.username || 'octocat';
      const theme = d.theme || 'flat';
      const url = `https://github-profile-trophy.vercel.app/?username=${user}&theme=${theme}&no-frame=true&row=1&column=6`;
      return `
        <div class="wb-external-block">
          <div class="wb-ext-label">🏆 GitHub Trophy</div>
          ${d.username
            ? `<img src="${url}" alt="GitHub Trophy" style="max-width:100%;border-radius:8px;" loading="lazy">`
            : `<div class="wb-ext-placeholder">GitHub 사용자명을 입력하면 트로피가 표시됩니다</div>`
          }
        </div>`;
    }

    case 'snake': {
      const user = d.username || '';
      const dark = d.colorScheme === 'github-dark';
      const url = `https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake${dark?'-dark':''}.svg`;
      return `
        <div class="wb-external-block">
          <div class="wb-ext-label">🐍 Snake Game</div>
          ${d.username
            ? `<img src="${url}" alt="Snake Game" style="max-width:100%;border-radius:8px;" loading="lazy">`
            : `<div class="wb-ext-placeholder">GitHub 사용자명을 입력하면 스네이크 게임이 표시됩니다</div>`
          }
        </div>`;
    }

    case 'hits': {
      const user = d.username || '';
      const repo = d.repo || user;
      const url = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2F${user}%2F${repo}&count_bg=%2334A853&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false`;
      return `
        <div class="wb-external-block">
          <div class="wb-ext-label">👁️ Hits Counter</div>
          ${d.username
            ? `<img src="${url}" alt="Hits" style="border-radius:4px;" loading="lazy">`
            : `<div class="wb-ext-placeholder">GitHub 사용자명을 입력하면 카운터가 표시됩니다</div>`
          }
        </div>`;
    }

    case 'coffee': {
      const cups = parseInt(d.cups) || 2;
      const max  = parseInt(d.maxCups) || 4;
      let imgTag = '';
      if (d.drinkEmoji && d.drinkEmoji.startsWith('fluent:')) {
        const name = d.drinkEmoji.split('|')[0].replace('fluent:','');
        imgTag = `<img src="${getFluentUrl(name)}" style="width:32px; height:32px; object-fit:contain;">`;
      } else {
        imgTag = `<img src="${getFluentUrl('Hot Beverage')}" style="width:32px; height:32px; object-fit:contain;">`;
      }
      
      const icons = Array.from({length: max}, (_, i) =>
        `<div style="opacity:${i < cups ? 1 : 0.15}; transition:opacity .2s; width:32px; height:32px;">${imgTag}</div>`
      ).join('');
      
      return `
        <div class="wb-coffee">
          <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">${icons}</div>
          <div style="font-size:12px; font-weight:700; color:${acc}; margin-top:10px; text-align:center; letter-spacing:0.5px;">${cups} / ${max} DONE</div>
        </div>`;
    }

    case 'banner': {
      const text = d.text || 'Hi! Welcome!';
      const type = d.bannerType || 'wave';
      const color = (d.color || 'ED93B1').replace('#','');
      const height = d.height || '160';
      const url = `https://capsule-render.vercel.app/api?type=${type}&color=${color}&height=${height}&section=header&text=${encodeURIComponent(text)}&fontSize=40&fontColor=ffffff&animation=fadeIn`;
      return `
        <div class="wb-external-block">
          <div class="wb-ext-label">🎨 Banner — ${type}</div>
          <img src="${url}" alt="Banner" style="max-width:100%;border-radius:8px;" loading="lazy">
        </div>`;
    }

    case 'typing': {
      const lines = encodeURIComponent((d.lines || "I'm a Developer").replace(/;/g, ';'));
      const color = (d.color || '4285F4').replace('#','');
      const size  = d.size || '22';
      const url = `https://readme-typing-svg.demolab.com?font=Fira+Code&size=${size}&pause=1000&color=${color}&width=435&lines=${lines}`;
      return `
        <div class="wb-external-block">
          <div class="wb-ext-label">⌨️ Typing SVG</div>
          <img src="${url}" alt="Typing SVG" style="max-width:100%;border-radius:4px;" loading="lazy">
        </div>`;
    }

    default: return '';
  }
}

/* ── 링크 메타 ───────────────────────────────────────── */
const LINK_META = {
  github:    { label: 'GitHub',    color: '#181717', bg: '#f0f0f0' },
  blog:      { label: '블로그',    color: '#20c997', bg: '#e8fdf5' },
  email:     { label: 'Email',     color: '#EA4335', bg: '#fde8e6' },
  linkedin:  { label: 'LinkedIn',  color: '#0A66C2', bg: '#e7f0fa' },
  twitter:   { label: 'X / Twitter', color: '#000', bg: '#f0f0f0' },
  instagram: { label: 'Instagram', color: '#E1306C', bg: '#fde8f0' },
  youtube:   { label: 'YouTube',   color: '#FF0000', bg: '#ffe8e8' },
  discord:   { label: 'Discord',   color: '#5865F2', bg: '#eef0fe' },
  notion:    { label: 'Notion',    color: '#000',    bg: '#f5f5f5' },
  portfolio: { label: 'Portfolio', color: '#4285F4', bg: '#e8f0fe' },
};

/* ── 유틸 ────────────────────────────────────────────── */
function hexAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  if (isNaN(r)) return `rgba(66,133,244,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

// 배지 텍스트용 — 밝은 색은 어둡게, 어두운 색은 그대로
function darkenColor(hex, factor = 0.6) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  if (isNaN(r)) return hex;
  const brightness = (r * 299 + g * 587 + b * 114) / 255000;
  if (brightness > 0.65) {
    return `rgb(${Math.round(r*0.45)},${Math.round(g*0.45)},${Math.round(b*0.45)})`;
  }
  return hex;
}

// 두 hex 색상 혼합 (t=0 → hex1, t=1 → hex2)
function mixColor(hex1, hex2, t) {
  const r1=parseInt(hex1.slice(1,3),16), g1=parseInt(hex1.slice(3,5),16), b1=parseInt(hex1.slice(5,7),16);
  const r2=parseInt(hex2.slice(1,3),16), g2=parseInt(hex2.slice(3,5),16), b2=parseInt(hex2.slice(5,7),16);
  if (isNaN(r1)||isNaN(r2)) return hex1;
  return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
}

/* ══════════════════════════════════════════════════════
   DRAG & DROP (블록 순서 변경)
══════════════════════════════════════════════════════ */
function initDrag() {
  const list = document.getElementById('block-list');
  if (!list) return;
  let dragging = null;

  list.querySelectorAll('.block-item').forEach(item => {
    item.setAttribute('draggable', true);

    item.addEventListener('dragstart', e => {
      dragging = item;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      dragging = null;
      // 순서 동기화
      const newOrder = [...list.querySelectorAll('.block-item')].map(el => el.dataset.id);
      WE.blocks.sort((a, b) => newOrder.indexOf(a.id) - newOrder.indexOf(b.id));
      renderWidget();
    });
    item.addEventListener('dragover', e => {
      e.preventDefault();
      if (!dragging || dragging === item) return;
      const rect = item.getBoundingClientRect();
      const mid  = rect.top + rect.height / 2;
      if (e.clientY < mid) list.insertBefore(dragging, item);
      else list.insertBefore(dragging, item.nextSibling);
    });
  });
}

/* ══════════════════════════════════════════════════════
   CODE STRIP — API URL 생성
══════════════════════════════════════════════════════ */
function updateCode() {
  const pre = document.getElementById('code-pre');
  if (!pre) return;
  const tab = document.querySelector('.ctab.on');
  const fmt = tab ? tab.dataset.fmt : 'md';
  pre.textContent = generateCode(fmt);
}

function buildAPIUrl() {
  const base   = window.location.origin + '/api/widget';
  const params = new URLSearchParams();

  params.set('style',  WE.style);
  params.set('accent', WE.accent.replace('#', ''));
  if (WE.gradient && WE.style === 'gradient') params.set('grad', WE.gradient);

  // 블록별 파라미터 추출
  WE.blocks.forEach(b => {
    const d = b.data;
    switch (b.type) {
      case 'avatar':
        if (d.emoji) params.set('emoji', d.emoji);
        break;
      case 'name':
        if (d.username) params.set('username', d.username);
        if (d.name)     params.set('name',     d.name);
        if (d.role)     params.set('role',     d.role);
        if (d.handle)   params.set('handle',   d.handle);
        break;
      case 'bio':
        if (d.text) params.set('bio', d.text);
        break;
      case 'stats':
        if (d.items && d.items.length > 0) {
          params.set('stats', d.items.map(s => `${s.label}:${s.val}`).join(','));
        }
        break;
      case 'badges':
        if (d.tags && d.tags.length > 0) {
          params.set('badges', d.tags.join(','));
        }
        break;
      case 'streak':
        params.set('streak', `${d.current || 0}:${d.longest || 0}:${d.total || 0}`);
        break;
      case 'links':
        if (d.items && d.items.length > 0) {
          const linkStr = d.items
            .filter(l => l.url)
            .map(l => `${l.type}:${l.url}`)
            .join(',');
          if (linkStr) params.set('links', linkStr);
        }
        break;
    }
  });

  return `${base}?${params.toString()}`;
}

function generateCode(fmt) {
  const nameBlock = WE.blocks.find(b => b.type === 'name');
  const altText   = nameBlock?.data?.name || 'GitGloss Widget';

  // 외부 서비스 블록이 있으면 각각 별도 URL로 생성
  const lines = [];

  WE.blocks.forEach(b => {
    const d = b.data;
    switch (b.type) {
      case 'trophy': {
        if (!d.username) break;
        const url = `https://github-profile-trophy.vercel.app/?username=${d.username}&theme=${d.theme||'flat'}&no-frame=true&row=1&column=6`;
        lines.push(fmt === 'html'
          ? `<img src="${url}" alt="GitHub Trophy" />`
          : `![GitHub Trophy](${url})`);
        break;
      }
      case 'snake': {
        if (!d.username) break;
        const dark = d.colorScheme === 'github-dark';
        const url = `https://raw.githubusercontent.com/${d.username}/${d.username}/output/github-contribution-grid-snake${dark?'-dark':''}.svg`;
        lines.push(fmt === 'html'
          ? `<img src="${url}" alt="Snake Game" />`
          : `![Snake Game](${url})`);
        break;
      }
      case 'hits': {
        if (!d.username) break;
        const repo = d.repo || d.username;
        const url = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2F${d.username}%2F${repo}&count_bg=%2334A853&title_bg=%23555555&title=hits&edge_flat=false`;
        lines.push(fmt === 'html'
          ? `<img src="${url}" alt="Hits" />`
          : `![Hits](${url})`);
        break;
      }
      case 'banner': {
        const text  = d.text || 'Hi! Welcome!';
        const type  = d.bannerType || 'wave';
        const color = (d.color || 'ED93B1').replace('#','');
        const h     = d.height || '160';
        const url = `https://capsule-render.vercel.app/api?type=${type}&color=${color}&height=${h}&section=header&text=${encodeURIComponent(text)}&fontSize=40&fontColor=ffffff&animation=fadeIn`;
        lines.push(fmt === 'html'
          ? `<img src="${url}" alt="Banner" style="width:100%;" />`
          : `![Banner](${url})`);
        break;
      }
      case 'typing': {
        const linesStr = encodeURIComponent((d.lines || "I'm a Developer").replace(/;/g, ';'));
        const color = (d.color || '4285F4').replace('#','');
        const size  = d.size || '22';
        const url = `https://readme-typing-svg.demolab.com?font=Fira+Code&size=${size}&pause=1000&color=${color}&width=435&lines=${linesStr}`;
        lines.push(fmt === 'html'
          ? `<img src="${url}" alt="Typing SVG" />`
          : `![Typing SVG](${url})`);
        break;
      }
    }
  });

  // 나머지 블록들은 GitGloss API URL로 생성
  const hasGitglossBlocks = WE.blocks.some(b =>
    ['avatar','name','stats','badges','streak','links','bio','divider','coffee'].includes(b.type)
  );

  if (hasGitglossBlocks) {
    const url = buildAPIUrl();
    const label = altText;
    lines.unshift(fmt === 'html'
      ? `<img src="${url}" alt="${label}" style="max-width:100%;" />`
      : `![${label}](${url})`
    );
  }

  return lines.join(fmt === 'html' ? '\n' : '\n\n') || '<!-- 블록을 추가해주세요 -->';
}

function selCtab(btn, fmt) {
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  btn.dataset.fmt = fmt;
  updateCode();
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
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // templates.js 로드 확인
  if (typeof TEMPLATES === 'undefined') {
    console.error('TEMPLATES not loaded!');
    return;
  }

  renderPresetGrid('all');
  renderBlockList();
  renderWidget();
  applyPresetFromURL();
});
