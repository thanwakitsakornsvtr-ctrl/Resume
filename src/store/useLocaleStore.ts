import { create } from 'zustand'

export type Locale = 'en' | 'th'
import { LOCALE_STORAGE_KEY, MUSIC_STORAGE_KEY } from './preferences.ts'
export { LOCALE_STORAGE_KEY } from './preferences.ts'

interface LocaleState {
  locale: Locale
  initialized: boolean
  dialogOpen: boolean
  initialize: () => void
  selectLocale: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
  // Keep server output and the first hydration render identical.
  locale: 'en',
  initialized: false,
  dialogOpen: false,
  initialize: () => {
    if (get().initialized) return
    let saved: string | null = null
    let music: string | null = null
    try {
      saved = localStorage.getItem(LOCALE_STORAGE_KEY)
      music = localStorage.getItem(MUSIC_STORAGE_KEY)
    } catch {
      /* Storage can be unavailable in private/restricted contexts. */
    }
    const valid = saved === 'en' || saved === 'th'
    set({
      locale: saved === 'th' ? 'th' : 'en',
      initialized: true,
      dialogOpen: !valid || !['on', 'off'].includes(music ?? ''),
    })
  },
  selectLocale: (locale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      /* The current visit still works without persistence. */
    }
    set({ locale, dialogOpen: false })
  },
}))
