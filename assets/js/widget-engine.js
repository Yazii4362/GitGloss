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
    { id: 'b1', type: 'avatar',  data: { emoji: 'fluent:person' } },
    { id: 'b2', type: 'name',    data: { username: '', name: 'The Octocat', role: 'Full-stack Developer', handle: '@octocat' } },
    { id: 'b3', type: 'stats',   data: { items: [{ label:'Stars', val:'2.8k' }, { label:'Repos', val:'142' }, { label:'Active', val:'98%' }] } },
    { id: 'b4', type: 'badge',   data: { type:'tech', techs: ['React', 'TypeScript', 'Node.js'] } },
  ],

  _uid: 10,
};

/* ── 이모지 & 아이콘 데이터 ────────────────────────────── */
const AVATAR_DATA = {
  // Fluent System Icons (Microsoft Design)
  fluentIcons: [
    { name: 'person', label: 'Person' },
    { name: 'rocket', label: 'Rocket' },
    { name: 'fire', label: 'Fire' },
    { name: 'flash', label: 'Flash' },
    { name: 'star', label: 'Star' },
    { name: 'heart', label: 'Heart' },
    { name: 'code', label: 'Code' },
    { name: 'laptop', label: 'Laptop' },
    { name: 'desktop', label: 'Desktop' },
    { name: 'phone', label: 'Phone' },
    { name: 'lightbulb', label: 'Lightbulb' },
    { name: 'target-arrow', label: 'Target' },
    { name: 'trophy', label: 'Trophy' },
    { name: 'gift', label: 'Gift' },
    { name: 'emoji', label: 'Emoji' },
    { name: 'emoji-smile-slight', label: 'Smile' },
    { name: 'emoji-laugh', label: 'Laugh' },
    { name: 'sparkle', label: 'Sparkle' },
    { name: 'brain-circuit', label: 'Brain' },
    { name: 'book', label: 'Book' },
    { name: 'bookmark', label: 'Bookmark' },
    { name: 'briefcase', label: 'Briefcase' },
    { name: 'calendar', label: 'Calendar' },
    { name: 'camera', label: 'Camera' },
    { name: 'chat', label: 'Chat' },
    { name: 'checkmark-circle', label: 'Check' },
    { name: 'cloud', label: 'Cloud' },
    { name: 'color', label: 'Color' },
    { name: 'compass-northwest', label: 'Compass' },
    { name: 'database', label: 'Database' },
    { name: 'document', label: 'Document' },
    { name: 'folder', label: 'Folder' },
    { name: 'games', label: 'Games' },
    { name: 'globe', label: 'Globe' },
    { name: 'home', label: 'Home' },
    { name: 'image', label: 'Image' },
    { name: 'link', label: 'Link' },
    { name: 'location', label: 'Location' },
    { name: 'mail', label: 'Mail' },
    { name: 'megaphone', label: 'Megaphone' },
    { name: 'music-note-2', label: 'Music' },
    { name: 'paint-brush', label: 'Paint' },
    { name: 'puzzle-piece', label: 'Puzzle' },
    { name: 'shield', label: 'Shield' },
    { name: 'sparkle', label: 'Sparkle' },
    { name: 'settings', label: 'Settings' },
    { name: 'video', label: 'Video' },
    { name: 'wand', label: 'Wand' },
    { name: 'weather-sunny', label: 'Sun' }
  ]
};

/* ── Identity 카테고리 데이터 ────────────────────────────── */
const IDENTITY_MBTI_COLORS = {
  ENFP:'#00C9A7', ENFJ:'#00B4CC', INFP:'#3CB371', INFJ:'#2E8B57',
  ENTP:'#7B68EE', ENTJ:'#6A5ACD', INTP:'#9370DB', INTJ:'#483D8B',
  ESFP:'#FF8C00', ESTP:'#FF6347', ISFP:'#DAA520', ISTP:'#CD853F',
  ESFJ:'#4285F4', ESTJ:'#1967D2', ISFJ:'#7EC8E3', ISTJ:'#5F9EA0',
};

const IDENTITY_STATUS_PRESETS = [
  { emoji:'🟢', label:'Coding',       color:'#34A853' },
  { emoji:'🎧', label:'Deep Focus',   color:'#7B68EE' },
  { emoji:'☕', label:'Coffee Break', color:'#8B5A2B' },
  { emoji:'🌙', label:'Night Shift',  color:'#2D1F42' },
  { emoji:'🐛', label:'Debugging',    color:'#EA4335' },
  { emoji:'🚀', label:'Shipping',     color:'#FF8C00' },
  { emoji:'📝', label:'Code Review',  color:'#4285F4' },
  { emoji:'💤', label:'AFK',          color:'#64748B' },
  { emoji:'🔥', label:'In the Zone',  color:'#FF4500' },
  { emoji:'🎯', label:'Sprint Day',   color:'#20C997' },
];

const IDENTITY_ROLE_PRESETS = [
  { icon:'🌐', label:'Frontend Dev',   color:'#4285F4' },
  { icon:'⚙️', label:'Backend Dev',    color:'#34A853' },
  { icon:'💫', label:'Full Stack Dev', color:'#7B68EE' },
  { icon:'🎨', label:'UX Designer',    color:'#ED93B1' },
  { icon:'🔧', label:'DevOps Eng.',    color:'#FF8C00' },
  { icon:'🤖', label:'ML Engineer',    color:'#EA4335' },
  { icon:'📱', label:'Mobile Dev',     color:'#00B4CC' },
  { icon:'🛡️', label:'Security Eng.', color:'#2D1F42' },
  { icon:'✍️', label:'Tech Writer',   color:'#20C997' },
  { icon:'📊', label:'Data Engineer',  color:'#FBBC05' },
];

const IDENTITY_VIBE_PRESETS = [
  { emoji:'🦉', label:'Night Owl',        color:'#1a1a2e' },
  { emoji:'🏡', label:'Remote Worker',    color:'#00C9A7' },
  { emoji:'❤️', label:'Open Source',      color:'#FF8C00' },
  { emoji:'☕', label:'Coffee Addict',    color:'#8B5A2B' },
  { emoji:'🌑', label:'Dark Mode Only',   color:'#000000' },
  { emoji:'⌨️', label:'Keyboard Warrior', color:'#64748B' },
  { emoji:'🌿', label:'Git Addict',       color:'#F05032' },
  { emoji:'📦', label:'npm install',      color:'#CB3837' },
  { emoji:'🐧', label:'Linux User',       color:'#FCC624' },
  { emoji:'⚡', label:'Hackathon Hero',   color:'#FBBC05' },
];

function getFluentIconSVG(iconName, size = 24) {
  // Iconify API를 통한 Fluent Icons
  return `https://api.iconify.design/fluent/${iconName}-${size}-filled.svg`;
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
  avatar:  `<img src="${getFluentIconSVG('person', 20)}" style="width:18px;height:18px;">`, 
  name:    `<img src="${getFluentIconSVG('text-edit-style', 20)}" style="width:18px;height:18px;">`, 
  stats:   `<img src="${getFluentIconSVG('data-bar-vertical', 20)}" style="width:18px;height:18px;">`, 
  badge:   `<img src="${getFluentIconSVG('tag', 20)}" style="width:18px;height:18px;">`,
  streak:  `<img src="${getFluentIconSVG('fire', 20)}" style="width:18px;height:18px;">`, 
  links:   `<img src="${getFluentIconSVG('link', 20)}" style="width:18px;height:18px;">`, 
  bio:     `<img src="${getFluentIconSVG('document-text', 20)}" style="width:18px;height:18px;">`, 
  divider: `<img src="${getFluentIconSVG('line-horizontal-1', 20)}" style="width:18px;height:18px;">`, 
  trophy:  `<img src="${getFluentIconSVG('trophy', 20)}" style="width:18px;height:18px;">`, 
  hits:    `<img src="${getFluentIconSVG('eye', 20)}" style="width:18px;height:18px;">`, 
  coffee:  `<img src="${getFluentIconSVG('drink-coffee', 20)}" style="width:18px;height:18px;">`, 
  banner:  `<img src="${getFluentIconSVG('image', 20)}" style="width:18px;height:18px;">`, 
  typing:  `<img src="${getFluentIconSVG('keyboard', 20)}" style="width:18px;height:18px;">`,
  snake:   `<img src="${getFluentIconSVG('animal-cat', 20)}" style="width:18px;height:18px;">`,
};
const BLOCK_LABEL = {
  avatar:'이모지 아바타', name:'이름 / 직무', stats:'Stats 숫자',
  badge:'배지', streak:'스트릭', links:'링크 버튼', bio:'소개글',
  divider:'구분선', trophy:'GitHub Trophy', hits:'Hits 카운터',
  coffee:'커피 카운터', banner:'배너', typing:'타이핑 SVG', snake:'Snake Game',
};

/* ── 블록 카테고리 (탭화용) ──────────────────────────── */
const BLOCK_CATEGORIES = {
  core:     { label: '기본',  blocks: ['avatar', 'name', 'bio', 'divider'] },
  stats:    { label: '데이터', blocks: ['stats', 'streak', 'hits', 'coffee'] },
  badge:    { label: '배지',  blocks: ['badge'] },
  extended: { label: '확장',  blocks: ['banner', 'typing', 'trophy', 'snake'] },
  links:    { label: 'Links', blocks: ['links'] },
};

const BLOCK_ADD_META = {
  avatar:  { emoji: '👤', label: '이모지' },
  name:    { emoji: '📝', label: '이름/직무' },
  bio:     { emoji: '💬', label: '소개글' },
  divider: { emoji: '━',  label: '구분선' },
  stats:   { emoji: '📊', label: 'Stats' },
  streak:  { emoji: '🔥', label: '스트릭' },
  hits:    { emoji: '👁️', label: 'Hits' },
  coffee:  { emoji: '☕', label: '커피' },
  badge:   { emoji: '🏷️', label: '배지' },
  links:   { emoji: '🔗', label: '링크' },
  banner:  { emoji: '🎨', label: '배너' },
  typing:  { emoji: '⌨️', label: '타이핑' },
  trophy:  { emoji: '🏆', label: 'Trophy' },
  snake:   { emoji: '🐍', label: 'Snake' },
};

function switchBlockTab(el, category) {
  document.querySelectorAll('.block-tab-btn').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  renderBlockAddGrid(category);
}

function renderBlockAddGrid(category = 'core') {
  const grid = document.getElementById('block-add-grid');
  if (!grid) return;
  const blocks = BLOCK_CATEGORIES[category]?.blocks || [];
  grid.innerHTML = blocks.map(type => {
    const meta = BLOCK_ADD_META[type] || { emoji: '▪', label: type };
    return `<button class="block-add-btn" onclick="addBlock('${type}')">
      <span style="font-size:15px;">${meta.emoji}</span> ${meta.label}
    </button>`;
  }).join('');
}

function renderBlockFields(b) {
  const d = b.data;
  switch (b.type) {

    case 'avatar':
      let emojiTabs = '<div class="emoji-picker-scroll">';
      
      // Fluent System Icons
      emojiTabs += `
        <div class="field-label" style="margin:4px 0 8px">Fluent System Icons</div>
        <div class="emoji-picker" style="grid-template-columns: repeat(5, 1fr); gap: 6px;">
          ${AVATAR_DATA.fluentIcons.map(icon => {
            const val = `fluent:${icon.name}`;
            const isSelected = d.emoji === val;
            return `
              <button class="ep-btn ${isSelected ? 'on' : ''}" style="height:50px;"
                      onclick="setBlockData('${b.id}','emoji','${val}')" title="${icon.label}">
                <img src="${getFluentIconSVG(icon.name, 24)}" style="width:28px; height:28px; object-fit:contain;" alt="${icon.label}">
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
          <label class="field-label">음료 아이콘</label>
          <select class="field-select" onchange="setBlockData('${b.id}','drinkEmoji',this.value)">
            <option value="fluent:drink-coffee" ${(d.drinkEmoji||'fluent:drink-coffee')==='fluent:drink-coffee'?'selected':''}>☕ Coffee</option>
            <option value="fluent:drink-beer" ${d.drinkEmoji==='fluent:drink-beer'?'selected':''}>🍺 Beer</option>
            <option value="fluent:drink-wine" ${d.drinkEmoji==='fluent:drink-wine'?'selected':''}>🍷 Wine</option>
            <option value="fluent:drink-margarita" ${d.drinkEmoji==='fluent:drink-margarita'?'selected':''}>🍹 Cocktail</option>
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

    case 'badge':
      return `
        <div class="field-row">
          <label class="field-label">배지 타입</label>
          <select class="field-select" onchange="setBlockData('${b.id}','type',this.value);renderBlockList();">
            <option value="tech"   ${(d.type||'tech')==='tech'  ?'selected':''}>기술 스택</option>
            <option value="mbti"   ${d.type==='mbti'  ?'selected':''}>MBTI</option>
            <option value="status" ${d.type==='status'?'selected':''}>현재 상태</option>
            <option value="role"   ${d.type==='role'  ?'selected':''}>역할</option>
            <option value="vibe"   ${d.type==='vibe'  ?'selected':''}>바이브</option>
          </select>
        </div>
        ${renderBadgeSubFields(b, d)}`;

    default: return '';
  }
}

/* ── badge 서브필드 헬퍼 ─────────────────────────────── */
function renderBadgeSubFields(b, d) {
  const type = d.type || 'tech';
  if (type === 'tech') {
    return `
      <div class="tag-wrap" id="tags-${b.id}">
        ${(d.techs||[]).map((t,i) => `
          <span class="tag tag-pk">${t}
            <button class="tag-x" onclick="removeBadgeTech('${b.id}',${i})">×</button>
          </span>`).join('')}
      </div>
      <input class="field-input" placeholder="기술명 입력 후 Enter" style="margin-top:6px"
             onkeydown="addBadgeTech(event,'${b.id}',this)">`;
  }
  if (type === 'mbti') {
    return `
      <div class="field-row">
        <label class="field-label">MBTI 유형</label>
        <select class="field-select" onchange="setBlockData('${b.id}','mbti',this.value)">
          ${Object.keys(IDENTITY_MBTI_COLORS).map(t =>
            `<option value="${t}" ${(d.mbti||'ENFP')===t?'selected':''}>${t}</option>`
          ).join('')}
        </select>
      </div>`;
  }
  if (type === 'status') {
    return `
      <div class="field-row">
        <label class="field-label">프리셋</label>
        <select class="field-select" onchange="applyBadgeStatusPreset('${b.id}',this.value)">
          <option value="">커스텀</option>
          ${IDENTITY_STATUS_PRESETS.map((p,i) =>
            `<option value="${i}">${p.emoji} ${p.label}</option>`
          ).join('')}
        </select>
      </div>
      <div class="field-row">
        <label class="field-label">이모지</label>
        <input class="field-input" value="${d.statusEmoji||'🟢'}" placeholder="🟢"
               oninput="setBlockData('${b.id}','statusEmoji',this.value)">
      </div>
      <div class="field-row">
        <label class="field-label">메시지</label>
        <input class="field-input" value="${d.statusMsg||'Coding'}" placeholder="Coding"
               oninput="setBlockData('${b.id}','statusMsg',this.value)">
      </div>
      <div class="field-row">
        <label class="field-label">색상</label>
        <input type="color" value="${d.statusColor||'#34A853'}"
               oninput="setBlockData('${b.id}','statusColor',this.value)">
      </div>`;
  }
  if (type === 'role') {
    return `
      <div class="field-row">
        <label class="field-label">프리셋</label>
        <select class="field-select" onchange="applyBadgeRolePreset('${b.id}',this.value)">
          <option value="">커스텀</option>
          ${IDENTITY_ROLE_PRESETS.map((p,i) =>
            `<option value="${i}">${p.icon} ${p.label}</option>`
          ).join('')}
        </select>
      </div>
      <div class="field-row">
        <label class="field-label">아이콘</label>
        <input class="field-input" value="${d.roleIcon||'🌐'}" placeholder="🌐"
               oninput="setBlockData('${b.id}','roleIcon',this.value)">
      </div>
      <div class="field-row">
        <label class="field-label">역할명</label>
        <input class="field-input" value="${d.roleMsg||'Frontend Dev'}" placeholder="Frontend Dev"
               oninput="setBlockData('${b.id}','roleMsg',this.value)">
      </div>
      <div class="field-row">
        <label class="field-label">색상</label>
        <input type="color" value="${d.roleColor||'#4285F4'}"
               oninput="setBlockData('${b.id}','roleColor',this.value)">
      </div>`;
  }
  if (type === 'vibe') {
    return `
      <div class="field-row">
        <label class="field-label">프리셋</label>
        <select class="field-select" onchange="applyBadgeVibePreset('${b.id}',this.value)">
          <option value="">커스텀</option>
          ${IDENTITY_VIBE_PRESETS.map((p,i) =>
            `<option value="${i}">${p.emoji} ${p.label}</option>`
          ).join('')}
        </select>
      </div>
      <div class="field-row">
        <label class="field-label">이모지</label>
        <input class="field-input" value="${d.vibeEmoji||'🦉'}" placeholder="🦉"
               oninput="setBlockData('${b.id}','vibeEmoji',this.value)">
      </div>
      <div class="field-row">
        <label class="field-label">메시지</label>
        <input class="field-input" value="${d.vibeMsg||'Night Owl'}" placeholder="Night Owl"
               oninput="setBlockData('${b.id}','vibeMsg',this.value)">
      </div>
      <div class="field-row">
        <label class="field-label">색상</label>
        <input type="color" value="${d.vibeColor||'#1a1a2e'}"
               oninput="setBlockData('${b.id}','vibeColor',this.value)">
      </div>`;
  }
  return '';
}

function addBadgeTech(e, id, input) {
  if (e.key !== 'Enter' || !input.value.trim()) return;
  const b = WE.blocks.find(b => b.id === id);
  if (b) {
    if (!b.data.techs) b.data.techs = [];
    b.data.techs.push(input.value.trim());
    input.value = '';
    renderBlockList();
    renderWidget();
  }
}

function removeBadgeTech(id, i) {
  const b = WE.blocks.find(b => b.id === id);
  if (b && b.data.techs) { b.data.techs.splice(i, 1); renderBlockList(); renderWidget(); }
}

function applyBadgeStatusPreset(id, idx) {
  if (idx === '') return;
  const p = IDENTITY_STATUS_PRESETS[parseInt(idx)];
  if (!p) return;
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data.statusEmoji = p.emoji; b.data.statusMsg = p.label; b.data.statusColor = p.color; renderBlockList(); renderWidget(); }
}

function applyBadgeRolePreset(id, idx) {
  if (idx === '') return;
  const p = IDENTITY_ROLE_PRESETS[parseInt(idx)];
  if (!p) return;
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data.roleIcon = p.icon; b.data.roleMsg = p.label; b.data.roleColor = p.color; renderBlockList(); renderWidget(); }
}

function applyBadgeVibePreset(id, idx) {
  if (idx === '') return;
  const p = IDENTITY_VIBE_PRESETS[parseInt(idx)];
  if (!p) return;
  const b = WE.blocks.find(b => b.id === id);
  if (b) { b.data.vibeEmoji = p.emoji; b.data.vibeMsg = p.label; b.data.vibeColor = p.color; renderBlockList(); renderWidget(); }
}



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
  /* Profile 추가 */
  'mbti-status': 'glass',
  /* Links */
  'links-pill-row': 'glass',     'links-glass-card': 'glass',   'links-dark-row': 'dark',
  'links-icon-grid': 'glass',    'links-minimal-list': 'minimal','links-gradient-btns': 'gradient',
  'links-bordered': 'border',    'links-social-pack': 'glass',  'links-contact-card': 'glass',
  'links-dev-hub': 'minimal',
  /* Banner */
  'banner-wave-pink': 'gradient',     'banner-wave-blue': 'gradient',
  'banner-slice-gradient': 'gradient','banner-egg': 'glass',
  'banner-cylinder': 'gradient',      'banner-shark': 'dark',
  'banner-divider-hits': 'minimal',   'banner-typing': 'dark',
  'banner-github-trophy': 'gradient',
  /* Creative */
  'coffee-meter': 'glass',  'premium-hit': 'glass',
  /* Identity — MBTI */
  'identity-mbti-nf': 'glass',  'identity-mbti-nt': 'glass',
  'identity-mbti-sj': 'glass',  'identity-mbti-sp': 'glass',
  'identity-mbti-pack': 'glass',
  /* Identity — Status */
  'identity-status-green': 'glass',  'identity-status-purple': 'glass',
  'identity-status-brown': 'glass',  'identity-status-dark': 'dark',
  'identity-status-red': 'glass',    'identity-status-orange': 'glass',
  'identity-status-blue': 'glass',   'identity-status-gray': 'glass',
  /* Identity — Role */
  'identity-role-blue': 'glass',   'identity-role-green': 'glass',
  'identity-role-purple': 'glass', 'identity-role-pink': 'glass',
  'identity-role-orange': 'glass', 'identity-role-red': 'glass',
  'identity-role-teal': 'glass',   'identity-role-dark': 'dark',
  /* Identity — Vibe */
  'identity-vibe-dark': 'dark',    'identity-vibe-green': 'glass',
  'identity-vibe-orange': 'glass', 'identity-vibe-brown': 'glass',
  'identity-vibe-dark2': 'dark',   'identity-vibe-slate': 'glass',
  'identity-vibe-gray': 'glass',
};

// 타입 → 기본 블록 구성
const TYPE_TO_BLOCKS = {
  stats: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:person' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'The Octocat', role: 'Full-stack Developer', handle: '@octocat' }, collapsed: false },
    { id: uid(), type: 'stats',   data: { items: [{ label:'Stars', val:'2.8k' }, { label:'Repos', val:'142' }, { label:'Active', val:'98%' }] }, collapsed: false },
    { id: uid(), type: 'badge',   data: { type:'tech', techs: ['React', 'TypeScript', 'Node.js'] }, collapsed: true },
  ],
  tech: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:rocket' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'The Octocat', role: 'Tech Stack', handle: '' }, collapsed: false },
    { id: uid(), type: 'badge',   data: { type:'tech', techs: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker'] }, collapsed: false },
  ],
  profile: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:person' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'The Octocat', role: 'Full-stack Developer', handle: '@octocat' }, collapsed: false },
    { id: uid(), type: 'bio',     data: { text: 'Building amazing things with code ✨' }, collapsed: false },
    { id: uid(), type: 'badge',   data: { type:'tech', techs: ['React', 'TypeScript'] }, collapsed: false },
    { id: uid(), type: 'links',   data: { items: [{ type:'github', url:'' }, { type:'blog', url:'' }] }, collapsed: false },
  ],
  links: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:link' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'The Octocat', role: '링크 모음', handle: '' }, collapsed: false },
    { id: uid(), type: 'links',   data: { items: [{ type:'github', url:'' }, { type:'blog', url:'' }, { type:'email', url:'' }] }, collapsed: false },
  ],
  banner: () => [
    { id: uid(), type: 'avatar',  data: { emoji: 'fluent:emoji' }, collapsed: false },
    { id: uid(), type: 'name',    data: { username: '', name: 'Hi! Welcome!', role: '', handle: '' }, collapsed: false },
    { id: uid(), type: 'bio',     data: { text: 'GitHub 프로필에 오신 것을 환영합니다.' }, collapsed: false },
  ],
  creative: (tplId) => {
    // 템플릿 ID에 따라 적절한 블록 구성
    if (tplId === 'banner-10') return [{ id: uid(), type: 'snake', data: { username: '' } }];
    if (tplId === 'banner-09') return [{ id: uid(), type: 'trophy', data: { username: '' } }];
    if (tplId === 'banner-07' || tplId === 'banner-11') return [{ id: uid(), type: 'hits', data: { username: '' } }];
    if (tplId === 'links-11') return [{ id: uid(), type: 'coffee', data: { cups: '2', maxCups: '4' } }];
    return [{ id: uid(), type: 'avatar', data: { emoji: 'fluent:sparkle' } }];
  }
};

function applyPreset(templateId) {
  const registry = window.TEMPLATE_REGISTRY || window.TEMPLATES;
  const tpl = registry && registry.find(t => t.id === templateId);
  if (!tpl) { console.warn('[ReadMe.kit] Template not found:', templateId); return; }

  console.log('[GitGloss] Applying preset:', tpl.title, '| style:', THEME_TO_STYLE[tpl.theme] || 'glass');

  // 1. 카드 스타일 + 액센트 적용
  const style = THEME_TO_STYLE[tpl.theme] || 'glass';
  WE.style  = style;
  WE.accent = tpl.accentColor || '#4285F4';
  WE.preset = templateId;

  // 2. 블록 구성 — 템플릿에 blocks 정의가 있으면 직접 사용, 없으면 팩토리 폴백
  if (tpl.blocks && tpl.blocks.length > 0) {
    WE.blocks = tpl.blocks.map(b => ({ ...b, id: uid(), collapsed: false }));
  } else {
    const typeKey = ['stats','tech','profile','links','creative','banner'].includes(tpl.type)
      ? tpl.type : 'stats';
    WE.blocks = typeKey === 'creative' ? TYPE_TO_BLOCKS.creative(templateId) : TYPE_TO_BLOCKS[typeKey]();
  }

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

/* ── URL 파라미터로 프리셋 초기화 ────────────────────── */
function initBuilder() {
  const params = new URLSearchParams(window.location.search);
  const templateId = params.get('template') || params.get('preset');
  if (templateId) {
    const registry = window.TEMPLATE_REGISTRY || TEMPLATES;
    const target = registry.find(t => t.id === templateId);
    if (target) {
      // 블록 데이터 교체 (깊은 복사로 원본 보호)
      if (target.blocks && target.blocks.length > 0) {
        WE.blocks = JSON.parse(JSON.stringify(target.blocks))
          .map(b => ({ ...b, id: uid(), collapsed: false }));
      } else {
        // blocks 미정의 템플릿은 기존 팩토리 폴백
        const typeKey = ['stats','tech','profile','links','creative','banner'].includes(target.type)
          ? target.type : 'stats';
        WE.blocks = typeKey === 'creative'
          ? TYPE_TO_BLOCKS.creative(templateId)
          : TYPE_TO_BLOCKS[typeKey]();
      }

      // 스타일 + 액센트 적용
      WE.style  = target.style || THEME_TO_STYLE[target.theme] || 'glass';
      WE.accent = target.accentColor || '#4285F4';
      WE.preset = templateId;

      // UI 동기화
      document.querySelectorAll('.style-btn').forEach(b =>
        b.classList.toggle('on', b.dataset.style === WE.style));
      document.querySelectorAll('.sw').forEach(s =>
        s.classList.toggle('on', s.title === WE.accent));
      document.querySelectorAll('.preset-thumb').forEach(p =>
        p.classList.toggle('on', p.dataset.id === templateId));

      console.log(`[ReadMe.kit] Loaded: ${target.title}`);
    }
  }

  renderBlockList();
  renderWidget();
}

// 하위 호환 — applyPresetFromURL은 initBuilder로 위임
function applyPresetFromURL() { initBuilder(); }

function switchPresetFilter(el, type) {
  document.querySelectorAll('.preset-filter').forEach(b => b.classList.remove('on'));
  el.classList.add('on');
  renderPresetGrid(type);

  // 해당 타입의 첫 번째 프리셋 자동 적용
  const registry = window.TEMPLATE_REGISTRY || window.TEMPLATES;
  if (registry) {
    const first = type === 'all'
      ? registry[0]
      : registry.find(t => t.type === type);
    if (first) applyPreset(first.id);
  }
}

/* ══════════════════════════════════════════════════════
   PRESET GRID — 왼쪽 패널 프리셋 썸네일
══════════════════════════════════════════════════════ */
function renderPresetGrid(filterType = 'all') {
  const grid = document.getElementById('preset-grid');
  const registry = window.TEMPLATE_REGISTRY || window.TEMPLATES;
  if (!grid || !registry) return;

  const list = filterType === 'all'
    ? registry
    : registry.filter(t => t.type === filterType);

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
    avatar:  { emoji: 'fluent:person' },
    name:    { username: '', name: '', role: '', handle: '' },
    stats:   { items: [{ label:'Stars', val:'2.8k' }, { label:'Repos', val:'142' }] },
    badge:   {
      type: 'tech',
      techs: ['React', 'TypeScript'],
      mbti: 'ENFP',
      statusEmoji: '🟢', statusMsg: 'Coding',    statusColor: '#34A853',
      roleIcon:    '🌐', roleMsg:   'Frontend Dev', roleColor: '#4285F4',
      vibeEmoji:   '🦉', vibeMsg:   'Night Owl',  vibeColor: '#1a1a2e',
    },
    streak:  { current: '42', longest: '87', total: '1,247' },
    links:   { items: [{ type:'github', url:'' }, { type:'blog', url:'' }] },
    bio:     { text: '' },
    divider: {},
    trophy:  { username: '', theme: 'flat' },
    snake:   { username: '', colorScheme: 'github' },
    hits:    { username: '', repo: '' },
    coffee:  { cups: '2', maxCups: '4', drinkEmoji: 'fluent:drink-coffee' },
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
      let content = d.emoji || 'fluent:person';
      if (content.startsWith('fluent:')) {
        const iconName = content.replace('fluent:','');
        content = `<img src="${getFluentIconSVG(iconName, 48)}" style="width:48px; height:48px; object-fit:contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));" alt="${iconName}" onerror="this.style.display='none'">`;
      }
      return `<div class="wb-avatar" style="background: ${hexAlpha(acc, 0.1)}; border-color: ${hexAlpha(acc, 0.2)};">${content}</div>`;

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
          ${d.username
            ? `<img src="${url}" alt="Hits" style="border-radius:4px;" loading="lazy">`
            : `<div class="wb-ext-placeholder">GitHub 사용자명을 입력하면 카운터가 표시됩니다</div>`
          }
        </div>`;
    }

    case 'coffee': {
      const cups = parseInt(d.cups) || 2;
      const max  = parseInt(d.maxCups) || 4;
      const iconName = (d.drinkEmoji || 'fluent:drink-coffee').replace('fluent:', '');
      const imgTag = `<img src="${getFluentIconSVG(iconName, 32)}" style="width:32px; height:32px; object-fit:contain;">`;
      
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
          <img src="${url}" alt="Typing SVG" style="max-width:100%;border-radius:4px;" loading="lazy">
        </div>`;
    }

    case 'badge': {
      const type = d.type || 'tech';
      let badgeHTML = '';
      if (type === 'tech') {
        badgeHTML = (d.techs || []).map(tech => {
          const bg     = hexAlpha(acc, 0.15);
          const border = hexAlpha(acc, 0.35);
          const color  = darkenColor(acc, 0.6);
          return `<span class="wb-badge" style="background:${bg};border:1px solid ${border};color:${color}">${tech}</span>`;
        }).join('');
      } else if (type === 'mbti') {
        const color = IDENTITY_MBTI_COLORS[d.mbti || 'ENFP'] || '#00C9A7';
        badgeHTML = `<span class="wb-badge" style="background:${hexAlpha(color,0.15)};border:1px solid ${hexAlpha(color,0.35)};color:${color}">${d.mbti || 'ENFP'}</span>`;
      } else if (type === 'status') {
        const color = d.statusColor || '#34A853';
        badgeHTML = `<span class="wb-badge" style="background:${hexAlpha(color,0.15)};border:1px solid ${hexAlpha(color,0.35)};color:${color}">${d.statusEmoji||'🟢'} ${d.statusMsg||'Coding'}</span>`;
      } else if (type === 'role') {
        const color = d.roleColor || '#4285F4';
        badgeHTML = `<span class="wb-badge" style="background:${hexAlpha(color,0.15)};border:1px solid ${hexAlpha(color,0.35)};color:${color}">${d.roleIcon||'🌐'} ${d.roleMsg||'Frontend Dev'}</span>`;
      } else if (type === 'vibe') {
        const color = d.vibeColor || '#1a1a2e';
        badgeHTML = `<span class="wb-badge" style="background:${hexAlpha(color,0.15)};border:1px solid ${hexAlpha(color,0.35)};color:${color}">${d.vibeEmoji||'🦉'} ${d.vibeMsg||'Night Owl'}</span>`;
      }
      return `<div class="wb-badges">${badgeHTML}</div>`;
    }
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
      case 'badge':
        if (d.type === 'tech' && d.techs && d.techs.length > 0) {
          params.set('badges', d.techs.join(','));
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
      case 'badge': {
        const type = d.type || 'tech';
        let url = '';
        if (type === 'tech' && d.techs && d.techs.length > 0) {
          lines.push(d.techs.map(t => fmt === 'html' ? `<code>${t}</code>` : `\`${t}\``).join(' '));
        } else if (type === 'mbti') {
          const color = (IDENTITY_MBTI_COLORS[d.mbti || 'ENFP'] || '#00C9A7').replace('#','');
          url = `https://img.shields.io/badge/MBTI-${d.mbti||'ENFP'}-${color}.svg?style=flat-square&logoColor=white`;
          lines.push(fmt === 'html' ? `<img src="${url}" alt="MBTI ${d.mbti||'ENFP'}" />` : `![MBTI ${d.mbti||'ENFP'}](${url})`);
        } else if (type === 'status') {
          const color = (d.statusColor || '#34A853').replace('#','');
          url = `https://img.shields.io/badge/${encodeURIComponent((d.statusEmoji||'🟢') + ' ' + (d.statusMsg||'Coding'))}-${color}.svg?style=flat-square&labelColor=555555`;
          lines.push(fmt === 'html' ? `<img src="${url}" alt="Status" />` : `![Status](${url})`);
        } else if (type === 'role') {
          const color = (d.roleColor || '#4285F4').replace('#','');
          url = `https://img.shields.io/badge/${encodeURIComponent((d.roleIcon||'🌐') + ' ' + (d.roleMsg||'Frontend Dev'))}-${color}.svg?style=flat-square&labelColor=555555`;
          lines.push(fmt === 'html' ? `<img src="${url}" alt="Role" />` : `![Role](${url})`);
        } else if (type === 'vibe') {
          const color = (d.vibeColor || '#1a1a2e').replace('#','');
          url = `https://img.shields.io/badge/${encodeURIComponent((d.vibeEmoji||'🦉') + ' ' + (d.vibeMsg||'Night Owl'))}-${color}.svg?style=flat-square&labelColor=555555`;
          lines.push(fmt === 'html' ? `<img src="${url}" alt="Vibe" />` : `![Vibe](${url})`);
        }
        break;
      }
    }
  });

  // 나머지 블록들은 GitGloss API URL로 생성
  const hasGitglossBlocks = WE.blocks.some(b =>
    ['avatar','name','stats','badge','streak','links','bio','divider','coffee'].includes(b.type)
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
    if (typeof openCongratsModal === 'function') openCongratsModal();
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
  });
}

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const registry = window.TEMPLATE_REGISTRY || window.TEMPLATES;
  if (!registry) {
    console.error('[ReadMe.kit] TEMPLATES not loaded!');
    return;
  }

  renderPresetGrid('all');
  renderBlockList();
  renderWidget();
  renderBlockAddGrid('core');
  initBuilder(); // URL 파라미터 기반 템플릿 로드 (마지막 실행)
});
