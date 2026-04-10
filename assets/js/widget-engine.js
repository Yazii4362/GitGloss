// GitGloss Widget Engine — Cotton Candy Glass Design System

const THEMES = {
  'cotton-candy': {
    bg:         'rgba(255, 255, 255, 0.42)',
    bgSolid:    '#FDF0F6',
    border:     'rgba(237, 147, 177, 0.42)',
    accent:     '#ED93B1',
    accentAlt:  '#9B8FE8',
    accentGlow: 'rgba(237, 147, 177, 0.30)',
    text:       '#2D1F42',
    textSub:    'rgba(45, 31, 66, 0.58)',
    gradStart:  '#ED93B1',
    gradEnd:    '#9B8FE8',
    blur:       true,
    shadow:     '0 4px 20px rgba(155,143,232,0.18)'
  },
  'cotton-dark': {
    bg:         'rgba(45, 31, 66, 0.65)',
    bgSolid:    '#2D1F42',
    border:     'rgba(237, 147, 177, 0.28)',
    accent:     '#ED93B1',
    accentAlt:  '#C8B8F0',
    accentGlow: 'rgba(200, 184, 240, 0.25)',
    text:       '#FDF0F6',
    textSub:    'rgba(253, 240, 246, 0.60)',
    gradStart:  '#C8B8F0',
    gradEnd:    '#ED93B1',
    blur:       true,
    shadow:     '0 4px 20px rgba(45,31,66,0.50)'
  },
  'neumorphic-candy': {
    bg:         '#F0E6F0',
    bgSolid:    '#F0E6F0',
    border:     'transparent',
    accent:     '#9B8FE8',
    accentAlt:  '#ED93B1',
    accentGlow: 'rgba(155, 143, 232, 0.18)',
    text:       '#2D1F42',
    textSub:    'rgba(45, 31, 66, 0.55)',
    gradStart:  '#9B8FE8',
    gradEnd:    '#ED93B1',
    shadow1:    '#D4BED4',
    shadow2:    '#FFFFFF',
    blur:       false,
    shadow:     '6px 6px 14px rgba(183,140,172,0.35), -6px -6px 14px rgba(255,255,255,0.85)'
  }
};

// ── Shared SVG defs builder ──
function buildDefs(theme) {
  return `
    <defs>
      <linearGradient id="candyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   style="stop-color:${theme.gradStart};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:${theme.gradEnd};stop-opacity:1"/>
      </linearGradient>
      <linearGradient id="glassBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   style="stop-color:rgba(255,255,255,0.18);stop-opacity:1"/>
        <stop offset="100%" style="stop-color:rgba(255,255,255,0.06);stop-opacity:1"/>
      </linearGradient>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8"/>
      </filter>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="${theme.accentGlow}"/>
      </filter>
    </defs>`;
}

// ── Badge pill fill by theme ──
function badgeFill(themeName) {
  if (themeName === 'cotton-candy')    return { fill: 'rgba(237,147,177,0.18)', stroke: 'rgba(237,147,177,0.42)' };
  if (themeName === 'cotton-dark')     return { fill: 'rgba(200,184,240,0.22)', stroke: 'rgba(200,184,240,0.40)' };
  if (themeName === 'neumorphic-candy') return { fill: '#F0E6F0', stroke: 'none', filter: 'url(#shadow)' };
  return { fill: 'rgba(237,147,177,0.18)', stroke: 'rgba(237,147,177,0.42)' };
}

// ── generateBadgeSVG ──
function generateBadgeSVG({ techs = [], themeName = 'cotton-candy', width = 480 } = {}) {
  const theme = THEMES[themeName] || THEMES['cotton-candy'];
  const pill = badgeFill(themeName);
  const pillW = 80, pillH = 24, gap = 10, startX = 16, startY = 38;
  const rows = Math.ceil(techs.length / 5);
  const height = 32 + rows * (pillH + gap) + 16;

  const pills = techs.map((tech, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = startX + col * (pillW + gap);
    const y = startY + row * (pillH + gap);
    return `
      <rect x="${x}" y="${y}" width="${pillW}" height="${pillH}" rx="12"
        fill="${pill.fill}" stroke="${pill.stroke}" stroke-width="0.5"
        ${pill.filter ? `filter="${pill.filter}"` : ''}/>
      <text x="${x + pillW/2}" y="${y + 15}" text-anchor="middle"
        font-family="'Pretendard','Noto Sans KR',sans-serif" font-size="11"
        font-weight="600" fill="${theme.text}">${tech}</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    ${buildDefs(theme)}
    <!-- Background -->
    <rect width="${width}" height="${height}" rx="16" fill="${theme.bg}" stroke="${theme.border}" stroke-width="0.5"/>
    <!-- Header bar -->
    <rect width="${width}" height="28" rx="16" fill="url(#candyGrad)"/>
    <rect y="12" width="${width}" height="16" fill="url(#candyGrad)"/>
    <text x="14" y="19" font-family="'Pretendard','Noto Sans KR',sans-serif"
      font-size="11" font-weight="700" fill="#fff" letter-spacing="0.06em">TECH STACK</text>
    ${pills}
  </svg>`;
}

// ── generateProfileSVG ──
function generateProfileSVG({ username = 'octocat', name = '', bio = '', themeName = 'cotton-candy', width = 480 } = {}) {
  const theme = THEMES[themeName] || THEMES['cotton-candy'];
  const height = 160;
  const displayName = name || username;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    ${buildDefs(theme)}
    <rect width="${width}" height="${height}" rx="16" fill="${theme.bg}" stroke="${theme.border}" stroke-width="0.5"/>
    <!-- Avatar circle -->
    <circle cx="56" cy="80" r="36" fill="url(#candyGrad)"/>
    <circle cx="56" cy="80" r="34" fill="${theme.bgSolid}" opacity="0.3"/>
    <text x="56" y="86" text-anchor="middle"
      font-family="'Pretendard','Noto Sans KR',sans-serif"
      font-size="22" font-weight="900" fill="#fff">${displayName.charAt(0).toUpperCase()}</text>
    <!-- Name -->
    <text x="108" y="68" font-family="'Pretendard','Noto Sans KR',sans-serif"
      font-size="16" font-weight="800" fill="${theme.text}">${displayName}</text>
    <text x="108" y="86" font-family="'Pretendard','Noto Sans KR',sans-serif"
      font-size="11" fill="${theme.textSub}">@${username}</text>
    ${bio ? `<text x="108" y="106" font-family="'Pretendard','Noto Sans KR',sans-serif"
      font-size="11" fill="${theme.textSub}">${bio.slice(0, 50)}</text>` : ''}
    <!-- Accent bar -->
    <rect x="108" y="118" width="120" height="3" rx="2" fill="url(#candyGrad)"/>
  </svg>`;
}

// ── generateStatsSVG ──
function generateStatsSVG({ username = 'octocat', stars = 0, commits = 0, repos = 0, themeName = 'cotton-candy', width = 480 } = {}) {
  const theme = THEMES[themeName] || THEMES['cotton-candy'];
  const height = 200;
  const stats = [
    { label: 'Stars',   value: stars   > 999 ? (stars/1000).toFixed(1)+'k'   : stars },
    { label: 'Commits', value: commits > 999 ? (commits/1000).toFixed(1)+'k' : commits },
    { label: 'Repos',   value: repos }
  ];
  const colW = (width - 32) / 3;

  const statCols = stats.map((s, i) => {
    const x = 16 + i * colW;
    return `
      <rect x="${x + 4}" y="60" width="${colW - 8}" height="100" rx="12"
        fill="${theme.bg}" stroke="${theme.border}" stroke-width="0.5"/>
      <text x="${x + colW/2}" y="108" text-anchor="middle"
        font-family="'Pretendard','Noto Sans KR',sans-serif"
        font-size="28" font-weight="900" fill="${theme.accent}">${s.value}</text>
      <text x="${x + colW/2}" y="128" text-anchor="middle"
        font-family="'Pretendard','Noto Sans KR',sans-serif"
        font-size="10" fill="${theme.textSub}">${s.label}</text>
      <!-- Bar -->
      <rect x="${x + 20}" y="148" width="${colW - 48}" height="4" rx="2" fill="url(#candyGrad)"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    ${buildDefs(theme)}
    <rect width="${width}" height="${height}" rx="16" fill="${theme.bg}" stroke="${theme.border}" stroke-width="0.5"/>
    <!-- Header -->
    <rect width="${width}" height="52" rx="16" fill="url(#candyGrad)"/>
    <rect y="36" width="${width}" height="16" fill="url(#candyGrad)"/>
    <text x="16" y="32" font-family="'Pretendard','Noto Sans KR',sans-serif"
      font-size="14" font-weight="800" fill="#fff">${username}</text>
    <text x="${width - 16}" y="32" text-anchor="end"
      font-family="'Pretendard','Noto Sans KR',sans-serif"
      font-size="10" fill="rgba(255,255,255,0.75)">GitHub Stats</text>
    ${statCols}
  </svg>`;
}

// Export
if (typeof module !== 'undefined') {
  module.exports = { THEMES, generateBadgeSVG, generateProfileSVG, generateStatsSVG };
}
