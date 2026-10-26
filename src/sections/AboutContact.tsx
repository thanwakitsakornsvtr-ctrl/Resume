import { useContent } from '../hooks/useContent'
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  GraduationCap,
  Layers,
  Mail,
} from 'lucide-react'
import { SectionHeading } from '../components/ui'
import { useCopyEmail } from '../hooks/usePortfolioEffects'

export function AboutContact() {
  const { profile, t } = useContent()
  const { status, copy } = useCopyEmail(profile.email)
  return (
    <section
      id="about"
      className="section section-about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <SectionHeading
          number="05"
          label={t('ABOUT & CONTACT')}
          title={
            <span id="about-heading">
              {t('A little about')}
              <br />
              {t('the person behind the code.')}
            </span>
          }
        />

        <div className="about-bento-grid">
          <aside className="about-identity-card" data-reveal>
            <div className="profile-art" aria-hidden="true">
              <div className="profile-art-grid" />
              <span className="profile-orbit orbit-one" />
              <span className="profile-orbit orbit-two" />
              <div className="profile-monogram">
                <span>TK</span>
              </div>
              <span className="profile-art-caption">
                <span className="status-dot" />
                {t('ALWAYS A WORK IN PROGRESS.')}
              </span>
            </div>

            <div className="about-identity-body">
              <div className="profile-caption">
                <div>
                  <strong>{profile.name}</strong>
                  <span>
                    {profile.role}
                    {profile.contentStatus === 'sample'
                      ? t(' · Sample profile')
                      : ''}
                  </span>
                </div>
                <span className="status-pill is-online">
                  <span className="status-pill-dot" aria-hidden="true" />
                  {t('Experience')}
                </span>
              </div>

              {profile.education && (
                <div className="about-meta-block">
                  <div className="about-meta-label">
                    <GraduationCap size={15} aria-hidden="true" />
                    <span>{t('Education')}</span>
                  </div>
                  <div className="about-education-row">
                    <strong>{profile.education.field}</strong>
                    <span>{profile.education.status}</span>
                  </div>
                  {profile.education.institution && (
                    <p className="about-education-inst">
                      {profile.education.institution}
                    </p>
                  )}
                </div>
              )}

              <div className="about-meta-block">
                <div className="about-meta-label">
                  <Layers size={15} aria-hidden="true" />
                  <span>{t('CORE FOCUS')}</span>
                </div>
                <div className="about-focus-pills">
                  {profile.focus.map((item) => (
                    <span key={item} className="about-focus-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="about-meta-block">
                <div className="about-meta-label">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  <span>{t('WORKING PRINCIPLES')}</span>
                </div>
                <ul className="about-principles">
                  {profile.principles.map((principle) => (
                    <li key={principle}>
                      <span aria-hidden="true">↗</span>
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="about-right-column">
            <div className="about-story-card" data-reveal>
              <p className="about-lead">
                {t('Curious by nature.')}
                <br />
                <span>{t('Deliberate by practice.')}</span>
              </p>
              <div className="about-story-paragraphs">
                <p>{profile.about}</p>
                <p>{profile.interests}</p>
              </div>
              {(profile.links.length > 0 || profile.resumeUrl) && (
                <div className="about-links">
                  {profile.links.map((link) => (
                    <a key={link.href} href={link.href} className="text-link">
                      {link.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ))}
                  {profile.resumeUrl && (
                    <a href={profile.resumeUrl} className="text-link" download>
                      {t('Download resume')}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div id="contact" className="contact-panel" data-reveal>
              <div className="contact-panel-top">
                <p className="eyebrow">
                  <span className="tiny-dot" aria-hidden="true" />
                  {t('LET’S BUILD SOMETHING WORTH BUILDING.')}
                </p>
                <h3>
                  {t('Good work starts')}{' '}
                  <span>{t('with a conversation.')}</span>
                </h3>
              </div>

              <div className="contact-actions">
                <a href={`mailto:${profile.email}`} className="contact-email">
                  <div className="contact-email-left">
                    <span className="contact-email-icon" aria-hidden="true">
                      <Mail size={18} />
                    </span>
                    <span>{profile.email}</span>
                  </div>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </a>
                <div className="contact-secondary">
                  <a
                    className="button button-primary"
                    href={`mailto:${profile.email}`}
                  >
                    <Mail size={16} aria-hidden="true" />
                    {t('Say hello')}
                  </a>
                  <button
                    type="button"
                    className="copy-button"
                    onClick={() => void copy()}
                  >
                    {status === 'copied' ? (
                      <Check size={16} aria-hidden="true" />
                    ) : (
                      <Copy size={16} aria-hidden="true" />
                    )}
                    {status === 'copied' ? t('Copied!') : t('Copy email')}
                  </button>
                </div>
                <p className="copy-status" role="status" aria-live="polite">
                  {status === 'error'
                    ? t(
                        'Copy unavailable. Select the email above or choose Say hello.',
                      )
                    : status === 'copied'
                      ? t('Email address copied to clipboard.')
                      : t('A direct line. No forms, no friction.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
