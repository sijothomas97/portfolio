# Product Requirements Document (PRD)

## Product: Sijo Thomas — AI/ML Engineer Portfolio

### 1. Purpose

Build a modern, professional portfolio website for Sijo Thomas (AI/ML Engineer) that:
- Passes the "30-second recruiter scan" — value proposition is immediately clear
- Provides depth for hiring managers who dig deeper via project case studies
- Showcases AI/ML expertise through content, not just design
- Performs exceptionally (Lighthouse 90+) and is fully accessible (WCAG 2.2 AA)

### 2. Target Audience

| Audience | What They Need | Time on Site |
|----------|---------------|-------------|
| **Recruiters** | Quick scan: role, skills, experience summary, contact | 30-90 seconds |
| **Hiring Managers** | Deep dive: project case studies, technical depth, problem-solving ability | 3-10 minutes |
| **Peers / Collaborators** | Technical blog posts, GitHub links, project approaches | 5-15 minutes |
| **Potential Clients** | Services overview, past work quality, contact form | 2-5 minutes |

### 3. User Stories

#### 3.1 Navigation & First Impression
- **US-01**: As a recruiter, I can understand who Sijo is and what he does within 5 seconds of landing on the homepage
- **US-02**: As a visitor, I can navigate to any section of the site within 2 clicks from any page
- **US-03**: As a visitor, I can toggle between dark and light mode, and my preference persists across visits
- **US-04**: As a mobile user, I can access all content and navigation comfortably on my phone
- **US-05**: As a screen reader user, I can navigate the site using keyboard only and understand all content

#### 3.2 Homepage
- **US-06**: As a visitor, I see a hero section with Sijo's name, title, one-liner value proposition, and clear CTAs
- **US-07**: As a visitor, I can scroll through a concise overview of about, projects, skills, experience, and education on one page
- **US-08**: As a recruiter, I can download Sijo's CV as a PDF from the hero section
- **US-09**: As a visitor, I can click on featured project cards to read full case studies

#### 3.3 Projects
- **US-10**: As a hiring manager, I can browse all projects on a dedicated projects page
- **US-11**: As a hiring manager, I can filter projects by technology tags
- **US-12**: As a hiring manager, I can read a detailed case study for each project with Problem, Approach, and Results sections
- **US-13**: As a hiring manager, I can see the tech stack, GitHub links, and quantified results for each project
- **US-14**: As a visitor, I can navigate between project case studies using prev/next links

#### 3.4 Blog
- **US-15**: As a peer, I can browse a list of technical blog posts sorted by date
- **US-16**: As a peer, I can read a full blog post with clean typography and code formatting
- **US-17**: As a visitor, I can see tags and estimated reading time for each blog post

#### 3.5 Contact
- **US-18**: As a potential client, I can send a message via a contact form without leaving the site
- **US-19**: As a recruiter, I can find LinkedIn, GitHub, and email links easily from any page (footer)
- **US-20**: As a visitor, I see clear CTAs to get in touch at multiple points throughout the site

#### 3.6 SEO & Discoverability
- **US-21**: As a search engine, I can index all pages with proper meta tags, sitemap, and semantic HTML
- **US-22**: As a social media platform, I can render a rich preview when the portfolio URL is shared (Open Graph)

---

### 4. Functional Requirements

#### 4.1 Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero + About + Featured Projects + Skills + Experience + Education + Contact CTA |
| Projects Index | `/projects` | Filterable grid of all projects |
| Project Case Study | `/projects/[slug]` | Individual project deep-dive |
| Blog Index | `/blog` | List of blog posts |
| Blog Post | `/blog/[slug]` | Individual blog post |
| Contact | `/contact` | Contact form + social links |
| 404 | `/404` | Friendly error page with navigation home |

#### 4.2 Components

| Component | Location | Description |
|-----------|----------|-------------|
| Header | All pages | Sticky top nav: logo/name, nav links (Home, Projects, Blog, Contact), dark/light toggle, mobile hamburger |
| Footer | All pages | Social links (LinkedIn, GitHub, Email), copyright, no phone number |
| ThemeToggle | Header | Sun/moon icon button, persists to localStorage, respects `prefers-color-scheme` |
| ProjectCard | Homepage, Projects page | Thumbnail, title, description (2 lines), tech badges, link to case study |
| Hero | Homepage | Full viewport, name, title, one-liner, social links, CTAs (View Projects + Download CV) |
| About | Homepage | Two-column: photo + narrative paragraph |
| Skills | Homepage | Categorized grid with icons |
| Experience | Homepage | Vertical timeline with impact-focused entries |
| Education | Homepage | Compact cards |
| ContactCTA | Homepage | "Let's Work Together" heading + button |

#### 4.3 Content Collections

**Projects Collection** (`src/content/projects/`):
- 4 project markdown files
- 3 marked as `featured: true` (displayed on homepage)
- Each with: title, description, tags, techStack, github URL, problem, approach, results, date

**Blog Collection** (`src/content/blog/`):
- 2-3 seed blog posts
- Each with: title, description, pubDate, tags, draft flag, readingTime

#### 4.4 Interactive Features

| Feature | Implementation |
|---------|---------------|
| Dark/light mode toggle | Class-based (`dark:` prefix), persisted to localStorage |
| Mobile navigation | Hamburger menu, CSS/minimal JS |
| Hero animation | GSAP fade-in/typing effect, hero section only |
| Scroll animations | CSS `animation-timeline: view()` for section reveals |
| Project filtering | Client-side tag filter on `/projects` page |
| Contact form | Formspree integration (POST to external endpoint) |
| Smooth scrolling | CSS `scroll-behavior: smooth` for anchor links |

#### 4.5 External Integrations

| Service | Purpose | Configuration |
|---------|---------|---------------|
| Google Fonts | Inter + JetBrains Mono | `<link>` in `<head>` with preconnect |
| Formspree | Contact form backend | Form `action` attribute (requires account setup) |
| GitHub Pages | Hosting | GitHub Actions workflow with `withastro/action` |
| GitHub Actions | CI/CD | Auto-deploy on push to `main` |

---

### 5. Non-Functional Requirements

#### 5.1 Performance
| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 90+ |
| Lighthouse SEO | 90+ |
| First Contentful Paint | < 1.8s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total JS shipped (non-hero pages) | 0 KB |
| Total JS shipped (homepage) | < 30 KB (GSAP) |

#### 5.2 Accessibility (WCAG 2.2 Level AA)
- Color contrast: 4.5:1 body text, 3:1 large text
- Keyboard navigation: all interactive elements focusable via Tab
- Focus indicators: visible on all focusable elements (min 2px, 3:1 contrast)
- Skip-to-content: first focusable element on every page
- Screen reader: all images have `alt` text, icon buttons have `aria-label`
- Reduced motion: all animations wrapped in `prefers-reduced-motion` media query
- Language: `<html lang="en">`
- Heading hierarchy: logical, no skipped levels, one `<h1>` per page
- Forms: visible `<label>` for all inputs, `aria-required` on required fields

#### 5.3 SEO
- Unique `<title>` per page (format: `Page Name | Sijo Thomas`)
- Unique `<meta name="description">` per page
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- JSON-LD Person schema on homepage
- Auto-generated sitemap via `@astrojs/sitemap`
- `robots.txt` allowing all crawlers
- Canonical URLs on all pages
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)

#### 5.4 Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 15+)
- Chrome for Android

#### 5.5 Responsive Breakpoints
| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile (default) | < 640px | Phones |
| `sm` | 640px+ | Large phones |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Laptops |
| `xl` | 1280px+ | Desktops |

---

### 6. Content Requirements

All content is specified in `docs/CONTENT.md`. Key rules:
- No lorem ipsum — use real content only
- No phone number displayed publicly
- Projects must use case study format (Problem → Approach → Results)
- Experience entries must include quantified impact where possible
- About section must be a narrative, not a resume dump
- Skills section: categorized with icons, no percentage bars

---

### 7. Acceptance Criteria (Definition of Done)

A phase is complete when:
1. All components for that phase render correctly in the browser
2. Dark mode and light mode both work for all new components
3. Mobile layout is correct (test at 375px width)
4. No TypeScript/build errors (`npm run build` succeeds)
5. All images have `alt` text
6. All interactive elements are keyboard-accessible
7. No Lighthouse accessibility violations

The full project is complete when:
1. All 7 pages render correctly
2. All Lighthouse scores are 90+ (Accessibility: 100)
3. axe DevTools audit shows zero critical/serious violations
4. Site deploys successfully via GitHub Actions
5. Content matches `docs/CONTENT.md` exactly
6. Dark/light toggle works and persists
7. Contact form submits successfully
8. All links (internal and external) work
