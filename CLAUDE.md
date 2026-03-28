# Portfolio Project — AI Agent Instructions

## IMPORTANT: Read Before Writing Any Code

**Read these documents in this exact order before implementing anything:**

1. **This file (`CLAUDE.md`)** — Project context, conventions, guardrails
2. **`docs/PRD.md`** — What to build, acceptance criteria
3. **`docs/TECH_SPEC.md`** — Architecture, schemas, component props, exact code examples
4. **`docs/DESIGN_SYSTEM.md`** — Colors, typography, spacing, component patterns with Tailwind classes
5. **`docs/CONTENT.md`** — All real copy (use verbatim, never placeholder text)
6. **`docs/IMPLEMENTATION_PLAN.md`** — Phase-by-phase build order with verification steps

**Follow the phases strictly.** Do not skip ahead. Complete and verify each phase before starting the next.

---

## Project Overview

Rebuilding Sijo Thomas's portfolio from a single-README Jekyll site into a modern Astro 5.x application with Tailwind CSS 4, dark-mode-first design, content collections, and GitHub Pages deployment.

**Owner**: Sijo Thomas — AI/ML Engineer, 5+ years experience
**Live URL**: https://sijothomas97.github.io/portfolio (GitHub Pages)
**Repository**: https://github.com/sijothomas97/portfolio

---

## Prerequisites

- **Node.js 18+** (required by Astro 5)
- **npm 9+**
- Verify with: `node --version && npm --version`

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Astro | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animations | CSS scroll-driven + GSAP (hero only) | GSAP 3.x |
| Content | Markdown/MDX via Astro Content Collections | — |
| Icons | Lucide (`lucide-astro`) | latest |
| Typography | Inter + JetBrains Mono (Google Fonts) | — |
| Deployment | GitHub Pages + GitHub Actions (`withastro/action`) | — |

---

## Commands

```bash
npm run dev        # Start local dev server (localhost:4321)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

---

## Project Structure

```
portfolio/
├── .github/workflows/deploy.yml    # GitHub Actions deployment
├── public/                         # Static assets (copied as-is)
│   ├── images/                     # Optimized images (WebP)
│   ├── favicon.svg
│   ├── robots.txt
│   └── resume.pdf
├── src/
│   ├── components/                 # Reusable Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   ├── ProjectCard.astro
│   │   └── sections/              # Homepage section components
│   ├── content/                    # Content collections (Markdown)
│   │   ├── projects/              # Project case studies
│   │   └── blog/                  # Blog posts
│   ├── content.config.ts          # Collection schemas
│   ├── layouts/
│   │   └── BaseLayout.astro       # Shared HTML shell
│   ├── pages/                     # File-based routing
│   ├── utils/
│   │   └── links.ts              # withBase() helper for base path
│   └── styles/
│       └── global.css             # Tailwind v4 CSS config (@theme, @plugin, etc.)
├── astro.config.mjs              # NO tailwind.config.mjs — Tailwind v4 uses CSS config
├── tsconfig.json
└── package.json
```

---

## Coding Conventions

### General
- Use **TypeScript** for all `.ts` files (content config, utility functions)
- Use **Astro components** (`.astro`) for all UI — no React/Vue/Svelte unless absolutely necessary
- Prefer Astro's built-in features over external libraries
- Keep components small and single-responsibility
- No `console.log` in production code

### Astro Components
- Props interface at the top of the frontmatter (`---`) block
- Use `Astro.props` destructuring
- Semantic HTML elements (`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- One `<h1>` per page only
- Logical heading hierarchy: h1 → h2 → h3 (never skip levels)

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<section aria-labelledby="section-title">
  <h2 id="section-title">{title}</h2>
  {description && <p>{description}</p>}
  <slot />
</section>
```

### Tailwind CSS 4 (CSS-based config — NO tailwind.config.mjs)
- Tailwind v4 uses **CSS-based configuration**, not a JavaScript config file
- All theme tokens are defined via `@theme {}` blocks in `src/styles/global.css`
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *));` in CSS (not `darkMode: 'class'` in JS)
- Plugins: `@plugin "@tailwindcss/typography";` in CSS (not `require()` in JS)
- Import: `@import "tailwindcss";` (not `@tailwind base/components/utilities`)
- Content detection is automatic (respects `.gitignore`) — no `content: [...]` array
- Integration: use `@tailwindcss/vite` in `astro.config.mjs` vite plugins (NOT `@astrojs/tailwind`)
- Use design tokens defined in `@theme {}` — never hardcode color hex values
- Responsive: mobile-first (`sm:`, `md:`, `lg:`, `xl:`)
- Common pattern: `bg-primary dark:bg-primary-light text-text-primary dark:text-text-primary-light`

### Content Collections (Astro 5 API)
- Each project/blog post is a separate `.md` file in `src/content/`
- Frontmatter must match the schema in `src/content.config.ts`
- **Astro 5 breaking changes:**
  - Import `z` from `'astro/zod'` (NOT `'astro:content'`)
  - Import `glob` from `'astro/loaders'` for the loader
  - Use `loader: glob({ pattern: '**/*.md', base: './src/content/projects' })` (NOT `type: 'content'`)
  - Entry identifier is `entry.id` (NOT `entry.slug`)
  - Render with standalone `render(entry)` from `'astro:content'` (NOT `entry.render()`)
  - Dynamic routes use `[id].astro` or `[...id].astro` (NOT `[slug].astro`)
- Use `getCollection()` and `getEntry()` from `astro:content`
- Sort blog posts by `pubDate` descending
- Filter out `draft: true` posts in production

### JavaScript/Interactivity
- **Zero JS by default** — Astro ships no JS unless explicitly opted in
- Use `<script>` tags in Astro components for small inline scripts (theme toggle, mobile menu)
- GSAP is loaded ONLY on the homepage hero via inline `<script>` with dynamic `import('gsap')`
- Always check `prefers-reduced-motion` before running animations
- No JS frameworks (React, Vue, etc.) — keep the bundle at ~0KB on most pages

### Base Path Handling
- The site is deployed to `https://sijothomas97.github.io/portfolio` with `base: '/portfolio'`
- **All internal links must use the `withBase()` helper** — never hardcode paths
- Create `src/utils/links.ts`:
  ```typescript
  export function withBase(path: string): string {
    const base = import.meta.env.BASE_URL;
    return `${base}${path}`.replace(/\/+/g, '/');
  }
  ```
- Usage: `<a href={withBase('/projects')}>` instead of `<a href="/projects">`
- Asset paths in `public/` are auto-prefixed by Astro — no helper needed for `<img src="/images/...">`

---

## Design Rules

### Colors (use Tailwind tokens, never raw hex)
- `bg-primary` / `bg-surface` for backgrounds
- `text-primary` / `text-secondary` for text
- `text-accent` / `text-accent-hover` for interactive elements
- `text-link` for links
- See `docs/DESIGN_SYSTEM.md` for full token reference

### Typography
- Headings: Inter, font-weight 600-700
- Body: Inter, font-weight 400, 17-18px
- Code/tech labels: JetBrains Mono, font-weight 400-500
- Dark mode: slightly heavier font weights, `letter-spacing: 0.01em`

### Accessibility (WCAG 2.2 AA — mandatory)
- All images: descriptive `alt` text
- All icon-only buttons/links: `aria-label`
- Focus indicators: visible on all interactive elements (min 2px, 3:1 contrast)
- Skip-to-content link as first focusable element
- Color contrast: 4.5:1 minimum for body text, 3:1 for large text
- `prefers-reduced-motion`: wrap all animations
- `prefers-color-scheme`: respect as default theme
- Form inputs: visible `<label>` elements, not just placeholders
- Language declaration: `<html lang="en">`

### Performance
- Images: WebP format, explicit `width`/`height`, `loading="lazy"` (except hero)
- Fonts: `<link rel="preconnect">` to Google Fonts, `font-display: swap`
- Target: Lighthouse 90+ on all categories
- No external CDN dependencies for icons (use Lucide locally)

---

## Do's and Don'ts

### Do
- Follow the phase order in `docs/IMPLEMENTATION_PLAN.md`
- Reference `docs/CONTENT.md` for all copy — never use placeholder/lorem ipsum
- Reference `docs/DESIGN_SYSTEM.md` for all design tokens
- Reference `docs/TECH_SPEC.md` for component props and schemas
- Test each phase before moving to the next
- Use semantic HTML throughout
- Keep components under 150 lines — split if larger
- Add `alt` text to every image
- Add `aria-label` to every icon-only button

### Don't
- Don't install React, Vue, Svelte, or any UI framework
- Don't add JavaScript to pages that don't need it
- Don't hardcode colors — use Tailwind design tokens
- Don't use percentage-based skill bars
- Don't display the phone number publicly (privacy)
- Don't use external CDN for icons (use Lucide)
- Don't create files outside the defined directory structure
- Don't skip accessibility requirements
- Don't add features not specified in the PRD
- Don't use `!important` in CSS
- Don't commit `node_modules/`, `dist/`, or `.env` files

---

## Key Documents

| Document | Purpose |
|----------|---------|
| `docs/PRD.md` | Requirements and acceptance criteria |
| `docs/TECH_SPEC.md` | Architecture, schemas, component specs |
| `docs/DESIGN_SYSTEM.md` | Colors, typography, spacing, patterns |
| `docs/CONTENT.md` | All portfolio copy and content |
| `docs/IMPLEMENTATION_PLAN.md` | Phase-by-phase build checklist |

---

## Git Workflow

- Work on branch `feat/astro-rebuild`
- Commit after completing each phase
- Commit message format: `feat(phase-N): brief description`
- Do not push to `main` until the full build is verified
- Do not force push
