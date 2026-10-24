import { useContent } from '../hooks/useContent'
import { ProjectLinks } from '../components/ProjectLinks'
import { ProjectMedia } from '../components/ProjectMedia'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading, Tag } from '../components/ui'
import { ProjectPreview } from '../components/ProjectPreview'
export function SelectedProjects() {
  const { projects, t } = useContent()
  return (
    <section
      id="selected-projects"
      className="section section-projects"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <SectionHeading
          number="03"
          label={t('SELECTED PROJECTS')}
          title={
            <span id="projects-heading">
              {t('Different problems.')}
              <br />
              {t('The same attention to detail.')}
            </span>
          }
          description={t(
            'Project experience and early concepts across IoT, learning platforms, and public information.',
          )}
        />
        <div className="projects-grid">
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.id}
              data-reveal
              data-hover-card
            >
              <ProjectMedia image={project.image} variant="selected">
                <ProjectPreview type={project.preview} />
              </ProjectMedia>
              <div className="project-card-body">
                <p className="project-category">{project.category}</p>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <span className="sample-small">
                    {project.stage ?? t('Project')}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className="project-card-links">
                  <ProjectLinks assets={project} title={project.title} />
                </div>
                <a
                  className="project-detail-link"
                  href={`/projects/${project.id}/`}
                  aria-label={`${t('Explore project')}: ${project.title}`}
                >
                  {t('Explore project')}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
