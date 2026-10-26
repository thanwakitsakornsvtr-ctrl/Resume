import { useContent } from '../hooks/useContent'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Icon, SectionHeading, Tag } from '../components/ui'
import { usePortfolioStore } from '../store/usePortfolioStore'

export function CaseStudies() {
  const { caseStudies, t } = useContent()
  const setProjectView = usePortfolioStore((state) => state.setProjectView)

  return (
    <section
      id="case-studies"
      className="section section-thinking"
      aria-labelledby="thinking-heading"
    >
      <div className="container">
        <SectionHeading
          number="02"
          label={t('ENGINEERING CASE STUDIES')}
          title={
            <span id="thinking-heading">
              {t('Behind every interface,')}
              <br />
              {t('a set of decisions.')}
            </span>
          }
          description={t(
            'Technical notes from BCG Platform: debugging, deployment, and a province-model design exploration.',
          )}
        />
        <div className="case-studies-list">
          {caseStudies.map((study, index) => (
            <details
              key={study.id}
              id={study.id}
              className="case-study"
              data-reveal
            >
              <summary>
                <span className="case-icon">
                  <Icon name={study.icon} />
                </span>
                <span className="case-main">
                  <span className="case-category">
                    <span className="case-number">{study.number}</span> ·{' '}
                    {study.category}
                  </span>
                  <span className="case-title" role="heading" aria-level={3}>
                    {study.title}
                  </span>
                  <span className="case-summary">{study.summary}</span>
                  <span className="case-tags">
                    {study.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </span>
                </span>
                <span className="case-action">
                  <span>{t('Read case study')}</span>
                  <ArrowDownRight size={24} aria-hidden="true" />
                </span>
              </summary>
              <div className="case-detail">
                <div className="case-detail-header">
                  <p className="detail-sample-label">
                    <span className="tiny-dot" />
                    {study.recordLabel ?? t('Engineering notes')}
                  </p>
                  <a
                    href="#featured-project"
                    className="case-context-link"
                    onClick={() =>
                      setProjectView(index === 0 ? 'workspace' : 'architecture')
                    }
                  >
                    {index === 0
                      ? t('Inspect related screen')
                      : t('View Architecture')}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
                <div className="case-detail-grid">
                  {(
                    [
                      [t('The problem'), study.problem],
                      [t('The constraints'), study.constraints],
                      [t('Alternatives considered'), study.alternatives],
                      [t('The decision'), study.decision],
                      [t('The trade-off'), study.tradeoff],
                      [t('How to validate'), study.validation],
                    ] as const
                  ).map(([label, text]) => (
                    <div key={label} className="case-detail-box">
                      <h4>{label}</h4>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
                <blockquote>{study.lesson}</blockquote>
              </div>
            </details>
          ))}
        </div>
        <p className="section-footnote">
          {t('Good engineering makes the reasoning visible.')}
        </p>
      </div>
    </section>
  )
}
