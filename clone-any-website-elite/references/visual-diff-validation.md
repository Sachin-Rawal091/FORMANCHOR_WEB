# Visual Diff & Verification Guide

Full reference for **Step 6**: auditing rendering parity using manual inspection plus the automated comparison script.

---

## 1. Manual Verification Checklist

Do this before running the automated script — it catches things pixel-diffing alone won't flag (e.g. two visually-similar shades that read as "close enough" numerically but are obviously wrong side-by-side):

- **Typography parity** — font anti-aliasing, text-wrapping boundaries, line-height proportions, letter-spacing across matching text containers.
- **Alignment metrics** — margins, paddings, column grids, flex justification, and alignment on corresponding elements in both.
- **Interactive state parity** — force `:hover`, `:active`, `:focus` in the DevTools Style pane and compare color transitions and movement.

---

## 2. DevTools Freeze-State Techniques

Useful for inspecting tooltips, dropdowns, or mid-animation states that normally pass by too fast to examine:

1. **Pause script execution** — `F8` (or the Pause icon in the `Sources` tab) halts all JS timelines instantly.
2. **Debugger timeout** — run in the console, then hover/trigger your target within the window before it fires:
   ```javascript
   setTimeout(() => { debugger; }, 3000);
   ```
3. **DOM attribute breakpoints** — right-click a parent in the `Elements` tree → `Break on` → `subtree modifications` or `attribute modifications` to freeze states triggered by dynamic script changes.

---

## 3. Automated Visual Diff Tool

`scripts/visual_diff.py` captures matching-viewport screenshots of the original and the clone and generates a similarity score plus a highlighted diff image.

### 3.1 Setup

```bash
pip install playwright pillow numpy
playwright install chromium
```

### 3.2 Running it

```bash
python scripts/visual_diff.py --url1 "https://original-target.com" --url2 "http://localhost:5173" --output-dir "./visual-diff-results"
```

### 3.3 Flags

- `--url1` — the original/target URL.
- `--url2` — the clone URL (usually your local dev server).
- `--output-dir` — where screenshots and diff images are saved.
- `--viewports` — comma-separated `Name=WidthxHeight` specs (default: `desktop=1920x1080,tablet=768x1024,mobile=375x812`).
- `--threshold` — per-channel pixel color difference threshold, 0–255 (default `30`; lower is stricter).
- `--wait` — milliseconds to wait after page load before capturing, to let animations/layout settle (default `1500`).

### 3.4 Reading the output

The script reports a similarity percentage and differing-pixel count per viewport, and saves a `_diff.png` per viewport with mismatched regions highlighted. Fix the highest-impact deviation first — a large contiguous diff region usually means layout drift; scattered small diffs usually mean color or font-rendering differences that may not be worth chasing to 100%.

---

## 4. Minimum Validation Bar

- Desktop and mobile viewports both pass visual diff at an acceptable similarity threshold
- Loading, error, empty, reduced-motion, and muted states all checked
- Hover, touch, keyboard, mouse, and drag inputs all exercised
- Zero console errors
- Zero failed network requests
- Zero runtime requests still hitting the original's host
- Lint, typecheck, tests, and a production build all pass