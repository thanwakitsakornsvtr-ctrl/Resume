import { useContent } from '../hooks/useContent'
import { ArrowDown, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { SystemIllustration } from '../components/SystemIllustration'

export function Hero() {
  const { profile, featuredProject, projects, t } = useContent()
  return (
    <section
      id="home"
      className="hero-banner-stage"
      aria-labelledby="hero-title"
    >
      <div className="hero-backdrop" aria-hidden="true">
        <img
          src="/hero-banner-bg.jpg"
          alt=""
          width={1376}
          height={768}
          fetchPriority="high"
          decoding="async"
          className="hero-backdrop-image"
        />
        <div className="hero-backdrop-mask" />
      </div>

      <div className="hero-section container">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow" data-hero-reveal>
            <span className="status-dot" />
            <span>{profile.role.toUpperCase()}</span>
            <span className="eyebrow-divider" aria-hidden="true">
              /
            </span>
            <span>
              {profile.contentStatus === 'sample'
                ? t('SAMPLE PROFILE')
                : profile.name.toUpperCase()}
            </span>
          </p>
          <h1 id="hero-title" data-hero-reveal>
            {profile.headline[0]}
            <br />
            <span>{profile.headline[1]}</span>
          </h1>
          <p className="hero-description" data-hero-reveal>
            {profile.introduction}
          </p>
          <div
            className="hero-actions flex flex-wrap items-center gap-6"
            data-hero-reveal
          >
            <a href="#featured-project" className="button button-primary">
              {t('Explore my work')}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="button button-secondary">
              {t('Get in touch')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-focus" data-hero-reveal>
            {profile.focus.map((focus) => (
              <span key={focus} className="hero-focus-pill">
                <CheckCircle2 size={14} aria-hidden="true" />
                {focus}
              </span>
            ))}
          </div>
        </div>

        <div data-hero-reveal className="hero-visual">
          <SystemIllustration />
        </div>

        <nav
          className="hero-evidence-bar"
          aria-label={t('Quick jump to systems')}
          data-hero-reveal
        >
          <a href="#featured-project" className="hero-evidence-card is-primary">
            <span className="hero-evidence-meta">
              <span className="status-pill is-live">
                <span className="status-pill-dot" />
                01 · {t('FEATURED PROJECT')}
              </span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
            <strong>{featuredProject.title}</strong>
            <span>{featuredProject.scope}</span>
          </a>
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={`/projects/${project.id}/`}
              className="hero-evidence-card"
            >
              <span className="hero-evidence-meta">
                <span className="status-pill is-online">
                  <span className="status-pill-dot" />0{index + 2} ·{' '}
                  {project.stage ?? t('Project')}
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
              <strong>{project.title}</strong>
              <span>{project.category}</span>
            </a>
          ))}
        </nav>

        <div className="hero-footer">
          <p>{t('A portfolio of work, decisions, and details.')}</p>
          <a
            href="#featured-project"
            aria-label={t('Scroll to featured project')}
          >
            <ArrowDown size={16} aria-hidden="true" />
            <span>{t('SCROLL TO EXPLORE')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
