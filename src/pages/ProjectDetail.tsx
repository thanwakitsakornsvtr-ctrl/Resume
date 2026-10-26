import {
  ArrowLeft,
  ArrowUpRight,
  Layers,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { useContent } from '../hooks/useContent'
import { ProjectLinks } from '../components/ProjectLinks'
import { ProjectMedia } from '../components/ProjectMedia'
import { ProjectPreview } from '../components/ProjectPreview'
import { ProjectGallery } from '../components/ProjectGallery'
import { Tag } from '../components/ui'
import type { Project } from '../types/content'

const noteIcons = [Wrench, Layers, ShieldCheck] as const

export function ProjectDetail({ project }: { project: Project }) {
  const { projects, profile, locale, t } = useContent()
  const otherProjects = projects.filter((item) => item.id !== project.id)
  const isOnline = Boolean(project.demoUrl)

  return (
    <article
      className="project-page container"
      aria-labelledby="project-heading"
    >
      <nav className="project-breadcrumb" aria-label={t('Breadcrumb')}>
        <a className="project-back-pill" href="/#selected-projects">
          <ArrowLeft size={16} aria-hidden="true" />
          {t('Back to projects')}
        </a>
        <span className={`status-pill ${isOnline ? 'is-online' : 'is-live'}`}>
          <span className="status-pill-dot" aria-hidden="true" />
          {project.stage ?? t('Project')}
        </span>
      </nav>

      <div className="project-hero-shell" data-hero-reveal>
        <div className="project-hero-grid">
          <header className="project-page-heading">
            <p className="eyebrow project-eyebrow">
              <span className="tiny-dot" aria-hidden="true" />
              <span>{project.category}</span>
            </p>
            <h1 id="project-heading">{project.title}</h1>
            <p className="project-page-introduction">{project.description}</p>

            <div className="project-stack-box">
              <span className="project-stack-label">
                {t('Tech stack & capabilities')}
              </span>
              <div className="project-page-tags">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            <ProjectLinks assets={project} title={project.title} />
          </header>

          <div
            className={`project-page-visual${project.screenshots?.length ? ' project-page-gallery' : ''}`}
          >
            {project.screenshots?.length ? (
              <ProjectGallery
                screenshots={project.screenshots}
                projectName={project.title}
                note={project.screenshotNote?.[locale]}
              >
                <ProjectPreview type={project.preview} />
              </ProjectGallery>
            ) : (
              <ProjectMedia image={project.image} variant="featured">
                <ProjectPreview type={project.preview} />
              </ProjectMedia>
            )}
          </div>
        </div>
      </div>

      <section
        className="project-breakdown-section"
        aria-labelledby="breakdown-heading"
      >
        <div className="project-section-header">
          <p className="eyebrow">
            <span className="section-number">01</span>
            <span>{t('ENGINEERING BREAKDOWN')}</span>
          </p>
          <h2 id="breakdown-heading">
            {t('Architecture, ownership, and scope')}
          </h2>
        </div>

        <div className="project-page-notes">
          {(
            [
              [t('Contribution'), project.contribution],
              [t('Design decision'), project.decision],
              [t('Scope'), project.limitation],
            ] as const
          ).map(([title, description], index) => {
            const Icon = noteIcons[index] ?? Wrench
            return (
              <section
                className="project-page-note"
                key={title}
                aria-labelledby={`note-${index}`}
              >
                <div className="project-note-top">
                  <span className="decision-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="project-note-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                </div>
                <h3 id={`note-${index}`}>{title}</h3>
                <p>{description}</p>
              </section>
            )
          })}
        </div>
      </section>

      <aside className="project-page-more" aria-labelledby="more-projects">
        <div className="project-section-header">
          <p className="eyebrow">
            <span className="section-number">02</span>
            <span>{t('SELECTED PROJECTS')}</span>
          </p>
          <h2 id="more-projects">{t('More projects')}</h2>
        </div>
        <div className="related-projects">
          {otherProjects.map((item) => (
            <a key={item.id} href={`/projects/${item.id}/`}>
              <div className="related-project-copy">
                <div className="related-project-meta">
                  <small>{item.category}</small>
                  {item.stage && (
                    <span className="status-pill is-online">
                      <span className="status-pill-dot" aria-hidden="true" />
                      {item.stage}
                    </span>
                  )}
                </div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
              <span className="related-project-arrow" aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
            </a>
          ))}
        </div>
      </aside>

      <div className="project-page-bottom">
        <a className="text-link" href="/#selected-projects">
          <ArrowLeft size={16} aria-hidden="true" />
          {t('Back to projects')}
        </a>
        <a className="text-link" href={`mailto:${profile.email}`}>
          {t('Discuss this project')}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
