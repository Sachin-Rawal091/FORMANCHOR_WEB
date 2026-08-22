# FormAnchor

**Record a form once. Fill hundreds, automatically.**

FormAnchor is a Chrome extension that captures a form-filling workflow a single time, then replays it precisely across every row of an Excel spreadsheet — built for the kind of high-volume, multi-page forms found on government and banking portals, where getting every field right, every time, actually matters.

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Coming%20Soon-lightgrey?logo=googlechrome&logoColor=white)](#)
[![Status](https://img.shields.io/badge/status-active%20development-blue)](#)
[![License](https://img.shields.io/badge/license-proprietary-lightgrey)](#license)

---

## Table of Contents

- [Why FormAnchor](#why-formanchor)
- [Features](#features)
- [How It Works](#how-it-works)
- [Pricing](#pricing)
- [Get FormAnchor](#get-formanchor)
- [Source Code](#source-code)
- [Support](#support)
- [License](#license)

---

## Why FormAnchor

Filling the same multi-page form dozens or hundreds of times — one applicant, one loan record, one claim at a time — is slow, repetitive, and one typo away from a rejected submission. FormAnchor turns that workflow into: record it once, point it at a spreadsheet, and let it run.

It's built specifically for the forms that break naive automation tools — multi-step "Save & Continue" flows, custom date pickers, dynamic dropdowns, and pages that don't always load at the same speed twice.

## Features

- **Record once, replay many** — capture a form-filling sequence a single time; every subsequent row in your spreadsheet reuses it automatically.
- **Resilient element detection** — adapts when a page's layout shifts slightly between runs, instead of breaking on the first minor change.
- **Multi-page & "Save & Continue" support** — built for real government and banking workflows, not just single-page contact forms.
- **Smart waiting** — adjusts to slow-loading and JavaScript-heavy pages rather than relying on fixed delays.
- **Automatic retry & error recovery** — transient failures are retried with backoff before a row is ever marked failed.
- **CAPTCHA-aware** — pauses cleanly when a CAPTCHA appears, notifies you, and resumes the run once it's solved.
- **Broad date-picker support** — works out of the box with the calendar widget libraries commonly used on modern portals.
- **Skip Row control** — skip a problematic row mid-run without stopping or restarting the entire batch.
- **Detailed run history** — every row's outcome logged and exportable as CSV or JSON for your own records.
- **Pay-as-you-go, no subscription** — start free, top up with one-time credit packs exactly when you need them.

## How It Works

1. **Record** — Open the target form and walk through it once inside FormAnchor's recorder.
2. **Map** — Upload your Excel sheet and match its columns to the fields you just recorded.
3. **Run** — Start the batch. FormAnchor fills, submits, and moves to the next row automatically.
4. **Review** — Check the run log for a row-by-row breakdown of what succeeded, what didn't, and why.

## Pricing

FormAnchor uses simple, one-time credit packs — no recurring subscription, and unused rows never expire.

| Plan | Price | Rows |
|---|---|---|
| **Free** | ₹0 | 100 rows |
| **FormAnchor Go** | ₹250 | 700 rows |
| **FormAnchor Pro** | ₹500 | 1,500 rows |

## Get FormAnchor

- 🛍️ **Chrome Web Store:** *coming soon*
- 🌐 **Website:** *https://formanchor-web-three.vercel.app*

## Source Code

FormAnchor's source is closed while the product is under active development. This repository exists to showcase the product itself — what it does and how it's used — rather than the implementation.

If you're evaluating FormAnchor as an engineer and want to talk through the technical side, reach out directly — see [Support](#support) below.

## Support

Questions, feedback, or issues with FormAnchor — get in touch via the contact form on the [FormAnchor website](#) or open an issue in this repository.

## License

© 2026 Sachin Rawal. All rights reserved. FormAnchor's source code is proprietary and is not licensed for reuse, redistribution, or modification.

---

<p align="center"><sub>Built for people who fill out a lot of forms.</sub></p>
