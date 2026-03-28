# Technical Specification

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   GitHub Pages                   │
│              (Static File Hosting)               │
├─────────────────────────────────────────────────┤
│              GitHub Actions CI/CD                │
│           (withastro/action@v3 build)            │
├─────────────────────────────────────────────────┤
│                  Astro 5.x SSG                   │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Pages   │  │  Layouts │  │  Components   │  │
│  │ (.astro) │  │ (.astro) │  │   (.astro)    │  │
│  └────┬─────┘  └────┬─────┘  └───────┬───────┘  │
│       │              │                │          │
│  ┌────┴──────────────┴────────────────┴───────┐  │
│  │         Content Collections (Markdown)      │  │
│  │    ┌─────────────┐    ┌──────────────┐     │  │
│  │    │  projects/  │    │    blog/     │     │  │
│  │    └─────────────┘    └──────────────┘     │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌──────────────┐  ┌────────────┐  ┌──────────┐ │
│  │ Tailwind CSS │  │   GSAP     │  │  Lucide  │ │
│  │   (build)    │  │(hero only) │  │  (SVGs)  │ │
│  └──────────────┘  └────────────┘  └──────────┘ │
├─────────────────────────────────────────────────┤
│                 External Services                │
│    ┌──────────────┐    ┌───────────────────┐    │
│    │ Google Fonts │    │    Formspree     │    │
│    │ (Inter, JBM) │    │ (contact form)   │    │
│    └──────────────┘    └───────────────────┘    │
└─────────────────────────────────────────────────┘
```

**Build output**: Pure static HTML/CSS/JS in `dist/`. Zero JavaScript on most pages. GSAP loaded only on the homepage.

---

## 2. Configuration Files

### 2.1 `astro.config.mjs`

**IMPORTANT**: Tailwind v4 uses `@tailwindcss/vite` (NOT `@astrojs/tailwind`).

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sijothomas97.github.io',
  base: '/portfolio',
  output: 'static',
  integrations: [
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
```

### 2.2 `src/styles/global.css` (Tailwind v4 CSS-based config)

**There is NO `tailwind.config.mjs` file.** All configuration lives in CSS.

```css
@import "tailwindcss";

/* Dark mode: class-based toggling (replaces darkMode: 'class' from v3) */
@custom-variant dark (&:where(.dark, .dark *));

/* Plugins (replaces require() from v3) */
@plugin "@tailwindcss/typography";

/* Theme tokens (replaces theme.extend from v3) */
@theme {
  /* Colors — Dark mode (default) */
  --color-primary: #0F172A;
  --color-primary-light: #FFFFFF;
  --color-surface: #1E293B;
  --color-surface-light: #F1F5F9;
  --color-text-primary: #E2E8F0;
  --color-text-primary-light: #0F172A;
  --color-text-secondary: #94A3B8;
  --color-text-secondary-light: #64748B;
  --color-accent: #22D3EE;
  --color-accent-hover: #67E8F9;
  --color-accent-light: #0891B2;
  --color-accent-light-hover: #06B6D4;
  --color-link: #38BDF8;
  --color-link-light: #0284C7;
  --color-success: #4ADE80;
  --color-border: #334155;
  --color-border-light: #E2E8F0;

  /* Fonts */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Custom font sizes */
  --text-body: 1.0625rem;     /* 17px */
  --text-body--line-height: 1.6;
  --text-body-lg: 1.125rem;   /* 18px */
  --text-body-lg--line-height: 1.6;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Reduced motion reset */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Usage in Tailwind classes:**
- `bg-primary` → `#0F172A` (dark bg)
- `dark:bg-primary-light` → `#FFFFFF` (light bg when toggled)
- `text-text-primary` → `#E2E8F0` (dark text)
- `dark:text-text-primary-light` → `#0F172A` (light text when toggled)
- `text-accent` → `#22D3EE` (cyan)
- `font-sans` → Inter
- `font-mono` → JetBrains Mono

### 2.3 `src/utils/links.ts` (Base Path Helper)

**All internal links must use this helper** because the site is deployed at `/portfolio`.

```typescript
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path}`.replace(/\/+/g, '/');
}
```

**Usage:**
```astro
---
import { withBase } from '../utils/links';
---
<a href={withBase('/projects')}>Projects</a>
<a href={withBase('/')}>Home</a>
<a href={withBase('/blog/my-post')}>Blog Post</a>
```

**Note:** Static assets in `public/` (images, PDF, etc.) are auto-prefixed by Astro — use plain paths for those: `<img src="/images/photo.webp">`.

### 2.4 `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@styles/*": ["src/styles/*"],
      "@content/*": ["src/content/*"]
    }
  }
}
```

---

## 3. Content Collection Schemas

### 3.1 `src/content.config.ts`

**IMPORTANT Astro 5 changes:**
- Import `z` from `'astro/zod'` (NOT `'astro:content'`)
- Import `glob` from `'astro/loaders'`
- Use `loader: glob({...})` (NOT `type: 'content'`)
- Entry identifier is `entry.id` (NOT `entry.slug`)

```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    featured: z.boolean().default(false),
    featuredOrder: z.number().optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()),
    techStack: z.array(z.string()),
    github: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    date: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

export const collections = { projects, blog };
```

### 3.2 Project Markdown Frontmatter Example

```yaml
---
title: "Financial Market Prediction: Time Series Forecasting"
description: "Python-based financial market prediction using ARIMA, SARIMA, ARCH, GARCH, and ARDL models for accurate trend forecasting."
featured: true
featuredOrder: 1
tags: ["Python", "Time Series", "Statistical Modeling", "Finance"]
techStack: ["Python", "ARIMA", "SARIMA", "ARCH", "GARCH", "ARDL", "Pandas", "Matplotlib"]
github: "https://github.com/sijothomas97/time-series-on-stocks-data"
date: 2023-11-01
---
```

### 3.3 Blog Post Markdown Frontmatter Example

```yaml
---
title: "Building RAG Systems on AWS: A Practical Guide"
description: "Lessons from building production RAG pipelines with LangChain, ChromaDB, and AWS services."
pubDate: 2025-01-15
tags: ["RAG", "AWS", "LLM", "GenAI", "Python"]
draft: false
readingTime: "8 min read"
---
```

---

## 4. Component Specifications

### 4.1 `BaseLayout.astro`

**Props:**
```typescript
interface Props {
  title: string;          // Page title (prepended to " | Sijo Thomas")
  description: string;    // Meta description (max 160 chars)
  ogImage?: string;       // Open Graph image path (default: /images/og-image.png)
  ogType?: string;        // Open Graph type (default: "website")
  canonicalUrl?: string;  // Canonical URL override
}
```

**Renders:**
- `<!DOCTYPE html>` with `<html lang="en" class="dark">`
- `<head>`: charset, viewport, title, meta description, canonical, OG tags, Twitter card, JSON-LD, font links, global CSS
- `<body>`: skip-to-content link → Header → `<main id="main-content"><slot /></main>` → Footer
- Inline theme initialization script (reads localStorage before paint to prevent flash)

### 4.2 `Header.astro`

**Props:** None (reads current URL from `Astro.url`)

**Renders:**
- `<header>` with `position: fixed`, backdrop blur
- Logo/name: "Sijo Thomas" → links to `withBase('/')` (base path helper required)
- Nav links: Home (`withBase('/')`), Projects (`withBase('/projects')`), Blog (`withBase('/blog')`), Contact (`withBase('/contact')`)
- Active state: `aria-current="page"` on current page link
- ThemeToggle component
- Mobile: hamburger button → slide-down nav menu

### 4.3 `Footer.astro`

**Props:** None

**Renders:**
- `<footer>` with social links (LinkedIn, GitHub, Email)
- Copyright: "© {currentYear} Sijo Thomas"
- Links open in new tab with `rel="noopener noreferrer"`

### 4.4 `ThemeToggle.astro`

**Props:** None

**Behavior:**
- Reads initial state: localStorage → `prefers-color-scheme` → default `dark`
- Click toggles `dark` class on `<html>`
- Persists choice to `localStorage.setItem('theme', 'light' | 'dark')`
- Icon switches between Sun (dark mode active) and Moon (light mode active)
- `aria-label="Toggle dark mode"` / `"Toggle light mode"`

### 4.5 `ProjectCard.astro`

**Props:**
```typescript
interface Props {
  title: string;
  description: string;
  tags: string[];
  id: string;        // NOTE: Astro 5 uses `id` not `slug`
  thumbnail?: string;
}
```

**Renders:**
- `<article>` card with `bg-surface`, rounded corners, hover effect (scale + shadow)
- Gradient thumbnail placeholder (if no `thumbnail` provided)
- Title as `<h3>`
- Description (clamped to 2 lines via `line-clamp-2`)
- Tag pills (first 3-4 tags)
- Entire card is a link to `withBase('/projects/' + id)` (use base path helper)

### 4.6 Homepage Sections

#### `Hero.astro`
- No props (content is hardcoded from CONTENT.md)
- Full viewport height (`min-h-screen`)
- GSAP animation: staggered fade-in of name → title → description → CTAs
- GSAP loaded via inline `<script>` with dynamic import: `const { gsap } = await import('gsap')`
- Check `prefers-reduced-motion` before animating

#### `About.astro`
- No props
- `id="about"` for anchor linking
- Two-column grid: photo (left) + text (right)
- Photo: `<img>` with `loading="lazy"`, explicit dimensions, `alt="Sijo Thomas, AI/ML Engineer"`
- Stacks to single column on mobile (text below photo)

#### `FeaturedProjects.astro`
- No props (queries content collection internally)
- Fetches `projects` where `featured === true`, sorted by `featuredOrder`
- Renders 3 `ProjectCard` components in responsive grid
- "View All Projects" link to `/projects`

#### `Skills.astro`
- No props
- Data: hardcoded array of skill categories (see CONTENT.md)
- Each category: card with category name + grid of skill items (icon + label)
- Icons: Lucide icons where available, text fallback otherwise

#### `Experience.astro`
- No props
- Data: hardcoded array of experience entries (see CONTENT.md)
- Vertical timeline: left border line with dots, entries on the right
- Each entry: company, role, date range, bullet points

#### `Education.astro`
- No props
- 2 cards: MSc Data Science, BCA
- Each: degree, institution, year

#### `ContactCTA.astro`
- No props
- Heading: "Let's Work Together"
- Description line
- CTA button linking to `/contact`

---

## 5. Page Specifications

### 5.1 `/projects/index.astro`
- Fetches all projects from collection
- Renders filter bar: "All" + unique tags extracted from all projects
- Filter is client-side: JavaScript toggles `hidden` class on cards based on selected tag
- Grid layout matching homepage featured section
- Page title: "Projects | Sijo Thomas"

### 5.2 `/projects/[...id].astro` (NOTE: `id` not `slug` — Astro 5 change)

```astro
---
import { getCollection, render } from 'astro:content';
import { withBase } from '../../utils/links';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { id: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);  // standalone render(), NOT project.render()
---

<BaseLayout title={project.data.title} description={project.data.description}>
  <article class="prose dark:prose-invert max-w-none">
    <h1>{project.data.title}</h1>
    <Content />
  </article>
</BaseLayout>
```

- Renders: hero banner (title, date, tags, tech stack badges) → Markdown body → GitHub link → prev/next navigation
- Markdown body uses Tailwind Typography (`prose dark:prose-invert`) for styling
- Page title: "{project.title} | Sijo Thomas"

### 5.3 `/blog/index.astro`
- Fetches all non-draft blog posts, sorted by `pubDate` descending
- Each entry: title (link), date, reading time, description, tags
- Page title: "Blog | Sijo Thomas"

### 5.4 `/blog/[...id].astro` (NOTE: `id` not `slug`)

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);  // standalone render()
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <article class="prose dark:prose-invert max-w-none">
    <h1>{post.data.title}</h1>
    <time>{post.data.pubDate.toLocaleDateString()}</time>
    <Content />
  </article>
</BaseLayout>
```

- Page title: "{post.title} | Sijo Thomas"

### 5.5 `/contact.astro`
- Contact form: `<form action="https://formspree.io/f/PLACEHOLDER_ID" method="POST">`
- **NOTE:** The `PLACEHOLDER_ID` must be replaced with a real Formspree form ID. To get one: sign up at https://formspree.io, create a form, and copy the form ID. Until then, the form will show an error on submit — this is expected.
- Fields: Name (text, required), Email (email, required), Message (textarea, required)
- Submit button: "Send Message"
- Below form: social links (LinkedIn, GitHub, Email)
- Page title: "Contact | Sijo Thomas"

### 5.6 `/404.astro`
- Friendly message: "Page not found"
- Link back to homepage
- Page title: "404 — Page Not Found | Sijo Thomas"

---

## 5.7 Visual Layout Reference (ASCII Wireframes)

### Homepage Layout
```
┌──────────────────────────────────────────┐
│ [ST Logo]  Home  Projects  Blog  Contact │  ← Sticky nav (fixed, backdrop-blur)
│                                    [☀/🌙]│  ← Theme toggle
├──────────────────────────────────────────┤
│                                          │
│           SIJO THOMAS                    │  ← Hero: min-h-screen, centered
│         AI / ML Engineer                 │
│  Building intelligent systems with       │
│  GenAI, RAG, and cloud-native ML...      │
│                                          │
│  [View My Projects]  [Download CV]       │  ← CTAs: primary + outline
│       [Li] [GH] [✉]                     │  ← Social icons
│                                          │
├──────────────────────────────────────────┤
│  ┌─────────┐                             │
│  │  Photo  │  About Me                   │  ← About: 2-col grid
│  │ 400x400 │  With over five years...    │     (stacks on mobile)
│  └─────────┘                             │
├──────────────────────────────────────────┤
│  Featured Projects                       │
│  ┌──────┐  ┌──────┐  ┌──────┐           │  ← 3-col grid (1-col mobile)
│  │Card 1│  │Card 2│  │Card 3│           │     Each: thumbnail, title,
│  │      │  │      │  │      │           │     desc, tags, link
│  └──────┘  └──────┘  └──────┘           │
│            [View All Projects →]         │
├──────────────────────────────────────────┤
│  Technical Skills                        │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐  │  ← 3-col grid of category cards
│  │Languages │ │Databases │ │Data     │  │     Each card: heading +
│  │& Framewk│ │          │ │Analysis │  │     flex-wrap skill pills
│  └──────────┘ └──────────┘ └─────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐  │
│  │ML & DL  │ │Cloud     │ │Dev Tools│  │
│  └──────────┘ └──────────┘ └─────────┘  │
├──────────────────────────────────────────┤
│  Professional Experience                 │
│  ●─── Croner-i (Jul 2025 — Present)     │  ← Vertical timeline
│  │    ML Engineer | AWS                  │     Left border + dots
│  │    • RAG systems on AWS...            │
│  ●─── Mentrose (Apr 2024 — Mar 2025)    │
│  │    Full Stack ML Engineer             │
│  ●─── Wipro (Jan 2022 — Jul 2022)       │
│  ●─── Infosys (Oct 2017 — Dec 2021)     │
├──────────────────────────────────────────┤
│  Education                               │
│  ┌──────────────┐  ┌──────────────┐      │  ← 2 compact cards
│  │MSc Data Sci  │  │BCA           │      │
│  │Manchester Met│  │MG University │      │
│  └──────────────┘  └──────────────┘      │
├──────────────────────────────────────────┤
│  Let's Work Together                     │  ← CTA section
│  I'm open to ML engineering roles...     │
│  [Get in Touch]                          │
├──────────────────────────────────────────┤
│  [Li] [GH] [✉]   © 2026 Sijo Thomas    │  ← Footer
└──────────────────────────────────────────┘
```

### Project Case Study Layout (`/projects/[id]`)
```
┌──────────────────────────────────────────┐
│  [Nav]                                   │
├──────────────────────────────────────────┤
│  Financial Market Prediction             │  ← Title (h1)
│  [Python] [Time Series] [Finance]        │  ← Tag pills
│  November 2023                           │  ← Date
│  Tech: Python, ARIMA, SARIMA, GARCH...   │  ← Tech stack badges
│  [View on GitHub]                        │  ← GitHub link button
├──────────────────────────────────────────┤
│  ## The Problem                          │  ← Markdown body with
│  Predicting financial market...          │     Tailwind Typography
│                                          │     (prose dark:prose-invert)
│  ## My Approach                          │
│  I built a comprehensive...              │
│                                          │
│  ## Results                              │
│  - Compared 5 models across...           │
│                                          │
│  ## What I Learned                       │
│  Financial time series require...        │
├──────────────────────────────────────────┤
│  [← Previous Project]  [Next Project →]  │  ← Prev/Next nav
├──────────────────────────────────────────┤
│  [Footer]                                │
└──────────────────────────────────────────┘
```

### Design Reference Sites
For visual inspiration, these portfolios reflect the intended aesthetic:
- **Brittany Chiang** (brittanychiang.com) — dark mode, clean layout, project case studies
- **Josh W Comeau** (joshwcomeau.com) — dark mode, blog-focused, tasteful animations
- **Tailwind UI templates** (tailwindui.com) — component patterns similar to our design system

---

## 6. SEO Implementation

### 6.1 JSON-LD Person Schema (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sijo Thomas",
  "url": "https://sijothomas97.github.io/portfolio",
  "jobTitle": "AI / ML Engineer",
  "description": "AI & Machine Learning Engineer specialising in Generative AI, LLM & RAG, AWS, NLP, and Python.",
  "sameAs": [
    "https://www.linkedin.com/in/sijothomas97/",
    "https://github.com/sijothomas97"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Manchester Metropolitan University"
  },
  "knowsAbout": ["Machine Learning", "Generative AI", "RAG", "LLM", "AWS", "Python", "NLP"]
}
```

### 6.2 Open Graph Tags Template

```html
<meta property="og:title" content="{pageTitle}" />
<meta property="og:description" content="{pageDescription}" />
<meta property="og:image" content="{siteUrl}/images/og-image.png" />
<meta property="og:url" content="{canonicalUrl}" />
<meta property="og:type" content="{ogType}" />
<meta property="og:site_name" content="Sijo Thomas" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{pageTitle}" />
<meta name="twitter:description" content="{pageDescription}" />
<meta name="twitter:image" content="{siteUrl}/images/og-image.png" />
```

---

## 7. Animation Specification

### 7.1 Hero Animation (GSAP)

```javascript
// Only runs if prefers-reduced-motion is not set to reduce
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const { gsap } = await import('gsap');

  gsap.from('.hero-name', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 });
  gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.4 });
  gsap.from('.hero-description', { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });
  gsap.from('.hero-ctas', { opacity: 0, y: 30, duration: 0.8, delay: 0.8 });
  gsap.from('.hero-social', { opacity: 0, y: 30, duration: 0.8, delay: 1.0 });
}
```

### 7.2 Scroll Reveal Animations (CSS)

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    animation: revealUp 0.6s ease forwards;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }

  @keyframes revealUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

### 7.3 Hover Effects (CSS)

```css
.project-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.3);
}
```

---

## 8. Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - uses: withastro/action@v3
        with:
          path: .

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 9. Dependencies

### Install Commands (Phase 0)
```bash
# Scaffold Astro
npm create astro@latest . -- --template minimal --typescript strict

# Install Tailwind v4 (vite plugin, NOT @astrojs/tailwind)
npm install tailwindcss @tailwindcss/vite

# Install other dependencies
npx astro add sitemap
npm install @tailwindcss/typography gsap lucide-astro
```

### Expected `package.json` Dependencies
```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/sitemap": "^latest",
    "tailwindcss": "^4.x",
    "@tailwindcss/vite": "^latest",
    "@tailwindcss/typography": "^latest",
    "gsap": "^3.x",
    "lucide-astro": "^latest"
  }
}
```

**Do NOT install:** `@astrojs/tailwind` (deprecated for v4), React, Vue, Svelte, or any UI framework.

### Image Conversion (Phase 0)

Convert JPEG profile photos to WebP format:
```bash
# Option 1: Using cwebp (install via: brew install webp)
cwebp -q 80 assets/img/sijo_thomas.jpeg -o public/images/sijo-thomas.webp

# Option 2: Using sips (built into macOS, no install needed)
sips -s format webp assets/img/sijo_thomas.jpeg --out public/images/sijo-thomas.webp

# Option 3: If neither available, just copy the JPEG as-is (WebP is preferred but not blocking)
cp assets/img/sijo_thomas.jpeg public/images/sijo-thomas.jpeg
# Then update all <img> src references to use .jpeg instead of .webp
```

### Node Version Requirement

- **Node.js 18+** (required by Astro 5)
- **npm 9+**
- Verify: `node --version && npm --version`
