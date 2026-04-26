# 템플릿 정합성 — 정밀 진단 보고서 (1단계)

**작성일:** 2026-04-26
**대상 파일:** `assets/data/templates.js`, `assets/css/builder.css`, `assets/js/gallery.js`
**기반 문서:** `docs/template-mismatch-plan.md`

> 본 보고서는 코드 수정 없이 추정치 (~50개 / ~78개) 를 정밀 카운트로 확정하기 위한 1단계 산출물.

---

## 1. 전체 요약

| 지표 | 값 |
|------|----|
| `templates.js` 총 항목 수 | **109개** |
| 고유 `theme` 값 수 | **89개** (재사용 포함 시 109회 등장) |
| `blocks` 정의된 항목 | **7개** (6.4%) |
| `blocks` 누락 항목 | **102개** (93.6%) |
| `builder.css` 미구현 theme | **48개** (53.9%) |
| `gallery.js` PREVIEW_STYLES 미등록 | **3개** |
| `gallery.js` 분기 누락으로 generic 처리 | **17개+** |

> 원안의 "~50개 미구현" 은 48개로 확정 — 거의 정확.
> 원안의 "~78개 blocks 누락" 은 102개로 확정 — 30% 더 많음.

---

## 2. `blocks` 배열 누락 — 전수 목록

### 2.1 `blocks` 정의된 7개 항목

| ID | type | theme |
|---|---|---|
| `stats-01` | stats | cotton-candy |
| `stats-02` | stats | lavender-sky |
| `tech-01` | tech | badge-minimal |
| `tech-02` | tech | badge-glass |
| `profile-01` | profile | profile-minimal |
| `profile-02` | profile | profile-dark-hero |
| `links-01` | links | links-pill-row |

### 2.2 `blocks` 누락 102개 — 카테고리별

| 카테고리 (정의된 type) | 누락 ID |
|---|---|
| **stats** (17개) | stats-03~stats-13, mix-01, mix-03, mix-05, mix-06, mix-08, mix-09 |
| **tech** (10개) | tech-03~tech-10, mix-04, mix-07 |
| **profile** (9개) | profile-03~profile-10, mix-02 |
| **links** (9개) | links-02~links-10 |
| **banner** (7개) | banner-01~banner-06, banner-08 |
| **creative** (4개) | banner-07, banner-09, banner-11, links-11 |
| **vibe** (15개) | vibe-{lifestyle,career,collab,humor,status}-{glass,dark,neu} |
| **identity** (31개) | mbti-{enfp,intj,infj,entp,infp,entj,intp,pack}, status-{coding,focus,coffee,night,debug,ship,review,afk}, role-{frontend,backend,fullstack,designer,devops,ml,mobile,security}, vibe-{nightowl,remote,opensource,coffee,darkmode,keyboard,git} |

> 계: 17+10+9+9+7+4+15+31 = **102개**
>
> `widget-engine.js` (line 14-19) 가 `blocks` 배열 없으면 기본 4블록 (avatar, name, stats, badge) 만 렌더하므로, 위 102개 항목은 빌더 캔버스에서 카테고리·템플릿 차이가 사라짐.

---

## 3. `builder.css` 미구현 theme — 전수 목록

### 3.1 검색 방법
세 가지 셀렉터 패턴으로 매칭:
- `.theme-name` (단어 경계)
- `[data-theme="theme-name"]` (속성 셀렉터)
- `[data-style="theme-name"]` (속성 셀렉터)

builder.css는 주로 `[data-theme="..."]` 속성 셀렉터를 사용 중 — `.style-btn` 위 위젯 미리보기에서 43종이 이미 구현됨.

### 3.2 구현됨 41개 theme

```
aqua-veil, aurora, badge-backend, badge-clean, badge-cloud, badge-dark-pro,
badge-frontend, badge-glass, badge-minimal, badge-pastel, badge-soft,
badge-stack-heavy, candy-burst, cotton-candy, cream-glass, creator,
dark-candy, dark-lite, designer, dev-card, dusk-purple, engineer,
glass-neon, lavender-sky, mono-border, neu-candy, neu-rose, plum-night,
profile-character, profile-dark-hero, profile-glass-grid, profile-interactive,
profile-minimal, profile-obsidian, profile-portfolio, profile-simple-dark,
profile-soft, stats-lite, tech-dark, tech-light, tech-soft
```

### 3.3 미구현 48개 theme — 카테고리별

| 그룹 | 개수 | 미구현 theme | 영향받는 템플릿 ID |
|---|---|---|---|
| **profile** | 1 | `mbti-status` | profile-10 |
| **links** | 10 | links-bordered, links-contact-card, links-dark-row, links-dev-hub, links-glass-card, links-gradient-btns, links-icon-grid, links-minimal-list, links-pill-row, links-social-pack | links-01~links-10 |
| **banner** | 9 | banner-cylinder, banner-divider-hits, banner-egg, banner-github-trophy, banner-shark, banner-slice-gradient, banner-typing, banner-wave-blue, banner-wave-pink | banner-01~banner-09 (banner-10 없음) |
| **creative** | 2 | `coffee-meter`, `premium-hit` | links-11, banner-11 |
| **identity-mbti** | 3 | identity-mbti-nf, identity-mbti-nt, identity-mbti-pack | mbti-{enfp,intj,infj,entp,infp,entj,intp,pack} (8개) |
| **identity-status** | 8 | identity-status-{green,purple,brown,dark,red,orange,blue,gray} | status-{coding,focus,coffee,night,debug,ship,review,afk} (8개) |
| **identity-role** | 8 | identity-role-{blue,green,purple,pink,orange,red,teal,dark} | role-{frontend,backend,fullstack,designer,devops,ml,mobile,security} (8개) |
| **identity-vibe** | 7 | identity-vibe-{dark,green,orange,brown,dark2,slate,gray} | vibe-{nightowl,remote,opensource,coffee,darkmode,keyboard,git} (7개) |
| **합계** | **48** | — | **53개 템플릿 항목 영향** |

> 빌더에서 위 53개 템플릿을 선택하면 미리보기 위젯이 스타일 없이 렌더 → 사용자가 갤러리에서 본 모양과 일치하지 않음.

---

## 4. `gallery.js` 미리보기 정확도

### 4.1 PREVIEW_STYLES 미등록 — 3개

| theme | 영향 |
|---|---|
| `aurora` | `stats-12` 카드 배경이 기본 회색 (#f5f5f5) |
| `glass-neon` | `stats-11` 카드 배경이 기본 회색 |
| `mono-border` | `stats-13` 카드 배경이 기본 회색 |

> 다만 `buildGalleryPreview()` 의 stats case 안 generic 렌더는 동작.

### 4.2 buildGalleryPreview() 분기 누락 — 17개+

`buildGalleryPreview()` 는 `tpl.type` 으로 분기한 후, 일부 type 안에서 `tpl.theme` 으로 추가 분기:

| type | 처리 방식 | 정확도 평가 |
|---|---|---|
| **stats** | generic 1종 (theme별 차별화 없음, 배경만 PREVIEW_STYLES) | △ — 19개 항목 모두 같은 골격 |
| **tech** | generic 1종 (badge 배지 4개 고정) | △ |
| **profile** | generic 1종 (avatar + 줄 2개) | △ |
| **links** | generic 1종 (GitHub/Blog/Email 3행 고정) | ✗ — 10종 theme 모두 동일 모양 |
| **banner** | bannerColors 맵 6종 + 전용 분기 4종 (typing, github-trophy, snake, premium-hit) | ◯ |
| **creative** | 전용 분기 5종 (blog-card, progress-100, spotify-glass, coffee-meter, mbti-status) + 그 외 ✨ | △ |
| **vibe** | creative case 안에서 처리되나 theme별 분기 없음 → 모두 ✨ | ✗ — 15개 항목 모두 ✨ 이모지만 |
| **identity** | 전용 `renderIdentityPreview()` — sub별 (mbti/status/role/vibe) shields.io 모방 | ◯ |

### 4.3 기 발견된 정합성 버그 ★

**`type='creative'` 인데 theme이 banner-* 인 항목이 잘못된 case로 들어감:**

| 항목 | type | theme | 실제 분기 위치 | 결과 |
|---|---|---|---|---|
| `banner-09` | creative | `banner-github-trophy` | case 'banner' 에 분기 있음 — 하지만 `type='creative'` 로 들어감 | 분기 안 탐 → generic ✨ |
| `banner-07` | creative | `banner-divider-hits` | 어느 case 에도 분기 없음 | generic ✨ |

→ `banner-09` 는 사실상 trophy 미리보기 코드가 작성되어 있음에도 보이지 않는 데드 코드.

### 4.4 4단계 작업 시 영향 받는 영역

- **Links 카테고리 10종**: 모두 동일한 generic 미리보기 → theme 차별화 필요
- **Vibe 카테고리 15종**: 모두 ✨ 이모지 → 배지 형태 미리보기 신규 작성 필요
- **Banner 미구현 분기**: banner-divider-hits 1종만 추가 분기 필요
- **Creative type 라우팅 버그**: type='creative' 항목이 banner case 분기에 못 닿는 문제

---

## 5. 단계 2~5 견적 갱신

| 단계 | 원안 추정 | 정밀 카운트 | 차이 |
|---|---|---|---|
| 2단계 — `builder.css` 누락 채우기 | ~50개 | **48개** (53개 항목 영향) | 거의 정확 |
| 3단계 — `blocks` 정의 채우기 | ~78개 | **102개** | +30% (24개 더 많음) |
| 4단계 — gallery 미리보기 보강 | "Links/Banner/Creative 50%↑ 차이" | Links 10종, Vibe 15종, Banner 1종, Creative 라우팅 1건 | Vibe 누락 미발견 — 추가 작업 필요 |
| 5단계 — 랜딩 갤러리 동기화 | 6개 카드 | 6개 (변동 없음) | 동일 |

---

## 6. 다음 액션 권장

1. **2단계 시작 전 합의**: 48개 미구현 theme 중 (a) 모두 채울지 (2-α), (b) 일부를 templates.js 에서 제거할지 (2-β)
   - 전수 작성 시 `builder.css` +1500~2500줄 예상
   - identity-* 26개는 거의 동형 (배경 그라디언트 + 텍스트 컬러만 다름) → 단일 베이스 + variant 시 LOC 절약 가능
2. **3단계 Bulk 패턴 활용**: 카테고리별 6세트 정의 후 일괄 적용 → templates.js 102개 항목 수정 (2시간 내 완료 추정)
3. **4단계 우선순위**: Links / Vibe 두 카테고리 먼저 — 영향 항목 25종

---

## 부록: 산출물

- 파싱 결과: `/tmp/templates-parsed.json` (세션 휘발)
- CSS 감사 결과: `/tmp/css-final-audit.json` (세션 휘발)
- gallery.js 감사 결과: `/tmp/gallery-audit.json` (세션 휘발)
