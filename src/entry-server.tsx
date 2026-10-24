import { renderToString } from 'react-dom/server'
import App from './App'
import { projects } from './content/portfolio'

export const projectPages = projects.map((project) => ({
  path: `/projects/${project.id}/`,
  title: `${project.title} | Thanwa`,
  description: project.description,
}))

export function render(pathname = '/') {
  return renderToString(<App pathname={pathname} />)
}
