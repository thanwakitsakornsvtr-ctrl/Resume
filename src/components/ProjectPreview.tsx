import {
  ArrowRight,
  BellRing,
  CircuitBoard,
  Database,
  Fan,
  HardDrive,
  Layers3,
  MapPinned,
  Server,
  Sprout,
  Waves,
} from 'lucide-react'
import { useContent } from '../hooks/useContent'
import type { Project } from '../types/content'

export function ProjectPreview({ type }: { type: Project['preview'] }) {
  const { t } = useContent()
  return (
    <div
      className={`mini-preview project-diagram ${type}-diagram`}
      aria-hidden="true"
    >
      <div className="project-diagram-panel">
        <span className="diagram-caption">
          {t('PROJECT SCOPE / ILLUSTRATION')}
        </span>
        {type === 'iot' ? (
          <>
            <div className="diagram-heading">
              <Sprout size={22} />
              <strong>Mushroom-O</strong>
            </div>
            <div className="diagram-path">
              <span>
                <CircuitBoard size={20} />
                ESP32 + SCD40
              </span>
              <ArrowRight size={16} />
              <span>Node.js</span>
            </div>
            <div className="diagram-chips">
              <span>CO₂ · °C · %RH</span>
              <span>
                <Fan size={14} />
                {t('Fan & mist control')}
              </span>
            </div>
            <p>{t('Manual / Automatic')}</p>
          </>
        ) : type === 'services' ? (
          <>
            <div className="diagram-heading">
              <Layers3 size={22} />
              <strong>Docker Compose</strong>
            </div>
            <div className="diagram-services">
              <span>
                <Server size={17} />
                Frontend / Backend
              </span>
              <span>
                <Database size={17} />
                PostgreSQL
              </span>
              <span>
                <Waves size={17} />
                Redis
              </span>
              <span>
                <HardDrive size={17} />
                SeaweedFS
              </span>
            </div>
            <p>{t('Development & testing environment')}</p>
          </>
        ) : (
          <>
            <div className="diagram-heading">
              <MapPinned size={22} />
              <strong>{t('Flood management')}</strong>
            </div>
            <div className="diagram-path">
              <span>
                <Waves size={20} />
                {t('Water data')}
              </span>
              <ArrowRight size={16} />
              <span>
                <MapPinned size={20} />
                {t('Area map')}
              </span>
            </div>
            <div className="diagram-chips">
              <span>
                <BellRing size={14} />
                {t('Proposed LINE alerts')}
              </span>
            </div>
            <p>{t('Concept / Research')}</p>
          </>
        )}
      </div>
    </div>
  )
}
