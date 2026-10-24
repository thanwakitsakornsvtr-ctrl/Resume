export const motion = {
  duration: { fast: 0.2, normal: 0.35, entrance: 0.5 },
  ease: {
    spring: 'back.out(1.4)',
    entrance: 'power3.out',
    exit: 'power2.in',
    interaction: 'power2.out',
  },
} as const
