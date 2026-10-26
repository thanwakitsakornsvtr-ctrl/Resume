import { ArrowUpRight, Layers, Server, Database } from 'lucide-react'
import { useContent } from '../hooks/useContent'
import { bcgScreenshots } from '../content/project-assets'
import { usePortfolioStore } from '../store/usePortfolioStore'

const layerIcons = [Layers, Server, Database]

export function SystemIllustration() {
  const { architectureLayers, featuredProject, locale, t } = useContent()
  const setProjectView = usePortfolioStore((state) => state.setProjectView)
  const heroScreen = bcgScreenshots[0]

  return (
    <div className="hero-showcase">
      <div className="hero-showcase-header">
        <div className="hero-window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="hero-showcase-kicker">
          <span className="tiny-dot" />
          {t('REAL-WORLD SYSTEMS & ARCHITECTURE')}
        </span>
        <span className="hero-showcase-badge">{featuredProject.stage}</span>
      </div>

      {heroScreen && (
        <a
          href="#featured-project"
          className="hero-showcase-screen"
          onClick={() => setProjectView('workspace')}
          aria-label={`${t('Featured System')}: ${featuredProject.title}`}
        >
          <img
            src={heroScreen.src}
            alt={heroScreen.alt[locale]}
            width={heroScreen.width}
            height={heroScreen.height}
            decoding="async"
          />
          <span className="hero-screen-overlay">
            <span>
              <strong>{featuredProject.title}</strong>
              <small>{featuredProject.scope}</small>
            </span>
            <span className="hero-screen-cta">
              {t('Product view')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </span>
        </a>
      )}

      <div className="hero-architecture-stack">
        {architectureLayers.map((layer, index) => {
          const LayerIcon = layerIcons[index] ?? Layers
          return (
            <div key={layer.number} className="hero-arch-row">
              <span className="hero-arch-icon" aria-hidden="true">
                <LayerIcon size={16} />
              </span>
              <div className="hero-arch-copy">
                <div className="hero-arch-title">
                  <span className="hero-arch-num">{layer.number}</span>
                  <strong>{layer.name}</strong>
                </div>
                <p>{layer.detail}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="hero-showcase-footer">
        <span>{t('Clarity at every layer.')}</span>
        <a
          href="#featured-project"
          className="hero-arch-link"
          onClick={() => setProjectView('architecture')}
        >
          {t('View Architecture')}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
