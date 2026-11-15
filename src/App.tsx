import { useEffect, useState } from 'react'
import { useMusicStore } from './store/useMusicStore'
import { SiteHeader } from './layouts/SiteHeader'
import { SiteFooter } from './layouts/SiteFooter'
import { Hero } from './sections/Hero'
import { FeaturedProject } from './sections/FeaturedProject'
import { CaseStudies } from './sections/CaseStudies'
import { SelectedProjects } from './sections/SelectedProjects'
import { EngineeringPractices } from './sections/EngineeringPractices'
import { AboutContact } from './sections/AboutContact'
import { usePortfolioMotion } from './hooks/usePortfolioEffects'
import { useLocaleEffects } from './hooks/useLocaleEffects'
import { LanguageDialog } from './components/LanguageDialog'
import { ProjectDetail } from './pages/ProjectDetail'
import { useContent } from './hooks/useContent'

export default function App({ pathname = '/' }: { pathname?: string }) {
  const [currentPath, setCurrentPath] = useState(pathname)
  const pagePath = currentPath.replace(/\/index\.html$/, '/')
  const scope = usePortfolioMotion(pagePath)
  useLocaleEffects()
  const initializeMusic = useMusicStore((state) => state.initialize)
  useEffect(() => initializeMusic(), [initializeMusic])
  const { projects, t } = useContent()
  const isHome = pagePath === '/'
  const projectId = /^\/projects\/([a-z0-9-]+)\/?$/.exec(pagePath)?.[1]
  const project = projects.find((item) => item.id === projectId)

  useEffect(() => {
    document.title = project ? `${project.title} | Thanwa` : 'Resume | Thanwa'
  }, [project])

  useEffect(() => {
    const scrollToTarget = (hash: string) => {
      requestAnimationFrame(() => {
        if (hash) {
          const target = document.getElementById(
            decodeURIComponent(hash.slice(1)),
          )
          if (target) {
            target.scrollIntoView()
            return
          }
        }
        window.scrollTo(0, 0)
      })
    }

    const onPopState = () => {
      setCurrentPath(window.location.pathname)
      scrollToTarget(window.location.hash)
    }

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (
        anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')
      )
        return

      const url = new URL(anchor.href, window.location.href)
      if (
        url.origin !== window.location.origin ||
        !['http:', 'https:'].includes(url.protocol)
      )
        return

      if (url.pathname === window.location.pathname) return

      event.preventDefault()
      window.history.pushState(null, '', url.pathname + url.search + url.hash)
      setCurrentPath(url.pathname)
      scrollToTarget(url.hash)
    }

    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', onClick)
    }
  }, [])
  return (
    <div ref={scope} className="portfolio" id="page-top">
      <SiteHeader homeHref={isHome ? '' : '/'} />
      <main id="main" tabIndex={-1}>
        {isHome ? (
          <>
            <Hero />
            <FeaturedProject />
            <CaseStudies />
            <SelectedProjects />
            <EngineeringPractices />
            <AboutContact />
          </>
        ) : project ? (
          <ProjectDetail project={project} />
        ) : (
          <div className="project-page container" data-hero-reveal>
            <h1>{t('Page not found')}</h1>
            <a className="text-link" href="/#selected-projects">
              {t('Back to projects')}
            </a>
          </div>
        )}
      </main>
      <SiteFooter homeHref={isHome ? '' : '/'} />
      <LanguageDialog />
    </div>
  )
}
