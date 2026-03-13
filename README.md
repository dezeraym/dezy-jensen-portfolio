# Team Skills Portfolio

A user-friendly static website showcasing team skills and expertise. Built with React + Vite, ready for GitHub Pages deployment.

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

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` (or `master`), folder: `/ (root)` or **GitHub Actions**
5. If using the root branch with `dist/`:
   - Build locally: `npm run build`
   - Push the `dist/` contents to a `gh-pages` branch, or use the [gh-pages](https://www.npmjs.com/package/gh-pages) package

**Using gh-pages package:**
```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/team-skills-portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

If your site is at `username.github.io/team-skills-portfolio`, update `vite.config.js`:
```js
base: '/team-skills-portfolio/',
```

Then run:
```bash
npm run deploy
```

## Tech Stack

- React 19
- Vite 8
- Pure CSS (no framework)
