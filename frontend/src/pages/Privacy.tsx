import { useScrollReveal } from '../hooks/useScrollReveal'
import Icon from '../components/Icon'
import { SUPPORT_EMAIL } from '../constants'

export default function Privacy() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      {/* ── Page Hero ── */}
      <section className="hero js-scroll-reveal">
        <div className="hero-pill-tag">
          <span className="pill-badge emerald">
            <Icon name="verified_user" size={14} /> Security & Compliance
          </span>
        </div>
        <h1>
          Privacy Policy & <br />
          <span className="gradient-text">Data Architecture</span>
        </h1>
        <p className="hero-subtitle">
          Last updated: August 2026. Your form data, spreadsheets, and recorded workflows are 100% local — never transmitted.
          A minimal first-party backend handles only account sign-in and usage billing, disclosed in full below.
        </p>
      </section>

      {/* ── Local-First Commitment Card ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 40 }}>
        <div className="glass-card glow-primary" style={{ padding: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div className="pipeline-icon-circle" style={{ width: 44, height: 44, flexShrink: 0 }}>
              <Icon name="shield" size={22} />
            </div>
            <div>
              <h3>Local-First Architecture Guarantee</h3>
              <p style={{ fontSize: '0.88rem' }}>FormAnchor operates completely inside your browser sandbox.</p>
            </div>
          </div>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            We do not collect, transmit, or synchronize your form data, uploaded spreadsheet contents, recorded workflows,
            or filled-in field values to any external server — that data stays on your device, full stop. A small first-party backend
            (Supabase) is used separately for account sign-in (your email) and row-credit billing (a session ID, row count, and
            the hostname of the portal you are automating — never field values or spreadsheet contents). All form execution logic
            runs locally on your machine.
          </p>
        </div>
      </section>

      {/* ── Structured Sections ── */}
      <section className="container js-scroll-reveal" style={{ maxWidth: 860, marginBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Section 1: Local Only */}
          <div className="glass-card">
            <h3>1. What Stays 100% Local on Your Device</h3>
            <p style={{ marginTop: 8, marginBottom: 16 }}>
              To perform automated form filling, FormAnchor accesses and stores the following assets exclusively on your device:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div>
                  <strong>Recorded Workflow Steps:</strong> Element IDs, tags, class names, CSS paths, label text, and action types needed to replay form sequences.
                </div>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div>
                  <strong>Uploaded Spreadsheets:</strong> Excel (<code style={{ color: 'var(--primary)' }}>.xlsx</code>) and CSV files parsed in-memory using SheetJS.
                </div>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div>
                  <strong>Web Form Fields & Values:</strong> Targeted input DOM elements, passwords, and form entries on portal URLs you explicitly choose to automate.
                </div>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="check_circle" size={16} style={{ color: 'var(--accent-emerald)', marginTop: 3 }} />
                <div>
                  <strong>Execution & Activity Logs:</strong> Detailed step logs stored in IndexedDB for troubleshooting. Never sent to analytics servers.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 2: Storage */}
          <div className="glass-card">
            <h3>2. Local Storage & Encryption Architecture</h3>
            <p style={{ marginTop: 8, marginBottom: 16 }}>
              Data persistence relies strictly on browser-native, sandboxed storage mechanisms:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div style={{ padding: 18, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <strong>IndexedDB (At Rest)</strong>
                <p style={{ fontSize: '0.82rem', marginTop: 6, color: 'var(--text-secondary)' }}>
                  Workflows, spreadsheet rows, and logs are encrypted at rest using AES-GCM 256-bit keys via the standard Web Crypto API.
                </p>
              </div>

              <div style={{ padding: 18, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <strong>chrome.storage.local</strong>
                <p style={{ fontSize: '0.82rem', marginTop: 6, color: 'var(--text-secondary)' }}>
                  Stores your account sign-in token, short-lived usage-entitlement token, and the local encryption key handle. Never spreadsheet or form contents.
                </p>
              </div>

              <div style={{ padding: 18, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <strong>chrome.storage.session</strong>
                <p style={{ fontSize: '0.82rem', marginTop: 6, color: 'var(--text-secondary)' }}>
                  Volatile runtime state (current row index, execution timers, mutex locks) is cleared automatically when the browser session ends.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Disclosed Backend Access */}
          <div className="glass-card">
            <h3>3. Data Sent for Account Authentication & Usage Metering</h3>
            <p style={{ marginTop: 8, marginBottom: 16 }}>
              FormAnchor connects to a single first-party backend endpoint (<code style={{ color: 'var(--primary)' }}>https://*.supabase.co</code>) solely for authentication and row-credit metering:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '8px 12px' }}>Purpose</th>
                    <th style={{ padding: '8px 12px' }}>Data Sent</th>
                    <th style={{ padding: '8px 12px' }}>Data NOT Sent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Sign-In (Email OTP)</td>
                    <td style={{ padding: '10px 12px' }}>Email address</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>No passwords (passwordless OTP), zero form data</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Quota Check</td>
                    <td style={{ padding: '10px 12px' }}>Authenticated session token</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>Zero browsing history, form data, or spreadsheet data</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Row-Success Metering</td>
                    <td style={{ padding: '10px 12px' }}>Session ID, row index (integer), and portal hostname (e.g. <code>incometax.gov.in</code>)</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>Full page URLs, form values, spreadsheet rows, or selectors</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>Credit Pack Purchase</td>
                    <td style={{ padding: '10px 12px' }}>Selected plan ID</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>Card/UPI details entered on Razorpay's hosted page; FormAnchor never receives payment data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Limited Use */}
          <div className="glass-card">
            <h3>4. Chrome Web Store Limited Use Compliance</h3>
            <p style={{ marginTop: 8, marginBottom: 16 }}>
              FormAnchor adheres strictly to the Chrome Web Store Developer Program Policies:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)' }}>
                <span className="pill-badge emerald" style={{ marginBottom: 8 }}>Zero Sale</span>
                <p style={{ fontSize: '0.85rem' }}>We never sell user data or browsing information to third parties or brokers.</p>
              </div>

              <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)' }}>
                <span className="pill-badge emerald" style={{ marginBottom: 8 }}>No Advertising</span>
                <p style={{ fontSize: '0.85rem' }}>We never use form data for ad targeting, marketing, or credit scoring.</p>
              </div>

              <div style={{ padding: 16, background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)' }}>
                <span className="pill-badge emerald" style={{ marginBottom: 8 }}>No Remote Code</span>
                <p style={{ fontSize: '0.85rem' }}>The extension contains zero remotely hosted scripts, complying with MV3 CSP rules.</p>
              </div>
            </div>
          </div>

          {/* Section 5: Retention & Wipe */}
          <div className="glass-card">
            <h3>5. Data Retention & Full Data Wipe</h3>
            <p style={{ marginTop: 8, marginBottom: 12, lineHeight: 1.6 }}>
              You maintain total control over your local data:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: 20, color: 'var(--text-secondary)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><strong>Wipe Extension Databases:</strong> Available at Settings → Wipe Extension Databases. Permanently deletes all recordings, spreadsheet data, execution logs, and session caches from your device.</li>
              <li><strong>Sign Out:</strong> Purges your authentication session token and cached usage entitlement from local storage.</li>
              <li><strong>Log Export:</strong> You can export execution logs as JSON or CSV files at any time via the Activity Logs screen before wiping.</li>
            </ul>
          </div>

          {/* Section 6: Contact */}
          <div className="glass-card">
            <h3>6. Contact & Inquiries</h3>
            <p style={{ marginTop: 8 }}>
              If you have any questions regarding FormAnchor's privacy practices or security model, contact the developer directly at{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                {SUPPORT_EMAIL}
              </a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}