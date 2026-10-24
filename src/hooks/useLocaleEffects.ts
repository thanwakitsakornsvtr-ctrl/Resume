import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocaleStore } from '../store/useLocaleStore'

export function useLocaleEffects() {
  const initialize = useLocaleStore((state) => state.initialize)
  const locale = useLocaleStore((state) => state.locale)
  useEffect(() => initialize(), [initialize])
  useEffect(() => {
    document.documentElement.lang = locale
    let cancelled = false
    let frame: number | undefined
    void document.fonts.ready.then(() => {
      if (!cancelled)
        frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    })
    return () => {
      cancelled = true
      if (frame !== undefined) cancelAnimationFrame(frame)
    }
  }, [locale])
}
