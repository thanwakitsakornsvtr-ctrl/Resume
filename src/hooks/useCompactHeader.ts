import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion } from '../theme/motion'

export function useCompactHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const [compact, setCompact] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    let frame: number | undefined
    const update = () => {
      frame = undefined
      setCompact((current) => window.scrollY > (current ? 16 : 64))
    }
    const onScroll = () => {
      if (frame === undefined) frame = requestAnimationFrame(update)
    }
    const media = window.matchMedia('(max-width: 767px)')
    const onResize = () => setMobile(media.matches)
    update()
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    media.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      media.removeEventListener('change', onResize)
      if (frame !== undefined) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!ref.current) return
    const tween = gsap.to(ref.current, {
      height: mobile ? (compact ? 64 : 80) : compact ? 72 : 96,
      duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 0
        : motion.duration.fast,
      ease: motion.ease.interaction,
      overwrite: true,
    })
    return () => {
      tween.kill()
    }
  }, [compact, mobile])

  return { ref, compact }
}
