import { useEffect } from 'react'
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
  const scope = usePortfolioMotion()
  useLocaleEffects()
  const initializeMusic = useMusicStore((state) => state.initialize)
  useEffect(() => initializeMusic(), [initializeMusic])
  const { projects, t } = useContent()
  const pagePath = pathname.replace(/\/index\.html$/, '/')
  const isHome = pagePath === '/'
  const projectId = /^\/projects\/([a-z0-9-]+)\/?$/.exec(pagePath)?.[1]
  const project = projects.find((item) => item.id === projectId)
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
