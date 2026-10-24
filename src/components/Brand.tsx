import { useContent } from '../hooks/useContent'

export function Brand({
  showMark = true,
  href = '#home',
  onClick,
}: {
  showMark?: boolean
  href?: string
  onClick?: () => void
}) {
  const { t } = useContent()
  return (
    <a
      href={href}
      className="brand"
      aria-label={t('Thanwa Kitsakorn, home')}
      onClick={onClick}
    >
      {showMark && (
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
        </span>
      )}
      <span className="brand-wordmark" lang="en">
        <span className="brand-first">Thanwa</span>
        <span className="brand-last">
          Kitsakorn<span className="brand-period">.</span>
        </span>
      </span>
    </a>
  )
}
