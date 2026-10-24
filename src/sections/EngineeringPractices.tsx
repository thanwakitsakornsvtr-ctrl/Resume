import { useContent } from '../hooks/useContent'
import { Icon, SectionHeading } from '../components/ui'
export function EngineeringPractices() {
  const { practices, t } = useContent()
  return (
    <section
      id="practices"
      className="section section-practices"
      aria-labelledby="practices-heading"
    >
      <div className="container practices-layout">
        <div className="practices-intro">
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
          />
          <p className="practices-description">
            {t(
              'Good software is more than its happy path. These are the principles behind the way I approach building.',
            )}
          </p>
          <div className="practice-note">
            <span className="tiny-dot" />
            <p>
              {t('Principles are useful.')}
              <br />
              {t('Putting them into practice is better.')}
            </p>
          </div>
        </div>
        <div className="practices-list">
          {practices.map((practice) => (
            <div className="practice-item" key={practice.number} data-reveal>
              <div className="practice-icon">
                <Icon name={practice.icon} size={20} />
              </div>
              <div>
                <h3>{practice.title}</h3>
                <p>{practice.description}</p>
                <details className="practice-example">
                  <summary>
                    {t('In practice')}
                    <span className="plus-mark" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{practice.example}</p>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
