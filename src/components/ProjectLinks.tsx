import { ArrowUpRight, Code2 } from 'lucide-react'
import type { ProjectAssets } from '../types/content'
import { useContent } from '../hooks/useContent'

function webUrl(value?: string) {
  if (!value?.trim()) return undefined
  try {
    const url = new URL(value.trim())
    return ['https:', 'http:'].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : undefined
  } catch {
    return undefined
  }
}

export function ProjectLinks({
  assets,
  title,
}: {
  assets: ProjectAssets
  title: string
}) {
  const { t } = useContent()
  const demo = webUrl(assets.demoUrl)
  const source = webUrl(assets.sourceUrl)
  if (!demo && !source) return null
  return (
    <div className="project-external-links">
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="project-demo-link"
          aria-label={`${t('Open demo')}: ${title} (${t('Opens in a new tab')})`}
        >
          {t('Open demo')}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
      {source && (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="project-source-link"
          aria-label={`${t('View source')}: ${title} (${t('Opens in a new tab')})`}
        >
          <Code2 size={16} aria-hidden="true" />
          {t('View source')}
        </a>
      )}
    </div>
  )
}
