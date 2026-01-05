---
description: Lovable 프로젝트를 GitHub Pages로 배포하는 방법
---

// turbo-all

# Lovable → GitHub Pages 완전 자동 배포

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

### ❌ `actions/configure-pages@v4` 에러
**원인**: GitHub Pages 미활성화
**해결**: 7번 단계 자동 실행됨

### ❌ Private 저장소 플랜 제한
**원인**: 무료 플랜에서 private 저장소 Pages 불가
**해결**: 6번 단계에서 자동으로 public 전환

### 404 에러 (라우팅)
`BrowserRouter`에 `basename` 누락 → 4번 단계 확인

### 흰 화면  
`vite.config.ts`에 `base` 경로 누락 → 3번 단계 확인
