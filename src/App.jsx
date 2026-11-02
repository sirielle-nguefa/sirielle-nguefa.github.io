import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { site, ui, experience, skills, projects } from './content.js'

const Scene = lazy(() => import('./Scene.jsx'))

function initialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'fr' || saved === 'en') return saved
  } catch {}
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const f = () => setReduced(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return reduced
}

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const t = ui[lang]
  const reduced = useReducedMotion()
  const heroRef = useRef(null)
  const progressRef = useRef(0)
  const [stage, setStage] = useState(0)
  const [copied, setCopied] = useState(false)
  const [gl] = useState(webglAvailable)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {}
  }, [lang])

  // Défilement fluide
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let id
    const raf = (time) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const el = document.querySelector(a.getAttribute('href'))
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -64 })
    }
    document.addEventListener('click', onAnchor)
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('click', onAnchor)
      lenis.destroy()
    }
  }, [reduced])

  // Progression du clustering liée au défilement dans la section d'accueil
  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(total, 1)))
      progressRef.current = p
      setStage(p < 0.25 ? 0 : p < 0.8 ? 1 : 2)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {}
  }

  const shownStage = reduced ? 2 : stage

  return (
    <>
      <a className="skip" href="#profil">
        {t.nav.about}
      </a>
      <header className="bar">
        <a className="brand" href="#top">
          {site.name}
        </a>
        <nav aria-label="Navigation">
          <a href="#profil">{t.nav.about}</a>
          <a href="#parcours">{t.nav.work}</a>
          <a href="#projets">{t.nav.projects}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <button
          className="lang"
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          aria-label={t.switchLang}
        >
          <span aria-hidden="true" className={lang === 'fr' ? 'on' : ''}>FR</span>
          <span aria-hidden="true" className={lang === 'en' ? 'on' : ''}>EN</span>
        </button>
      </header>

      <section id="top" className={`hero ${reduced ? 'still' : ''}`} ref={heroRef}>
        <div className="hero-sticky">
          <div className="hero-canvas">
            {gl && (
              <Suspense fallback={null}>
                <Scene progressRef={progressRef} reduced={reduced} />
              </Suspense>
            )}
          </div>
          <div className="hero-copy wrap">
            <p className="role">{t.role}</p>
            <h1>
              <span>Sirielle</span>
              <span>Nguefa</span>
            </h1>
            <p className="intro">{t.intro}</p>
            <div className="ctas">
              <a className="btn primary" href="#projets">
                {t.ctaProjects}
              </a>
              <a className="btn" href="#contact">
                {t.ctaContact}
              </a>
            </div>
          </div>
          {gl && (
            <div className="scene-status wrap" aria-live="polite">
              <div className="steps" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <i key={i} className={i <= shownStage ? 'done' : ''} />
                ))}
              </div>
              <span>{t.sceneStates[shownStage]}</span>
              {!reduced && shownStage === 0 && <span className="hint">{t.scrollHint}</span>}
            </div>
          )}
        </div>
      </section>

      <main>
        <section id="profil" className="section wrap two">
          <h2>{t.aboutTitle}</h2>
          <div>
            {t.about.map((p, i) => (
              <p key={i} className="lead">
                {p}
              </p>
            ))}
            <dl className="facts">
              {t.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="parcours" className="section wrap two">
          <h2>{t.workTitle}</h2>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.org}>
                <p className="period">{e.period}</p>
                <div>
                  <h3>{e.org}</h3>
                  <p className="job">{e.role[lang]}</p>
                  {e.points[lang].length > 0 && (
                    <ul>
                      {e.points[lang].map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                  {e.stack && <p className="env">{e.stack}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="competences" className="section wrap two">
          <h2>{t.skillsTitle}</h2>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group.fr}>
                <h3>{s.group[lang]}</h3>
                <ul>
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projets" className="section wrap two">
          <h2>{t.projectsTitle}</h2>
          {projects.length === 0 ? (
            <div className="empty">
              <p className="lead">{t.projectsEmpty}</p>
              <a className="btn" href={site.github} target="_blank" rel="noreferrer">
                {t.projectsEmptyCta}
              </a>
            </div>
          ) : (
            <div className="projects">
              {projects.map((p) => (
                <article key={p.title.fr} className="project">
                  {p.metric && (
                    <p className="metric">
                      <strong>{p.metric.value}</strong>
                      <span>{p.metric.label[lang]}</span>
                    </p>
                  )}
                  <h3>{p.title[lang]}</h3>
                  <p>{p.summary[lang]}</p>
                  <ul className="stack">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="links">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer">
                        {t.code}
                      </a>
                    )}
                    {!p.repo && !p.demo && <span className="soon">{t.soon}</span>}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer">
                        {t.demo}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="contact" className="contact wrap">
          <h2>{t.contactTitle}</h2>
          <p className="lead">{t.contactText}</p>
          <div className="mail">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <button className="btn" onClick={copyEmail}>
              {copied ? t.copied : t.copy}
            </button>
          </div>
          <ul className="social">
            <li>
              <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="wrap foot">
        <span>{t.footer}</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  )
}
