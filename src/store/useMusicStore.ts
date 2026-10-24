import { create } from 'zustand'
import { backgroundMusic } from '../content/music'
import { createMusicPlayer, type MusicStatus } from '../lib/backgroundMusic'
import { MUSIC_STORAGE_KEY } from './preferences'

interface MusicState {
  initialized: boolean
  status: MusicStatus
  initialize: () => void
  setEnabled: (enabled: boolean) => void
  toggle: () => void
}

export const useMusicStore = create<MusicState>((set, get) => {
  const player = createMusicPlayer(backgroundMusic.src, (status) =>
    set({ status }),
  )
  return {
    initialized: false,
    status: 'idle',
    initialize: () => {
      if (get().initialized) return
      set({ initialized: true })
      let saved: string | null = null
      try {
        saved = localStorage.getItem(MUSIC_STORAGE_KEY)
      } catch {
        /* In-memory controls still work. */
      }
      if (saved === 'on') void player.play()
    },
    setEnabled: (enabled) => {
      try {
        localStorage.setItem(MUSIC_STORAGE_KEY, enabled ? 'on' : 'off')
      } catch {
        /* In-memory controls still work. */
      }
      if (enabled) void player.play()
      else player.pause()
    },
    toggle: () =>
      get().setEnabled(!['playing', 'loading'].includes(get().status)),
  }
})
