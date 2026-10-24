import { useContent } from '../hooks/useContent'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
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
        <div className="about-grid">
          <div className="about-profile" data-reveal>
            <div className="profile-art" aria-hidden="true">
              <div className="profile-art-grid" />
              <span className="profile-orbit orbit-one" />
              <span className="profile-orbit orbit-two" />
              <span className="profile-art-symbol">↗</span>
              <span className="profile-art-caption">
                {t('ALWAYS A WORK IN PROGRESS.')}
              </span>
            </div>
            <div className="profile-caption">
              <strong>{profile.name}</strong>
              <span>
                {profile.role}
                {profile.contentStatus === 'sample'
                  ? t(' · Sample profile')
                  : ''}
              </span>
            </div>
          </div>
          <div className="about-copy" data-reveal>
            <p className="about-lead">
              {t('Curious by nature.')}
              <br />
              {t('Deliberate by practice.')}
            </p>
            <p>{profile.about}</p>
            <p>{profile.interests}</p>
            {profile.education && (
              <div className="education-note">
                <span>{t('Education')}</span>
                <strong>{profile.education.field}</strong>
                <p>{profile.education.status}</p>
                {profile.education.institution && (
                  <p>{profile.education.institution}</p>
                )}
              </div>
            )}
            <ul className="about-principles">
              {profile.principles.map((principle) => (
                <li key={principle}>
                  <span aria-hidden="true">↗</span>
                  {principle}
                </li>
              ))}
            </ul>
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
          </div>
        </div>
        <div id="contact" className="contact-panel" data-reveal>
          <div>
            <p className="eyebrow">
              {t('LET’S BUILD SOMETHING WORTH BUILDING.')}
            </p>
            <h3>
              {t('Good work starts')}
              <br />
              {t('with a conversation.')}
            </h3>
          </div>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="contact-email">
              <span>{profile.email}</span>
              <ArrowUpRight size={24} aria-hidden="true" />
            </a>
            <div className="contact-secondary">
              <a className="text-link" href={`mailto:${profile.email}`}>
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
    </section>
  )
}
