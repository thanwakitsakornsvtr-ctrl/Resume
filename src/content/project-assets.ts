import type { ProjectAssets } from '../types/content'

// Shared by English and Thai. URLs were not included in the owner's initial brief.
// Put screenshots in public/projects/ and refer to them as /projects/file.webp.
export const projectAssets: Record<
  'bcg' | 'mushroom' | 'lifelong' | 'flood',
  ProjectAssets
> = {
  bcg: {
    demoUrl: undefined,
    sourceUrl: undefined,
    image: undefined,
    architectureImage: undefined,
  },
  mushroom: { demoUrl: undefined, sourceUrl: undefined, image: undefined },
  lifelong: { demoUrl: undefined, sourceUrl: undefined, image: undefined },
  flood: { demoUrl: undefined, sourceUrl: undefined, image: undefined },
}
