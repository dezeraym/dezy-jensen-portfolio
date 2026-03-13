import { useState, useMemo, useEffect, useRef } from 'react'
import { dezySkills, userProfile, projects } from './data/skills'
import StarsBackground from './components/StarsBackground'
import TiltCard from './components/TiltCard'
import useScrollReveal from './hooks/useScrollReveal'
import './App.css'

const THEME_KEY = 'dezy-portfolio-theme'

const PROFICIENCY_COLORS = {
  Advanced: '#22c55e',
  Intermediate: '#3b82f6',
  Basic: '#94a3b8',
}

const DOMAIN_COLORS = {
  Engineering: '#6366f1',
  Data: '#ec4899',
  Cloud: '#0ea5e9',
  'Data / AI': '#a855f7',
  DevOps: '#f59e0b',
  QA: '#14b8a6',
  Product: '#84cc16',
  Security: '#ef4444',
  Complementary: '#64748b',
}

function ProficiencyBadge({ level }) {
  const color = PROFICIENCY_COLORS[level] || '#94a3b8'
  return (
    <span className="proficiency-badge" style={{ '--badge-color': color }}>
      {level}
    </span>
  )
}

function SkillCard({ skill }) {
  const domainColor = DOMAIN_COLORS[skill.domain] || '#64748b'
  return (
    <TiltCard intensity={6}>
    <div className="skill-card" style={{ '--domain-color': domainColor }}>
      <div className="skill-card-header">
        <span className="skill-domain">{skill.domain}</span>
        <ProficiencyBadge level={skill.proficiency} />
      </div>
      <h3 className="skill-technology">{skill.technology}</h3>
      <p className="skill-meta">{skill.skillType} · {skill.years} yrs</p>
    </div>
    </TiltCard>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_KEY) || 'dark'
    }
    return 'dark'
  })
  const [search, setSearch] = useState('')
  const [domainFilter, setDomainFilter] = useState('all')
  const [proficiencyFilter, setProficiencyFilter] = useState('all')
  const [sortBy, setSortBy] = useState('years')
  const searchInputRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target
        if (!target || !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
          e.preventDefault()
          searchInputRef.current?.focus()
        }
      }
      if (e.key === 'Escape') {
        searchInputRef.current?.blur()
        setSearch('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const domains = useMemo(() => {
    const d = [...new Set(dezySkills.map(s => s.domain))].sort()
    return d
  }, [])

  const filteredSkills = useMemo(() => {
    let result = [...dezySkills]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(s =>
        s.technology.toLowerCase().includes(q) ||
        s.domain.toLowerCase().includes(q) ||
        s.skillType.toLowerCase().includes(q)
      )
    }
    if (domainFilter !== 'all') {
      result = result.filter(s => s.domain === domainFilter)
    }
    if (proficiencyFilter !== 'all') {
      result = result.filter(s => s.proficiency === proficiencyFilter)
    }

    result.sort((a, b) => {
      if (sortBy === 'years') return b.years - a.years
      if (sortBy === 'technology') return a.technology.localeCompare(b.technology)
      if (sortBy === 'domain') return a.domain.localeCompare(b.domain)
      return 0
    })

    return result
  }, [search, domainFilter, proficiencyFilter, sortBy])

  const stats = useMemo(() => {
    const domains = [...new Set(dezySkills.map(s => s.domain))]
    return {
      total: dezySkills.length,
      advanced: dezySkills.filter(s => s.proficiency === 'Advanced').length,
      intermediate: dezySkills.filter(s => s.proficiency === 'Intermediate').length,
      domains: domains.length,
    }
  }, [])

  const [projectsRef, projectsVisible] = useScrollReveal(0.1)
  const [aboutRef, aboutVisible] = useScrollReveal(0.1)
  const [skillsRef, skillsVisible] = useScrollReveal(0.05)

  return (
    <div className="app">
      <StarsBackground />
      <main className="app-content">
      <header className="hero">
        <button
          className="theme-toggle"
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
        <h1 className="hero-title">Dezy Jensen</h1>
        <p className="hero-hook hero-hook-gradient">Physics → Code</p>
        <p className="hero-subtitle">{userProfile.tagline}</p>
      </header>

      <section ref={projectsRef} className={`projects-section ${projectsVisible ? 'reveal' : ''}`}>
        <h2>What I've Built</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <TiltCard key={project.id} intensity={10}>
            <article className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>
            </article>
            </TiltCard>
          ))}
        </div>
      </section>

      <section ref={aboutRef} className={`user-profile ${aboutVisible ? 'reveal' : ''}`}>
        <h2>About Me</h2>
        <div className="profile-card">
          <div className="profile-header">
            <span className="profile-badge">Full Stack</span>
            <h3>{userProfile.title}</h3>
          </div>
          {userProfile.summary && (
            <p className="profile-summary">{userProfile.summary}</p>
          )}
          <p className="profile-experience">{userProfile.experience} of experience</p>
          <p className="profile-education">{userProfile.education}</p>
          <div className="profile-industries">
            <strong>Industries:</strong> {userProfile.industries.join(', ')}
          </div>
          <p className="profile-specialization">
            <strong>Specialization:</strong> {userProfile.specialization}
          </p>
          <ul className="profile-highlights">
            {userProfile.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      <section ref={skillsRef} className={`team-member-section ${skillsVisible ? 'reveal' : ''}`}>
        <h2>Skills Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Skills</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.advanced}</span>
            <span className="stat-label">Advanced</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.intermediate}</span>
            <span className="stat-label">Intermediate</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.domains}</span>
            <span className="stat-label">Domains</span>
          </div>
        </div>

        <div className="filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search skills... (press / to focus)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search skills"
            />
          </div>
          <div className="domain-chips">
            <button
              type="button"
              className={`domain-chip ${domainFilter === 'all' ? 'active' : ''}`}
              onClick={() => setDomainFilter('all')}
            >
              All
            </button>
            {domains.map(d => (
              <button
                key={d}
                type="button"
                className={`domain-chip ${domainFilter === d ? 'active' : ''}`}
                style={{ '--chip-color': DOMAIN_COLORS[d] || '#64748b' }}
                onClick={() => setDomainFilter(d)}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="filter-row">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              aria-label="Filter by domain"
            >
              <option value="all">All Domains</option>
              {domains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={proficiencyFilter}
              onChange={(e) => setProficiencyFilter(e.target.value)}
              aria-label="Filter by proficiency"
            >
              <option value="all">All Levels</option>
              <option value="Advanced">Advanced</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort by"
            >
              <option value="years">Sort by Experience</option>
              <option value="technology">Sort by Name</option>
              <option value="domain">Sort by Domain</option>
            </select>
          </div>
        </div>

        <p className="results-count">
          Showing {filteredSkills.length} of {dezySkills.length} skills
        </p>

        <div className="skills-grid">
          {filteredSkills.map((skill, i) => (
            <SkillCard key={`${skill.technology}-${i}`} skill={skill} />
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <p className="no-results">No skills match your filters. Try adjusting your search.</p>
        )}
      </section>

      <footer className="footer">
        <p>Dezy Jensen · Physics background, full stack builder</p>
        <p className="footer-links">
          <a href="https://github.com/dezeraym" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="footer-sep">·</span>
          <a href="https://www.linkedin.com/in/dezeraym" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </footer>
      </main>
    </div>
  )
}

export default App
