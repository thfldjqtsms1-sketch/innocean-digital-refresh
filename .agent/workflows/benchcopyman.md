---
description: URL을 입력받아 웹사이트를 복제하는 방법 (벤치마킹 & 클론)
---

// turbo-all

# 🔄 BenchCopyMan - 웹사이트 복제 마법사 v2.0

> [!TIP]
> **URL만 주면 끝!** 해당 웹사이트를 분석하고 복제합니다.
> 이 워크플로우는 **학습 기반 진화형** - 복제할 때마다 더 똑똑해집니다! 🧠

## 사용법
```
/benchcopyman <TARGET_URL>
```

예시: `/benchcopyman https://linear.app`

---

## 🔧 사용 도구

| 도구 | 용도 | 비용 |
|------|------|------|
| 🔥 **Firecrawl** | 웹 스크래핑 & 마크다운 변환 | 500 크레딧/월 무료 |
| `browser_subagent` | 스크린샷, 시각적 검증 | 무료 |
| `generate_image` | 이미지 에셋 생성 | 무료 |

> [!NOTE]
> Firecrawl API 키: `.agent/firecrawl-config.json`에 저장됨

---

## Phase 1: 정찰 🔍 (Firecrawl 활용)

### 1-1. Firecrawl로 페이지 스크래핑 (1 크레딧)
```bash
# Firecrawl API 호출
curl -X POST https://api.firecrawl.dev/v1/scrape \
  -H "Authorization: Bearer fc-YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "<TARGET_URL>", "formats": ["markdown", "html"]}'
```

**또는 Node.js:**
```javascript
import FirecrawlApp from '@mendable/firecrawl-js';
const app = new FirecrawlApp({ apiKey: 'fc-YOUR_API_KEY' });
const result = await app.scrapeUrl('<TARGET_URL>', { formats: ['markdown', 'html'] });
```

### 1-2. Firecrawl 응답에서 추출할 정보
- **markdown**: 깔끔한 텍스트 구조
- **html**: 원본 HTML (스타일 분석용)
- **metadata**: title, description, og:image 등

### 1-3. 시각적 캡처 (browser_subagent)
```
browser_subagent 작업:
1. URL 접속
2. 전체 페이지 스크린샷 (reference용)
3. DevTools로 CSS 값 추출:
   - 색상값 (background, text, accent)
   - 폰트 (font-family, size, weight)
   - 그림자, 그라디언트
```

### 1-4. 분석 결과 정리
```markdown
## 🎨 디자인 토큰
- Primary: #XXXXXX
- Secondary: #XXXXXX
- Background: #XXXXXX
- Text: #XXXXXX

## 📝 폰트
- Heading: Inter, 700
- Body: Inter, 400

## 📐 레이아웃
- Max-width: 1200px
- Section padding: 80px
```

---

## Phase 2: 프로젝트 세팅 🛠️

### 2-1. Vite + React + TS 초기화
```bash
npx -y create-vite@latest <PROJECT_NAME> --template react-ts
cd <PROJECT_NAME>
npm install
```

### 2-2. 필수 패키지
```bash
npm install lucide-react
```

### 2-3. 불필요한 파일 정리
```bash
rm src/App.css
```

---

## Phase 3: 디자인 시스템 구축 🎨

### 3-1. CSS 변수 정의 (src/index.css)
```css
:root {
  /* 정찰에서 추출한 색상 */
  --color-primary: #EXTRACTED;
  --color-secondary: #EXTRACTED;
  --color-background: #EXTRACTED;
  --color-text: #EXTRACTED;
  
  /* 폰트 */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* 간격 */
  --spacing-section: 80px;
  --max-width: 1200px;
}
```

### 3-2. 기본 리셋 & 유틸리티
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--font-body); background: var(--color-background); }
```

---

## Phase 4: 컴포넌트 복제 🧩

### 섹션별 구현 순서
1. **Header/Navbar** - 로고, 네비게이션, CTA 버튼
2. **Hero** - 메인 타이틀, 서브텍스트, CTA
3. **Features** - 기능 소개 그리드/리스트
4. **Social Proof** - 로고, 통계, 후기
5. **CTA Section** - 최종 전환 유도
6. **Footer** - 링크, 소셜, 저작권

### 이미지 처리
```
generate_image로 필요한 에셋 생성
- 히어로 배경/일러스트
- 아이콘 (또는 lucide-react 사용)
- 목업 이미지
```

---

## Phase 5: 검증 ✅

### 5-1. 개발 서버 실행
```bash
npm run dev
```

### 5-2. 비교 검증
```
browser_subagent로 localhost:5173 접속
원본 스크린샷과 나란히 비교
```

### 5-3. 체크리스트
- [ ] 레이아웃 구조 일치
- [ ] 색상 정확도
- [ ] 폰트 스타일
- [ ] 반응형 동작
- [ ] 호버/애니메이션

---

## Phase 6: 배포 (선택) 🚀

> `/lovable` 워크플로우 참고
```bash
gh repo create <PROJECT_NAME> --public --source=. --remote=origin --push
```

---

## 🧠 학습 노트 (계속 업데이트!)

> [!NOTE]
> 복제하면서 배운 패턴과 트릭을 여기에 기록합니다.

### ⚠️ 복제 전 필수 체크 (Phase 0)
> [!IMPORTANT]
> **반드시 먼저 확인할 것들:**

1. **페이지 구조 파악**
   - [ ] 원페이지(SPA) vs 멀티페이지 확인
   - [ ] 네비게이션 링크가 다른 페이지로 가는지 확인
   - [ ] React Router 필요 여부 결정

2. **텍스트 정렬 확인**
   - [ ] 좌측 정렬 / 중앙 정렬 / 우측 정렬
   - [ ] 섹션별로 다를 수 있음!

3. **효과 및 인터랙션 분석**
   - [ ] 스크롤 애니메이션 (AOS, GSAP 등)
   - [ ] 마우스 호버 효과
   - [ ] 팝업/모달
   - [ ] 텍스트 랩핑/타이핑 효과
   - [ ] 패럴랙스 스크롤
   - [ ] 비디오/이미지 전환

### 색상 추출 팁
- DevTools > Computed 탭에서 정확한 값 확인
- 그라디언트는 전체 값 복사

### 자주 쓰는 패턴
- **Glassmorphism**: `backdrop-filter: blur(10px); background: rgba(255,255,255,0.1);`
- **부드러운 그림자**: `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);`
- **호버 효과**: `transition: transform 0.2s; &:hover { transform: translateY(-2px); }`
- **커스텀 커서**: 마우스 따라다니는 원형 커서 (CustomCursor 컴포넌트)
- **호버 시 커서 확대**: `data-cursor="TEXT"` 속성으로 커서에 텍스트 표시

### 필수 라이브러리
| 라이브러리 | 용도 |
|------------|------|
| `react-router-dom` | 멀티페이지 라우팅 |
| `aos` | 스크롤 애니메이션 |
| `@types/aos` | TypeScript 타입 |

### 폰트 매핑
| 원본 폰트 | 대체 폰트 |
|----------|----------|
| SF Pro | Inter |
| Circular | Nunito Sans |
| Graphik | Work Sans |

### 🚨 실패 사례 & 개선점

#### lavieum.com v1 (2024-12-29)
| 문제점 | 원인 | 개선방법 |
|--------|------|----------|
| 원페이지로 만듦 | 멀티페이지 구조 파악 안함 | Phase 0에서 페이지 구조 먼저 확인 |
| 글씨 가운데 정렬 | 원본은 좌측 정렬 | 각 섹션별 정렬 방식 확인 필수 |
| JS 효과 없음 | 스크롤 애니메이션 분석 안함 | AOS 라이브러리 사용 |
| 커스텀 커서 없음 | 마우스 효과 분석 안함 | CustomCursor 컴포넌트 추가 |
| 누락된 페이지 | 메뉴 링크만 만듦 | 모든 서브페이지 구현 필수 |

#### lavieum.com v2 개선 (2024-12-29)
- ✅ 멀티페이지 (8개 페이지)
- ✅ 좌측 정렬
- ✅ AOS 스크롤 애니메이션
- ✅ 커스텀 커서 (호버 시 확대, 텍스트 표시)
- ✅ 모든 드롭다운 메뉴 페이지 구현

### 복제 성공 사례
- lavieum.com v2 (부분 성공 - 이미지/비디오 제외)

---

## 🎯 품질 목표

| 항목 | 목표 |
|------|------|
| 레이아웃 | 95% 이상 일치 |
| 색상 | 원본과 동일 |
| 반응형 | 모바일/태블릿/데스크톱 |
| 성능 | Lighthouse 90+ |
| **텍스트 정렬** | 원본과 동일 |
| **애니메이션** | 주요 효과 재현 |
| **페이지 구조** | 원본과 동일 (SPA/MPA) |

---

## ⚠️ 주의사항

> [!WARNING]
> 복제된 사이트는 **학습/참고 목적**으로만 사용하세요.

> [!IMPORTANT]
> 로고, 상표, 고유 콘텐츠는 반드시 교체하세요.
