---
title: "Rebuilding My Portfolio with Astro"
description: "Why I rebuilt my single-README Jekyll portfolio with Astro 5 + Tailwind v4, and what I'd do differently next time."
pubDate: 2025-03-01
tags: ["Astro", "Tailwind", "Portfolio", "Web Development"]
draft: false
readingTime: "4 min read"
---

I recently rebuilt my portfolio from a GitHub README into a proper website using Astro. Here's why I made the switch and what I learned.

## The Problem with README Portfolios

My old portfolio was a single `README.md` using Jekyll's minimal theme. It worked — GitHub Pages rendered it, recruiters could see it. But it had real limitations: no dark mode, no navigation, limited mobile experience, 17MB of GIF files loading on every visit, and no way to present projects as detailed case studies.

## Why Astro

As an ML engineer, I didn't want to spend weeks learning React just to build a portfolio. Astro ships zero JavaScript by default — pages are pure HTML and CSS unless you explicitly add interactivity. This means near-perfect Lighthouse scores without any optimisation effort.

The content collections feature sold me. Each project and blog post is a Markdown file with typed frontmatter. Adding a new project means creating a new `.md` file — no touching any component code.

## The Stack

- **Astro 5** for the framework
- **Tailwind CSS** for styling (dark mode is just a `dark:` prefix away)
- **GSAP** for a single hero animation (loaded only on the homepage)
- **GitHub Actions** for automatic deployment

## What I'd Do Differently

I over-designed the first iteration. The portfolio should showcase my ML work, not be a frontend showcase. I stripped back the animations, simplified the layout, and focused on making the content — especially project case studies — as strong as possible.

## The Result

The new site loads in under 2 seconds, scores 95+ on Lighthouse, works beautifully on mobile, and — most importantly — presents my work in a way that actually helps hiring managers understand what I can do.

If you're an ML/data engineer considering a portfolio rebuild, Astro is worth a look. It gets out of your way and lets the content shine.
