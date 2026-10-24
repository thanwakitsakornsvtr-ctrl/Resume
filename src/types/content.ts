export type ContentStatus = 'sample' | 'draft' | 'verified'
export interface Profile {
  contentStatus: ContentStatus
  name: string
  role: string
  email: string
  headline: [string, string]
  introduction: string
  focus: string[]
  about: string
  interests: string
  principles: string[]
  copyrightYear: number
  links: { label: string; href: string }[]
  resumeUrl?: string
  education?: {
    field: string
    status: string
    institution?: string
    degree?: string
    graduation?: string
  }
}
export type IconName =
  | 'layers'
  | 'shield'
  | 'gauge'
  | 'check'
  | 'git'
  | 'code'
  | 'search'
  | 'terminal'

export interface NavigationItem {
  id: string
  label: string
}

export interface CaseStudy {
  id: string
  number: string
  category: string
  title: string
  summary: string
  icon: IconName
  tags: string[]
  problem: string
  constraints: string
  alternatives: string
  decision: string
  tradeoff: string
  validation: string
  lesson: string
  recordLabel?: string
}

export interface ProjectImage {
  src: string
  alt: { en: string; th: string }
  width: number
  height: number
}

export interface ProjectAssets {
  demoUrl?: string
  sourceUrl?: string
  image?: ProjectImage
  architectureImage?: ProjectImage
}

export interface FeaturedProject extends ProjectAssets {
  title: string
  eyebrow: string
  description: string
  contentStatus: ContentStatus
  stage: string
  tags: string[]
  scope: string
  problem: string
  responsibility: string
  decisions: { title: string; description: string }[]
  limitations: string
}

export interface Project extends ProjectAssets {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  preview: 'iot' | 'services' | 'flood'
  contribution: string
  decision: string
  limitation: string
  contentStatus: ContentStatus
  stage?: string
}

export interface Practice {
  number: string
  icon: IconName
  title: string
  description: string
  example: string
}
