import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { projectPages, render } from '../dist-ssr/entry-server.js'

const outputRoot = new URL('../dist/', import.meta.url)
const template = await readFile(new URL('index.html', outputRoot), 'utf8')
const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder))
  throw new Error(
    'Missing prerender root. Run the client build before prerendering.',
  )

let site
if (process.env.SITE_URL) {
  site = new URL(process.env.SITE_URL)
  if (
    !['http:', 'https:'].includes(site.protocol) ||
    site.username ||
    site.password ||
    site.search ||
    site.hash ||
    site.pathname !== '/'
  )
    throw new Error(
      'SITE_URL must be the public http(s) origin, without credentials, a subpath, query, or fragment.',
    )
}
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
const pages = [{ path: '/' }, ...projectPages]
for (const page of pages) {
  let html = template
  if (page.title) {
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace(
        /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
        `$1${escape(page.title)}$2`,
      )
      .replace(
        /(<meta\s+name="description"\s+content=")[^"]*(")/,
        `$1${escape(page.description)}$2`,
      )
      .replace(
        /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
        `$1${escape(page.description)}$2`,
      )
  }
  if (site) {
    const url = escape(new URL(page.path, site).href)
    html = html.replace(
      '</head>',
      `<link rel="canonical" href="${url}" /><meta property="og:url" content="${url}" /><meta property="og:image" content="${escape(new URL('/social-card.png', site).href)}" /><meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" /><meta name="twitter:card" content="summary_large_image" /></head>`,
    )
  }
  const file = fileURLToPath(new URL(`.${page.path}index.html`, outputRoot))
  await mkdir(dirname(file), { recursive: true })
  await writeFile(
    file,
    html.replace(placeholder, `<div id="root">${render(page.path)}</div>`),
  )
  console.log(`Prerendered ${page.path}`)
}
