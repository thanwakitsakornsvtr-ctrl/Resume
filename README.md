# Resume | Thanwa

A bilingual English/Thai portfolio for Thanwa Kitsakorn, built with React, Vite, and TypeScript. The home page presents six sections, with standalone detail pages for supporting projects.

## Features

- English-first language/music chooser and Navbar language dropdown.
- Responsive navigation that compacts when scrolling.
- BCG Platform as the featured project, using PostgreSQL and Prisma.
- Dedicated pages for Mushroom-O, Lifelong Learning, and Sisaket Flood Management.
- Optional quiet piano with consent, saved preference, and an icon playback control.
- Static HTML generation for all four pages, with client hydration.
- Optional demo/source links and screenshots configured in frontend data.

Project information is a working draft supplied by the owner. Sisaket Flood Management and province expansion are presented as concept/design work. Contact: **contactkitsakorn@gmail.com**.

## Development

Requires Node.js 24 and npm.

```bash
npm ci
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Deploy the entire `dist/` directory, including `projects/` and `audio/`. There is no production Node server, API, database, or contact-form backend.

The generated project pages are:

- `/projects/mushroom-o/`
- `/projects/lifelong-learning/`
- `/projects/sisaket-flood/`

## Content

Edit `src/content/portfolio.ts` for English, `src/content/th.ts` for Thai, and `src/content/messages.ts` for interface translations. Shared demo/source links and optional screenshots belong in `src/content/project-assets.ts`. Store screenshots in `public/projects/` with bilingual alt text and dimensions. Missing URLs are omitted; missing images fall back to illustrations.

Set actual profile links and `profile.resumeUrl` when available. Avoid adding unverified metrics or placeholder destinations. When the public domain is known, set `SITE_URL` during the build to generate page-specific canonical and social URLs.

## Checks

```bash
npm run build
npm run lint
npm run format:check
npm test
```

## Container

```bash
docker build -t resume-portfolio:local .
docker run --rm -p 127.0.0.1:8080:8080 resume-portfolio:local
```

The production container serves static files with Nginx as an unprivileged user. Configure HTTPS at the deployment proxy or hosting provider. A Compose configuration is also included.

## Music

**First Light Particles — Yoiyami**, published under [CC0 1.0](https://opengameart.org/node/182244). The optional local MP3 loops at low volume. Playback requires opt-in; browsers may require a fresh click after page navigation. Source, license, conversion details, and file hashes are recorded in [CREDITS.txt](public/audio/CREDITS.txt). Courtesy credit is also displayed in the site footer.
