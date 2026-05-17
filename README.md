# Knowledge Atlas Mindmap

로컬 JSX 대시보드를 `mindmap.html`에서 탐색하고, 각 JSX 파일을 iframe 안에서 렌더링하는 정적 웹앱입니다. React, Recharts, Babel, Lucide는 `vendor/`에 로컬로 포함되어 있어 CDN이 막혀도 동작합니다.

## 실행

브라우저에서 `index.html` 또는 `mindmap.html`을 열면 됩니다.

검사는 번들 Node로 다음 명령을 실행합니다.

```powershell
node scripts/check-project.mjs
```

## JSX 추가

새 JSX 파일을 추가할 때는 Codex 스킬 `mindmap-jsx-dashboard`를 사용하거나 아래 명령을 실행합니다.

```powershell
node scripts/add-jsx-dashboard.mjs --file "C:\path\to\NewDashboard.jsx" --id new-dashboard --label "New\nDashboard" --category cat-ai --topic "요약 설명"
```

카테고리는 `cat-semi`, `cat-invest`, `cat-ai` 중 하나를 사용합니다.

## 배포

Vercel은 정적 사이트로 배포됩니다. 루트 경로는 `index.html`을 통해 `mindmap.html`로 이동합니다.

Supabase는 `supabase/migrations`의 스키마를 적용하면 대시보드 메타데이터와 JSX 원본을 저장할 수 있습니다.

