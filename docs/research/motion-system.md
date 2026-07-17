# Motion & Interaction System — FormPilot Website Showcase
> Extracted from Stitch-generated HTML scroll animation script + reference images

## Timing
| Animation | Duration | Usage |
|-----------|----------|-------|
| Fade-in on scroll | 800ms | Section reveals |
| Color transitions | 300ms | Nav links, buttons, card hover |
| Hover lift | 300ms | Feature card elevation |
| Button press | instant (scale) | Active state feedback |
| Pulse dot | 2000ms (infinite) | Hero badge status indicator |

## Easing
| Animation | Curve | Notes |
|-----------|-------|-------|
| Fade-in sections | ease-out | Opacity 0→1 + translateY(20px→0) |
| Color transitions | ease (default) | Linear feel for simple color shifts |
| Hover lift | ease | Transform + box-shadow combined |
| Pulse dot | ease-in-out | Scale 1→1.5→1 + opacity 1→0.5→1 |
| Button active | none (instant) | scale(0.95) on :active |

## Scroll Behavior
- **IntersectionObserver** pattern: threshold 0.1, rootMargin '0px'
- Elements start with `.fade-in-section` class: `opacity: 0; transform: translateY(20px)`
- On intersection, `.is-visible` added: `opacity: 1; transform: none`
- Each section is observed independently → stagger is implicit (natural scroll timing)
- No parallax, no scroll-jacking, no horizontal scroll — clean vertical flow

## Stagger Patterns
- Implicit stagger from scroll position — sections at different scroll offsets fire independently
- No character/word-level animation
- No explicit delay offsets between cards in a grid

## Micro-Interactions
| Element | Interaction | Effect |
|---------|-------------|--------|
| Feature cards | Hover | translateY(-5px) + glow shadow |
| Nav links | Hover | color: muted → primary |
| CTA buttons | Hover | box-shadow glow increase |
| CTA buttons | Active (mousedown) | scale(0.95) |
| Trust bar logos | Hover (group) | grayscale(0) transition |
| Icon containers | Hover (group) | bg opacity increase |

## Accessibility of Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
All animations respect reduced-motion. Fade-in sections should start visible when reduced-motion is preferred.
