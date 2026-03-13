import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply saved theme before render to prevent flash
const saved = localStorage.getItem('dezy-portfolio-theme')
document.documentElement.setAttribute('data-theme', saved || 'dark')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
