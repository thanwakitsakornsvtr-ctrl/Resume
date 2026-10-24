import { useEffect, useRef } from 'react'
import { ArrowUpRight, Mail, Menu, X } from 'lucide-react'
import { useContent } from '../hooks/useContent'
import { usePortfolioStore } from '../store/usePortfolioStore'
import { useActiveSection } from '../hooks/usePortfolioEffects'
import { useCompactHeader } from '../hooks/useCompactHeader'
import { Brand } from '../components/Brand'
import { MusicToggle } from '../components/MusicToggle'
import { LanguageDropdown } from '../components/LanguageDropdown'

export function SiteHeader({ homeHref = '' }: { homeHref?: string }) {
  const { navigation, profile, t } = useContent()
  const menuOpen = usePortfolioStore((state) => state.menuOpen)
  const setMenuOpen = usePortfolioStore((state) => state.setMenuOpen)
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const menuButton = useRef<HTMLButtonElement>(null)
  const { ref, compact } = useCompactHeader()
  useActiveSection()
  const currentSection = homeHref ? 'featured-project' : activeSection

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const media = window.matchMedia('(min-width: 1100px)')
    const onResize = () => {
      if (media.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    media.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      media.removeEventListener('change', onResize)
    }
  }, [menuOpen, setMenuOpen])

  return (
    <>
      <a className="skip-link" href="#main">
        {t('Skip to content')}
      </a>
      <header className="site-header" data-compact={compact}>
        <div ref={ref} className="container header-inner">
          <Brand href={`${homeHref}#home`} onClick={() => setMenuOpen(false)} />
          <nav aria-label={t('Main navigation')} className="desktop-nav">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`${homeHref}#${item.id}`}
                aria-current={
                  currentSection === item.id ? 'location' : undefined
                }
              >
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <MusicToggle />
            <LanguageDropdown />
            <span className="header-action-divider" aria-hidden="true" />
            <a
              className="header-contact"
              href={`mailto:${profile.email}`}
              aria-label={t('Let’s talk')}
            >
              <span className="header-contact-label">{t('Let’s talk')}</span>
              <span className="header-contact-icon">
                <ArrowUpRight size={16} aria-hidden="true" />
                <Mail
                  className="mobile-contact-icon"
                  size={16}
                  aria-hidden="true"
                />
              </span>
            </a>
            <button
              ref={menuButton}
              className="menu-toggle"
              type="button"
              aria-label={
                menuOpen ? t('Close navigation') : t('Open navigation')
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <nav
          id="mobile-navigation"
          aria-label={t('Mobile navigation')}
          className="mobile-nav"
          hidden={!menuOpen}
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`${homeHref}#${item.id}`}
              aria-current={currentSection === item.id ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
          <a
            className="mobile-menu-contact"
            href={`mailto:${profile.email}`}
            onClick={() => setMenuOpen(false)}
          >
            {t('Let’s talk')}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </header>
    </>
  )
}
