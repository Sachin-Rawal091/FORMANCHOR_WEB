import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'

export default function Privacy() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef} style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Page Hero */}
      <section className="page-hero fade-in-section">
        <h1>
          <span className="gradient-text">Privacy Policy</span>
        </h1>
        <p>Last updated: July 23, 2026. Your privacy and local data control are critically important to us.</p>
      </section>

      {/* Main Content Cards */}
      <section className="section fade-in-section" style={{ marginBottom: 128 }}>
        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>Local-First Commitment</h2>
          <p>
            At FormPilot, we believe your data belongs to you. FormPilot is built to be a fully client-side, local-first browser extension. We do not harvest, collect, or transmit any user data, spreadsheet information, or recorded web flows to any external servers.
          </p>
        </div>

        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>1. Data Collection &amp; Access</h2>
          <p>To perform its automated form-filling duties, FormPilot accesses and handles the following data locally:</p>
          <ul>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Recorded Workflows (Steps):</strong> captures input metadata (element IDs, tags, classes, CSS paths, associated labels, and action types) to replay them.
              </div>
            </li>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Uploaded Spreadsheets:</strong> parses Excel or CSV sheets in-browser to extract cell values and map them to your recorded form steps.
              </div>
            </li>
            <li>
              <Icon name="check_circle" className="icon" />
              <div>
                <strong>Web Form Fields:</strong> interacts with inputs, dropdowns, checkboxes, and buttons on target websites under your direct supervision.
              </div>
            </li>
          </ul>
        </div>

        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>2. Storage Infrastructure</h2>
          <p>All sensitive workflow files and records are stored exclusively inside your local browser environment:</p>
          <ul>
            <li>
              <Icon name="database" className="icon" />
              <div>
                <strong>IndexedDB (Storage at Rest):</strong> Saved flows, parsed Excel row data, and activity logs are saved securely inside your private sandboxed database.
              </div>
            </li>
            <li>
              <Icon name="lock" className="icon" />
              <div>
                <strong>Encryption at Rest:</strong> Sensitive spreadsheet rows and uploaded file blobs are encrypted using AES-GCM 256-bit encryption via the Web Crypto API. The cryptographic key is generated as a non-extractable CryptoKey handle and stored locally in IndexedDB, separate from the encrypted data.
              </div>
            </li>
            <li>
              <Icon name="history" className="icon" />
              <div>
                <strong>chrome.storage.session (Volatile Storage):</strong> Active execution progress, current step indices, and page-retry counts are cleared when the tab is closed.
              </div>
            </li>
            <li>
              <Icon name="cloud_off" className="icon" />
              <div>
                <strong>No Cloud Storage:</strong> FormPilot does not use any cloud servers, databases, or third-party storage providers.
              </div>
            </li>
          </ul>
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'rgb(245, 158, 11)' }}>⚠ Client-Side Security Limits:</strong> Client-side encryption-at-rest relies on local key storage. While this fully secures your data against casual filesystem inspection, it does not protect against an attacker who has already compromised your local operating system user profile.
          </div>
        </div>

        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>3. Zero Third-Party Integrations</h2>
          <p>
            FormPilot contains no external analytics scripts, user behavior tracking, cookies, or telemetry software. Spreadsheet parsing is processed natively in-browser using the local <code>SheetJS</code> library, meaning your data files never touch any external server.
          </p>
        </div>

        {/* NEW: CWS Limited Use Compliance */}
        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>3.5. Chrome Web Store Limited Use Compliance</h2>
          <p>
            FormPilot's use of requested permissions and accessed data complies with the Chrome Web Store{' '}
            <a href="https://developer.chrome.com/docs/webstore/program-policies/limited-use/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              Limited Use
            </a>{' '}
            requirements:
          </p>
          <ul>
            <li>
              <Icon name="block" className="icon" />
              <div>
                <strong>No PII Collection:</strong> FormPilot does not collect, store, or process personally identifiable information beyond what you explicitly provide in your uploaded spreadsheets. All such data remains local.
              </div>
            </li>
            <li>
              <Icon name="block" className="icon" />
              <div>
                <strong>No Sale or Transfer to Third Parties:</strong> FormPilot does not sell, license, or transfer any user data to third parties for any purpose, including advertising, analytics, credit assessment, or data brokerage.
              </div>
            </li>
            <li>
              <Icon name="block" className="icon" />
              <div>
                <strong>No Secondary Use:</strong> All data accessed by FormPilot is used exclusively for its single disclosed purpose — automating web form filling from spreadsheet data. Data is never repurposed for advertising, market research, or any unrelated functionality.
              </div>
            </li>
            <li>
              <Icon name="visibility" className="icon" />
              <div>
                <strong>Web Browsing Activity Disclosure:</strong> FormPilot accesses web browsing activity (DOM element metadata, page URLs, CSS selectors, and element attributes) <strong>only</strong> during user-initiated recording and execution sessions. This data is stored locally in IndexedDB and is never transmitted to any external server.
              </div>
            </li>
            <li>
              <Icon name="visibility" className="icon" />
              <div>
                <strong>Website Content Disclosure:</strong> FormPilot reads and interacts with website content (form field values, button labels, dropdown options) <strong>only</strong> to replay user-recorded fill steps. This interaction is entirely local and user-directed.
              </div>
            </li>
          </ul>
        </div>

        {/* NEW: Permissions Table */}
        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>4. Required Extension Permissions</h2>
          <p>FormPilot requests the following permissions to operate on your behalf:</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginTop: 16 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text-muted)', fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Permission</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--text-muted)', fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['<all_urls>', 'Required to allow FormPilot\'s recorder and executor to interact with form fields on any website you navigate to.'],
                  ['storage', 'Save and load recorded flows, user settings, and execution logs in local IndexedDB.'],
                  ['scripting', 'Inject DOM helper libraries (such as safe React-input setters) into your active tab.'],
                  ['notifications', 'Display desktop notifications when user attention is needed (e.g. CAPTCHA detected).'],
                  ['tabs', 'Locate browser tabs and perform same-tab URL redirection.'],
                  ['downloads', 'Export activity logs as JSON/CSV files directly to your downloads folder.'],
                  ['alarms', 'Run periodic local maintenance (log cleanup, recovering stuck execution locks).'],
                ].map(([perm, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 13, color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>{perm}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NEW: Data Retention & Deletion */}
        <div className="content-card glass-card" style={{ marginBottom: 24 }}>
          <h2>5. Data Retention &amp; Deletion</h2>
          <ul>
            <li>
              <Icon name="schedule" className="icon" />
              <div>
                <strong>Execution Logs:</strong> Retained locally per your configured retention settings. You may adjust retention duration in the extension's Settings screen.
              </div>
            </li>
            <li>
              <Icon name="folder_delete" className="icon" />
              <div>
                <strong>Recorded Workflows &amp; Excel Data:</strong> Stored locally in IndexedDB until you explicitly delete them from the extension's dashboard or use the "Wipe Extension Databases" function in Settings.
              </div>
            </li>
            <li>
              <Icon name="timer" className="icon" />
              <div>
                <strong>Session-Volatile Data:</strong> Active execution progress, step pointers, and mutex locks are stored in <code>chrome.storage.session</code> and are automatically cleared when the browser session ends or execution completes.
              </div>
            </li>
            <li>
              <Icon name="delete_forever" className="icon" />
              <div>
                <strong>Full Data Wipe:</strong> At any time, navigate to Settings → Wipe Extension Databases to permanently delete all stored recordings, Excel data, execution logs, and session state. This action is irreversible.
              </div>
            </li>
          </ul>
        </div>

        <div className="content-card glass-card">
          <h2>6. Contact Information</h2>
          <p>For any questions regarding our privacy practices or local-first architecture, please contact us at:</p>
          <ul>
            <li>
              <Icon name="mail" className="icon" />
              <div>sachinrawal473@gmail.com</div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
