/* ═══════════════════════════════════════════════════════
   GitGloss — functions/api/widget.js
   Cloudflare Pages Function
   GET /api/widget?style=dark&accent=4285F4&name=야지&...
   → SVG 이미지 반환
   ═══════════════════════════════════════════════════════ */

export async function onRequest(context) {
  const url    = new URL(context.request.url);
  const p      = Object.fromEntries(url.searchParams.entries());

  const style      = p.style   || 'glass';
  const accent     = '#' + (p.accent || '4285F4').replace('#', '');
  const name       = decode(p.name   || '');
  const role       = decode(p.role   || '');
  const handle     = decode(p.handle || '');
  const bio        = decode(p.bio    || '');
  const emoji      = decode(p.emoji  || '👨‍💻');
  const gradPreset = p.grad || 'candy';

  const stats = p.stats
    ? decode(p.stats).split(',').map(s => { const [label,val]=s.split(':'); return {label:label||'',val:val||''}; })
    : [];

  const badges = p.badges ? decode(p.badges).split(',').filter(Boolean) : [];

  const [streakCur, streakLong, streakTotal] = p.streak ? decode(p.streak).split(':') : [];

  const links = p.links
    ? decode(p.links).split(',').map(l => {
        const idx=l.indexOf(':'); return {type:l.slice(0,idx), url:l.slice(idx+1)};
      }).filter(l => l.type && l.url)
    : [];

  const svg = buildSVG({ style, accent, name, role, handle, bio, emoji,
    stats, badges, streakCur, streakLong, streakTotal, links, gradPreset });

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function decode(str) {
  try { return decodeURIComponent(str); } catch { return str; }
}

/* ══════════════════════════════════════════════════════
   SVG 빌더
══════════════════════════════════════════════════════ */
function buildSVG(o) {
  const W = 480;
  let H = 28;
  if (o.emoji || o.name)              H += 64;
  if (o.bio)                          H += 40;
  if (o.stats?.length)                H += 80;
  if (o.streakCur)                    H += 100;
  if (o.badges?.length)               H += Math.ceil(o.badges.length/4)*32+8;
  if (o.links?.length)                H += Math.ceil(o.links.length/3)*36+8;
  H = Math.max(H, 120);

  const t = getTheme(o.style, o.accent, o.gradPreset);
  const blocks = [];
  let y = 28;

  if (o.emoji || o.name)  { blocks.push(nameBlock(o,y,t));   y+=64; }
  if (o.bio)              { blocks.push(bioBlock(o.bio,y,t)); y+=40; }
  if (o.stats?.length)    { blocks.push(statsBlock(o.stats,y,W,o.accent,t)); y+=80; }
  if (o.streakCur)        { blocks.push(streakBlock(o,y,W,o.accent,t)); y+=100; }
  if (o.badges?.length)   { blocks.push(badgesBlock(o.badges,y,o.accent,t)); y+=Math.ceil(o.badges.length/4)*32+8; }
  if (o.links?.length)    { blocks.push(linksBlock(o.links,y,W,t)); }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${x(o.name||'GitGloss')}">
<title>${x(o.name||'GitGloss Widget')}</title>
<defs>
  ${t.defs||''}
  <style>text{font-family:'Segoe UI','Noto Sans KR',sans-serif;}</style>
  <clipPath id="cc"><rect width="${W}" height="${H}" rx="20"/></clipPath>
</defs>
<g clip-path="url(#cc)">
  <rect width="${W}" height="${H}" rx="20" fill="${t.bg}" ${t.bgExtra||''}/>
  ${t.overlay||''}
</g>
<rect width="${W}" height="${H}" rx="20" fill="none" stroke="${t.border}" stroke-width="${t.bw||1}"/>
${blocks.join('\n')}
</svg>`;
}

function getTheme(style, accent, grad) {
  const G = {
    sunset:{from:'#FF6B6B',mid:'#FF8E53',to:'#FFE66D'},
    ocean:{from:'#2193b0',mid:'#4ab8d4',to:'#6dd5ed'},
    forest:{from:'#134E5E',mid:'#2d7a5a',to:'#71B280'},
    candy:{from:'#ED93B1',mid:'#c490cc',to:'#9B8FE8'},
    midnight:{from:'#0f0c29',mid:'#24243e',to:'#302b63'},
    aurora:{from:'#00C9FF',mid:'#4de8b0',to:'#92FE9D'},
  };
  switch(style) {
    case 'dark': return {
      bg:'#0D0714', border:'rgba(255,255,255,0.1)', bw:1,
      text:'#f0e6ff', sub:'rgba(240,230,255,0.55)', hint:'rgba(240,230,255,0.35)',
      sb:'rgba(255,255,255,0.06)', sbr:'rgba(255,255,255,0.1)',
      bb:ha(accent,0.15), bbr:ha(accent,0.3),
      overlay:`<rect width="480" height="1" y="0" fill="url(#dl)"/>`,
      defs:`<linearGradient id="dl" x1="0" x2="1"><stop offset="0%" stop-color="transparent"/><stop offset="50%" stop-color="${accent}" stop-opacity="0.6"/><stop offset="100%" stop-color="transparent"/></linearGradient>`,
    };
    case 'neu': return {
      bg:'#F0EAF5', border:'transparent', bw:0,
      text:'#3a2050', sub:'rgba(58,32,80,0.6)', hint:'rgba(58,32,80,0.4)',
      sb:'#F0EAF5', sbr:'transparent', bb:ha(accent,0.12), bbr:ha(accent,0.25),
      bgExtra:`filter="url(#ns)"`,
      defs:`<filter id="ns"><feDropShadow dx="4" dy="4" stdDeviation="6" flood-color="rgba(160,100,180,0.18)"/><feDropShadow dx="-4" dy="-4" stdDeviation="6" flood-color="rgba(255,255,255,0.9)"/></filter>`,
    };
    case 'border': return {
      bg:'#fff', border:accent, bw:2.5,
      text:'#08080F', sub:'rgba(8,8,15,0.65)', hint:'rgba(8,8,15,0.4)',
      sb:ha(accent,0.06), sbr:ha(accent,0.2), bb:ha(accent,0.1), bbr:ha(accent,0.25),
    };
    case 'gradient': {
      const g=G[grad]||G.candy;
      return {
        bg:'url(#gb)', border:'rgba(255,255,255,0.2)', bw:1,
        text:'#fff', sub:'rgba(255,255,255,0.8)', hint:'rgba(255,255,255,0.6)',
        sb:'rgba(255,255,255,0.2)', sbr:'rgba(255,255,255,0.3)',
        bb:'rgba(255,255,255,0.2)', bbr:'rgba(255,255,255,0.35)',
        defs:`<linearGradient id="gb" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${g.from}"/><stop offset="50%" stop-color="${g.mid}"/><stop offset="100%" stop-color="${g.to}"/></linearGradient>`,
      };
    }
    case 'minimal': return {
      bg:'#fff', border:'transparent', bw:0,
      text:'#08080F', sub:'rgba(8,8,15,0.65)', hint:'rgba(8,8,15,0.4)',
      sb:'rgba(0,0,0,0.03)', sbr:'rgba(0,0,0,0.08)', bb:'rgba(0,0,0,0.05)', bbr:'rgba(0,0,0,0.1)',
      overlay:`<rect x="0" y="0" width="480" height="4" fill="${accent}"/>`,
    };
    default: return { // glass
      bg:'rgba(255,255,255,0.85)', border:'rgba(255,255,255,0.6)', bw:1,
      text:'#08080F', sub:'rgba(8,8,15,0.65)', hint:'rgba(8,8,15,0.4)',
      sb:'rgba(255,255,255,0.9)', sbr:'rgba(0,0,0,0.06)', bb:ha(accent,0.12), bbr:ha(accent,0.3),
    };
  }
}

function nameBlock(o,y,t) {
  return `
<circle cx="52" cy="${y+24}" r="24" fill="${t.sb}" stroke="${t.sbr}" stroke-width="1"/>
<text x="52" y="${y+33}" text-anchor="middle" font-size="24">${x(o.emoji||'👨‍💻')}</text>
${o.name?`<text x="90" y="${y+18}" font-size="17" font-weight="700" fill="${t.text}">${x(o.name)}</text>`:''}
${o.role?`<text x="90" y="${y+36}" font-size="12" fill="${t.sub}">${x(o.role)}</text>`:''}
${o.handle?`<text x="90" y="${y+52}" font-size="11" fill="${t.hint}">${x(o.handle)}</text>`:''}`;
}

function bioBlock(bio,y,t) {
  return `<text x="28" y="${y+16}" font-size="12" fill="${t.sub}" font-style="italic">${x(bio.slice(0,60))}${bio.length>60?'...':''}</text>`;
}

function statsBlock(stats,y,W,accent,t) {
  const n=Math.min(stats.length,4), cw=(W-56)/n;
  return stats.slice(0,n).map((s,i)=>{
    const bx=28+i*cw;
    return `<rect x="${bx}" y="${y}" width="${cw-8}" height="64" rx="12" fill="${t.sb}" stroke="${t.sbr}" stroke-width="1"/>
<text x="${bx+(cw-8)/2}" y="${y+28}" text-anchor="middle" font-size="20" font-weight="700" fill="${accent}">${x(s.val)}</text>
<text x="${bx+(cw-8)/2}" y="${y+48}" text-anchor="middle" font-size="10" font-weight="600" fill="${t.hint}" letter-spacing="0.5">${x(s.label.toUpperCase())}</text>`;
  }).join('');
}

function streakBlock(o,y,W,accent,t) {
  const hw=(W-56)/2-4;
  return `<text x="${W/2}" y="${y+44}" text-anchor="middle" font-size="48" font-weight="800" fill="${accent}">${x(o.streakCur||'0')}</text>
<text x="${W/2}" y="${y+64}" text-anchor="middle" font-size="11" fill="${t.hint}" letter-spacing="1">DAY STREAK 🔥</text>
<rect x="28" y="${y+76}" width="${hw}" height="40" rx="10" fill="${t.sb}" stroke="${t.sbr}" stroke-width="1"/>
<text x="${28+hw/2}" y="${y+92}" text-anchor="middle" font-size="16" font-weight="700" fill="${t.text}">${x(o.streakLong||'0')}</text>
<text x="${28+hw/2}" y="${y+108}" text-anchor="middle" font-size="9" fill="${t.hint}">LONGEST</text>
<rect x="${W/2+4}" y="${y+76}" width="${hw}" height="40" rx="10" fill="${t.sb}" stroke="${t.sbr}" stroke-width="1"/>
<text x="${W/2+4+hw/2}" y="${y+92}" text-anchor="middle" font-size="16" font-weight="700" fill="${t.text}">${x(o.streakTotal||'0')}</text>
<text x="${W/2+4+hw/2}" y="${y+108}" text-anchor="middle" font-size="9" fill="${t.hint}">TOTAL</text>`;
}

function badgesBlock(badges,y,accent,t) {
  const bW=100,bH=26,gap=8,pr=4;
  return badges.map((tag,i)=>{
    const bx=28+(i%pr)*(bW+gap), by=y+Math.floor(i/pr)*(bH+gap);
    return `<rect x="${bx}" y="${by}" width="${bW}" height="${bH}" rx="13" fill="${t.bb}" stroke="${t.bbr}" stroke-width="1"/>
<text x="${bx+bW/2}" y="${by+17}" text-anchor="middle" font-size="11" font-weight="600" fill="${accent}">${x(tag)}</text>`;
  }).join('');
}

function linksBlock(links,y,W,t) {
  const C={github:'#181717',blog:'#20c997',email:'#EA4335',linkedin:'#0A66C2',twitter:'#000',instagram:'#E1306C',youtube:'#FF0000',discord:'#5865F2',notion:'#000',portfolio:'#4285F4'};
  const L={github:'GitHub',blog:'블로그',email:'Email',linkedin:'LinkedIn',twitter:'X/Twitter',instagram:'Instagram',youtube:'YouTube',discord:'Discord',notion:'Notion',portfolio:'Portfolio'};
  const pr=3, bW=(W-56-16)/3, bH=30;
  return links.map((lk,i)=>{
    const lx=28+(i%pr)*(bW+8), ly=y+Math.floor(i/pr)*(bH+8);
    const c=C[lk.type]||'#555', lb=L[lk.type]||lk.type;
    return `<rect x="${lx}" y="${ly}" width="${bW}" height="${bH}" rx="15" fill="${ha(c,0.1)}" stroke="${ha(c,0.25)}" stroke-width="1"/>
<text x="${lx+bW/2}" y="${ly+20}" text-anchor="middle" font-size="11" font-weight="700" fill="${c}">${x(lb)}</text>`;
  }).join('');
}

function ha(hex,a) {
  const h=hex.replace('#','');
  const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
  return isNaN(r)?`rgba(66,133,244,${a})`:`rgba(${r},${g},${b},${a})`;
}
function x(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
