# Dezy Jensen - Skills Portfolio

A user-friendly static website showcasing skills and expertise. Built with React + Vite, ready for GitHub Pages deployment.

## Features

- **Skills overview** — Browse Dezy's 45+ skills across Engineering, Data, Cloud, DevOps, QA, and more
- **Filter & search** — Find skills by domain, proficiency level, or keyword
- **Sort options** — Sort by experience (years), name, or domain
- **Profile section** — Highlights your background as a Full Stack Web Developer
- **Responsive design** — Works great on desktop, tablet, and mobile

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy anywhere.

## Deploy to GitHub Pages

1. **Create a GitHub repo** named `dezy-jensen-portfolio`.

2. **Update `package.json`** — replace all `YOUR_USERNAME` with your GitHub username (in `homepage`, `repository.url`, and the `deploy` script).

3. **Push your code** to the repo, then run:
   ```bash
   npm run deploy
   ```
   This builds the site and pushes it to the `gh-pages` branch (no need to add a git remote first — the deploy script uses the repo URL directly).

4. **Enable Pages** — In your repo: **Settings → Pages** → Source: **Deploy from a branch** → Branch: `gh-pages` → Folder: `/ (root)` → Save.

5. Your site will be live at `https://YOUR_USERNAME.github.io/dezy-jensen-portfolio` (may take 1–2 minutes).

## Tech Stack

- React 19
- Vite 8
- Pure CSS (no framework)
