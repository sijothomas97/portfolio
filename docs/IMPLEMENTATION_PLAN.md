# Implementation Plan

Phase-by-phase checklist with file paths, dependencies, and verification steps.

---

## Phase Dependencies

```
Phase 0 (Scaffolding)
  └── Phase 1 (Layout & Nav)
        ├── Phase 2 (Homepage)
        │     └── Phase 3 (Content Collections) ← wires FeaturedProjects to collection
        ├── Phase 4 (Blog)
        ├── Phase 5 (Contact)
        └── Phase 7 (Deployment) ← can run early for continuous deploy
              └── Phase 6 (SEO/A11y/Perf) ← after all pages exist
                    └── Phase 8 (Polish) ← final pass
```

**Rule**: Complete each phase fully and verify before starting the next. Commit after each phase.

---

## Phase 0: Project Scaffolding

**Branch**: Create `feat/astro-rebuild` from `main`

### Tasks

- [ ] Create git branch: `git checkout -b feat/astro-rebuild`
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

---

## Phase 1: Base Layout & Navigation

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

---

## Phase 2: Homepage Sections

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

---

## Phase 3: Content Collections & Project Pages

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

---

## Phase 4: Blog Infrastructure

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

---

## Phase 5: Contact Page

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

---

## Phase 6: SEO, Accessibility & Performance

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

---

## Phase 7: GitHub Actions Deployment

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

---

## Phase 8: Polish

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

---

## Final Merge

After all phases are complete and verified:

```bash
git checkout main
git merge feat/astro-rebuild
git push origin main
# → GitHub Actions deploys automatically
# → Verify live site at https://sijothomas97.github.io/portfolio
```
