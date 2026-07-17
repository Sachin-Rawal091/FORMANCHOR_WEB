# Motion, Transitions & Micro-Interactions

Full reference for **Step 3**: capturing and implementing the animations and interactions that give a site its "premium feel" — this is usually the single biggest driver of whether a clone convinces or not.

---

## 1. Timing & Easing Curves

Standard CSS easings (`ease`, `ease-in-out`) read as flat and generic. High-end sites almost always use custom cubic-bezier curves or spring physics to give motion organic weight.

```css
:root {
  /* Fast start, slow end (Expo Out) */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

  /* Gradual start, rapid end (Expo In) */
  --ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);

  /* Slow-down with soft elastic overshoot */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Standard durations */
  --duration-fast: 200ms;
  --duration-medium: 400ms;
  --duration-slow: 800ms;
}
```

Measure the target's actual durations/curves where you can (DevTools Animations panel shows exact keyframe timing) rather than picking from this list by feel — treat these as a starting vocabulary, not the answer.

---

## 2. Scroll-Driven Animations

### 2.1 Smooth scroll (Lenis)

```javascript
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom expo ease
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

### 2.2 GSAP ScrollTrigger

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Parallax on a hero image
gsap.to('.hero-image', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});
```

If the site uses Lenis + GSAP ScrollTrigger together, sync them (`lenis.on('scroll', ScrollTrigger.update)`) or ScrollTrigger's internal scroll tracking will drift out of phase with the smoothed scroll position.

---

## 3. Staggered Entrance Animations

Staggering (letters, words, cards, list items) creates the sweeping reveal effect common on premium landing pages. Match the target's actual grouping granularity — collapsing a per-letter stagger into a per-card one loses the effect entirely.

```html
<div class="stagger-group">
  <div class="card" style="--i: 0;">Card 1</div>
  <div class="card" style="--i: 1;">Card 2</div>
  <div class="card" style="--i: 2;">Card 3</div>
</div>
```

```css
.card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-slow) var(--ease-out-expo),
              transform var(--duration-slow) var(--ease-out-expo);
  transition-delay: calc(var(--i) * 100ms);
}

.stagger-group.visible .card {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 4. High-Fidelity Micro-Interactions

### 4.1 Magnetic buttons

```javascript
const magneticButtons = document.querySelectorAll('.btn-magnetic');

magneticButtons.forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  });
});
```

### 4.2 Interpolated custom cursor (lerp)

```javascript
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateCursor() {
  // Move 15% closer to target coordinates every frame
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;

  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  requestAnimationFrame(updateCursor);
}
updateCursor();
```

Custom cursors hide the native browser cursor and its focus affordances — pair this with the explicit `:focus-visible` styling in `a11y-and-performance.md`, or keyboard users lose all visual feedback.

---

## 5. Accessibility of Motion

Every animation implemented above must be skippable:

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

A recreation that adds motion the original respects opting out of has matched the visuals but missed the fidelity bar on a different axis.