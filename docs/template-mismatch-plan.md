# 템플릿 정합성 — 진단 및 작업 계획

작성: 2026-04-26
대상: `index.html`, `gallery.html`, `builder.html`, `assets/data/templates.js`, `assets/css/builder.css`, `assets/js/widget-engine.js`, `assets/js/gallery.js`

> 빌더 / 랜딩 / 갤러리 / `templates.js` / 실제 위젯 이미지 사이의 불일치를 정리하고, 작업 우선순위를 의존성 기반으로 정한 문서.

---

## 1. 발견된 4가지 불일치

### A. 랜딩 갤러리 = 하드코딩 6개
- 위치: `index.html` 의 `body.page-landing .gallery-grid` 안 `.g-card` 6개
- 항목 (예: "GitHub Stats Bar", "MBTI", "기술 스택", "프로필" 등) 은 `templates.js` 의 정의를 **참조하지 않음**
- 반면 `gallery.html` 은 `gallery.js` 가 `templates.js` 를 동적 소비
- 결과: **랜딩에서 본 6개 ≠ 실제 갤러리 60+개** (랜딩이 전체 카탈로그를 보여주지 못함)

### B. `templates.js` theme ↔ `builder.css` 미구현 (~50개)
- `templates.js` 가 정의한 `theme` 값 중 약 50개가 `builder.css` 에 셀렉터로 존재하지 않음
- 영향 카테고리:
  - **Banner (10개)**: `banner-wave-pink`, `banner-wave-blue`, `banner-slice-gradient`, `banner-egg`, `banner-cylinder`, `banner-shark`, `banner-typing`, `banner-github-trophy`, 외 2
  - **Links (10개)**: `links-pill-row`, `links-glass-card`, `links-dark-row`, `links-icon-grid`, `links-minimal-list`, `links-gradient-btns`, `links-bordered`, `links-social-pack`, `links-contact-card`, `links-dev-hub`
  - **Identity 신규 (~30개)**: `identity-mbti-{nf,nt,sj,sp,pack}`, `identity-status-{green,purple,brown,dark,red,orange,blue,gray}`, `identity-role-*`, `identity-vibe-*`
  - **Creative**: `coffee-meter`, `mbti-status`, `premium-hit`
- 결과: **빌더에서 해당 템플릿 선택 시 스타일 없이 렌더** → 사용자가 "갤러리에서 본 모양"을 빌더에서 못 봄

### C. `templates.js` `blocks` 배열 누락 (~78개)
- 정의된 항목: `stats-01`, `stats-02`, `tech-01`, `tech-02`, `profile-01`, `profile-02` 정도
- 누락된 항목:
  - `stats-03 ~ stats-10`
  - `tech-03 ~ tech-10`
  - `profile-03 ~ profile-10`
  - `mix-01 ~ mix-09` 대부분
  - `links-01 ~ links-10` 전체
  - `banner-01 ~ banner-11` 전체
- `widget-engine.js` (line 14-19) 는 `WE.blocks` 배열에 의존해 빌더 캔버스 구성
- 결과: **`blocks` 가 없으면 기본 블록 4개 (avatar, name, stats, badge) 만 표시** → 카테고리·템플릿 차이가 사라져 모두 비슷해 보임

### D. `gallery.js` 미리보기 정확도
- `gallery.js` 의 카드 미리보기 (`buildGalleryPreview()`, line 269-430) 와 빌더 실제 출력 비교:
  - **Stats**: 실제 위젯과 거의 일치 ✓
  - **Identity**: shields.io 시뮬레이션, OK ✓
  - **Tech**: 단순 색상 박스 △
  - **Profile**: 스켈레톤 수준 △
  - **Links / Banner / Creative**: 실제 빌더 출력과 **50% 이상 시각 차이** ✗

### E. (참고) 이미지 리소스
- `assets/images/` 에는 `coffeeicon.webp`, `main.jpeg`, `readmekit.symbol.png` 만 존재
- 별도 템플릿 이미지 디렉터리 (`assets/images/templates/`) 없음 — Fluent CDN(이모지)에 의존
- 누락은 아니고 의도된 설계로 보임

---

## 2. 우선순위 작업 계획

### 1단계 — 진단 정확화 (코드 수정 없음)
**목적:** 위 50개 / 78개 같은 추정치를 정밀 카운트로 확정
**작업:**
- `templates.js` 의 모든 `theme` 값 추출
- `builder.css` 의 클래스 셀렉터와 비교 → **CSS 미구현 theme 확정 목록**
- `blocks` 가 빠진 템플릿 ID **전수 목록**
- `gallery.js` 의 `PREVIEW_STYLES` 와 `buildGalleryPreview()` 가 다루지 않는 theme 식별

**산출물:** `docs/template-audit-report.md` (정밀 누락표)

**왜 먼저?** 1단계 없이는 2~5단계 견적이 부정확. 위험·코드변경 0.

---

### 2단계 — 빌더 깨짐 수습 (불일치 B) ★ 가장 시급
**목적:** 빌더에서 모든 템플릿이 최소한 디자인된 상태로 렌더
**선택지 두 가지:**
- **(2-α) 채우기**: `builder.css` 에 누락 ~50개 theme 클래스 신규 작성
- **(2-β) 줄이기**: 정말 사용할 theme 만 남기고 `templates.js` 에서 제거
**판단 기준:** 갤러리·홍보 가치가 있는 theme 인지, 단순 실험이었는지
**산출물:** 빌더에서 선택 가능한 모든 템플릿이 시각적으로 완성됨

**의존:** 1단계 누락 목록 필요

---

### 3단계 — `blocks` 정의 채우기 (불일치 C)
**목적:** 빌더 캔버스에 카테고리별 적절한 블록이 들어가게 함
**전략:** 카테고리별 기본 `blocks` 패턴 6세트 정의 후 일괄 적용
- `stats-*`: avatar + name + stats
- `tech-*`: name + tech badge
- `profile-*`: avatar + name + bio + (옵션) badge
- `mix-*`: 케이스별
- `links-*`: name + links block
- `banner-*`: banner block
**원칙:** 같은 카테고리 안에서 `blocks` 가 거의 같아도 OK. 외관 차이는 `theme` 이 책임.
**산출물:** `templates.js` 의 모든 항목에 `blocks` 존재

**의존:** 2단계 완료 후가 안전 (blocks 추가 → 빌더에서 즉시 렌더 검증 가능)

---

### 4단계 — 갤러리 미리보기 정확도 (불일치 D)
**목적:** "갤러리에서 본 것 = 빌더 출력" 약속 회복
**선택지 두 가지:**
- **(4-α) 단순 보강**: `gallery.js` 의 Links/Banner/Creative 미리보기 함수를 실제 위젯 모양에 맞게 다시 작성
- **(4-β) 구조 통합**: `widget-engine.js` 의 렌더 함수를 갤러리에서 재사용 (한 소스로 양쪽 렌더)
**추천:** 4-β. 장기적으로 동기화 비용 0.
**산출물:** 갤러리 카드 ≈ 빌더 출력

**의존:** 2, 3단계 완료 후

---

### 5단계 — 랜딩 갤러리 동기화 (불일치 A)
**목적:** 랜딩의 추천 6개도 단일 소스(`templates.js`) 사용
**작업:**
- `templates.js` 항목에 `featured: true` 플래그 도입
- `index.html` 의 하드코딩 `.g-card` 6개를 제거하고, `gallery.js` 의 카드 렌더 함수를 import 해서 featured 6개 표시
- 또는 **빌드 타임 정적 생성**: 랜딩은 빌드 시 templates.js 를 읽어 HTML 정적 출력 (성능 우선이면 이 쪽)
**산출물:** 랜딩에서 보여주는 추천 = 갤러리·빌더와 동일 데이터

**의존:** 4단계 완료 후 (gallery.js 카드 렌더가 정확해야 재사용 가치 있음)

---

## 3. 산출물 매핑

| 단계 | 주 변경 파일 | 신규 / 수정 | 검증 방법 |
|---|---|---|---|
| 1 | `docs/template-audit-report.md` | 신규 | 문서만 |
| 2 | `assets/css/builder.css` | 수정 (선택지에 따라 templates.js 도) | 빌더에서 모든 템플릿 클릭 → 시각 확인 |
| 3 | `assets/data/templates.js` | 수정 | 빌더에서 템플릿 선택 시 캔버스에 카테고리별 블록 표시 |
| 4 | `assets/js/gallery.js` (또는 `widget-engine.js` 분리) | 수정 / 리팩터 | 갤러리 카드 ≈ 빌더 출력 비교 |
| 5 | `index.html`, `assets/data/templates.js` | 수정 | 랜딩 6개 카드가 갤러리·빌더와 동일 |

---

## 4. 권장 다음 액션

**1단계부터 진행 권장.** 위험 없고, 이 후 모든 단계의 견적·범위가 정확해짐.

세 가지 진행 모드:
- **(가)** 1단계만 먼저 — 누락 목록 문서 산출 후 사용자 검토
- **(나)** 1 + 2 묶음 — 정확한 목록 확정 후 바로 builder.css 채우기 시작
- **(다)** 별도 우선순위 지정 — 사용자가 다른 단계부터 가고자 한다면 순서 조정

---

## 5. 위험 / 메모

- **2-β (templates.js 줄이기)** 선택 시 README 마케팅에서 "60개 템플릿" 같은 카피 영향 받음 — 카피도 같이 수정 필요
- **4-β (구조 통합)** 시 widget-engine 의 일부가 갤러리에서도 import 가능해야 함 — 현재 IIFE/전역 객체 구조면 모듈화 비용 발생
- 모든 단계는 공통적으로 `builder.html` 의 시각 회귀 테스트 필요. 가능하면 agent-browser 로 빌더에서 각 카테고리 1개씩 선택해 스크린샷 비교
