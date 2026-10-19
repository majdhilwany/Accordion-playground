# Accordion Playground

An interactive **React + Vite** playground for a configurable FAQ accordion: live preview, a props control panel, and a generated-JSX panel that always matches the current configuration.

## Getting started
```
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).
```
npm run build     # production build to dist/
npm run preview   # serve the build locally
```

## Features
- **3 variants**: bordered, separated, minimal
- **3 icons** (chevron, plus, arrow) at the start or end, each with its own open animation
- **multiple** or single expansion, and **collapsible** option, in both modes
- **Disabled item** demo (native disabled button, unreachable by mouse and keyboard)
- **Loading state** with shimmering skeleton rows
- **Search** with highlighted matches and an empty state
- **defaultOpen** that opens an item without resetting the others
- **Expand all / Collapse all** (multiple mode) and **Reset to defaults**
- **Generated JSX** with syntax highlighting and copy to clipboard (with fallback)
- **Light / dark theme** remembered in the browser
- **Accessibility**: `aria-expanded`, `aria-controls`, `role="region"`, keyboard navigation (Arrow keys, Home, End), focus rings, `prefers-reduced-motion`
- **Responsive** layout

## Structure
```
src/
  App.jsx / App.css
  data/faqData.js
  hooks/useAccordionState.js
  utils/accordionLogic.js     pure open/close rules
  utils/generateCode.js       source of the JSX panel
  components/Accordion.jsx, Icons.jsx, PropsPanel.jsx, CodePreview.jsx
.github/workflows/deploy.yml  auto-deploy to GitHub Pages
```

## Deploy to GitHub Pages
1. Push this folder to a GitHub repo (branch `main`).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Every push builds and publishes the site automatically.
