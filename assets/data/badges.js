/* ═══════════════════════════════════════════════════════
   GitGloss — badges.js
   순수 뱃지(버튼) 템플릿 36종 정의 (shields.io 스타일 호환)
   ═══════════════════════════════════════════════════════ */

const BADGE_TEMPLATES = [
  /* Flat */
  { id: 'flat-github',  style: 'flat', service: 'github',  label: 'GitHub',  value: 'Follow' },
  { id: 'flat-react',   style: 'flat', service: 'react',   label: 'React',   value: 'v18.0' },
  { id: 'flat-vue',     style: 'flat', service: 'vue',     label: 'Vue.js',  value: 'v3.2' },
  { id: 'flat-python',  style: 'flat', service: 'python',  label: 'Python',  value: '3.10' },
  { id: 'flat-discord', style: 'flat', service: 'discord', label: 'Discord', value: 'Online' },
  { id: 'flat-npm',     style: 'flat', service: 'npm',     label: 'npm',     value: 'v8.5' },

  /* Gradient */
  { id: 'grad-github',  style: 'gradient', service: 'github',  label: 'GitHub',  value: 'Stars' },
  { id: 'grad-react',   style: 'gradient', service: 'react',   label: 'React',   value: 'Library' },
  { id: 'grad-vue',     style: 'gradient', service: 'vue',     label: 'Vue.js',  value: 'Framework' },
  { id: 'grad-python',  style: 'gradient', service: 'python',  label: 'Python',  value: 'Script' },
  { id: 'grad-discord', style: 'gradient', service: 'discord', label: 'Discord', value: 'Chat' },
  { id: 'grad-npm',     style: 'gradient', service: 'npm',     label: 'npm',     value: 'Package' },

  /* Outline */
  { id: 'out-github',  style: 'outline', service: 'github',  label: 'GitHub',  value: 'Open' },
  { id: 'out-react',   style: 'outline', service: 'react',   label: 'React',   value: 'Light' },
  { id: 'out-vue',     style: 'outline', service: 'vue',     label: 'Vue.js',  value: 'Thin' },
  { id: 'out-python',  style: 'outline', service: 'python',  label: 'Python',  value: 'Clean' },
  { id: 'out-discord', style: 'outline', service: 'discord', label: 'Discord', value: 'Link' },
  { id: 'out-npm',     style: 'outline', service: 'npm',     label: 'npm',     value: 'Repo' },

  /* Glass */
  { id: 'glass-github',  style: 'glass', service: 'github',  label: 'GitHub',  value: 'Glass' },
  { id: 'glass-react',   style: 'glass', service: 'react',   label: 'React',   value: 'Frost' },
  { id: 'glass-vue',     style: 'glass', service: 'vue',     label: 'Vue.js',  value: 'Crystal' },
  { id: 'glass-python',  style: 'glass', service: 'python',  label: 'Python',  value: 'Blur' },
  { id: 'glass-discord', style: 'glass', service: 'discord', label: 'Discord', value: 'Sleek' },
  { id: 'glass-npm',     style: 'glass', service: 'npm',     label: 'npm',     value: 'Modern' },

  /* Pill */
  { id: 'pill-github',  style: 'pill', service: 'github',  label: 'GitHub',  value: 'Pill' },
  { id: 'pill-react',   style: 'pill', service: 'react',   label: 'React',   value: 'Round' },
  { id: 'pill-vue',     style: 'pill', service: 'vue',     label: 'Vue.js',  value: 'Circle' },
  { id: 'pill-python',  style: 'pill', service: 'python',  label: 'Python',  value: 'Soft' },
  { id: 'pill-discord', style: 'pill', service: 'discord', label: 'Discord', value: 'Bub' },
  { id: 'pill-npm',     style: 'pill', service: 'npm',     label: 'npm',     value: 'Core' },

  /* Square */
  { id: 'sq-github',  style: 'square', service: 'github',  label: 'GitHub',  value: 'Sq' },
  { id: 'sq-react',   style: 'square', service: 'react',   label: 'React',   value: 'Box' },
  { id: 'sq-vue',     style: 'square', service: 'vue',     label: 'Vue.js',  value: 'Grid' },
  { id: 'sq-python',  style: 'square', service: 'python',  label: 'Python',  value: 'Hard' },
  { id: 'sq-discord', style: 'square', service: 'discord', label: 'Discord', value: 'Dev' },
  { id: 'sq-npm',     style: 'square', service: 'npm',     label: 'npm',     value: 'Cli' },
];

/* ── 헬퍼 함수 ───────────────────────────────────────── */
const getBadgesByType = (type) => type === 'all' ? BADGE_TEMPLATES : BADGE_TEMPLATES.filter(b => b.style === type);
const getBadgeById    = (id)   => BADGE_TEMPLATES.find(b => b.id === id);

/* ── 서비스 데이터 ───────────────────────────────────── */
const SERVICES = {
  github:    { label: 'GitHub',    color: '#181717', text: '#ffffff', abbr: 'GH' },
  react:     { label: 'React',     color: '#61DAFB', text: '#000000', abbr: 'RE' },
  vue:       { label: 'Vue.js',    color: '#4FC08D', text: '#ffffff', abbr: 'VU' },
  python:    { label: 'Python',    color: '#3776AB', text: '#ffffff', abbr: 'PY' },
  notion:    { label: 'Notion',    color: '#000000', text: '#ffffff', abbr: 'NO' },
  discord:   { label: 'Discord',   color: '#5865F2', text: '#ffffff', abbr: 'DC' },
  npm:       { label: 'npm',       color: '#CB3837', text: '#ffffff', abbr: 'NP' },
  figma:     { label: 'Figma',     color: '#F24E1E', text: '#ffffff', abbr: 'FG' },
};
const getService = (id) => SERVICES[id] || SERVICES.github;

/* ── 스타일 목록 ─────────────────────────────────────── */
const BADGE_STYLES = [
  { id: 'flat',     name: 'Flat',     desc: '심플하고 깔끔한 Shields.io 기본 스타일' },
  { id: 'gradient', name: 'Gradient', desc: '세련된 그라디언트 포인트' },
  { id: 'outline',  name: 'Outline',  desc: '가볍고 세련된 라인 아트 스타일' },
  { id: 'glass',    name: 'Glass',    desc: '글래스모피즘 효과가 적용된 투명 배지' },
  { id: 'pill',     name: 'Pill',     desc: '둥근 캡슐 형태의 디자인' },
  { id: 'square',   name: 'Square',   desc: '고전적인 레트로 사각형 배지' },
];

/* ── 컬러 프리셋 ─────────────────────────────────────── */
const COLOR_PRESETS = [
  { name: 'Dark',   color: '#181717' },
  { name: 'Blue',   color: '#4285F4' },
  { name: 'Green',  color: '#34A853' },
  { name: 'Red',    color: '#EA4335' },
  { name: 'Yellow', color: '#FBBC05' },
  { name: 'Pink',   color: '#E83E8C' },
  { name: 'Purple', color: '#6f42c1' },
];
