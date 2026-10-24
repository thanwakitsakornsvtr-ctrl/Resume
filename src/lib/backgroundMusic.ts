export type MusicStatus =
  'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error'
type AudioSource = Pick<
  HTMLAudioElement,
  | 'src'
  | 'loop'
  | 'volume'
  | 'preload'
  | 'paused'
  | 'play'
  | 'pause'
  | 'addEventListener'
  | 'removeEventListener'
>

// One lazily created player per document. Call play directly from user gestures.
export function createMusicPlayer(
  source: string,
  onStatus: (status: MusicStatus) => void,
  makeAudio: () => AudioSource = () => new Audio(),
) {
  let audio: AudioSource | undefined
  let requested = false
  let generation = 0
  const playing = () => {
    if (requested) onStatus('playing')
    else audio?.pause()
  }
  const waiting = () => {
    if (requested) onStatus('loading')
  }
  const paused = () => {
    if (requested) {
      requested = false
      generation++
      onStatus('paused')
    }
  }
  const failed = () => {
    requested = false
    generation++
    audio?.pause()
    onStatus('error')
  }
  return {
    async play() {
      requested = true
      const attempt = ++generation
      onStatus('loading')
      try {
        if (!audio) {
          audio = makeAudio()
          audio.preload = 'none'
          audio.loop = true
          audio.volume = 0.18
          audio.src = source
          audio.addEventListener('playing', playing)
          audio.addEventListener('waiting', waiting)
          audio.addEventListener('pause', paused)
          audio.addEventListener('error', failed)
        }
        await audio.play()
        if (attempt !== generation) {
          if (!requested) audio.pause()
          return
        }
        if (!audio.paused) onStatus('playing')
      } catch (error) {
        if (attempt !== generation) return
        requested = false
        onStatus(
          error instanceof Error && error.name === 'NotAllowedError'
            ? 'blocked'
            : 'error',
        )
      }
    },
    pause() {
      requested = false
      generation++
      audio?.pause()
      onStatus('paused')
    },
    dispose() {
      requested = false
      generation++
      if (audio) {
        audio.removeEventListener('playing', playing)
        audio.removeEventListener('waiting', waiting)
        audio.removeEventListener('pause', paused)
        audio.removeEventListener('error', failed)
        audio.pause()
        audio = undefined
      }
    },
  }
}
