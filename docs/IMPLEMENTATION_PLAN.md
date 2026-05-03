# Implementation Plan

Phase-by-phase checklist with file paths, dependencies, and verification steps.
Each phase is built on its own feature branch and merged to `main` via PR.

---

## Phase Summary

| Phase | Branch | What It Adds | Depends On |
|-------|--------|-------------|------------|
| 0 | `feat/phase-0-scaffolding` | Empty Astro project, Tailwind config, design tokens, base path helper, image assets | — |
| 1 | `feat/phase-1-layout-nav` | Shared page shell — sticky header, footer, dark/light toggle, skip-to-content | Phase 0 |
| 2 | `feat/phase-2-homepage` | 7 homepage sections — Hero, About, Featured Projects, Skills, Experience, Education, Contact CTA | Phase 1 |
| 3 | `feat/phase-3-content-collections` | Content collection schemas, 4 project markdown files, project index/detail pages, wires FeaturedProjects to real data | Phase 2 |
| 4 | `feat/phase-4-blog` | 3 blog post markdown files, blog index/detail pages | Phase 3 |
| 5 | `feat/phase-5-contact` | Contact page with form (Formspree), social links, placeholder resume PDF | Phase 1 |
| 6 | `feat/phase-6-seo-a11y-perf` | SEO meta/OG tags audit, accessibility audit & fixes, 404 page, robots.txt, sitemap verification | Phases 2–5 |
| 7 | `feat/phase-7-deployment` | GitHub Actions workflow for auto-deploy to GitHub Pages | Phase 1 |
| 8 | `feat/phase-8-polish` | Scroll animations, hover effects, responsive tuning, content cross-check, cleanup of old Jekyll files | Phase 6 |

## Phase Dependencies & Merge Order

```
main ← phase-0 ← phase-1 ← phase-2 ← phase-3 ← phase-4
                         ↖ phase-5 (parallel after phase-1)
                         ↖ phase-7 (parallel after phase-1)
              then ← phase-6 (after all pages merged)
              then ← phase-8 (final pass)
```

**Rule**: Complete each phase fully and verify before merging. Branch from `main` after dependency phases are merged.

---

## Phase 0: Project Scaffolding

> Empty Astro 5 project with Tailwind CSS 4 configured, all design tokens defined, base path helper, and image assets migrated. Site loads a blank page at `localhost:4321`.

**Branch**: `feat/phase-0-scaffolding` from `main`

### Tasks

- [ ] Create git branch: `git checkout -b feat/phase-0-scaffolding`
- [ ] Remove Jekyll config: delete `_config.yml`
- [ ] Scaffold Astro project in repo root:
  ```bash
  npm create astro@latest . -- --template minimal --typescript strict
  ```
- [ ] Verify Node.js 18+ is installed: `node --version`
- [ ] Install core dependencies (Tailwind v4 uses `@tailwindcss/vite`, NOT `@astrojs/tailwind`):
  ```bash
  npm install tailwindcss @tailwindcss/vite
  npx astro add sitemap
  npm install @tailwindcss/typography gsap lucide-astro
  ```
- [ ] Configure `astro.config.mjs` (see `docs/TECH_SPEC.md` Section 2.1):
  - `site: 'https://sijothomas97.github.io'`
  - `base: '/portfolio'`
  - `output: 'static'`
  - `integrations: [sitemap()]`
  - `vite: { plugins: [tailwindcss()] }` — Tailwind v4 Vite plugin
  - Markdown shiki theme: `github-dark`
- [ ] Create `src/styles/global.css` with Tailwind v4 CSS config (see `docs/TECH_SPEC.md` Section 2.2):
  - `@import "tailwindcss";` (NOT `@tailwind base/components/utilities`)
  - `@custom-variant dark (&:where(.dark, .dark *));` (NOT `darkMode: 'class'` in JS)
  - `@plugin "@tailwindcss/typography";` (NOT `require()` in JS)
  - `@theme {}` block with all color tokens, font families, and custom font sizes
  - `prefers-reduced-motion` reset
  - Smooth scrolling: `html { scroll-behavior: smooth; }`
  - **There is NO `tailwind.config.mjs` file** — all config lives in this CSS file
- [ ] Create `src/utils/links.ts` — Base path helper (see `docs/TECH_SPEC.md` Section 2.3):
  ```typescript
  export function withBase(path: string): string {
    const base = import.meta.env.BASE_URL;
    return `${base}${path}`.replace(/\/+/g, '/');
  }
  ```
- [ ] Configure `tsconfig.json`:
  - Extend `astro/tsconfigs/strict`
  - Add path aliases: `@components/*`, `@layouts/*`, `@styles/*`, `@content/*`
- [ ] Migrate images:
  - Create `public/images/` directory
  - Convert `assets/img/sijo_thomas.jpeg` → `public/images/sijo-thomas.webp` using:
    ```bash
    # macOS built-in (no install needed):
    sips -s format webp assets/img/sijo_thomas.jpeg --out public/images/sijo-thomas.webp
    # OR if sips fails, just copy the JPEG:
    cp assets/img/sijo_thomas.jpeg public/images/sijo-thomas.jpeg
    ```
  - Delete all GIF files from `assets/img/`
  - Add `public/favicon.svg` (simple placeholder — initials "ST" in accent color)
- [ ] Add `.gitignore` entries: `node_modules/`, `dist/`, `.astro/`
- [ ] Verify: `npm run dev` starts dev server at `localhost:4321`

### Files Created/Modified
- `astro.config.mjs`
- `package.json` + `package-lock.json`
- `tsconfig.json`
- `src/styles/global.css` (Tailwind v4 CSS config — replaces tailwind.config.mjs)
- `src/utils/links.ts` (base path helper)
- `public/images/sijo-thomas.webp`
- `public/favicon.svg`
- `.gitignore`

### Verification
```bash
npm run dev
# → Server starts at localhost:4321
# → Page loads (even if blank)
# → No TypeScript errors in terminal
npm run build
# → Builds successfully to dist/
```

**Commit**: `feat(phase-0): scaffold Astro project with Tailwind and design tokens`
**PR**: Merge `feat/phase-0-scaffolding` → `main`

---

## Phase 1: Base Layout & Navigation

> Shared page shell used by every page — sticky header with nav links, footer with social links, dark/light mode toggle with persistence, and skip-to-content link. Temporary blank homepage to verify.

**Branch**: `feat/phase-1-layout-nav` from `main` (after Phase 0 is merged)

### Tasks

- [ ] Create `src/layouts/BaseLayout.astro`:
  - Props: `title`, `description`, `ogImage?`, `ogType?`, `canonicalUrl?`
  - `<html lang="en" class="dark">` (dark by default)
  - `<head>`: charset, viewport, title (`{title} | Sijo Thomas`), meta description, canonical URL, OG tags, Twitter card meta, JSON-LD Person schema (see `docs/TECH_SPEC.md` Section 6), Google Fonts `<link>` with preconnect, global CSS import, `<meta name="theme-color" content="#0F172A">`
  - `<body>`: skip-to-content link, Header, `<main id="main-content"><slot /></main>`, Footer
  - Inline `<script>` before `</body>`: read `localStorage.getItem('theme')` or `prefers-color-scheme`, toggle `dark` class — **must run before paint to prevent flash**

- [ ] Create `src/components/Header.astro`:
  - `<header class="fixed top-0 w-full z-50 bg-primary/80 dark:bg-primary/80 backdrop-blur-md border-b border-border">`
  - Logo/name: "Sijo Thomas" → links to `withBase('/')` (import from `src/utils/links.ts`)
  - Nav links: Home, Projects, Blog, Contact — all using `withBase()` helper
  - Active link detection via `Astro.url.pathname`
  - `aria-current="page"` on active link
  - ThemeToggle component
  - Mobile: hamburger button toggling a slide-down menu
  - Mobile menu: use `<details>` / `<summary>` for zero-JS or small inline script

- [ ] Create `src/components/Footer.astro`:
  - Social links: LinkedIn, GitHub, Email (Lucide icons)
  - Copyright with dynamic year: `new Date().getFullYear()`
  - All external links: `target="_blank" rel="noopener noreferrer"`
  - `aria-label` on each icon link

- [ ] Create `src/components/ThemeToggle.astro`:
  - Button with Sun/Moon icon (Lucide)
  - Inline `<script>` for toggle logic
  - Reads: localStorage → prefers-color-scheme → default dark
  - Toggles `dark` class on `<html>`, updates localStorage
  - Updates `aria-label` on toggle
  - `aria-label="Toggle dark mode"` / `"Toggle light mode"`

- [ ] Create temporary `src/pages/index.astro`:
  - Uses BaseLayout
  - Placeholder content to test layout renders

### Files Created
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/ThemeToggle.astro`
- `src/pages/index.astro` (temporary)

### Verification
```bash
npm run dev
# → Page loads with Header (sticky) and Footer
# → Nav links visible, active state on Home
# → Dark/light toggle works
# → Toggle persists after page reload
# → Mobile: hamburger menu opens/closes
# → Tab through all interactive elements — focus rings visible
# → Skip-to-content link visible on Tab focus
npm run build
# → Builds with zero errors
```

**Commit**: `feat(phase-1): add base layout, navigation, footer, and dark mode toggle`
**PR**: Merge `feat/phase-1-layout-nav` → `main`

---

## Phase 2: Homepage Sections

> All 7 visual sections of the homepage — Hero (GSAP animation), About (photo + bio), Featured Projects (3 hardcoded cards), Skills (6 category grid), Experience (vertical timeline), Education (2 cards), and Contact CTA.

**Branch**: `feat/phase-2-homepage` from `main` (after Phase 1 is merged)

### Tasks

- [ ] Create `src/components/sections/Hero.astro`:
  - Full viewport: `min-h-screen flex items-center`
  - Content from `docs/CONTENT.md` Section 2
  - GSAP animation via inline `<script>` with dynamic import
  - Check `prefers-reduced-motion` before animating
  - CSS classes for GSAP targets: `.hero-name`, `.hero-title`, `.hero-description`, `.hero-ctas`, `.hero-social`
  - Two CTA buttons: primary (View My Projects → `withBase('/projects')`) + secondary outline (Download CV → `/resume.pdf` — static assets auto-prefixed)
  - Social links row with Lucide icons

- [ ] Create `src/components/sections/About.astro`:
  - `id="about"` for anchor linking
  - Two-column grid (photo left, text right)
  - Content from `docs/CONTENT.md` Section 3
  - Photo: `<img src="/images/sijo-thomas.webp" alt="Sijo Thomas, AI/ML Engineer" width="400" height="400" loading="lazy" decoding="async">`
  - `reveal-on-scroll` class for CSS animation

- [ ] Create `src/components/sections/FeaturedProjects.astro`:
  - Heading: "Featured Projects"
  - 3 ProjectCard components in responsive grid (hardcoded data initially, wired to collection in Phase 3)
  - "View All Projects →" link to `/projects`
  - Content from `docs/CONTENT.md` Section 5 (card descriptions)

- [ ] Create `src/components/ProjectCard.astro`:
  - Props: `title`, `description`, `tags`, `slug`, `thumbnail?`
  - Card with gradient placeholder thumbnail
  - Title as `<h3>`, description clamped to 2 lines
  - Tag pills (first 4)
  - Entire card links to `/projects/{slug}`
  - Hover effect: `hover:-translate-y-1 hover:shadow-lg`

- [ ] Create `src/components/sections/Skills.astro`:
  - Content from `docs/CONTENT.md` Section 4
  - 6 category cards in responsive grid
  - Each card: category heading + skill items (Lucide icon or text + label)

- [ ] Create `src/components/sections/Experience.astro`:
  - Content from `docs/CONTENT.md` Section 6
  - Vertical timeline layout (see `docs/DESIGN_SYSTEM.md` Section 6.9)
  - 4 entries: Croner-i, Mentrose, Wipro, Infosys

- [ ] Create `src/components/sections/Education.astro`:
  - Content from `docs/CONTENT.md` Section 7
  - 2 compact cards: MSc + BCA

- [ ] Create `src/components/sections/ContactCTA.astro`:
  - Content from `docs/CONTENT.md` Section 8 (Homepage CTA)
  - CTA button linking to `/contact`

- [ ] Update `src/pages/index.astro`:
  - Replace placeholder with all section components in order:
    Hero → About → FeaturedProjects → Skills → Experience → Education → ContactCTA
  - Each section wrapped with appropriate `py-20 md:py-24` spacing

### Files Created/Modified
- `src/components/sections/Hero.astro`
- `src/components/sections/About.astro`
- `src/components/sections/FeaturedProjects.astro`
- `src/components/sections/Skills.astro`
- `src/components/sections/Experience.astro`
- `src/components/sections/Education.astro`
- `src/components/sections/ContactCTA.astro`
- `src/components/ProjectCard.astro`
- `src/pages/index.astro` (updated)

### Verification
```bash
npm run dev
# → Homepage shows all 7 sections in correct order
# → Hero animation plays (if motion not reduced)
# → Project cards render with correct content
# → Skills grid shows all 6 categories
# → Timeline displays 4 experience entries
# → Education shows 2 cards
# → Contact CTA button links to /contact
# → Mobile: all sections stack correctly at 375px
# → Dark/light mode: all sections look correct in both
npm run build
# → Zero errors
```

**Commit**: `feat(phase-2): build all homepage sections`
**PR**: Merge `feat/phase-2-homepage` → `main`

---

## Phase 3: Content Collections & Project Pages

> Astro content collection schemas, 4 project markdown files, `/projects` index with tag filtering, individual project case study pages, and wires homepage FeaturedProjects to real collection data.

**Branch**: `feat/phase-3-content-collections` from `main` (after Phase 2 is merged)

### Tasks

- [ ] Create `src/content.config.ts` (Astro 5 API — see `docs/TECH_SPEC.md` Section 3.1):
  - Import `z` from `'astro/zod'` (NOT `'astro:content'`)
  - Import `glob` from `'astro/loaders'`
  - Use `loader: glob({...})` for each collection (NOT `type: 'content'`)
  - Define `projects` and `blog` collection schemas

- [ ] Create project Markdown files in `src/content/projects/`:
  - [ ] `financial-market-prediction.md` — featured: true, featuredOrder: 1 (content from `docs/CONTENT.md` Section 5.1)
  - [ ] `handwritten-text-recognition.md` — featured: true, featuredOrder: 2 (content from `docs/CONTENT.md` Section 5.2)
  - [ ] `automobile-price-prediction.md` — featured: true, featuredOrder: 3 (content from `docs/CONTENT.md` Section 5.3)
  - [ ] `data-structures-csharp.md` — featured: false (content from `docs/CONTENT.md` Section 5.4)

- [ ] Create `src/pages/projects/index.astro`:
  - Fetch all projects via `getCollection('projects')`
  - Display filterable grid with tag filter bar
  - Client-side filtering via small inline `<script>`

- [ ] Create `src/pages/projects/[...id].astro` (NOTE: `id` not `slug` — Astro 5):
  - `getStaticPaths()` from projects collection using `entry.id` for params
  - Use standalone `render(entry)` from `'astro:content'` (NOT `entry.render()`)
  - Hero banner: title, date, tags, tech stack badges
  - Rendered Markdown body with Tailwind Typography (`prose dark:prose-invert`)
  - GitHub link button
  - Prev/Next project navigation using `withBase()` helper

- [ ] Update `src/components/sections/FeaturedProjects.astro`:
  - Replace hardcoded data with `getCollection('projects')` query
  - Filter `featured === true`, sort by `featuredOrder`

### Files Created/Modified
- `src/content.config.ts`
- `src/content/projects/financial-market-prediction.md`
- `src/content/projects/handwritten-text-recognition.md`
- `src/content/projects/automobile-price-prediction.md`
- `src/content/projects/data-structures-csharp.md`
- `src/pages/projects/index.astro`
- `src/pages/projects/[...id].astro`
- `src/components/sections/FeaturedProjects.astro` (updated)

### Verification
```bash
npm run dev
# → /projects shows all 4 project cards
# → Tag filter works (click tag → shows only matching projects)
# → /projects/financial-market-prediction loads case study
# → /projects/handwritten-text-recognition loads case study
# → /projects/automobile-price-prediction loads case study
# → /projects/data-structures-csharp loads case study
# → Prev/Next navigation works between case studies
# → Homepage FeaturedProjects shows 3 featured cards from collection
# → Markdown renders with proper typography (headings, lists, code)
npm run build
# → All static paths generated, zero errors
```

**Commit**: `feat(phase-3): add content collections and project case study pages`
**PR**: Merge `feat/phase-3-content-collections` → `main`

---

## Phase 4: Blog Infrastructure

> 3 seed blog post markdown files, `/blog` index page sorted by date with reading time, and individual blog post pages with Tailwind Typography.

**Branch**: `feat/phase-4-blog` from `main` (after Phase 3 is merged)

### Tasks

- [ ] Update `src/content.config.ts`:
  - Add `blog` collection (should already be defined from Phase 3, verify)

- [ ] Create blog posts in `src/content/blog/`:
  - [ ] `building-rag-systems-aws.md` (content from `docs/CONTENT.md` Section 11, Post 1)
  - [ ] `time-series-forecasting-lessons.md` (content from `docs/CONTENT.md` Section 11, Post 2)
  - [ ] `from-jekyll-to-astro.md` (content from `docs/CONTENT.md` Section 11, Post 3)

- [ ] Create `src/pages/blog/index.astro`:
  - Fetch non-draft posts via `getCollection('blog')`, filter `draft !== true`
  - Sort by `pubDate` descending
  - Each entry: title (link), date, reading time, description, tags

- [ ] Create `src/pages/blog/[...id].astro` (NOTE: `id` not `slug` — Astro 5):
  - `getStaticPaths()` from blog collection using `entry.id` for params
  - Use standalone `render(entry)` from `'astro:content'`
  - Title, date, reading time, tags at top
  - Markdown body with Tailwind Typography (`prose dark:prose-invert`)

### Files Created/Modified
- `src/content/blog/building-rag-systems-aws.md`
- `src/content/blog/time-series-forecasting-lessons.md`
- `src/content/blog/from-jekyll-to-astro.md`
- `src/pages/blog/index.astro`
- `src/pages/blog/[...id].astro`
- `src/content.config.ts` (verify blog collection)

### Verification
```bash
npm run dev
# → /blog lists 3 posts sorted by date (newest first)
# → Each post entry shows title, date, reading time, description, tags
# → /blog/building-rag-systems-aws renders full post with typography
# → /blog/time-series-forecasting-lessons renders
# → /blog/from-jekyll-to-astro renders
# → Markdown headings, lists, code blocks, bold/italic all styled correctly
npm run build
# → Zero errors, all blog paths generated
```

**Commit**: `feat(phase-4): add blog with content collection and seed posts`
**PR**: Merge `feat/phase-4-blog` → `main`

---

## Phase 5: Contact Page

> `/contact` page with a 3-field form (Formspree), social links, and a placeholder `resume.pdf`. Can be built in parallel with Phases 2–4.

**Branch**: `feat/phase-5-contact` from `main` (after Phase 1 is merged)

### Tasks

- [ ] Create `src/pages/contact.astro`:
  - Content from `docs/CONTENT.md` Section 8 (Contact Page)
  - Form with `action="https://formspree.io/f/PLACEHOLDER_ID"` method="POST"
  - **IMPORTANT:** Use literal string `PLACEHOLDER_ID` in the action URL. Add an HTML comment above the form: `<!-- TODO: Replace PLACEHOLDER_ID with your Formspree form ID from https://formspree.io -->`
  - The form will NOT work until the owner creates a Formspree account and replaces the ID. This is expected.
  - Fields: Name (text, required), Email (email, required), Message (textarea, required)
  - Each field: visible `<label>`, `aria-required="true"`, focus styles
  - Submit button: "Send Message"
  - Social links below form: LinkedIn, GitHub, Email

- [ ] Add `public/resume.pdf` placeholder:
  - Create a simple text file named `resume.pdf` with content: "Replace this file with actual CV"
  - The owner will replace this with their real CV later

### Files Created
- `src/pages/contact.astro`
- `public/resume.pdf` (placeholder)

### Verification
```bash
npm run dev
# → /contact shows form with 3 fields
# → All fields have visible labels
# → Tab through all fields — focus rings visible
# → Required validation works (try submitting empty)
# → Social links display below form
# → Mobile layout stacks correctly
npm run build
# → Zero errors
```

**Commit**: `feat(phase-5): add contact page with form and social links`
**PR**: Merge `feat/phase-5-contact` → `main`

---

## Phase 6: SEO, Accessibility & Performance

> Cross-cutting audit — `robots.txt`, OG image, sitemap verification, 404 page, and fixes for meta tags, heading hierarchy, alt text, aria labels, focus rings, image dimensions, and reduced motion across all pages.

**Branch**: `feat/phase-6-seo-a11y-perf` from `main` (after Phases 2–5 are merged)

### Tasks

- [ ] SEO audit:
  - Verify unique `<title>` on every page
  - Verify unique `<meta description>` on every page
  - Verify OG tags render on every page
  - Add `public/robots.txt`: `User-agent: *\nAllow: /\nSitemap: https://sijothomas97.github.io/portfolio/sitemap-index.xml`
  - Verify `@astrojs/sitemap` generates sitemap on build
  - Create `public/images/og-image.png` (1200x630 branded image — can be simple gradient with name and title)

- [ ] Accessibility audit:
  - Verify one `<h1>` per page
  - Verify heading hierarchy (h1→h2→h3, no skips)
  - Verify all images have `alt` text
  - Verify all icon-only buttons have `aria-label`
  - Verify skip-to-content link works
  - Verify focus rings on all interactive elements
  - Verify form labels are properly associated
  - Verify `<html lang="en">`
  - Add `prefers-reduced-motion` media query in `global.css`

- [ ] Performance audit:
  - Verify all images have explicit `width`/`height`
  - Verify `loading="lazy"` on below-fold images
  - Verify font preconnect hints in `<head>`
  - Verify GSAP only loads on homepage
  - Verify zero JS on blog posts and project pages

- [ ] Create `src/pages/404.astro`:
  - Content from `docs/CONTENT.md` Section 10
  - Link back to homepage

### Files Created/Modified
- `public/robots.txt`
- `public/images/og-image.png`
- `src/pages/404.astro`
- `src/styles/global.css` (add reduced motion reset)
- Various components (minor a11y fixes as needed)

### Verification
```bash
npm run build
# → sitemap-index.xml exists in dist/
# → robots.txt exists in dist/
# → 404.html exists in dist/

# Run Lighthouse audit on each page:
# → Performance: 90+
# → Accessibility: 100
# → Best Practices: 90+
# → SEO: 90+

# Run axe DevTools:
# → Zero critical violations
# → Zero serious violations
```

**Commit**: `feat(phase-6): add SEO meta, accessibility fixes, and performance optimisation`
**PR**: Merge `feat/phase-6-seo-a11y-perf` → `main`

---

## Phase 7: GitHub Actions Deployment

> GitHub Actions workflow (`deploy.yml`) for automatic build and deploy to GitHub Pages on push to `main`. Can be merged early for continuous deployment.

**Branch**: `feat/phase-7-deployment` from `main` (after Phase 1 is merged)

### Tasks

- [ ] Create `.github/workflows/deploy.yml`:
  - See `docs/TECH_SPEC.md` Section 8 for full workflow
  - Triggers: push to main, workflow_dispatch
  - Permissions: contents read, pages write, id-token write
  - Jobs: build (withastro/action), deploy (deploy-pages)

- [ ] Verify `astro.config.mjs` has correct `site` and `base` values

- [ ] Optionally add `public/CNAME` if custom domain is being used

### Files Created
- `.github/workflows/deploy.yml`

### Verification
```bash
# Push to main (or trigger manually via GitHub UI)
# → GitHub Actions workflow runs successfully
# → Site is accessible at https://sijothomas97.github.io/portfolio
# → All pages load with correct asset paths
# → Images load correctly
# → Navigation works between pages
```

**Commit**: `feat(phase-7): add GitHub Actions deployment workflow`
**PR**: Merge `feat/phase-7-deployment` → `main`

---

## Phase 8: Polish

> Final pass — CSS scroll-driven reveal animations, hover effects on cards/links/buttons, responsive fine-tuning (320px–1440px), back-to-top button, content cross-check against `CONTENT.md`, dark/light mode review, and cleanup of old Jekyll files.

**Branch**: `feat/phase-8-polish` from `main` (after Phase 6 is merged)

### Tasks

- [ ] Add CSS scroll-driven animations:
  - Add `reveal-on-scroll` class to homepage sections (About, FeaturedProjects, Skills, Experience, Education, ContactCTA)
  - CSS `animation-timeline: view()` with `@supports` for progressive enhancement
  - Wrapped in `prefers-reduced-motion: no-preference`

- [ ] Add hover effects:
  - Project cards: `-translate-y-1` + shadow on hover
  - Nav links: color transition to accent
  - CTA buttons: background/border color transitions
  - Social icons: color transition to accent

- [ ] Responsive fine-tuning:
  - Test and fix layouts at: 320px, 375px, 768px, 1024px, 1440px
  - Ensure no horizontal overflow at any breakpoint
  - Ensure text is readable at all sizes

- [ ] Add "Back to top" button:
  - Appears after scrolling past hero section
  - Smooth scroll to top
  - `aria-label="Back to top"`

- [ ] Content review:
  - Cross-check all copy against `docs/CONTENT.md`
  - Fix any typos or inconsistencies
  - Verify all external links work (GitHub repos, LinkedIn, etc.)

- [ ] Dark/light mode review:
  - Check every component in both modes
  - Verify contrast ratios in light mode
  - Verify images look good in both modes

- [ ] Clean up:
  - Remove old Jekyll files if still present (`_config.yml`, `assets/` directory)
  - Remove old `README.md` content (replace with project description or keep for GitHub repo page)
  - Remove `docs/` from deployment if desired (add to `.gitignore` or exclude in Astro config)

### Verification
```bash
npm run dev
# → Animations play smoothly on scroll
# → Hover effects work on cards, links, buttons
# → No layout issues at any tested breakpoint
# → Back to top button appears and works
# → All content matches CONTENT.md
# → Both dark and light modes look correct
# → All links work

npm run build
# → Clean build, zero warnings
# → Final Lighthouse audit: all scores 90+
```

**Commit**: `feat(phase-8): add animations, hover effects, and final polish`
**PR**: Merge `feat/phase-8-polish` → `main`

---

## Final Verification

After all phase branches are merged to `main`:

```bash
# Verify live site at https://sijothomas97.github.io/portfolio
# → All pages load with correct asset paths
# → Navigation works between pages
# → Dark/light mode toggle works
# → All Lighthouse scores 90+ (Accessibility: 100)
```
