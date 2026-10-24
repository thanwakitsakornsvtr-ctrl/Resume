import { ArrowUp } from 'lucide-react'
import { useContent } from '../hooks/useContent'
import { Brand } from '../components/Brand'
import { backgroundMusic } from '../content/music'

export function SiteFooter({ homeHref = '' }: { homeHref?: string }) {
  const { profile, t } = useContent()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <Brand showMark={false} href={`${homeHref}#home`} />
          <p>{t('Thoughtfully designed. Carefully engineered.')}</p>
          <a href={homeHref ? '#page-top' : '#home'} className="back-top">
            {t('Back to top')}
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="music-credit">
          {t('Background music')}:{' '}
          <a href={backgroundMusic.sourceUrl}>
            {backgroundMusic.title} — {backgroundMusic.artist}
          </a>{' '}
          · <a href={backgroundMusic.licenseUrl}>{backgroundMusic.license}</a>
        </p>
        <div className="footer-bottom">
          <span>
            © {profile.copyrightYear} · {t('Engineering portfolio')}
          </span>
          <p>
            {t(
              'Project-based experience. Some project details are being refined.',
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
