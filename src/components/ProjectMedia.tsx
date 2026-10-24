import { useState, type ReactNode } from 'react'
import type { ProjectImage } from '../types/content'
import { useContent } from '../hooks/useContent'

export function ProjectMedia({
  image,
  variant,
  children,
}: {
  image?: ProjectImage
  variant: 'featured' | 'selected'
  children: ReactNode
}) {
  const { locale } = useContent()
  const [failedSource, setFailedSource] = useState<string>()
  if (!image || failedSource === image.src) return children
  return (
    <div className={`project-media project-media-${variant}`}>
      <img
        src={image.src}
        alt={image.alt[locale]}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        onError={() => setFailedSource(image.src)}
      />
    </div>
  )
}
