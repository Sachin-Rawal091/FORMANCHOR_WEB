# Accessibility & Performance Guardrails

Full reference for **Step 4**: auditing and implementing accessibility and performance so the clone is robust, compliant, and fast — not just visually accurate.

---

## 1. Accessibility (a11y) Implementation

Never ship a visual-only clone unusable by people with visual, motor, or auditory impairments — this is part of matching the original, not a separate compliance pass.

### 1.1 Semantic HTML structure

Avoid `div` soup. Use semantic landmarks:

- `<header>` — site intro/logo/navbar
- `<nav>` — primary navigation links
- `<main>` — central unique content of the page
- `<section>` — distinct document areas (include a heading inside each)
- `<article>` — self-contained units of content
- `<footer>` — meta links, copyright, legal

### 1.2 Interactive focus states

Custom cursor UIs (see `motion-and-interaction.md` §4.2) often hide native browser focus highlights. Define focus states explicitly or keyboard navigation silently breaks:

```css
*:focus-visible {
  outline: 2px solid var(--color-accent, #ff4500);
  outline-offset: 4px;
}

.skip-to-content {
  position: absolute;
  top: -100px;
  left: 0;
  background: var(--color-accent);
  color: white;
  padding: var(--spacing-3) var(--spacing-6);
  z-index: 1000;
  transition: top var(--duration-fast) ease;
}

.skip-to-content:focus-visible {
  top: 10px;
}
```

### 1.3 Reduced motion support

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  runComplexIntroTimeline();
}
```

---

## 2. Performance Guardrails & Budgets

Target strong Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

### 2.1 Avoid layout shifts & reflow

Animate only GPU-accelerated properties. Animating layout-affecting properties forces a reflow on every frame and will visibly stutter, especially on lower-end devices.

| Safe to animate (composite only) | Avoid animating (forces layout/paint) |
|---|---|
| `transform: scale(x)` | `width`, `height` |
| `transform: translate3d(x, y, z)` | `top`, `left`, `right`, `bottom`, `margin` |
| `transform: rotate(deg)` | `font-size`, `line-height` |
| `opacity` | `box-shadow` (animate a pseudo-element's opacity instead) |

### 2.2 Asset optimization protocol

1. **Modern formats** — convert raster images (JPG/PNG) to WebP or AVIF.
2. **Explicit dimensions** — always set `width`/`height` on `<img>` so the browser reserves space before load, preventing CLS.
3. **Lazy loading** — `loading="lazy"` on all images not visible in the first viewport.
4. **SVG preloading** — inline critical SVGs (icons, logos, decorative vectors) to avoid extra network round-trips during initial paint.

Check the original's actual payload sizes (Network tab, sorted by size) before setting your own budget — matching a lightweight site's speed is easy; don't accidentally ship something heavier just because the visuals came out right.