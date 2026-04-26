/* ═══════════════════════════════════════════════════════
   ReadMe.kit — templates.js  (Single Source of Truth)
   60개 템플릿 전체 정의
   stats×10 · tech×10 · profile×10 · mix×10 · links×10 · banner×10
   ═══════════════════════════════════════════════════════ */

const TEMPLATES = [

  /* ── STATS (10) ──────────────────────────────────── */
  { id:'stats-01', featured:true, type:'stats', theme:'cotton-candy',  layout:'', title:'Cotton Candy Stats', desc:'핑크 글래스모피즘 — 가장 인기 있는 스타일', badge:'NEW', accentColor:'#ED93B1', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-02', type:'stats', theme:'lavender-sky',  layout:'', title:'Lavender Sky',        desc:'라벤더→스카이 그라디언트 풀 카드',          badge:null,  accentColor:'#9B8FE8', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:star' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-03', type:'stats', theme:'cream-glass',   layout:'', title:'Cream Glass',         desc:'웜 크림 앰버 글래스모피즘',                 badge:null,  accentColor:'#D4A017', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-04', type:'stats', theme:'aqua-veil',     layout:'', title:'Aqua Veil',           desc:'딥 틸 다크 글래스, 시안 액센트',            badge:null,  accentColor:'#7EC8E3', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-05', type:'stats', theme:'dark-candy',    layout:'', title:'Dark Candy',          desc:'다크 배경에 네온 캔디 컬러 팝',             badge:null,  accentColor:'#ED93B1', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-06', type:'stats', theme:'plum-night',    layout:'', title:'Plum Night',          desc:'딥 플럼 벨벳 글래스, 보라 쉰',             badge:null,  accentColor:'#9B8FE8', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-07', type:'stats', theme:'dusk-purple',   layout:'', title:'Dusk Purple',         desc:'황혼 오렌지→보라 그라디언트',               badge:null,  accentColor:'#C84B9E', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-08', type:'stats', theme:'neu-candy',     layout:'', title:'Neu Candy',           desc:'뉴모피즘 캔디 라이트 — 소프트 섀도우',      badge:null,  accentColor:'#ED93B1', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-09', type:'stats', theme:'neu-rose',      layout:'', title:'Neu Rose',            desc:'뉴모피즘 로즈 핑크 베이스',                 badge:null,  accentColor:'#e05580', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-10', type:'stats', theme:'candy-burst',   layout:'', title:'Candy Burst',         desc:'레인보우 애니메이팅 그라디언트 테두리',      badge:'HOT', accentColor:'#9B8FE8', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },

  /* ── TECH BADGE (10) ─────────────────────────────── */
  { id:'tech-01', type:'tech', theme:'badge-minimal',      layout:'tech-layout', title:'Minimal',       desc:'테두리만, 밑줄 텍스트 포커스 스타일',          badge:null,  accentColor:'#08080F', config:{stack:['React','TypeScript','Node.js']},
    blocks:[
      { id:'b1', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'tech-02', type:'tech', theme:'badge-glass',        layout:'tech-layout', title:'Glass Badge',   desc:'프로스티드 글래스 필 배지',                    badge:null,  accentColor:'#4285F4', config:{stack:['React','TypeScript','Node.js']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge', data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'tech-03', type:'tech', theme:'badge-soft',         layout:'tech-layout', title:'Soft Colors',   desc:'카테고리별 소프트 파스텔 사이클',              badge:null,  accentColor:'#ED93B1', config:{stack:['React','TypeScript','Node.js','Python','Go']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js','Python','Go'] } },
    ]
  },
  { id:'tech-04', featured:true, type:'tech', theme:'badge-pastel',       layout:'tech-layout', title:'Pastel Burst',  desc:'각 배지마다 고유한 파스텔 그라디언트',         badge:'NEW', accentColor:'#9B8FE8', config:{stack:['React','TypeScript','Node.js','Python','Docker']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js','Python','Docker'] } },
    ]
  },
  { id:'tech-05', type:'tech', theme:'badge-dark-pro',     layout:'tech-layout', title:'Dark Pro',      desc:'코드 에디터 스타일 다크 배지',                 badge:null,  accentColor:'#a0d0ff', config:{stack:['React','TypeScript','Node.js']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'tech-06', type:'tech', theme:'badge-stack-heavy',  layout:'tech-layout', title:'Stack Heavy',   desc:'크고 굵은 흑백 반전 배지',                    badge:null,  accentColor:'#08080F', config:{stack:['React','TypeScript','Node.js']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'tech-07', type:'tech', theme:'badge-clean',        layout:'tech-layout', title:'Clean',         desc:'화이트 카드 배지, 미세 섀도우 호버',           badge:null,  accentColor:'#08080F', config:{stack:['React','TypeScript','Node.js']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'tech-08', type:'tech', theme:'badge-cloud',        layout:'tech-layout', title:'Cloud Bubble',  desc:'부드러운 클라우드 버블 배지',                  badge:null,  accentColor:'#7EC8E3', config:{stack:['React','TypeScript','Node.js']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'tech-09', type:'tech', theme:'badge-frontend',     layout:'tech-layout', title:'Frontend Pack', desc:'React / Vue / Next 전용 컬러 팔레트',          badge:null,  accentColor:'#61DAFB', config:{stack:['React','TypeScript','Next.js','Figma']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Next.js','Figma'] } },
    ]
  },
  { id:'tech-10', type:'tech', theme:'badge-backend',      layout:'tech-layout', title:'Backend Pack',  desc:'서버/DB 전용 그린/그레이 팔레트',              badge:null,  accentColor:'#34A853', config:{stack:['Node.js','Go','PostgreSQL','Docker','AWS']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['Node.js','Go','PostgreSQL','Docker','AWS'] } },
    ]
  },

  /* ── PROFILE (10) ────────────────────────────────── */
  { id:'profile-01', type:'profile', theme:'profile-minimal',      layout:'profile-layout', title:'Minimal',      desc:'이모지 + 이름 + 핸들만, 초미니멀 센터 정렬',    badge:null,  accentColor:'#08080F', config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
    ]
  },
  { id:'profile-02', featured:true, type:'profile', theme:'profile-dark-hero',    layout:'profile-layout', title:'Dark Hero',    desc:'다크 드라마틱, 그라디언트 네임 글로우',          badge:'HOT', accentColor:'#9B8FE8', config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Full-stack Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge', data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'profile-03', type:'profile', theme:'profile-soft',         layout:'profile-layout', title:'Soft Hero',    desc:'소프트 핑크 글래스, 따뜻한 분위기',             badge:null,  accentColor:'#ED93B1', config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'profile-04', type:'profile', theme:'profile-character',    layout:'profile-layout', title:'Character',    desc:'빅 이모지, 점선 테두리, 펀 스타일',             badge:null,  accentColor:'#ED93B1', config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'profile-05', type:'profile', theme:'profile-obsidian',     layout:'profile-layout', title:'Obsidian',     desc:'퓨어 블랙, 하이 콘트라스트, 럭셔리',           badge:'NEW', accentColor:'#fff',    config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'profile-06', type:'profile', theme:'profile-glass-grid',   layout:'profile-layout', title:'Glass Grid',   desc:'그리드 투 컬럼 레이아웃 글래스',               badge:null,  accentColor:'#4285F4', config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'profile-07', type:'profile', theme:'profile-interactive',  layout:'profile-layout', title:'Interactive',  desc:'호버 시 레인보우 보더 시머 애니메이션',         badge:null,  accentColor:'#9B8FE8', config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'profile-08', type:'profile', theme:'profile-portfolio',    layout:'profile-layout', title:'Portfolio',    desc:'링크드인 스타일 수평 레이아웃',                badge:null,  accentColor:'#4285F4', config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'profile-09', type:'profile', theme:'profile-simple-dark',  layout:'profile-layout', title:'Simple Dark',  desc:'심플 다크, 낮은 채도 미니멀',                  badge:null,  accentColor:'#aaa',    config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'profile-10', type:'profile', theme:'mbti-status',          layout:'profile-layout', title:'MBTI & Mood',  desc:'개발자 MBTI 및 오늘의 상태 표현 뱃지',         badge:'NEW', accentColor:'#9B8FE8', config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },

  /* ── MIX (9) ────────────────────────────────────── */
  { id:'mix-01', type:'stats',   theme:'dev-card',    layout:'',            title:'Dev Card',    desc:'올인원 개발자 카드, 상단 컬러 스트라이프',  badge:'NEW', accentColor:'#7EC8E3', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'mix-02', type:'profile', theme:'designer',    layout:'profile-layout', title:'Designer', desc:'로즈 핑크→스카이 블루 드림 그라디언트',    badge:null,  accentColor:'#FF9A9E', config:{},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'bio',    data:{ text:'Building amazing things with code ✨' } },
      { id:'b4', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js'] } },
    ]
  },
  { id:'mix-03', type:'stats',   theme:'engineer',    layout:'',            title:'Engineer',    desc:'터미널 그린, 코드 에디터 감성',            badge:null,  accentColor:'#34A853', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'mix-04', type:'tech',    theme:'creator',     layout:'tech-layout', title:'Creator',     desc:'애니메이팅 레인보우 테두리, 멀티 컬러',    badge:'HOT', accentColor:'#FF006E', config:{stack:['React','Figma','Node.js','Python','Swift']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['React','Figma','Node.js','Python','Swift'] } },
    ]
  },
  { id:'mix-05', type:'stats',   theme:'tech-light',  layout:'',            title:'Tech Light',  desc:'블루 액센트 라이트 테크 카드',             badge:null,  accentColor:'#4285F4', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'mix-06', type:'stats',   theme:'tech-dark',   layout:'',            title:'Tech Dark',   desc:'네이비 다크 + 블루 글로우',               badge:null,  accentColor:'#4285F4', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'mix-07', type:'tech',    theme:'tech-soft',   layout:'tech-layout', title:'Tech Soft',   desc:'인디고+에메랄드 소프트 파스텔 콤비',       badge:null,  accentColor:'#6366F1', config:{stack:['React','TypeScript','Node.js','Docker']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:rocket' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Tech Stack', handle:'' } },
      { id:'b3', type:'badge',  data:{ type:'tech', techs:['React','TypeScript','Node.js','Docker'] } },
    ]
  },
  { id:'mix-08', type:'stats',   theme:'stats-lite',  layout:'',            title:'Stats Lite',  desc:'경량 컴팩트 스탯 카드 (300px)',            badge:null,  accentColor:'#4285F4', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'mix-09', type:'stats',   theme:'dark-lite',   layout:'',            title:'Dark Lite',   desc:'경량 다크 컴팩트 카드 (300px)',            badge:null,  accentColor:'#aaa',    config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },

  /* ── LINKS (10) ──────────────────────────────────── */
  { id:'links-01', type:'links', theme:'links-pill-row',      layout:'links-layout', title:'Pill Row',       desc:'한 줄 가로 배열 라운드 필 버튼',                badge:'NEW', accentColor:'#4285F4', config:{links:['github','blog','email']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'links', data:{ items:[{ type:'github', url:'' },{ type:'blog', url:'' },{ type:'email', url:'' }] } },
    ]
  },
  { id:'links-02', type:'links', theme:'links-glass-card',    layout:'links-layout', title:'Glass Card',     desc:'글래스모피즘 카드 안 그리드 버튼',              badge:null,  accentColor:'#ED93B1', config:{links:['github','blog','email','linkedin']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:link' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'링크 모음', handle:'' } },
      { id:'b3', type:'links',  data:{ items:[{ type:'github', url:'' },{ type:'blog', url:'' },{ type:'email', url:'' },{ type:'linkedin', url:'' }] } },
    ]
  },
  { id:'links-03', type:'links', theme:'links-dark-row',      layout:'links-layout', title:'Dark Row',       desc:'다크 배경 심플 아이콘+텍스트 행',              badge:null,  accentColor:'#7EC8E3', config:{links:['github','blog','linkedin','twitter']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:link' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'링크 모음', handle:'' } },
      { id:'b3', type:'links',  data:{ items:[{ type:'github', url:'' },{ type:'blog', url:'' },{ type:'linkedin', url:'' },{ type:'twitter', url:'' }] } },
    ]
  },
  { id:'links-04', type:'links', theme:'links-icon-grid',     layout:'links-layout', title:'Icon Grid',      desc:'아이콘 중심 2×N 그리드 레이아웃',              badge:null,  accentColor:'#9B8FE8', config:{links:['github','blog','email','linkedin','twitter','youtube']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:link' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'링크 모음', handle:'' } },
      { id:'b3', type:'links',  data:{ items:[{ type:'github', url:'' },{ type:'blog', url:'' },{ type:'email', url:'' },{ type:'linkedin', url:'' },{ type:'twitter', url:'' },{ type:'youtube', url:'' }] } },
    ]
  },
  { id:'links-05', type:'links', theme:'links-minimal-list',  layout:'links-layout', title:'Minimal List',   desc:'텍스트 전용 깔끔한 목록형',                    badge:null,  accentColor:'#08080F', config:{links:['github','blog','email']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:link' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'링크 모음', handle:'' } },
      { id:'b3', type:'links',  data:{ items:[{ type:'github', url:'' },{ type:'blog', url:'' },{ type:'email', url:'' }] } },
    ]
  },
  { id:'links-06', type:'links', theme:'links-gradient-btns', layout:'links-layout', title:'Gradient Btns',  desc:'각 버튼마다 브랜드 그라디언트 적용',           badge:'HOT', accentColor:'#FF006E', config:{links:['github','blog','email','kakao']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:link' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'링크 모음', handle:'' } },
      { id:'b3', type:'links',  data:{ items:[{ type:'github', url:'' },{ type:'blog', url:'' },{ type:'email', url:'' },{ type:'kakao', url:'' }] } },
    ]
  },
  { id:'links-07', type:'links', theme:'links-bordered',      layout:'links-layout', title:'Bordered',       desc:'테두리 강조, 호버 시 채워지는 버튼',           badge:null,  accentColor:'#4285F4', config:{links:['github','blog','linkedin']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:link' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'링크 모음', handle:'' } },
      { id:'b3', type:'links',  data:{ items:[{ type:'github', url:'' },{ type:'blog', url:'' },{ type:'linkedin', url:'' }] } },
    ]
  },
  { id:'links-08', type:'links', theme:'links-social-pack',   layout:'links-layout', title:'Social Pack',    desc:'SNS 브랜드 컬러 자동 적용 패키지',             badge:null,  accentColor:'#1DA1F2', config:{links:['github','twitter','instagram','youtube','twitch']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:link' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'링크 모음', handle:'' } },
      { id:'b3', type:'links',  data:{ items:[{ type:'github', url:'' },{ type:'twitter', url:'' },{ type:'instagram', url:'' },{ type:'youtube', url:'' },{ type:'twitch', url:'' }] } },
    ]
  },
  { id:'links-09', type:'links', theme:'links-contact-card',  layout:'links-layout', title:'Contact Card',   desc:'연락처 카드 스타일, 이메일+채팅 특화',         badge:null,  accentColor:'#34A853', config:{links:['email','kakao','discord','notion']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:link' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'링크 모음', handle:'' } },
      { id:'b3', type:'links',  data:{ items:[{ type:'email', url:'' },{ type:'kakao', url:'' },{ type:'discord', url:'' },{ type:'notion', url:'' }] } },
    ]
  },
  { id:'links-10', type:'links', theme:'links-dev-hub',       layout:'links-layout', title:'Dev Hub',        desc:'개발자 필수 링크 허브 — 블로그+포폴+깃헙',     badge:null,  accentColor:'#181717', config:{links:['github','blog','portfolio','npm','notion']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:link' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'링크 모음', handle:'' } },
      { id:'b3', type:'links',  data:{ items:[{ type:'github', url:'' },{ type:'blog', url:'' },{ type:'portfolio', url:'' },{ type:'npm', url:'' },{ type:'notion', url:'' }] } },
    ]
  },

  /* ── BANNER (10) ─────────────────────────────────── */
  { id:'banner-01', featured:true, type:'banner', theme:'banner-wave-pink',      layout:'banner-layout', title:'Wave Pink',       desc:'capsule-render 핑크 웨이브 헤더',                badge:'NEW', accentColor:'#ED93B1', config:{text:'Hi! Welcome!',height:160},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:emoji' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Hi! Welcome!', role:'', handle:'' } },
      { id:'b3', type:'bio',    data:{ text:'GitHub 프로필에 오신 것을 환영합니다.' } },
    ]
  },
  { id:'banner-02', type:'banner', theme:'banner-wave-blue',      layout:'banner-layout', title:'Wave Blue',       desc:'capsule-render 블루 웨이브 헤더',                badge:null,  accentColor:'#4285F4', config:{text:'Hi! Welcome!',height:160},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:emoji' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Hi! Welcome!', role:'', handle:'' } },
      { id:'b3', type:'bio',    data:{ text:'GitHub 프로필에 오신 것을 환영합니다.' } },
    ]
  },
  { id:'banner-03', type:'banner', theme:'banner-slice-gradient', layout:'banner-layout', title:'Slice Gradient',  desc:'capsule-render slice + gradient 조합',           badge:null,  accentColor:'#9B8FE8', config:{text:"Hi! I'm Dev",height:160},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:emoji' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Hi! Welcome!', role:'', handle:'' } },
      { id:'b3', type:'bio',    data:{ text:'GitHub 프로필에 오신 것을 환영합니다.' } },
    ]
  },
  { id:'banner-04', type:'banner', theme:'banner-egg',            layout:'banner-layout', title:'Egg Shape',       desc:'capsule-render egg 타입 소프트 배너',            badge:null,  accentColor:'#ED93B1', config:{text:'Hello World!',height:200},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:emoji' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Hello World!', role:'', handle:'' } },
      { id:'b3', type:'bio',    data:{ text:'GitHub 프로필에 오신 것을 환영합니다.' } },
    ]
  },
  { id:'banner-05', type:'banner', theme:'banner-cylinder',       layout:'banner-layout', title:'Cylinder',        desc:'capsule-render cylinder, 3D감 곡선',             badge:null,  accentColor:'#7EC8E3', config:{text:"Let's Code!",height:150},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:emoji' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Hi! Welcome!', role:'', handle:'' } },
      { id:'b3', type:'bio',    data:{ text:'GitHub 프로필에 오신 것을 환영합니다.' } },
    ]
  },
  { id:'banner-06', type:'banner', theme:'banner-shark',          layout:'banner-layout', title:'Shark Dark',      desc:'capsule-render shark 타입 다크모드',             badge:null,  accentColor:'#aaa',    config:{text:'Full Stack Dev',height:160},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:emoji' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Full Stack Dev', role:'', handle:'' } },
      { id:'b3', type:'bio',    data:{ text:'GitHub 프로필에 오신 것을 환영합니다.' } },
    ]
  },
  { id:'banner-07', type:'creative', theme:'banner-divider-hits',   layout:'banner-layout', title:'Hits Counter',    desc:'seeyoufarm Hits 방문자 카운터 배지',             badge:'HOT', accentColor:'#34A853', config:{text:''},
    blocks:[
      { id:'b1', type:'hits', data:{ username:'' } },
    ]
  },
  { id:'banner-08', type:'banner', theme:'banner-typing',         layout:'banner-layout', title:'Typing SVG',      desc:'readme-typing-svg 애니메이션 타이핑 텍스트',    badge:null,  accentColor:'#4285F4', config:{text:"I'm a Developer;I love Open Source"},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:emoji' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Hi! Welcome!', role:'', handle:'' } },
      { id:'b3', type:'bio',    data:{ text:'GitHub 프로필에 오신 것을 환영합니다.' } },
    ]
  },
  { id:'banner-09', type:'creative', theme:'banner-github-trophy',  layout:'banner-layout', title:'GitHub Trophy',   desc:'github-profile-trophy 업적 배지 모음',           badge:null,  accentColor:'#FFD700', config:{text:''},
    blocks:[
      { id:'b1', type:'trophy', data:{ username:'' } },
    ]
  },


  /* ── NEW: CREATIVE & INTERACTIVE (7) ─────────────── */
  { id:'stats-11',   type:'stats',   theme:'glass-neon',    layout:'', title:'Glass Neon',     desc:'네온 글로우 + 글래스모피즘 조합 카드',      badge:'NEW', accentColor:'#9B8FE8', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-12',   type:'stats',   theme:'aurora',        layout:'', title:'Aurora',         desc:'오로라 그라디언트 풀 카드',                 badge:'NEW', accentColor:'#7EC8E3', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'stats-13',   type:'stats',   theme:'mono-border',   layout:'', title:'Mono Border',    desc:'흑백 굵은 테두리, 타이포 중심 카드',        badge:null,  accentColor:'#08080F', config:{stats:['Stars','Repos','Active']},
    blocks:[
      { id:'b1', type:'avatar', data:{ emoji:'fluent:person' } },
      { id:'b2', type:'name',   data:{ username:'', name:'Your Name', role:'Developer', handle:'@id' } },
      { id:'b3', type:'stats',  data:{ items:[{ label:'Stars', val:'1.2k' },{ label:'Repos', val:'40' },{ label:'Active', val:'98%' }] } },
    ]
  },
  { id:'links-11',   type:'creative', theme:'coffee-meter',  layout:'links-layout', title:'Today Fuel',    desc:'오늘 마신 커피/음료 잔 수 카운터 뱃지',     badge:null,  accentColor:'#6f4e37', config:{links:['kakao']},
    blocks:[
      { id:'b1', type:'coffee', data:{ cups:'2', maxCups:'4' } },
    ]
  },
  { id:'banner-11',  type:'creative', theme:'premium-hit',   layout:'banner-layout', title:'Premium Hit',  desc:'세련된 타이포그래피 유리 질감 카운터',      badge:'NEW', accentColor:'#4285F4', config:{text:'Visitors',height:100},
    blocks:[
      { id:'b1', type:'hits', data:{ username:'' } },
    ]
  },
/* ── VIBE (15) ───────────────────────────────────── */
// 라이프스타일
{ id:'vibe-lifestyle-glass', type:'vibe', theme:'badge-glass',   layout:'tech-layout', title:'라이프스타일 Glass',  desc:'Night Owl · Coffee · 고양이 집사 배지 세트', badge:'NEW', accentColor:'#9B8FE8', config:{stack:['Night Owl 🦉','Coffee ×3 ☕','고양이 집사 🐱']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['Night Owl 🦉','Coffee ×3 ☕','고양이 집사 🐱'] } },
    ]
  },
{ id:'vibe-lifestyle-dark',  type:'vibe', theme:'badge-dark-pro', layout:'tech-layout', title:'라이프스타일 Dark',   desc:'다크 코드 에디터 스타일 라이프스타일 배지',   badge:null,  accentColor:'#a0d0ff', config:{stack:['Night Owl 🦉','Coffee ×3 ☕','고양이 집사 🐱']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['Night Owl 🦉','Coffee ×3 ☕','고양이 집사 🐱'] } },
    ]
  },
{ id:'vibe-lifestyle-neu',   type:'vibe', theme:'badge-soft',     layout:'tech-layout', title:'라이프스타일 Soft',   desc:'소프트 뉴모피즘 라이프스타일 배지',           badge:null,  accentColor:'#ED93B1', config:{stack:['Night Owl 🦉','Coffee ×3 ☕','고양이 집사 🐱']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['Night Owl 🦉','Coffee ×3 ☕','고양이 집사 🐱'] } },
    ]
  },
// 커리어 성향
{ id:'vibe-career-glass',    type:'vibe', theme:'badge-glass',   layout:'tech-layout', title:'커리어 성향 Glass',   desc:'Refactoring Lover · Unit Test · Docs Master', badge:null,  accentColor:'#4285F4', config:{stack:['Refactoring Lover','Unit Test 100%','Docs Master']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['Refactoring Lover','Unit Test 100%','Docs Master'] } },
    ]
  },
{ id:'vibe-career-dark',     type:'vibe', theme:'badge-dark-pro', layout:'tech-layout', title:'커리어 성향 Dark',    desc:'다크 테마 커리어 성향 배지 세트',             badge:null,  accentColor:'#a0d0ff', config:{stack:['Refactoring Lover','Unit Test 100%','Docs Master']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['Refactoring Lover','Unit Test 100%','Docs Master'] } },
    ]
  },
{ id:'vibe-career-neu',      type:'vibe', theme:'badge-soft',     layout:'tech-layout', title:'커리어 성향 Soft',    desc:'소프트 뉴모피즘 커리어 성향 배지',            badge:null,  accentColor:'#7EC8E3', config:{stack:['Refactoring Lover','Unit Test 100%','Docs Master']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['Refactoring Lover','Unit Test 100%','Docs Master'] } },
    ]
  },
// 협업 스타일
{ id:'vibe-collab-glass',    type:'vibe', theme:'badge-pastel',  layout:'tech-layout', title:'협업 스타일 Pastel',  desc:'PR Welcome · Code Review · 리모트 지향 배지', badge:null,  accentColor:'#34A853', config:{stack:['PR Welcome 🙏','Code Review 환영','리모트 지향 🏠']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['PR Welcome 🙏','Code Review 환영','리모트 지향 🏠'] } },
    ]
  },
{ id:'vibe-collab-dark',     type:'vibe', theme:'badge-dark-pro', layout:'tech-layout', title:'협업 스타일 Dark',    desc:'다크 테마 협업 스타일 배지 세트',             badge:null,  accentColor:'#a0d0ff', config:{stack:['PR Welcome 🙏','Code Review 환영','리모트 지향 🏠']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['PR Welcome 🙏','Code Review 환영','리모트 지향 🏠'] } },
    ]
  },
{ id:'vibe-collab-neu',      type:'vibe', theme:'badge-soft',     layout:'tech-layout', title:'협업 스타일 Soft',    desc:'소프트 뉴모피즘 협업 스타일 배지',            badge:null,  accentColor:'#ED93B1', config:{stack:['PR Welcome 🙏','Code Review 환영','리모트 지향 🏠']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['PR Welcome 🙏','Code Review 환영','리모트 지향 🏠'] } },
    ]
  },
// 개발자 유머
{ id:'vibe-humor-glass',     type:'vibe', theme:'badge-glass',   layout:'tech-layout', title:'개발자 유머 Glass',   desc:'Bug Hunter · I Hate Legacy · 1일 1커밋 배지', badge:'HOT', accentColor:'#EA4335', config:{stack:['Bug Hunter 🐛','I Hate Legacy 😤','1일 1커밋 🌱']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['Bug Hunter 🐛','I Hate Legacy 😤','1일 1커밋 🌱'] } },
    ]
  },
{ id:'vibe-humor-dark',      type:'vibe', theme:'badge-dark-pro', layout:'tech-layout', title:'개발자 유머 Dark',    desc:'다크 테마 개발자 유머 배지 세트',             badge:null,  accentColor:'#a0d0ff', config:{stack:['Bug Hunter 🐛','I Hate Legacy 😤','1일 1커밋 🌱']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['Bug Hunter 🐛','I Hate Legacy 😤','1일 1커밋 🌱'] } },
    ]
  },
{ id:'vibe-humor-neu',       type:'vibe', theme:'badge-soft',     layout:'tech-layout', title:'개발자 유머 Soft',    desc:'소프트 뉴모피즘 개발자 유머 배지',            badge:null,  accentColor:'#FBBC05', config:{stack:['Bug Hunter 🐛','I Hate Legacy 😤','1일 1커밋 🌱']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['Bug Hunter 🐛','I Hate Legacy 😤','1일 1커밋 🌱'] } },
    ]
  },
// Daily Status
{ id:'vibe-status-glass', featured:true,    type:'vibe', theme:'badge-glass',   layout:'tech-layout', title:'Daily Status Glass',  desc:'지금은 집중 모드 · 커피 브레이크 · 마감 임박', badge:'NEW', accentColor:'#9B8FE8', config:{stack:['지금은 집중 모드 🤫','커피 브레이크 ☕','마감 임박 🔥']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['지금은 집중 모드 🤫','커피 브레이크 ☕','마감 임박 🔥'] } },
    ]
  },
{ id:'vibe-status-dark',     type:'vibe', theme:'badge-dark-pro', layout:'tech-layout', title:'Daily Status Dark',   desc:'다크 테마 데일리 상태 배지',                  badge:null,  accentColor:'#a0d0ff', config:{stack:['지금은 집중 모드 🤫','커피 브레이크 ☕','마감 임박 🔥']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['지금은 집중 모드 🤫','커피 브레이크 ☕','마감 임박 🔥'] } },
    ]
  },
{ id:'vibe-status-neu',      type:'vibe', theme:'badge-soft',     layout:'tech-layout', title:'Daily Status Soft',   desc:'소프트 뉴모피즘 데일리 상태 배지',            badge:null,  accentColor:'#ED93B1', config:{stack:['지금은 집중 모드 🤫','커피 브레이크 ☕','마감 임박 🔥']},
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'My Vibe', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'tech', techs:['지금은 집중 모드 🤫','커피 브레이크 ☕','마감 임박 🔥'] } },
    ]
  },

];

/* ═══════════════════════════════════════════════════════════════
   ReadMe.kit — templates-identity-patch.js
   Identity 카테고리 신규 템플릿 데이터
   ─────────────────────────────────────────────────────────────
   [사용법] templates.js 하단에 아래 한 줄 추가:
     if (typeof IDENTITY_TEMPLATES !== 'undefined')
       TEMPLATES.push(...IDENTITY_TEMPLATES);
   또는 templates.js 안에 직접 병합(TEMPLATES 배열에 spread)
   ═══════════════════════════════════════════════════════════════ */

const IDENTITY_TEMPLATES = [

  /* ── MBTI 배지 ────────────────────────────────────────────── */
  {
    id: 'mbti-enfp',
    type: 'identity',
    subtype: 'mbti',
    theme: 'identity-mbti-nf',
    title: 'MBTI — ENFP',
    desc: '활기찬 운동가형. NF 계열 민트 그린 배지',
    badge: 'NEW',
    mbtiType: 'ENFP',
    accentColor: '#00C9A7',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'mbti', mbti:'ENFP' } },
    ]
  },
  {
    id: 'mbti-intj',
    type: 'identity',
    subtype: 'mbti',
    theme: 'identity-mbti-nt',
    title: 'MBTI — INTJ',
    desc: '전략가형. NT 계열 딥 퍼플 배지',
    badge: 'NEW',
    mbtiType: 'INTJ',
    accentColor: '#483D8B',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'mbti', mbti:'INTJ' } },
    ]
  },
  {
    id: 'mbti-infj',
    type: 'identity',
    subtype: 'mbti',
    theme: 'identity-mbti-nf',
    title: 'MBTI — INFJ',
    desc: '통찰력 있는 내향형 감성인. NF 계열 배지',
    mbtiType: 'INFJ',
    accentColor: '#2E8B57',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'mbti', mbti:'INFJ' } },
    ]
  },
  {
    id: 'mbti-entp',
    type: 'identity',
    subtype: 'mbti',
    theme: 'identity-mbti-nt',
    title: 'MBTI — ENTP',
    desc: '논쟁형 혁신가. NT 계열 퍼플 배지',
    mbtiType: 'ENTP',
    accentColor: '#7B68EE',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'mbti', mbti:'ENTP' } },
    ]
  },
  {
    id: 'mbti-infp',
    type: 'identity',
    subtype: 'mbti',
    theme: 'identity-mbti-nf',
    title: 'MBTI — INFP',
    desc: '잔잔한 열정의 중재자형. NF 계열 배지',
    mbtiType: 'INFP',
    accentColor: '#3CB371',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'mbti', mbti:'INFP' } },
    ]
  },
  {
    id: 'mbti-entj',
    type: 'identity',
    subtype: 'mbti',
    theme: 'identity-mbti-nt',
    title: 'MBTI — ENTJ',
    desc: '대담한 통솔자형. NT 계열 배지',
    mbtiType: 'ENTJ',
    accentColor: '#6A5ACD',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'mbti', mbti:'ENTJ' } },
    ]
  },
  {
    id: 'mbti-intp',
    type: 'identity',
    subtype: 'mbti',
    theme: 'identity-mbti-nt',
    title: 'MBTI — INTP',
    desc: '아이디어 뱅크 논리술사형. NT 계열 배지',
    mbtiType: 'INTP',
    accentColor: '#9370DB',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'mbti', mbti:'INTP' } },
    ]
  },
  {
    id: 'mbti-pack', featured:true,
    type: 'identity',
    subtype: 'mbti',
    theme: 'identity-mbti-pack',
    title: 'MBTI 커스텀 팩',
    desc: '16종 전체 선택 가능. 타입별 색상 자동 배정',
    badge: 'HOT',
    accentColor: '#9B8FE8',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'mbti', mbti:'ENFP' } },
    ]
  },

  /* ── 현재 상태 배지 ───────────────────────────────────────── */
  {
    id: 'status-coding',
    type: 'identity',
    subtype: 'status',
    theme: 'identity-status-green',
    title: '현재 상태 — Coding',
    desc: '🟢 지금 코딩 중임을 알리는 상태 배지',
    badge: 'NEW',
    statusEmoji: '🟢',
    statusMsg: 'Coding',
    accentColor: '#34A853',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'status', statusEmoji:'🟢', statusMsg:'Coding', statusColor:'#34A853' } },
    ]
  },
  {
    id: 'status-focus',
    type: 'identity',
    subtype: 'status',
    theme: 'identity-status-purple',
    title: '현재 상태 — Deep Focus',
    desc: '🎧 방해 금지 모드. 집중 상태 배지',
    statusEmoji: '🎧',
    statusMsg: 'Deep Focus',
    accentColor: '#7B68EE',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'status', statusEmoji:'🎧', statusMsg:'Deep Focus', statusColor:'#7B68EE' } },
    ]
  },
  {
    id: 'status-coffee',
    type: 'identity',
    subtype: 'status',
    theme: 'identity-status-brown',
    title: '현재 상태 — Coffee Break',
    desc: '☕ 잠깐 쉬는 중. 개발자 감성 배지',
    statusEmoji: '☕',
    statusMsg: 'Coffee Break',
    accentColor: '#8B5A2B',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'status', statusEmoji:'☕', statusMsg:'Coffee Break', statusColor:'#8B5A2B' } },
    ]
  },
  {
    id: 'status-night',
    type: 'identity',
    subtype: 'status',
    theme: 'identity-status-dark',
    title: '현재 상태 — Night Shift',
    desc: '🌙 밤새 코딩하는 개발자 배지',
    statusEmoji: '🌙',
    statusMsg: 'Night Shift',
    accentColor: '#2D1F42',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'status', statusEmoji:'🌙', statusMsg:'Night Shift', statusColor:'#2D1F42' } },
    ]
  },
  {
    id: 'status-debug',
    type: 'identity',
    subtype: 'status',
    theme: 'identity-status-red',
    title: '현재 상태 — Debugging',
    desc: '🐛 버그와 싸우는 중. 공감 100% 배지',
    badge: 'HOT',
    statusEmoji: '🐛',
    statusMsg: 'Debugging',
    accentColor: '#EA4335',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'status', statusEmoji:'🐛', statusMsg:'Debugging', statusColor:'#EA4335' } },
    ]
  },
  {
    id: 'status-ship',
    type: 'identity',
    subtype: 'status',
    theme: 'identity-status-orange',
    title: '현재 상태 — Shipping',
    desc: '🚀 배포 직전 긴장감. 개발자 배지',
    statusEmoji: '🚀',
    statusMsg: 'Shipping',
    accentColor: '#FF8C00',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'status', statusEmoji:'🚀', statusMsg:'Shipping', statusColor:'#FF8C00' } },
    ]
  },
  {
    id: 'status-review',
    type: 'identity',
    subtype: 'status',
    theme: 'identity-status-blue',
    title: '현재 상태 — Code Review',
    desc: '📝 코드 리뷰 중. PR 오픈 상태 배지',
    statusEmoji: '📝',
    statusMsg: 'Code Review',
    accentColor: '#4285F4',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'status', statusEmoji:'📝', statusMsg:'Code Review', statusColor:'#4285F4' } },
    ]
  },
  {
    id: 'status-afk',
    type: 'identity',
    subtype: 'status',
    theme: 'identity-status-gray',
    title: '현재 상태 — AFK',
    desc: '💤 자리 비움. 잠시 없는 상태 배지',
    statusEmoji: '💤',
    statusMsg: 'AFK',
    accentColor: '#64748B',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'status', statusEmoji:'💤', statusMsg:'AFK', statusColor:'#64748B' } },
    ]
  },

  /* ── 역할 배지 ────────────────────────────────────────────── */
  {
    id: 'role-frontend',
    type: 'identity',
    subtype: 'role',
    theme: 'identity-role-blue',
    title: '역할 — Frontend Dev',
    desc: '브라우저를 주무르는 프론트 개발자 배지',
    roleIcon: '🌐',
    roleMsg: 'Frontend Dev',
    accentColor: '#4285F4',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'role', roleIcon:'🌐', roleMsg:'Frontend Dev', roleColor:'#4285F4' } },
    ]
  },
  {
    id: 'role-backend',
    type: 'identity',
    subtype: 'role',
    theme: 'identity-role-green',
    title: '역할 — Backend Dev',
    desc: '서버와 DB를 다루는 백엔드 개발자 배지',
    roleIcon: '⚙️',
    roleMsg: 'Backend Dev',
    accentColor: '#34A853',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'role', roleIcon:'⚙️', roleMsg:'Backend Dev', roleColor:'#34A853' } },
    ]
  },
  {
    id: 'role-fullstack',
    type: 'identity',
    subtype: 'role',
    theme: 'identity-role-purple',
    title: '역할 — Full Stack',
    desc: '전방위 개발자. 뭐든 됩니다 배지',
    badge: 'HOT',
    roleIcon: '💫',
    roleMsg: 'Full Stack Dev',
    accentColor: '#7B68EE',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'role', roleIcon:'💫', roleMsg:'Full Stack Dev', roleColor:'#7B68EE' } },
    ]
  },
  {
    id: 'role-designer',
    type: 'identity',
    subtype: 'role',
    theme: 'identity-role-pink',
    title: '역할 — UX Designer',
    desc: '사용자 경험을 설계하는 디자이너 배지',
    badge: 'NEW',
    roleIcon: '🎨',
    roleMsg: 'UX Designer',
    accentColor: '#ED93B1',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'role', roleIcon:'🎨', roleMsg:'UX Designer', roleColor:'#ED93B1' } },
    ]
  },
  {
    id: 'role-devops',
    type: 'identity',
    subtype: 'role',
    theme: 'identity-role-orange',
    title: '역할 — DevOps',
    desc: 'CI/CD 파이프라인 인프라 엔지니어 배지',
    roleIcon: '🔧',
    roleMsg: 'DevOps Eng.',
    accentColor: '#FF8C00',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'role', roleIcon:'🔧', roleMsg:'DevOps Eng.', roleColor:'#FF8C00' } },
    ]
  },
  {
    id: 'role-ml',
    type: 'identity',
    subtype: 'role',
    theme: 'identity-role-red',
    title: '역할 — ML Engineer',
    desc: 'AI·ML 모델을 학습시키는 엔지니어 배지',
    roleIcon: '🤖',
    roleMsg: 'ML Engineer',
    accentColor: '#EA4335',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'role', roleIcon:'🤖', roleMsg:'ML Engineer', roleColor:'#EA4335' } },
    ]
  },
  {
    id: 'role-mobile',
    type: 'identity',
    subtype: 'role',
    theme: 'identity-role-teal',
    title: '역할 — Mobile Dev',
    desc: 'iOS / Android 모바일 개발자 배지',
    roleIcon: '📱',
    roleMsg: 'Mobile Dev',
    accentColor: '#00B4CC',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'role', roleIcon:'📱', roleMsg:'Mobile Dev', roleColor:'#00B4CC' } },
    ]
  },
  {
    id: 'role-security',
    type: 'identity',
    subtype: 'role',
    theme: 'identity-role-dark',
    title: '역할 — Security Eng.',
    desc: '보안 취약점을 찾는 시큐리티 엔지니어 배지',
    roleIcon: '🛡️',
    roleMsg: 'Security Eng.',
    accentColor: '#2D1F42',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'role', roleIcon:'🛡️', roleMsg:'Security Eng.', roleColor:'#2D1F42' } },
    ]
  },

  /* ── 개발자 바이브 배지 ──────────────────────────────────── */
  {
    id: 'vibe-nightowl',
    type: 'identity',
    subtype: 'vibe',
    theme: 'identity-vibe-dark',
    title: '바이브 — Night Owl 🦉',
    desc: '자정 이후에 더 예리해지는 개발자 배지',
    badge: 'NEW',
    vibeEmoji: '🦉',
    vibeMsg: 'Night Owl',
    accentColor: '#1a1a2e',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'vibe', vibeEmoji:'🦉', vibeMsg:'Night Owl', vibeColor:'#1a1a2e' } },
    ]
  },
  {
    id: 'vibe-remote',
    type: 'identity',
    subtype: 'vibe',
    theme: 'identity-vibe-green',
    title: '바이브 — Remote Worker 🏡',
    desc: '집이 곧 사무실. 원격 근무 개발자 배지',
    vibeEmoji: '🏡',
    vibeMsg: 'Remote Worker',
    accentColor: '#00C9A7',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'vibe', vibeEmoji:'🏡', vibeMsg:'Remote Worker', vibeColor:'#00C9A7' } },
    ]
  },
  {
    id: 'vibe-opensource',
    type: 'identity',
    subtype: 'vibe',
    theme: 'identity-vibe-orange',
    title: '바이브 — Open Source ❤️',
    desc: '오픈 소스로 세상을 바꾸는 개발자 배지',
    vibeEmoji: '❤️',
    vibeMsg: 'Open Source',
    accentColor: '#FF8C00',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'vibe', vibeEmoji:'❤️', vibeMsg:'Open Source', vibeColor:'#FF8C00' } },
    ]
  },
  {
    id: 'vibe-coffee',
    type: 'identity',
    subtype: 'vibe',
    theme: 'identity-vibe-brown',
    title: '바이브 — Coffee Addict ☕',
    desc: '커피가 곧 연료. 개발자 라이프 배지',
    vibeEmoji: '☕',
    vibeMsg: 'Coffee Addict',
    accentColor: '#8B5A2B',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'vibe', vibeEmoji:'☕', vibeMsg:'Coffee Addict', vibeColor:'#8B5A2B' } },
    ]
  },
  {
    id: 'vibe-darkmode',
    type: 'identity',
    subtype: 'vibe',
    theme: 'identity-vibe-dark2',
    title: '바이브 — Dark Mode Only 🌑',
    desc: '라이트 모드는 없다. 다크 전도사 배지',
    badge: 'HOT',
    vibeEmoji: '🌑',
    vibeMsg: 'Dark Mode Only',
    accentColor: '#000000',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'vibe', vibeEmoji:'🌑', vibeMsg:'Dark Mode Only', vibeColor:'#000000' } },
    ]
  },
  {
    id: 'vibe-keyboard',
    type: 'identity',
    subtype: 'vibe',
    theme: 'identity-vibe-slate',
    title: '바이브 — Keyboard Warrior ⌨️',
    desc: '마우스 없이도 살 수 있는 개발자 배지',
    vibeEmoji: '⌨️',
    vibeMsg: 'Keyboard Warrior',
    accentColor: '#64748B',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'vibe', vibeEmoji:'⌨️', vibeMsg:'Keyboard Warrior', vibeColor:'#64748B' } },
    ]
  },
  {
    id: 'vibe-git',
    type: 'identity',
    subtype: 'vibe',
    theme: 'identity-vibe-gray',
    title: '바이브 — Git Addict 🌿',
    desc: '하루에 커밋 10번. Git 없이 못 사는 배지',
    vibeEmoji: '🌿',
    vibeMsg: 'Git Addict',
    accentColor: '#F05032',
    blocks:[
      { id:'b1', type:'name',  data:{ username:'', name:'Your Name', role:'', handle:'' } },
      { id:'b2', type:'badge', data:{ type:'vibe', vibeEmoji:'🌿', vibeMsg:'Git Addict', vibeColor:'#F05032' } },
    ]
  },

];

/* ── 병합 실행 ───────────────────────────────────────────────── */
if (typeof TEMPLATES !== 'undefined') {
  TEMPLATES.push(...IDENTITY_TEMPLATES);
}

/* ── 헬퍼 함수 ───────────────────────────────────────── */
const getByType = (type) => type === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.type === type);
const getById   = (id)   => TEMPLATES.find(t => t.id === id);

/* ── 전역 노출 (Single Source of Truth) ─────────────── */
window.TEMPLATES         = TEMPLATES;
window.TEMPLATE_REGISTRY = TEMPLATES;
