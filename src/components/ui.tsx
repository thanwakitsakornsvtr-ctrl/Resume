import {
  ArrowUpRight,
  CheckCheck,
  Code2,
  Gauge,
  GitBranch,
  Layers3,
  Search,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { IconName } from '../types/content'

const icons = {
  layers: Layers3,
  shield: ShieldCheck,
  gauge: Gauge,
  check: CheckCheck,
  git: GitBranch,
  code: Code2,
  search: Search,
  terminal: Terminal,
}

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const Component = icons[name]
  return <Component size={size} strokeWidth={2} aria-hidden="true" />
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>
}

export function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string
  label: string
  title: ReactNode
  description?: string
}) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">
        <span className="section-number">{number}</span>
        {label}
      </p>
      <div className="section-heading-row">
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  )
}

export function ArrowLink({
  href,
  children,
  primary = false,
}: {
  href: string
  children: ReactNode
  primary?: boolean
}) {
  return (
    <a href={href} className={primary ? 'button button-primary' : 'text-link'}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  )
}
