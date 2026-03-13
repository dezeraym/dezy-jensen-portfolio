import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages: site will be at username.github.io/dezy-jensen-portfolio
  base: '/dezy-jensen-portfolio/',
})
