---
name: mindmap-jsx-dashboard
description: Add a new JSX dashboard file to Tripl's Knowledge Atlas mindmap project, register it in mindmap.html, generate a standalone HTML wrapper, and verify local rendering.
---

# Mindmap JSX Dashboard

Use this skill when the user wants to add, import, register, or fix a JSX dashboard in this repository.

The project is a static Knowledge Atlas app. It keeps JSX source embedded in `mindmap.html` under the `jsx-data` script block, and visible dashboard nodes are registered in the `NODES` and `EDGES` arrays.

## Workflow

1. Inspect the incoming JSX file.
   - Confirm it has a React component export.
   - Note imports from `react`, `recharts`, and `lucide-react`.
   - Keep the original JSX design intact unless the user explicitly asks for redesign.

2. Add the JSX using the project script.

```powershell
node scripts\add-jsx-dashboard.mjs --file "C:\path\to\Dashboard.jsx" --id dashboard-id --label "Dashboard\nTitle" --category cat-ai --topic "Short summary"
```

Categories:

- `cat-semi`: semiconductor, optics, metrology dashboards
- `cat-invest`: investing, company moat, insurance, mental model dashboards
- `cat-ai`: AI, software, agent, productivity dashboards

Optional arguments:

- `--tags "tag1,tag2,tag3"`
- `--x -620 --y 300 --r 42`
- `--force true` to regenerate an existing standalone HTML file

3. If the JSX already exists and only source sync is needed, run:

```powershell
node scripts\sync-jsx-sources.mjs
```

4. Verify the project.

```powershell
node scripts\check-project.mjs
```

5. Browser-check `mindmap.html`.
   - Click the new node.
   - Confirm the iframe renders without `Recharts`, `React`, `ReactDOM`, `Babel`, or `LucideReact` missing-library errors.
   - Confirm the standalone generated `.html` file opens as well.

## Important Details

- Do not replace the original JSX design with a simplified fallback.
- Use local vendor libraries in `vendor/` so the project remains usable when CDN access is blocked.
- If the generated standalone HTML fails because of unusual import/export syntax, edit only the wrapper transform or standalone HTML. Preserve the `.jsx` source unless the JSX itself has a real syntax bug.
- After adding a dashboard, keep `mindmap.html`, the `.jsx`, and the generated `.html` together in the same commit.

