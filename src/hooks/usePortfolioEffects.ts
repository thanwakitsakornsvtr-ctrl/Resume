import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolioStore } from '../store/usePortfolioStore'
import { motion } from '../theme/motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function usePortfolioMotion() {
  const scope = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-hero-reveal]', {
          y: 24,
          opacity: 0,
          duration: motion.duration.entrance,
          stagger: 0.08,
          ease: motion.ease.entrance,
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 24,
            opacity: 0,
            duration: motion.duration.entrance,
            ease: motion.ease.entrance,
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          })
        })
        const cards = gsap.utils.toArray<HTMLElement>('[data-hover-card]')
        const cleanups = cards.map((card) => {
          const enter = () =>
            gsap.to(card, {
              y: -4,
              duration: motion.duration.fast,
              ease: motion.ease.interaction,
            })
          const leave = () =>
            gsap.to(card, {
              y: 0,
              duration: motion.duration.fast,
              ease: motion.ease.interaction,
            })
          card.addEventListener('pointerenter', enter)
          card.addEventListener('pointerleave', leave)
          return () => {
            card.removeEventListener('pointerenter', enter)
            card.removeEventListener('pointerleave', leave)
          }
        })
        return () => cleanups.forEach((cleanup) => cleanup())
      })
      return () => media.revert()
    },
    { scope },
  )
  return scope
}

export function useActiveSection() {
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection)
  useEffect(() => {
    const sections =
      document.querySelectorAll<HTMLElement>('main > section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const first = visible[0]
        if (first)
          setActiveSection(
            first.target.id === 'selected-projects'
              ? 'featured-project'
              : first.target.id,
          )
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [setActiveSection])
}

export function useCopyEmail(email: string) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copy() {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
    timer.current = setTimeout(() => setStatus('idle'), 4000)
  }
  return { status, copy }
}
