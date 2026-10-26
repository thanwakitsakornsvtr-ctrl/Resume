import { useEffect, useId, useRef, useState, type RefObject } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useContent } from '../hooks/useContent'
import type { ProjectScreenshot } from '../types/content'
import './screenshot-viewer.css'

export function ScreenshotViewer({
  screenshots,
  selected,
  projectName,
  onSelect,
  onDismiss,
  returnFocus,
}: {
  screenshots: ProjectScreenshot[]
  selected: number
  projectName: string
  onSelect: (index: number) => void
  onDismiss: () => void
  returnFocus: RefObject<HTMLButtonElement | null>
}) {
  const { locale } = useContent()
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [zoomed, setZoomed] = useState(false)
  const image = screenshots[selected]

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    const trigger = returnFocus.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    element.showModal()
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus({ preventScroll: true })
    }
  }, [returnFocus])

  if (!image) return null

  function move(direction: number) {
    onSelect((selected + direction + screenshots.length) % screenshots.length)
    setZoomed(false)
  }

  const zoomLabel = zoomed
    ? locale === 'th'
      ? 'ย่อให้พอดีจอ'
      : 'Fit to screen'
    : locale === 'th'
      ? 'ขยายภาพ'
      : 'Zoom in'

  return (
    <dialog
      ref={dialog}
      className="screenshot-viewer"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onDismiss()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          const targets = [
            ...event.currentTarget.querySelectorAll<HTMLElement>(
              'button:not(:disabled), [tabindex="0"]',
            ),
          ]
          const first = targets[0]
          const last = targets.at(-1)
          if (event.shiftKey && document.activeElement === first && last) {
            event.preventDefault()
            last.focus()
          } else if (
            !event.shiftKey &&
            document.activeElement === last &&
            first
          ) {
            event.preventDefault()
            first.focus()
          }
          return
        }
        if (zoomed || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
        event.preventDefault()
        move(event.key === 'ArrowLeft' ? -1 : 1)
      }}
    >
      <header className="screenshot-viewer-header">
        <div>
          <p>{projectName}</p>
          <h2 id={titleId}>{image.title[locale]}</h2>
        </div>
        <div className="screenshot-viewer-actions">
          <button
            type="button"
            onClick={() => setZoomed(!zoomed)}
            aria-pressed={zoomed}
            aria-label={zoomLabel}
          >
            {zoomed ? (
              <ZoomOut size={18} aria-hidden="true" />
            ) : (
              <ZoomIn size={18} aria-hidden="true" />
            )}
            <span>{zoomLabel}</span>
          </button>
          <button
            type="button"
            className="screenshot-viewer-close"
            onClick={onDismiss}
            aria-label={
              locale === 'th' ? 'ย่อกลับไปยังหน้าโปรเจกต์' : 'Return to project'
            }
          >
            <Minimize2 size={18} aria-hidden="true" />
            <span>{locale === 'th' ? 'ย่อกลับ' : 'Return to page'}</span>
          </button>
        </div>
      </header>
      <div
        key={`${image.id}-${zoomed}`}
        className={`screenshot-viewer-canvas${zoomed ? ' is-zoomed' : ''}`}
        tabIndex={0}
        role="region"
        aria-label={
          locale === 'th'
            ? 'พื้นที่ดูภาพ เลื่อนเพื่อดูรายละเอียดเมื่อขยาย'
            : 'Image area. Scroll to explore when zoomed.'
        }
      >
        <img
          src={image.src}
          alt={image.alt[locale]}
          width={image.width}
          height={image.height}
          style={zoomed ? { width: image.width * 1.5 } : undefined}
        />
      </div>
      <footer className="screenshot-viewer-footer">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={screenshots.length < 2}
          aria-label={locale === 'th' ? 'ภาพก่อนหน้า' : 'Previous screenshot'}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <span aria-live="polite" aria-atomic="true">
          {String(selected + 1).padStart(2, '0')} /{' '}
          {String(screenshots.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={screenshots.length < 2}
          aria-label={locale === 'th' ? 'ภาพถัดไป' : 'Next screenshot'}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </footer>
    </dialog>
  )
}
