# Design System Extraction & Construction

Full reference for **Step 2** of the workflow: dissecting the target site's visual language and structuring it as a CSS design system built on native custom properties.

---

## 1. Color Palette Extraction

Do not guess colors or hardcode HEX values scattered through your CSS rules. Extract the primary, secondary, semantic, and neutral colors from the target and represent them as a central theme.

### Color token naming convention

```css
:root {
  /* Brand / Primary Colors */
  --color-primary: #101010;
  --color-primary-hover: #1e1e1e;
  --color-accent: #ff4500;
  --color-accent-rgb: 255, 69, 0; /* for opacity variants, e.g. rgba(var(--color-accent-rgb), 0.5) */

  /* Neutral Scale (Backgrounds & Borders) */
  --color-bg-base: #ffffff;
  --color-bg-surface: #f9f9f9;
  --color-bg-card: #f1f1f1;
  --color-border: #e2e2e2;

  /* Typography Colors */
  --text-primary: #121212;
  --text-secondary: #5f5f5f;
  --text-muted: #9c9c9c;
}
```

Values above are placeholders — always overwrite them with what you actually measure from the target, never reuse this palette as-is.

### Extraction protocol
1. **Computed styles**: open DevTools, select target components, and check the `Computed` tab for `color`, `background-color`, `border-color`.
2. **Global themes**: check for existing CSS variables already defined on the target's `html`/`body` tag — many sites expose their own token names in the stylesheet, which is the fastest way to get the full palette in one place.

---

## 2. Typography Engine

Typography is a site's most visible quality signal — a hierarchy that's slightly off reads as "cheap" even when colors match perfectly.

### Typographic scale
Use fluid sizing with `clamp()` for headings so they scale smoothly between mobile and desktop without a media-query "jump":

```css
:root {
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-display: 'Outfit', sans-serif;

  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */

  /* Fluid Typography for large displays */
  --text-display-hero: clamp(2.5rem, 6vw + 1rem, 7rem);
  --text-display-section: clamp(1.8rem, 4vw + 0.5rem, 4rem);

  /* Font Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}
```

Match the target's actual font-loading strategy too (`font-display: swap` vs. self-hosted WOFF2 vs. Google Fonts CDN) — this affects perceived load performance, which is part of fidelity.

---

## 3. Spacing & Grid System

Extract the site's real spacing rhythm rather than assuming a generic 8px grid — many premium sites use an irregular scale tuned to their specific layout.

```css
:root {
  --spacing-1: 0.25rem;  /* 4px */
  --spacing-2: 0.5rem;   /* 8px */
  --spacing-3: 0.75rem;  /* 12px */
  --spacing-4: 1rem;     /* 16px */
  --spacing-6: 1.5rem;   /* 24px */
  --spacing-8: 2rem;     /* 32px */
  --spacing-12: 3rem;    /* 48px */
  --spacing-16: 4rem;    /* 64px */
}
```

Use `gap`/`grid-gap` with these tokens rather than typing one-off margins (`margin: 17px`) — one-off values are the fastest way for spacing drift to creep in undetected.

---

## 4. Border Radii & Borders

```css
:root {
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;  /* Pill shape / circles */

  --border-width-thin: 1px;
  --border-width-thick: 2px;
}
```

---

## 5. Shadows & Depth Layering

Inspect the target's actual `box-shadow` parameters and map them to standard elevation tiers rather than reusing generic Tailwind-style defaults — subtle differences in blur/spread are very visible on hover states and cards.

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* Glassmorphism backdrop overlay */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-blur: blur(12px);
}
```