# Design System — FormAnchor Website Showcase
> Extracted from Stitch-generated screens + reference images (CustomerShip/TrackForce)

## Typography

| Level | Font | Weight | Size (px) | Line-height | Letter-spacing |
|-------|------|--------|-----------|-------------|----------------|
| Display (h1) | Public Sans / Outfit | 700-800 | 72 (desktop), 48 (mobile) | 1.1 | -0.02em |
| Heading (h2) | Public Sans / Outfit | 700 | 48 (desktop), 32 (mobile) | 1.15 | -0.02em |
| Subheading (h3) | Public Sans / Outfit | 600-700 | 28-32 | 1.25 | -0.01em |
| Body | Inter | 400 | 16 | 1.6 | 0 |
| Body Large | Inter | 300-400 | 18-20 | 1.65 | 0 |
| Body Small | Inter | 400 | 14 | 1.6 | 0 |
| Caption | Inter | 500-600 | 12 | 1.4 | 0.05em |
| Label/Badge | Inter | 600-700 | 12-14 | 1.4 | 0.04em |
| Nav Link | Inter | 500-600 | 14-16 | 1 | 0 |

Fallback stacks: `'Public Sans', 'Outfit', sans-serif` / `'Inter', sans-serif`

## Color Tokens

### Dark Mode
| Token | Value | Usage |
|-------|-------|-------|
| --bg | #0f1115 | Page background |
| --surface | #181c24 | Card backgrounds |
| --surface-alt | #13161c | Embedded mockup backgrounds |
| --surface-hover | #222733 | Hovered card surfaces |
| --primary | #5b8cff | Primary actions, active nav, links |
| --primary-hover | #4776e6 | Hovered primary elements |
| --accent | #7c3aed | Violet secondary, gradients |
| --accent-hover | #6d28d9 | Hovered accent elements |
| --text | #f0f0f5 | Primary text (near-white) |
| --text-muted | #8b8fa3 | Subtitles, descriptions, nav inactive |
| --success | #10b981 / emerald-500 | Success states, live badge dots |
| --error | #ef4444 / red-500 | Error/warning states |
| --border-glass | rgba(255,255,255,0.06) | Glass card borders |
| --glass-bg | rgba(24,28,36,0.6) | Glass card fill |
| --gradient-primary | linear-gradient(135deg, #5b8cff, #7c3aed) | CTA buttons, logo bg |
| --gradient-text | linear-gradient(to right, #f0f0f5, #5b8cff) | Hero heading gradient |
| --glow-primary | rgba(91,140,255,0.15) | Hover glow shadows |
| --glow-accent | rgba(124,58,237,0.1) | Accent card glow |

### Light Mode
| Token | Value | Usage |
|-------|-------|-------|
| --bg | #ffffff | Page background |
| --surface | #f8f9fb | Card backgrounds |
| --surface-hover | #eef0f4 | Hovered cards |
| --primary | #4338ca | Primary actions (deep indigo) |
| --primary-hover | #3730a3 | Hovered primary |
| --accent | #7c3aed | Violet secondary |
| --text | #111827 | Primary text (near-black) |
| --text-muted | #6b7280 | Subtitles, descriptions |
| --success | #16a34a | Success states |
| --error | #dc2626 | Error states |
| --border-glass | rgba(0,0,0,0.08) | Card borders |
| --glass-bg | rgba(255,255,255,0.8) | Card fill |

## Spacing Rhythm
Measured from Stitch output:
- 4px, 6px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px

Key rhythms:
- Section vertical padding: 80-128px
- Section header → content gap: 64px
- Card internal padding: 32px
- Grid gap: 32px
- Icon → text spacing: 24px
- Heading → subtitle: 16px
- CTA button padding: 14px × 32px

## Radius
| Token | Value | Usage |
|-------|-------|-------|
| --radius-sm | 8px (0.5rem) | Small buttons, badges, inputs |
| --radius-md | 12px (0.75rem) | Feature cards, icon containers |
| --radius-lg | 16px (1rem) | Large cards, modals |
| --radius-xl | 24px (1.5rem) | Hero mockup, collaboration panels |
| --radius-full | 9999px | Pill buttons, badges, avatar circles |

## Shadows
| Level | Value | Usage |
|-------|-------|-------|
| Glass | none (border-only) | Default glass cards |
| Hover-lift | 0 10px 25px -5px rgba(91,140,255,0.15) | Feature card hover |
| Nav | box-shadow: xl (Tailwind equivalent) | Sticky nav bar |
| Showcase | 0 20px 50px rgba(0,0,0,0.5) | Product mockup container |
| CTA glow | 0 0 20-25px rgba(91,140,255,0.4-0.5) | Primary button hover |
| Accent glow | 0 0 30px rgba(124,58,237,0.1) | Accent-colored cards |
| Logo glow | 0 0 15px rgba(91,140,255,0.4) | Logo icon |

## Icon System
Material Symbols Outlined (Google Fonts), with `font-variation-settings: 'FILL' 1` for filled variants.
Icons: flight_takeoff (logo), bolt, folder_shared, verified_user, check_circle, group, notifications_active, done_all, error, description, table, menu, arrow_forward, play_circle
