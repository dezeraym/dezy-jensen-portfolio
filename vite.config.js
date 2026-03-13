import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: use base: '/team-skills-portfolio/' when deploying to username.github.io/team-skills-portfolio
  // For custom domain or user site: use base: '/'
  base: './',
})
