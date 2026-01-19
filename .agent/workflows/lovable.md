---
description: Lovable 프로젝트를 GitHub Pages 또는 Netlify로 배포하는 방법
---

// turbo-all

# Lovable 프로젝트 배포 가이드

> [!NOTE]
> **두 가지 배포 옵션**: GitHub Pages (무료) 또는 Netlify (더 빠르고 간편)

---

# 옵션 1: Netlify 배포 (권장 ⭐)

> [!TIP]
> **가장 빠르고 간단!** basename 설정 불필요, 자동 빌드, 즉시 배포

## 1. 저장소 Clone
```bash
git clone <GITHUB_REPO_URL> <REPO_NAME>
cd <REPO_NAME>
```

## 2. Lovable 관련 내용 정리

### README.md 정리:
```markdown
# Project Name

Modern web application built with React, TypeScript, and Tailwind CSS.

## Tech Stack
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
```

### index.html 정리 (Lovable 메타태그 제거):
```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Project Title</title>
    <meta name="description" content="Your project description" />
    <meta name="author" content="Your Name" />

    <!-- Open Graph -->
    <meta property="og:title" content="Your Project Title" />
    <meta property="og:description" content="Your project description" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Your Project Title" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 파비콘 교체:
- `public/favicon.ico` 파일을 자신의 파비콘으로 교체
- 또는 온라인 파비콘 생성기 사용: [favicon.io](https://favicon.io)

## 3. netlify.toml 생성
```toml
[build]
  command = "npm run build"
  publish = "dist"

# SPA routing - redirect all requests to index.html
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=()"
    Access-Control-Allow-Origin = "*"
    Cache-Control = "public, max-age=31536000, immutable"

[functions]
  directory = "netlify/functions"
```

## 4. vite.config.ts 및 App.tsx 확인
**중요**: `base` 경로나 `basename`이 있으면 제거!

vite.config.ts에서:
```typescript
export default defineConfig(({ mode }) => ({
  base: '/',  // 또는 base 속성 제거
  // ...
}))
```

App.tsx에서:
```tsx
<BrowserRouter>  {/* basename 없음 */}
```

## 5. Git 푸시
```bash
git add -A
git commit -m "Add Netlify deployment config"
git push origin main
```

## 6. Netlify 배포
1. [Netlify](https://app.netlify.com) 로그인
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 선택
4. Build settings 확인 (자동으로 감지됨):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. "Deploy site" 클릭

✅ 몇 분 후 배포 완료!
🌐 URL: `https://your-site.netlify.app`

---

# 옵션 2: GitHub Pages 배포

> [!TIP]
> **저장소 URL만 주면 끝!** 모든 단계가 자동으로 진행됩니다.

## 1. 저장소 Clone
```bash
git clone <GITHUB_REPO_URL> <REPO_NAME>
cd <REPO_NAME>
```

## 2. GitHub Actions 워크플로우 생성
```bash
mkdir -p .github/workflows
```

`.github/workflows/deploy.yml` 파일 생성:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 3. vite.config.ts 수정
`base` 경로 추가 (저장소 이름으로 변경):
```typescript
export default defineConfig(({ mode }) => ({
  base: '/<REPO_NAME>/',
  // ... 나머지 설정
}))
```

## 4. App.tsx BrowserRouter 수정
```tsx
<BrowserRouter basename="/<REPO_NAME>/">
```

## 5. 변경사항 Push
```bash
git add -A
```
```bash
git commit -m "Add GitHub Pages deployment"
```
```bash
git push origin main
```

## 6. 저장소 Public 전환 (Private인 경우 자동 실행)
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); gh repo edit <OWNER>/<REPO_NAME> --visibility public --accept-visibility-change-consequences
```

## 7. GitHub Pages 활성화 + 워크플로우 실행 (자동)
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); gh api repos/<OWNER>/<REPO_NAME>/pages -X POST -f build_type=workflow; gh workflow run deploy.yml --repo <OWNER>/<REPO_NAME>
```

## 8. 배포 완료 확인 (자동)
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); Start-Sleep -Seconds 45; gh run list --repo <OWNER>/<REPO_NAME> --limit 1
```

✅ STATUS가 `✓`이면 배포 완료!
🌐 URL: `https://<OWNER>.github.io/<REPO_NAME>/`

---

## 문제 해결

### Netlify 배포

#### 검은/하얀 화면
**원인**: vite.config.ts나 App.tsx에 GitHub Pages용 경로 설정이 남아있음
**해결**: `base` 경로와 `basename` 제거

#### 404 에러 (페이지 새로고침 시)
**원인**: netlify.toml에 SPA redirects 누락
**해결**: 3번 단계의 netlify.toml 설정 추가

### GitHub Pages 배포

#### ❌ `actions/configure-pages@v4` 에러
**원인**: GitHub Pages 미활성화
**해결**: 7번 단계 자동 실행됨

#### ❌ Private 저장소 플랜 제한
**원인**: 무료 플랜에서 private 저장소 Pages 불가
**해결**: 6번 단계에서 자동으로 public 전환

#### 404 에러 (라우팅)
`BrowserRouter`에 `basename` 누락 → 4번 단계 확인

#### 흰 화면
`vite.config.ts`에 `base` 경로 누락 → 3번 단계 확인
