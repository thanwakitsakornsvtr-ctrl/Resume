import { useContent } from '../hooks/useContent'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { SystemIllustration } from '../components/SystemIllustration'
export function Hero() {
  const { profile, t } = useContent()
  return (
    <section
      id="home"
      className="hero-section container"
      aria-labelledby="hero-title"
    >
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow" data-hero-reveal>
          <span className="status-dot" />
          {profile.role.toUpperCase()}{' '}
          <span className="eyebrow-divider">/</span>{' '}
          {profile.contentStatus === 'sample'
            ? t('SAMPLE PROFILE')
            : profile.name.toUpperCase()}
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
          className="hero-actions flex flex-wrap items-center gap-8"
          data-hero-reveal
        >
          <a href="#featured-project" className="button button-primary">
            {t('Explore my work')}
            <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a href="#contact" className="text-link">
            {t('Get in touch')}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-focus" data-hero-reveal>
          {profile.focus.map((focus) => (
            <span key={focus}>{focus}</span>
          ))}
        </div>
      </div>
      <div data-hero-reveal className="hero-visual">
        <SystemIllustration />
      </div>
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
    </section>
  )
}
