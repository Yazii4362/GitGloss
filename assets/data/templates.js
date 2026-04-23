/* ═══════════════════════════════════════════════════════
   GitGloss — templates.js  (Single Source of Truth)
   60개 템플릿 전체 정의
   stats×10 · tech×10 · profile×10 · mix×10 · links×10 · banner×10
   ═══════════════════════════════════════════════════════ */

const TEMPLATES = [

  /* ── STATS (10) ──────────────────────────────────── */
  { id:'stats-01', type:'stats', theme:'cotton-candy',  layout:'', title:'Cotton Candy Stats', desc:'핑크 글래스모피즘 — 가장 인기 있는 스타일', badge:'NEW', accentColor:'#ED93B1', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-02', type:'stats', theme:'lavender-sky',  layout:'', title:'Lavender Sky',        desc:'라벤더→스카이 그라디언트 풀 카드',          badge:null,  accentColor:'#9B8FE8', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-03', type:'stats', theme:'cream-glass',   layout:'', title:'Cream Glass',         desc:'웜 크림 앰버 글래스모피즘',                 badge:null,  accentColor:'#D4A017', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-04', type:'stats', theme:'aqua-veil',     layout:'', title:'Aqua Veil',           desc:'딥 틸 다크 글래스, 시안 액센트',            badge:null,  accentColor:'#7EC8E3', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-05', type:'stats', theme:'dark-candy',    layout:'', title:'Dark Candy',          desc:'다크 배경에 네온 캔디 컬러 팝',             badge:null,  accentColor:'#ED93B1', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-06', type:'stats', theme:'plum-night',    layout:'', title:'Plum Night',          desc:'딥 플럼 벨벳 글래스, 보라 쉰',             badge:null,  accentColor:'#9B8FE8', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-07', type:'stats', theme:'dusk-purple',   layout:'', title:'Dusk Purple',         desc:'황혼 오렌지→보라 그라디언트',               badge:null,  accentColor:'#C84B9E', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-08', type:'stats', theme:'neu-candy',     layout:'', title:'Neu Candy',           desc:'뉴모피즘 캔디 라이트 — 소프트 섀도우',      badge:null,  accentColor:'#ED93B1', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-09', type:'stats', theme:'neu-rose',      layout:'', title:'Neu Rose',            desc:'뉴모피즘 로즈 핑크 베이스',                 badge:null,  accentColor:'#e05580', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-10', type:'stats', theme:'candy-burst',   layout:'', title:'Candy Burst',         desc:'레인보우 애니메이팅 그라디언트 테두리',      badge:'HOT', accentColor:'#9B8FE8', config:{stats:['Stars','Repos','Active']} },

  /* ── TECH BADGE (10) ─────────────────────────────── */
  { id:'tech-01', type:'tech', theme:'badge-minimal',      layout:'tech-layout', title:'Minimal',       desc:'테두리만, 밑줄 텍스트 포커스 스타일',          badge:null,  accentColor:'#08080F', config:{stack:['React','TypeScript','Node.js']} },
  { id:'tech-02', type:'tech', theme:'badge-glass',        layout:'tech-layout', title:'Glass Badge',   desc:'프로스티드 글래스 필 배지',                    badge:null,  accentColor:'#4285F4', config:{stack:['React','TypeScript','Node.js']} },
  { id:'tech-03', type:'tech', theme:'badge-soft',         layout:'tech-layout', title:'Soft Colors',   desc:'카테고리별 소프트 파스텔 사이클',              badge:null,  accentColor:'#ED93B1', config:{stack:['React','TypeScript','Node.js','Python','Go']} },
  { id:'tech-04', type:'tech', theme:'badge-pastel',       layout:'tech-layout', title:'Pastel Burst',  desc:'각 배지마다 고유한 파스텔 그라디언트',         badge:'NEW', accentColor:'#9B8FE8', config:{stack:['React','TypeScript','Node.js','Python','Docker']} },
  { id:'tech-05', type:'tech', theme:'badge-dark-pro',     layout:'tech-layout', title:'Dark Pro',      desc:'코드 에디터 스타일 다크 배지',                 badge:null,  accentColor:'#a0d0ff', config:{stack:['React','TypeScript','Node.js']} },
  { id:'tech-06', type:'tech', theme:'badge-stack-heavy',  layout:'tech-layout', title:'Stack Heavy',   desc:'크고 굵은 흑백 반전 배지',                    badge:null,  accentColor:'#08080F', config:{stack:['React','TypeScript','Node.js']} },
  { id:'tech-07', type:'tech', theme:'badge-clean',        layout:'tech-layout', title:'Clean',         desc:'화이트 카드 배지, 미세 섀도우 호버',           badge:null,  accentColor:'#08080F', config:{stack:['React','TypeScript','Node.js']} },
  { id:'tech-08', type:'tech', theme:'badge-cloud',        layout:'tech-layout', title:'Cloud Bubble',  desc:'부드러운 클라우드 버블 배지',                  badge:null,  accentColor:'#7EC8E3', config:{stack:['React','TypeScript','Node.js']} },
  { id:'tech-09', type:'tech', theme:'badge-frontend',     layout:'tech-layout', title:'Frontend Pack', desc:'React / Vue / Next 전용 컬러 팔레트',          badge:null,  accentColor:'#61DAFB', config:{stack:['React','TypeScript','Next.js','Figma']} },
  { id:'tech-10', type:'tech', theme:'badge-backend',      layout:'tech-layout', title:'Backend Pack',  desc:'서버/DB 전용 그린/그레이 팔레트',              badge:null,  accentColor:'#34A853', config:{stack:['Node.js','Go','PostgreSQL','Docker','AWS']} },

  /* ── PROFILE (10) ────────────────────────────────── */
  { id:'profile-01', type:'profile', theme:'profile-minimal',      layout:'profile-layout', title:'Minimal',      desc:'이모지 + 이름 + 핸들만, 초미니멀 센터 정렬',    badge:null,  accentColor:'#08080F', config:{} },
  { id:'profile-02', type:'profile', theme:'profile-dark-hero',    layout:'profile-layout', title:'Dark Hero',    desc:'다크 드라마틱, 그라디언트 네임 글로우',          badge:'HOT', accentColor:'#9B8FE8', config:{} },
  { id:'profile-03', type:'profile', theme:'profile-soft',         layout:'profile-layout', title:'Soft Hero',    desc:'소프트 핑크 글래스, 따뜻한 분위기',             badge:null,  accentColor:'#ED93B1', config:{} },
  { id:'profile-04', type:'profile', theme:'profile-character',    layout:'profile-layout', title:'Character',    desc:'빅 이모지, 점선 테두리, 펀 스타일',             badge:null,  accentColor:'#ED93B1', config:{} },
  { id:'profile-05', type:'profile', theme:'profile-obsidian',     layout:'profile-layout', title:'Obsidian',     desc:'퓨어 블랙, 하이 콘트라스트, 럭셔리',           badge:'NEW', accentColor:'#fff',    config:{} },
  { id:'profile-06', type:'profile', theme:'profile-glass-grid',   layout:'profile-layout', title:'Glass Grid',   desc:'그리드 투 컬럼 레이아웃 글래스',               badge:null,  accentColor:'#4285F4', config:{} },
  { id:'profile-07', type:'profile', theme:'profile-interactive',  layout:'profile-layout', title:'Interactive',  desc:'호버 시 레인보우 보더 시머 애니메이션',         badge:null,  accentColor:'#9B8FE8', config:{} },
  { id:'profile-08', type:'profile', theme:'profile-portfolio',    layout:'profile-layout', title:'Portfolio',    desc:'링크드인 스타일 수평 레이아웃',                badge:null,  accentColor:'#4285F4', config:{} },
  { id:'profile-09', type:'profile', theme:'profile-simple-dark',  layout:'profile-layout', title:'Simple Dark',  desc:'심플 다크, 낮은 채도 미니멀',                  badge:null,  accentColor:'#aaa',    config:{} },
  { id:'profile-10', type:'profile', theme:'mbti-status',          layout:'profile-layout', title:'MBTI & Mood',  desc:'개발자 MBTI 및 오늘의 상태 표현 뱃지',         badge:'NEW', accentColor:'#9B8FE8', config:{} },

  /* ── MIX (9) ────────────────────────────────────── */
  { id:'mix-01', type:'stats',   theme:'dev-card',    layout:'',            title:'Dev Card',    desc:'올인원 개발자 카드, 상단 컬러 스트라이프',  badge:'NEW', accentColor:'#7EC8E3', config:{stats:['Stars','Repos','Active']} },
  { id:'mix-02', type:'profile', theme:'designer',    layout:'profile-layout', title:'Designer', desc:'로즈 핑크→스카이 블루 드림 그라디언트',    badge:null,  accentColor:'#FF9A9E', config:{} },
  { id:'mix-03', type:'stats',   theme:'engineer',    layout:'',            title:'Engineer',    desc:'터미널 그린, 코드 에디터 감성',            badge:null,  accentColor:'#34A853', config:{stats:['Stars','Repos','Active']} },
  { id:'mix-04', type:'tech',    theme:'creator',     layout:'tech-layout', title:'Creator',     desc:'애니메이팅 레인보우 테두리, 멀티 컬러',    badge:'HOT', accentColor:'#FF006E', config:{stack:['React','Figma','Node.js','Python','Swift']} },
  { id:'mix-05', type:'stats',   theme:'tech-light',  layout:'',            title:'Tech Light',  desc:'블루 액센트 라이트 테크 카드',             badge:null,  accentColor:'#4285F4', config:{stats:['Stars','Repos','Active']} },
  { id:'mix-06', type:'stats',   theme:'tech-dark',   layout:'',            title:'Tech Dark',   desc:'네이비 다크 + 블루 글로우',               badge:null,  accentColor:'#4285F4', config:{stats:['Stars','Repos','Active']} },
  { id:'mix-07', type:'tech',    theme:'tech-soft',   layout:'tech-layout', title:'Tech Soft',   desc:'인디고+에메랄드 소프트 파스텔 콤비',       badge:null,  accentColor:'#6366F1', config:{stack:['React','TypeScript','Node.js','Docker']} },
  { id:'mix-08', type:'stats',   theme:'stats-lite',  layout:'',            title:'Stats Lite',  desc:'경량 컴팩트 스탯 카드 (300px)',            badge:null,  accentColor:'#4285F4', config:{stats:['Stars','Repos','Active']} },
  { id:'mix-09', type:'stats',   theme:'dark-lite',   layout:'',            title:'Dark Lite',   desc:'경량 다크 컴팩트 카드 (300px)',            badge:null,  accentColor:'#aaa',    config:{stats:['Stars','Repos','Active']} },

  /* ── LINKS (10) ──────────────────────────────────── */
  { id:'links-01', type:'links', theme:'links-pill-row',      layout:'links-layout', title:'Pill Row',       desc:'한 줄 가로 배열 라운드 필 버튼',                badge:'NEW', accentColor:'#4285F4', config:{links:['github','blog','email']} },
  { id:'links-02', type:'links', theme:'links-glass-card',    layout:'links-layout', title:'Glass Card',     desc:'글래스모피즘 카드 안 그리드 버튼',              badge:null,  accentColor:'#ED93B1', config:{links:['github','blog','email','linkedin']} },
  { id:'links-03', type:'links', theme:'links-dark-row',      layout:'links-layout', title:'Dark Row',       desc:'다크 배경 심플 아이콘+텍스트 행',              badge:null,  accentColor:'#7EC8E3', config:{links:['github','blog','linkedin','twitter']} },
  { id:'links-04', type:'links', theme:'links-icon-grid',     layout:'links-layout', title:'Icon Grid',      desc:'아이콘 중심 2×N 그리드 레이아웃',              badge:null,  accentColor:'#9B8FE8', config:{links:['github','blog','email','linkedin','twitter','youtube']} },
  { id:'links-05', type:'links', theme:'links-minimal-list',  layout:'links-layout', title:'Minimal List',   desc:'텍스트 전용 깔끔한 목록형',                    badge:null,  accentColor:'#08080F', config:{links:['github','blog','email']} },
  { id:'links-06', type:'links', theme:'links-gradient-btns', layout:'links-layout', title:'Gradient Btns',  desc:'각 버튼마다 브랜드 그라디언트 적용',           badge:'HOT', accentColor:'#FF006E', config:{links:['github','blog','email','kakao']} },
  { id:'links-07', type:'links', theme:'links-bordered',      layout:'links-layout', title:'Bordered',       desc:'테두리 강조, 호버 시 채워지는 버튼',           badge:null,  accentColor:'#4285F4', config:{links:['github','blog','linkedin']} },
  { id:'links-08', type:'links', theme:'links-social-pack',   layout:'links-layout', title:'Social Pack',    desc:'SNS 브랜드 컬러 자동 적용 패키지',             badge:null,  accentColor:'#1DA1F2', config:{links:['github','twitter','instagram','youtube','twitch']} },
  { id:'links-09', type:'links', theme:'links-contact-card',  layout:'links-layout', title:'Contact Card',   desc:'연락처 카드 스타일, 이메일+채팅 특화',         badge:null,  accentColor:'#34A853', config:{links:['email','kakao','discord','notion']} },
  { id:'links-10', type:'links', theme:'links-dev-hub',       layout:'links-layout', title:'Dev Hub',        desc:'개발자 필수 링크 허브 — 블로그+포폴+깃헙',     badge:null,  accentColor:'#181717', config:{links:['github','blog','portfolio','npm','notion']} },

  /* ── BANNER (10) ─────────────────────────────────── */
  { id:'banner-01', type:'banner', theme:'banner-wave-pink',      layout:'banner-layout', title:'Wave Pink',       desc:'capsule-render 핑크 웨이브 헤더',                badge:'NEW', accentColor:'#ED93B1', config:{text:'Hi! Welcome!',height:160} },
  { id:'banner-02', type:'banner', theme:'banner-wave-blue',      layout:'banner-layout', title:'Wave Blue',       desc:'capsule-render 블루 웨이브 헤더',                badge:null,  accentColor:'#4285F4', config:{text:'Hi! Welcome!',height:160} },
  { id:'banner-03', type:'banner', theme:'banner-slice-gradient', layout:'banner-layout', title:'Slice Gradient',  desc:'capsule-render slice + gradient 조합',           badge:null,  accentColor:'#9B8FE8', config:{text:"Hi! I'm Dev",height:160} },
  { id:'banner-04', type:'banner', theme:'banner-egg',            layout:'banner-layout', title:'Egg Shape',       desc:'capsule-render egg 타입 소프트 배너',            badge:null,  accentColor:'#ED93B1', config:{text:'Hello World!',height:200} },
  { id:'banner-05', type:'banner', theme:'banner-cylinder',       layout:'banner-layout', title:'Cylinder',        desc:'capsule-render cylinder, 3D감 곡선',             badge:null,  accentColor:'#7EC8E3', config:{text:"Let's Code!",height:150} },
  { id:'banner-06', type:'banner', theme:'banner-shark',          layout:'banner-layout', title:'Shark Dark',      desc:'capsule-render shark 타입 다크모드',             badge:null,  accentColor:'#aaa',    config:{text:'Full Stack Dev',height:160} },
  { id:'banner-07', type:'creative', theme:'banner-divider-hits',   layout:'banner-layout', title:'Hits Counter',    desc:'seeyoufarm Hits 방문자 카운터 배지',             badge:'HOT', accentColor:'#34A853', config:{text:''} },
  { id:'banner-08', type:'banner', theme:'banner-typing',         layout:'banner-layout', title:'Typing SVG',      desc:'readme-typing-svg 애니메이션 타이핑 텍스트',    badge:null,  accentColor:'#4285F4', config:{text:"I'm a Developer;I love Open Source"} },
  { id:'banner-09', type:'creative', theme:'banner-github-trophy',  layout:'banner-layout', title:'GitHub Trophy',   desc:'github-profile-trophy 업적 배지 모음',           badge:null,  accentColor:'#FFD700', config:{text:''} },
  { id:'banner-10', type:'creative', theme:'banner-snake',          layout:'banner-layout', title:'Snake Game',      desc:'contribution-snake SVG 게임 애니메이션',         badge:'NEW', accentColor:'#34A853', config:{text:''} },

  /* ── NEW: CREATIVE & INTERACTIVE (7) ─────────────── */
  { id:'stats-11',   type:'stats',   theme:'glass-neon',    layout:'', title:'Glass Neon',     desc:'네온 글로우 + 글래스모피즘 조합 카드',      badge:'NEW', accentColor:'#9B8FE8', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-12',   type:'stats',   theme:'aurora',        layout:'', title:'Aurora',         desc:'오로라 그라디언트 풀 카드',                 badge:'NEW', accentColor:'#7EC8E3', config:{stats:['Stars','Repos','Active']} },
  { id:'stats-13',   type:'stats',   theme:'mono-border',   layout:'', title:'Mono Border',    desc:'흑백 굵은 테두리, 타이포 중심 카드',        badge:null,  accentColor:'#08080F', config:{stats:['Stars','Repos','Active']} },
  { id:'links-11',   type:'creative', theme:'coffee-meter',  layout:'links-layout', title:'Today Fuel',    desc:'오늘 마신 커피/음료 잔 수 카운터 뱃지',     badge:null,  accentColor:'#6f4e37', config:{links:['kakao']} },
  { id:'banner-11',  type:'creative', theme:'premium-hit',   layout:'banner-layout', title:'Premium Hit',  desc:'세련된 타이포그래피 유리 질감 카운터',      badge:'NEW', accentColor:'#4285F4', config:{text:'Visitors',height:100} },
];

/* ── 헬퍼 함수 ───────────────────────────────────────── */
const getByType = (type) => type === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.type === type);
const getById   = (id)   => TEMPLATES.find(t => t.id === id);
