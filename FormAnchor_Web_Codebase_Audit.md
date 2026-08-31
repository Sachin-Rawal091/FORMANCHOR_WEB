# FormAnchor Web — Codebase Audit Report

**Project audited:** `Formpilot_Template` ("Formpilt_web" showcase site)
**Path:** `D:\SACHIN RAWAL FILES\Projects\Formpilot_ex_temp\Formpilot_Template`
**Stack:** React 18 + TypeScript + Vite (frontend) · FastAPI + MongoDB/Motor + Resend (backend)
**Scope:** Dead code · Security · Code quality & other risks
**Method:** Full read of `frontend/src` (App, components, hooks, pages, utils), `backend/*.py`, config files (`package.json`, `requirements.txt`, `vite.config.ts`, `tsconfig.json`, `docker-compose.yml`, `Dockerfile`, `.gitignore`, `vercel.json`, `index.html`, `sitemap.xml`, `robots.txt`), plus git history inspection (`git log`, `git show`) and dependency-lockfile verification.

> ⚠️ **This audit found a live, exposed credential.** See Finding S-1 / S-2 before anything else.

---

## 1. Dead Code

### D-1 — Unused dependency `@emailjs/browser`
- **Severity:** Low
- **Location:** `frontend/package.json:11`
- **Issue:** `@emailjs/browser ^4.4.1` is listed as a dependency but is never imported anywhere in `src/` (confirmed via full-source grep). The Contact form actually submits via `fetch()` to the FastAPI backend (`utils/api.ts`), not EmailJS.
- **Risk:** Bloats install size and the dependency tree/attack surface for no functional benefit; misleads future contributors into thinking EmailJS is the mail path.
- **Fix:** Run `npm uninstall @emailjs/browser` in `frontend/` and remove it from `package.json`/`package-lock.json`.

### D-2 — 8.7 MB of orphaned media assets
- **Severity:** Low
- **Location:** `frontend/src/assets/` — `FORMANCHOR_Demo_With_Captions.mp4` (6.34 MB), `demo.gif` (1.65 MB), `sachin_avatar.png` (754 KB), `hero.png` (12.75 KB), `vite.svg`, `typescript.svg`
- **Issue:** Of the 7 files in `src/assets/`, only `autofill_demo.mp4` is imported (by `pages/Home.tsx:5`). The other six are never referenced anywhere in `src/`. A separate, correctly-used `demo.gif`/`demo.mp4` already exists in `public/media/` for the OG/social meta tags — the one in `src/assets/` is a stray duplicate.
- **Risk:** Unnecessary repo/clone size (adds up fast in git history with binary assets); confuses future contributors about which "demo" asset is canonical.
- **Fix:** Delete the six unused files from `src/assets/`, or move any still-needed ones (e.g., `sachin_avatar.png`, if planned for an About/Team section) into a clearly-named `unused/` or `future/` folder with a comment, and delete the rest.

### D-3 — Stale commented-out code blocks
- **Severity:** Low
- **Location:** `frontend/index.html:29–37` (Google Analytics placeholder); `docker-compose.yml:15–22` (commented-out local `db` service + `volumes`)
- **Issue:** Both blocks are fully commented-out and not "reserved for near-term use" — the GA snippet has a placeholder `G-XXXXXXXXXX` ID that was never filled in, and the Mongo service block is dead now that the project uses MongoDB Atlas.
- **Risk:** Low direct risk, but stale commented code accumulates and obscures intent for future maintainers (and for the GA snippet specifically, a placeholder ID left in "temporarily" is an easy accidental-enable mistake).
- **Fix:** Delete both blocks. If analytics are genuinely planned, track it as a ticket instead of dead HTML.

### D-4 — Unrelated tooling folder committed into the repo
- **Severity:** Low
- **Location:** `clone-any-website-elite/` (repo root; tracked in git — confirmed via `git ls-files`)
- **Issue:** This directory (`SKILL.md`, `scripts/`, `references/`) is a website-cloning tool/skill unrelated to FormAnchor's frontend or backend, and it's fully version-controlled alongside the actual product code.
- **Risk:** Repo hygiene — inflates clone size, confuses scope for anyone auditing or onboarding to "what is this repo," and unrelated third-party script content sitting in a product repo without clear provenance is worth a second look before it stays long-term.
- **Fix:** If it was an accidental commit, `git rm -r clone-any-website-elite` and add it to `.gitignore`. If it's intentionally kept as a personal tool, move it to a separate personal-tools repo.

### D-5 — Duplicate `vercel.json` (root + frontend)
- **Severity:** Low
- **Location:** `vercel.json:1–6` and `frontend/vercel.json:1–6`
- **Issue:** Byte-for-byte identical rewrite rules exist in two places.
- **Risk:** Config drift — if the API host ever changes, it's easy to update one file and forget the other, leaving one of the two configs pointing at a dead backend URL.
- **Fix:** Keep the one that matches your actual Vercel project root (likely `frontend/vercel.json` if `frontend/` is the deployed root) and delete the other.

### D-6 — Duplicated FAQ content across two pages
- **Severity:** Low
- **Location:** `pages/Home.tsx:200–206` (inline 4-item FAQ array) vs. `pages/Faq.tsx:5–35` (full `FAQ_DATA`, 4 categories)
- **Issue:** The Home page mini-FAQ is a separate, hand-maintained duplicate of a subset of the real FAQ content rather than pulling from `FAQ_DATA`.
- **Risk:** Content drift — an answer edited on the full FAQ page (e.g., refund policy, row-credit rules) won't propagate to the Home preview, so the two pages can silently disagree.
- **Fix:** Export `FAQ_DATA` from `Faq.tsx` (or a shared `data/faq.ts`) and have `Home.tsx` pull its 4 preview items from the same source.

### D-7 — Non-functional search input (functionally dead state)
- **Severity:** Low
- **Location:** `pages/Docs.tsx:16, 66–79`
- **Issue:** `searchQuery` state is wired to an `<input>` with `onChange`, but it's never used to filter the tab list or tab content — typing into the "Search guides..." box does nothing.
- **Risk:** Not a crash risk, but it's a shipped feature that visibly doesn't work, which undermines user trust once someone tries it.
- **Fix:** Either implement simple filtering (match `searchQuery` against `TABS` labels/content and auto-switch tabs, or highlight matches), or remove the search input until it's implemented.

---

## 2. Security

### S-1 — CRITICAL: Live database & email-provider credentials in plaintext `.env`
- **Severity:** Critical
- **Location:** `backend/.env:2` (MongoDB Atlas URI with embedded username/password) and `backend/.env:6` (Resend live API key)
- **Issue:** The backend's `.env` file contains a full MongoDB Atlas connection string (with the database username and password embedded in the URI) and a live Resend API key, both in plaintext on disk.
- **Risk:** Anyone with read access to this file gets full read/write access to the production `formanchor_db` MongoDB cluster (contact submissions, subscriber emails) and can send email as your verified Resend account (phishing/spam using your sender reputation, or simply exhausting your quota).
- **Fix:** Treat both credentials as already compromised (see S-2) — rotate the MongoDB Atlas database user password and regenerate the Resend API key **now**, update `backend/.env` locally and the equivalent environment variables in your Render/hosting dashboard, and confirm the old values no longer authenticate.

### S-2 — CRITICAL: The exact leaked credential was committed to git history and pushed to `origin`
- **Severity:** Critical
- **Location:** `docker-compose.yml` at commit `61f28ea` ("initial commit of FormPilot Showcase website and API") — later removed at commit `08c0f3f` ("security: remove hardcoded database credentials from docker-compose"), but never purged from history
- **Issue:** `git show 61f28ea:docker-compose.yml` reveals the same MongoDB Atlas username/password from Finding S-1 hardcoded directly into `docker-compose.yml`. `git log` confirms this is only 2 commits total on that file, and `git status -sb` shows the local `main` branch is fully in sync with `origin/main` (remote: `github.com/Sachin-Rawal091/FORMANCHOR_WEB.git`) — meaning the commit containing the secret was pushed to GitHub. Removing it in a later commit does **not** remove it from history; it remains retrievable by anyone who clones the repo or browses its commit history.
- **Risk:** If the GitHub repo is or ever was public (or if anyone forked/cloned it before the fix commit), this credential is permanently exposed regardless of the current `.gitignore` rules. This is the single most urgent item in this audit.
- **Fix:**
  1. Rotate the credential (covered in S-1) — do this first, independent of history cleanup.
  2. Confirm the repo's current visibility on GitHub; if it's public, treat the exposure window as "since the initial push" for any incident notes.
  3. Purge the secret from history with `git filter-repo --path docker-compose.yml --invert-paths` (for the specific blob) or, more simply, `git filter-repo --replace-text` with the leaked string, then force-push (`git push --force`) and have any other clones re-fetch fresh.
  4. Going forward, never place real connection strings directly in `docker-compose.yml` — only reference `${VAR}` placeholders (which the current file already does correctly for `RESEND_API_KEY`/`NOTIFICATION_EMAIL`; only `MONGO_URI` was the offender, and it's already fixed in the working tree).

### S-3 — HIGH: Missing `.dockerignore` will re-bake secrets into future local images
- **Severity:** High
- **Location:** `backend/Dockerfile:15` (`COPY . .`); no `backend/.dockerignore` exists
- **Issue:** The Dockerfile copies the entire build context (`./backend`) into the image. Because there's no `.dockerignore`, a local `docker-compose up --build` (run from a machine where `backend/.env` physically exists, per D-nothing/S-1) will copy `.env` — including the live credentials — directly into the image's filesystem layers, along with the bulky `venv/` and `__pycache__/` directories.
- **Risk:** Any image built this way and later pushed to a registry (Docker Hub, a CI cache, etc.) carries the plaintext secret baked into a layer, independent of git entirely, and it's easy to do accidentally while testing.
- **Fix:** Add `backend/.dockerignore` containing at minimum:
  ```
  .env
  .env.*
  venv/
  __pycache__/
  *.pyc
  .git
  ```

### S-4 — MEDIUM: Client-supplied `X-Forwarded-For` trusted without validation
- **Severity:** Medium
- **Location:** `backend/main.py:19–24` (`get_client_ip`)
- **Issue:** `get_client_ip()` reads the `X-Forwarded-For` header directly from the incoming request and uses the first comma-separated value with no check that the request actually came through a trusted reverse proxy that sets this header itself.
- **Risk:** Any client can spoof this header (e.g., `X-Forwarded-For: 1.2.3.4`), so the `ip_address` field stored in MongoDB for every contact submission and subscriber (`models.py` `ContactSubmissionDB.ip_address` / `SubscriberDB.ip_address`) can be forged, undermining any future abuse-tracking or spam-investigation use of that field. (Note: this does not affect rate-limiting itself, which uses `slowapi`'s own `get_remote_address`.)
- **Fix:** Only trust `X-Forwarded-For` when the request's direct peer is a known/trusted proxy IP (e.g., Render's or your reverse proxy's IP range); otherwise fall back to `request.client.host`. If you're not behind a proxy that sets this header, simplest fix is to drop the `X-Forwarded-For` branch entirely.

### S-5 — MEDIUM: Backend dependencies are unpinned (no lockfile)
- **Severity:** Medium
- **Location:** `backend/requirements.txt:1–8`
- **Issue:** Every dependency uses `>=` with no upper bound and there is no `requirements-lock.txt`/`pip freeze` output committed anywhere.
- **Risk:** `pip install -r requirements.txt` can silently resolve to a newer major version of `fastapi`, `motor`, `pydantic`, `slowapi`, or `resend` between deploys, which can introduce breaking changes or an as-yet-unknown vulnerability with no changelog review. This makes builds non-reproducible.
- **Fix:** Generate a locked file (`pip freeze > requirements-lock.txt` from a known-good venv, or migrate to `pip-tools`/`poetry`) and build/deploy from the locked file; bump versions deliberately.

### S-6 — LOW / Informational: CORS origin allowlist relies entirely on an env var with no production verification visible in-repo
- **Severity:** Low
- **Location:** `backend/main.py:47–48`
- **Issue:** `ALLOWED_ORIGINS` defaults to three localhost origins if unset. This is a safe *default* (fails closed rather than opening to `*`), but there's nothing in the repo (no `.env.example`, no deployment doc) confirming what value is actually set in the Render/production environment.
- **Risk:** If unset in production, the deployed frontend's real origin would be silently rejected by CORS and the contact form would appear broken (functional risk more than a security hole, but worth flagging since a rushed fix for that is sometimes "just allow `*`," which combined with `allow_credentials=True` is a real misconfiguration to avoid).
- **Fix:** Add a `backend/.env.example` documenting `ALLOWED_ORIGINS`, and confirm the production value is set to the exact deployed frontend origin(s) — never `*` alongside `allow_credentials=True`.

### Positive security notes (no action needed)
- No `eval`, `innerHTML`, or `dangerouslySetInnerHTML` anywhere in `frontend/src` — confirmed by full-source search.
- All contact/subscribe fields are validated server-side via Pydantic (`EmailStr`, `min_length`/`max_length` bounds) in `models.py`.
- `email_service.py:38–41` correctly HTML-escapes all user-controlled fields (`name`, `email`, `subject`, `message`) before interpolating them into the outgoing notification email's HTML body — good XSS/HTML-injection hygiene on the one code path that builds HTML from user input.
- POST endpoints are rate-limited (5/min) via `slowapi`, and the honeypot field (`Contact.tsx`) is implemented correctly (hidden via CSS + `aria-hidden`, and `tabIndex={-1}` so it isn't a keyboard trap).
- Error responses return generic messages to the client while full exceptions are only logged server-side (`main.py:118–122`, `160–163`) — no stack traces or internal details leak to the frontend.

---

## 3. Code Quality / Other Risks

### Q-1 — Sitemap and robots.txt reference dead routes and the wrong domain
- **Severity:** Medium
- **Location:** `frontend/public/sitemap.xml:9–14, 42–55`; `frontend/public/robots.txt:4`
- **Issue:** `sitemap.xml` lists `#/about`, `#/security`, and `#/license` — none of these routes exist in the current router (`App.tsx:14–15` only defines `home | pricing | docs | install | faq | changelog | privacy | terms | contact | 404`). It's also missing the routes that *do* exist now (`#/pricing`, `#/docs`, `#/changelog`, `#/terms`). Both `sitemap.xml` and `robots.txt` also point at `https://sachin-rawal091.github.io/FormAnchor/`, which doesn't match the deployment implied by `vercel.json`'s API rewrite to `formpilot-web.onrender.com` or `utils/api.ts`'s production fallback — suggesting the live site is not actually hosted on GitHub Pages at that path.
- **Risk:** Search engines crawling the sitemap will hit 404s (routes that render `NotFound`) and miss real pages; if the GitHub Pages URL isn't the canonical live domain, this is actively harming SEO and social-share previews (`index.html`'s `og:url`/`og:image` use the same stale domain).
- **Fix:** Regenerate `sitemap.xml` from the actual `PageRoute` list in `App.tsx`, and update it, `robots.txt`, and the `og:url`/`og:image`/`twitter:*` meta tags in `index.html` to the real canonical production domain.

### Q-2 — Site-wide accessibility gap: icons are readable as raw text to screen readers
- **Severity:** Medium
- **Location:** `frontend/src/components/Icon.tsx:15–24`
- **Issue:** `Icon` renders `<span className="material-symbols-outlined">{name}</span>` with no `aria-hidden="true"`. Material Symbols work by rendering a text ligature (e.g., the literal string `"check_circle"`) as a glyph via font substitution — sighted users see an icon, but screen readers announce the literal string `"check circle"`, `"arrow forward"`, `"menu"`, etc. This component is used dozens of times across every page.
- **Risk:** Screen-reader users hear a stream of confusing, non-visual icon names throughout the site (feature cards, pricing checkmarks, nav, buttons), which is a real WCAG 4.1.2/1.1.1-adjacent usability failure, not just a cosmetic one.
- **Fix:** Add `aria-hidden="true"` by default in `Icon.tsx`, since nearly every usage is decorative/adjacent to visible text:
  ```tsx
  <span aria-hidden="true" className={`material-symbols-outlined ${className}`} ...>
  ```
  For the handful of icon-only interactive elements (e.g., the theme toggle button, mobile menu button in `Header.tsx`), the surrounding `<button>` already carries `aria-label`, so this is safe everywhere it's currently used.

### Q-3 — Demo video has no captions/transcript
- **Severity:** Low
- **Location:** `frontend/src/pages/Home.tsx:79–84`
- **Issue:** The `<video autoPlay loop muted playsInline>` demoing FormAnchor's execution engine has no `<track kind="captions">` and no adjacent text description of what it shows.
- **Risk:** Users relying on captions/screen readers get no equivalent information for a video that's otherwise explaining core product behavior.
- **Fix:** Add a short text summary near the video (partially already covered by the surrounding "3-Step Pipeline" section) and/or a caption track if narration is ever added.

### Q-4 — No automated test suite in this repository
- **Severity:** Low
- **Location:** `frontend/package.json:6–9` (no `test` script); no `*.test.*`/`*.spec.*` files anywhere in `frontend/src` or `backend/`
- **Issue:** Neither the frontend nor the backend of this specific repo has any test tooling configured (no Vitest/Jest config, no pytest files).
- **Risk:** Regressions in form validation, routing, or the contact/subscribe API can only be caught manually. Low urgency for a marketing site, but the contact/subscribe endpoints do touch a real database and email provider, so a couple of smoke tests would be cheap insurance.
- **Fix:** At minimum, add a `pytest` smoke test for `/api/contact` and `/api/subscribe` (happy path + honeypot path) and a Vitest test for `isValidEmail`/`getApiUrl` in `utils/api.ts`.

### Q-5 — No linting configuration
- **Severity:** Low
- **Location:** `frontend/` root (no `.eslintrc*`, `eslint.config.*`, or `.prettierrc*` present)
- **Issue:** TypeScript's `strict`/`noUnusedLocals`/`noUnusedParameters` in `tsconfig.json:20–22` catch some dead-code classes at build time, but there's no ESLint (React hooks rules, import-order, no-console, etc.) or Prettier config enforcing consistency.
- **Risk:** Style and correctness drift over time with no automated gate; e.g., nothing would currently flag the dead `searchQuery` state in D-7 or a missing `useEffect` dependency.
- **Fix:** Add `eslint` + `eslint-plugin-react-hooks` + `@typescript-eslint` with a `package.json` `"lint"` script, and optionally Prettier for formatting.

### Q-6 — Byte-order-mark (BOM) in `Privacy.tsx`
- **Severity:** Low
- **Location:** `frontend/src/pages/Privacy.tsx:1` (file begins with `\ufeff`)
- **Issue:** This is the only source file in the project that starts with a UTF-8 BOM; every other file is plain UTF-8.
- **Risk:** Harmless for Vite/TypeScript's current toolchain, but it's an inconsistency that can trip up stricter linters, some diff tools, or shell-based text processing (`grep`/`cat` showing a stray character) down the line.
- **Fix:** Re-save `Privacy.tsx` as UTF-8 without BOM (most editors have a "Save with encoding" option), or run it through `sed -i '1s/^\xEF\xBB\xBF//' Privacy.tsx`.

### Q-7 — Support email hardcoded in 6+ places
- **Severity:** Low
- **Location:** `Contact.tsx:33`, `Docs.tsx:168`, `Faq.tsx:169`, `Pricing.tsx:~257`, `Privacy.tsx:~180`, `Terms.tsx:~66`
- **Issue:** `sachinrawal473@gmail.com` is inlined as a literal string in six different page components instead of a single shared constant.
- **Risk:** Low, but if this address ever changes, it requires a manual find-and-replace across the codebase instead of a one-line edit.
- **Fix:** Add a `SUPPORT_EMAIL` constant to `utils/api.ts` (or a new `constants.ts`) and import it everywhere it's used.

### Q-8 — Dockerfile installs `build-essential` unconditionally
- **Severity:** Low
- **Location:** `backend/Dockerfile:6–8`
- **Issue:** The comment says "if any are needed in the future," but `build-essential` (a large compiler toolchain) is installed on every build regardless of whether any current dependency (`fastapi`, `motor`, `resend`, `slowapi`, `pydantic[email]`) actually needs compilation — most ship pre-built wheels.
- **Risk:** Larger image size and longer build times than necessary; a minor supply-chain surface increase (more installed tooling than the running app needs).
- **Fix:** Remove the `build-essential` install unless a specific dependency is confirmed to need it (test the build without it first).

---

## Top 5 — Fix Now

Ordered by risk × effort (highest-risk, most time-sensitive items first; all five are individually low-effort):

1. **Rotate the MongoDB Atlas password and Resend API key** (S-1/S-2). This is the only finding with real, immediate, external blast radius — do this before anything else on this list, independent of the git-history cleanup.
2. **Purge the leaked credential from git history and force-push** (S-2). Rotating the credential neutralizes the immediate risk; scrubbing history closes the door for good and stops the same string from resurfacing in future clones/forks.
3. **Add `backend/.dockerignore`** (S-3). One file, five lines, permanently prevents this exact mistake (secrets + `venv/` baked into a Docker image) from happening again on the next local build.
4. **Fix `sitemap.xml`/`robots.txt`/OG meta tags to match the real routes and real domain** (Q-1). Currently actively hurting SEO with 404-linking sitemap entries and a possibly-wrong canonical domain — cheap to fix, meaningful for discoverability.
5. **Add `aria-hidden="true"` to `Icon.tsx`** (Q-2). A single-line change in one shared component instantly fixes an accessibility issue that currently repeats on every page of the site.

---

## Overall Health Assessment

The FormAnchor Web codebase is, structurally, in good shape: it's a clean, modern React 18 + TypeScript + Vite frontend paired with a small, sensibly-validated FastAPI backend, with no XSS vectors, no unsafe DOM APIs, working rate limiting, and correct HTML-escaping on the one path that builds HTML from user input. The problems this audit surfaced are almost entirely operational rather than architectural — the standout issue is a live MongoDB and Resend credential sitting in plaintext that was proven, via git history, to have been committed and pushed to the remote repository before being (incompletely) fixed; that single issue outweighs everything else in this report combined and should be resolved today via rotation, with a history purge to follow. Once that's handled, the remaining findings are minor and cheap: a handful of unused assets and one dead dependency, some stale SEO/sitemap references left over from the FormPilot→FormAnchor rename, a repo-wide accessibility gap in the icon component that's a one-line fix, and light dependency/tooling hygiene (pinning backend requirements, adding lint config, a `.dockerignore`). None of the code-quality items are urgent on their own timeline — the credential exposure is.
