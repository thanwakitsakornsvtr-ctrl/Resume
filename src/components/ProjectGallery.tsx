import { useRef, useState, type ReactNode } from 'react'
import { Maximize2 } from 'lucide-react'
import { useContent } from '../hooks/useContent'
import type { ProjectScreenshot } from '../types/content'
import { ScreenshotViewer } from './ScreenshotViewer'
import './project-gallery.css'

export function ProjectGallery({
  screenshots,
  projectName,
  note,
  children,
}: {
  screenshots: ProjectScreenshot[]
  projectName: string
  note?: string
  children: ReactNode
}) {
  const { locale } = useContent()
  const [selected, setSelected] = useState(0)
  const [failedSources, setFailedSources] = useState<string[]>([])
  const [viewing, setViewing] = useState(false)
  const openButton = useRef<HTMLButtonElement>(null)
  const image = screenshots[selected]
  if (!image) return children
  const failed = failedSources.includes(image.src)

  return (
    <div className="project-gallery">
      <div className="project-gallery-heading">
        <span>
          {locale === 'th'
            ? 'ภาพหน้าจอจากระบบจริง'
            : 'Actual application screens'}
        </span>
        <span>
          {String(selected + 1).padStart(2, '0')} /{' '}
          {String(screenshots.length).padStart(2, '0')}
        </span>
      </div>
      <figure>
        <div className="project-gallery-stage">
          {failed ? (
            children
          ) : (
            <button
              ref={openButton}
              type="button"
              className="project-gallery-open"
              aria-haspopup="dialog"
              aria-expanded={viewing}
              onClick={() => setViewing(true)}
              aria-label={`${locale === 'th' ? 'ดูภาพเต็ม' : 'View full screen'}: ${image.title[locale]}`}
            >
              <img
                key={image.src}
                src={image.src}
                alt={image.alt[locale]}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                onError={() =>
                  setFailedSources((sources) => [...sources, image.src])
                }
              />
              <span className="project-gallery-expand">
                {locale === 'th' ? 'ดูภาพเต็ม' : 'View full screen'}
                <Maximize2 size={16} aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
        <figcaption
          className="project-gallery-caption"
          aria-live="polite"
          aria-atomic="true"
        >
          <h3>{image.title[locale]}</h3>
          <p>{image.caption[locale]}</p>
        </figcaption>
      </figure>
      <div
        className="project-gallery-choices"
        role="group"
        style={{
          gridTemplateColumns: `repeat(${Math.min(screenshots.length, 3)}, minmax(0, 1fr))`,
        }}
        aria-label={`${locale === 'th' ? 'เลือกภาพหน้าจอ' : 'Choose a screenshot'}: ${projectName}`}
      >
        {screenshots.map((screenshot, index) => (
          <button
            type="button"
            key={screenshot.id}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <span className="project-gallery-thumbnail" aria-hidden="true">
              <img
                src={screenshot.src}
                alt=""
                width={screenshot.width}
                height={screenshot.height}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="project-gallery-choice-label">
              <span className="project-gallery-number" aria-hidden="true">
                0{index + 1}
              </span>
              {screenshot.title[locale]}
            </span>
          </button>
        ))}
      </div>
      {note && <p className="project-gallery-note">{note}</p>}
      {viewing && (
        <ScreenshotViewer
          screenshots={screenshots}
          selected={selected}
          projectName={projectName}
          onSelect={setSelected}
          onDismiss={() => setViewing(false)}
          returnFocus={openButton}
        />
      )}
    </div>
  )
}
