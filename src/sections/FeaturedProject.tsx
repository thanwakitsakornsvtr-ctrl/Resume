import { useContent } from '../hooks/useContent'
import { ProjectLinks } from '../components/ProjectLinks'
import { ProjectMedia } from '../components/ProjectMedia'
import { ArrowUpRight, ArrowRight, Layers3, ShieldCheck } from 'lucide-react'
import { SectionHeading, Tag } from '../components/ui'
import {
  ArchitecturePreview,
  WorkspacePreview,
} from '../components/WorkspacePreview'
import { usePortfolioStore } from '../store/usePortfolioStore'
import type { KeyboardEvent } from 'react'

export function FeaturedProject() {
  const { featuredProject, t } = useContent()
  const view = usePortfolioStore((state) => state.projectView)
  const setView = usePortfolioStore((state) => state.setProjectView)

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next =
      event.key === 'Home'
        ? 'workspace'
        : event.key === 'End'
          ? 'architecture'
          : view === 'workspace'
            ? 'architecture'
            : 'workspace'
    setView(next)
    document.getElementById(`tab-${next}`)?.focus()
  }

  return (
    <section
      id="featured-project"
      className="section section-featured"
      aria-labelledby="featured-title"
    >
      <div className="container">
        <SectionHeading
          number="01"
          label={t('FEATURED PROJECT')}
          title={
            <>
              {t('One system.')}
              <br className="mobile-break" /> {t('Many thoughtful decisions.')}
            </>
          }
          description={t(
            'A closer look at the problem, the thinking, and the details that bring it together.',
          )}
        />
        <article className="featured-card" data-reveal>
          <div className="featured-intro">
            <div className="featured-intro-main">
              <div className="featured-brand">
                <span className="project-logo">
                  <Layers3 size={24} aria-hidden="true" />
                </span>
                <h3 id="featured-title">{featuredProject.title}</h3>
                <span className="status-pill is-live">
                  <span className="status-pill-dot" />
                  {featuredProject.stage}
                </span>
                <span className="concept-badge">{featuredProject.scope}</span>
              </div>
              <p className="featured-tagline">{featuredProject.eyebrow}</p>
              <p className="featured-description">
                {featuredProject.description}
              </p>
              <ProjectLinks
                assets={featuredProject}
                title={featuredProject.title}
              />
            </div>
            <a
              href="#case-studies"
              className="round-link"
              aria-label={`${t('Explore project decisions')}: ${featuredProject.title}`}
            >
              <ArrowUpRight size={24} aria-hidden="true" />
            </a>
          </div>

          {/* 4.3.2 Law of Common Region & 4.3.4 Unhidden Decision-Critical Context */}
          <div className="featured-ownership-grid">
            <div className="ownership-box">
              <span className="ownership-label">{t('The problem.')}</span>
              <p>{featuredProject.problem}</p>
            </div>
            <div className="ownership-box is-accent">
              <span className="ownership-label">
                <ShieldCheck size={16} aria-hidden="true" />
                {t('Contribution.')}
              </span>
              <p>{featuredProject.responsibility}</p>
            </div>
          </div>

          <div className="project-preview-area">
            <div
              className="project-view-tabs"
              role="tablist"
              aria-label={`${t('Project preview')}: ${featuredProject.title}`}
            >
              {(['workspace', 'architecture'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  id={`tab-${tab}`}
                  role="tab"
                  aria-selected={view === tab}
                  aria-controls={`panel-${tab}`}
                  tabIndex={view === tab ? 0 : -1}
                  onKeyDown={onTabKey}
                  onClick={() => setView(tab)}
                >
                  {tab === 'workspace' ? t('Product view') : t('System design')}
                </button>
              ))}
            </div>
            <div
              id="panel-workspace"
              role="tabpanel"
              aria-labelledby="tab-workspace"
              tabIndex={0}
              hidden={view !== 'workspace'}
            >
              <ProjectMedia image={featuredProject.image} variant="featured">
                <WorkspacePreview />
              </ProjectMedia>
            </div>
            <div
              id="panel-architecture"
              role="tabpanel"
              aria-labelledby="tab-architecture"
              tabIndex={0}
              hidden={view !== 'architecture'}
            >
              <ProjectMedia
                image={featuredProject.architectureImage}
                variant="featured"
              >
                <ArchitecturePreview />
              </ProjectMedia>
            </div>
            <p className="preview-caption">
              <span className="tiny-dot" />
              {t('PROJECT PREVIEW')} · {t('Development capture')}
              {featuredProject.contentStatus === 'sample' &&
                ` · ${t('SAMPLE CONTENT')}`}
            </p>
          </div>

          <div className="featured-decisions">
            {featuredProject.decisions.map((decision, index) => (
              <div key={decision.title} className="featured-decision-card">
                <span className="decision-number">0{index + 1}</span>
                <h4>{decision.title}</h4>
                <p>{decision.description}</p>
              </div>
            ))}
          </div>

          <div className="featured-bottom">
            <div className="flex flex-wrap gap-2">
              {featuredProject.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <a href="#case-studies" className="text-link">
              {t('Explore the thinking')}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <details className="scope-details">
            <summary>
              {t('Project context & scope')}
              <span className="plus-mark" aria-hidden="true">
                +
              </span>
            </summary>
            <div>
              <p>
                <strong>{t('Scope.')}</strong> {featuredProject.limitations}
              </p>
            </div>
          </details>
        </article>
      </div>
    </section>
  )
}
