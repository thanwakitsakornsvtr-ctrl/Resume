import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useContent } from '../hooks/useContent'
import { Icon, SectionHeading } from '../components/ui'

const workflowTags = [
  'TypeScript',
  'Node.js & Express',
  'Prisma & PostgreSQL',
  'Docker & VPS',
  'Reverse Proxy & HTTPS',
] as const

export function EngineeringPractices() {
  const { practices, t } = useContent()
  return (
    <section
      id="practices"
      className="section section-practices"
      aria-labelledby="practices-heading"
    >
      <div className="container">
        <SectionHeading
          number="04"
          label={t('ENGINEERING PRACTICES')}
          title={
            <span id="practices-heading">
              {t('The work behind')}
              <br />
              {t('work that lasts.')}
            </span>
          }
          description={t(
            'Good software is more than its happy path. These are the principles behind the way I approach building.',
          )}
        />

        <div className="practices-bento-grid">
          {practices.map((practice) => (
            <article
              className="practice-card"
              key={practice.number}
              data-reveal
              data-hover-card
            >
              <div className="practice-card-top">
                <div className="practice-icon">
                  <Icon name={practice.icon} size={20} />
                </div>
                <span className="practice-number" aria-hidden="true">
                  {practice.number}
                </span>
              </div>
              <h3>{practice.title}</h3>
              <p className="practice-card-desc">{practice.description}</p>
              <div className="practice-evidence-box">
                <span className="practice-evidence-label">
                  <span className="tiny-dot" aria-hidden="true" />
                  {t('In practice')}
                </span>
                <p>{practice.example}</p>
              </div>
            </article>
          ))}

          <aside
            className="practice-summary-card"
            data-reveal
            aria-label={t('SYSTEM WORKFLOW')}
          >
            <div className="practice-summary-top">
              <span className="practice-summary-badge">
                <Sparkles size={14} aria-hidden="true" />
                {t('SYSTEM WORKFLOW')}
              </span>
              <span className="practice-summary-number" aria-hidden="true">
                06
              </span>
            </div>
            <h3>
              {t('Principles are useful.')}
              <br />
              <span>{t('Putting them into practice is better.')}</span>
            </h3>
            <p className="practice-summary-desc">
              {t('From root-cause analysis to production delivery.')}
            </p>
            <div className="practice-summary-tags">
              {workflowTags.map((tag) => (
                <span key={tag} className="practice-summary-tag">
                  {tag}
                </span>
              ))}
            </div>
            <a className="practice-summary-link" href="#featured-project">
              <span>{t('Explore my work')}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
