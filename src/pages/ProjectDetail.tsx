import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useContent } from '../hooks/useContent'
import { ProjectLinks } from '../components/ProjectLinks'
import { ProjectMedia } from '../components/ProjectMedia'
import { ProjectPreview } from '../components/ProjectPreview'
import { Tag } from '../components/ui'
import type { Project } from '../types/content'

export function ProjectDetail({ project }: { project: Project }) {
  const { projects, profile, t } = useContent()
  const otherProjects = projects.filter((item) => item.id !== project.id)
  return (
    <article
      className="project-page container"
      aria-labelledby="project-heading"
    >
      <nav className="project-breadcrumb" aria-label={t('Breadcrumb')}>
        <a className="text-link" href="/#selected-projects">
          <ArrowLeft size={16} aria-hidden="true" />
          {t('Back to projects')}
        </a>
      </nav>
      <header className="project-page-heading" data-hero-reveal>
        <p className="eyebrow">{project.category}</p>
        <h1 id="project-heading">{project.title}</h1>
        <span className="concept-badge">{project.stage ?? t('Project')}</span>
        <p className="project-page-introduction">{project.description}</p>
        <div className="project-page-tags">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <ProjectLinks assets={project} title={project.title} />
      </header>
      <div className="project-page-visual">
        <ProjectMedia image={project.image} variant="featured">
          <ProjectPreview type={project.preview} />
        </ProjectMedia>
      </div>
      <div className="project-page-notes">
        {[
          [t('Contribution'), project.contribution],
          [t('Design decision'), project.decision],
          [t('Scope'), project.limitation],
        ].map(([title, description], index) => (
          <section
            className="project-page-note"
            key={title}
            aria-labelledby={`note-${index}`}
          >
            <span className="decision-number" aria-hidden="true">
              0{index + 1}
            </span>
            <h2 id={`note-${index}`}>{title}</h2>
            <p>{description}</p>
          </section>
        ))}
      </div>
      <aside className="project-page-more" aria-labelledby="more-projects">
        <h2 id="more-projects">{t('More projects')}</h2>
        <div className="related-projects">
          {otherProjects.map((item) => (
            <a key={item.id} href={`/projects/${item.id}/`}>
              <span>
                <small>{item.category}</small>
                <strong>{item.title}</strong>
              </span>
              <ArrowUpRight size={24} aria-hidden="true" />
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
