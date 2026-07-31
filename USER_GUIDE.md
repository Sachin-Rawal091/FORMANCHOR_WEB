# FormAnchor — User Guide (v1.0.0)

FormAnchor is a Chrome extension that automates repetitive form filling on government and banking portals. Record a form once, feed it an Excel sheet, and it fills hundreds of forms for you — including multi-page "Save & Continue" workflows.

> **Not yet on the Chrome Web Store.** This release is distributed manually via GitHub. You'll install it in Developer Mode — takes about a minute.

---

## Requirements

- Google Chrome (or any Chromium-based browser: Edge, Brave)
- An Excel file (`.xlsx`) with one row per form you want to submit
- The `formanchor-release.zip` file from the [GitHub Releases page](https://github.com/Sachin-Rawal091/FORMANCHOR/releases)

---

## 1. Install FormAnchor

1. Download `formanchor-release.zip` from the Releases page.
2. Unzip it to a folder you won't move or delete later (Chrome loads the extension directly from this folder — don't delete it after install).
3. Open Chrome and go to `chrome://extensions`.
4. Turn on **Developer mode** (top-right toggle).
5. Click **Load unpacked** and select the unzipped folder.
6. FormAnchor now appears in your extensions list. Click the puzzle-piece icon in Chrome's toolbar and **pin** FormAnchor so it's always visible.

---

## 2. Open the Dashboard

Click the FormAnchor icon in your toolbar. This opens the FormAnchor dashboard in a new tab — this is where you record forms, upload data, and run batches.

---

## 3. Record a Form (once)

1. In the dashboard, navigate to the target website's form — the first page if it's multi-step.
2. Click **Start Recording**.
3. Fill out the form exactly as you normally would: type into fields, pick dates, select dropdowns, check boxes. Do this for **one complete record**, including clicking "Save & Continue" if the form spans multiple pages, all the way through to the final submit.
4. Click **Stop Recording**.

FormAnchor captures each field you touched along with a resilient, multi-layered selector for it — so replay still works even if the page's HTML shifts slightly between forms.

**Tip:** Recording is a one-time setup per form type. You don't need to re-record unless the target site's form structure changes significantly.

---

## 4. Prepare Your Excel Data

- One row = one form submission.
- Column headers should describe the field (e.g. `Applicant Name`, `Aadhaar Number`, `Loan Amount`, `Date of Birth`).
- Keep dates and numbers in a consistent, unambiguous format within a column.
- Save as `.xlsx`.

In the dashboard, go to **Import Data** and upload your file.

---

## 5. Map Fields

FormAnchor will try to auto-match your Excel columns to the fields it recorded. Review the mapping screen and manually correct any column that didn't match correctly.

Special field types are handled automatically once mapped:
- **Date pickers** — supported across common libraries (MUI, Ant Design, react-multi-date-picker, and plain HTML date inputs)
- **Dropdowns / selects** — matched by visible label or value
- **Checkboxes / radios** — driven by truthy values in your spreadsheet (`Yes`/`1`/`TRUE`, etc.)

---

## 6. Run the Batch

1. Select which rows to run (all, a range, or just previously failed rows).
2. Click **Start Run**.
3. FormAnchor takes over the browser tab and works through each row automatically:
   - Waits intelligently for pages to load and for dynamic content (AJAX, React re-renders) to settle — no fixed delays, so it adapts to slow or fast connections.
   - Advances through multi-page "Save & Continue" flows the same way you recorded them.
   - Retries a field or step automatically if it doesn't land correctly the first time.

**Don't close the tab or switch away from it while a run is in progress** — the extension needs the page active to interact with it reliably.

---

## 7. Handling CAPTCHA or Unexpected Screens

If a run hits a CAPTCHA or a screen it doesn't recognize, FormAnchor pauses that row and lets you resolve it manually in the tab. Once you're past it, resume the run and it continues from that row.

---

## 8. Monitor Progress & Review Results

The dashboard's **Activity Log** shows live, per-row status as the batch runs:
- ✅ Success
- ❌ Failed (with the reason, where detectable)
- ⏭️ Skipped
- 🔁 Retrying

After the run finishes, review any failed rows, fix the underlying data in your Excel file if needed, and re-run just those rows rather than the whole batch.

---

## Tips for Reliable Runs

- **Test small first.** Run 2–3 rows before committing to a full batch of hundreds, especially the first time you use a new form.
- **Keep the target tab in focus** while a run is active for the most consistent timing.
- **Re-record if the site changes.** If a portal redesigns its form, selectors may need to be re-captured.

---

## Known Limitations (v1.0.0)

- Manual installation only — not yet available on the Chrome Web Store.
- Best results on forms similar to what's been tested; unusual or heavily custom widgets may need a fallback selector or manual step.

---

## Getting Help

Found a bug or have a feature request? Open an issue on the [GitHub Issues page](https://github.com/Sachin-Rawal091/FORMANCHOR/issues).
