import { LoaderCircle, Volume2, VolumeX } from 'lucide-react'
import { useContent } from '../hooks/useContent'
import { useMusicStore } from '../store/useMusicStore'

export function MusicToggle() {
  const { t } = useContent()
  const status = useMusicStore((state) => state.status)
  const toggle = useMusicStore((state) => state.toggle)
  const playing = status === 'playing'
  const loading = status === 'loading'
  const label = playing || loading ? t('Turn music off') : t('Turn music on')
  const feedback =
    status === 'blocked'
      ? t('Press the music button to start playback.')
      : status === 'error'
        ? t('Music could not load. Press the music button to retry.')
        : playing
          ? t('Background music is playing.')
          : ''
  return (
    <div className="music-control">
      <button
        className="music-toggle"
        type="button"
        onClick={toggle}
        aria-pressed={playing || loading}
        aria-label={label}
        title={feedback || label}
      >
        {loading ? (
          <LoaderCircle size={20} aria-hidden="true" />
        ) : playing ? (
          <Volume2 size={20} aria-hidden="true" />
        ) : (
          <VolumeX size={20} aria-hidden="true" />
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {feedback}
      </span>
    </div>
  )
}
