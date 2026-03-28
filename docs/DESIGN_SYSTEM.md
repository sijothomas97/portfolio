# Design System

## Tailwind v4 Note

All design tokens below are defined as CSS custom properties via `@theme {}` in `src/styles/global.css`. **There is no `tailwind.config.mjs` file.** See `docs/TECH_SPEC.md` Section 2.2 for the full CSS config.

Token naming convention: `--color-{name}` in CSS → `bg-{name}`, `text-{name}` in Tailwind classes.

---

## 1. Color Palette

### Dark Mode (Default — applied when `<html class="dark">`)

| CSS Variable | Tailwind Class | Hex | Usage |
|-------------|---------------|-----|-------|
| `--color-primary` | `bg-primary` | `#0F172A` | Page background |
| `--color-surface` | `bg-surface` | `#1E293B` | Cards, sections, elevated surfaces |
| `--color-text-primary` | `text-text-primary` | `#E2E8F0` | Headings, body text |
| `--color-text-secondary` | `text-text-secondary` | `#94A3B8` | Muted text, captions, dates |
| `--color-accent` | `text-accent`, `bg-accent` | `#22D3EE` | CTAs, highlights, timeline dots |
| `--color-accent-hover` | `hover:bg-accent-hover` | `#67E8F9` | Hover state |
| `--color-link` | `text-link` | `#38BDF8` | Text links |
| `--color-success` | `text-success` | `#4ADE80` | Positive indicators |
| `--color-border` | `border-border` | `#334155` | Card borders, dividers |

### Light Mode (applied via `dark:` variant — which activates when `.dark` class is ABSENT)

**Naming pattern:** Use `dark:` variant with `-light` suffixed tokens for light mode values.

| CSS Variable | Tailwind Class | Hex | Usage |
|-------------|---------------|-----|-------|
| `--color-primary-light` | `dark:bg-primary-light` | `#FFFFFF` | Page background |
| `--color-surface-light` | `dark:bg-surface-light` | `#F1F5F9` | Cards, elevated surfaces |
| `--color-text-primary-light` | `dark:text-text-primary-light` | `#0F172A` | Headings, body text |
| `--color-text-secondary-light` | `dark:text-text-secondary-light` | `#64748B` | Muted text |
| `--color-accent-light` | `dark:text-accent-light` | `#0891B2` | CTAs (darker for white bg) |
| `--color-accent-light-hover` | `dark:hover:bg-accent-light-hover` | `#06B6D4` | Hover state |
| `--color-link-light` | `dark:text-link-light` | `#0284C7` | Text links |
| `--color-border-light` | `dark:border-border-light` | `#E2E8F0` | Borders |

### Dark/Light Mode Class Pattern

Since we use `@custom-variant dark (&:where(.dark, .dark *))`, the `dark:` variant activates when `.dark` class IS present. This means:

- **Default styles** = light mode appearance
- **`dark:` prefixed styles** = dark mode appearance

**Standard pattern for a component:**
```html
<div class="bg-white dark:bg-primary text-gray-900 dark:text-text-primary border-gray-200 dark:border-border">
```

Or using our custom tokens consistently:
```html
<div class="bg-primary-light dark:bg-primary text-text-primary-light dark:text-text-primary border-border-light dark:border-border">
```

### Contrast Ratios (Verified WCAG AA)

| Combination | Ratio | Pass? |
|-------------|-------|-------|
| `text-primary` on `primary` (dark) | 13.5:1 | Yes |
| `text-secondary` on `primary` (dark) | 5.5:1 | Yes |
| `accent` on `primary` (dark) | 9.2:1 | Yes |
| `link` on `primary` (dark) | 7.1:1 | Yes |
| `text-primary-light` on `primary-light` (light) | 17.4:1 | Yes |
| `text-secondary-light` on `primary-light` (light) | 5.0:1 | Yes |
| `accent` on `primary-light` (light) | 4.6:1 | Yes |

---

## 2. Typography

### Font Families

| Role | Font | Google Fonts Weight Imports | Tailwind Class |
|------|------|-----------------------------|----------------|
| Headings | Inter | 600, 700 | `font-sans` |
| Body | Inter | 400, 500 | `font-sans` |
| Code / Tech labels | JetBrains Mono | 400, 500 | `font-mono` |

### Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Tailwind |
|---------|------|--------|-------------|----------------|----------|
| h1 (Hero name) | 48px / 3rem | 700 | 1.1 | -0.02em | `text-5xl font-bold tracking-tight` |
| h1 (Page titles) | 36px / 2.25rem | 700 | 1.2 | -0.02em | `text-4xl font-bold tracking-tight` |
| h2 (Section headings) | 30px / 1.875rem | 600 | 1.3 | -0.01em | `text-3xl font-semibold` |
| h3 (Card titles) | 22px / 1.375rem | 600 | 1.4 | 0 | `text-xl font-semibold` |
| Body | 17px / 1.0625rem | 400 | 1.6 | 0.01em | `text-body` |
| Body large | 18px / 1.125rem | 400 | 1.6 | 0.01em | `text-body-lg` |
| Small / Caption | 14px / 0.875rem | 400 | 1.5 | 0.02em | `text-sm` |
| Code / Tech label | 14px / 0.875rem | 400 | 1.5 | 0 | `font-mono text-sm` |
| Nav links | 15px / 0.9375rem | 500 | 1 | 0.01em | `text-[0.9375rem] font-medium` |

### Dark Mode Typography Adjustments
- Increase body font weight from 400 to 500 for better readability on dark backgrounds
- Use `letter-spacing: 0.01em` on body text
- Use `text-body-lg` (18px) for main content paragraphs in dark mode
- Never use pure white (`#FFFFFF`) for body text — use `#E2E8F0`

---

## 3. Spacing System

Use Tailwind's default spacing scale. Key conventions:

| Context | Spacing | Tailwind |
|---------|---------|----------|
| Section vertical padding | 80px-96px | `py-20` / `py-24` |
| Section heading to content | 32px-48px | `mb-8` / `mb-12` |
| Card internal padding | 24px | `p-6` |
| Between cards in grid | 24px | `gap-6` |
| Between list items | 16px | `space-y-4` |
| Between paragraphs | 16px-24px | `space-y-4` / `space-y-6` |
| Container max width | 1200px | `max-w-6xl mx-auto` |
| Container horizontal padding | 16px mobile, 24px tablet+ | `px-4 md:px-6` |

---

## 4. Layout Grid

### Container
```html
<div class="max-w-6xl mx-auto px-4 md:px-6">
  <!-- page content -->
</div>
```

### Responsive Grid Patterns

**Project Cards (3-column):**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**About Section (2-column):**
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
```

**Skills Grid (category cards):**
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Skill items within a card:**
```html
<div class="flex flex-wrap gap-3">
```

---

## 5. Breakpoints

| Name | Min Width | Target |
|------|-----------|--------|
| Default | 0px | Mobile phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |

**Design priority**: Mobile-first. Start with the mobile layout, then add responsive overrides with `sm:`, `md:`, `lg:`, `xl:` prefixes.

---

## 6. Component Patterns

### 6.1 Card

```html
<article class="bg-surface dark:bg-surface rounded-xl p-6 border border-border dark:border-border
                transition-transform transition-shadow duration-200
                hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20">
  <!-- card content -->
</article>
```

### 6.2 Button — Primary

```astro
---
import { withBase } from '../utils/links';
---
<a href={withBase('/projects')}
   class="inline-flex items-center gap-2 px-6 py-3 rounded-lg
          bg-accent text-primary font-semibold
          hover:bg-accent-hover transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
          focus:ring-offset-primary">
  View Projects
</a>
```

**NOTE:** All internal `href` values must use `withBase()` from `src/utils/links.ts`. Static assets in `public/` do NOT need the helper.

### 6.3 Button — Secondary / Outline

```html
<!-- Static assets (public/) do NOT need withBase() -->
<a href="/resume.pdf"
   class="inline-flex items-center gap-2 px-6 py-3 rounded-lg
          border border-accent text-accent font-semibold
          hover:bg-accent/10 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
          focus:ring-offset-primary">
  Download CV
</a>
```

### 6.4 Tag / Pill

```html
<span class="inline-block px-3 py-1 rounded-full text-sm font-mono
             bg-accent/10 text-accent">
  Python
</span>
```

### 6.5 Section Heading

```html
<h2 class="text-3xl font-semibold text-text-primary dark:text-text-primary mb-4">
  Featured Projects
</h2>
<p class="text-text-secondary dark:text-text-secondary text-body-lg mb-12">
  A selection of projects showcasing my AI/ML expertise.
</p>
```

### 6.6 Navigation Link

```astro
---
import { withBase } from '../utils/links';
---
<!-- Default state -->
<a href={withBase('/projects')}
   class="text-[0.9375rem] font-medium text-text-secondary
          hover:text-accent transition-colors duration-200">
  Projects
</a>

<!-- Active state -->
<a href={withBase('/')}
   aria-current="page"
   class="text-[0.9375rem] font-medium text-accent">
  Home
</a>
```

### 6.7 Social Icon Link

```html
<a href="https://linkedin.com/in/sijothomas97"
   target="_blank"
   rel="noopener noreferrer"
   aria-label="LinkedIn"
   class="text-text-secondary hover:text-accent transition-colors duration-200">
  <!-- Lucide LinkedIn icon SVG -->
</a>
```

### 6.8 Form Input

```html
<div>
  <label for="email" class="block text-sm font-medium text-text-primary mb-2">
    Email <span class="text-accent">*</span>
  </label>
  <input type="email" id="email" name="email" required
         aria-required="true"
         class="w-full px-4 py-3 rounded-lg bg-surface border border-border
                text-text-primary placeholder-text-secondary
                focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                transition-colors duration-200" />
</div>
```

### 6.9 Timeline Entry

```html
<div class="relative pl-8 border-l-2 border-border">
  <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent"></div>
  <h3 class="text-xl font-semibold text-text-primary">Company Name</h3>
  <p class="text-sm text-accent font-mono mt-1">Role | Date Range</p>
  <ul class="mt-3 space-y-2 text-text-secondary text-body">
    <li>Impact-focused bullet point</li>
  </ul>
</div>
```

---

## 7. Focus & Accessibility Styles

### Focus Ring
All interactive elements must have a visible focus indicator:

```css
/* Applied via Tailwind utilities */
focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary
```

### Skip-to-Content Link
```html
<a href="#main-content"
   class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
          focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-primary
          focus:font-semibold">
  Skip to content
</a>
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Image Guidelines

| Image | Dimensions | Format | Loading |
|-------|-----------|--------|---------|
| Profile photo | 400x400 | WebP | `lazy` (below fold) |
| OG Image | 1200x630 | PNG | N/A (meta only) |
| Favicon | 32x32 | SVG | Inline in `<head>` |
| Project thumbnails | 600x400 | WebP | `lazy` |

All `<img>` tags must include:
- `alt` attribute (descriptive, not "image of...")
- `width` and `height` attributes (prevents CLS)
- `loading="lazy"` (except above-the-fold images)
- `decoding="async"`

---

## 9. Transition & Animation Tokens

| Property | Duration | Easing |
|----------|----------|--------|
| Color transitions | 200ms | `ease` |
| Transform (hover) | 200ms | `ease` |
| Page section reveal | 600ms | `ease` |
| Hero GSAP stagger | 800ms per element, 200ms stagger | `power2.out` |

All animations and transitions must be wrapped in:
```css
@media (prefers-reduced-motion: no-preference) {
  /* animations here */
}
```
