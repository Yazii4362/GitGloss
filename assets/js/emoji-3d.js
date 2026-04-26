/* ═══════════════════════════════════════════════════════
   ReadMe.kit — emoji-3d.js
   Microsoft Fluent Emoji 3D (MIT) → jsDelivr CDN PNG
   유니코드 이모지를 깨지지 않는 3D PNG로 자동 변환
   ═══════════════════════════════════════════════════════ */
'use strict';

const EMOJI_3D_BASE = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/';

/* 프로젝트에서 실제로 사용되는 유니코드 이모지의
   Microsoft fluentui-emoji 저장소 폴더/파일 매핑.
   매핑이 없으면 onerror 폴백으로 원본 텍스트가 표시됨. */
const EMOJI_3D_MAP = {
  /* IDENTITY_STATUS_PRESETS */
  '🟢': 'Green%20circle/3D/green_circle_3d.png',
  '🎧': 'Headphone/3D/headphone_3d.png',
  '☕': 'Hot%20beverage/3D/hot_beverage_3d.png',
  '🌙': 'Crescent%20moon/3D/crescent_moon_3d.png',
  '🐛': 'Bug/3D/bug_3d.png',
  '🚀': 'Rocket/3D/rocket_3d.png',
  '📝': 'Memo/3D/memo_3d.png',
  '💤': 'Zzz/3D/zzz_3d.png',
  '🔥': 'Fire/3D/fire_3d.png',
  '🎯': 'Bullseye/3D/bullseye_3d.png',

  /* IDENTITY_ROLE_PRESETS */
  '🌐': 'Globe%20with%20meridians/3D/globe_with_meridians_3d.png',
  '⚙️': 'Gear/3D/gear_3d.png',
  '💫': 'Dizzy/3D/dizzy_3d.png',
  '🎨': 'Artist%20palette/3D/artist_palette_3d.png',
  '🔧': 'Wrench/3D/wrench_3d.png',
  '🤖': 'Robot/3D/robot_3d.png',
  '📱': 'Mobile%20phone/3D/mobile_phone_3d.png',
  '🛡️': 'Shield/3D/shield_3d.png',
  '✍️': 'Writing%20hand/Default/3D/writing_hand_3d_default.png',
  '📊': 'Bar%20chart/3D/bar_chart_3d.png',

  /* IDENTITY_VIBE_PRESETS */
  '🦉': 'Owl/3D/owl_3d.png',
  '🏡': 'House%20with%20garden/3D/house_with_garden_3d.png',
  '❤️': 'Red%20heart/3D/red_heart_3d.png',
  '🌑': 'New%20moon/3D/new_moon_3d.png',
  '⌨️': 'Keyboard/3D/keyboard_3d.png',
  '🌿': 'Herb/3D/herb_3d.png',
  '📦': 'Package/3D/package_3d.png',
  '🐧': 'Penguin/3D/penguin_3d.png',
  '⚡': 'High%20voltage/3D/high_voltage_3d.png',

  /* BLOCK_ADD_META */
  '👤': 'Bust%20in%20silhouette/3D/bust_in_silhouette_3d.png',
  '💬': 'Speech%20balloon/3D/speech_balloon_3d.png',
  '👁️': 'Eye/3D/eye_3d.png',
  '🏷️': 'Label/3D/label_3d.png',
  '🔗': 'Link/3D/link_3d.png',

  /* builder.html 인라인 */
  '🎉': 'Party%20popper/3D/party_popper_3d.png',
  '✨': 'Sparkles/3D/sparkles_3d.png',
  '🪪': 'Identification%20card/3D/identification_card_3d.png',
};

/* 단일 유니코드 이모지를 3D PNG <img>로 변환.
   매핑 없으면 원본 텍스트 반환.
   CDN 실패 시 onerror로 원본 텍스트로 자동 폴백. */
function emoji3D(ch, size) {
  if (!ch) return '';
  const path = EMOJI_3D_MAP[ch];
  if (!path) return ch;
  const px = size || 22;
  const safeAlt = ch.replace(/"/g, '&quot;');
  return '<img src="' + EMOJI_3D_BASE + path + '" alt="' + safeAlt + '" '
       + 'class="emoji-3d" '
       + 'style="width:' + px + 'px;height:' + px + 'px;" '
       + 'loading="lazy" '
       + 'onerror="this.outerHTML=this.alt">';
}

/* 문자열에 들어 있는 모든 매핑 가능 이모지를 자동 치환.
   (인라인 HTML/텍스트 노드 변환용 — 이미 <img>로 감싸진 부분에는 영향 없음) */
function emojify3D(str, size) {
  if (!str || typeof str !== 'string') return str || '';
  // 매핑 키들을 길이 내림차순으로 정렬 (조합 이모지 우선 매칭)
  const keys = Object.keys(EMOJI_3D_MAP).sort(function (a, b) { return b.length - a.length; });
  let out = str;
  keys.forEach(function (k) {
    if (out.indexOf(k) === -1) return;
    const replacement = emoji3D(k, size);
    // 이미 <img alt="이 이모지">로 들어있는 경우 중복 치환 방지를 위해
    // 단순 문자열 split/join 사용
    out = out.split(k).join(replacement);
  });
  return out;
}

window.emoji3D = emoji3D;
window.emojify3D = emojify3D;
window.EMOJI_3D_MAP = EMOJI_3D_MAP;
