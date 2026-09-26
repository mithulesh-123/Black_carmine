# BLACKCARMINE

**Digital Products, Engineered With Intent.**

The marketing site and case-study platform for BLACKCARMINE — a full-service,
senior-only digital agency engineering web platforms, mobile apps, SaaS, brand
systems and AI-driven products with cinematic craft.

Live at **[blackcarmine.studio](https://blackcarmine.studio)** · Contact **hello@blackcarmine.studio**

---

## Overview

A single-page agency experience built around a dark, carmine-accented visual
system and scroll-driven motion. The homepage moves through Hero → Marquee →
Services → Work → Process → Technology → Studio → Contact, with each project
linking out to a long-form case study at `/work/[slug]`.

Content is not hard-coded in JSX. Services, projects, process steps, technology
and studio facts all live in [`blackcarmine/lib/data.ts`](./blackcarmine/lib/data.ts)
as typed data, so copy changes and new case studies ship without touching
component code.

## Tech stack

| Layer        | Technology                                   |
| ------------ | -------------------------------------------- |
| Framework    | Next.js 16 (App Router)                      |
| UI           | React 19, TypeScript 5                       |
| Styling      | Tailwind CSS v4 + design tokens in CSS       |
| Animation    | GSAP 3 + ScrollTrigger, `@gsap/react`        |
| Smooth scroll| Lenis                                        |
| Fonts        | Syne (display), Inter (text), Space Grotesk (mono) via `next/font` |

## Features

- **Scroll-driven motion** — GSAP ScrollTrigger scenes, animated text reveals,
  magnetic buttons and a page-level scroll-progress bar.
- **Bespoke interaction layer** — custom cursor, film-grain overlay, preloader
  and Lenis-powered smooth scrolling, all composed in the root layout.
- **Dynamic case studies** — each of the 6 projects in `PROJECTS` generates its
  own `/work/[slug]` page with story, approach, scope and stack.
- **Content as data** — one typed source of truth in `lib/data.ts` drives the
  services grid, work index, process timeline and sitemap.
- **Accessibility built in** — skip link, `prefers-reduced-motion` guards on
  every animation, and native-cursor / reduced-effect fallbacks for touch and
  coarse pointers.
- **SEO and social** — dynamic `sitemap.ts` and `robots.ts`, web manifest,
  generated Open Graph and Apple touch images, and JSON-LD `Organization`
  structured data.

## Project structure

```
blackcarmine/
├── app/
│   ├── layout.tsx          # Root layout: providers, cursor, grain, header/footer
│   ├── page.tsx           # Homepage section composition
│   ├── work/[slug]/        # Dynamic case-study pages
│   ├── sitemap.ts          # Generated from PROJECTS
│   ├── robots.ts
│   ├── manifest.ts
│   ├── opengraph-image.tsx # Generated OG image
│   └── globals.css         # Design tokens + Tailwind v4 theme
├── components/
│   ├── *.tsx               # Page sections (Hero, Services, Work, Process, …)
│   ├── ui/                 # AnimatedText, Magnetic, Reveal, SmartLink
│   ├── visuals/            # ProjectVisual
│   ├── work/               # CaseStudy
│   └── providers/          # SmoothScroll (Lenis)
└── lib/
    └── data.ts             # Typed content: services, projects, process, stack
```

## Getting started

Requires Node.js 20.9+ and npm.

```bash
cd blackcarmine
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint (eslint-config-next)
```

## Design system

Tokens are defined as CSS custom properties in `app/globals.css` and exposed to
Tailwind through `@theme inline`:

| Token            | Value                                             |
| ---------------- | ------------------------------------------------- |
| `--bg`           | `#08070a` (near-black canvas)                     |
| `--ink`          | `#f4f1ea` (warm off-white text)                   |
| `--carmine`      | `#e8214b` (primary accent)                        |
| `--carmine-deep` | `#8e0028`                                         |
| `--carmine-soft` | `#ff5c7a`                                         |
| Easing           | `--ease-premium`, `--ease-out-expo`, `--ease-in-out-quart` |

## Repository notes

`blackcarmine/` is the application source and contains its own Git history.
Top-level assets (audit screenshots, reference captures) sit alongside it for
design review purposes only and are not part of the build.

## Contact

- **Web:** [blackcarmine.studio](https://blackcarmine.studio)
- **Email:** hello@blackcarmine.studio
- **Social:** X / Instagram / LinkedIn / GitHub / Dribbble

© BLACKCARMINE. All rights reserved.
