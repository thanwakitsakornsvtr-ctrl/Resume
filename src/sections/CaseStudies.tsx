import { useContent } from '../hooks/useContent'
import { ArrowDownRight } from 'lucide-react'
import { Icon, SectionHeading, Tag } from '../components/ui'
export function CaseStudies() {
  const { caseStudies, t } = useContent()
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
          {caseStudies.map((study) => (
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
                  <span className="case-category">{study.category}</span>
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
                <p className="detail-sample-label">
                  {study.recordLabel ?? t('Engineering notes')}
                </p>
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
                    <div key={label}>
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
