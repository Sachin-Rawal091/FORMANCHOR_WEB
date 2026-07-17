---
name: clone-any-website-elite
description: Rebuild a public website as a clean, production-grade local project matching its design system, motion, micro-interactions, accessibility, and performance. Use this whenever someone wants to "clone," "recreate," "copy the look/feel of," "rebuild in React/Vue/etc.," or "match the design of" a real site they link to or describe — including phrasing like "make something that moves and looks like this" or "recreate this in [framework]," even without the word "clone." Covers design-token extraction, GSAP/Lenis motion and scroll-driven animation, magnetic buttons and custom cursors, WCAG accessibility, Core Web Vitals performance budgets, and automated visual-diff verification against the live original.
---

# Elite Website Cloning Workflow

Cloning a website at a production-grade level goes far beyond copying HTML markup and basic styles. It means reconstructing the site's whole digital fingerprint — design tokens, fluid typography, scroll timelines, micro-interactions, accessibility behavior, and rendering performance — as a **clean-room reimplementation**, not a copy of the original's files.

Treat the live site as the visual spec. If the original's own source/bundles are available, use them only as a read-only reference to resolve ambiguity about behavior — never copy or redistribute them directly.

## Before you start: confirm it's fair game

Proceed only if the target is public and requires no authentication, payment, invitation, or access-control bypass to view. Never capture or reproduce private user data, secrets, credentials, analytics identifiers, or API keys. Never redistribute the original's source code, source maps, or bundled JS as part of the deliverable. Never present the clone as official, affiliated with, or endorsed by the original — say clearly that it's an independent recreation if the user plans to publish or share it. If anything about scope is unclear from the request, ask before building.

## The 7-Step Workflow

### Step 1: Target Discovery & Tech Analysis
Analyze the target before writing any code:
1. **Tech stack** — use DevTools (or a tool like Wappalyzer) to identify whether it's React, Vue, Svelte, Next.js, Webflow, or vanilla HTML/CSS. This shapes what's realistic to match.
2. **Resource audit** — note stylesheet links, fonts (Google Fonts vs. custom WOFF2), media assets (images, Lottie JSON, SVGs, MP4s), and animation libraries in use (GSAP, Framer Motion, Spline, Three.js). Knowing the library often tells you the *technique* (e.g. GSAP present → likely ScrollTrigger-driven, not CSS-only).
3. **DOM & layout strategy** — inspect grid/flex structure to decide the clone's markup approach, and take a desktop + mobile screenshot as your baseline reference.

Pick the smallest stack that can hit the fidelity bar:

| Target | Stack |
|---|---|
| Three.js / WebGL experience | React + TypeScript + React Three Fiber |
| PixiJS-driven app | Vite + TypeScript + Pixi |
| Video-led landing page | React + TypeScript |
| DOM-heavy marketing/product site | React + TypeScript |
| Mostly static text/content | Plain HTML — don't reach for a framework here |

### Step 2: Design System Extraction & Construction
Never write ad-hoc styles pulled from memory or eyeballed off a screenshot. Rebuild the site's design system as CSS custom properties first, then build components against those tokens.
- **Action**: extract the precise typographic scale, color palette, spacing scale, border-radii, and shadow configuration — sampled from computed styles in DevTools, not approximated.
- **Reference**: `references/design-system.md` has the full token structure, naming conventions, and extraction protocol.

### Step 3: Motion, Transitions & Micro-Interactions
Motion is often what makes a premium site feel premium — a pixel-accurate but motionless clone still reads as "off." A generic CSS `ease` where the original uses a spring or expo curve is one of the most common tells.
- **Action**: trace every entry sequence, scroll-driven movement, hover effect, and cursor interaction, and reproduce it with matching timing and easing — not a default fade-in substitute.
- **Reference**: `references/motion-and-interaction.md` has easing presets, Lenis smooth-scroll setup, GSAP ScrollTrigger patterns, stagger techniques, magnetic buttons, and lerp-cursor code.

### Step 4: Accessibility & Performance Guardrails
Treat these as fidelity, not compliance overhead bolted on at the end — a heavy, mouse-only, motion-blasting recreation of a site that was actually fast and keyboard-navigable hasn't matched it.
- **Action**: implement semantic HTML, explicit focus states, `prefers-reduced-motion` support, and animate only GPU-safe properties (`transform`, `opacity`). Set explicit image dimensions and lazy-load below-the-fold media.
- **Reference**: `references/a11y-and-performance.md` has the semantic structure, focus-state CSS, reduced-motion implementation, and the safe/unsafe animation property table.

### Step 5: Core Layout & Component Scaffolding
Build in this order rather than starting with visual polish:
1. **Initialize styles** — CSS reset, global rules, and the tokens from Step 2.
2. **Layout containers** — top-level structure (navbar, hero, main grid, sections, footer) using semantic tags.
3. **Components** — smallest to largest (buttons → cards → sliders/complex media), checking against the live original as you go rather than only at the end.

### Step 6: Visual Diff & State Validation
Don't rely on eyeballing side-by-side — humans are bad at catching a 4px spacing drift or a slightly-off easing curve, which is exactly what makes a clone feel subtly "off" without anyone being able to say why.
- **Action**: emulate hover/focus/active states, freeze animations at matching progress points, and run `scripts/visual_diff.py` to get a measured similarity score and a highlighted diff image, per viewport.
- **Reference**: `references/visual-diff-validation.md` has the manual-inspection checklist, DevTools freeze-state techniques, and full script usage/flags.

Minimum validation bar: desktop and mobile viewports; loading/error/empty/reduced-motion/muted states; hover, touch, keyboard, and drag inputs; zero console errors; zero failed network requests; and zero runtime requests still hitting the original's host (a sign an asset URL was copied rather than rehosted or recreated).

### Step 7: Final Optimization & Production Build
1. **Asset optimization** — convert raster images to WebP/AVIF, set explicit `width`/`height` to prevent CLS, lazy-load offscreen media, inline critical SVGs.
2. **Production bundle** — run the build, verify tree-shaking, confirm no console logs or sourcemaps ship in the final build.
3. **Cross-device validation** — check mobile layouts, touch gestures, and scroll behavior on real or emulated devices, not just a resized desktop browser.
4. **Report fidelity honestly** — include a short table classifying each subsystem (layout, typography, color, motion, a11y, performance) as **Exact**, **Approximate**, or **Not verified**, so the user knows where to look if something feels slightly off. Remove any browser profiles, research bundles, credentials, or temp assets before handoff.