# Sijo Thomas — Portfolio

Personal portfolio for Sijo Thomas, AI/ML Engineer. Built as a modern, dark-mode-first
static site with content-driven project case studies and a blog.

**Live site:** https://sijothomas97.github.io/portfolio

## Tech stack

- **Framework:** [Astro](https://astro.build) 5.x
- **Styling:** [Tailwind CSS](https://tailwindcss.com) 4.x (CSS-based config, no `tailwind.config.js`)
- **Content:** Markdown via Astro Content Collections (projects + blog)
- **Icons:** [Lucide](https://lucide.dev) (`@lucide/astro`)
- **Animations:** CSS scroll-driven reveals + GSAP (homepage hero only)
- **Typography:** Inter + JetBrains Mono
- **Deployment:** GitHub Pages via GitHub Actions

## Development

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Production build to dist/
npm run preview    # Preview the production build locally
```

Requires Node.js 18+ and npm 9+.

## Project structure

```
src/
├── components/     # Reusable UI + homepage sections
├── content/        # Markdown content collections (projects, blog)
├── layouts/        # Shared HTML shell (BaseLayout)
├── pages/          # File-based routes
├── styles/         # Tailwind v4 CSS config (global.css)
└── utils/          # Helpers (withBase for base-path links)
public/             # Static assets (images, favicon, resume, robots.txt)
docs/               # Project specs (PRD, tech spec, design system, content)
```

The site is served under the `/portfolio` base path, so all internal links use the
`withBase()` helper in `src/utils/links.ts`.
